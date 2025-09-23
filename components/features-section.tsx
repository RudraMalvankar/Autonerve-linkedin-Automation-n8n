import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, TrendingUp, Hash, Users } from "lucide-react"

import { Linkedin } from "lucide-react"
import Link from "next/link"

const features = [
  // {
  //   icon: MessageSquare,
  //   title: "LinkedIn DM Outreach",
  //   description: "Automate cold and warm outreach campaigns with personalized messaging workflows.",
  //   highlight: "Cold/Warm",
  //   href: undefined,
  // },
  {
    icon: TrendingUp,
    title: "Competitor Analysis",
    description: "Get real-time insights delivered via Telegram bot or PDF report to stay ahead of your competition.",
    highlight: "LinkedIn & Telegram",
    href: "/competitor-analysis",
    extraIcon: Linkedin,
  },
  {
    icon: Hash,
    title: "Trending Hashtag Finder",
    description: "Discover industry-specific hashtags that boost your content visibility and engagement.",
    highlight: "Growth Hack",
    href: "/industry-trends",
  },
  {
    icon: Users,
    title: "Profile Visitor → Auto DM",
    description: "Automatically send personalized messages with CTAs to your profile visitors.",
    highlight: "Auto CTA",
    href: undefined,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Automation Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to scale your LinkedIn presence and generate more leads
          </p>
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => {
            const CardInner = (
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[var(--electric-blue)]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[var(--electric-blue)]/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-[var(--electric-blue)]" />
                  {feature.extraIcon && (
                    <feature.extraIcon className="w-4 h-4 text-[#0077b5] ml-2" aria-label="LinkedIn" />
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg flex items-center">
                    {feature.title}
                  </h3>
                  <span className="text-xs bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] px-2 py-1 rounded-full font-medium">
                    {feature.highlight}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            )
            return feature.href ? (
              <Link
                href={feature.href}
                key={index}
                className="group block focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)] rounded-xl"
                tabIndex={0}
                aria-label={feature.title}
              >
                <Card
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up border-0 bg-card/50 backdrop-blur-sm cursor-pointer h-full flex flex-col justify-between"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {CardInner}
                </Card>
              </Link>
            ) : (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up border-0 bg-card/50 backdrop-blur-sm h-full flex flex-col justify-between"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {CardInner}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
