/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    unoptimized: true, // disable next/image optimization for Netlify
  },
};

export default nextConfig;
