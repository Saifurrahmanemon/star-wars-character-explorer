# Star Wars Character Explorer

A modern, responsive Next.js application for exploring Star Wars characters using the SWAPI (Star Wars API). Built with TypeScript, Tailwind CSS, and shadcn/ui components.

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

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Validation**: Zod
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Running backend API (provided separately)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd star-wars-character-explorer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

   Update `.env.local` with your backend API URL:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Integration

The application consumes the following backend endpoints:

- `GET /api/characters` - List characters with optional search and pagination
- `GET /api/characters/:id` - Get detailed character information

### API Response Format

**Characters List:**
\`\`\`json
{
"data": [
{
"uid": "1",
"name": "Luke Skywalker",
"url": "https://www.swapi.tech/api/people/1",
"details": {
"name": "Luke Skywalker",
"gender": "male",
"homeworld": {
"name": "Tatooine",
"climate": "arid"
}
}
}
],
"pagination": {
"totalRecords": 82,
"totalPages": 9,
"currentPage": 1,
"perPage": 10
}
}
\`\`\`

## Testing

### Running Tests

\`\`\`bash

# Run all tests

npm test

# Run tests in watch mode

npm run test:watch

# Run tests with coverage

npm run test:coverage
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
**tests**/
├── api.test.ts # API functions testing
├── character-card.test.tsx # Character card component
└── search-bar.test.tsx # Search functionality
\`\`\`

## Project Structure

\`\`\`
├── app/ # Next.js App Router pages
│ ├── character/[id]/ # Character details page
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ ├── loading.tsx # Global loading UI
│ ├── not-found.tsx # 404 page
│ └── page.tsx # Home page
├── components/ # Reusable UI components
│ ├── ui/ # shadcn/ui components
│ ├── character-card.tsx # Character card component
│ ├── character-details.tsx
│ ├── character-list.tsx
│ ├── error-message.tsx
│ ├── header.tsx
│ ├── pagination.tsx
│ ├── search-bar.tsx
│ └── theme-toggle.tsx
├── lib/ # Utility functions
│ ├── api.ts # API integration
│ ├── types.ts # TypeScript types & Zod schemas
│ └── utils.ts # Utility functions
└── **tests**/ # Test files
\`\`\`

## Key Features Implementation

### Search Functionality

- Real-time search with URL state management
- Debounced search to prevent excessive API calls
- Search parameter persistence across page refreshes

### Pagination

- Server-side pagination with configurable page size
- Smart pagination controls with ellipsis for large page counts
- URL-based pagination state

### Error Handling

- Comprehensive error boundaries
- API error classification and user-friendly messages
- Retry mechanisms for failed requests
- Graceful degradation for missing data

### Performance Optimizations

- Server-side rendering for SEO and initial load performance
- Image optimization with Next.js Image component
- Skeleton loading states for better perceived performance
- Efficient re-rendering with React keys

### Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly content
- High contrast color schemes

## Design Decisions

### Architecture Choices

1. **Next.js App Router**: Chosen for its modern approach to routing, built-in optimizations, and server components support.

2. **TypeScript + Zod**: Provides end-to-end type safety from API responses to UI components, with runtime validation.

3. **shadcn/ui**: Offers high-quality, accessible components that are customizable and maintain design consistency.

4. **Server Components**: Used where possible to reduce client-side JavaScript and improve performance.

### UI/UX Decisions

1. **Dark Theme**: Star Wars aesthetic with space-themed gradients and colors.

2. **Card-based Layout**: Easy scanning of character information with clear visual hierarchy.

3. **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with client-side features.

4. **Mobile-first Design**: Responsive layout that works seamlessly across all device sizes.

### Performance Considerations

1. **Caching Strategy**: API responses cached for 5 minutes to balance freshness and performance.

2. **Pagination**: Limits data transfer and improves page load times.

3. **Lazy Loading**: Components and images loaded on demand.

4. **Bundle Optimization**: Tree-shaking and code splitting for minimal bundle size.

## QA/Test Plan

### Manual Testing Checklist

#### Functionality Testing

- [ ] Character list loads correctly
- [ ] Search functionality works with various inputs
- [ ] Pagination navigates correctly
- [ ] Character details page displays complete information
- [ ] Error states display appropriate messages
- [ ] Loading states appear during data fetching

#### Responsive Testing

- [ ] Layout adapts to mobile devices (320px+)
- [ ] Tablet layout works correctly (768px+)
- [ ] Desktop layout is optimal (1024px+)
- [ ] Touch interactions work on mobile devices

#### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Performance Testing

- [ ] Initial page load < 3 seconds
- [ ] Search results appear < 1 second
- [ ] Navigation between pages is smooth
- [ ] No memory leaks during extended use

#### Accessibility Testing

- [ ] Screen reader compatibility
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators are visible

### Automated Testing

The project includes automated tests covering:

- **Unit Tests**: Individual component functionality
- **Integration Tests**: API integration and data flow
- **Accessibility Tests**: Basic accessibility compliance
- **Performance Tests**: Bundle size and load time monitoring

## Deployment

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

### Environment Variables

Ensure the following environment variables are set in production:

\`\`\`env
NEXT_PUBLIC_API_URL=https://your-production-api.com
\`\`\`

### Deployment Platforms

The application can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker containers**

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Star Wars API (SWAPI) for providing the data
- shadcn/ui for the beautiful component library
- The Next.js team for the excellent framework
- Lucide for the icon set

# Technical Documentation

## Architecture Overview

The Star Wars Character Explorer is built using a modern React/Next.js architecture with the following key principles:

### 1. Server-First Architecture

- Utilizes Next.js App Router for server-side rendering
- Server Components for initial data fetching
- Client Components only where interactivity is required

### 2. Type Safety

- Full TypeScript implementation
- Zod schemas for runtime validation
- End-to-end type safety from API to UI

### 3. Component Architecture

- Atomic design principles
- Reusable UI components with shadcn/ui
- Clear separation of concerns

## Data Flow

\`\`\`
API Backend → Next.js API Layer → Zod Validation → React Components → UI
\`\`\`

### Request Flow

1. User interaction triggers navigation or search
2. Next.js router handles URL changes
3. Server Components fetch data from backend API
4. Zod schemas validate API responses
5. Validated data passed to UI components
6. Components render with proper error handling

### Error Handling Flow

\`\`\`
API Error → ApiError Class → Error Boundary → User-Friendly Message
\`\`\`

## API Integration

### Base Configuration

\`\`\`typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
\`\`\`

### Error Handling Strategy

- Custom `ApiError` class for structured error handling
- HTTP status code mapping to user messages
- Retry mechanisms for transient failures
- Graceful degradation for partial data

### Caching Strategy

- 5-minute cache for API responses using Next.js `revalidate`
- Client-side state management for search and pagination
- URL-based state persistence

## Component Design Patterns

### 1. Server Components (Default)

Used for:

- Initial data fetching
- SEO-critical content
- Static layouts

\`\`\`typescript
// app/page.tsx
export default async function HomePage({ searchParams }: PageProps) {
const params = await searchParams
// Server-side data fetching
}
\`\`\`

### 2. Client Components

Used for:

- Interactive elements (search, pagination)
- State management
- Event handlers

\`\`\`typescript
"use client"
// components/search-bar.tsx
export function SearchBar({ initialSearch }: SearchBarProps) {
const [search, setSearch] = useState(initialSearch)
// Client-side interactivity
}
\`\`\`

### 3. Suspense Boundaries

- Granular loading states
- Error isolation
- Progressive rendering

\`\`\`typescript
<Suspense fallback={<CharacterListSkeleton />}>
<CharacterList search={search} page={page} />
</Suspense>
\`\`\`

## State Management

### URL as Single Source of Truth

- Search parameters stored in URL
- Pagination state in URL
- Shareable and bookmarkable states

### Client State Patterns

\`\`\`typescript
// Search state management
const [search, setSearch] = useState(initialSearch)
const [isPending, startTransition] = useTransition()

// Navigation with state
const handleSearch = (value: string) => {
startTransition(() => {
const params = new URLSearchParams(searchParams)
if (value) {
params.set("search", value)
} else {
params.delete("search")
}
router.push(`/?${params.toString()}`)
})
}
\`\`\`

## Performance Optimizations

### 1. Bundle Optimization

- Tree-shaking with ES modules
- Dynamic imports for large components
- Code splitting at route level

### 2. Image Optimization

- Next.js Image component with automatic optimization
- Responsive images with proper sizing
- Lazy loading for off-screen content

### 3. Rendering Optimization

- Server Components reduce client-side JavaScript
- Streaming with Suspense boundaries
- Efficient re-rendering with proper React keys

### 4. Network Optimization

- API response caching
- Pagination to limit data transfer
- Debounced search to reduce API calls

## Testing Strategy

### Unit Testing

\`\`\`typescript
// Component testing with React Testing Library
describe('CharacterCard', () => {
it('renders character information correctly', () => {
render(<CharacterCard character={mockCharacter} />)
expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
})
})
\`\`\`

### Integration Testing

\`\`\`typescript
// API integration testing
describe('fetchCharacters', () => {
it('fetches characters successfully', async () => {
mockFetch.mockResolvedValueOnce({
ok: true,
json: async () => mockResponse,
})
const result = await fetchCharacters()
expect(result).toEqual(mockResponse)
})
})
\`\`\`

### Test Coverage Goals

- Components: 90%+ coverage
- API functions: 100% coverage
- Critical user flows: E2E testing
- Accessibility: Automated a11y testing

## Security Considerations

### 1. Input Validation

- Zod schemas validate all external data
- URL parameter sanitization
- XSS prevention through React's built-in escaping

### 2. API Security

- Environment variable configuration
- No sensitive data in client-side code
- CORS handling at API level

### 3. Content Security

- Next.js built-in security headers
- Secure image loading with crossOrigin
- Safe external link handling

## Deployment Architecture

### Build Process

\`\`\`bash
npm run build # Next.js optimized production build
npm start # Production server
\`\`\`

### Environment Configuration

\`\`\`env

# Development

NEXT_PUBLIC_API_URL=http://localhost:5000

# Production

NEXT_PUBLIC_API_URL=https://api.starwars-app.com
\`\`\`

### Monitoring and Analytics

- Error tracking with built-in error boundaries
- Performance monitoring with Next.js analytics
- User interaction tracking (optional)

## Scalability Considerations

### 1. Code Organization

- Feature-based folder structure
- Reusable component library
- Centralized type definitions

### 2. Performance Scaling

- CDN integration for static assets
- Database query optimization at API level
- Horizontal scaling with stateless architecture

### 3. Development Scaling

- TypeScript for large team collaboration
- Comprehensive testing suite
- Clear documentation and code comments

## Browser Support

### Target Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Progressive Enhancement

- Core functionality without JavaScript
- Enhanced experience with modern features
- Graceful degradation for older browsers

## Accessibility Implementation

### WCAG 2.1 Compliance

- AA level compliance target
- Semantic HTML structure
- Proper ARIA labels and roles

### Keyboard Navigation

- Tab order optimization
- Focus management
- Keyboard shortcuts for common actions

### Screen Reader Support

- Descriptive alt text for images
- Screen reader only content with sr-only class
- Proper heading hierarchy

## Future Enhancements

### Planned Features

1. **Advanced Filtering**: Filter by species, homeworld, etc.
2. **Favorites System**: Save favorite characters
3. **Comparison Tool**: Compare multiple characters
4. **Offline Support**: PWA capabilities
5. **Real-time Updates**: WebSocket integration

### Technical Improvements

1. **Micro-frontends**: Split into smaller applications
2. **GraphQL**: More efficient data fetching
3. **Advanced Caching**: Redis integration
4. **Monitoring**: APM integration
5. **A/B Testing**: Feature flag system

This technical documentation provides a comprehensive overview of the application's architecture, design decisions, and implementation details. It serves as a reference for developers working on the project and documents the rationale behind key technical choices.
