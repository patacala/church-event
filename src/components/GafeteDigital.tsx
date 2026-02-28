import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import type { Asistente } from '../lib/types';

interface GafeteDigitalProps {
  asistente: Asistente;
}

export default function GafeteDigital({ asistente }: GafeteDigitalProps) {
  const [isSharing, setIsSharing] = useState(false);
  const gafeteRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  // Compartir credencial usando Web Share API
  const handleShare = async () => {
    setIsSharing(true);

    try {
      const shareData = {
        title: 'Mi Credencial - The Victory 70-12 Miami',
        text: `¡Ya estoy aqui en la celebracion de 7º aniversario de The Victory 70-12 Miami! Mira mi credencial digital.`,
        url: window.location.href,
      };

      // Intentar capturar la credencial como imagen
      if (captureRef.current && navigator.canShare) {
        try {
          const element = captureRef.current;

          // Hacer visible temporalmente el elemento de captura
          element.style.display = 'block';

          // Esperar a que todas las imágenes se carguen
          const images = element.getElementsByTagName('img');
          await Promise.all(
            Array.from(images).map((img) => {
              if (img.complete) return Promise.resolve();
              return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                setTimeout(resolve, 100); // timeout por si acaso
              });
            })
          );

          // Pequeña pausa para asegurar renderizado
          await new Promise(resolve => setTimeout(resolve, 500));

          // Capturar imagen con configuración mejorada
          const dataUrl = await toPng(element, {
            cacheBust: true,
            quality: 1.0,
            backgroundColor: '#1a2570',
            pixelRatio: 2,
            skipFonts: false,
          });

          // Ocultar elemento de captura
          element.style.display = 'none';

          // Convertir data URL a blob
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], 'credencial.png', { type: 'image/png' });

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
          <p className="text-white/80 font-body">Tu credencial digital está lista</p>
        </div>

        {/* Credencial Digital */}
        <div
          ref={gafeteRef}
          className="bg-gradient-navy rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl relative overflow-hidden animate-fadeInUp glow-gold-intense particles-bg w-full max-w-xl aspect-[3/4]"
          style={{
            animationDelay: '0.2s',
            boxShadow: '0 0 0 4px #D4AF37, 0 0 0 6px #F4E0A6, 0 0 0 8px #C9A961, 0 0 40px rgba(212, 175, 55, 0.5), 0 20px 60px rgba(0, 0, 0, 0.8)'
          }}
        >
          {/* Logo de fondo con opacidad */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img
              src="/icons/icon-512.png"
              alt="The Victory 70-12 Miami"
              className="w-80 h-80 object-contain"
              style={{ mixBlendMode: 'multiply' }}
              crossOrigin="anonymous"
            />
          </div>

          {/* Efecto de fondo decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-gold transform rotate-45"></div>
          </div>

          {/* Contenido del gafete */}
          <div className="relative z-10 text-center space-y-4 md:space-y-6">
            {/* Logo/Nombre de la iglesia */}
            <div className="mb-2 md:mb-4">
              <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-gold-gradient font-black tracking-wider">
                The Victory 70-12 Miami
              </h2>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-main"></div>
                <div className="w-2 h-2 rotate-45 bg-gold-main"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-main"></div>
              </div>
            </div>

            {/* Foto cuadrada con bordes redondeados */}
            {asistente.foto_url && (
              <div className="flex justify-center my-4 md:my-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl animate-glow-pulse"
                    style={{
                      boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.4)'
                    }}
                  ></div>
                  <img
                    src={asistente.foto_url}
                    alt={asistente.nombre}
                    className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl object-cover shadow-2xl border-2 border-gold-main"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            )}

            {/* Nombre del asistente */}
            <div className="py-1 md:py-2">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black text-white mb-2 tracking-tight">
                {asistente.nombre}
              </h3>
            </div>

            {/* Mensaje de bienvenida */}
            <div className="py-2 md:py-4">
              <p className="text-2xl md:text-3xl lg:text-4xl font-display text-gold-gradient font-black italic">
                ¡Bienvenido a Casa!
              </p>
            </div>

            {/* Fecha del evento */}
            <div className="pt-4 md:pt-6 mt-2 md:mt-4 border-t border-gold-main/20">
              <p className="text-sm md:text-base font-heading text-gold-light font-semibold">Celebración 7º Aniversario</p>
              <p className="text-xs md:text-sm text-white/70 font-body mt-1">28 de Febrero, 2026 - 6:30 PM</p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          {/* Botón de compartir */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="w-full bg-gradient-gold hover:opacity-90 text-navy-dark font-heading font-bold text-lg py-5 px-6 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center glow-gold-intense relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSharing ? (
                <>
                  <div className="spinner border-navy-dark"></div>
                  <span>Compartiendo...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span>Compartir mi Credencial</span>
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

      {/* Elemento oculto para captura optimizada - Tamaño fijo 600x800px */}
      <div
        ref={captureRef}
        style={{
          display: 'none',
          position: 'fixed',
          top: '-10000px',
          left: '-10000px',
          width: '600px',
          height: '800px',
        }}
      >
        <div
          className="bg-gradient-navy rounded-3xl p-12 shadow-2xl relative overflow-hidden glow-gold-intense particles-bg"
          style={{
            width: '600px',
            height: '800px',
            boxShadow: '0 0 0 4px #D4AF37, 0 0 0 6px #F4E0A6, 0 0 0 8px #C9A961, 0 0 40px rgba(212, 175, 55, 0.5), 0 20px 60px rgba(0, 0, 0, 0.8)'
          }}
        >
          {/* Logo de fondo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img
              src="/icons/icon-512.png"
              alt="The Victory 70-12 Miami"
              className="w-80 h-80 object-contain"
              style={{ mixBlendMode: 'multiply' }}
              crossOrigin="anonymous"
            />
          </div>

          {/* Efecto de fondo decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-gold transform rotate-45"></div>
          </div>

          {/* Contenido */}
          <div className="relative z-10 text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: '20px 0' }}>
            {/* Título */}
            <div>
              <h2 className="font-display text-3xl text-gold-gradient font-black tracking-wider">
                The Victory 70-12 Miami
              </h2>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-main"></div>
                <div className="w-2 h-2 rotate-45 bg-gold-main"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-main"></div>
              </div>
            </div>

            {/* Foto */}
            {asistente.foto_url && (
              <div style={{ margin: '30px 0' }}>
                <div className="relative">
                  <img
                    src={asistente.foto_url}
                    alt={asistente.nombre}
                    style={{
                      width: '320px',
                      height: '320px',
                      borderRadius: '24px',
                      objectFit: 'cover',
                      border: '2px solid #D4AF37'
                    }}
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            )}

            {/* Nombre */}
            <div>
              <h3 className="text-4xl font-heading font-black text-white mb-3 tracking-tight">
                {asistente.nombre}
              </h3>

              {/* Mensaje */}
              <p className="text-4xl font-display text-gold-gradient font-black italic mb-6">
                ¡Bienvenido a Casa!
              </p>

              {/* Fecha */}
              <div className="pt-4 border-t border-gold-main/20">
                <p className="text-base font-heading text-gold-light font-semibold">Celebración 7º Aniversario</p>
                <p className="text-sm text-white/70 font-body mt-1">28 de Febrero, 2026 - 6:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
