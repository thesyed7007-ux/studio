import { Bot } from "lucide-react";
import InterviewPrepChat from "./_components/interview-prep-chat";

export default function InterviewPrepPage() {
  return (
    <div className="h-[calc(100vh-theme(spacing.28))] flex flex-col">
      <div className="text-center mb-4">
        <Bot className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold font-headline">AI Interview Prep Bot</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Practice role-specific mock interviews and get instant feedback on your performance.
        </p>
      </div>
      <InterviewPrepChat />
    </div>
  );
}
