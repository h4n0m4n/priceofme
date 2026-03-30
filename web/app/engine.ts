export interface PlatformDef {
  id: string;
  name: string;
  icon: string;
  color: string;
  us_canada: number;
  europe: number;
  asia_pacific: number;
  rest_of_world: number;
  source: string;
}

export const PLATFORMS: PlatformDef[] = [
  { id: "google", name: "Google", icon: "G", color: "#4285F4", us_canada: 342, europe: 168, asia_pacific: 62, rest_of_world: 38, source: "Alphabet 10-K 2024" },
  { id: "meta", name: "Meta", icon: "M", color: "#0668E1", us_canada: 217, europe: 70, asia_pacific: 17, rest_of_world: 12, source: "Meta 10-K 2024" },
  { id: "tiktok", name: "TikTok", icon: "T", color: "#ff0050", us_canada: 112, europe: 48, asia_pacific: 22, rest_of_world: 9, source: "Bloomberg/FT estimates" },
  { id: "amazon", name: "Amazon", icon: "A", color: "#FF9900", us_canada: 164, europe: 72, asia_pacific: 28, rest_of_world: 14, source: "Amazon 10-K 2024" },
  { id: "microsoft", name: "Microsoft", icon: "MS", color: "#00A4EF", us_canada: 95, europe: 52, asia_pacific: 18, rest_of_world: 10, source: "Microsoft 10-K 2024" },
  { id: "apple", name: "Apple", icon: "🍎", color: "#A2AAAD", us_canada: 78, europe: 38, asia_pacific: 19, rest_of_world: 8, source: "Apple 10-K 2024" },
  { id: "twitter", name: "X (Twitter)", icon: "X", color: "#1DA1F2", us_canada: 32, europe: 14, asia_pacific: 5, rest_of_world: 3, source: "Twitter 10-K (pre-acq)" },
  { id: "spotify", name: "Spotify", icon: "S", color: "#1DB954", us_canada: 18, europe: 14, asia_pacific: 5, rest_of_world: 3, source: "Spotify 10-K 2024" },
  { id: "data_brokers", name: "Data Brokers", icon: "DB", color: "#8B0000", us_canada: 198, europe: 87, asia_pacific: 24, rest_of_world: 11, source: "Proton 2025 report" },
];

const REGION_MAP: Record<string, string> = {
  US: "us_canada", CA: "us_canada",
  GB: "europe", DE: "europe", FR: "europe", IT: "europe", ES: "europe",
  NL: "europe", SE: "europe", NO: "europe", PL: "europe", TR: "europe",
  CH: "europe", AT: "europe", BE: "europe", PT: "europe", IE: "europe",
  DK: "europe", FI: "europe", GR: "europe", CZ: "europe", RO: "europe",
  HU: "europe", UA: "europe", RU: "europe",
  JP: "asia_pacific", KR: "asia_pacific", CN: "asia_pacific",
  IN: "asia_pacific", AU: "asia_pacific", NZ: "asia_pacific",
  ID: "asia_pacific", TH: "asia_pacific", VN: "asia_pacific",
  PH: "asia_pacific", MY: "asia_pacific", SG: "asia_pacific",
  TW: "asia_pacific", HK: "asia_pacific",
  BR: "rest_of_world", MX: "rest_of_world", AR: "rest_of_world",
  CO: "rest_of_world", CL: "rest_of_world", PE: "rest_of_world",
  NG: "rest_of_world", ZA: "rest_of_world", EG: "rest_of_world",
  KE: "rest_of_world", SA: "rest_of_world", AE: "rest_of_world",
  IL: "rest_of_world", PK: "rest_of_world",
};

const COUNTRIES = [
  { code: "US", name: "United States" }, { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" }, { code: "FR", name: "France" },
  { code: "CA", name: "Canada" }, { code: "AU", name: "Australia" },
  { code: "JP", name: "Japan" }, { code: "KR", name: "South Korea" },
  { code: "BR", name: "Brazil" }, { code: "IN", name: "India" },
  { code: "TR", name: "Turkey" }, { code: "MX", name: "Mexico" },
  { code: "NG", name: "Nigeria" }, { code: "ID", name: "Indonesia" },
  { code: "PH", name: "Philippines" }, { code: "EG", name: "Egypt" },
  { code: "PK", name: "Pakistan" }, { code: "ZA", name: "South Africa" },
  { code: "SA", name: "Saudi Arabia" }, { code: "AE", name: "UAE" },
  { code: "IT", name: "Italy" }, { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" }, { code: "SE", name: "Sweden" },
  { code: "PL", name: "Poland" }, { code: "CN", name: "China" },
  { code: "TH", name: "Thailand" }, { code: "VN", name: "Vietnam" },
  { code: "CO", name: "Colombia" }, { code: "CL", name: "Chile" },
];
export { COUNTRIES };

const AGE_MULT: Record<string, number> = {
  "13-17": 0.65, "18-24": 1.20, "25-34": 1.35, "35-44": 1.25, "45-54": 1.10, "55-64": 0.90, "65+": 0.70,
};
const USAGE_MULT: Record<string, number> = { light: 0.6, moderate: 1.0, heavy: 1.5, extreme: 2.0 };

export interface CalcResult {
  platforms: { id: string; name: string; icon: string; color: string; annual: number; daily: number; source: string }[];
  annualTotal: number;
  dailyTotal: number;
  lifetimeTotal: number;
  yearsLeft: number;
  perHour: number;
  globalFairShare: number;
  coffeeEquiv: string;
}

export function calculate(
  country: string,
  ageGroup: string,
  usage: string,
  selectedPlatforms: string[],
  age: number,
): CalcResult {
  const region = REGION_MAP[country] || "rest_of_world";
  const aMult = AGE_MULT[ageGroup] || 1.0;
  const uMult = USAGE_MULT[usage] || 1.0;

  const platforms = PLATFORMS
    .filter(p => selectedPlatforms.includes(p.id))
    .map(p => {
      const base = (p as unknown as Record<string, number>)[region] || p.rest_of_world;
      const annual = Math.round(base * aMult * uMult * 100) / 100;
      return { id: p.id, name: p.name, icon: p.icon, color: p.color, annual, daily: Math.round((annual / 365) * 100) / 100, source: p.source };
    })
    .sort((a, b) => b.annual - a.annual);

  const annualTotal = Math.round(platforms.reduce((s, p) => s + p.annual, 0) * 100) / 100;
  const dailyTotal = Math.round((annualTotal / 365) * 100) / 100;
  const yearsLeft = Math.max(1, 73.4 - age);
  const lifetimeTotal = Math.round(annualTotal * yearsLeft * 100) / 100;
  const perHour = Math.round((dailyTotal / 8) * 100) / 100;
  const globalFairShare = Math.round((740e9 / 5.35e9) * 100) / 100;

  const coffeeDays = dailyTotal > 0 ? Math.max(1, Math.round(5.0 / dailyTotal)) : 999;
  const coffeeEquiv = dailyTotal >= 5 ? "a coffee every day" : `a coffee every ${coffeeDays} days`;

  return { platforms, annualTotal, dailyTotal, lifetimeTotal, yearsLeft, perHour, globalFairShare, coffeeEquiv };
}
