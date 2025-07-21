# Star Wars Character Explorer

A modern, responsive Next.js application for exploring Star Wars characters using the SWAPI (Star Wars API). Built with TypeScript, Tailwind CSS, and shadcn/ui components in a Turborepo monorepo structure.

## 🏗️ Project Structure

This is a Turborepo monorepo containing:

\`\`\`
star-wars-explorer/
├── apps/
│   ├── web/                 # Next.js frontend application
│   └── api/                 # Express.js backend API
├── packages/                # Shared packages (if any)
├── turbo.json              # Turborepo configuration
└── package.json            # Root package.json
\`\`\`

## Features

- 🌟 **Character Listing**: Browse through Star Wars characters with pagination
- 🔍 **Search Functionality**: Search characters by name with real-time results
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful interface with dark theme and smooth animations
- ⚡ **Performance**: Server-side rendering with Next.js App Router
- 🔒 **Type Safety**: Full TypeScript support with Zod validation
- 🧪 **Testing**: Comprehensive test suite with Jest and React Testing Library
- 🌙 **Theme Support**: Dark/light mode toggle
- 📄 **Character Details**: Detailed character information including homeworld data
- 🚀 **Error Handling**: Graceful error handling with user-friendly messages
- ⏳ **Loading States**: Skeleton loaders for better user experience

## Tech Stack

### Frontend (apps/web)
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Validation**: Zod
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React
- **Theme**: next-themes

### Backend (apps/api)
- **Framework**: Express.js
- **Language**: TypeScript
- **HTTP Client**: Axios
- **CORS**: cors middleware
- **API Source**: SWAPI (Star Wars API)

### Monorepo
- **Tool**: Turborepo
- **Package Manager**: npm/yarn/pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd star-wars-explorer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   # Install all dependencies for the monorepo
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   
   **For the web app (apps/web):**
   \`\`\`bash
   cd apps/web
   cp .env.example .env.local
   \`\`\`
   
   Update `apps/web/.env.local`:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   \`\`\`

   **For the API (apps/api):**
   \`\`\`bash
   cd apps/api
   cp .env.example .env
   \`\`\`
   
   Update `apps/api/.env`:
   \`\`\`env
   PORT=5000
   NODE_ENV=development
   \`\`\`

4. **Start the development servers**
   
   **Option 1: Start both apps simultaneously (recommended)**
   \`\`\`bash
   # From the root directory
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

   **Option 2: Start apps individually**
   \`\`\`bash
   # Terminal 1 - Start the API server
   cd apps/api
   npm run dev

   # Terminal 2 - Start the web app
   cd apps/web
   npm run dev
   \`\`\`

5. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - API: [http://localhost:5000](http://localhost:5000)

## Development Workflow

### Available Scripts

**Root level scripts:**
\`\`\`bash
npm run dev          # Start all apps in development mode
npm run build        # Build all apps for production
npm run start        # Start all apps in production mode
npm run lint         # Lint all apps
npm run test         # Run tests for all apps
npm run clean        # Clean all build artifacts
\`\`\`

**Web app specific (apps/web):**
\`\`\`bash
cd apps/web
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint the web app
npm run test         # Run web app tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
\`\`\`

**API specific (apps/api):**
\`\`\`bash
cd apps/api
npm run dev          # Start Express server with nodemon
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run lint         # Lint the API code
npm run test         # Run API tests
\`\`\`

### Turborepo Configuration

The `turbo.json` file defines the build pipeline:

\`\`\`json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {}
  }
}
\`\`\`

## API Integration

### Backend API (apps/api)

The Express.js API provides the following endpoints:

- `GET /` - Health check
- `GET /api/characters` - List characters with optional search and pagination
- `GET /api/characters/:id` - Get detailed character information
- `GET /api/resource` - Generic resource fetcher

### API Response Format

**Characters List (`GET /api/characters`):**
\`\`\`json
{
  "data": [
    {
      "id": "1",
      "name": "Luke Skywalker",
      "description": "A person within the Star Wars universe",
      "basicInfo": {
        "gender": "male",
        "birthYear": "19BBY",
        "height": "172",
        "mass": "77",
        "hairColor": "blond",
        "skinColor": "fair",
        "eyeColor": "blue"
      },
      "relations": {
        "homeworld": {
          "id": "1",
          "name": "Tatooine",
          "climate": "arid"
        },
        "films": [],
        "species": [],
        "vehicles": [],
        "starships": []
      },
      "meta": {
        "created": "2025-07-20T20:08:24.106Z",
        "edited": "2025-07-20T20:08:24.106Z",
        "url": "https://www.swapi.tech/api/people/1"
      }
    }
  ],
  "pagination": {
    "totalRecords": 82,
    "currentPage": 1,
    "perPage": 12
  },
  "metadata": {
    "apiVersion": "1.0",
    "timestamp": "2025-07-20T20:08:24.106Z"
  }
}
\`\`\`

### Frontend Integration (apps/web)

The Next.js app consumes the API using:
- Server Components for initial data fetching
- Client Components for interactive features
- Zod schemas for type validation
- Custom API error handling

## Testing

### Running Tests

**All tests:**
\`\`\`bash
# From root
npm run test
\`\`\`

**Web app tests:**
\`\`\`bash
cd apps/web
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage
\`\`\`

**API tests:**
\`\`\`bash
cd apps/api
npm run test
\`\`\`

### Test Coverage

The application includes comprehensive tests for:

- ✅ Component rendering and behavior
- ✅ API integration and error handling
- ✅ User interactions (search, pagination)
- ✅ Type validation with Zod schemas
- ✅ Error boundary functionality

### Test Structure

\`\`\`
apps/web/__tests__/
├── api.test.ts              # API functions testing
├── character-card.test.tsx  # Character card component
└── search-bar.test.tsx      # Search functionality

apps/api/__tests__/
├── routes.test.ts           # API route testing
└── utils.test.ts            # Utility functions
\`\`\`

## Deployment

### Building for Production

**Build all apps:**
\`\`\`bash
npm run build
\`\`\`

**Build specific app:**
\`\`\`bash
# Web app
cd apps/web
npm run build

# API
cd apps/api
npm run build
\`\`\`

### Environment Variables

**Production environment variables:**

**apps/web/.env.production:**
\`\`\`env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
\`\`\`

**apps/api/.env.production:**
\`\`\`env
PORT=5000
NODE_ENV=production
\`\`\`

### Deployment Options

#### Option 1: Deploy to Vercel (Recommended for Next.js)

**Web App:**
1. Connect your repository to Vercel
2. Set the root directory to `apps/web`
3. Configure environment variables
4. Deploy

**API:**
1. Deploy to Vercel Functions or separate service
2. Update `NEXT_PUBLIC_API_URL` in web app

#### Option 2: Docker Deployment

**Create Dockerfiles:**

**apps/web/Dockerfile:**
\`\`\`dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

**apps/api/Dockerfile:**
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
\`\`\`

#### Option 3: Traditional Hosting

1. Build both applications
2. Deploy API to Node.js hosting service
3. Deploy web app to static hosting or Node.js service
4. Configure environment variables

## Project Architecture

### Monorepo Benefits

- **Shared Dependencies**: Common packages managed at root level
- **Coordinated Development**: Changes across frontend and backend in single PR
- **Consistent Tooling**: Shared linting, testing, and build configurations
- **Simplified CI/CD**: Single pipeline for entire application

### Code Organization

\`\`\`
apps/web/
├── app/                     # Next.js App Router pages
├── components/              # Reusable UI components
├── lib/                     # Utility functions and API
├── __tests__/               # Test files
└── public/                  # Static assets

apps/api/
├── src/
│   ├── routes/              # Express routes
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   └── types/               # TypeScript types
├── __tests__/               # API tests
└── dist/                    # Built JavaScript (generated)
\`\`\`

### Development Best Practices

1. **Type Safety**: Shared types between frontend and backend
2. **Error Handling**: Consistent error responses and handling
3. **Testing**: Comprehensive test coverage for both apps
4. **Documentation**: Keep README and docs updated
5. **Git Workflow**: Use conventional commits and PR reviews

## Troubleshooting

### Common Issues

**1. Port conflicts:**
\`\`\`bash
# Check what's running on ports
lsof -i :3000
lsof -i :5000

# Kill processes if needed
kill -9 <PID>
\`\`\`

**2. Dependencies out of sync:**
\`\`\`bash
# Clean and reinstall
rm -rf node_modules apps/*/node_modules
npm install
\`\`\`

**3. Build issues:**
\`\`\`bash
# Clean build artifacts
npm run clean
npm run build
\`\`\`

**4. API connection issues:**
- Verify `NEXT_PUBLIC_API_URL` in web app
- Ensure API server is running on correct port
- Check CORS configuration in API

### Getting Help

- Check the [Issues](link-to-issues) page for known problems
- Review the [API documentation](link-to-api-docs)
- Contact the development team

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes in appropriate app directory
4. Add tests for new functionality
5. Ensure all tests pass (`npm run test`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages
- Ensure both apps work together

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Star Wars API (SWAPI) for providing the data
- shadcn/ui for the beautiful component library
- The Next.js team for the excellent framework
- Turborepo team for the monorepo tooling
- Lucide for the icon set
