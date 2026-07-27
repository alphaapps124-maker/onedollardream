const metrics = [
  { value: "0%", label: "platform fee", sub: "we take nothing" },
  { value: "85%", label: "to grant winners", sub: "direct transfer" },
  { value: "15%", label: "operations", sub: "platform + growth" },
  { value: "10,000", label: "pledge target", sub: "before activation" },
  { value: "100%", label: "transparent", sub: "monthly reports" },
];

export default function TrustStripSection() {
  return (
    <section
      data-testid="trust-strip-section"
      className="bg-[#083645] py-12 border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {metrics.map((m, i) => (
            <div
              key={i}
              data-testid={`trust-metric-${i}`}
              className={`text-center py-4 ${i < metrics.length - 1 ? "md:border-r md:border-white/10" : ""}`}
            >
              <p
                className="text-3xl font-bold text-[#E3FF00] mb-1"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {m.value}
              </p>
              <p className="text-white text-sm font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {m.label}
              </p>
              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {m.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
