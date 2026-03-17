import FundingFormDB from '@/models/fundingDB';
import { mongoosePromise } from '@/lib/mongodb';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raise-in.vercel.app';

  const staticUrls = [
    '/',
    '/home',
    '/about',
    '/contact',
    '/dashboard',
    '/services',
    '/login',
    '/create-order',
    '/funding',
    '/upload',
    '/verify-payment',
  ];

  let dynamicUrls = [];

  try {
    await mongoosePromise;
    const fundings = await FundingFormDB.find({ slug: { $exists: true, $ne: null } }, 'slug updatedAt').lean();
    dynamicUrls = fundings
      .filter((funding) => funding.slug)
      .map((funding) => ({
        path: `/funding/${encodeURIComponent(funding.slug)}`,
        lastmod: funding.updatedAt?.toISOString() || new Date().toISOString(),
      }));
  } catch (error) {
    console.warn('Sitemap dynamic funding lookup failed:', error);
  }

  const urlsXml = staticUrls
    .map((path) => {
      return `<url><loc>${baseUrl}${path}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`;
    })
    .join('')
    + dynamicUrls
      .map((entry) => `
        <url>
          <loc>${baseUrl}${entry.path}</loc>
          <lastmod>${entry.lastmod}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `)
      .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400',
    },
  });
}
