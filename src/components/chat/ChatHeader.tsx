
import { Button } from "@/components/ui/button";
import { CoachingMode } from "@/hooks/useChat";
import { Briefcase, Target, Brain, Lightbulb, Heart } from "lucide-react";

interface ChatHeaderProps {
  title: string;
  mode: CoachingMode;
}

export const ChatHeader = ({ title, mode }: ChatHeaderProps) => {
  const getModeIcon = () => {
    switch (mode) {
      case 'career':
        return <Briefcase className="h-5 w-5 text-coach-primary" />;
      case 'goal':
        return <Target className="h-5 w-5 text-coach-primary" />;
      case 'self-discovery':
        return <Brain className="h-5 w-5 text-coach-primary" />;
      case 'problem-solving':
        return <Lightbulb className="h-5 w-5 text-coach-primary" />;
      case 'curhat':
        return <Heart className="h-5 w-5 text-coach-primary" />;
      default:
        return <Briefcase className="h-5 w-5 text-coach-primary" />;
    }
  };

  return (
    <div className="border-b bg-background">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getModeIcon()}
          <h2 className="font-semibold">{title}</h2>
        </div>
      </div>
    </div>
  );
};
