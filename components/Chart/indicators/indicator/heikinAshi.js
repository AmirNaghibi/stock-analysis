/* eslint-disable import/no-anonymous-default-export */
import { heikinAshi } from '../calculator'
import baseIndicator from './baseIndicator'
import { merge, rebind } from '../utils'
const ALGORITHM_TYPE = 'HeikinAshi'
export default function HeikinAshi() {
	const base = baseIndicator()
		.type(ALGORITHM_TYPE)
		.accessor(d => d.ha)
	const underlyingAlgorithm = heikinAshi()
	const mergedAlgorithm = merge()
		.algorithm(underlyingAlgorithm)
		.merge((datum, i) => {
			return Object.assign(Object.assign({}, datum), i)
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
	rebind(indicator, base, 'accessor', 'stroke', 'fill', 'echo', 'type')
	rebind(indicator, mergedAlgorithm, 'merge')
	return indicator
}
// # sourceMappingURL=heikinAshi.js.map
