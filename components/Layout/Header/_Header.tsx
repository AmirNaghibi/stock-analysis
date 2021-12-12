import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { HeaderLogo } from 'components/Layout/Header/HeaderLogo'
import { HeaderLogoFull } from 'components/Layout/Header/HeaderLogoFull'
import { HeaderSearch } from 'components/Layout/Header/HeaderSearch'
import { HeaderLogin } from 'components/Layout/Header/HeaderLogin'
import { HamburgerIcon } from 'components/Icons/Hamburger'
import { CloseIcon } from 'components/Icons/Close'
import { HeaderNavigation } from 'components/Layout/Header/HeaderNavigation'
import { HeaderAd } from 'components/Ads/Snigel/HeaderAd'

export const Header = () => {
	const noderef = useRef<HTMLDivElement>(null)
	const [open, setOpen] = useState(false)
	const [menu, setMenu] = useState('m-menu')

	function clickMenu() {
		setOpen((open) => !open)
	}

	function clickOutside(e: MouseEvent) {
		const node = noderef.current ?? null
		const doc = document.querySelector('#menu-toggle') ?? null

		if (
			(node && node.contains(e.target as Node)) ||
			(doc && doc.contains(e.target as Node))
		) {
			return
		}
		setOpen(false)
	}

	useEffect(() => {
		if (open) {
			setMenu('m-menu active')
			document.addEventListener('mousedown', clickOutside)
		} else {
			setMenu('m-menu')
			document.removeEventListener('mousedown', clickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', clickOutside)
		}
	}, [open])

	return (
		<>
			<header className="bg-white shadow-md sticky landscape:static landscape:lg:sticky top-0 z-50">
				<a href="#main" className="skip-nav">
					Skip to main content
				</a>
				<div className="mx-auto px-2 tiny:px-3 xs:px-3.5 lg:px-4 flex items-center justify-between py-2 space-x-1.5 tiny:space-x-2.5 xs:space-x-3 sm:space-x-4 lg:space-x-5 xl:space-x-8">
					<div>
						<Link href="/" prefetch={false}>
							<a className="flex" aria-label="Stock Analysis home page">
								<HeaderLogo className="h-7 w-7 xs:h-8 xs:w-8 lg:hidden" />
								<HeaderLogoFull className="hidden lg:flex lg:h-12 lg:w-28 xl:w-32" />
							</a>
						</Link>
					</div>
					<div className="flex-grow max-w-screen-md">
						<HeaderSearch />
					</div>
					<div className="lg:hidden">
						<button
							type="button"
							id="menu-toggle"
							className={`flex flex-col items-center focus:outline-none focus-visible:outline-none ${
								open && 'text-blue-800'
							}`}
							onClick={clickMenu}
						>
							{open ? (
								<CloseIcon classes="h-5 w-5 xs:h-6 xs:w-6" />
							) : (
								<HamburgerIcon classes="h-5 w-5 xs:h-6 xs:w-6" />
							)}
							<span className="text-xxs">{open ? 'Close' : 'Menu'}</span>
						</button>
					</div>
					{/* <div className="hidden lg:flex">
						<HeaderNavigation device="desktop" setOpen={setOpen} />
					</div> */}
					<div className="hidden lg:flex">
						<HeaderLogin setOpen={setOpen} />
					</div>
				</div>
				<div className="relative lg:hidden">
					<div ref={noderef} className={menu}>
						{open && (
							<>
								<HeaderNavigation device="mobile" setOpen={setOpen} />
								<HeaderLogin setOpen={setOpen} />
							</>
						)}
					</div>
				</div>
			</header>
			{/* <HeaderAd /> */}
		</>
	)
}
