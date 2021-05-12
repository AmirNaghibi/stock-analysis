import { useContext } from "react";
import StockContext from "@/components/Context/StockContext";
import { IconMoon, IconSun } from "@/components/Stocks/PriceIcons";

const changeColor = (change) => {
	if (change > 0) {
		return "text-green-700";
	} else if (change < 0) {
		return "text-red-600";
	} else {
		return "text-gray-800";
	}
	return;
};

// Regular price if market open or no extended price available
const Regular = ({ quote }) => {
	const color = changeColor(quote.change);

	return (
		<div>
			<span className="text-4xl font-bold">{quote.price}</span>{" "}
			<span className={`text-2xl ${color} font-semibold`}>
				{quote.change} ({quote.changePc})
			</span>
			<div className="text-sm text-gray-700 flex items-center mt-1">
				{quote.timestamp} -{" "}
				{quote.market == "open" ? <>Market open</> : <>Market closed</>}
			</div>
		</div>
	);
};

// Extended price
const Extended = ({ quote, market }) => {
	const color = changeColor(quote.change);

	return (
		<div>
			<span className="text-4xl font-bold">{quote.extP}</span>{" "}
			<span className={`text-2xl ${color} font-semibold`}>
				{quote.extC} ({quote.extCP})
			</span>
			<div className="text-sm text-gray-700 flex items-center mt-1">
				{market == "preMarket" ? <IconSun /> : <IconMoon />}
				<span className="ml-1">
					<span className="font-semibold">{quote.extS}:</span> {quote.extT}
				</span>
			</div>
		</div>
	);
};

// Closing price, if extended price is showing
const ExtendedClose = ({ quote }) => {
	const color = changeColor(quote.change);

	return (
		<div>
			<span className="text-3xl font-semibold text-gray-800">
				{quote.price}
			</span>{" "}
			<span className={`text-xl ${color}`}>
				{quote.change} ({quote.changePc})
			</span>
			<div className="text-sm text-gray-700 flex items-center mt-1">
				<span className="font-semibold mr-1">At close:</span>{" "}
				{quote.timestamp}
			</div>
		</div>
	);
};

export default function StockPrice() {
	const stock = useContext(StockContext);
	const quote = stock.quote;

	// Check if extended hours trading
	const extendedHours = quote.ext ? true : false;
	const extendedType = quote.extS == "Pre-market" ? "preMarket" : "afterHours";

	return (
		<>
			{extendedHours ? (
				<section className="mb-5 flex flex-row items-end space-x-4">
					<Extended quote={quote} market={extendedType} />
					<ExtendedClose quote={quote} />
				</section>
			) : (
				<section className="mb-5">
					<Regular quote={quote} />
				</section>
			)}
		</>
	);
}