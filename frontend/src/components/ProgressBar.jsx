import { useState, useEffect } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TARGET = 10000;

export default function ProgressBar({ showCount = true, className = "" }) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const fetchCount = async () => {
    try {
      const res = await axios.get(`${API}/pledge-count`);
      setCount(res.data.count);
    } catch (_) {}
  };

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const pct = Math.min((count / TARGET) * 100, 100);
  const remaining = TARGET - count;

  return (
    <div data-testid="progress-bar-container" className={`space-y-2 ${className}`}>
      {showCount && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            <span data-testid="pledge-count-number" className="text-white font-semibold">
              {count.toLocaleString()}
            </span>{" "}
            pledged
          </span>
          <span className="text-white/40 text-xs">
            {remaining.toLocaleString()} to go
          </span>
        </div>
      )}

      <div className="relative h-2.5 bg-white/10 rounded-full overflow-hidden">
        <div
          data-testid="progress-bar-fill"
          className="absolute inset-y-0 left-0 bg-[#E3FF00] rounded-full progress-fill"
          style={{ width: mounted ? `${pct}%` : "0%" }}
        />
        {/* Shimmer */}
        <div
          className="absolute inset-y-0 left-0 rounded-full opacity-30"
          style={{
            width: mounted ? `${pct}%` : "0%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-white/30">
        <span>0</span>
        <span className="text-[#E3FF00]/70 font-medium">
          {pct.toFixed(1)}% of goal
        </span>
        <span>10,000</span>
      </div>
    </div>
  );
}
