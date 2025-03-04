import { foregroundRed } from "@lou.codes/ansi";
import { CREATE, DELETE, UPDATE } from "@lou.codes/diff";
import type { Difference } from "./Difference.js";
import { EXCEPTION } from "./constants.js";
import { formatPropertyPath } from "./formatPropertyPath.js";
import { formatValue } from "./formatValue.js";

/**
 * Dictionary `Difference` kind->formatter.
 *
 * @category Output
 */
export const stringifyDifferenceDictionary = {
	[CREATE]: difference =>
		`${formatPropertyPath(
			difference.path,
		)} was set with value ${formatValue(difference.right)}.`,
	[DELETE]: difference =>
		`${formatPropertyPath(difference.path)} is missing.`,
	[EXCEPTION]: difference =>
		foregroundRed`there was an uncaught error: ${
			difference.error instanceof Error ?
				difference.error.message
			:	(difference.error as string)
		}.`,
	[UPDATE]: difference =>
		`${formatPropertyPath(
			difference.path,
		)} has the wrong value. Wanted ${formatValue(
			difference.left,
		)} but received ${formatValue(difference.right)}.`,
} as const satisfies {
	readonly [Kind in Difference["kind"]]: (
		difference: Difference & { readonly kind: Kind },
	) => string;
};
