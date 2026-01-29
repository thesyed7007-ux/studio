"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Pie, PieChart, Cell, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { jobApplicationColumns, type JobStatus } from "@/lib/placeholder-data";
import Image from "next/image";

const statusColors: Record<JobStatus, string> = {
  applied: "bg-blue-500",
  interviewing: "bg-yellow-500",
  offer: "bg-green-500",
  rejected: "bg-red-500",
};

const chartData = [
  { status: 'Applied', count: 2, fill: 'hsl(var(--chart-1))' },
  { status: 'Interviewing', count: 2, fill: 'hsl(var(--chart-2))' },
  { status: 'Offer', count: 1, fill: 'hsl(var(--accent))' },
  { status: 'Rejected', count: 1, fill: 'hsl(var(--destructive))' },
];

const weeklyInterviews = [
    { week: "Week 1", interviews: 1 },
    { week: "Week 2", interviews: 3 },
    { week: "Week 3", interviews: 2 },
    { week: "Week 4", interviews: 4 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {jobApplicationColumns.map((column) => (
          <Card key={column.id} className="border-none shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <span className={`h-2 w-2 rounded-full ${statusColors[column.id]}`} />
                {column.title}
                <Badge variant="secondary" className="ml-auto">{column.jobs.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {column.jobs.map((job) => (
                <Card key={job.id} className="cursor-pointer hover:bg-secondary/50 transition-colors">
                  <CardContent className="p-4 flex items-start gap-4">
                    <Image
                      src={job.logo}
                      alt={`${job.company} logo`}
                      width={40}
                      height={40}
                      className="rounded-md"
                      data-ai-hint="logo"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Application Status</CardTitle>
            <CardDescription>A breakdown of your current job applications.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
              <PieChart>
                <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="count" nameKey="status" innerRadius={60}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Interviews per Week</CardTitle>
            <CardDescription>Your interview performance over the last month.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={weeklyInterviews}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis allowDecimals={false} />
                <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="interviews" fill="hsl(var(--primary))" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
