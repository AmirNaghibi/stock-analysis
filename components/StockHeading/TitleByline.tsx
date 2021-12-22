import { useQuote } from 'hooks/useQuote'
import { Info } from 'types/Info'
import { isTradingHoursClosed } from 'functions/datetime/isTradingHours'

export function TitleByline({ info }: { info: Info }) {
	const quote = useQuote(info)

	// Got some JS errors in the log that quote was null on brand new IPOs
	if (quote === null) {
		return null
	}

	const timing =
		info.exchange === 'OTCMKTS' || (quote.e && !isTradingHoursClosed())
			? 'Delayed Price'
			: 'IEX Real-Time Price'

	return (
		<div className="text-tiny text-gray-600 mt-[1px]">
			{`${info.exchange}: ${info.ticker} · ${timing} · USD`}
		</div>
	)
}
