"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse"; // Import papaparse for proper CSV parsing
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Send, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const WEBHOOK_URL = "https://n8n-kartik-hfaqabaagehkhfhe.malaysiawest-01.azurewebsites.net/webhook/autoDm";
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1uWbHpVCp7E9kF31HBsj3Q_0lQiS0xiUizAPhkoFlbAE/gviz/tq?tqx=out:csv";

export default function LinkedInAutoDMPage() {
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [place, setPlace] = useState("");

  const [loadingSend, setLoadingSend] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [webhookResponse, setWebhookResponse] = useState<any>(null);

  const [sheetData, setSheetData] = useState<string[][]>([]);
  const [loadingSheet, setLoadingSheet] = useState(false);
  const [sheetError, setSheetError] = useState<string | null>(null);

  // Fetch Google Sheets data using CSV export link
  useEffect(() => {
    const fetchSheetData = async () => {
      setLoadingSheet(true);
      setSheetError(null);
      try {
        const response = await fetch(SHEET_CSV_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data from Google Sheets");
        }
        const csvText = await response.text();

        // Use PapaParse to parse the CSV data
        const parsedData = Papa.parse(csvText, { skipEmptyLines: true });
        setSheetData(parsedData.data as string[][]);
      } catch (err: any) {
        setSheetError(err.message || "An unexpected error occurred");
      } finally {
        setLoadingSheet(false);
      }
    };

    fetchSheetData();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSend(true);
    setWebhookResponse(null);
    setError(null);

    try {
      const payload = { position, country, place };
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Webhook error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      setWebhookResponse(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingSend(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-10">
          {/* Back Navigation */}
        <div className="pt-2 sm:pt-4">
          <a href="/" className="inline-flex items-center gap-2 text-[var(--electric-blue)] hover:text-[var(--electric-blue)]/80 transition-colors font-medium text-sm sm:text-base">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to AutoNerve
          </a>
        </div>
        {/* Header */}
        <div className="text-center py-8">
           <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-card/60 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-border shadow">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[var(--electric-blue)] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[var(--electric-blue)]">AI-Powered Connection Request</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">LinkedIn AutoDM Tool</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Send automated connection requests and messages to LinkedIn users.
          </p>
        </div>

        {/* Form Card */}
        <Card className="bg-gray-800 border border-gray-700 shadow-xl rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-t-2xl px-8 py-6">
            <CardTitle className="text-2xl font-bold">Send AutoDM</CardTitle>
            <CardDescription className="text-blue-100">
              Fill in the details below to trigger the AutoDM workflow.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSend} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-300">Position / Field</Label>
                <Input
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g., Software Engineer"
                  required
                  className="mt-2 bg-gray-900 text-white border-gray-700"
                />
              </div>
              <div>
                <Label className="text-gray-300">Country</Label>
                <Input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g., United States"
                  required
                  className="mt-2 bg-gray-900 text-white border-gray-700"
                />
              </div>
              <div>
                <Label className="text-gray-300">City / Place</Label>
                <Input
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="e.g., New York"
                  required
                  className="mt-2 bg-gray-900 text-white border-gray-700"
                />
              </div>
              <div className="md:col-span-3">
                <Button
                  type="submit"
                  disabled={loadingSend}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg"
                >
                  {loadingSend ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5" /> Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-5 w-5" /> Send to Webhook
                    </div>
                  )}
                </Button>
              </div>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {webhookResponse && (
              <Card className="mt-6 bg-gray-900 border-gray-700 shadow-md">
                <CardHeader>
                  <CardTitle className="text-green-400">Webhook Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(webhookResponse, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Google Sheets Data */}
        <Card className="bg-gray-800 border border-gray-700 shadow-xl rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-t-2xl px-8 py-6">
            <CardTitle className="text-2xl font-bold">Google Sheets Data</CardTitle>
            <CardDescription className="text-blue-100">
              Below is the data fetched from the provided Google Sheet.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {loadingSheet ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-white" />
                <span className="ml-4 text-white">Loading data...</span>
              </div>
            ) : sheetError ? (
              <div className="text-red-500 text-center">{sheetError}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sheetData.slice(1).map((row, rowIndex) => (
                  <Card
                    key={rowIndex}
                    className="bg-gray-900 border border-gray-700 shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="space-y-4">
                      <div>
                        <span className="text-gray-400 font-semibold">Username:</span>
                        <span className="text-gray-300 ml-2">{row[0]?.trim() || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">LinkedIn URL:</span>
                        <span className="text-gray-300 ml-2">
                          <a
                            href={row[1]?.trim() || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {row[1]?.trim() || "N/A"}
                          </a>
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Title:</span>
                        <span className="text-gray-300 ml-2">{row[2]?.trim() || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">City:</span>
                        <span className="text-gray-300 ml-2">{row[3]?.trim() || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">About:</span>
                        <span className="text-gray-300 ml-2">{row[4]?.trim() || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Icebreaker:</span>
                        <span className="text-gray-300 ml-2">{row[5]?.trim() || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Connection Send:</span>
                        <span className="text-gray-300 ml-2">{row[6]?.trim() || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Connection Accepted:</span>
                        <span className="text-gray-300 ml-2">{row[7]?.trim() || "N/A"}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
