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
  //   compiler when the `use-load-ids` option is passed. Each load ID maps to
  //   one or more wasm files as specified in the emitted JSON file. It also
  //   takes a callback that should be invoked for each loaded module with 2
  //   arugments: (1) the module name, (2) the loaded module in a format
  //   supported by `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  //   The callback returns a Promise that resolves when the module is
  //   instantiated.
  //   loadDeferredModules should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  async instantiate(additionalImports, {loadDeferredModules, loadDeferredId} = {}) {
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
            AB: () => globalThis.window,
      AC: () => globalThis.document,
      AD: o => o instanceof Uint8ClampedArray,
      B: s => printToConsole(s),
      BB: b => !!b,
      BC: (x0,x1) => { x0.checked = x1 },
      BD: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint8Array) return 1;
        return 2;
      },
      C: Function.prototype.call.bind(Number.prototype.toString),
      CB: (x0,x1) => { x0.disabled = x1 },
      CC: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      CD: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int8Array) return 1;
        return 2;
      },
      D: Function.prototype.call.bind(BigInt.prototype.toString),
      DB: (x0,x1) => { x0.innerText = x1 },
      DC: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.F(f,arguments.length,x0) }),
      E: (exn) => {
        let stackString = exn.toString();
        let frames = stackString.split('\n');
        let drop = 4;
        if (frames[0].startsWith('Error')) {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      EB: (x0,x1) => { x0.color = x1 },
      EC: x0 => x0.random(),
      F: () => new Error().stack,
      FB: (x0,x1) => { x0.background = x1 },
      FC: () => globalThis.Math,
      G: s => JSON.stringify(s),
      GB: x0 => x0.style,
      GC: (x0,x1) => { x0.fillStyle = x1 },
      H: Function.prototype.call.bind(Number.prototype.toString),
      HB: (l, r) => l === r,
      HC: (x0,x1) => x0.getContext(x1),
      I: Function.prototype.call.bind(String.prototype.indexOf),
      IB: (x0,x1) => { x0.hidden = x1 },
      IC: x0 => x0.checked,
      J: (s, p, i) => s.lastIndexOf(p, i),
      JB: (x0,x1) => x0.querySelector(x1),
      JC: x0 => x0.toDataURL(),
      K: (exn) => {
        if (exn instanceof Error) {
          return exn.stack;
        } else {
          return null;
        }
      },
      KB: (x0,x1,x2) => x0.toggle(x1,x2),
      KC: x0 => x0.click(),
      L: o => o === undefined,
      LB: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'boolean') return 1;
        return 2;
      },
      LC: (x0,x1) => { x0.download = x1 },
      M: o => String(o),
      MB: x0 => x0.classList,
      MC: (x0,x1) => { x0.href = x1 },
      N: (x0,x1) => x0.createElement(x1),
      NB: Function.prototype.call.bind(DataView.prototype.setUint8),
      NC: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.G(f,arguments.length,x0) }),
      O: (x0,x1) => x0.appendChild(x1),
      OB: Function.prototype.call.bind(DataView.prototype.setFloat64),
      OC: (x0,x1) => x0.toBlob(x1),
      P: x0 => x0.focus(),
      PB: Function.prototype.call.bind(DataView.prototype.setFloat32),
      PC: x0 => new ClipboardItem(x0),
      Q: (x0,x1) => x0.getElementById(x1),
      QB: (t, s) => t.set(s),
      QC: (x0,x1) => x0.write(x1),
      R: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.C(f,arguments.length,x0) }),
      RB: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      RC: x0 => new Array(x0),
      S: (x0,x1) => x0.requestAnimationFrame(x1),
      SB: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      SC: o => [o],
      T: o => o,
      TB: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      TC: (o0, o1) => [o0, o1],
      U: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'number') return 1;
        return 2;
      },
      UB: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      UC: (o0, o1, o2) => [o0, o1, o2],
      V: (x0,x1,x2,x3,x4) => x0.clearRect(x1,x2,x3,x4),
      VB: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      VC: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      W: x0 => x0.save(),
      WB: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      WC: (x0,x1,x2) => { x0[x1] = x2 },
      X: o => o,
      XB: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      XC: x0 => x0.clipboard,
      Y: (x0,x1,x2,x3,x4) => x0.fillRect(x1,x2,x3,x4),
      YB: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      YC: x0 => x0.navigator,
      Z: x0 => x0.beginPath(),
      ZB: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      ZC: () => ({}),
      a: (x0,x1,x2,x3,x4) => x0.rect(x1,x2,x3,x4),
      aB: Function.prototype.call.bind(DataView.prototype.setInt32),
      aC: (o, p, v) => o[p] = v,
      b: x0 => x0.fill(),
      bB: Function.prototype.call.bind(DataView.prototype.setUint32),
      bC: () => [],
      c: x0 => x0.restore(),
      cB: Function.prototype.call.bind(DataView.prototype.setInt16),
      cC: (a, i) => a.push(i),
      d: (x0,x1,x2,x3,x4,x5,x6) => x0.setTransform(x1,x2,x3,x4,x5,x6),
      dB: Function.prototype.call.bind(DataView.prototype.setUint16),
      dC: x0 => new Int8Array(x0),
      e: x0 => x0.height,
      eB: Function.prototype.call.bind(DataView.prototype.setInt8),
      eC: x0 => new Uint8Array(x0),
      f: x0 => x0.width,
      fB: o => o.buffer,
      fC: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      g: o => o,
      gB: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      gC: x0 => new Uint8ClampedArray(x0),
      h: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      hB: x0 => x0.flags,
      hC: x0 => new Int16Array(x0),
      i: f => f.dartFunction,
      iB: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      iC: x0 => new Uint16Array(x0),
      j: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.D(f,arguments.length,x0) }),
      jB: o => o instanceof RegExp,
      jC: x0 => new Int32Array(x0),
      k: (module,f) => finalizeWrapper(f, function(x0,x1) { return module.exports.E(f,arguments.length,x0,x1) }),
      kB: (x0,x1) => x0.test(x1),
      kC: x0 => new Uint32Array(x0),
      l: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      lB: s => s.trim(),
      lC: x0 => new Float32Array(x0),
      m: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      mB: x0 => x0.value,
      mC: x0 => new Float64Array(x0),
      n: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      nB: (x0,x1) => { x0.title = x1 },
      nC: x0 => new ArrayBuffer(x0),
      o: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      oB: s => s.toUpperCase(),
      oC: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      p: Function.prototype.call.bind(DataView.prototype.getFloat64),
      pB: Object.is,
      pC: (x0,x1,x2) => new DataView(x0,x1,x2),
      q: Function.prototype.call.bind(DataView.prototype.getFloat32),
      qB: x0 => x0.target,
      qC: (o, p) => o[p],
      r: Function.prototype.call.bind(DataView.prototype.getUint32),
      rB: (x0,x1) => x0[x1],
      rC: (b, o) => new DataView(b, o),
      s: Function.prototype.call.bind(DataView.prototype.getInt32),
      sB: (x0,x1) => { x0.htmlFor = x1 },
      sC: (b, o, l) => new DataView(b, o, l),
      t: Function.prototype.call.bind(DataView.prototype.getUint16),
      tB: x0 => x0.id,
      tC: o => o.byteOffset,
      u: Function.prototype.call.bind(DataView.prototype.getInt16),
      uB: (x0,x1) => { x0.innerHTML = x1 },
      uC: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float64Array) return 1;
        return 2;
      },
      v: Function.prototype.call.bind(DataView.prototype.getUint8),
      vB: (x0,x1,x2) => { x0[x1] = x2 },
      vC: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float32Array) return 1;
        return 2;
      },
      w: Function.prototype.call.bind(DataView.prototype.getInt8),
      wB: x0 => x0.dataset,
      wC: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint32Array) return 1;
        return 2;
      },
      x: o => o.length,
      xB: (x0,x1) => { x0.name = x1 },
      xC: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int32Array) return 1;
        return 2;
      },
      y: (o, i) => o[i],
      yB: (x0,x1) => { x0.id = x1 },
      yC: o => o instanceof Uint16Array,
      z: o => {
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
      zB: (x0,x1) => { x0.type = x1 },
      zC: o => o instanceof Int16Array,

    };

    const baseImports = {
      _: dart2wasm,
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
    dartInstance.exports.B(dartInstance);

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
