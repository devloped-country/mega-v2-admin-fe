import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './AttendanceStats.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        label: (tooltip) => {
          return `${tooltip.formattedValue}명`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
      },
    },
    y: {
      ticks: {
        stepSize: 1,
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

function AttendanceStats({ title, labels, statsData }) {
  const data = {
    labels,
    datasets: [
      {
        data: statsData,
        borderColor: '#0c7ef7',
        pointBackgroundColor: '#0c7ef7',
        tension: 0.5,
      },
    ],
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </header>
      <div className={styles.chartWrapper}>
        <Line data={data} options={options} height='200px' />
      </div>
    </div>
  );
}

export default AttendanceStats;
