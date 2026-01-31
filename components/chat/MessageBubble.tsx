import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
    sources?: string[];
}

export function MessageBubble({ role, content, sources }: MessageBubbleProps) {
    return (
        <div
            className={cn(
                "flex w-full items-start gap-4 p-4",
                role === "assistant" ? "bg-muted/50" : "bg-background"
            )}
        >
            <div className={cn(
                "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
                role === "assistant" ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
            )}>
                {role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </div>
            <div className="flex-1 space-y-2 overflow-hidden">
                <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
                    {content}
                </div>
                {sources && sources.length > 0 && (
                    <div className="mt-4 rounded-md border bg-muted p-2 text-xs">
                        <p className="font-semibold mb-1">Sources:</p>
                        <div className="flex flex-wrap gap-2">
                            {sources.map((source, i) => (
                                <span key={i} className="inline-flex items-center rounded-sm bg-background px-2 py-0.5 border shadow-sm">
                                    {source}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
