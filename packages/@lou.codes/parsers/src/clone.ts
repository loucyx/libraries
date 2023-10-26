import type { Maybe } from "@lou.codes/types";
import { attempt } from "./attempt.js";

/**
 * Safely clones a value, returning `undefined` if any part of the input value
 * is not serializable.
 *
 * @category Common
 * @remarks
 * This util makes use of `structuredClone` to clone the given value, but
 * instead of throwing a `DataCloneError`, it simply returns `undefined` when
 * the value is not serializable.
 * @example
 * ```typescript
 * clone({ foo: "bar" }); // { foo: "bar" }
 * clone({ function: () => {} }); // undefined
 * ```
 * @see {@link attempt}
 * @see [structuredClone](https://mdn.io/structuredClone)
 *
 * @template Type Type of the value to be cloned.
 * @param value Value to be cloned.
 * @returns Clone of the value or `undefined` if can't be serialized.
 */
export const clone = attempt(structuredClone) as <Type>(
	value: Type,
) => Maybe<Type>;
