import React from 'react';

export default function AssignmentManager({ judges, competitors, setJudges }) {
  const handleToggleAssignment = (judgeId, competitorId) => {
    setJudges(prevJudges =>
      prevJudges.map(j =>
        j.id === judgeId
          ? {
              ...j,
              assignedCompetitorIds: j.assignedCompetitorIds?.includes(competitorId)
                ? j.assignedCompetitorIds.filter(id => id !== competitorId)
                : [...(j.assignedCompetitorIds || []), competitorId]
            }
          : j
      )
    );
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Assign Competitors to Judges</h3>
      {judges.map(judge => (
        <div key={judge.id} className="mb-4 border p-3 rounded">
          <h4 className="font-semibold mb-2">{judge.name}</h4>
          <div className="grid grid-cols-2 gap-2">
            {competitors.map(comp => (
              <label key={comp.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={judge.assignedCompetitorIds?.includes(comp.id) || false}
                  onChange={() => handleToggleAssignment(judge.id, comp.id)}
                />
                {comp.name}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
