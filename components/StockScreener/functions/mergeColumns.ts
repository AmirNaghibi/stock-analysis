import { SingleStock, ColumnId } from 'components/StockScreener/screener.types';

// Merge a new screener column with the existing columns
export function mergeColumns(
	existing: SingleStock[],
	newColumns: SingleStock[],
	columnId: ColumnId
): any {
	const combined: any = existing.map((stock: SingleStock) => {
		const newStock = newColumns.find((newStock: SingleStock) => {
			return stock.s === newStock.s;
		});
		if (newStock) {
			return { ...stock, [columnId]: newStock[columnId] };
		} else {
			return;
		}
	});

	return combined;
}
