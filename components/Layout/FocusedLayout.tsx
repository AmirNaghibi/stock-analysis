import { Header } from 'components/Layout/Header/_Header'
import { Footer } from 'components/Layout/Footer/_Footer'
import { navMenuState } from 'state/navMenuState'
import { useEffect } from 'react'

type Props = {
	children: React.ReactNode
}

/**
 * A layout that hides the left nav bar and centers the content
 * @param children The page content to display inside the layout
 * @returns
 */
export function FocusedLayout({ children }: Props) {
	const visible = navMenuState((state) => state.visible)
	const close = navMenuState((state) => state.close)

	// If visible, close the menu because it's not shown in the focused layout
	useEffect(() => {
		if (visible) close()
	}, [close, visible])

	return (
		<>
			<Header hideNav={true} />
			<main id="main">{children}</main>
			<Footer />
		</>
	)
}