import { screenerState } from 'components/StockScreener/screener.state'
import { SEO } from 'components/SEO'
import { Screener } from 'components/StockScreener/_Screener'
import { ScreenerLayout } from 'components/Layout/ScreenerLayout'
import { PresetFiltersIpos } from 'components/StockScreener/maps/presetFilters.map'
import { useEffect } from 'react'

export default function IpoScreenerPage() {
	const type = screenerState((state) => state.type)
	const setType = screenerState((state) => state.setType)
	const setData = screenerState((state) => state.setData)
	const setLoaded = screenerState((state) => state.setLoaded)
	const clearFilters = screenerState((state) => state.clearFilters)
	const setResultsMenu = screenerState((state) => state.setResultsMenu)
	const setPresets = screenerState((state) => state.setPresets)

	// Reset everything when switching between screeners
	useEffect(() => {
		if (type !== 'ipo') {
			setType('ipo')
			setLoaded(false)
			clearFilters()
			setResultsMenu('General')
			setData([])
			setPresets(PresetFiltersIpos)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type])

	return (
		<>
			<SEO
				title="IPO Screener: Search and Filter Upcoming IPOs"
				description="An IPO screening tool to search, filter and compare all upcoming IPOs on the US stock market."
				canonical="/screener/ipo/"
			/>
			<ScreenerLayout>
				<Screener />
			</ScreenerLayout>
		</>
	)
}