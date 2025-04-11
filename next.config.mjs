/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable the development overlay/icon
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
};

export default nextConfig;