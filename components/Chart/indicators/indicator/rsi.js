/* eslint-disable import/no-anonymous-default-export */
import { merge, rebind } from '../utils'
import { rsi } from '../calculator'
import baseIndicator from './baseIndicator'
const ALGORITHM_TYPE = 'RSI'
export default function Rsi() {
	const base = baseIndicator()
		.type(ALGORITHM_TYPE)
		.accessor(d => d.rsi)
	const underlyingAlgorithm = rsi()
	const mergedAlgorithm = merge()
		.algorithm(underlyingAlgorithm)
		.merge((datum, i) => {
			datum.rsi = i
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
// # sourceMappingURL=rsi.js.map
