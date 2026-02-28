import { useEffect } from 'react';
import type { Asistente } from '../lib/types';

interface GafeteModalProps {
  asistente: Asistente | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GafeteModal({ asistente, isOpen, onClose }: GafeteModalProps) {
  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !asistente) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop con blur */}
      <div className="absolute inset-0 backdrop-blur-navy bg-navy-dark/90"></div>

      {/* Contenedor del modal */}
      <div
        className="relative z-10 max-w-2xl w-full animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-20 w-12 h-12 bg-gradient-gold hover:opacity-90 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center glow-gold-intense"
          aria-label="Cerrar modal"
        >
          <svg className="w-6 h-6 text-navy-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Gafete grande */}
        <div
          className="bg-gradient-navy rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden glow-gold-intense particles-bg"
          style={{
            boxShadow: '0 0 0 4px #D4AF37, 0 0 0 6px #F4E0A6, 0 0 0 8px #C9A961, 0 0 40px rgba(212, 175, 55, 0.6), 0 30px 80px rgba(0, 0, 0, 0.9)'
          }}
        >
          {/* Logo de fondo con opacidad */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img
              src="/icons/icon-512.png"
              alt="The Victory Church"
              className="w-96 h-96 object-contain"
            />
          </div>

          {/* Efecto de fondo decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-gold transform rotate-45"></div>
          </div>

          {/* Contenido del gafete */}
          <div className="relative z-10 text-center space-y-8">
            {/* Logo/Nombre de la iglesia */}
            <div className="mb-4">
              <h2 className="font-display text-3xl md:text-4xl text-gold-gradient font-black tracking-wider">
                The Victory Church
              </h2>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-main"></div>
                <div className="w-2 h-2 rotate-45 bg-gold-main"></div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-main"></div>
              </div>
            </div>

            {/* Foto circular - extra grande para modal */}
            {asistente.foto_url && (
              <div className="flex justify-center my-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-glow-pulse"
                    style={{
                      boxShadow: '0 0 40px rgba(212, 175, 55, 0.7), 0 0 80px rgba(212, 175, 55, 0.5)'
                    }}
                  ></div>
                  <img
                    src={asistente.foto_url}
                    alt={asistente.nombre}
                    className="relative w-72 h-72 rounded-full object-cover shadow-2xl"
                    style={{
                      border: '8px solid',
                      borderImage: 'linear-gradient(135deg, #C9A961, #F4E0A6, #D4AF37, #F4E0A6, #C9A961) 1'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Nombre del asistente */}
            <div className="py-2">
              <h3 className="text-5xl md:text-6xl font-heading font-black text-white mb-2 tracking-tight">
                {asistente.nombre}
              </h3>
            </div>

            {/* Mensaje de bienvenida */}
            <div className="py-4">
              <p className="text-4xl md:text-5xl font-display text-gold-gradient font-black italic">
                ¡Bienvenido a Casa!
              </p>
            </div>

            {/* Fecha del evento */}
            <div className="pt-6 mt-4 border-t border-gold-main/20">
              <p className="text-lg font-heading text-gold-light font-semibold">Celebración 7º Aniversario</p>
              <p className="text-base text-white/70 font-body mt-1">28 de Febrero, 2026 - 6:30 PM</p>
            </div>
          </div>

          {/* Patrón decorativo en las esquinas */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-gold-light/40 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-gold-light/40 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-gold-light/40 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-gold-light/40 rounded-br-3xl"></div>
        </div>

        {/* Instrucción para cerrar */}
        <p className="text-center mt-4 text-white/60 font-body text-sm">
          Presiona ESC o haz clic fuera del gafete para cerrar
        </p>
      </div>
    </div>
  );
}
