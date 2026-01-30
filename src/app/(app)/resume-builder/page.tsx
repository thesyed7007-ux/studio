import { ClipboardSignature } from "lucide-react";
import ResumeBuilderForm from "./_components/resume-builder-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResumeBuilderPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <ClipboardSignature className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold font-headline">AI Resume Builder</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Input your career details and let our AI craft a professional resume for you.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Build Your Resume</CardTitle>
          <CardDescription>Fill in your details below. The more information you provide, the better the result. You can also add a job description to tailor your new resume.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResumeBuilderForm />
        </CardContent>
      </Card>
    </div>
  );
}
