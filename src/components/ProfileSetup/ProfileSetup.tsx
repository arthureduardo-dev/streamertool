// src/components/ProfileSetup/ProfileSetup.tsx
import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import './ProfileSetup.css';

// Interface para os dados do perfil a serem enviados para o App
interface ProfileData {
  nickname: string;
  avatarSrc: string | null;
}

// Atualiza a interface de Props para esperar uma função que recebe ProfileData
interface ProfileSetupProps {
  onComplete: (data: ProfileData) => void;
}

// Atualiza a definição do componente para usar a nova interface
const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [nickname, setNickname] = useState<string>('');
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileSetupRef = useRef<HTMLDivElement>(null);

  const isButtonDisabled = !nickname.trim() || isSaving || isSaved;

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatarSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    if (isSaved) setIsSaved(false);
  };

  const handleSave = () => {
    if (isButtonDisabled) return;
    setIsSaving(true);

    // Simula o salvamento
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      const profileData: ProfileData = {
          nickname: nickname.trim(),
          avatarSrc: avatarSrc
      };
      console.log('ProfileSetup: Profile saved:', profileData);

      // Chama onComplete após mostrar "Salvo!" e passa os dados
      setTimeout(() => {
        console.log("ProfileSetup: Calling onComplete with data...", profileData);
        onComplete(profileData); // Passa os dados do perfil para o App
      }, 1000); // Atraso para o usuário ver "Perfil Salvo!"

    }, 1500); // Tempo de simulação de salvamento
  };

  useEffect(() => {
    // Animação de entrada (sem alterações aqui)
    const elements = profileSetupRef.current?.querySelectorAll<HTMLElement>(
      '.avatar-section, .typography-section, .form-section, .action-section'
    );
    elements?.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      element.style.transitionDelay = `${index * 0.1}s`;

      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100);
    });
  }, []);

  return (
    <div className="profile-setup-page">
      {/* Background Elements */}
      <div className="galaxy-background">
          <div className="stars">{[...Array(8)].map((_, i) => <div key={i} className="star"></div>)}</div>
          <div className="cosmic-particles">{[...Array(4)].map((_, i) => <div key={i} className="particle"></div>)}</div>
       </div>

       {/* Main Content */}
       <div className="main-container">
         <div className="profile-setup" ref={profileSetupRef}>
            {/* Avatar Section */}
            <div className="avatar-section">
               <div
                 className={`avatar-container ${avatarSrc ? 'has-image' : ''}`}
                 onClick={handleAvatarClick}
                 role="button"
                 tabIndex={0}
                 aria-label="Upload profile picture"
                 onKeyPress={(e) => { if (e.key === 'Enter') handleAvatarClick(); }}
               >
                 {avatarSrc ? (
                   <img src={avatarSrc} alt="Avatar Preview" className="avatar-image" />
                 ) : (
                   <div className="avatar-placeholder">
                     {/* Placeholder SVG */}
                     <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A3,3 0 0,1 15,5V9A3,3 0 0,1 12,12A3,3 0 0,1 9,9V5A3,3 0 0,1 12,2M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>
                   </div>
                 )}
                 <div className="upload-overlay">
                   {/* Upload Icon SVG */}
                   <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"/></svg>
                 </div>
               </div>
               <button className="upload-button" onClick={handleAvatarClick}>
                 Upload Foto de Perfil
               </button>
               <input type="file" ref={fileInputRef} className="file-input" accept="image/*" onChange={handleFileChange} />
            </div>

           {/* Typography Section */}
           <div className="typography-section">
             <h1 className="main-title">Personalize seu Perfil</h1>
             <p className="subtitle">Este nome e avatar serão usados em seus widgets e torneios.</p>
           </div>

           {/* Form Section */}
           <div className="form-section">
             <div className="input-group">
               <label className="input-label" htmlFor="nickname">Nickname</label>
               <div className="input-container">
                  <input type="text" id="nickname" className="text-input" placeholder="Ex: StreamerPro" maxLength={20} value={nickname} onChange={handleNicknameChange} />
                 {/* Input Icon SVG */}
                 <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>
               </div>
             </div>
           </div>

           {/* Action Section */}
           <div className="action-section">
             <button
               className={`primary-button ${isSaved ? 'saved' : ''}`}
               onClick={handleSave}
               disabled={isButtonDisabled}
             >
               {isSaving ? 'Salvando...' : (isSaved ? 'Perfil Salvo!' : 'Salvar e Continuar')}
             </button>
           </div>
         </div>
       </div>
    </div>
  );
};

export default ProfileSetup;