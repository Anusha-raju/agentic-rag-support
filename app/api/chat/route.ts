import { NextRequest, NextResponse } from "next/server";
import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { searchInternalDocs } from "@/lib/rag/store";

async function searchWikipedia(query: string) {
    try {
        const params = new URLSearchParams({
            action: 'query',
            list: 'search',
            srsearch: query,
            format: 'json',
            origin: '*'
        });
        const res = await fetch(`https://en.wikipedia.org/w/api.php?${params}`);
        const data = await res.json();

        if (!data.query || !data.query.search || data.query.search.length === 0) {
            return "No Wikipedia results found.";
        }

        const topResults = data.query.search.slice(0, 2);
        return topResults.map((result: any) =>
            `[Title: ${result.title}]\n${result.snippet.replace(/<\/?[^>]+(>|$)/g, "")}` // Strip HTML
        ).join("\n\n");
    } catch (e) {
        console.warn("Wikipedia search failed:", e);
        return "Wikipedia search unavailable.";
    }
}

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        const latestMessage = messages[messages.length - 1];
        const userQuery = latestMessage.content;

        // 1. Search Internal Docs
        const internalDocs = await searchInternalDocs(userQuery);
        const internalContext = internalDocs.map(doc =>
            `[Source: ${doc.metadata.source}]\n${doc.pageContent}`
        ).join("\n\n");

        // 2. Search Wikipedia
        const wikiContext = await searchWikipedia(userQuery);

        // 3. Construct System Prompt
        const systemPrompt = `You are a Tier 3 Technical Support Assistant.
    Your goal is to provide a step-by-step resolution process for the user's issue.

    Use the following CONTEXT from Internal Documents and Wikipedia to answer:

    === INTERNAL DOCUMENTS ===
    ${internalContext}

    === WIKIPEDIA / EXTERNAL ===
    ${wikiContext}

    INSTRUCTIONS:
    - Prioritize Internal Documents for troubleshooting specifically.
    - Use Wikipedia for general definitions or public knowledge if needed.
    - If the user's issue matches a known Runbook or Troubleshooting Guide in the Internal Docs, follow it precisely.
    - Output a clear, structured response (e.g., "Step 1: ...").
    - Cite your sources (e.g., "According to the VPN Troubleshooting Guide...").
    `;

        // 4. Generate Response
        const model = new ChatOllama({
            model: "llama3",
            temperature: 0.2,
        });

        const response = await model.invoke([
            new SystemMessage(systemPrompt),
            new HumanMessage(userQuery)
        ]);

        const parser = new StringOutputParser();
        const text = await parser.parse(response.content as string);

        return NextResponse.json({
            role: 'assistant',
            content: text,
            sources: internalDocs.map(d => d.metadata.source)
        });

    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
