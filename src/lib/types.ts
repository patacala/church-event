// Tipos de datos para la aplicación

export interface Asistente {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  foto_url: string | null;
  created_at: string;
}

export interface AsistenteFormData {
  nombre: string;
  telefono: string;
  email: string;
  foto: File | null;
}

export interface RealtimeAsistente {
  new: Asistente;
}
