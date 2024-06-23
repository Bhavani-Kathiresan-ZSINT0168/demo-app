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
    console.error(`Build stderr: ${stderr}`);
    return;
  }
  console.log(`Frontend build output: ${stdout}`);
  console.log(`Frontend build stderr: ${stderr}`);

  // Start the backend server
  exec("node index.js", { cwd: backendPath }, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting backend: ${err.message}`);
      console.error(`Backend stderr: ${stderr}`);
      return;
    }
    console.log(`Backend server output: ${stdout}`);
    console.log(`Backend server stderr: ${stderr}`);
  });
});
