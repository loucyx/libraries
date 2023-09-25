import type { IAttributeData } from "vscode-html-languageservice/lib/esm/htmlLanguageTypes.js";
import type { ReadOnlyArray } from "../ReadOnlyArray.js";
import { getDescription } from "./getDescription.js";

/**
 * Patches attributes because the original `vscode-html-languageservice` data is
 * duplicated sometimes.
 *
 * @category Internal
 * @param attributes Attributes to patch.
 * @returns Patched attributes.
 */
export const patchAttributes = (attributes: ReadOnlyArray<IAttributeData>) =>
	[
		...Object.values(
			attributes.reduce(
				(patchedAttributes, attribute) => ({
					...patchedAttributes,
					[attribute.name]: {
						...(patchedAttributes[attribute.name]
							? {
									...patchedAttributes[attribute.name],
									description: `${getDescription(
										// FIXME: This is not typed correctly in vscode-html-languageservice 🤦🏻
										// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
										patchedAttributes[attribute.name]
											?.description,
									)}\n\n---\n\n${getDescription(
										// FIXME: This is not typed correctly in vscode-html-languageservice 🤦🏻
										// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
										attribute.description,
									)}`,
							  }
							: attribute),
					} as IAttributeData,
				}),
				{} as Record<string, IAttributeData>,
			),
		),
	].sort((attributeA, attributeB) =>
		attributeA.name.localeCompare(attributeB.name),
	);