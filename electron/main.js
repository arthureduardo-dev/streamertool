// electron/main.js

// 1. Mudar de 'require' para 'import' (Sintaxe Moderna)
import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import url from 'node:url'; // Precisamos deste módulo para a correção

// 2. --- A CORREÇÃO DO '__dirname' ---
// Esta é a forma moderna de obter o caminho do diretório
// em Módulos ES, já que '__dirname' não existe.
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- Fim da correção ---

const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 3. Esta linha agora funciona, pois definimos o '__dirname' acima
      preload: path.join(__dirname, 'preload.js'), 
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // 4. Corrigimos o caminho de produção também
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});