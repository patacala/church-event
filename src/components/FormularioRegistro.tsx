import { useState, type FormEvent, type ChangeEvent } from 'react';
import { uploadPhoto, insertAsistente } from '../lib/supabase';
import { compressImage, isValidImage, createImagePreview } from '../lib/imageCompression';

export default function FormularioRegistro() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejar cambios en inputs de texto
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  // Manejar selección de foto
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar imagen
    if (!isValidImage(file)) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    // Guardar archivo y crear preview
    setSelectedFile(file);
    const preview = createImagePreview(file);
    setPreviewUrl(preview);
    setError(null);
  };

  // Enviar formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (!formData.nombre.trim()) {
      setError('Por favor ingresa tu nombre completo');
      return;
    }

    if (!formData.telefono.trim()) {
      setError('Por favor ingresa tu teléfono');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Por favor ingresa un email válido');
      return;
    }

    if (!selectedFile) {
      setError('Por favor toma una foto para tu gafete');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Comprimir imagen
      const compressedFile = await compressImage(selectedFile);

      // 2. Subir a Supabase Storage
      const fotoUrl = await uploadPhoto(compressedFile);

      // 3. Insertar registro en la base de datos
      const asistenteId = await insertAsistente({
        nombre: formData.nombre.trim(),
        telefono: formData.telefono.trim(),
        email: formData.email.trim(),
        foto_url: fotoUrl,
      });

      // 4. Redirigir a página de gafete
      window.location.href = `/bienvenida/${asistenteId}`;
    } catch (err) {
      console.error('Error al registrar:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Ocurrió un error al registrarte. Por favor intenta de nuevo.'
      );
      setIsLoading(false);
    }
  };

  return (
    <section id="registro-form" className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-navy particles-bg">
      <div className="w-full max-w-md">
        <div className="bg-navy-dark/60 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-gold-main/40 glow-gold-intense">
          {/* Título */}
          <h2 className="text-4xl md:text-5xl font-display font-black text-gold-gradient text-center mb-10">
            Registro
          </h2>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-heading font-semibold text-gold-light mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 bg-navy-light/30 border-2 border-gold-dark/30 rounded-xl text-white font-body placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-main focus:border-gold-main transition-all"
                placeholder="Ingresa tu nombre"
                disabled={isLoading}
              />
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="telefono" className="block text-sm font-heading font-semibold text-gold-light mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 bg-navy-light/30 border-2 border-gold-dark/30 rounded-xl text-white font-body placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-main focus:border-gold-main transition-all"
                placeholder="+1 (555) 123-4567"
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-heading font-semibold text-gold-light mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 bg-navy-light/30 border-2 border-gold-dark/30 rounded-xl text-white font-body placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-main focus:border-gold-main transition-all"
                placeholder="tu@email.com"
                disabled={isLoading}
              />
            </div>

            {/* Foto */}
            <div>
              <label htmlFor="foto" className="block text-sm font-heading font-semibold text-gold-light mb-2">
                Foto para tu Gafete *
              </label>

              {/* Preview de la foto */}
              {previewUrl && (
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-36 h-36 rounded-full object-cover border-4 border-gold-main shadow-2xl glow-gold"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      disabled={isLoading}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Input de archivo con captura de cámara */}
              <label
                htmlFor="foto"
                className="flex items-center justify-center w-full px-4 py-6 bg-gold-main/10 border-2 border-dashed border-gold-main/60 rounded-xl cursor-pointer hover:bg-gold-main/20 hover:border-gold-light transition-all"
              >
                <div className="text-center">
                  <svg
                    className="mx-auto h-14 w-14 text-gold-main"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="mt-3 text-sm font-heading font-semibold text-white/90">
                    {previewUrl ? 'Cambiar foto' : 'Tomar foto con cámara frontal'}
                  </p>
                </div>
              </label>
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                capture="user"
                onChange={handleFileChange}
                className="hidden"
                disabled={isLoading}
              />
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-gold hover:opacity-90 text-navy-dark font-heading font-bold text-lg py-5 px-6 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center glow-gold-intense relative overflow-hidden"
            >
              <span className="relative z-10">
                {isLoading ? (
                  <>
                    <div className="spinner mr-3 border-navy-dark"></div>
                    Registrando...
                  </>
                ) : (
                  'Completar Registro'
                )}
              </span>
              {!isLoading && <div className="absolute inset-0 shimmer-effect"></div>}
            </button>
          </form>

          {/* Nota informativa */}
          <p className="mt-6 text-xs text-white/50 text-center">
            Tu información es segura y solo se usará para este evento.
          </p>
        </div>
      </div>
    </section>
  );
}
