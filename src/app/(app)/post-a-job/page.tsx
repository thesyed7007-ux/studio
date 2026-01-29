import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PostAJobPage() {
  return (
    <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
            <PlusCircle className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-3xl font-bold font-headline">Post a New Job</h1>
            <p className="mt-2 text-lg text-muted-foreground">
            For Employers: Fill out the form below to find your next top talent.
            </p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Provide the necessary information about the job opening.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" placeholder="e.g., Senior Product Manager" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="e.g., Innovate Inc." />
                </div>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., San Francisco, CA or Remote" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="job-type">Job Type</Label>
                    <Select>
                        <SelectTrigger id="job-type">
                            <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="salary-range">Salary Range (Optional)</Label>
                    <Input id="salary-range" placeholder="e.g., $120,000 - $150,000" />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Describe the role, responsibilities, and qualifications..."
                className="min-h-[200px]"
              />
            </div>

            <Button type="submit" className="w-full">
              Post Job Opening
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
