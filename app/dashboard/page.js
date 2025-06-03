// app/dashboard/page.js
"use client";

import React, { useEffect, useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import CardRecord from "../components/molecules/CardRecord";
import RecentActivity from "../components/molecules/RecentActivity";
import DocumentStatusChart from "../components/molecules/DocumentStatusChart";
import ProtectedRoute from "../components/ProtectedRoute";


const Dashboard = () => {
  const { currentUser, loading } = useCurrentUser();
  const [stats, setStats] = useState([]);
  const [recentRecords, setRecentRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await fetch("/api/records/stats");
        if (!statsRes.ok) {
          throw new Error("Failed to fetch stats");
        }
        const statsData = await statsRes.json();
        setStats(statsData);
      } catch (error) {
        console.error("Fetch error:", error);
        setStats([]);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="flex flex-col w-full p-6 space-y-8">
        <h1 className="text-3xl font-bold text-dark">Dashboard Overview</h1>

        {/* Welcome Message */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            Selamat datang, {currentUser?.username || "User"}!
          </h2>
          <p className="text-gray-600">
            Di sini Anda dapat melihat statistik dan aktivitas terbaru.
          </p>
        </div>

        {/* Stats Cards */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-dark">
            Statistik Arsip
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat) => (
              <CardRecord
                key={stat.documentType}
                documentType={stat.documentType}
                count={stat.count}
                latestDate={stat.latestDate}
              />
            ))}
          </div>
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
            <DocumentStatusChart stats={stats} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <RecentActivity records={recentRecords} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
