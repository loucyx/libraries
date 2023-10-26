import type { ReadOnlyRecord } from "@lou.codes/types";

/**
 * Check if the given key is present in the given object (not inherited).
 *
 * @category Predicates
 * @category Objects
 * @example
 * ```typescript
 * const isPropertyOfFoo = isPropertyOf({ "🟢": "🟩" });
 * isPropertyOfFoo("🟢"); // true
 * isPropertyOfFoo("🟩"); // false
 * ```
 * @param object Object to check.
 * @returns Curried function with `context` set.
 */
export const isPropertyOf =
	<Key extends PropertyKey>(object: ReadOnlyRecord<Key>) =>
	(key: Key) =>
		Object.hasOwn(object, key);
