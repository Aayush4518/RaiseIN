/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow' },
          { key: 'X-UA-Compatible', value: 'IE=edge' },
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'accelerometer=(), ambient-light-sensor=(), autoplay=(self)' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
