import React, { useState } from 'react';
import CompetitorManager from './CompetitorManager';
import JudgeManager from './JudgeManager';
import CategoryManager from './CategoryManager';
import AssignmentManager from './AssignmentManager';

export default function AdminDashboard({
  judges,
  setJudges,
  competitors,
  categories,
  setCategories,
  onAddJudge,
  onDeleteJudge,
  onAddCompetitor,
  onDeleteCompetitor,
  onViewReport,
  onViewCompetitors,
  onExportData,
  onImportData,
  onClearData,
  onManualSync,
  connectionStatus,
  lastSync,
  onLogout,
  newJudge,
  setNewJudge,
  newCompetitor,
  setNewCompetitor
}) {
  const [activeTab, setActiveTab] = useState('competitors');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${
            connectionStatus === 'connected'
              ? 'bg-green-500'
              : connectionStatus === 'error'
              ? 'bg-red-500'
              : 'bg-yellow-500'
          }`} />
          <span className="text-sm text-gray-500">
            {connectionStatus === 'connected'
              ? 'Online'
              : connectionStatus === 'error'
              ? 'Connection Error'
              : 'Connecting...'}
          </span>
          {lastSync && (
            <span className="text-xs text-gray-400">
              Last sync: {new Date(lastSync).toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'competitors' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('competitors')}
        >
          Competitors
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'judges' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('judges')}
        >
          Judges
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'categories' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'assignments' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('assignments')}
        >
          Assignments
        </button>
      </div>

      {activeTab === 'competitors' && (
        <CompetitorManager
          competitors={competitors}
          newCompetitor={newCompetitor}
          setNewCompetitor={setNewCompetitor}
          onAddCompetitor={onAddCompetitor}
          onDeleteCompetitor={onDeleteCompetitor}
        />
      )}

      {activeTab === 'judges' && (
        <JudgeManager
          judges={judges}
          newJudge={newJudge}
          setNewJudge={setNewJudge}
          onAddJudge={onAddJudge}
          onDeleteJudge={onDeleteJudge}
        />
      )}

      {activeTab === 'categories' && (
        <CategoryManager
          categories={categories}
          setCategories={setCategories}
        />
      )}

      {activeTab === 'assignments' && (
        <AssignmentManager
          judges={judges}
          setJudges={setJudges}
          competitors={competitors}
        />
      )}

      <div className="flex flex-wrap gap-4 mt-6">
        <button onClick={onViewCompetitors} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View as Judge
        </button>
        <button onClick={onViewReport} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          View Report
        </button>
        <button onClick={onExportData} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Export Data
        </button>
        <label className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Import Data
          <input type="file" accept=".json" onChange={onImportData} className="hidden" />
        </label>
        <button onClick={onClearData} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Clear All
        </button>
        <button onClick={onLogout} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
          Logout
        </button>
      </div>
    </div>
  );
}
