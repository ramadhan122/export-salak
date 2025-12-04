"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Leaf, Menu, X, ArrowRight, MapPin, Star, LogOut } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ==========================
  //  AUTH CHECK (username)
  // ==========================
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) setUser(savedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUser(null);
    window.location.reload();
  };

  // ==========================
  //  FETCH PRODUCTS
  // ==========================
  useEffect(() => {
    fetch("http://localhost:5000/api/products?highlight=1")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal mengambil data produk");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600" />
              <span className="font-bold text-lg text-green-900">Salak Express</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#produk" className="text-gray-700 hover:text-green-600 transition">Produk</a>
              <a href="#tentang" className="text-gray-700 hover:text-green-600 transition">Tentang</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <>
                  <a href="/login">
                    <button className="px-4 py-2 text-green-600 font-semibold hover:text-green-700 transition">
                      Login
                    </button>
                  </a>
                  <a href="/register">
                    <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105">
                      Register
                    </button>
                  </a>
                </>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 border border-green-600 rounded-lg font-semibold text-green-700 hover:bg-green-50 transition"
                >
                  <LogOut className="w-5 h-5" /> Keluar
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 pt-2 border-t border-green-100">
              <a href="#produk" className="block px-4 py-2 text-gray-700 hover:text-green-600 transition">Produk</a>
              <a href="#tentang" className="block px-4 py-2 text-gray-700 hover:text-green-600 transition">Tentang</a>

              <div className="flex flex-col gap-2 mt-4 px-4">
                {!user ? (
                  <>
                    <a href="/login">
                      <button className="w-full px-4 py-2 text-green-600 font-semibold border border-green-600 rounded-lg">
                        Login
                      </button>
                    </a>
                    <a href="/register">
                      <button className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg">
                        Register
                      </button>
                    </a>
                  </>
                ) : (
                  <button 
                    className="w-full px-4 py-2 text-green-600 font-semibold border border-green-600 rounded-lg"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5 inline" /> Keluar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-green-100 rounded-full mb-4">
                <span className="text-green-700 font-semibold text-sm">🌴 Produk Premium</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Ekspor <span className="text-green-600">Salak</span> & Buah Tropis Indonesia
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Kami menyediakan salak kualitas ekspor untuk pasar internasional dengan jaminan kesegaran dan kualitas terbaik.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#produk">
                  <button className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105 w-full sm:w-auto">
                    Lihat Produk
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </a>
                <a href="/register">
                  <button className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition-all w-full sm:w-auto">
                    Mulai Pesan
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-12">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <span className="text-gray-700 font-semibold">Kualitas Terjamin</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700 font-semibold">Ekspor Global</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative h-96 bg-gradient-to-br from-green-400/20 to-yellow-400/20 rounded-3xl border-2 border-green-200 overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/21/9a/06/219a065aa9f85d1cc579e3f3e4bc5140.jpg"
                  alt="Salak Fresh Premium"
                  className="absolute inset-0 w-full h-full object-cover opacity-100"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produk" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Produk Unggulan</h2>
          <p className="text-xl text-gray-600">Pilihan terbaik buah-buahan tropis berkualitas ekspor</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg mb-8">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-green-300 transition-all duration-300 transform hover:scale-105"
                style={{animation: `slideUp 0.5s ease-out ${index * 100}ms both`}}
              >
                <div className="h-48 bg-gradient-to-br from-green-400/30 to-yellow-400/30 relative overflow-hidden flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <Leaf className="w-20 h-20 text-green-600/30 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Produk pilihan dengan kualitas terjamin untuk ekspor internasional
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                    <button className="p-2 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-all">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Belum ada produk unggulan</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section id="tentang" className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Mulai Ekspor?</h2>
          <p className="text-lg text-green-100 mb-8">Daftar sekarang dan nikmati pengalaman ekspor buah-buahan tropis yang mudah dan profesional</p>
          <a href="/register">
            <button className="px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-all hover:scale-105">
              Buat Akun Sekarang
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Salak Express. All rights reserved.</p>
          <p className="text-sm mt-2">Ekspor Berkualitas, Layanan Profesional</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
