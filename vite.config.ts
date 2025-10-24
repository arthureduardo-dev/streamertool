// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { builtinModules } from 'node:module'; // Importa a lista de módulos nativos do Node

// Regex para identificar módulos nativos do Node (ex: 'node:path', 'path')
const NODE_BUILTIN_REGEX = /^(node:)?(path|fs|os|electron|events|crypto|url|http|https|stream|util|zlib|assert|tty|buffer|module|constants|child_process|dgram|dns|net|readline|repl|tls|vm|worker_threads|perf_hooks|async_hooks|diagnostics_channel|process)$/;


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: (id) => {
        // Marca módulos nativos do Node.js como externos
        return NODE_BUILTIN_REGEX.test(id);
      },
    },
  },
  // Otimização para evitar que Vite tente pré-empacotar módulos Electron/Node
  optimizeDeps: {
     exclude: ['electron', ...builtinModules.map(m => `node:${m}`), ...builtinModules],
  }
});