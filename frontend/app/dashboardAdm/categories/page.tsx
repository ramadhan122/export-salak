"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts"; // pastikan path benar

interface Category {
  id: number;
  name: string;
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const addCategory = async () => {
    if (!newName.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/categories", {
        name: newName,
      });
      setNewName("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">dashboard Daftar Kategori</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Nama kategori"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
        />
        <button
          onClick={addCategory}
          className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
        >
          Tambah
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((c) => (
            <li
              key={c.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              {c.name}
              <button
                onClick={() => deleteCategory(c.id)}
                className="text-red-600 hover:text-red-800"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}
