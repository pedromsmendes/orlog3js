import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    EnvironmentPlugin({
      // expose env variables and give them default values
      NODE_ENV: 'production',
      PORT: '3000',
    }),
    tsconfigPaths(),
    react(),
  ],
});
