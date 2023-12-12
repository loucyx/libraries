import type { Tests } from "@lou.codes/test";
import { isCronMonthValueString } from "../../src/validations/isCronMonthValueString.js";

export const isCronMonthValueStringTests = [
	{
		given: "a valid value in the range JAN-DEC",
		must: "return true",
		received: () => isCronMonthValueString("OCT"),
		wanted: () => true,
	},
	{
		given: "a valid value in the range JAN-DEC in lowercase",
		must: "return true",
		received: () => isCronMonthValueString("oct"),
		wanted: () => true,
	},
	{
		given: "an invalid value",
		must: "return false",
		received: () => isCronMonthValueString("OCTOBER"),
		wanted: () => false,
	},
] as Tests<boolean>;
