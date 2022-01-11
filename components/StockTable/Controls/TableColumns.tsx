import { Dropdown } from 'components/Dropdown/_Dropdown'
import { ColumnItemWrap } from 'components/StockScreener/_Results/ResultsMenu/ColumnSelection/ColumnItemWrap'
import { ColumnSearch } from 'components/StockScreener/_Results/ResultsMenu/ColumnSelection/ColumnSearch'

export function TableColumns() {
	return (
		<Dropdown title="Columns">
			<ColumnSearch search="" setSearch={() => null} />
			<ColumnItemWrap search={''} type="" />
		</Dropdown>
	)
}
