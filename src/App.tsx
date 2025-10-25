// src/App.tsx
import { useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import ProfileSetup from './components/ProfileSetup/ProfileSetup';
import Dashboard from './components/Dashboard/Dashboard';
import './index.css';

// Define os possíveis estados da página
type PageState = 'landing' | 'profileSetup' | 'dashboard';

// Interface para os dados do perfil que virão do ProfileSetup
interface ProfileData {
  nickname: string;
  avatarSrc: string | null;
}

function App() {
  // Estado inicial da página
  const [currentPage, setCurrentPage] = useState<PageState>('landing');
  // Estados para armazenar os dados do perfil do usuário
  const [userNickname, setUserNickname] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  // Função para navegar para a configuração de perfil
  const navigateToProfileSetup = () => {
    console.log("App: Navigating to ProfileSetup...");
    setCurrentPage('profileSetup');
  };

  // Função para navegar para o dashboard (será chamada pelo ProfileSetup)
  const navigateToDashboard = () => {
    console.log("App: Navigating to Dashboard...");
    setCurrentPage('dashboard');
  };

  // Função chamada pelo ProfileSetup quando o perfil é salvo
  // Recebe os dados, atualiza o estado do App e então navega
  const handleProfileComplete = (data: ProfileData) => {
    console.log("App: Profile setup complete. Data received:", data);
    setUserNickname(data.nickname); // Armazena o nickname
    setUserAvatar(data.avatarSrc);   // Armazena o avatar
    navigateToDashboard(); // Navega para o dashboard *depois* de salvar os dados
  };

  return (
    <>
      {/* Renderiza LandingPage se currentPage for 'landing' */}
      {currentPage === 'landing' && (
        <LandingPage onNavigate={navigateToProfileSetup} />
      )}
      {/* Renderiza ProfileSetup se currentPage for 'profileSetup', passando a função handleProfileComplete */}
      {currentPage === 'profileSetup' && (
        <ProfileSetup onComplete={handleProfileComplete} />
      )}
      {/* Renderiza Dashboard se currentPage for 'dashboard', passando nickname e avatar como props */}
      {currentPage === 'dashboard' && (
        <Dashboard nickname={userNickname} avatarSrc={userAvatar} />
      )}
    </>
  );
}

export default App;