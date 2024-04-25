const fs = require("fs");
const path = require("path");

function checkJavaScriptFiles(directory) {
  let files = [];
  try {
    files = fs.readdirSync(directory);
  } catch (error) {
    console.error(`Failed to read directory ${directory}: ${error.message}`);
    return; // Stop processing this directory
  }

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    let stats;
    try {
      stats = fs.statSync(filePath);
    } catch (error) {
      console.error(
        `Failed to read file stats for ${filePath}: ${error.message}`
      );
      return; // Skip this file
    }

    if (stats.isDirectory()) {
      checkJavaScriptFiles(filePath);
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
      console.log(`Checking file: ${filePath}`);
      // Optional: Read and check file content
      checkFileContent(filePath);
    }
  });
}

function checkFileContent(filePath) {
  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`Failed to read file ${filePath}: ${error.message}`);
    return; // Skip this file
  }

  // Example: Check if file uses 'eval', which is often discouraged
  if (content.includes("eval")) {
    console.warn(`Warning: Usage of 'eval' found in ${filePath}`);
  }
}

// Start checking JavaScript files from the current directory or a specified start directory
const startDirectory = process.argv[2] || ".";
checkJavaScriptFiles(startDirectory);
