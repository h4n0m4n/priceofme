import pytest
from engine.calculator import calculate, UserProfile


def test_default_profile_returns_positive_total():
    result = calculate(UserProfile())
    assert result.annual_total > 0
    assert result.lifetime_total > result.annual_total
    assert result.you_receive == 0.0


def test_us_user_higher_than_global():
    us = calculate(UserProfile(country="US", age_group="25-34"))
    ng = calculate(UserProfile(country="NG", age_group="25-34"))
    assert us.annual_total > ng.annual_total * 3


def test_heavy_user_higher_than_light():
    heavy = calculate(UserProfile(usage_level="heavy"))
    light = calculate(UserProfile(usage_level="light"))
    assert heavy.annual_total > light.annual_total


def test_young_adult_highest_value():
    young = calculate(UserProfile(age_group="18-24"))
    senior = calculate(UserProfile(age_group="65+"))
    assert young.annual_total > senior.annual_total


def test_single_platform():
    result = calculate(UserProfile(platforms=["google"]))
    assert len(result.platforms) == 1
    assert result.platforms[0].platform == "google"
    assert result.annual_total == result.platforms[0].annual_value


def test_empty_platforms_returns_zero():
    result = calculate(UserProfile(platforms=[]))
    assert result.annual_total == 0.0
    assert result.lifetime_total == 0.0


def test_lifetime_scales_with_age():
    young = calculate(UserProfile(age=20))
    old = calculate(UserProfile(age=60))
    assert young.lifetime_total > old.lifetime_total


def test_turkey_maps_to_europe():
    tr = calculate(UserProfile(country="TR", platforms=["meta"]))
    de = calculate(UserProfile(country="DE", platforms=["meta"]))
    assert tr.annual_total == de.annual_total


def test_all_platforms_included():
    result = calculate(UserProfile())
    assert len(result.platforms) == 9


def test_daily_value_is_annual_divided_by_365():
    result = calculate(UserProfile())
    assert abs(result.daily_total - round(result.annual_total / 365, 2)) < 0.02


def test_global_fair_share_positive():
    result = calculate(UserProfile())
    assert result.global_fair_share > 100


def test_equivalent_item_not_empty():
    result = calculate(UserProfile())
    assert len(result.equivalent_item) > 0
