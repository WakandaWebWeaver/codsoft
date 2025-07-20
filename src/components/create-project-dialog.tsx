'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { createProject, suggestTasksForProject } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required.'),
  description: z.string().optional(),
});

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreated: () => void;
}

export function CreateProjectDialog({ open, onOpenChange, onProjectCreated }: CreateProjectDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestedTasks, setSuggestedTasks] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleAiSuggest = async () => {
    const { name, description } = form.getValues();
    if (!name) {
      form.setError('name', { message: 'Please enter a project name to get suggestions.' });
      return;
    }
    setIsGenerating(true);
    setSuggestedTasks([]);
    try {
        const result = await suggestTasksForProject({ name, description: description || '' });
        setSuggestedTasks(result.tasks);
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to get AI suggestions. Please try again.",
        });
    } finally {
        setIsGenerating(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    setIsSubmitting(true);
    try {
        await createProject({ name: values.name, description: values.description || '', tasks: suggestedTasks });
        toast({
            title: "Success",
            description: "Project created successfully.",
        });
        form.reset();
        setSuggestedTasks([]);
        onProjectCreated();
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to create project. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      setSuggestedTasks([]);
    }
    onOpenChange(isOpen);
  }
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to start a new project. You can also use AI to suggest initial tasks.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 py-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="E.g., Marketing Campaign" className="col-span-3" {...field} />
                                </FormControl>
                                <FormMessage className="col-span-4 pl-[calc(25%+1rem)]" />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                             <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Describe your project" className="col-span-3" {...field} />
                                </FormControl>
                                <FormMessage className="col-span-4 pl-[calc(25%+1rem)]" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-4">
                    <Button type="button" variant="outline" onClick={handleAiSuggest} disabled={isGenerating} className="w-full">
                        <Wand2 className="mr-2 h-4 w-4" />
                        {isGenerating ? 'Analyzing project...' : 'Suggest Tasks with AI'}
                    </Button>
                    {isGenerating && (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-5/6" />
                            <Skeleton className="h-8 w-4/6" />
                        </div>
                    )}
                    {suggestedTasks.length > 0 && (
                        <div className="space-y-2 rounded-md border p-4">
                            <h4 className="text-sm font-medium">Suggested Tasks:</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {suggestedTasks.map((task, index) => (
                                    <li key={index}>{task}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Project'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
