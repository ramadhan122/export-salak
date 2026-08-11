"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = params.token;

        const res = await fetch(
          `http://localhost:5000/api/email-verification/${token}`
        );

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setMessage(data.message || "Verifikasi email gagal");
          return;
        }

        setStatus("success");
        setMessage(data.message);

        setTimeout(() => {
          router.push("/profile");
        }, 3000);
      } catch (error) {
        console.error(error);

        setStatus("error");
        setMessage("Terjadi kesalahan saat verifikasi email");
      }
    };

    if (params.token) {
      verifyEmail();
    }
  }, [params.token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-3xl shadow-sm border p-10 max-w-md w-full text-center">

        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-green-600 mx-auto animate-spin" />

            <h1 className="text-2xl font-bold mt-5">
              Memverifikasi Email
            </h1>

            <p className="text-gray-500 mt-2">
              Mohon tunggu sebentar...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />

            <h1 className="text-2xl font-bold mt-5">
              Email Berhasil Diverifikasi
            </h1>

            <p className="text-gray-500 mt-2">
              {message}
            </p>

            <p className="text-sm text-gray-400 mt-5">
              Anda akan diarahkan ke halaman profil...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />

            <h1 className="text-2xl font-bold mt-5">
              Verifikasi Gagal
            </h1>

            <p className="text-gray-500 mt-2">
              {message}
            </p>

            <button
              onClick={() => router.push("/profile")}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
            >
              Kembali ke Profil
            </button>
          </>
        )}

      </div>
    </div>
  );
}