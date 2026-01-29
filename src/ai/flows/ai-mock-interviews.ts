'use server';
/**
 * @fileOverview AI Interview Preparation Flow.
 *
 * This file defines a Genkit flow for conducting role-specific mock interviews using AI.
 * It includes functions for generating interview questions, analyzing user answers, and providing feedback.
 *
 * @exports conductMockInterview - A function to orchestrate the mock interview process.
 * @exports MockInterviewInput - The input type for the conductMockInterview function.
 * @exports MockInterviewOutput - The output type for the conductMockInterview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the mock interview flow
const MockInterviewInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description for which the interview is being conducted.'),
  userAnswer: z
    .string()
    .describe('The user response to the interview question.'),
  question: z
    .string()
    .describe('The current interview question being asked.'),
});
export type MockInterviewInput = z.infer<typeof MockInterviewInputSchema>;

// Define the output schema for the mock interview flow
const MockInterviewOutputSchema = z.object({
  feedback: z.string().describe('AI feedback on the user answer.'),
  nextQuestion: z.string().describe('The next interview question to ask the user.'),
});
export type MockInterviewOutput = z.infer<typeof MockInterviewOutputSchema>;


export async function conductMockInterview(input: MockInterviewInput): Promise<MockInterviewOutput> {
  return conductMockInterviewFlow(input);
}

// Define the prompt for generating interview questions and providing feedback
const mockInterviewPrompt = ai.definePrompt({
  name: 'mockInterviewPrompt',
  input: {schema: MockInterviewInputSchema},
  output: {schema: MockInterviewOutputSchema},
  prompt: `You are an AI interview coach helping candidates prepare for job interviews.

  Based on the job description provided, generate relevant interview questions and provide feedback on the candidate's answers.

  Job Description: {{{jobDescription}}}

  Current Question: {{{question}}}

  Candidate Answer: {{{userAnswer}}}

  Provide constructive feedback on the candidate's answer, including areas for improvement.
  Suggest the next interview question to ask the candidate, based on their previous answer and the job description.

  Feedback:
  {{output.feedback}}

  Next Question:
  {{output.nextQuestion}}`,
});

// Define the Genkit flow for conducting the mock interview
const conductMockInterviewFlow = ai.defineFlow(
  {
    name: 'conductMockInterviewFlow',
    inputSchema: MockInterviewInputSchema,
    outputSchema: MockInterviewOutputSchema,
  },
  async input => {
    const {output} = await mockInterviewPrompt(input);
    return output!;
  }
);
