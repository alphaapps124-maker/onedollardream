import { Link } from "react-router-dom";
import { Star, BookOpen, LifeBuoy, Globe } from "lucide-react";

const categories = [
  {
    Icon: Star,
    name: "Hero Dream",
    allocation: "40%",
    description:
      "The flagship category. One transformative personal dream per month. The biggest single grant — because some stories deserve to be told on the largest possible stage.",
    examples: [
      "Starting a business you've always believed in",
      "Recording an album that deserves to exist",
      "Writing the book that's been inside you for years",
      "Building a community project that changes your neighborhood",
      "Pursuing a career change that requires a leap of faith",
    ],
    bg: "bg-[#083645]",
    textColor: "text-white",
    accentColor: "#E3FF00",
  },
  {
    Icon: BookOpen,
    name: "Education Boost",
    allocation: "20%",
    description:
      "For students, career-changers, and lifelong learners who just need a financial push to keep going. Education shouldn't stop because of money.",
    examples: [
      "University tuition for the first semester",
      "Coding bootcamp fees",
      "Professional certification exams",
      "Essential textbooks and course materials",
      "Tools needed to learn a craft",
    ],
    bg: "bg-[#4DD8FF]",
    textColor: "text-[#083645]",
    accentColor: "#083645",
  },
  {
    Icon: LifeBuoy,
    name: "Crisis Relief",
    allocation: "20%",
    description:
      "Real people facing real emergencies. Medical bills, sudden job loss, unexpected repairs — the community rallies around those who need support right now.",
    examples: [
      "Unexpected medical expenses",
      "Emergency housing after losing a home",
      "Vehicle repairs needed to keep working",
      "Bridging income after sudden job loss",
      "Crisis mental health support costs",
    ],
    bg: "bg-[#057BC1]",
    textColor: "text-white",
    accentColor: "#E3FF00",
  },
  {
    Icon: Globe,
    name: "Community Catalyst",
    allocation: "15%",
    description:
      "Local projects that create ripple effects far beyond their immediate impact. The garden that feeds a block. The mentorship program that changes a generation.",
    examples: [
      "Community garden in a food desert",
      "Free coding club for kids",
      "Neighborhood art space or gallery",
      "Youth mentorship program",
      "Local environmental initiative",
    ],
    bg: "bg-[#F4EDE4]",
    textColor: "text-[#083645]",
    accentColor: "#057BC1",
  },
];

const scalingTable = [
  { phase: "Phase 1", members: "10,000", monthly: "$8,500", winners: "4–5", perWinner: "~$1,700" },
  { phase: "Phase 2", members: "15,000", monthly: "$12,750", winners: "6–8", perWinner: "~$1,800" },
  { phase: "Phase 3", members: "25,000", monthly: "$21,250", winners: "10–12", perWinner: "~$1,900" },
  { phase: "Phase 4", members: "50,000", monthly: "$42,500", winners: "15–18", perWinner: "~$2,500" },
  { phase: "Phase 5", members: "100,000", monthly: "$85,000", winners: "20–25", perWinner: "~$3,800" },
  { phase: "Phase 6", members: "250,000", monthly: "$212,500", winners: "40–50", perWinner: "~$4,800" },
  { phase: "Phase 7", members: "500,000+", monthly: "$425,000+", winners: "80–100+", perWinner: "~$5,000+" },
];

export default function GrantsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-[#083645] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-[#E3FF00] mb-4 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            the grants
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl text-white italic leading-tight mb-6">
            what gets funded
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Four categories. Community-voted. Monthly cycles. Every dollar traced. Every winner celebrated.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-[#F8F4ED]">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              data-testid={`grants-category-${i}`}
              className={`rounded-3xl p-10 md:p-14 ${cat.bg} ${cat.textColor}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${cat.accentColor}20` }}
                    >
                      <cat.Icon size={22} style={{ color: cat.accentColor }} />
                    </div>
                    <div>
                      <h2 className="font-serif text-3xl italic">{cat.name}</h2>
                      <p className="text-xs font-medium opacity-50 mt-0.5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {cat.allocation} of monthly fund
                      </p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed opacity-75" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {cat.description}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-40 mb-4 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    example pitches
                  </p>
                  <ul className="space-y-2.5">
                    {cat.examples.map((ex, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm opacity-70" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: cat.accentColor }} />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scaling table */}
      <section className="py-24 bg-[#0a2330]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-[#4DD8FF] mb-3 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              as we grow
            </p>
            <h2 className="font-serif text-5xl text-white italic">grant scaling</h2>
            <p className="text-white/50 mt-4 text-sm max-w-xl mx-auto" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Every new member directly increases the monthly grant pool. This is how collective giving scales.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table data-testid="scaling-table" className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  {["Phase", "Members", "Monthly pool", "Winners", "Per winner"].map((h) => (
                    <th key={h} className="px-5 py-4 text-left text-xs uppercase tracking-wider text-white/40 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scalingTable.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/5 last:border-0 transition-colors duration-150 hover:bg-white/5 ${
                      i === 0 ? "bg-[#E3FF00]/5" : ""
                    }`}
                  >
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium text-white/40" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {row.phase}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-white text-sm font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{row.members}</td>
                    <td className="px-5 py-4">
                      <span className="text-[#E3FF00] font-semibold text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{row.monthly}</span>
                    </td>
                    <td className="px-5 py-4 text-white/70 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{row.winners}</td>
                    <td className="px-5 py-4 text-[#4DD8FF] text-sm font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{row.perWinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-white/30 text-xs mt-4 text-center" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Based on 85% of collected funds distributed to winners. Exact amounts depend on final member count per cycle.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#083645] text-center relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg" />
        <div className="relative z-10 max-w-xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-white italic mb-4">help make this real</h2>
          <p className="text-white/50 mb-8 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Pledge $1/month. Build the fund that funds dreams.
          </p>
          <Link
            to="/#pledge"
            data-testid="grants-cta-btn"
            className="inline-block bg-[#E3FF00] text-[#083645] px-8 py-4 rounded-full font-semibold hover:bg-[#E3FF00]/90 transition-colors duration-200"
          >
            sign the pledge
          </Link>
        </div>
      </section>
    </div>
  );
}
