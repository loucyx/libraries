#!/usr/bin/env node

// eslint-disable-next-line capitalized-comments
/* c8 ignore start */
import { argv, exit } from "node:process";
import { pathToFileURL } from "node:url";
import { FAILED_TESTS } from "../constants.js";
import { importTests } from "../importTests.js";
import { filterTestFilePaths } from "./filterTestFilePaths.js";
import { getFilePaths } from "./getFilePaths.js";
import { runAndStringifyTests } from "./runAndStringifyTests.js";

// eslint-disable-next-line functional/no-let
let hasFailedTests = false;

const testPath = pathToFileURL(argv[2] ?? "./tests/");
const pathsIterable = getFilePaths(testPath);
const testsPathsIterable = filterTestFilePaths(pathsIterable);
const testsImportsIterable = importTests(testsPathsIterable);
const testsStringsIterable = runAndStringifyTests(testsImportsIterable);

// eslint-disable-next-line functional/no-loop-statements
for await (const testString of testsStringsIterable) {
	// eslint-disable-next-line no-console
	console.log(testString);
	hasFailedTests ||= testString === FAILED_TESTS;
}

void exit(hasFailedTests ? 1 : 0);

// eslint-disable-next-line capitalized-comments
/* c8 ignore end */
