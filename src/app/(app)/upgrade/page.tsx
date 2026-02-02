
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/firebase";
import { CheckCircle, Zap, Info } from "lucide-react";

const proFeatures = [
  "AI Resume Tailoring for any Job",
  "Unlimited AI Mock Interviews",
  "Data-driven Salary Negotiation Scripts",
  "Advanced Company Culture Insights",
  "AI-Powered Email Drafting Assistant",
  "Priority Support",
];

export default function UpgradePage() {
  const { user, isUserLoading } = useUser();

  return (
    <div className="max-w-3xl mx-auto">
       <div className="text-center mb-8">
        <Zap className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold font-headline">Go Pro & Land Your Dream Job Faster</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Stop juggling tools. Unlock the complete AI-powered suite to accelerate your career.
        </p>
      </div>
      <Card className="shadow-lg shadow-primary/10">
        <CardHeader className="text-center">
            <h2 className="text-2xl font-bold font-headline">CareerCopilot Pro</h2>
            <p className="text-4xl font-bold">₹139</p>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-sm text-center text-muted-foreground">Includes everything in the free plan, plus:</p>
            <ul className="space-y-3">
                {proFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-foreground">{feature}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
        <CardFooter>
            <Button className="w-full text-lg" size="lg" asChild>
                <a href="upi://pay?pa=9541814952@fam&pn=CareerCopilot&am=139&cu=INR">Upgrade Now</a>
            </Button>
        </CardFooter>
      </Card>
      
      {!isUserLoading && user && (
        <Card className="mt-8 bg-secondary/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Info className="h-6 w-6 text-primary"/>
              <CardTitle>Automate Your Pro Access</CardTitle>
            </div>
            <CardDescription>
              To automatically unlock Pro features after payment, use the User ID below in an automation tool like Zapier or Make.com.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="mb-2">This is your unique User ID. You will need it to connect your payment to your account.</p>
                <Label htmlFor="userId">Your Unique User ID</Label>
                <Input id="userId" readOnly value={user.uid} className="mt-1 font-mono bg-background"/>
              </div>
              <ol className="list-decimal list-inside space-y-1">
                <li>Set up a "Zap" to watch your Gmail for new Fampay confirmation emails.</li>
                <li>When an email arrives, extract the payment details.</li>
                <li>Use the "Firebase" integration in Zapier to update a document in the `users` collection.</li>
                <li>Use the User ID above as the "Document ID" to update your record and set the `isPro` field to `true`.</li>
              </ol>
          </CardContent>
        </Card>
      )}

      <p className="text-center text-xs text-muted-foreground mt-4">
        You will be prompted to complete your payment via UPI. Please note that feature unlocking is not instant and depends on your automation setup.
      </p>
    </div>
  );
}

    