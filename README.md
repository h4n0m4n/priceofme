<div align="center">

# PriceOfMe

### Your data has a price tag. You just never see it.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Tests](https://img.shields.io/badge/tests-12%2F12%20passing-brightgreen.svg)](#)
[![Next.js](https://img.shields.io/badge/frontend-Next.js-black.svg)](https://nextjs.org/)

An open-source personal data value calculator. See how much Google, Meta, TikTok, and Amazon earn from **YOUR** data every year — based on real SEC filings.

**[Live Demo](https://priceofme.vercel.app)** · **[How It Works](#how-it-works)** · **[Data Sources](#data-sources)** · **[Contributing](#contributing)**

</div>

---

```
  YOUR ANNUAL DATA VALUE (United States, age 28, moderate usage)

  Google          $342/yr  ████████████████████████░░  27%
  Meta            $217/yr  ███████████████░░░░░░░░░░░  17%
  Data Brokers    $198/yr  ██████████████░░░░░░░░░░░░  16%
  Amazon          $164/yr  ███████████░░░░░░░░░░░░░░░  13%
  TikTok          $112/yr  ████████░░░░░░░░░░░░░░░░░░   9%
  Microsoft        $95/yr  ███████░░░░░░░░░░░░░░░░░░░   8%
  Apple            $78/yr  █████░░░░░░░░░░░░░░░░░░░░░   6%
  X (Twitter)      $32/yr  ██░░░░░░░░░░░░░░░░░░░░░░░░   3%
  Spotify          $18/yr  █░░░░░░░░░░░░░░░░░░░░░░░░░   1%
                 ─────────
  TOTAL:       $1,256/yr    You receive: $0
  LIFETIME:   $57,000       ≈ a house down payment
```

> *"The average US internet user generates $700+ in advertising revenue per year. They receive nothing."* — Proton Privacy Report 2025

## The Problem

Every search you make, every post you like, every video you watch generates revenue. Tech companies report this in their SEC filings as **ARPU** (Average Revenue Per User):

- **Google** makes **$342/year** from the average US user
- **Meta** makes **$217/year** from the average US user
- **Data brokers** sell your profile for **$198/year** worth of data points
- **You receive $0** of this

In 2024, the global digital advertising industry generated **$740 billion**. Divided equally among 5.35 billion internet users, each person's fair share would be **$138/year**.

Nobody got that check.

## How It Works

PriceOfMe calculates your personal data value based on:

1. **Your country** — ARPU varies 10-30x between regions (US $342 vs India $62 on Google)
2. **Your age** — 25-34 year olds are worth 35% more than average (prime spending years)
3. **Your usage** — Heavy users (5-8h/day) generate 50% more revenue
4. **Your platforms** — Each company monetizes differently

Every number comes from public SEC filings, earnings reports, and industry research.

## Quick Start

```bash
git clone https://github.com/aykutturksoy5-maker/priceofme.git
cd priceofme/web && npm install && npm run dev
# Open http://localhost:3000
```

### Python Engine

```bash
pip install -e .
python -c "
from engine.calculator import calculate, UserProfile
result = calculate(UserProfile(country='US', age=28, age_group='25-34'))
print(f'Annual data value: \${result.annual_total:,.0f}')
print(f'You receive: \${result.you_receive}')
print(f'Lifetime total: \${result.lifetime_total:,.0f}')
"
```

## Data Sources

| Source | What It Provides | Public? |
|--------|-----------------|---------|
| **Meta 10-K** (SEC) | ARPU by region: US/CA, Europe, APAC, RoW | Yes |
| **Alphabet 10-K** (SEC) | Revenue by segment, geo breakdown | Yes |
| **Amazon 10-K** (SEC) | Advertising revenue segment | Yes |
| **Proton Privacy Report** | Data broker valuation methodology | Yes |
| **Statista** | Cross-platform ARPU comparisons | Partial |
| **Bloomberg/FT** | ByteDance revenue estimates | Yes |

All figures are derived from publicly available financial disclosures. No proprietary data is used.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Engine | Python 3.11+ / Pydantic |
| Frontend | Next.js / Tailwind CSS |
| Data | SEC filings, Statista, Proton Research |
| Tests | Pytest (12/12 passing) |

## Contributing

We welcome contributions:
- **More platforms** — Add Snapchat, Pinterest, Reddit, etc.
- **Better ARPU data** — Update with latest earnings reports
- **Regional accuracy** — Country-specific data beyond region groups
- **Visualizations** — Make the data even more impactful
- **Translations** — Make PriceOfMe accessible globally

## License

MIT — Use it, fork it, build on it.

---

<div align="center">

*Your data has a price tag. You just never see it.*
*Until now.*

**[Try it →](https://priceofme.vercel.app)**

</div>
