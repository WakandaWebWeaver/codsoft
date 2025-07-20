'use server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SuggestTasksInputSchema = z.object({
  name: z.string().describe('The name of the project.'),
  description: z.string().describe('A brief description of the project.'),
});
export type SuggestTasksInput = z.infer<typeof SuggestTasksInputSchema>;

const SuggestTasksOutputSchema = z.object({
  tasks: z.array(z.string()).describe('A list of 5-7 suggested initial tasks for the project.'),
});
export type SuggestTasksOutput = z.infer<typeof SuggestTasksOutputSchema>;

export async function suggestTasks(input: SuggestTasksInput): Promise<SuggestTasksOutput> {
  return suggestTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTasksPrompt',
  input: { schema: SuggestTasksInputSchema },
  output: { schema: SuggestTasksOutputSchema },
  prompt: `You are a helpful project management assistant. Based on the project name and description, suggest a list of 5 to 7 initial tasks to get started.

Project Name: {{{name}}}
Project Description: {{{description}}}

Provide a concise list of actionable tasks.`,
});

const suggestTasksFlow = ai.defineFlow(
  {
    name: 'suggestTasksFlow',
    inputSchema: SuggestTasksInputSchema,
    outputSchema: SuggestTasksOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
