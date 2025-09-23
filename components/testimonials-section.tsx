import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Inc.",
    content:
      "AutoNerve increased our LinkedIn leads by 300% in just 2 months. The automation is seamless and the results speak for themselves.",
    rating: 5,
    avatar: "/professional-woman-headshot.png",
  },
  {
    name: "Marcus Rodriguez",
    role: "Sales Manager",
    company: "Growth Solutions",
    content: "The competitor analysis feature gives us insights we never had before. We're always one step ahead now.",
    rating: 5,
    avatar: "/professional-man-headshot.png",
  },
  {
    name: "Emily Watson",
    role: "Founder",
    company: "StartupLab",
    content:
      "I save 10+ hours per week on LinkedIn outreach. AutoNerve handles everything while I focus on closing deals.",
    rating: 5,
    avatar: "/professional-woman-entrepreneur.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Professionals</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our users say about their LinkedIn automation success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 animate-slide-up bg-card/80 backdrop-blur-sm border-0 h-full flex flex-col justify-between"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed flex-1">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
