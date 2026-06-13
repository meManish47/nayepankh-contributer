# NayePankh Join Team Assistant

An AI-powered onboarding and application assistant designed for the NayePankh Foundation.

## Why this was built (Project Purpose)

While reviewing the NayePankh Foundation website, we noticed that clicking the "Join Us" button currently redirects users to the "Donate Now" page. There was no dedicated option for interested volunteers to directly join the NGO and contribute their skills through the website. 

To solve this, **we built this AI-Agent integrated contributor onboarding platform**. 

Instead of a generic multi-step form, this application acts as an intelligent recruiter. It evaluates prospective volunteers by:
- Automatically extracting skills and interests directly from their uploaded resume using client-side PDF parsing.
- Asking dynamic, context-aware interview questions based on their specific skills.
- Utilizing the **Google Gemini API** to analyze their profile, generate a "Contribution Match Score," and intelligently recommend the best pathways for them to create an impact within the foundation.

## Features

- **Resume Parsing**: `pdfjs-dist` is used to read PDFs entirely client-side, ensuring privacy while intelligently auto-suggesting skills.
- **Dynamic Interviewing**: Pre-configured branching logic that asks relevant questions based on applicant interests.
- **AI-Powered Assessment**: A true LLM integration (Gemini 2.5 Flash) that analyzes the applicant's input to generate personalized volunteer role recommendations.
- **PDF Export**: Generates a professional "Contributor Assessment Report" that can be downloaded using `html2canvas` and `jsPDF`.
- **Premium UI**: Built with React, Tailwind CSS, Shadcn UI, and Framer Motion for a SaaS-like, polished aesthetic.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion
- Google Generative AI SDK (`@google/generative-ai`)
- `pdfjs-dist` & `jspdf`

## Running Locally

Since this application does not use a custom backend, you must provide a Google Gemini API Key to use the AI evaluation features.

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=AIzaSy...
   ```
   *(Note: If you do not provide this file, the application will securely prompt you to enter the key in the UI during the analysis step).*

3. Start the development server:
   ```bash
   npm run dev
   ```
