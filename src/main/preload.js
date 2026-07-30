const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loginMicrosoft: () => ipcRenderer.invoke('auth:microsoft'),
  loginOffline: (nick) => ipcRenderer.invoke('auth:offline', nick),
  logout: () => ipcRenderer.invoke('auth:logout'),
  getCurrentAccount: () => ipcRenderer.invoke('auth:getCurrent'),
  startGame: (options) => ipcRenderer.invoke('game:start', options),
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  closeWindow: () => ipcRenderer.send('window:close'),
  onSyncProgress: (callback) => {
    ipcRenderer.on('sync:progress', (_event, value) => callback(value));
  },
  onLaunchEvent: (callback) => {
    ipcRenderer.on('launch:event', (_event, value) => callback(value));
  }
});
