import { useState, useEffect } from 'react';
import { getAsistentes, subscribeToNewAsistentes } from '../lib/supabase';
import type { Asistente } from '../lib/types';
import GafeteModal from './GafeteModal';

interface MuroTiempoRealProps {
  initialAsistentes: Asistente[];
  initialCount: number;
}

const MAX_VISIBLE_ASISTENTES = 48;

export default function MuroTiempoReal({ initialAsistentes, initialCount }: MuroTiempoRealProps) {
  const [asistentes, setAsistentes] = useState<Asistente[]>(initialAsistentes);
  const [count, setCount] = useState(initialCount);
  const [newAsistenteId, setNewAsistenteId] = useState<string | null>(null);
  const [selectedAsistente, setSelectedAsistente] = useState<Asistente | null>(null);

  useEffect(() => {
    // Suscribirse a nuevos asistentes en tiempo real
    const unsubscribe = subscribeToNewAsistentes((nuevoAsistente) => {
      // Agregar al inicio del array
      setAsistentes((prev) => {
        // Evitar duplicados
        if (prev.some((a) => a.id === nuevoAsistente.id)) {
          return prev;
        }
        return [nuevoAsistente, ...prev];
      });

      // Incrementar contador
      setCount((prev) => prev + 1);

      // Marcar como nuevo para animación
      setNewAsistenteId(nuevoAsistente.id);
      setTimeout(() => setNewAsistenteId(null), 2000);
    });

    // Limpiar suscripción al desmontar
    return () => {
      unsubscribe();
    };
  }, []);

  // Auto-collapse: mostrar solo los últimos 48 asistentes
  const visibleAsistentes = asistentes.slice(0, MAX_VISIBLE_ASISTENTES);
  const isCollapsed = asistentes.length > MAX_VISIBLE_ASISTENTES;

  return (
    <div className="min-h-screen bg-gradient-navy text-white p-6 md:p-8 lg:p-12 particles-bg">
      {/* Header con información completa */}
      <header className="mb-12">
        <div className="max-w-[1920px] mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-6 animate-float">
            <img
              src="/icons/icon-512.png"
              alt="The Victory Church Logo"
              className="w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl glow-gold-intense"
            />
          </div>

          {/* Título */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gold-gradient font-black mb-4 tracking-wider">
            Celebración 7º Aniversario
          </h1>

          {/* Divisor ornamental */}
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold-main"></div>
            <div className="w-3 h-3 rotate-45 bg-gold-main"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold-main"></div>
          </div>

          {/* Contador circular */}
          <div className="flex justify-center mb-6">
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 bg-gold-main rounded-full opacity-20 animate-glow-pulse"></div>
              <div className="relative bg-gradient-navy rounded-full border-4 border-gold-main p-8 md:p-12 shadow-2xl glow-gold-intense">
                <div className="text-center">
                  <div className="text-6xl md:text-8xl font-black text-gold-gradient tabular-nums font-heading">
                    {count}
                  </div>
                  <div className="text-xl md:text-2xl text-white/90 mt-2 font-heading font-semibold">
                    {count === 1 ? 'Asistente' : 'Asistentes'}
                  </div>
                  <div className="text-sm md:text-base text-gold-light mt-1 font-body">
                    Registrados
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información del evento */}
          <div className="space-y-2 font-heading">
            <p className="text-2xl md:text-3xl text-gold-light font-bold">
              Sábado, 28 de Febrero - 6:30 PM
            </p>
            <p className="text-base md:text-lg text-white/70 font-medium italic">
              7380 NW 54th St, Miami, FL
            </p>
          </div>

          {/* Indicador de colapso */}
          {isCollapsed && (
            <div className="mt-6 inline-block bg-gold-main/20 border border-gold-main rounded-xl px-6 py-3">
              <p className="text-gold-light font-heading font-semibold text-sm md:text-base">
                Mostrando los últimos {MAX_VISIBLE_ASISTENTES} de {count} asistentes
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Grid de asistentes centrado */}
      <main className="max-w-[1920px] mx-auto">
        {asistentes.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-4">
              <svg className="w-10 h-10 text-gold-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <p className="text-2xl text-white/60 font-body">Esperando nuevos registros...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4 md:gap-6 justify-items-center">
            {visibleAsistentes.map((asistente, index) => {
              const isNew = newAsistenteId === asistente.id;
              const registrationTime = new Date(asistente.created_at).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={asistente.id}
                  onClick={() => setSelectedAsistente(asistente)}
                  className={`group cursor-pointer w-full max-w-[200px] ${
                    isNew ? 'animate-fade-in scale-105' : 'animate-fadeInUp'
                  }`}
                  style={{ animationDelay: `${Math.min(index * 0.03, 0.8)}s` }}
                >
                  <div
                    className={`bg-gradient-navy rounded-2xl p-4 shadow-lg border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                      isNew
                        ? 'border-gold-main glow-gold-intense relative overflow-hidden'
                        : 'border-gold-dark/30 hover:border-gold-main'
                    }`}
                  >
                    {/* Efecto shimmer para nuevos */}
                    {isNew && (
                      <div className="absolute inset-0 shimmer-effect pointer-events-none"></div>
                    )}

                    {/* Foto */}
                    <div className="mb-3 relative z-10">
                      {asistente.foto_url ? (
                        <div className="relative aspect-square">
                          <div className={`absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity ${
                            isNew ? 'bg-gold-light animate-glow-pulse' : 'bg-gold-main'
                          }`}></div>
                          <img
                            src={asistente.foto_url}
                            alt={asistente.nombre}
                            className="relative w-full h-full rounded-full object-cover border-3 border-gold-main/60 group-hover:border-gold-light transition-all shadow-lg"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="aspect-square bg-navy-light/30 rounded-full flex items-center justify-center border-2 border-gold-dark/30">
                          <svg className="w-1/2 h-1/2 text-gold-dark/50" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Nombre */}
                    <div className="text-center mb-2 relative z-10">
                      <h3 className="font-heading font-semibold text-white text-sm md:text-base line-clamp-2 group-hover:text-gold-light transition-colors">
                        {asistente.nombre}
                      </h3>
                    </div>

                    {/* Hora de registro */}
                    <div className="text-center mb-1 relative z-10">
                      <p className="text-xs text-gold-dark/80 font-body">
                        {registrationTime}
                      </p>
                    </div>

                    {/* Indicador de nuevo */}
                    {isNew && (
                      <div className="mt-2 text-center relative z-10">
                        <span className="inline-flex items-center px-2 py-1 bg-gradient-gold text-navy-dark text-xs font-bold rounded-full glow-gold">
                          ✨ ¡NUEVO!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center space-y-2">
        <p className="text-gold-light/60 font-body text-sm flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 bg-gold-main rounded-full animate-pulse"></span>
          Actualizado en tiempo real
        </p>
        <p className="text-white/40 font-body text-xs">
          Haz clic en cualquier gafete para verlo en grande
        </p>
      </footer>

      {/* Modal para ver gafete grande */}
      <GafeteModal
        asistente={selectedAsistente}
        isOpen={selectedAsistente !== null}
        onClose={() => setSelectedAsistente(null)}
      />
    </div>
  );
}
