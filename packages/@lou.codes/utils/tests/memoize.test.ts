import type { Test } from "@lou.codes/test";
import { memoize } from "../src/memoize.js";

// eslint-disable-next-line functional/no-let
let times = 0;
const double = (value: number) => {
	// eslint-disable-next-line functional/no-expression-statements
	times += 1;

	return value * 2;
};
const memoizedDouble = memoize(double);

export const memoizeTest = {
	given: "a memoized double function and several operations duplicated values",
	must: "run once per value",
	received: () => ([2, 2, 2, 3, 3, 3, 2, 2, 2].map(memoizedDouble), times),
	wanted: () => 2,
} satisfies Test<number>;
