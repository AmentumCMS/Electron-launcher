const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('url', {
    alias: 'u',
    type: 'string',
    description: 'URL to load in the Electron window'
  })
  .option('config', {
    alias: 'c',
    type: 'string',
    description: 'Path to config file',
    default: path.join(__dirname, 'config.json')
  })
  .help()
  .alias('help', 'h')
  .argv;

// Function to load configuration
function loadConfig(configPath) {
  try {
    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, 'utf8');
      return JSON.parse(configData);
    }
  } catch (error) {
    console.error('Error loading config file:', error.message);
  }
  return {};
}

// Load configuration
const config = loadConfig(argv.config);

// Determine the URL to load (priority: CLI args > config file > default)
const targetUrl = argv.url || config.url || 'https://www.example.com';
const windowWidth = config.window?.width || 1280;
const windowHeight = config.window?.height || 800;

console.log(`Loading URL: ${targetUrl}`);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  // Load the URL
  mainWindow.loadURL(targetUrl);

  // Open DevTools in development mode (optional)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
