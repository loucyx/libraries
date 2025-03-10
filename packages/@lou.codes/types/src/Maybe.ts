import type { Either } from "./Either.js";
import type { Just } from "./Just.js";

/**
 * Value that can be `undefined`.
 *
 * @category Common
 * @remarks
 * Union type useful for cases where a value might be `undefined`, and provides
 * a simple way to express this in TypeScript. For example, the return type of a
 * function that returns a `string` or `undefined` could be typed as
 * `Maybe<string>`.
 * @example
 * ```typescript
 * type MaybeNumber = Maybe<number>;
 * const maybeNumber: MaybeNumber = 1;
 * const notNumber: MaybeNumber = undefined;
 * ```
 * @see {@link Just}
 *
 * @template Input The type of the value to make optional.
 */
export type Maybe<Input> = Either<Just<Input>, undefined>;
