'use server';
/**
 * @fileOverview An AI agent that rewrites a resume for a specific job description.
 *
 * - aiRewriteResumeForJob - A function that handles the resume rewriting process.
 * - AIRewriteResumeForJobInput - The input type for the aiRewriteResumeForJob function.
 * - AIRewriteResumeForJobOutput - The return type for the aiRewriteResumeForJob function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRewriteResumeForJobInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A resume document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  jobDescription: z.string().describe('The job description to optimize the resume for.'),
});
export type AIRewriteResumeForJobInput = z.infer<typeof AIRewriteResumeForJobInputSchema>;

const AIRewriteResumeForJobOutputSchema = z.object({
  rewrittenResume: z.string().describe('The rewritten resume optimized for the job description.'),
});
export type AIRewriteResumeForJobOutput = z.infer<typeof AIRewriteResumeForJobOutputSchema>;

export async function aiRewriteResumeForJob(input: AIRewriteResumeForJobInput): Promise<AIRewriteResumeForJobOutput> {
  return aiRewriteResumeForJobFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRewriteResumeForJobPrompt',
  input: {schema: AIRewriteResumeForJobInputSchema},
  output: {schema: AIRewriteResumeForJobOutputSchema},
  prompt: `You are an expert resume writer specializing in tailoring resumes to specific job descriptions.

You will rewrite the resume to be optimized for the job description provided. The goal is to increase the chances of the candidate getting an interview.

Use the following as the primary source of information about the job and rewrite the resume accordingly.

Job Description: {{{jobDescription}}}
Resume: {{media url=resumeDataUri}}`,
});

const aiRewriteResumeForJobFlow = ai.defineFlow(
  {
    name: 'aiRewriteResumeForJobFlow',
    inputSchema: AIRewriteResumeForJobInputSchema,
    outputSchema: AIRewriteResumeForJobOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
