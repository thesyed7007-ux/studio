"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  negotiateSalary,
  type NegotiateSalaryOutput,
} from "@/ai/flows/ai-salary-negotiation-coach";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp, FileText, Banknote, Sigma } from "lucide-react";

const formSchema = z.object({
  jobTitle: z.string().min(2, "Job title is required."),
  location: z.string().min(2, "Location is required."),
  yearsOfExperience: z.coerce.number().min(0, "Years of experience must be 0 or more."),
  currentOffer: z.coerce.number().optional(),
});

export default function SalaryCoachForm() {
  const [result, setResult] = useState<NegotiateSalaryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      location: "",
      yearsOfExperience: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await negotiateSalary(values);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to get salary insights. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., San Francisco, CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentOffer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Offer (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 120000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Get Negotiation Plan"
            )}
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-8 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary"/>
            <p className="mt-2 text-muted-foreground">Gathering market data...</p>
        </div>
      )}

      {result && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <TrendingUp className="h-8 w-8 text-primary"/>
                    <CardTitle>Salary Range</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">{result.salaryRange}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Banknote className="h-8 w-8 text-primary"/>
                    <CardTitle>Company Budget</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">{result.companyBudgetRange}</p>
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Sigma className="h-8 w-8 text-primary"/>
                    <CardTitle>Offer Calculation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">{result.offerCalculation}</p>
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center gap-4">
                    <FileText className="h-8 w-8 text-primary"/>
                    <CardTitle>Negotiation Script</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="whitespace-pre-wrap text-sm font-sans bg-secondary/30 p-4 rounded-md">{result.negotiationScript}</pre>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
