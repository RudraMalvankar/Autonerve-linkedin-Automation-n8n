import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, MessageCircle, Hash, Target } from "lucide-react"

const stats = [
  {
    icon: MessageCircle,
    title: "Messages Sent",
    value: "12,847",
    change: "+23%",
    color: "text-green-500",
  },
  {
    icon: Target,
    title: "Leads Generated",
    value: "1,234",
    change: "+45%",
    color: "text-[var(--electric-blue)]",
  },
  {
    icon: Hash,
    title: "Top Hashtags",
    value: "#AIAutomation",
    change: "89% reach",
    color: "text-orange-500",
  },
  {
    icon: TrendingUp,
    title: "Growth Rate",
    value: "156%",
    change: "This month",
    color: "text-purple-500",
  },
]

export function LiveDataSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Real-Time Performance</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your LinkedIn automation success with live data and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 animate-slide-up bg-card/80 backdrop-blur-sm border-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-2xl font-bold mb-1">{stat.value}</CardTitle>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            * Sample data - Connect your Google Sheets for real-time tracking
          </p>
        </div>
      </div>
    </section>
  )
}
