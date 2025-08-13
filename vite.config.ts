import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const processEnv = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
            resolveIcons: true,
          }),
        ],
        dts: true,
      }),
    ],
    define: {
      'process.env': {
        NODE_ENV: mode,
      },
    },
    server: {
      open: true,
      port: 9100,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: processEnv.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mock': {
          target: 'http://10.50.16.213:40001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
  }
})
