from __future__ import annotations
from pydantic import BaseModel, Field
from .data import (
    PLATFORMS, REGION_MAP, AGE_MULTIPLIERS, GENDER_MULTIPLIERS,
    HOURS_MULTIPLIERS, LIFE_EXPECTANCY_GLOBAL, COMPARABLE_ITEMS_USD,
)


class UserProfile(BaseModel):
    country: str = Field(default="US", description="ISO 3166-1 alpha-2")
    age_group: str = Field(default="25-34")
    gender: str = Field(default="other")
    usage_level: str = Field(default="moderate", description="light / moderate / heavy / extreme")
    platforms: list[str] = Field(default_factory=lambda: list(PLATFORMS.keys()))
    age: int = Field(default=30)


class PlatformResult(BaseModel):
    platform: str
    name: str
    icon: str
    color: str
    annual_value: float
    daily_value: float
    source: str


class DataValueResult(BaseModel):
    platforms: list[PlatformResult]
    annual_total: float
    daily_total: float
    you_receive: float
    lifetime_total: float
    years_left: float
    per_hour: float
    equivalent_item: str
    equivalent_daily: str
    global_fair_share: float
    internet_users: float
    total_ad_revenue_global: float


def get_region(country: str) -> str:
    return REGION_MAP.get(country.upper(), "rest_of_world")


def calculate(profile: UserProfile) -> DataValueResult:
    region = get_region(profile.country)
    age_mult = AGE_MULTIPLIERS.get(profile.age_group, 1.0)
    gender_mult = GENDER_MULTIPLIERS.get(profile.gender, 1.0)
    hours_mult = HOURS_MULTIPLIERS.get(profile.usage_level, 1.0)

    results: list[PlatformResult] = []
    annual_total = 0.0

    for pid in profile.platforms:
        p = PLATFORMS.get(pid)
        if not p:
            continue
        base = getattr(p, region, p.rest_of_world)
        value = round(base * age_mult * gender_mult * hours_mult, 2)
        results.append(PlatformResult(
            platform=pid,
            name=p.name,
            icon=p.icon,
            color=p.color,
            annual_value=value,
            daily_value=round(value / 365, 2),
            source=p.source,
        ))
        annual_total += value

    results.sort(key=lambda r: r.annual_value, reverse=True)
    daily_total = round(annual_total / 365, 2)

    years_left = max(1, LIFE_EXPECTANCY_GLOBAL - profile.age)
    lifetime_total = round(annual_total * years_left, 2)

    per_hour = round(daily_total / 8, 2) if daily_total > 0 else 0
    internet_users = 5.35e9
    total_global_ad = 740e9

    equivalent_item = ""
    for threshold, item in COMPARABLE_ITEMS_USD:
        if lifetime_total >= threshold:
            equivalent_item = f"{int(lifetime_total / threshold)}x {item}"
    if not equivalent_item:
        equivalent_item = "less than a cup of coffee"

    equivalent_daily = ""
    for threshold, item in COMPARABLE_ITEMS_USD:
        if daily_total >= threshold:
            equivalent_daily = item
            break
    if not equivalent_daily:
        if daily_total >= 1.0:
            equivalent_daily = f"${daily_total:.2f}/day — a cup of coffee every {max(1, int(3.0 / daily_total))} days"
        else:
            equivalent_daily = f"${daily_total:.2f}/day"

    return DataValueResult(
        platforms=results,
        annual_total=round(annual_total, 2),
        daily_total=daily_total,
        you_receive=0.0,
        lifetime_total=lifetime_total,
        years_left=years_left,
        per_hour=per_hour,
        equivalent_item=equivalent_item,
        equivalent_daily=equivalent_daily,
        global_fair_share=round(total_global_ad / internet_users, 2),
        internet_users=internet_users,
        total_ad_revenue_global=total_global_ad,
    )
