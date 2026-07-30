"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart, Leaf } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
  description?: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Produk tidak ditemukan</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-white rounded-2xl overflow-hidden border">
          {product.image ? (
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-80">
              <Leaf className="w-20 h-20 text-green-400" />
            </div>
          )}
        </div>

        {/* DETAIL */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-gray-600 mb-6">
            {product.description || "Buah salak kualitas ekspor, fresh langsung dari petani Indonesia."}
          </p>

          <p className="text-2xl font-bold text-green-600 mb-6">
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>

            <span className="text-lg font-semibold">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          {/* TOTAL */}
          <p className="mb-6 text-gray-700">
            Total:{" "}
            <span className="font-bold text-green-600">
              Rp {(product.price * qty).toLocaleString("id-ID")}
            </span>
          </p>

          {/* BUTTON */}
          <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
            <ShoppingCart className="w-5 h-5" />
            Tambah ke Keranjang
          </button>
        </div>

      </div>
    </div>
  );
}