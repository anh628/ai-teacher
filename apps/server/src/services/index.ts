import type { AIService } from "./aiService";
import { localAIService } from "./localAiService";
import { mockAIService } from "./mockAiServices";

const providers: Record<string, AIService> = {
  mock: mockAIService,
  ollama: localAIService,
};

const providerName = process.env.AI_PROVIDER ?? "mock";

export const aiService = providers[providerName];

if (!aiService) {
  throw new Error(`Unsupported AI provider: ${providerName}`);
}