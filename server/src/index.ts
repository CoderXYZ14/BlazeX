import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { app } from "../src/app";

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server is running at port ${PORT}`);
});
