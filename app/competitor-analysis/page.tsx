"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Download, AlertCircle, ArrowLeft, TrendingUp } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

interface FormData {
  id?: string
  limit: number
  page_number: number
  username: string
}

export default function CompetitorAnalysisPage() {
  const [formData, setFormData] = useState<FormData>({
    limit: 10,
    page_number: 1,
    username: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)

  const testWebhook = async () => {
    console.log("Testing webhook with simple data...")
    setError(null)
    
    try {
      const testPayload = {
        limit: 10,
        page_number: 1,
        username: "test-user"
      }
      
      console.log("Test payload:", testPayload)
      
      const response = await fetch(
        "https://n8n-kartik-hfaqabaagehkhfhe.malaysiawest-01.azurewebsites.net/webhook/dbc655ce-ee59-45b9-baee-dc2ecc331272",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testPayload),
        }
      )
      
      console.log("Test response status:", response.status)
      console.log("Test response headers:", [...response.headers.entries()])
      
      const text = await response.text()
      console.log("Test response body:", text.substring(0, 200) + "...")
      
      setError(`Test completed! Status: ${response.status}. Check console for details.`)
    } catch (err) {
      console.error("Test error:", err)
      setError(`Test failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted with data:", formData)
    
    setIsLoading(true)
    setError(null)
    setPdfUrl(null)
    setPdfBlob(null)

    try {
      const payload: any = {
        limit: formData.limit,
        page_number: formData.page_number,
        username: formData.username
      }
      
      // Add id if provided
      if (formData.id && formData.id.trim()) {
        payload.id = formData.id
      }

      console.log("Sending payload:", payload)

      const response = await fetch(
        "https://n8n-kartik-hfaqabaagehkhfhe.malaysiawest-01.azurewebsites.net/webhook/dbc655ce-ee59-45b9-baee-dc2ecc331272",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/pdf, application/json, */*",
          },
          body: JSON.stringify(payload),
        }
      )

      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `Request failed with status ${response.status}`
        try {
          const errorText = await response.text()
          if (errorText) {
            errorMessage += `: ${errorText}`
          }
        } catch (e) {
          // Ignore error parsing error message
        }
        throw new Error(errorMessage)
      }

      const contentType = response.headers.get("content-type")
      console.log("Content-Type:", contentType)

      const blob = await response.blob()
      console.log("Blob type:", blob.type, "Blob size:", blob.size)
      
      // Check if it's a PDF or if the server sent JSON with an error
      if (blob.type.includes("application/json")) {
        const text = await blob.text()
        console.log("JSON response:", text)
        throw new Error(`Server returned JSON instead of PDF: ${text}`)
      }
      
      if (!blob.type.includes("application/pdf") && blob.size > 0) {
        console.warn("Response is not a PDF but has content, proceeding anyway...")
      }
      
      if (blob.size === 0) {
        throw new Error("Received empty response from server")
      }

      setPdfBlob(blob)
      const url = URL.createObjectURL(blob)
      setPdfUrl(url)
      console.log("PDF URL created successfully:", url)
    } catch (err) {
      console.error("Error in handleSubmit:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `linkedin-competitor-analysis-${formData.username}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto space-y-10">
        {/* Back Navigation */}
        <div className="pt-4">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to AutoNerve
          </Link>
        </div>

        {/* Header */}
        <div className="text-center py-8">
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-200/50 shadow">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-blue-900">AI-Powered Analysis</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            LinkedIn Competitor Analysis
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Generate comprehensive competitor analysis reports from LinkedIn profiles. Get insights into posting patterns, engagement tactics, and content strategies.
          </p>
        </div>

        {/* Form Card */}
        <Card className="w-full bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-blue-500/10 rounded-2xl">
          <div className="rounded-t-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-t-2xl px-10 pt-8 pb-6">
              <CardTitle className="text-2xl font-bold">Analysis Parameters</CardTitle>
              <CardDescription className="text-blue-100 mt-2">
                Fill in the details to generate your competitor analysis report
              </CardDescription>
            </CardHeader>
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="username" className="font-semibold">LinkedIn Username *</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="e.g., kartik-solanki-284874349"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    required
                    className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-lg"
                  />
                  <p className="text-xs text-gray-500">
                    Enter the LinkedIn username (found in profile URL)
                  </p>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="id" className="font-semibold">ID (Optional)</Label>
                  <Input
                    id="id"
                    type="text"
                    placeholder="Optional identifier"
                    value={formData.id || ""}
                    onChange={(e) => handleInputChange("id", e.target.value)}
                    className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-lg"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="limit" className="font-semibold">Post Limit</Label>
                  <Input
                    id="limit"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.limit}
                    onChange={(e) => handleInputChange("limit", parseInt(e.target.value) || 10)}
                    className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-lg"
                  />
                  <p className="text-xs text-gray-500">
                    Number of posts to analyze (1-50)
                  </p>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="page_number" className="font-semibold">Page Number</Label>
                  <Input
                    id="page_number"
                    type="number"
                    min="1"
                    value={formData.page_number}
                    onChange={(e) => handleInputChange("page_number", parseInt(e.target.value) || 1)}
                    className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-lg"
                  />
                  <p className="text-xs text-gray-500">
                    Page number for pagination
                  </p>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all rounded-xl" 
                disabled={isLoading || !formData.username.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center text-white">
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    <span>Generating Analysis...</span>
                  </div>
                ) : (
                  <span className="text-white font-bold">Generate Analysis Report</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 shadow-lg">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* PDF Preview and Download */}
        {pdfUrl && (
          <Card className="w-full bg-white/90 backdrop-blur-sm border-0 shadow-xl shadow-green-500/10 mt-10">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between text-2xl">
                <span>Analysis Report Generated</span>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="text-green-100">
                Your LinkedIn competitor analysis is ready. You can view it below or download it.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="w-full h-96 md:h-[600px] border-2 border-gray-200 rounded-lg overflow-hidden shadow-inner bg-gray-50">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full"
                  title="LinkedIn Competitor Analysis Report"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={handleDownload} 
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] rounded-xl"
                >
                  <Download className="h-5 w-5" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}