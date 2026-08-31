/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone is for Docker only. Vercel uses its own output format.
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1660, 1920, 2048, 2560, 3840, 5120, 7680],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.gadgetbytenepal.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "www.cyprusemall.com.cy",
      },
      {
        protocol: "https",
        hostname: "asset.conrad.com",
      },
      {
        protocol: "https",
        hostname: "www.pcworld.com",
      },
      {
        protocol: "https",
        hostname: "static1.howtogeekimages.com",
      },
      {
        protocol: "https",
        hostname: "www.blessthisstuff.com",
      },
      {
        protocol: "https",
        hostname: "www.lg.com",
      },
      {
        protocol: "https",
        hostname: "cdn.mos.cms.futurecdn.net",
      },
      {
        protocol: "https",
        hostname: "pisces.bbystatic.com",
      },
      {
        protocol: "https",
        hostname: "www.hp.com",
      },
      {
        protocol: "https",
        hostname: "vivre-motion.com",
      },
      {
        protocol: "https",
        hostname: "assets-prd.ignimgs.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "jegallery.co.uk",
      },
      {
        protocol: "https",
        hostname: "slipintosoft.com",
      },
      {
        protocol: "https",
        hostname: "static0.makeuseofimages.com",
      },
      {
        protocol: "https",
        hostname: "www.vikingculinaryproducts.com",
      },
      {
        protocol: "https",
        hostname: "i5.walmartimages.com",
      },
      {
        protocol: "https",
        hostname: "a.1stdibscdn.com",
      },
      {
        protocol: "https",
        hostname: "www.brylanehome.com",
      },
      {
        protocol: "https",
        hostname: "www.decorsnob.com",
      },
      {
        protocol: "https",
        hostname: "cb.scene7.com",
      },
      {
        protocol: "https",
        hostname: "ae01.alicdn.com",
      },
      {
        protocol: "https",
        hostname: "ak1.ostkcdn.com",
      },
      {
        protocol: "https",
        hostname: "engledow.com",
      },
    ],
  },
};

module.exports = nextConfig;
