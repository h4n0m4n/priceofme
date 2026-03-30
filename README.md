<div align="center">

# PriceOfMe

### Your d ata has a price tag. You just never see it.

 [![License: MIT](https://img.shields.io/badge /License-MIT-yellow.svg)](https://opensource. org/licenses/MIT)
[![Python 3.11+](https://im g.shields.io/badge/python-3.11+-blue.svg)](ht tps://www.python.org/downloads/)
[![Tests](ht tps://img.shields.io/badge/tests-12%2F12%20pa ssing-brightgreen.svg)](#)
[![Next.js](https: //img.shields.io/badge/frontend-Next.js-black .svg)](https://nextjs.org/)

An open-source p ersonal data value calculator. See how much G oogle, Meta, TikTok, and Amazon earn from **Y OUR** data every year — based on real SEC f ilings.

**[Live Demo](https://priceofme.verc el.app)** · **[How It Works](#how-it-works)* * · **[Data Sources](#data-sources)** · **[ Contributing](#contributing)**

</div>

---

 ```
  YOUR ANNUAL DATA VALUE (United States,  age 28, moderate usage)

  Google          $3 42/yr  ████████████� �███████████░░  27% 
  Meta            $217/yr  █████� �█████████░░░░░� �░░░░░  17%
  Data Brokers    $198/ yr  █████████████� �░░░░░░░░░░░░  16%
   Amazon          $164/yr  ██████� �████░░░░░░░░░░� �░░░░  13%
  TikTok          $112/yr   ████████░░░░░░� �░░░░░░░░░░░   9%
  Mic rosoft        $95/yr  ███████� �░░░░░░░░░░░░░░� �░░░   8%
  Apple            $78/yr  � �████░░░░░░░░░░� �░░░░░░░░░░   6%
  X (Twi tter)      $32/yr  ██░░░░░░� �░░░░░░░░░░░░░░� �░░   3%
  Spotify          $18/yr  █� �░░░░░░░░░░░░░░� �░░░░░░░░░   1%
                  ─────────
  TOTAL:        $1,256/yr    You receive: $0
  LIFETIME:    $57,000       ≈ a house down payment
```
 
> *"The average US internet user generates $ 700+ in advertising revenue per year. They re ceive nothing."* — Proton Privacy Report 20 25

## The Problem

Every search you make, ev ery post you like, every video you watch gene rates revenue. Tech companies report this in  their SEC filings as **ARPU** (Average Revenu e Per User):

- **Google** makes **$342/year* * from the average US user
- **Meta** makes * *$217/year** from the average US user
- **Dat a brokers** sell your profile for **$198/year ** worth of data points
- **You receive $0**  of this

In 2024, the global digital advertis ing industry generated **$740 billion**. Divi ded equally among 5.35 billion internet users , each person's fair share would be **$138/ye ar**.

Nobody got that check.

## How It Work s

PriceOfMe calculates your personal data va lue based on:

1. **Your country** — ARPU v aries 10-30x between regions (US $342 vs Indi a $62 on Google)
2. **Your age** — 25-34 ye ar olds are worth 35% more than average (prim e spending years)
3. **Your usage** — Heavy  users (5-8h/day) generate 50% more revenue
4 . **Your platforms** — Each company monetiz es differently

Every number comes from publi c SEC filings, earnings reports, and industry  research.

## Quick Start

```bash
git clone  https://github.com/h4n0m4n/priceofme.git
cd  priceofme/web && npm install && npm run dev
#  Open http://localhost:3000
```

### Python E ngine

```bash
pip install -e .
python -c "
f rom engine.calculator import calculate, UserP rofile
result = calculate(UserProfile(country ='US', age=28, age_group='25-34'))
print(f'An nual data value: \${result.annual_total:,.0f} ')
print(f'You receive: \${result.you_receive }')
print(f'Lifetime total: \${result.lifetim e_total:,.0f}')
"
```

## Data Sources

| Sou rce | What It Provides | Public? |
|--------| -----------------|---------|
| **Meta 10-K**  (SEC) | ARPU by region: US/CA, Europe, APAC,  RoW | Yes |
| **Alphabet 10-K** (SEC) | Reven ue by segment, geo breakdown | Yes |
| **Amaz on 10-K** (SEC) | Advertising revenue segment  | Yes |
| **Proton Privacy Report** | Data b roker valuation methodology | Yes |
| **Stati sta** | Cross-platform ARPU comparisons | Par tial |
| **Bloomberg/FT** | ByteDance revenue  estimates | Yes |

All figures are derived f rom publicly available financial disclosures.  No proprietary data is used.

## Tech Stack
 
| Layer | Technology |
|-------|-----------| 
| Engine | Python 3.11+ / Pydantic |
| Front end | Next.js / Tailwind CSS |
| Data | SEC f ilings, Statista, Proton Research |
| Tests |  Pytest (12/12 passing) |

## Contributing

W e welcome contributions:
- **More platforms**  — Add Snapchat, Pinterest, Reddit, etc.
-  **Better ARPU data** — Update with latest e arnings reports
- **Regional accuracy** — C ountry-specific data beyond region groups
- * *Visualizations** — Make the data even more  impactful
- **Translations** — Make PriceO fMe accessible globally

## License

MIT —  Use it, fork it, build on it.

---

<div alig n="center">

*Your data has a price tag. You  just never see it.*
*Until now.*

**[Try it � ��](https://priceofme.vercel.app)**

</div>
 