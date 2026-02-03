"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  utr: z.string().min(10, "Please enter a valid UTR number.").max(30, "UTR number seems too long."),
});

export default function PaymentConfirmationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      utr: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Simulate an API call to a backend that would verify the UTR
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    
    toast({
      title: "Confirmation Received!",
      description: "We're verifying your payment. Pro features will unlock automatically in a few minutes. You can now close this page.",
    });

    form.reset();
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold font-headline">Confirm Your Payment</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Enter your transaction reference number to link your payment.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Transaction Details</CardTitle>
          <CardDescription>
            After completing the UPI payment, find the UTR/Transaction ID in your Fampay app and enter it below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="utr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UTR / Transaction ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2345..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Payment"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-center mt-4">
        <Button variant="link" asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
