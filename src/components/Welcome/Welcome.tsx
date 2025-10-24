import React, { useEffect, useRef } from 'react';
import './Welcome.css';

const Welcome: React.FC = () => {
  const elementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = elementsRef.current?.querySelectorAll<HTMLElement>(
      '.cosmic-success, .main-title, .subtitle, .cosmic-button, .community-galaxy'
    );

    elements?.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(40px)';
      element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 300 + (index * 200));
    });

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const stars = document.querySelectorAll<HTMLElement>('.star');
      const particles = document.querySelectorAll<HTMLElement>('.particle');
      
      stars.forEach((star, index) => {
        const speed = 0.2 + (index * 0.1);
        star.style.transform = `translateY(${scrolled * speed}px)`;
      });
      
      particles.forEach((particle, index) => {
        const speed = 0.3 + (index * 0.15);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="galaxy-background">
        <div className="stars">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="star" />
          ))}
        </div>
        <div className="cosmic-particles">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>
      </div>

      <div className="main-container">
        <div className="content-wrapper" ref={elementsRef}>
          <div className="cosmic-success">
            <div className="cosmic-ring"></div>
            <div className="cosmic-ring"></div>
            <div className="success-core">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z" />
              </svg>
            </div>
          </div>

          <h1 className="main-title">
            Obrigado por se juntar à <span className="cosmic-highlight">jornada</span>!
          </h1>
          
          <p className="subtitle">
            Você deu o primeiro passo para revolucionar suas streams. Explore as ferramentas e leve seu conteúdo para o próximo nível da galáxia do streaming.
          </p>

          <button 
            className="cosmic-button"
            onMouseDown={(e) => {
              const button = e.currentTarget;
              const rect = button.getBoundingClientRect();
              const size = Math.max(rect.width, rect.height);
              const ripple = document.createElement('div');
              
              ripple.style.position = 'absolute';
              ripple.style.borderRadius = '50%';
              ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.4), transparent)';
              ripple.style.transform = 'scale(0)';
              ripple.style.animation = 'cosmicRipple 0.8s ease-out';
              ripple.style.width = size + 'px';
              ripple.style.height = size + 'px';
              ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
              ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
              ripple.style.pointerEvents = 'none';
              
              button.appendChild(ripple);
              setTimeout(() => ripple.remove(), 800);
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M13,2.05V5.08C16.39,5.57 19,8.47 19,12C19,12.9 18.82,13.75 18.5,14.54L21.12,16.07C21.68,14.83 22,13.45 22,12C22,6.82 18.05,2.55 13,2.05M12,19A7,7 0 0,1 5,12C5,8.47 7.61,5.57 11,5.08V2.05C5.94,2.55 2,6.81 2,12A10,10 0 0,0 12,22C15.3,22 18.23,20.39 20.07,17.93L17.45,16.4C16.17,18.03 14.21,19 12,19Z" />
            </svg>
            Comece a Usar o StreamerTools
          </button>

          <div className="community-galaxy">
            <h3 className="community-title">Junte-se à Nossa Constelação</h3>
            <p className="community-text">
              O StreamerTools é feito para a comunidade. Acompanhe o desenvolvimento, compartilhe ideias e veja novidades em primeira mão!
            </p>
            <div className="twitter-section">
              <a href="https://x.com/athedsx" target="_blank" rel="noopener noreferrer" className="twitter-link">
                <svg className="twitter-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Me siga no X
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
