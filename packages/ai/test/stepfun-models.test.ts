import { describe, expect, it } from "vitest";
import { STEPFUN_MODELS } from "../src/providers/stepfun.models.ts";
import { STEPFUN_STEP_PLAN_MODELS } from "../src/providers/stepfun-step-plan.models.ts";

describe("StepFun models", () => {
	describe("stepfun (regular API)", () => {
		it("has step-3.7-flash", () => {
			const model = STEPFUN_MODELS["step-3.7-flash"];
			expect(model).toBeDefined();
			expect(model.reasoning).toBe(true);
			expect(model.input).toContain("image");
			expect(model.contextWindow).toBe(262144);
			expect(model.maxTokens).toBe(250000);
		});

		it("has step-3.5-flash", () => {
			const model = STEPFUN_MODELS["step-3.5-flash"];
			expect(model).toBeDefined();
			expect(model.reasoning).toBe(true);
			expect(model.input).toEqual(["text"]);
			expect(model.contextWindow).toBe(262144);
			expect(model.maxTokens).toBe(250000);
		});

		it("has step-3.5-flash-2603", () => {
			const model = STEPFUN_MODELS["step-3.5-flash-2603"];
			expect(model).toBeDefined();
			expect(model.reasoning).toBe(true);
			expect(model.input).toEqual(["text"]);
			expect(model.contextWindow).toBe(262144);
			expect(model.maxTokens).toBe(250000);
		});

		it("omits step-router-v1", () => {
			expect(STEPFUN_MODELS["step-router-v1"]).toBeUndefined();
		});

		it("has 3 models", () => {
			expect(Object.keys(STEPFUN_MODELS).length).toBe(3);
		});
	});

	describe("stepfun-step-plan (subscription)", () => {
		it("has step-3.7-flash", () => {
			const model = STEPFUN_STEP_PLAN_MODELS["step-3.7-flash"];
			expect(model).toBeDefined();
			expect(model.reasoning).toBe(true);
			expect(model.input).toContain("image");
		});

		it("has step-3.5-flash", () => {
			const model = STEPFUN_STEP_PLAN_MODELS["step-3.5-flash"];
			expect(model).toBeDefined();
			expect(model.reasoning).toBe(true);
		});

		it("has step-3.5-flash-2603", () => {
			const model = STEPFUN_STEP_PLAN_MODELS["step-3.5-flash-2603"];
			expect(model).toBeDefined();
			expect(model.reasoning).toBe(true);
		});

		it("has step-router-v1", () => {
			const model = STEPFUN_STEP_PLAN_MODELS["step-router-v1"];
			expect(model).toBeDefined();
			expect(model.reasoning).toBe(true);
			expect(model.input).toEqual(["text"]);
			expect(model.contextWindow).toBe(1048576);
			expect(model.maxTokens).toBe(393216);
		});

		it("has 4 models", () => {
			expect(Object.keys(STEPFUN_STEP_PLAN_MODELS).length).toBe(4);
		});
	});

	describe("compatibility settings", () => {
		it("step-3.7-flash supports reasoning_effort", () => {
			const model = STEPFUN_MODELS["step-3.7-flash"];
			expect(model.compat).toBeDefined();
			expect((model.compat as any).supportsReasoningEffort).toBe(true);
		});

		it("step-3.5-flash does not support reasoning_effort", () => {
			const model = STEPFUN_MODELS["step-3.5-flash"];
			expect(model.compat).toBeDefined();
			expect((model.compat as any).supportsReasoningEffort).toBe(false);
		});

		it("step-3.5-flash-2603 supports reasoning_effort", () => {
			const model = STEPFUN_MODELS["step-3.5-flash-2603"];
			expect(model.compat).toBeDefined();
			expect((model.compat as any).supportsReasoningEffort).toBe(true);
		});

		it("step-router-v1 does not support reasoning_effort", () => {
			const model = STEPFUN_STEP_PLAN_MODELS["step-router-v1"];
			expect(model.compat).toBeDefined();
			expect((model.compat as any).supportsReasoningEffort).toBe(false);
		});

		it("all stepfun models use deepseek thinkingFormat", () => {
			for (const model of Object.values(STEPFUN_MODELS)) {
				expect((model.compat as any).thinkingFormat).toBe("deepseek");
			}
		});

		it("all stepfun models require reasoning content on assistant messages", () => {
			for (const model of Object.values(STEPFUN_MODELS)) {
				expect((model.compat as any).requiresReasoningContentOnAssistantMessages).toBe(true);
			}
		});
	});

	describe("pricing", () => {
		it("step-3.7-flash has correct pricing", () => {
			const model = STEPFUN_MODELS["step-3.7-flash"];
			expect(model.cost.input).toBe(1.35);
			expect(model.cost.output).toBe(8.1);
			expect(model.cost.cacheRead).toBe(0.27);
		});

		it("step-3.5-flash has correct pricing", () => {
			const model = STEPFUN_MODELS["step-3.5-flash"];
			expect(model.cost.input).toBe(0.7);
			expect(model.cost.output).toBe(2.1);
			expect(model.cost.cacheRead).toBe(0.14);
		});

		it("step-3.5-flash-2603 has same pricing as step-3.5-flash", () => {
			const model35 = STEPFUN_MODELS["step-3.5-flash"];
			const model2603 = STEPFUN_MODELS["step-3.5-flash-2603"];
			expect(model2603.cost.input).toBe(model35.cost.input);
			expect(model2603.cost.output).toBe(model35.cost.output);
			expect(model2603.cost.cacheRead).toBe(model35.cost.cacheRead);
		});

		it("step-router-v1 has zero pricing (billed by actual model hit)", () => {
			const model = STEPFUN_STEP_PLAN_MODELS["step-router-v1"];
			expect(model.cost.input).toBe(0);
			expect(model.cost.output).toBe(0);
			expect(model.cost.cacheRead).toBe(0);
		});
	});

	describe("base URLs", () => {
		it("stepfun models use regular API endpoint", () => {
			for (const model of Object.values(STEPFUN_MODELS)) {
				expect(model.baseUrl).toBe("https://api.stepfun.com/v1");
			}
		});

		it("stepfun-step-plan models use Step Plan endpoint", () => {
			for (const model of Object.values(STEPFUN_STEP_PLAN_MODELS)) {
				expect(model.baseUrl).toBe("https://api.stepfun.com/step_plan/v1");
			}
		});
	});

	describe("API type", () => {
		it("all stepfun models use openai-completions API", () => {
			for (const model of Object.values(STEPFUN_MODELS)) {
				expect(model.api).toBe("openai-completions");
			}
		});

		it("all stepfun-step-plan models use openai-completions API", () => {
			for (const model of Object.values(STEPFUN_STEP_PLAN_MODELS)) {
				expect(model.api).toBe("openai-completions");
			}
		});
	});

	describe("provider ID", () => {
		it("all stepfun models have correct provider ID", () => {
			for (const model of Object.values(STEPFUN_MODELS)) {
				expect(model.provider).toBe("stepfun");
			}
		});

		it("all stepfun-step-plan models have correct provider ID", () => {
			for (const model of Object.values(STEPFUN_STEP_PLAN_MODELS)) {
				expect(model.provider).toBe("stepfun-step-plan");
			}
		});
	});

	describe("stepfun-step-plan compatibility settings", () => {
		it("step-3.7-flash supports reasoning_effort", () => {
			const model = STEPFUN_STEP_PLAN_MODELS["step-3.7-flash"];
			expect(model.compat).toBeDefined();
			expect((model.compat as any).supportsReasoningEffort).toBe(true);
		});

		it("step-3.5-flash does not support reasoning_effort", () => {
			const model = STEPFUN_STEP_PLAN_MODELS["step-3.5-flash"];
			expect(model.compat).toBeDefined();
			expect((model.compat as any).supportsReasoningEffort).toBe(false);
		});

		it("step-3.5-flash-2603 supports reasoning_effort", () => {
			const model = STEPFUN_STEP_PLAN_MODELS["step-3.5-flash-2603"];
			expect(model.compat).toBeDefined();
			expect((model.compat as any).supportsReasoningEffort).toBe(true);
		});

		it("step-router-v1 does not support reasoning_effort", () => {
			const model = STEPFUN_STEP_PLAN_MODELS["step-router-v1"];
			expect(model.compat).toBeDefined();
			expect((model.compat as any).supportsReasoningEffort).toBe(false);
		});

		it("all stepfun-step-plan models use deepseek thinkingFormat", () => {
			for (const model of Object.values(STEPFUN_STEP_PLAN_MODELS)) {
				expect((model.compat as any).thinkingFormat).toBe("deepseek");
			}
		});

		it("all stepfun-step-plan models require reasoning content on assistant messages", () => {
			for (const model of Object.values(STEPFUN_STEP_PLAN_MODELS)) {
				expect((model.compat as any).requiresReasoningContentOnAssistantMessages).toBe(true);
			}
		});
	});

	describe("model names", () => {
		it("step-3.7-flash has correct name", () => {
			expect(STEPFUN_MODELS["step-3.7-flash"].name).toBe("Step 3.7 Flash");
		});

		it("step-3.5-flash has correct name", () => {
			expect(STEPFUN_MODELS["step-3.5-flash"].name).toBe("Step 3.5 Flash");
		});

		it("step-3.5-flash-2603 has correct name", () => {
			expect(STEPFUN_MODELS["step-3.5-flash-2603"].name).toBe("Step 3.5 Flash 2603");
		});

		it("step-router-v1 has correct name", () => {
			expect(STEPFUN_STEP_PLAN_MODELS["step-router-v1"].name).toBe("Step Router V1");
		});
	});
});
