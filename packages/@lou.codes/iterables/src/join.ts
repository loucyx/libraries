import { EMPTY_STRING } from "@lou.codes/constants/empty.js";
import type { Maybe, ReadOnlyIterable, Strigifiable } from "@lou.codes/types";
import { reduce } from "./reduce.js";

/**
 * Takes a `separator` string and a iterable and returns a string with the
 * concatenation of all the elements separated by the `separator`.
 *
 * @category Reducers
 * @example
 * ```typescript
 * const joinWithSpaces = join(" ");
 * joinWithSpaces([1, 2, 3]); // "1 2 3"
 * ```
 * @param separator String to use as separator.
 * @returns Curried function with `separator` in context.
 */
export const join =
	<const Separator extends string>(separator: Separator) =>
	<Item extends Strigifiable>(iterable: ReadOnlyIterable<Item>) =>
		(reduce<Item, Maybe<string>>(
			item => string =>
				`${string ?? EMPTY_STRING}${
					string === undefined ? EMPTY_STRING : separator
				}${item}`,
		)(undefined)(iterable) ??
			EMPTY_STRING) as `${string}${Separator}${string}`;
