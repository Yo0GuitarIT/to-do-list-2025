# 多階段構建：基礎映像
FROM node:18-alpine AS base

# 安裝相依性階段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 複製 package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 建置階段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 生成 Prisma 客戶端
RUN npx prisma generate

# 建置 Next.js 應用程式
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 生產階段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 建立非 root 使用者
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 複製建置結果
COPY --from=builder /app/public ./public

# 複製 standalone 建置檔案
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 複製 Prisma 相關檔案
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# 複製啟動腳本
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 使用啟動腳本
CMD ["./docker-entrypoint.sh"]
