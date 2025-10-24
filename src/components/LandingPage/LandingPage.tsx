// src/components/LandingPage/LandingPage.tsx
import React, { useEffect } from 'react';
import './LandingPage.css'; // Importa estilos específicos do componente

const LandingPage: React.FC = () => {
  useEffect(() => {
    // Handler do efeito ripple
    const handleRippleEffect = function (this: HTMLElement, e: MouseEvent) {
      const ripple = document.createElement('div');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute; border-radius: 50%; background: rgba(255,255,255,0.3);
        transform: scale(0); animation: ripple 0.6s linear;
        width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;
        pointer-events: none;
      `;

      this.style.position = this.style.position || 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    };

    const buttonsAndCtas = document.querySelectorAll('button, .nav-cta');
    buttonsAndCtas.forEach((el) => el.addEventListener('click', handleRippleEffect as EventListener));

    // Handler para o botão 'Explore' — rola até a seção de features
    const exploreButton = document.querySelector('.action-secondary');
    const handleExploreClick = (e: Event) => {
      e.preventDefault();
      const target = document.getElementById('features');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (exploreButton) exploreButton.addEventListener('click', handleExploreClick);

    return () => {
      buttonsAndCtas.forEach((el) => el.removeEventListener('click', handleRippleEffect as EventListener));
      if (exploreButton) exploreButton.removeEventListener('click', handleExploreClick);
    };
  }, []);

  return (
    <>
      <div className="cosmic-background">
        <div className="energy-grid" />
        <div className="floating-orbs">
          <div className="orb" />
          <div className="orb" />
          <div className="orb" />
        </div>
  <div className="lightning-bolt lb-1" />
  <div className="lightning-bolt lb-2" />
      </div>

      <div className="app-container">
        <nav className="navbar">
          <div className="brand">
            <div className="brand-icon">
              {/* Modern ST Monogram Logo */}
              <svg width="24" height="24" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#A020F0' }} />
                    <stop offset="50%" style={{ stopColor: '#bf5fff' }} />
                    <stop offset="100%" style={{ stopColor: '#DA70D6' }} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#glow)">
                  {/* S letter */}
                  <path fill="white" d="M14 6c0-.83-.67-1.5-1.5-1.5h-4C7.67 4.5 7 5.17 7 6v2c0 .83.67 1.5 1.5 1.5H12v3c0 .83-.67 1.5-1.5 1.5h-3c-.83 0-1.5.67-1.5 1.5v2c0 .83.67 1.5 1.5 1.5h4c.83 0 1.5-.67 1.5-1.5v-2c0-.83-.67-1.5-1.5-1.5H8v-1h2.5c.83 0 1.5-.67 1.5-1.5V8c0-.83-.67-1.5-1.5-1.5H8V5h4.5V6z"/>
                  {/* T letter */}
                  <path fill="white" d="M17 4.5h-5v2h1.5v13c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-13H18v-2z"/>
                </g>
              </svg>
            </div>
            <span className="brand-text">StreamerTools</span>
          </div>
          <div className="nav-actions">
            <a href="#" className="nav-cta">
              Começar Agora
            </a>
          </div>
        </nav>

        <div className="main-content-scroll">
          <section className="hero-section">
            <div className="hero-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.09,8.59L17.5,10L11,16.5Z" />
              </svg>
              Plataforma Completa para Streamers
            </div>

            <h1 className="hero-title">
              Revolucione sua Experiência de <span className="hero-highlight">Streaming</span>
            </h1>

            <p className="hero-subtitle">
              Gerencie torneios, otimize sua agenda de lives e customize widgets para OBS, tudo em um só
              lugar. Foco total em você e sua comunidade.
            </p>

            <div className="hero-actions">
              <button className="action-primary">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
                Comece sua Jornada
              </button>
              <button className="action-secondary">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
                Explore as Funcionalidades
              </button>
            </div>
          </section>

          <section className="features-section" id="features">
            <div className="features-header">
              <h2 className="features-title">Ferramentas Poderosas</h2>
              <p className="features-subtitle">Tudo que você precisa para levar seu streaming ao próximo nível</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,16L3,5H1V3H4L6,14H18.5L19.5,12H8.5L7.5,10H21L19,14H7L8,16H19V18H6.5C5.67,18 5,17.33 5,16.5C5,16.22 5.22,16 5.5,16H5M7,22A2,2 0 0,1 5,20A2,2 0 0,1 7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22M17,22A2,2 0 0,1 15,20A2,2 0 0,1 17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22Z" />
                  </svg>
                </div>
                <h3 className="feature-title">Torneios Dinâmicos</h3>
                <p className="feature-description">
                  Organize campeonatos e eventos com rankings automáticos e gestão completa de participantes em
                  tempo real.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V8H19V19M19,6H5V5H19V6M9,10V12H7V10H9M15,10V12H13V10H15M9,14V16H7V14H9M15,14V16H13V14H15Z" />
                  </svg>
                </div>
                <h3 className="feature-title">Agenda de Lives Otimizada</h3>
                <p className="feature-description">
                  Planeje, agende e notifique sua comunidade sem esforço com ferramentas inteligentes de
                  programação.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z" />
                  </svg>
                </div>
                <h3 className="feature-title">Widgets Exclusivos para OBS</h3>
                <p className="feature-description">
                  Personalize sua transmissão com alertas e informações em tempo real totalmente customizáveis.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;