'use server';

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { suggestTasks, SuggestTasksInput } from "@/ai/flows/suggest-tasks-flow";

export async function suggestTasksForProject(input: SuggestTasksInput) {
    return await suggestTasks(input);
}

export async function createProject({ name, description, tasks }: { name: string, description: string, tasks: string[] }) {
    const supabase = createServerClient();
    
    const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert({ name, description })
        .select()
        .single();

    if (projectError) {
        throw new Error('Could not create project.');
    }

    if (tasks.length > 0) {
        const taskInserts = tasks.map(title => ({
            title,
            project_id: projectData.id,
            completed: false,
        }));
        
        const { error: tasksError } = await supabase.from('tasks').insert(taskInserts);
        
        if (tasksError) {
            throw new Error('Could not add tasks to the project.');
        }
    }
    
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/dashboard');
    return { success: true, project: projectData };
}

export async function updateTaskStatus(taskId: string, completed: boolean) {
    const supabase = createServerClient();
    const { error } = await supabase
        .from('tasks')
        .update({ completed })
        .eq('id', taskId);

    if (error) {
        throw new Error('Could not update task.');
    }

    revalidatePath('/projects');
}
