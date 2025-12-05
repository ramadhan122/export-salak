"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { BarChart3, Package, Users, LogOut, Menu, X } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">

      {/* MOBILE TOPBAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex items-center justify-between z-50">
        <h1 className="text-lg font-bold text-orange-600">Fruit Export Admin</h1>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* SIDEBAR OVERLAY (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between lg:justify-start">
          <h1 className="text-xl font-bold text-orange-600">Fruit Export Admin</h1>

          {/* Close Button Mobile */}
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-1 p-4">
          <Link
            href="/dashboardAdm"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <BarChart3 className="w-5 h-5" /> Dashboard
          </Link>

          <Link
            href="/dashboardAdm/products"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <Package className="w-5 h-5" /> Products
          </Link>

          <Link
            href="/dashboardAdm/categories"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <Users className="w-5 h-5" /> Categories
          </Link>
        </div>

        {/* Logout */}
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

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64 p-6 pt-20 lg:pt-6 w-full">
        {children}
      </main>
    </div>
  );
}
