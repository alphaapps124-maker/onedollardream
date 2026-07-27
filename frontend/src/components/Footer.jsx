import { Link } from "react-router-dom";
import { Mail, Twitter, Github } from "lucide-react";

const navGroups = [
  {
    title: "explore",
    links: [
      { label: "how it works", href: "/how-it-works" },
      { label: "grants", href: "/grants" },
      { label: "phases", href: "/phases" },
      { label: "transparency", href: "/transparency" },
    ],
  },
  {
    title: "community",
    links: [
      { label: "team", href: "/team" },
      { label: "contact", href: "/contact" },
      { label: "submit a pitch", href: "/submit-pitch" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a2330] text-white/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div className="space-y-4">
            <Link
              to="/"
              className="font-bold text-2xl tracking-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="text-white">one</span>
              <span className="text-[#E3FF00]">dollar</span>
              <span className="text-white/40">dream.</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              A micro-giving collective where $1/month from many people funds the dreams of a few. Built on community. Powered by generosity.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E3FF00]" />
              0% platform fee
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-white/30 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} One Dollar Dream. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@onedollardream.com"
              data-testid="footer-email-link"
              className="text-white/30 hover:text-white transition-colors duration-200"
            >
              <Mail size={16} />
            </a>
            <a
              href="#"
              data-testid="footer-twitter-link"
              className="text-white/30 hover:text-white transition-colors duration-200"
            >
              <Twitter size={16} />
            </a>
          </div>
          <p className="text-xs text-white/20">
            Pledges are conditional. No payment until 10,000 pledges are reached.
          </p>
        </div>
      </div>
    </footer>
  );
}
