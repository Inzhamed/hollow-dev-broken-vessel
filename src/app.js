require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// const systemRoutes = require("./routes/systemRoutes");
// const fileRoutes = require("./routes/fileRoutes");
const sshRoutes = require("./routes/sshRoutes");
// app.use("/system", systemRoutes);
// app.use("/files", fileRoutes);
app.use("/ssh", sshRoutes);

// Frontend
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
