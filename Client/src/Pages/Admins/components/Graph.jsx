import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  // Example data for total albums, users, playlists, and songs in the system
  const systemData = [
    { name: "Albums", amount: 30 },
    { name: "Users", amount: 120 },
    { name: "Songs", amount: 450 },
    { name: "Playlists", amount: 15 },
  ];

  // Example data for user activity
  const userActivityData = [
    { name: "User 1", playlistsAdded: 5, songsListened: 20 },
    { name: "User 2", playlistsAdded: 3, songsListened: 25 },
    { name: "User 3", playlistsAdded: 2, songsListened: 15 },
    { name: "User 4", playlistsAdded: 4, songsListened: 30 },
  ];

  // Chart data for system items
  const systemChartData = {
    labels: systemData.map(item => item.name),
    datasets: [
      {
        label: 'Total Items in System',
        data: systemData.map(item => item.amount),
        backgroundColor: ['#3F4D66', '#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: ['#3F4D66', '#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  // Options for system items chart
  const systemOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Albums, Users, Songs, and Playlists',
      },
    },
  };

  // Chart data for user activity
  const userActivityChartData = {
    labels: userActivityData.map(item => item.name),
    datasets: [
      {
        label: 'Playlists Added',
        data: userActivityData.map(item => item.playlistsAdded),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Songs Listened',
        data: userActivityData.map(item => item.songsListened),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for user activity chart
  const userActivityOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Activity: Playlists Added vs Songs Listened',
      },
    },
  };

  return (
    <div className='flex flex-col md:flex-row justify-between w-full p-4'>
      <div className='flex-1 max-w-[600px] mx-auto p-2'>
        <Bar data={systemChartData} options={systemOptions} />
      </div>
      <div className='flex-1 max-w-[600px] mx-auto p-2'>
        <Bar data={userActivityChartData} options={userActivityOptions} />
      </div>
    </div>
  );
};

export default Graph;
