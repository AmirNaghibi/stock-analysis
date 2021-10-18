import { Info } from 'types/Info';

const nasdaqLink = (
	<a
		href="https://data.nasdaq.com/"
		target="_blank"
		rel="noopener noreferrer"
		className="bll"
	>
		Nasdaq Data Link
	</a>
);

function secLink(cik: string | undefined) {
	if (cik) {
		return (
			<a
				href={`https://www.sec.gov/cgi-bin/browse-edgar?CIK=${cik}&type=S-1`}
				target="_blank"
				rel="noopener noreferrer"
				className="bll"
			>
				S-1 and S-1/A filings
			</a>
		);
	}
	return 'S-1 and S-1/A filings';
}

function returnLink(type: string, cik: string | undefined) {
	if (cik) {
		return (
			<a
				href={`https://www.sec.gov/cgi-bin/browse-edgar?CIK=${cik}&type=${type}`}
				target="_blank"
				rel="noopener noreferrer"
				className="bll"
			>
				{type}
			</a>
		);
	}
	return type;
}

export function FinancialSource({ info }: { info: Info }) {
	if (!info.cik) {
		return null;
	}

	if (
		info.state === 'upcomingipo' ||
		(info.state === 'newipo' && info.daysSince && info.daysSince < 5)
	) {
		return (
			<div className="text-tiny text-gray-700 mt-2">
				{/* prettier-ignore */}
				Source: IPO financials are sourced from {secLink(info.cik)}{' '}
				submitted to the Securities and Exchange Commission (SEC).
			</div>
		);
	}

	return (
		<div className="text-[0.85rem] text-gray-600 mt-2">
			{/* prettier-ignore */}
			Source: Financials are provided by {nasdaqLink} and sourced from the
			audited annual ({returnLink('10-K', info.cik)}) and quarterly (
			{returnLink('10-Q', info.cik)}) reports submitted to the Securities and
			Exchange Commission (SEC).
		</div>
	);
}
