import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/api.routes";
const app = express();

const corsOrigin =
  process.env.CORS_ORIGIN?.trim() || "https://blaze-x.vercel.app";

// Configure CORS with more detailed options
app.use(
  cors({
    origin: function (origin, callback) {
      // Remove trailing slash for comparison
      const normalizedOrigin = origin?.replace(/\/$/, "");
      const normalizedAllowedOrigin = corsOrigin.replace(/\/$/, "");

      if (!origin || normalizedOrigin === normalizedAllowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS explicitly
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400, // Cache preflight request results for 24 hours
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
export { app };
