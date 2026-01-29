'use server';
/**
 * @fileOverview An AI agent for salary negotiation coaching.
 *
 * - negotiateSalary - A function that provides salary negotiation insights and scripts.
 * - NegotiateSalaryInput - The input type for the negotiateSalary function.
 * - NegotiateSalaryOutput - The return type for the negotiateSalary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NegotiateSalaryInputSchema = z.object({
  jobTitle: z.string().describe('The job title for which the user is negotiating salary.'),
  location: z.string().describe('The location where the job is based.'),
  yearsOfExperience: z.number().describe('The years of experience the user has in this field.'),
  currentOffer: z.number().optional().describe('The current salary offer the user has received, if any.'),
});
export type NegotiateSalaryInput = z.infer<typeof NegotiateSalaryInputSchema>;

const NegotiateSalaryOutputSchema = z.object({
  salaryRange: z.string().describe('The recommended salary range for the job title and location.'),
  negotiationScript: z.string().describe('A script to guide the user in negotiating a higher salary.'),
  companyBudgetRange: z.string().describe('The budget range the company has allocated for the role.'),
  offerCalculation: z.string().describe('Guidance on how to calculate the total offer value, including stock, benefits, and bonuses.'),
});
export type NegotiateSalaryOutput = z.infer<typeof NegotiateSalaryOutputSchema>;

export async function negotiateSalary(input: NegotiateSalaryInput): Promise<NegotiateSalaryOutput> {
  return negotiateSalaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'negotiateSalaryPrompt',
  input: {schema: NegotiateSalaryInputSchema},
  output: {schema: NegotiateSalaryOutputSchema},
  prompt: `You are an AI-powered salary negotiation coach. Your goal is to provide job seekers with data-driven insights and negotiation scripts to help them negotiate a higher salary.

  Provide information on the following:

  - Salary Range: Provide a realistic salary range for the job title, location, and years of experience.
  - Negotiation Script: Suggest a script that the user can follow to negotiate a higher salary. Include specific phrases and arguments they can use.
  - Company Budget Range: Give an estimate of the budget range the company likely has allocated for the role.
  - Offer Calculation: Provide guidance on how to calculate the total offer value, including stock options, benefits, and potential bonuses.

  Job Title: {{{jobTitle}}}
  Location: {{{location}}}
  Years of Experience: {{{yearsOfExperience}}}
  Current Offer: {{{currentOffer}}}

  Format your response as a JSON object conforming to the NegotiateSalaryOutputSchema. Each field should be populated with relevant and actionable insights for the user. Provide responses with the following keys:

  - salaryRange
  - negotiationScript
  - companyBudgetRange
  - offerCalculation
  `,
});

const negotiateSalaryFlow = ai.defineFlow(
  {
    name: 'negotiateSalaryFlow',
    inputSchema: NegotiateSalaryInputSchema,
    outputSchema: NegotiateSalaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
