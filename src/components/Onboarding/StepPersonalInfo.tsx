import { ApplicantData } from "../../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StepPersonalInfo({
  data,
  updateData,
  onNext
}: {
  data: ApplicantData;
  updateData: (data: Partial<ApplicantData>) => void;
  onNext: () => void;
}) {
  const isValid = data.fullName.trim() !== "" && data.email.trim() !== "" && data.status !== ""

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Tell us about yourself</h2>
          <p className="text-slate-600">Let's start with the basics.</p>
        </div>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              placeholder="Jane Doe" 
              value={data.fullName}
              onChange={(e) => updateData({ fullName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="jane@example.com" 
                value={data.email}
                onChange={(e) => updateData({ email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+91 98765 43210" 
                value={data.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                placeholder="22" 
                value={data.age}
                onChange={(e) => updateData({ age: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Current Status</Label>
              <Select value={data.status} onValueChange={(val) => updateData({ status: val })}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Freelancer">Freelancer</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
