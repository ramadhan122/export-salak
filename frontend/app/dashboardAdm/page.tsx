"use client";

import { useEffect, useState } from "react";
import { Package, Users, BarChart3 } from "lucide-react";
import AdminLayout from "./layouts"; // pastikan path sesuai

export default function DashboardPage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username") || "";
    setUsername(user);
  }, []);

  return (
    <AdminLayout>
      {/* Content */}
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <span className="text-gray-600">
            Selamat datang, <b>{username}</b> 👋
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Produk</p>
              <h3 className="text-xl font-bold">128</h3>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pengguna Terdaftar</p>
              <h3 className="text-xl font-bold">54</h3>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Ekspor Bulan Ini</p>
              <h3 className="text-xl font-bold">23</h3>
            </div>
          </div>
        </div>
    </AdminLayout>
  );
}
