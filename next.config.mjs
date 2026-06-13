/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This project is the build root (avoids picking up a parent lockfile).
  outputFileTracingRoot: import.meta.dirname,
  // Build the site as plain static HTML/CSS/JS files (into the `out/` folder)
  // so it can be served by GitHub Pages, which has no Node server.
  output: "export",
  // GitHub Pages can't use Next's on-the-fly image optimizer.
  images: { unoptimized: true },
  // Serve folder-style URLs (/writing/ -> /writing/index.html) which Pages likes.
  trailingSlash: true,
};

export default nextConfig;
