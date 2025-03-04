import type { ReadOnlyArray } from "@lou.codes/types";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { ReadOnlyURL } from "../src/ReadOnlyURL.js";
import type { Tests } from "../src/Tests.js";
import { getFilePaths } from "../src/bin/getFilePaths.js";
import { iterableToArray } from "./utils.js";

const currentDirectoryURLResolve = (...paths: ReadonlyArray<string>) =>
	pathToFileURL(resolve(fileURLToPath(import.meta.url), ...paths));

export const getFilePathsTests = [
	{
		given: "a valid directory path",
		must: "return an array with the files on it",
		received: () =>
			iterableToArray(
				getFilePaths(currentDirectoryURLResolve("../directory")),
			),
		wanted: () => [
			currentDirectoryURLResolve(
				"../directory/defaultInDirectory.test.ts",
			),
			currentDirectoryURLResolve("../directory/inDirectory.test.ts"),
			currentDirectoryURLResolve(
				"../directory/multipleDefaultInDirectory.test.ts",
			),
			currentDirectoryURLResolve(
				"../directory/multipleInDirectory.test.ts",
			),
		],
	},
	{
		given: "a valid file path",
		must: "return an array with that file on it",
		received: () =>
			iterableToArray(
				getFilePaths(
					currentDirectoryURLResolve(
						"../directory/inDirectory.test.ts",
					),
				),
			),
		wanted: () => [
			currentDirectoryURLResolve("../directory/inDirectory.test.ts"),
		],
	},
	{
		given: "an invalid directory path",
		must: "reject the promise",
		received: () =>
			iterableToArray(
				getFilePaths(currentDirectoryURLResolve("../nope")),
			).catch((error: unknown) => (error as Error).message),
		wanted: () =>
			`ENOENT: no such file or directory, stat '${currentDirectoryURLResolve(
				"../nope",
			)
				.toString()
				.replace("file://", "")}'`,
	},
] satisfies Tests<ReadOnlyArray<ReadOnlyURL> | string>;
