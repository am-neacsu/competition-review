import React from 'react';

export default function ReportView({ competitors, reviews, onBack, onLogout }) {
  const getScoresFor = (competitorId) =>
    reviews.filter((r) => r.competitorId === competitorId);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Competition Report</h2>

      {competitors.map((competitor) => {
        const competitorReviews = getScoresFor(competitor.id);
        const allCategories = [...new Set(competitorReviews.flatMap(r => Object.keys(r).filter(k => k !== 'competitorId' && k !== 'judgeId' && k !== 'judgeName' && k !== 'comments' && k !== 'id' && k !== 'lastUpdated' && k !== 'totalScore')))].sort();

        const categoryAverages = allCategories.map(category => {
          const scores = competitorReviews.map(r => r[category] || 0);
          const avg = scores.reduce((sum, s) => sum + s, 0) / (scores.length || 1);
          return { category, avg: avg.toFixed(1) };
        });

        const totalAvg = (
          competitorReviews.reduce((sum, r) => sum + (r.totalScore || 0), 0) /
          (competitorReviews.length || 1)
        ).toFixed(1);

        return (
          <div key={competitor.id} className="mb-8 border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">{competitor.name}</h3>
            <p className="mb-2 text-sm text-gray-600">
              Total Reviews: {competitorReviews.length} | Average Score: {totalAvg}
            </p>
            <ul className="mb-4">
              {categoryAverages.map(({ category, avg }) => (
                <li key={category} className="text-gray-700">
                  <strong>{category}:</strong> {avg}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-1">Comments:</h4>
              {competitorReviews.map((r, index) => (
                <div key={index} className="mb-2">
                  <p className="text-sm text-gray-600">
                    <strong>{r.judgeName || 'Judge'}:</strong> {r.comments || 'No comment'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => {
            let csvContent = 'Competitor,Judge,Total Score,Comments\n';
            competitors.forEach((competitor) => {
              const competitorReviews = reviews.filter(r => r.competitorId === competitor.id);
              competitorReviews.forEach(r => {
                const comment = (r.comments || '').replace(/\n/g, ' ').replace(/"/g, '""');
                const line = `"${competitor.name}","${r.judgeName || 'Judge'}","${r.totalScore || 0}","${comment}"`;
                csvContent += line + '\n';
              });
            });
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'report.csv';
            a.click();
            URL.revokeObjectURL(a.href);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export Report
        </button>
        <button
          onClick={onBack}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back
        </button>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
