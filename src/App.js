import React, { useState, useEffect, useRef } from 'react';
import LoginScreen from './components/LoginScreen';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CompetitorList from './components/CompetitorList';
import ReviewForm from './components/ReviewForm';
import ReportView from './components/ReportView';

export default function CompetitionReviewApp() {
  const saveToServer = async (data) => {
    try {
      await fetch('http://localhost:4000/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setLastSync(new Date().toISOString());
      setConnectionStatus('connected');
    } catch (err) {
      console.error('Failed to save data:', err);
      setConnectionStatus('error');
    }
  };
  const [view, setView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [competitors, setCompetitors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [judges, setJudges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCompetitor, setNewCompetitor] = useState({ name: '' });
  const [newJudge, setNewJudge] = useState({ name: '', password: '', isAdmin: false });
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [lastSync, setLastSync] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:4000/load')
      .then(res => res.json())
      .then(data => {
        setCompetitors(data.competitors || []);
        setReviews(data.reviews || []);
        setJudges(data.judges && data.judges.length > 0 ? data.judges : [
          { id: 1, name: 'Admin', password: 'admin', isAdmin: true }
        ]);
        setCategories(data.categories || ['Presentation', 'Innovation', 'Execution', 'Impact']);
        setConnectionStatus('connected');
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        setConnectionStatus('error');
      });
  }, []);

  

  const handleLogin = (judgeId, password) => {
    const judge = judges.find(j => j.id === parseInt(judgeId) && j.password === password);
    if (judge) {
      setCurrentUser(judge);
      setView(judge.isAdmin ? 'adminDashboard' : 'competitorList');
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
  };

  const addJudge = () => {
    if (!newJudge.name.trim() || !newJudge.password.trim()) return;
    const newObj = { id: Date.now(), ...newJudge };
    const updatedJudges = [...judges, newObj];
    setJudges(updatedJudges);
    saveToServer({ competitors, reviews, judges: updatedJudges, categories });
    setNewJudge({ name: '', password: '', isAdmin: false });
  };

  const deleteJudge = (id) => {
    if (currentUser?.id === id) return alert("Can't delete yourself while logged in");
    const updatedJudges = judges.filter(j => j.id !== id);
    const updatedReviews = reviews.filter(r => r.judgeId !== id);
    setJudges(updatedJudges);
    setReviews(updatedReviews);
    saveToServer({ competitors, reviews: updatedReviews, judges: updatedJudges, categories });
    setReviews(reviews.filter(r => r.judgeId !== id));
  };

  const addCompetitor = () => {
    if (!newCompetitor.name.trim()) return;
    const newObj = { id: Date.now(), name: newCompetitor.name };
    const updatedCompetitors = [...competitors, newObj];
    setCompetitors(updatedCompetitors);
    saveToServer({ competitors: updatedCompetitors, reviews, judges, categories });
    setNewCompetitor({ name: '' });
  };

  const deleteCompetitor = (id) => {
    const updatedCompetitors = competitors.filter(c => c.id !== id);
    const updatedReviews = reviews.filter(r => r.competitorId !== id);
    setCompetitors(updatedCompetitors);
    setReviews(updatedReviews);
    saveToServer({ competitors: updatedCompetitors, reviews: updatedReviews, judges, categories });
  };

  const saveReview = (competitorId, reviewData) => {
    const updated = {
      ...reviewData,
      competitorId,
      judgeId: currentUser.id,
      judgeName: currentUser.name,
      id: Date.now(),
      lastUpdated: new Date().toISOString(),
    };
    setReviews((prev) => {
      const existing = prev.find(
        (r) => r.competitorId === competitorId && r.judgeId === currentUser.id
      );
      const updatedReviews = existing
        ? prev.map((r) => (r.id === existing.id ? { ...updated, id: existing.id } : r))
        : [...prev, updated];
      saveToServer({ competitors, reviews: updatedReviews, judges, categories });
      return updatedReviews;
    });
    setView('competitorList');
  };

  const exportAllData = () => {
    const dataStr = JSON.stringify({ competitors, judges, reviews, categories }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'competition-data.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importAllData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setCompetitors(data.competitors || []);
        setJudges(data.judges || []);
        setReviews(data.reviews || []);
        setCategories(data.categories || []);
        setLastSync(new Date().toISOString());
      } catch {
        alert("Invalid file");
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to delete all data?")) {
      setCompetitors([]);
      setJudges([]);
      setReviews([]);
      setCategories([]);
      saveToServer({ competitors: [], reviews: [], judges: [], categories: [] });
      setCurrentUser(null);
      setView('login');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginScreen judges={judges} onLogin={handleLogin} />;
      case 'adminDashboard':
        return (
          <AdminDashboard
            judges={judges}
            setJudges={setJudges}
            competitors={competitors}
            categories={categories}
            setCategories={setCategories}
            onAddJudge={addJudge}
            onDeleteJudge={deleteJudge}
            onAddCompetitor={addCompetitor}
            onDeleteCompetitor={deleteCompetitor}
            onViewReport={() => setView('report')}
            onViewCompetitors={() => setView('competitorList')}
            onExportData={exportAllData}
            onImportData={importAllData}
            onClearData={clearAllData}
            onManualSync={() => {}}
            connectionStatus={connectionStatus}
            lastSync={lastSync}
            onLogout={handleLogout}
            newJudge={newJudge}
            setNewJudge={setNewJudge}
            newCompetitor={newCompetitor}
            setNewCompetitor={setNewCompetitor}
          />
        );
      case 'competitorList':
        return (
          <CompetitorList
            competitors={currentUser.isAdmin
              ? competitors
              : competitors.filter(c => currentUser.assignedCompetitorIds?.includes(c.id))}
            reviews={reviews.filter((r) => r.judgeId === currentUser?.id)}
            onSelectCompetitor={(id) => setView(`review-${id}`)}
            onViewReport={() => setView('report')}
            onBack={() => currentUser?.isAdmin && setView('adminDashboard')}
            onLogout={handleLogout}
            isAdmin={currentUser?.isAdmin}
          />
        );
      case 'report':
        return (
          <ReportView
            competitors={currentUser.isAdmin
              ? competitors
              : competitors.filter(c => currentUser.assignedCompetitorIds?.includes(c.id))}
            reviews={reviews}
            onBack={() => setView(currentUser?.isAdmin ? 'adminDashboard' : 'competitorList')}
            onLogout={handleLogout}
          />
        );
      default:
        if (view.startsWith('review-')) {
          const id = parseInt(view.split('-')[1]);
          const comp = competitors.find((c) => c.id === id);
          const rev = reviews.find((r) => r.competitorId === id && r.judgeId === currentUser.id);
          return (
            <ReviewForm
              competitor={comp}
              existingReview={rev}
              categories={categories}
              onSave={(data) => saveReview(id, data)}
              onCancel={() => setView('competitorList')}
            />
          );
        }
        return <div>Unknown view</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">Competition Review System</h1>
          {currentUser && (
            <div className="flex justify-center items-center gap-4 mt-2">
              <p className="text-gray-600">Logged in as: {currentUser.name}</p>
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
          )}
        </header>

        {renderView()}
      </div>
    </div>
  );
}
