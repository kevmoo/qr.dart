// Compiles a dart2wasm-generated main module from `source` which can then
// instantiatable via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm modules from `bytes` which is then
// instantiatable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export async function instantiate(modulePromise, importObjectPromise) {
  var moduleOrCompiledApp = await modulePromise;
  if (!(moduleOrCompiledApp instanceof CompiledApp)) {
    moduleOrCompiledApp = new CompiledApp(moduleOrCompiledApp);
  }
  const instantiatedApp = await moduleOrCompiledApp.instantiate(await importObjectPromise);
  return instantiatedApp.instantiatedModule;
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredModules` is a JS function that takes an array of module names
  //   matching wasm files produced by the dart2wasm compiler. It also takes a
  //   callback that should be invoked for each loaded module with 2 arugments:
  //   (1) the module name, (2) the loaded module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The callback
  //   returns a Promise that resolves when the module is instantiated.
  //   loadDeferredModules should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  // `loadDeferredId` is a JS function that takes load ID produced by the
  //   compiler when the `load-ids` option is passed. Each load ID maps to one
  //   or more wasm files as specified in the emitted JSON file. It also takes a
  //   callback that should be invoked for each loaded module with 2 arugments:
  //   (1) the module name, (2) the loaded module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The callback
  //   returns a Promise that resolves when the module is instantiated.
  //   loadDeferredModules should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  // `loadDynamicModule` is a JS function that takes two string names matching,
  //   in order, a wasm file produced by the dart2wasm compiler during dynamic
  //   module compilation and a corresponding js file produced by the same
  //   compilation. It also takes a callback that should be invoked with the
  //   loaded module in a format supported by `WebAssembly.compile` or
  //   `WebAssembly.compileStreaming` and the result of using the JS 'import'
  //   API on the js file path. It should return a Promise that resolves when
  //   all the modules have been loaded and the callback promises have resolved.
  async instantiate(additionalImports,
      {loadDeferredModules, loadDynamicModule, loadDeferredId} = {}) {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + value;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {
            _29: s => JSON.stringify(s),
      _30: s => printToConsole(s),
      _31: o => {
        if (o === null || o === undefined) return 0;
        if (typeof(o) === 'string') return 1;
        return 2;
      },
      _35: s => s.toUpperCase(),
      _36: s => s.trim(),
      _39: (string, times) => string.repeat(times),
      _40: Function.prototype.call.bind(String.prototype.indexOf),
      _41: (s, p, i) => s.lastIndexOf(p, i),
      _43: Object.is,
      _81: x0 => new Array(x0),
      _85: (x0,x1) => x0[x1],
      _86: (x0,x1,x2) => { x0[x1] = x2 },
      _90: (x0,x1,x2) => new DataView(x0,x1,x2),
      _92: x0 => new Int8Array(x0),
      _93: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      _94: x0 => new Uint8Array(x0),
      _96: x0 => new Uint8ClampedArray(x0),
      _98: x0 => new Int16Array(x0),
      _100: x0 => new Uint16Array(x0),
      _102: x0 => new Int32Array(x0),
      _104: x0 => new Uint32Array(x0),
      _106: x0 => new Float32Array(x0),
      _108: x0 => new Float64Array(x0),
      _133: x0 => x0.random(),
      _136: () => globalThis.Math,
      _153: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      _155: () => new Error().stack,
      _156: (exn) => {
        let stackString = exn.toString();
        let frames = stackString.split('\n');
        let drop = 4;
        if (frames[0].startsWith('Error')) {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      _157: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      _158: (x0,x1) => x0.exec(x1),
      _159: (x0,x1) => x0.test(x1),
      _162: o => o === undefined,
      _164: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      _167: o => o instanceof RegExp,
      _168: (l, r) => l === r,
      _169: o => o,
      _170: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'number') return 1;
        return 2;
      },
      _171: o => o,
      _172: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'boolean') return 1;
        return 2;
      },
      _173: o => o,
      _174: b => !!b,
      _175: o => o.length,
      _177: (o, i) => o[i],
      _178: f => f.dartFunction,
      _179: () => ({}),
      _180: () => [],
      _185: (o, p) => o[p],
      _186: (o, p, v) => o[p] = v,
      _189: o => String(o),
      _190: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      _191: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._191(f,arguments.length,x0) }),
      _192: (module,f) => finalizeWrapper(f, function(x0,x1) { return module.exports._192(f,arguments.length,x0,x1) }),
      _193: o => {
        if (o === undefined) return 1;
        var type = typeof o;
        if (type === 'boolean') return 2;
        if (type === 'number') return 3;
        if (type === 'string') return 4;
        if (o instanceof Array) return 5;
        if (ArrayBuffer.isView(o)) {
          if (o instanceof Int8Array) return 6;
          if (o instanceof Uint8Array) return 7;
          if (o instanceof Uint8ClampedArray) return 8;
          if (o instanceof Int16Array) return 9;
          if (o instanceof Uint16Array) return 10;
          if (o instanceof Int32Array) return 11;
          if (o instanceof Uint32Array) return 12;
          if (o instanceof Float32Array) return 13;
          if (o instanceof Float64Array) return 14;
          if (o instanceof DataView) return 15;
        }
        if (o instanceof ArrayBuffer) return 16;
        // Feature check for `SharedArrayBuffer` before doing a type-check.
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
            return 17;
        }
        if (o instanceof Promise) return 18;
        return 19;
      },
      _194: o => [o],
      _195: (o0, o1) => [o0, o1],
      _196: (o0, o1, o2) => [o0, o1, o2],
      _197: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      _198: (exn) => {
        if (exn instanceof Error) {
          return exn.stack;
        } else {
          return null;
        }
      },
      _199: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _200: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _209: x0 => new ArrayBuffer(x0),
      _212: x0 => x0.index,
      _214: x0 => x0.flags,
      _215: x0 => x0.multiline,
      _216: x0 => x0.ignoreCase,
      _217: x0 => x0.unicode,
      _218: x0 => x0.dotAll,
      _219: (x0,x1) => { x0.lastIndex = x1 },
      _230: (x0,x1) => x0.createElement(x1),
      _232: (x0,x1) => x0.querySelector(x1),
      _233: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._233(f,arguments.length,x0) }),
      _235: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _242: (x0,x1) => x0.appendChild(x1),
      _243: x0 => x0.focus(),
      _244: x0 => new ClipboardItem(x0),
      _245: (x0,x1) => x0.write(x1),
      _246: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._246(f,arguments.length,x0) }),
      _247: (x0,x1) => x0.toBlob(x1),
      _248: x0 => x0.toDataURL(),
      _249: x0 => x0.click(),
      _250: (module,f) => finalizeWrapper(f, function(x0) { return module.exports._250(f,arguments.length,x0) }),
      _251: (x0,x1) => x0.requestAnimationFrame(x1),
      _252: (x0,x1) => x0.getElementById(x1),
      _253: (x0,x1,x2) => x0.toggle(x1,x2),
      _254: (x0,x1,x2,x3,x4) => x0.clearRect(x1,x2,x3,x4),
      _255: x0 => x0.save(),
      _256: (x0,x1,x2,x3,x4) => x0.fillRect(x1,x2,x3,x4),
      _257: x0 => x0.beginPath(),
      _258: (x0,x1,x2,x3,x4) => x0.rect(x1,x2,x3,x4),
      _259: x0 => x0.fill(),
      _260: x0 => x0.restore(),
      _261: (x0,x1,x2,x3,x4,x5,x6) => x0.setTransform(x1,x2,x3,x4,x5,x6),
      _272: a => a.length,
      _274: (a, i) => a[i],
      _280: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint8Array) return 1;
        return 2;
      },
      _281: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      _282: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int8Array) return 1;
        return 2;
      },
      _283: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      _284: o => o instanceof Uint8ClampedArray,
      _285: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      _286: o => o instanceof Uint16Array,
      _287: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      _288: o => o instanceof Int16Array,
      _289: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      _290: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint32Array) return 1;
        return 2;
      },
      _291: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      _292: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int32Array) return 1;
        return 2;
      },
      _293: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      _296: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float32Array) return 1;
        return 2;
      },
      _297: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      _298: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float64Array) return 1;
        return 2;
      },
      _299: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      _300: (a, i) => a.push(i),
      _301: (t, s) => t.set(s),
      _303: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      _305: o => o.buffer,
      _306: o => o.byteOffset,
      _307: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      _308: (b, o) => new DataView(b, o),
      _309: (b, o, l) => new DataView(b, o, l),
      _310: Function.prototype.call.bind(DataView.prototype.getUint8),
      _311: Function.prototype.call.bind(DataView.prototype.setUint8),
      _312: Function.prototype.call.bind(DataView.prototype.getInt8),
      _313: Function.prototype.call.bind(DataView.prototype.setInt8),
      _314: Function.prototype.call.bind(DataView.prototype.getUint16),
      _315: Function.prototype.call.bind(DataView.prototype.setUint16),
      _316: Function.prototype.call.bind(DataView.prototype.getInt16),
      _317: Function.prototype.call.bind(DataView.prototype.setInt16),
      _318: Function.prototype.call.bind(DataView.prototype.getUint32),
      _319: Function.prototype.call.bind(DataView.prototype.setUint32),
      _320: Function.prototype.call.bind(DataView.prototype.getInt32),
      _321: Function.prototype.call.bind(DataView.prototype.setInt32),
      _326: Function.prototype.call.bind(DataView.prototype.getFloat32),
      _327: Function.prototype.call.bind(DataView.prototype.setFloat32),
      _328: Function.prototype.call.bind(DataView.prototype.getFloat64),
      _329: Function.prototype.call.bind(DataView.prototype.setFloat64),
      _330: Function.prototype.call.bind(Number.prototype.toString),
      _331: Function.prototype.call.bind(BigInt.prototype.toString),
      _332: Function.prototype.call.bind(Number.prototype.toString),
      _339: (x0,x1) => x0.getContext(x1),
      _442: (x0,x1) => { x0.title = x1 },
      _450: (x0,x1) => { x0.hidden = x1 },
      _463: (x0,x1) => { x0.innerText = x1 },
      _473: x0 => x0.style,
      _670: x0 => x0.dataset,
      _677: (x0,x1) => x0[x1],
      _678: (x0,x1,x2) => { x0[x1] = x2 },
      _832: (x0,x1) => { x0.download = x1 },
      _857: (x0,x1) => { x0.href = x1 },
      _1390: (x0,x1) => { x0.htmlFor = x1 },
      _1410: (x0,x1) => { x0.checked = x1 },
      _1444: (x0,x1) => { x0.name = x1 },
      _1460: (x0,x1) => { x0.type = x1 },
      _1463: x0 => x0.value,
      _1498: (x0,x1) => { x0.disabled = x1 },
      _1755: x0 => x0.width,
      _1757: x0 => x0.height,
      _1818: (x0,x1) => { x0.fillStyle = x1 },
      _2172: () => globalThis.window,
      _2234: x0 => x0.navigator,
      _2602: x0 => x0.clipboard,
      _4738: x0 => x0.target,
      _4853: () => globalThis.document,
      _5271: x0 => x0.id,
      _5272: (x0,x1) => { x0.id = x1 },
      _5275: x0 => x0.classList,
      _5296: (x0,x1) => { x0.innerHTML = x1 },
      _9402: (x0,x1) => { x0.background = x1 },
      _9652: (x0,x1) => { x0.color = x1 },

    };

    const baseImports = {
      dart2wasm: dart2wasm,
      Math: Math,
      Date: Date,
      Object: Object,
      Array: Array,
      Reflect: Reflect,
      WebAssembly: {
        JSTag: WebAssembly.JSTag,
      },
      "": new Proxy({}, { get(_, prop) { return prop; } }),

    };

    const jsStringPolyfill = {
      "charCodeAt": (s, i) => s.charCodeAt(i),
      "compare": (s1, s2) => {
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        return 0;
      },
      "concat": (s1, s2) => s1 + s2,
      "equals": (s1, s2) => s1 === s2,
      "fromCharCode": (i) => String.fromCharCode(i),
      "length": (s) => s.length,
      "substring": (s, a, b) => s.substring(a, b),
      "fromCharCodeArray": (a, start, end) => {
        if (end <= start) return '';

        const read = dartInstance.exports.$wasmI16ArrayGet;
        let result = '';
        let index = start;
        const chunkLength = Math.min(end - index, 500);
        let array = new Array(chunkLength);
        while (index < end) {
          const newChunkLength = Math.min(end - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(a, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      },
      "intoCharCodeArray": (s, a, start) => {
        if (s === '') return 0;

        const write = dartInstance.exports.$wasmI16ArraySet;
        for (var i = 0; i < s.length; ++i) {
          write(a, start++, s.charCodeAt(i));
        }
        return s.length;
      },
      "test": (s) => typeof s == "string",
    };


    

    dartInstance = await WebAssembly.instantiate(this.module, {
      ...baseImports,
      ...additionalImports,
      
      "wasm:js-string": jsStringPolyfill,
    });
    dartInstance.exports.$setThisModule(dartInstance);

    return new InstantiatedApp(this, dartInstance);
  }
}

class InstantiatedApp {
  constructor(compiledApp, instantiatedModule) {
    this.compiledApp = compiledApp;
    this.instantiatedModule = instantiatedModule;
  }

  // Call the main function with the given arguments.
  invokeMain(...args) {
    this.instantiatedModule.exports.$invokeMain(args);
  }
}
