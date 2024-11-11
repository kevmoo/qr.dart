(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q)){b[q]=a[q]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(Object.getPrototypeOf(r)&&Object.getPrototypeOf(r).p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++){inherit(b[s],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s){A.iA(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a){a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.dQ(b)
return new s(c,this)}:function(){if(s===null)s=A.dQ(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.dQ(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
dW(a,b,c,d){return{i:a,p:b,e:c,x:d}},
dU(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.dV==null){A.io()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.b(A.eh("Return interceptor for "+A.p(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.cZ
if(o==null)o=$.cZ=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.iu(a)
if(p!=null)return p
if(typeof a=="function")return B.y
s=Object.getPrototypeOf(a)
if(s==null)return B.l
if(s===Object.prototype)return B.l
if(typeof q=="function"){o=$.cZ
if(o==null)o=$.cZ=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.h,enumerable:false,writable:true,configurable:true})
return B.h}return B.h},
fA(a,b){if(a<0||a>4294967295)throw A.b(A.aG(a,0,4294967295,"length",null))
return J.fB(new Array(a),b)},
fB(a,b){var s=A.a(a,b.i("l<0>"))
s.$flags=1
return s},
ap(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.at.prototype
return J.bc.prototype}if(typeof a=="string")return J.ab.prototype
if(a==null)return J.au.prototype
if(typeof a=="boolean")return J.bb.prototype
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.V.prototype
if(typeof a=="symbol")return J.ay.prototype
if(typeof a=="bigint")return J.aw.prototype
return a}if(a instanceof A.e)return a
return J.dU(a)},
eP(a){if(typeof a=="string")return J.ab.prototype
if(a==null)return a
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.V.prototype
if(typeof a=="symbol")return J.ay.prototype
if(typeof a=="bigint")return J.aw.prototype
return a}if(a instanceof A.e)return a
return J.dU(a)},
bR(a){if(a==null)return a
if(Array.isArray(a))return J.l.prototype
if(typeof a!="object"){if(typeof a=="function")return J.V.prototype
if(typeof a=="symbol")return J.ay.prototype
if(typeof a=="bigint")return J.aw.prototype
return a}if(a instanceof A.e)return a
return J.dU(a)},
e0(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.ap(a).bb(a,b)},
fb(a,b){if(typeof b==="number")if(Array.isArray(a)||A.eW(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bR(a).p(a,b)},
fc(a,b,c){if(typeof b==="number")if((Array.isArray(a)||A.eW(a,a[v.dispatchPropertyName]))&&!(a.$flags&2)&&b>>>0===b&&b<a.length)return a[b]=c
return J.bR(a).bc(a,b,c)},
fd(a,b){return J.bR(a).n(a,b)},
fe(a){return J.bR(a).gaX(a)},
ff(a){return J.bR(a).gaZ(a)},
e1(a){return J.eP(a).gk(a)},
fg(a){return J.ap(a).gl(a)},
b2(a){return J.ap(a).h(a)},
ba:function ba(){},
bb:function bb(){},
au:function au(){},
ax:function ax(){},
W:function W(){},
bp:function bp(){},
aI:function aI(){},
V:function V(){},
aw:function aw(){},
ay:function ay(){},
l:function l(a){this.$ti=a},
cg:function cg(a){this.$ti=a},
b3:function b3(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
av:function av(){},
at:function at(){},
bc:function bc(){},
ab:function ab(){}},A={dy:function dy(){},
dP(a,b,c){return a},
it(a){var s,r
for(s=$.du.length,r=0;r<s;++r)if(a===$.du[r])return!0
return!1},
fz(){return new A.G("No element")},
az:function az(a){this.a=a},
aq:function aq(a){this.a=a},
ds:function ds(){},
ac:function ac(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
as:function as(){},
bA:function bA(){},
af:function af(){},
eT(a,b){var s=new A.aa(a,b.i("aa<0>"))
s.bi(a)
return s},
eZ(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
eW(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.E.b(a)},
p(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.b2(a)
return s},
fF(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
ci(a){return A.fD(a)},
fD(a){var s,r,q,p
if(a instanceof A.e)return A.x(A.b_(a),null)
s=J.ap(a)
if(s===B.v||s===B.z||t.o.b(a)){r=B.i(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.x(A.b_(a),null)},
fG(a){if(typeof a=="number"||A.dM(a))return J.b2(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a0)return a.h(0)
return"Instance of '"+A.ci(a)+"'"},
fE(a){var s=a.$thrownJsError
if(s==null)return null
return A.z(s)},
dA(a,b){var s
if(a.$thrownJsError==null){s=A.b(a)
a.$thrownJsError=s
s.stack=b.h(0)}},
dS(a,b){var s,r="index",q=null
if(!A.eD(b))return new A.E(!0,b,r,q)
s=J.e1(a)
if(b<0||b>=s)return A.e9(b,s,a,q,r)
return new A.aF(q,q,!0,b,r,"Value not in range")},
ih(a,b,c){if(a>c)return A.aG(a,0,c,"start",null)
if(b!=null)if(b<a||b>c)return A.aG(b,a,c,"end",null)
return new A.E(!0,b,"end",null)},
dO(a){return new A.E(!0,a,null,null)},
eO(a){return a},
b(a){return A.eS(new Error(),a)},
eS(a,b){var s
if(b==null)b=new A.K()
a.dartException=b
s=A.iC
if("defineProperty" in Object){Object.defineProperty(a,"message",{get:s})
a.name=""}else a.toString=s
return a},
iC(){return J.b2(this.dartException)},
A(a){throw A.b(a)},
dY(a,b){throw A.eS(b,a)},
T(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.dY(A.hv(a,b,c),s)},
hv(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t.j.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.aJ("'"+s+"': Cannot "+o+" "+l+k+n)},
dX(a){throw A.b(A.dw(a))},
L(a){var s,r,q,p,o,n
a=A.iz(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.a([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.cA(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
cB(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
eg(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
dz(a,b){var s=b==null,r=s?null:b.method
return new A.bd(a,r,s?null:b.receiver)},
D(a){if(a==null)return new A.ch(a)
if(a instanceof A.ar)return A.a_(a,a.a)
if(typeof a!=="object")return a
if("dartException" in a)return A.a_(a,a.dartException)
return A.i3(a)},
a_(a,b){if(t.C.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
i3(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.a.bI(r,16)&8191)===10)switch(q){case 438:return A.a_(a,A.dz(A.p(s)+" (Error "+q+")",null))
case 445:case 5007:A.p(s)
return A.a_(a,new A.aE())}}if(a instanceof TypeError){p=$.f_()
o=$.f0()
n=$.f1()
m=$.f2()
l=$.f5()
k=$.f6()
j=$.f4()
$.f3()
i=$.f8()
h=$.f7()
g=p.t(s)
if(g!=null)return A.a_(a,A.dz(s,g))
else{g=o.t(s)
if(g!=null){g.method="call"
return A.a_(a,A.dz(s,g))}else if(n.t(s)!=null||m.t(s)!=null||l.t(s)!=null||k.t(s)!=null||j.t(s)!=null||m.t(s)!=null||i.t(s)!=null||h.t(s)!=null)return A.a_(a,new A.aE())}return A.a_(a,new A.bz(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.aH()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.a_(a,new A.E(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.aH()
return a},
z(a){var s
if(a instanceof A.ar)return a.b
if(a==null)return new A.aR(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.aR(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
hG(a,b,c,d,e,f){switch(b){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.cL("Unsupported number of arguments for wrapped closure"))},
dk(a,b){var s=a.$identity
if(!!s)return s
s=A.ie(a,b)
a.$identity=s
return s},
ie(a,b){var s
switch(b){case 0:s=a.$0
break
case 1:s=a.$1
break
case 2:s=a.$2
break
case 3:s=a.$3
break
case 4:s=a.$4
break
default:s=null}if(s!=null)return s.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.hG)},
fp(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.cq().constructor.prototype):Object.create(new A.b6(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.e7(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.fl(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.e7(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
fl(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.fj)}throw A.b("Error in functionType of tearoff")},
fm(a,b,c,d){var s=A.e6
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
e7(a,b,c,d){if(c)return A.fo(a,b,d)
return A.fm(b.length,d,a,b)},
fn(a,b,c,d){var s=A.e6,r=A.fk
switch(b?-1:a){case 0:throw A.b(new A.bx("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
fo(a,b,c){var s,r
if($.e4==null)$.e4=A.e3("interceptor")
if($.e5==null)$.e5=A.e3("receiver")
s=b.length
r=A.fn(s,c,a,b)
return r},
dQ(a){return A.fp(a)},
fj(a,b){return A.db(v.typeUniverse,A.b_(a.a),b)},
e6(a){return a.a},
fk(a){return a.b},
e3(a){var s,r,q,p=new A.b6("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.r("Field name "+a+" not found.",null))},
jf(a){throw A.b(new A.bF(a))},
ij(a){return v.getIsolateTag(a)},
iu(a){var s,r,q,p,o,n=$.eQ.$1(a),m=$.dl[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.dq[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=$.eL.$2(a,n)
if(q!=null){m=$.dl[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.dq[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.dr(s)
$.dl[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.dq[n]=s
return s}if(p==="-"){o=A.dr(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.eX(a,s)
if(p==="*")throw A.b(A.eh(n))
if(v.leafTags[n]===true){o=A.dr(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.eX(a,s)},
eX(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.dW(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
dr(a){return J.dW(a,!1,null,!!a.$iy)},
iw(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.dr(s)
else return J.dW(s,c,null,null)},
io(){if(!0===$.dV)return
$.dV=!0
A.ip()},
ip(){var s,r,q,p,o,n,m,l
$.dl=Object.create(null)
$.dq=Object.create(null)
A.im()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.eY.$1(o)
if(n!=null){m=A.iw(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
im(){var s,r,q,p,o,n,m=B.n()
m=A.ao(B.o,A.ao(B.p,A.ao(B.j,A.ao(B.j,A.ao(B.q,A.ao(B.r,A.ao(B.t(B.i),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.eQ=new A.dm(p)
$.eL=new A.dn(o)
$.eY=new A.dp(n)},
ao(a,b){return a(b)||b},
ig(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
fC(a,b,c,d,e,f){var s=function(g,h){try{return new RegExp(g,h)}catch(r){return r}}(a,""+""+""+""+"")
if(s instanceof RegExp)return s
throw A.b(A.e8("Illegal RegExp pattern ("+String(s)+")",a))},
iz(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
ce:function ce(){},
aa:function aa(a,b){this.a=a
this.$ti=b},
cA:function cA(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
aE:function aE(){},
bd:function bd(a,b,c){this.a=a
this.b=b
this.c=c},
bz:function bz(a){this.a=a},
ch:function ch(a){this.a=a},
ar:function ar(a,b){this.a=a
this.b=b},
aR:function aR(a){this.a=a
this.b=null},
a0:function a0(){},
c7:function c7(){},
c8:function c8(){},
cu:function cu(){},
cq:function cq(){},
b6:function b6(a,b){this.a=a
this.b=b},
bF:function bF(a){this.a=a},
bx:function bx(a){this.a=a},
dm:function dm(a){this.a=a},
dn:function dn(a){this.a=a},
dp:function dp(a){this.a=a},
cf:function cf(a,b){this.a=a
this.b=b},
a9(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.dS(b,a))},
hr(a,b,c){var s
if(!(a>>>0!==a))s=b>>>0!==b||a>b||b>c
else s=!0
if(s)throw A.b(A.ih(a,b,c))
return b},
bf:function bf(){},
aC:function aC(){},
bg:function bg(){},
ad:function ad(){},
aA:function aA(){},
aB:function aB(){},
bh:function bh(){},
bi:function bi(){},
bj:function bj(){},
bk:function bk(){},
bl:function bl(){},
bm:function bm(){},
bn:function bn(){},
aD:function aD(){},
bo:function bo(){},
aM:function aM(){},
aN:function aN(){},
aO:function aO(){},
aP:function aP(){},
ec(a,b){var s=b.c
return s==null?b.c=A.dI(a,b.x,!0):s},
dB(a,b){var s=b.c
return s==null?b.c=A.aW(a,"t",[b.x]):s},
ed(a){var s=a.w
if(s===6||s===7||s===8)return A.ed(a.x)
return s===12||s===13},
fO(a){return a.as},
dT(a){return A.bO(v.typeUniverse,a,!1)},
eU(a,b){var s,r,q,p,o
if(a==null)return null
s=b.y
r=a.Q
if(r==null)r=a.Q=new Map()
q=b.as
p=r.get(q)
if(p!=null)return p
o=A.Q(v.typeUniverse,a.x,s,0)
r.set(q,o)
return o},
Q(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.Q(a1,s,a3,a4)
if(r===s)return a2
return A.es(a1,r,!0)
case 7:s=a2.x
r=A.Q(a1,s,a3,a4)
if(r===s)return a2
return A.dI(a1,r,!0)
case 8:s=a2.x
r=A.Q(a1,s,a3,a4)
if(r===s)return a2
return A.eq(a1,r,!0)
case 9:q=a2.y
p=A.an(a1,q,a3,a4)
if(p===q)return a2
return A.aW(a1,a2.x,p)
case 10:o=a2.x
n=A.Q(a1,o,a3,a4)
m=a2.y
l=A.an(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.dG(a1,n,l)
case 11:k=a2.x
j=a2.y
i=A.an(a1,j,a3,a4)
if(i===j)return a2
return A.er(a1,k,i)
case 12:h=a2.x
g=A.Q(a1,h,a3,a4)
f=a2.y
e=A.i0(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.ep(a1,g,e)
case 13:d=a2.y
a4+=d.length
c=A.an(a1,d,a3,a4)
o=a2.x
n=A.Q(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.dH(a1,n,c,!0)
case 14:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.b5("Attempted to substitute unexpected RTI kind "+a0))}},
an(a,b,c,d){var s,r,q,p,o=b.length,n=A.dd(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.Q(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
i1(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.dd(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.Q(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
i0(a,b,c,d){var s,r=b.a,q=A.an(a,r,c,d),p=b.b,o=A.an(a,p,c,d),n=b.c,m=A.i1(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.bJ()
s.a=q
s.b=o
s.c=m
return s},
a(a,b){a[v.arrayRti]=b
return a},
dR(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.il(s)
return a.$S()}return null},
iq(a,b){var s
if(A.ed(b))if(a instanceof A.a0){s=A.dR(a)
if(s!=null)return s}return A.b_(a)},
b_(a){if(a instanceof A.e)return A.Y(a)
if(Array.isArray(a))return A.df(a)
return A.dK(J.ap(a))},
df(a){var s=a[v.arrayRti],r=t.b
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
Y(a){var s=a.$ti
return s!=null?s:A.dK(a)},
dK(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.hE(a,s)},
hE(a,b){var s=a instanceof A.a0?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.hh(v.typeUniverse,s.name)
b.$ccache=r
return r},
il(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.bO(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
ik(a){return A.Z(A.Y(a))},
i_(a){var s=a instanceof A.a0?A.dR(a):null
if(s!=null)return s
if(t.R.b(a))return J.fg(a).a
if(Array.isArray(a))return A.df(a)
return A.b_(a)},
Z(a){var s=a.r
return s==null?a.r=A.ew(a):s},
ew(a){var s,r,q=a.as,p=q.replace(/\*/g,"")
if(p===q)return a.r=new A.da(a)
s=A.bO(v.typeUniverse,p,!0)
r=s.r
return r==null?s.r=A.ew(s):r},
J(a){return A.Z(A.bO(v.typeUniverse,a,!1))},
hD(a){var s,r,q,p,o,n,m=this
if(m===t.K)return A.P(m,a,A.hL)
if(!A.R(m))s=m===t._
else s=!0
if(s)return A.P(m,a,A.hP)
s=m.w
if(s===7)return A.P(m,a,A.hA)
if(s===1)return A.P(m,a,A.eE)
r=s===6?m.x:m
q=r.w
if(q===8)return A.P(m,a,A.hH)
if(r===t.p)p=A.eD
else if(r===t.i||r===t.n)p=A.hK
else if(r===t.N)p=A.hN
else p=r===t.v?A.dM:null
if(p!=null)return A.P(m,a,p)
if(q===9){o=r.x
if(r.y.every(A.ir)){m.f="$i"+o
if(o==="d")return A.P(m,a,A.hJ)
return A.P(m,a,A.hO)}}else if(q===11){n=A.ig(r.x,r.y)
return A.P(m,a,n==null?A.eE:n)}return A.P(m,a,A.hy)},
P(a,b,c){a.b=c
return a.b(b)},
hC(a){var s,r=this,q=A.hx
if(!A.R(r))s=r===t._
else s=!0
if(s)q=A.hk
else if(r===t.K)q=A.hj
else{s=A.b0(r)
if(s)q=A.hz}r.a=q
return r.a(a)},
bP(a){var s=a.w,r=!0
if(!A.R(a))if(!(a===t._))if(!(a===t.A))if(s!==7)if(!(s===6&&A.bP(a.x)))r=s===8&&A.bP(a.x)||a===t.P||a===t.T
return r},
hy(a){var s=this
if(a==null)return A.bP(s)
return A.is(v.typeUniverse,A.iq(a,s),s)},
hA(a){if(a==null)return!0
return this.x.b(a)},
hO(a){var s,r=this
if(a==null)return A.bP(r)
s=r.f
if(a instanceof A.e)return!!a[s]
return!!J.ap(a)[s]},
hJ(a){var s,r=this
if(a==null)return A.bP(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.e)return!!a[s]
return!!J.ap(a)[s]},
hx(a){var s=this
if(a==null){if(A.b0(s))return a}else if(s.b(a))return a
A.ey(a,s)},
hz(a){var s=this
if(a==null)return a
else if(s.b(a))return a
A.ey(a,s)},
ey(a,b){throw A.b(A.h7(A.ej(a,A.x(b,null))))},
ej(a,b){return A.c9(a)+": type '"+A.x(A.i_(a),null)+"' is not a subtype of type '"+b+"'"},
h7(a){return new A.aU("TypeError: "+a)},
v(a,b){return new A.aU("TypeError: "+A.ej(a,b))},
hH(a){var s=this,r=s.w===6?s.x:s
return r.x.b(a)||A.dB(v.typeUniverse,r).b(a)},
hL(a){return a!=null},
hj(a){if(a!=null)return a
throw A.b(A.v(a,"Object"))},
hP(a){return!0},
hk(a){return a},
eE(a){return!1},
dM(a){return!0===a||!1===a},
iW(a){if(!0===a)return!0
if(!1===a)return!1
throw A.b(A.v(a,"bool"))},
iY(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.b(A.v(a,"bool"))},
iX(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.b(A.v(a,"bool?"))},
iZ(a){if(typeof a=="number")return a
throw A.b(A.v(a,"double"))},
j0(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.v(a,"double"))},
j_(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.v(a,"double?"))},
eD(a){return typeof a=="number"&&Math.floor(a)===a},
j1(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.b(A.v(a,"int"))},
j3(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.b(A.v(a,"int"))},
j2(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.b(A.v(a,"int?"))},
hK(a){return typeof a=="number"},
j4(a){if(typeof a=="number")return a
throw A.b(A.v(a,"num"))},
j6(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.v(a,"num"))},
j5(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.v(a,"num?"))},
hN(a){return typeof a=="string"},
j7(a){if(typeof a=="string")return a
throw A.b(A.v(a,"String"))},
j9(a){if(typeof a=="string")return a
if(a==null)return a
throw A.b(A.v(a,"String"))},
j8(a){if(typeof a=="string")return a
if(a==null)return a
throw A.b(A.v(a,"String?"))},
eJ(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.x(a[q],b)
return s},
hX(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.eJ(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.x(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
ez(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.a([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)a4.push("T"+(r+q))
for(p=t.X,o=t._,n="<",m="",q=0;q<s;++q,m=a1){n=n+m+a4[a4.length-1-q]
l=a5[q]
k=l.w
if(!(k===2||k===3||k===4||k===5||l===p))j=l===o
else j=!0
if(!j)n+=" extends "+A.x(l,a4)}n+=">"}else n=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.x(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.x(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.x(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.x(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return n+"("+a+") => "+b},
x(a,b){var s,r,q,p,o,n,m=a.w
if(m===5)return"erased"
if(m===2)return"dynamic"
if(m===3)return"void"
if(m===1)return"Never"
if(m===4)return"any"
if(m===6)return A.x(a.x,b)
if(m===7){s=a.x
r=A.x(s,b)
q=s.w
return(q===12||q===13?"("+r+")":r)+"?"}if(m===8)return"FutureOr<"+A.x(a.x,b)+">"
if(m===9){p=A.i2(a.x)
o=a.y
return o.length>0?p+("<"+A.eJ(o,b)+">"):p}if(m===11)return A.hX(a,b)
if(m===12)return A.ez(a,b,null)
if(m===13)return A.ez(a.x,b,a.y)
if(m===14){n=a.x
return b[b.length-1-n]}return"?"},
i2(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
hi(a,b){var s=a.tR[b]
for(;typeof s=="string";)s=a.tR[s]
return s},
hh(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.bO(a,b,!1)
else if(typeof m=="number"){s=m
r=A.aX(a,5,"#")
q=A.dd(s)
for(p=0;p<s;++p)q[p]=r
o=A.aW(a,b,q)
n[b]=o
return o}else return m},
hf(a,b){return A.et(a.tR,b)},
he(a,b){return A.et(a.eT,b)},
bO(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.en(A.el(a,null,b,c))
r.set(b,s)
return s},
db(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.en(A.el(a,b,c,!0))
q.set(c,r)
return r},
hg(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.dG(a,b,c.w===10?c.y:[c])
p.set(s,q)
return q},
O(a,b){b.a=A.hC
b.b=A.hD
return b},
aX(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.C(null,null)
s.w=b
s.as=c
r=A.O(a,s)
a.eC.set(c,r)
return r},
es(a,b,c){var s,r=b.as+"*",q=a.eC.get(r)
if(q!=null)return q
s=A.hc(a,b,r,c)
a.eC.set(r,s)
return s},
hc(a,b,c,d){var s,r,q
if(d){s=b.w
if(!A.R(b))r=b===t.P||b===t.T||s===7||s===6
else r=!0
if(r)return b}q=new A.C(null,null)
q.w=6
q.x=b
q.as=c
return A.O(a,q)},
dI(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.hb(a,b,r,c)
a.eC.set(r,s)
return s},
hb(a,b,c,d){var s,r,q,p
if(d){s=b.w
r=!0
if(!A.R(b))if(!(b===t.P||b===t.T))if(s!==7)r=s===8&&A.b0(b.x)
if(r)return b
else if(s===1||b===t.A)return t.P
else if(s===6){q=b.x
if(q.w===8&&A.b0(q.x))return q
else return A.ec(a,b)}}p=new A.C(null,null)
p.w=7
p.x=b
p.as=c
return A.O(a,p)},
eq(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.h9(a,b,r,c)
a.eC.set(r,s)
return s},
h9(a,b,c,d){var s,r
if(d){s=b.w
if(A.R(b)||b===t.K||b===t._)return b
else if(s===1)return A.aW(a,"t",[b])
else if(b===t.P||b===t.T)return t.O}r=new A.C(null,null)
r.w=8
r.x=b
r.as=c
return A.O(a,r)},
hd(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.C(null,null)
s.w=14
s.x=b
s.as=q
r=A.O(a,s)
a.eC.set(q,r)
return r},
aV(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
h8(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
aW(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.aV(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.C(null,null)
r.w=9
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.O(a,r)
a.eC.set(p,q)
return q},
dG(a,b,c){var s,r,q,p,o,n
if(b.w===10){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.aV(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.C(null,null)
o.w=10
o.x=s
o.y=r
o.as=q
n=A.O(a,o)
a.eC.set(q,n)
return n},
er(a,b,c){var s,r,q="+"+(b+"("+A.aV(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.C(null,null)
s.w=11
s.x=b
s.y=c
s.as=q
r=A.O(a,s)
a.eC.set(q,r)
return r},
ep(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.aV(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.aV(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.h8(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.C(null,null)
p.w=12
p.x=b
p.y=c
p.as=r
o=A.O(a,p)
a.eC.set(r,o)
return o},
dH(a,b,c,d){var s,r=b.as+("<"+A.aV(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.ha(a,b,c,r,d)
a.eC.set(r,s)
return s},
ha(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.dd(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.Q(a,b,r,0)
m=A.an(a,c,r,0)
return A.dH(a,n,m,c!==m)}}l=new A.C(null,null)
l.w=13
l.x=b
l.y=c
l.as=d
return A.O(a,l)},
el(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
en(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.h1(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.em(a,r,l,k,!1)
else if(q===46)r=A.em(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.X(a.u,a.e,k.pop()))
break
case 94:k.push(A.hd(a.u,k.pop()))
break
case 35:k.push(A.aX(a.u,5,"#"))
break
case 64:k.push(A.aX(a.u,2,"@"))
break
case 126:k.push(A.aX(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.h3(a,k)
break
case 38:A.h2(a,k)
break
case 42:p=a.u
k.push(A.es(p,A.X(p,a.e,k.pop()),a.n))
break
case 63:p=a.u
k.push(A.dI(p,A.X(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.eq(p,A.X(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.h0(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.eo(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.h5(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-2)
break
case 43:n=l.indexOf("(",r)
k.push(l.substring(r,n))
k.push(-4)
k.push(a.p)
a.p=k.length
r=n+1
break
default:throw"Bad character "+q}}}m=k.pop()
return A.X(a.u,a.e,m)},
h1(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
em(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===10)o=o.x
n=A.hi(s,o.x)[p]
if(n==null)A.A('No "'+p+'" in "'+A.fO(o)+'"')
d.push(A.db(s,o,n))}else d.push(p)
return m},
h3(a,b){var s,r=a.u,q=A.ek(a,b),p=b.pop()
if(typeof p=="string")b.push(A.aW(r,p,q))
else{s=A.X(r,a.e,p)
switch(s.w){case 12:b.push(A.dH(r,s,q,a.n))
break
default:b.push(A.dG(r,s,q))
break}}},
h0(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.ek(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.X(p,a.e,o)
q=new A.bJ()
q.a=s
q.b=n
q.c=m
b.push(A.ep(p,r,q))
return
case-4:b.push(A.er(p,b.pop(),s))
return
default:throw A.b(A.b5("Unexpected state under `()`: "+A.p(o)))}},
h2(a,b){var s=b.pop()
if(0===s){b.push(A.aX(a.u,1,"0&"))
return}if(1===s){b.push(A.aX(a.u,4,"1&"))
return}throw A.b(A.b5("Unexpected extended operation "+A.p(s)))},
ek(a,b){var s=b.splice(a.p)
A.eo(a.u,a.e,s)
a.p=b.pop()
return s},
X(a,b,c){if(typeof c=="string")return A.aW(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.h4(a,b,c)}else return c},
eo(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.X(a,b,c[s])},
h5(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.X(a,b,c[s])},
h4(a,b,c){var s,r,q=b.w
if(q===10){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==9)throw A.b(A.b5("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.b5("Bad index "+c+" for "+b.h(0)))},
is(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.m(a,b,null,c,null,!1)?1:0
r.set(c,s)}if(0===s)return!1
if(1===s)return!0
return!0},
m(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(!A.R(d))s=d===t._
else s=!0
if(s)return!0
r=b.w
if(r===4)return!0
if(A.R(b))return!1
s=b.w
if(s===1)return!0
q=r===14
if(q)if(A.m(a,c[b.x],c,d,e,!1))return!0
p=d.w
s=b===t.P||b===t.T
if(s){if(p===8)return A.m(a,b,c,d.x,e,!1)
return d===t.P||d===t.T||p===7||p===6}if(d===t.K){if(r===8)return A.m(a,b.x,c,d,e,!1)
if(r===6)return A.m(a,b.x,c,d,e,!1)
return r!==7}if(r===6)return A.m(a,b.x,c,d,e,!1)
if(p===6){s=A.ec(a,d)
return A.m(a,b,c,s,e,!1)}if(r===8){if(!A.m(a,b.x,c,d,e,!1))return!1
return A.m(a,A.dB(a,b),c,d,e,!1)}if(r===7){s=A.m(a,t.P,c,d,e,!1)
return s&&A.m(a,b.x,c,d,e,!1)}if(p===8){if(A.m(a,b,c,d.x,e,!1))return!0
return A.m(a,b,c,A.dB(a,d),e,!1)}if(p===7){s=A.m(a,b,c,t.P,e,!1)
return s||A.m(a,b,c,d.x,e,!1)}if(q)return!1
s=r!==12
if((!s||r===13)&&d===t.Z)return!0
o=r===11
if(o&&d===t.L)return!0
if(p===13){if(b===t.g)return!0
if(r!==13)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.m(a,j,c,i,e,!1)||!A.m(a,i,e,j,c,!1))return!1}return A.eC(a,b.x,c,d.x,e,!1)}if(p===12){if(b===t.g)return!0
if(s)return!1
return A.eC(a,b,c,d,e,!1)}if(r===9){if(p!==9)return!1
return A.hI(a,b,c,d,e,!1)}if(o&&p===11)return A.hM(a,b,c,d,e,!1)
return!1},
eC(a3,a4,a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.m(a3,a4.x,a5,a6.x,a7,!1))return!1
s=a4.y
r=a6.y
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.m(a3,p[h],a7,g,a5,!1))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.m(a3,p[o+h],a7,g,a5,!1))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.m(a3,k[h],a7,g,a5,!1))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;!0;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.m(a3,e[a+2],a7,g,a5,!1))return!1
break}}for(;b<d;){if(f[b+1])return!1
b+=3}return!0},
hI(a,b,c,d,e,f){var s,r,q,p,o,n=b.x,m=d.x
for(;n!==m;){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.db(a,b,r[o])
return A.eu(a,p,null,c,d.y,e,!1)}return A.eu(a,b.y,null,c,d.y,e,!1)},
eu(a,b,c,d,e,f,g){var s,r=b.length
for(s=0;s<r;++s)if(!A.m(a,b[s],d,e[s],f,!1))return!1
return!0},
hM(a,b,c,d,e,f){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.m(a,r[s],c,q[s],e,!1))return!1
return!0},
b0(a){var s=a.w,r=!0
if(!(a===t.P||a===t.T))if(!A.R(a))if(s!==7)if(!(s===6&&A.b0(a.x)))r=s===8&&A.b0(a.x)
return r},
ir(a){var s
if(!A.R(a))s=a===t._
else s=!0
return s},
R(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
et(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
dd(a){return a>0?new Array(a):v.typeUniverse.sEA},
C:function C(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
bJ:function bJ(){this.c=this.b=this.a=null},
da:function da(a){this.a=a},
bH:function bH(){},
aU:function aU(a){this.a=a},
fW(){var s,r,q={}
if(self.scheduleImmediate!=null)return A.i6()
if(self.MutationObserver!=null&&self.document!=null){s=self.document.createElement("div")
r=self.document.createElement("span")
q.a=null
new self.MutationObserver(A.dk(new A.cE(q),1)).observe(s,{childList:true})
return new A.cD(q,s,r)}else if(self.setImmediate!=null)return A.i7()
return A.i8()},
fX(a){self.scheduleImmediate(A.dk(new A.cF(a),0))},
fY(a){self.setImmediate(A.dk(new A.cG(a),0))},
fZ(a){A.h6(0,a)},
h6(a,b){var s=new A.d8()
s.bk(a,b)
return s},
hS(a){return new A.bC(new A.i($.f,a.i("i<0>")),a.i("bC<0>"))},
hn(a,b){a.$2(0,null)
b.b=!0
return b.a},
ja(a,b){A.ho(a,b)},
hm(a,b){var s,r=a==null?b.$ti.c.a(a):a
if(!b.b)b.a.G(r)
else{s=b.a
if(b.$ti.i("t<1>").b(r))s.aH(r)
else s.P(r)}},
hl(a,b){var s=A.D(a),r=A.z(a),q=b.a
if(b.b)q.q(s,r)
else q.a_(s,r)},
ho(a,b){var s,r,q=new A.dg(b),p=new A.dh(b)
if(a instanceof A.i)a.aV(q,p,t.z)
else{s=t.z
if(a instanceof A.i)a.X(q,p,s)
else{r=new A.i($.f,t.d)
r.a=8
r.c=a
r.aV(q,p,s)}}},
i4(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.f.aB(new A.dj(s))},
dv(a){var s
if(t.C.b(a)){s=a.gZ()
if(s!=null)return s}return B.d},
fu(a,b){var s
b.a(a)
s=new A.i($.f,b.i("i<0>"))
s.G(a)
return s},
fv(a,b){var s,r,q,p,o,n,m,l,k,j,i,h={},g=null,f=!1,e=b.i("i<d<0>>"),d=new A.i($.f,e)
h.a=null
h.b=0
h.c=h.d=null
s=new A.cc(h,g,f,d)
try{for(n=a.length,m=t.P,l=0,k=0;l<a.length;a.length===n||(0,A.dX)(a),++l){r=a[l]
q=k
r.X(new A.cb(h,q,d,b,g,f),s,m)
k=++h.b}if(k===0){n=d
n.P(A.a([],b.i("l<0>")))
return n}h.a=A.be(k,null,!1,b.i("0?"))}catch(j){p=A.D(j)
o=A.z(j)
if(h.b===0||f){i=A.dL(p,o)
e=new A.i($.f,e)
e.a_(i.a,i.b)
return e}else{h.d=p
h.c=o}}return d},
hF(a,b){if($.f===B.b)return null
return null},
dL(a,b){if($.f!==B.b)A.hF(a,b)
if(b==null)if(t.C.b(a)){b=a.gZ()
if(b==null){A.dA(a,B.d)
b=B.d}}else b=B.d
else if(t.C.b(a))A.dA(a,b)
return new A.U(a,b)},
dF(a,b,c){var s,r,q,p={},o=p.a=a
for(;s=o.a,(s&4)!==0;){o=o.c
p.a=o}if(o===b){b.a_(new A.E(!0,o,null,"Cannot complete a future with itself"),A.fP())
return}r=b.a&1
s=o.a=s|r
if((s&24)===0){q=b.c
b.a=b.a&1|4
b.c=o
o.aN(q)
return}if(!c)if(b.c==null)o=(s&16)===0||r!==0
else o=!1
else o=!0
if(o){q=b.S()
b.a0(p.a)
A.a6(b,q)
return}b.a^=2
A.am(null,null,b.b,new A.cP(p,b))},
a6(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g={},f=g.a=a
for(;!0;){s={}
r=f.a
q=(r&16)===0
p=!q
if(b==null){if(p&&(r&1)===0){f=f.c
A.al(f.a,f.b)}return}s.a=b
o=b.a
for(f=b;o!=null;f=o,o=n){f.a=null
A.a6(g.a,f)
s.a=o
n=o.a}r=g.a
m=r.c
s.b=p
s.c=m
if(q){l=f.c
l=(l&1)!==0||(l&15)===8}else l=!0
if(l){k=f.b.b
if(p){r=r.b===k
r=!(r||r)}else r=!1
if(r){A.al(m.a,m.b)
return}j=$.f
if(j!==k)$.f=k
else j=null
f=f.c
if((f&15)===8)new A.cW(s,g,p).$0()
else if(q){if((f&1)!==0)new A.cV(s,m).$0()}else if((f&2)!==0)new A.cU(g,s).$0()
if(j!=null)$.f=j
f=s.c
if(f instanceof A.i){r=s.a.$ti
r=r.i("t<2>").b(f)||!r.y[1].b(f)}else r=!1
if(r){i=s.a.b
if((f.a&24)!==0){h=i.c
i.c=null
b=i.a1(h)
i.a=f.a&30|i.a&1
i.c=f.c
g.a=f
continue}else A.dF(f,i,!0)
return}}i=s.a.b
h=i.c
i.c=null
b=i.a1(h)
f=s.b
r=s.c
if(!f){i.a=8
i.c=r}else{i.a=i.a&1|16
i.c=r}g.a=i
f=i}},
eF(a,b){if(t.Q.b(a))return b.aB(a)
if(t.w.b(a))return a
throw A.b(A.e2(a,"onError",u.b))},
hU(){var s,r
for(s=$.ak;s!=null;s=$.ak){$.aZ=null
r=s.b
$.ak=r
if(r==null)$.aY=null
s.a.$0()}},
hZ(){$.dN=!0
try{A.hU()}finally{$.aZ=null
$.dN=!1
if($.ak!=null)$.e_().$1(A.eN())}},
eK(a){var s=new A.bD(a),r=$.aY
if(r==null){$.ak=$.aY=s
if(!$.dN)$.e_().$1(A.eN())}else $.aY=r.b=s},
hY(a){var s,r,q,p=$.ak
if(p==null){A.eK(a)
$.aZ=$.aY
return}s=new A.bD(a)
r=$.aZ
if(r==null){s.b=p
$.ak=$.aZ=s}else{q=r.b
s.b=q
$.aZ=r.b=s
if(q==null)$.aY=s}},
dt(a){var s=null,r=$.f
if(B.b===r){A.am(s,s,B.b,a)
return}A.am(s,s,r,r.aW(a))},
iK(a){A.dP(a,"stream",t.K)
return new A.bL()},
ee(a,b){var s=null
return a?new A.aj(s,s,s,s,b.i("aj<0>")):new A.ag(s,s,s,s,b.i("ag<0>"))},
dD(a,b){var s=null
return a?new A.aT(s,s,b.i("aT<0>")):new A.aK(s,s,b.i("aK<0>"))},
bQ(a){var s,r,q
if(a==null)return
try{a.$0()}catch(q){s=A.D(q)
r=A.z(q)
A.al(s,r)}},
h_(a,b,c,d,e){var s=$.f,r=e?1:0,q=c!=null?32:0,p=A.ei(s,c),o=d==null?A.eM():d
return new A.a4(a,b,p,o,s,r|q)},
ei(a,b){if(b==null)b=A.i9()
if(t.k.b(b))return a.aB(b)
if(t.B.b(b))return b
throw A.b(A.r("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace.",null))},
hW(a,b){A.al(a,b)},
hV(){},
al(a,b){A.hY(new A.di(a,b))},
eG(a,b,c,d){var s,r=$.f
if(r===c)return d.$0()
$.f=c
s=r
try{r=d.$0()
return r}finally{$.f=s}},
eI(a,b,c,d,e){var s,r=$.f
if(r===c)return d.$1(e)
$.f=c
s=r
try{r=d.$1(e)
return r}finally{$.f=s}},
eH(a,b,c,d,e,f){var s,r=$.f
if(r===c)return d.$2(e,f)
$.f=c
s=r
try{r=d.$2(e,f)
return r}finally{$.f=s}},
am(a,b,c,d){if(B.b!==c)d=c.aW(d)
A.eK(d)},
cE:function cE(a){this.a=a},
cD:function cD(a,b,c){this.a=a
this.b=b
this.c=c},
cF:function cF(a){this.a=a},
cG:function cG(a){this.a=a},
d8:function d8(){},
d9:function d9(a,b){this.a=a
this.b=b},
bC:function bC(a,b){this.a=a
this.b=!1
this.$ti=b},
dg:function dg(a){this.a=a},
dh:function dh(a){this.a=a},
dj:function dj(a){this.a=a},
U:function U(a,b){this.a=a
this.b=b},
a2:function a2(a,b){this.a=a
this.$ti=b},
a3:function a3(a,b,c,d,e,f,g){var _=this
_.ay=0
_.CW=_.ch=null
_.w=a
_.a=b
_.b=c
_.c=d
_.d=e
_.e=f
_.r=_.f=null
_.$ti=g},
M:function M(){},
aT:function aT(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.r=_.e=_.d=null
_.$ti=c},
d5:function d5(a,b){this.a=a
this.b=b},
d7:function d7(a,b,c){this.a=a
this.b=b
this.c=c},
d6:function d6(a){this.a=a},
aK:function aK(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.r=_.e=_.d=null
_.$ti=c},
cc:function cc(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cb:function cb(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
I:function I(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
i:function i(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
cM:function cM(a,b){this.a=a
this.b=b},
cT:function cT(a,b){this.a=a
this.b=b},
cQ:function cQ(a){this.a=a},
cR:function cR(a){this.a=a},
cS:function cS(a,b,c){this.a=a
this.b=b
this.c=c},
cP:function cP(a,b){this.a=a
this.b=b},
cO:function cO(a,b){this.a=a
this.b=b},
cN:function cN(a,b,c){this.a=a
this.b=b
this.c=c},
cW:function cW(a,b,c){this.a=a
this.b=b
this.c=c},
cX:function cX(a,b){this.a=a
this.b=b},
cY:function cY(a){this.a=a},
cV:function cV(a,b){this.a=a
this.b=b},
cU:function cU(a,b){this.a=a
this.b=b},
bD:function bD(a){this.a=a
this.b=null},
ae:function ae(){},
cr:function cr(a,b){this.a=a
this.b=b},
cs:function cs(a,b){this.a=a
this.b=b},
a7:function a7(){},
d4:function d4(a){this.a=a},
d3:function d3(a){this.a=a},
bN:function bN(){},
bE:function bE(){},
ag:function ag(a,b,c,d,e){var _=this
_.a=null
_.b=0
_.c=null
_.d=a
_.e=b
_.f=c
_.r=d
_.$ti=e},
aj:function aj(a,b,c,d,e){var _=this
_.a=null
_.b=0
_.c=null
_.d=a
_.e=b
_.f=c
_.r=d
_.$ti=e},
N:function N(a,b){this.a=a
this.$ti=b},
a4:function a4(a,b,c,d,e,f){var _=this
_.w=a
_.a=b
_.b=c
_.c=d
_.d=e
_.e=f
_.r=_.f=null},
H:function H(){},
cI:function cI(a,b,c){this.a=a
this.b=b
this.c=c},
cH:function cH(a){this.a=a},
aS:function aS(){},
bG:function bG(){},
a5:function a5(a){this.b=a
this.a=null},
ai:function ai(a,b){this.b=a
this.c=b
this.a=null},
cJ:function cJ(){},
aQ:function aQ(){this.a=0
this.c=this.b=null},
d_:function d_(a,b){this.a=a
this.b=b},
aL:function aL(a){this.a=1
this.b=a
this.c=null},
bL:function bL(){},
de:function de(){},
di:function di(a,b){this.a=a
this.b=b},
d0:function d0(){},
d1:function d1(a,b){this.a=a
this.b=b},
d2:function d2(a,b,c){this.a=a
this.b=b
this.c=c},
h:function h(){},
b8:function b8(){},
cC:function cC(){},
dc:function dc(a){this.b=0
this.c=a},
eV(a){var s=A.fF(a,null)
if(s!=null)return s
throw A.b(A.e8(a,null))},
fq(a,b){a=A.b(a)
a.stack=b.h(0)
throw a
throw A.b("unreachable")},
be(a,b,c,d){var s,r=J.fA(a,d)
if(a!==0&&b!=null)for(s=0;s<a;++s)r[s]=b
return r},
fN(a){return new A.cf(a,A.fC(a,!1,!0,!1,!1,!1))},
fQ(a,b,c){var s=J.ff(b)
if(!s.T())return a
if(c.length===0){do a+=A.p(s.ga4())
while(s.T())}else{a+=A.p(s.ga4())
for(;s.T();)a=a+c+A.p(s.ga4())}return a},
fP(){return A.z(new Error())},
c9(a){if(typeof a=="number"||A.dM(a)||a==null)return J.b2(a)
if(typeof a=="string")return JSON.stringify(a)
return A.fG(a)},
fr(a,b){A.dP(a,"error",t.K)
A.dP(b,"stackTrace",t.l)
A.fq(a,b)},
b5(a){return new A.b4(a)},
r(a,b){return new A.E(!1,null,b,a)},
e2(a,b,c){return new A.E(!0,a,b,c)},
aG(a,b,c,d,e){return new A.aF(b,c,!0,a,d,"Invalid value")},
eb(a,b,c){if(0>a||a>c)throw A.b(A.aG(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.aG(b,a,c,"end",null))
return b}return c},
e9(a,b,c,d,e){return new A.b9(b,!0,a,e,"Index out of range")},
bB(a){return new A.aJ(a)},
eh(a){return new A.by(a)},
dC(a){return new A.G(a)},
dw(a){return new A.b7(a)},
e8(a,b){return new A.ca(a,b)},
ea(a,b,c){var s,r
if(A.it(a))return b+"..."+c
s=new A.ct(b)
$.du.push(a)
try{r=s
r.a=A.fQ(r.a,a,", ")}finally{$.du.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
k:function k(){},
b4:function b4(a){this.a=a},
K:function K(){},
E:function E(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
aF:function aF(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
b9:function b9(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
aJ:function aJ(a){this.a=a},
by:function by(a){this.a=a},
G:function G(a){this.a=a},
b7:function b7(a){this.a=a},
aH:function aH(){},
cL:function cL(a){this.a=a},
ca:function ca(a,b){this.a=a
this.b=b},
n:function n(){},
e:function e(){},
bM:function bM(){},
ct:function ct(a){this.a=a},
bq:function bq(a){this.a=a
this.b=0},
bK:function bK(){},
fL(a){var s,r,q,p,o,n=new Uint8Array(a.length)
for(s=new A.aq(a),r=t.V,s=new A.ac(s,s.gk(0),r.i("ac<h.E>")),r=r.i("h.E"),q=0;s.T();q=o){p=s.d
if(p==null)p=r.a(p)
if(p<48||p>57)throw A.b(A.r("string can only contain alpha numeric 0-9",null))
o=q+1
n[q]=p-48}return new A.bu(n)},
br:function br(a){this.b=a},
bu:function bu(a){this.a=a},
cd:function cd(a){this.c=a},
bv(a,b){var s,r,q=a.length,p=0
while(!0){if(!(p<q&&a[p]===0))break;++p}q-=p
s=new Uint8Array(q+b)
for(r=0;r<q;++r)s[r]=a[r+p]
return new A.cp(s)},
cp:function cp(a){this.a=a},
ev(a,b,c){var s,r,q,p,o,n,m,l=A.fM(a,b),k=new A.bq(A.a([],t.t))
for(s=0;s<c.length;++s){r=c[s]
k.E(r.gaw(),4)
k.E(r.gk(r),A.hQ(r.gaw(),a))
r.ba(k)}for(q=l.length,p=0,s=0;s<q;++s)p+=l[s].b
o=p*8
q=k.b
if(q>o)throw A.b(new A.cd("Input too long. "+q+" > "+o))
if(q+4<=o)k.E(0,4)
for(;B.a.m(k.b,8)!==0;)k.b5(!1)
for(n=0;!0;n=m){if(k.b>=o)break
m=n+1
k.E((n&1)===0?236:17,8)}return A.hs(k,l)},
hs(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=t.x,b=A.be(a1.length,null,!1,c),a=A.be(a1.length,null,!1,c)
for(c=a0.a,s=0,r=0,q=0,p=0;p<a1.length;++p){o=a1[p]
n=o.b
m=o.a-n
r=Math.max(r,n)
q=Math.max(q,m)
l=new Uint8Array(n)
b[p]=l
for(k=0;k<n;++k)l[k]=c[k+s]&255
s+=n
j=A.hw(m)
o=j.a.length-1
i=A.bv(l,o).b0(j)
h=new Uint8Array(o)
a[p]=h
for(g=i.a,f=g.length,k=0;k<o;++k){e=k+f-o
h[k]=e>=0?g[e]:0}}d=A.a([],t.t)
for(k=0;k<r;++k)for(p=0;p<a1.length;++p){c=b[p]
if(k<c.length)d.push(c[k])}for(k=0;k<q;++k)for(p=0;p<a1.length;++p){c=a[p]
if(k<c.length)d.push(c[k])}return d},
hQ(a,b){var s,r=null
if(1<=b&&b<10){$label0$0:{s=8
if(1===a){s=10
break $label0$0}if(2===a){s=9
break $label0$0}if(4===a)break $label0$0
if(8===a)break $label0$0
s=A.A(A.r("mode:"+a,r))}return s}else if(b<27){$label1$1:{if(1===a){s=12
break $label1$1}if(2===a){s=11
break $label1$1}if(4===a){s=16
break $label1$1}if(8===a){s=10
break $label1$1}s=A.A(A.r("mode:"+a,r))}return s}else if(b<41){$label2$2:{if(1===a){s=14
break $label2$2}if(2===a){s=13
break $label2$2}if(4===a){s=16
break $label2$2}if(8===a){s=12
break $label2$2}s=A.A(A.r("mode:"+a,r))}return s}else throw A.b(A.r("type:"+b,r))},
hw(a){var s,r=t.t,q=A.bv(A.a([1],r),0)
for(s=0;s<a;++s)q=q.bV(A.bv(A.a([1,$.bS()[B.a.m(s,255)]],r),0))
return q},
cj:function cj(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.e=d},
fK(a){var s,r,q,p,o,n,m,l,k,j,i
for(s=t.f,r=a.c,q=a.a,p=a.b,o=a.e,n=0,m=null,l=0;l<8;++l){k=new A.bt(r,q,p,l,A.a([],s))
j=a.d
k.aK(l,j==null?a.d=A.ev(q,p,o):j,!0)
i=A.hR(k)
if(l===0||n>i){m=k
n=i}}o=m.d
s=new A.bt(r,q,p,o,A.a([],s))
s.aK(o,a.gbP(),!1)
return s},
hT(a,b,c){var s
$label0$0:{if(0===a){s=(b+c&1)===0
break $label0$0}if(1===a){s=(b&1)===0
break $label0$0}if(2===a){s=B.a.m(c,3)===0
break $label0$0}if(3===a){s=B.a.m(b+c,3)===0
break $label0$0}if(4===a){s=(B.a.K(b,2)+B.a.K(c,3)&1)===0
break $label0$0}if(5===a){s=b*c
s=B.a.m(s,2)+B.a.m(s,3)===0
break $label0$0}if(6===a){s=b*c
s=(B.a.m(s,2)+B.a.m(s,3)&1)===0
break $label0$0}if(7===a){s=(B.a.m(b*c,3)+B.a.m(b+c,2)&1)===0
break $label0$0}s=A.A(A.r("bad maskPattern:"+a,null))}return s},
hR(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=a.a
for(s=0,r=0;r<f;++r)for(q=0;q<f;++q){p=a.j(r,q)
for(o=0,n=-1;n<=1;++n){m=r+n
if(m<0||f<=m)continue
for(l=n===0,k=-1;k<=1;++k){j=q+k
if(j<0||f<=j)continue
if(l&&k===0)continue
if(p===a.j(m,j))++o}}if(o>5)s+=3+o-5}for(m=f-1,r=0;r<m;r=i)for(i=r+1,q=0;q<m;){h=a.j(r,q)?1:0
if(a.j(i,q))++h;++q
if(a.j(r,q))++h
if(a.j(i,q))++h
if(h===0||h===4)s+=3}for(m=f-6,r=0;r<f;++r)for(q=0;q<m;++q)if(a.j(r,q)&&!a.j(r,q+1)&&a.j(r,q+2)&&a.j(r,q+3)&&a.j(r,q+4)&&!a.j(r,q+5)&&a.j(r,q+6))s+=40
for(q=0;q<f;++q)for(r=0;r<m;++r)if(a.j(r,q)&&!a.j(r+1,q)&&a.j(r+2,q)&&a.j(r+3,q)&&a.j(r+4,q)&&!a.j(r+5,q)&&a.j(r+6,q))s+=40
for(q=0,g=0;q<f;++q)for(r=0;r<f;++r)if(a.j(r,q))++g
return s+Math.abs(100*g/f/f-50)/5*10},
bt:function bt(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fM(a,b){var s,r,q,p,o,n,m=A.hB(a,b),l=m.length/3|0,k=A.a([],t.J)
for(s=0;s<l;++s){r=s*3
q=m[r]
p=m[r+1]
o=m[r+2]
for(n=0;n<q;++n)k.push(new A.bw(p,o))}return k},
hB(a,b){var s
$label0$0:{if(1===b){s=B.f[(a-1)*4]
break $label0$0}if(0===b){s=B.f[(a-1)*4+1]
break $label0$0}if(3===b){s=B.f[(a-1)*4+2]
break $label0$0}if(2===b){s=B.f[(a-1)*4+3]
break $label0$0}s=A.A(A.r("bad rs block @ typeNumber: "+a+"/errorCorrectLevel:"+b,null))}return s},
bw:function bw(a,b){this.a=a
this.b=b},
fh(a,b,c,d,e,f,g){var s,r={},q=A.dD(!0,g)
r.a=null
r.b=r.c=r.d=r.e=!1
r.f=r.r=null
s=new A.bZ(r,q,g)
q.a=new A.bY(r,a,new A.c1(r,b,!0,s,g,q,f),q,new A.c2(r,q),e,new A.c_(r,s,g,!0,d,q),new A.c0(r,q))
return q.ga8()},
bZ:function bZ(a,b,c){this.a=a
this.b=b
this.c=c},
c1:function c1(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
c2:function c2(a,b){this.a=a
this.b=b},
c_:function c_(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
c0:function c0(a,b){this.a=a
this.b=b},
bY:function bY(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
bX:function bX(a,b,c){this.a=a
this.b=b
this.c=c},
bV:function bV(){},
bW:function bW(){},
fi(a,b,c,d,e){var s={}
s.a=null
return A.fR(a,new A.c4(s,b,c,d,e),new A.c5(s,e),d,e)},
ex(a,b){return a},
eB(a){},
c4:function c4(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
c5:function c5(a,b){this.a=a
this.b=b},
c3:function c3(a){this.a=a},
fR(a,b,c,d,e){var s={},r=a.gau()?A.dD(!0,e):A.ee(!0,e)
s.a=null
r.sb1(new A.cz(s,a,b,r,A.eT(A.ii(),e),c,d))
return r.ga8()},
ef(a,b,c){c.L(a,b)},
cz:function cz(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
cv:function cv(a,b,c){this.a=a
this.b=b
this.c=c},
cx:function cx(a,b){this.a=a
this.b=b},
cw:function cw(a,b,c){this.a=a
this.b=b
this.c=c},
cy:function cy(a,b){this.a=a
this.b=b},
dE(a,b,c,d){var s=A.i5(new A.cK(c),t.m)
s=s==null?null:A.eA(s)
s=new A.bI(a,b,s,!1)
s.bJ()
return s},
i5(a,b){var s=$.f
if(s===B.b)return a
return s.bM(a,b)},
dx:function dx(a,b){this.a=a
this.$ti=b},
bI:function bI(a,b,c,d){var _=this
_.a=0
_.b=a
_.c=b
_.d=c
_.e=d},
cK:function cK(a){this.a=a},
bU:function bU(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
c6:function c6(a,b){this.a=a
this.b=b
this.c=null},
fI(){var s,r,q,p,o=self,n=o.document.querySelector("#content")
if(n==null)n=t.m.a(n)
s=o.document.querySelector("#type-div")
if(s==null)s=t.m.a(s)
r=o.document.querySelector("#error-div")
if(r==null)r=t.m.a(r)
q=o.document.querySelector("#input")
if(q==null)q=t.m.a(q)
p=A.fH(n,s,r,A.dD(!1,t.r))
p.f=q.value
p.a2()
A.dE(q,"keyup",new A.cm(p,q),!1)
p.e.bT(new A.cn(q),new A.co(q))
return p},
fH(a,b,c,d){var s,r,q=a.getContext("2d")
if(q==null)q=t.m.a(q)
s=t.r
r=A.ee(!1,t.H)
r.n(0,null)
s=new A.bs(new A.c6(1,1),a,q,d,A.fi(A.fh(new A.a2(d,A.Y(d).i("a2<1>")),A.eT(A.ia(),s),!0,B.m,new A.N(r,A.Y(r).i("N<1>")),s,s),A.iy(),r.gap(r),s,t.y))
s.bj(a,b,c,d)
return s},
dJ(a){return A.hp(a)},
hp(a){var s=0,r=A.hS(t.y),q,p,o,n,m,l,k,j,i,h,g
var $async$dJ=A.i4(function(b,c){if(b===1)return A.hl(c,r)
while(true)switch(s){case 0:j=a.a
i=a.b
h=A.a([],t.h)
g=j*4+17
if(j<1||j>40)A.A(A.aG(j,1,40,"typeNumber",null))
if(0>i||i>=4)A.A(A.e9(i,4,B.k,null,"errorCorrectLevel"))
p=a.c
o=$.f9()
if(o.b.test(p))h.push(A.fL(p))
else h.push(new A.br(B.u.bO(p)))
n=A.fK(new A.cj(j,i,g,h))
m=A.a([],t.u)
for(l=0;l<g;++l)for(k=0;k<g;++k)m.push(n.j(k,l))
q=m
s=1
break
case 1:return A.hm(q,r)}})
return A.hn($async$dJ,r)},
bs:function bs(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=""
_.r=10
_.w=0
_.x=$
_.y=!1},
cm:function cm(a,b){this.a=a
this.b=b},
cn:function cn(a){this.a=a},
co:function co(a){this.a=a},
cl:function cl(a){this.a=a},
ah:function ah(a,b,c){this.a=a
this.b=b
this.c=c},
ix(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
iA(a){A.dY(new A.az("Field '"+a+"' has been assigned during initialization."),new Error())},
iB(){A.dY(new A.az("Field '' has not been initialized."),new Error())},
eA(a){var s
if(typeof a=="function")throw A.b(A.r("Attempting to rewrap a JS function.",null))
s=function(b,c){return function(d){return b(c,d,arguments.length)}}(A.hq,a)
s[$.dZ()]=a
return s},
hq(a,b,c){if(c>=1)return a.$1(b)
return a.$0()},
fJ(a){var s
$label0$0:{if(1===a){s="Low"
break $label0$0}if(0===a){s="Medium"
break $label0$0}if(3===a){s="Quartile"
break $label0$0}if(2===a){s="High"
break $label0$0}s=A.A(A.r("level "+a+" not supported",null))}return s},
eR(a){return a>=1?$.bT()[a]:A.A(A.r("glog("+a+")",null))},
ht(){var s,r=new Uint8Array(256)
for(s=0;s<8;++s)r[s]=B.a.bH(1,s)
for(s=8;s<256;++s)r[s]=r[s-4]^r[s-5]^r[s-6]^r[s-8]
return r},
hu(){var s,r=new Uint8Array(256)
for(s=0;s<255;++s)r[$.bS()[s]]=s
return r},
ic(a){var s,r=a<<10>>>0
for(s=r;A.a8(s)-A.a8(1335)>=0;)s=(s^B.a.aF(1335,A.a8(s)-A.a8(1335)))>>>0
return((r|s)^21522)>>>0},
id(a){var s,r=a<<12>>>0
for(s=r;A.a8(s)-A.a8(7973)>=0;)s=(s^B.a.aF(7973,A.a8(s)-A.a8(7973)))>>>0
return(r|s)>>>0},
a8(a){var s
for(s=0;a!==0;){++s
a=a>>>1}return s},
iv(){A.fI()}},B={}
var w=[A,J,B]
var $={}
A.dy.prototype={}
J.ba.prototype={
bb(a,b){return a===b},
h(a){return"Instance of '"+A.ci(a)+"'"},
gl(a){return A.Z(A.dK(this))}}
J.bb.prototype={
h(a){return String(a)},
gl(a){return A.Z(t.v)},
$ij:1,
$iw:1}
J.au.prototype={
h(a){return"null"},
$ij:1,
$in:1}
J.ax.prototype={$io:1}
J.W.prototype={
h(a){return String(a)}}
J.bp.prototype={}
J.aI.prototype={}
J.V.prototype={
h(a){var s=a[$.dZ()]
if(s==null)return this.bf(a)
return"JavaScript function for "+J.b2(s)}}
J.aw.prototype={
h(a){return String(a)}}
J.ay.prototype={
h(a){return String(a)}}
J.l.prototype={
n(a,b){a.$flags&1&&A.T(a,29)
a.push(b)},
bz(a,b,c){var s,r,q,p=[],o=a.length
for(s=0;s<o;++s){r=a[s]
if(!b.$1(r))p.push(r)
if(a.length!==o)throw A.b(A.dw(a))}q=p.length
if(q===o)return
this.sk(a,q)
for(s=0;s<p.length;++s)a[s]=p[s]},
bN(a){a.$flags&1&&A.T(a,"clear","clear")
a.length=0},
b_(a,b){var s,r=A.be(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)r[s]=A.p(a[s])
return r.join(b)},
gaX(a){return a.length!==0},
h(a){return A.ea(a,"[","]")},
gaZ(a){return new J.b3(a,a.length,A.df(a).i("b3<1>"))},
gk(a){return a.length},
sk(a,b){a.$flags&1&&A.T(a,"set length","change the length of")
if(b>a.length)A.df(a).c.a(null)
a.length=b},
p(a,b){if(!(b>=0&&b<a.length))throw A.b(A.dS(a,b))
return a[b]},
bc(a,b,c){a.$flags&2&&A.T(a)
if(!(b>=0&&b<a.length))throw A.b(A.dS(a,b))
a[b]=c},
$id:1}
J.cg.prototype={}
J.b3.prototype={
ga4(){var s=this.d
return s==null?this.$ti.c.a(s):s},
T(){var s,r=this,q=r.a,p=q.length
if(r.b!==p)throw A.b(A.dX(q))
s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0}}
J.av.prototype={
c3(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.b(A.bB(""+a+".toInt()"))},
h(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
m(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
bh(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.aU(a,b)},
K(a,b){return(a|0)===a?a/b|0:this.aU(a,b)},
aU(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.bB("Result of truncating division is "+A.p(s)+": "+A.p(a)+" ~/ "+A.p(b)))},
aF(a,b){if(b<0)throw A.b(A.dO(b))
return b>31?0:a<<b>>>0},
bH(a,b){return b>31?0:a<<b>>>0},
bd(a,b){var s
if(b<0)throw A.b(A.dO(b))
if(a>0)s=this.C(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
bI(a,b){var s
if(a>0)s=this.C(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
aS(a,b){if(0>b)throw A.b(A.dO(b))
return this.C(a,b)},
C(a,b){return b>31?0:a>>>b},
gl(a){return A.Z(t.n)},
$iq:1,
$iS:1}
J.at.prototype={
gl(a){return A.Z(t.p)},
$ij:1,
$ic:1}
J.bc.prototype={
gl(a){return A.Z(t.i)},
$ij:1}
J.ab.prototype={
be(a,b,c){return a.substring(b,A.eb(b,c,a.length))},
h(a){return a},
gl(a){return A.Z(t.N)},
gk(a){return a.length},
$ij:1,
$ia1:1}
A.az.prototype={
h(a){return"LateInitializationError: "+this.a}}
A.aq.prototype={
gk(a){return this.a.length},
p(a,b){return this.a.charCodeAt(b)}}
A.ds.prototype={
$0(){return A.fu(null,t.H)},
$S:13}
A.ac.prototype={
ga4(){var s=this.d
return s==null?this.$ti.c.a(s):s},
T(){var s,r=this,q=r.a,p=J.eP(q),o=p.gk(q)
if(r.b!==o)throw A.b(A.dw(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.bQ(q,s);++r.c
return!0}}
A.as.prototype={}
A.bA.prototype={}
A.af.prototype={}
A.ce.prototype={
bi(a){if(false)A.eU(0,0)},
h(a){var s=B.e.b_(this.gbK(),", ")
return this.a.h(0)+" with "+("<"+s+">")}}
A.aa.prototype={
gbK(){return[A.Z(this.$ti.c)]},
$1(a){return this.a.$1$1(a,this.$ti.y[0])},
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$3(a,b,c){return this.a.$1$3(a,b,c,this.$ti.y[0])},
$S(){return A.eU(A.dR(this.a),this.$ti)}}
A.cA.prototype={
t(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.aE.prototype={
h(a){return"Null check operator used on a null value"}}
A.bd.prototype={
h(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.bz.prototype={
h(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.ch.prototype={
h(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.ar.prototype={}
A.aR.prototype={
h(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iu:1}
A.a0.prototype={
h(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.eZ(r==null?"unknown":r)+"'"},
gc5(){return this},
$C:"$1",
$R:1,
$D:null}
A.c7.prototype={$C:"$0",$R:0}
A.c8.prototype={$C:"$2",$R:2}
A.cu.prototype={}
A.cq.prototype={
h(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.eZ(s)+"'"}}
A.b6.prototype={
h(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.ci(this.a)+"'")}}
A.bF.prototype={
h(a){return"Reading static variable '"+this.a+"' during its initialization"}}
A.bx.prototype={
h(a){return"RuntimeError: "+this.a}}
A.dm.prototype={
$1(a){return this.a(a)},
$S:14}
A.dn.prototype={
$2(a,b){return this.a(a,b)},
$S:15}
A.dp.prototype={
$1(a){return this.a(a)},
$S:16}
A.cf.prototype={
h(a){return"RegExp/"+this.a+"/"+this.b.flags}}
A.bf.prototype={
gl(a){return B.cM},
$ij:1}
A.aC.prototype={}
A.bg.prototype={
gl(a){return B.cN},
$ij:1}
A.ad.prototype={
gk(a){return a.length},
$iy:1}
A.aA.prototype={
p(a,b){A.a9(b,a,a.length)
return a[b]},
$id:1}
A.aB.prototype={$id:1}
A.bh.prototype={
gl(a){return B.cO},
$ij:1}
A.bi.prototype={
gl(a){return B.cP},
$ij:1}
A.bj.prototype={
gl(a){return B.cQ},
p(a,b){A.a9(b,a,a.length)
return a[b]},
$ij:1}
A.bk.prototype={
gl(a){return B.cR},
p(a,b){A.a9(b,a,a.length)
return a[b]},
$ij:1}
A.bl.prototype={
gl(a){return B.cS},
p(a,b){A.a9(b,a,a.length)
return a[b]},
$ij:1}
A.bm.prototype={
gl(a){return B.cT},
p(a,b){A.a9(b,a,a.length)
return a[b]},
$ij:1}
A.bn.prototype={
gl(a){return B.cU},
p(a,b){A.a9(b,a,a.length)
return a[b]},
$ij:1}
A.aD.prototype={
gl(a){return B.cV},
gk(a){return a.length},
p(a,b){A.a9(b,a,a.length)
return a[b]},
$ij:1}
A.bo.prototype={
gl(a){return B.cW},
gk(a){return a.length},
p(a,b){A.a9(b,a,a.length)
return a[b]},
$ij:1}
A.aM.prototype={}
A.aN.prototype={}
A.aO.prototype={}
A.aP.prototype={}
A.C.prototype={
i(a){return A.db(v.typeUniverse,this,a)},
ab(a){return A.hg(v.typeUniverse,this,a)}}
A.bJ.prototype={}
A.da.prototype={
h(a){return A.x(this.a,null)}}
A.bH.prototype={
h(a){return this.a}}
A.aU.prototype={$iK:1}
A.cE.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:2}
A.cD.prototype={
$1(a){var s,r
this.a.a=a
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:17}
A.cF.prototype={
$0(){this.a.$0()},
$S:6}
A.cG.prototype={
$0(){this.a.$0()},
$S:6}
A.d8.prototype={
bk(a,b){if(self.setTimeout!=null)self.setTimeout(A.dk(new A.d9(this,b),0),a)
else throw A.b(A.bB("`setTimeout()` not found."))}}
A.d9.prototype={
$0(){this.b.$0()},
$S:0}
A.bC.prototype={}
A.dg.prototype={
$1(a){return this.a.$2(0,a)},
$S:7}
A.dh.prototype={
$2(a,b){this.a.$2(1,new A.ar(a,b))},
$S:18}
A.dj.prototype={
$2(a,b){this.a(a,b)},
$S:19}
A.U.prototype={
h(a){return A.p(this.a)},
$ik:1,
gZ(){return this.b}}
A.a2.prototype={
gau(){return!0}}
A.a3.prototype={
H(){},
I(){}}
A.M.prototype={
sb2(a){throw A.b(A.bB(u.c))},
sb3(a){throw A.b(A.bB(u.c))},
ga8(){return new A.a2(this,A.Y(this).i("a2<1>"))},
gR(){return this.c<4},
aR(a){var s=a.CW,r=a.ch
if(s==null)this.d=r
else s.ch=r
if(r==null)this.e=s
else r.CW=s
a.CW=a
a.ch=a},
aT(a,b,c,d){var s,r,q,p,o,n,m,l=this
if((l.c&4)!==0){s=new A.aL($.f)
A.dt(s.gaM())
if(c!=null)s.c=c
return s}s=$.f
r=d?1:0
q=b!=null?32:0
p=A.ei(s,b)
o=c==null?A.eM():c
n=new A.a3(l,a,p,o,s,r|q,A.Y(l).i("a3<1>"))
n.CW=n
n.ch=n
n.ay=l.c&1
m=l.e
l.e=n
n.ch=null
n.CW=m
if(m==null)l.d=n
else m.ch=n
if(l.d===n)A.bQ(l.a)
return n},
aO(a){var s,r=this
A.Y(r).i("a3<1>").a(a)
if(a.ch===a)return null
s=a.ay
if((s&2)!==0)a.ay=s|4
else{r.aR(a)
if((r.c&2)===0&&r.d==null)r.ac()}return null},
aP(a){},
aQ(a){},
N(){if((this.c&4)!==0)return new A.G("Cannot add new events after calling close")
return new A.G("Cannot add new events while doing an addStream")},
n(a,b){if(!this.gR())throw A.b(this.N())
this.v(b)},
L(a,b){var s
if(!this.gR())throw A.b(this.N())
s=A.dL(a,b)
this.B(s.a,s.b)},
aq(a){return this.L(a,null)},
F(){var s,r,q=this
if((q.c&4)!==0){s=q.r
s.toString
return s}if(!q.gR())throw A.b(q.N())
q.c|=4
r=q.r
if(r==null)r=q.r=new A.i($.f,t.D)
q.A()
return r},
ai(a){var s,r,q,p=this,o=p.c
if((o&2)!==0)throw A.b(A.dC(u.o))
s=p.d
if(s==null)return
r=o&1
p.c=o^3
for(;s!=null;){o=s.ay
if((o&1)===r){s.ay=o|2
a.$1(s)
o=s.ay^=1
q=s.ch
if((o&4)!==0)p.aR(s)
s.ay&=4294967293
s=q}else s=s.ch}p.c&=4294967293
if(p.d==null)p.ac()},
ac(){if((this.c&4)!==0){var s=this.r
if((s.a&30)===0)s.G(null)}A.bQ(this.b)},
$iB:1,
$iF:1,
sb1(a){return this.a=a},
saz(a){return this.b=a}}
A.aT.prototype={
gR(){return A.M.prototype.gR.call(this)&&(this.c&2)===0},
N(){if((this.c&2)!==0)return new A.G(u.o)
return this.bg()},
v(a){var s=this,r=s.d
if(r==null)return
if(r===s.e){s.c|=2
r.a9(a)
s.c&=4294967293
if(s.d==null)s.ac()
return}s.ai(new A.d5(s,a))},
B(a,b){if(this.d==null)return
this.ai(new A.d7(this,a,b))},
A(){var s=this
if(s.d!=null)s.ai(new A.d6(s))
else s.r.G(null)}}
A.d5.prototype={
$1(a){a.a9(this.b)},
$S(){return this.a.$ti.i("~(H<1>)")}}
A.d7.prototype={
$1(a){a.aG(this.b,this.c)},
$S(){return this.a.$ti.i("~(H<1>)")}}
A.d6.prototype={
$1(a){a.aI()},
$S(){return this.a.$ti.i("~(H<1>)")}}
A.aK.prototype={
v(a){var s
for(s=this.d;s!=null;s=s.ch)s.u(new A.a5(a))},
B(a,b){var s
for(s=this.d;s!=null;s=s.ch)s.u(new A.ai(a,b))},
A(){var s=this.d
if(s!=null)for(;s!=null;s=s.ch)s.u(B.c)
else this.r.G(null)}}
A.cc.prototype={
$2(a,b){var s=this,r=s.a,q=--r.b
if(r.a!=null){r.a=null
r.d=a
r.c=b
if(q===0||s.c)s.d.q(a,b)}else if(q===0&&!s.c){q=r.d
q.toString
r=r.c
r.toString
s.d.q(q,r)}},
$S:3}
A.cb.prototype={
$1(a){var s,r,q,p,o,n,m=this,l=m.a,k=--l.b,j=l.a
if(j!=null){J.fc(j,m.b,a)
if(J.e0(k,0)){l=m.d
s=A.a([],l.i("l<0>"))
for(q=j,p=q.length,o=0;o<q.length;q.length===p||(0,A.dX)(q),++o){r=q[o]
n=r
if(n==null)n=l.a(n)
J.fd(s,n)}m.c.P(s)}}else if(J.e0(k,0)&&!m.f){s=l.d
s.toString
l=l.c
l.toString
m.c.q(s,l)}},
$S(){return this.d.i("n(0)")}}
A.I.prototype={
bU(a){if((this.c&15)!==6)return!0
return this.b.b.aD(this.d,a.a)},
bR(a){var s,r=this.e,q=null,p=a.a,o=this.b.b
if(t.Q.b(r))q=o.bY(r,p,a.b)
else q=o.aD(r,p)
try{p=q
return p}catch(s){if(t.c.b(A.D(s))){if((this.c&1)!==0)throw A.b(A.r("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.r("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.i.prototype={
X(a,b,c){var s,r,q=$.f
if(q===B.b){if(b!=null&&!t.Q.b(b)&&!t.w.b(b))throw A.b(A.e2(b,"onError",u.b))}else if(b!=null)b=A.eF(b,q)
s=new A.i(q,c.i("i<0>"))
r=b==null?1:3
this.O(new A.I(s,r,a,b,this.$ti.i("@<1>").ab(c).i("I<1,2>")))
return s},
a6(a,b){return this.X(a,null,b)},
aV(a,b,c){var s=new A.i($.f,c.i("i<0>"))
this.O(new A.I(s,19,a,b,this.$ti.i("@<1>").ab(c).i("I<1,2>")))
return s},
a7(a){var s=this.$ti,r=new A.i($.f,s)
this.O(new A.I(r,8,a,null,s.i("I<1,1>")))
return r},
bB(a){this.a=this.a&1|16
this.c=a},
a0(a){this.a=a.a&30|this.a&1
this.c=a.c},
O(a){var s=this,r=s.a
if(r<=3){a.a=s.c
s.c=a}else{if((r&4)!==0){r=s.c
if((r.a&24)===0){r.O(a)
return}s.a0(r)}A.am(null,null,s.b,new A.cM(s,a))}},
aN(a){var s,r,q,p,o,n=this,m={}
m.a=a
if(a==null)return
s=n.a
if(s<=3){r=n.c
n.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){s=n.c
if((s.a&24)===0){s.aN(a)
return}n.a0(s)}m.a=n.a1(a)
A.am(null,null,n.b,new A.cT(m,n))}},
S(){var s=this.c
this.c=null
return this.a1(s)},
a1(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bm(a){var s,r,q,p=this
p.a^=2
try{a.X(new A.cQ(p),new A.cR(p),t.P)}catch(q){s=A.D(q)
r=A.z(q)
A.dt(new A.cS(p,s,r))}},
P(a){var s=this,r=s.S()
s.a=8
s.c=a
A.a6(s,r)},
bo(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.S()
q.a0(a)
A.a6(q,r)},
q(a,b){var s=this.S()
this.bB(new A.U(a,b))
A.a6(this,s)},
G(a){if(this.$ti.i("t<1>").b(a)){this.aH(a)
return}this.bl(a)},
bl(a){this.a^=2
A.am(null,null,this.b,new A.cO(this,a))},
aH(a){if(this.$ti.b(a)){A.dF(a,this,!1)
return}this.bm(a)},
a_(a,b){this.a^=2
A.am(null,null,this.b,new A.cN(this,a,b))},
$it:1}
A.cM.prototype={
$0(){A.a6(this.a,this.b)},
$S:0}
A.cT.prototype={
$0(){A.a6(this.b,this.a.a)},
$S:0}
A.cQ.prototype={
$1(a){var s,r,q,p=this.a
p.a^=2
try{p.P(p.$ti.c.a(a))}catch(q){s=A.D(q)
r=A.z(q)
p.q(s,r)}},
$S:2}
A.cR.prototype={
$2(a,b){this.a.q(a,b)},
$S:4}
A.cS.prototype={
$0(){this.a.q(this.b,this.c)},
$S:0}
A.cP.prototype={
$0(){A.dF(this.a.a,this.b,!0)},
$S:0}
A.cO.prototype={
$0(){this.a.P(this.b)},
$S:0}
A.cN.prototype={
$0(){this.a.q(this.b,this.c)},
$S:0}
A.cW.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.b8(q.d)}catch(p){s=A.D(p)
r=A.z(p)
if(k.c&&k.b.a.c.a===s){q=k.a
q.c=k.b.a.c}else{q=s
o=r
if(o==null)o=A.dv(q)
n=k.a
n.c=new A.U(q,o)
q=n}q.b=!0
return}if(j instanceof A.i&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=j.c
q.b=!0}return}if(j instanceof A.i){m=k.b.a
l=new A.i(m.b,m.$ti)
j.X(new A.cX(l,m),new A.cY(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:0}
A.cX.prototype={
$1(a){this.a.bo(this.b)},
$S:2}
A.cY.prototype={
$2(a,b){this.a.q(a,b)},
$S:4}
A.cV.prototype={
$0(){var s,r,q,p,o,n
try{q=this.a
p=q.a
q.c=p.b.b.aD(p.d,this.b)}catch(o){s=A.D(o)
r=A.z(o)
q=s
p=r
if(p==null)p=A.dv(q)
n=this.a
n.c=new A.U(q,p)
n.b=!0}},
$S:0}
A.cU.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=l.a.a.c
p=l.b
if(p.a.bU(s)&&p.a.e!=null){p.c=p.a.bR(s)
p.b=!1}}catch(o){r=A.D(o)
q=A.z(o)
p=l.a.a.c
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.dv(p)
m=l.b
m.c=new A.U(p,n)
p=m}p.b=!0}},
$S:0}
A.bD.prototype={}
A.ae.prototype={
gau(){return!1},
gk(a){var s={},r=new A.i($.f,t.q)
s.a=0
this.a5(new A.cr(s,this),!0,new A.cs(s,r),r.gbn())
return r}}
A.cr.prototype={
$1(a){++this.a.a},
$S(){return A.Y(this.b).i("~(1)")}}
A.cs.prototype={
$0(){var s=this.b,r=this.a.a,q=s.S()
s.a=8
s.c=r
A.a6(s,q)},
$S:0}
A.a7.prototype={
ga8(){return new A.N(this,A.Y(this).i("N<1>"))},
gby(){if((this.b&8)===0)return this.a
return this.a.gan()},
af(){var s,r=this
if((r.b&8)===0){s=r.a
return s==null?r.a=new A.aQ():s}s=r.a.gan()
return s},
gJ(){var s=this.a
return(this.b&8)!==0?s.gan():s},
aa(){if((this.b&4)!==0)return new A.G("Cannot add event after closing")
return new A.G("Cannot add event while adding a stream")},
aJ(){var s=this.c
if(s==null)s=this.c=(this.b&2)!==0?$.b1():new A.i($.f,t.D)
return s},
n(a,b){var s=this,r=s.b
if(r>=4)throw A.b(s.aa())
if((r&1)!==0)s.v(b)
else if((r&3)===0)s.af().n(0,new A.a5(b))},
L(a,b){var s,r,q=this
if(q.b>=4)throw A.b(q.aa())
s=A.dL(a,b)
a=s.a
b=s.b
r=q.b
if((r&1)!==0)q.B(a,b)
else if((r&3)===0)q.af().n(0,new A.ai(a,b))},
aq(a){return this.L(a,null)},
F(){var s=this,r=s.b
if((r&4)!==0)return s.aJ()
if(r>=4)throw A.b(s.aa())
r=s.b=r|4
if((r&1)!==0)s.A()
else if((r&3)===0)s.af().n(0,B.c)
return s.aJ()},
aT(a,b,c,d){var s,r,q,p,o=this
if((o.b&3)!==0)throw A.b(A.dC("Stream has already been listened to."))
s=A.h_(o,a,b,c,d)
r=o.gby()
q=o.b|=1
if((q&8)!==0){p=o.a
p.san(s)
p.M()}else o.a=s
s.bC(r)
s.aj(new A.d4(o))
return s},
aO(a){var s,r,q,p,o,n,m,l=this,k=null
if((l.b&8)!==0)k=l.a.D()
l.a=null
l.b=l.b&4294967286|2
s=l.r
if(s!=null)if(k==null)try{r=s.$0()
if(r instanceof A.i)k=r}catch(o){q=A.D(o)
p=A.z(o)
n=new A.i($.f,t.D)
n.a_(q,p)
k=n}else k=k.a7(s)
m=new A.d3(l)
if(k!=null)k=k.a7(m)
else m.$0()
return k},
aP(a){if((this.b&8)!==0)this.a.V()
A.bQ(this.e)},
aQ(a){if((this.b&8)!==0)this.a.M()
A.bQ(this.f)},
$iB:1,
$iF:1,
sb1(a){return this.d=a},
sb2(a){return this.e=a},
sb3(a){return this.f=a},
saz(a){return this.r=a}}
A.d4.prototype={
$0(){A.bQ(this.a.d)},
$S:0}
A.d3.prototype={
$0(){var s=this.a.c
if(s!=null&&(s.a&30)===0)s.G(null)},
$S:0}
A.bN.prototype={
v(a){this.gJ().a9(a)},
B(a,b){this.gJ().aG(a,b)},
A(){this.gJ().aI()}}
A.bE.prototype={
v(a){this.gJ().u(new A.a5(a))},
B(a,b){this.gJ().u(new A.ai(a,b))},
A(){this.gJ().u(B.c)}}
A.ag.prototype={}
A.aj.prototype={}
A.N.prototype={}
A.a4.prototype={
aL(){return this.w.aO(this)},
H(){this.w.aP(this)},
I(){this.w.aQ(this)}}
A.H.prototype={
bC(a){var s=this
if(a==null)return
s.r=a
if(a.c!=null){s.e=(s.e|128)>>>0
a.Y(s)}},
W(a){var s,r,q=this,p=q.e
if((p&8)!==0)return
s=(p+256|4)>>>0
q.e=s
if(p<256){r=q.r
if(r!=null)if(r.a===1)r.a=3}if((p&4)===0&&(s&64)===0)q.aj(q.gak())},
V(){return this.W(null)},
M(){var s=this,r=s.e
if((r&8)!==0)return
if(r>=256){r=s.e=r-256
if(r<256)if((r&128)!==0&&s.r.c!=null)s.r.Y(s)
else{r=(r&4294967291)>>>0
s.e=r
if((r&64)===0)s.aj(s.gal())}}},
D(){var s=this,r=(s.e&4294967279)>>>0
s.e=r
if((r&8)===0)s.ad()
r=s.f
return r==null?$.b1():r},
gaY(){return this.e>=256},
ad(){var s,r=this,q=r.e=(r.e|8)>>>0
if((q&128)!==0){s=r.r
if(s.a===1)s.a=3}if((q&64)===0)r.r=null
r.f=r.aL()},
a9(a){var s=this.e
if((s&8)!==0)return
if(s<64)this.v(a)
else this.u(new A.a5(a))},
aG(a,b){var s
if(t.C.b(a))A.dA(a,b)
s=this.e
if((s&8)!==0)return
if(s<64)this.B(a,b)
else this.u(new A.ai(a,b))},
aI(){var s=this,r=s.e
if((r&8)!==0)return
r=(r|2)>>>0
s.e=r
if(r<64)s.A()
else s.u(B.c)},
H(){},
I(){},
aL(){return null},
u(a){var s,r=this,q=r.r
if(q==null)q=r.r=new A.aQ()
q.n(0,a)
s=r.e
if((s&128)===0){s=(s|128)>>>0
r.e=s
if(s<256)q.Y(r)}},
v(a){var s=this,r=s.e
s.e=(r|64)>>>0
s.d.aE(s.a,a)
s.e=(s.e&4294967231)>>>0
s.ae((r&4)!==0)},
B(a,b){var s,r=this,q=r.e,p=new A.cI(r,a,b)
if((q&1)!==0){r.e=(q|16)>>>0
r.ad()
s=r.f
if(s!=null&&s!==$.b1())s.a7(p)
else p.$0()}else{p.$0()
r.ae((q&4)!==0)}},
A(){var s,r=this,q=new A.cH(r)
r.ad()
r.e=(r.e|16)>>>0
s=r.f
if(s!=null&&s!==$.b1())s.a7(q)
else q.$0()},
aj(a){var s=this,r=s.e
s.e=(r|64)>>>0
a.$0()
s.e=(s.e&4294967231)>>>0
s.ae((r&4)!==0)},
ae(a){var s,r,q=this,p=q.e
if((p&128)!==0&&q.r.c==null){p=q.e=(p&4294967167)>>>0
s=!1
if((p&4)!==0)if(p<256){s=q.r
s=s==null?null:s.c==null
s=s!==!1}if(s){p=(p&4294967291)>>>0
q.e=p}}for(;!0;a=r){if((p&8)!==0){q.r=null
return}r=(p&4)!==0
if(a===r)break
q.e=(p^64)>>>0
if(r)q.H()
else q.I()
p=(q.e&4294967231)>>>0
q.e=p}if((p&128)!==0&&p<256)q.r.Y(q)}}
A.cI.prototype={
$0(){var s,r,q=this.a,p=q.e
if((p&8)!==0&&(p&16)===0)return
q.e=(p|64)>>>0
s=q.b
p=this.b
r=q.d
if(t.k.b(s))r.c0(s,p,this.c)
else r.aE(s,p)
q.e=(q.e&4294967231)>>>0},
$S:0}
A.cH.prototype={
$0(){var s=this.a,r=s.e
if((r&16)===0)return
s.e=(r|74)>>>0
s.d.aC(s.c)
s.e=(s.e&4294967231)>>>0},
$S:0}
A.aS.prototype={
a5(a,b,c,d){return this.a.aT(a,d,c,b===!0)},
bT(a,b){return this.a5(a,null,null,b)},
bS(a){return this.a5(a,null,null,null)},
av(a,b,c){return this.a5(a,null,b,c)}}
A.bG.prototype={
gU(){return this.a},
sU(a){return this.a=a}}
A.a5.prototype={
aA(a){a.v(this.b)}}
A.ai.prototype={
aA(a){a.B(this.b,this.c)}}
A.cJ.prototype={
aA(a){a.A()},
gU(){return null},
sU(a){throw A.b(A.dC("No events after a done."))}}
A.aQ.prototype={
Y(a){var s=this,r=s.a
if(r===1)return
if(r>=1){s.a=1
return}A.dt(new A.d_(s,a))
s.a=1},
n(a,b){var s=this,r=s.c
if(r==null)s.b=s.c=b
else{r.sU(b)
s.c=b}}}
A.d_.prototype={
$0(){var s,r,q=this.a,p=q.a
q.a=0
if(p===3)return
s=q.b
r=s.gU()
q.b=r
if(r==null)q.c=null
s.aA(this.b)},
$S:0}
A.aL.prototype={
gaY(){return this.a>=2},
W(a){var s=this.a
if(s>=0)this.a=s+2},
V(){return this.W(null)},
M(){var s=this,r=s.a-2
if(r<0)return
if(r===0){s.a=1
A.dt(s.gaM())}else s.a=r},
D(){this.a=-1
this.c=null
return $.b1()},
bx(){var s,r=this,q=r.a-1
if(q===0){r.a=-1
s=r.c
if(s!=null){r.c=null
r.b.aC(s)}}else r.a=q}}
A.bL.prototype={}
A.de.prototype={}
A.di.prototype={
$0(){A.fr(this.a,this.b)},
$S:0}
A.d0.prototype={
aC(a){var s,r,q
try{if(B.b===$.f){a.$0()
return}A.eG(null,null,this,a)}catch(q){s=A.D(q)
r=A.z(q)
A.al(s,r)}},
c2(a,b){var s,r,q
try{if(B.b===$.f){a.$1(b)
return}A.eI(null,null,this,a,b)}catch(q){s=A.D(q)
r=A.z(q)
A.al(s,r)}},
aE(a,b){return this.c2(a,b,t.z)},
c_(a,b,c){var s,r,q
try{if(B.b===$.f){a.$2(b,c)
return}A.eH(null,null,this,a,b,c)}catch(q){s=A.D(q)
r=A.z(q)
A.al(s,r)}},
c0(a,b,c){var s=t.z
return this.c_(a,b,c,s,s)},
aW(a){return new A.d1(this,a)},
bM(a,b){return new A.d2(this,a,b)},
bX(a){if($.f===B.b)return a.$0()
return A.eG(null,null,this,a)},
b8(a){return this.bX(a,t.z)},
c1(a,b){if($.f===B.b)return a.$1(b)
return A.eI(null,null,this,a,b)},
aD(a,b){var s=t.z
return this.c1(a,b,s,s)},
bZ(a,b,c){if($.f===B.b)return a.$2(b,c)
return A.eH(null,null,this,a,b,c)},
bY(a,b,c){var s=t.z
return this.bZ(a,b,c,s,s,s)},
bW(a){return a},
aB(a){var s=t.z
return this.bW(a,s,s,s)}}
A.d1.prototype={
$0(){return this.a.aC(this.b)},
$S:0}
A.d2.prototype={
$1(a){return this.a.aE(this.b,a)},
$S(){return this.c.i("~(0)")}}
A.h.prototype={
gaZ(a){return new A.ac(a,this.gk(a),A.b_(a).i("ac<h.E>"))},
bQ(a,b){return this.p(a,b)},
gaX(a){return this.gk(a)!==0},
h(a){return A.ea(a,"[","]")},
$id:1}
A.b8.prototype={}
A.cC.prototype={
bO(a){var s,r,q,p=A.eb(0,null,a.length)
if(p===0)return new Uint8Array(0)
s=p*3
r=new Uint8Array(s)
q=new A.dc(r)
if(q.br(a,0,p)!==p)q.ao()
return new Uint8Array(r.subarray(0,A.hr(0,q.b,s)))}}
A.dc.prototype={
ao(){var s=this,r=s.c,q=s.b,p=s.b=q+1
r.$flags&2&&A.T(r)
r[q]=239
q=s.b=p+1
r[p]=191
s.b=q+1
r[q]=189},
bL(a,b){var s,r,q,p,o=this
if((b&64512)===56320){s=65536+((a&1023)<<10)|b&1023
r=o.c
q=o.b
p=o.b=q+1
r.$flags&2&&A.T(r)
r[q]=s>>>18|240
q=o.b=p+1
r[p]=s>>>12&63|128
p=o.b=q+1
r[q]=s>>>6&63|128
o.b=p+1
r[p]=s&63|128
return!0}else{o.ao()
return!1}},
br(a,b,c){var s,r,q,p,o,n,m,l,k=this
if(b!==c&&(a.charCodeAt(c-1)&64512)===55296)--c
for(s=k.c,r=s.$flags|0,q=s.length,p=b;p<c;++p){o=a.charCodeAt(p)
if(o<=127){n=k.b
if(n>=q)break
k.b=n+1
r&2&&A.T(s)
s[n]=o}else{n=o&64512
if(n===55296){if(k.b+4>q)break
m=p+1
if(k.bL(o,a.charCodeAt(m)))p=m}else if(n===56320){if(k.b+3>q)break
k.ao()}else if(o<=2047){n=k.b
l=n+1
if(l>=q)break
k.b=l
r&2&&A.T(s)
s[n]=o>>>6|192
k.b=l+1
s[l]=o&63|128}else{n=k.b
if(n+2>=q)break
l=k.b=n+1
r&2&&A.T(s)
s[n]=o>>>12|224
n=k.b=l+1
s[l]=o>>>6&63|128
k.b=n+1
s[n]=o&63|128}}}return p}}
A.k.prototype={
gZ(){return A.fE(this)}}
A.b4.prototype={
h(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.c9(s)
return"Assertion failed"}}
A.K.prototype={}
A.E.prototype={
gah(){return"Invalid argument"+(!this.a?"(s)":"")},
gag(){return""},
h(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.p(p),n=s.gah()+q+o
if(!s.a)return n
return n+s.gag()+": "+A.c9(s.gar())},
gar(){return this.b}}
A.aF.prototype={
gar(){return this.b},
gah(){return"RangeError"},
gag(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.p(q):""
else if(q==null)s=": Not greater than or equal to "+A.p(r)
else if(q>r)s=": Not in inclusive range "+A.p(r)+".."+A.p(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.p(r)
return s}}
A.b9.prototype={
gar(){return this.b},
gah(){return"RangeError"},
gag(){if(this.b<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gk(a){return this.f}}
A.aJ.prototype={
h(a){return"Unsupported operation: "+this.a}}
A.by.prototype={
h(a){return"UnimplementedError: "+this.a}}
A.G.prototype={
h(a){return"Bad state: "+this.a}}
A.b7.prototype={
h(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.c9(s)+"."}}
A.aH.prototype={
h(a){return"Stack Overflow"},
gZ(){return null},
$ik:1}
A.cL.prototype={
h(a){return"Exception: "+this.a}}
A.ca.prototype={
h(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException",q=this.b
if(typeof q=="string"){if(q.length>78)q=B.x.be(q,0,75)+"..."
return r+"\n"+q}else return r}}
A.n.prototype={
h(a){return"null"}}
A.e.prototype={$ie:1,
h(a){return"Instance of '"+A.ci(this)+"'"},
gl(a){return A.ik(this)},
toString(){return this.h(this)}}
A.bM.prototype={
h(a){return""},
$iu:1}
A.ct.prototype={
gk(a){return this.a.length},
h(a){var s=this.a
return s.charCodeAt(0)==0?s:s}}
A.bq.prototype={
p(a,b){return(B.a.aS(this.a[B.a.K(b,8)],7-B.a.m(b,8))&1)===1},
gk(a){return this.b},
E(a,b){var s
for(s=0;s<b;++s)this.b5((B.a.bd(a,b-s-1)&1)===1)},
b5(a){var s=this,r=B.a.K(s.b,8),q=s.a
if(q.length<=r)q.push(0)
if(a)q[r]=q[r]|B.a.C(128,B.a.m(s.b,8));++s.b},
$id:1}
A.bK.prototype={}
A.br.prototype={
gk(a){return this.b.length},
ba(a){var s,r,q
for(s=this.b,r=s.length,q=0;q<r;++q)a.E(s[q],8)},
$ick:1,
gaw(){return 4}}
A.bu.prototype={
ba(a){var s,r=this.a,q=r.length,p=B.a.m(q,3),o=q-p
for(s=0;s<o;s+=3)a.E(r[s]*100+r[s+1]*10+r[s+2],10)
if(p>1)a.E(r[q-2]*10+r[q-1],7)
else if(p>0){if(q===0)A.A(A.fz())
a.E(r[q-1],4)}},
gk(a){return this.a.length},
$ick:1,
gaw(){return 1}}
A.cd.prototype={
h(a){return"QrInputTooLongException: "+this.c}}
A.cp.prototype={
gk(a){return this.a.length},
bV(a){var s,r,q,p,o,n,m=this.a,l=m.length,k=a.a,j=k.length,i=new Uint8Array(l+j-1)
for(s=0;s<l;++s)for(r=0;r<j;++r){q=s+r
p=i[q]
o=m[s]
o=o>=1?$.bT()[o]:A.A(A.r("glog("+o+")",null))
n=k[r]
n=n>=1?$.bT()[n]:A.A(A.r("glog("+n+")",null))
i[q]=(p^$.bS()[B.a.m(o+n,255)])>>>0}return A.bv(i,0)},
b0(a){var s,r,q,p=this.a,o=p.length,n=a.a,m=n.length
if(o-m<0)return this
s=A.eR(p[0])-A.eR(n[0])
r=new Uint8Array(o)
for(q=0;q<o;++q)r[q]=p[q]
for(q=0;q<m;++q){p=r[q]
o=n[q]
o=o>=1?$.bT()[o]:A.A(A.r("glog("+o+")",null))
r[q]=(p^$.bS()[B.a.m(o+s,255)])>>>0}return A.bv(r,0).b0(a)}}
A.cj.prototype={
gbP(){var s=this,r=s.d
return r==null?s.d=A.ev(s.a,s.b,s.e):r}}
A.bt.prototype={
bA(){var s,r,q,p=this.e
B.e.bN(p)
for(s=this.a,r=t.e,q=0;q<s;++q)p.push(A.be(s,null,!1,r))},
j(a,b){var s
if(a>=0){s=this.a
s=s<=a||b<0||s<=b}else s=!0
if(s)throw A.b(A.r(""+a+" , "+b,null))
s=this.e[a][b]
s.toString
return s},
aK(a,b,c){var s,r=this
r.bA()
r.am(0,0)
s=r.a-7
r.am(s,0)
r.am(0,s)
r.bD()
r.bE()
r.bF(a,c)
if(r.b>=7)r.bG(c)
r.bu(b,a)},
am(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
for(s=this.e,r=this.a,q=-1;q<=7;++q){p=a+q
if(p<=-1||r<=p)continue
for(o=0<=q,n=q<=6,m=q!==0,l=q===6,k=2<=q,j=q<=4,i=-1;i<=7;++i){h=b+i
if(h<=-1||r<=h)continue
g=!1
if(o)if(n)g=i===0||i===6
f=!0
if(!g){g=!1
if(0<=i)if(i<=6)g=!m||l
if(!g)g=k&&j&&2<=i&&i<=4
else g=f}else g=f
if(g)s[p][h]=!0
else s[p][h]=!1}}},
bD(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=B.bg[this.b-1]
for(s=e.length,r=this.e,q=0;q<s;++q)for(p=0;p<s;++p){o=e[q]
n=e[p]
if(r[o][n]!=null)continue
for(m=-2;m<=2;++m)for(l=o+m,k=m!==-2,j=m!==2,i=m===0,h=-2;h<=2;++h){g=!0
if(k)if(j)if(h!==-2)if(h!==2)g=i&&h===0
f=n+h
if(g)r[l][f]=!0
else r[l][f]=!1}}},
bE(){var s,r,q,p,o
for(s=this.a-8,r=this.e,q=8;q<s;++q){p=r[q]
if(p[6]!=null)continue
p[6]=(q&1)===0}for(o=8;o<s;++o){p=r[6]
if(p[o]!=null)continue
p[o]=(o&1)===0}},
bF(a,b){var s,r,q,p,o,n,m=A.ic((this.c<<3|a)>>>0)
for(s=this.e,r=this.a,q=r-15,p=!b,o=0;o<15;++o){n=p&&(B.a.C(m,o)&1)===1
if(o<6)s[o][8]=n
else if(o<8)s[o+1][8]=n
else s[q+o][8]=n}for(o=0;o<15;++o){n=p&&(B.a.C(m,o)&1)===1
if(o<8)s[8][r-o-1]=n
else{q=15-o-1
if(o<9)s[8][q+1]=n
else s[8][q]=n}}s[r-8][8]=p},
bG(a){var s,r,q,p,o,n=A.id(this.b)
for(s=this.e,r=this.a,q=!a,p=0;p<18;++p){o=q&&(B.a.C(n,p)&1)===1
s[B.a.K(p,3)][B.a.m(p,3)+r-8-3]=o}for(p=0;p<18;++p){o=q&&(B.a.C(n,p)&1)===1
s[B.a.m(p,3)+r-8-3][B.a.K(p,3)]=o}},
bu(a,b){var s,r,q,p,o,n,m,l,k,j=this.a,i=j-1
for(s=this.e,r=i,q=-1,p=7,o=0;r>0;r-=2){if(r===6)--r
for(;!0;){for(n=0;n<2;++n){m=r-n
if(s[i][m]==null){l=o<a.length&&(B.a.aS(a[o],p)&1)===1
if(A.hT(b,i,m))l=!l
s[i][m]=l;--p
if(p===-1){++o
p=7}}}i+=q
if(i<0||j<=i){i-=q
k=-q
q=k
break}}}}}
A.bw.prototype={}
A.bZ.prototype={
$1(a){var s=this.a
s.a=null
s.e=!1
this.b.n(0,a)},
$S(){return this.c.i("~(0)")}}
A.c1.prototype={
$1(a){var s,r=this,q=r.a,p=q.a=r.b.$2(a,q.a)
q.e=!0
if(!r.c)return
if(q.d){q.d=!1
s=p==null?r.e.a(p):p
r.d.$1(s)}if(q.c){q.r.D()
r.f.F()}},
$S(){return this.r.i("~(0)")}}
A.c2.prototype={
$0(){var s=this.a
s.b=!0
if(!s.e){s=s.f
if(s!=null)s.D()
this.b.F()}},
$S:0}
A.c_.prototype={
$1(a){var s,r=this,q=r.a
if(q.e){s=q.a
if(s==null)s=r.c.a(s)
r.b.$1(s)}else q.d=!0
if(q.b){q.f.D()
r.f.F()}},
$S:7}
A.c0.prototype={
$0(){var s=this.a
s.c=!0
if(!s.d){s=s.r
if(s!=null)s.D()
this.b.F()}},
$S:0}
A.bY.prototype={
$0(){var s,r=this,q=r.b,p=r.d,o=r.a
o.r=q.av(r.c,r.e,p.ga3())
s=o.f
if(s!=null){if(s.gaY())s.M()}else o.f=r.f.av(r.r,r.w,p.ga3())
p.saz(new A.bX(o,r.f,q))},
$S:0}
A.bX.prototype={
$0(){var s=A.a([],t.M),r=this.a
if(!r.b)s.push(r.r.D())
r.r=null
r.f.V()
s.$flags&1&&A.T(s,16)
B.e.bz(s,new A.bV(),!0)
if(s.length===0)return null
r=t.H
return A.fv(s,r).a6(new A.bW(),r)},
$S:11}
A.bV.prototype={
$1(a){return a==null},
$S:20}
A.bW.prototype={
$1(a){return null},
$S:21}
A.c4.prototype={
$2(a,b){var s=t.H,r=this.b.$1(a).a6(b.gap(b),s),q=b.ga3(),p=r.$ti,o=$.f,n=new A.i(o,p)
if(o!==B.b)q=A.eF(q,o)
r.O(new A.I(n,2,null,q,p.i("I<1,1>")))
this.a.a=n.a6(this.c,s)},
$S(){return this.d.i("@<0>").ab(this.e).i("~(1,B<2>)")}}
A.c5.prototype={
$1(a){var s=this.a.a
if(s!=null)s.a6(new A.c3(a),t.H)
else a.F()},
$S(){return this.b.i("~(B<0>)")}}
A.c3.prototype={
$1(a){return this.a.F()},
$S:22}
A.cz.prototype={
$0(){var s,r,q,p=this,o={}
o.a=!1
s=p.b
r=p.d
q=p.a
q.a=s.av(new A.cv(p.c,r,p.r),new A.cw(o,p.f,r),new A.cx(p.e,r))
if(!s.gau()){r.sb2(q.a.gb4())
r.sb3(q.a.gb7())}r.saz(new A.cy(q,o))},
$S:0}
A.cv.prototype={
$1(a){return this.a.$2(a,this.b)},
$S(){return this.c.i("~(0)")}}
A.cx.prototype={
$2(a,b){this.a.$3(a,b,this.b)},
$S:4}
A.cw.prototype={
$0(){this.a.a=!0
this.b.$1(this.c)},
$S:0}
A.cy.prototype={
$0(){var s=this.a,r=s.a
s.a=null
if(!this.b.a)return r.D()
return null},
$S:11}
A.dx.prototype={}
A.bI.prototype={
bJ(){var s=this,r=s.d
if(r!=null&&s.a<=0)s.b.addEventListener(s.c,r,!1)}}
A.cK.prototype={
$1(a){return this.a.$1(a)},
$S:1}
A.bU.prototype={
b9(a,b){var s=this
s.e=s.e+(a*s.a+b*s.c)
s.f=s.f+(a*s.b+b*s.d)},
h(a){var s=this
return B.e.b_(A.a([s.a,s.b,s.c,s.d,s.e,s.f],t.a),", ")}}
A.c6.prototype={
c4(){var s,r,q=this,p=q.c
p=p==null?q.c=0:q.c=p*0.8
s=q.a
r=q.b
p=q.c=p+(s-r)*0.05
r+=p
q.b=r
if(Math.abs(r-s)<0.01&&Math.abs(p)<0.01){q.b=s
q.c=null
return!1}else return!0}}
A.bs.prototype={
bj(a,b,c,d){var s,r,q,p,o,n,m,l,k=this
k.c.fillStyle="black"
k.e.bS(new A.cl(k))
for(s=k.gbs(),r=1;r<=10;++r){q=self
p=q.document.createElement("INPUT")
p.type="radio"
o=""+r
p.id="type_"+o
p.name="type"
A.dE(p,"change",s,!1)
p.dataset.type_value=B.a.h(r)
if(r===k.r)p.checked=!0
b.appendChild(p)
n=q.document.createElement("label")
n.innerHTML=o
n.htmlFor=p.id
n.classList.add("btn")
b.appendChild(n)}for(s=k.gbp(),m=0;m<4;++m){l=B.k[m]
q=self
p=q.document.createElement("input")
p.type="radio"
p.id="error_"+l
p.name="error-level"
A.dE(p,"change",s,!1)
p.dataset.error_value=B.a.h(l)
if(l===k.w)p.checked=!0
c.appendChild(p)
n=q.document.createElement("label")
n.innerHTML=A.fJ(l)
n.htmlFor=p.id
n.classList.add("btn")
c.appendChild(n)}},
b6(){if(!this.y){this.y=!0
self.window.requestAnimationFrame(A.eA(this.gbv()))}},
bt(a){var s=a.target
if(s==null)s=t.m.a(s)
this.r=A.eV(s.dataset.type_value)
this.a2()},
bq(a){var s=a.target
if(s==null)s=t.m.a(s)
this.w=A.eV(s.dataset.error_value)
this.a2()},
a2(){var s=this
s.d.n(0,new A.ah(s.r,s.w,s.f))},
bw(a){var s,r,q,p,o,n,m,l,k,j=this
j.y=!1
s=j.c
r=j.b
s.clearRect(0,0,r.width,r.height)
q=j.x
q===$&&A.iB()
p=B.w.c3(Math.sqrt(J.e1(q)))
q=r.width
o=r.height
n=j.a
n.a=B.a.bh(Math.min(A.eO(q),A.eO(o)),1.1*p)
if(n.c4())j.b6()
m=new A.bU(1,0,0,1,0,0)
m.b9(0.5*r.width,0.5*r.height)
r=n.b
m.a*=r
m.b*=r
m.c*=r
m.d*=r
r=-0.5*p
m.b9(r,r)
s.save()
s.setTransform.apply(s,[m.a,m.b,m.c,m.d,m.e,m.f])
if(J.fe(j.x))for(l=0;l<p;++l)for(r=l*p,k=0;k<p;++k)if(J.fb(j.x,r+k))s.fillRect(l,k,1,1)
s.restore()}}
A.cm.prototype={
$1(a){var s=this.a
s.f=this.b.value
s.a2()},
$S:1}
A.cn.prototype={
$1(a){this.a.style.background=""},
$S:12}
A.co.prototype={
$1(a){this.a.style.background="red"
A.ix(A.p(a))},
$S:24}
A.cl.prototype={
$1(a){var s=this.a
s.x=a
s.b6()},
$S:12}
A.ah.prototype={};(function aliases(){var s=J.W.prototype
s.bf=s.h
s=A.M.prototype
s.bg=s.N})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers._static_2,p=hunkHelpers._instance_0u,o=hunkHelpers._instance_1i,n=hunkHelpers.installInstanceTearOff,m=hunkHelpers._instance_2u,l=hunkHelpers.installStaticTearOff,k=hunkHelpers._instance_1u
s(A,"i6","fX",5)
s(A,"i7","fY",5)
s(A,"i8","fZ",5)
r(A,"eN","hZ",0)
q(A,"i9","hW",3)
r(A,"eM","hV",0)
var j
p(j=A.a3.prototype,"gak","H",0)
p(j,"gal","I",0)
o(j=A.M.prototype,"gap","n",8)
n(j,"ga3",0,1,null,["$2","$1"],["L","aq"],9,0,0)
m(A.i.prototype,"gbn","q",3)
o(j=A.a7.prototype,"gap","n",8)
n(j,"ga3",0,1,null,["$2","$1"],["L","aq"],9,0,0)
p(j=A.a4.prototype,"gak","H",0)
p(j,"gal","I",0)
n(j=A.H.prototype,"gb4",0,0,null,["$1","$0"],["W","V"],10,0,0)
p(j,"gb7","M",0)
p(j,"gak","H",0)
p(j,"gal","I",0)
n(j=A.aL.prototype,"gb4",0,0,null,["$1","$0"],["W","V"],10,0,0)
p(j,"gb7","M",0)
p(j,"gaM","bx",0)
l(A,"ia",2,null,["$1$2","$2"],["ex",function(a,b){return A.ex(a,b,t.z)}],25,0)
l(A,"ib",1,null,["$1$1","$1"],["eB",function(a){return A.eB(a,t.z)}],26,0)
l(A,"ii",3,null,["$1$3","$3"],["ef",function(a,b,c){return A.ef(a,b,c,t.z)}],27,0)
s(A,"iy","dJ",28)
k(j=A.bs.prototype,"gbs","bt",1)
k(j,"gbp","bq",1)
k(j,"gbv","bw",23)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.e,null)
q(A.e,[A.dy,J.ba,J.b3,A.k,A.h,A.a0,A.ac,A.as,A.bA,A.cA,A.ch,A.ar,A.aR,A.cf,A.C,A.bJ,A.da,A.d8,A.bC,A.U,A.ae,A.H,A.M,A.I,A.i,A.bD,A.a7,A.bN,A.bE,A.bG,A.cJ,A.aQ,A.aL,A.bL,A.de,A.b8,A.dc,A.aH,A.cL,A.ca,A.n,A.bM,A.ct,A.bK,A.br,A.bu,A.cd,A.cp,A.cj,A.bt,A.bw,A.dx,A.bI,A.bU,A.c6,A.bs,A.ah])
q(J.ba,[J.bb,J.au,J.ax,J.aw,J.ay,J.av,J.ab])
q(J.ax,[J.W,J.l,A.bf,A.aC])
q(J.W,[J.bp,J.aI,J.V])
r(J.cg,J.l)
q(J.av,[J.at,J.bc])
q(A.k,[A.az,A.K,A.bd,A.bz,A.bF,A.bx,A.bH,A.b4,A.E,A.aJ,A.by,A.G,A.b7])
r(A.af,A.h)
r(A.aq,A.af)
q(A.a0,[A.c7,A.ce,A.c8,A.cu,A.dm,A.dp,A.cE,A.cD,A.dg,A.d5,A.d7,A.d6,A.cb,A.cQ,A.cX,A.cr,A.d2,A.bZ,A.c1,A.c_,A.bV,A.bW,A.c5,A.c3,A.cv,A.cK,A.cm,A.cn,A.co,A.cl])
q(A.c7,[A.ds,A.cF,A.cG,A.d9,A.cM,A.cT,A.cS,A.cP,A.cO,A.cN,A.cW,A.cV,A.cU,A.cs,A.d4,A.d3,A.cI,A.cH,A.d_,A.di,A.d1,A.c2,A.c0,A.bY,A.bX,A.cz,A.cw,A.cy])
r(A.aa,A.ce)
r(A.aE,A.K)
q(A.cu,[A.cq,A.b6])
q(A.c8,[A.dn,A.dh,A.dj,A.cc,A.cR,A.cY,A.c4,A.cx])
q(A.aC,[A.bg,A.ad])
q(A.ad,[A.aM,A.aO])
r(A.aN,A.aM)
r(A.aA,A.aN)
r(A.aP,A.aO)
r(A.aB,A.aP)
q(A.aA,[A.bh,A.bi])
q(A.aB,[A.bj,A.bk,A.bl,A.bm,A.bn,A.aD,A.bo])
r(A.aU,A.bH)
r(A.aS,A.ae)
r(A.N,A.aS)
r(A.a2,A.N)
r(A.a4,A.H)
r(A.a3,A.a4)
q(A.M,[A.aT,A.aK])
q(A.a7,[A.ag,A.aj])
q(A.bG,[A.a5,A.ai])
r(A.d0,A.de)
r(A.cC,A.b8)
q(A.E,[A.aF,A.b9])
r(A.bq,A.bK)
s(A.af,A.bA)
s(A.aM,A.h)
s(A.aN,A.as)
s(A.aO,A.h)
s(A.aP,A.as)
s(A.ag,A.bE)
s(A.aj,A.bN)
s(A.bK,A.h)})()
var v={typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{c:"int",q:"double",S:"num",a1:"String",w:"bool",n:"Null",d:"List",e:"Object",iI:"Map"},mangledNames:{},types:["~()","~(o)","n(@)","~(e,u)","n(e,u)","~(~())","n()","~(@)","~(e?)","~(e[u?])","~([t<~>?])","t<~>?()","~(d<w>)","t<~>()","@(@)","@(@,a1)","@(a1)","n(~())","n(@,u)","~(c,@)","w(e?)","n(d<~>)","~(~)","~(S)","n(e)","0^(0^,@)<e?>","~(F<0^>)<e?>","~(e,u,B<0^>)<e?>","t<d<w>>(ah)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.hf(v.typeUniverse,JSON.parse('{"bp":"W","aI":"W","V":"W","bb":{"w":[],"j":[]},"au":{"n":[],"j":[]},"ax":{"o":[]},"W":{"o":[]},"l":{"d":["1"],"o":[]},"cg":{"l":["1"],"d":["1"],"o":[]},"av":{"q":[],"S":[]},"at":{"q":[],"c":[],"S":[],"j":[]},"bc":{"q":[],"S":[],"j":[]},"ab":{"a1":[],"j":[]},"az":{"k":[]},"aq":{"h":["c"],"d":["c"],"h.E":"c"},"af":{"h":["1"],"d":["1"]},"aE":{"K":[],"k":[]},"bd":{"k":[]},"bz":{"k":[]},"aR":{"u":[]},"bF":{"k":[]},"bx":{"k":[]},"bf":{"o":[],"j":[]},"aC":{"o":[]},"bg":{"o":[],"j":[]},"ad":{"y":["1"],"o":[]},"aA":{"h":["q"],"d":["q"],"y":["q"],"o":[]},"aB":{"h":["c"],"d":["c"],"y":["c"],"o":[]},"bh":{"h":["q"],"d":["q"],"y":["q"],"o":[],"j":[],"h.E":"q"},"bi":{"h":["q"],"d":["q"],"y":["q"],"o":[],"j":[],"h.E":"q"},"bj":{"h":["c"],"d":["c"],"y":["c"],"o":[],"j":[],"h.E":"c"},"bk":{"h":["c"],"d":["c"],"y":["c"],"o":[],"j":[],"h.E":"c"},"bl":{"h":["c"],"d":["c"],"y":["c"],"o":[],"j":[],"h.E":"c"},"bm":{"h":["c"],"d":["c"],"y":["c"],"o":[],"j":[],"h.E":"c"},"bn":{"h":["c"],"d":["c"],"y":["c"],"o":[],"j":[],"h.E":"c"},"aD":{"h":["c"],"d":["c"],"y":["c"],"o":[],"j":[],"h.E":"c"},"bo":{"h":["c"],"d":["c"],"y":["c"],"o":[],"j":[],"h.E":"c"},"bH":{"k":[]},"aU":{"K":[],"k":[]},"B":{"F":["1"]},"U":{"k":[]},"a2":{"N":["1"],"ae":["1"]},"a3":{"H":["1"]},"M":{"B":["1"],"F":["1"]},"aT":{"M":["1"],"B":["1"],"F":["1"]},"aK":{"M":["1"],"B":["1"],"F":["1"]},"i":{"t":["1"]},"a7":{"B":["1"],"F":["1"]},"ag":{"a7":["1"],"B":["1"],"F":["1"]},"aj":{"a7":["1"],"B":["1"],"F":["1"]},"N":{"ae":["1"]},"a4":{"H":["1"]},"aS":{"ae":["1"]},"h":{"d":["1"]},"q":{"S":[]},"c":{"S":[]},"b4":{"k":[]},"K":{"k":[]},"E":{"k":[]},"aF":{"k":[]},"b9":{"k":[]},"aJ":{"k":[]},"by":{"k":[]},"G":{"k":[]},"b7":{"k":[]},"aH":{"k":[]},"bM":{"u":[]},"bq":{"h":["w"],"d":["w"],"h.E":"w"},"br":{"ck":[]},"bu":{"ck":[]},"fy":{"d":["c"]},"fV":{"d":["c"]},"fU":{"d":["c"]},"fw":{"d":["c"]},"fS":{"d":["c"]},"fx":{"d":["c"]},"fT":{"d":["c"]},"fs":{"d":["q"]},"ft":{"d":["q"]}}'))
A.he(v.typeUniverse,JSON.parse('{"as":1,"bA":1,"af":1,"ad":1,"B":1,"H":1,"bN":1,"bE":1,"a4":1,"aS":1,"bG":1,"a5":1,"aQ":1,"aL":1,"bL":1,"b8":2,"F":1,"bI":1}'))
var u={c:"Broadcast stream controllers do not support pause callbacks",o:"Cannot fire new event. Controller is already firing an event",b:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.dT
return{V:s("aq"),C:s("k"),Z:s("iG"),M:s("l<t<~>>"),S:s("l<d<c>>"),f:s("l<d<w?>>"),h:s("l<ck>"),J:s("l<bw>"),s:s("l<a1>"),u:s("l<w>"),b:s("l<@>"),t:s("l<c>"),a:s("l<S>"),T:s("au"),m:s("o"),g:s("V"),E:s("y<@>"),y:s("d<w>"),j:s("d<@>"),P:s("n"),K:s("e"),L:s("iJ"),l:s("u"),N:s("a1"),R:s("j"),c:s("K"),o:s("aI"),r:s("ah"),d:s("i<@>"),q:s("i<c>"),D:s("i<~>"),v:s("w"),i:s("q"),z:s("@"),w:s("@(e)"),Q:s("@(e,u)"),p:s("c"),A:s("0&*"),_:s("e*"),O:s("t<n>?"),x:s("d<c>?"),X:s("e?"),e:s("w?"),n:s("S"),H:s("~"),B:s("~(e)"),k:s("~(e,u)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.v=J.ba.prototype
B.e=J.l.prototype
B.a=J.at.prototype
B.w=J.av.prototype
B.x=J.ab.prototype
B.y=J.V.prototype
B.z=J.ax.prototype
B.l=J.bp.prototype
B.h=J.aI.prototype
B.m=new A.aa(A.ib(),A.dT("aa<@>"))
B.i=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.n=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.t=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.o=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.r=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.q=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.p=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.j=function(hooks) { return hooks; }

B.u=new A.cC()
B.c=new A.cJ()
B.b=new A.d0()
B.d=new A.bM()
B.k=A.a(s([1,0,3,2]),t.t)
B.c4=A.a(s([]),t.t)
B.ah=A.a(s([6,18]),t.t)
B.ai=A.a(s([6,22]),t.t)
B.al=A.a(s([6,26]),t.t)
B.ar=A.a(s([6,30]),t.t)
B.ax=A.a(s([6,34]),t.t)
B.aj=A.a(s([6,22,38]),t.t)
B.ak=A.a(s([6,24,42]),t.t)
B.am=A.a(s([6,26,46]),t.t)
B.aq=A.a(s([6,28,50]),t.t)
B.as=A.a(s([6,30,54]),t.t)
B.aw=A.a(s([6,32,58]),t.t)
B.ay=A.a(s([6,34,62]),t.t)
B.an=A.a(s([6,26,46,66]),t.t)
B.ao=A.a(s([6,26,48,70]),t.t)
B.ap=A.a(s([6,26,50,74]),t.t)
B.at=A.a(s([6,30,54,78]),t.t)
B.au=A.a(s([6,30,56,82]),t.t)
B.av=A.a(s([6,30,58,86]),t.t)
B.az=A.a(s([6,34,62,90]),t.t)
B.ag=A.a(s([6,28,50,72,94]),t.t)
B.bC=A.a(s([6,26,50,74,98]),t.t)
B.cf=A.a(s([6,30,54,78,102]),t.t)
B.bf=A.a(s([6,28,54,80,106]),t.t)
B.bP=A.a(s([6,32,58,84,110]),t.t)
B.b0=A.a(s([6,30,58,86,114]),t.t)
B.aP=A.a(s([6,34,62,90,118]),t.t)
B.cK=A.a(s([6,26,50,74,98,122]),t.t)
B.c3=A.a(s([6,30,54,78,102,126]),t.t)
B.cs=A.a(s([6,26,52,78,104,130]),t.t)
B.bH=A.a(s([6,30,56,82,108,134]),t.t)
B.cC=A.a(s([6,34,60,86,112,138]),t.t)
B.aE=A.a(s([6,30,58,86,114,142]),t.t)
B.cp=A.a(s([6,34,62,90,118,146]),t.t)
B.bF=A.a(s([6,30,54,78,102,126,150]),t.t)
B.bV=A.a(s([6,24,50,76,102,128,154]),t.t)
B.bm=A.a(s([6,28,54,80,106,132,158]),t.t)
B.bK=A.a(s([6,32,58,84,110,136,162]),t.t)
B.A=A.a(s([6,26,54,82,110,138,166]),t.t)
B.b1=A.a(s([6,30,58,86,114,142,170]),t.t)
B.bg=A.a(s([B.c4,B.ah,B.ai,B.al,B.ar,B.ax,B.aj,B.ak,B.am,B.aq,B.as,B.aw,B.ay,B.an,B.ao,B.ap,B.at,B.au,B.av,B.az,B.ag,B.bC,B.cf,B.bf,B.bP,B.b0,B.aP,B.cK,B.c3,B.cs,B.bH,B.cC,B.aE,B.cp,B.bF,B.bV,B.bm,B.bK,B.A,B.b1]),t.S)
B.M=A.a(s([1,26,19]),t.t)
B.L=A.a(s([1,26,16]),t.t)
B.K=A.a(s([1,26,13]),t.t)
B.N=A.a(s([1,26,9]),t.t)
B.R=A.a(s([1,44,34]),t.t)
B.Q=A.a(s([1,44,28]),t.t)
B.P=A.a(s([1,44,22]),t.t)
B.O=A.a(s([1,44,16]),t.t)
B.T=A.a(s([1,70,55]),t.t)
B.S=A.a(s([1,70,44]),t.t)
B.a_=A.a(s([2,35,17]),t.t)
B.Z=A.a(s([2,35,13]),t.t)
B.I=A.a(s([1,100,80]),t.t)
B.a1=A.a(s([2,50,32]),t.t)
B.a0=A.a(s([2,50,24]),t.t)
B.ab=A.a(s([4,25,9]),t.t)
B.J=A.a(s([1,134,108]),t.t)
B.a2=A.a(s([2,67,43]),t.t)
B.b3=A.a(s([2,33,15,2,34,16]),t.t)
B.aW=A.a(s([2,33,11,2,34,12]),t.t)
B.a3=A.a(s([2,86,68]),t.t)
B.ae=A.a(s([4,43,27]),t.t)
B.ad=A.a(s([4,43,19]),t.t)
B.ac=A.a(s([4,43,15]),t.t)
B.a4=A.a(s([2,98,78]),t.t)
B.af=A.a(s([4,49,31]),t.t)
B.bD=A.a(s([2,32,14,4,33,15]),t.t)
B.bn=A.a(s([4,39,13,1,40,14]),t.t)
B.X=A.a(s([2,121,97]),t.t)
B.bL=A.a(s([2,60,38,2,61,39]),t.t)
B.cg=A.a(s([4,40,18,2,41,19]),t.t)
B.co=A.a(s([4,40,14,2,41,15]),t.t)
B.Y=A.a(s([2,146,116]),t.t)
B.W=A.a(s([3,58,36,2,59,37]),t.t)
B.bu=A.a(s([4,36,16,4,37,17]),t.t)
B.ck=A.a(s([4,36,12,4,37,13]),t.t)
B.bR=A.a(s([2,86,68,2,87,69]),t.t)
B.aS=A.a(s([4,69,43,1,70,44]),t.t)
B.cE=A.a(s([6,43,19,2,44,20]),t.t)
B.bQ=A.a(s([6,43,15,2,44,16]),t.t)
B.a9=A.a(s([4,101,81]),t.t)
B.bU=A.a(s([1,80,50,4,81,51]),t.t)
B.b9=A.a(s([4,50,22,4,51,23]),t.t)
B.c_=A.a(s([3,36,12,8,37,13]),t.t)
B.ch=A.a(s([2,116,92,2,117,93]),t.t)
B.aJ=A.a(s([6,58,36,2,59,37]),t.t)
B.bj=A.a(s([4,46,20,6,47,21]),t.t)
B.aL=A.a(s([7,42,14,4,43,15]),t.t)
B.aa=A.a(s([4,133,107]),t.t)
B.cu=A.a(s([8,59,37,1,60,38]),t.t)
B.cz=A.a(s([8,44,20,4,45,21]),t.t)
B.cH=A.a(s([12,33,11,4,34,12]),t.t)
B.bq=A.a(s([3,145,115,1,146,116]),t.t)
B.aC=A.a(s([4,64,40,5,65,41]),t.t)
B.c7=A.a(s([11,36,16,5,37,17]),t.t)
B.bo=A.a(s([11,36,12,5,37,13]),t.t)
B.bA=A.a(s([5,109,87,1,110,88]),t.t)
B.bM=A.a(s([5,65,41,5,66,42]),t.t)
B.b8=A.a(s([5,54,24,7,55,25]),t.t)
B.D=A.a(s([11,36,12]),t.t)
B.aY=A.a(s([5,122,98,1,123,99]),t.t)
B.ca=A.a(s([7,73,45,3,74,46]),t.t)
B.bp=A.a(s([15,43,19,2,44,20]),t.t)
B.bb=A.a(s([3,45,15,13,46,16]),t.t)
B.by=A.a(s([1,135,107,5,136,108]),t.t)
B.B=A.a(s([10,74,46,1,75,47]),t.t)
B.bX=A.a(s([1,50,22,15,51,23]),t.t)
B.aR=A.a(s([2,42,14,17,43,15]),t.t)
B.bJ=A.a(s([5,150,120,1,151,121]),t.t)
B.bi=A.a(s([9,69,43,4,70,44]),t.t)
B.bv=A.a(s([17,50,22,1,51,23]),t.t)
B.cd=A.a(s([2,42,14,19,43,15]),t.t)
B.ba=A.a(s([3,141,113,4,142,114]),t.t)
B.cD=A.a(s([3,70,44,11,71,45]),t.t)
B.aI=A.a(s([17,47,21,4,48,22]),t.t)
B.a6=A.a(s([9,39,13,16,40,14]),t.t)
B.aQ=A.a(s([3,135,107,5,136,108]),t.t)
B.aZ=A.a(s([3,67,41,13,68,42]),t.t)
B.cq=A.a(s([15,54,24,5,55,25]),t.t)
B.cA=A.a(s([15,43,15,10,44,16]),t.t)
B.U=A.a(s([4,144,116,4,145,117]),t.t)
B.F=A.a(s([17,68,42]),t.t)
B.aF=A.a(s([17,50,22,6,51,23]),t.t)
B.bs=A.a(s([19,46,16,6,47,17]),t.t)
B.bl=A.a(s([2,139,111,7,140,112]),t.t)
B.G=A.a(s([17,74,46]),t.t)
B.aG=A.a(s([7,54,24,16,55,25]),t.t)
B.a5=A.a(s([34,37,13]),t.t)
B.bS=A.a(s([4,151,121,5,152,122]),t.t)
B.bZ=A.a(s([4,75,47,14,76,48]),t.t)
B.bh=A.a(s([11,54,24,14,55,25]),t.t)
B.C=A.a(s([16,45,15,14,46,16]),t.t)
B.cw=A.a(s([6,147,117,4,148,118]),t.t)
B.b7=A.a(s([6,73,45,14,74,46]),t.t)
B.V=A.a(s([11,54,24,16,55,25]),t.t)
B.bz=A.a(s([30,46,16,2,47,17]),t.t)
B.aX=A.a(s([8,132,106,4,133,107]),t.t)
B.a7=A.a(s([8,75,47,13,76,48]),t.t)
B.cl=A.a(s([7,54,24,22,55,25]),t.t)
B.aH=A.a(s([22,45,15,13,46,16]),t.t)
B.cx=A.a(s([10,142,114,2,143,115]),t.t)
B.bw=A.a(s([19,74,46,4,75,47]),t.t)
B.aO=A.a(s([28,50,22,6,51,23]),t.t)
B.bI=A.a(s([33,46,16,4,47,17]),t.t)
B.aM=A.a(s([8,152,122,4,153,123]),t.t)
B.bO=A.a(s([22,73,45,3,74,46]),t.t)
B.ci=A.a(s([8,53,23,26,54,24]),t.t)
B.b5=A.a(s([12,45,15,28,46,16]),t.t)
B.aK=A.a(s([3,147,117,10,148,118]),t.t)
B.cn=A.a(s([3,73,45,23,74,46]),t.t)
B.bt=A.a(s([4,54,24,31,55,25]),t.t)
B.cc=A.a(s([11,45,15,31,46,16]),t.t)
B.bG=A.a(s([7,146,116,7,147,117]),t.t)
B.cI=A.a(s([21,73,45,7,74,46]),t.t)
B.bx=A.a(s([1,53,23,37,54,24]),t.t)
B.br=A.a(s([19,45,15,26,46,16]),t.t)
B.cF=A.a(s([5,145,115,10,146,116]),t.t)
B.bd=A.a(s([19,75,47,10,76,48]),t.t)
B.cm=A.a(s([15,54,24,25,55,25]),t.t)
B.cj=A.a(s([23,45,15,25,46,16]),t.t)
B.cG=A.a(s([13,145,115,3,146,116]),t.t)
B.c8=A.a(s([2,74,46,29,75,47]),t.t)
B.aB=A.a(s([42,54,24,1,55,25]),t.t)
B.aU=A.a(s([23,45,15,28,46,16]),t.t)
B.E=A.a(s([17,145,115]),t.t)
B.ce=A.a(s([10,74,46,23,75,47]),t.t)
B.a8=A.a(s([10,54,24,35,55,25]),t.t)
B.bY=A.a(s([19,45,15,35,46,16]),t.t)
B.bB=A.a(s([17,145,115,1,146,116]),t.t)
B.cL=A.a(s([14,74,46,21,75,47]),t.t)
B.b_=A.a(s([29,54,24,19,55,25]),t.t)
B.c9=A.a(s([11,45,15,46,46,16]),t.t)
B.aT=A.a(s([13,145,115,6,146,116]),t.t)
B.cb=A.a(s([14,74,46,23,75,47]),t.t)
B.c1=A.a(s([44,54,24,7,55,25]),t.t)
B.c6=A.a(s([59,46,16,1,47,17]),t.t)
B.c0=A.a(s([12,151,121,7,152,122]),t.t)
B.b2=A.a(s([12,75,47,26,76,48]),t.t)
B.aD=A.a(s([39,54,24,14,55,25]),t.t)
B.c2=A.a(s([22,45,15,41,46,16]),t.t)
B.bc=A.a(s([6,151,121,14,152,122]),t.t)
B.H=A.a(s([6,75,47,34,76,48]),t.t)
B.c5=A.a(s([46,54,24,10,55,25]),t.t)
B.b6=A.a(s([2,45,15,64,46,16]),t.t)
B.cy=A.a(s([17,152,122,4,153,123]),t.t)
B.aA=A.a(s([29,74,46,14,75,47]),t.t)
B.bW=A.a(s([49,54,24,10,55,25]),t.t)
B.cr=A.a(s([24,45,15,46,46,16]),t.t)
B.bE=A.a(s([4,152,122,18,153,123]),t.t)
B.bN=A.a(s([13,74,46,32,75,47]),t.t)
B.b4=A.a(s([48,54,24,14,55,25]),t.t)
B.cJ=A.a(s([42,45,15,32,46,16]),t.t)
B.cB=A.a(s([20,147,117,4,148,118]),t.t)
B.ct=A.a(s([40,75,47,7,76,48]),t.t)
B.cv=A.a(s([43,54,24,22,55,25]),t.t)
B.bT=A.a(s([10,45,15,67,46,16]),t.t)
B.aN=A.a(s([19,148,118,6,149,119]),t.t)
B.bk=A.a(s([18,75,47,31,76,48]),t.t)
B.aV=A.a(s([34,54,24,34,55,25]),t.t)
B.be=A.a(s([20,45,15,61,46,16]),t.t)
B.f=A.a(s([B.M,B.L,B.K,B.N,B.R,B.Q,B.P,B.O,B.T,B.S,B.a_,B.Z,B.I,B.a1,B.a0,B.ab,B.J,B.a2,B.b3,B.aW,B.a3,B.ae,B.ad,B.ac,B.a4,B.af,B.bD,B.bn,B.X,B.bL,B.cg,B.co,B.Y,B.W,B.bu,B.ck,B.bR,B.aS,B.cE,B.bQ,B.a9,B.bU,B.b9,B.c_,B.ch,B.aJ,B.bj,B.aL,B.aa,B.cu,B.cz,B.cH,B.bq,B.aC,B.c7,B.bo,B.bA,B.bM,B.b8,B.D,B.aY,B.ca,B.bp,B.bb,B.by,B.B,B.bX,B.aR,B.bJ,B.bi,B.bv,B.cd,B.ba,B.cD,B.aI,B.a6,B.aQ,B.aZ,B.cq,B.cA,B.U,B.F,B.aF,B.bs,B.bl,B.G,B.aG,B.a5,B.bS,B.bZ,B.bh,B.C,B.cw,B.b7,B.V,B.bz,B.aX,B.a7,B.cl,B.aH,B.cx,B.bw,B.aO,B.bI,B.aM,B.bO,B.ci,B.b5,B.aK,B.cn,B.bt,B.cc,B.bG,B.cI,B.bx,B.br,B.cF,B.bd,B.cm,B.cj,B.cG,B.c8,B.aB,B.aU,B.E,B.ce,B.a8,B.bY,B.bB,B.cL,B.b_,B.c9,B.aT,B.cb,B.c1,B.c6,B.c0,B.b2,B.aD,B.c2,B.bc,B.H,B.c5,B.b6,B.cy,B.aA,B.bW,B.cr,B.bE,B.bN,B.b4,B.cJ,B.cB,B.ct,B.cv,B.bT,B.aN,B.bk,B.aV,B.be]),t.S)
B.cM=A.J("iD")
B.cN=A.J("iE")
B.cO=A.J("fs")
B.cP=A.J("ft")
B.cQ=A.J("fw")
B.cR=A.J("fx")
B.cS=A.J("fy")
B.cT=A.J("fS")
B.cU=A.J("fT")
B.cV=A.J("fU")
B.cW=A.J("fV")})();(function staticFields(){$.cZ=null
$.du=A.a([],A.dT("l<e>"))
$.e5=null
$.e4=null
$.eQ=null
$.eL=null
$.eY=null
$.dl=null
$.dq=null
$.dV=null
$.ak=null
$.aY=null
$.aZ=null
$.dN=!1
$.f=B.b})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"iF","dZ",()=>A.ij("_$dart_dartClosure"))
s($,"je","fa",()=>B.b.b8(new A.ds()))
s($,"iL","f_",()=>A.L(A.cB({
toString:function(){return"$receiver$"}})))
s($,"iM","f0",()=>A.L(A.cB({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"iN","f1",()=>A.L(A.cB(null)))
s($,"iO","f2",()=>A.L(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"iR","f5",()=>A.L(A.cB(void 0)))
s($,"iS","f6",()=>A.L(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"iQ","f4",()=>A.L(A.eg(null)))
s($,"iP","f3",()=>A.L(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"iU","f8",()=>A.L(A.eg(void 0)))
s($,"iT","f7",()=>A.L(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"iV","e_",()=>A.fW())
s($,"iH","b1",()=>$.fa())
s($,"jd","bT",()=>A.hu())
s($,"jc","bS",()=>A.ht())
s($,"jb","f9",()=>A.fN("^\\d+$"))})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bf,ArrayBufferView:A.aC,DataView:A.bg,Float32Array:A.bh,Float64Array:A.bi,Int16Array:A.bj,Int32Array:A.bk,Int8Array:A.bl,Uint16Array:A.bm,Uint32Array:A.bn,Uint8ClampedArray:A.aD,CanvasPixelArray:A.aD,Uint8Array:A.bo})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.ad.$nativeSuperclassTag="ArrayBufferView"
A.aM.$nativeSuperclassTag="ArrayBufferView"
A.aN.$nativeSuperclassTag="ArrayBufferView"
A.aA.$nativeSuperclassTag="ArrayBufferView"
A.aO.$nativeSuperclassTag="ArrayBufferView"
A.aP.$nativeSuperclassTag="ArrayBufferView"
A.aB.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$0=function(){return this()}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$1=function(a){return this(a)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.iv
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()