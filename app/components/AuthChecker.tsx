"use client";

import { useEffect } from "react";
import axios from "axios";

export default function AuthChecker() {
  const checkSession = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) return;

    try {
      await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      if (
        err.response?.status === 401 &&
        err.response?.data?.error === "SESSION_REPLACED"
      ) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");

        alert(
          "Sesi Anda telah berakhir karena akun digunakan di perangkat lain."
        );

        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    // cek sekali saat aplikasi dibuka
    checkSession();

    // cek setiap 5 detik
    const interval = setInterval(() => {
      checkSession();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}