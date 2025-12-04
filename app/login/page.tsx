"use client";

import { useState } from "react";
import axios from "axios";
import { AlertCircle, CheckCircle, Lock, Mail, Loader } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    
    if (!username || !password) {
      setMessage("Username dan password harus diisi");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      
      setMessageType("success");
      setMessage("Login berhasil! Mengalihkan...");
      
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("username", username);
      
      setTimeout(() => {
        if (res.data.user.role === "admin") {
          window.location.href = "/dashboardAdm"; // admin dashboard
        } else {
          window.location.href = "/"; // user biasa ke landing page
        }
      }, 1500);

    } catch (err: any) {
      setMessageType("error");
      const errorMsg = err.response?.data?.error || "Login gagal. Silahkan coba lagi.";
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
            <svg
              className="w-8 h-8 text-orange-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Fruit Export</h1>
          <p className="text-gray-600 text-sm">Sistem Manajemen Ekspor Buah Tropis</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-4">
            <h2 className="text-white font-semibold text-lg">Masuk ke Akun Anda</h2>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-5">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-700">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-orange-500" />
                <span className="ml-2">Ingat saya</span>
              </label>
              <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                Lupa password?
              </a>
            </div>

            {/* Alert Messages */}
            {message && (
              <div
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  messageType === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {messageType === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
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

            {/* Login Button */}
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
                "Masuk"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Belum punya akun?{" "}
              <a href="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                Daftar di sini
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