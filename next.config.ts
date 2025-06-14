import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 啟用 standalone 輸出模式用於 Docker 部署
  output: "standalone",

  // 伺服器外部套件設定（Next.js 15+ 新語法）
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
