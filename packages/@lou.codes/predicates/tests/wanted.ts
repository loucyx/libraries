import type { Test } from "@lou.codes/test";

export const wantedFalse = {
	must: "return false",
	wanted: () => false,
} satisfies Pick<Test, "must" | "wanted">;

export const wantedTrue = {
	must: "return true",
	wanted: () => true,
} satisfies Pick<Test, "must" | "wanted">;
