import {
	foregroundBrightRed,
	foregroundCyan,
	foregroundRed,
} from "@lou.codes/ansi";
import { CREATE, DELETE, UPDATE } from "@lou.codes/diff";
import type { Tests } from "../src/Tests.js";
import { EXCEPTION } from "../src/constants.js";
import { stringifyDifference } from "../src/stringifyDifference.js";

export const stringifyDifferenceTests = [
	{
		given: "a deletion difference",
		must: `return stringified difference`,
		received: () =>
			stringifyDifference({
				kind: DELETE,
				left: "🟢",
				path: ["🟢", "🟩"],
			}),
		wanted: () => `${foregroundCyan`🟢`}.${foregroundCyan`🟩`} is missing.`,
	},
	{
		given: "an edit difference",
		must: `return stringified difference`,
		received: () =>
			stringifyDifference({
				kind: UPDATE,
				left: "🟢",
				path: ["🟢", "🟩"],
				right: "❌",
			}),
		wanted: () =>
			`${foregroundCyan`🟢`}.${foregroundCyan`🟩`} has the wrong value. Wanted ${foregroundBrightRed`"🟢"`} but received ${foregroundBrightRed`"❌"`}.`,
	},
	{
		given: "a new difference",
		must: `return stringified difference`,
		received: () =>
			stringifyDifference({
				kind: CREATE,
				path: ["🟢", "🟩"],
				right: "🟢",
			}),
		wanted: () =>
			`${foregroundCyan`🟢`}.${foregroundCyan`🟩`} was set with value ${foregroundBrightRed`"🟢"`}.`,
	},
	{
		given: "an Error difference",
		must: `return stringified difference`,
		received: () =>
			stringifyDifference({
				error: new Error("❌"),
				kind: EXCEPTION,
			}),
		wanted: () => foregroundRed`there was an uncaught error: ❌.`,
	},
	{
		given: "a plain error difference",
		must: `return stringified difference`,
		received: () =>
			stringifyDifference({
				error: "❌",
				kind: EXCEPTION,
			}),
		wanted: () => foregroundRed`there was an uncaught error: ❌.`,
	},
] satisfies Tests<string>;
