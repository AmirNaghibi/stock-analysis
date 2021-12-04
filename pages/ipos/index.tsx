import { GetServerSideProps } from 'next'
import { IpoRecent, IpoUpcoming } from 'types/Ipos'
import { News } from 'types/News'
import { getIpoData } from 'functions/callBackEnd'
import { SEO } from 'components/SEO'
import { RecentTable } from 'components/IPOs/RecentTable'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { RecentNavigation } from 'components/IPOs/IPONavigation/RecentNavigation'
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs'
import { CalendarTableMin } from 'components/IPOs/CalendarTableMin'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1'
import { Sidebar2 } from 'components/Ads/Snigel/Sidebar2'

interface Props {
	data: IpoRecent[]
	news: News[]
	upcoming: IpoUpcoming[]
}

export const RecentIpos = ({ data, news, upcoming }: Props) => {
	return (
		<>
			<SEO
				title="200 Most Recent IPOs"
				description="Detailed information the last 200 IPOs (initial public offerings) on the stock market. Includes IPO prices, dates, total returns and more."
				canonical="/ipos/"
			/>
			<div className="contain">
				<main className="w-full pt-5 xs:pt-6">
					<Breadcrumbs url="/ipos/" />
					<h1 className="hh1">Recent IPOs</h1>
					<IPONavigation path="" />

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div>
							<RecentNavigation path="" />
							<RecentTable rawdata={data} />
						</div>
						<aside className="flex flex-col space-y-10 pt-6">
							<CalendarTableMin upcoming={upcoming} />
							<Sidebar1 />
							<NewsWidget
								title="IPO News"
								news={news}
								button={{
									text: 'More IPO News',
									url: '/ipos/news/',
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

export default RecentIpos

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const { data, news, upcoming } = await getIpoData('recent')

	res.setHeader(
		'Cache-Control',
		'no-cache, no-store, max-age=0, must-revalidate'
	)

	return {
		props: {
			data,
			news,
			upcoming,
		},
	}
}
