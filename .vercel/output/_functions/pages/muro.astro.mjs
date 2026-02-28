/* empty css                                */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_rqQWen4l.mjs';
import 'piccolore';
import { s as subscribeToNewAsistentes, a as getAsistentes, b as getAsistentesCount, $ as $$Layout } from '../chunks/supabase_CDWyk0EB.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
/* empty css                                */
export { renderers } from '../renderers.mjs';

function MuroTiempoReal({ initialAsistentes, initialCount }) {
  const [asistentes, setAsistentes] = useState(initialAsistentes);
  const [count, setCount] = useState(initialCount);
  const [newAsistenteId, setNewAsistenteId] = useState(null);
  useEffect(() => {
    const unsubscribe = subscribeToNewAsistentes((nuevoAsistente) => {
      setAsistentes((prev) => {
        if (prev.some((a) => a.id === nuevoAsistente.id)) {
          return prev;
        }
        return [nuevoAsistente, ...prev];
      });
      setCount((prev) => prev + 1);
      setNewAsistenteId(nuevoAsistente.id);
      setTimeout(() => setNewAsistenteId(null), 2e3);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-victoria-black text-white p-8", children: [
    /* @__PURE__ */ jsx("header", { className: "mb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl md:text-5xl lg:text-6xl text-victoria-gold font-bold mb-8 tracking-wider", children: "The Victory Church" }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxs("div", { className: "relative inline-flex items-center justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-victoria-gold rounded-full opacity-20 animate-pulse-gold" }),
        /* @__PURE__ */ jsx("div", { className: "relative bg-gradient-to-br from-victoria-black to-gray-900 rounded-full border-4 border-victoria-gold p-8 md:p-12 shadow-2xl", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-6xl md:text-8xl font-bold text-victoria-gold tabular-nums", children: count }),
          /* @__PURE__ */ jsx("div", { className: "text-xl md:text-2xl text-white/80 mt-2 font-medium", children: count === 1 ? "Asistente" : "Asistentes" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm md:text-base text-white/60 mt-1", children: "Registrados" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-white/70", children: "28 de Febrero, 2026 - 6:30 PM" })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "max-w-7xl mx-auto", children: asistentes.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 text-victoria-gold", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        }
      ) }) }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl text-white/60", children: "Esperando nuevos registros..." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6", children: asistentes.map((asistente, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `group ${newAsistenteId === asistente.id ? "animate-fade-in scale-105" : "animate-fadeInUp"}`,
        style: { animationDelay: `${Math.min(index * 0.05, 1)}s` },
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: `bg-gradient-to-br from-gray-900 to-victoria-black rounded-xl p-4 shadow-lg border-2 transition-all duration-300 ${newAsistenteId === asistente.id ? "border-victoria-gold glow-gold" : "border-white/10 hover:border-victoria-gold/50"}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-3", children: asistente.foto_url ? /* @__PURE__ */ jsxs("div", { className: "relative aspect-square", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-victoria-gold rounded-full opacity-20 group-hover:opacity-30 transition-opacity" }),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: asistente.foto_url,
                    alt: asistente.nombre,
                    className: "relative w-full h-full rounded-full object-cover border-2 border-victoria-gold/50 group-hover:border-victoria-gold transition-all",
                    loading: "lazy"
                  }
                )
              ] }) : /* @__PURE__ */ jsx("div", { className: "aspect-square bg-white/5 rounded-full flex items-center justify-center border-2 border-white/10", children: /* @__PURE__ */ jsx("svg", { className: "w-1/2 h-1/2 text-white/30", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
                  clipRule: "evenodd"
                }
              ) }) }) }),
              /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white text-sm md:text-base line-clamp-2 group-hover:text-victoria-gold transition-colors", children: asistente.nombre }) }),
              newAsistenteId === asistente.id && /* @__PURE__ */ jsx("div", { className: "mt-2 text-center", children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-1 bg-victoria-gold text-victoria-black text-xs font-bold rounded-full", children: "¡NUEVO!" }) })
            ]
          }
        )
      },
      asistente.id
    )) }) }),
    /* @__PURE__ */ jsx("footer", { className: "mt-16 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-white/40 text-sm", children: "Actualizado en tiempo real" }) })
  ] });
}

const $$Muro = createComponent(async ($$result, $$props, $$slots) => {
  const initialAsistentes = await getAsistentes(100);
  const initialCount = await getAsistentesCount();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Muro de Asistentes - The Victory Church", "description": "Muro en tiempo real de asistentes registrados al evento de The Victory Church", "data-astro-cid-lvstmcm5": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-lvstmcm5> ${renderComponent($$result2, "MuroTiempoReal", MuroTiempoReal, { "initialAsistentes": initialAsistentes, "initialCount": initialCount, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/peterbarranco/Desktop/sass/the-victory/src/components/MuroTiempoReal", "client:component-export": "default", "data-astro-cid-lvstmcm5": true })} </main> ` })} `;
}, "/Users/peterbarranco/Desktop/sass/the-victory/src/pages/muro.astro", void 0);

const $$file = "/Users/peterbarranco/Desktop/sass/the-victory/src/pages/muro.astro";
const $$url = "/muro";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Muro,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
