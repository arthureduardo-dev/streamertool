// src/App.tsx
import { useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import ProfileSetup from './components/ProfileSetup/ProfileSetup';
import Welcome from './components/Welcome/Welcome';
import './index.css';

type PageState = 'landing' | 'profileSetup' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('landing');

  const navigateToProfileSetup = () => {
    console.log("App: Navigating to ProfileSetup..."); // Log
    setCurrentPage('profileSetup');
  };

  const navigateToDashboard = () => {
    console.log("App: Navigating to Dashboard..."); // Log
    setCurrentPage('dashboard');
  };

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage onNavigate={navigateToProfileSetup} />
      )}
      {currentPage === 'profileSetup' && (
        <ProfileSetup onComplete={navigateToDashboard} /> // Passa a função correta
      )}
      {currentPage === 'dashboard' && (
        <Welcome />
      )}
    </>
  );
}

export default App;
