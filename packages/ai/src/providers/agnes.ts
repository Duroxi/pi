import { openAICompletionsApi } from "../api/openai-completions.lazy.ts";
import { envApiKeyAuth } from "../auth/helpers.ts";
import { createProvider, type Provider } from "../models.ts";
import { AGNES_MODELS } from "./agnes.models.ts";

export function agnesProvider(): Provider<"openai-completions"> {
	return createProvider({
		id: "agnes",
		name: "Agnes AI",
		baseUrl: "https://apihub.agnes-ai.com/v1",
		auth: { apiKey: envApiKeyAuth("Agnes AI API key", ["AGNES_API_KEY"]) },
		models: Object.values(AGNES_MODELS),
		api: openAICompletionsApi(),
	});
}
