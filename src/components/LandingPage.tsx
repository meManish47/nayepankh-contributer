import { ArrowRight, CheckCircle2, Sparkles, User, FileText, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">NayePankh Foundation</span>
        </div>
        <Button variant="outline" className="hidden sm:flex" onClick={onStart}>
          Join the Team
        </Button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200">
            Now Recruiting Volunteers
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Join the NayePankh Team
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            An intelligent application experience that helps you discover how you can contribute to meaningful social impact initiatives.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 bg-blue-600 hover:bg-blue-700" onClick={onStart}>
              Start Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features / How It Works */}
        <div className="mt-32 max-w-6xl mx-auto w-full text-left">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">How It Works</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<User className="w-6 h-6 text-blue-600" />}
              step="Step 1"
              title="Tell us about yourself"
              description="Share your background, current status, and upload your resume for faster matching."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
              step="Step 2"
              title="Share your skills"
              description="Select your core skills and areas of interest that align with our NGO's mission."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6 text-purple-600" />}
              step="Step 3"
              title="Smart matching"
              description="Our system analyzes your profile to find the perfect contribution opportunities."
            />
            <FeatureCard 
              icon={<FileText className="w-6 h-6 text-orange-600" />}
              step="Step 4"
              title="Get your report"
              description="Receive a comprehensive assessment report outlining how you can create an impact."
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} NayePankh Foundation. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, step, title, description }: { icon: React.ReactNode, step: string, title: string, description: string }) {
  return (
    <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
      <CardContent className="pt-6">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="text-sm font-semibold text-blue-600 mb-2">{step}</div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
