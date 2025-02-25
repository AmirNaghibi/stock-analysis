import { useMemo } from 'react'
import { getColumns } from './getColumns'
import { useTableData } from './useTableData'
import { StockTableBody } from './_StockTableBody'
import { useTableContext } from './TableContext'

/**
 * A re-usable screener mechanism that can output a table of stocks with specific properties
 * Customizable columns, export, filtering, sorting, and pagination
 */
export function StockTable({ _data }: { _data: any[] }) {
	// Get the table contexts
	const { type, tableId, fixed, dynamic, setState, enabled } =
		useTableContext()

	// Get the props
	const { defaultSort } = fixed
	const { columns: _columns, main, sort } = dynamic

	// pass initial data into react query
	const query = useTableData(tableId, type, dynamic, _data, enabled)

	// memoize the data and columns
	const data = useMemo(() => query.data.data || query.data, [query.data])
	const columns = useMemo(() => getColumns(_columns, main), [_columns, main])

	const sortProps = useMemo(
		() => ({ defaultSort, setSort: (sort: any) => setState({ sort }) }),
		[defaultSort, setState]
	)

	// pass the data and columns into react table
	return (
		<StockTableBody
			data={data}
			columns={columns}
			sortProps={sortProps}
			sort={sort}
		/>
	)
}
