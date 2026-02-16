# Productivity Suite - Frontend

A modern React application featuring a Pomodoro timer, todo list, and note-taking system with TypeScript and responsive design.

## Overview

This is the frontend portion of the Productivity Suite, built with React 18 and TypeScript. It provides an intuitive, responsive interface that combines three essential productivity tools: a Pomodoro timer for time management, a todo list for task tracking, and a notes system for capturing ideas. The application demonstrates modern React patterns including hooks, component composition, memoization, and efficient state management with TypeScript for type safety.

## Live Demo

**Live Site:** [Frontend URL](https://productivity-app-frontend-eta.vercel.app/)  

## Features

### Pomodoro Timer
- **25/5 Minute Sessions** - Standard Pomodoro technique timing
- **Visual Session Indicator** - Color-coded work vs break periods
- **Session Counter** - Tracks completed Pomodoro cycles
- **Browser Notifications** - Desktop alerts when sessions complete
- **Timer Controls** - Start, pause, reset, and skip functionality
- **Auto-Transition** - Automatically switches between work and break
- **Client-Side Logic** - No backend calls, runs entirely in browser

### Todo List
- **Add Tasks** - Simple form to create new todos
- **Mark Complete** - Checkbox with strikethrough styling
- **Edit Inline** - Update task titles with prompt dialog
- **Delete Tasks** - Remove unwanted items
- **Optimistic Updates** - Immediate UI feedback
- **Error Handling** - User-friendly error messages
- **Loading States** - Shows loading indicator on initial fetch
- **API Integration** - Full CRUD operations with backend

### Notes System
- **Quick Creation** - Textarea for fast note capture
- **Auto-Timestamps** - Displays creation/update times
- **Edit Functionality** - Modify existing notes
- **Delete Notes** - Remove unwanted entries
- **Sorted Display** - Most recent notes first
- **API Integration** - Persistent storage via backend

### Component Architecture
- **Memoized Components** - TodoItem and NoteItem use React.memo
- **Custom Hooks** - useEffect, useState, useCallback patterns
- **Prop Drilling Prevention** - Clean callback patterns
- **Type Safety** - Full TypeScript coverage
- **Separation of Concerns** - UI logic separated from API calls

### User Experience
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Loading States** - Clear feedback during data fetching
- **Error Boundaries** - Graceful error handling
- **Accessibility** - Semantic HTML and ARIA attributes
- **Clean Interface** - Minimalist design focusing on productivity

## Architecture

```
┌─────────────────────────────────┐
│         React Application       │
│                                 │
│  ┌───────────────────────────┐ │
│  │   App.tsx (Main Layout)   │ │
│  │                           │ │
│  │  ┌─────────────────────┐ │ │
│  │  │  PomodoroTimer      │ │ │
│  │  │  (Client-side only) │ │ │
│  │  └─────────────────────┘ │ │
│  │                           │ │
│  │  ┌─────────────────────┐ │ │
│  │  │    TodoList         │ │ │
│  │  │  ├─ API calls       │ │ │
│  │  │  └─ TodoItem (memo) │ │ │
│  │  └─────────────────────┘ │ │
│  │                           │ │
│  │  ┌─────────────────────┐ │ │
│  │  │    NotesList        │ │ │
│  │  │  ├─ API calls       │ │ │
│  │  │  └─ NoteItem (memo) │ │ │
│  │  └─────────────────────┘ │ │
│  └───────────────────────────┘ │
└────────────┬────────────────────┘
             │
             │ Fetch API
             ▼
┌─────────────────────────────────┐
│      Backend REST API           │
│      /todos  /notes             │
└─────────────────────────────────┘
```

### State Management

**Pomodoro Timer:**
- `timeLeft` - Current seconds remaining
- `isRunning` - Timer active/paused state
- `sessionType` - 'work' or 'break'
- `completedSessions` - Count of finished work sessions

**Todo List:**
- `todos` - Array of todo objects from API
- `isLoading` - Loading state during initial fetch
- `error` - Error message if API fails
- `newTodo` - Controlled input for new task

**Notes List:**
- `notes` - Array of note objects from API
- `content` - Controlled textarea for new note

### Component Communication

```
App.tsx
  │
  ├── PomodoroTimer (isolated)
  │   └── Internal state only
  │
  ├── TodoList (parent)
  │   ├── Manages todos state
  │   ├── API calls
  │   └── TodoItem (child)
  │       └── Receives callbacks via props
  │
  └── NotesList (parent)
      ├── Manages notes state
      ├── API calls
      └── NoteItem (child)
          └── Receives callbacks via props
```

## Tech Stack

### Core Technologies
- **React 18** - UI library with concurrent features
- **TypeScript** - Type-safe JavaScript superset
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with custom properties

### React Patterns
- **Hooks** - useState, useEffect, useCallback
- **Memoization** - React.memo for performance
- **Functional Components** - Modern React approach
- **Controlled Components** - Form inputs managed by state

### Browser APIs
- **Fetch API** - HTTP requests to backend
- **Notifications API** - Desktop alerts for timer
- **Web Storage API** - Potential for offline caching
- **Service Worker** - Future PWA support

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript Compiler** - Type checking
- **Vite HMR** - Hot module replacement for fast development

## Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running (see backend README)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd productivity-app/productivity-app-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   
   Create a `.env` file in the frontend root:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

   **Note:** Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Application will start on `http://localhost:5173`

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## Deployment

### Vercel (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your repository

3. **Configure build settings**
   - Framework Preset: `Vite`
   - Root Directory: `productivity-app-frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add environment variable**
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-api.com`

5. **Deploy**
   - Vercel will automatically deploy
   - Future pushes trigger automatic deployments

### Netlify

1. **Via Git:**
   - Connect repository on Netlify
   - Base directory: `productivity-app-frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Via CLI:**
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod
   ```

3. **Add environment variables** in Netlify dashboard

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure base path** in `vite.config.js`:
   ```javascript
   export default {
     base: '/productivity-app/'
   }
   ```

### Other Platforms

- **Firebase Hosting**
- **AWS S3 + CloudFront**
- **Render Static Site**
- **Surge.sh**

## Project Structure

```
productivity-app-frontend/
├── public/
│   └── productivity.svg         # App icon/logo
│
├── src/
│   ├── components/
│   │   ├── PomodoroTimer.tsx   # Timer component
│   │   ├── TodoList.tsx        # Todo parent component
│   │   ├── TodoItem.tsx        # Individual todo (memoized)
│   │   ├── NotesList.tsx       # Notes parent component
│   │   └── NoteItem.tsx        # Individual note (memoized)
│   │
│   ├── config/
│   │   └── api.ts              # API base URL configuration
│   │
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # Global styles
│   ├── main.tsx                # React entry point
│   └── types.ts                # TypeScript interfaces
│
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint rules
└── .env                        # Environment variables
```

## Component Details

### App.tsx

Main application layout and structure.

**Responsibilities:**
- Renders header with title and subtitle
- Lays out three main sections
- Provides overall styling structure

**Layout:**
```jsx
<main className="app-container">
  <header className="app-header">
    <h1>Productivity Suite</h1>
    <p className="header-subtitle">Focus • Organize • Create</p>
  </header>
  
  <div className="main-layout">
    <div className="timer-wrapper">
      <PomodoroTimer />
    </div>
    
    <div className="content-grid">
      <TodoList />
      <NotesList />
    </div>
  </div>
</main>
```

### PomodoroTimer.tsx

Standalone timer component with no external dependencies.

**Features:**
- 25-minute work sessions
- 5-minute break sessions
- Browser notifications (with permission)
- Session counter
- Auto-transition between sessions

**Key Hooks:**
```typescript
const [timeLeft, setTimeLeft] = useState(WORK_TIME);
const [isRunning, setIsRunning] = useState(false);
const [sessionType, setSessionType] = useState<SessionType>("work");
const [completedSessions, setCompletedSessions] = useState(0);

useEffect(() => {
  if (!isRunning) return;
  
  const intervalId = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        handleSessionComplete();
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  
  return () => clearInterval(intervalId);
}, [isRunning]);
```

### TodoList.tsx

Parent component managing todo state and API calls.

**Responsibilities:**
- Fetches todos from API on mount
- Handles create, update, delete operations
- Manages loading and error states
- Passes callbacks to TodoItem children

**Key Functions:**
```typescript
// Fetch todos on component mount
useEffect(() => {
  fetchTodos();
}, []);

// Optimistic update with error handling
const handleToggleTodo = useCallback(async (todo: Todo) => {
  try {
    const response = await fetch(`${API_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    const updated = await response.json();
    setTodos(prev => prev.map(t => t.id === updated.id ? updated : t));
  } catch (err) {
    setError(err.message);
  }
}, []);
```

### TodoItem.tsx

Memoized child component for individual todos.

**Props:**
```typescript
interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
}
```

**Optimization:**
```typescript
export default memo(TodoItem);
```

Prevents re-renders unless props change.

### NotesList.tsx

Parent component managing notes state and API calls.

**Responsibilities:**
- Fetches notes from API on mount
- Handles create, update, delete operations
- Sorts notes by most recent first
- Passes callbacks to NoteItem children

**Key Pattern:**
```typescript
async function addNote(e) {
  e.preventDefault();
  if (!content.trim()) return;
  
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  
  const note = await res.json();
  setNotes(prev => [note, ...prev]); // Prepend new note
  setContent(""); // Clear form
}
```

### NoteItem.tsx

Memoized child component for individual notes.

**Props:**
```typescript
interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}
```

**Display:**
- Note content
- Formatted timestamp
- Edit and delete buttons

## API Integration

### Configuration

API base URL is configured in `src/config/api.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export default API_URL;
```

### Fetch Patterns

**GET Request:**
```typescript
const response = await fetch(`${API_URL}/todos`);
const data = await response.json();
```

**POST Request:**
```typescript
const response = await fetch(`${API_URL}/todos`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: newTodo }),
});
const created = await response.json();
```

**PUT Request:**
```typescript
const response = await fetch(`${API_URL}/todos/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ completed: true }),
});
const updated = await response.json();
```

**DELETE Request:**
```typescript
await fetch(`${API_URL}/todos/${id}`, {
  method: "DELETE",
});
```

## TypeScript Types

### Interfaces

**Todo:**
```typescript
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```

**Note:**
```typescript
export interface Note {
  id: number;
  content: string;
  updated_at: string;
}
```

**Session Type:**
```typescript
type SessionType = "work" | "break";
```

## Styling

### CSS Architecture

**Global Styles (App.css):**
- CSS custom properties for theming
- Base typography
- Layout grid system
- Component-specific styles

**Key Variables:**
```css
:root {
  --primary-color: #3b82f6;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --bg-color: #ffffff;
  --text-color: #1f2937;
  --border-color: #e5e7eb;
}
```

**Responsive Design:**
```css
/* Mobile-first approach */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

/* Desktop layout */
@media (min-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr 1fr;
  }
}
```

## Performance Optimization

### Implemented Optimizations

1. **React.memo** - Prevents unnecessary re-renders of TodoItem and NoteItem
2. **useCallback** - Memoizes callback functions to prevent recreation
3. **Vite Code Splitting** - Automatic chunking for optimal loading
4. **Lazy Loading** - Components load on demand (future enhancement)

### Recommended Improvements

- [ ] Implement React.lazy for code splitting
- [ ] Add service worker for offline support
- [ ] Cache API responses in localStorage
- [ ] Debounce input fields
- [ ] Optimize images with WebP format
- [ ] Add skeleton loaders for better UX
- [ ] Implement virtual scrolling for long lists

## Browser Features

### Notifications API

**Permission Request:**
```typescript
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}
```

**Send Notification:**
```typescript
if (Notification.permission === 'granted') {
  new Notification("Work session complete!", {
    body: "Time for a 5-minute break!",
  });
}
```

**Browser Support:**
- Chrome ✓
- Firefox ✓
- Safari ✓ (with user interaction)
- Edge ✓

## Troubleshooting

### Development Issues

**Issue:** Vite dev server won't start

**Solutions:**
- Check if port 5173 is available
- Clear node_modules and reinstall
- Check for syntax errors in config files

---

**Issue:** Environment variables not working

**Solutions:**
- Ensure variable starts with `VITE_`
- Restart dev server after changing `.env`
- Check `import.meta.env.VITE_API_URL` syntax

---

**Issue:** API calls failing with CORS errors

**Solutions:**
- Verify backend is running
- Check CORS configuration on backend
- Ensure `VITE_API_URL` is correct
- Check browser console for exact error

---

**Issue:** TypeScript errors

**Solutions:**
- Run `npm run type-check` to see all errors
- Ensure types.ts is properly imported
- Check interface definitions match API responses

### Production Issues

**Issue:** White screen after deployment

**Solutions:**
- Check browser console for errors
- Verify environment variables are set
- Ensure base path is correct (for GitHub Pages)
- Check API URL is correct (HTTPS in production)

---

**Issue:** Notifications not working in production

**Solutions:**
- Ensure site uses HTTPS
- Check notification permissions
- Test in different browsers
- Verify no browser extensions blocking

## Testing

### Manual Testing Checklist

**Pomodoro Timer:**
- [ ] Start button begins countdown
- [ ] Pause button stops timer
- [ ] Reset returns to session default
- [ ] Skip moves to next session
- [ ] Notifications appear when allowed
- [ ] Session counter increments
- [ ] Colors change for work/break

**Todos:**
- [ ] Can add new todo
- [ ] Can mark todo complete
- [ ] Can edit todo title
- [ ] Can delete todo
- [ ] Empty input doesn't submit
- [ ] Loading state appears
- [ ] Error messages display

**Notes:**
- [ ] Can add new note
- [ ] Can edit note content
- [ ] Can delete note
- [ ] Timestamps display correctly
- [ ] Notes sort by most recent
- [ ] Empty textarea doesn't submit

### Automated Testing

**Framework recommendation:** Vitest + React Testing Library

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**Example test:**
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
  it('renders todo title', () => {
    const todo = { id: 1, title: 'Test Todo', completed: false };
    render(
      <TodoItem 
        todo={todo}
        onDelete={() => {}}
        onToggle={() => {}}
        onEdit={() => {}}
      />
    );
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });
});
```

## Accessibility

### Implemented Features

- Semantic HTML5 elements
- Proper heading hierarchy
- Form labels (even if visually hidden)
- Button text describes action
- Keyboard navigation support
- Focus states visible

### Future Improvements

- [ ] Add ARIA labels where needed
- [ ] Implement skip links
- [ ] Add keyboard shortcuts
- [ ] Improve color contrast ratios
- [ ] Add screen reader announcements
- [ ] Test with screen readers

## Future Enhancements

- [ ] Add user authentication
- [ ] Implement dark mode
- [ ] Add todo categories/tags
- [ ] Rich text editor for notes
- [ ] Todo drag-and-drop reordering
- [ ] Pomodoro statistics dashboard
- [ ] Export todos/notes to CSV
- [ ] Keyboard shortcuts
- [ ] Offline mode with service worker
- [ ] Progressive Web App (PWA)
- [ ] Mobile gesture support
- [ ] Custom Pomodoro durations
- [ ] Todo subtasks
- [ ] Note markdown support

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Follow existing code style
4. Write clear commit messages
5. Add tests for new features
6. Update documentation
7. Push to your fork
8. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**Harold Durant**  
Email: MrDurant2023@gmail.com  
GitHub: [@ROIEngineer](https://github.com/ROIEngineer)  
Portfolio: [Portfolio URL](https://portfolio-web-six-ashen.vercel.app/)

