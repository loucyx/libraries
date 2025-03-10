import { underlined } from "@lou.codes/ansi";
import { EMPTY_STRING } from "@lou.codes/constants/empty.js";
import type { IsomorphicIterable } from "@lou.codes/types";
import type { ReadOnlyURL } from "../ReadOnlyURL.js";
import type { TestTuple } from "../TestTuple.js";
import { FAILED_TESTS, TEST } from "../constants.js";
import { evaluate } from "../evaluate.js";
import { stringifyTest } from "../stringifyTest.js";
import { relativePath } from "./relativePath.js";

/**
 * Run tests in given iterable of urls and test objects and return a string with
 * the results.
 *
 * @category Output
 * @category Test
 * @example
 * ```typescript
 * runAndStringifyTests([
 * 	"file:///tests/example.test.ts",
 * 	{
 * 		given: "🟢",
 * 		must: "🟩",
 * 		received: () => "🟩",
 * 		wanted: () => "🟩",
 * 	},
 * ]);
 * // ❯ file:///tests/example.test.ts
 * // ✓ Given 🟢, must 🟩.
 * ```
 * @param testTuples Iterable of test tuples.
 * @yields Strings to be shown to the consumer.
 */
export const runAndStringifyTests = async function* (
	testTuples: IsomorphicIterable<TestTuple>,
) {
	// eslint-disable-next-line functional/prefer-immutable-types
	const fails: Array<[url: ReadOnlyURL, resultString: string]> = [];
	let lastPath = EMPTY_STRING as string;

	// eslint-disable-next-line functional/no-loop-statements
	for await (const [url, testObject] of testTuples) {
		const result = await evaluate(testObject);
		const resultString = stringifyTest(result);

		// eslint-disable-next-line functional/no-conditional-statements
		if (lastPath !== url.href) {
			// eslint-disable-next-line functional/immutable-data
			lastPath = url.href;
			yield `${TEST} ${underlined(relativePath(url))}`;
		}

		// eslint-disable-next-line functional/no-conditional-statements
		if (result.differences !== undefined) {
			// eslint-disable-next-line functional/immutable-data
			void fails.push([url, resultString]);
		}

		yield resultString;
	}

	// eslint-disable-next-line functional/no-conditional-statements
	if (fails.length > 0) {
		// eslint-disable-next-line functional/immutable-data
		lastPath = EMPTY_STRING;
		yield FAILED_TESTS;
		// eslint-disable-next-line functional/no-loop-statements
		for (const [url, resultString] of fails) {
			// eslint-disable-next-line functional/no-conditional-statements
			if (lastPath !== url.href) {
				// eslint-disable-next-line functional/immutable-data
				lastPath = url.href;
				yield `${TEST} ${underlined(relativePath(url))}`;
			}

			yield resultString;
		}
	}
};
