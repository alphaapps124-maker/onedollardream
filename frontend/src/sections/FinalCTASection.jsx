import PledgeForm from "../components/PledgeForm";
import LiveTicker from "../components/LiveTicker";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";

export default function FinalCTASection() {
  return (
    <section
      id="final-cta"
      data-testid="final-cta-section"
      className="py-28 bg-[#0a2330] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a2330]/50 to-[#0a2330]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-[#4DD8FF] mb-4 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          join the movement
        </p>

        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white italic leading-tight mb-6">
          one dollar.
          <br />
          <span className="text-[#E3FF00]">infinite possibility.</span>
        </h2>

        <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Every name on this list is a step closer to the first grant. Add yours.
        </p>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-8">
          <ProgressBar />
        </div>

        {/* Live ticker */}
        <div className="flex justify-center mb-10">
          <LiveTicker />
        </div>

        {/* Form */}
        <div className="max-w-lg mx-auto">
          <PledgeForm />
        </div>

        <p className="text-white/20 text-xs mt-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Have questions?{" "}
          <Link to="/contact" className="underline hover:text-white/50 transition-colors duration-200">
            Get in touch
          </Link>
        </p>
      </div>
    </section>
  );
}
