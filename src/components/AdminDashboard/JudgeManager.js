import React from 'react';

export default function JudgeManager({
  judges,
  newJudge,
  setNewJudge,
  onAddJudge,
  onDeleteJudge
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Judges</h3>

      <div className="mb-4 p-4 bg-gray-50 rounded">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          <input
            type="text"
            placeholder="New judge name"
            value={newJudge.name}
            onChange={(e) => setNewJudge({ ...newJudge, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={newJudge.password}
            onChange={(e) =>
              setNewJudge({ ...newJudge, password: e.target.value })
            }
            className="p-2 border rounded"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAdmin"
              checked={newJudge.isAdmin}
              onChange={(e) =>
                setNewJudge({ ...newJudge, isAdmin: e.target.checked })
              }
              className="mr-2"
            />
            <label htmlFor="isAdmin">Admin privileges</label>
          </div>
        </div>

        <button
          onClick={onAddJudge}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Judge
        </button>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {judges.map((judge) => (
              <tr key={judge.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {judge.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {judge.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {judge.isAdmin ? 'Admin' : 'Judge'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDeleteJudge(judge.id)}
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
