import type { Tests } from "@lou.codes/test";
import { parseStringMinutesValue } from "../../src/parsers/parseStringMinutesValue.js";

export default [
	{
		given: "a valid number between 1 and 59",
		must: "return that number",
		received: () => parseStringMinutesValue("10"),
		wanted: () => 10,
	},
	{
		given: "an invalid number outside 1 and 59",
		must: "return undefined",
		received: () => parseStringMinutesValue("61"),
		wanted: () => undefined,
	},
] as Tests;
