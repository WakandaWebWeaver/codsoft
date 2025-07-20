'use client';

import React from 'react';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { CreateProjectDialog } from '@/components/create-project-dialog';
import type { Project } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

interface ProjectsClientPageProps {
  initialProjects: (Project & { completionPercentage: number })[];
}

export function ProjectsClientPage({ initialProjects }: ProjectsClientPageProps) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const router = useRouter();

  const onProjectCreated = () => {
    setDialogOpen(false);
    router.refresh(); 
  };
  
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold md:text-2xl font-headline">Projects</h1>
          <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            <span className="font-semibold">Create Project</span>
          </Button>
        </div>
        
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {initialProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      <CreateProjectDialog open={isDialogOpen} onOpenChange={setDialogOpen} onProjectCreated={onProjectCreated} />
    </>
  );
}

function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}
