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

export const AllPressReleases = ({ data, other }: Props) => {
	return (
		<>
			<SEO
				title="Press Releases From Publicly Traded Companies"
				description="Press releases for publicly traded companies on the US stock market. Includes important company events, earnings releases and more."
				canonical="/news/press-releases/"
			/>
			<div className="">
				<main className="w-full py-5 xs:py-6">
					<div className="contain">
						<Breadcrumbs url="/news/press-releases/" />
						<h1 className="hh1">Press Releases</h1>
						<NewsNavigation />
					</div>

					<div className="sm:contain lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-1 sm:pt-0 sm:pb-3">
							<NewsFeed data={data} related="Stocks" />
						</div>
						<aside className="contain sm:uncontain flex flex-col space-y-7 lg:space-y-10 py-6">
							<Sidebar1 />
							<NewsWidget
								title="Stock News"
								news={other}
								button={{
									text: 'All Stock News',
									url: '/news/all-stocks/',
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

export default AllPressReleases

export const getServerSideProps: GetServerSideProps = async () => {
	const { data, other } = await getMarketNews('stocks')

	return {
		props: {
			data,
			other,
		},
	}
}
