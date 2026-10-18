// Desktop app entry point (Electron).
// The app's files are served from a small local web server instead of file:// because
// YouTube refuses to play embeds on file:// pages. The port is fixed so the saved
// writing and goals (stored per address) are found again on every launch.
const { app, BrowserWindow, shell, Menu } = require('electron');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORTS = [51735, 51736, 51737];
const ROOT = __dirname;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

function serve(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.normalize(path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath));
  if (!file.startsWith(ROOT + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}

function listen(ports) {
  return new Promise((resolve, reject) => {
    const [port, ...rest] = ports;
    if (!port) return reject(new Error('No free port for the app server'));
    const server = http.createServer(serve);
    server.once('error', () => listen(rest).then(resolve, reject));
    server.listen(port, '127.0.0.1', () => resolve(port));
  });
}

function isExternal(url, origin) {
  return /^https?:/.test(url) && !url.startsWith(origin);
}

async function createWindow() {
  const port = await listen(PORTS);
  const origin = `http://127.0.0.1:${port}`;

  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 380,
    minHeight: 500,
    title: 'Kawaii no Word Count!',
    icon: path.join(ROOT, 'icons', 'icon-512.png'),
    backgroundColor: '#fff0f6',
    autoHideMenuBar: true,
    show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
  });

  // Links like "Open in YouTube" go to the default browser instead of a new app window.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isExternal(url, origin)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (isExternal(url, origin)) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  win.once('ready-to-show', () => win.show());
  win.loadURL(origin + '/');
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const [win] = BrowserWindow.getAllWindows();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    createWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
