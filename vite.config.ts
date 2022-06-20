/* eslint-disable camelcase */
import { defineConfig, UserConfig, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import path from 'path'

/** unplugin-vue-components/vite */
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
// vite api: https://cn.vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  return {
    /** base 通baseUrl , 默认 ./ */
    base: '/vue/',
    plugins: [
      vue(),
      // vueJsx(),
      vueSetupExtend(),
      // import viteCompression from 'vite-plugin-compression'
      // gzip压缩 生产环境生成 .gz 文件
      // viteCompression({ verbose: true, disable: false, threshold: 10240, algorithm: 'gzip', ext: '.gz', }),
      // mock api:https://github.com/vbenjs/vite-plugin-mock/blob/HEAD/README.zh_CN.md
      viteMockServe({
        ignore: /^_/, // 忽略_开头的文件
        mockPath: 'mock', // mock根目录
        localEnabled: !isBuild, // 是否启用本地mock
        prodEnabled: isBuild, // 是否启用生产环境mock
        injectCode: `import { setupProdMockServer } from '../mock/_createProductionServer'; setupProdMockServer();`,
      }),
      Components({
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: { charset: false },
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8000,
      open: false,
      https: false,
      proxy: {},
    },
    build: {
      sourcemap: false,
      minify: 'terser',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          /** node_modules 分开压缩 */
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          /** 同文件夹归类 */
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
            const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
            return `assets/${fileName}/[name].[hash].js`
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  }
})
