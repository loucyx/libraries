import { isPrototypeOfObject } from "@lou.codes/predicates";
import { when } from "./when.js";

/**
 * Conditional handler for when something has an `Object` prototype.
 *
 * @category Conditions
 */
export const whenIsPrototypeOfObject = when(isPrototypeOfObject);
