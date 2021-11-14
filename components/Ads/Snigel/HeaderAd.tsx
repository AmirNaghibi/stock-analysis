import { useAuth } from 'hooks/useAuth'
import { noAds } from 'components/Ads/noAds'
import { useNavState } from 'hooks/useNavState'
// import { useEffect, useState } from 'react';

export function HeaderAd() {
	const { checked, isPro } = useAuth()
	const { path } = useNavState()
	// const [show, setShow] = useState(true);
	// const [stat, setStat] = useState(false);

	// useEffect(() => {
	// 	if (window.pageYOffset === 0) {
	// 		// Show ad each time the path is changed if at the top of the page
	// 		setShow(true);
	// 		setStat(false);
	// 	}

	// 	const stickyTime = setTimeout(() => {
	// 		// Ad is sticky for 3 seconds
	// 		if (window.pageYOffset > 0 || !document.hasFocus()) {
	// 			// Only fade out if user has scrolled
	// 			setShow(false);
	// 			setTimeout(() => {
	// 				// Put ad back in original place after 500ms
	// 				setStat(true);
	// 			}, 500);
	// 		} else {
	// 			setStat(true);
	// 		}
	// 	}, 3000);

	// 	return () => {
	// 		clearTimeout(stickyTime);
	// 	};
	// }, [path]);

	if (!noAds(path.one)) {
		if (!checked || (checked && !isPro)) {
			return (
				<div
					id="ad-banner"
					// className={
					// 	show ? 'sticky-head' : stat ? '' : 'sticky-head fade-out'
					// }
				>
					<div className="bg-gray-100 pt-1 pb-1 md:pb-2 mx-auto text-center">
						<div
							className="min-h-[70px] md:min-h-[111px] md:max-w-[728px] lg:max-w-[970px] mx-auto text-center center-children overflow-x-auto"
							id="adngin-top_leaderboard-0"
						></div>
					</div>
				</div>
			)
		}
	}

	return null
}
