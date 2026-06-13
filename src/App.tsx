import { useState } from "react"
import { AppView, ApplicantData, AssessmentResult } from "./types"
import LandingPage from "./components/LandingPage"
import OnboardingFlow from "./components/Onboarding/OnboardingFlow"
import AnalysisScreen from "./components/AnalysisScreen"
import AssessmentReport from "./components/Report/AssessmentReport"

const initialApplicantData: ApplicantData = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  status: "",
  skills: [],
  interests: [],
  interviewAnswers: {},
  hoursPerWeek: "",
  availabilityType: "",
  remotePreference: "",
  motivation: "",
}

function App() {
  const [view, setView] = useState<AppView>("landing")
  const [applicantData, setApplicantData] = useState<ApplicantData>(initialApplicantData)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)

  const handleStartApplication = () => {
    setView("onboarding")
  }

  const handleOnboardingComplete = (data: ApplicantData) => {
    setApplicantData(data)
    setView("analysis")
  }

  const handleAnalysisComplete = (result: AssessmentResult) => {
    setAssessmentResult(result)
    setView("report")
  }

  const handleRestart = () => {
    setApplicantData(initialApplicantData)
    setAssessmentResult(null)
    setView("landing")
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {view === "landing" && (
        <LandingPage onStart={handleStartApplication} />
      )}
      
      {view === "onboarding" && (
        <OnboardingFlow 
          data={applicantData} 
          onComplete={handleOnboardingComplete} 
        />
      )}
      
      {view === "analysis" && (
        <AnalysisScreen 
          data={applicantData} 
          onComplete={handleAnalysisComplete} 
        />
      )}
      
      {view === "report" && assessmentResult && (
        <AssessmentReport 
          data={applicantData} 
          result={assessmentResult} 
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

export default App
