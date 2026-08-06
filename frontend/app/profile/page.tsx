"use client";

import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Save,
  Package,
  Truck,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) setUsername(name);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm border p-10">

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-200">
              <UserRound className="w-14 h-14 text-green-700" />
            </div>

            <h1 className="text-3xl font-bold mt-5">
              {username}
            </h1>

            <p className="text-gray-500">
              Pembeli
            </p>

          </div>

          {/* Form */}

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>
              <label className="font-semibold">
                Nama Lengkap
              </label>

              <input
                defaultValue={username}
                className="mt-2 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="font-semibold">
                Email
              </label>

              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  placeholder="Email"
                  className="pl-11 w-full border rounded-xl p-3"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">
                Nomor Telepon
              </label>

              <div className="relative mt-2">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  placeholder="08xxxxxxxxxx"
                  className="pl-11 w-full border rounded-xl p-3"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">
                Negara
              </label>

              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <select className="pl-11 w-full border rounded-xl p-3">
                  <option>Indonesia</option>
                  <option>Malaysia</option>
                  <option>Singapore</option>
                  <option>Thailand</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">
                Alamat
              </label>

              <textarea
                rows={4}
                className="mt-2 w-full border rounded-xl p-3"
                placeholder="Masukkan alamat lengkap..."
              />
            </div>

          </div>

          <button className="mt-8 bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 flex items-center gap-2 font-semibold transition">
            <Save className="w-5 h-5" />
            Simpan Perubahan
          </button>

        </div>

        {/* Statistik */}

        <div className="grid md:grid-cols-3 gap-5 mt-8">

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <Package className="text-green-600 w-8 h-8 mb-4" />
            <h3 className="text-gray-500">
              Total Pesanan
            </h3>
            <p className="text-3xl font-bold">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <Truck className="text-yellow-500 w-8 h-8 mb-4" />
            <h3 className="text-gray-500">
              Diproses
            </h3>
            <p className="text-3xl font-bold">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <CheckCircle2 className="text-blue-600 w-8 h-8 mb-4" />
            <h3 className="text-gray-500">
              Selesai
            </h3>
            <p className="text-3xl font-bold">
              0
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}