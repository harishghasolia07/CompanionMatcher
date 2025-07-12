# Companion Matcher 🤝

A modern React-based companion matching application that helps users find friends with similar interests. Built with TypeScript, Vite, and Tailwind CSS.

## 📋 Project Overview

Companion Matcher is a social networking application designed to connect people based on shared interests. Users can create profiles, specify their interests, and discover potential companions with similar hobbies and preferences. The app uses an intelligent matching algorithm that calculates compatibility scores based on common interests.

### Key Features

- **Profile Creation**: Create detailed profiles with name, age, and interests
- **Smart Matching**: Algorithm-based matching using interest overlap
- **Shortlisting**: Save favorite potential companions
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: Persistent data storage in the browser

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS with dark mode support
- **Icons**: Lucide React
- **Linting**: ESLint with TypeScript support
- **Development**: Hot module replacement for fast development

## 🚀 Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Companion Matcher"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173/` (or the next available port)

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## 🔗 API Routes & Services

Since this is a frontend-only application, it uses a client-side service architecture with local storage for data persistence.

### UserService API

The `UserService` class provides the following methods:

#### Create User
```typescript
createUser(userData: Omit<User, 'id' | 'createdAt'>): User
```
**Input:**
```json
{
  "name": "John Doe",
  "age": 25,
  "interests": ["tech", "music", "gaming"]
}
```
**Output:**
```json
{
  "id": "abc123def",
  "name": "John Doe",
  "age": 25,
  "interests": ["tech", "music", "gaming"],
  "createdAt": "2025-07-12T10:30:00.000Z"
}
```

#### Find Matches
```typescript
findMatches(currentUser: User, limit?: number): Match[]
```
**Input:**
```json
{
  "id": "abc123def",
  "name": "John Doe", 
  "age": 25,
  "interests": ["tech", "music", "gaming"],
  "createdAt": "2025-07-12T10:30:00.000Z"
}
```
**Output:**
```json
[
  {
    "user": {
      "id": "xyz789ghi",
      "name": "Jane Smith",
      "age": 24,
      "interests": ["tech", "music", "reading"],
      "createdAt": "2025-07-11T09:15:00.000Z"
    },
    "commonInterests": ["tech", "music"],
    "matchScore": 67
  }
]
```

#### Shortlist Management
```typescript
addToShortlist(userId: string): void
removeFromShortlist(userId: string): void
getShortlistedUsers(): string[]
isUserShortlisted(userId: string): boolean
```

### Data Models

#### User Interface
```typescript
interface User {
  id: string;          // Unique identifier
  name: string;        // User's display name
  age: number;         // User's age
  interests: string[]; // Array of interest categories
  createdAt: Date;     // Profile creation timestamp
}
```

#### Match Interface
```typescript
interface Match {
  user: User;                    // Matched user profile
  commonInterests: string[];     // Shared interests
  matchScore: number;           // Compatibility score (0-100)
}
```

#### Available Interest Categories
```typescript
const INTERESTS = [
  'tech', 'music', 'reading', 'coding', 'art', 'sports', 
  'gaming', 'fitness', 'movies', 'dancing', 'travel', 
  'photography', 'food', 'nature', 'writing', 'science'
];
```

## 📱 Application Views

### 1. Home Page
- Welcome message and application overview
- Call-to-action to create profile or view matches
- Navigation to different sections

### 2. Create Profile
- Form for entering user details (name, age)
- Multi-select interest picker with visual tags
- Profile validation and creation
- Automatic redirect to matches after creation

### 3. Matches View
- Display of compatible users based on current user's interests
- Match score calculation and display
- Common interests highlighting
- Shortlist functionality with heart icon toggle
- Empty state handling for no matches

### 4. Navigation
- Responsive navigation bar
- Theme toggle (dark/light mode)
- Active view highlighting
- Mobile-friendly design

## 💾 Data Storage

The application uses browser's Local Storage for data persistence:

- **Users**: `friendFinder_users` - Stores all user profiles
- **Current User**: `friendFinder_currentUser` - Stores active user session
- **Shortlist**: `friendFinder_shortlist` - Stores shortlisted user IDs
- **Theme**: Managed by ThemeContext with localStorage persistence

## 🎨 Styling & Theming

- **Tailwind CSS**: Utility-first CSS framework
- **Dark Mode**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Color Scheme**: Professional blue and gray palette
- **Typography**: Clean, readable font hierarchy

## 🧪 Development Notes

### Project Structure
```
src/
├── components/          # React components
│   ├── CreateProfile.tsx
│   ├── HomePage.tsx
│   ├── MatchesView.tsx
│   └── Navigation.tsx
├── contexts/           # React contexts
│   └── ThemeContext.tsx
├── data/              # Static data and sample users
│   ├── interests.ts
│   └── sampleUsers.ts
├── services/          # Business logic and data management
│   └── userService.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

### Key Development Features
- **Hot Module Replacement**: Instant updates during development
- **TypeScript**: Full type safety and IntelliSense support
- **ESLint**: Code quality and consistency enforcement
- **Vite**: Fast build tool with optimized development experience

## 🚀 Future Enhancements

- Backend API integration for real-time data
- User authentication and authorization
- Advanced matching algorithms (location, compatibility scoring)
- Real-time messaging between matched users
- Photo upload and profile images
- Filter and search functionality
- Push notifications for new matches
- Social media integration

## 📄 License

This project is part of an internship assignment and is for educational purposes.

---

**Happy Matching! 🎉**

For any questions or issues, please refer to the code documentation or create an issue in the repository.
