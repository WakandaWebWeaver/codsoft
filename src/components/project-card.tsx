import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Project } from "@/lib/types";
import { format } from 'date-fns';
import React from 'react';

export function ProjectCard({ project }: { project: Project & { completionPercentage: number } }) {
  return (
    <Link href={`/projects/${project.id}`} className="block">
        <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
                <CardDescription className="line-clamp-2 h-10">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-bold">{project.completionPercentage}%</span>
                </div>
                <Progress value={project.completionPercentage} aria-label={`${project.completionPercentage}% complete`} />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex -space-x-2">
                <TooltipProvider delayDuration={0}>
                    {project.team.map((member) => (
                    <Tooltip key={member.id}>
                        <TooltipTrigger asChild>
                            <span>
                                <Avatar className="border-2 border-card">
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
                <div className="text-right">
                <p className="text-xs text-muted-foreground">End Date</p>
                <p className="text-sm font-medium">{project.endDate ? format(project.endDate, 'PPP') : 'N/A'}</p>
                </div>
            </CardFooter>
        </Card>
    </Link>
  );
}