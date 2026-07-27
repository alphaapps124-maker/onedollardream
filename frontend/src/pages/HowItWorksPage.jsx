import { Link } from "react-router-dom";
import RoadJourneySection from "../sections/RoadJourneySection";
import { ShieldCheck, Eye, Users, BarChart3, Lock } from "lucide-react";

const trustPillars = [
  {
    Icon: ShieldCheck,
    title: "Conditional pledges",
    description: "No money is ever charged until 10,000 people have pledged. If the goal isn't met in 12 months, every pledge simply expires.",
    bg: "bg-[#083645]",
    textColor: "text-white",
    iconBg: "bg-[#E3FF00]/10",
    iconColor: "text-[#E3FF00]",
  },
  {
    Icon: Eye,
    title: "Full transparency",
    description: "Monthly reports published showing every dollar in and every dollar out. Our code is open for audit. Zero hidden fees.",
    bg: "bg-[#E3FF00]",
    textColor: "text-[#083645]",
    iconBg: "bg-[#083645]/10",
    iconColor: "text-[#083645]",
  },
  {
    Icon: Users,
    title: "Community governance",
    description: "No committee, no editorial board. Grant winners are chosen 100% by community vote — every paid member has a voice.",
    bg: "bg-[#4DD8FF]",
    textColor: "text-[#083645]",
    iconBg: "bg-[#083645]/10",
    iconColor: "text-[#083645]",
  },
  {
    Icon: BarChart3,
    title: "Impact-first metrics",
    description: "We measure success by the number of dreams funded, community size, and engagement — not profit margins.",
    bg: "bg-[#057BC1]",
    textColor: "text-white",
    iconBg: "bg-white/10",
    iconColor: "text-white",
  },
  {
    Icon: Lock,
    title: "Stripe-secured payments",
    description: "When payments activate, all transactions are handled by Stripe — the same infrastructure used by millions of businesses worldwide.",
    bg: "bg-[#F4EDE4]",
    textColor: "text-[#083645]",
    iconBg: "bg-[#083645]/10",
    iconColor: "text-[#083645]",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-[#083645] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-[#4DD8FF] mb-4 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            the model
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl text-white italic leading-tight mb-6">
            how it works
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            One Dollar Dream is built on a simple idea: collective micro-giving, governed by the community, with radical financial transparency.
          </p>
        </div>
      </section>

      {/* Road Journey expanded */}
      <RoadJourneySection />

      {/* Trust & Integrity */}
      <section className="py-24 bg-[#F4EDE4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-[#057BC1] mb-3 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              our commitments
            </p>
            <h2 className="font-serif text-5xl text-[#083645] italic">
              built on trust
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trustPillars.map((pillar, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300 ${pillar.bg} ${pillar.textColor}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${pillar.iconBg}`}>
                  <pillar.Icon size={20} className={pillar.iconColor} />
                </div>
                <h3 className="font-serif text-2xl italic mb-3">{pillar.title}</h3>
                <p className="text-sm leading-relaxed opacity-70" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a2330] text-center relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg" />
        <div className="relative z-10 max-w-xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-white italic mb-4">ready to pledge?</h2>
          <p className="text-white/50 mb-8 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Join thousands already committed to making dreams real.
          </p>
          <Link
            to="/#pledge"
            data-testid="how-it-works-cta-btn"
            className="inline-block bg-[#E3FF00] text-[#083645] px-8 py-4 rounded-full font-semibold hover:bg-[#E3FF00]/90 transition-colors duration-200"
          >
            sign the pledge
          </Link>
        </div>
      </section>
    </div>
  );
}
