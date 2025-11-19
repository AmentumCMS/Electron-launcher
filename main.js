const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

// Default URL
const DEFAULT_URL = 'https://www.google.com';

// Function to load URL from config file
function loadUrlFromConfig() {
  const configPath = path.join(__dirname, 'config.json');
  try {
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.url || null;
    }
  } catch (error) {
    console.error('Error reading config file:', error.message);
  }
  return null;
}

// Function to get URL from command line arguments
function getUrlFromArgs() {
  const args = process.argv.slice(2);
  
  // Check for --url=<value> format
  for (const arg of args) {
    if (arg.startsWith('--url=')) {
      return arg.substring(6);
    }
  }
  
  // Check for --url <value> format
  const urlIndex = args.indexOf('--url');
  if (urlIndex !== -1 && urlIndex + 1 < args.length) {
    return args[urlIndex + 1];
  }
  
  return null;
}

// Determine the URL to load (priority: command line > config file > default)
function getTargetUrl() {
  const urlFromArgs = getUrlFromArgs();
  if (urlFromArgs) {
    console.log('Using URL from command line:', urlFromArgs);
    return urlFromArgs;
  }
  
  const urlFromConfig = loadUrlFromConfig();
  if (urlFromConfig) {
    console.log('Using URL from config file:', urlFromConfig);
    return urlFromConfig;
  }
  
  console.log('Using default URL:', DEFAULT_URL);
  return DEFAULT_URL;
}

function createWindow() {
  const targetUrl = getTargetUrl();
  
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Load the URL
  mainWindow.loadURL(targetUrl);
  
  // Open DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window when the dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
