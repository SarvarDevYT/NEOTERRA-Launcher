import fs from "fs";
import path from "path";
import { execSync, spawn } from "child_process";

// 1. Get token
const cred = execSync("git credential fill", {
  input: "protocol=https\nhost=github.com\n",
  encoding: "utf-8"
});
const token = cred.match(/password=(.+)/)[1].trim();

const releaseId = 427685537;
const owner = "SarvarDevYT";
const repo = "NEOTERRA-Launcher";

function uploadWithCurl(fileName, filePath) {
  return new Promise((resolve, reject) => {
    console.log(`Uploading '${fileName}' via curl.exe...`);
    const url = `https://uploads.github.com/repos/${owner}/${repo}/releases/${releaseId}/assets?name=${encodeURIComponent(fileName)}`;
    const proc = spawn("curl.exe", [
      "-s",
      "-X", "POST",
      "-H", `Authorization: Bearer ${token}`,
      "-H", "Content-Type: application/octet-stream",
      "-H", "User-Agent: NeoTerra-Release",
      "--data-binary", `@${filePath}`,
      url
    ]);

    let out = "";
    proc.stdout.on("data", (d) => { out += d.toString(); });
    proc.stderr.on("data", (d) => { out += d.toString(); });

    proc.on("close", (code) => {
      if (code === 0) {
        try {
          const json = JSON.parse(out);
          if (json.browser_download_url) {
            console.log(`SUCCESS: ${fileName} uploaded -> ${json.browser_download_url}`);
            resolve(json);
            return;
          }
          console.error(`Upload error response for ${fileName}:`, out);
          reject(new Error(out));
        } catch (e) {
          console.error(`Parse error for ${fileName}:`, out);
          reject(e);
        }
      } else {
        reject(new Error(`curl exited with code ${code}`));
      }
    });
  });
}

async function main() {
  // First upload latest.yml
  await uploadWithCurl("latest.yml", path.resolve("dist/latest.yml"));
  // Next upload NeoTerraLauncher-Setup.exe
  await uploadWithCurl("NeoTerraLauncher-Setup.exe", path.resolve("NeoTerraLauncher-Setup.exe"));
  // Next upload NeoTerra Launcher Setup 1.6.0.exe
  await uploadWithCurl("NeoTerra Launcher Setup 1.6.0.exe", path.resolve("dist/NeoTerra Launcher Setup 1.6.0.exe"));

  console.log("ALL FILES UPLOADED SUCCESSFULLY!");
}

main().catch(console.error);
