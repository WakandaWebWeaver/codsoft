import 'server-only';
import { createServerClient } from './supabase/server';
import type { Project, AiSuggestion, Notification as NotificationType, User, Task } from './types';

export async function getUsers(): Promise<User[]> {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        return [];
    }
    return data.map(u => ({
        id: u.id,
        name: u.name,
        avatarUrl: u.avatar_url,
        email: u.email,
    }));
}

export async function getProjects(): Promise<(Project & { completionPercentage: number })[]> {
    const supabase = createServerClient();
    const { data: projectsData, error: projectsError } = await supabase.from('projects').select(`
        *,
        project_team_members (
            users ( * )
        ),
        tasks ( * )
    `).order('created_at', { ascending: false });

    if (projectsError) {
        return [];
    }
    
    return projectsData.map(p => {
        const tasks: Task[] = p.tasks.map((t: any) => ({
            id: t.id,
            title: t.title,
            assignedTo: null, 
            dueDate: t.due_date ? new Date(t.due_date) : null,
            completed: t.completed,
        }))
        const completedTasks = tasks.filter(t => t.completed).length;
        const totalTasks = tasks.length;
        const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        return {
            id: p.id,
            name: p.name,
            description: p.description,
            startDate: new Date(p.start_date),
            endDate: p.end_date ? new Date(p.end_date) : null,
            team: p.project_team_members.map((m: any) => ({
                id: m.users.id,
                name: m.users.name,
                avatarUrl: m.users.avatar_url,
                email: m.users.email,
            })),
            tasks,
            completionPercentage
        };
    });
}

export async function getProjectById(projectId: string): Promise<(Project & { completionPercentage: number }) | null> {
    const supabase = createServerClient();
    const { data: p, error: projectError } = await supabase.from('projects').select(`
        *,
        project_team_members (
            users ( * )
        ),
        tasks ( * )
    `).eq('id', projectId).single();

    if (projectError) {
        return null;
    }

    if (!p) {
        return null;
    }
    
    const tasks: Task[] = p.tasks.map((t: any) => ({
        id: t.id,
        title: t.title,
        assignedTo: null,
        dueDate: t.due_date ? new Date(t.due_date) : null,
        completed: t.completed,
    })).sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
        id: p.id,
        name: p.name,
        description: p.description,
        startDate: new Date(p.start_date),
        endDate: p.end_date ? new Date(p.end_date) : null,
        team: p.project_team_members.map((m: any) => ({
            id: m.users.id,
            name: m.users.name,
            avatarUrl: m.users.avatar_url,
            email: m.users.email,
        })),
        tasks,
        completionPercentage
    };
}


export async function getNotifications(): Promise<NotificationType[]> {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(5);

    if (error) {
        return [];
    }

    return data.map(n => ({
        id: n.id,
        projectId: n.project_id,
        projectName: n.project_name,
        taskTitle: n.task_title,
        dueDate: new Date(n.due_date),
        type: n.type,
    }));
}

export async function getAiSuggestions(): Promise<AiSuggestion[]> {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('ai_suggestions').select('*').order('created_at', { ascending: false }).limit(3);
     if (error) {
        return [];
    }
    return data;
}
