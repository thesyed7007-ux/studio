import { FileText } from "lucide-react";
import ResumeDoctorForm from "./_components/resume-doctor-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResumeDoctorPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <FileText className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold font-headline">AI Resume Doctor</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload your resume and paste a job description to get a tailored version in seconds.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Rewrite Your Resume</CardTitle>
          <CardDescription>Our AI will analyze the job description and optimize your resume to highlight the most relevant skills and experience, increasing your chances of passing ATS screening.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResumeDoctorForm />
        </CardContent>
      </Card>
    </div>
  );
}
