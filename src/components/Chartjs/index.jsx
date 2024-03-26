import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './styles.module.scss';

Chart.register(ArcElement, Tooltip, Legend);

function Graphic({ data: chartData }) {

  const data = {
    labels: ['Proteinas', 'Gorduras', 'Carboidratos'],
    datasets: [
      {
        label: 'Calorias',
        data: chartData,
        backgroundColor: ['#36A2EB', '#f76054', '#56ff91'],
        hoverBackgroundColor: ['#467bcf', '#d9544a', '#46cf76'],
      }
    ]
  };

  const options = {
    plugins: {
      tooltip: {
        position: 'nearest',
      },
      legend: {
        position: 'top',
      },
    },
  };
  
  return (
    <div className={styles.Graphic}>
      <Doughnut data={data} options={options} />
    </div>
  );

}

export default Graphic;
