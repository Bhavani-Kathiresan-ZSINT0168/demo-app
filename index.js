import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths to frontend and backend directories
const frontendPath = path.join(__dirname, "frontend", "sampleapp");
const backendPath = path.join(__dirname, "backend");

// Build the frontend
exec("npm run build", { cwd: frontendPath }, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error building frontend: ${err.message}`);
    return;
  }
  console.log(`Frontend build output: ${stdout}`);

  // Start the backend server
  exec("node index.js", { cwd: backendPath }, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting backend: ${err.message}`);
      return;
    }
    console.log(`Backend server output: ${stdout}`);
  });
});
