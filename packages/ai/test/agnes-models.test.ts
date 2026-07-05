import { describe, expect, it } from "vitest";
import { AGNES_MODELS } from "../src/providers/agnes.models.ts";

describe("Agnes AI models", () => {
	describe("model definitions", () => {
		it("has agnes-2.0-flash", () => {
			const model = AGNES_MODELS["agnes-2.0-flash"];
			expect(model).toBeDefined();
			expect(model.reasoning).toBe(false);
			expect(model.input).toContain("image");
			expect(model.contextWindow).toBe(524288);
			expect(model.maxTokens).toBe(65536);
		});

		it("has 1 model", () => {
			expect(Object.keys(AGNES_MODELS).length).toBe(1);
		});
	});

	describe("API type", () => {
		it("uses openai-completions API", () => {
			const model = AGNES_MODELS["agnes-2.0-flash"];
			expect(model.api).toBe("openai-completions");
		});
	});

	describe("provider ID", () => {
		it("has correct provider ID", () => {
			const model = AGNES_MODELS["agnes-2.0-flash"];
			expect(model.provider).toBe("agnes");
		});
	});

	describe("base URL", () => {
		it("uses correct endpoint", () => {
			const model = AGNES_MODELS["agnes-2.0-flash"];
			expect(model.baseUrl).toBe("https://apihub.agnes-ai.com/v1");
		});
	});

	describe("pricing", () => {
		it("has correct pricing", () => {
			const model = AGNES_MODELS["agnes-2.0-flash"];
			expect(model.cost.input).toBe(0.03);
			expect(model.cost.output).toBe(0.15);
			expect(model.cost.cacheRead).toBe(0);
			expect(model.cost.cacheWrite).toBe(0);
		});
	});

	describe("conservative settings", () => {
		it("reasoning is disabled", () => {
			const model = AGNES_MODELS["agnes-2.0-flash"];
			expect(model.reasoning).toBe(false);
		});

		it("no compat settings", () => {
			const model = AGNES_MODELS["agnes-2.0-flash"];
			expect(model.compat).toBeUndefined();
		});
	});

	describe("model name", () => {
		it("has correct name", () => {
			const model = AGNES_MODELS["agnes-2.0-flash"];
			expect(model.name).toBe("Agnes 2.0 Flash");
		});
	});

	describe("input types", () => {
		it("supports text and image", () => {
			const model = AGNES_MODELS["agnes-2.0-flash"];
			expect(model.input).toContain("text");
			expect(model.input).toContain("image");
		});
	});
});
