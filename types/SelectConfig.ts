import { DataId } from './Data'

export type SymbolTypes = 'stocks' | 'etf'
export type SortTypes = 'asc' | 'desc'

export type SelectConfig = {
	// The symbol type
	type: SymbolTypes

	// The main column to sort by
	main: string

	// The number of symbols to show
	count: number

	// The sort order
	sort: SortTypes

	// The columns to show
	columns: DataId[]

	// Reset the table state when switching to another page
	resetTableState?: (conf: SelectConfig) => void
}
