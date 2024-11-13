import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { fileURLToPath } from 'url'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
        silenceDeprecations: ['legacy-js-api']
      }
    }
  },
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'pinia', 'uni-app'],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
