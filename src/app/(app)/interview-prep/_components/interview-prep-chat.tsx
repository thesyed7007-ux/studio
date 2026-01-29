"use client";

import { useState, useRef, useEffect } from "react";
import {
  conductMockInterview,
  type MockInterviewOutput,
} from "@/ai/flows/ai-mock-interviews";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, User, Bot, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";

interface Message {
  sender: "user" | "ai";
  text: string;
  isFeedback?: boolean;
}

export default function InterviewPrepChat() {
  const [jobDescription, setJobDescription] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  async function startSession() {
    if (jobDescription.length < 50) {
      toast({
        variant: "destructive",
        title: "Job description is too short",
        description: "Please provide a more detailed job description.",
      });
      return;
    }

    setIsLoading(true);
    setSessionStarted(true);

    try {
      const response = await conductMockInterview({
        jobDescription,
        question: "Start of interview. Provide the first question.",
        userAnswer: "",
      });
      setMessages([{ sender: "ai", text: response.nextQuestion }]);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to start interview session. Please try again.",
      });
      setSessionStarted(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendAnswer() {
    if (currentAnswer.trim().length === 0 || isLoading) return;

    const lastAiQuestion = messages.filter((m) => m.sender === "ai" && !m.isFeedback).pop()?.text || "";
    
    const newMessages: Message[] = [...messages, { sender: "user", text: currentAnswer }];
    setMessages(newMessages);
    setCurrentAnswer("");
    setIsLoading(true);

    try {
      const response = await conductMockInterview({
        jobDescription,
        question: lastAiQuestion,
        userAnswer: currentAnswer,
      });

      setMessages([
        ...newMessages,
        { sender: "ai", text: response.feedback, isFeedback: true },
        { sender: "ai", text: response.nextQuestion },
      ]);
    } catch (error) {
        console.error(error);
        toast({
            variant: "destructive",
            title: "An error occurred",
            description: "Failed to get feedback. Please try again.",
        });
        setMessages(messages); // Revert messages on error
    } finally {
        setIsLoading(false);
    }
  }

  if (!sessionStarted) {
    return (
      <Card className="max-w-2xl mx-auto flex-grow flex flex-col">
        <CardContent className="p-6 flex-grow flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-4 text-center">Start Your Mock Interview</h2>
          <Textarea
            placeholder="Paste the job description here to begin..."
            className="min-h-[200px] mb-4"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <Button onClick={startSession} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initializing...
              </>
            ) : (
              "Start Interview"
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-grow flex flex-col h-full">
      <CardContent className="p-0 flex-grow flex flex-col">
        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.sender === "user" ? "justify-end" : ""
                )}
              >
                {message.sender === "ai" && (
                    <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                )}
                
                <div className={cn("max-w-md rounded-lg p-3", 
                    message.isFeedback ? "bg-accent/50 border border-accent" : (message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary")
                )}>
                  {message.isFeedback && (
                      <div className="flex items-center gap-2 font-semibold mb-2 text-accent-foreground">
                          <Sparkles className="h-4 w-4" />
                          <span>Feedback</span>
                      </div>
                  )}
                  <p className="text-sm">{message.text}</p>
                </div>

                {message.sender === "user" && (
                    <Avatar>
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
                <div className="flex items-start gap-3">
                    <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div className="max-w-md rounded-lg p-3 bg-secondary">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background">
          <div className="relative">
            <Textarea
              placeholder="Type your answer here..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendAnswer();
                }
              }}
              className="pr-16"
              rows={2}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleSendAnswer}
              disabled={isLoading || currentAnswer.trim().length === 0}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
