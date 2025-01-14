import type { Unary } from "@lou.codes/types";
import type { h } from "preact";

/**
 * Function that receives the paired hook and must return a `VNode`.
 *
 * @category Internal
 */
export type PairedRenderFunction<Hook extends Function> = Unary<
	Hook,
	ReturnType<typeof h>
>;
