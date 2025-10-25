// src/components/Dashboard/Dashboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import TournamentDashboard from '../TournamentDashboard/TournamentDashboard'; // Importa o novo componente
import './Dashboard.css';

interface DashboardProps {
  nickname: string;
  avatarSrc: string | null;
}

// Define os tipos para as seções da sidebar
type ActiveSection = 'inicio' | 'torneios' | 'agenda' | 'widgets' | 'notas';

const Dashboard: React.FC<DashboardProps> = ({ nickname, avatarSrc }) => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  // Estado para controlar qual seção está visível
  const [activeSection, setActiveSection] = useState<ActiveSection>('inicio');

  // Função para mudar a seção ativa
  const handleNavClick = (section: ActiveSection, event: React.MouseEvent) => {
    event.preventDefault(); // Impede a navegação padrão do link '#'
    setActiveSection(section);
  };


  useEffect(() => {
    // Animação de entrada suave para os elementos do dashboard
    const elements = dashboardRef.current?.querySelectorAll<HTMLElement>(
      '.sidebar, .main-content-area > *:not(.conditional-content)' // Anima sidebar e header
    );

    elements?.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      element.style.transitionDelay = `${index * 0.08}s`;

      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 50);
    });

    // Efeito Parallax (opcional)
    const handleMouseMove = (e: MouseEvent) => {
        const background = dashboardRef.current?.querySelector<HTMLElement>('.nebula-background');
        if (background) {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 15;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
            background.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);

  }, []);

   // Animação para o conteúdo que muda (placeholders ou TournamentDashboard)
   useEffect(() => {
    const contentElements = dashboardRef.current?.querySelectorAll<HTMLElement>(
        '.conditional-content > *' // Anima os filhos do container condicional
    );
     contentElements?.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(15px)'; // Animação um pouco diferente
        element.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        element.style.transitionDelay = `${0.1 + index * 0.06}s`; // Delay inicial + incremental

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 60); // Inicia um pouco depois da sidebar/header
    });
   }, [activeSection]); // Reexecuta a animação quando a seção muda


  return (
    <div className="dashboard-layout" ref={dashboardRef}>
      {/* Background Galáctico */}
      <div className="nebula-background">
        <div className="stars-layer"></div>
        <div className="dust-layer"></div>
      </div>

      {/* Sidebar de Navegação */}
      <aside className="sidebar">
        {/* Header da Sidebar com Perfil */}
        <div className="sidebar-header profile-header">
           {/* ... (código do perfil como antes) ... */}
           <div className="profile-avatar-container">
            {avatarSrc ? (
              <img src={avatarSrc} alt={`${nickname}'s avatar`} className="profile-avatar" />
            ) : (
              <div className="profile-avatar-placeholder">
                 <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A3,3 0 0,1 15,5V9A3,3 0 0,1 12,12A3,3 0 0,1 9,9V5A3,3 0 0,1 12,2M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>
              </div>
            )}
          </div>
          <span className="profile-nickname">{nickname || 'Usuário'}</span>
        </div>

        {/* Navegação Principal - Adiciona onClick */}
        <nav className="sidebar-nav">
          <ul>
            {/* Adiciona classe 'active' baseada no estado 'activeSection' e onClick */}
            <li className={`nav-item ${activeSection === 'inicio' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => handleNavClick('inicio', e)}>
                <svg viewBox="0 0 24 24"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>
                <span>Início</span>
              </a>
            </li>
            <li className={`nav-item ${activeSection === 'torneios' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => handleNavClick('torneios', e)}>
                <svg viewBox="0 0 24 24"><path d="M18,17H6V15H18M18,13H6V11H18M18,9H6V7H18M3,21V3A2,2 0 0,1 5,1H19A2,2 0 0,1 21,3V21A2,2 0 0,1 19,23H5A2,2 0 0,1 3,21Z" /></svg>
                <span>Torneios</span>
              </a>
            </li>
            <li className={`nav-item ${activeSection === 'agenda' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => handleNavClick('agenda', e)}>
                <svg viewBox="0 0 24 24"><path d="M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.9 20.1,3 19,3M16.53,11.06L15.47,10L10.5,14.97L8.53,13L7.47,14.06L10.5,17.09L16.53,11.06Z" /></svg>
                <span>Agenda</span>
              </a>
            </li>
            <li className={`nav-item ${activeSection === 'widgets' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => handleNavClick('widgets', e)}>
                 <svg viewBox="0 0 24 24"><path d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20Z" /></svg>
                <span>Widgets OBS</span>
              </a>
            </li>
            <li className={`nav-item ${activeSection === 'notas' ? 'active' : ''}`}>
              <a href="#" onClick={(e) => handleNavClick('notas', e)}>
                <svg viewBox="0 0 24 24"><path d="M14,10H19.5L14,4.5V10M5,3H15L21,9V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.9 3.9,3 5,3M5,12V19H19V12H5Z" /></svg>
                <span>Notas</span>
              </a>
            </li>
          </ul>
        </nav>
        {/* Footer da Sidebar */}
        <div className="sidebar-footer">
          <span>v0.1.0 Alpha</span>
        </div>
      </aside>

      {/* Área Principal de Conteúdo */}
      <main className="main-content-area">
        {/* Renderização Condicional do Conteúdo */}
        {activeSection === 'inicio' && (
          <div className="conditional-content"> {/* Container para animação */}
            <header className="content-header">
              <h1 className="dashboard-title">Bem-vindo, {nickname || 'Streamer'}!</h1>
              <p>Seu painel central para gerenciar suas streams.</p>
            </header>
            <section className="dashboard-grid">
               {/* Placeholders da tela inicial */}
              <div className="dashboard-card quick-stats"><h2>Estatísticas Rápidas</h2><p>(Em breve)</p></div>
              <div className="dashboard-card upcoming-events"><h2>Próximos Eventos</h2><p>(Em breve)</p></div>
              <div className="dashboard-card widget-preview"><h2>Prévia de Widgets</h2><p>(Em breve)</p></div>
              <div className="dashboard-card quick-notes"><h2>Notas Rápidas</h2><p>(Em breve)</p></div>
            </section>
          </div>
        )}

        {activeSection === 'torneios' && (
           <div className="conditional-content"> {/* Container para animação */}
             <TournamentDashboard />
           </div>
        )}

        {/* Adicione placeholders para outras seções se desejar */}
        {activeSection === 'agenda' && (
           <div className="conditional-content"><header className="content-header"><h1>Agenda</h1><p>Planeje suas lives.</p></header><p>(Conteúdo da Agenda em breve)</p></div>
        )}
        {activeSection === 'widgets' && (
           <div className="conditional-content"><header className="content-header"><h1>Widgets OBS</h1><p>Configure seus widgets.</p></header><p>(Conteúdo dos Widgets em breve)</p></div>
        )}
        {activeSection === 'notas' && (
           <div className="conditional-content"><header className="content-header"><h1>Notas</h1><p>Suas anotações rápidas.</p></header><p>(Conteúdo das Notas em breve)</p></div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;