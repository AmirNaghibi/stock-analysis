import { MailIcon } from '@heroicons/react/solid';

export const NewsletterWidget = () => {
	return (
		<div className="bg-gray-100 overflow-hidden rounded-lg p-6 text-center">
			<h4 className="text-2xl font-bold mb-4">
				The Stock Analysis Newsletter
			</h4>
			<p className="text-xl mb-5">Get the latest updates in your inbox.</p>
			<label htmlFor="email" className="sr-only">
				Email
			</label>
			<div className="mt-1 relative rounded-md shadow-sm mb-3">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</div>
				<input
					type="email"
					name="email"
					id="email"
					className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-base border-gray-300 rounded-md"
					placeholder="Enter your email"
				/>
			</div>

			<button
				type="button"
				className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-xl font-semibold rounded-md shadow-sm text-white bg-blue-brand hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
				Subscribe Now
			</button>
		</div>
	);
};