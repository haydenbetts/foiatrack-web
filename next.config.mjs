import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Ensure aliases exist and map to real paths
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@': path.resolve(__dirname),
      '@/lib': path.resolve(__dirname, 'lib'),
      // (optional) '@/app': path.resolve(__dirname, 'app'),
    };
    return config;
  },
};

export default nextConfig;
