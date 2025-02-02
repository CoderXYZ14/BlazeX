import dotenv from "dotenv";
import { app } from "../src/app";

dotenv.config();

// Only listen to port if running directly (not on Vercel)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export app for Vercel
export default app;
