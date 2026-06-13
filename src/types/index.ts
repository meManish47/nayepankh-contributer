export type AppView = "landing" | "onboarding" | "analysis" | "report";

export interface ApplicantData {
  // Step 1: Personal Info
  fullName: string;
  email: string;
  phone: string;
  age: string;
  status: string; // Student, Professional, Freelancer, Other
  
  // Step 2 & 3: Skills and Interests
  skills: string[];
  interests: string[];
  
  // Step 4: Dynamic Interview Questions (Store answers)
  interviewAnswers: Record<string, string>;
  
  // Step 5: Availability & Motivation
  hoursPerWeek: string;
  availabilityType: string; // Weekdays, Weekends, Both
  remotePreference: string; // Remote, Hybrid, On-site
  motivation: string;
}

export interface AssessmentResult {
  score: number;
  topRoles: Array<{ title: string; matchPercentage: number; helpsWith: string[] }>;
  explainability: string;
  keyStrengths: string[];
  impactProjection: string;
}
