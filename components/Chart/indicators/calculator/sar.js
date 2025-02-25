/* eslint-disable import/no-anonymous-default-export */
import { mappedSlidingWindow } from '../utils'
import { SAR as defaultOptions } from './defaultOptionsForComputation'
function calc(prev, now) {
	const risingSar = prev.risingSar + prev.af * (prev.risingEp - prev.risingSar)
	const fallingSar =
		prev.fallingSar - prev.af * (prev.fallingSar - prev.fallingEp)
	const risingEp = Math.max(prev.risingEp, now.high)
	const fallingEp = Math.min(prev.fallingEp, now.low)
	return {
		risingSar,
		fallingSar,
		risingEp,
		fallingEp
	}
}
export default function Sar() {
	let options = defaultOptions
	const calculator = data => {
		const { accelerationFactor, maxAccelerationFactor } = options
		const algorithm = mappedSlidingWindow()
			.windowSize(2)
			// @ts-ignore
			.undefinedValue(({ high, low }) => {
				return {
					risingSar: low,
					risingEp: high,
					fallingSar: high,
					fallingEp: low,
					af: accelerationFactor
				}
			})
			.accumulator(([prev, now]) => {
				const { risingSar, fallingSar, risingEp, fallingEp } = calc(
					prev,
					now
				)
				if (
					prev.use === undefined &&
					risingSar > now.low &&
					fallingSar < now.high
				) {
					return {
						risingSar,
						fallingSar,
						risingEp,
						fallingEp
					}
				}
				const use =
					prev.use !== undefined
						? prev.use === 'rising'
							? risingSar > now.low
								? 'falling'
								: 'rising'
							: fallingSar < now.high
							? 'rising'
							: 'falling'
						: risingSar > now.low
						? 'falling'
						: 'rising'
				const current =
					prev.use === use
						? {
								af: Math.min(
									maxAccelerationFactor,
									prev.af + accelerationFactor
								),
								fallingEp,
								risingEp,
								fallingSar,
								risingSar
						  }
						: {
								af: accelerationFactor,
								fallingEp: now.low,
								risingEp: now.high,
								fallingSar: Math.max(prev.risingEp, now.high),
								risingSar: Math.min(prev.fallingEp, now.low)
						  }
				const { date, high, low } = now
				return Object.assign(Object.assign({ date, high, low }, current), {
					use,
					sar: use === 'falling' ? current.fallingSar : current.risingSar
				})
			})
		const calculatedData = algorithm(data).map(d => d.sar)
		return calculatedData
	}
	calculator.undefinedLength = () => {
		return 1
	}
	calculator.options = newOptions => {
		if (newOptions === undefined) {
			return options
		}
		options = Object.assign(Object.assign({}, defaultOptions), newOptions)
		return calculator
	}
	return calculator
}
// # sourceMappingURL=sar.js.map
