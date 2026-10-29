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

async function getExistingAssets() {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/${releaseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "NeoTerra-Release",
      Accept: "application/vnd.github.v3+json"
    }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.assets || [];
}

async function deleteAsset(assetId) {
  await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/assets/${assetId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "NeoTerra-Release",
      Accept: "application/vnd.github.v3+json"
    }
  });
}

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
  console.log("Checking existing assets on release...");
  const existingAssets = await getExistingAssets();
  
  const files = [
    { name: "latest.yml", path: path.resolve("dist/latest.yml") },
    { name: "NeoTerraLauncher-Setup.exe", path: path.resolve("NeoTerraLauncher-Setup.exe") },
    { name: "NeoTerra Launcher Setup 1.6.0.exe", path: path.resolve("dist/NeoTerra Launcher Setup 1.6.0.exe") }
  ];

  for (const item of files) {
    const existing = existingAssets.find(a => a.name === item.name || a.name === item.name.replace(/\s+/g, '.'));
    if (existing) {
      console.log(`Deleting existing ${item.name} (ID: ${existing.id})...`);
      await deleteAsset(existing.id);
    }
    await uploadWithCurl(item.name, item.path);
  }

  console.log("ALL FILES UPLOADED SUCCESSFULLY!");
}

main().catch(console.error);
