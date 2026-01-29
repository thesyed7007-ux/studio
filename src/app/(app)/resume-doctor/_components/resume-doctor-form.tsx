"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  aiRewriteResumeForJob,
  type AIRewriteResumeForJobOutput,
} from "@/ai/flows/ai-rewrite-resume-for-job";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const formSchema = z.object({
  resumeFile: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "A resume file is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      ".pdf, .doc, and .docx files are accepted."
    ),
  jobDescription: z.string().min(100, "Job description must be at least 100 characters long."),
});

export default function ResumeDoctorForm() {
  const [result, setResult] = useState<AIRewriteResumeForJobOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
    },
  });

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const resumeDataUri = await fileToDataUri(values.resumeFile[0]);
      const response = await aiRewriteResumeForJob({
        resumeDataUri,
        jobDescription: values.jobDescription,
      });
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to rewrite resume. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (result?.rewrittenResume) {
      navigator.clipboard.writeText(result.rewrittenResume);
      toast({
        title: "Copied to clipboard!",
        description: "The rewritten resume has been copied.",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="resumeFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Resume</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept={ACCEPTED_FILE_TYPES.join(",")}
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormDescription>
                  Upload your resume in PDF, DOC, or DOCX format.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the full job description here..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Rewriting...
              </>
            ) : (
              "Rewrite Resume"
            )}
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-8 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary"/>
            <p className="mt-2 text-muted-foreground">AI is working its magic...</p>
        </div>
      )}

      {result && (
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Rewritten Resume</CardTitle>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border p-4 bg-secondary/30">
              <pre className="whitespace-pre-wrap text-sm font-code">{result.rewrittenResume}</pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
