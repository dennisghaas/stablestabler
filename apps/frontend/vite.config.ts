import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../../');
  return {
    envDir: '../../',
    plugins: [vue()],
    server: {
      port: parseInt(env.VITE_PORT || '5173', 10),
      strictPort: true,
      proxy: {
        '/api': {
          target: env.VITE_BASE_API_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@stablestabler/types': path.resolve(__dirname, '../../types/src'),
      },
    },
  };
});
