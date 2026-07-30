const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const authManager = require('./auth/authManager');
const syncEngine = require('./sync/syncEngine');
const launchEngine = require('./launcher/launchEngine');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1040,
    height: 660,
    frame: false,
    resizable: false,
    icon: path.join(__dirname, '../../public/neoterra-new-logo.jpg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const devServerUrl = process.env.VITE_DEV_SERVER_URL;
  if (devServerUrl) {
    mainWindow.loadURL(devServerUrl);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/renderer/index.html'));
  }
}

// Window actions
ipcMain.on('window:minimize', () => mainWindow?.minimize());
ipcMain.on('window:close', () => mainWindow?.close());

// Auth handlers
ipcMain.handle('auth:microsoft', () => authManager.loginMicrosoft());
ipcMain.handle('auth:offline', (_, nick) => authManager.loginOffline(nick));
ipcMain.handle('auth:logout', () => authManager.logout());
ipcMain.handle('auth:getCurrent', () => authManager.getCurrentAccount());

// Game Start & Sync Handler
ipcMain.handle('game:start', async (event, { ram, javaPath }) => {
  const gameDir = path.join(app.getPath('appData'), '.neoterra-mc');
  const manifestUrl = 'https://cdn.neoterra.uz/manifest.json';
  const authData = authManager.getCurrentAccount();

  if (!authData) {
    throw new Error("Iltimos, avval akkauntga kiring!");
  }

  // 1. Sinxronizatsiya
  const manifest = await syncEngine.syncFiles(manifestUrl, gameDir, (progressData) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('sync:progress', progressData);
    }
  });

  // 2. Launch process
  await launchEngine.launchGame(authData, manifest, { gameDir, ram, javaPath }, (type, data) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('launch:event', { type, data });
    }
  });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
