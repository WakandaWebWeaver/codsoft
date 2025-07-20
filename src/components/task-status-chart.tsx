'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import type { Project } from '@/lib/types';

interface TaskStatusChartProps {
  data: Project[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

export function TaskStatusChart({ data }: TaskStatusChartProps) {
  const completedTasks = data.reduce((acc, project) => {
    return acc + project.tasks.filter((task) => task.completed).length;
  }, 0);

  const pendingTasks = data.reduce((acc, project) => {
    return acc + project.tasks.filter((task) => !task.completed).length;
  }, 0);

  const chartData = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: pendingTasks },
  ];

  return (
    <ChartContainer config={{}} className="min-h-[200px] w-full">
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
      </PieChart>
    </ChartContainer>
  );
}
