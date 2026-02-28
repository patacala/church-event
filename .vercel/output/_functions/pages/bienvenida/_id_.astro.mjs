/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_rqQWen4l.mjs';
import 'piccolore';
import { g as getAsistente, $ as $$Layout } from '../../chunks/supabase_CDWyk0EB.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
export { renderers } from '../../renderers.mjs';

function GafeteDigital({ asistente }) {
  const [isSharing, setIsSharing] = useState(false);
  const gafeteRef = useRef(null);
  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shareData = {
        title: "Mi Gafete - The Victory 70-12 Miami",
        text: `¡Ya estoy aqui en la celebracion de 7º aniversario de The Victory 70-12 Miami! Mira mi gafete digital.`,
        url: window.location.href
      };
      if (gafeteRef.current && navigator.canShare) {
        try {
          const dataUrl = await toPng(gafeteRef.current, {
            cacheBust: true,
            quality: 0.95,
            backgroundColor: "#000000"
          });
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], "gafete.png", { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              ...shareData,
              files: [file]
            });
            setIsSharing(false);
            return;
          }
        } catch (imageError) {
          console.warn("No se pudo capturar imagen, compartiendo solo URL:", imageError);
        }
      }
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copiado al portapapeles!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error al compartir:", error);
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link copiado al portapapeles!");
        } catch (clipboardError) {
          console.error("Error al copiar:", clipboardError);
        }
      }
    } finally {
      setIsSharing(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex flex-col items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center animate-fadeInUp", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-victoria-gold rounded-full mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-victoria-black", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-display font-bold text-victoria-gold mb-2", children: "¡Registro Exitoso!" }),
      /* @__PURE__ */ jsx("p", { className: "text-white/80", children: "Tu gafete digital está listo" })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: gafeteRef,
        className: "bg-gradient-to-br from-victoria-black via-gray-900 to-victoria-black rounded-2xl p-8 shadow-2xl border-4 border-victoria-gold relative overflow-hidden animate-fadeInUp",
        style: { animationDelay: "0.2s" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-victoria-gold transform rotate-45" }) }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-display text-xl md:text-2xl text-victoria-gold font-bold tracking-wider", children: "The Victory Church" }),
              /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-victoria-gold mx-auto mt-2 rounded-full" })
            ] }),
            asistente.foto_url && /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-victoria-gold rounded-full animate-pulse-gold" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: asistente.foto_url,
                  alt: asistente.nombre,
                  className: "relative w-40 h-40 rounded-full object-cover border-4 border-victoria-gold shadow-2xl"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-display font-bold text-white mb-2", children: asistente.nombre }) }),
            /* @__PURE__ */ jsx("div", { className: "py-4", children: /* @__PURE__ */ jsx("p", { className: "text-2xl md:text-3xl font-display text-victoria-gold font-bold", children: "¡Bienvenido a Casa!" }) }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-white/10", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-white/60", children: "28 de Febrero, 2026" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-white/60", children: "6:30 PM" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-victoria-gold/30 rounded-tl-2xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-victoria-gold/30 rounded-tr-2xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-victoria-gold/30 rounded-bl-2xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-victoria-gold/30 rounded-br-2xl" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 animate-fadeInUp", style: { animationDelay: "0.4s" }, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleShare,
          disabled: isSharing,
          className: "w-full bg-victoria-gold hover:bg-yellow-600 text-victoria-black font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center",
          children: isSharing ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "spinner mr-3 border-victoria-black" }),
            "Compartiendo..."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              }
            ) }),
            "Compartir mi Gafete"
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "block w-full bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-6 rounded-lg border border-white/20 transition-all duration-300 text-center",
          children: "Registrar a otra persona"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center pt-4", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "/muro",
        className: "text-victoria-gold hover:text-yellow-500 text-sm underline transition-colors",
        children: "Ver muro de asistentes"
      }
    ) })
  ] }) });
}

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/");
  }
  const asistente = await getAsistente(id);
  if (!asistente) {
    return Astro2.redirect("/");
  }
  const pageTitle = `${asistente.nombre} - The Victory Church`;
  const pageDescription = `Gafete digital de ${asistente.nombre} para el evento de The Victory Church`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": pageDescription }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "GafeteDigital", GafeteDigital, { "asistente": asistente, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/peterbarranco/Desktop/sass/the-victory/src/components/GafeteDigital", "client:component-export": "default" })} </main> ` })}`;
}, "/Users/peterbarranco/Desktop/sass/the-victory/src/pages/bienvenida/[id].astro", void 0);

const $$file = "/Users/peterbarranco/Desktop/sass/the-victory/src/pages/bienvenida/[id].astro";
const $$url = "/bienvenida/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
