import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/api.routes";

const app = express();
const corsOrigin =
  process.env.CORS_ORIGIN?.trim() || "https://blaze-x.vercel.app";

// Security headers middleware
app.use((req, res, next) => {
  // Required for SharedArrayBuffer
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

  // Additional security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      const normalizedOrigin = origin?.replace(/\/$/, "");
      const normalizedAllowedOrigin = corsOrigin.replace(/\/$/, "");

      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || normalizedOrigin === normalizedAllowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Body parser middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Add timeout handling
app.use((req, res, next) => {
  // Set timeout to 25 seconds (below Vercel's 30s limit)
  req.setTimeout(25000, () => {
    res.status(504).send("Request timeout");
  });
  next();
});

// Error handling middleware

app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
