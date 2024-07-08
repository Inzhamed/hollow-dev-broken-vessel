require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const sshRoutes = require("./routes/sshRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
const directoryRoutes = require("./routes/directoryRoutes");
const serviceRoutes = require("./routes/serviceRoutes"); 


app.use("/ssh", sshRoutes);
app.use("/metrics", metricsRoutes);
app.use("/directories", directoryRoutes);
app.use("/services", serviceRoutes);


// Frontend
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
