import React from 'react';
import { getProjects } from '@/lib/data';
import { ProjectsClientPage } from '@/components/projects-client-page';

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return <ProjectsClientPage initialProjects={projects} />;
}
