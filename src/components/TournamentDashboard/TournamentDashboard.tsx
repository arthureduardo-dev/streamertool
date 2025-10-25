// src/components/TournamentDashboard/TournamentDashboard.tsx
import React, { useState } from 'react';
import './TournamentDashboard.css';

// Interface básica para representar um torneio (pode ser expandida)
interface Tournament {
    id: string;
    name: string;
    status: 'Não Iniciado' | 'Em Andamento' | 'Finalizado';
    type: 'Eliminação Simples' | 'Eliminação Dupla' | 'Pontos Corridos'; // Exemplos
    participants: number; // Apenas a contagem por enquanto
}

const TournamentDashboard: React.FC = () => {
    // Estado para armazenar a lista de torneios (usaremos dados mockados por agora)
    const [tournaments, setTournaments] = useState<Tournament[]>([
        // Exemplo de dados mockados
        { id: 't1', name: 'Campeonato de Verão Starcraft', status: 'Em Andamento', type: 'Eliminação Dupla', participants: 16 },
        { id: 't2', name: 'Liga Mensal de Xadrez', status: 'Não Iniciado', type: 'Pontos Corridos', participants: 8 },
        { id: 't3', name: 'Copa Rápida de Tetris', status: 'Finalizado', type: 'Eliminação Simples', participants: 32 },
    ]);
    const [isLoading, setIsLoading] = useState(false); // Para simular carregamento/ações

    // TODO: Adicionar funções para criar, abrir, editar, deletar torneios
    const handleCreateTournament = () => {
        console.log("Abrir modal/tela de criação de torneio...");
        // Aqui você abriria uma modal ou navegaria para outra view
    };

    const handleOpenTournament = (id: string) => {
         console.log(`Abrir visualização do torneio ${id}...`);
         // Navegaria para a tela de visualização/edição do bracket/tabela
    };

    const handleDeleteTournament = (id: string) => {
        setIsLoading(true);
        console.log(`Deletar torneio ${id}...`);
        // Simula a deleção
        setTimeout(() => {
            setTournaments(prev => prev.filter(t => t.id !== id));
            setIsLoading(false);
        }, 800);
    };


    return (
        <div className="tournament-dashboard-container">
            <header className="content-header">
                {/* O título pode ter a animação shimmer também, se desejar */}
                <h1 /* className="dashboard-title" */>Gerenciador de Torneios</h1>
                <p>Crie, acompanhe e compartilhe seus campeonatos.</p>
            </header>

            <div className="tournament-actions">
                <button className="create-tournament-button" onClick={handleCreateTournament} disabled={isLoading}>
                    <svg viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                    Criar Novo Torneio
                </button>
            </div>

            {tournaments.length === 0 && !isLoading ? (
                <div className="empty-state">
                    <svg viewBox="0 0 24 24"><path d="M16,11.75V10.25L18,11L16,11.75M12,16H8V14H12M14,14H16V16H14M16,8H18V10H16M6,18H18V20H6M20,6H4V18C4,19.1 5.12,20 6.5,20H17.5C18.88,20 20,19.1 20,18V6M16,4H8V2H16V4Z" /></svg>
                    <p>Nenhum torneio encontrado. Comece criando um!</p>
                </div>
            ) : (
                <div className="tournament-list">
                    {tournaments.map(tournament => (
                        <div key={tournament.id} className="tournament-card">
                            <div className="tournament-card-header">
                                <h3>{tournament.name}</h3>
                                <span className={`status-badge status-${tournament.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {tournament.status}
                                </span>
                            </div>
                            <div className="tournament-card-body">
                                <p><strong>Tipo:</strong> {tournament.type}</p>
                                <p><strong>Participantes:</strong> {tournament.participants}</p>
                            </div>
                            <div className="tournament-card-actions">
                                <button onClick={() => handleOpenTournament(tournament.id)} disabled={isLoading} title="Abrir Torneio">
                                    <svg viewBox="0 0 24 24"><path d="M10 3H14V7H10V3M10 17H14V21H10V17M3 10H7V14H3V10M17 10H21V14H17V10M14 10H10V14H14V10M8.17 7H4V3H8.17C8.6 1.84 9.7 1 11 1H13C14.3 1 15.4 1.84 15.83 3H20V7H15.83C15.4 8.16 14.3 9 13 9H11C9.7 9 8.6 8.16 8.17 7M15.83 17H20V21H15.83C15.4 19.84 14.3 19 13 19H11C9.7 19 8.6 19.84 8.17 21H4V17H8.17C8.6 15.84 9.7 15 11 15H13C14.3 15 15.4 15.84 15.83 17Z" /></svg> {/* Ícone de bracket */}
                                </button>
                                {/* <button onClick={() => console.log('Edit', tournament.id)} disabled={isLoading} title="Editar">
                                    <svg viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
                                </button> */}
                                <button className="delete-button" onClick={() => handleDeleteTournament(tournament.id)} disabled={isLoading} title="Excluir">
                                    <svg viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
             {isLoading && <div className="loading-indicator">Carregando...</div>} {/* Indicador simples */}
        </div>
    );
};

export default TournamentDashboard;