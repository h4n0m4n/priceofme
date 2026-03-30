"use client";

import { useState, useMemo } from "react";
import { PLATFORMS, COUNTRIES, calculate, ageGroupFromAge, type CalcResult } from "./engine";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtD = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Home() {
  const [country, setCountry] = useState("US");
  const [ageStr, setAgeStr] = useState("28");
  const [usage, setUsage] = useState("moderate");
  const [selected, setSelected] = useState<string[]>(PLATFORMS.map(p => p.id));
  const [done, setDone] = useState(false);

  const parsedAge = parseInt(ageStr);
  const age = isNaN(parsedAge) ? 28 : parsedAge;
  const clampedAge = Math.max(13, Math.min(100, age));
  const ageGroup = ageGroupFromAge(clampedAge);

  const result: CalcResult | null = useMemo(
    () => (done ? calculate(country, ageGroup, usage, selected, clampedAge) : null),
    [done, country, ageGroup, usage, selected, clampedAge],
  );

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    setDone(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#06080d", color: "#e6edf3", fontFamily: "Inter,-apple-system,sans-serif" }}>
      {/* HERO */}
      <div style={{ textAlign: "center", padding: "60px 20px 30px" }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color: "#ff4444", marginBottom: 12 }}>OPEN SOURCE DATA VALUE ENGINE</div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 16 }}>
          How much does the internet{" "}
          <span style={{ background: "linear-gradient(135deg, #ff4444, #ff8800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>make from YOU?</span>
        </h1>
        <p style={{ fontSize: 16, color: "#8b949e", maxWidth: 560, margin: "0 auto 8px" }}>
          Every click, search, like, and scroll generates revenue. Tech giants report it in SEC filings.
          <br />We calculated <strong style={{ color: "#e6edf3" }}>your share</strong>. Spoiler: you get <strong style={{ color: "#ff4444" }}>$0</strong>.
        </p>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 16 }}>
          <div>
            <label style={lbl}>Country</label>
            <select value={country} onChange={e => { setCountry(e.target.value); setDone(false); }} style={inp}>
              {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Age</label>
            <input type="number" value={ageStr} min={13} max={100} onChange={e => { setAgeStr(e.target.value); setDone(false); }} onBlur={() => { if (age < 13) setAgeStr("13"); else if (age > 100) setAgeStr("100"); }} style={inp} />
            <div style={{ fontSize: 10, color: "#6e7681", marginTop: 3 }}>Ad demographic: {ageGroup}{clampedAge !== age ? ` (clamped to ${clampedAge})` : ""}</div>
          </div>
          <div>
            <label style={lbl}>Daily Usage</label>
            <select value={usage} onChange={e => { setUsage(e.target.value); setDone(false); }} style={inp}>
              <option value="light">Light (&lt;1h/day)</option>
              <option value="moderate">Moderate (2-4h)</option>
              <option value="heavy">Heavy (5-8h)</option>
              <option value="extreme">Extreme (8h+)</option>
            </select>
          </div>
        </div>

        <label style={{ ...lbl, marginBottom: 8, display: "block" }}>Your Platforms</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {PLATFORMS.map(p => {
            const on = selected.includes(p.id);
            return (
              <button key={p.id} type="button" onClick={() => toggle(p.id)} style={{
                padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: on ? 700 : 500, cursor: "pointer", outline: "none", transition: "all 0.15s",
                background: on ? p.color + "20" : "#161b22", color: on ? p.color : "#555",
                border: on ? `1.5px solid ${p.color}55` : "1.5px solid #21262d",
              }}>
                <span style={{ marginRight: 4 }}>{p.icon}</span>{p.name}
              </button>
            );
          })}
        </div>

        <button type="button" onClick={() => { if (selected.length === 0) return; setDone(true); setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 50); }} disabled={selected.length === 0} style={{
          width: "100%", padding: "14px 0", borderRadius: 8, fontWeight: 900, fontSize: 14,
          background: selected.length > 0 ? "linear-gradient(135deg, #ff4444, #ff6600)" : "#21262d", color: selected.length > 0 ? "#fff" : "#555",
          border: "none", cursor: selected.length > 0 ? "pointer" : "not-allowed", outline: "none", letterSpacing: 1, transition: "all 0.2s",
        }}>
          {selected.length > 0 ? "CALCULATE MY DATA PRICE TAG" : "SELECT AT LEAST ONE PLATFORM"}
        </button>
      </div>

      {/* RESULTS */}
      {result && (
        <div id="results" style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px 60px" }}>

          {/* BIG NUMBER */}
          <div style={{ textAlign: "center", padding: "40px 0 20px", borderTop: "1px solid #21262d" }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: "#888", marginBottom: 8 }}>ESTIMATED ANNUAL DATA VALUE</div>
            <div style={{ fontSize: "clamp(48px, 10vw, 80px)", fontWeight: 900, lineHeight: 1, background: "linear-gradient(135deg, #ff4444, #ff8800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ${fmt(result.annualTotal)}
            </div>
            <div style={{ fontSize: 16, color: "#888", marginTop: 4 }}>per year</div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
              <Chip label="You receive" value="$0" color="#ff4444" />
              <Chip label="Per day" value={`$${fmtD(result.dailyTotal)}`} color="#ff8800" />
              <Chip label="Per hour online" value={`$${fmtD(result.perHour)}`} color="#f0a030" />
            </div>
          </div>

          {/* LIFETIME */}
          <div style={{ textAlign: "center", padding: "30px 0", borderTop: "1px solid #21262d" }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: "#888", marginBottom: 8 }}>ESTIMATED LIFETIME DATA VALUE</div>
            <div style={{ fontSize: "clamp(36px, 7vw, 60px)", fontWeight: 900, color: "#ff8800" }}>
              ${fmt(result.lifetimeTotal)}
            </div>
            <div style={{ fontSize: 14, color: "#888", marginTop: 4 }}>
              over your remaining ~{Math.round(result.yearsLeft)} {Math.round(result.yearsLeft) === 1 ? "year" : "years"}
            </div>
            <div style={{ fontSize: 13, color: "#555", marginTop: 8 }}>
              That&apos;s equivalent to <strong style={{ color: "#e6edf3" }}>{getEquivalent(result.lifetimeTotal)}</strong>
            </div>
          </div>

          {/* PLATFORM BREAKDOWN */}
          <div style={{ padding: "20px 0", borderTop: "1px solid #21262d" }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: "#888", marginBottom: 14 }}>PLATFORM BREAKDOWN</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {result.platforms.map((p) => {
                const pct = result.annualTotal > 0 ? (p.annual / result.annualTotal) * 100 : 0;
                return (
                  <div key={p.id} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                    borderRadius: 8, background: "#0d1117", border: "1px solid #21262d",
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 6, display: "grid", placeItems: "center",
                      fontWeight: 900, fontSize: 11, background: p.color + "20", color: p.color,
                      border: `1px solid ${p.color}44`, flexShrink: 0,
                    }}>{p.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 700 }}>{p.name}</span>
                        <span style={{ fontSize: 14, fontWeight: 900, color: p.color }}>${fmt(p.annual)}<span style={{ fontSize: 9, fontWeight: 400, color: "#555" }}>/yr</span></span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, background: "#21262d", overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 2, width: pct + "%", background: `linear-gradient(90deg, ${p.color}88, ${p.color})`, transition: "width 0.5s" }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 9, color: "#555", flexShrink: 0, width: 40, textAlign: "right" }}>${fmtD(p.daily)}/d</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GLOBAL CONTEXT */}
          <div style={{ padding: "30px 0", borderTop: "1px solid #21262d" }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: "#888", marginBottom: 14 }}>THE BIGGER PICTURE</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
              <StatCard label="Global ad revenue (2024)" value={`$740B`} sub="per year" color="#58a6ff" />
              <StatCard label="Internet users" value="5.35B" sub="people" color="#3fb950" />
              <StatCard label="Fair share per person" value={`$${fmt(result.globalFairShare)}`} sub="if distributed equally" color="#f0a030" />
              <StatCard label="What you actually get" value="$0" sub="zero. nothing. nada." color="#ff4444" />
            </div>
          </div>

          {/* DAILY METAPHOR */}
          <div style={{ textAlign: "center", padding: "30px 20px", borderTop: "1px solid #21262d", borderBottom: "1px solid #21262d", marginBottom: 30 }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
              Your data earns someone else {result.coffeeEquiv}.
            </div>
            <div style={{ fontSize: 14, color: "#888" }}>
              Except you never see the coffee.
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", padding: "20px 0 40px" }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Built with real SEC filing data. 100% open source.</div>
            <a href="https://github.com/h4n0m4n/priceofme" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: 13,
              background: "#161b22", color: "#e6edf3", border: "1px solid #21262d", textDecoration: "none",
            }}>
              Star on GitHub
            </a>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "20px 20px 12px", borderTop: "1px solid #21262d", fontSize: 11, color: "#484f58", maxWidth: 700, margin: "0 auto" }}>
        <em>Your data has a price tag. You just never see it.</em>
        <div style={{ fontSize: 11, marginTop: 8, lineHeight: 1.6, color: "#6e7681" }}>
          <strong>Disclaimer:</strong> All figures are estimates derived from publicly available SEC 10-K filings, earnings reports,
          and industry research (Statista, Proton Privacy Report 2025). Actual per-user revenue varies based on individual behavior,
          ad targeting, and platform algorithms. This tool is for educational and awareness purposes only.
          Company names are used under nominative fair use for factual reporting. Not financial or legal advice.
          MIT License. No user data is collected.
        </div>
      </div>
    </div>
  );
}

const lbl: React.CSSProperties = { fontSize: 10, fontWeight: 800, color: "#888", letterSpacing: 1, marginBottom: 4, display: "block" };
const inp: React.CSSProperties = { width: "100%", background: "#161b22", border: "1px solid #21262d", borderRadius: 6, padding: "8px 10px", color: "#e6edf3", fontSize: 13, outline: "none", boxSizing: "border-box" };

function Chip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: "8px 16px", borderRadius: 8, background: color + "10", border: `1px solid ${color}30` }}>
      <div style={{ fontSize: 8, fontWeight: 800, color: "#888", letterSpacing: 1 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 900, color }}>{value}</div>
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div style={{ padding: "14px 16px", borderRadius: 10, background: "#0d1117", border: "1px solid #21262d" }}>
      <div style={{ fontSize: 9, color: "#555", fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 900, color }}>{value}</div>
      <div style={{ fontSize: 10, color: "#484f58", marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function plural(n: number, singular: string, pluralForm: string): string {
  return n === 1 ? `1 ${singular}` : `${n} ${pluralForm}`;
}

function getEquivalent(total: number): string {
  if (total <= 0) return "nothing (yet)";
  if (total >= 250000) return plural(Math.round(total / 250000), "median US house", "median US houses");
  if (total >= 67000) return "a house down payment";
  if (total >= 35000) return "a year of college tuition";
  if (total >= 5000) return plural(Math.round(total / 5000), "used car down payment", "used car down payments");
  if (total >= 1200) return plural(Math.round(total / 1200), "month of rent", "months of rent");
  if (total >= 350) return plural(Math.round(total / 350), "budget smartphone", "budget smartphones");
  return plural(Math.round(total / 5.5), "Big Mac", "Big Macs");
}
