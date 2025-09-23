import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

export function FinalCTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[var(--electric-blue)]/5 via-background to-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-[var(--electric-blue)] rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[var(--electric-blue)] rounded-full blur-3xl opacity-5"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Ready to automate your <span className="text-[var(--electric-blue)]">LinkedIn growth?</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Join thousands of professionals who've transformed their LinkedIn presence with AutoNerve
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white px-8 py-6 text-lg font-semibold group"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book a Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold border-[var(--electric-blue)] text-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/10 bg-transparent"
            >
              Start Free Trial
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
