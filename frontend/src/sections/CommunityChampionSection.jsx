import { Trophy, Flame, Star } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "Top 10% engagement",
    description: "Champions are the most active members — they vote every cycle, nominate dreamers, refer friends, and volunteer to share winners' stories.",
    border: "border-l-[#E3FF00]",
  },
  {
    icon: Star,
    title: "Double vote weight",
    description: "In the Community Champion category, Champions' votes count twice. More engagement means more influence over who receives funding.",
    border: "border-l-[#4DD8FF]",
  },
  {
    icon: Trophy,
    title: "Earn points to qualify",
    description: "Vote (10pts), Nominate (15pts), Refer (25pts), Share (5pts), Volunteer to film winner (50pts). Top 10% earns Champion status monthly.",
    border: "border-l-[#057BC1]",
  },
];

export default function CommunityChampionSection() {
  return (
    <section
      id="champion"
      data-testid="community-champion-section"
      className="py-24 bg-[#083645]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <div className="relative">
            <div className="bg-[#0a2330] rounded-3xl p-10 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 dot-grid-bg opacity-50" />

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#E3FF00]/10 border border-[#E3FF00]/20 px-4 py-2 rounded-full">
                  <Trophy size={14} className="text-[#E3FF00]" />
                  <span className="text-[#E3FF00] text-xs font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    community champion
                  </span>
                </div>

                <h3 className="font-serif text-5xl text-white italic leading-tight">
                  the more you give,<br />
                  the more power<br />
                  <span className="text-[#E3FF00]">you earn.</span>
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Top engaged", value: "10%", color: "text-[#E3FF00]" },
                    { label: "Vote weight", value: "2×", color: "text-[#4DD8FF]" },
                    { label: "Referral pts", value: "25", color: "text-white" },
                    { label: "Volunteer pts", value: "50", color: "text-[#4DD8FF]" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className={`text-2xl font-bold mb-0.5 ${stat.color}`} style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-white/40" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#4DD8FF] mb-3 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                recognition
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-white italic leading-tight">
                community champions
              </h2>
              <p className="text-white/50 text-base leading-relaxed mt-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Our most engaged members earn a special status that amplifies their voice and contribution. Champions don't just give — they shape how the fund is distributed.
              </p>
            </div>

            <div className="space-y-5">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className={`border-l-4 pl-5 py-2 ${feat.border}`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <feat.icon size={16} className="text-white/60" />
                    <h4 className="text-white font-medium text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {feat.title}
                    </h4>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
