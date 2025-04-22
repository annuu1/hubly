import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import styles from './Analytics.module.css';

const Analytics = () => {
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'],
    datasets: [{
      label: 'Missed Chats',
      data: [12, 18, 15, 20, 13, 10, 14, 16, 19, 25],
      fill: false,
      borderColor: '#00D907',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#000',
      pointBorderWidth: 2,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 25,
        ticks: { stepSize: 5 },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        position: 'nearest',
        callbacks: {
          title: function(tooltipItems) {
            return 'Chats';
          },
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${value} `;
          },
        },
        xAlign: 'center',
      yAlign: 'bottom',
      },
    },
  };

    const doughnutData = {
      labels: ['Resolved', 'Unresolved'],
      datasets: [{
        data: [80, 20],
        backgroundColor: ['#00D907', '#F7F7F8'],
        hoverBackgroundColor: ['#00B300', '#FF4C4C'],
        borderRadius: 10,
        borderWidth: 0,
        cutout: '72%',
      }],
    };
  
    const doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.raw;
              return `${label}: ${value}%`;
            },
          },
        },
      },
    };

    

  return (
    <div className={styles.analyticsContainer}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.chartSection}>
          <h2 className={styles.sectionTitle}>Missed Chats</h2>
          <div className={styles.chartContainer}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionDetails}>
          <h2 className={styles.sectionTitle}>Average Reply Time</h2>
          <p>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less. Quick responses will get you more conversations, help you earn customers' trust and make more sales.</p>
          </div>
          <div className={styles.metricValue}>0 secs</div>
        </div>
        <div className={styles.section}>
        <div className={styles.sectionDetails}>
          <h2 className={styles.sectionTitle}>Resolved Tickets</h2>
          <p>A callback system on a website, as well as proactive invitations, helps to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.</p>
         </div> 
         <div className={styles.doughnutContainer} >
            <Doughnut data={doughnutData } options={doughnutOptions} />
          </div>
        </div>
        <div className={styles.section}>
        <div className={styles.sectionDetails}>
          <h2 className={styles.sectionTitle}>Total Chats</h2>
          <p>This metric shows the total number of chats for all channels for the selected period</p>
          </div>
          <div className={styles.metricValue}>122 Chats</div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;