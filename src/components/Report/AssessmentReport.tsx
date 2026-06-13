import { useRef, useState } from "react"
import { ApplicantData, AssessmentResult } from "../../types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, CheckCircle2, User, Target, Zap, HeartHandshake } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export default function AssessmentReport({
  data,
  result,
  onRestart
}: {
  data: ApplicantData;
  result: AssessmentResult;
  onRestart: () => void;
}) {
  const reportRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const downloadPDF = async () => {
    if (!reportRef.current) return
    setIsExporting(true)
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      })
      
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      const pdf = new jsPDF("p", "mm", "a4")
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`NayePankh_Assessment_${data.fullName.replace(/\s+/g, '_')}.pdf`)
    } catch (err) {
      console.error("Failed to generate PDF", err)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border">
          <div className="font-medium text-slate-900">Application Complete</div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" onClick={onRestart} className="flex-1 sm:flex-none">
              <RefreshCw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
            <Button onClick={downloadPDF} disabled={isExporting} className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>

        {/* Report Document (Used for PDF Capture) */}
        <div 
          ref={reportRef} 
          className="bg-white shadow-xl rounded-none sm:rounded-xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-8 sm:p-12 border-b-8 border-blue-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <HeartHandshake className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="uppercase tracking-widest text-blue-400 font-bold text-sm mb-4">NayePankh Foundation</div>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Contributor Assessment Report</h1>
              <p className="text-slate-300 text-lg">Prepared for {data.fullName}</p>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-12">
            
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2">
                <h3 className="flex items-center text-lg font-bold text-slate-900 mb-4 border-b pb-2">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Applicant Profile
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <div className="text-slate-500 mb-1">Email</div>
                    <div className="font-medium text-slate-900">{data.email}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Status</div>
                    <div className="font-medium text-slate-900">{data.status} ({data.age} yrs)</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Availability</div>
                    <div className="font-medium text-slate-900">{data.hoursPerWeek}, {data.availabilityType}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Preference</div>
                    <div className="font-medium text-slate-900">{data.remotePreference}</div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 bg-slate-50 rounded-xl p-6 border flex flex-col items-center justify-center text-center">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Contribution Match Score</div>
                <div className="text-5xl font-black text-blue-600 mb-1">{result.score}%</div>
                <div className="text-xs text-slate-400">Based on alignment with active initiatives</div>
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <h3 className="flex items-center text-lg font-bold text-slate-900 mb-6 border-b pb-2">
                <Target className="w-5 h-5 mr-2 text-emerald-600" />
                Suggested Contribution Paths
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {result.topRoles.map((role, idx) => (
                  <Card key={idx} className={`border ${idx === 0 ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200'}`}>
                    <CardHeader className="py-4 px-6 flex flex-row items-center justify-between bg-transparent">
                      <CardTitle className="text-lg text-slate-900 flex items-center">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 text-white ${idx === 0 ? 'bg-blue-600' : 'bg-slate-400'}`}>
                          {idx + 1}
                        </span>
                        {role.title}
                      </CardTitle>
                      <Badge variant={idx === 0 ? "default" : "secondary"} className={idx === 0 ? "bg-blue-600" : ""}>
                        {role.matchPercentage}% Match
                      </Badge>
                    </CardHeader>
                    <CardContent className="px-6 pb-5 pt-0">
                      <div className="text-sm font-semibold text-slate-700 mb-3">Can help with:</div>
                      <ul className="space-y-2">
                        {role.helpsWith.map((task, i) => (
                          <li key={i} className="flex items-start text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Why & Strengths Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="flex items-center text-lg font-bold text-slate-900 mb-4 border-b pb-2">
                  <Zap className="w-5 h-5 mr-2 text-amber-500" />
                  Why this recommendation?
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {result.explainability}
                </p>
                <div className="mt-6">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Top Skills Found</div>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map(s => <Badge key={s} variant="outline" className="bg-slate-50">{s}</Badge>)}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">
                  Key Strengths
                </h3>
                <ul className="space-y-3">
                  {result.keyStrengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-3 shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Impact */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-blue-900 mb-3">How You Can Create Impact</h3>
              <p className="text-blue-800 leading-relaxed">
                {result.impactProjection}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
