import { e as createComponent, g as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate, h as createAstro } from './astro/server_rqQWen4l.mjs';
import 'piccolore';
import 'clsx';
/* empty css                        */
import { createClient } from '@supabase/supabase-js';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Registro para el evento especial de The Victory Church"
  } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- PWA Configuration --><link rel="manifest" href="/manifest.json"><meta name="theme-color" content="#D4AF37"><meta name="application-name" content="Victory Event"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="Victory Event"><!-- Apple Touch Icons --><link rel="apple-touch-icon" href="/icons/icon-192.png"><link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png"><link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="/icons/icon-512.png"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(canonicalURL, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image" content="/icons/icon-512.png"><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Global Styles -->${renderHead()}</head> <body class="bg-victoria-black text-white min-h-screen"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/peterbarranco/Desktop/sass/the-victory/src/layouts/Layout.astro", void 0);

const supabaseUrl = "https://tu-proyecto.supabase.co";
const supabaseAnonKey = "tu-anon-key-aqui";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
async function uploadPhoto(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = fileName;
  const { data, error } = await supabase.storage.from("avatars").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false
  });
  if (error) {
    console.error("Error al subir foto:", error);
    throw new Error("No se pudo subir la foto. Intenta de nuevo.");
  }
  const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath);
  return publicUrl;
}
async function insertAsistente(data) {
  const { data: asistente, error } = await supabase.from("asistentes").insert([data]).select("id").single();
  if (error) {
    console.error("Error al insertar asistente:", error);
    throw new Error("No se pudo registrar al asistente. Intenta de nuevo.");
  }
  return asistente.id;
}
async function getAsistente(id) {
  const { data, error } = await supabase.from("asistentes").select("*").eq("id", id).single();
  if (error) {
    console.error("Error al obtener asistente:", error);
    return null;
  }
  return data;
}
async function getAsistentesCount() {
  const { count, error } = await supabase.from("asistentes").select("*", { count: "exact", head: true });
  if (error) {
    console.error("Error al contar asistentes:", error);
    return 0;
  }
  return count || 0;
}
async function getAsistentes(limit = 100) {
  const { data, error } = await supabase.from("asistentes").select("*").order("created_at", { ascending: false }).limit(limit);
  if (error) {
    console.error("Error al obtener asistentes:", error);
    return [];
  }
  return data || [];
}
function subscribeToNewAsistentes(callback) {
  const channel = supabase.channel("asistentes-changes").on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "asistentes"
    },
    (payload) => {
      callback(payload.new);
    }
  ).subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}

export { $$Layout as $, getAsistentes as a, getAsistentesCount as b, getAsistente as g, insertAsistente as i, subscribeToNewAsistentes as s, uploadPhoto as u };
