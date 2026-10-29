// Compiles a dart2wasm-generated main module from `source` which can then
// be instantiated via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string'], importedStringConstants: ''};
  return new CompiledApp(
      await _compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm module from `bytes` which is then
// instantiable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = {builtins: ['js-string'], importedStringConstants: ''};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

let _isCompileStreamingSupported;
async function _compileStreaming(source, builtins) {
  _isCompileStreamingSupported ??= WebAssembly.compileStreaming(
    new Response(
      new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,2,23,1,14,119,97,115,109,58,106,115,45,115,116,114,105,110,103,4,99,97,115,116,0,0]),
      {headers: {'Content-Type': 'application/wasm'}},
    ),
    builtins,
  ).then(() => false, (e) => e instanceof WebAssembly.CompileError);
  if (await _isCompileStreamingSupported) {
    return WebAssembly.compileStreaming(source, builtins);
  }
  return WebAssembly.compile(await (await source).arrayBuffer(), builtins);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredModules` is a JS function that takes an array of module names
  //   matching wasm files produced by the dart2wasm compiler. It also takes a
  //   callback that should be invoked for each loaded module with 2 arguments:
  //   (1) the module name, (2) the loaded module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The callback
  //   returns a Promise that resolves when the module is instantiated.
  //   loadDeferredModules should return a Promise that resolves when all the
  //   modules have been loaded and the callback promises have resolved.
  // `loadDeferredId` is a JS function that takes load ID produced by the
  //   compiler when the `use-load-ids` option is passed. Each load ID maps to
  //   one or more wasm files as specified in the emitted JSON file. It also
  //   takes a callback that should be invoked for each loaded module with 2
  //   arguments: (1) the module name, (2) the loaded module in a format
  //   supported by `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  //   The callback returns a Promise that resolves when the module is
  //   instantiated.
  //   loadDeferredId should return a Promise that resolves when all the
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
      AC: (x0,x1,x2) => { x0[x1] = x2 },
      AD: (x0,x1) => { x0.fillStyle = x1 },
      B: s => printToConsole(s),
      BB: (x0,x1) => { x0.disabled = x1 },
      BC: x0 => x0.clipboard,
      BD: (x0,x1) => x0.getContext(x1),
      C: Function.prototype.call.bind(Number.prototype.toString),
      CB: b => !!b,
      CC: x0 => x0.navigator,
      D: Function.prototype.call.bind(BigInt.prototype.toString),
      DB: (x0,x1) => { x0.innerText = x1 },
      DC: () => ({}),
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
      EC: (o, p, v) => o[p] = v,
      F: o => String(o),
      FB: (x0,x1) => { x0.background = x1 },
      FC: () => [],
      G: () => new Error().stack,
      GB: x0 => x0.style,
      GC: (a, i) => a.push(i),
      H: s => JSON.stringify(s),
      HB: (x0,x1) => x0.querySelector(x1),
      HC: x0 => new Int8Array(x0),
      I: Function.prototype.call.bind(Number.prototype.toString),
      IB: (x0,x1,x2) => x0.toggle(x1,x2),
      IC: x0 => new Uint8Array(x0),
      J: Function.prototype.call.bind(String.prototype.indexOf),
      JB: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'boolean') return 1;
        return 2;
      },
      JC: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      K: (s, p, i) => s.lastIndexOf(p, i),
      KB: x0 => x0.classList,
      KC: x0 => new Uint8ClampedArray(x0),
      L: (exn) => {
        if (exn instanceof Error) {
          return exn.stack;
        } else {
          return null;
        }
      },
      LB: (l, r) => l === r,
      LC: x0 => new Int16Array(x0),
      M: o => o === undefined,
      MB: (x0,x1) => { x0.hidden = x1 },
      MC: x0 => new Uint16Array(x0),
      N: (x0,x1) => x0.createElement(x1),
      NB: x0 => x0.flags,
      NC: x0 => new Int32Array(x0),
      O: (x0,x1) => x0.appendChild(x1),
      OB: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      OC: x0 => new Uint32Array(x0),
      P: x0 => x0.focus(),
      PB: o => o instanceof RegExp,
      PC: x0 => new Float32Array(x0),
      Q: (x0,x1) => x0.getElementById(x1),
      QB: (x0,x1) => x0.test(x1),
      QC: x0 => new Float64Array(x0),
      R: (x0,x1) => x0.requestAnimationFrame(x1),
      RB: s => s.trim(),
      RC: x0 => new ArrayBuffer(x0),
      S: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      SB: x0 => x0.value,
      SC: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      T: o => o,
      TB: (x0,x1) => { x0.title = x1 },
      TC: (x0,x1,x2) => new DataView(x0,x1,x2),
      U: o => {
        if (o === undefined || o === null) return 0;
        if (typeof o === 'number') return 1;
        return 2;
      },
      UB: s => s.toUpperCase(),
      UC: (o, p) => o[p],
      V: (x0,x1,x2,x3,x4) => x0.clearRect(x1,x2,x3,x4),
      VB: Object.is,
      VC: (b, o) => new DataView(b, o),
      W: x0 => x0.save(),
      WB: (x0,x1) => x0[x1],
      WC: (b, o, l) => new DataView(b, o, l),
      X: (x0,x1,x2,x3,x4) => x0.fillRect(x1,x2,x3,x4),
      XB: x0 => x0.target,
      XC: o => o.byteOffset,
      Y: x0 => x0.beginPath(),
      YB: (x0,x1) => { x0.htmlFor = x1 },
      YC: o => o.buffer,
      Z: (x0,x1,x2,x3,x4) => x0.rect(x1,x2,x3,x4),
      ZB: x0 => x0.id,
      ZC: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float64Array) return 1;
        return 2;
      },
      a: x0 => x0.fill(),
      aB: (x0,x1) => { x0.innerHTML = x1 },
      aC: Function.prototype.call.bind(DataView.prototype.setFloat64),
      b: x0 => x0.restore(),
      bB: (x0,x1,x2) => { x0[x1] = x2 },
      bC: Function.prototype.call.bind(DataView.prototype.setFloat32),
      c: o => o,
      cB: x0 => x0.dataset,
      cC: (t, s) => t.set(s),
      d: (x0,x1,x2,x3,x4,x5,x6) => x0.setTransform(x1,x2,x3,x4,x5,x6),
      dB: (x0,x1) => { x0.name = x1 },
      dC: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Float32Array) return 1;
        return 2;
      },
      e: x0 => x0.height,
      eB: (x0,x1) => { x0.id = x1 },
      eC: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint32Array) return 1;
        return 2;
      },
      f: x0 => x0.width,
      fB: (x0,x1) => { x0.type = x1 },
      fC: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int32Array) return 1;
        return 2;
      },
      g: f => f.dartFunction,
      gB: () => globalThis.document,
      gC: o => o instanceof Uint16Array,
      h: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      hB: x0 => x0.checked,
      hC: o => o instanceof Int16Array,
      i: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      iB: (x0,x1) => { x0.checked = x1 },
      iC: o => o instanceof Uint8ClampedArray,
      j: (wasmFunction,f) => finalizeWrapper(f, function(x0,x1) { return wasmFunction(f,arguments.length,x0,x1) }),
      jB: x0 => x0.toDataURL(),
      jC: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Uint8Array) return 1;
        return 2;
      },
      k: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      kB: x0 => x0.click(),
      kC: Function.prototype.call.bind(DataView.prototype.setInt32),
      l: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      lB: (x0,x1) => { x0.download = x1 },
      lC: Function.prototype.call.bind(DataView.prototype.setUint32),
      m: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      mB: (x0,x1) => { x0.href = x1 },
      mC: Function.prototype.call.bind(DataView.prototype.setInt16),
      n: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      nB: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      nC: Function.prototype.call.bind(DataView.prototype.setUint16),
      o: Function.prototype.call.bind(DataView.prototype.getFloat64),
      oB: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      oC: Function.prototype.call.bind(DataView.prototype.setUint8),
      p: Function.prototype.call.bind(DataView.prototype.getFloat32),
      pB: x0 => x0.random(),
      pC: Function.prototype.call.bind(DataView.prototype.setInt8),
      q: Function.prototype.call.bind(DataView.prototype.getUint32),
      qB: () => globalThis.Math,
      qC: o => {
        if (o === null || o === undefined) return 0;
        if (o instanceof Int8Array) return 1;
        return 2;
      },
      r: Function.prototype.call.bind(DataView.prototype.getInt32),
      rB: (x0,x1) => x0.toBlob(x1),
      rC: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      s: Function.prototype.call.bind(DataView.prototype.getUint16),
      sB: (wasmFunction,f) => finalizeWrapper(f, function(x0) { return wasmFunction(f,arguments.length,x0) }),
      sC: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      t: Function.prototype.call.bind(DataView.prototype.getInt16),
      tB: x0 => new ClipboardItem(x0),
      tC: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      u: Function.prototype.call.bind(DataView.prototype.getUint8),
      uB: (x0,x1) => x0.write(x1),
      uC: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      v: Function.prototype.call.bind(DataView.prototype.getInt8),
      vB: x0 => new Array(x0),
      vC: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      w: (o, i) => o[i],
      wB: o => [o],
      wC: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      x: o => o.length,
      xB: (o0, o1) => [o0, o1],
      xC: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      y: o => o,
      yB: (o0, o1, o2) => [o0, o1, o2],
      yC: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
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
      zB: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      zC: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),

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

    

    dartInstance = await WebAssembly.instantiate(this.module, {
      ...baseImports,
      ...additionalImports,
      
    });

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
