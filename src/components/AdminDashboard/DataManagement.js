import React from 'react';

export default function DataManagement({
  competitors,
  judges,
  lastSync,
  onExportData,
  onImportData,
  onClearData
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Data Management</h3>

      <div className="space-y-4 mb-6">
        {/* Export */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium mb-2">Export Data</h4>
          <p className="text-sm text-gray-600 mb-3">
            Download a complete backup of all competition data to a JSON file.
          </p>
          <button
            onClick={onExportData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Export All Data
          </button>
        </div>

        {/* Import */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium mb-2">Import Data</h4>
          <p className="text-sm text-gray-600 mb-3">
            Restore data from a backup JSON file. This will replace all current data.
          </p>
          <input
            type="file"
            accept=".json"
            onChange={onImportData}
            className="mb-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        {/* Clear */}
        <div className="p-4 bg-red-50 rounded-lg">
          <h4 className="font-medium mb-2 text-red-800">Clear All Data</h4>
          <p className="text-sm text-gray-600 mb-3">
            Permanently delete all competition data. This action cannot be undone.
          </p>
          <button
            onClick={onClearData}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Clear All Data
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Current Data Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div>
            <div className="text-2xl font-bold text-indigo-600">{competitors.length}</div>
            <div className="text-sm text-gray-600">Competitors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-600">{judges.length}</div>
            <div className="text-sm text-gray-600">Judges</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-600">
              {judges.filter((j) => !j.isAdmin).length}
            </div>
            <div className="text-sm text-gray-600">Regular Judges</div>
          </div>
        </div>
        {lastSync && (
          <div className="text-center text-sm text-gray-500">
            Last synchronized: {new Date(lastSync).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}
