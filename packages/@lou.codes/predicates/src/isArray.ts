import { isArray as arrayIsArray } from "@lou.codes/constants/Array.js";
import type { ReadOnlyArray } from "@lou.codes/types";

/**
 * Check if given `input` is an instance of `Array`.
 *
 * @category Iterables
 * @example
 * ```typescript
 * isArray([]); // true
 * isArray({ length: 42 }); // false
 * ```
 * @returns `true` if the given value is an array, `false` otherwise.
 */
export const isArray = arrayIsArray as <Item>(
	input: unknown,
) => input is ReadOnlyArray<Item>;
