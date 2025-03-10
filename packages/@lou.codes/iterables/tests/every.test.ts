import { isNumber } from "@lou.codes/predicates";
import type { Tests } from "@lou.codes/test";
import { every } from "../src/every.js";
import { iterateArray } from "./utils.js";

const everyNumbers = every(isNumber);
const numbersArray = [0, 1, 2, 3];
const numbersWithStringArray = [0, 1, 2, "foo", 3];

export const everyTests = [
	{
		given: "an array of numbers",
		must: "return true",
		received: () => everyNumbers(numbersArray),
		wanted: () => true,
	},
	{
		given: "an array of numbers with a string on it",
		must: "return false",
		received: () => everyNumbers(numbersWithStringArray),
		wanted: () => false,
	},
	{
		given: "an iterable of numbers",
		must: "return true",
		received: () => everyNumbers(iterateArray(numbersArray)),
		wanted: () => true,
	},
	{
		given: "an iterable of numbers with a string on it",
		must: "return false",
		received: () => everyNumbers(iterateArray(numbersWithStringArray)),
		wanted: () => false,
	},
] satisfies Tests<boolean>;
