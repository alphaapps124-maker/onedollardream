import { DollarSign, Share2, Users, CheckSquare, Sparkles } from "lucide-react";

const steps = [
  {
    Icon: DollarSign,
    title: "Pledge your dollar",
    description:
      "Make a simple monthly commitment of $1. No payment is ever taken until we reach 10,000 pledges. Cancel your conditional pledge anytime.",
    cardBg: "#083645",
    cardText: "white",
    nodeBg: "#E3FF00",
    nodeText: "#083645",
    tag: "start here",
  },
  {
    Icon: Share2,
    title: "Share your link",
    description:
      "Every pledge comes with a unique referral link. Each person who joins through your link earns you Community Champion points — giving your voice more power.",
    cardBg: "#E3FF00",
    cardText: "#083645",
    nodeBg: "#083645",
    nodeText: "#E3FF00",
    tag: "spread the word",
  },
  {
    Icon: Users,
    title: "The community grows",
    description:
      "10,000 pledges is the magic number. Once reached, we activate secure payments, open the pitch portal, and launch the very first grant cycle.",
    cardBg: "#4DD8FF",
    cardText: "#083645",
    nodeBg: "#083645",
    nodeText: "#4DD8FF",
    tag: "collective power",
  },
  {
    Icon: CheckSquare,
    title: "Members vote on dreams",
    description:
      "Every paid member votes on pitches each month. Community Champions — the top 10% most engaged — carry double vote weight. Your engagement truly matters.",
    cardBg: "#057BC1",
    cardText: "white",
    nodeBg: "#E3FF00",
    nodeText: "#083645",
    tag: "democratic giving",
  },
  {
    Icon: Sparkles,
    title: "Dreams get funded",
    description:
      "Monthly grants go directly to real people with real dreams. 85 cents from every dollar reaches the winners. Zero percent goes to the platform — ever.",
    cardBg: "#083645",
    cardText: "white",
    nodeBg: "#4DD8FF",
    nodeText: "#083645",
    tag: "impact delivered",
  },
];

function StepCard({ step, side }) {
  return (
    <div
      className={`rounded-2xl p-7 shadow-sm hover:-translate-y-2 transition-transform duration-300 cursor-default ${
        side === "right" ? "ml-auto" : ""
      }`}
      style={{ backgroundColor: step.cardBg, color: step.cardText }}
    >
      <span
        className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4 opacity-60"
        style={{
          backgroundColor: step.cardText === "white" ? "rgba(255,255,255,0.15)" : "rgba(8,54,69,0.12)",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        {step.tag}
      </span>
      <h3
        className="font-serif text-2xl italic mb-3"
        style={{ color: step.cardText }}
      >
        {step.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: step.cardText, opacity: 0.75, fontFamily: "Space Grotesk, sans-serif" }}
      >
        {step.description}
      </p>
    </div>
  );
}

export default function RoadJourneySection() {
  return (
    <section
      id="how-it-works"
      data-testid="road-journey-section"
      className="py-24 bg-[#F8F4ED] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-widest text-[#057BC1] mb-3 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            the journey
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl text-[#083645] italic">
            how the dream unfolds
          </h2>
        </div>

        {/* Road with steps */}
        <div className="relative">
          {/* Center dashed vertical line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{
              width: "2px",
              borderLeft: "2px dashed rgba(8, 54, 69, 0.2)",
            }}
          />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0; // card on left

              return (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-0`}
                >
                  {/* Left column */}
                  <div className="w-full md:w-5/12 md:pr-10">
                    {isLeft ? (
                      <StepCard step={step} />
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>

                  {/* Center node */}
                  <div className="md:w-2/12 flex justify-center relative z-10">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                      style={{ backgroundColor: step.nodeBg, color: step.nodeText }}
                    >
                      <step.Icon size={22} />
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="w-full md:w-5/12 md:pl-10">
                    {!isLeft && <StepCard step={step} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
