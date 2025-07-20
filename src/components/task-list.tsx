'use client';

import type { Task } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { updateTaskStatus } from '@/app/actions';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleCheckedChange = (taskId: string, completed: boolean) => {
    startTransition(async () => {
      try {
        await updateTaskStatus(taskId, completed);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to update task status.',
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-3">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={(checked) => handleCheckedChange(task.id, !!checked)}
              aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
              disabled={isPending}
            />
            <Label
              htmlFor={`task-${task.id}`}
              className={cn(
                'flex-1 text-sm',
                task.completed && 'line-through text-muted-foreground'
              )}
            >
              {task.title}
            </Label>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">No tasks have been added to this project yet.</p>
      )}
    </div>
  );
}
