import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5252;

app.use(morgan("short"));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => console.log(`Server is on http://localhost:${PORT}`));
