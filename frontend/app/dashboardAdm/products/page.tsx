"use client";

import AdminLayout from "../layouts";
import { useEffect, useState } from "react";
import axios from "axios";
import { X, Plus, Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  category_id: number;
  description: string;
  image: string | null;
  is_highlight: boolean;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // form fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isHighlight, setIsHighlight] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ambil kategori
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  // ambil produk
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setSlug("");
    setPrice("");
    setStock("");
    setCategoryId("");
    setDescription("");
    setImage(null);
    setIsHighlight(false);
  };

  // tambah produk
  const addProduct = async () => {
    if (!name || !slug || !price || !stock || !categoryId) {
      return alert("Lengkapi semua field wajib!");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("price", String(price));
    formData.append("stock", String(stock));
    formData.append("category_id", String(categoryId));
    formData.append("description", description);
    formData.append("is_highlight", isHighlight ? "true" : "false");
    if (image) formData.append("image", image);

    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      resetForm();
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Gagal menambah produk");
    } finally {
      setSubmitting(false);
    }
  };

  // hapus produk
  const deleteProduct = async (id: number) => {
    if (!confirm("Hapus produk ini?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus produk");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Produk</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola daftar produk</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <Plus size={18} />
            Tambah
          </button>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-md border border-gray-200">
          {loading ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              Memuat data...
            </div>
          ) : products.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              Belum ada produk
            </div>
          ) : (
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">
                      <p className="font-medium text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{p.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      Rp {p.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {p.stock}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {p.is_highlight ? (
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded text-xs font-medium">
                          Highlight
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Tambah Produk
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Produk *
                </label>
                <input
                  type="text"
                  placeholder="Nama produk"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  placeholder="produk-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Harga *
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value ? Number(e.target.value) : "")
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={stock}
                    onChange={(e) =>
                      setStock(e.target.value ? Number(e.target.value) : "")
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Deskripsi produk (opsional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gambar Produk
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {image && (
                  <p className="text-xs text-gray-600 mt-1">File: {image.name}</p>
                )}
              </div>

              {/* Highlight Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isHighlight}
                  onChange={(e) => setIsHighlight(e.target.checked)}
                  className="w-4 h-4 border border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Produk Unggulan
                </span>
              </label>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex gap-3 bg-gray-50">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={submitting}
              >
                Batal
              </button>
              <button
                onClick={addProduct}
                disabled={submitting}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md font-medium text-sm transition-colors"
              >
                {submitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}