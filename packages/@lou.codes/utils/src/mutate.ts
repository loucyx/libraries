import { assign } from "@lou.codes/constants/Object.js";
import type { intercept } from "./intercept.js";

/**
 * Function to encapsulate object mutations.
 *
 * **⚠️ IMPORTANT:** Try to avoid this util, use {@link intercept} instead.
 *
 * @category Objects
 * @example
 * ```typescript
 * const state = { a: 1 };
 * mutate(set("a")(2))(state);
 * console.log(state); // { a: 2 }
 * ```
 * @param update Update to apply to given target.
 * @returns Curried function with `update` in context.
 */
export const mutate =
	<const Update extends object>(update: Update) =>
	<const Target extends object>(target: Target) =>
		// eslint-disable-next-line functional/immutable-data
		assign(target, update);
