import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SEED_PLEDGES = [
  { full_name: "Sarah M.", city: "London" },
  { full_name: "James K.", city: "Toronto" },
  { full_name: "Priya S.", city: "Mumbai" },
  { full_name: "Alex R.", city: "New York" },
  { full_name: "Yuki T.", city: "Tokyo" },
  { full_name: "Maria G.", city: "Barcelona" },
  { full_name: "David L.", city: "Sydney" },
  { full_name: "Fatima A.", city: "Dubai" },
  { full_name: "Chen W.", city: "Shanghai" },
  { full_name: "Amara O.", city: "Lagos" },
];

export default function LiveTicker({ className = "" }) {
  const [pledges, setPledges] = useState(SEED_PLEDGES);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchPledges = async () => {
      try {
        const res = await axios.get(`${API}/recent-pledges?limit=20`);
        const data = res.data;
        if (data && data.length >= 5) {
          setPledges(data);
        }
      } catch (_) {}
    };
    fetchPledges();
  }, []);

  useEffect(() => {
    if (pledges.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % pledges.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [pledges.length]);

  const current = pledges[index];
  if (!current) return null;

  return (
    <div
      data-testid="live-ticker"
      className={`flex items-center gap-2.5 text-sm ${className}`}
    >
      <span className="flex-shrink-0 text-white/40 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
        just pledged
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="text-[#4DD8FF] font-semibold"
        >
          {current.full_name}
          {current.city ? (
            <span className="text-white/50 font-normal"> from {current.city}</span>
          ) : null}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
