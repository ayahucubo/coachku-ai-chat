
import { Button } from "@/components/ui/button";
import { CoachingMode } from "@/hooks/useChat";
import { Briefcase, Target, Brain, Lightbulb, Heart } from "lucide-react";

interface ModeSelectorProps {
  currentMode: CoachingMode;
  onModeChange: (mode: CoachingMode) => void;
}

export const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  const modes: { id: CoachingMode; label: string; icon: any }[] = [
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'goal', label: 'Goal', icon: Target },
    { id: 'self-discovery', label: 'Self-Discovery', icon: Brain },
    { id: 'problem-solving', label: 'Problem-Solving', icon: Lightbulb },
    { id: 'curhat', label: 'Curhat', icon: Heart },
  ];

  return (
    <div className="px-4 py-2">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">Coaching Modes</h3>
      <div className="space-y-1">
        {modes.map((mode) => (
          <Button
            key={mode.id}
            variant={currentMode === mode.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              currentMode === mode.id ? "bg-coach-primary hover:bg-coach-dark" : ""
            }`}
            onClick={() => onModeChange(mode.id)}
          >
            <mode.icon className="mr-2 h-4 w-4" />
            {mode.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
