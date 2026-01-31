import { ChatInterface } from "@/components/chat/ChatInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-muted/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-4xl mx-auto items-center px-4">
          <div className="font-bold text-lg tracking-tight">SupportGenie</div>
          <div className="ml-auto text-sm text-muted-foreground">Internal RAG Assistant</div>
        </div>
      </header>
      <div className="flex-1 flex flex-col">
        <ChatInterface />
      </div>
    </main>
  );
}
