const phases = [
  {
    number: "01",
    title: "Pre-launch",
    milestone: "0 → 10,000 conditional pledges",
    status: "current",
    color: "#E3FF00",
    textColor: "#083645",
    description:
      "The foundation phase. We're building community before asking for commitment. Email pledges are free, conditional, and cancellable at any time.",
    details: [
      "Pledge form live — name, email, city (optional)",
      "Referral system tracks who brought whom",
      "Live pledge counter and progress toward 10,000",
      "Community Champion points system built (activates next phase)",
      "Pitch submission portal in development",
      "No payments. No accounts. No pressure.",
    ],
  },
  {
    number: "02",
    title: "First Grant Cycle",
    milestone: "10,000 pledges → payment activation",
    status: "upcoming",
    color: "#4DD8FF",
    textColor: "#083645",
    description:
      "The activation moment. All pledgers receive an email to confirm their $1/month via Stripe. The pitch portal opens. The first vote runs. The first dream gets funded.",
    details: [
      "Stripe payment activation for all pledgers",
      "Pitch submission portal opens",
      "First 30-day pitch review period",
      "Community voting opens — one vote per category",
      "Winners announced and paid via Stripe instant transfer",
      "First monthly transparency report published",
    ],
  },
  {
    number: "03",
    title: "Growing",
    milestone: "10,000+ active paid members",
    status: "future",
    color: "#057BC1",
    textColor: "white",
    description:
      "Monthly cycles now run continuously. All four grant categories are active. Community Champions have double vote weight. The ecosystem is self-sustaining.",
    details: [
      "All 4 categories active (Hero Dream, Education, Crisis, Catalyst)",
      "Community Champion system fully live",
      "Monthly nomination portal opens",
      "Referral bonuses applied retroactively",
      "Public impact reports on website",
      "Winner video stories (volunteer-filmed)",
    ],
  },
  {
    number: "04",
    title: "Expanding",
    milestone: "25,000 active members",
    status: "future",
    color: "#083645",
    textColor: "white",
    description:
      "The Hero Dream grant grows significantly. More winners per cycle. Nomination system goes fully live allowing any member to nominate anyone — not just self-applications.",
    details: [
      "Hero Dream grant increases to ~$3,000",
      "10–12 winners per monthly cycle",
      "Full nomination portal live",
      "Nomination tracking and notification system",
      "Volunteer Champion film crew program expands",
      "Partner organization integrations",
    ],
  },
  {
    number: "05",
    title: "Scaling",
    milestone: "50,000 active members",
    status: "future",
    color: "#E3FF00",
    textColor: "#083645",
    description:
      "Regional grant categories introduced. $40,000+ monthly pool. Every winner's story is professionally documented and shared with the community.",
    details: [
      "Regional categories added (by continent/country)",
      "$40,000+ monthly grant pool",
      "Professional winner documentation",
      "Impact dashboard with cumulative statistics",
      "API access for journalists and researchers",
      "Annual impact report publication",
    ],
  },
  {
    number: "06",
    title: "National",
    milestone: "100,000 active members",
    status: "future",
    color: "#4DD8FF",
    textColor: "#083645",
    description:
      "Large-scale grants with significant individual impact. Nonprofit partnerships established. Full public transparency and audited financial reports.",
    details: [
      "$85,000+ monthly grant pool",
      "20–25 winners per cycle",
      "Formal nonprofit status filing",
      "Third-party financial audits",
      "Nonprofit and NGO partnerships",
      "Government grant matching exploration",
    ],
  },
  {
    number: "07",
    title: "Global",
    milestone: "500,000+ members worldwide",
    status: "future",
    color: "#083645",
    textColor: "white",
    description:
      "A truly international movement. Multi-currency support. Cross-border grants. One Dollar Dream becomes a recognized name in the global giving ecosystem.",
    details: [
      "$425,000+ monthly distributed worldwide",
      "Multi-currency and international payment support",
      "80–100+ monthly grant winners globally",
      "International media recognition",
      "Cross-border dream funding",
      "Permanent endowment fund established",
    ],
  },
];

export default function PhasesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-[#0a2330] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-[#4DD8FF] mb-4 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            the roadmap
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl text-white italic leading-tight mb-6">
            seven phases
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            From the first email pledge to a global giving movement. Here's exactly how One Dollar Dream scales.
          </p>
        </div>
      </section>

      {/* Phase cards */}
      <section className="py-24 bg-[#F8F4ED]">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {phases.map((phase, i) => (
            <div
              key={i}
              data-testid={`phase-detail-${i}`}
              className="rounded-3xl overflow-hidden shadow-sm"
            >
              {/* Card header */}
              <div
                className="p-8 md:p-10"
                style={{ backgroundColor: phase.color, color: phase.textColor }}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span
                      className="text-6xl font-bold opacity-15 block leading-none mb-2"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {phase.number}
                    </span>
                    <h2 className="font-serif text-4xl italic">{phase.title}</h2>
                    <p
                      className="text-sm font-medium mt-2 opacity-60"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {phase.milestone}
                    </p>
                  </div>
                  {phase.status === "current" && (
                    <span
                      className="text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.15)",
                        fontFamily: "Space Grotesk, sans-serif",
                      }}
                    >
                      current phase
                    </span>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div className="bg-white p-8 md:p-10">
                <p className="text-[#083645]/70 text-base leading-relaxed mb-8" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {phase.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {phase.details.map((detail, j) => (
                    <div key={j} className="flex items-start gap-2.5 text-sm text-[#083645]/70" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: phase.color === "#E3FF00" ? "#083645" : phase.color }}
                      />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
