import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { LiveDataSection } from "@/components/live-data-section"
import { WhyAutoNerveSection } from "@/components/why-autonerve-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FinalCTASection } from "@/components/final-cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <LiveDataSection />
      <WhyAutoNerveSection />
      <TestimonialsSection />
      <FinalCTASection />
    </main>
  )
}
