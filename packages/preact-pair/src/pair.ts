import type { FunctionComponent } from "preact";
import type { PairedComponentProperties } from "./PairedComponentProperties.js";

/**
 * Creates a component with a function children that has the given hook in context.
 *
 * @example
 * ```tsx
 * const useCount = initialCount => {
 * 	const [count, setCount] = useState(initialCount);
 *
 * 	return { onClick: () => setCount(count + 1), children: count };
 * };
 *
 * const PairedCount = pair(useCount);
 *
 * const Component = ({ array = [] }) => (
 * 	<ul>
 * 		{array.map(key => (
 * 			<PairedCount key={key}>
 * 				{usePairedCount => {
 * 					const props = usePairedCount(key);
 *
 * 					return (
 * 						<li>
 * 							<button
 * 								type="button"
 * 								{...props}
 * 							/>
 * 						</li>
 * 					);
 * 				}}
 * 			</PairedCount>
 * 		))}
 * 	</ul>
 * );
 * ```
 * @param hook Hook to be paired.
 * @returns Component that expects a function as children with the paired hook.
 */
export const pair = <Hook extends Function>(hook: Hook) => {
	const PairedComponent = (properties =>
		properties.children(hook)) as FunctionComponent<
		PairedComponentProperties<Hook>
	> & { displayName: `paired(${Hook["name"]})` };

	return (
		// eslint-disable-next-line functional/immutable-data
		(PairedComponent.displayName = `paired(${hook.name})`), PairedComponent
	);
};
