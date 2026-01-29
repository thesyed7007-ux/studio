import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { jobs } from "@/lib/placeholder-data";
import { MapPin, Briefcase, DollarSign, Filter } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Job Openings</h1>
          <p className="text-muted-foreground">
            Showing {jobs.length} results.
          </p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Image
                  src={job.logo}
                  alt={`${job.company} logo`}
                  width={56}
                  height={56}
                  className="rounded-lg"
                  data-ai-hint="logo"
                />
                <div>
                  <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {job.posted}
              </span>
              <Button>Apply Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
