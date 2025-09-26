# ResearchNest

A production-ready React frontend application for managing academic research progress with role-based dashboards and hierarchical progress tracking.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication with localStorage token storage
- Role-based access control (Student, Faculty, Admin)
- Protected routes with automatic redirects
- Demo accounts for testing

### 📊 Student Dashboard
- Hierarchical progress tracker (Milestones → Stages → Tasks → Subtasks)
- Interactive progress bars and status indicators
- Real-time progress updates
- Activity timeline and upcoming deadlines
- Expandable/collapsible progress tree

### 👨‍🏫 Faculty/Admin Dashboard
- Overview of all supervised students
- Search and filter functionality
- Individual student progress monitoring
- Faculty override capabilities for progress status
- Student performance analytics

### 🎨 Modern UI/UX
- Clean, responsive design with Tailwind CSS
- Mobile-first approach
- Dark/light theme support via CSS variables
- Accessible components using shadcn/ui
- Professional color scheme (blue, indigo, slate)

### 🚀 Production Ready
- Vercel deployment optimized
- Environment variable configuration
- Mock API with realistic data structures
- TypeScript for type safety
- Error handling and loading states

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Axios (ready for real API integration)
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd researchnest
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
VITE_API_URL=http://localhost:3001/api
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Demo Accounts

Use these credentials to test different roles:

| Role | Email | Password |
|------|-------|----------|
| Student | student@test.com | password |
| Faculty | faculty@test.com | password |
| Admin | admin@test.com | password |

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Navbar.tsx       # Navigation component
│   ├── ProgressTracker.tsx # Hierarchical progress component
│   └── ProtectedRoute.tsx  # Route protection wrapper
├── contexts/            # React context providers
│   └── AuthContext.tsx  # Authentication state management
├── pages/               # Page components
│   ├── Login.tsx        # Login page
│   ├── Register.tsx     # Registration page
│   ├── StudentDashboard.tsx    # Student dashboard
│   ├── FacultyDashboard.tsx    # Faculty dashboard
│   ├── Profile.tsx      # User profile page
│   └── Unauthorized.tsx # Access denied page
├── types/               # TypeScript type definitions
│   └── progress.ts      # Progress tracking types
├── data/                # Mock data and API responses
│   └── mockData.ts      # Sample student progress data
└── styles/              # Global styles
    └── globals.css      # Tailwind configuration and variables
```

## API Integration

The application is designed to work with RESTful APIs. Mock implementations are provided in `contexts/AuthContext.tsx` and throughout the application.

### Expected API Endpoints

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/students/progress` - Get student progress
- `PUT /api/progress/update` - Update progress status
- `GET /api/faculty/students` - Get supervised students

### API Response Formats

Authentication response:
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "student|faculty|admin"
  }
}
```

Progress data format matches the TypeScript interfaces in `types/progress.ts`.

## Deployment to Vercel

### Option 1: Deploy from Git Repository

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL`: Your backend API URL
4. Deploy automatically on push

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
vercel --prod
```

### Environment Variables for Production

Set these in your Vercel dashboard or `.env.production`:

```env
VITE_API_URL=https://your-api-domain.com/api
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint configuration for React and TypeScript
- Prettier for code formatting
- Consistent naming conventions

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## Progress Tracking System

The application implements a 4-level hierarchical progress tracking system:

1. **Milestones** - Major research phases (e.g., "Data Collection Phase")
2. **Stages** - Sub-phases within milestones (e.g., "Pilot Study")
3. **Tasks** - Specific activities (e.g., "Recruit Participants")
4. **Subtasks** - Individual action items (e.g., "Create recruitment materials")

Each level can have one of three statuses:
- `not_started` - Not yet begun
- `in_progress` - Currently active
- `completed` - Finished

Progress is calculated automatically based on completion ratios at each level.

## Security Considerations

- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- Input validation on all forms
- Role-based access control enforced on routes
- Environment variables for sensitive configuration
- No sensitive data in client-side code

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed description
4. Include browser console errors if applicable

## Roadmap

- [ ] Real-time notifications
- [ ] File upload for research documents
- [ ] Calendar integration for deadlines
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Offline support with PWA
- [ ] Integration with research tools (Zotero, Mendeley)