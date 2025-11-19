#!/usr/bin/env node

/**
 * Test script to verify configuration loading without launching Electron
 */

const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Parse command line arguments (same as main.js)
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

// Function to load configuration (same as main.js)
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

// Determine the URL to load (same priority as main.js)
const targetUrl = argv.url || config.url || 'https://www.example.com';
const windowWidth = config.window?.width || 1280;
const windowHeight = config.window?.height || 800;

console.log('=== Configuration Test Results ===');
console.log('Config file:', argv.config);
console.log('Config file exists:', fs.existsSync(argv.config));
console.log('Loaded config:', JSON.stringify(config, null, 2));
console.log('\n=== Final Configuration ===');
console.log('Target URL:', targetUrl);
console.log('Window size:', `${windowWidth}x${windowHeight}`);
console.log('\n=== Priority Used ===');
if (argv.url) {
  console.log('✓ URL from command-line argument');
} else if (config.url) {
  console.log('✓ URL from config file');
} else {
  console.log('✓ Default fallback URL');
}
