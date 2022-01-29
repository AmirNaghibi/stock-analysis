/* eslint-disable import/no-anonymous-default-export */
import { merge, rebind } from '../utils'
import { wma } from '../calculator'
import baseIndicator from './baseIndicator'
const ALGORITHM_TYPE = 'WMA'
export default function Wma() {
	const base = baseIndicator()
		.type(ALGORITHM_TYPE)
		.accessor(d => d.wma)
	const underlyingAlgorithm = wma()
	const mergedAlgorithm = merge()
		.algorithm(underlyingAlgorithm)
		.merge((datum, i) => {
			datum.wma = i
		})
	const indicator = (data, options = { merge: true }) => {
		if (options.merge) {
			if (!base.accessor()) {
				throw new Error(
					`Set an accessor to ${ALGORITHM_TYPE} before calculating`
				)
			}
			return mergedAlgorithm(data)
		}
		return underlyingAlgorithm(data)
	}
	rebind(indicator, base, 'id', 'accessor', 'stroke', 'fill', 'echo', 'type')
	rebind(indicator, underlyingAlgorithm, 'options', 'undefinedLength')
	rebind(indicator, mergedAlgorithm, 'merge', 'skipUndefined')
	return indicator
}
// # sourceMappingURL=wma.js.map
