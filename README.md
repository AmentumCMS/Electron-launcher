# Electron-launcher
Configurable electron launcher

A simple Electron application that loads a configurable URL. The URL can be specified through command-line arguments or a configuration file.

## Features

- Load any URL in an Electron window
- Configure URL via command-line arguments
- Configure URL via a JSON configuration file
- Default fallback URL if none specified
- Configurable window dimensions

## Installation

```bash
npm install
```

## Usage

### Basic Usage

Run the app with the default configuration:

```bash
npm start
```

This will load the URL specified in `config.json` (default: https://www.google.com).

### Command-Line Options

#### Specify a URL

```bash
npm start -- --url https://www.example.com
```

Or using the short form:

```bash
npm start -- -u https://www.github.com
```

#### Use a Custom Config File

```bash
npm start -- --config /path/to/custom-config.json
```

Or using the short form:

```bash
npm start -- -c /path/to/custom-config.json
```

#### Combine Options

```bash
npm start -- --config my-config.json --url https://www.wikipedia.org
```

Note: Command-line URL takes precedence over config file URL.

### Display Help

```bash
npm start -- --help
```

## Configuration File

Create a `config.json` file in the project root with the following structure:

```json
{
  "url": "https://www.google.com",
  "window": {
    "width": 1280,
    "height": 800
  }
}
```

### Configuration Options

- `url` (string): The URL to load in the Electron window
- `window.width` (number): Window width in pixels (default: 1280)
- `window.height` (number): Window height in pixels (default: 800)

## Priority Order

The application determines which URL to load in the following priority order:

1. Command-line argument (`--url` or `-u`)
2. Configuration file (`url` field in config.json)
3. Default fallback URL (https://www.example.com)

## Examples

### Example 1: Load GitHub

```bash
npm start -- --url https://www.github.com
```

### Example 2: Use Custom Config

Create a file `my-config.json`:

```json
{
  "url": "https://www.npmjs.com",
  "window": {
    "width": 1920,
    "height": 1080
  }
}
```

Run with:

```bash
npm start -- --config my-config.json
```

### Example 3: Override Config File URL

```bash
npm start -- --config my-config.json --url https://www.stackoverflow.com
```

This will use the window dimensions from `my-config.json` but load https://www.stackoverflow.com instead of the URL in the config file.

## License

ISC
