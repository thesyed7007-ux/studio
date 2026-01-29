import { Briefcase, Building2, MapPin } from "lucide-react";

export const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Innovate Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    logo: "https://picsum.photos/seed/logo1/100/100",
    tags: ["React", "TypeScript", "Remote"],
    status: "applied",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Tech Solutions",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110k - $140k",
    posted: "5 days ago",
    logo: "https://picsum.photos/seed/logo2/100/100",
    tags: ["Agile", "SaaS", "Product"],
    status: "interviewing",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Minds",
    location: "Austin, TX (Remote)",
    type: "Contract",
    salary: "$80/hr",
    posted: "1 week ago",
    logo: "https://picsum.photos/seed/logo3/100/100",
    tags: ["Figma", "User Research", "Mobile"],
    status: "offer",
  },
  {
    id: 4,
    title: "Backend Engineer (Python)",
    company: "DataDriven Co.",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$130k - $160k",
    posted: "3 days ago",
    logo: "https://picsum.photos/seed/logo4/100/100",
    tags: ["Python", "Django", "AWS"],
    status: "applied",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudNine",
    location: "Remote",
    type: "Full-time",
    salary: "$125k - $155k",
    posted: "1 day ago",
    logo: "https://picsum.photos/seed/logo1/100/100",
    tags: ["Kubernetes", "Docker", "CI/CD"],
    status: "interviewing",
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "AI Labs",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$140k - $170k",
    posted: "6 days ago",
    logo: "https://picsum.photos/seed/logo2/100/100",
    tags: ["Machine Learning", "Python", "NLP"],
    status: "rejected",
  },
];

export const companies = [
  {
    id: 1,
    name: "Innovate Inc.",
    logo: "https://picsum.photos/seed/logo1/100/100",
    industry: "SaaS",
    location: "San Francisco, CA",
    rating: 4.5,
    cultureScore: 8.8,
    happinessScore: 9.2,
    interviewDifficulty: 3.5,
  },
  {
    id: 2,
    name: "Tech Solutions",
    logo: "https://picsum.photos/seed/logo2/100/100",
    industry: "Fintech",
    location: "New York, NY",
    rating: 4.2,
    cultureScore: 8.1,
    happinessScore: 8.5,
    interviewDifficulty: 4.0,
  },
  {
    id: 3,
    name: "Creative Minds",
    logo: "https://picsum.photos/seed/logo3/100/100",
    industry: "Design Agency",
    location: "Austin, TX",
    rating: 4.8,
    cultureScore: 9.5,
    happinessScore: 9.6,
    interviewDifficulty: 2.8,
  },
  {
    id: 4,
    name: "DataDriven Co.",
    logo: "https://picsum.photos/seed/logo4/100/100",
    industry: "Big Data",
    location: "Chicago, IL",
    rating: 4.1,
    cultureScore: 7.9,
    happinessScore: 8.2,
    interviewDifficulty: 4.2,
  },
];

export type JobStatus = "applied" | "interviewing" | "offer" | "rejected";

export const jobApplicationColumns: {
  id: JobStatus;
  title: string;
  jobs: typeof jobs;
}[] = [
  {
    id: "applied",
    title: "Applied",
    jobs: jobs.filter((j) => j.status === "applied"),
  },
  {
    id: "interviewing",
    title: "Interviewing",
    jobs: jobs.filter((j) => j.status === "interviewing"),
  },
  {
    id: "offer",
    title: "Offer",
    jobs: jobs.filter((j) => j.status === "offer"),
  },
  {
    id: "rejected",
    title: "Rejected",
    jobs: jobs.filter((j) => j.status === "rejected"),
  },
];
