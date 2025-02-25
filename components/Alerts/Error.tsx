import { ErrorIcon } from 'components/Icons/Error'

interface Props {
	message: string
}

export const Error = ({ message }: Props) => (
	<div className="my-5">
		<div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
			<div className="flex flex-row items-center">
				<div className="flex-shrink-0">
					<ErrorIcon />
				</div>
				<div className="ml-3 sm:ml-4">
					<span className="text-base">{message}</span>
				</div>
			</div>
		</div>
	</div>
)
