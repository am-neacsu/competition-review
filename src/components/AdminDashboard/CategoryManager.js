import React, { useState } from 'react';

export default function CategoryManager({ categories, setCategories }) {
  const [newCategory, setNewCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setCategories([...categories, trimmed]);
    setNewCategory('');
  };

  const handleDeleteCategory = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };

  const handleEditCategory = (index) => {
    setEditingIndex(index);
    setEditingValue(categories[index]);
  };

  const handleSaveEdit = () => {
    const trimmed = editingValue.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    const updated = categories.map((cat, i) =>
      i === editingIndex ? trimmed : cat
    );
    setCategories(updated);
    setEditingIndex(null);
    setEditingValue('');
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Review Categories</h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {categories.map((cat, index) => (
          <li key={index} className="flex items-center justify-between border p-2 rounded">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="p-1 border rounded w-full mr-2"
                />
                <button
                  onClick={handleSaveEdit}
                  className="text-green-600 hover:text-green-800 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingIndex(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{cat}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCategory(index)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
