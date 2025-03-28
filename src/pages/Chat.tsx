
import { useState, useEffect, useRef } from "react";
import { useChat, CoachingMode } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageCircle, LogOut, Plus, History, Send, CornerLeftUp } from "lucide-react";
import { format } from "date-fns";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatHistoryItem } from "@/components/chat/ChatHistoryItem";
import { ModeSelector } from "@/components/chat/ModeSelector";

const Chat = () => {
  const {
    currentChatId,
    messages,
    chatHistory,
    isLoading,
    currentMode,
    startNewChat,
    loadChatHistory,
    loadChatSession,
    sendMessage,
    changeMode,
  } = useChat();
  
  const { logout, user } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [historyView, setHistoryView] = useState(false);

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chat history when component mounts
  useEffect(() => {
    loadChatHistory();
    // If no current chat, start a new one
    if (!currentChatId) {
      startNewChat();
    }
  }, [loadChatHistory, startNewChat, currentChatId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !currentChatId) return;
    
    await sendMessage(inputValue);
    setInputValue("");
  };

  const handleStartNewChat = async () => {
    await startNewChat();
    setHistoryView(false);
  };

  const handleOpenChatSession = async (chatId: string) => {
    await loadChatSession(chatId);
    setHistoryView(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/20 w-full">
        <Sidebar className="border-r">
          <div className="flex h-16 items-center px-4 border-b">
            <h2 className="text-lg font-semibold text-coach-primary">CoachKu</h2>
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <div className="px-4 py-2">
                <Button 
                  variant="default" 
                  className="w-full justify-start bg-coach-primary hover:bg-coach-dark"
                  onClick={handleStartNewChat}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Chat
                </Button>
              </div>
              
              {/* Mode selector */}
              <ModeSelector 
                currentMode={currentMode} 
                onModeChange={changeMode} 
              />
              
              {/* Chat history section */}
              <div className="px-4 pb-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setHistoryView(true)}
                >
                  <History className="mr-2 h-4 w-4" />
                  Chat History
                </Button>
              </div>
              
              {/* Display chat history when in history view */}
              {historyView && (
                <div className="space-y-2 px-4 mt-2 max-h-[50vh] overflow-y-auto custom-scrollbar">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Sessions</h3>
                  {chatHistory.length > 0 ? (
                    chatHistory.map((session) => (
                      <ChatHistoryItem
                        key={session.chatId}
                        title={session.title}
                        timestamp={session.lastMessageTimestamp}
                        onClick={() => handleOpenChatSession(session.chatId)}
                        isActive={currentChatId === session.chatId}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No chat history yet</p>
                  )}
                </div>
              )}
            </SidebarGroup>
          </SidebarContent>
          
          <div className="mt-auto p-4 border-t">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sign out from CoachKu</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Sidebar>
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatHeader 
            title={`${currentMode.charAt(0).toUpperCase() + currentMode.slice(1)} Coaching`}
            mode={currentMode}
          />
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t bg-background">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading || !currentChatId}
              />
              <Button 
                type="submit" 
                disabled={isLoading || !currentChatId || !inputValue.trim()} 
                className="bg-coach-primary hover:bg-coach-dark"
              >
                {isLoading ? (
                  <div className="animate-pulse-slow">Processing...</div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
        
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
};

export default Chat;
