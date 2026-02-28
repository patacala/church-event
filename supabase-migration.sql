-- =================================================================
-- MIGRACIÓN SQL PARA SUPABASE
-- The Victory Church - Aplicación de Evento
-- =================================================================

-- INSTRUCCIONES:
-- 1. Abre tu proyecto de Supabase en https://app.supabase.com
-- 2. Ve a SQL Editor (icono de </> en el menú lateral)
-- 3. Crea una nueva query
-- 4. Copia y pega TODO este contenido
-- 5. Ejecuta el script (botón "Run" o Cmd/Ctrl + Enter)

-- =================================================================
-- PASO 1: CREAR TABLA DE ASISTENTES
-- =================================================================

-- Crear tabla si no existe
CREATE TABLE IF NOT EXISTS asistentes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT NOT NULL,
  foto_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_asistentes_created_at ON asistentes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_asistentes_email ON asistentes(email);

-- =================================================================
-- PASO 2: HABILITAR ROW LEVEL SECURITY (RLS)
-- =================================================================

-- Habilitar RLS en la tabla
ALTER TABLE asistentes ENABLE ROW LEVEL SECURITY;

-- =================================================================
-- PASO 3: CREAR POLÍTICAS DE SEGURIDAD
-- =================================================================

-- Política: Permitir INSERT público (cualquiera puede registrarse)
DROP POLICY IF EXISTS "Permitir INSERT público" ON asistentes;
CREATE POLICY "Permitir INSERT público"
ON asistentes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Política: Permitir SELECT público (necesario para el muro en tiempo real)
DROP POLICY IF EXISTS "Permitir SELECT público" ON asistentes;
CREATE POLICY "Permitir SELECT público"
ON asistentes
FOR SELECT
TO anon, authenticated
USING (true);

-- =================================================================
-- PASO 4: HABILITAR REALTIME
-- =================================================================

-- Habilitar realtime para la tabla asistentes
-- Esto permite que la aplicación reciba actualizaciones en tiempo real
ALTER PUBLICATION supabase_realtime ADD TABLE asistentes;

-- =================================================================
-- PASO 5: CONFIGURAR STORAGE BUCKET (EJECUTAR DESPUÉS DE CREAR EL BUCKET EN LA UI)
-- =================================================================

-- NOTA: Primero crea el bucket 'avatars' manualmente en Supabase Dashboard:
-- 1. Ve a Storage en el menú lateral
-- 2. Crea un nuevo bucket llamado 'avatars'
-- 3. Márcalo como PÚBLICO
-- 4. Luego ejecuta las siguientes políticas:

-- Política de subida pública para avatars
DROP POLICY IF EXISTS "Permitir subida pública de avatars" ON storage.objects;
CREATE POLICY "Permitir subida pública de avatars"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'avatars');

-- Política de lectura pública para avatars
DROP POLICY IF EXISTS "Permitir lectura pública de avatars" ON storage.objects;
CREATE POLICY "Permitir lectura pública de avatars"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'avatars');

-- Política de actualización pública para avatars (opcional)
DROP POLICY IF EXISTS "Permitir actualización pública de avatars" ON storage.objects;
CREATE POLICY "Permitir actualización pública de avatars"
ON storage.objects
FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');

-- =================================================================
-- VERIFICACIÓN
-- =================================================================

-- Verifica que la tabla se creó correctamente
SELECT 'Tabla asistentes creada' AS status, COUNT(*) AS total_asistentes FROM asistentes;

-- Verifica que RLS está habilitado
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'asistentes';

-- Verifica las políticas
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'asistentes';

-- =================================================================
-- SIGUIENTE PASO: CONFIGURAR STORAGE
-- =================================================================

-- IR A: Supabase Dashboard > Storage
-- 1. Crear bucket 'avatars'
-- 2. Marcarlo como PÚBLICO
-- 3. Las políticas de storage ya fueron creadas arriba

-- =================================================================
-- DATOS DE PRUEBA (OPCIONAL - SOLO PARA TESTING)
-- =================================================================

-- Descomentar las siguientes líneas si quieres insertar datos de prueba:

-- INSERT INTO asistentes (nombre, telefono, email, foto_url) VALUES
-- ('Juan Pérez', '+1 555-1234', 'juan@example.com', NULL),
-- ('María García', '+1 555-5678', 'maria@example.com', NULL),
-- ('Carlos López', '+1 555-9012', 'carlos@example.com', NULL);

-- =================================================================
-- COMPLETADO
-- =================================================================

-- Si todo salió bien, deberías ver:
-- ✅ Tabla 'asistentes' creada
-- ✅ RLS habilitado
-- ✅ Políticas de INSERT y SELECT creadas
-- ✅ Realtime habilitado
-- ✅ Políticas de Storage creadas

-- Ahora puedes usar tu aplicación!
