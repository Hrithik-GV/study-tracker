# 📚 Study Tracker

A modern, full-stack web application designed for students and self-learners to organize, track, and manage their study subjects, modules, and topics. Built with **React 19**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.

---

## ✨ Features

- **🔐 User Authentication & Session Persistence**:
  - Secure user registration and login with hashed passwords (`bcryptjs`).
  - Server-side cookie-based sessions powered by `express-session` and stored in MongoDB (`connect-mongo`).
  - Automatic session restoration across page reloads without losing login state.
  - Safe logout with session destruction and cookie clearing.

- **👤 User-Scoped Data Isolation**:
  - Each user's subjects and topics are strictly tied to their account (`userId`).
  - Built-in authorization checks prevent unauthorized viewing, editing, or deleting of other users' data.

- **📊 Interactive Dashboard**:
  - Real-time statistics: Total Subjects, Active Modules, and Topics Tracked.
  - Instant client-side search filtering by subject name or topic.
  - Subject cards displaying duration, topics list, and MongoDB sync status.

- **✏️ Complete Subject Management (CRUD)**:
  - Add new subjects with validation for duration and topics.
  - Quick inline update modal to modify subject details on the fly.
  - Safe deletion with user confirmation.

- **🎨 Modern & Responsive UI**:
  - Clean, accessible interface styled with Tailwind CSS.
  - Dynamic loading states, spinners, and informative error banners.
  - Fully responsive across desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Session Store**: `express-session` + `connect-mongo`
- **Security & Utilities**: `bcryptjs`, `cors`, `dotenv`

---

## 📁 Project Structure

```text
study-tracker/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (signup, login, logout, getUserById)
│   │   ├── errorController.js    # 404 handler
│   │   └── studyController.js   # Subject CRUD operations
│   ├── middleware/
│   │   └── isAuth.js             # Session authentication guard
│   ├── models/
│   │   ├── subject.js            # Subject Mongoose schema (linked to User)
│   │   └── user.js               # User Mongoose schema
│   ├── routes/
│   │   ├── authRouter.js         # /api/auth routes
│   │   └── studyRouter.js        # /api/subject routes
│   ├── .env                      # Backend environment variables
│   ├── app.js                    # Express app entry point & middleware
│   └── package.json
│
├── frontend/
│   ├── public/                   # Static assets
│   ├── services/
│   │   ├── authService.js        # Auth API client (fetch with credentials)
│   │   └── subjectService.js     # Subject API client
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddSubject.jsx    # Add subject form component
│   │   │   ├── Dashboard.jsx     # Main dashboard & stats component
│   │   │   ├── LandingPage.jsx   # Landing / welcome page
│   │   │   ├── login.jsx         # Sign-in form
│   │   │   └── signup.jsx        # Registration form
│   │   ├── App.jsx               # App routing, auth state & session verification
│   │   ├── main.jsx              # React DOM entry point
│   │   └── index.css             # Tailwind styling imports
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/) instance (local MongoDB server or MongoDB Atlas cluster URI)
- `npm` or `yarn`

---

### 1. Clone the Repository

```bash
git clone <repository-url>
cd study-tracker
```

---

### 2. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create or edit the `.env` file in `backend/`:
   ```env
   PORT=3001
   MONGO_DB_URL=your_mongodb_connection_string
   SESSION_SECRET=your_custom_session_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   *The server will start at `http://localhost:3001`.*

---

### 3. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will run at `http://localhost:5173`.*

---

## 🔌 API Reference

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/signup` | Register a new user and create session | No |
| `POST` | `/api/auth/login` | Log in user and establish session cookie | No |
| `POST` | `/api/auth/logout` | Destroy session and clear cookie | No |
| `GET` | `/api/auth/:userId` | Verify session & fetch user profile | **Yes** |

### Subject Routes (`/api/subject`)

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/subject/:userId` | Get all subjects belonging to user | **Yes** |
| `POST` | `/api/subject/add-subject/:userId` | Add a new subject for user | **Yes** |
| `PUT` | `/api/subject/:id/update-subject` | Update an existing subject by ID | **Yes** |
| `DELETE` | `/api/subject/:id` | Delete a subject by ID | **Yes** |

---

## 🔒 Security & Cookie Configuration

- **`httpOnly: true`**: Protects the session identifier cookie (`connect.sid`) against client-side JavaScript access and XSS exploits.
- **CORS with Credentials**: Configured with `origin: 'http://localhost:5173'` and `credentials: true` so session cookies are exchanged securely across ports.
- **Data Scoping**: Every mutation and query validates that the requester's active session user ID matches the target resource owner before performing database updates.

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).
