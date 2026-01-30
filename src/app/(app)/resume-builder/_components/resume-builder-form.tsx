"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  aiBuildResume,
  type AIBuildResumeOutput,
} from "@/ai/flows/ai-build-resume";
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
import { Loader2, Copy, PlusCircle, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phoneNumber: z.string().min(10, "Phone number is required."),
  linkedinUrl: z.string().url("Invalid URL.").optional().or(z.literal('')),
  githubUrl: z.string().url("Invalid URL.").optional().or(z.literal('')),
  personalSummary: z.string().min(20, "Summary should be at least 20 characters."),
  workExperience: z.array(
    z.object({
      jobTitle: z.string().min(2, "Job title is required."),
      company: z.string().min(2, "Company name is required."),
      location: z.string().min(2, "Location is required."),
      startDate: z.string().min(4, "Start date is required."),
      endDate: z.string().min(4, "End date is required."),
      responsibilities: z.string().min(20, "Please describe your responsibilities."),
    })
  ),
  education: z.array(
    z.object({
        degree: z.string().min(2, "Degree is required."),
        school: z.string().min(2, "School name is required."),
        location: z.string().min(2, "Location is required."),
        graduationDate: z.string().min(4, "Graduation date is required."),
    })
  ),
  skills: z.string().min(2, "Please list at least one skill."),
  jobDescription: z.string().optional(),
});

export default function ResumeBuilderForm() {
  const [result, setResult] = useState<AIBuildResumeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      linkedinUrl: "",
      githubUrl: "",
      personalSummary: "",
      workExperience: [{ jobTitle: "", company: "", location: "", startDate: "", endDate: "", responsibilities: "" }],
      education: [{ degree: "", school: "", location: "", graduationDate: "" }],
      skills: "",
      jobDescription: "",
    },
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control: form.control,
    name: "education",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await aiBuildResume(values);
      setResult(response);
      toast({
        title: "Resume Generated!",
        description: "Your new resume has been created by AI.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to build resume. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (result?.generatedResume) {
      navigator.clipboard.writeText(result.generatedResume);
      toast({
        title: "Copied to clipboard!",
        description: "The generated resume has been copied.",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Details */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="phoneNumber" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="linkedinUrl" render={({ field }) => (<FormItem><FormLabel>LinkedIn Profile</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/johndoe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="githubUrl" render={({ field }) => (<FormItem><FormLabel>GitHub Profile</FormLabel><FormControl><Input placeholder="https://github.com/johndoe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
            </div>

            {/* Professional Summary */}
            <FormField control={form.control} name="personalSummary" render={({ field }) => (<FormItem><FormLabel>Professional Summary</FormLabel><FormControl><Textarea placeholder="A brief summary of your career achievements and goals..." {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <Separator />
            
            {/* Work Experience */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Work Experience</h3>
                {expFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name={`workExperience.${index}.jobTitle`} render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name={`workExperience.${index}.company`} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name={`workExperience.${index}.location`} render={({ field }) => (<FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name={`workExperience.${index}.startDate`} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input placeholder="e.g., 08/2020" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name={`workExperience.${index}.endDate`} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input placeholder="e.g., Present" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                        </div>
                        <FormField control={form.control} name={`workExperience.${index}.responsibilities`} render={({ field }) => (<FormItem><FormLabel>Responsibilities & Achievements</FormLabel><FormControl><Textarea placeholder="Describe your key responsibilities and accomplishments in this role..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <Button type="button" variant="outline" size="icon" className="absolute top-2 right-2" onClick={() => removeExp(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendExp({ jobTitle: "", company: "", location: "", startDate: "", endDate: "", responsibilities: "" })}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
            </div>

            <Separator />
            
            {/* Education */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Education</h3>
                {eduFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (<FormItem><FormLabel>Degree / Certificate</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                             <FormField control={form.control} name={`education.${index}.school`} render={({ field }) => (<FormItem><FormLabel>School / Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                             <FormField control={form.control} name={`education.${index}.location`} render={({ field }) => (<FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                             <FormField control={form.control} name={`education.${index}.graduationDate`} render={({ field }) => (<FormItem><FormLabel>Graduation Date</FormLabel><FormControl><Input placeholder="e.g., 05/2020" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                         <Button type="button" variant="outline" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendEdu({ degree: "", school: "", location: "", graduationDate: "" })}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
            </div>

            <Separator />

            {/* Skills */}
            <FormField control={form.control} name="skills" render={({ field }) => (<FormItem><FormLabel>Skills</FormLabel><FormControl><Textarea placeholder="List your skills, separated by commas (e.g., React, TypeScript, Node.js, Project Management)" {...field} /></FormControl><FormDescription>Provide a comma-separated list of your skills.</FormDescription><FormMessage /></FormItem>)} />
            
            <Separator />

             {/* Job Description */}
            <FormField control={form.control} name="jobDescription" render={({ field }) => (<FormItem><FormLabel>Target Job Description (Optional)</FormLabel><FormControl><Textarea placeholder="Paste a job description here to tailor your resume for a specific role." className="min-h-[150px]" {...field} /></FormControl><FormDescription>Pasting a job description will help the AI tailor your resume to the specific role.</FormDescription><FormMessage /></FormItem>)} />


          <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
            {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Building Resume...</> : "Build My Resume with AI"}
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-8 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary"/>
            <p className="mt-2 text-muted-foreground">AI is crafting your professional resume...</p>
        </div>
      )}

      {result && (
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your AI-Generated Resume</CardTitle>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] w-full rounded-md border p-4 bg-secondary/30">
              <pre className="whitespace-pre-wrap text-sm font-code">{result.generatedResume}</pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
