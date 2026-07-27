import { Star, BookOpen, LifeBuoy, Globe } from "lucide-react";

const categories = [
  {
    Icon: Star,
    name: "Hero Dream",
    tag: "flagship · most funded",
    description:
      "The most ambitious personal dream. One transformative story per month. This is the category that inspires everyone — and receives the largest single grant.",
    examples: ["Starting a business", "Recording an album", "Writing a book", "Building a community project"],
    allocation: "40%",
    cardClass: "bg-[#083645] text-white",
    tagClass: "bg-white/10 text-white/60",
    exampleClass: "bg-white/10 text-white/70",
    allocationClass: "text-[#E3FF00]",
    span: "lg:col-span-2",
  },
  {
    Icon: BookOpen,
    name: "Education Boost",
    tag: "learning",
    description:
      "Students, career-changers, and lifelong learners who need a financial push to keep going.",
    examples: ["Course fees", "Textbooks", "Certification exams"],
    allocation: "20%",
    cardClass: "bg-[#4DD8FF] text-[#083645]",
    tagClass: "bg-[#083645]/10 text-[#083645]/60",
    exampleClass: "bg-[#083645]/10 text-[#083645]/70",
    allocationClass: "text-[#083645]",
    span: "",
  },
  {
    Icon: LifeBuoy,
    name: "Crisis Relief",
    tag: "urgent",
    description:
      "Real people facing unexpected hardship — medical bills, job loss, emergency repairs — who need the community's support now.",
    examples: ["Medical expenses", "Emergency housing", "Unexpected loss"],
    allocation: "20%",
    cardClass: "bg-[#057BC1] text-white",
    tagClass: "bg-white/10 text-white/60",
    exampleClass: "bg-white/10 text-white/70",
    allocationClass: "text-[#E3FF00]",
    span: "",
  },
  {
    Icon: Globe,
    name: "Community Catalyst",
    tag: "local impact",
    description:
      "Local projects that create ripple effects — community gardens, mentorship programs, art spaces, neighborhood initiatives.",
    examples: ["Community garden", "Youth mentorship", "Art spaces"],
    allocation: "15%",
    cardClass: "bg-[#F4EDE4] text-[#083645] border border-[#083645]/10",
    tagClass: "bg-[#083645]/10 text-[#083645]/60",
    exampleClass: "bg-[#083645]/10 text-[#083645]/70",
    allocationClass: "text-[#057BC1]",
    span: "",
  },
  {
    Icon: null,
    name: "Champion's Choice",
    tag: "bonus",
    description:
      "5% of the fund is reserved for Community Champions — high-engagement members — to allocate freely to any cause they believe in.",
    examples: [],
    allocation: "5%",
    cardClass: "bg-[#E3FF00] text-[#083645]",
    tagClass: "bg-[#083645]/10 text-[#083645]/60",
    exampleClass: "bg-[#083645]/10 text-[#083645]/70",
    allocationClass: "text-[#083645]",
    span: "",
  },
];

export default function GrantCategoriesSection() {
  return (
    <section
      id="grants"
      data-testid="grant-categories-section"
      className="py-24 bg-[#F8F4ED]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[#057BC1] mb-3 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            grant categories
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl text-[#083645] italic">
            what dreams get funded
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Hero Dream spans 2 columns */}
          {categories.map((cat, i) => (
            <div
              key={i}
              data-testid={`grant-category-${i}`}
              className={`rounded-2xl p-7 hover:-translate-y-1 transition-transform duration-300 cursor-default ${cat.cardClass} ${cat.span}`}
            >
              <div className="flex items-start justify-between mb-4">
                {cat.Icon && (
                  <div className="w-10 h-10 rounded-xl bg-current/10 flex items-center justify-center opacity-60">
                    <cat.Icon size={18} />
                  </div>
                )}
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ml-auto ${cat.tagClass}`} style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {cat.tag}
                </span>
              </div>

              <h3 className="font-serif text-2xl italic mb-2">{cat.name}</h3>
              <p className="text-sm leading-relaxed opacity-70 mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {cat.description}
              </p>

              {cat.examples.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cat.examples.map((ex, j) => (
                    <span
                      key={j}
                      className={`text-xs px-2.5 py-1 rounded-lg ${cat.exampleClass}`}
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto pt-4 border-t border-current/10">
                <span className={`text-3xl font-bold ${cat.allocationClass}`} style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {cat.allocation}
                </span>
                <span className="text-xs opacity-50 ml-1.5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>of fund</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
