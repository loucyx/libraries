import { bold, foregroundRed } from "@lou.codes/ansi";
import { EXCEPTION, FAIL, PASS } from "../src/constants.js";
import { stringifyTest } from "../src/stringifyTest.js";
import type { Tests } from "../src/types/Tests.js";

export default [
	{
		given: "a passing test",
		must: "return a PASS string",
		received: () => stringifyTest({ given: "🟢", must: "🟩" }),
		wanted: () => `${PASS} Given ${bold`🟢`}, must ${bold`🟩`}.`,
	},
	{
		given: "a failing test with empty differences",
		must: "return a FAIL string",
		received: () =>
			stringifyTest({ differences: [], given: "🟢", must: "🟩" }),
		wanted: () => `${FAIL} Given ${bold`🟢`}, must ${bold`🟩`}, but...\n`,
	},
	{
		given: "a failing test with one difference",
		must: "return a FAIL string",
		received: () =>
			stringifyTest({
				differences: [{ error: new Error("❌"), kind: EXCEPTION }],
				given: "🟢",
				must: "🟩",
			}),
		wanted: () =>
			`${FAIL} Given ${bold`🟢`}, must ${bold`🟩`}, but...\n\t└ ${foregroundRed`there was an uncaught error: ❌.`}`,
	},
	{
		given: "a failing test with multiple differences",
		must: "return a FAIL string",
		received: () =>
			stringifyTest({
				differences: [
					{ error: new Error("❌"), kind: EXCEPTION },
					{ error: new Error("❌"), kind: EXCEPTION },
				],
				given: "🟢",
				must: "🟩",
			}),
		wanted: () =>
			`${FAIL} Given ${bold`🟢`}, must ${bold`🟩`}, but...\n\t├ ${foregroundRed`there was an uncaught error: ❌.`}\n\t└ ${foregroundRed`there was an uncaught error: ❌.`}`,
	},
] satisfies Tests<string>;
