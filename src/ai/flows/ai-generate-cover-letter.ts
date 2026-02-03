'use server';
/**
 * @fileOverview An AI agent that generates a professional cover letter.
 *
 * - generateCoverLetter - A function that handles the cover letter generation.
 * - GenerateCoverLetterInput - The input type for the function.
 * - GenerateCoverLetterOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  fullName: z.string().describe("The user's full name."),
  jobTitle: z.string().describe('The title of the job they are applying for.'),
  companyName: z.string().describe('The name of the company they are applying to.'),
  jobDescription: z.string().describe('The full job description.'),
  userSummary: z.string().describe("A brief summary of the user's skills and experience."),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The full, formatted cover letter text.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are a professional career coach and expert cover letter writer. Your task is to write a compelling, professional, and tailored cover letter based on the information provided.

The tone should be confident but not arrogant. The letter should be structured with an introduction, a body that highlights how the user's experience matches the job description, and a strong concluding paragraph with a call to action.

**User Information:**
- Full Name: {{{fullName}}}
- Applying for Job Title: {{{jobTitle}}}
- At Company: {{{companyName}}}
- User's Summary of Skills & Experience: {{{userSummary}}}

**Target Job Description:**
{{{jobDescription}}}

Analyze the job description to identify key requirements and keywords. Then, use the user's summary to craft a narrative that directly addresses why they are a great fit for this specific role at this specific company.

Generate the cover letter now.
`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
