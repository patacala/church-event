# 🎉 The Victory Church - App de Evento

Aplicación web para registro de asistentes con gafetes digitales y muro en tiempo real.

## 📋 Características

✅ **Registro con Cámara Frontal** - Los asistentes pueden tomarse una foto directamente desde el móvil
✅ **Gafetes Digitales** - Cada asistente recibe un gafete compartible
✅ **Muro en Tiempo Real** - Pantalla grande que muestra nuevos registros al instante
✅ **PWA** - Instalable en iOS y Android
✅ **Compresión de Imágenes** - Optimización automática para ahorrar ancho de banda
✅ **Diseño Elegante** - Negro y oro, paleta de colores Victoria

## 🚀 Configuración Inicial

### Paso 1: Configurar Variables de Entorno

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza los valores con tus credenciales de Supabase:

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

**¿Dónde encontrar las credenciales?**
- Ve a [Supabase Dashboard](https://app.supabase.com)
- Selecciona tu proyecto
- Ve a Settings → API
- Copia "Project URL" y "anon public key"

### Paso 2: Configurar Base de Datos en Supabase

1. Abre [Supabase SQL Editor](https://app.supabase.com/project/_/sql)
2. Crea una nueva query
3. Abre el archivo `supabase-migration.sql` en este proyecto
4. Copia TODO el contenido y pégalo en el editor SQL
5. Ejecuta el script (botón "Run" o Cmd/Ctrl + Enter)

Esto creará:
- ✅ Tabla `asistentes`
- ✅ Políticas de seguridad (RLS)
- ✅ Configuración de Realtime
- ✅ Políticas de Storage

### Paso 3: Crear Bucket de Storage

1. Ve a [Storage](https://app.supabase.com/project/_/storage/buckets) en Supabase
2. Haz clic en "New Bucket"
3. Nombre: `avatars`
4. **IMPORTANTE:** Marca como "Public bucket"
5. Crea el bucket

Las políticas de acceso ya fueron creadas en el paso anterior.

### Paso 4: Instalar Dependencias (si no están instaladas)

```bash
npm install
```

### Paso 5: Probar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

## 📱 Rutas de la Aplicación

- **`/`** - Página principal (Hero + Formulario de registro)
- **`/bienvenida/[id]`** - Gafete digital del asistente
- **`/muro`** - Muro en tiempo real (para proyectar en TV/pantalla)

## 🎨 Personalización

### Cambiar Iconos PWA

Los iconos temporales están en `public/icons/`. Para usar tu logo:

1. Crea dos versiones PNG de tu logo:
   - `icon-192.png` (192x192 píxeles)
   - `icon-512.png` (512x512 píxeles)
2. Reemplaza los archivos en `public/icons/`
3. Usa fondo negro (#000000) y logo dorado (#D4AF37)

### Agregar Logo de la Iglesia

El espacio para el logo está en:
- `src/components/HeroSection.astro` (línea ~16)
- `src/components/GafeteDigital.tsx` (línea ~92)
- `src/components/MuroTiempoReal.tsx` (línea ~35)

Puedes agregar una imagen:
```astro
<img src="/logo.png" alt="The Victory Church" class="h-20 mx-auto mb-4" />
```

### Cambiar Fecha del Evento

Edita en estos archivos:
- `src/components/HeroSection.astro` (línea ~26-27)
- `src/components/GafeteDigital.tsx` (línea ~117-118)
- `src/components/MuroTiempoReal.tsx` (línea ~45)

## 🚢 Despliegue en Vercel

### Opción 1: Con CLI de Vercel

```bash
# Instalar Vercel CLI (si no la tienes)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Opción 2: Con GitHub

1. Sube tu código a GitHub
2. Ve a [Vercel](https://vercel.com)
3. Importa tu repositorio
4. Agrega las variables de entorno en el dashboard de Vercel:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
5. Deploy automático

### Verificar en Producción

Después del deploy:
1. ✅ Abre la URL de producción
2. ✅ Prueba el registro completo
3. ✅ Verifica que la foto se sube correctamente
4. ✅ Abre `/muro` en una pantalla grande
5. ✅ Registra a alguien y verifica que aparece en tiempo real

## 🎯 Uso el Día del Evento

### Para los Asistentes (Móvil)
1. Comparte la URL principal con los asistentes
2. Ellos abren en su móvil y se registran
3. Toman su foto con la cámara frontal
4. Reciben su gafete digital
5. Pueden compartirlo en redes sociales

### Para la Pantalla Grande (TV)
1. Abre `/muro` en un navegador en la computadora conectada a la TV
2. Presiona F11 para pantalla completa
3. El muro se actualizará automáticamente cuando alguien se registre

## 🛠️ Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

## 📊 Monitoreo

### Ver Registros en Tiempo Real

En Supabase Dashboard:
1. Ve a Table Editor
2. Selecciona tabla `asistentes`
3. Verás todos los registros en tiempo real

### Ver Fotos Subidas

1. Ve a Storage → Buckets → avatars
2. Verás todas las fotos subidas

## 🔧 Solución de Problemas

### Error: "No se pudo subir la foto"

- ✅ Verifica que el bucket `avatars` existe en Supabase
- ✅ Verifica que está marcado como "Public"
- ✅ Verifica las políticas de storage en el SQL Editor

### Error: "No se pudo registrar al asistente"

- ✅ Verifica las credenciales en `.env`
- ✅ Verifica que la tabla `asistentes` existe
- ✅ Verifica las políticas RLS

### El muro no se actualiza en tiempo real

- ✅ Verifica que ejecutaste `ALTER PUBLICATION supabase_realtime ADD TABLE asistentes;`
- ✅ Verifica en Supabase Dashboard → Database → Replication que `asistentes` está habilitada

### La cámara no se abre en móvil

- ✅ Verifica que estás usando HTTPS (requerido para cámara)
- ✅ En desarrollo local usa un túnel como ngrok
- ✅ Vercel automáticamente usa HTTPS

## 📞 Stack Tecnológico

- **Framework:** Astro 4.x
- **UI Library:** React 18
- **Estilos:** Tailwind CSS
- **Base de Datos:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Realtime:** Supabase Realtime
- **Deploy:** Vercel
- **TypeScript:** Strict mode

## 📝 Notas Importantes

1. **Los iconos actuales son SVG temporales** - Reemplázalos con PNGs reales antes del evento
2. **La app funciona 100% en móvil** - Prueba en un dispositivo real antes del evento
3. **El muro está optimizado para TV** - No es responsive para móvil
4. **Las imágenes se comprimen automáticamente** - No te preocupes por el tamaño original
5. **Web Share API requiere HTTPS** - Funciona en producción, no en http://localhost

## ✨ ¡Listo!

Tu aplicación está lista para usarse. Si tienes preguntas o necesitas ajustes, revisa el código en:
- `src/components/` - Componentes de UI
- `src/pages/` - Páginas de la app
- `src/lib/` - Lógica de negocio
- `tailwind.config.cjs` - Configuración de colores

**¡Que el evento sea un éxito!** 🎊
