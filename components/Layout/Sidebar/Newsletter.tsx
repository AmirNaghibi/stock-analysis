import { MailIcon } from 'components/Icons/Mail'
import Link from 'next/link'

export const NewsletterWidget = () => {
	return (
		<div className="border border-gray-200 bg-gray-50 rounded p-6 pb-8 lg:px-7 text-center">
			<h3 className="text-[1.4rem] font-bold mb-4">
				The Stock Analysis Newsletter
			</h3>
			<p className="text-lg mb-5">Get the latest updates in your inbox.</p>
			<form
				method="post"
				acceptCharset="UTF-8"
				action="https://www.aweber.com/scripts/addlead.pl"
			>
				<div className="mt-1 relative rounded-md shadow-sm mb-3">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<MailIcon classes="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="hidden"
						name="meta_web_form_id"
						value="1291541875"
					/>
					<input type="hidden" name="listname" value="awlist5254312" />
					<input
						type="hidden"
						name="redirect"
						value="https://stockanalysis.com/subscribe/thank-you/"
						id="redirect_1c682bd70a6bff87ede4346cfeb23687"
					/>
					<input type="hidden" name="meta_adtracking" value="Sidebar" />
					<label htmlFor="email-sidebar" className="sr-only">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email-sidebar"
						autoComplete="email"
						className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-base border-gray-300 rounded-md"
						placeholder="Enter your email"
					/>
				</div>

				<input
					name="submit"
					type="submit"
					value="Subscribe Now"
					className="w-full inline-flex justify-center items-center px-6 py-2 border border-transparent text-lg font-semibold rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
				/>
				<div className="text-sm mt-1.5">
					Read the{' '}
					<Link href="/privacy-policy/">
						<a className="bll">privacy policy.</a>
					</Link>
				</div>
			</form>
		</div>
	)
}
