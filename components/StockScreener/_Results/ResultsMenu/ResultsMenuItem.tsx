import { screenerState } from 'components/StockScreener/screener.state'
import {
	FilterId,
	ColumnName,
	ScreenerTypes
} from 'components/StockScreener/screener.types'
import {
	returnDefaultColumns,
	returnResultColumns
} from 'components/StockScreener/maps/resultColumns.map'
import { getData } from 'functions/apis/API'
import { getScreenerUrl } from 'components/StockScreener/functions/getScreenerUrl'

type Props = {
	name: ColumnName
	type: ScreenerTypes
}

export function ResultsMenuItem({ name, type }: Props) {
	const filters = screenerState((state) => state.filters)
	const resultsMenu = screenerState((state) => state.resultsMenu)
	const setResultsMenu = screenerState((state) => state.setResultsMenu)
	const setShowColumns = screenerState((state) => state.setShowColumns)
	const fetchedColumns = screenerState((state) => state.fetchedColumns)
	const filteredColumns = screenerState((state) => state.filteredColumns)
	const addFetchedColumn = screenerState((state) => state.addFetchedColumn)
	const addDataColumn = screenerState((state) => state.addDataColumn)

	let display = name.toString()
	let dataTitle = name.toString()
	if (name === 'Filtered') {
		display = `${name} (${filters.length})`
		dataTitle = `${name} (5)`
	}

	function fetchManyColumns(columns: FilterId[], screenerType: string) {
		columns.forEach(async (id) => {
			if (!fetchedColumns.includes(id)) {
				addFetchedColumn(id)
				const fetched = await getData(screenerType + `?type=${id}`)
				addDataColumn(fetched, id)
			}
		})
	}

	// When hovering over a results tab, fetch the required columns
	function handleHover(name: ColumnName) {
		if (name !== 'Filtered' && name !== 'General') {
			let screenerType = getScreenerUrl(type)
			fetchManyColumns(returnResultColumns(type, name), screenerType)
		}
	}

	function handleFilter(name: ColumnName) {
		setResultsMenu(name)

		if (name === 'Filtered') {
			setShowColumns(filteredColumns)
		} else if (name === 'General') {
			setShowColumns(returnDefaultColumns(type))
		} else {
			setShowColumns(returnResultColumns(type, name))
		}
	}

	if (resultsMenu === name) {
		return (
			<li>
				<span
					className="bg-gray-100 py-1 px-2 rounded-md font-medium focus:outline-none"
					data-title={dataTitle}
					tabIndex={0}
				>
					{display}
				</span>
			</li>
		)
	}

	return (
		<li>
			<span
				className="py-1 px-2 hover:bg-gray-100 hover:rounded-md cursor-pointer focus:outline-none"
				data-title={dataTitle}
				onClick={() => handleFilter(name)}
				onKeyPress={(e) => {
					e.key === 'Enter' && handleFilter(name)
				}}
				onMouseOver={() => handleHover(name)}
				onFocus={() => handleHover(name)}
				tabIndex={0}
			>
				{display}
			</span>
		</li>
	)
}
