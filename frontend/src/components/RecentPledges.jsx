import { useState, useEffect } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const AVATAR_COLORS = [
  "bg-[#E3FF00] text-[#083645]",
  "bg-[#4DD8FF] text-[#083645]",
  "bg-[#057BC1] text-white",
  "bg-[#083645] text-white",
];

const SEED_RECENT = [
  { full_name: "Sarah M.", city: "London", created_at: new Date(Date.now() - 120000).toISOString() },
  { full_name: "James K.", city: "Toronto", created_at: new Date(Date.now() - 300000).toISOString() },
  { full_name: "Priya S.", city: "Mumbai", created_at: new Date(Date.now() - 600000).toISOString() },
  { full_name: "Alex R.", city: "New York", created_at: new Date(Date.now() - 900000).toISOString() },
];

export default function RecentPledges({ limit = 4 }) {
  const [pledges, setPledges] = useState(SEED_RECENT);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API}/recent-pledges?limit=${limit}`);
        if (res.data?.length > 0) {
          setPledges(res.data.slice(0, limit));
        }
      } catch (_) {}
    };
    fetch();
    const interval = setInterval(fetch, 20000);
    return () => clearInterval(interval);
  }, [limit]);

  return (
    <div data-testid="recent-pledges" className="space-y-3">
      <p className="text-xs text-white/40 uppercase tracking-wider" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
        recent pledges
      </p>
      {pledges.slice(0, limit).map((p, i) => (
        <div
          key={i}
          data-testid={`recent-pledge-${i}`}
          className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0"
        >
          <div
            className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
          >
            {getInitials(p.full_name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">{p.full_name}</p>
            {p.city && <p className="text-xs text-white/40 truncate">{p.city}</p>}
          </div>
          <span className="text-xs text-white/30 flex-shrink-0">{timeAgo(p.created_at)}</span>
        </div>
      ))}
    </div>
  );
}
