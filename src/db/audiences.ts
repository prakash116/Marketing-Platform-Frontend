import type { AudienceSection } from "@/types/site";

/**
 * Mock record for `GET /site/audiences`, the "who are you?" section.
 * Read only through `getAudiences()` in `src/lib/api/site.ts`.
 * The claims repeat what the hero slides and header already say.
 */
export const audiencesRecord: AudienceSection = {
  eyebrow: "Who are you?",
  title: "Pick your path",
  description: "One platform, four ways in. Choose what fits you and start in a minute.",
  paths: [
    {
      id: "business",
      icon: "store",
      tone: "primary",
      title: "I run a business",
      description: "Get more customers with WhatsApp, posts, ads and local creators.",
      points: [
        "Plans from ₹299/month",
        "Set up in 60 seconds, no card needed",
        "We manage your ads on Growth + Pro",
      ],
      cta: { title: "Start free", href: "/signup" },
    },
    {
      id: "creators",
      icon: "camera",
      tone: "accent",
      title: "I'm a creator",
      description: "Get paid briefs from brands in your city.",
      points: [
        "Free to join",
        "Payment held safely until work is approved",
        "Apply to briefs in one tap",
      ],
      cta: { title: "Join as a creator", href: "/signup?as=creator" },
    },
    {
      id: "agencies",
      icon: "briefcase-business",
      tone: "info",
      title: "I run an agency",
      description: "Manage every client, campaign and creator from one login.",
      points: [
        "Switch between clients in one click",
        "Hire creators for client campaigns",
        "One report per client, in ₹",
      ],
      cta: { title: "Start as an agency", href: "/signup?as=agency" },
    },
    {
      id: "services",
      icon: "code",
      tone: "success",
      title: "I need tech help",
      description: "Our team builds and runs it for you.",
      points: [
        "SEO, WhatsApp and ads automation",
        "Websites and apps, built for you",
        "Tech consulting",
      ],
      cta: { title: "Book a free call", href: "/demo" },
    },
  ],
};
