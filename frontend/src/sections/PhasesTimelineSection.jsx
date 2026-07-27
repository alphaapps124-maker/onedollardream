const phases = [
  {
    number: "01",
    title: "Pre-launch",
    milestone: "0 → 10,000 pledges",
    status: "current",
    description: "Building the foundation. Email pledges only. Community forming around a shared goal.",
    highlights: ["Email pledge collection", "Referral system active", "Community building", "Platform development"],
    color: "#E3FF00",
    textColor: "#083645",
  },
  {
    number: "02",
    title: "First grant cycle",
    milestone: "10,000 pledges activated",
    status: "upcoming",
    description: "Payments activate via Stripe. Pitch submissions open. First voting cycle. First dreams funded.",
    highlights: ["Stripe payment activation", "Pitch portal opens", "First community vote", "First grant winners"],
    color: "#4DD8FF",
    textColor: "#083645",
  },
  {
    number: "03",
    title: "Growing",
    milestone: "10,000+ active members",
    status: "future",
    description: "All 4 grant categories active. Community Champion system unlocked. Monthly cycles running.",
    highlights: ["All categories active", "Champion system live", "Monthly cycles", "Transparency reports"],
    color: "#057BC1",
    textColor: "white",
  },
  {
    number: "04",
    title: "Expanding",
    milestone: "25,000 members",
    status: "future",
    description: "Hero Dream grant increases. More winners per cycle. Nomination system goes live.",
    highlights: ["Larger Hero Dream grant", "More winners/cycle", "Nomination portal", "Partner integrations"],
    color: "#083645",
    textColor: "white",
  },
  {
    number: "05",
    title: "Scaling",
    milestone: "50,000 members",
    status: "future",
    description: "Regional categories added. $40,000+ monthly grant pool. Video stories of winners published.",
    highlights: ["Regional categories", "$40k+ monthly pool", "Winner video stories", "Impact dashboard"],
    color: "#E3FF00",
    textColor: "#083645",
  },
  {
    number: "06",
    title: "National",
    milestone: "100,000 members",
    status: "future",
    description: "Large-scale grants. Full engagement system. Nonprofit partnerships. Transparent public reporting.",
    highlights: ["$80k+ monthly grants", "Nonprofit partnerships", "Public impact reports", "Expanded categories"],
    color: "#4DD8FF",
    textColor: "#083645",
  },
  {
    number: "07",
    title: "Global",
    milestone: "500,000+ members",
    status: "future",
    description: "International grants across borders. Multiple currency support. A truly global giving movement.",
    highlights: ["Global grant distribution", "Multi-currency", "International partners", "Movement recognition"],
    color: "#083645",
    textColor: "white",
  },
];

export default function PhasesTimelineSection() {
  return (
    <section
      id="phases"
      data-testid="phases-timeline-section"
      className="py-24 bg-[#0a2330] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[#4DD8FF] mb-3 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            the roadmap
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl text-white italic">
            from pledge to possibility
          </h2>
        </div>

        {/* Horizontal scroll on desktop */}
        <div className="phases-scroll overflow-x-auto scrollbar-hide pb-6 -mx-6 px-6">
          <div className="flex gap-5 md:gap-6 min-w-max">
            {phases.map((phase, i) => (
              <div
                key={i}
                data-testid={`phase-card-${i}`}
                className="phase-card-snap rounded-2xl p-7 w-72 md:w-80 flex-shrink-0 relative overflow-hidden"
                style={{ backgroundColor: phase.color, color: phase.textColor }}
              >
                {phase.status === "current" && (
                  <div
                    className="absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.2)",
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    you are here
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <p
                      className="text-5xl font-bold opacity-20 mb-1"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {phase.number}
                    </p>
                    <h3 className="font-serif text-2xl italic">{phase.title}</h3>
                    <p
                      className="text-xs font-medium mt-1 opacity-60"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {phase.milestone}
                    </p>
                  </div>

                  <p
                    className="text-sm leading-relaxed opacity-70"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {phase.description}
                  </p>

                  <ul className="space-y-1.5">
                    {phase.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-xs opacity-70"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        <span className="w-1 h-1 rounded-full bg-current opacity-60 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs mt-4 text-center" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          scroll to explore all 7 phases →
        </p>
      </div>
    </section>
  );
}
