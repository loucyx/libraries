import { isArray } from "@lou.codes/predicates";
import { when } from "./when.js";

/**
 * Conditional handler for when something is an `Array`.
 *
 * @category Conditions
 */
export const whenIsArray = when(isArray);
