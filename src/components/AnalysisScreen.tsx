import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ApplicantData, AssessmentResult } from "../types"
import { Loader2, CheckCircle2, KeyRound } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const ANALYSIS_STEPS = [
  "Connecting to Gemini AI...",
  "Parsing applicant profile...",
  "Evaluating skills and motivations...",
  "Generating personalized recommendations...",
  "Preparing assessment report..."
]

export default function AnalysisScreen({
  data,
  onComplete
}: {
  data: ApplicantData;
  onComplete: (result: AssessmentResult) => void;
}) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [apiKey, setApiKey] = useState<string>("")
  const [needsApiKey, setNeedsApiKey] = useState(false)
  const [tempKey, setTempKey] = useState("")
  const [error, setError] = useState("")
  const hasStarted = useRef(false)

  // Initialize
  useEffect(() => {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY
    const localKey = localStorage.getItem("GEMINI_API_KEY")
    
    if (envKey) {
      setApiKey(envKey)
    } else if (localKey) {
      setApiKey(localKey)
    } else {
      setNeedsApiKey(true)
    }
  }, [])

  const handleSaveKey = () => {
    if (tempKey.trim().length > 10) {
      localStorage.setItem("GEMINI_API_KEY", tempKey.trim())
      setApiKey(tempKey.trim())
      setNeedsApiKey(false)
    } else {
      setError("Please enter a valid Gemini API key")
    }
  }

  useEffect(() => {
    if (!apiKey || hasStarted.current) return;
    hasStarted.current = true;

    // Start progress animation
    const interval = setInterval(() => {
      setCurrentStepIdx(prev => Math.min(prev + 1, ANALYSIS_STEPS.length - 1))
    }, 2000)

    // Make the actual API call
    generateAssessment(data, apiKey)
      .then(result => {
        clearInterval(interval)
        setCurrentStepIdx(ANALYSIS_STEPS.length - 1)
        setTimeout(() => onComplete(result), 1000)
      })
      .catch(err => {
        console.error(err)
        setError(err.message || "Failed to generate assessment. Check API Key.")
        clearInterval(interval)
        hasStarted.current = false;
        setNeedsApiKey(true)
        localStorage.removeItem("GEMINI_API_KEY")
        setApiKey("")
      })

    return () => clearInterval(interval)
  }, [apiKey, data, onComplete])

  if (needsApiKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <KeyRound className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Gemini API Key Required</h2>
          <p className="text-slate-600 mb-6 text-sm">
            To generate a true AI-powered assessment, please provide a Gemini API Key. It will be stored locally in your browser.
          </p>
          <div className="w-full space-y-4 text-left">
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input 
                type="password" 
                placeholder="AIzaSy..." 
                value={tempKey} 
                onChange={e => setTempKey(e.target.value)} 
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button onClick={handleSaveKey} className="w-full bg-blue-600 hover:bg-blue-700">
              Save and Continue
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8 flex flex-col items-center text-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <motion.div 
            className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-6">Analyzing Profile</h2>

        <div className="w-full space-y-3 text-left">
          {ANALYSIS_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIdx
            const isActive = idx === currentStepIdx
            const isPending = idx > currentStepIdx

            return (
              <div key={idx} className={`flex items-center gap-3 text-sm transition-all duration-300 ${isPending ? 'opacity-30' : 'opacity-100'}`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                )}
                <span className={`font-medium ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                  {step}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

async function generateAssessment(data: ApplicantData, apiKey: string): Promise<AssessmentResult> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an expert recruiter and volunteer coordinator for the NayePankh Foundation, an NGO.
    Evaluate the following applicant based on their profile data and generate a JSON response recommending the best contribution paths.

    APPLICANT DATA:
    Name: ${data.fullName}
    Age: ${data.age}
    Status: ${data.status}
    Skills: ${data.skills.join(", ")}
    Interests: ${data.interests.join(", ")}
    Availability: ${data.hoursPerWeek}, ${data.availabilityType}
    Remote Preference: ${data.remotePreference}
    Motivation: ${data.motivation}
    Interview Answers:
    ${Object.entries(data.interviewAnswers).map(([q, a]) => `Q: ${q}\nA: ${a}`).join('\n')}

    REQUIREMENTS:
    Return a valid JSON object matching this schema exactly. DO NOT wrap the JSON in markdown code blocks. Just return the raw JSON object.
    {
      "score": <number 0-100 representing how well they match based on skills and availability>,
      "topRoles": [
        {
          "title": "<Role Title, e.g., Technical Contributor, Student Mentor>",
          "matchPercentage": <number 0-100>,
          "helpsWith": ["<task 1>", "<task 2>", "<task 3>"]
        }
      ], // strictly return top 3 roles
      "explainability": "<A paragraph explaining exactly WHY these roles are recommended based on their skills and answers. Use a professional, encouraging tone.>",
      "keyStrengths": [
        "<strength 1 based on resume>",
        "<strength 2 based on resume>",
        "<strength 3 based on resume>"
      ],
      "impactProjection": "<A paragraph describing the specific impact they will create at NayePankh Foundation>"
    }
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    let responseText = result.response.text();
    // Strip markdown formatting if the model still wrapped the JSON
    responseText = responseText.replace(/```json\n?|```\n?/g, "").trim();
    
    const parsed = JSON.parse(responseText) as AssessmentResult;
    
    // Validate required fields
    if (!parsed.score || !parsed.topRoles || !parsed.topRoles.length) {
      throw new Error("Invalid response structure from Gemini")
    }
    
    return parsed;
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    throw new Error(err.message || "Failed to process with AI.");
  }
}
