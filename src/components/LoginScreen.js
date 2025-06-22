import React, { useState } from 'react';

export default function LoginScreen({ judges, onLogin }) {
  const [selectedJudge, setSelectedJudge] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedJudge) {
      alert("Please select a judge");
      return;
    }
    onLogin(parseInt(selectedJudge), password);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Judge Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Judge</label>
          <select 
            className="w-full p-2 border rounded"
            value={selectedJudge} 
            onChange={(e) => setSelectedJudge(e.target.value)}
          >
            <option value="">Select a judge</option>
            {judges.map(judge => (
              <option key={judge.id} value={judge.id}>{judge.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
