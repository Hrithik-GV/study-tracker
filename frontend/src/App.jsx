import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AddSubject from "./components/AddSubject";
import Login from "./components/login";
import Signup from "./components/signup";
import LandingPage from "./components/LandingPage";
import { logoutService, getUserByIdService } from "../services/authService";
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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserSession = async () => {
      const storedUserId = localStorage.getItem("study_tracker_userId");
      if (!storedUserId) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const data = await getUserByIdService(storedUserId);
        if (data && data.user) {
          setUser(data.user);
          setIsLogged(true);
        } else {
          localStorage.removeItem("study_tracker_userId");
          setUser(null);
          setIsLogged(false);
        }
      } catch (err) {
        console.warn("Session expired or invalid:", err);
        localStorage.removeItem("study_tracker_userId");
        setUser(null);
        setIsLogged(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifyUserSession();
  }, []);

  const handleSubjectAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
    navigate("/dashboard");
  };

  const handleAuthSuccess = (authData) => {
    const userData = authData.user || authData;
    const userId = userData.id || userData._id;
    if (userId) {
      localStorage.setItem("study_tracker_userId", userId);
    }
    setUser(userData);
    setIsLogged(true);
    navigate("/dashboard");
  };

  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("study_tracker_userId");
      setUser(null);
      setIsLogged(false);
      navigate("/login");
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-semibold text-sm">Verifying session...</p>
        </div>
      </div>
    );
  }

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
                  user={user}
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
                  <AddSubject user={user} onAddSubject={handleSubjectAdded} />
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
