import Link from "next/link";
import { ArrowRight, Bot, Briefcase, DollarSign, FileText, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/logo";

const features = [
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: "Smart Job Search",
    description: "Our AI searches ALL job sites at once, including LinkedIn, Indeed, and hidden job markets.",
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "AI Resume Doctor",
    description: "Get your resume rewritten and optimized for each job application to beat ATS screeners.",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: "Salary Negotiation Coach",
    description: "Access data-driven salary insights and negotiation scripts to secure a higher salary.",
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Interview Prep Bot",
    description: "Practice with role-specific mock interviews and receive AI-powered feedback on your performance.",
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "Career Tracker",
    description: "Manage all your job applications in one place with our intuitive dashboard and progress charts.",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: "Company Research",
    description: "Gain insights into company culture, employee happiness, and interview difficulty before you apply.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Logo />
        <Button asChild variant="ghost">
          <Link href="/dashboard">
            Go to App <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </header>

      <main className="flex-grow">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
              Your Career Ascends Here.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              CareerCopilot is the all-in-one AI platform that streamlines your job search, from discovery to offer negotiation. Stop juggling tools. Start landing offers.
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard">
                Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">An Entire Career Team in One Platform</h2>
              <p className="mt-4 text-lg text-muted-foreground">Everything you need to succeed in your job search.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CareerCopilot. Built by SL Tech.</p>
        </div>
      </footer>
    </div>
  );
}
