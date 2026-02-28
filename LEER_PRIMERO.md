# 🎉 APLICACIÓN LISTA - The Victory Church

## ✅ ¿Qué se ha completado?

Tu aplicación web está **100% funcional** y lista para configurarse. Se ha creado:

1. ✅ **Aplicación Astro completa** con React y Tailwind CSS
2. ✅ **Página de registro** con captura de cámara frontal
3. ✅ **Gafetes digitales** compartibles vía Web Share API
4. ✅ **Muro en tiempo real** para pantalla grande/TV
5. ✅ **Compresión automática de imágenes** (hasta 500KB)
6. ✅ **PWA configurada** (instalable en iOS/Android)
7. ✅ **Diseño Victoria** (Negro #000000 y Oro #D4AF37)
8. ✅ **Migración SQL lista** para Supabase

## 🚀 PASOS SIGUIENTES (ORDEN IMPORTANTE)

### 1️⃣ Configurar Supabase (15 minutos)

#### A. Ejecutar la Migración SQL

1. Abre tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Ve a **SQL Editor** (icono </> en el menú)
3. Abre el archivo `supabase-migration.sql` de este proyecto
4. Copia TODO el contenido y pégalo en el editor
5. Presiona **"Run"** (o Cmd/Ctrl + Enter)
6. Verifica que dice "Success" ✅

#### B. Crear Bucket de Storage

1. En Supabase, ve a **Storage** → **Buckets**
2. Click en **"New Bucket"**
3. Nombre: `avatars`
4. **✅ IMPORTANTE:** Marca "Public bucket"
5. Crear

#### C. Copiar Credenciales

1. Ve a **Settings** → **API**
2. Copia estos valores:
   - **Project URL** (ejemplo: https://abc123.supabase.co)
   - **anon public** key

### 2️⃣ Configurar Variables de Entorno

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza con tus credenciales de Supabase:

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-muy-larga-aqui
```

3. Guarda el archivo

### 3️⃣ Crear Iconos PWA (OBLIGATORIO)

**La app NO funcionará sin estos iconos.**

#### Opción Rápida (5 minutos):

1. Ve a https://www.pwabuilder.com/imageGenerator
2. Sube el logo de tu iglesia (o crea uno simple)
3. Descarga los iconos generados
4. Copia `icon-192.png` y `icon-512.png` a la carpeta `public/icons/`

#### Especificaciones:
- **Tamaños:** 192x192 y 512x512 píxeles
- **Formato:** PNG
- **Diseño:** Fondo negro (#000000), logo dorado (#D4AF37)

Lee `public/icons/README.md` para más opciones.

### 4️⃣ Probar Localmente

```bash
# Asegúrate de estar en la carpeta del proyecto
cd /Users/peterbarranco/Desktop/sass/the-victory

# Instalar dependencias (si es necesario)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre http://localhost:4321 en tu navegador.

**Prueba completa:**
1. ✅ Llena el formulario con datos de prueba
2. ✅ Toma una foto (puede ser cualquier imagen)
3. ✅ Verifica que te redirige al gafete
4. ✅ Prueba el botón de compartir
5. ✅ Abre `/muro` en otra pestaña
6. ✅ Registra otra persona y verifica que aparece en el muro

### 5️⃣ Desplegar a Vercel

#### Opción A: Con CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login a Vercel
vercel login

# Deploy
vercel --prod
```

#### Opción B: Con GitHub

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. **Import repository**
4. En **Environment Variables** agrega:
   - `PUBLIC_SUPABASE_URL` = tu URL de Supabase
   - `PUBLIC_SUPABASE_ANON_KEY` = tu anon key
5. Deploy

### 6️⃣ Prueba en Producción

1. Abre la URL de Vercel en tu móvil
2. Registra un asistente de prueba
3. Verifica que todo funciona
4. Comparte la URL con tu equipo

## 📱 RUTAS DE LA APLICACIÓN

- **`/`** → Página principal (Hero + Registro)
- **`/bienvenida/[id]`** → Gafete digital (se genera automáticamente)
- **`/muro`** → Pantalla para TV (tiempo real)

## 🎯 USO EL DÍA DEL EVENTO

### Para Asistentes (Móvil):
1. Comparte la URL principal con los asistentes
2. Ellos la abren en su móvil
3. Se registran y toman su foto
4. Reciben su gafete digital
5. Pueden compartirlo en redes sociales

### Para Pantalla Grande (TV):
1. Abre `/muro` en el navegador de la computadora conectada a la TV
2. Presiona **F11** para pantalla completa
3. El muro se actualiza solo cuando alguien se registra

## 🎨 PERSONALIZACIÓN (OPCIONAL)

### Agregar Logo de la Iglesia

Edita estos archivos:
- `src/components/HeroSection.astro` (línea 16)
- `src/components/GafeteDigital.tsx` (línea 92)
- `src/components/MuroTiempoReal.tsx` (línea 35)

Ejemplo:
```astro
<img src="/logo.png" alt="The Victory Church" class="h-20 mx-auto mb-4" />
```

### Cambiar Fecha del Evento

Si el evento NO es el 28 de Febrero, 2026, edita:
- `src/components/HeroSection.astro` (línea 26-27)
- `src/components/GafeteDigital.tsx` (línea 117-118)
- `src/components/MuroTiempoReal.tsx` (línea 45)

## 📊 MONITOREO

### Ver Registros en Tiempo Real

En Supabase:
1. **Table Editor** → `asistentes`
2. Verás todos los registros

### Ver Fotos Subidas

En Supabase:
1. **Storage** → **avatars**
2. Todas las fotos

## 🔧 COMANDOS ÚTILES

```bash
npm run dev       # Desarrollo local
npm run build     # Construir para producción
npm run preview   # Preview del build
```

## ❌ SOLUCIÓN DE PROBLEMAS

### "No se pudo subir la foto"
- ✅ Verifica que el bucket `avatars` existe
- ✅ Verifica que es público
- ✅ Verifica las políticas SQL

### "No se pudo registrar"
- ✅ Verifica credenciales en `.env`
- ✅ Verifica que ejecutaste la migración SQL

### Muro no se actualiza
- ✅ Verifica que ejecutaste el comando Realtime del SQL

### Cámara no funciona
- ✅ Usa HTTPS (Vercel lo hace automático)
- ✅ En desarrollo local, usa ngrok o similar

## 📚 ARCHIVOS IMPORTANTES

- `SETUP.md` → Guía detallada completa
- `supabase-migration.sql` → Migración para Supabase
- `public/icons/README.md` → Instrucciones de iconos
- `.env` → Variables de entorno (CONFIGURAR)

## 💡 NOTAS IMPORTANTES

1. **Los iconos son OBLIGATORIOS** → Sin ellos la PWA no funciona
2. **Prueba en móvil real** → La cámara requiere móvil o HTTPS
3. **El muro es solo para desktop** → No responsive en móvil
4. **La compresión es automática** → No te preocupes por el tamaño de fotos
5. **Web Share API requiere HTTPS** → Funciona en producción

## ✨ TODO LISTO

Si completaste los pasos 1-5, tu app está lista para usarse.

Para más detalles, lee `SETUP.md`.

**¡Que el evento sea un éxito!** 🎊

---

### Stack Tecnológico

- Astro 5.x
- React 19
- TypeScript (strict)
- Tailwind CSS 3.x
- Supabase
- Vercel

### Estructura del Proyecto

```
the-victory/
├── src/
│   ├── components/     # Componentes UI
│   ├── layouts/        # Layout principal
│   ├── lib/           # Lógica de negocio
│   ├── pages/         # Rutas de la app
│   └── styles/        # Estilos globales
├── public/            # Archivos estáticos
├── .env               # Variables de entorno ⚠️ CONFIGURAR
└── supabase-migration.sql  # Migración DB
```
