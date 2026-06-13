import { useState } from "react"
import { ApplicantData } from "../../types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

const DEFAULT_INTERESTS = [
  "Education", "Technology", "Awareness Campaigns", "Women Empowerment",
  "Community Development", "Fundraising", "Social Media", "Events",
  "Research", "Digital Transformation", "Student Programs", "Career Guidance"
]

export default function StepInterests({
  data,
  updateData,
  onNext
}: {
  data: ApplicantData;
  updateData: (data: Partial<ApplicantData>) => void;
  onNext: () => void;
}) {
  const [customInterest, setCustomInterest] = useState("")

  const toggleInterest = (interest: string) => {
    if (data.interests.includes(interest)) {
      updateData({ interests: data.interests.filter(i => i !== interest) })
    } else {
      updateData({ interests: [...data.interests, interest] })
    }
  }

  const addCustomInterest = (e: React.FormEvent) => {
    e.preventDefault()
    if (customInterest.trim() && !data.interests.includes(customInterest.trim())) {
      updateData({ interests: [...data.interests, customInterest.trim()] })
      setCustomInterest("")
    }
  }

  const allInterests = Array.from(new Set([...DEFAULT_INTERESTS, ...data.interests]))

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Areas of Interest</h2>
          <p className="text-slate-600">What causes or initiatives are you most passionate about?</p>
        </div>

        <div className="pt-4">
          <div className="flex flex-wrap gap-2 mb-6">
            {allInterests.map(interest => {
              const isSelected = data.interests.includes(interest)
              return (
                <Badge
                  key={interest}
                  variant={isSelected ? "default" : "outline"}
                  className={`px-3 py-1.5 text-sm cursor-pointer transition-colors ${
                    isSelected ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-slate-100 text-slate-700 font-normal"
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              )
            })}
          </div>

          <form onSubmit={addCustomInterest} className="flex items-center gap-2 max-w-sm">
            <Input 
              placeholder="Add another interest..." 
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
            />
            <Button type="submit" variant="secondary" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      <div className="pt-6 mt-auto border-t flex justify-end">
        <Button onClick={onNext} disabled={data.interests.length === 0} className="px-8 bg-blue-600 hover:bg-blue-700">
          Continue
        </Button>
      </div>
    </div>
  )
}
