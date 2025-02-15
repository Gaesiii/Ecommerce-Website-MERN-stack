import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ chartData }) => {
    return (
        <Doughnut
            data={chartData}
            options={{
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                        },
                    },
                    title: {
                        display: true,
                        text: 'Product Status',
                    },
                },
            }}
        />
    );
};

export default DoughnutChart;