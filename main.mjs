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
            AB: (x0,x1) => { x0.type = x1 },
      AC: Function.prototype.call.bind(DataView.prototype.getUint16),
      AD: (b, o) => new DataView(b, o),
      B: s => printToConsole(s),
      BB: (x0,x1) => { x0.fillStyle = x1 },
      BC: Function.prototype.call.bind(DataView.prototype.setInt16),
      BD: (b, o, l) => new DataView(b, o, l),
      C: Function.prototype.call.bind(Number.prototype.toString),
      CB: s => s.trim(),
      CC: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      CD: o => o.byteOffset,
      D: Function.prototype.call.bind(BigInt.prototype.toString),
      DB: (x0,x1) => x0.getContext(x1),
      DC: Function.prototype.call.bind(DataView.prototype.getInt16),
      DD: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float64Array) return 1;
        return 2;
      },
      E: (exn) => {
        let stackString = exn.toString();
        let frames = stackString.split('\n');
        let drop = 4;
        if (frames[0].startsWith('Error')) {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      EB: x0 => x0.checked,
      EC: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      ED: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float32Array) return 1;
        return 2;
      },
      F: () => new Error().stack,
      FB: () => globalThis.document,
      FC: Function.prototype.call.bind(DataView.prototype.getUint8),
      FD: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint32Array) return 1;
        return 2;
      },
      G: s => JSON.stringify(s),
      GB: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.D(f,arguments.length,x0) }),
      GC: Function.prototype.call.bind(DataView.prototype.setInt8),
      GD: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int32Array) return 1;
        return 2;
      },
      H: Function.prototype.call.bind(Number.prototype.toString),
      HB: (x0,x1) => x0.requestAnimationFrame(x1),
      HC: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      HD: o => o instanceof Uint16Array,
      I: Function.prototype.call.bind(String.prototype.indexOf),
      IB: (x0,x1,x2,x3,x4) => x0.clearRect(x1,x2,x3,x4),
      IC: Function.prototype.call.bind(DataView.prototype.getInt8),
      ID: o => o instanceof Int16Array,
      J: (s, p, i) => s.lastIndexOf(p, i),
      JB: x0 => x0.save(),
      JC: o => o.length,
      JD: o => o instanceof Uint8ClampedArray,
      K: (exn) => {
        if (exn instanceof Error) {
          return exn.stack;
        } else {
          return null;
        }
      },
      KB: o => o,
      KC: (o, i) => o[i],
      KD: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint8Array) return 1;
        return 2;
      },
      L: o => o === undefined,
      LB: (x0,x1,x2,x3,x4) => x0.fillRect(x1,x2,x3,x4),
      LC: o => {
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
      LD: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int8Array) return 1;
        return 2;
      },
      M: o => String(o),
      MB: x0 => x0.beginPath(),
      MC: () => globalThis.window,
      N: (x0,x1) => x0.querySelector(x1),
      NB: (x0,x1,x2,x3,x4) => x0.rect(x1,x2,x3,x4),
      NC: (x0,x1) => { x0.disabled = x1 },
      O: x0 => x0.focus(),
      OB: x0 => x0.fill(),
      OC: (x0,x1) => { x0.innerText = x1 },
      P: (x0,x1) => x0.getElementById(x1),
      PB: x0 => x0.restore(),
      PC: (x0,x1) => { x0.color = x1 },
      Q: (l, r) => l === r,
      QB: (x0,x1,x2,x3,x4,x5,x6) => x0.setTransform(x1,x2,x3,x4,x5,x6),
      QC: (x0,x1) => { x0.background = x1 },
      R: b => !!b,
      RB: x0 => x0.height,
      RC: x0 => x0.style,
      S: (x0,x1) => { x0.checked = x1 },
      SB: x0 => x0.width,
      SC: x0 => x0.toDataURL(),
      T: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      TB: (x0,x1) => { x0.hidden = x1 },
      TC: x0 => x0.click(),
      U: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      UB: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      UC: (x0,x1) => { x0.download = x1 },
      V: x0 => x0.flags,
      VB: f => f.dartFunction,
      VC: (x0,x1) => { x0.href = x1 },
      W: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      WB: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.E(f,arguments.length,x0) }),
      WC: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.G(f,arguments.length,x0) }),
      X: o => o instanceof RegExp,
      XB: (module,f) => finalizeWrapper(f, function(x0,x1) { return module.exports.F(f,arguments.length,x0,x1) }),
      XC: (x0,x1) => x0.toBlob(x1),
      Y: (string, times) => string.repeat(times),
      YB: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      YC: x0 => new ClipboardItem(x0),
      Z: (x0,x1) => x0.test(x1),
      ZB: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      ZC: (x0,x1) => x0.write(x1),
      a: o => o,
      aB: o => o.buffer,
      aC: x0 => new Array(x0),
      b: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'boolean') return 1;
        return 2;
      },
      bB: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      bC: o => [o],
      c: (x0,x1,x2) => x0.toggle(x1,x2),
      cB: Function.prototype.call.bind(DataView.prototype.setFloat64),
      cC: (o0, o1) => [o0, o1],
      d: x0 => x0.classList,
      dB: x0 => x0.unicode,
      dC: (o0, o1, o2) => [o0, o1, o2],
      e: x0 => x0.id,
      eB: x0 => x0.index,
      eC: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      f: x0 => x0.value,
      fB: (x0,x1) => x0[x1],
      fC: (x0,x1,x2) => { x0[x1] = x2 },
      g: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      gB: (x0,x1) => x0.exec(x1),
      gC: x0 => x0.clipboard,
      h: (module,f) => finalizeWrapper(f, function(x0) { return module.exports.C(f,arguments.length,x0) }),
      hB: (x0,x1) => { x0.lastIndex = x1 },
      hC: x0 => x0.navigator,
      i: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      iB: x0 => x0.dotAll,
      iC: () => ({}),
      j: x0 => x0.random(),
      jB: x0 => x0.ignoreCase,
      jC: (o, p, v) => o[p] = v,
      k: o => o,
      kB: x0 => x0.multiline,
      kC: () => [],
      l: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'number') return 1;
        return 2;
      },
      lB: (t, s) => t.set(s),
      lC: (a, i) => a.push(i),
      m: () => globalThis.Math,
      mB: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      mC: x0 => new Int8Array(x0),
      n: (x0,x1) => x0.createElement(x1),
      nB: Function.prototype.call.bind(DataView.prototype.getFloat64),
      nC: x0 => new Uint8Array(x0),
      o: (x0,x1) => x0.appendChild(x1),
      oB: Function.prototype.call.bind(DataView.prototype.setFloat32),
      oC: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      p: (x0,x1) => { x0.title = x1 },
      pB: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      pC: x0 => new Uint8ClampedArray(x0),
      q: s => s.toUpperCase(),
      qB: Function.prototype.call.bind(DataView.prototype.getFloat32),
      qC: x0 => new Int16Array(x0),
      r: Object.is,
      rB: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      rC: x0 => new Uint16Array(x0),
      s: x0 => x0.target,
      sB: Function.prototype.call.bind(DataView.prototype.setUint8),
      sC: x0 => new Int32Array(x0),
      t: (x0,x1) => x0[x1],
      tB: Function.prototype.call.bind(DataView.prototype.setUint32),
      tC: x0 => new Uint32Array(x0),
      u: (x0,x1) => { x0.htmlFor = x1 },
      uB: Function.prototype.call.bind(DataView.prototype.getUint32),
      uC: x0 => new Float32Array(x0),
      v: (x0,x1) => { x0.innerHTML = x1 },
      vB: Function.prototype.call.bind(DataView.prototype.setInt32),
      vC: x0 => new Float64Array(x0),
      w: (x0,x1,x2) => { x0[x1] = x2 },
      wB: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      wC: x0 => new ArrayBuffer(x0),
      x: x0 => x0.dataset,
      xB: Function.prototype.call.bind(DataView.prototype.getInt32),
      xC: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      y: (x0,x1) => { x0.name = x1 },
      yB: Function.prototype.call.bind(DataView.prototype.setUint16),
      yC: (x0,x1,x2) => new DataView(x0,x1,x2),
      z: (x0,x1) => { x0.id = x1 },
      zB: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      zC: (o, p) => o[p],

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
