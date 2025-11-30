"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { BarChart3, Package, Users, LogOut } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg fixed inset-y-0 left-0">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-orange-600">Fruit Export Admin</h1>
        </div>

        <Link
          href="/dashboardAdm"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <BarChart3 className="w-5 h-5" /> Dashboard
        </Link>

        <Link
          href="/dashboardAdm/products"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <Package className="w-5 h-5" /> Products
        </Link>

        <Link
          href="/dashboardAdm/categories"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <Users className="w-5 h-5" /> Categories
        </Link>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-50 text-red-600 font-medium"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">{children}</main>
    </div>
  );
}
