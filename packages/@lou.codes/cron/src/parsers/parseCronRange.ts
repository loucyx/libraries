import { isUndefined } from "@lou.codes/predicates";
import type { CronRange } from "../types/CronRange.js";
import type { CronValueParser } from "../types/CronValueParser.js";
import { isCronRange } from "../validations/isCronRange.js";

/**
 * Parses `CronRange` into a string.
 *
 * @category Parsers
 * @example
 * ```typescript
 * parseCronRangeSeconds({ from: 13, to: 10 }); // "13-10"
 * parseCronRangeSeconds({ from: 999, to: 999 }); // undefined
 * ```
 * @param parser `CronValueParser` for `CronRange`.
 * @returns Curried function with `parser` in context.
 */
export const parseCronRange =
	<Value>(parser: CronValueParser<Value>) =>
	(source: CronRange<Value>) => {
		const valid = isCronRange(source);
		const from = valid ? parser(source.from) : undefined;
		const to = valid ? parser(source.to) : undefined;

		return valid && !isUndefined(from) && !isUndefined(to) ?
				`${from}-${to}`
			:	undefined;
	};
