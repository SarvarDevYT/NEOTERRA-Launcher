import fs from "fs";
import path from "path";
import { execSync, spawn } from "child_process";

// 1. Get credentials from git
const cred = execSync("git credential fill", {
  input: "protocol=https\nhost=github.com\n",
  encoding: "utf-8"
});
const token = cred.match(/password=(.+)/)[1].trim();

const owner = "SarvarDevYT";
const repo = "NEOTERRA-Launcher";
const tagName = "v1.6.1";
const releaseName = "NeoTerra Launcher v1.6.1 (Fixed Bugs)";
const body = `## 🚀 NeoTerra Minecraft Launcher v1.6.1 (Fixed Bugs)

### 🛠️ Kiritilgan tuzatishlar va yangilanishlar:
- **💰 inPAY to'lov tizimi integratsiyasi**: Launcher orqali NTC hisobini to'ldirish to'liq inPAY (Click, Payme, Uzum, Uzcard/Humo) orqali avtomatlashtirildi.
- **🛒 Do'kon va Hisob balansi sinxronizatsiyasi**: Do'kondan xaridlar (PRO, kosmetika, to'plamlar) amalga oshirilganda, balans veb-sayt va launcherda real vaqtda kamayadi.
- **👥 Do'stlik tizimi**: "friends_overview" xatosi bartaraf etildi, onlayn do'stlar va so'rovlar tizimi to'liq barqarorlashtirildi.
- **🎭 3D Skinlar va Plashlar**: CustomSkinLoader sozlamalari va NeoTerra skin API'si o'yin ichida to'liq ko'rinadigan qilib sozlandi.
- **⚡ Avto-yangilanish tizimi**: 1.6.0 yuklab olish 404 xatosi tuzatildi, 1.6.1 fayllari rasmiy server va GitHub'ga joylashtirildi.`;

async function createOrGetRelease() {
  console.log(`Checking if release ${tagName} exists...`);
  const listRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "NeoTerra-Release",
      Accept: "application/vnd.github.v3+json"
    }
  });
  if (listRes.ok) {
    const list = await listRes.json();
    const found = list.find(r => r.tag_name === tagName);
    if (found) {
      console.log(`Release ${tagName} found (ID: ${found.id})`);
      return found;
    }
  }

  console.log(`Creating GitHub Release ${tagName}...`);
  const createRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "NeoTerra-Release",
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tag_name: tagName,
      target_commitish: "main",
      name: releaseName,
      body: body,
      draft: false,
      prerelease: false
    })
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed to create release: ${errText}`);
  }
  const newRelease = await createRes.json();
  console.log(`SUCCESS: Created release ${tagName} (ID: ${newRelease.id})`);
  return newRelease;
}

async function deleteExistingAsset(assetId) {
  await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/assets/${assetId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "NeoTerra-Release",
      Accept: "application/vnd.github.v3+json"
    }
  });
}

function uploadWithCurl(releaseId, fileName, filePath) {
  return new Promise((resolve, reject) => {
    console.log(`Uploading '${fileName}' via curl.exe (${fs.statSync(filePath).size} bytes)...`);
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

async function getAssets(releaseId) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/${releaseId}/assets`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "NeoTerra-Release",
      Accept: "application/vnd.github.v3+json"
    }
  });
  if (res.ok) {
    return await res.json();
  }
  return [];
}

async function main() {
  const release = await createOrGetRelease();

  const files = [
    { name: "latest.yml", path: path.resolve("dist/latest.yml") },
    { name: "NeoTerraLauncher-Setup.exe", path: path.resolve("dist/NeoTerraLauncher-Setup.exe") },
    { name: "NeoTerra.Launcher.Setup.1.6.1.exe", path: path.resolve("dist/NeoTerra Launcher Setup 1.6.1.exe") },
    { name: "NeoTerra.Launcher.Setup.1.6.1.exe.blockmap", path: path.resolve("dist/NeoTerra Launcher Setup 1.6.1.exe.blockmap") }
  ];

  for (const item of files) {
    if (!fs.existsSync(item.path)) {
      console.warn(`File not found: ${item.path}`);
      continue;
    }
    const currentAssets = await getAssets(release.id);
    const itemSize = fs.statSync(item.path).size;
    const existing = currentAssets.find(a => a.name === item.name || a.name === item.name.replace(/\s+/g, '.'));
    if (existing) {
      if (existing.size === itemSize && (item.name !== 'latest.yml')) {
        console.log(`Skipping ${item.name} — already uploaded with exact size (${itemSize} bytes)`);
        continue;
      }
      console.log(`Deleting existing ${existing.name} (ID: ${existing.id}, size: ${existing.size} vs ${itemSize})...`);
      await deleteExistingAsset(existing.id);
      await new Promise(r => setTimeout(r, 1000));
    }
    await uploadWithCurl(release.id, item.name, item.path);
  }

  console.log("=== ALL GITHUB ASSETS UPLOADED FOR v1.6.1 ===");
}

main().catch(console.error);
