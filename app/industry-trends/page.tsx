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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto space-y-10">
        {/* Back Navigation */}
        <div className="pt-4">
          <a href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to AutoNerve
          </a>
        </div>
        {/* Top Header Replicated from Competitor Analysis */}
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-200/50 shadow">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-blue-900">AI-Powered Trends</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Industry Trending Topics
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get the top 5 digital marketing topics for your industry in India, powered by AI and n8n automation.
          </p>
        </div>
        {/* Form Card Replicated Style */}
        <Card className="w-full bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-blue-500/10 rounded-2xl">
          <div className="rounded-t-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500/80 via-purple-500/70 to-blue-400/60 text-white rounded-t-2xl px-10 pt-8 pb-6 shadow-lg border-b border-blue-200/30">
              <h2 className="text-2xl font-bold drop-shadow">Trending Topics Parameters</h2>
              <p className="text-blue-50 mt-2 font-medium">Fill in the details to get your industry trending topics</p>
            </CardHeader>
          </div>
          <CardContent className="p-8 bg-white/60 backdrop-blur-xl rounded-b-2xl border border-blue-100/30 shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="industry" className="font-semibold text-base text-gray-700 mb-1">Industry</Label>
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <Input
                  id="industry"
                  type="text"
                  placeholder="e.g. Fashion, Tech, Finance"
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  required
                  className="pl-12 pr-4 py-4 text-lg rounded-2xl bg-gradient-to-r from-white/80 via-blue-50/80 to-blue-100/80 border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-lg transition-all"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading || !industry}
              className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all rounded-2xl mt-2 flex items-center justify-center border-0"
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
            <div className="mt-4 text-red-500 text-sm flex items-center gap-2">
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

          {/* Show Google Sheets download link if available */}
          {sheetUrl && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-green-800">Data Available in Google Sheets</h4>
                  <p className="text-xs text-green-600 mt-1">View and download the complete trending topics data</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => window.open(sheetUrl, '_blank')}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Sheet
                  </Button>
                  <Button
                    onClick={() => window.open(sheetUrl.replace('/edit', '/export?format=xlsx'), '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Excel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Show topics as cards if available */}
          {topics.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Top 5 Trending Topics</h3>
                {sheetUrl && (
                  <Button
                    onClick={() => window.open(sheetUrl, '_blank')}
                    variant="outline"
                    className="text-sm flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View in Sheets
                  </Button>
                )}
              </div>
              <div className="flex flex-col gap-6">
                {topics.map((topic: any, idx: number) => (
                  <Card key={idx} className="bg-white/90 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="px-6 pt-6 pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-blue-700 mb-2 leading-tight">{topic.title}</h4>
                          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{topic.summary}</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium ml-4">
                          #{idx + 1}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {topic.hashtags && (Array.isArray(topic.hashtags) ? topic.hashtags : topic.hashtags.split(',')).map((tag: string, i: number) => (
                          <span key={i} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-3 h-3" />
                          <a href={topic.link} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">
                            Read Full Article
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>📅 {topic.date}</span>
                          <span>📰 {topic.source}</span>
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
