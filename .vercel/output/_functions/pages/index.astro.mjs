/* empty css                                */
import { e as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_rqQWen4l.mjs';
import 'piccolore';
import { u as uploadPhoto, i as insertAsistente, $ as $$Layout } from '../chunks/supabase_CDWyk0EB.mjs';
import 'clsx';
/* empty css                                 */
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';
export { renderers } from '../renderers.mjs';

const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="hero min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden" data-astro-cid-nlow4r3u> <!-- Efecto de fondo decorativo --> <div class="absolute inset-0 opacity-10" data-astro-cid-nlow4r3u> <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-victoria-gold rounded-full filter blur-3xl" data-astro-cid-nlow4r3u></div> <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-victoria-gold rounded-full filter blur-3xl" data-astro-cid-nlow4r3u></div> </div> <!-- Contenido principal --> <div class="relative z-10 max-w-4xl mx-auto space-y-8 animate-fadeInUp" data-astro-cid-nlow4r3u> <!-- Logo placeholder (usuario agregará después) --> <div class="mb-8" data-astro-cid-nlow4r3u> <h1 class="font-display text-victoria-gold text-2xl md:text-3xl tracking-wider mb-2" data-astro-cid-nlow4r3u>
The Victory Church
</h1> </div> <!-- Título principal --> <h2 class="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-victoria-gold text-shadow-gold" data-astro-cid-nlow4r3u>
Bienvenido a Casa
</h2> <!-- Subtítulo --> <p class="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-2xl mx-auto" data-astro-cid-nlow4r3u>
Estamos felices de tenerte en este evento especial
</p> <!-- Fecha y hora del evento --> <div class="text-lg md:text-xl text-victoria-gold/80 font-medium" data-astro-cid-nlow4r3u> <p data-astro-cid-nlow4r3u>28 de Febrero, 2026</p> <p data-astro-cid-nlow4r3u>6:30 PM</p> </div> <!-- Botón CTA --> <div class="pt-8" data-astro-cid-nlow4r3u> <button id="scrollToForm" class="group bg-victoria-gold hover:bg-yellow-600 text-victoria-black font-bold text-lg md:text-xl px-12 py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 glow-gold hover:shadow-2xl" data-astro-cid-nlow4r3u>
Comenzar Registro
<svg class="inline-block ml-2 w-6 h-6 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nlow4r3u> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" data-astro-cid-nlow4r3u></path> </svg> </button> </div> </div> <!-- Indicador de scroll --> <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" data-astro-cid-nlow4r3u> <svg class="w-8 h-8 text-victoria-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-nlow4r3u> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" data-astro-cid-nlow4r3u></path> </svg> </div> </section> ${renderScript($$result, "/Users/peterbarranco/Desktop/sass/the-victory/src/components/HeroSection.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/peterbarranco/Desktop/sass/the-victory/src/components/HeroSection.astro", void 0);

async function compressImage(file) {
  const options = {
    maxSizeMB: 0.5,
    // Tamaño máximo: 500KB
    maxWidthOrHeight: 800,
    // Máximo 800px de ancho o alto
    useWebWorker: true,
    // Usar web worker para mejor rendimiento
    fileType: "image/jpeg",
    // Convertir a JPEG para mejor compresión
    initialQuality: 0.8
    // Calidad inicial del 80%
  };
  try {
    const compressedFile = await imageCompression(file, options);
    console.log("Tamaño original:", (file.size / 1024 / 1024).toFixed(2), "MB");
    console.log("Tamaño comprimido:", (compressedFile.size / 1024 / 1024).toFixed(2), "MB");
    return compressedFile;
  } catch (error) {
    console.error("Error al comprimir imagen:", error);
    return file;
  }
}
function isValidImage(file) {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 10 * 1024 * 1024;
  if (!validTypes.includes(file.type)) {
    alert("Por favor selecciona una imagen válida (JPG, PNG o WebP)");
    return false;
  }
  if (file.size > maxSize) {
    alert("La imagen es demasiado grande. El tamaño máximo es 10MB.");
    return false;
  }
  return true;
}
function createImagePreview(file) {
  return URL.createObjectURL(file);
}

function FormularioRegistro() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isValidImage(file)) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }
    setSelectedFile(file);
    const preview = createImagePreview(file);
    setPreviewUrl(preview);
    setError(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.nombre.trim()) {
      setError("Por favor ingresa tu nombre completo");
      return;
    }
    if (!formData.telefono.trim()) {
      setError("Por favor ingresa tu teléfono");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Por favor ingresa un email válido");
      return;
    }
    if (!selectedFile) {
      setError("Por favor toma una foto para tu gafete");
      return;
    }
    setIsLoading(true);
    try {
      const compressedFile = await compressImage(selectedFile);
      const fotoUrl = await uploadPhoto(compressedFile);
      const asistenteId = await insertAsistente({
        nombre: formData.nombre.trim(),
        telefono: formData.telefono.trim(),
        email: formData.email.trim(),
        foto_url: fotoUrl
      });
      window.location.href = `/bienvenida/${asistenteId}`;
    } catch (err) {
      console.error("Error al registrar:", err);
      setError(
        err instanceof Error ? err.message : "Ocurrió un error al registrarte. Por favor intenta de nuevo."
      );
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("section", { id: "registro-form", className: "min-h-screen flex items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-victoria-gold/20", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-display font-bold text-victoria-gold text-center mb-8", children: "Registro" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "nombre", className: "block text-sm font-medium text-white/80 mb-2", children: "Nombre Completo *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "nombre",
            name: "nombre",
            value: formData.nombre,
            onChange: handleInputChange,
            required: true,
            className: "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-victoria-gold focus:border-transparent transition-all",
            placeholder: "Ingresa tu nombre",
            disabled: isLoading
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "telefono", className: "block text-sm font-medium text-white/80 mb-2", children: "Teléfono *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            id: "telefono",
            name: "telefono",
            value: formData.telefono,
            onChange: handleInputChange,
            required: true,
            className: "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-victoria-gold focus:border-transparent transition-all",
            placeholder: "+1 (555) 123-4567",
            disabled: isLoading
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-white/80 mb-2", children: "Email *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "email",
            name: "email",
            value: formData.email,
            onChange: handleInputChange,
            required: true,
            className: "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-victoria-gold focus:border-transparent transition-all",
            placeholder: "tu@email.com",
            disabled: isLoading
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "foto", className: "block text-sm font-medium text-white/80 mb-2", children: "Foto para tu Gafete *" }),
        previewUrl && /* @__PURE__ */ jsx("div", { className: "mb-4 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: previewUrl,
              alt: "Preview",
              className: "w-32 h-32 rounded-full object-cover border-4 border-victoria-gold shadow-lg"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setSelectedFile(null);
                setPreviewUrl(null);
              },
              className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors",
              disabled: isLoading,
              children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "foto",
            className: "flex items-center justify-center w-full px-4 py-3 bg-victoria-gold/20 border-2 border-dashed border-victoria-gold/50 rounded-lg cursor-pointer hover:bg-victoria-gold/30 transition-all",
            children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxs(
                "svg",
                {
                  className: "mx-auto h-12 w-12 text-victoria-gold",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: [
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/80", children: previewUrl ? "Cambiar foto" : "Tomar foto con cámara frontal" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            id: "foto",
            name: "foto",
            accept: "image/*",
            capture: "user",
            onChange: handleFileChange,
            className: "hidden",
            disabled: isLoading
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm", children: error }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isLoading,
          className: "w-full bg-victoria-gold hover:bg-yellow-600 text-victoria-black font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center",
          children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "spinner mr-3" }),
            "Registrando..."
          ] }) : "Completar Registro"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-xs text-white/50 text-center", children: "Tu información es segura y solo se usará para este evento." })
  ] }) }) });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "The Victory Church - Evento Especial", "description": "Reg\xEDstrate para el evento especial de The Victory Church. 28 de Febrero, 2026 - 6:30 PM" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <!-- Hero Section --> ${renderComponent($$result2, "HeroSection", $$HeroSection, {})} <!-- Formulario de Registro --> ${renderComponent($$result2, "FormularioRegistro", FormularioRegistro, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/peterbarranco/Desktop/sass/the-victory/src/components/FormularioRegistro", "client:component-export": "default" })} </main> ` })}`;
}, "/Users/peterbarranco/Desktop/sass/the-victory/src/pages/index.astro", void 0);

const $$file = "/Users/peterbarranco/Desktop/sass/the-victory/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
