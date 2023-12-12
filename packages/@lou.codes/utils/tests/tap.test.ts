import type { Test } from "@lou.codes/test";
import { tap } from "../src/tap.js";

// eslint-disable-next-line functional/no-let
let tapped = false;
const tappedTest = tap((argument: boolean) => (tapped = argument))(
	(_argument: boolean) => "foo",
);

export const tapTest = {
	given: "a tapped function",
	must: "return expected value but run tapper first",
	received: () => [tappedTest(true), tapped],
	wanted: () => ["foo", true],
} satisfies Test<readonly [string, boolean]>;
