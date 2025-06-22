import React from 'react';

export default function CompetitorList({
  competitors,
  reviews,
  onSelectCompetitor,
  onViewReport,
  onBack,
  onLogout,
  isAdmin
}) {
  // Map of reviewed competitors
  const reviewMap = reviews.reduce((map, review) => {
    map[review.competitorId] = true;
    return map;
  }, {});

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Competitors</h2>

      <div className="mb-6">
        <p className="text-gray-600 mb-2">Select a competitor to review:</p>
        <ul className="divide-y">
          {competitors.map((competitor) => (
            <li key={competitor.id} className="py-3">
              <div className="flex justify-between items-center">
                <span>{competitor.name}</span>
                <button
                  onClick={() => onSelectCompetitor(competitor.id)}
                  className={`px-4 py-1 rounded ${
                    reviewMap[competitor.id]
                      ? 'bg-green-100 text-green-800'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {reviewMap[competitor.id] ? 'Edit Review' : 'Review'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2">
        {isAdmin && (
          <button
            onClick={onBack}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Admin Dashboard
          </button>
        )}
        <button
          onClick={onViewReport}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          View Report
        </button>
        <button
          onClick={onLogout}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
