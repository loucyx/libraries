import { ownKeys } from "@lou.codes/constants/Reflect.js";
import type { Entry, ReadOnlyRecord } from "@lou.codes/types";
import { createIterableIterator } from "./createIterableIterator.js";

/**
 * Yields all entries of an object (including symbols).
 *
 * @category Asynchronous Generators
 * @example
 * ```typescript
 * const entries = objectEntries({ a: 1, b: 2 });
 * entries.next(); // { value: ["a", 1], done: false }
 * entries.next(); // { value: ["b", 2], done: false }
 * entries.next(); // { value: undefined, done: true }
 * ```
 * @param input Object to get entries from.
 * @returns Iterable with entries of the given object (including symbols).
 */
export const objectToEntries = <Key extends PropertyKey, Value>(
	input: ReadOnlyRecord<Key, Value>,
) =>
	createIterableIterator(async function* () {
		// eslint-disable-next-line functional/no-loop-statements
		for await (const key of ownKeys(input)) {
			yield [
				key as Key,
				input[key as keyof ReadOnlyRecord<Key, Value>],
			] as Entry<Key, Value>;
		}
	});
