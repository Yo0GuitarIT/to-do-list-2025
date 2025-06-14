#!/bin/sh

# 等待資料庫就緒
echo "Waiting for database to be ready..."

# 檢查是否有 DATABASE_URL 環境變數
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set"
  exit 1
fi

# 嘗試連接資料庫並執行 Prisma 操作
echo "Applying database schema..."
npx prisma db push --accept-data-loss

if [ $? -eq 0 ]; then
  echo "Database schema applied successfully!"
else
  echo "Failed to apply database schema"
  exit 1
fi

# 啟動 Next.js 應用程式
echo "Starting Next.js application..."
exec node server.js
