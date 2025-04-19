import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DocumentStatusChart = ({ stats }) => {
  const data = {
    labels: stats.map(stat => stat.documentType),
    datasets: [
      {
        data: stats.map(stat => stat.count),
        backgroundColor: [
          '#399A4B', // primary
          '#8DD783', // secondary
          '#3D4240', // dark
          '#6A6E6B', // pale
          '#AAB0AA', // light
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Document Distribution</h3>
      <div className="h-64">
        <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default DocumentStatusChart;