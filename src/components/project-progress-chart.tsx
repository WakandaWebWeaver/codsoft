'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import type { Project } from '@/lib/types';

interface ProjectProgressChartProps {
  data: (Project & { completionPercentage: number })[];
}

export function ProjectProgressChart({ data }: ProjectProgressChartProps) {
  return (
    <ChartContainer config={{}} className="min-h-[200px] w-full">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" width={80} />
        <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
        <Legend />
        <Bar dataKey="completionPercentage" name="Completion %" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
