import type { Test } from "@lou.codes/test";
import { constructDate } from "../src/constructDate.js";

export default {
	given: "a constructDate",
	must: "return new instance of Date",
	received: () => constructDate().constructor.name,
	wanted: () => "Date",
} satisfies Test<string>;
