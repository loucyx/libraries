import type { Tests } from "@lou.codes/test";
import type { Maybe } from "@lou.codes/types";
import type { CronObject } from "../src/CronObject.js";
import type { CronString } from "../src/CronString.js";
import { parse } from "../src/parse.js";
import { februaryBadDaysOfMonth } from "./februaryBadDaysOfMonth.js";

export const parseTests = [
	{
		given: "a * token for all fields",
		must: "return object with all properties set to *",
		received: () => parse("* * * * *"),
		wanted: () => ({
			dayOfMonth: "*",
			dayOfWeek: "*",
			hour: "*",
			minute: "*",
			month: "*",
		}),
	},
	{
		given: "a * token for all fields except minute",
		must: "return object with all properties set to * except minute",
		received: () => parse("13 * * * *"),
		wanted: () => ({
			dayOfMonth: "*",
			dayOfWeek: "*",
			hour: "*",
			minute: 13,
			month: "*",
		}),
	},
	{
		given: "a * token for all fields except hour",
		must: "return object with all properties set to * except hour",
		received: () => parse("* 13 * * *"),
		wanted: () => ({
			dayOfMonth: "*",
			dayOfWeek: "*",
			hour: 13,
			minute: "*",
			month: "*",
		}),
	},
	{
		given: "a * token for all fields except dayOfMonth",
		must: "return object with all properties set to * except dayOfMonth",
		received: () => parse("* * 13 * *"),
		wanted: () => ({
			dayOfMonth: 13,
			dayOfWeek: "*",
			hour: "*",
			minute: "*",
			month: "*",
		}),
	},
	{
		given: "a * token for all fields except month",
		must: "return object with all properties set to * except month",
		received: () => parse("* * * 10 *"),
		wanted: () => ({
			dayOfMonth: "*",
			dayOfWeek: "*",
			hour: "*",
			minute: "*",
			month: 10,
		}),
	},
	{
		given: "a * token for all fields except dayOfWeek",
		must: "return object with all properties set to * except dayOfWeek",
		received: () => parse("* * * * 5"),
		wanted: () => ({
			dayOfMonth: "*",
			dayOfWeek: 5,
			hour: "*",
			minute: "*",
			month: "*",
		}),
	},
	{
		given: "all fields set",
		must: "return object with all properties set",
		received: () => parse("13 13 13 10 5"),
		wanted: () => ({
			dayOfMonth: 13,
			dayOfWeek: 5,
			hour: 13,
			minute: 13,
			month: 10,
		}),
	},
	{
		given: "all fields set with ranges",
		must: "return object with all properties set",
		received: () => parse("12-13 12-13 12-13 9-10 4-5"),
		wanted: () => ({
			dayOfMonth: { from: 12, to: 13 },
			dayOfWeek: { from: 4, to: 5 },
			hour: { from: 12, to: 13 },
			minute: { from: 12, to: 13 },
			month: { from: 9, to: 10 },
		}),
	},
	{
		given: "all fields set with lists",
		must: "return object with all properties set",
		received: () => parse("12,13 12,13 12,13 9,10 4,5"),
		wanted: () => ({
			dayOfMonth: [12, 13],
			dayOfWeek: [4, 5],
			hour: [12, 13],
			minute: [12, 13],
			month: [9, 10],
		}),
	},
	{
		given: "all fields set with lists with ranges",
		must: "return object with all properties set",
		received: () => parse("11-12,13 11-12,13 11-12,13 8-9,10 3-4,5"),
		wanted: () => ({
			dayOfMonth: [{ from: 11, to: 12 }, 13],
			dayOfWeek: [{ from: 3, to: 4 }, 5],
			hour: [{ from: 11, to: 12 }, 13],
			minute: [{ from: 11, to: 12 }, 13],
			month: [{ from: 8, to: 9 }, 10],
		}),
	},
	{
		given: "0 17 * * mon,tue,wed,thu,fri",
		must: "turn days of week into their number equivalents",
		received: () => parse("0 17 * * mon,tue,wed,thu,fri" as CronString),
		wanted: () => ({
			dayOfMonth: "*",
			dayOfWeek: [1, 2, 3, 4, 5],
			hour: 17,
			minute: 0,
			month: "*",
		}),
	},
	{
		given: "00 06 * * MON-FRI",
		must: "turn days of week into their number equivalents and handle double digit starting with 0 values",
		received: () => parse("00 06 * * MON-FRI" as CronString),
		wanted: () => ({
			dayOfMonth: "*",
			dayOfWeek: { from: 1, to: 5 },
			hour: 6,
			minute: 0,
			month: "*",
		}),
	},
	{
		given: "* * * Mar-oct MON-FRI",
		must: "handle month and day aliases",
		received: () => parse("* * * Mar-oct MON-FRI" as CronString),
		wanted: () => ({
			dayOfMonth: "*",
			dayOfWeek: { from: 1, to: 5 },
			hour: "*",
			minute: "*",
			month: { from: 3, to: 10 },
		}),
	},
	{
		given: "all fields set with lists with ranges, but a mistake in hour",
		must: "return undefined",
		received: () => parse("11-12,13 11-12,24 11-12,13 8-9,10 3-4,5"),
		wanted: () => undefined,
	},
	{
		given: "an invalid string",
		must: "return undefined",
		received: () => parse("INVALID" as CronString),
		wanted: () => undefined,
	},
	{
		given: "an invalid date",
		must: "return undefined",
		received: () => parse("* * 31 2 *"),
		wanted: () => undefined,
	},
	{
		given: "an invalid date",
		must: "return undefined",
		received: () => parse("* * 30 02 *"),
		wanted: () => undefined,
	},
	{
		given: "an invalid date",
		must: "return undefined",
		received: () => parse("* * 31 feb *" as CronString),
		wanted: () => undefined,
	},
	{
		given: "an invalid date",
		must: "return undefined",
		received: () => parse("* * 31 4 *"),
		wanted: () => undefined,
	},
	{
		given: "a valid date containing an invalid one",
		must: "return it because there's a valid date",
		received: () => parse("* * 31 jan,feb *" as CronString),
		wanted: () => ({
			dayOfMonth: 31,
			dayOfWeek: "*",
			hour: "*",
			minute: "*",
			month: [1, 2],
		}),
	},
	...februaryBadDaysOfMonth.map(februaryBadDayOfMonth => ({
		given: `* * ${februaryBadDayOfMonth} 2 *`,
		must: "return undefined",
		received: () => parse(`* * ${februaryBadDayOfMonth} 2 *`),
		wanted: () => undefined,
	})),
	...februaryBadDaysOfMonth.map(februaryBadDayOfMonth => ({
		given: `* * ${februaryBadDayOfMonth} 2,3 *`,
		must: "return valid date because 3 is included",
		received: () =>
			({
				...parse(`* * ${februaryBadDayOfMonth} 2,3 *`),
				dayOfMonth: "*",
				month: [2, 3],
			}) as const,
		wanted: () =>
			({
				dayOfMonth: "*",
				dayOfWeek: "*",
				hour: "*",
				minute: "*",
				month: [2, 3],
			}) as const,
	})),
	...februaryBadDaysOfMonth.map(februaryBadDayOfMonth => ({
		given: `* * ${februaryBadDayOfMonth} 2-4 *`,
		must: "return valid date because 3 is included",
		received: () =>
			({
				...parse(`* * ${februaryBadDayOfMonth} 2-4 *`),
				dayOfMonth: "*",
			}) as const,
		wanted: () =>
			({
				dayOfMonth: "*",
				dayOfWeek: "*",
				hour: "*",
				minute: "*",
				month: { from: 2, to: 4 },
			}) as const,
	})),
	{
		given: "a list with duplicated values",
		must: "return flattened values",
		received: () => parse("1,2,3,1 * * * *" as CronString),
		wanted: () => ({
			dayOfMonth: "*",
			dayOfWeek: "*",
			hour: "*",
			minute: [1, 2, 3],
			month: "*",
		}),
	},
	{
		given: "a list of ranges with duplicated values",
		must: "return flattened values",
		received: () => parse("1-1,2-2,3-3,1-1 * * * *" as CronString),
		wanted: () => ({
			dayOfMonth: "*",
			dayOfWeek: "*",
			hour: "*",
			minute: [1, 2, 3],
			month: "*",
		}),
	},
] satisfies Tests<Maybe<Partial<CronObject>>>;
