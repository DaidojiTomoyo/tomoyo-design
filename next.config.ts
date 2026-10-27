import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [{ source: '/', destination: '/en', permanent: true }];
  },
};

export default nextConfig;
