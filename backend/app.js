const express = require('express');
const app = express();
const connectDb = require("./src/config/database");
const cookieParser = require('cookie-parser');
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Change this to your frontend URL
    credentials: true // This allows cookies to be sent
}));

// Import Routes
const authRouter = require("./src/Routers/authRouter");
const requestRoute = require("./src/Routers/requests");
const profileRoute = require("./src/Routers/profile");
const userRouter = require('./src/Routers/user');

// Use Routes
app.use("/", authRouter);
app.use("/", requestRoute);
app.use("/", profileRoute);
app.use("/", userRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// Start Server After Connecting to DB
connectDb().then(() => {
    console.log("✅ Database Connected");
    app.listen(3000, () => {
        console.log("🚀 Server running on port 3000");
    });
}).catch((err) => {
    console.error("❌ Database Connection Failed:", err);
    process.exit(1); // Exit the process if DB connection fails
});
