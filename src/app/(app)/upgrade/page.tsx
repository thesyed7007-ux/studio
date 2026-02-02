import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap } from "lucide-react";

const proFeatures = [
  "AI Resume Tailoring for any Job",
  "Unlimited AI Mock Interviews",
  "Data-driven Salary Negotiation Scripts",
  "Advanced Company Culture Insights",
  "AI-Powered Email Drafting Assistant",
  "Priority Support",
];

export default function UpgradePage() {
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
            <p className="text-4xl font-bold">$9<span className="text-lg font-normal text-muted-foreground">/month</span></p>
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
                {/* Important: Replace '#' with your actual Stripe Payment Link */}
                <a href="#" target="_blank" rel="noopener noreferrer">Upgrade Now</a>
            </Button>
        </CardFooter>
      </Card>
      <p className="text-center text-xs text-muted-foreground mt-4">
        You will be redirected to Stripe to complete your purchase. You can cancel anytime.
      </p>
    </div>
  );
}
