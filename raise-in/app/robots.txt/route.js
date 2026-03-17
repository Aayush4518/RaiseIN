export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://raise-in.vercel.app";
  const body = [`
User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl.replace(/https?:\/\//, "")}
`,].join("");

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
    },
  });
}
