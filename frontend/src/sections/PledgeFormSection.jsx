import PledgeForm from "../components/PledgeForm";
import ProgressBar from "../components/ProgressBar";
import RecentPledges from "../components/RecentPledges";
import { ShieldCheck, Zap, Heart } from "lucide-react";

const trustPoints = [
  {
    Icon: ShieldCheck,
    title: "Conditional pledge",
    desc: "No money is ever taken until we reach 10,000 members. You can withdraw your pledge at any time before activation.",
  },
  {
    Icon: Zap,
    title: "Zero platform fee",
    desc: "Every cent of platform profit is zero. We operate on 15% of the fund — the rest goes directly to grant winners.",
  },
  {
    Icon: Heart,
    title: "Real people. Real dreams.",
    desc: "Grant applications are reviewed by the community. Winners are chosen by members, not a committee.",
  },
];

export default function PledgeFormSection() {
  return (
    <section
      id="pledge"
      data-testid="pledge-form-section"
      className="py-24 bg-[#F4EDE4]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Trust copy */}
          <div className="space-y-10 lg:pt-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#057BC1] mb-3 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                why it matters
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#083645] italic leading-tight">
                your dollar is just the beginning
              </h2>
            </div>
            <p className="text-[#083645]/70 text-base leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              When thousands of people each give $1, something remarkable happens. A fund that no single person could create alone materializes — and someone's dream gets funded this month.
            </p>

            <div className="space-y-6">
              {trustPoints.map((point, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#083645]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <point.Icon size={18} className="text-[#083645]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#083645] text-sm mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {point.title}
                    </h4>
                    <p className="text-[#083645]/60 text-sm leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pledge card */}
          <div className="bg-[#083645] rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-3xl italic text-white">
                join the pledge
              </h3>
              <p className="text-white/50 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Conditional — no payment until 10,000.
              </p>
            </div>

            {/* Progress */}
            <ProgressBar />

            {/* Form */}
            <PledgeForm compact />

            {/* Recent pledges */}
            <div className="border-t border-white/10 pt-6">
              <RecentPledges limit={4} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
