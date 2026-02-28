import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_rqQWen4l.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_C6ufOCNS.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/peterbarranco/Desktop/sass/the-victory/","cacheDir":"file:///Users/peterbarranco/Desktop/sass/the-victory/node_modules/.astro/","outDir":"file:///Users/peterbarranco/Desktop/sass/the-victory/dist/","srcDir":"file:///Users/peterbarranco/Desktop/sass/the-victory/src/","publicDir":"file:///Users/peterbarranco/Desktop/sass/the-victory/public/","buildClientDir":"file:///Users/peterbarranco/Desktop/sass/the-victory/dist/client/","buildServerDir":"file:///Users/peterbarranco/Desktop/sass/the-victory/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.HG6957av.css"}],"routeData":{"route":"/bienvenida/[id]","isIndex":false,"type":"page","pattern":"^\\/bienvenida\\/([^/]+?)\\/?$","segments":[[{"content":"bienvenida","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/bienvenida/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.HG6957av.css"},{"type":"inline","content":"body{cursor:none}main[data-astro-cid-lvstmcm5]{-moz-user-select:none;user-select:none;-webkit-user-select:none}\n"}],"routeData":{"route":"/muro","isIndex":false,"type":"page","pattern":"^\\/muro\\/?$","segments":[[{"content":"muro","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/muro.astro","pathname":"/muro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.HG6957av.css"},{"type":"inline","content":".hero[data-astro-cid-nlow4r3u]:before{content:\"\";position:absolute;inset:0;background:radial-gradient(circle at center,rgba(212,175,55,.05) 0%,transparent 70%);pointer-events:none}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/peterbarranco/Desktop/sass/the-victory/src/pages/bienvenida/[id].astro",{"propagation":"none","containsHead":true}],["/Users/peterbarranco/Desktop/sass/the-victory/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/peterbarranco/Desktop/sass/the-victory/src/pages/muro.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/bienvenida/[id]@_@astro":"pages/bienvenida/_id_.astro.mjs","\u0000@astro-page:src/pages/muro@_@astro":"pages/muro.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_cYoHV_zp.mjs","/Users/peterbarranco/Desktop/sass/the-victory/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DzFEvKVh.mjs","/Users/peterbarranco/Desktop/sass/the-victory/src/components/GafeteDigital":"_astro/GafeteDigital.BwGWMlxq.js","/Users/peterbarranco/Desktop/sass/the-victory/src/components/FormularioRegistro":"_astro/FormularioRegistro.BTyu6XkR.js","/Users/peterbarranco/Desktop/sass/the-victory/src/components/MuroTiempoReal":"_astro/MuroTiempoReal.CHGBi63T.js","@astrojs/react/client.js":"_astro/client.Dc9Vh3na.js","/Users/peterbarranco/Desktop/sass/the-victory/src/components/HeroSection.astro?astro&type=script&index=0&lang.ts":"_astro/HeroSection.astro_astro_type_script_index_0_lang.D0EL2ErJ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/peterbarranco/Desktop/sass/the-victory/src/components/HeroSection.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"scrollToForm\");t&&t.addEventListener(\"click\",()=>{const o=document.getElementById(\"registro-form\");o&&o.scrollIntoView({behavior:\"smooth\",block:\"start\"})});"]],"assets":["/_astro/_id_.HG6957av.css","/favicon.ico","/favicon.svg","/manifest.json","/_astro/FormularioRegistro.BTyu6XkR.js","/_astro/GafeteDigital.BwGWMlxq.js","/_astro/MuroTiempoReal.CHGBi63T.js","/_astro/client.Dc9Vh3na.js","/_astro/index.DiEladB3.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/supabase.DbXX_ZRQ.js","/icons/CREAR_ICONOS.txt","/icons/README.md"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"jn67hveg7dDQ7ELYJPdMTt2hlo+UOSJBe4S/yikiYRc="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
