import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const navLinks = [
  { label: "how it works", href: "/how-it-works" },
  { label: "grants", href: "/grants" },
  { label: "transparency", href: "/transparency" },
  { label: "team", href: "/team" },
  { label: "phases", href: "/phases" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pledgeCount, setPledgeCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${API}/pledge-count`);
        setPledgeCount(res.data.count);
      } catch (_) {}
    };
    fetchCount();
    const interval = setInterval(fetchCount, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#083645]/95 shadow-lg" : "bg-[#083645]/90"
      } backdrop-blur-xl border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          to="/"
          data-testid="header-logo"
          className="font-sans font-bold text-xl tracking-tight flex-shrink-0"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <span className="text-white">one</span>
          <span className="text-[#E3FF00]">dollar</span>
          <span className="text-white/50">dream.</span>
        </Link>

        {/* Live badge */}
        <div
          data-testid="header-pledge-count"
          className="hidden lg:flex items-center gap-2 text-xs text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-[#4DD8FF] animate-pulse-dot flex-shrink-0" />
          <span>{pledgeCount.toLocaleString()} pledged</span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-[#E3FF00] whitespace-nowrap ${
                location.pathname === link.href ? "text-[#E3FF00]" : "text-white/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/#pledge"
            data-testid="header-cta-btn"
            className="hidden md:inline-flex bg-[#E3FF00] text-[#083645] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#E3FF00]/90 transition-colors duration-200 whitespace-nowrap"
          >
            sign the pledge
          </Link>
          <button
            data-testid="mobile-menu-btn"
            aria-label="Toggle menu"
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#083645] border-t border-white/10 px-6 py-4 space-y-1">
          <div className="flex items-center gap-2 text-xs text-white/50 pb-3 border-b border-white/10 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4DD8FF] animate-pulse-dot" />
            <span>{pledgeCount.toLocaleString()} pledged so far</span>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              data-testid={`mobile-nav-${link.href.slice(1)}`}
              className="block py-3 text-white/70 hover:text-[#E3FF00] text-sm font-medium border-b border-white/10 last:border-0 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/#pledge"
            className="mt-4 block bg-[#E3FF00] text-[#083645] px-4 py-3 rounded-xl text-sm font-semibold text-center"
          >
            sign the pledge
          </Link>
        </div>
      )}
    </header>
  );
}
