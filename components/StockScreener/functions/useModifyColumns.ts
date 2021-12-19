import { FilterId } from '../screener.types'
import { screenerState } from 'components/StockScreener/screener.state'
import { screenerDataState } from 'components/StockScreener/screenerdata.state'
import { getData } from 'functions/apis/API'

function getScreenerUrl(type: string) {
	if (type === 'ipo') return 'iposcreener'
	if (type === 'etfs') return 'etfscreener'
	return 'screener'
}

/**
 * A custom hook with functions to manipulate the columns in the stock screener results table
 * @return {functions}
 */
export function useModifyColumns() {
	const showColumns = screenerState((state) => state.showColumns)
	const setShowColumns = screenerState((state) => state.setShowColumns)
	const fetchedColumns = screenerState((state) => state.fetchedColumns)
	const addFetchedColumn = screenerState((state) => state.addFetchedColumn)
	const addDataColumn = screenerDataState((state) => state.addDataColumn)

	// Fetch a new data column
	async function fetchColumn(id: FilterId, type: string) {
		if (!isFetched(id)) {
			addFetchedColumn(id)
			const fetched = await getData(getScreenerUrl(type) + `?type=${id}`)
			addDataColumn(fetched, id)
		}
	}

	// Check if data for a column has been fetched
	function isFetched(id: FilterId) {
		return fetchedColumns.includes(id)
	}

	// Toggle a column to either show or hide
	function toggle(id: FilterId, type: string) {
		if (showColumns.includes(id)) {
			setShowColumns(showColumns.filter((filter) => filter !== id))
		} else {
			if (!isFetched(id)) {
				fetchColumn(id, type)
			}
			setShowColumns([...showColumns, id])
		}
	}

	// Check if a column is showing
	function isShowing(id: FilterId) {
		return showColumns.includes(id)
	}

	return { fetchColumn, isFetched, toggle, isShowing }
}
