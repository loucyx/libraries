import type { Unbound } from "@lou.codes/types";
import { construct } from "./construct.js";

/**
 * Functional alias for `new WeakSet()`.
 *
 * @category Classes
 */
export const constructWeakSet = construct(WeakSet) as <Value extends object>(
	iterable?: Iterable<Value>,
	// eslint-disable-next-line functional/prefer-readonly-type
) => Unbound<WeakSet<Value>>;
