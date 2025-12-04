"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Leaf } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Semua Produk
        </h1>

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
                    Produk berkualitas ekspor langsung dari petani terbaik.
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
            <p className="text-gray-600 text-lg">Tidak ada produk tersedia</p>
          </div>
        )}
      </div>

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
