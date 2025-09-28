"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, TrendingUp, Download, ExternalLink } from "lucide-react";

// TODO: Replace with your n8n webhook URL
const WEBHOOK_URL = "https://n8n-kartik-hfaqabaagehkhfhe.malaysiawest-01.azurewebsites.net/webhook/c52ffe9b-3879-4d83-b4a1-b1bd3033e80a";

export default function IndustryTrendsPage() {
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");
  const [rawResponse, setRawResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTopics([]);
    setSheetUrl("");
    setRawResponse(null);
    try {
      // POST to n8n webhook
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry }),
      });
      if (!res.ok) throw new Error("Failed to fetch topics");
      const data = await res.json();
      
      // Store the complete raw response for debugging
      // setRawResponse(data);
      
      // Handle the response format from your n8n workflow
      if (data.rows && Array.isArray(data.rows)) {
        setTopics(data.rows);
      } else if (data.output && Array.isArray(data.output)) {
        setTopics(data.output);
      } else if (data.articles && Array.isArray(data.articles)) {
        setTopics(data.articles);
      } else {
        // Handle the case where topics are directly in the response
        setTopics(Array.isArray(data) ? data : []);
      }
      
      // Set the Google Sheets URL if available
      if (data.sheetUrl) {
        setSheetUrl(data.sheetUrl);
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setRawResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-2 sm:p-4 flex items-start sm:items-center justify-center">
      <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-10 py-4 sm:py-0">
        {/* Back Navigation */}
        <div className="pt-2 sm:pt-4">
          <a href="/" className="inline-flex items-center gap-2 text-[var(--electric-blue)] hover:text-[var(--electric-blue)]/80 transition-colors font-medium text-sm sm:text-base">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to AutoNerve
          </a>
        </div>
        {/* Top Header - Mobile Optimized */}
        <div className="text-center py-4 sm:py-8 px-2">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-card/60 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-border shadow">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[var(--electric-blue)] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[var(--electric-blue)]">AI-Powered Trends</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight px-2">
            Industry Trending Topics
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Get the top 5 digital marketing topics for your industry in India, powered by AI and n8n automation.
          </p>
        </div>
        {/* Form Card - Mobile Responsive */}
        <Card className="w-full mx-2 sm:mx-0 bg-card/80 backdrop-blur-sm border-0 shadow-xl shadow-[var(--electric-blue)]/10 rounded-2xl">
          <div className="rounded-t-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[var(--electric-blue)]/80 via-[var(--electric-blue)]/70 to-[var(--electric-blue)]/60 text-white rounded-t-2xl px-4 sm:px-10 pt-6 sm:pt-8 pb-4 sm:pb-6 shadow-lg border-b border-border/30">
              <h2 className="text-lg sm:text-2xl font-bold drop-shadow">Trending Topics Parameters</h2>
              <p className="text-blue-50 mt-1 sm:mt-2 font-medium text-sm sm:text-base">Fill in the details to get your industry trending topics</p>
            </CardHeader>
          </div>
          <CardContent className="p-4 sm:p-8 bg-card/60 backdrop-blur-xl rounded-b-2xl border border-border/30 shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 items-center">
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="industry" className="font-semibold text-sm sm:text-base text-foreground mb-1">Industry</Label>
              <div className="relative w-full">
                <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[var(--electric-blue)]">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <Input
                  id="industry"
                  type="text"
                  placeholder="e.g. Fashion, Tech, Finance"
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  required
                  className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-base sm:text-lg rounded-2xl bg-gradient-to-r from-background/80 via-muted/80 to-muted/80 border border-border focus:border-[var(--electric-blue)] focus:ring-2 focus:ring-[var(--electric-blue)]/20 shadow-lg transition-all"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading || !industry}
              className="w-full h-12 sm:h-14 bg-gradient-to-r from-[var(--electric-blue)] via-[var(--electric-blue)]/90 to-[var(--electric-blue)] hover:from-[var(--electric-blue)]/90 hover:to-[var(--electric-blue)]/80 text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all rounded-2xl mt-1 sm:mt-2 flex items-center justify-center border-0"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-3 h-5 w-5 text-white" />
              ) : (
                <span className="drop-shadow">Get Topics</span>
              )}
            </Button>
          </form>
          {/* Show error if present */}
          {error && (
            <div className="mt-4 text-destructive text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}
          {/* Show raw webhook response for debugging */}
          {/* {rawResponse && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">🔍 Raw Webhook Response (Debug)</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs font-mono overflow-x-auto max-h-96">
                <pre>{JSON.stringify(rawResponse, null, 2)}</pre>
              </div>
            </div>
          )} */}

          {/* Show Google Sheets download link if available - Mobile Responsive */}
          {sheetUrl && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-green-400">Data Available in Google Sheets</h4>
                  <p className="text-xs text-green-300 mt-1">View and download the complete trending topics data</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={() => window.open(sheetUrl, '_blank')}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Sheet
                  </Button>
                  <Button
                    onClick={() => window.open(sheetUrl.replace('/edit', '/export?format=xlsx'), '_blank')}
                    className="bg-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/90 text-white text-sm px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Excel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Show topics as cards if available - Mobile Responsive */}
          {topics.length > 0 && (
            <div className="mt-6 sm:mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">Top 5 Trending Topics</h3>
                {sheetUrl && (
                  <Button
                    onClick={() => window.open(sheetUrl, '_blank')}
                    variant="outline"
                    className="text-sm flex items-center justify-center gap-2 self-start border-[var(--electric-blue)] text-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View in Sheets
                  </Button>
                )}
              </div>
              <div className="flex flex-col gap-4 sm:gap-6">
                {topics.map((topic: any, idx: number) => (
                  <Card key={idx} className="bg-card/90 border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="text-base sm:text-lg font-semibold text-[var(--electric-blue)] mb-2 leading-tight">{topic.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{topic.summary}</p>
                        </div>
                        <span className="text-xs bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] px-2 py-1 rounded-full font-medium self-start sm:ml-4">
                          #{idx + 1}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {topic.hashtags && (Array.isArray(topic.hashtags) ? topic.hashtags : topic.hashtags.split(',')).map((tag: string, i: number) => (
                          <span key={i} className="bg-gradient-to-r from-[var(--electric-blue)]/10 to-[var(--electric-blue)]/20 text-[var(--electric-blue)] px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-3 h-3" />
                          <a href={topic.link} target="_blank" rel="noopener noreferrer" className="underline text-[var(--electric-blue)] hover:text-[var(--electric-blue)]/80 break-all">
                            Read Full Article
                          </a>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                          <span className="truncate">📅 {topic.date}</span>
                          <span className="truncate">📰 {topic.source}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </main>
  );
}
