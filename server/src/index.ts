import type { Express } from "express";

import cors from "cors";
import express from "express";
import categoryRouter from "./routes/category.route.ts";

const app: Express = express();
const PORT: number = 4000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
