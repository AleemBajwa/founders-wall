// High-fidelity recognizable SVG brand logos for editorial reference listings
// Exported as crisp data URIs to ensure instant offline rendering without external network latency

function createSvgDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const BRAND_LOGOS: Record<string, string> = {
  supabase: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#1c1c1c"/>
      <path d="M53 14L24 54h25l-6 32 33-44H51l8-28z" fill="#3ECF8E"/>
    </svg>
  `),

  raycast: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#18181b"/>
      <path d="M50 18l32 32-32 32-32-32z" fill="#FF6363"/>
      <circle cx="50" cy="50" r="14" fill="#ffffff"/>
    </svg>
  `),

  linear: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#5E6AD2"/>
      <path d="M28 72V28h12v32h32v12H28z" fill="#ffffff"/>
      <circle cx="68" cy="36" r="8" fill="#ffffff"/>
    </svg>
  `),

  resend: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#000000"/>
      <path d="M26 32h48v36H26z" fill="none" stroke="#ffffff" stroke-width="7" stroke-linejoin="round"/>
      <path d="M26 34l24 18 24-18" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
    </svg>
  `),

  midjourney: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#0b132b"/>
      <path d="M30 68c12-18 20-38 20-46 0 8 8 28 20 46H30z" fill="#ffffff"/>
      <path d="M24 72c16 8 36 8 52 0-8 6-44 6-52 0z" fill="#48cae4"/>
    </svg>
  `),

  perplexity: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#132a2f"/>
      <path d="M50 20v60M20 50h60M29 29l42 42M71 29L29 71" stroke="#20B2AA" stroke-width="9" stroke-linecap="round"/>
      <circle cx="50" cy="50" r="10" fill="#ffffff"/>
    </svg>
  `),

  vercel: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#000000"/>
      <polygon points="50,22 82,78 18,78" fill="#ffffff"/>
    </svg>
  `),

  cursor: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#171717"/>
      <path d="M30 20l42 28-22 6-8 22z" fill="#8B5CF6"/>
      <path d="M48 52l14 26-8 4-14-26z" fill="#A78BFA"/>
    </svg>
  `),

  calcom: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#111827"/>
      <path d="M66 36c-4-4-10-6-16-6-13 0-22 9-22 20s9 20 22 20c6 0 12-2 16-6" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round"/>
      <circle cx="68" cy="50" r="5" fill="#ffffff"/>
    </svg>
  `),

  dubco: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#000000"/>
      <circle cx="42" cy="54" r="18" fill="none" stroke="#F59E0B" stroke-width="8"/>
      <path d="M60 22v50" stroke="#F59E0B" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `),

  posthog: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#F96332"/>
      <circle cx="40" cy="50" r="16" fill="#ffffff"/>
      <circle cx="64" cy="46" r="10" fill="#ffffff"/>
      <path d="M26 64h48c0 8-10 14-24 14s-24-6-24-14z" fill="#111827"/>
    </svg>
  `),

  linearsync: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#4F46E5"/>
      <path d="M30 40a20 20 0 0 1 36-8l4-4v16H54l6-6a12 12 0 0 0-22 4h-8z" fill="#ffffff"/>
      <path d="M70 60a20 20 0 0 1-36 8l-4 4V56h16l-6 6a12 12 0 0 0 22-4h8z" fill="#ffffff"/>
    </svg>
  `),

  kimiai: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="#06B6D4"/>
      <circle cx="50" cy="50" r="24" fill="#ffffff"/>
      <circle cx="50" cy="50" r="14" fill="#0891B2"/>
      <circle cx="50" cy="50" r="6" fill="#ffffff"/>
    </svg>
  `),
};
