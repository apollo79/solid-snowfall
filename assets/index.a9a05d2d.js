var _t=Object.defineProperty;var St=(e,t,n)=>t in e?_t(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Y=(e,t,n)=>(St(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const I={};function xt(e){I.context=e}const At=(e,t)=>e===t,q=Symbol("solid-proxy"),ye=Symbol("solid-track"),me={equals:At};let st=at;const K=1,ve=2,rt={owned:null,cleanups:null,context:null,owner:null};var C=null;let ee=null,$=null,P=null,z=null,De=0;function ge(e,t){const n=$,i=C,s=e.length===0,r=s?rt:{owned:null,cleanups:null,context:null,owner:t||i},l=s?e:()=>e(()=>X(()=>Fe(r)));C=r,$=null;try{return te(l,!0)}finally{$=n,C=i}}function F(e,t){t=t?Object.assign({},me,t):me;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},i=s=>(typeof s=="function"&&(s=s(n.value)),ft(n,s));return[ct.bind(n),i]}function Ot(e,t,n){const i=Ae(e,t,!0,K);re(i)}function T(e,t,n){const i=Ae(e,t,!1,K);re(i)}function ie(e,t,n){st=Lt;const i=Ae(e,t,!1,K);i.user=!0,z?z.push(i):re(i)}function N(e,t,n){n=n?Object.assign({},me,n):me;const i=Ae(e,t,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=n.equals||void 0,re(i),ct.bind(i)}function Re(e){return te(e,!1)}function X(e){const t=$;$=null;try{return e()}finally{$=t}}function Ie(e,t,n){const i=Array.isArray(e);let s,r=n&&n.defer;return l=>{let o;if(i){o=Array(e.length);for(let f=0;f<e.length;f++)o[f]=e[f]()}else o=e();if(r){r=!1;return}const c=X(()=>t(o,s,l));return s=o,c}}function xe(e){ie(()=>X(e))}function se(e){return C===null||(C.cleanups===null?C.cleanups=[e]:C.cleanups.push(e)),e}function ot(){return $}function lt(){return C}function Ze(e,t){const n=C;C=e;try{return te(t,!0)}finally{C=n}}function ct(){const e=ee;if(this.sources&&(this.state||e))if(this.state===K||e)re(this);else{const t=P;P=null,te(()=>we(this),!1),P=t}if($){const t=this.observers?this.observers.length:0;$.sources?($.sources.push(this),$.sourceSlots.push(t)):($.sources=[this],$.sourceSlots=[t]),this.observers?(this.observers.push($),this.observerSlots.push($.sources.length-1)):(this.observers=[$],this.observerSlots=[$.sources.length-1])}return this.value}function ft(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&te(()=>{for(let s=0;s<e.observers.length;s+=1){const r=e.observers[s],l=ee&&ee.running;l&&ee.disposed.has(r),(l&&!r.tState||!l&&!r.state)&&(r.pure?P.push(r):z.push(r),r.observers&&ut(r)),l||(r.state=K)}if(P.length>1e6)throw P=[],new Error},!1)),t}function re(e){if(!e.fn)return;Fe(e);const t=C,n=$,i=De;$=C=e,Pt(e,e.value,i),$=n,C=t}function Pt(e,t,n){let i;try{i=e.fn(t)}catch(s){e.pure&&(e.state=K),dt(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ft(e,i):e.value=i,e.updatedAt=n)}function Ae(e,t,n,i=K,s){const r={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:C,context:null,pure:n};return C===null||C!==rt&&(C.owned?C.owned.push(r):C.owned=[r]),r}function be(e){const t=ee;if(e.state===0||t)return;if(e.state===ve||t)return we(e);if(e.suspense&&X(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<De);)(e.state||t)&&n.push(e);for(let i=n.length-1;i>=0;i--)if(e=n[i],e.state===K||t)re(e);else if(e.state===ve||t){const s=P;P=null,te(()=>we(e,n[0]),!1),P=s}}function te(e,t){if(P)return e();let n=!1;t||(P=[]),z?n=!0:z=[],De++;try{const i=e();return Et(n),i}catch(i){P||(z=null),dt(i)}}function Et(e){if(P&&(at(P),P=null),e)return;const t=z;z=null,t.length&&te(()=>st(t),!1)}function at(e){for(let t=0;t<e.length;t++)be(e[t])}function Lt(e){let t,n=0;for(t=0;t<e.length;t++){const i=e[t];i.user?e[n++]=i:be(i)}for(I.context&&xt(),t=0;t<n;t++)be(e[t])}function we(e,t){const n=ee;e.state=0;for(let i=0;i<e.sources.length;i+=1){const s=e.sources[i];s.sources&&(s.state===K||n?s!==t&&be(s):(s.state===ve||n)&&we(s,t))}}function ut(e){const t=ee;for(let n=0;n<e.observers.length;n+=1){const i=e.observers[n];(!i.state||t)&&(i.state=ve,i.pure?P.push(i):z.push(i),i.observers&&ut(i))}}function Fe(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const r=s.pop(),l=n.observerSlots.pop();i<s.length&&(r.sourceSlots[l]=i,s[i]=r,n.observerSlots[i]=l)}}if(e.owned){for(t=0;t<e.owned.length;t++)Fe(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Mt(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function dt(e){throw e=Mt(e),e}const Nt=Symbol("fallback");function Qe(e){for(let t=0;t<e.length;t++)e[t]()}function kt(e,t,n={}){let i=[],s=[],r=[],l=0,o=t.length>1?[]:null;return se(()=>Qe(r)),()=>{let c=e()||[],f,a;return c[ye],X(()=>{let u=c.length,_,d,w,D,H,E,A,j,R;if(u===0)l!==0&&(Qe(r),r=[],i=[],s=[],l=0,o&&(o=[])),n.fallback&&(i=[Nt],s[0]=ge(O=>(r[0]=O,n.fallback())),l=1);else if(l===0){for(s=new Array(u),a=0;a<u;a++)i[a]=c[a],s[a]=ge(v);l=u}else{for(w=new Array(u),D=new Array(u),o&&(H=new Array(u)),E=0,A=Math.min(l,u);E<A&&i[E]===c[E];E++);for(A=l-1,j=u-1;A>=E&&j>=E&&i[A]===c[j];A--,j--)w[j]=s[A],D[j]=r[A],o&&(H[j]=o[A]);for(_=new Map,d=new Array(j+1),a=j;a>=E;a--)R=c[a],f=_.get(R),d[a]=f===void 0?-1:f,_.set(R,a);for(f=E;f<=A;f++)R=i[f],a=_.get(R),a!==void 0&&a!==-1?(w[a]=s[f],D[a]=r[f],o&&(H[a]=o[f]),a=d[a],_.set(R,a)):r[f]();for(a=E;a<u;a++)a in w?(s[a]=w[a],r[a]=D[a],o&&(o[a]=H[a],o[a](a))):s[a]=ge(v);s=s.slice(0,l=u),i=c.slice(0)}return s});function v(u){if(r[a]=u,o){const[_,d]=F(a);return o[a]=d,t(c[a],_)}return t(c[a])}}}function m(e,t){return X(()=>e(t||{}))}function he(){return!0}const jt={get(e,t,n){return t===q?n:e.get(t)},has(e,t){return t===q?!0:e.has(t)},set:he,deleteProperty:he,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:he,deleteProperty:he}},ownKeys(e){return e.keys()}};function Tt(e,...t){const n=new Set(t.flat()),i=Object.getOwnPropertyDescriptors(e),s=q in e;s||t.push(Object.keys(i).filter(l=>!n.has(l)));const r=t.map(l=>{const o={};for(let c=0;c<l.length;c++){const f=l[c];!s&&!(f in e)||Object.defineProperty(o,f,i[f]?i[f]:{get(){return e[f]},set(){return!0},enumerable:!0})}return o});return s&&r.push(new Proxy({get(l){return n.has(l)?void 0:e[l]},has(l){return n.has(l)?!1:l in e},keys(){return Object.keys(e).filter(l=>!n.has(l))}},jt)),r}let Dt=0;function Rt(){const e=I.context;return e?`${e.id}${e.count++}`:`cl-${Dt++}`}function ht(e){const t="fallback"in e&&{fallback:()=>e.fallback};return N(kt(()=>e.each,e.children,t||void 0))}function Ee(e){let t=!1;const n=e.keyed,i=N(()=>e.when,void 0,{equals:(s,r)=>t?s===r:!s==!r});return N(()=>{const s=i();if(s){const r=e.children,l=typeof r=="function"&&r.length>0;return t=n||l,l?X(()=>r(s)):r}return e.fallback},void 0,void 0)}function It(e,t,n){let i=n.length,s=t.length,r=i,l=0,o=0,c=t[s-1].nextSibling,f=null;for(;l<s||o<r;){if(t[l]===n[o]){l++,o++;continue}for(;t[s-1]===n[r-1];)s--,r--;if(s===l){const a=r<i?o?n[o-1].nextSibling:n[r-o]:c;for(;o<r;)e.insertBefore(n[o++],a)}else if(r===o)for(;l<s;)(!f||!f.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[r-1]&&n[o]===t[s-1]){const a=t[--s].nextSibling;e.insertBefore(n[o++],t[l++].nextSibling),e.insertBefore(n[--r],a),t[s]=n[r]}else{if(!f){f=new Map;let v=o;for(;v<r;)f.set(n[v],v++)}const a=f.get(t[l]);if(a!=null)if(o<a&&a<r){let v=l,u=1,_;for(;++v<s&&v<r&&!((_=f.get(t[v]))==null||_!==a+u);)u++;if(u>a-o){const d=t[l];for(;o<a;)e.insertBefore(n[o++],d)}else e.replaceChild(n[o++],t[l++])}else l++;else t[l++].remove()}}}const Ye="_$DX_DELEGATE";function Ft(e,t,n,i={}){let s;return ge(r=>{s=r,t===document?e():p(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{s(),t.textContent=""}}function k(e,t,n){const i=document.createElement("template");i.innerHTML=e;let s=i.content.firstChild;return n&&(s=s.firstChild),s}function qt(e,t=window.document){const n=t[Ye]||(t[Ye]=new Set);for(let i=0,s=e.length;i<s;i++){const r=e[i];n.has(r)||(n.add(r),t.addEventListener(r,Ut))}}function x(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Bt(e,t,n){if(!t)return n?x(e,"style"):t;const i=e.style;if(typeof t=="string")return i.cssText=t;typeof n=="string"&&(i.cssText=n=void 0),n||(n={}),t||(t={});let s,r;for(r in n)t[r]==null&&i.removeProperty(r),delete n[r];for(r in t)s=t[r],s!==n[r]&&(i.setProperty(r,s),n[r]=s);return n}function Le(e,t,n){return X(()=>e(t,n))}function p(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return $e(e,t,i,n);T(s=>$e(e,t(),s,n),i)}function Ut(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),I.registry&&!I.done&&(I.done=!0,document.querySelectorAll("[id^=pl-]").forEach(i=>i.remove()));n;){const i=n[t];if(i&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?i.call(n,s,e):i.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function $e(e,t,n,i,s){for(I.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const r=typeof t,l=i!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,r==="string"||r==="number"){if(I.context)return n;if(r==="number"&&(t=t.toString()),l){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=ne(e,n,i,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||r==="boolean"){if(I.context)return n;n=ne(e,n,i)}else{if(r==="function")return T(()=>{let o=t();for(;typeof o=="function";)o=o();n=$e(e,o,n,i)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(Me(o,t,n,s))return T(()=>n=$e(e,o,n,i,!0)),()=>n;if(I.context){if(!o.length)return n;for(let f=0;f<o.length;f++)if(o[f].parentNode)return n=o}if(o.length===0){if(n=ne(e,n,i),l)return n}else c?n.length===0?Je(e,o,i):It(e,n,o):(n&&ne(e),Je(e,o));n=o}else if(t instanceof Node){if(I.context&&t.parentNode)return n=l?[t]:t;if(Array.isArray(n)){if(l)return n=ne(e,n,i,t);ne(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Me(e,t,n,i){let s=!1;for(let r=0,l=t.length;r<l;r++){let o=t[r],c=n&&n[r];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))s=Me(e,o,c)||s;else if(typeof o=="function")if(i){for(;typeof o=="function";)o=o();s=Me(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||s}else e.push(o),s=!0;else{const f=String(o);c&&c.nodeType===3&&c.data===f?e.push(c):e.push(document.createTextNode(f))}}return s}function Je(e,t,n=null){for(let i=0,s=t.length;i<s;i++)e.insertBefore(t[i],n)}function ne(e,t,n,i){if(n===void 0)return e.textContent="";const s=i||document.createTextNode("");if(t.length){let r=!1;for(let l=t.length-1;l>=0;l--){const o=t[l];if(s!==o){const c=o.parentNode===e;!r&&!l?c?e.replaceChild(s,o):e.insertBefore(s,n):c&&o.remove()}else r=!0}}else e.insertBefore(s,n);return[s]}function Wt(e){return e!==null&&(typeof e=="object"||typeof e=="function")}var Ne=e=>typeof e=="function"&&!e.length?e():e,et=e=>Array.isArray(e)?e:[e];function tt(e,...t){return typeof e=="function"?e(...t):e}var Ht=Object.entries,Vt=Object.keys,zt=e=>lt()?se(e):e;function gt(e){const t={...e},n={},i=new Map,s=o=>{const c=i.get(o);if(c)return c[0]();const f=F(t[o],{name:typeof o=="string"?o:void 0});return i.set(o,f),delete t[o],f[0]()},r=(o,c)=>{const f=i.get(o);if(f)return f[1](c);o in t&&(t[o]=tt(c,[t[o]]))};for(const o of Vt(e))n[o]=void 0,Object.defineProperty(n,o,{get:s.bind(void 0,o)});return[n,(o,c)=>(Wt(o)?X(()=>{Re(()=>{for(const[f,a]of Ht(tt(o,n)))r(f,()=>a)})}):r(o,c),n)]}function Kt(e,t,n,i){const s=e.length,r=t.length;let l=0;if(!r){for(;l<s;l++)n(e[l]);return}if(!s){for(;l<r;l++)i(t[l]);return}for(;l<r&&t[l]===e[l];l++);let o,c;t=t.slice(l),e=e.slice(l);for(o of t)e.includes(o)||i(o);for(c of e)t.includes(c)||n(c)}var nt=e=>typeof e=="object"&&e!==null;function Xt(e,t){return new Proxy({},{get:(n,i)=>{if(i===Symbol.iterator||i==="length")return Reflect.get(e,i);const s=Reflect.get(n,i);if(s)return s;const r=t(i);return Reflect.set(n,i,r),r},set:()=>!1})}function fe(e,t){var o;const n=t!=null?t:{},i=(o=n.memo)!=null?o:typeof e=="function",s=typeof e=="function"?c=>()=>e()[c]:c=>()=>e[c],r=Ne(e);if(n.lazy){const c=lt();return Xt(r,f=>{const a=s(f);return n.deep&&nt(r[f])?Ze(c,()=>fe(a,{...n,memo:i})):i?Ze(c,()=>N(a,void 0,t)):a})}const l=Array.isArray(r)?[]:{};for(const[c,f]of Object.entries(r)){const a=s(c);n.deep&&nt(f)?l[c]=fe(a,{...n,memo:i}):l[c]=i?N(a,void 0,t):a}return l}var Gt=function e(t,n){if(t===n)return!0;if(t&&n&&typeof t=="object"&&typeof n=="object"){if(t.constructor!==n.constructor)return!1;var i,s,r;if(Array.isArray(t)){if(i=t.length,i!=n.length)return!1;for(s=i;s--!==0;)if(!e(t[s],n[s]))return!1;return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===n.toString();if(r=Object.keys(t),i=r.length,i!==Object.keys(n).length)return!1;for(s=i;s--!==0;)if(!Object.prototype.hasOwnProperty.call(n,r[s]))return!1;for(s=i;s--!==0;){var l=r[s];if(!e(t[l],n[l]))return!1}return!0}return t!==t&&n!==n};const ke=Gt,Zt={"pointer-events":"none","background-color":"transparent",position:"absolute",top:0,left:0,width:"100%",height:"100%"},Qt=1e3/60;function M(e,t){const n=Math.random()*(t-e+1)+e;return!Number.isInteger(e)||!Number.isInteger(t)?n:Math.floor(n)}function Oe(e,t,n){return(1-n)*e+n*t}function Yt(e){const t=Math.floor(Math.random()*e.length);return e[t]}const J={color:"#dee4fd",radius:[.5,3],speed:[1,3],wind:[-.5,2],changeFrequency:200,rotationSpeed:[-1,1]},Se=class{constructor(t,n={}){Y(this,"config");Y(this,"params");Y(this,"framesSinceLastUpdate");Y(this,"image");Y(this,"foo");this.updateConfig(n);const{radius:i,wind:s,speed:r,rotationSpeed:l}=this.config;this.params={x:M(0,t.offsetWidth),y:M(-t.offsetHeight,0),rotation:M(0,360),radius:M(...i),speed:M(...r),wind:M(...s),rotationSpeed:M(...l),nextSpeed:M(...s),nextWind:M(...r),nextRotationSpeed:M(...l)},this.framesSinceLastUpdate=0}selectImage(){this.config.images&&this.config.images.length>0?this.image=Yt(this.config.images):this.image=void 0}updateConfig(t){const n=this.config;this.config={...J,...t},this.config.changeFrequency=M(this.config.changeFrequency,this.config.changeFrequency*1.5),this.params&&!ke(this.config.radius,n==null?void 0:n.radius)&&(this.params.radius=M(...this.config.radius)),ke(this.config.images,n==null?void 0:n.images)||this.selectImage()}updateTargetParams(){this.params.nextSpeed=M(...this.config.speed),this.params.nextWind=M(...this.config.wind),this.image&&(this.params.nextRotationSpeed=M(...this.config.rotationSpeed))}update(t,n=1){const{x:i,y:s,rotation:r,rotationSpeed:l,nextRotationSpeed:o,wind:c,speed:f,nextWind:a,nextSpeed:v,radius:u}=this.params;this.params.x=(i+c*n)%(t.offsetWidth+u*2),this.params.x>t.offsetWidth+u&&(this.params.x=-u),this.params.y=(s+f*n)%(t.offsetHeight+u*2),this.params.y>t.offsetHeight+u&&(this.params.y=-u),this.image&&(this.params.rotation=(r+l)%360),this.params.speed=Oe(f,v,.01),this.params.wind=Oe(c,a,.01),this.params.rotationSpeed=Oe(l,o,.01),this.framesSinceLastUpdate++>this.config.changeFrequency&&(this.updateTargetParams(),this.framesSinceLastUpdate=0)}getImageOffscreenCanvas(t,n){var s,r;if(t instanceof HTMLImageElement&&t.loading)return t;let i=Se.offscreenCanvases.get(t);if(i||(i={},Se.offscreenCanvases.set(t,i)),!(n in i)){const l=document.createElement("canvas");l.width=n,l.height=n,(s=l.getContext("2d"))==null||s.drawImage(t,0,0,n,n),i[n]=l}return(r=i[n])!=null?r:t}draw(t){if(this.image){t.setTransform(1,0,0,1,this.params.x,this.params.y);const n=Math.ceil(this.params.radius);t.rotate(this.params.rotation*Math.PI/180),t.drawImage(this.getImageOffscreenCanvas(this.image,n),-Math.ceil(n/2),-Math.ceil(n/2),n,n)}else t.beginPath(),t.arc(this.params.x,this.params.y,this.params.radius,0,2*Math.PI),t.fillStyle=this.config.color,t.closePath(),t.fill()}};let pe=Se;Y(pe,"offscreenCanvases",new WeakMap);const Jt=(e,t,n)=>{if(!e)return[];const i=[];for(let s=0;s<t;s++)i.push(new pe(e,n));return i},en=(e,t,n)=>{const[i,s]=F([]);return ie(Ie(t,()=>{s(r=>{const l=t()-r.length;return l>0?[...r,...Jt(e(),l,n())]:l<0?r.slice(0,t()):r})})),ie(()=>{s(r=>r.map(l=>(l.updateConfig(n()),l)))}),i},tn=e=>N(()=>({...Zt,...(e==null?void 0:e())||{}}));function nn(e){return N(()=>e(),void 0,{equals:(n,i)=>ke(n,i)})}function sn(e,t,n,i){return e.addEventListener(t,n,i),zt(e.removeEventListener.bind(e,t,n,i))}function rn(e,t){const n=new ResizeObserver(e);return se(n.disconnect.bind(n)),{observe:i=>n.observe(i,t),unobserve:n.unobserve.bind(n)}}function pt(e,t,n){const i=new WeakMap,{observe:s,unobserve:r}=rn(l,n);function l(c){for(const f of c){const{contentRect:a,target:v}=f,u=Math.round(a.width),_=Math.round(a.height),d=i.get(v);(!d||d.width!==u||d.height!==_)&&(t(a,f.target,f),i.set(v,{width:u,height:_}))}}let o;if(typeof e=="function")o=()=>et(e()).slice();else if(Array.isArray(e)&&q in e)o=()=>(e[ye],e.slice());else{et(e).forEach(s);return}ie(Ie(o,(c,f=[])=>Kt(c,f,s,r)))}function it(e){if(!e)return{width:null,height:null};const{width:t,height:n}=e.getBoundingClientRect();return{width:t,height:n}}function on(e){const[t,n]=gt(typeof e!="function"?it(e):(()=>(xe(()=>n(it(e()))),{width:null,height:null}))());return pt(typeof e=="function"?()=>e()||[]:e,s=>n({width:s.width,height:s.height})),t}const ln=k('<canvas data-testid="SnowfallCanvas"></canvas>'),cn=e=>{const[t]=Tt(e,["color","changeFrequency","radius","speed","wind","rotationSpeed","snowflakeCount","images","style"]),{color:n=()=>J.color,changeFrequency:i=()=>J.changeFrequency,radius:s=()=>J.radius,speed:r=()=>J.speed,wind:l=()=>J.wind,rotationSpeed:o=()=>J.rotationSpeed,snowflakeCount:c=()=>150,images:f,style:a}=fe(t),v=tn(a),[u,_]=F(null),d=N(()=>{var O;return(O=u())==null?void 0:O.getContext("2d")}),w=on(u);let D=0,H=Date.now();const E=nn(()=>({color:n(),changeFrequency:i(),radius:s(),speed:r(),wind:l(),rotationSpeed:o(),images:f==null?void 0:f()})),A=en(u,c,E),j=(O=1)=>{u()&&(A().forEach(L=>{L.update(u(),O)}),d()&&(d().setTransform(1,0,0,1,0,0),d().clearRect(0,0,u().offsetWidth,u().offsetHeight),A().forEach(L=>L.draw(d()))))},R=()=>{const O=Date.now(),L=Date.now()-H;H=O;const Q=L/Qt;j(Q),D=requestAnimationFrame(R)};return xe(()=>{R()}),se(()=>cancelAnimationFrame(D)),(()=>{const O=ln.cloneNode(!0);return Le(_,O),T(L=>{const Q=w.height,oe=w.width,g=v();return Q!==L._v$&&x(O,"height",L._v$=Q),oe!==L._v$2&&x(O,"width",L._v$2=oe),L._v$3=Bt(O,g,L._v$3),L},{_v$:void 0,_v$2:void 0,_v$3:void 0}),O})()},fn=cn;const an=k('<a class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path fill="currentColor" class="octo-arm"></path><path fill="currentColor"></path></svg></a>');function un(e){return(()=>{const t=an.cloneNode(!0),n=t.firstChild,i=n.firstChild,s=i.nextSibling,r=s.nextSibling;return s.style.setProperty("transform-origin","130px 106px"),T(l=>{const o=e.url,c=["M128.3,109.0","C113.8,99.7","119.0,89.6","119.0,89.6","C122.0,82.7","120.5,78.6","120.5,78.6","C119.2,72.0","123.4,76.3","123.4,76.3","C127.3,80.9","125.5,87.3","125.5,87.3","C122.9,97.6","130.6,101.9","134.4,103.2"].join(" "),f=["M115.0,115.0","C114.9,115.1","118.7,116.5","119.8,115.4","L133.7,101.6","C136.9,99.2","139.9,98.4","142.2,98.6","C133.8,88.0","127.5,74.4","143.8,58.0","C148.5,53.4","154.0,51.2","159.7,51.0","C160.3,49.4","163.2,43.6","171.4,40.1","C171.4,40.1","176.1,42.5","178.8,56.2","C183.1,58.6","187.2,61.8","190.9,65.4","C194.5,69.0","197.7,73.2","200.1,77.6","C213.8,80.2","216.3,84.9","216.3,84.9","C212.7,93.1","206.9,96.0","205.4,96.6","C205.1,102.4","203.0,107.8","198.3,112.5","C181.9,128.9","168.3,122.5","157.7,114.1","C157.9,116.9","156.7,120.9","152.7,124.9","L141.0,136.5","C139.8,137.7","141.6,141.9","141.8,141.8","Z"].join(" ");return o!==l._v$&&x(t,"href",l._v$=o),c!==l._v$2&&x(s,"d",l._v$2=c),f!==l._v$3&&x(r,"d",l._v$3=f),l},{_v$:void 0,_v$2:void 0,_v$3:void 0}),t})()}const je=Symbol("store-raw"),ae=Symbol("store-node"),dn=Symbol("store-name");function yt(e,t){let n=e[q];if(!n&&(Object.defineProperty(e,q,{value:n=new Proxy(e,pn)}),!Array.isArray(e))){const i=Object.keys(e),s=Object.getOwnPropertyDescriptors(e);for(let r=0,l=i.length;r<l;r++){const o=i[r];if(s[o].get){const c=s[o].get.bind(n);Object.defineProperty(e,o,{enumerable:s[o].enumerable,get:c})}}}return n}function Ce(e){let t;return e!=null&&typeof e=="object"&&(e[q]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function ue(e,t=new Set){let n,i,s,r;if(n=e!=null&&e[je])return n;if(!Ce(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let l=0,o=e.length;l<o;l++)s=e[l],(i=ue(s,t))!==s&&(e[l]=i)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const l=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let c=0,f=l.length;c<f;c++)r=l[c],!o[r].get&&(s=e[r],(i=ue(s,t))!==s&&(e[r]=i))}return e}function qe(e){let t=e[ae];return t||Object.defineProperty(e,ae,{value:t={}}),t}function Te(e,t,n){return e[t]||(e[t]=vt(n))}function hn(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===q||t===ae||t===dn||(delete n.value,delete n.writable,n.get=()=>e[q][t]),n}function mt(e){if(ot()){const t=qe(e);(t._||(t._=vt()))()}}function gn(e){return mt(e),Reflect.ownKeys(e)}function vt(e){const[t,n]=F(e,{equals:!1,internal:!0});return t.$=n,t}const pn={get(e,t,n){if(t===je)return e;if(t===q)return n;if(t===ye)return mt(e),n;const i=qe(e),s=i.hasOwnProperty(t);let r=s?i[t]():e[t];if(t===ae||t==="__proto__")return r;if(!s){const l=Object.getOwnPropertyDescriptor(e,t);ot()&&(typeof r!="function"||e.hasOwnProperty(t))&&!(l&&l.get)&&(r=Te(i,t,r)())}return Ce(r)?yt(r):r},has(e,t){return t===je||t===q||t===ye||t===ae||t==="__proto__"?!0:(this.get(e,t,e),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:gn,getOwnPropertyDescriptor:hn};function _e(e,t,n,i=!1){if(!i&&e[t]===n)return;const s=e[t],r=e.length;n===void 0?delete e[t]:e[t]=n;let l=qe(e),o;(o=Te(l,t,s))&&o.$(()=>n),Array.isArray(e)&&e.length!==r&&(o=Te(l,"length",r))&&o.$(e.length),(o=l._)&&o.$()}function bt(e,t){const n=Object.keys(t);for(let i=0;i<n.length;i+=1){const s=n[i];_e(e,s,t[s])}}function yn(e,t){if(typeof t=="function"&&(t=t(e)),t=ue(t),Array.isArray(t)){if(e===t)return;let n=0,i=t.length;for(;n<i;n++){const s=t[n];e[n]!==s&&_e(e,n,s)}_e(e,"length",i)}else bt(e,t)}function ce(e,t,n=[]){let i,s=e;if(t.length>1){i=t.shift();const l=typeof i,o=Array.isArray(e);if(Array.isArray(i)){for(let c=0;c<i.length;c++)ce(e,[i[c]].concat(t),n);return}else if(o&&l==="function"){for(let c=0;c<e.length;c++)i(e[c],c)&&ce(e,[c].concat(t),n);return}else if(o&&l==="object"){const{from:c=0,to:f=e.length-1,by:a=1}=i;for(let v=c;v<=f;v+=a)ce(e,[v].concat(t),n);return}else if(t.length>1){ce(e[i],t,[i].concat(n));return}s=e[i],n=[i].concat(n)}let r=t[0];typeof r=="function"&&(r=r(s,n),r===s)||i===void 0&&r==null||(r=ue(r),i===void 0||Ce(s)&&Ce(r)&&!Array.isArray(r)?bt(s,r):_e(e,i,r))}function wt(...[e,t]){const n=ue(e||{}),i=Array.isArray(n),s=yt(n);function r(...l){Re(()=>{i&&l.length===1?yn(n,l[0]):ce(n,l)})}return[s,r]}const[h,Z]=wt({color:"#dee4fd",snowflakeCount:200,radius:[.5,3],speed:[0,3],wind:[-.5,2],rotationSpeed:[-.5,1],useImages:!1});function mn(e){Z(e?{useImages:e,radius:[5,20]}:{useImages:e,radius:[.5,3]})}const vn=k('<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>'),bn=k('<span class="checkbox-wrap"><input type="checkbox"></span>'),wn=k('<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></svg>');function $n(e){const[t,n]=F(!1);ie(()=>{var r;n((r=e.checked)!=null?r:!1)});const i=()=>{var r;(r=e.onChange)==null||r.call(e,t())},s=r=>{n(r.currentTarget.checked),i()};return(()=>{const r=bn.cloneNode(!0),l=r.firstChild;return l.addEventListener("change",s),p(r,m(Ee,{get when(){return t()},get fallback(){return wn.cloneNode(!0)},get children(){return vn.cloneNode(!0)}}),null),T(()=>r.classList.toggle("checked",!!t())),T(()=>l.checked=t()),r})()}const Cn=k('<div class="color-picker-wrap"></div>'),_n=k('<span class="color-picker-item"><input type="radio"><span class="color-picker-indicator"></span></span>');function Sn(e){const t=`color-picker-${Rt()}`,n=()=>{var o;return(o=e.color)!=null?o:e.colors[0]},[i,s]=F(n()),r=()=>{var o;(o=e.onChange)==null||o.call(e,i())},l=o=>{const{currentTarget:c}=o;s(c.value),console.log(i()),r()};return(()=>{const o=Cn.cloneNode(!0);return p(o,m(ht,{get each(){return e.colors},children:c=>(()=>{const f=_n.cloneNode(!0),a=f.firstChild;return x(f,"data-color",c),f.style.setProperty("color",c),a.addEventListener("change",l),x(a,"name",t),a.value=c,x(a,"aria-labelledby",c),T(()=>f.classList.toggle("checked",c==i())),T(()=>a.checked=c==i()),f})()})),o})()}var xn={top:null,left:null,bottom:null,right:null,width:null,height:null};function Pe(e){if(!e)return Object.assign({},xn);const t=e.getBoundingClientRect();return{top:t.top,left:t.left,bottom:t.bottom,right:t.right,width:t.width,height:t.height}}function An(e,{trackMutation:t=!0,trackResize:n=!0,trackScroll:i=!0}={}){const[s,r]=gt(Pe(Ne(e))),l=()=>r(Pe(Ne(e))),o=c=>r(Pe(c));if(typeof e=="function"&&(xe(()=>o(e())),Ot(Ie(e,o,{defer:!0}))),n){const c=(f,a)=>o(a);pt(typeof e=="function"?()=>e()||[]:e,typeof n=="function"?n(c):c)}if(i){const c=typeof e=="function"?f=>{const a=e();a&&f.target instanceof Node&&f.target.contains(a)&&o(a)}:f=>{f.target instanceof Node&&f.target.contains(e)&&o(e)};sn(window,"scroll",typeof i=="function"?i(c):c,{capture:!0})}if(t){const c=new MutationObserver(typeof t=="function"?t(l):l);c.observe(document.body,{attributeFilter:["style","class"],subtree:!0,childList:!0}),se(c.disconnect.bind(c))}return s}function On(e,t){t||(t=1);const n=1/t;return Math.round(e*n)/n}function Pn(e,t){const n=t.map(s=>Math.abs(s-e)),i=Math.min(...n);return t[n.indexOf(i)]}const En=k('<span class="slider-wrap"><span class="slider-rail"></span><span class="slider-track"></span></span>'),Ln=k('<span class="slider-thumb"><input aria-label="Default" aria-orientation="horizontal" type="range"></span>');function le(e){const{max:t,min:n,step:i}=fe(e),s=N(()=>t()-n()),r=N(()=>e.value?Array.isArray(e.value)?e.value.length==0?[n]:e.value:[e.value]:[n]),[l,o]=wt([]),c=N(()=>l.map(g=>g.value)),f=N(()=>c().length==1?0:Math.min(...c())),a=N(()=>Math.max(...c())),v=N(()=>l.findIndex(g=>g.active));ie(()=>{for(let g=0;g<r().length;g++)o(g,{value:r()[g],inputRef:F()})});const[u,_]=F(),d=An(u),[w,D]=F(!1),[H,E]=F(!1),A=()=>{var g;(g=e.onChange)==null||g.call(e,c().length==1?c()[0]:c())},j=(g,V)=>g/V*s()+n(),R=g=>{var G;const V=g-(d.left||0),b=j(V,(G=d.width)!=null?G:0);let B=b;b<n()&&(B=n()),b>t()&&(B=t());const U=On(B,i==null?void 0:i());let S=v();if(S==-1){const y=Pn(B,c());S=l.findIndex(de=>de.value==y)}return o(S,"value",U),A(),S},O=g=>{Re(()=>{const V=R(g.pageX);o(V,"active",!0)}),D(!0)},L=g=>{const{currentTarget:V}=g;o(Number(V.dataset.index),"value",Number(V.value)),A()},Q=g=>{w()&&(E(!0),R(g.pageX))},oe=()=>{o({},"active",!1),D(!1),E(!1)};return xe(()=>{window.addEventListener("pointerup",oe),window.addEventListener("pointermove",Q)}),se(()=>{window.removeEventListener("pointerup",oe),window.addEventListener("pointermove",Q)}),(()=>{const g=En.cloneNode(!0);return g.firstChild.nextSibling,g.$$pointerdown=O,Le(_,g),p(g,m(ht,{each:l,children:(b,B)=>(()=>{const U=Ln.cloneNode(!0),S=U.firstChild;S.$$input=L;const G=b.inputRef[1];return typeof G=="function"?Le(G,S):b.inputRef[1]=S,T(y=>{const de=B(),Be=!!b.active,Ue=b.value,We=B(),He=b.value,Ve=t(),ze=n(),Ke=n(),Xe=t(),Ge=i==null?void 0:i();return de!==y._v$6&&x(U,"data-index",y._v$6=de),Be!==y._v$7&&U.classList.toggle("active",y._v$7=Be),Ue!==y._v$8&&U.style.setProperty("--value",y._v$8=Ue),We!==y._v$9&&x(S,"data-index",y._v$9=We),He!==y._v$10&&x(S,"aria-valuenow",y._v$10=He),Ve!==y._v$11&&x(S,"aria-valuemax",y._v$11=Ve),ze!==y._v$12&&x(S,"aria-valuemin",y._v$12=ze),Ke!==y._v$13&&x(S,"min",y._v$13=Ke),Xe!==y._v$14&&x(S,"max",y._v$14=Xe),Ge!==y._v$15&&x(S,"step",y._v$15=Ge),y},{_v$6:void 0,_v$7:void 0,_v$8:void 0,_v$9:void 0,_v$10:void 0,_v$11:void 0,_v$12:void 0,_v$13:void 0,_v$14:void 0,_v$15:void 0}),T(()=>S.value=b.value),U})()}),null),T(b=>{const B=!!H(),U=n(),S=t(),G=f(),y=a();return B!==b._v$&&g.classList.toggle("dragging",b._v$=B),U!==b._v$2&&g.style.setProperty("--min",b._v$2=U),S!==b._v$3&&g.style.setProperty("--max",b._v$3=S),G!==b._v$4&&g.style.setProperty("--smallest",b._v$4=G),y!==b._v$5&&g.style.setProperty("--biggest",b._v$5=y),b},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),g})()}qt(["pointerdown","input"]);const Mn=k('<span class="value-chip"><span></span></span>');function W(e){return(()=>{const t=Mn.cloneNode(!0),n=t.firstChild;return p(n,()=>e.label),t})()}const Nn=k("<div><label>Rotation Speed </label></div>"),kn=k("<label>Color </label>"),jn=k('<div class="settings-container"><div><label>Snowflake Count </label></div><div><label>Speed </label></div><div><label>Wind <!> </label></div><div><label>Radius </label></div><div><label>Use Images</label></div></div>'),Tn=["#dee4fd","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#8bc34a","#cddc39","#ffeb3b","#ffc107","#ff9800","#ff5722","#795548","#607d8b"],Dn=()=>(()=>{const e=jn.cloneNode(!0),t=e.firstChild,n=t.firstChild;n.firstChild;const i=t.nextSibling,s=i.firstChild;s.firstChild;const r=i.nextSibling,l=r.firstChild,o=l.firstChild,c=o.nextSibling;c.nextSibling;const f=r.nextSibling,a=f.firstChild;a.firstChild;const v=f.nextSibling,u=v.firstChild,_=u.firstChild;return p(n,m(W,{get label(){var d;return(d=h.snowflakeCount)!=null?d:""}}),null),p(n,m(le,{get value(){return h.snowflakeCount},min:0,max:750,step:1,onChange:d=>Z("snowflakeCount",d)}),null),p(s,m(W,{get label(){return`Min ${Math.min(...(h==null?void 0:h.speed)||[])}`}}),null),p(s,m(W,{get label(){return`Max ${Math.max(...(h==null?void 0:h.speed)||[])}`}}),null),p(s,m(le,{get value(){return h.speed},min:0,max:10,step:.5,onChange:d=>Z("speed",d)}),null),p(l,m(W,{get label(){return`Min ${Math.min(...(h==null?void 0:h.wind)||[])}`}}),c),p(l,m(W,{get label(){return`Max ${Math.max(...(h==null?void 0:h.wind)||[])}`}}),null),p(l,m(le,{get value(){return h.wind},min:-1,max:10,step:.5,onChange:d=>Z("wind",d)}),null),p(a,m(W,{get label(){return`Min ${Math.min(...(h==null?void 0:h.radius)||[])}`}}),null),p(a,m(W,{get label(){return`Max ${Math.max(...(h==null?void 0:h.radius)||[])}`}}),null),p(a,m(le,{get value(){return h.radius},min:.5,max:30,step:.5,onChange:d=>Z("radius",d)}),null),u.style.setProperty("margin-left","-9px"),p(u,m($n,{onChange:d=>mn(d)}),_),p(e,m(Ee,{get when(){return h.useImages},get children(){const d=Nn.cloneNode(!0),w=d.firstChild;return w.firstChild,p(w,m(W,{get label(){return`Min ${Math.min(...(h==null?void 0:h.rotationSpeed)||[])}`}}),null),p(w,m(W,{get label(){return`Max ${Math.max(...(h==null?void 0:h.rotationSpeed)||[])}`}}),null),p(w,m(le,{get value(){return h.rotationSpeed},min:-5,max:10,step:.5,onChange:D=>Z("rotationSpeed",D)}),null),d}}),null),p(e,m(Ee,{get when(){return!h.useImages},get children(){const d=kn.cloneNode(!0);return d.firstChild,p(d,m(W,{get label(){var w;return(w=h.color)!=null?w:""}}),null),p(d,m(Sn,{colors:Tn,get color(){return h.color},onChange:w=>Z("color",w)}),null),d}}),null),e})(),$t="/solid-snowfall/assets/logo.9b615f55.png";const Rn=k('<div class="app"><a class="title" href="https://github.com/apollo79/solid-snowfall"><img alt="Snowflake Logo"><h1>solid-snowfall</h1></a></div>'),In="https://github.com/apollo79/solid-snowfall",Ct=document.createElement("img");Ct.src=$t;const Fn=[Ct];function qn(){const{color:e,snowflakeCount:t,radius:n,speed:i,wind:s,useImages:r,rotationSpeed:l}=fe(h);return(()=>{const o=Rn.cloneNode(!0),c=o.firstChild,f=c.firstChild;return p(o,m(fn,{get color(){return e==null?void 0:e()},get snowflakeCount(){return t==null?void 0:t()},get radius(){return n==null?void 0:n()},get speed(){return i==null?void 0:i()},get wind(){return s==null?void 0:s()},get images(){return r()?Fn:void 0},get rotationSpeed(){return l==null?void 0:l()}}),c),x(f,"src",$t),p(o,m(Dn,{}),null),p(o,m(un,{url:In}),null),T(()=>c.style.setProperty("color",e==null?void 0:e())),o})()}Ft(()=>m(qn,{}),document.querySelector("#root"));
