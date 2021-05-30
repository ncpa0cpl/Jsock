!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Jsock",[],t):"object"==typeof exports?exports.Jsock=t():e.Jsock=t()}(global,(function(){return(()=>{"use strict";var e={554:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(993),t),o(n(864),t),o(n(413),t),o(n(574),t)},993:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useProperty=void 0;const r=n(304);t.useProperty=function(e){const t=r.UnitScopeManager.getStorage().next();return t.init(e),[t.value,t.set]}},864:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useReference=void 0;const r=n(554),o=n(304);t.useReference=function(e){const[t]=r.useProperty({current:o.resolveInitializer(e,void 0)});return t}},413:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useSideEffect=void 0;const r=n(554),o=n(86),i=n(304);t.useSideEffect=function(e,t){const n=r.useReference(void 0);t&&n.current&&o.compareArrays(t,n.current)||(i.UnitScopeManager.deferAction(e),t&&(n.current=t))}},574:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useUnit=void 0;const r=n(554),o=n(983);t.useUnit=function(e){const t=r.useReference(e),[,n]=r.useProperty(null);return r.useSideEffect((()=>{const e=t.current;if(void 0===e[o.ON_STATE_UPDATE])throw new Error("Object passed tho th useUnit hook must be a Unit object.");e[o.ON_STATE_UPDATE]=()=>n(null)}),[]),t.current}},607:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),t.Unit=void 0,o(n(554),t);var i=n(304);Object.defineProperty(t,"Unit",{enumerable:!0,get:function(){return i.Unit}})},10:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.actionQueue=void 0,t.actionQueue=function(){const e=[];let t=!1;return{exec:n=>{e.push(n),(()=>{if(!t){for(t=!0;;){const t=e.shift();if(!t)break;t()}t=!1}})()},get isRunning(){return t}}}},908:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.compareArrays=void 0,t.compareArrays=function(e,t){if(e.length!==t.length)return!1;for(const n in e)if(!Object.is(e[n],t[n]))return!1;return!0}},545:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.iterateOver=void 0,t.iterateOver=function(e){const t=e[Symbol.iterator]();return{next:()=>t.next().value}}},86:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(10),t),o(n(908),t),o(n(545),t),o(n(33),t)},33:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.limitedAction=void 0,t.limitedAction=function(e,t=1){const n=()=>Array.from({length:t},(()=>e));let r=n();return{call:(...e)=>(r.pop()??(()=>{}))(...e),reset:()=>{r=n()}}}},304:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),t.Unit=void 0;var i=n(983);Object.defineProperty(t,"Unit",{enumerable:!0,get:function(){return i.Unit}}),o(n(137),t),o(n(576),t)},983:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Unit=t.ON_STATE_UPDATE=void 0;const r=n(86),o=n(137),i=n(576);t.ON_STATE_UPDATE=Symbol("ON_STATE_UPDATE"),t.Unit=function(e){return(...n)=>{const c={[t.ON_STATE_UPDATE]:()=>{}},u=r.actionQueue(),s=r.limitedAction((()=>{i.UnitScopeManager.deferAction((()=>{d(),c[t.ON_STATE_UPDATE]()}))}),1),a=o.unitPropertyStorage((()=>s.call())),f={storage:a,sideEffects:[]},d=()=>u.exec((()=>{i.UnitScopeManager.with(f).run((()=>{s.reset(),a.reset(),Object.assign(c,e(...n))}))}));return d(),c}}},137:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(395),t),o(n(957),t),o(n(318),t)},395:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(401),t),o(n(804),t)},401:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initUnitProperty=void 0;const r=n(137);t.initUnitProperty=function(e){const t={value:void 0,init(e){this.value=r.resolveInitializer(e,void 0),this.init=()=>{}},set(t){this.value=r.resolveInitializer(t,this.value),e()}};return t.init=t.init.bind(t),t.set=t.set.bind(t),t}},804:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},318:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(213),t),o(n(856),t)},213:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.resolveInitializer=void 0,t.resolveInitializer=function(e,t){return"function"==typeof e?e(t):e}},856:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},957:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(813),t),o(n(161),t)},813:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.unitPropertyStorage=void 0;const r=n(137),o=n(86);t.unitPropertyStorage=function(e){const t=[];let n=o.iterateOver(t);return{reset:()=>{n=o.iterateOver(t)},next:()=>{const o=n.next();if(o)return o;const i=r.initUnitProperty(e);return t.push(i),i}}}},161:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},581:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UnitScopeIllegalScopeAccess=t.UnitScopeValidationError=void 0;class n extends Error{constructor(){super("Unit Error: Usage of hooks outside of Unit body is forbidden.")}}t.UnitScopeValidationError=n;class r extends Error{constructor(){super("Unit Error: Access to unit storage is only allowed within the Unit body, \n    make sure you dont use Unit Hooks outside the Unit body or within a side effect.")}}t.UnitScopeIllegalScopeAccess=r},576:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(240),t),o(n(473),t)},240:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.UnitScopeManager=void 0;const r=n(581),o={storage:{reset(){throw new r.UnitScopeIllegalScopeAccess},next(){throw new r.UnitScopeIllegalScopeAccess}},sideEffects:[]};class i{static validateScopeExistence(){if(0===i.scopeStack.length)throw new r.UnitScopeValidationError}static enterScope(e){i.scopeStack.push(e)}static leaveScope(){const e=i.scopeStack.pop();if(e&&e.sideEffects.length>0){const t=[...e.sideEffects];e.sideEffects.splice(0,e.sideEffects.length),i.executeSideEffects(t)}}static getScope(){return i.validateScopeExistence(),i.scopeStack[i.scopeStack.length-1]}static executeSideEffects(e){i.with(o).run((()=>{for(const t of e)t()}))}static with(e){return{run(t){i.enterScope(e),t(),i.leaveScope()}}}static getStorage(){return i.getScope().storage}static getSideEffects(){return i.getScope().sideEffects}static deferAction(e){i.scopeStack.length>0?i.getSideEffects().push(e):e()}}t.UnitScopeManager=i,i.scopeStack=[]},473:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})}},t={};return function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}(607)})()}));