
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { format } from "date-fns";

interface ChatHistoryItemProps {
  title: string;
  timestamp: Date;
  onClick: () => void;
  isActive: boolean;
}

export const ChatHistoryItem = ({
  title,
  timestamp,
  onClick,
  isActive,
}: ChatHistoryItemProps) => {
  const date = new Date(timestamp);
  
  return (
    <Card
      className={`p-2 cursor-pointer hover:bg-accent/10 transition-colors ${
        isActive ? 'bg-accent/20 border-coach-primary' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-coach-primary/10 flex items-center justify-center">
          <MessageCircle className="h-4 w-4 text-coach-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{title}</p>
          <p className="text-xs text-muted-foreground">
            {format(date, 'MMM d, yyyy - HH:mm')}
          </p>
        </div>
      </div>
    </Card>
  );
};
