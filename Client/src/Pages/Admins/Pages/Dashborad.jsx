import React from 'react';
import Graph from "../components/Graph";
// import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="min-h-screen lg:ml-60 mt-14 bg-gray-100 w-full p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Card for Albums */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Albums</h2>
          <p className="text-gray-600">Manage your music albums.</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">30</span>
            <button className="bg-[#3F4D66] text-white rounded px-3 py-1">View</button>
          </div>
        </div>

        {/* Card for Users */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600">Manage registered users.</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">120</span>
            <button className="bg-[#3F4D66] text-white rounded px-3 py-1">View</button>
          </div>
        </div>

        {/* Card for Songs */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Songs</h2>
          <p className="text-gray-600">Manage your music tracks.</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">450</span>
            <button className="bg-[#3F4D66] text-white rounded px-3 py-1">View</button>
          </div>
        </div>

        {/* Card for Playlists */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Playlists</h2>
          <p className="text-gray-600">Manage user playlists.</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">15</span>
            <button className="bg-[#3F4D66] text-white rounded px-3 py-1">View</button>
          </div>
        </div>
      </div>

      {/* Card for the Graph */}
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow mt-6">
        <h2 className="text-xl font-semibold mb-2">Dashboard Summary</h2>
        <div className="">
          <div className="">
            <Graph />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow mt-6">
        <h2 className="text-xl font-semibold mb-2">Dashboard Summary</h2>
        <div className="">
          <div className="">
            <Graph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
