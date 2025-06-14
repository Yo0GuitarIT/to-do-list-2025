# Docker 部署指南

這個專案已經完全容器化，可以部署到任何支援 Docker 的平台。

## 🐳 本地開發與測試

### 使用 Docker Compose 啟動完整環境

```bash
# 啟動應用程式和資料庫
npm run docker:compose:up

# 查看日誌
npm run docker:compose:logs

# 停止服務
npm run docker:compose:down
```

### 單獨建置和執行 Docker 映像

```bash
# 建置映像
npm run docker:build

# 執行容器（需要先設定 .env 檔案）
npm run docker:run
```

## 🚀 部署到雲端平台

### Render.com 部署

1. **建立 PostgreSQL 資料庫**

   - 在 Render 建立 PostgreSQL 服務
   - 記錄連線字串

2. **建立 Web Service**

   - 連接您的 GitHub repository
   - 設定為 Docker 部署
   - 添加環境變數：
     ```
     DATABASE_URL=your_postgresql_connection_string
     NODE_ENV=production
     NEXT_TELEMETRY_DISABLED=1
     ```

3. **部署設定**
   - Build Command: 留空（使用 Dockerfile）
   - Start Command: 留空（使用 Dockerfile CMD）

### DigitalOcean App Platform 部署

1. **建立新的 App**

   - 選擇 Docker 容器
   - 連接 GitHub repository

2. **設定環境變數**
   ```
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   ```

## 🛠️ 本地開發設定

如果您想繼續使用本地 PostgreSQL（port 6060），請：

1. 複製環境變數檔案：

   ```bash
   cp .env.example .env
   ```

2. 更新 `.env` 檔案中的 `DATABASE_URL`：

   ```
   DATABASE_URL="postgresql://your_user:your_password@localhost:6060/your_database"
   ```

3. 執行 Prisma 指令：
   ```bash
   npm run prisma:generate
   npm run prisma:push
   ```

## 📦 Docker 映像說明

- **多階段建置**：優化映像大小
- **非 root 使用者**：提高安全性
- **健康檢查**：確保服務正常運行
- **Standalone 模式**：減少映像大小和啟動時間

## 🔧 常見問題

### Q: 為什麼要使用 standalone 模式？

A: Standalone 模式會產生一個自包含的伺服器，包含所有必要的檔案，非常適合 Docker 部署。

### Q: 如何處理資料庫遷移？

A: 應用程式啟動時會自動執行 `prisma db push`，這會同步資料庫結構。

### Q: 如何查看應用程式日誌？

A: 使用 `docker-compose logs -f app` 或 `npm run docker:compose:logs`

### Q: 如何連接到容器內的資料庫？

A: 使用 `docker-compose exec db psql -U todouser -d todolist`
