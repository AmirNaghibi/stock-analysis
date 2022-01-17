import { getSelect } from 'functions/apis/getSelect'
import { useQuery } from 'react-query'
import { stockTableState } from './stockTableState'

/**
 * Handle the data for the stock table via react-query
 */
export function useTableData(_data: any[], path: string) {
	// Get the params from the table state
	const { type, active, main, count, sort, columns, filters, fetch } =
		stockTableState()

	// Add the params into an array to tell react-query when to update
	const queryObject = { type, active, main, count, sort, columns, filters }

	const { data, isLoading, error } = useQuery(
		[path, queryObject],
		async () => await getSelect(queryObject),
		{
			initialData: _data,
			enabled: fetch, // only fetch if columns are defined
			refetchOnWindowFocus: false
		}
	)

	return {
		data,
		isLoading,
		error
	}
}