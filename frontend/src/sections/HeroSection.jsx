import PledgeForm from "../components/PledgeForm";
import LiveTicker from "../components/LiveTicker";
import ProgressBar from "../components/ProgressBar";

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="min-h-screen bg-[#0a2330] relative overflow-hidden flex items-center pt-16"
    >
      {/* Dotted grid background */}
      <div className="absolute inset-0 dot-grid-bg opacity-100" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2330]/20 via-transparent to-[#0a2330]" />

      {/* Floating accent shapes */}
      <div className="absolute top-24 right-12 w-64 h-64 rounded-full bg-[#083645] blur-3xl opacity-60" />
      <div className="absolute bottom-24 left-12 w-48 h-48 rounded-full bg-[#057BC1]/20 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#E3FF00] animate-pulse-dot" />
              <span className="text-white/70 text-xs font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                pre-launch · collecting pledges
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1
                className="font-serif text-6xl sm:text-7xl lg:text-8xl text-white leading-none tracking-tight"
              >
                <span className="block">one dollar.</span>
                <span className="block italic text-[#E3FF00]">one dream.</span>
                <span className="block text-white/60">one community.</span>
              </h1>
            </div>

            <p
              className="text-white/60 text-lg leading-relaxed max-w-md"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Pledge $1/month. When 10,000 people do the same, we create a $10,000 monthly grant fund — and start making dreams real.
            </p>

            {/* Progress */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 max-w-sm">
              <ProgressBar />
            </div>

            {/* Live ticker */}
            <LiveTicker className="text-sm" />
          </div>

          {/* Right: Pledge form */}
          <div id="pledge" className="space-y-4">
            <div className="bg-[#083645]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="mb-6">
                <h2
                  className="font-serif text-2xl text-white italic"
                >
                  sign the pledge
                </h2>
                <p className="text-white/50 text-sm mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Conditional — no charge until we hit 10,000.
                </p>
              </div>
              <PledgeForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8F4ED] to-transparent" />
    </section>
  );
}
