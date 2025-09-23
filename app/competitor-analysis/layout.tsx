import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LinkedIn Competitor Analysis - AutoNerve",
  description: "Generate comprehensive competitor analysis reports from LinkedIn profiles. Analyze posting patterns, engagement tactics, and content strategies with AI-powered insights.",
  keywords: "LinkedIn competitor analysis, social media analytics, content strategy, LinkedIn automation",
}

export default function CompetitorAnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}