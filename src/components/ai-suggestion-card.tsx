import { AlertCircle, Lightbulb, CalendarClock } from "lucide-react";
import type { AiSuggestion } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const suggestionIcons = {
  risk: AlertCircle,
  task: Lightbulb,
  deadline: CalendarClock,
};

const suggestionColors = {
    risk: 'text-destructive',
    task: 'text-yellow-500',
    deadline: 'text-blue-500',
}

export function AiSuggestionCard({ suggestion }: { suggestion: AiSuggestion }) {
  const Icon = suggestionIcons[suggestion.type];
  const colorClass = suggestionColors[suggestion.type];

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <div className={cn("p-2 rounded-full bg-muted", colorClass === 'text-destructive' ? 'bg-destructive/10' : 'bg-primary/10')}>
            <Icon className={cn("h-5 w-5", colorClass)} />
        </div>
        <CardTitle className="text-base font-medium">{suggestion.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
      </CardContent>
    </Card>
  );
}
