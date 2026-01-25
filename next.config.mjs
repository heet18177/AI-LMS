/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'img.clerk.com',
      }
    ]
  },
  reactCompiler: true,
};

export default nextConfig;
