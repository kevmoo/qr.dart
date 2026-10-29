(async () => {
const isWorker = typeof document === 'undefined';
const thisScript = isWorker ? undefined : document.currentScript;

function relativeURL(ref) {
  if (isWorker) {
    return new URL(ref, self.location.href).toString();
  }
  const base = thisScript?.src ?? document.baseURI;
  return new URL(ref, base).toString();
}

const forceJS = (() => {
  if (thisScript && thisScript.src) {
    const fromScript = new URL(thisScript.src).searchParams.get('force_js');
    if (fromScript) return fromScript;
  }
  return new URLSearchParams(self.location.search).get('force_js');
})();
if (!forceJS && (WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,95,1,120,0]))&&WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]))&&!WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,2,23,1,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,4,99,97,115,116,0,0]),{"builtins":["js-string"]})&&WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,13,1,11,0,2,64,31,64,1,2,0,11,11,11])))) {

const moduleLoadingCache = new Map();
function getModuleBytes(m, callback) {
  const cached = moduleLoadingCache.get(m);
  if (!!cached) return cached;
  const loadPromise = fetch(relativeURL(`./${m}`)).then((b) => callback(m, b));
  moduleLoadingCache.set(m, loadPromise);
  return loadPromise;
}
function loadDeferredModules(modules, handleWasmBytes) {
  return Promise.all(modules.map((m) => getModuleBytes(m, handleWasmBytes)));
}
let { compileStreaming } = await import(relativeURL("./main.mjs"));

let app = await compileStreaming(fetch(relativeURL("main.wasm")));
let module = await app.instantiate({}, {loadDeferredModules: loadDeferredModules});
module.invokeMain();

} else {
if (isWorker) {
  importScripts(relativeURL("./main.dart2js.js"));
} else {
  const scriptTag = document.createElement("script");
  scriptTag.type = "application/javascript";
  scriptTag.src = relativeURL("./main.dart2js.js");
  document.head.append(scriptTag);
}
}

})();
