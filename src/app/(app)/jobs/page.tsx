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
import { jobs, externalJobs } from "@/lib/placeholder-data";
import { MapPin, Briefcase, DollarSign, Filter, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const JobCard = ({ job }: { job: any }) => {
    const isExternal = job.source !== 'Direct';
    return (
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
                {job.source && (
                    <Badge variant="outline" className="ml-auto whitespace-nowrap">{job.source}</Badge>
                )}
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
                {job.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{job.posted}</span>
              <Button asChild={isExternal}>
                {isExternal && job.source ? (
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Apply on {job.source}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                ) : (
                  <>Apply Now</>
                )}
              </Button>
            </CardFooter>
        </Card>
    );
}

const JobsGrid = ({ jobs }: { jobs: any[]}) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
        ))}
    </div>
);

export default function JobsPage() {
  const allJobs = [...jobs, ...externalJobs];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Job Openings</h1>
          <p className="text-muted-foreground">
            Showing {allJobs.length} results.
          </p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="network">Our Network</TabsTrigger>
            <TabsTrigger value="external">Naukri.com</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
            <JobsGrid jobs={allJobs} />
        </TabsContent>
        <TabsContent value="network">
            <JobsGrid jobs={jobs} />
        </TabsContent>
        <TabsContent value="external">
            <JobsGrid jobs={externalJobs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
