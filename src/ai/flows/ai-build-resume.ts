'use server';
/**
 * @fileOverview An AI agent that builds a resume from scratch based on user-provided details.
 *
 * - aiBuildResume - A function that handles the resume building process.
 * - AIBuildResumeInput - The input type for the aiBuildResume function.
 * - AIBuildResumeOutput - The return type for the aiBuildResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WorkExperienceSchema = z.object({
  jobTitle: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  responsibilities: z.string(),
});

const EducationSchema = z.object({
  degree: z.string(),
  school: z.string(),
  location: z.string(),
  graduationDate: z.string(),
});

const AIBuildResumeInputSchema = z.object({
  fullName: z.string().describe('Full name of the user.'),
  email: z.string().email().describe('Email address of the user.'),
  phoneNumber: z.string().describe('Phone number of the user.'),
  linkedinUrl: z.string().url().optional().describe('URL to the user\'s LinkedIn profile.'),
  githubUrl: z.string().url().optional().describe('URL to the user\'s GitHub profile.'),
  personalSummary: z.string().describe('A brief professional summary about the user.'),
  workExperience: z.array(WorkExperienceSchema).describe('An array of the user\'s work experiences.'),
  education: z.array(EducationSchema).describe('An array of the user\'s educational background.'),
  skills: z.string().describe('A comma-separated list of the user\'s skills.'),
  jobDescription: z.string().optional().describe('An optional job description to tailor the resume for.'),
});
export type AIBuildResumeInput = z.infer<typeof AIBuildResumeInputSchema>;

const AIBuildResumeOutputSchema = z.object({
  generatedResume: z.string().describe('The full, formatted resume text.'),
});
export type AIBuildResumeOutput = z.infer<typeof AIBuildResumeOutputSchema>;


export async function aiBuildResume(input: AIBuildResumeInput): Promise<AIBuildResumeOutput> {
  return aiBuildResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiBuildResumePrompt',
  input: {schema: AIBuildResumeInputSchema},
  output: {schema: AIBuildResumeOutputSchema},
  prompt: `You are an expert resume writer. Your task is to create a professional, well-formatted resume in plain text based on the structured information provided by the user.

The output should be a single string containing the complete resume, with clear sections for Contact Info, Summary, Work Experience, Education, and Skills. Use markdown for formatting, like bolding for titles.

{{#if jobDescription}}
Pay special attention to the following job description and tailor the resume to highlight the most relevant skills and experiences.
Job Description: {{{jobDescription}}}
{{/if}}

User's Information:
- Full Name: {{{fullName}}}
- Email: {{{email}}}
- Phone Number: {{{phoneNumber}}}
{{#if linkedinUrl}}- LinkedIn: {{{linkedinUrl}}}{{/if}}
{{#if githubUrl}}- GitHub: {{{githubUrl}}}{{/if}}

- Professional Summary: {{{personalSummary}}}

- Work Experience:
{{#each workExperience}}
  - Job Title: {{jobTitle}}
    Company: {{company}}
    Location: {{location}}
    Dates: {{startDate}} - {{endDate}}
    Responsibilities: {{responsibilities}}
{{/each}}

- Education:
{{#each education}}
  - Degree: {{degree}}
    School: {{school}}
    Location: {{location}}
    Graduation Date: {{graduationDate}}
{{/each}}

- Skills: {{{skills}}}

Generate the resume now.
`,
});

const aiBuildResumeFlow = ai.defineFlow(
  {
    name: 'aiBuildResumeFlow',
    inputSchema: AIBuildResumeInputSchema,
    outputSchema: AIBuildResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
