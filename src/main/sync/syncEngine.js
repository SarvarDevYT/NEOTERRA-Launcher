const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const axios = require('axios');

class SyncEngine {
  // SHA256 Hash check
  getSha256(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
  }

  // Synchronize local game directory with remote manifest
  async syncFiles(manifestUrl, gameDir, onProgress) {
    try {
      onProgress({ status: 'Manifest tekshirilmoqda...', progress: 5 });
      
      let manifest;
      try {
        const { data } = await axios.get(manifestUrl, { timeout: 5000 });
        manifest = data;
      } catch (err) {
        console.warn('Masofaviy manifest yuklanmadi, standart lokal rejim ishlatiladi.', err.message);
        // Fallback manifest if offline/CDN not yet live
        manifest = {
          gameVersion: "1.20.1",
          loader: { type: "fabric", version: "0.14.24" },
          server: { ip: "play.neoterra.uz", port: 25565 },
          files: []
        };
      }

      if (!manifest.files || manifest.files.length === 0) {
        onProgress({ status: 'O‘yin fayllari tayyor!', progress: 100 });
        return manifest;
      }

      const filesToDownload = [];
      for (const file of manifest.files) {
        const localPath = path.join(gameDir, file.path);
        const localHash = this.getSha256(localPath);

        if (!localHash || localHash.toLowerCase() !== file.sha256.toLowerCase()) {
          filesToDownload.push(file);
        }
      }

      if (filesToDownload.length === 0) {
        onProgress({ status: 'Barcha modlar sinxronlashtirildi!', progress: 100 });
        return manifest;
      }

      let downloadedCount = 0;
      for (const file of filesToDownload) {
        const targetPath = path.join(gameDir, file.path);
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });

        const response = await axios({
          method: 'GET',
          url: file.url,
          responseType: 'arraybuffer'
        });

        fs.writeFileSync(targetPath, response.data);
        downloadedCount++;

        const percent = Math.round((downloadedCount / filesToDownload.length) * 100);
        onProgress({
          status: `Yuklanmoqda: ${path.basename(file.path)} (${downloadedCount}/${filesToDownload.length})`,
          progress: percent
        });
      }

      onProgress({ status: 'Fayllar to‘liq sinxronlashtirildi!', progress: 100 });
      return manifest;
    } catch (error) {
      console.error('Sync Error:', error);
      throw error;
    }
  }
}

module.exports = new SyncEngine();
