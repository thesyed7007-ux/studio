import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { companies } from "@/lib/placeholder-data";
import { Star, Building, MapPin, Smile, BrainCircuit, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function CompaniesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Company Insights</h1>
        <p className="text-muted-foreground">
          Explore companies to find your perfect fit.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card key={company.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={56}
                  height={56}
                  className="rounded-lg"
                  data-ai-hint="logo"
                />
                <div>
                  <CardTitle className="font-headline text-xl">{company.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>{company.industry}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{company.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Smile className="h-4 w-4 text-primary" />
                  <span>Happiness Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{company.happinessScore}/10</span>
                  <Progress value={company.happinessScore * 10} className="w-20" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>Culture Fit</span>
                </div>
                 <div className="flex items-center gap-2">
                  <span className="font-semibold">{company.cultureScore}/10</span>
                  <Progress value={company.cultureScore * 10} className="w-20" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                  <span>Interview Difficulty</span>
                </div>
                 <div className="flex items-center gap-2">
                  <span className="font-semibold">{company.interviewDifficulty}/5</span>
                  <Progress value={company.interviewDifficulty * 20} className="w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
