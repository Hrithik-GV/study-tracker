import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AddSubject from "./components/AddSubject";
import Login from "./components/login";
import Signup from "./components/signup";
import LandingPage from "./components/LandingPage";
import {
  Routes,
  Route,
  Navigate,
  NavLink,
  useNavigate,
} from "react-router-dom";

function AppShell({
  children,
  onNavigateToDashboard,
  onNavigateToAddSubject,
  onLogout,
}) {
  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={onNavigateToDashboard}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
              📚
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Study Tracker
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                MongoDB Connected Dashboard
              </p>
            </div>
          </div>

          <nav className="flex items-center space-x-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              Dashboard
            </NavLink>
            <button
              type="button"
              onClick={onNavigateToAddSubject}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all"
            >
              + Add Subject
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all"
            >
              Log Out
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        Study Tracker • Full-stack React & Node.js/MongoDB Application
      </footer>
    </>
  );
}

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const handleSubjectAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
    navigate("/dashboard");
  };

  const handleAuthSuccess = (authData) => {
    setUser(authData.user || authData);
    setIsLogged(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            isLogged ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login
                onLoginSuccess={handleAuthSuccess}
                onSwitchToSignup={() => navigate("/signup")}
              />
            )
          }
        />

        <Route
          path="/signup"
          element={
            isLogged ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signup
                onSignupSuccess={handleAuthSuccess}
                onSwitchToLogin={() => navigate("/login")}
              />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            isLogged ? (
              <AppShell
                onNavigateToDashboard={() => navigate("/dashboard")}
                onNavigateToAddSubject={() => navigate("/add-subject")}
                onLogout={handleLogout}
              >
                <Dashboard
                  onOpenAddModal={() => navigate("/add-subject")}
                  refreshTrigger={refreshTrigger}
                />
              </AppShell>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/add-subject"
          element={
            isLogged ? (
              <AppShell
                onNavigateToDashboard={() => navigate("/dashboard")}
                onNavigateToAddSubject={() => navigate("/add-subject")}
                onLogout={handleLogout}
              >
                <div className="max-w-2xl mx-auto">
                  <div className="mb-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => navigate("/dashboard")}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                    >
                      <span>← Back to Dashboard</span>
                    </button>
                  </div>
                  <AddSubject onAddSubject={handleSubjectAdded} />
                </div>
              </AppShell>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
