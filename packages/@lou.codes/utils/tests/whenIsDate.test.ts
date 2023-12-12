import type { Tests } from "@lou.codes/test";
import { constructDate } from "../src/constructDate.js";
import { whenIsDate } from "../src/whenIsDate.js";

const whenIsDateTest = whenIsDate(() => "truthy")(() => "falsy");

export const whenIsDateTests = [
	{
		given: "a whenIsDate with a Date",
		must: "receive the truthy value",
		received: () => whenIsDateTest(constructDate()),
		wanted: () => "truthy",
	},
	{
		given: "a whenIsDate without a Date",
		must: "receive the falsy value",
		received: () => whenIsDateTest("nope"),
		wanted: () => "falsy",
	},
] satisfies Tests<string>;
