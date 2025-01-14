import { ReactNode } from 'react'
import { ActionsNavigation } from 'components/Actions/ActionsNavigation'
import { ActionsNavigationSub } from 'components/Actions/ActionsNavigationSub'
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs'
import { Sidebar } from 'components/Layout/Sidebar/_Sidebar'
import { Layout } from 'components/Layout/_Layout'

interface Props {
	title: string
	children: ReactNode
	url: string
}

export const ActionsLayout = ({ title, children, url }: Props) => {
	return (
		<>
			<Layout>
				<div className="contain py-5 xs:py-6">
					<Breadcrumbs url={url} />
					<h1 className="hh1">{title}</h1>
					<ActionsNavigation />

					<div className="lg:right-sidebar">
						<div className="py-1.5">
							<ActionsNavigationSub />
							{children}
						</div>
						<aside className="flex flex-col space-y-10 py-6">
							<Sidebar />
						</aside>
					</div>
				</div>
			</Layout>
		</>
	)
}
