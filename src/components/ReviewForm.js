import React, { useState } from 'react';

export default function ReviewForm({ competitor, existingReview, categories, onSave, onCancel }) {
  const [scores, setScores] = useState(() => {
    const initial = {};
    categories.forEach(cat => {
      initial[cat] = existingReview?.[cat] || 0;
    });
    return initial;
  });

  const [comments, setComments] = useState(existingReview?.comments || '');

  const handleScoreChange = (category, value) => {
    setScores({ ...scores, [category]: parseInt(value) });
  };

  const handleSubmit = () => {
    onSave({
      ...scores,
      comments,
      totalScore: Object.values(scores).reduce((sum, score) => sum + score, 0),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Review Form</h2>
      <h3 className="text-lg text-indigo-700 mb-4">{competitor.name}</h3>

      <div className="mb-6">
        {categories.map((category) => (
          <div key={category} className="mb-4">
            <label className="block text-gray-700 mb-1">{category}</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="10"
                value={scores[category]}
                onChange={(e) => handleScoreChange(category, e.target.value)}
                className="w-full"
              />
              <span className="text-lg font-bold w-8 text-center">{scores[category]}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Comments</label>
        <textarea
          className="w-full p-2 border rounded h-32"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Add your comments here..."
        ></textarea>
      </div>

      <div className="flex justify-between gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Save Review
        </button>
      </div>
    </div>
  );
}
