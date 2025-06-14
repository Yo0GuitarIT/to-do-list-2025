# 📝 To-Do List 2025

A modern To-Do List application built with Next.js, TypeScript, Prisma, and PostgreSQL.

## ✨ Features

- ✅ Add, edit, and delete todo items
- 🗄️ PostgreSQL database storage
- 🐳 Fully containerized deployment
- 🧪 Comprehensive test coverage
- 🚀 Automated CI/CD deployment

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL, Prisma ORM
- **Styling**: Tailwind CSS
- **Testing**: Vitest, Testing Library
- **Deployment**: Docker, Render.com
- **CI/CD**: GitHub Actions

## 🚀 Getting Started

### Local Development

```bash
# Clone the project
git clone https://github.com/Yo0GuitarIT/to-do-list-2025.git
cd to-do-list-2025

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file to configure DATABASE_URL

# Set up database
npm run prisma:generate
npm run prisma:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Docker Development

```bash
# Start complete environment (app + PostgreSQL)
npm run docker:compose:up

# View logs
npm run docker:compose:logs

# Stop services
npm run docker:compose:down
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run ESLint
npm run lint
```

## 🐳 Docker Deployment

### Local Docker Build

```bash
# Build Docker image
npm run docker:build

# Run container (requires .env configuration)
npm run docker:run
```

### Cloud Deployment

#### Render.com Deployment

1. **Create PostgreSQL Database**

   - Create a PostgreSQL service on Render
   - Record the connection string

2. **Create Web Service**

   - Connect GitHub repository
   - Configure for Docker deployment
   - Add environment variables:

   ```
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   ```

3. **Automated CI/CD Deployment**
   - Push to `main` branch triggers automatic deployment
   - GitHub Actions runs tests then automatically triggers Render deployment

#### DigitalOcean App Platform

1. Create a new App, select Docker container
2. Connect GitHub repository
3. Configure the same environment variables

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build project
npm run start           # Start production server
npm run lint            # Run ESLint

# Testing
npm test                # Run tests
npm run test:run        # Run tests (single run)

# Docker
npm run docker:build         # Build Docker image
npm run docker:run          # Run Docker container
npm run docker:compose:up   # Start Docker Compose
npm run docker:compose:down # Stop Docker Compose

# Prisma
npm run prisma:generate  # Generate Prisma client
npm run prisma:push     # Push database schema
npm run prisma:migrate  # Run database migrations
npm run prisma:studio   # Open Prisma Studio
```

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/         # API Routes
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Homepage
│   ├── components/      # React components
│   ├── lib/            # Utility functions
│   └── test/           # Test files
├── prisma/             # Prisma configuration
├── .github/workflows/  # GitHub Actions
├── docker-compose.yml  # Docker Compose configuration
├── Dockerfile         # Docker configuration
└── README.md          # Project documentation
```

## 🔧 Technical Details

### Docker Image Features

- **Multi-stage build**: Optimized image size
- **Non-root user**: Enhanced security
- **Health checks**: Ensures service availability
- **Standalone mode**: Reduced image size and startup time

### Frequently Asked Questions

**Q: Why use standalone mode?**
A: Standalone mode produces a self-contained server with all necessary files, perfect for Docker deployment.

**Q: How are database migrations handled?**
A: The application automatically runs `prisma db push` on startup to synchronize the database schema.

**Q: How to view application logs?**
A: Use `docker-compose logs -f app` or `npm run docker:compose:logs`

**Q: How to connect to the containerized database?**
A: Use `docker-compose exec db psql -U todouser -d todolist`

## 🚀 CI/CD Pipeline

Every push to the `main` branch automatically:

1. 🧪 **Testing Phase**

   - Run ESLint checks
   - Execute unit tests
   - Test build process

2. 🚀 **Deployment Phase**
   - Automatically trigger Render deployment
   - Generate deployment summary report

## 📝 License

MIT License

## 🤝 Contributing

Pull requests and issues are welcome!
