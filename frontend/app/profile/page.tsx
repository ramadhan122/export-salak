"use client";

import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
  Save,
  Package,
  Truck,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingVerification, setSendingVerification] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setUsername(data.username || "");
        setFullName(data.full_name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setCountry(data.country || "");
        setAddress(data.address || "");
        setEmailVerified(data.email_verified || false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          country,
          address,
        }),
      });

      const data = await res.json();
      if (data.user) {
          setFullName(data.user.full_name || "");
          setEmail(data.user.email || "");
          setPhone(data.user.phone || "");
          setCountry(data.user.country || "");
          setAddress(data.user.address || "");
      }

      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan profil");
    }
  };

  // TAMBAHKAN DI SINI
  const handleSendVerification = async () => {
    try {
      setSendingVerification(true);

      const token = localStorage.getItem("authToken");

      const res = await fetch(
        "http://localhost:5000/api/email-verification/send",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Gagal mengirim email verifikasi");
        return;
      }

      alert(
        "Email verifikasi berhasil dikirim. Silakan cek inbox email Anda."
      );
    } catch (error) {
      console.error(error);
      alert("Gagal mengirim email verifikasi");
    } finally {
      setSendingVerification(false);
    }
  };

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
              {fullName || username}
            </h1>

            <p className="text-gray-500">
              @{username}
            </p>

          </div>

          {/* Form */}

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>
              <label className="font-semibold">
                Username
              </label>

              <input
                value={username}
                disabled
                className="mt-2 w-full rounded-xl border bg-gray-100 p-3 text-gray-500 cursor-not-allowed"
              />

              <p className="text-sm text-gray-400 mt-1">
                Username digunakan untuk login dan tidak dapat diubah.
              </p>
            </div>

            <div>
              <label className="font-semibold">
                Nama Lengkap
              </label>

              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2">
                Email

                {emailVerified && (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <BadgeCheck className="w-5 h-5" />
                    Terverifikasi
                  </span>
                )}
              </label>

              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  disabled={emailVerified}
                  className={`pl-11 w-full border rounded-xl p-3 ${
                    emailVerified
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                />
              </div>

              {!emailVerified && (
                <button
                  type="button"
                  onClick={handleSendVerification}
                  disabled={sendingVerification}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50"
                >
                  {sendingVerification
                    ? "Mengirim..."
                    : "Kirim email verifikasi"}
                </button>
              )}
            </div>
            <div>
              <label className="font-semibold">
                Nomor Telepon
              </label>

              <div className="relative mt-2">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="pl-11 w-full border rounded-xl p-3"
                >
                    <option value="">Pilih Negara</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Thailand">Thailand</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">
                Alamat
              </label>

              <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={4}
                  className="mt-2 w-full border rounded-xl p-3"
                  placeholder="Masukkan alamat lengkap..."
              />
            </div>

          </div>
          
          <button
            onClick={handleSave}
            className="mt-8 bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 flex items-center gap-2 font-semibold transition"
          >
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