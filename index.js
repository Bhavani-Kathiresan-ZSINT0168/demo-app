import { exec } from "child_process";
import path from "path";

// Define paths
const frontendPath = path.join(__dirname, "frontend", "myapp");
const backendPath = path.join(__dirname, "backend");

// Install and run backend
exec(
  `cd ${backendPath} && npm install && npm start`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting backend: ${error.message}`);
      return;
    }
    console.log(`Backend output: ${stdout}`);
    console.error(`Backend errors: ${stderr}`);
  }
);

// Install and run frontend
exec(
  `cd ${frontendPath} && npm install && npm start`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting frontend: ${error.message}`);
      return;
    }
    console.log(`Frontend output: ${stdout}`);
    console.error(`Frontend errors: ${stderr}`);
  }
);
