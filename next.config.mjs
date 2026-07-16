/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Работы лежат в R2 в исходном разрешении (бэкенд жмёт качество, но не
    // размер), поэтому превью в галерее тянуло мегабайты. next/image режет их
    // под размер карточки и отдаёт WebP/AVIF.
    remotePatterns: [
      {
        protocol: "https",
        // Точный хост бакета, а не маска *.r2.dev: иначе через наш сервер можно
        // было бы прогонять картинки из любого чужого публичного бакета.
        hostname: "pub-07db09702c3343ac965b828f794bf3ab.r2.dev",
        // Ключи объектов бэкенд формирует как "uploads/<uuid>.<ext>",
        // поэтому дальше этого префикса оптимизатор ходить не должен.
        pathname: "/uploads/**",
      },
    ],
    // Имена объектов — UUID, содержимое по ссылке не меняется, так что
    // перепроверять исходник раз в минуту (дефолт) незачем.
    minimumCacheTTL: 2592000, // 30 дней
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
