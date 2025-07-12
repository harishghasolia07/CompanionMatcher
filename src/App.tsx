import { useState, useEffect } from 'react';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import ReactPlugin from '@stagewise-plugins/react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { CreateProfile } from './components/CreateProfile';
import { MatchesView } from './components/MatchesView';
import { User, AppView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load current user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('friendFinder_currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser({
          ...user,
          createdAt: new Date(user.createdAt)
        });
      } catch (error) {
        console.error('Error loading current user from storage:', error);
        localStorage.removeItem('friendFinder_currentUser');
      }
    }
  }, []);

  const handleProfileCreated = (user: User) => {
    setCurrentUser(user);
    setCurrentView('matches');
    // Save current user to localStorage
    localStorage.setItem('friendFinder_currentUser', JSON.stringify(user));
    // Set flag to indicate user just created a profile
    sessionStorage.setItem('justCreatedProfile', 'true');
  };

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
  };


  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onViewChange={handleViewChange} />;
      case 'create-profile':
        return <CreateProfile onProfileCreated={handleProfileCreated} />;
      case 'matches':
        return <MatchesView currentUser={currentUser} />;
      default:
        return <HomePage onViewChange={handleViewChange} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation currentView={currentView} onViewChange={handleViewChange} />
        {renderCurrentView()}
      </div>
      <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
    </ThemeProvider>
  );
}

export default App;