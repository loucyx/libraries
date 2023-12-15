import { bold } from "@lou.codes/ansi";
import { EMPTY_STRING } from "@lou.codes/constants";
import { FAIL, PASS } from "./constants.js";
import { stringifyDifference } from "./stringifyDifference.js";
import type { TestResult } from "./types/TestResult.js";

/**
 * Takes a `TestResult` and returns a readable string..
 *
 * @category Output
 * @example
 * ```typescript
 * stringifyTest({
 * 	given: "🟢",
 * 	must: "🟩",
 * }); // "[PASS] Given 🟢, must 🟩."
 * stringifyTest({
 * 	differences: [...],
 * 	given: "🟢",
 * 	must: "🟩",
 * }); // "[FAIL] Given 🟢, must 🟩, but..."
 * ```
 * @param testResult Test result object.
 * @returns Readable string.
 */
export const stringifyTest = ({ differences, given, must }: TestResult) =>
	`${differences === undefined ? PASS : FAIL} Given ${bold(
		given,
	)}, must ${bold(must)}${differences === undefined ? "." : ", but...\n"}${
		differences
			?.map(
				(difference, index) =>
					`\t${
						index === differences.length - 1 ? "└" : "├"
					} ${stringifyDifference(difference)}`,
			)
			.join("\n") ?? EMPTY_STRING
	}`;
