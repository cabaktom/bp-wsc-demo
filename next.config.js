/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // because of react-beautiful-dnd issue https://github.com/atlassian/react-beautiful-dnd/issues/2350
  swcMinify: true,
};

module.exports = nextConfig;
