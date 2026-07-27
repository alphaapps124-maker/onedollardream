import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    q: "How does the $1/month work?",
    a: "Right now, pledging is completely free — you're making a conditional commitment. Once we reach 10,000 pledges, you'll receive an email to activate your $1/month via Stripe. If we don't hit the goal in 12 months, your pledge simply expires and you're never charged.",
  },
  {
    q: "What happens when 10,000 pledges are reached?",
    a: "We activate secure payment processing via Stripe, open the pitch submission portal, and run the first community grant vote the following month. The very first dreams get funded within 60 days of hitting the target.",
  },
  {
    q: "How are grant winners chosen?",
    a: "Every paid member votes on their favorite pitches each month — one vote per category. Community Champions (the top 10% most engaged members) carry double vote weight. Winners are determined purely by community votes, with no committee or editorial override.",
  },
  {
    q: "What is a Community Champion?",
    a: "Champions are the most active members. You earn points by voting (10pts), nominating someone (15pts), making successful referrals (25pts), sharing on social (5pts), and volunteering to film a winner's story (50pts). The top 10% of point-earners each month earn Champion status — and double vote weight.",
  },
  {
    q: "Can I apply for a grant?",
    a: "Yes! Once we reach 10,000 active members, the pitch portal opens. You'll be able to submit your story in one of our four categories — Hero Dream, Education Boost, Crisis Relief, or Community Catalyst. All pledges will be notified when submissions open.",
  },
  {
    q: "How is the money managed?",
    a: "85% of every dollar collected goes directly to that month's grant winners via Stripe instant transfers. 15% covers platform operations, payment processing fees, and growth. We publish full monthly transparency reports showing every dollar in and every dollar out.",
  },
  {
    q: "What's the platform fee?",
    a: "Zero. One Dollar Dream charges no platform fee and makes no profit. We operate entirely from the 15% operational allocation, which covers our Stripe fees, hosting, and team costs. Every improvement to the platform is funded by that same allocation.",
  },
  {
    q: "How do referrals work?",
    a: "When you pledge, you receive a unique referral link. Share it anywhere — every person who pledges through your link earns you 25 Community Champion points and moves the counter toward 10,000. Your referral link is shown immediately after you pledge.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-24 bg-[#F4EDE4]"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-[#057BC1] mb-3 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            questions
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl text-[#083645] italic">
            common questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              data-testid={`faq-item-${i}`}
              className="bg-white rounded-2xl border border-[#083645]/10 px-6 shadow-sm"
            >
              <AccordionTrigger
                className="text-[#083645] font-medium text-left py-5 hover:no-underline text-base"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                className="text-[#083645]/70 pb-5 text-sm leading-relaxed"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
