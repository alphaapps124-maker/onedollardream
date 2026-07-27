import { useState } from "react";
import axios from "axios";
import { CheckCircle, Copy, Check, ArrowRight, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const APP_URL = process.env.REACT_APP_BACKEND_URL?.replace("/api", "") || window.location.origin;

export default function PledgeForm({ onSuccess, compact = false }) {
  const [form, setForm] = useState({ full_name: "", email: "", city: "", country: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [copied, setCopied] = useState(false);

  const referralCode = localStorage.getItem("odb_referral_code");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/pledge`, {
        ...form,
        referred_by: referralCode || undefined,
      });
      setSuccess(res.data);
      localStorage.removeItem("odb_referral_code");
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const referralLink = success
    ? `${window.location.origin}/?ref=${success.referral_code}`
    : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  if (success) {
    return (
      <div
        data-testid="pledge-success"
        className="bg-[#083645] text-white rounded-2xl p-8 space-y-5 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <CheckCircle className="text-[#E3FF00] flex-shrink-0" size={28} />
          <div>
            <h3 className="font-serif text-2xl italic">You're in, {success.full_name.split(" ")[0]}!</h3>
            <p className="text-white/60 text-sm mt-0.5">Pledge #{success.pledge_number.toLocaleString()}</p>
          </div>
        </div>

        <p className="text-white/70 text-sm leading-relaxed">
          Share your link below. Every person who pledges through your link brings the dream 1 step closer — and earns you Community Champion points.
        </p>

        <div className="bg-white/10 rounded-xl p-4 space-y-2">
          <p className="text-xs text-white/40 uppercase tracking-wider" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Your referral link</p>
          <div className="flex items-center gap-2">
            <span
              data-testid="referral-link-text"
              className="text-[#4DD8FF] text-sm font-medium truncate flex-1"
            >
              {referralLink}
            </span>
            <button
              data-testid="copy-referral-btn"
              onClick={copyLink}
              className="flex-shrink-0 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              {copied ? <Check size={16} className="text-[#E3FF00]" /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      data-testid="pledge-form"
      onSubmit={handleSubmit}
      className={`space-y-4 ${compact ? "" : "bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"}`}
    >
      {referralCode && (
        <div className="text-xs text-[#4DD8FF] bg-[#4DD8FF]/10 border border-[#4DD8FF]/20 rounded-lg px-3 py-2">
          You were referred — your pledge will credit their account.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs text-white/50 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            full name *
          </label>
          <input
            data-testid="pledge-name-input"
            type="text"
            placeholder="Your name"
            value={form.full_name}
            onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E3FF00]/60 focus:bg-white/15 transition-all duration-200"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-white/50 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            email address *
          </label>
          <input
            data-testid="pledge-email-input"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E3FF00]/60 focus:bg-white/15 transition-all duration-200"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs text-white/50 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            city <span className="text-white/30">(optional)</span>
          </label>
          <input
            data-testid="pledge-city-input"
            type="text"
            placeholder="Your city"
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E3FF00]/60 focus:bg-white/15 transition-all duration-200"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-white/50 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            country <span className="text-white/30">(optional)</span>
          </label>
          <input
            data-testid="pledge-country-input"
            type="text"
            placeholder="Your country"
            value={form.country}
            onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E3FF00]/60 focus:bg-white/15 transition-all duration-200"
          />
        </div>
      </div>

      {error && (
        <p data-testid="pledge-error" className="text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg border border-red-400/20">
          {error}
        </p>
      )}

      <button
        data-testid="pledge-submit-btn"
        type="submit"
        disabled={loading}
        className="w-full bg-[#E3FF00] text-[#083645] font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#E3FF00]/90 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /> signing...</>
        ) : (
          <>sign the pledge <ArrowRight size={16} /></>
        )}
      </button>

      <p className="text-xs text-white/30 text-center leading-relaxed">
        Conditional pledge — no payment until we reach 10,000. Cancel anytime.
      </p>
    </form>
  );
}
