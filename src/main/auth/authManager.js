const { Auth } = require('msmc');
const Store = require('electron-store');
const store = new Store();

class AuthManager {
  constructor() {
    this.msmc = new Auth('select_account');
  }

  // Microsoft Official Login
  async loginMicrosoft() {
    try {
      const xboxManager = await this.msmc.launch('raw');
      const token = await xboxManager.getMinecraft();
      const authData = {
        type: 'microsoft',
        access_token: token.mclc().access_token,
        client_token: token.mclc().client_token,
        uuid: token.mclc().uuid,
        name: token.mclc().name,
        user_properties: token.mclc().user_properties
      };
      
      store.set('current_account', authData);
      return authData;
    } catch (error) {
      console.error('Microsoft OAuth2 Error:', error);
      throw error;
    }
  }

  // Offline Nickname Login
  loginOffline(username) {
    if (!username || username.trim().length < 3) {
      throw new Error("Taxallus kamida 3 ta belgidan iborat bo'lishi kerak!");
    }
    const authData = {
      type: 'offline',
      name: username.trim(),
      uuid: 'offline-' + Date.now(),
      access_token: 'offline_token'
    };
    store.set('current_account', authData);
    return authData;
  }

  // Get current active profile
  getCurrentAccount() {
    return store.get('current_account', null);
  }

  // Logout
  logout() {
    store.delete('current_account');
    return null;
  }
}

module.exports = new AuthManager();
