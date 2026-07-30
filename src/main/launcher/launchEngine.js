const { Client } = require('minecraft-launcher-core');
const launcher = new Client();

class LaunchEngine {
  async launchGame(authData, manifest, options, onEvent) {
    const launcherOptions = {
      authorization: authData,
      root: options.gameDir,
      version: {
        number: manifest.gameVersion || "1.20.1",
        type: "release"
      },
      forge: manifest.loader && manifest.loader.type === 'forge' ? manifest.loader.version : null,
      fabric: manifest.loader && manifest.loader.type === 'fabric' ? manifest.loader.version : null,
      memory: {
        max: `${options.ram || 4096}M`,
        min: "2048M"
      },
      javaPath: options.javaPath || undefined,
      quickPlay: {
        type: "multiplayer",
        identifier: `${manifest.server ? manifest.server.ip : "play.neoterra.uz"}:${manifest.server ? manifest.server.port : 25565}`
      }
    };

    launcher.on('debug', (e) => onEvent('debug', e));
    launcher.on('data', (e) => onEvent('data', e));
    launcher.on('progress', (e) => onEvent('progress', e));
    launcher.on('close', (code) => onEvent('close', code));

    await launcher.launch(launcherOptions);
  }
}

module.exports = new LaunchEngine();
