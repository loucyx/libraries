import type { ReadOnly } from "@vangware/types";
import { hasAsyncIteratorSymbol } from "./hasAsyncIteratorSymbol.js";
import { isFunction } from "./isFunction.js";
import { isObject } from "./isObject.js";
import { asyncIteratorSymbol } from "./symbols.js";

/**
 * Check if given value is `AsyncIterable`.
 *
 * **Not to be confused with `isAsynchronousIterable` which checks for both
 * `AsyncIterable` and `Iterable`.**
 *
 * @category Iterables
 * @example
 * ```
 * isAsyncIterable((async function * () { yield* [] })()); // true
 * isAsyncIterable([]); // false
 * isAsyncIterable({}); // false
 * ```
 * @param input Value to check.
 * @returns `true` when is an `AsyncIterable`, `false` otherwise.
 */
export const isAsyncIterable = <Item>(
	input: unknown,
): input is ReadOnly<AsyncIterable<Item>> =>
	isObject(input) &&
	hasAsyncIteratorSymbol(input) &&
	isFunction(input[asyncIteratorSymbol]);
