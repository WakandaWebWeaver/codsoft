import { getProjectById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskList } from '@/components/task-list';
import React from 'react';

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold md:text-2xl font-headline">{project.name}</h1>
        <p className="text-muted-foreground">{project.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>All tasks associated with this project.</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskList tasks={project.tasks} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{project.tasks.filter(t => t.completed).length} of {project.tasks.length} tasks completed</span>
                    <span className="text-sm font-bold">{project.completionPercentage}%</span>
                </div>
              <Progress value={project.completionPercentage} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    <TooltipProvider delayDuration={0}>
                        {project.team.map((member) => (
                        <Tooltip key={member.id}>
                            <TooltipTrigger asChild>
                                <span>
                                <Avatar className="border-2 border-card h-12 w-12">
                                    {member.avatarUrl && <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person" />}
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>{member.name}</p>
                            </TooltipContent>
                        </Tooltip>
                        ))}
                    </TooltipProvider>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}