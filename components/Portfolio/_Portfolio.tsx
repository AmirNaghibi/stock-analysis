import { AddSymbol } from 'components/Portfolio/AddSymbol';
import { PortfolioTable } from 'components/Portfolio/PortfolioTable';
import { useFetchPortfolioList } from './useFetchPortfolioList';
import Link from 'next/link';

export function Portfolio({ id }: { id: string }) {
	const { data } = useFetchPortfolioList();
	const title = data?.find((item: any) => item.id == id)?.name;

	return (
		<div>
			<h1 className="hh2">
				<Link href="/portfolio">
					<a className="bll">All Portfolios</a>
				</Link>
				{' > '}
				{title || 'Portfolio'}
			</h1>
			<AddSymbol id={id} />
			<PortfolioTable id={id} />
		</div>
	);
}