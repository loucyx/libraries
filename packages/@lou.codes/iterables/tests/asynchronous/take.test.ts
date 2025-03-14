import type { Tests } from "@lou.codes/test";
import type { ReadOnlyArray } from "@lou.codes/types";
import { iterableToArray } from "../../src/asynchronous/iterableToArray.js";
import { repeat } from "../../src/asynchronous/repeat.js";
import { take } from "../../src/asynchronous/take.js";

const take2 = take(2);
const takeNone = take(0);
const takeAll = take(Infinity);
const repeatZeroForever = repeat(Infinity)(0);

export const takeTests = [
	{
		given: "an array of numbers and a take 2 function",
		must: "return array with only the first 2 elements",
		received: () => iterableToArray(take2([0, 1, 2, 3, 4])),
		wanted: () => [0, 1],
	},
	{
		given: "an array of numbers and a take 0 function",
		must: "return an empty array",
		received: () => iterableToArray(takeNone([0, 1, 2, 3, 4])),
		wanted: () => [],
	},
	{
		given: "an array of numbers and a take all function",
		must: "return the whole array",
		received: () => iterableToArray(takeAll([0, 1, 2, 3, 4])),
		wanted: () => [0, 1, 2, 3, 4],
	},
	{
		given: "an iterable of infinite values and a take(2)",
		must: "return a 2 items without hanging",
		received: () => iterableToArray(take2(repeatZeroForever)),
		wanted: () => [0, 0],
	},
	{
		given: "an iterable of infinite values and a take(0)",
		must: "return a no items without hanging",
		received: () => iterableToArray(takeNone(repeatZeroForever)),
		wanted: () => [],
	},
] satisfies Tests<ReadOnlyArray<number>>;
