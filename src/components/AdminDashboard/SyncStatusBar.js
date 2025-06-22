import React from 'react';

export default function SyncStatusBar({ connectionStatus, onManualSync }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            connectionStatus === 'connected'
              ? 'bg-green-500'
              : connectionStatus === 'error'
              ? 'bg-red-500'
              : 'bg-yellow-500'
          }`}
        ></div>
        <span className="text-sm">
          {connectionStatus === 'connected'
            ? 'Live Updates Active'
            : connectionStatus === 'error'
            ? 'Connection Error'
            : 'Connecting...'}
        </span>
      </div>

      {connectionStatus === 'connected' && (
        <button
          onClick={onManualSync}
          className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
        >
          Force Sync
        </button>
      )}
    </div>
  );
}
