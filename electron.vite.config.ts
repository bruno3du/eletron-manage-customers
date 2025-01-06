import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      viteStaticCopy({
        targets: [
          {
            src: 'resources/*',
            dest: 'resources'
          }
        ]
      })
    ]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform)
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: resolve(__dirname, './src/renderer/tailwind.config.js')
          })
        ]
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})