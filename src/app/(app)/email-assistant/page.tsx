"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  generateMotivationalEmail,
  type GenerateMotivationalEmailOutput,
} from "@/ai/flows/ai-generate-motivational-email";
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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, Mail, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  userName: z.string().min(2, "Your name is required."),
});

export default function EmailAssistantPage() {
  const [result, setResult] = useState<GenerateMotivationalEmailOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await generateMotivationalEmail(values);
      setResult(response);
      toast({
        title: "Email Generated!",
        description: "Your AI-powered motivational email is ready.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to generate email. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = (text: string, type: 'subject' | 'body') => {
    navigator.clipboard.writeText(text);
    toast({
      title: `Copied to clipboard!`,
      description: `The email ${type} has been copied.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Mail className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold font-headline">AI Email Assistant</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Let AI draft professional and motivational emails for your job search.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Generate a Motivational Email</CardTitle>
          <CardDescription>Feeling stuck? Generate a quick, uplifting email to send to yourself or a friend to keep the momentum going.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Alex Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Email
                  </>
                )}
              </Button>
            </form>
          </Form>

          {isLoading && (
            <div className="mt-8 text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary"/>
                <p className="mt-2 text-muted-foreground">The AI is writing your email...</p>
            </div>
          )}

          {result && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Generated Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <div className="relative">
                    <Input id="subject" readOnly value={result.subject} className="pr-10"/>
                    <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => copyToClipboard(result.subject, 'subject')}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Body</Label>
                  <div className="relative">
                    <Textarea id="body" readOnly value={result.body} className="min-h-[250px] pr-10" />
                     <Button variant="ghost" size="icon" className="absolute right-1 top-2 h-8 w-8" onClick={() => copyToClipboard(result.body, 'body')}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
