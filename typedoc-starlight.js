import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const PACKAGES_DIRECTORY = "packages";
const TYPE_DOC_FILES_DIRECTORY = "docs/.typedoc/modules";
const ASTRO_TARGET = "docs/src/content/docs/libraries";

/**
 * @param {string} directory
 */
const readDirectoryRecursive = directory =>
	readdir(directory, { recursive: true }).then(files =>
		files.map(file => join(directory, file)),
	);

/**
 * @param {string} filename
 */
const getPackageFiles = filename => () =>
	readDirectoryRecursive(PACKAGES_DIRECTORY).then(files =>
		files.filter(
			file => !file.includes("node_modules") && file.endsWith(filename),
		),
	);

const getReadmeFiles = getPackageFiles("README.md");

const getPackageJsonFiles = getPackageFiles("package.json");

const getTypeDocMarkdownFiles = () =>
	readDirectoryRecursive(TYPE_DOC_FILES_DIRECTORY);

const groupFilePaths = () =>
	Promise.all([
		getReadmeFiles(),
		getPackageJsonFiles(),
		getTypeDocMarkdownFiles(),
	]).then(([readmeFilePaths, packageFilePaths, typeDocFilePaths]) =>
		readmeFilePaths.map(
			readmeFilePath =>
				/** @type {const} */ ([
					readmeFilePath,
					packageFilePaths.find(packageFilePath =>
						packageFilePath.endsWith(
							`/${readmeFilePath
								.replace(`${PACKAGES_DIRECTORY}/`, "")
								.replace("/README.md", "/package.json")}`,
						),
					) ?? "",
					typeDocFilePaths.find(typeDocFilePath =>
						typeDocFilePath.endsWith(
							`/${readmeFilePath
								.replace(`${PACKAGES_DIRECTORY}/`, "")
								.replace("/README", "")
								.replace("@lou.codes", "lou_codes")
								.replace(/[-/]/gu, "_")}`,
						),
					) ?? "",
				]),
		),
	);

/** @param {string} path */
const readFileUTF8 = path =>
	readFile(path, { encoding: "utf-8" })
		.then(content => ({
			content,
			path,
		}))
		.catch(() => Promise.reject({ path }));

const getGroupedFiles = () =>
	groupFilePaths().then(filePairs =>
		Promise.all(
			filePairs.map(
				([readmeFilePath, packageFilePath, typeDocFilePath]) =>
					Promise.all([
						readFileUTF8(readmeFilePath),
						readFileUTF8(packageFilePath).then(
							({ content }) =>
								/** @type {import("./package.json")} */ (
									// eslint-disable-next-line @typescript-eslint/no-unsafe-return
									JSON.parse(content)
								),
						),
						readFileUTF8(typeDocFilePath),
					]),
			),
		),
	);

const allUpper = ["ansi"];

/** @param {string} packageName */
const packageNameToTitle = packageName =>
	packageName
		.replace("@lou.codes/", "")
		.replaceAll("-", " ")
		.split(" ")
		.map(word =>
			allUpper.includes(word) ?
				word.toUpperCase()
			:	word.replace(/./u, character => character.toLocaleUpperCase()),
		)
		.join(" ");

const excluded = ["@lou.codes/create-package", "@lou.codes/types"];

/**
 * @param {{
 * 	readonly description: string;
 * 	readonly title: string;
 * }} options
 */
const frontMatter = ({ description, title }) => `---
description: "${description}"
${
	excluded.includes(title) ? "" : (
		`head:
    - attrs:
          defer: true
          type: module
      content:
          globalThis.addEventListener(
              "load",
              () =>
                  void import("https://esm.sh/${title}?bundle")
                      .then(
                          library => (
                              Object.assign(globalThis, library),
                              console.log("${title} loaded in globalThis")
                          ),
                      )
                      .catch(() => console.error("${title} couldn't be loaded")),
          );
      tag: script
`
	)
}sidebar:
    label: "${packageNameToTitle(title)}"
title: "${packageNameToTitle(title)} by Lou"
---`;

const formatPairedDocs = () =>
	getGroupedFiles().then(filePairs =>
		filePairs.map(
			([readmeFile, packageFile, typeDocFile]) =>
				/** @type {const} */ ([
					typeDocFile.path.replace(
						TYPE_DOC_FILES_DIRECTORY,
						ASTRO_TARGET,
					),
					`${frontMatter({
						description: packageFile.description,
						title: packageFile.name,
					})}\n\n${
						readmeFile.content
					}\n\n<!-- Start of auto-generated code by TypeDoc -->\n\n${typeDocFile.content
						.split("\n")
						.slice(2)
						.join("\n")
						.replaceAll(
							typeDocFile.path.split("/").at(-1) ?? "",
							"",
						)
						.replace(
							/#### Defined in\n\n\[.+\]\((?<path>.+)\)/gu,
							"> [View source]($1)",
						)}`
						// FIXME: TypeDoc is messing some resolutions, this fixes it™️.
						// Remove it once is fixed in TypeDoc.
						.replace(
							/#### Defined in\n\nnode_modules\/(?<packageName>@lou\.codes\/.+)\/dist\/(?<filename>.+)\.d\.ts:\d+/gu,
							"> [View source](https://github.com/loucyx/lou.codes/blob/main/packages/$1/src/$2.ts)",
						)
						.replace(
							/#### Defined in\npackages\/(?<sourcePackageName>@lou\.codes\/.+)\/node_modules\/(?<packageName>@lou\.codes\/.+)\/dist\/(?<filename>.+)\.d\.ts:\d+/gu,
							"> [View source](https://github.com/loucyx/lou.codes/blob/main/packages/$1/src/$2.ts)",
						)
						.replaceAll("https://lou.codes/", "/")
						.replaceAll("https://lou.codes", "/")
						.replace(
							/(?<optionalPropertyEnd>\?`)(?<spaces> +\|)/gu,
							" (optional)`$2",
						),
				]),
		),
	);

const writeFormattedDocs = () =>
	mkdir(ASTRO_TARGET, { recursive: true })
		.then(() =>
			formatPairedDocs().then(formattedPairs =>
				Promise.all(
					formattedPairs.map(([path, content]) =>
						writeFile(path, content, { encoding: "utf-8" }),
					),
				),
			),
		)
		.then(() => "Docs written");

// eslint-disable-next-line no-console
void writeFormattedDocs().then(console.log).catch(console.error);
