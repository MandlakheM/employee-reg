import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import employeeRoutes from "./routes/employees.js";

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

app.use("/", employeeRoutes);

app.get("/", (req, res) => res.send("hello from back end"));
app.all("*", (req, res) => res.send("error 404 page not found"));

app.listen(PORT, () =>
  console.log(`server listening on http://localhost:${PORT}`)
);
