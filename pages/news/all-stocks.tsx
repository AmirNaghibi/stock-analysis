import { GetServerSideProps } from 'next'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { getMarketNews } from 'functions/callBackEnd'
import { NewsNavigation } from 'components/News/NewsNavigation'
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs'
import { NewsFeed } from 'components/News/_NewsFeed'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1'
import { Sidebar2 } from 'components/Ads/Snigel/Sidebar2'

interface Props {
	data: News[]
	other: News[]
}

export const AllStockNews = ({ data, other }: Props) => {
	return (
		<>
			<SEO
				title="All Stock News"
				description="The latest news on individual stocks on the US stock market, gathered from trusted finance and investing websites."
				canonical="/news/all-stocks/"
			/>
			<div className="">
				<main className="w-full py-5 xs:py-6">
					<div className="contain">
						<Breadcrumbs url="/news/all-stocks/" />
						<h1 className="hh1">All Stock News</h1>
						<NewsNavigation />
					</div>

					<div className="sm:contain lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-1 sm:pt-0 sm:pb-3">
							<NewsFeed data={data} related="Stocks" />
						</div>
						<aside className="contain sm:uncontain flex flex-col space-y-7 lg:space-y-10 py-6">
							<Sidebar1 />
							<NewsWidget
								title="Press Releases"
								news={other}
								button={{
									text: 'All Press Releases',
									url: '/news/press-releases/',
								}}
							/>
							<Sidebar2 />
						</aside>
					</div>
				</main>
			</div>
		</>
	)
}

export default AllStockNews

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const { data, other } = await getMarketNews('stocks')

	res.setHeader(
		'Cache-Control',
		'no-cache, no-store, max-age=0, must-revalidate'
	)

	return {
		props: {
			data,
			other,
		},
	}
}
