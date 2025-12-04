"use client";

import { useState } from "react";
import axios from "axios";
import { User, Lock, Mail, CheckCircle, AlertCircle, Loader } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!username || !password) {
      setMessage("Username dan password harus diisi");
      setMessageType("error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });

      setMessageType("success");
      setMessage("Registrasi berhasil! Mengalihkan ke halaman login...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err: any) {
      setMessageType("error");
      const errorMsg = err.response?.data?.error || "Registrasi gagal.";
      setMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
            <User className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Daftar Akun Baru</h1>
          <p className="text-gray-600 text-sm">Buat akun untuk mulai memesan produk</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-4">
            <h2 className="text-white font-semibold text-lg">Isi Data Pendaftaran</h2>
          </div>

          <form onSubmit={handleRegister} className="p-6 space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Alert Message */}
            {message && (
              <div
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  messageType === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {messageType === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                )}
                <p
                  className={`text-sm ${
                    messageType === "success" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {message}
                </p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Sudah punya akun?{" "}
              <a href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                Masuk di sini
              </a>
            </p>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 text-center">
            🔒 Data Anda dienkripsi dan aman. Jangan bagikan password dengan siapa pun.
          </p>
        </div>
      </div>
    </div>
  );
}
