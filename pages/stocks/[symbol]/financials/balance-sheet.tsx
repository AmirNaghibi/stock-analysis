import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Info } from 'types/Info'
import { FinancialsType } from 'types/Financials'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { SubNavigation } from 'components/FinancialTable/SubNavigation'
import { FinancialTable } from 'components/FinancialTable/_FinancialTable'
import { getStockFinancials } from 'functions/callBackEnd'
import { MAP_BALANCE_SHEET } from 'data/financials/map_balance_sheet'

interface Props {
	info: Info
	data: FinancialsType
	counts: {
		annual: number
		quarterly: number
		trailing: number
	}
}

export default function BalanceSheet({ info, data, counts }: Props) {
	return (
		<Stock
			info={info}
			url={`/stocks/${info.symbol}/financials/balance-sheet/`}
		>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Balance Sheet`}
				description={`Detailed balance sheet for ${info.nameFull} (${info.ticker}), including cash, debt, assets, liabilities, and book value.`}
				canonical={`/stocks/${info.symbol}/financials/balance-sheet/`}
			/>
			<div className="px-4 lg:px-6 mx-auto">
				<SubNavigation info={info} statement="balance_sheet" />
				<FinancialTable
					statement="balance_sheet"
					financials={data}
					map={MAP_BALANCE_SHEET}
					info={info}
					counts={counts}
				/>
			</div>
		</Stock>
	)
}

interface IParams extends ParsedUrlQuery {
	symbol: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams
	return await getStockFinancials('balance_sheet', symbol, 2 * 60 * 60)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' }
}
