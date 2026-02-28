import imageCompression from 'browser-image-compression';

/**
 * Comprime una imagen antes de subirla
 * Configuración optimizada para fotos de perfil en eventos
 * @param file - Archivo de imagen original
 * @returns Archivo de imagen comprimido
 */
export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 0.5,           // Tamaño máximo: 500KB
    maxWidthOrHeight: 800,    // Máximo 800px de ancho o alto
    useWebWorker: true,       // Usar web worker para mejor rendimiento
    fileType: 'image/jpeg',   // Convertir a JPEG para mejor compresión
    initialQuality: 0.8,      // Calidad inicial del 80%
  };

  try {
    const compressedFile = await imageCompression(file, options);

    // Log para debugging (opcional)
    console.log('Tamaño original:', (file.size / 1024 / 1024).toFixed(2), 'MB');
    console.log('Tamaño comprimido:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');

    return compressedFile;
  } catch (error) {
    console.error('Error al comprimir imagen:', error);
    // Si falla la compresión, devolver el archivo original
    return file;
  }
}

/**
 * Valida que el archivo sea una imagen válida
 * @param file - Archivo a validar
 * @returns true si es una imagen válida
 */
export function isValidImage(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB máximo antes de comprimir

  if (!validTypes.includes(file.type)) {
    alert('Por favor selecciona una imagen válida (JPG, PNG o WebP)');
    return false;
  }

  if (file.size > maxSize) {
    alert('La imagen es demasiado grande. El tamaño máximo es 10MB.');
    return false;
  }

  return true;
}

/**
 * Crea una URL de preview para mostrar la imagen seleccionada
 * @param file - Archivo de imagen
 * @returns URL temporal para preview
 */
export function createImagePreview(file: File): string {
  return URL.createObjectURL(file);
}
