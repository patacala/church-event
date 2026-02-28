# Iconos PWA - The Victory Church

## 📝 Instrucciones

Esta carpeta debe contener los iconos para la Progressive Web App (PWA).

### Archivos Necesarios

Crea dos archivos PNG con tu logo de la iglesia:

1. **`icon-192.png`** - 192 x 192 píxeles
2. **`icon-512.png`** - 512 x 512 píxeles

### Especificaciones de Diseño

- **Formato:** PNG
- **Fondo:** Negro (#000000)
- **Logo/Texto:** Dorado (#D4AF37)
- **Margen:** Deja al menos 20px de margen en todos los lados

### Herramientas Recomendadas

Puedes usar cualquiera de estas herramientas para crear los iconos:

1. **Canva** (gratuito, fácil)
   - Crear diseño → Tamaño personalizado (192x192 o 512x512)
   - Fondo negro
   - Agregar logo/texto en dorado
   - Descargar como PNG

2. **Figma** (gratuito)
   - Frame de 192x192 o 512x512
   - Fondo negro
   - Agregar logo
   - Export → PNG

3. **PWA Image Generator** (online)
   - https://www.pwabuilder.com/imageGenerator
   - Sube tu logo
   - Genera todos los tamaños automáticamente

### Diseño Temporal

Mientras preparas los iconos oficiales, puedes crear unos simples con:

- Fondo negro sólido
- Texto "TVC" en dorado (fuente Georgia)
- Centrado

### Verificación

Después de agregar los iconos:
1. Reinicia el servidor de desarrollo
2. Abre DevTools → Application → Manifest
3. Verifica que los iconos aparecen correctamente

### Ejemplo de Código SVG → PNG

Si tienes un logo SVG, puedes convertirlo a PNG usando:
- https://cloudconvert.com/svg-to-png
- O Adobe Illustrator / Inkscape
