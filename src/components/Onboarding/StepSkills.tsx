import { useState } from "react"
import { ApplicantData } from "../../types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

const DEFAULT_SKILLS = [
  "Programming", "Teaching", "Graphic Design", "UI/UX Design", 
  "Content Writing", "Public Speaking", "Marketing", "Video Editing", 
  "Photography", "Social Media Management", "Community Building", 
  "Research", "Leadership", "Project Management"
]

export default function StepSkills({
  data,
  updateData,
  onNext
}: {
  data: ApplicantData;
  updateData: (data: Partial<ApplicantData>) => void;
  onNext: () => void;
}) {
  const [customSkill, setCustomSkill] = useState("")

  const toggleSkill = (skill: string) => {
    if (data.skills.includes(skill)) {
      updateData({ skills: data.skills.filter(s => s !== skill) })
    } else {
      updateData({ skills: [...data.skills, skill] })
    }
  }

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (customSkill.trim() && !data.skills.includes(customSkill.trim())) {
      updateData({ skills: [...data.skills, customSkill.trim()] })
      setCustomSkill("")
    }
  }

  const allSkills = Array.from(new Set([...DEFAULT_SKILLS, ...data.skills]))

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">What are your skills?</h2>
          <p className="text-slate-600">Select all that apply. This helps us recommend the best role.</p>
          {data.skills.length > 0 && (
            <p className="text-sm text-emerald-600 font-medium mt-2">
              Detected from resume: {data.skills.filter(s => DEFAULT_SKILLS.includes(s) || data.skills.includes(s)).length} skills
            </p>
          )}
        </div>

        <div className="pt-4">
          <div className="flex flex-wrap gap-2 mb-6">
            {allSkills.map(skill => {
              const isSelected = data.skills.includes(skill)
              return (
                <Badge
                  key={skill}
                  variant={isSelected ? "default" : "outline"}
                  className={`px-3 py-1.5 text-sm cursor-pointer transition-colors ${
                    isSelected ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-slate-100 text-slate-700 font-normal"
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              )
            })}
          </div>

          <form onSubmit={addCustomSkill} className="flex items-center gap-2 max-w-sm">
            <Input 
              placeholder="Add another skill..." 
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
            />
            <Button type="submit" variant="secondary" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      <div className="pt-6 mt-auto border-t flex justify-end">
        <Button onClick={onNext} disabled={data.skills.length === 0} className="px-8 bg-blue-600 hover:bg-blue-700">
          Continue
        </Button>
      </div>
    </div>
  )
}
