require('dotenv').config();

// External Modules
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

// Local Modules
const connectDB = require('./config/db');
const { studyRouter } = require('./routes/studyRouter');
const { authRouter } = require('./routes/authRouter');
const errorController = require('./controllers/errorController');

const app = express();

// Connect Database
connectDB();

// Logger Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// JSON and CORS Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Session Middleware (Configured with connect-mongo)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "session secret key",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_DB_URL,
            collectionName: "sessions"
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
            httpOnly: true
        }
    })
);

// Routes
app.use("/api/subject", studyRouter);
app.use("/api/auth", authRouter);
app.use(errorController.pageNotFound);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
