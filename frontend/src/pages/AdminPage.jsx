import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Search, Users, Mail, ChevronLeft, ChevronRight, MessageSquare, RefreshCw } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function PledgesTab() {
  const [pledges, setPledges] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPledges = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/pledges`, {
        params: { page, limit: 50, search },
      });
      setPledges(res.data.pledges);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (_) {}
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetchPledges(); }, [fetchPledges]);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-52">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            data-testid="admin-search-input"
            type="text"
            placeholder="Search by name, email, city..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-colors duration-200"
          />
        </div>
        <button
          onClick={fetchPledges}
          className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
        >
          <RefreshCw size={16} className="text-white/60" />
        </button>
      </div>

      <div className="flex items-center justify-between text-sm text-white/50" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
        <span>{total.toLocaleString()} total pledges</span>
        <span>Page {page} of {pages}</span>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table data-testid="admin-pledges-table" className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                {["#", "Name", "City", "Country", "Referral Code", "Referred By", "Pledged"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-white/30 font-medium whitespace-nowrap" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-white/30 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    loading...
                  </td>
                </tr>
              ) : pledges.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-white/30 text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {search ? "No results found." : "No pledges yet."}
                  </td>
                </tr>
              ) : (
                pledges.map((p, i) => (
                  <tr key={p.id || i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors duration-150">
                    <td className="px-4 py-3 text-white/40 text-xs">{p.pledge_number}</td>
                    <td className="px-4 py-3 text-white font-medium">{p.full_name}</td>
                    <td className="px-4 py-3 text-white/60">{p.city || "—"}</td>
                    <td className="px-4 py-3 text-white/60">{p.country || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="text-[#4DD8FF] font-mono text-xs">{p.referral_code}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-white/40 font-mono text-xs">{p.referred_by || "—"}</span>
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{timeAgo(p.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 bg-white/10 rounded-lg disabled:opacity-30 hover:bg-white/20 transition-colors duration-200"
          >
            <ChevronLeft size={16} className="text-white" />
          </button>
          <span className="text-sm text-white/50 px-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {page} / {pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages}
            className="p-2 bg-white/10 rounded-lg disabled:opacity-30 hover:bg-white/20 transition-colors duration-200"
          >
            <ChevronRight size={16} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}

function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/admin/contacts`);
        setMessages(res.data.messages);
        setTotal(res.data.total);
      } catch (_) {}
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/50" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{total} messages received</p>
      {loading ? (
        <p className="text-white/30 text-sm text-center py-8" style={{ fontFamily: "Space Grotesk, sans-serif" }}>loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-white/30 text-sm text-center py-8" style={{ fontFamily: "Space Grotesk, sans-serif" }}>no messages yet</p>
      ) : (
        messages.map((m, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-white font-medium text-sm">{m.name}</p>
                <p className="text-white/40 text-xs">{m.email} · {timeAgo(m.created_at)}</p>
              </div>
              <span className="text-xs bg-white/10 text-white/60 px-2.5 py-1 rounded-full flex-shrink-0" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {m.subject}
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{m.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState("pledges");

  return (
    <div className="pt-16 min-h-screen bg-[#0a2330]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#4DD8FF] mb-2 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            admin
          </p>
          <h1 className="font-serif text-4xl text-white italic">One Dollar Dream</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white/5 p-1.5 rounded-xl w-fit">
          {[
            { id: "pledges", label: "Pledges", Icon: Users },
            { id: "messages", label: "Messages", Icon: MessageSquare },
          ].map((t) => (
            <button
              key={t.id}
              data-testid={`admin-tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                tab === t.id ? "bg-[#E3FF00] text-[#083645]" : "text-white/50 hover:text-white"
              }`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <t.Icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "pledges" ? <PledgesTab /> : <MessagesTab />}
      </div>
    </div>
  );
}
