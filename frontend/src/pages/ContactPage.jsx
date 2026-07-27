import { useState } from "react";
import axios from "axios";
import { CheckCircle, Loader2, Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SUBJECTS = [
  "General inquiry",
  "Media or press",
  "Partnership proposal",
  "Technical issue",
  "Grant question",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API}/contact`, form);
      setSuccess(true);
    } catch (_) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-[#083645] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-[#4DD8FF] mb-4 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            get in touch
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl text-white italic leading-tight mb-6">
            say hello
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Questions, press inquiries, partnership ideas, or just a word of encouragement — we read every message.
          </p>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-24 bg-[#F4EDE4]">
        <div className="max-w-2xl mx-auto px-6">
          {success ? (
            <div
              data-testid="contact-success-msg"
              className="text-center py-16 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#E3FF00] flex items-center justify-center mx-auto">
                <CheckCircle size={32} className="text-[#083645]" />
              </div>
              <h2 className="font-serif text-4xl text-[#083645] italic">message sent!</h2>
              <p className="text-[#083645]/60 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                We'll get back to you within 2 business days.
              </p>
              <button
                onClick={() => { setSuccess(false); setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" }); }}
                className="mt-4 text-sm text-[#057BC1] underline hover:no-underline transition-all duration-200"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                send another message
              </button>
            </div>
          ) : (
            <form
              data-testid="contact-form"
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-sm space-y-6"
            >
              <div className="space-y-1">
                <h2 className="font-serif text-3xl text-[#083645] italic">drop us a line</h2>
                <p className="text-[#083645]/50 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  All fields marked * are required.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#083645]/50 uppercase tracking-wider" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    name *
                  </label>
                  <input
                    data-testid="contact-name-input"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full border border-[#083645]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#083645]/40 bg-transparent text-[#083645] placeholder-[#083645]/30 transition-colors duration-200"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#083645]/50 uppercase tracking-wider" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    email *
                  </label>
                  <input
                    data-testid="contact-email-input"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full border border-[#083645]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#083645]/40 bg-transparent text-[#083645] placeholder-[#083645]/30 transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#083645]/50 uppercase tracking-wider" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  subject *
                </label>
                <select
                  data-testid="contact-subject-select"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="w-full border border-[#083645]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#083645]/40 bg-white text-[#083645] transition-colors duration-200"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#083645]/50 uppercase tracking-wider" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  message *
                </label>
                <textarea
                  data-testid="contact-message-input"
                  rows={5}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full border border-[#083645]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#083645]/40 bg-transparent text-[#083645] placeholder-[#083645]/30 resize-none transition-colors duration-200"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button
                data-testid="contact-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-[#083645] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#083645]/90 transition-colors duration-200 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> sending...</>
                ) : (
                  <>send message <Send size={16} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
