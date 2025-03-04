import { values } from "@lou.codes/constants/Object.js";
import { EMPTY_STRING } from "@lou.codes/constants/empty.js";
import type { ReadOnlyRecord } from "@lou.codes/types";
import { readdir, writeFile } from "node:fs/promises";
import { sourceURL } from "./sourceURL.js";
import { targetURL } from "./targetURL.js";
import type { Answers } from "./types/Answers.js";

export const copyTemplates = (answers: Answers) =>
	readdir(sourceURL("./templates/"))
		.then(filenames =>
			Promise.all(
				filenames
					.filter(filename => filename.endsWith(".js"))
					.map(filename =>
						import(
							sourceURL(`./templates/${filename}`).toString()
						).then(
							(
								importedTemplate: ReadOnlyRecord<
									string,
									(answers: Answers) => string
								>,
							) =>
								Promise.all(
									values(importedTemplate).map(
										templateFunction =>
											writeFile(
												targetURL(
													`${
														answers.name
													}/${filename.replace(
														/\.js$/u,
														EMPTY_STRING,
													)}`,
												),
												templateFunction(answers),
												"utf8",
											),
									),
								),
						),
					),
			),
		)
		.then(() => answers);
