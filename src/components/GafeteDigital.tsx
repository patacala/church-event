import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import type { Asistente } from '../lib/types';

interface GafeteDigitalProps {
  asistente: Asistente;
}

export default function GafeteDigital({ asistente }: GafeteDigitalProps) {
  const [isSharing, setIsSharing] = useState(false);
  const gafeteRef = useRef<HTMLDivElement>(null);

  // Compartir gafete usando Web Share API
  const handleShare = async () => {
    setIsSharing(true);

    try {
      const shareData = {
        title: 'Mi Gafete - The Victory Church',
        text: `¡Ya estoy registrado en el evento de The Victory Church! Mira mi gafete digital.`,
        url: window.location.href,
      };

      // Intentar capturar el gafete como imagen
      if (gafeteRef.current && navigator.canShare) {
        try {
          const dataUrl = await toPng(gafeteRef.current, {
            cacheBust: true,
            quality: 0.95,
            backgroundColor: '#1a2570',
          });

          // Convertir data URL a blob
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], 'gafete.png', { type: 'image/png' });

          // Verificar si se puede compartir archivos
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              ...shareData,
              files: [file],
            });
            setIsSharing(false);
            return;
          }
        } catch (imageError) {
          console.warn('No se pudo capturar imagen, compartiendo solo URL:', imageError);
        }
      }

      // Fallback: compartir solo URL
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback para navegadores que no soportan Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado al portapapeles!');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error al compartir:', error);
        // Fallback: copiar al portapapeles
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert('Link copiado al portapapeles!');
        } catch (clipboardError) {
          console.error('Error al copiar:', clipboardError);
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Mensaje de éxito */}
        <div className="text-center animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-full mb-4 glow-gold-intense">
            <svg className="w-8 h-8 text-navy-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gold-gradient mb-2">
            ¡Registro Exitoso!
          </h1>
          <p className="text-white/80 font-body">Tu gafete digital está listo</p>
        </div>

        {/* Gafete Digital */}
        <div
          ref={gafeteRef}
          className="bg-gradient-navy rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden animate-fadeInUp glow-gold-intense particles-bg"
          style={{
            animationDelay: '0.2s',
            minWidth: '600px',
            minHeight: '800px',
            boxShadow: '0 0 0 4px #D4AF37, 0 0 0 6px #F4E0A6, 0 0 0 8px #C9A961, 0 0 40px rgba(212, 175, 55, 0.5), 0 20px 60px rgba(0, 0, 0, 0.8)'
          }}
        >
          {/* Logo de fondo con opacidad */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img
              src="/icons/icon-512.png"
              alt="The Victory Church"
              className="w-80 h-80 object-contain"
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
              <h2 className="font-display text-2xl md:text-3xl text-gold-gradient font-black tracking-wider">
                The Victory Church
              </h2>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-main"></div>
                <div className="w-2 h-2 rotate-45 bg-gold-main"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-main"></div>
              </div>
            </div>

            {/* Foto circular */}
            {asistente.foto_url && (
              <div className="flex justify-center my-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-glow-pulse"
                    style={{
                      boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.4)'
                    }}
                  ></div>
                  <img
                    src={asistente.foto_url}
                    alt={asistente.nombre}
                    className="relative w-60 h-60 rounded-full object-cover shadow-2xl"
                    style={{
                      border: '6px solid',
                      borderImage: 'linear-gradient(135deg, #C9A961, #F4E0A6, #D4AF37, #F4E0A6, #C9A961) 1'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Nombre del asistente */}
            <div className="py-2">
              <h3 className="text-4xl md:text-5xl font-heading font-black text-white mb-2 tracking-tight">
                {asistente.nombre}
              </h3>
            </div>

            {/* Mensaje de bienvenida */}
            <div className="py-4">
              <p className="text-3xl md:text-4xl font-display text-gold-gradient font-black italic">
                ¡Bienvenido a Casa!
              </p>
            </div>

            {/* Fecha del evento */}
            <div className="pt-6 mt-4 border-t border-gold-main/20">
              <p className="text-base font-heading text-gold-light font-semibold">Celebración 7º Aniversario</p>
              <p className="text-sm text-white/70 font-body mt-1">28 de Febrero, 2026 - 6:30 PM</p>
            </div>
          </div>

          {/* Patrón decorativo en las esquinas */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-gold-light/40 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-gold-light/40 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-gold-light/40 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-gold-light/40 rounded-br-3xl"></div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          {/* Botón de compartir */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="w-full bg-gradient-gold hover:opacity-90 text-navy-dark font-heading font-bold text-lg py-5 px-6 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center glow-gold-intense relative overflow-hidden"
          >
            <span className="relative z-10">
              {isSharing ? (
                <>
                  <div className="spinner mr-3 border-navy-dark"></div>
                  Compartiendo...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Compartir mi Gafete
                </>
              )}
            </span>
            {!isSharing && <div className="absolute inset-0 shimmer-effect"></div>}
          </button>

          {/* Botón para registrar a otra persona */}
          <a
            href="/"
            className="block w-full bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-6 rounded-lg border border-white/20 transition-all duration-300 text-center"
          >
            Registrar a otra persona
          </a>
        </div>

        {/* Link al muro */}
        <div className="text-center pt-4">
          <a
            href="/muro"
            className="text-gold-light hover:text-gold-shine font-body text-sm underline transition-colors"
          >
            Ver muro de asistentes
          </a>
        </div>
      </div>
    </div>
  );
}
