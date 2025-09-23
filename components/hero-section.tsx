import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Linkedin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-[var(--electric-blue)] rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--electric-blue)] rounded-full blur-3xl opacity-5 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[var(--electric-blue)] rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">AutoNerve</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Automate LinkedIn. <span className="text-[var(--electric-blue)]">Amplify Growth.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Save hours every week with AutoNerve's automation workflows.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white px-8 py-6 text-lg font-semibold group"
          >
            Start Automating
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Abstract automation flow illustration */}
          <div className="mt-10 sm:mt-14 md:mt-16 relative">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 opacity-60">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[var(--electric-blue)]/20 flex items-center justify-center">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--electric-blue)]" />
              </div>
              <div className="w-8 sm:w-16 h-1 bg-gradient-to-r from-[var(--electric-blue)] to-transparent"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[var(--electric-blue)]/40"></div>
              <div className="w-8 sm:w-16 h-1 bg-gradient-to-r from-[var(--electric-blue)] to-transparent"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[var(--electric-blue)]/60"></div>
              <div className="w-8 sm:w-16 h-1 bg-gradient-to-r from-[var(--electric-blue)] to-transparent"></div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[var(--electric-blue)] flex items-center justify-center">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
