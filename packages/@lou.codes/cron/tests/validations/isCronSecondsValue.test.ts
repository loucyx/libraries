import type { Tests } from "@lou.codes/test";
import { isCronSecondsValue } from "../../src/validations/isCronSecondsValue.js";

export default [
	{
		given: "a valid number value in the range 0-59",
		must: "return true",
		received: () => isCronSecondsValue(30),
		wanted: () => true,
	},
	{
		given: "an invalid number outside the range 0-59",
		must: "return false",
		received: () => isCronSecondsValue(80),
		wanted: () => false,
	},
	{
		given: "an invalid value",
		must: "return false",
		received: () => isCronSecondsValue("INVALID"),
		wanted: () => false,
	},
] as Tests<boolean>;
