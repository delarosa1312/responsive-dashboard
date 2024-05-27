/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  transpilePackages: ['mui-tel-input'],
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias
    }

    return config
  }
}
