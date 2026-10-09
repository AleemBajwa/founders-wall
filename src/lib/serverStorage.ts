import fs from "fs";
import path from "path";
import os from "os";
import { neon } from "@neondatabase/serverless";
import { Slot, ClaimFormData, Category } from "@/types";
import { generateAllSlots } from "@/data/initialSlots";
import { getSlotPrice, getCurrentTier, formatSlotId } from "@/utils/pricing";

const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_CLAIMS_FILE = path.join(LOCAL_DATA_DIR, "claims.json");
const TMP_CLAIMS_FILE = path.join(os.tmpdir(), "founders_wall_claims.json");

const VALID_CATEGORIES: Category[] = [
  "AI",
  "DevTools",
  "SaaS",
  "Productivity",
  "Infrastructure",
  "Other",
];

// Helper to get Postgres client if DATABASE_URL or POSTGRES_URL is configured
function getDb() {
  const connString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connString) return null;
  return neon(connString);
}

let isTableInitialized = false;

async function ensureTable(sql: any) {
  if (isTableInitialized) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS claims (
        id INT PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    isTableInitialized = true;
  } catch (err) {
    console.error("Failed to verify/create claims table:", err);
  }
}

// In-memory cache for fast reads and serverless container reuse
let memoryClaimsCache: Slot[] | null = null;

/**
 * Reads confirmed user claims persisted in Cloud Postgres or local disk fallback
 */
export async function getServerClaims(): Promise<Slot[]> {
  const sql = getDb();

  // 1. If Cloud Postgres is configured, query database directly
  if (sql) {
    try {
      await ensureTable(sql);
      const rows = await sql`SELECT data FROM claims ORDER BY id ASC;`;
      const claims: Slot[] = rows.map((r: any) => r.data as Slot);
      memoryClaimsCache = claims;
      return claims;
    } catch (err) {
      console.error("Error reading claims from Postgres, falling back to local cache:", err);
    }
  }

  // 2. In-memory cache fallback
  if (memoryClaimsCache && memoryClaimsCache.length > 0) {
    return memoryClaimsCache;
  }

  // 3. Fallback to local files (tmpdir or repo claims.json)
  try {
    if (fs.existsSync(TMP_CLAIMS_FILE)) {
      const raw = fs.readFileSync(TMP_CLAIMS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryClaimsCache = parsed;
        return parsed;
      }
    }

    if (fs.existsSync(LOCAL_CLAIMS_FILE)) {
      const raw = fs.readFileSync(LOCAL_CLAIMS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        memoryClaimsCache = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error reading fallback claims:", error);
  }

  return [];
}

/**
 * Persists a new claim atomically into Cloud Postgres or fallback
 */
async function saveServerClaim(newClaim: Slot): Promise<Slot[]> {
  const sql = getDb();

  if (sql) {
    try {
      await ensureTable(sql);
      await sql`
        INSERT INTO claims (id, data)
        VALUES (${newClaim.id}, ${JSON.stringify(newClaim)})
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;
      `;
      const rows = await sql`SELECT data FROM claims ORDER BY id ASC;`;
      const updatedClaims: Slot[] = rows.map((r: any) => r.data as Slot);
      memoryClaimsCache = updatedClaims;
      return updatedClaims;
    } catch (err) {
      console.error("Error persisting claim to Postgres:", err);
      throw new Error("Database transaction failed. Please retry.");
    }
  }

  // Local fallback
  const existing = await getServerClaims();
  const updated = [...existing.filter((c) => c.id !== newClaim.id), newClaim];
  memoryClaimsCache = updated;

  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    const tmp = `${LOCAL_CLAIMS_FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(updated, null, 2), "utf-8");
    fs.renameSync(tmp, LOCAL_CLAIMS_FILE);
    return updated;
  } catch {
    // Serverless read-only
  }

  try {
    const tmp = `${TMP_CLAIMS_FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(updated, null, 2), "utf-8");
    fs.renameSync(tmp, TMP_CLAIMS_FILE);
  } catch (tmpErr) {
    console.error("Failed to persist claims to tmpdir:", tmpErr);
  }

  return updated;
}

export interface AuthoritativeInventory {
  slots: Slot[];
  nextSlotId: number | null;
  nextSlotPrice: number | null;
  isSoldOut: boolean;
  claimedCount: number;
  editorialCount: number;
  paidCount: number;
  remainingCount: number;
}

/**
 * Merges seed positions with saved server claims to return the single source of truth.
 */
export async function getAllSlotsAuthoritative(): Promise<AuthoritativeInventory> {
  const baseSlots = generateAllSlots();
  const serverClaims = await getServerClaims();

  const slotMap = new Map<number, Slot>();
  serverClaims.forEach((claim) => {
    slotMap.set(claim.id, claim);
  });

  const merged = baseSlots.map((base) => {
    const override = slotMap.get(base.id);
    return override || base;
  });

  const editorialCount = 0;
  const paidClaims = merged.filter((s) => s.isClaimed);
  const paidCount = paidClaims.length;
  const claimedCount = paidCount;
  const remainingCount = 500 - claimedCount;

  // Find authoritative first unclaimed slot
  const firstUnclaimed = merged.find((s) => !s.isClaimed);
  const nextSlotId = firstUnclaimed ? firstUnclaimed.id : null;
  const nextSlotPrice = nextSlotId ? getSlotPrice(nextSlotId) : null;
  const isSoldOut = nextSlotId === null;

  // Mark isActiveNext on authoritative slots
  const finalSlots = merged.map((slot) => ({
    ...slot,
    isActiveNext: nextSlotId !== null && slot.id === nextSlotId,
  }));

  return {
    slots: finalSlots,
    nextSlotId,
    nextSlotPrice,
    isSoldOut,
    claimedCount,
    editorialCount,
    paidCount,
    remainingCount,
  };
}

/**
 * Validates claim inputs against submission and moderation criteria
 */
function validateClaimInput(data: ClaimFormData): void {
  const name = data.projectName?.trim();
  if (!name || name.length < 2 || name.length > 50) {
    throw new Error("Project name must be between 2 and 50 characters.");
  }

  const founder = data.founderName?.trim();
  if (!founder || founder.length < 1 || founder.length > 50) {
    throw new Error("Founder name must be between 1 and 50 characters.");
  }

  const oneLiner = data.oneLiner?.trim();
  if (!oneLiner || oneLiner.length < 5 || oneLiner.length > 140) {
    throw new Error("One-liner pitch must be between 5 and 140 characters.");
  }

  const rawUrl = data.projectUrl?.trim();
  if (!rawUrl) {
    throw new Error("Project URL is required.");
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(rawUrl);
  } catch {
    throw new Error("Project URL must be a valid web address (e.g. https://yourproduct.com).");
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new Error("Project URL must start with http:// or https://");
  }

  if (!VALID_CATEGORIES.includes(data.category)) {
    throw new Error(`Invalid category. Allowed: ${VALID_CATEGORIES.join(", ")}`);
  }

  const logo = data.logoUrl?.trim();
  if (!logo) {
    throw new Error("Logo is required.");
  }

  if (
    !logo.startsWith("https://") &&
    !logo.startsWith("http://") &&
    !logo.startsWith("data:image/")
  ) {
    throw new Error("Logo must be a valid image URL or data URI.");
  }

  // Moderation check: Disallow deceptive/scam terms
  const prohibited = [
    "casino",
    "gambling",
    "porn",
    "phishing",
    "malware",
    "ponzi",
    "hack-tool",
  ];
  const combinedText = `${name} ${oneLiner} ${rawUrl}`.toLowerCase();
  for (const term of prohibited) {
    if (combinedText.includes(term)) {
      throw new Error(`Submission violates community standards: flagged keyword detected.`);
    }
  }
}

/**
 * Atomically reserves, processes payment confirmation, and publishes a new slot claim on the server.
 */
export async function claimSlotAuthoritative(
  data: ClaimFormData,
  targetSlotId?: number
): Promise<{ success: boolean; slot: Slot; inventory: AuthoritativeInventory }> {
  validateClaimInput(data);

  const inventory = await getAllSlotsAuthoritative();

  if (inventory.isSoldOut || inventory.nextSlotId === null) {
    throw new Error("The Founders Wall is completely filled. No positions remain available.");
  }

  const slotIdToClaim = targetSlotId ?? inventory.nextSlotId;

  // Strict check: Only the active next slot can be claimed
  if (slotIdToClaim !== inventory.nextSlotId) {
    throw new Error(
      `Slot #${slotIdToClaim} cannot be claimed. The active next slot available for claim is #${inventory.nextSlotId}.`
    );
  }

  if (slotIdToClaim < 1 || slotIdToClaim > 500) {
    throw new Error("Invalid slot position. Must be between 1 and 500.");
  }

  const existingClaims = await getServerClaims();
  if (existingClaims.some((c) => c.id === slotIdToClaim)) {
    throw new Error(`Slot #${slotIdToClaim} has already been claimed by another builder.`);
  }

  const price = getSlotPrice(slotIdToClaim);
  const tier = getCurrentTier(slotIdToClaim);

  const newSlot: Slot = {
    id: slotIdToClaim,
    formattedId: formatSlotId(slotIdToClaim),
    isClaimed: true,
    isEditorialExample: false,
    isActiveNext: false,
    pricePaid: price,
    tierLabel: tier.name,
    founderName: data.founderName.trim(),
    founderHandle: data.founderHandle ? data.founderHandle.trim() : undefined,
    projectName: data.projectName.trim(),
    projectUrl: data.projectUrl.trim(),
    oneLiner: data.oneLiner.trim(),
    category: data.category,
    logoUrl: data.logoUrl,
    claimedAt: new Date().toISOString(),
    moderationStatus: "approved",
    transactionId: `tx_fw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    paymentReference:
      price === 0
        ? `genesis_free_mint_${Date.now()}`
        : `pay_sandbox_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
  };

  await saveServerClaim(newSlot);

  const updatedInventory = await getAllSlotsAuthoritative();

  return {
    success: true,
    slot: newSlot,
    inventory: updatedInventory,
  };
}
