import { DollarSign } from "lucide-react";
import SalaryCoachForm from "./_components/salary-coach-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SalaryCoachPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <DollarSign className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold font-headline">AI Salary Negotiation Coach</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Enter your job details to get data-driven insights and negotiation scripts to secure a higher salary.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Get Your Negotiation Plan</CardTitle>
          <CardDescription>Our AI provides salary benchmarks, company budget estimates, and powerful negotiation scripts to help you get paid what you're worth.</CardDescription>
        </CardHeader>
        <CardContent>
            <SalaryCoachForm />
        </CardContent>
      </Card>
    </div>
  );
}
