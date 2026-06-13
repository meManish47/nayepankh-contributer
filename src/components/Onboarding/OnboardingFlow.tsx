import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ApplicantData } from "../../types"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft } from "lucide-react"

import StepPersonalInfo from "./StepPersonalInfo"
import StepResumeUpload from "./StepResumeUpload"
import StepSkills from "./StepSkills"
import StepInterests from "./StepInterests"
import StepDynamicQuestions from "./StepDynamicQuestions"
import StepAvailability from "./StepAvailability"

const TOTAL_STEPS = 6

export default function OnboardingFlow({ 
  data, 
  onComplete,
  onBack
}: { 
  data: ApplicantData, 
  onComplete: (data: ApplicantData) => void,
  onBack: () => void
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ApplicantData>(data)

  const updateFormData = (updates: Partial<ApplicantData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete(formData)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    } else {
      onBack()
    }
  }

  const progress = (currentStep / TOTAL_STEPS) * 100

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="px-6 py-4 border-b bg-white flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-semibold text-slate-900">Application Assistant</h2>
            <p className="text-xs text-slate-500">Step {currentStep} of {TOTAL_STEPS}</p>
          </div>
        </div>
        <div className="w-1/3 max-w-xs hidden sm:block">
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border p-6 sm:p-10 min-h-[500px] flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              {currentStep === 1 && <StepPersonalInfo data={formData} updateData={updateFormData} onNext={handleNext} />}
              {currentStep === 2 && <StepResumeUpload data={formData} updateData={updateFormData} onNext={handleNext} />}
              {currentStep === 3 && <StepSkills data={formData} updateData={updateFormData} onNext={handleNext} />}
              {currentStep === 4 && <StepInterests data={formData} updateData={updateFormData} onNext={handleNext} />}
              {currentStep === 5 && <StepDynamicQuestions data={formData} updateData={updateFormData} onNext={handleNext} />}
              {currentStep === 6 && <StepAvailability data={formData} updateData={updateFormData} onNext={handleNext} />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="w-full max-w-2xl mt-4 sm:hidden">
          <Progress value={progress} className="h-2" />
        </div>
      </main>
    </div>
  )
}
