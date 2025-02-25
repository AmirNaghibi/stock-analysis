/* eslint-disable import/no-anonymous-default-export */
import { rebind } from '../utils'
import { kagi } from '../calculator'
import baseIndicator from './baseIndicator'
const ALGORITHM_TYPE = 'Kagi'
export default function Kagi() {
	const base = baseIndicator().type(ALGORITHM_TYPE)
	const underlyingAlgorithm = kagi()
	const indicator = underlyingAlgorithm
	rebind(indicator, base, 'id', 'stroke', 'fill', 'echo', 'type')
	rebind(
		indicator,
		underlyingAlgorithm,
		'dateAccessor',
		'dateMutator',
		'options'
	)
	return indicator
}
// # sourceMappingURL=kagi.js.map
