// electron/main.js

// 1. Mudar de 'require' para 'import' (Sintaxe Moderna)
import { app, BrowserWindow } from 'electron';
import { Menu } from 'electron';
import path from 'node:path';
import url from 'node:url'; // Precisamos deste módulo para a correção
import http from 'node:http';

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
  // Use a zero-width character as the title so Electron/OS don't display the app name
  // in the titlebar overlay (some platforms fallback to app name if title is empty).
  title: '\u200b',
    titleBarOverlay: {
      color: '#0F0F0F',
      symbolColor: '#ffffff',
    },
    webPreferences: {
      // 3. Esta linha agora funciona, pois definimos o '__dirname' acima
      preload: path.join(__dirname, 'preload.js'), 
    },
    // Esconde a barra de menu por padrão e permite que a barra seja
    // ativada com Alt (se necessário) sem mostrar a barra permanentemente.
    autoHideMenuBar: true,
  });

  // Remove o menu padrão (File/Edit/View...) da aplicação
  try {
    Menu.setApplicationMenu(null);
    // Também garante que a janela não exiba a barra de menu
    mainWindow.setMenuBarVisibility(false);
  } catch (e) {
    console.warn('Não foi possível remover o menu da aplicação:', e);
  }

  if (isDev) {
    // Tenta detectar automaticamente a porta do servidor Vite (5173..5183).
    // Isso evita erro quando Vite escolhe outra porta se 5173 já estiver em uso.
    async function findVitePort(start = 5173, end = 5183) {
      for (let port = start; port <= end; port++) {
        const ok = await new Promise((resolve) => {
          const req = http.get({ hostname: '127.0.0.1', port, path: '/', timeout: 500 }, (res) => {
            // Considera como ok se receber um 2xx ou 3xx
            resolve(res.statusCode && res.statusCode < 400);
            res.resume();
          });
          req.on('error', () => resolve(false));
          req.on('timeout', () => {
            req.destroy();
            resolve(false);
          });
        });
        if (ok) return port;
      }
      return start; // fallback
    }

    findVitePort().then((port) => {
      mainWindow.loadURL(`http://localhost:${port}`);
      mainWindow.webContents.openDevTools();
    });
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