"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  generateCoverLetter,
  type GenerateCoverLetterOutput,
} from "@/ai/flows/ai-generate-cover-letter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, Feather, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  fullName: z.string().min(2, "Your name is required."),
  jobTitle: z.string().min(2, "Job title is required."),
  companyName: z.string().min(2, "Company name is required."),
  jobDescription: z.string().min(50, "Please provide a more detailed job description."),
  userSummary: z.string().min(50, "Please provide a summary of your skills and experience."),
});

export default function CoverLetterGeneratorPage() {
  const [result, setResult] = useState<GenerateCoverLetterOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      jobTitle: "",
      companyName: "",
      jobDescription: "",
      userSummary: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await generateCoverLetter(values);
      setResult(response);
      toast({
        title: "Cover Letter Generated!",
        description: "Your AI-powered cover letter is ready.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to generate cover letter. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `Copied to clipboard!`,
      description: `The cover letter has been copied.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Feather className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold font-headline">AI Cover Letter Writer</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Create a professional cover letter tailored to a specific job in seconds.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Generate a Custom Cover Letter</CardTitle>
          <CardDescription>Fill out the details below, and our AI will craft a compelling letter to help you stand out.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Your Full Name</FormLabel><FormControl><Input placeholder="Alex Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="jobTitle" render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="Product Manager" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="Innovate Inc." {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <FormField control={form.control} name="userSummary" render={({ field }) => (<FormItem><FormLabel>Your Skills & Experience Summary</FormLabel><FormControl><Textarea placeholder="Briefly summarize your key qualifications, skills, and most relevant career achievements. You can copy-paste the summary from your resume." className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="jobDescription" render={({ field }) => (<FormItem><FormLabel>Target Job Description</FormLabel><FormControl><Textarea placeholder="Paste the full job description here." className="min-h-[200px]" {...field} /></FormControl><FormMessage /></FormItem>)} />
              
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" /> Generate Cover Letter</>
                )}
              </Button>
            </form>
          </Form>

          {isLoading && (
            <div className="mt-8 text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary"/>
                <p className="mt-2 text-muted-foreground">The AI is writing your cover letter...</p>
            </div>
          )}

          {result && (
            <Card className="mt-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Generated Cover Letter</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(result.coverLetter)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                  <div className="relative">
                    <Textarea readOnly value={result.coverLetter} className="min-h-[400px] bg-secondary/30 font-serif" />
                  </div>
              </CardContent>
            </Card>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
