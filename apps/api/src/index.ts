import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send("Hello from Express API 🚀");
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
