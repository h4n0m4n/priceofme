"""
ARPU and data value figures sourced from:
- Meta Platforms SEC 10-K filings (2024-2025)
- Alphabet/Google SEC 10-K filings (2024-2025)
- Proton "What is your data worth?" (2025)
- Statista ARPU datasets
- eMarketer digital advertising reports
- ByteDance revenue estimates (Bloomberg, Financial Times)
- Amazon advertising segment (SEC filings)
"""

from __future__ import annotations
from pydantic import BaseModel

class PlatformARPU(BaseModel):
    """Annual revenue per user by region (USD)."""
    name: str
    icon: str
    color: str
    us_canada: float
    europe: float
    asia_pacific: float
    rest_of_world: float
    source: str

PLATFORMS: dict[str, PlatformARPU] = {
    "google": PlatformARPU(
        name="Google",
        icon="G",
        color="#4285F4",
        us_canada=342.0,
        europe=168.0,
        asia_pacific=62.0,
        rest_of_world=38.0,
        source="Alphabet 10-K 2024: $307B revenue / ~1.8B premium users; regional split from ads geo breakdown",
    ),
    "meta": PlatformARPU(
        name="Meta (Facebook + Instagram)",
        icon="M",
        color="#0668E1",
        us_canada=217.0,
        europe=70.0,
        asia_pacific=17.0,
        rest_of_world=12.0,
        source="Meta 10-K 2024: ARPU $57.03 global; US/CA $217.26; regional segmentation from earnings",
    ),
    "tiktok": PlatformARPU(
        name="TikTok / ByteDance",
        icon="T",
        color="#010101",
        us_canada=112.0,
        europe=48.0,
        asia_pacific=22.0,
        rest_of_world=9.0,
        source="Bloomberg/FT estimates: ByteDance $120B+ revenue 2024; TikTok ~1.6B MAU; ad-heavy model",
    ),
    "amazon": PlatformARPU(
        name="Amazon (Ads + Shopping data)",
        icon="A",
        color="#FF9900",
        us_canada=164.0,
        europe=72.0,
        asia_pacific=28.0,
        rest_of_world=14.0,
        source="Amazon 10-K 2024: $56B ad revenue + purchase behavior monetization; ~310M active customers",
    ),
    "microsoft": PlatformARPU(
        name="Microsoft (LinkedIn + Bing + Edge)",
        icon="MS",
        color="#00A4EF",
        us_canada=95.0,
        europe=52.0,
        asia_pacific=18.0,
        rest_of_world=10.0,
        source="Microsoft 10-K 2024: LinkedIn $16B+ revenue; Bing ads ~$12B; ~1B LinkedIn members",
    ),
    "apple": PlatformARPU(
        name="Apple (App Store + Services data)",
        icon="🍎",
        color="#555555",
        us_canada=78.0,
        europe=38.0,
        asia_pacific=19.0,
        rest_of_world=8.0,
        source="Apple 10-K 2024: Services $96B revenue / ~1.2B active devices; ads growing via App Store & News",
    ),
    "twitter": PlatformARPU(
        name="X (Twitter)",
        icon="X",
        color="#1DA1F2",
        us_canada=32.0,
        europe=14.0,
        asia_pacific=5.0,
        rest_of_world=3.0,
        source="Estimated from pre-acquisition Twitter 10-K; adjusted down for post-2023 advertiser pullback",
    ),
    "spotify": PlatformARPU(
        name="Spotify (Behavioral data)",
        icon="S",
        color="#1DB954",
        us_canada=18.0,
        europe=14.0,
        asia_pacific=5.0,
        rest_of_world=3.0,
        source="Spotify 10-K 2024: Ad-supported tier ARPU ~€5/quarter; behavioral data licensing estimated",
    ),
    "data_brokers": PlatformARPU(
        name="Data Brokers (Acxiom, Oracle, etc.)",
        icon="DB",
        color="#8B0000",
        us_canada=198.0,
        europe=87.0,
        asia_pacific=24.0,
        rest_of_world=11.0,
        source="Proton 2025: Brokers sell profiles for $0.005-$0.50 per data point; ~1,500 data points per person",
    ),
}

REGION_MAP: dict[str, str] = {
    "US": "us_canada", "CA": "us_canada",
    "GB": "europe", "DE": "europe", "FR": "europe", "IT": "europe", "ES": "europe",
    "NL": "europe", "SE": "europe", "NO": "europe", "PL": "europe", "TR": "europe",
    "CH": "europe", "AT": "europe", "BE": "europe", "PT": "europe", "IE": "europe",
    "DK": "europe", "FI": "europe", "GR": "europe", "CZ": "europe", "RO": "europe",
    "HU": "europe", "UA": "europe", "RU": "europe",
    "JP": "asia_pacific", "KR": "asia_pacific", "CN": "asia_pacific",
    "IN": "asia_pacific", "AU": "asia_pacific", "NZ": "asia_pacific",
    "ID": "asia_pacific", "TH": "asia_pacific", "VN": "asia_pacific",
    "PH": "asia_pacific", "MY": "asia_pacific", "SG": "asia_pacific",
    "TW": "asia_pacific", "HK": "asia_pacific",
    "BR": "rest_of_world", "MX": "rest_of_world", "AR": "rest_of_world",
    "CO": "rest_of_world", "CL": "rest_of_world", "PE": "rest_of_world",
    "NG": "rest_of_world", "ZA": "rest_of_world", "EG": "rest_of_world",
    "KE": "rest_of_world", "SA": "rest_of_world", "AE": "rest_of_world",
    "IL": "rest_of_world", "PK": "rest_of_world",
}

AGE_MULTIPLIERS: dict[str, float] = {
    "13-17": 0.65,
    "18-24": 1.20,
    "25-34": 1.35,
    "35-44": 1.25,
    "45-54": 1.10,
    "55-64": 0.90,
    "65+": 0.70,
}

GENDER_MULTIPLIERS: dict[str, float] = {
    "male": 1.0,
    "female": 1.08,
    "other": 1.0,
}

HOURS_MULTIPLIERS: dict[str, float] = {
    "light": 0.6,
    "moderate": 1.0,
    "heavy": 1.5,
    "extreme": 2.0,
}

LIFE_EXPECTANCY_GLOBAL = 73.4

COMPARABLE_ITEMS_USD: list[tuple[float, str]] = [
    (3.0, "a cup of coffee"),
    (5.50, "a Big Mac"),
    (15.0, "a Netflix month"),
    (65.0, "a pair of jeans"),
    (120.0, "a pair of sneakers"),
    (350.0, "a budget smartphone"),
    (800.0, "a round-trip flight"),
    (1200.0, "a month's rent (US avg)"),
    (5000.0, "a used car down payment"),
    (35000.0, "a year of college tuition"),
    (67000.0, "a house down payment"),
    (250000.0, "a median US house"),
]
