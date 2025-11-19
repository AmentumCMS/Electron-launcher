# Electron-launcher
Configurable electron launcher

A simple Electron application that loads a configurable URL. The URL can be set via command line arguments, a configuration file, or uses a default value.

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

## Usage

### Option 1: Using Default URL
Simply run the application without any configuration:
```bash
npm start
```
This will load the default URL: `https://www.google.com`

### Option 2: Using Configuration File
Create a `config.json` file in the root directory:
```json
{
  "url": "https://example.com"
}
```

You can use the provided example file:
```bash
cp config.example.json config.json
```

Then run:
```bash
npm start
```

### Option 3: Using Command Line Arguments
Override the URL using command line arguments:

```bash
npm start -- --url=https://github.com
```

Or with a space:
```bash
npm start -- --url https://github.com
```

## Configuration Priority

The application determines which URL to load in the following priority order:
1. **Command line argument** (highest priority)
2. **config.json file**
3. **Default URL** (lowest priority)

## Examples

```bash
# Load default URL (Google)
npm start

# Load GitHub using config file
echo '{"url": "https://github.com"}' > config.json
npm start

# Load Wikipedia using command line (overrides config file)
npm start -- --url=https://wikipedia.org
```

## Development

The application is built with Electron and follows best practices for security with `nodeIntegration: false` and `contextIsolation: true`.
