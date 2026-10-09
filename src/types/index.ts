export type Category = 
  | 'All' 
  | 'AI' 
  | 'DevTools' 
  | 'SaaS' 
  | 'Productivity'
  | 'Infrastructure'
  | 'Other';

export interface Slot {
  id: number;
  formattedId: string; // e.g. "#001"
  isClaimed: boolean;
  isEditorialExample?: boolean; // Flag to clearly label seed examples
  isActiveNext?: boolean;
  claimedAt?: string;
  pricePaid?: number;
  tierLabel?: string; // e.g. "Genesis • $0.00" or "Tier 2 • $2.00"
  founderName?: string;
  founderHandle?: string; // e.g. "@rauchg"
  projectName?: string;
  projectUrl?: string;
  oneLiner?: string;
  category?: Category;
  subCategory?: string; // e.g. "Database", "AI Search", "Analytics"
  logoUrl?: string;
  transactionId?: string;
  paymentReference?: string;
  moderationStatus?: "approved" | "pending_review" | "rejected";
}

export interface PricingTier {
  tierNumber: number;
  code: string; // "T1", "T2"...
  name: string;
  slotRange: [number, number];
  price: number;
  description: string;
  status: 'COMPLETED' | 'ACTIVE' | 'UPCOMING';
}

export interface ClaimFormData {
  projectName: string;
  projectUrl: string;
  founderName: string;
  founderHandle: string;
  oneLiner: string;
  category: Category;
  logoUrl: string;
}
