import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import AddSubject from './components/AddSubject';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'addSubject'
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSubjectAdded = () => {
    // Refresh dashboard data & switch view to dashboard
    setRefreshTrigger((prev) => prev + 1);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
              📚
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Study Tracker</h1>
              <p className="text-xs text-slate-500 font-medium">MongoDB Connected Dashboard</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('addSubject')}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'addSubject'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              + Add Subject
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? (
          <Dashboard
            onOpenAddModal={() => setActiveTab('addSubject')}
            refreshTrigger={refreshTrigger}
          />
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
              >
                <span>← Back to Dashboard</span>
              </button>
            </div>
            <AddSubject onAddSubject={handleSubjectAdded} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        Study Tracker • Full-stack React & Node.js/MongoDB Application
      </footer>
    </div>
  );
}

export default App;
