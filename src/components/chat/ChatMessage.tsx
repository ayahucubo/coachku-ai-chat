
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/hooks/useChat";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUserMessage = message.sender === 'user';
  
  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isUserMessage ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
        <Avatar className={`w-8 h-8 ${!isUserMessage && 'bg-coach-primary'}`}>
          <AvatarFallback className={!isUserMessage ? 'bg-coach-primary text-white' : ''}>
            {isUserMessage ? 'U' : 'AI'}
          </AvatarFallback>
        </Avatar>
        
        <div className="space-y-1">
          <div className={isUserMessage ? 'chat-bubble-user' : 'chat-bubble-bot'}>
            {message.content}
          </div>
          <p className={`text-xs text-gray-500 ${isUserMessage ? 'text-right' : 'text-left'}`}>
            {format(new Date(message.timestamp), 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
};
