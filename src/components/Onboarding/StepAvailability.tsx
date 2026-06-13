import { ApplicantData } from "../../types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StepAvailability({
  data,
  updateData,
  onNext
}: {
  data: ApplicantData;
  updateData: (data: Partial<ApplicantData>) => void;
  onNext: () => void;
}) {
  const isValid = 
    data.hoursPerWeek !== "" && 
    data.availabilityType !== "" && 
    data.remotePreference !== "" && 
    data.motivation.trim().length > 10

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Availability & Motivation</h2>
          <p className="text-slate-600">Almost done! Let's figure out logistics.</p>
        </div>

        <div className="pt-4 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Hours available per week</Label>
              <Select value={data.hoursPerWeek} onValueChange={(val) => updateData({ hoursPerWeek: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5 Hours">1-5 Hours</SelectItem>
                  <SelectItem value="5-10 Hours">5-10 Hours</SelectItem>
                  <SelectItem value="10-20 Hours">10-20 Hours</SelectItem>
                  <SelectItem value="20+ Hours">20+ Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Availability Type</Label>
              <Select value={data.availabilityType} onValueChange={(val) => updateData({ availabilityType: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weekdays">Weekdays</SelectItem>
                  <SelectItem value="Weekends">Weekends</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 max-w-[50%] sm:max-w-none sm:w-1/2 sm:pr-2">
            <Label>Remote Preference</Label>
            <Select value={data.remotePreference} onValueChange={(val) => updateData({ remotePreference: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="On-site">On-site</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 pt-4">
            <Label className="text-base font-semibold text-slate-900">Why would you like to contribute to NayePankh Foundation?</Label>
            <Textarea 
              placeholder="Share your motivation..." 
              className="min-h-[120px] resize-none"
              value={data.motivation}
              onChange={(e: any) => updateData({ motivation: e.target.value })}
            />
            <div className="flex justify-end">
              <span className={`text-xs font-medium ${data.motivation.trim().length > 10 ? 'text-emerald-600' : 'text-slate-400'}`}>
                {data.motivation.trim().length} / 11 characters minimum
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-auto border-t flex justify-end">
        <Button onClick={onNext} disabled={!isValid} className="px-8 bg-blue-600 hover:bg-blue-700">
          Complete Application
        </Button>
      </div>
    </div>
  )
}
