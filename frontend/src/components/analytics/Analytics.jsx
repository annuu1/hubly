import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import styles from './Analytics.module.css';
import axios from 'axios';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/analytics`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setAnalyticsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading analytics...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!analyticsData) {
    return null;
  }

  const chartData = {
    labels: Array.from({ length: 10 }, (_, i) => `Week ${i + 1}`),
    datasets: [{
      label: 'Missed Chats',
      data: analyticsData.missedChats,
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
        max: Math.max(...analyticsData.missedChats) + 5,
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
      data: [
        analyticsData.resolvedTickets.resolved,
        analyticsData.resolvedTickets.unresolved
      ],
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
            const total = analyticsData.resolvedTickets.total;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className={styles.analyticsContainer}>
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
          <div className={styles.metricValue}>{analyticsData.averageReplyTime} secs</div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionDetails}>
            <h2 className={styles.sectionTitle}>Resolved Tickets</h2>
            <p>A callback system on a website, as well as proactive invitations, helps to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.</p>
          </div>
          <div className={styles.doughnutContainer}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionDetails}>
            <h2 className={styles.sectionTitle}>Total Chats</h2>
            <p>This metric shows the total number of chats for all channels for the selected period</p>
          </div>
          <div className={styles.metricValue}>{analyticsData.totalChats} Chats</div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;