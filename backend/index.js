import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors);

app.get("/", (req, res) => res.send("hello from back end"));

app.listen(PORT, () =>
  console.log(`server listening on http://localhost:${PORT}`)
);
