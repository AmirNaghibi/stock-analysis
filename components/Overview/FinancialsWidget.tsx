import { Button } from 'components/Button';
import { Bar, defaults } from 'react-chartjs-2';
import { Info } from 'types/Info';
import { Overview } from 'types/Overview';

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";
defaults.color = '#222222';

interface Props {
	info: Info;
	data: Overview;
}

export const FinancialsWidget = ({ info, data }: Props) => {
	if (!data || !data.financialChart) {
		return null;
	}

	const earnings: number[] = data.financialChart[2];
	const colors: string[] = [];

	earnings.map(function (item) {
		if (item < 0) {
			colors.push('#CD5C5C');
		} else {
			colors.push('#00853E');
		}
	});

	// https://stackoverflow.com/questions/42585861/chart-js-increase-spacing-between-legend-and-chart/67723827#67723827?newreg=566b25835b7d46818559b7301d5ead2f
	const padLegend = {
		id: 'padLegend',

		beforeInit: (chart: { legend: { fit: () => void; height: number } }) => {
			const originalFit = chart.legend.fit;

			chart.legend.fit = function fit() {
				originalFit.bind(chart.legend)();
				chart.legend.height += 6;
			};
		},
	};

	const colorEarnings = {
		id: 'colorEarnings',

		beforeDraw: function (chart: { legend: { legendItems: any } }) {
			if (earnings[earnings.length - 1] > 0) {
				const legends = chart.legend.legendItems;
				legends[legends.length - 1].fillStyle = '#00853E';
			} else {
				const legends = chart.legend.legendItems;
				legends[legends.length - 1].fillStyle = '#CD5C5C';
			}
		},
	};

	return (
		<div>
			<h2 className="hh2 mb-2">Financial Performance</h2>
			{data.financialIntro && (
				<p className="mb-3 text-gray-900">{data.financialIntro}</p>
			)}
			<div className="h-72 border border-gray-200 rounded-sm p-1 xs:px-2 bp:px-3">
				<Bar
					type="bar"
					data={{
						labels: data.financialChart[0],
						datasets: [
							{
								label: 'Revenue',
								backgroundColor: '#2C6288',
								data: data.financialChart[1],
								categoryPercentage: 0.8,
								barPercentage: 0.85,
							},
							{
								label: 'Earnings',
								backgroundColor: colors,
								data: data.financialChart[2],
								categoryPercentage: 0.8,
								barPercentage: 0.85,
							},
						],
					}}
					options={{
						maintainAspectRatio: false,
						scales: {
							x: {
								ticks: {
									font: {
										size: 14,
									},
								},
								grid: {
									display: false,
								},
							},
							y: {
								position: 'right',
								ticks: {
									font: {
										size: 14,
									},
									padding: 0,
									beginAtZero: true,
									callback: function (value: number) {
										const newvalue = value / 1000000;
										return newvalue
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
									},
								},
								grid: {
									drawBorder: false,
								},
							},
						},
						plugins: {
							legend: {
								labels: {
									font: {
										size: 15,
									},
									padding: 12,
									position: 'bottom',
									align: 'start',
								},
							},
							tooltip: {
								borderWidth: 1,
								titleFont: {
									size: 17,
									weight: '600',
								},
								bodyFont: {
									size: 15,
									weight: '400',
								},
								padding: {
									top: 12,
									right: 15,
									bottom: 12,
									left: 15,
								},
								displayColors: false,
							},
						},
					}}
					plugins={[padLegend, colorEarnings]}
					key={Math.random()}
				/>
			</div>
			{info.currency !== 'USD' && (
				<span className="text-small text-gray-700">
					Financial numbers in millions {info.currency}
				</span>
			)}

			<Button
				url={`/stocks/${info.symbol}/financials/`}
				text="Financial Statements"
			/>
		</div>
	);
};