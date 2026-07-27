import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { Lock, ArrowRight } from "lucide-react";

export default function SubmitPitchPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-[#0a2330] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={24} className="text-white/40" />
          </div>
          <p className="text-xs uppercase tracking-widest text-[#4DD8FF] mb-4 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            coming soon
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl text-white italic leading-tight mb-6">
            submit a pitch
          </h1>
          <p className="text-white/60 text-lg leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            The pitch portal opens at 10,000 pledges. We're collecting submissions from the moment the community activates. Your dream is worth it — it just needs a little more company first.
          </p>
        </div>
      </section>

      {/* Progress + CTA */}
      <section className="py-24 bg-[#083645]">
        <div className="max-w-2xl mx-auto px-6 space-y-10">
          <div className="text-center">
            <h2 className="font-serif text-4xl text-white italic mb-3">how close are we?</h2>
            <p className="text-white/50 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Every pledge brings the pitch portal one step closer.
            </p>
          </div>

          <ProgressBar />

          <div className="text-center space-y-4">
            <p className="text-white/60 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Want to be first to submit when the portal opens? Pledge now and we'll notify you the moment it goes live.
            </p>
            <Link
              to="/#pledge"
              data-testid="submit-pitch-pledge-btn"
              className="inline-flex items-center gap-2 bg-[#E3FF00] text-[#083645] px-8 py-4 rounded-full font-semibold hover:bg-[#E3FF00]/90 transition-colors duration-200"
            >
              sign the pledge <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Grant categories preview */}
      <section className="py-24 bg-[#F4EDE4]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-[#083645] italic mb-3 text-center">
            categories opening soon
          </h2>
          <p className="text-[#083645]/50 text-sm text-center mb-12" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Start thinking about which category fits your story.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Hero Dream", desc: "Your most ambitious personal dream. Any category, any size.", color: "bg-[#083645] text-white", pct: "40%" },
              { name: "Education Boost", desc: "Funding to pursue knowledge, skills, or credentials.", color: "bg-[#4DD8FF] text-[#083645]", pct: "20%" },
              { name: "Crisis Relief", desc: "Emergency support for unexpected hardship.", color: "bg-[#057BC1] text-white", pct: "20%" },
              { name: "Community Catalyst", desc: "Local projects that ripple outward.", color: "bg-[#E3FF00] text-[#083645]", pct: "15%" },
            ].map((cat, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 ${cat.color}`}
              >
                <h3 className="font-serif text-xl italic mb-2">{cat.name}</h3>
                <p className="text-sm opacity-70 leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {cat.desc}
                </p>
                <p className="text-2xl font-bold mt-4 opacity-80" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {cat.pct}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/grants"
              className="text-sm text-[#057BC1] hover:text-[#083645] transition-colors duration-200 underline"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              learn more about each category →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
