import * as React from 'react'
import { IOHLCData } from './iOHLCData'

export interface WithRatioProps {
	readonly ratio: number
	readonly width: number
	readonly height: number
	readonly period: string | null
	readonly time: string | null
	readonly type: string | null
	readonly loading: boolean
	readonly message: string
	readonly stockId: number
	readonly data: IOHLCData[]
}

export interface WithRatioState {
	ratio: number
}

export const withDeviceRatio = () => {
	return <TProps extends WithRatioProps>(
		OriginalComponent: React.ComponentClass<TProps>
	) => {
		return class WithRatio extends React.Component<
			Omit<TProps, 'ratio'>,
			WithRatioState
		> {
			public readonly ref = React.createRef<HTMLCanvasElement>()

			public componentDidMount() {
				const { current } = this.ref
				if (current === null) {
					this.setState({
						ratio: 1
					})

					return
				}

				const context: any = current.getContext('2d')

				const { devicePixelRatio } = window

				const backingStoreRatio =
					context.webkitBackingStorePixelRatio ??
					context.mozBackingStorePixelRatio ??
					context.msBackingStorePixelRatio ??
					context.oBackingStorePixelRatio ??
					context.backingStorePixelRatio ??
					1

				this.setState({
					ratio: devicePixelRatio / backingStoreRatio
				})
			}

			public render() {
				const state = this.state
				if (state !== null) {
					return (
						<OriginalComponent
							{...(this.props as TProps)}
							ratio={state.ratio}
						/>
					)
				}

				return <canvas ref={this.ref} />
			}
		}
	}
}
