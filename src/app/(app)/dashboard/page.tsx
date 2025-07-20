import { getProjects, getAiSuggestions } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { AiSuggestionCard } from '@/components/ai-suggestion-card';
import { ProjectCard } from '@/components/project-card';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react"

export default async function DashboardPage() {
  const projects = await getProjects();
  const aiSuggestions = await getAiSuggestions();

  const totalProjects = projects.length;
  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = projects.reduce((acc, p) => acc + p.tasks.filter(t => t.completed).length, 0);
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;


  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
        <h1 className="text-xl font-semibold md:text-2xl font-headline">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProjects}</div>
                <p className="text-xs text-muted-foreground">
                  projects currently active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTasks}</div>
                 <p className="text-xs text-muted-foreground">
                  tasks across all projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedTasks}</div>
                <p className="text-xs text-muted-foreground">
                  of {totalTasks} tasks
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completionPercentage}%</div>
                <p className="text-xs text-muted-foreground">
                  of all tasks completed
                </p>
              </CardContent>
            </Card>
          </div>
        <section>
          <h2 className="text-xl font-semibold mb-4 font-headline">AI-Powered Insights</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiSuggestions.map((suggestion) => (
              <AiSuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-xl font-semibold mb-4 font-headline">Active Projects</h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.slice(0, 4).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
    </div>
  );
}
