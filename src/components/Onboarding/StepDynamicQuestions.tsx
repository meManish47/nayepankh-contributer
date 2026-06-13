import { useState, useEffect } from "react"
import { ApplicantData } from "../../types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const QUESTION_BANK: Record<string, string> = {
  "Programming": "What kind of technical projects do you enjoy building?",
  "Teaching": "Have you mentored or taught others before? What was the experience like?",
  "Graphic Design": "What design tools do you use most frequently?",
  "UI/UX Design": "How do you approach designing a user-friendly interface?",
  "Content Writing": "What topics or formats are you most comfortable writing about?",
  "Marketing": "Can you share a successful campaign or marketing effort you've been a part of?",
  "Education": "In your opinion, what is the biggest challenge in the current education system?",
  "Technology": "How do you see technology changing the NGO sector?",
  "Community Development": "What does a thriving community look like to you?"
}

export default function StepDynamicQuestions({
  data,
  updateData,
  onNext
}: {
  data: ApplicantData;
  updateData: (data: Partial<ApplicantData>) => void;
  onNext: () => void;
}) {
  const [questions, setQuestions] = useState<string[]>([])
  
  useEffect(() => {
    // Generate questions based on skills and interests
    const generated: string[] = []
    
    for (const skill of data.skills) {
      if (QUESTION_BANK[skill] && generated.length < 2) {
        if (!generated.includes(QUESTION_BANK[skill])) {
          generated.push(QUESTION_BANK[skill])
        }
      }
    }
    
    for (const interest of data.interests) {
      if (QUESTION_BANK[interest] && generated.length < 2) {
        if (!generated.includes(QUESTION_BANK[interest])) {
          generated.push(QUESTION_BANK[interest])
        }
      }
    }
    
    // Fallback if not enough matched
    if (generated.length < 1) {
      generated.push("What motivates you to volunteer your time and skills?")
    }
    if (generated.length < 2) {
      generated.push("Can you describe a project you are particularly proud of?")
    }

    setQuestions(generated)
  }, [data.skills, data.interests])

  const isValid = questions.every(q => (data.interviewAnswers[q] || "").trim().length > 5)

  const handleAnswer = (question: string, answer: string) => {
    updateData({
      interviewAnswers: {
        ...data.interviewAnswers,
        [question]: answer
      }
    })
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">A few specific questions</h2>
          <p className="text-slate-600">Based on your profile, we'd love to know a bit more.</p>
        </div>

        <div className="pt-4 space-y-8">
          {questions.map((q, idx) => {
            const currentAnswer = data.interviewAnswers[q] || ""
            const chars = currentAnswer.trim().length
            const isAnswerValid = chars > 5
            return (
              <div key={idx} className="space-y-3">
                <Label className="text-base font-semibold text-slate-800">{q}</Label>
                <Textarea 
                  placeholder="Share your thoughts..." 
                  className="min-h-[100px] resize-none"
                  value={currentAnswer}
                  onChange={(e) => handleAnswer(q, e.target.value)}
                />
                <div className="flex justify-end">
                  <span className={`text-xs font-medium ${isAnswerValid ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {chars} / 6 characters minimum
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="pt-6 mt-auto border-t flex justify-end">
        <Button onClick={onNext} disabled={!isValid} className="px-8 bg-blue-600 hover:bg-blue-700">
          Continue
        </Button>
      </div>
    </div>
  )
}
