import { createClient } from '@supabase/supabase-js';
import type { Asistente } from './types';

// Obtener variables de entorno
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Falta configurar las variables de entorno de Supabase en el archivo .env');
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Sube una foto al bucket 'avatars' de Supabase Storage
 * @param file - Archivo de imagen a subir
 * @returns URL pública de la imagen subida
 */
export async function uploadPhoto(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = fileName;

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error al subir foto:', error);
    throw new Error('No se pudo subir la foto. Intenta de nuevo.');
  }

  // Obtener URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  return publicUrl;
}

/**
 * Inserta un nuevo asistente en la base de datos
 * @param data - Datos del asistente a insertar
 * @returns ID del asistente creado
 */
export async function insertAsistente(data: {
  nombre: string;
  telefono: string;
  email: string;
  foto_url: string;
}): Promise<string> {
  const { data: asistente, error } = await supabase
    .from('asistentes')
    .insert([data])
    .select('id')
    .single();

  if (error) {
    console.error('Error al insertar asistente:', error);
    throw new Error('No se pudo registrar al asistente. Intenta de nuevo.');
  }

  return asistente.id;
}

/**
 * Obtiene un asistente por su ID
 * @param id - ID del asistente
 * @returns Datos del asistente
 */
export async function getAsistente(id: string): Promise<Asistente | null> {
  const { data, error } = await supabase
    .from('asistentes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error al obtener asistente:', error);
    return null;
  }

  return data;
}

/**
 * Obtiene el conteo total de asistentes
 * @returns Número total de asistentes
 */
export async function getAsistentesCount(): Promise<number> {
  const { count, error } = await supabase
    .from('asistentes')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error al contar asistentes:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Obtiene todos los asistentes (limitado a los últimos 100)
 * @returns Lista de asistentes
 */
export async function getAsistentes(limit: number = 100): Promise<Asistente[]> {
  const { data, error } = await supabase
    .from('asistentes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error al obtener asistentes:', error);
    return [];
  }

  return data || [];
}

/**
 * Suscripción a cambios en tiempo real de la tabla asistentes
 * @param callback - Función a ejecutar cuando hay un nuevo INSERT
 * @returns Función para cancelar la suscripción
 */
export function subscribeToNewAsistentes(
  callback: (asistente: Asistente) => void
) {
  const channel = supabase
    .channel('asistentes-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'asistentes'
      },
      (payload) => {
        callback(payload.new as Asistente);
      }
    )
    .subscribe();

  // Retornar función para cancelar suscripción
  return () => {
    supabase.removeChannel(channel);
  };
}
