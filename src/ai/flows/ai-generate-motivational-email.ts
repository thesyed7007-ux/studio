'use server';
/**
 * @fileOverview An AI agent that generates motivational emails for job seekers.
 *
 * - generateMotivationalEmail - A function that handles the email generation.
 * - GenerateMotivationalEmailInput - The input type for the function.
 * - GenerateMotivationalEmailOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMotivationalEmailInputSchema = z.object({
  userName: z.string().describe('The name of the job seeker.'),
});
export type GenerateMotivationalEmailInput = z.infer<typeof GenerateMotivationalEmailInputSchema>;

const GenerateMotivationalEmailOutputSchema = z.object({
  subject: z.string().describe('The generated subject line for the email.'),
  body: z.string().describe('The generated body of the email.'),
});
export type GenerateMotivationalEmailOutput = z.infer<typeof GenerateMotivationalEmailOutputSchema>;

export async function generateMotivationalEmail(input: GenerateMotivationalEmailInput): Promise<GenerateMotivationalEmailOutput> {
  return generateMotivationalEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMotivationalEmailPrompt',
  input: {schema: GenerateMotivationalEmailInputSchema},
  output: {schema: GenerateMotivationalEmailOutputSchema},
  prompt: `You are a supportive and encouraging career coach. Your task is to write a short, uplifting, and motivational email for a job seeker.

The job seeker's name is {{{userName}}}.

Keep the tone positive and empowering. The goal is to help them stay motivated during their job search. Address them by their name.

Generate a subject line and a body for the email.`,
});

const generateMotivationalEmailFlow = ai.defineFlow(
  {
    name: 'generateMotivationalEmailFlow',
    inputSchema: GenerateMotivationalEmailInputSchema,
    outputSchema: GenerateMotivationalEmailOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
