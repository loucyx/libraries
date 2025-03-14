// eslint-disable-next-line capitalized-comments
/* c8 ignore start */
import { values } from "@lou.codes/constants/Object.js";
import type { ReadOnlyURL } from "./ReadOnlyURL.js";
import type { Tests } from "./Tests.js";
import type { TestsImport } from "./TestsImport.js";
import { isTest } from "./isTest.js";

/**
 * Import a file that exports a `Test` or an Iterable of `Test`.
 *
 * @category File System
 * @example
 * ```typescript
 * testImport(new URL("file:///example/test.test.js"));
 * // AsyncIterable<[
 * // 	{
 * // 		given: "example 1",
 * // 		must: "example 1",
 * // 		received: () => "value 1",
 * // 		wanted: () => "value 1"
 * // 	},
 * // 	{
 * // 		given: "example 2",
 * // 		must: "example 2",
 * // 		received: () => "value 2",
 * // 		wanted: () => "value 2"
 * // 	},
 * // ]>
 * ```
 * @param path Path to the test file.
 * @yields Imported tests.
 */
export const importTest = async function* (url: ReadOnlyURL) {
	// eslint-disable-next-line functional/no-loop-statements
	for await (const test of values(await (import(url.href) as TestsImport))) {
		// eslint-disable-next-line functional/no-conditional-statements
		if (
			typeof test === "object" &&
			(Symbol.iterator in test || Symbol.asyncIterator in test)
			// eslint-disable-next-line functional/no-conditional-statements
		) {
			// eslint-disable-next-line functional/no-loop-statements
			for await (const testItem of test as Tests) {
				// eslint-disable-next-line functional/no-conditional-statements
				if (isTest(testItem)) {
					yield testItem;
				}
			}
		} else {
			// eslint-disable-next-line functional/no-conditional-statements
			if (isTest(test)) {
				yield test;
			}
		}
	}
};
// eslint-disable-next-line capitalized-comments
/* c8 ignore stop */
