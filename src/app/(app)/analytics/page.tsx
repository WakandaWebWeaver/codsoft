import { getProjects } from '@/lib/data';
import { ProjectProgressChart } from '@/components/project-progress-chart';
import { TaskStatusChart } from '@/components/task-status-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function AnalyticsPage() {
  const projects = await getProjects();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <h1 className="text-xl font-semibold md:text-2xl font-headline">Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Completion percentage of active projects.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ProjectProgressChart data={projects} />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Task Status Overview</CardTitle>
            <CardDescription>A summary of completed and pending tasks across all projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskStatusChart data={projects} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
