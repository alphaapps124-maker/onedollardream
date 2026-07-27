import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function TransparencyPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/stats`);
        setStats(res.data);
      } catch (_) {}
    };
    fetchStats();
    const interval = setInterval(fetchStats, 20000);
    return () => clearInterval(interval);
  }, []);

  const metrics = stats
    ? [
        { label: "Total pledges", value: stats.total_pledges.toLocaleString(), sub: `${stats.progress_pct}% of 10,000 goal`, color: "text-[#E3FF00]" },
        { label: "Platform fee", value: `${stats.platform_fee_pct}%`, sub: "we take nothing", color: "text-[#4DD8FF]" },
        { label: "To grant winners", value: `${stats.grants_pct}%`, sub: "direct transfer", color: "text-white" },
        { label: "Operations", value: `${stats.operations_pct}%`, sub: "platform + growth", color: "text-[#4DD8FF]" },
        { label: "Cities represented", value: stats.unique_cities.toLocaleString(), sub: "and counting", color: "text-[#E3FF00]" },
        { label: "Countries", value: stats.unique_countries.toLocaleString(), sub: "worldwide", color: "text-white" },
      ]
    : [];

  const moneyFlow = [
    { label: "Member pays", amount: "$1.00", pct: "100%", color: "bg-white/10", textColor: "text-white" },
    { label: "Stripe processing", amount: "~$0.05", pct: "~5%", color: "bg-red-500/20", textColor: "text-red-400" },
    { label: "Hero Dream grant", amount: "$0.40", pct: "40%", color: "bg-[#E3FF00]/20", textColor: "text-[#E3FF00]" },
    { label: "Education Boost", amount: "$0.20", pct: "20%", color: "bg-[#4DD8FF]/20", textColor: "text-[#4DD8FF]" },
    { label: "Crisis Relief", amount: "$0.20", pct: "20%", color: "bg-[#057BC1]/20", textColor: "text-[#057BC1]" },
    { label: "Community Catalyst", amount: "$0.15", pct: "15%", color: "bg-white/5", textColor: "text-white/70" },
    { label: "Platform operations", amount: "$0.15", pct: "15%", color: "bg-white/5", textColor: "text-white/50" },
  ];

  const commitments = [
    "We will never take a platform fee or profit from the fund",
    "Monthly financial reports will be published publicly within 5 days of cycle close",
    "All grant transfers will show Stripe transaction IDs in the public report",
    "Grant winners are chosen by community vote with no editorial override",
    "All code that handles money will be open source and independently auditable",
    "No advertising, no data selling, no sponsorship that influences grant outcomes",
    "We will notify all pledgers if the 10,000 goal is not reached within 12 months",
    "If the platform shuts down, remaining funds are donated to verified charities",
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-[#083645] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-[#4DD8FF] mb-4 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            the numbers
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl text-white italic leading-tight mb-6">
            full transparency
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Every dollar traced. Every pledge counted. Every commitment published. This is what radical transparency looks like.
          </p>
        </div>
      </section>

      {/* Live metrics */}
      <section className="py-24 bg-[#0a2330]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-serif text-4xl text-white italic">live metrics</h2>
            <p className="text-white/40 text-sm mt-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Updates every 20 seconds from live database.
            </p>
          </div>
          {stats ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  data-testid={`transparency-metric-${i}`}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <p className={`text-4xl font-bold mb-1 ${m.color}`} style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {m.value}
                  </p>
                  <p className="text-white text-sm font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{m.label}</p>
                  <p className="text-white/30 text-xs mt-0.5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{m.sub}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {Array(6).fill(null).map((_, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">
                  <div className="h-9 bg-white/10 rounded mb-2 w-24" />
                  <div className="h-4 bg-white/5 rounded w-32" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Money flow */}
      <section className="py-24 bg-[#083645]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-serif text-4xl text-white italic mb-2">where your dollar goes</h2>
            <p className="text-white/50 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Per $1 collected from each member per month.
            </p>
          </div>

          <div className="space-y-3">
            {moneyFlow.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-xl px-5 py-4 ${item.color}`}
              >
                <span className="text-sm text-white/70" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {item.label}
                </span>
                <div className="flex items-center gap-4">
                  <span className={`font-semibold ${item.textColor}`} style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {item.amount}
                  </span>
                  <span className="text-xs text-white/30 w-10 text-right" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {item.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-24 bg-[#F4EDE4]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest text-[#057BC1] mb-3 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              our promise
            </p>
            <h2 className="font-serif text-4xl text-[#083645] italic">commitments we make</h2>
          </div>
          <div className="space-y-4">
            {commitments.map((c, i) => (
              <div
                key={i}
                data-testid={`commitment-${i}`}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm"
              >
                <span
                  className="w-6 h-6 rounded-full bg-[#E3FF00] flex items-center justify-center flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <ArrowRight size={12} className="text-[#083645]" />
                </span>
                <p className="text-[#083645]/80 text-sm leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {c}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
