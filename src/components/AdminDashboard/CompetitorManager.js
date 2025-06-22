import React from 'react';

export default function CompetitorManager({
  competitors,
  newCompetitor,
  setNewCompetitor,
  onAddCompetitor,
  onDeleteCompetitor
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Competitors</h3>

      <div className="mb-4 p-4 bg-gray-50 rounded">
        <div className="flex flex-col md:flex-row gap-2 mb-2">
          <input
            type="text"
            placeholder="New competitor name"
            value={newCompetitor.name}
            onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
            className="p-2 border rounded flex-grow"
          />
          <button
            onClick={onAddCompetitor}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Competitor
          </button>
        </div>
      </div>

      <div className="border rounded overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {competitors.map((competitor) => (
              <tr key={competitor.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {competitor.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {competitor.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDeleteCompetitor(competitor.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
