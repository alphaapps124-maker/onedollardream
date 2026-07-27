const teamMembers = [
  {
    initials: "SC",
    name: "Sarah Chen",
    role: "Executive Director",
    bio: "Serial community builder with a background in nonprofit finance. Passionate about removing barriers between dreamers and resources.",
    color: "bg-[#E3FF00] text-[#083645]",
    borderColor: "border-[#E3FF00]/30",
  },
  {
    initials: "MJ",
    name: "Marcus Johnson",
    role: "Community Lead",
    bio: "Spent a decade building grassroots movements. Believes every community is one shared goal away from becoming something extraordinary.",
    color: "bg-[#4DD8FF] text-[#083645]",
    borderColor: "border-[#4DD8FF]/30",
  },
  {
    initials: "ER",
    name: "Elena Rodriguez",
    role: "Tech Lead",
    bio: "Full-stack engineer who builds for humans first. Obsessed with making complex systems feel simple and trustworthy.",
    color: "bg-[#057BC1] text-white",
    borderColor: "border-[#057BC1]/30",
  },
  {
    initials: "DK",
    name: "David Kim",
    role: "Grant Operations",
    bio: "Former grants manager at a leading foundation. Ensures every dollar reaches its destination with complete accountability.",
    color: "bg-[#083645] text-white",
    borderColor: "border-[#083645]/30",
  },
  {
    initials: "AW",
    name: "Aisha Williams",
    role: "Communications",
    bio: "Storyteller and social strategist. Believes the most powerful force in giving is a story told honestly, at the right moment.",
    color: "bg-[#E3FF00] text-[#083645]",
    borderColor: "border-[#E3FF00]/30",
  },
  {
    initials: "TN",
    name: "Tom Nakamura",
    role: "Finance & Compliance",
    bio: "CPA with a decade in fintech. Built the financial framework that ensures One Dollar Dream operates with zero-compromise transparency.",
    color: "bg-[#4DD8FF] text-[#083645]",
    borderColor: "border-[#4DD8FF]/30",
  },
];

export default function TeamPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-[#083645] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-[#4DD8FF] mb-4 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            the people
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl text-white italic leading-tight mb-6">
            meet the team
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Six people who believe that a dollar a day from many is the most powerful form of giving. We built this for the dreamers.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-24 bg-[#F8F4ED]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                data-testid={`team-member-${i}`}
                className={`bg-white rounded-2xl p-8 shadow-sm border ${member.borderColor} hover:-translate-y-1 transition-transform duration-300`}
              >
                {/* Avatar */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 ${member.color}`}
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {member.initials}
                </div>

                <h3 className="font-serif text-2xl italic text-[#083645] mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-[#057BC1] uppercase tracking-wider mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {member.role}
                </p>
                <p className="text-[#083645]/60 text-sm leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-20 bg-[#0a2330] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-bg" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-white italic mb-6">our shared belief</h2>
          <blockquote className="font-serif text-2xl text-white/70 italic leading-relaxed">
            "The smallest recurring commitment, multiplied by thousands, becomes an unstoppable force for good. We're proof that collective intention — not wealth — is the most powerful driver of change."
          </blockquote>
          <p className="text-white/30 text-sm mt-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            — The One Dollar Dream team
          </p>
        </div>
      </section>
    </div>
  );
}
