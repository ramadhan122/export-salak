"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold text-center mb-3">
          Our Products
        </h1>

        <p className="text-center text-gray-600 mb-12">
          Fresh tropical fruits directly from Indonesian farmers.
        </p>

        {products.length === 0 ? (
          <div className="text-center text-gray-500">
            No products available.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden group"
              >
                <div className="h-64 bg-gray-100 overflow-hidden">
                  {product.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Leaf className="w-16 h-16 text-green-400" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2">
                    {product.name}
                  </h2>

                  <p className="text-green-600 font-bold text-lg">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>

                  <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}