import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import ElementPlus from 'unplugin-element-plus/vite'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { terser } from 'rollup-plugin-terser'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus(),
    chunkSplitPlugin({
      strategy: 'single-vendor',
      customSplitting: {
        g6: ['@antv/g6'],
        element: ['element-plus'],
        lodash: ['lodash', 'dayjs'],
        vue: ['vue'],
        pages: [/src\/pages/, /src\/components/]
      }
    }),
    terser({
      compress: {
        dead_code: true,
        drop_console: true
      },
      mangle: {
        eval: true,
        module: true,
        toplevel: true,
        safari10: true,
        properties: false
      },
      output: {
        comments: false
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
