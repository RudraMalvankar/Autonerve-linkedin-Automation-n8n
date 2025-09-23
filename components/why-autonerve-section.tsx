import { Clock, TrendingUp, Zap } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Automate repetitive LinkedIn tasks and focus on what matters most - building relationships.",
  },
  {
    icon: TrendingUp,
    title: "Grow Faster",
    description: "Scale your outreach and engagement with intelligent automation that works 24/7.",
  },
  {
    icon: Zap,
    title: "Stay Ahead",
    description: "Get competitive insights and trending hashtags to keep your content strategy sharp.",
  },
]

export function WhyAutoNerveSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose AutoNerve?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their LinkedIn presence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center group animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-16 h-16 bg-[var(--electric-blue)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--electric-blue)]/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-[var(--electric-blue)]" />
              </div>

              <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>

              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
