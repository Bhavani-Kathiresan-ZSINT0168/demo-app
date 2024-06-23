// import express from "express";
// import bodyParser from "body-parser";
// import { User } from "./models/user.model.js";
// import cors from "cors";
// import { sequelize } from "./config.js";

// try {
//   await sequelize.authenticate();
//   await sequelize.sync();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = 4000;

// app.use(bodyParser.json());

// app.post("/api/users", async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const user = await User.create({ name, email });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

import express from "express";
import bodyParser from "body-parser";
import { User } from "./models/user.model.js";
import cors from "cors";
import { sequelize } from "./config.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

// Serve static files from the React frontend app
const frontendBuildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendBuildPath));

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Catch all other routes and return the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
