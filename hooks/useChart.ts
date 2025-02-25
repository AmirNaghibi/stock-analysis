import { getData } from 'functions/apis/API'
import { useQuery } from 'react-query'
import { Info } from 'types/Info'
import { getChartUrl } from 'components/PriceChart/PriceChart.functions'

async function queryChart(symbol: string, type: string, time: string) {
	if (!time) return
	if (typeof symbol === 'undefined') return

	let url = getChartUrl(symbol, type, time)
	return await getData(url)
}

export function useChart(info: Info, time: string) {
	const { data, isFetching } = useQuery(
		['change', info.symbol, info.type, time],
		() => queryChart(info.symbol, info.type, time),
		{
			refetchOnWindowFocus: false,
			enabled: info.state !== 'upcomingipo' && !info.archived,
			notifyOnChangeProps: 'tracked',
			retry: false
		}
	)

	return { data, isFetching }
}
