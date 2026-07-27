import { useState } from "react";
import { Play } from "lucide-react";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  // YouTube video placeholder - a relevant public video
  const videoId = "1Xf-ixUDOSo"; // "The Power of Community" placeholder

  return (
    <section
      id="video"
      data-testid="video-section"
      className="py-24 bg-[#F8F4ED]"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-[#057BC1] mb-3 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            the vision
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl text-[#083645] italic">
            see the dream
          </h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden aspect-video bg-[#083645] shadow-2xl">
          {!playing ? (
            <>
              {/* Thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#083645] via-[#0a2330] to-[#083645] dot-grid-bg" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                <div className="space-y-2 text-center px-8">
                  <p className="text-[#4DD8FF] text-xs uppercase tracking-widest font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    coming soon
                  </p>
                  <h3 className="font-serif text-4xl text-white italic">
                    our story is being written
                  </h3>
                  <p className="text-white/50 text-sm max-w-sm mx-auto" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Watch this space. As the community grows, we'll share the stories of every dream we fund.
                  </p>
                </div>

                <button
                  data-testid="video-play-btn"
                  onClick={() => setPlaying(true)}
                  className="w-16 h-16 rounded-full bg-[#E3FF00] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-xl"
                >
                  <Play size={24} className="text-[#083645] ml-1" fill="currentColor" />
                </button>

                <p className="text-white/30 text-xs" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Preview video
                </p>
              </div>
            </>
          ) : (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="One Dollar Dream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
}
