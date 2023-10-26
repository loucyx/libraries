import { isBoolean } from "@lou.codes/predicates";
import { when } from "./when.js";

/**
 * Conditional handler for when something is a `Boolean`.
 *
 * @category Conditions
 */
export const whenIsBoolean = when(isBoolean);
