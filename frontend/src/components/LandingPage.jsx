import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Study Tracker</h1>
        <nav className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 inline-block"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-800 px-4 py-1 rounded hover:bg-blue-700 text-white inline-block"
          >
            Sign up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-center flex-grow px-8 py-12">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-4xl font-bold text-blue-800">
            Track Your Study Progress Easily
          </h2>
          <p className="text-gray-700 text-lg">
            Organize your learning, track your hours, and achieve your goals.
          </p>
          <Link
            to="/signup"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 inline-block"
          >
            Get Started
          </Link>
          <p className="text-gray-500 text-sm">Login or Register to begin</p>
        </div>

        {/* Illustration placeholder */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2920/2920342.png"
            alt="Study illustration"
            className="w-80 h-auto"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-10 px-8 grid md:grid-cols-3 gap-6 text-center">
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-semibold text-blue-700">Add Your Subjects</h3>
          <p className="text-gray-600">Manage and organize your study topics.</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-semibold text-blue-700">Log Study Sessions</h3>
          <p className="text-gray-600">Track your study time and sessions.</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-semibold text-blue-700">Monitor Your Progress</h3>
          <p className="text-gray-600">See your achievements and milestones.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-blue-800 font-semibold">
        Boost Your Productivity & Stay on Track!
      </footer>
    </div>
  );
};

export default LandingPage;
