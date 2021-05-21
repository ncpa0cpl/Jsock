!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define("tbd", [], t)
    : "object" == typeof exports
    ? (exports.tbd = t())
    : (e.tbd = t());
})(self, function () {
  return (() => {
    "use strict";
    var e = {
        554: function (e, t, r) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      });
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var r in e)
                  "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            i(r(993), t),
            i(r(864), t),
            i(r(413), t);
        },
        993: (e, t, r) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.useProperty = void 0);
          const n = r(304);
          t.useProperty = function (e) {
            const t = n.UnitScope.getStorage().next();
            return t.init(e), [t.value, t.set];
          };
        },
        864: (e, t, r) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.useReference = void 0);
          const n = r(554);
          t.useReference = function (e) {
            const [t] = n.useProperty({ current: e });
            return t;
          };
        },
        413: (e, t, r) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.useSideEffect = void 0);
          const n = r(554),
            i = r(86),
            o = r(304);
          t.useSideEffect = function (e, t) {
            const r = n.useReference([]);
            (t && i.compareArrays(t, r.current)) ||
              (o.UnitScope.getSideEffects().addEffectToQueue(e), t && (r.current = t));
          };
        },
        10: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.actionQueue = void 0),
            (t.actionQueue = function () {
              const e = [];
              let t = !1;
              return {
                exec: function r(n) {
                  t
                    ? e.push(n)
                    : ((t = !0),
                      n(),
                      (() => {
                        for (t = !1; ; ) {
                          const t = e.shift();
                          if (!t) break;
                          r(t);
                        }
                      })());
                },
                get isRunning() {
                  return t;
                },
              };
            });
        },
        908: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.compareArrays = void 0),
            (t.compareArrays = function (e, t) {
              if (e.length !== t.length) return !1;
              for (const r in e) if (!Object.is(e[r], t[r])) return !1;
              return !0;
            });
        },
        545: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.iterateOver = void 0),
            (t.iterateOver = function (e) {
              const t = e[Symbol.iterator]();
              return { next: () => t.next().value };
            });
        },
        86: function (e, t, r) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      });
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var r in e)
                  "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            i(r(10), t),
            i(r(908), t),
            i(r(545), t);
        },
        304: function (e, t, r) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      });
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var r in e)
                  "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.Unit = void 0);
          var o = r(983);
          Object.defineProperty(t, "Unit", {
            enumerable: !0,
            get: function () {
              return o.Unit;
            },
          }),
            i(r(137), t),
            i(r(696), t),
            i(r(837), t);
        },
        983: (e, t, r) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.Unit = void 0);
          const n = r(86),
            i = r(137),
            o = r(696),
            u = r(837);
          t.Unit = function (e) {
            return (...t) => {
              const r = {},
                c = n.actionQueue(),
                f = i.unitPropertyStorage(() => {
                  d();
                }),
                a = u.unitSideEffects(),
                s = { storage: f, sideEffects: a },
                d = () =>
                  c.exec(() =>
                    o.UnitScope.with(s).run(() => {
                      f.reset();
                      const n = e(...t);
                      a.runQueue(), Object.assign(r, n);
                    })
                  );
              return d(), r;
            };
          };
        },
        137: function (e, t, r) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      });
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var r in e)
                  "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }),
            i(r(395), t),
            i(r(957), t),
            i(r(318), t);
        },
        395: function (e, t, r) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      });
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var r in e)
                  "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }), i(r(401), t), i(r(804), t);
        },
        401: (e, t, r) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.initUnitProperty = void 0);
          const n = r(137);
          t.initUnitProperty = function (e) {
            const t = {
              value: void 0,
              init(e) {
                (this.value = n.resolveInitializer(e, void 0)), (this.init = () => {});
              },
              set(t) {
                (this.value = n.resolveInitializer(t, this.value)), e();
              },
            };
            return (t.init = t.init.bind(t)), (t.set = t.set.bind(t)), t;
          };
        },
        804: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 });
        },
        318: function (e, t, r) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      });
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var r in e)
                  "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }), i(r(213), t), i(r(856), t);
        },
        213: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.resolveInitializer = void 0),
            (t.resolveInitializer = function (e, t) {
              return "function" == typeof e ? e(t) : e;
            });
        },
        856: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 });
        },
        957: function (e, t, r) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      });
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var r in e)
                  "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }), i(r(813), t), i(r(161), t);
        },
        813: (e, t, r) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.unitPropertyStorage = void 0);
          const n = r(137),
            i = r(86);
          t.unitPropertyStorage = function (e) {
            const t = [];
            let r = i.iterateOver(t);
            return {
              reset: () => {
                r = i.iterateOver(t);
              },
              next: () => {
                const i = r.next();
                if (i) return i;
                const o = n.initUnitProperty(e);
                return t.push(o), o;
              },
            };
          };
        },
        161: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 });
        },
        696: function (e, t, r) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      });
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var r in e)
                  "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }), i(r(854), t), i(r(989), t);
        },
        854: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.UnitScope = void 0);
          class r {
            static with(e) {
              return {
                run(t) {
                  const n = r.scopeData;
                  r.scopeData = e;
                  const i = t();
                  return (r.scopeData = n), i;
                },
              };
            }
            static getStorage() {
              return r.validateScopeExistence(), r.scopeData.storage;
            }
            static getSideEffects() {
              return r.validateScopeExistence(), r.scopeData.sideEffects;
            }
            static validateScopeExistence() {
              if (!r.scopeData)
                throw new Error("Usage of hooks outside of unit body is forbidden.");
            }
          }
          t.UnitScope = r;
        },
        989: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 });
        },
        837: function (e, t, r) {
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (e, t, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(e, n, {
                        enumerable: !0,
                        get: function () {
                          return t[r];
                        },
                      });
                  }
                : function (e, t, r, n) {
                    void 0 === n && (n = r), (e[n] = t[r]);
                  }),
            i =
              (this && this.__exportStar) ||
              function (e, t) {
                for (var r in e)
                  "default" === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
              };
          Object.defineProperty(t, "__esModule", { value: !0 }), i(r(833), t), i(r(706), t);
        },
        833: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.unitSideEffects = void 0),
            (t.unitSideEffects = function () {
              const e = [];
              return {
                reset: () => {
                  e.splice(0, e.length);
                },
                addEffectToQueue: (t) => {
                  e.push(t);
                },
                runQueue: () => {
                  for (;;) {
                    const t = e.shift();
                    if (!t) break;
                    t();
                  }
                },
              };
            });
        },
        706: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 });
        },
      },
      t = {};
    function r(n) {
      var i = t[n];
      if (void 0 !== i) return i.exports;
      var o = (t[n] = { exports: {} });
      return e[n].call(o.exports, o, o.exports, r), o.exports;
    }
    var n = {};
    return (
      (() => {
        var e = n;
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.Unit = e.useReference = e.useSideEffect = e.useProperty = void 0);
        var t = r(554);
        Object.defineProperty(e, "useProperty", {
          enumerable: !0,
          get: function () {
            return t.useProperty;
          },
        }),
          Object.defineProperty(e, "useSideEffect", {
            enumerable: !0,
            get: function () {
              return t.useSideEffect;
            },
          }),
          Object.defineProperty(e, "useReference", {
            enumerable: !0,
            get: function () {
              return t.useReference;
            },
          });
        var i = r(304);
        Object.defineProperty(e, "Unit", {
          enumerable: !0,
          get: function () {
            return i.Unit;
          },
        });
      })(),
      n
    );
  })();
});
