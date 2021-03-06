! function(a, b) {
	"function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.ngAdmin = b()
}(this, function() {
	function a(a, b) {
		function c(a, c, h, i) {
			var j = angular.extend({
				value: c.text()
			}, b.codemirror || {}, a.$eval(h.uiCodemirror), a.$eval(h.uiCodemirrorOpts)),
				k = d(c, j);
			e(k, h.uiCodemirror || h.uiCodemirrorOpts, a), f(k, i, a), g(k, h.uiRefresh, a), a.$on("CodeMirror", function(a, b) {
				if (!angular.isFunction(b)) throw new Error("the CodeMirror event requires a callback function");
				b(k)
			}), angular.isFunction(j.onLoad) && j.onLoad(k)
		}

		function d(a, b) {
			var c;
			return "TEXTAREA" === a[0].tagName ? c = window.CodeMirror.fromTextArea(a[0], b) : (a.html(""), c = new window.CodeMirror(function(b) {
				a.append(b)
			}, b)), c
		}

		function e(a, b, c) {
			function d(b, c) {
				angular.isObject(b) && e.forEach(function(d) {
					if (b.hasOwnProperty(d)) {
						if (c && b[d] === c[d]) return;
						a.setOption(d, b[d])
					}
				})
			}
			if (b) {
				var e = Object.keys(window.CodeMirror.defaults);
				c.$watch(b, d, !0)
			}
		}

		function f(a, b, c) {
			b && (b.$formatters.push(function(a) {
				if (angular.isUndefined(a) || null === a) return "";
				if (angular.isObject(a) || angular.isArray(a)) throw new Error("ui-codemirror cannot use an object or an array as a model");
				return a
			}), b.$render = function() {
				var c = b.$viewValue || "";
				a.setValue(c)
			}, a.on("change", function(a) {
				var d = a.getValue();
				d !== b.$viewValue && c.$evalAsync(function() {
					b.$setViewValue(d)
				})
			}))
		}

		function g(b, c, d) {
			c && d.$watch(c, function(c, d) {
				c !== d && a(function() {
					b.refresh()
				})
			})
		}
		return {
			restrict: "EA",
			require: "?ngModel",
			compile: function() {
				if (angular.isUndefined(window.CodeMirror)) throw new Error("ui-codemirror need CodeMirror to work... (o rly?)");
				return c
			}
		}
	}
	var b, c, d;
	! function(a) {
		function e(a, b) {
			return u.call(a, b)
		}

		function f(a, b) {
			var c, d, e, f, g, h, i, j, k, l, m, n = b && b.split("/"),
				o = s.map,
				p = o && o["*"] || {};
			if (a && "." === a.charAt(0))
				if (b) {
					for (n = n.slice(0, n.length - 1), a = a.split("/"), g = a.length - 1, s.nodeIdCompat && w.test(a[g]) && (a[g] = a[g].replace(w, "")), a = n.concat(a), k = 0; k < a.length; k += 1)
						if (m = a[k], "." === m) a.splice(k, 1), k -= 1;
						else
					if (".." === m) {
						if (1 === k && (".." === a[2] || ".." === a[0])) break;
						k > 0 && (a.splice(k - 1, 2), k -= 2)
					}
					a = a.join("/")
				} else 0 === a.indexOf("./") && (a = a.substring(2));
			if ((n || p) && o) {
				for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
					if (d = c.slice(0, k).join("/"), n)
						for (l = n.length; l > 0; l -= 1)
							if (e = o[n.slice(0, l).join("/")], e && (e = e[d])) {
								f = e, h = k;
								break
							}
					if (f) break;
					!i && p && p[d] && (i = p[d], j = k)
				}!f && i && (f = i, h = j), f && (c.splice(0, h, f), a = c.join("/"))
			}
			return a
		}

		function g(b, c) {
			return function() {
				var d = v.call(arguments, 0);
				return "string" != typeof d[0] && 1 === d.length && d.push(null), n.apply(a, d.concat([b, c]))
			}
		}

		function h(a) {
			return function(b) {
				return f(b, a)
			}
		}

		function i(a) {
			return function(b) {
				q[a] = b
			}
		}

		function j(b) {
			if (e(r, b)) {
				var c = r[b];
				delete r[b], t[b] = !0, m.apply(a, c)
			}
			if (!e(q, b) && !e(t, b)) throw new Error("No " + b);
			return q[b]
		}

		function k(a) {
			var b, c = a ? a.indexOf("!") : -1;
			return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a]
		}

		function l(a) {
			return function() {
				return s && s.config && s.config[a] || {}
			}
		}
		var m, n, o, p, q = {}, r = {}, s = {}, t = {}, u = Object.prototype.hasOwnProperty,
			v = [].slice,
			w = /\.js$/;
		o = function(a, b) {
			var c, d = k(a),
				e = d[0];
			return a = d[1], e && (e = f(e, b), c = j(e)), e ? a = c && c.normalize ? c.normalize(a, h(b)) : f(a, b) : (a = f(a, b), d = k(a), e = d[0], a = d[1], e && (c = j(e))), {
				f: e ? e + "!" + a : a,
				n: a,
				pr: e,
				p: c
			}
		}, p = {
			require: function(a) {
				return g(a)
			},
			exports: function(a) {
				var b = q[a];
				return "undefined" != typeof b ? b : q[a] = {}
			},
			module: function(a) {
				return {
					id: a,
					uri: "",
					exports: q[a],
					config: l(a)
				}
			}
		}, m = function(b, c, d, f) {
			var h, k, l, m, n, s, u = [],
				v = typeof d;
			if (f = f || b, "undefined" === v || "function" === v) {
				for (c = !c.length && d.length ? ["require", "exports", "module"] : c, n = 0; n < c.length; n += 1)
					if (m = o(c[n], f), k = m.f, "require" === k) u[n] = p.require(b);
					else
				if ("exports" === k) u[n] = p.exports(b), s = !0;
				else if ("module" === k) h = u[n] = p.module(b);
				else if (e(q, k) || e(r, k) || e(t, k)) u[n] = j(k);
				else {
					if (!m.p) throw new Error(b + " missing " + k);
					m.p.load(m.n, g(f, !0), i(k), {}), u[n] = q[k]
				}
				l = d ? d.apply(q[b], u) : void 0, b && (h && h.exports !== a && h.exports !== q[b] ? q[b] = h.exports : l === a && s || (q[b] = l))
			} else b && (q[b] = d)
		}, b = c = n = function(b, c, d, e, f) {
			if ("string" == typeof b) return p[b] ? p[b](c) : j(o(b, c).f);
			if (!b.splice) {
				if (s = b, s.deps && n(s.deps, s.callback), !c) return;
				c.splice ? (b = c, c = d, d = null) : b = a
			}
			return c = c || function() {}, "function" == typeof d && (d = e, e = f), e ? m(a, b, c, d) : setTimeout(function() {
				m(a, b, c, d)
			}, 4), n
		}, n.config = function(a) {
			return n(a)
		}, b._defined = q, d = function(a, b, c) {
			b.splice || (c = b, b = []), e(q, a) || e(r, a) || (r[a] = [a, b, c])
		}, d.amd = {
			jQuery: !0
		}
	}(), d("bower_components/almond/almond", function() {}), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"),
	function(a, b, c) {
		function d(a, b) {
			return M(new(M(function() {}, {
				prototype: a
			})), b)
		}

		function e(a) {
			return L(arguments, function(b) {
				b !== a && L(b, function(b, c) {
					a.hasOwnProperty(c) || (a[c] = b)
				})
			}), a
		}

		function f(a, b) {
			var c = [];
			for (var d in a.path) {
				if (a.path[d] !== b.path[d]) break;
				c.push(a.path[d])
			}
			return c
		}

		function g(a) {
			if (Object.keys) return Object.keys(a);
			var c = [];
			return b.forEach(a, function(a, b) {
				c.push(b)
			}), c
		}

		function h(a, b) {
			if (Array.prototype.indexOf) return a.indexOf(b, Number(arguments[2]) || 0);
			var c = a.length >>> 0,
				d = Number(arguments[2]) || 0;
			for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++)
				if (d in a && a[d] === b) return d;
			return -1
		}

		function i(a, b, c, d) {
			var e, i = f(c, d),
				j = {}, k = [];
			for (var l in i)
				if (i[l].params && (e = g(i[l].params), e.length))
					for (var m in e) h(k, e[m]) >= 0 || (k.push(e[m]), j[e[m]] = a[e[m]]);
			return M({}, j, b)
		}

		function j(a, b, c) {
			if (!c) {
				c = [];
				for (var d in a) c.push(d)
			}
			for (var e = 0; e < c.length; e++) {
				var f = c[e];
				if (a[f] != b[f]) return !1
			}
			return !0
		}

		function k(a, b) {
			var c = {};
			return L(a, function(a) {
				c[a] = b[a]
			}), c
		}

		function l(a) {
			var b = {}, c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
			for (var d in a) - 1 == h(c, d) && (b[d] = a[d]);
			return b
		}

		function m(a, b) {
			var c = K(a),
				d = c ? [] : {};
			return L(a, function(a, e) {
				b(a, e) && (d[c ? d.length : e] = a)
			}), d
		}

		function n(a, b) {
			var c = K(a) ? [] : {};
			return L(a, function(a, d) {
				c[d] = b(a, d)
			}), c
		}

		function o(a, b) {
			var d = 1,
				f = 2,
				i = {}, j = [],
				k = i,
				m = M(a.when(i), {
					$$promises: i,
					$$values: i
				});
			this.study = function(i) {
				function n(a, c) {
					if (s[c] !== f) {
						if (r.push(c), s[c] === d) throw r.splice(0, h(r, c)), new Error("Cyclic dependency: " + r.join(" -> "));
						if (s[c] = d, I(a)) q.push(c, [
							function() {
								return b.get(a)
							}
						], j);
						else {
							var e = b.annotate(a);
							L(e, function(a) {
								a !== c && i.hasOwnProperty(a) && n(i[a], a)
							}), q.push(c, a, e)
						}
						r.pop(), s[c] = f
					}
				}

				function o(a) {
					return J(a) && a.then && a.$$promises
				}
				if (!J(i)) throw new Error("'invocables' must be an object");
				var p = g(i || {}),
					q = [],
					r = [],
					s = {};
				return L(i, n), i = r = s = null,
				function(d, f, g) {
					function h() {
						--u || (v || e(t, f.$$values), r.$$values = t, r.$$promises = r.$$promises || !0, delete r.$$inheritedValues, n.resolve(t))
					}

					function i(a) {
						r.$$failure = a, n.reject(a)
					}

					function j(c, e, f) {
						function j(a) {
							l.reject(a), i(a)
						}

						function k() {
							if (!G(r.$$failure)) try {
								l.resolve(b.invoke(e, g, t)), l.promise.then(function(a) {
									t[c] = a, h()
								}, j)
							} catch (a) {
								j(a)
							}
						}
						var l = a.defer(),
							m = 0;
						L(f, function(a) {
							s.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, s[a].then(function(b) {
								t[a] = b, --m || k()
							}, j))
						}), m || k(), s[c] = l.promise
					}
					if (o(d) && g === c && (g = f, f = d, d = null), d) {
						if (!J(d)) throw new Error("'locals' must be an object")
					} else d = k; if (f) {
						if (!o(f)) throw new Error("'parent' must be a promise returned by $resolve.resolve()")
					} else f = m;
					var n = a.defer(),
						r = n.promise,
						s = r.$$promises = {}, t = M({}, d),
						u = 1 + q.length / 3,
						v = !1;
					if (G(f.$$failure)) return i(f.$$failure), r;
					f.$$inheritedValues && e(t, l(f.$$inheritedValues, p)), M(s, f.$$promises), f.$$values ? (v = e(t, l(f.$$values, p)), r.$$inheritedValues = l(f.$$values, p), h()) : (f.$$inheritedValues && (r.$$inheritedValues = l(f.$$inheritedValues, p)), f.then(h, i));
					for (var w = 0, x = q.length; x > w; w += 3) d.hasOwnProperty(q[w]) ? h() : j(q[w], q[w + 1], q[w + 2]);
					return r
				}
			}, this.resolve = function(a, b, c, d) {
				return this.study(a)(b, c, d)
			}
		}

		function p(a, b, c) {
			this.fromConfig = function(a, b, c) {
				return G(a.template) ? this.fromString(a.template, b) : G(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : G(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null
			}, this.fromString = function(a, b) {
				return H(a) ? a(b) : a
			}, this.fromUrl = function(c, d) {
				return H(c) && (c = c(d)), null == c ? null : a.get(c, {
					cache: b,
					headers: {
						Accept: "text/html"
					}
				}).then(function(a) {
					return a.data
				})
			}, this.fromProvider = function(a, b, d) {
				return c.invoke(a, null, d || {
					params: b
				})
			}
		}

		function q(a, b, e) {
			function f(b, c, d, e) {
				if (q.push(b), o[b]) return o[b];
				if (!/^\w+(-+\w+)*(?:\[\])?$/.test(b)) throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
				if (p[b]) throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
				return p[b] = new O.Param(b, c, d, e), p[b]
			}

			function g(a, b, c) {
				var d = ["", ""],
					e = a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
				if (!b) return e;
				switch (c) {
					case !1:
						d = ["(", ")"];
						break;
					case !0:
						d = ["?(", ")?"];
						break;
					default:
						d = ["(" + c + "|", ")?"]
				}
				return e + d[0] + b + d[1]
			}

			function h(c, e) {
				var f, g, h, i, j;
				return f = c[2] || c[3], j = b.params[f], h = a.substring(m, c.index), g = e ? c[4] : c[4] || ("*" == c[1] ? ".*" : null), i = O.type(g || "string") || d(O.type("string"), {
					pattern: new RegExp(g)
				}), {
					id: f,
					regexp: g,
					segment: h,
					type: i,
					cfg: j
				}
			}
			b = M({
				params: {}
			}, J(b) ? b : {});
			var i, j = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
				k = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
				l = "^",
				m = 0,
				n = this.segments = [],
				o = e ? e.params : {}, p = this.params = e ? e.params.$$new() : new O.ParamSet,
				q = [];
			this.source = a;
			for (var r, s, t;
				(i = j.exec(a)) && (r = h(i, !1), !(r.segment.indexOf("?") >= 0));) s = f(r.id, r.type, r.cfg, "path"), l += g(r.segment, s.type.pattern.source, s.squash), n.push(r.segment), m = j.lastIndex;
			t = a.substring(m);
			var u = t.indexOf("?");
			if (u >= 0) {
				var v = this.sourceSearch = t.substring(u);
				if (t = t.substring(0, u), this.sourcePath = a.substring(0, m + u), v.length > 0)
					for (m = 0; i = k.exec(v);) r = h(i, !0), s = f(r.id, r.type, r.cfg, "search"), m = j.lastIndex
			} else this.sourcePath = a, this.sourceSearch = "";
			l += g(t) + (b.strict === !1 ? "/?" : "") + "$", n.push(t), this.regexp = new RegExp(l, b.caseInsensitive ? "i" : c), this.prefix = n[0], this.$$paramNames = q
		}

		function r(a) {
			M(this, a)
		}

		function s() {
			function a(a) {
				return null != a ? a.toString().replace(/\//g, "%2F") : a
			}

			function e(a) {
				return null != a ? a.toString().replace(/%2F/g, "/") : a
			}

			function f(a) {
				return this.pattern.test(a)
			}

			function i() {
				return {
					strict: t,
					caseInsensitive: p
				}
			}

			function j(a) {
				return H(a) || K(a) && H(a[a.length - 1])
			}

			function k() {
				for (; x.length;) {
					var a = x.shift();
					if (a.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
					b.extend(v[a.name], o.invoke(a.def))
				}
			}

			function l(a) {
				M(this, a || {})
			}
			O = this;
			var o, p = !1,
				t = !0,
				u = !1,
				v = {}, w = !0,
				x = [],
				y = {
					string: {
						encode: a,
						decode: e,
						is: f,
						pattern: /[^/]*/
					},
					"int": {
						encode: a,
						decode: function(a) {
							return parseInt(a, 10)
						},
						is: function(a) {
							return G(a) && this.decode(a.toString()) === a
						},
						pattern: /\d+/
					},
					bool: {
						encode: function(a) {
							return a ? 1 : 0
						},
						decode: function(a) {
							return 0 !== parseInt(a, 10)
						},
						is: function(a) {
							return a === !0 || a === !1
						},
						pattern: /0|1/
					},
					date: {
						encode: function(a) {
							return this.is(a) ? [a.getFullYear(), ("0" + (a.getMonth() + 1)).slice(-2), ("0" + a.getDate()).slice(-2)].join("-") : c
						},
						decode: function(a) {
							if (this.is(a)) return a;
							var b = this.capture.exec(a);
							return b ? new Date(b[1], b[2] - 1, b[3]) : c
						},
						is: function(a) {
							return a instanceof Date && !isNaN(a.valueOf())
						},
						equals: function(a, b) {
							return this.is(a) && this.is(b) && a.toISOString() === b.toISOString()
						},
						pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
						capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
					},
					json: {
						encode: b.toJson,
						decode: b.fromJson,
						is: b.isObject,
						equals: b.equals,
						pattern: /[^/]*/
					},
					any: {
						encode: b.identity,
						decode: b.identity,
						is: b.identity,
						equals: b.equals,
						pattern: /.*/
					}
				};
			s.$$getDefaultValue = function(a) {
				if (!j(a.value)) return a.value;
				if (!o) throw new Error("Injectable functions cannot be called at configuration time");
				return o.invoke(a.value)
			}, this.caseInsensitive = function(a) {
				return G(a) && (p = a), p
			}, this.strictMode = function(a) {
				return G(a) && (t = a), t
			}, this.defaultSquashPolicy = function(a) {
				if (!G(a)) return u;
				if (a !== !0 && a !== !1 && !I(a)) throw new Error("Invalid squash policy: " + a + ". Valid policies: false, true, arbitrary-string");
				return u = a, a
			}, this.compile = function(a, b) {
				return new q(a, M(i(), b))
			}, this.isMatcher = function(a) {
				if (!J(a)) return !1;
				var b = !0;
				return L(q.prototype, function(c, d) {
					H(c) && (b = b && G(a[d]) && H(a[d]))
				}), b
			}, this.type = function(a, b, c) {
				if (!G(b)) return v[a];
				if (v.hasOwnProperty(a)) throw new Error("A type named '" + a + "' has already been defined.");
				return v[a] = new r(M({
					name: a
				}, b)), c && (x.push({
					name: a,
					def: c
				}), w || k()), this
			}, L(y, function(a, b) {
				v[b] = new r(M({
					name: b
				}, a))
			}), v = d(v, {}), this.$get = ["$injector",
				function(a) {
					return o = a, w = !1, k(), L(y, function(a, b) {
						v[b] || (v[b] = new r(a))
					}), this
				}
			], this.Param = function(a, b, d, e) {
				function f(a) {
					var b = J(a) ? g(a) : [],
						c = -1 === h(b, "value") && -1 === h(b, "type") && -1 === h(b, "squash") && -1 === h(b, "array");
					return c && (a = {
						value: a
					}), a.$$fn = j(a.value) ? a.value : function() {
						return a.value
					}, a
				}

				function i(b, c, d) {
					if (b.type && c) throw new Error("Param '" + a + "' has two type configurations.");
					return c ? c : b.type ? b.type instanceof r ? b.type : new r(b.type) : "config" === d ? v.any : v.string
				}

				function k() {
					var b = {
						array: "search" === e ? "auto" : !1
					}, c = a.match(/\[\]$/) ? {
							array: !0
						} : {};
					return M(b, c, d).array
				}

				function l(a, b) {
					var c = a.squash;
					if (!b || c === !1) return !1;
					if (!G(c) || null == c) return u;
					if (c === !0 || I(c)) return c;
					throw new Error("Invalid squash policy: '" + c + "'. Valid policies: false, true, or arbitrary string")
				}

				function p(a, b, d, e) {
					var f, g, i = [{
							from: "",
							to: d || b ? c : ""
						}, {
							from: null,
							to: d || b ? c : ""
						}];
					return f = K(a.replace) ? a.replace : [], I(e) && f.push({
						from: e,
						to: c
					}), g = n(f, function(a) {
						return a.from
					}), m(i, function(a) {
						return -1 === h(g, a.from)
					}).concat(f)
				}

				function q() {
					if (!o) throw new Error("Injectable functions cannot be called at configuration time");
					return o.invoke(d.$$fn)
				}

				function s(a) {
					function b(a) {
						return function(b) {
							return b.from === a
						}
					}

					function c(a) {
						var c = n(m(w.replace, b(a)), function(a) {
							return a.to
						});
						return c.length ? c[0] : a
					}
					return a = c(a), G(a) ? w.type.decode(a) : q()
				}

				function t() {
					return "{Param:" + a + " " + b + " squash: '" + z + "' optional: " + y + "}"
				}
				var w = this;
				d = f(d), b = i(d, b, e);
				var x = k();
				b = x ? b.$asArray(x, "search" === e) : b, "string" !== b.name || x || "path" !== e || d.value !== c || (d.value = "");
				var y = d.value !== c,
					z = l(d, y),
					A = p(d, x, y, z);
				M(this, {
					id: a,
					type: b,
					location: e,
					array: x,
					squash: z,
					replace: A,
					isOptional: y,
					value: s,
					dynamic: c,
					config: d,
					toString: t
				})
			}, l.prototype = {
				$$new: function() {
					return d(this, M(new l, {
						$$parent: this
					}))
				},
				$$keys: function() {
					for (var a = [], b = [], c = this, d = g(l.prototype); c;) b.push(c), c = c.$$parent;
					return b.reverse(), L(b, function(b) {
						L(g(b), function(b) {
							-1 === h(a, b) && -1 === h(d, b) && a.push(b)
						})
					}), a
				},
				$$values: function(a) {
					var b = {}, c = this;
					return L(c.$$keys(), function(d) {
						b[d] = c[d].value(a && a[d])
					}), b
				},
				$$equals: function(a, b) {
					var c = !0,
						d = this;
					return L(d.$$keys(), function(e) {
						var f = a && a[e],
							g = b && b[e];
						d[e].type.equals(f, g) || (c = !1)
					}), c
				},
				$$validates: function(a) {
					var b, c, d, e = !0,
						f = this;
					return L(this.$$keys(), function(g) {
						d = f[g], c = a[g], b = !c && d.isOptional, e = e && (b || !! d.type.is(c))
					}), e
				},
				$$parent: c
			}, this.ParamSet = l
		}

		function t(a, d) {
			function e(a) {
				var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
				return null != b ? b[1].replace(/\\(.)/g, "$1") : ""
			}

			function f(a, b) {
				return a.replace(/\$(\$|\d{1,2})/, function(a, c) {
					return b["$" === c ? 0 : Number(c)]
				})
			}

			function g(a, b, c) {
				if (!c) return !1;
				var d = a.invoke(b, b, {
					$match: c
				});
				return G(d) ? d : !0
			}

			function h(d, e, f, g) {
				function h(a, b, c) {
					return "/" === p ? a : b ? p.slice(0, -1) + a : c ? p.slice(1) + a : a
				}

				function m(a) {
					function b(a) {
						var b = a(f, d);
						return b ? (I(b) && d.replace().url(b), !0) : !1
					}
					if (!a || !a.defaultPrevented) {
						var e = o && d.url() === o;
						if (o = c, e) return !0;
						var g, h = j.length;
						for (g = 0; h > g; g++)
							if (b(j[g])) return;
						k && b(k)
					}
				}

				function n() {
					return i = i || e.$on("$locationChangeSuccess", m)
				}
				var o, p = g.baseHref(),
					q = d.url();
				return l || n(), {
					sync: function() {
						m()
					},
					listen: function() {
						return n()
					},
					update: function(a) {
						return a ? void(q = d.url()) : void(d.url() !== q && (d.url(q), d.replace()))
					},
					push: function(a, b, e) {
						d.url(a.format(b || {})), o = e && e.$$avoidResync ? d.url() : c, e && e.replace && d.replace()
					},
					href: function(c, e, f) {
						if (!c.validates(e)) return null;
						var g = a.html5Mode();
						b.isObject(g) && (g = g.enabled);
						var i = c.format(e);
						if (f = f || {}, g || null === i || (i = "#" + a.hashPrefix() + i), i = h(i, g, f.absolute), !f.absolute || !i) return i;
						var j = !g && i ? "/" : "",
							k = d.port();
						return k = 80 === k || 443 === k ? "" : ":" + k, [d.protocol(), "://", d.host(), k, j, i].join("")
					}
				}
			}
			var i, j = [],
				k = null,
				l = !1;
			this.rule = function(a) {
				if (!H(a)) throw new Error("'rule' must be a function");
				return j.push(a), this
			}, this.otherwise = function(a) {
				if (I(a)) {
					var b = a;
					a = function() {
						return b
					}
				} else if (!H(a)) throw new Error("'rule' must be a function");
				return k = a, this
			}, this.when = function(a, b) {
				var c, h = I(b);
				if (I(a) && (a = d.compile(a)), !h && !H(b) && !K(b)) throw new Error("invalid 'handler' in when()");
				var i = {
					matcher: function(a, b) {
						return h && (c = d.compile(b), b = ["$match",
							function(a) {
								return c.format(a)
							}
						]), M(function(c, d) {
							return g(c, b, a.exec(d.path(), d.search()))
						}, {
							prefix: I(a.prefix) ? a.prefix : ""
						})
					},
					regex: function(a, b) {
						if (a.global || a.sticky) throw new Error("when() RegExp must not be global or sticky");
						return h && (c = b, b = ["$match",
							function(a) {
								return f(c, a)
							}
						]), M(function(c, d) {
							return g(c, b, a.exec(d.path()))
						}, {
							prefix: e(a)
						})
					}
				}, j = {
						matcher: d.isMatcher(a),
						regex: a instanceof RegExp
					};
				for (var k in j)
					if (j[k]) return this.rule(i[k](a, b));
				throw new Error("invalid 'what' in when()")
			}, this.deferIntercept = function(a) {
				a === c && (a = !0), l = a
			}, this.$get = h, h.$inject = ["$location", "$rootScope", "$injector", "$browser"]
		}

		function u(a, e) {
			function f(a) {
				return 0 === a.indexOf(".") || 0 === a.indexOf("^")
			}

			function l(a, b) {
				if (!a) return c;
				var d = I(a),
					e = d ? a : a.name,
					g = f(e);
				if (g) {
					if (!b) throw new Error("No reference point given for path '" + e + "'");
					b = l(b);
					for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++)
						if ("" !== h[i] || 0 !== i) {
							if ("^" !== h[i]) break;
							if (!k.parent) throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
							k = k.parent
						} else k = b;
					h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h
				}
				var m = y[e];
				return !m || !d && (d || m !== a && m.self !== a) ? c : m
			}

			function m(a, b) {
				z[a] || (z[a] = []), z[a].push(b)
			}

			function o(a) {
				for (var b = z[a] || []; b.length;) p(b.shift())
			}

			function p(b) {
				b = d(b, {
					self: b,
					resolve: b.resolve || {},
					toString: function() {
						return this.name
					}
				});
				var c = b.name;
				if (!I(c) || c.indexOf("@") >= 0) throw new Error("State must have a valid name");
				if (y.hasOwnProperty(c)) throw new Error("State '" + c + "'' is already defined");
				var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : I(b.parent) ? b.parent : J(b.parent) && I(b.parent.name) ? b.parent.name : "";
				if (e && !y[e]) return m(e, b.self);
				for (var f in B) H(B[f]) && (b[f] = B[f](b, B.$delegates[f]));
				return y[c] = b, !b[A] && b.url && a.when(b.url, ["$match", "$stateParams",
					function(a, c) {
						x.$current.navigable == b && j(a, c) || x.transitionTo(b, a, {
							inherit: !0,
							location: !1
						})
					}
				]), o(c), b
			}

			function q(a) {
				return a.indexOf("*") > -1
			}

			function r(a) {
				var b = a.split("."),
					c = x.$current.name.split(".");
				if ("**" === b[0] && (c = c.slice(h(c, b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(h(c, b[b.length - 2]) + 1, Number.MAX_VALUE), c.push("**")), b.length != c.length) return !1;
				for (var d = 0, e = b.length; e > d; d++) "*" === b[d] && (c[d] = "*");
				return c.join("") === b.join("")
			}

			function s(a, b) {
				return I(a) && !G(b) ? B[a] : H(b) && I(a) ? (B[a] && !B.$delegates[a] && (B.$delegates[a] = B[a]), B[a] = b, this) : this
			}

			function t(a, b) {
				return J(a) ? b = a : b.name = a, p(b), this
			}

			function u(a, e, f, h, m, o, p) {
				function s(b, c, d, f) {
					var g = a.$broadcast("$stateNotFound", b, c, d);
					if (g.defaultPrevented) return p.update(), B;
					if (!g.retry) return null;
					if (f.$retry) return p.update(), C;
					var h = x.transition = e.when(g.retry);
					return h.then(function() {
						return h !== x.transition ? u : (b.options.$retry = !0, x.transitionTo(b.to, b.toParams, b.options))
					}, function() {
						return B
					}), p.update(), h
				}

				function t(a, c, d, g, i, j) {
					var l = d ? c : k(a.params.$$keys(), c),
						n = {
							$stateParams: l
						};
					i.resolve = m.resolve(a.resolve, n, i.resolve, a);
					var o = [i.resolve.then(function(a) {
						i.globals = a
					})];
					return g && o.push(g), L(a.views, function(c, d) {
						var e = c.resolve && c.resolve !== a.resolve ? c.resolve : {};
						e.$template = [
							function() {
								return f.load(d, {
									view: c,
									locals: n,
									params: l,
									notify: j.notify
								}) || ""
							}
						], o.push(m.resolve(e, n, i.resolve, a).then(function(f) {
							if (H(c.controllerProvider) || K(c.controllerProvider)) {
								var g = b.extend({}, e, n);
								f.$$controller = h.invoke(c.controllerProvider, null, g)
							} else f.$$controller = c.controller;
							f.$$state = a, f.$$controllerAs = c.controllerAs, i[d] = f
						}))
					}), e.all(o).then(function() {
						return i
					})
				}
				var u = e.reject(new Error("transition superseded")),
					z = e.reject(new Error("transition prevented")),
					B = e.reject(new Error("transition aborted")),
					C = e.reject(new Error("transition failed"));
				return w.locals = {
					resolve: null,
					globals: {
						$stateParams: {}
					}
				}, x = {
					params: {},
					current: w.self,
					$current: w,
					transition: null
				}, x.reload = function() {
					return x.transitionTo(x.current, o, {
						reload: !0,
						inherit: !1,
						notify: !0
					})
				}, x.go = function(a, b, c) {
					return x.transitionTo(a, b, M({
						inherit: !0,
						relative: x.$current
					}, c))
				}, x.transitionTo = function(b, c, f) {
					c = c || {}, f = M({
						location: !0,
						inherit: !1,
						relative: null,
						notify: !0,
						reload: !1,
						$retry: !1
					}, f || {});
					var g, j = x.$current,
						m = x.params,
						n = j.path,
						q = l(b, f.relative);
					if (!G(q)) {
						var r = {
							to: b,
							toParams: c,
							options: f
						}, y = s(r, j.self, m, f);
						if (y) return y;
						if (b = r.to, c = r.toParams, f = r.options, q = l(b, f.relative), !G(q)) {
							if (!f.relative) throw new Error("No such state '" + b + "'");
							throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'")
						}
					}
					if (q[A]) throw new Error("Cannot transition to abstract state '" + b + "'");
					if (f.inherit && (c = i(o, c || {}, x.$current, q)), !q.params.$$validates(c)) return C;
					c = q.params.$$values(c), b = q;
					var B = b.path,
						D = 0,
						E = B[D],
						F = w.locals,
						H = [];
					if (!f.reload)
						for (; E && E === n[D] && E.ownParams.$$equals(c, m);) F = H[D] = E.locals, D++, E = B[D];
					if (v(b, j, F, f)) return b.self.reloadOnSearch !== !1 && p.update(), x.transition = null, e.when(x.current);
					if (c = k(b.params.$$keys(), c || {}), f.notify && a.$broadcast("$stateChangeStart", b.self, c, j.self, m).defaultPrevented) return p.update(), z;
					for (var I = e.when(F), J = D; J < B.length; J++, E = B[J]) F = H[J] = d(F), I = t(E, c, E === b, I, F, f);
					var K = x.transition = I.then(function() {
						var d, e, g;
						if (x.transition !== K) return u;
						for (d = n.length - 1; d >= D; d--) g = n[d], g.self.onExit && h.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
						for (d = D; d < B.length; d++) e = B[d], e.locals = H[d], e.self.onEnter && h.invoke(e.self.onEnter, e.self, e.locals.globals);
						return x.transition !== K ? u : (x.$current = b, x.current = b.self, x.params = c, N(x.params, o), x.transition = null, f.location && b.navigable && p.push(b.navigable.url, b.navigable.locals.globals.$stateParams, {
							$$avoidResync: !0,
							replace: "replace" === f.location
						}), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, j.self, m), p.update(!0), x.current)
					}, function(d) {
						return x.transition !== K ? u : (x.transition = null, g = a.$broadcast("$stateChangeError", b.self, c, j.self, m, d), g.defaultPrevented || p.update(), e.reject(d))
					});
					return K
				}, x.is = function(a, b, d) {
					d = M({
						relative: x.$current
					}, d || {});
					var e = l(a, d.relative);
					return G(e) ? x.$current !== e ? !1 : b ? j(e.params.$$values(b), o) : !0 : c
				}, x.includes = function(a, b, d) {
					if (d = M({
						relative: x.$current
					}, d || {}), I(a) && q(a)) {
						if (!r(a)) return !1;
						a = x.$current.name
					}
					var e = l(a, d.relative);
					return G(e) ? G(x.$current.includes[e.name]) ? b ? j(e.params.$$values(b), o, g(b)) : !0 : !1 : c
				}, x.href = function(a, b, d) {
					d = M({
						lossy: !0,
						inherit: !0,
						absolute: !1,
						relative: x.$current
					}, d || {});
					var e = l(a, d.relative);
					if (!G(e)) return null;
					d.inherit && (b = i(o, b || {}, x.$current, e));
					var f = e && d.lossy ? e.navigable : e;
					return f && f.url !== c && null !== f.url ? p.href(f.url, k(e.params.$$keys(), b || {}), {
						absolute: d.absolute
					}) : null
				}, x.get = function(a, b) {
					if (0 === arguments.length) return n(g(y), function(a) {
						return y[a].self
					});
					var c = l(a, b || x.$current);
					return c && c.self ? c.self : null
				}, x
			}

			function v(a, b, c, d) {
				return a !== b || (c !== b.locals || d.reload) && a.self.reloadOnSearch !== !1 ? void 0 : !0
			}
			var w, x, y = {}, z = {}, A = "abstract",
				B = {
					parent: function(a) {
						if (G(a.parent) && a.parent) return l(a.parent);
						var b = /^(.+)\.[^.]+$/.exec(a.name);
						return b ? l(b[1]) : w
					},
					data: function(a) {
						return a.parent && a.parent.data && (a.data = a.self.data = M({}, a.parent.data, a.data)), a.data
					},
					url: function(a) {
						var b = a.url,
							c = {
								params: a.params || {}
							};
						if (I(b)) return "^" == b.charAt(0) ? e.compile(b.substring(1), c) : (a.parent.navigable || w).url.concat(b, c);
						if (!b || e.isMatcher(b)) return b;
						throw new Error("Invalid url '" + b + "' in state '" + a + "'")
					},
					navigable: function(a) {
						return a.url ? a : a.parent ? a.parent.navigable : null
					},
					ownParams: function(a) {
						var b = a.url && a.url.params || new O.ParamSet;
						return L(a.params || {}, function(a, c) {
							b[c] || (b[c] = new O.Param(c, null, a, "config"))
						}), b
					},
					params: function(a) {
						return a.parent && a.parent.params ? M(a.parent.params.$$new(), a.ownParams) : new O.ParamSet
					},
					views: function(a) {
						var b = {};
						return L(G(a.views) ? a.views : {
							"": a
						}, function(c, d) {
							d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c
						}), b
					},
					path: function(a) {
						return a.parent ? a.parent.path.concat(a) : []
					},
					includes: function(a) {
						var b = a.parent ? M({}, a.parent.includes) : {};
						return b[a.name] = !0, b
					},
					$delegates: {}
				};
			w = p({
				name: "",
				url: "^",
				views: null,
				"abstract": !0
			}), w.navigable = null, this.decorator = s, this.state = t, this.$get = u, u.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory"]
		}

		function v() {
			function a(a, b) {
				return {
					load: function(c, d) {
						var e, f = {
								template: null,
								controller: null,
								view: null,
								locals: null,
								notify: !0,
								async: !0,
								params: {}
							};
						return d = M(f, d), d.view && (e = b.fromConfig(d.view, d.params, d.locals)), e && d.notify && a.$broadcast("$viewContentLoading", d), e
					}
				}
			}
			this.$get = a, a.$inject = ["$rootScope", "$templateFactory"]
		}

		function w() {
			var a = !1;
			this.useAnchorScroll = function() {
				a = !0
			}, this.$get = ["$anchorScroll", "$timeout",
				function(b, c) {
					return a ? b : function(a) {
						c(function() {
							a[0].scrollIntoView()
						}, 0, !1)
					}
				}
			]
		}

		function x(a, c, d, e) {
			function f() {
				return c.has ? function(a) {
					return c.has(a) ? c.get(a) : null
				} : function(a) {
					try {
						return c.get(a)
					} catch (b) {
						return null
					}
				}
			}

			function g(a, b) {
				var c = function() {
					return {
						enter: function(a, b, c) {
							b.after(a), c()
						},
						leave: function(a, b) {
							a.remove(), b()
						}
					}
				};
				if (j) return {
					enter: function(a, b, c) {
						var d = j.enter(a, null, b, c);
						d && d.then && d.then(c)
					},
					leave: function(a, b) {
						var c = j.leave(a, b);
						c && c.then && c.then(b)
					}
				};
				if (i) {
					var d = i && i(b, a);
					return {
						enter: function(a, b, c) {
							d.enter(a, null, b), c()
						},
						leave: function(a, b) {
							d.leave(a), b()
						}
					}
				}
				return c()
			}
			var h = f(),
				i = h("$animator"),
				j = h("$animate"),
				k = {
					restrict: "ECA",
					terminal: !0,
					priority: 400,
					transclude: "element",
					compile: function(c, f, h) {
						return function(c, f, i) {
							function j() {
								l && (l.remove(), l = null), n && (n.$destroy(), n = null), m && (r.leave(m, function() {
									l = null
								}), l = m, m = null)
							}

							function k(g) {
								var k, l = z(c, i, f, e),
									s = l && a.$current && a.$current.locals[l];
								if (g || s !== o) {
									k = c.$new(), o = a.$current.locals[l];
									var t = h(k, function(a) {
										r.enter(a, f, function() {
											n && n.$emit("$viewContentAnimationEnded"), (b.isDefined(q) && !q || c.$eval(q)) && d(a)
										}), j()
									});
									m = t, n = k, n.$emit("$viewContentLoaded"), n.$eval(p)
								}
							}
							var l, m, n, o, p = i.onload || "",
								q = i.autoscroll,
								r = g(i, c);
							c.$on("$stateChangeSuccess", function() {
								k(!1)
							}), c.$on("$viewContentLoading", function() {
								k(!1)
							}), k(!0)
						}
					}
				};
			return k
		}

		function y(a, b, c, d) {
			return {
				restrict: "ECA",
				priority: -400,
				compile: function(e) {
					var f = e.html();
					return function(e, g, h) {
						var i = c.$current,
							j = z(e, h, g, d),
							k = i && i.locals[j];
						if (k) {
							g.data("$uiView", {
								name: j,
								state: k.$$state
							}), g.html(k.$template ? k.$template : f);
							var l = a(g.contents());
							if (k.$$controller) {
								k.$scope = e;
								var m = b(k.$$controller, k);
								k.$$controllerAs && (e[k.$$controllerAs] = m), g.data("$ngControllerController", m), g.children().data("$ngControllerController", m)
							}
							l(e)
						}
					}
				}
			}
		}

		function z(a, b, c, d) {
			var e = d(b.uiView || b.name || "")(a),
				f = c.inheritedData("$uiView");
			return e.indexOf("@") >= 0 ? e : e + "@" + (f ? f.state.name : "")
		}

		function A(a, b) {
			var c, d = a.match(/^\s*({[^}]*})\s*$/);
			if (d && (a = b + "(" + d[1] + ")"), c = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !c || 4 !== c.length) throw new Error("Invalid state ref '" + a + "'");
			return {
				state: c[1],
				paramExpr: c[3] || null
			}
		}

		function B(a) {
			var b = a.parent().inheritedData("$uiView");
			return b && b.state && b.state.name ? b.state : void 0
		}

		function C(a, c) {
			var d = ["location", "inherit", "reload"];
			return {
				restrict: "A",
				require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
				link: function(e, f, g, h) {
					var i = A(g.uiSref, a.current.name),
						j = null,
						k = B(f) || a.$current,
						l = null,
						m = "A" === f.prop("tagName"),
						n = "FORM" === f[0].nodeName,
						o = n ? "action" : "href",
						p = !0,
						q = {
							relative: k,
							inherit: !0
						}, r = e.$eval(g.uiSrefOpts) || {};
					b.forEach(d, function(a) {
						a in r && (q[a] = r[a])
					});
					var s = function(c) {
						if (c && (j = b.copy(c)), p) {
							l = a.href(i.state, j, q);
							var d = h[1] || h[0];
							return d && d.$$setStateInfo(i.state, j), null === l ? (p = !1, !1) : void g.$set(o, l)
						}
					};
					i.paramExpr && (e.$watch(i.paramExpr, function(a) {
						a !== j && s(a)
					}, !0), j = b.copy(e.$eval(i.paramExpr))), s(), n || f.bind("click", function(b) {
						var d = b.which || b.button;
						if (!(d > 1 || b.ctrlKey || b.metaKey || b.shiftKey || f.attr("target"))) {
							var e = c(function() {
								a.go(i.state, j, q)
							});
							b.preventDefault();
							var g = m && !l ? 1 : 0;
							b.preventDefault = function() {
								g-- <= 0 && c.cancel(e)
							}
						}
					})
				}
			}
		}

		function D(a, b, c) {
			return {
				restrict: "A",
				controller: ["$scope", "$element", "$attrs",
					function(b, d, e) {
						function f() {
							g() ? d.addClass(j) : d.removeClass(j)
						}

						function g() {
							return "undefined" != typeof e.uiSrefActiveEq ? h && a.is(h.name, i) : h && a.includes(h.name, i)
						}
						var h, i, j;
						j = c(e.uiSrefActiveEq || e.uiSrefActive || "", !1)(b), this.$$setStateInfo = function(b, c) {
							h = a.get(b, B(d)), i = c, f()
						}, b.$on("$stateChangeSuccess", f)
					}
				]
			}
		}

		function E(a) {
			var b = function(b) {
				return a.is(b)
			};
			return b.$stateful = !0, b
		}

		function F(a) {
			var b = function(b) {
				return a.includes(b)
			};
			return b.$stateful = !0, b
		}
		var G = b.isDefined,
			H = b.isFunction,
			I = b.isString,
			J = b.isObject,
			K = b.isArray,
			L = b.forEach,
			M = b.extend,
			N = b.copy;
		b.module("ui.router.util", ["ng"]), b.module("ui.router.router", ["ui.router.util"]), b.module("ui.router.state", ["ui.router.router", "ui.router.util"]), b.module("ui.router", ["ui.router.state"]), b.module("ui.router.compat", ["ui.router"]), o.$inject = ["$q", "$injector"], b.module("ui.router.util").service("$resolve", o), p.$inject = ["$http", "$templateCache", "$injector"], b.module("ui.router.util").service("$templateFactory", p);
		var O;
		q.prototype.concat = function(a, b) {
			var c = {
				caseInsensitive: O.caseInsensitive(),
				strict: O.strictMode(),
				squash: O.defaultSquashPolicy()
			};
			return new q(this.sourcePath + a + this.sourceSearch, M(c, b), this)
		}, q.prototype.toString = function() {
			return this.source
		}, q.prototype.exec = function(a, b) {
			function c(a) {
				function b(a) {
					return a.split("").reverse().join("")
				}

				function c(a) {
					return a.replace(/\\-/, "-")
				}
				var d = b(a).split(/-(?!\\)/),
					e = n(d, b);
				return n(e, c).reverse()
			}
			var d = this.regexp.exec(a);
			if (!d) return null;
			b = b || {};
			var e, f, g, h = this.parameters(),
				i = h.length,
				j = this.segments.length - 1,
				k = {};
			if (j !== d.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
			for (e = 0; j > e; e++) {
				g = h[e];
				var l = this.params[g],
					m = d[e + 1];
				for (f = 0; f < l.replace; f++) l.replace[f].from === m && (m = l.replace[f].to);
				m && l.array === !0 && (m = c(m)), k[g] = l.value(m)
			}
			for (; i > e; e++) g = h[e], k[g] = this.params[g].value(b[g]);
			return k
		}, q.prototype.parameters = function(a) {
			return G(a) ? this.params[a] || null : this.$$paramNames
		}, q.prototype.validates = function(a) {
			return this.params.$$validates(a)
		}, q.prototype.format = function(a) {
			function b(a) {
				return encodeURIComponent(a).replace(/-/g, function(a) {
					return "%5C%" + a.charCodeAt(0).toString(16).toUpperCase()
				})
			}
			a = a || {};
			var c = this.segments,
				d = this.parameters(),
				e = this.params;
			if (!this.validates(a)) return null;
			var f, g = !1,
				h = c.length - 1,
				i = d.length,
				j = c[0];
			for (f = 0; i > f; f++) {
				var k = h > f,
					l = d[f],
					m = e[l],
					o = m.value(a[l]),
					p = m.isOptional && m.type.equals(m.value(), o),
					q = p ? m.squash : !1,
					r = m.type.encode(o);
				if (k) {
					var s = c[f + 1];
					if (q === !1) null != r && (j += K(r) ? n(r, b).join("-") : encodeURIComponent(r)), j += s;
					else if (q === !0) {
						var t = j.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
						j += s.match(t)[1]
					} else I(q) && (j += q + s)
				} else {
					if (null == r || p && q !== !1) continue;
					K(r) || (r = [r]), r = n(r, encodeURIComponent).join("&" + l + "="), j += (g ? "&" : "?") + (l + "=" + r), g = !0
				}
			}
			return j
		}, r.prototype.is = function() {
			return !0
		}, r.prototype.encode = function(a) {
			return a
		}, r.prototype.decode = function(a) {
			return a
		}, r.prototype.equals = function(a, b) {
			return a == b
		}, r.prototype.$subPattern = function() {
			var a = this.pattern.toString();
			return a.substr(1, a.length - 2)
		}, r.prototype.pattern = /.*/, r.prototype.toString = function() {
			return "{Type:" + this.name + "}"
		}, r.prototype.$asArray = function(a, b) {
			function d(a, b) {
				function d(a, b) {
					return function() {
						return a[b].apply(a, arguments)
					}
				}

				function e(a) {
					return K(a) ? a : G(a) ? [a] : []
				}

				function f(a) {
					switch (a.length) {
						case 0:
							return c;
						case 1:
							return "auto" === b ? a[0] : a;
						default:
							return a
					}
				}

				function g(a) {
					return !a
				}

				function h(a, b) {
					return function(c) {
						c = e(c);
						var d = n(c, a);
						return b === !0 ? 0 === m(d, g).length : f(d)
					}
				}

				function i(a) {
					return function(b, c) {
						var d = e(b),
							f = e(c);
						if (d.length !== f.length) return !1;
						for (var g = 0; g < d.length; g++)
							if (!a(d[g], f[g])) return !1;
						return !0
					}
				}
				this.encode = h(d(a, "encode")), this.decode = h(d(a, "decode")), this.is = h(d(a, "is"), !0), this.equals = i(d(a, "equals")), this.pattern = a.pattern, this.$arrayMode = b
			}
			if (!a) return this;
			if ("auto" === a && !b) throw new Error("'auto' array mode is for query parameters only");
			return new d(this, a)
		}, b.module("ui.router.util").provider("$urlMatcherFactory", s), b.module("ui.router.util").run(["$urlMatcherFactory",
			function() {}
		]), t.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.router").provider("$urlRouter", t),
		u.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.state").value("$stateParams", {}).provider("$state", u), v.$inject = [], b.module("ui.router.state").provider("$view", v), b.module("ui.router.state").provider("$uiViewScroll", w), x.$inject = ["$state", "$injector", "$uiViewScroll", "$interpolate"], y.$inject = ["$compile", "$controller", "$state", "$interpolate"], b.module("ui.router.state").directive("uiView", x), b.module("ui.router.state").directive("uiView", y), C.$inject = ["$state", "$timeout"], D.$inject = ["$state", "$stateParams", "$interpolate"], b.module("ui.router.state").directive("uiSref", C).directive("uiSrefActive", D).directive("uiSrefActiveEq", D), E.$inject = ["$state"], F.$inject = ["$state"], b.module("ui.router.state").filter("isState", E).filter("includedByState", F)
	}(window, window.angular), d("angular-ui-router", ["angular"], function() {}),
	function() {
		function a(a, b, c) {
			c = (c || 0) - 1;
			for (var d = a ? a.length : 0; ++c < d;)
				if (a[c] === b) return c;
			return -1
		}

		function b(b, c) {
			var d = typeof c;
			if (b = b.l, "boolean" == d || null == c) return b[c] ? 0 : -1;
			"number" != d && "string" != d && (d = "object");
			var e = "number" == d ? c : s + c;
			return b = (b = b[d]) && b[e], "object" == d ? b && -1 < a(b, c) ? 0 : -1 : b ? 0 : -1
		}

		function c(a) {
			var b = this.l,
				c = typeof a;
			if ("boolean" == c || null == a) b[a] = !0;
			else {
				"number" != c && "string" != c && (c = "object");
				var d = "number" == c ? a : s + a,
					b = b[c] || (b[c] = {});
				"object" == c ? (b[d] || (b[d] = [])).push(a) : b[d] = !0
			}
		}

		function e(a) {
			return a.charCodeAt(0)
		}

		function f(a, b) {
			for (var c = a.m, d = b.m, e = -1, f = c.length; ++e < f;) {
				var g = c[e],
					h = d[e];
				if (g !== h) {
					if (g > h || "undefined" == typeof g) return 1;
					if (h > g || "undefined" == typeof h) return -1
				}
			}
			return a.n - b.n
		}

		function g(a) {
			var b = -1,
				d = a.length,
				e = a[0],
				f = a[d / 2 | 0],
				g = a[d - 1];
			if (e && "object" == typeof e && f && "object" == typeof f && g && "object" == typeof g) return !1;
			for (e = j(), e["false"] = e["null"] = e["true"] = e.undefined = !1, f = j(), f.k = a, f.l = e, f.push = c; ++b < d;) f.push(a[b]);
			return f
		}

		function h(a) {
			return "\\" + V[a]
		}

		function i() {
			return p.pop() || []
		}

		function j() {
			return q.pop() || {
				k: null,
				l: null,
				m: null,
				"false": !1,
				n: 0,
				"null": !1,
				number: null,
				object: null,
				push: null,
				string: null,
				"true": !1,
				undefined: !1,
				o: null
			}
		}

		function k(a) {
			a.length = 0, p.length < u && p.push(a)
		}

		function l(a) {
			var b = a.l;
			b && l(b), a.k = a.l = a.m = a.object = a.number = a.string = a.o = null, q.length < u && q.push(a)
		}

		function m(a, b, c) {
			b || (b = 0), "undefined" == typeof c && (c = a ? a.length : 0);
			var d = -1;
			c = c - b || 0;
			for (var e = Array(0 > c ? 0 : c); ++d < c;) e[d] = a[b + d];
			return e
		}

		function n(c) {
			function d(a, b, c) {
				if (!a || !U[typeof a]) return a;
				b = b && "undefined" == typeof c ? b : ba(b, c, 3);
				for (var d = -1, e = U[typeof a] && Kb(a), f = e ? e.length : 0; ++d < f && (c = e[d], !1 !== b(a[c], c, a)););
				return a
			}

			function p(a, b, c) {
				var d;
				if (!a || !U[typeof a]) return a;
				b = b && "undefined" == typeof c ? b : ba(b, c, 3);
				for (d in a)
					if (!1 === b(a[d], d, a)) break;
				return a
			}

			function q(a, b, c) {
				var d, e = a,
					f = e;
				if (!e) return f;
				for (var g = arguments, h = 0, i = "number" == typeof c ? 2 : g.length; ++h < i;)
					if ((e = g[h]) && U[typeof e])
						for (var j = -1, k = U[typeof e] && Kb(e), l = k ? k.length : 0; ++j < l;) d = k[j], "undefined" == typeof f[d] && (f[d] = e[d]);
				return f
			}

			function u(a, b, c) {
				var d, e = a,
					f = e;
				if (!e) return f;
				var g = arguments,
					h = 0,
					i = "number" == typeof c ? 2 : g.length;
				if (i > 3 && "function" == typeof g[i - 2]) var j = ba(g[--i - 1], g[i--], 2);
				else i > 2 && "function" == typeof g[i - 1] && (j = g[--i]);
				for (; ++h < i;)
					if ((e = g[h]) && U[typeof e])
						for (var k = -1, l = U[typeof e] && Kb(e), m = l ? l.length : 0; ++k < m;) d = l[k], f[d] = j ? j(f[d], e[d]) : e[d];
				return f
			}

			function V(a) {
				var b, c = [];
				if (!a || !U[typeof a]) return c;
				for (b in a) rb.call(a, b) && c.push(b);
				return c
			}

			function X(a) {
				return a && "object" == typeof a && !Jb(a) && rb.call(a, "__wrapped__") ? a : new Y(a)
			}

			function Y(a, b) {
				this.__chain__ = !! b, this.__wrapped__ = a
			}

			function Z(a) {
				function b() {
					if (d) {
						var a = m(d);
						sb.apply(a, arguments)
					}
					if (this instanceof b) {
						var f = aa(c.prototype),
							a = c.apply(f, a || arguments);
						return va(a) ? a : f
					}
					return c.apply(e, a || arguments)
				}
				var c = a[0],
					d = a[2],
					e = a[4];
				return Ib(b, a), b
			}

			function $(a, b, c, e, f) {
				if (c) {
					var g = c(a);
					if ("undefined" != typeof g) return g
				}
				if (!va(a)) return a;
				var h = kb.call(a);
				if (!R[h]) return a;
				var j = Gb[h];
				switch (h) {
					case K:
					case L:
						return new j(+a);
					case N:
					case Q:
						return new j(a);
					case P:
						return g = j(a.source, A.exec(a)), g.lastIndex = a.lastIndex, g
				}
				if (h = Jb(a), b) {
					var l = !e;
					e || (e = i()), f || (f = i());
					for (var n = e.length; n--;)
						if (e[n] == a) return f[n];
					g = h ? j(a.length) : {}
				} else g = h ? m(a) : u({}, a);
				return h && (rb.call(a, "index") && (g.index = a.index), rb.call(a, "input") && (g.input = a.input)), b ? (e.push(a), f.push(g), (h ? Da : d)(a, function(a, d) {
					g[d] = $(a, b, c, e, f)
				}), l && (k(e), k(f)), g) : g
			}

			function aa(a) {
				return va(a) ? xb(a) : {}
			}

			function ba(a, b, c) {
				if ("function" != typeof a) return Ua;
				if ("undefined" == typeof b || !("prototype" in a)) return a;
				var d = a.__bindData__;
				if ("undefined" == typeof d && (Hb.funcNames && (d = !a.name), d = d || !Hb.funcDecomp, !d)) {
					var e = pb.call(a);
					Hb.funcNames || (d = !B.test(e)), d || (d = F.test(e), Ib(a, d))
				}
				if (!1 === d || !0 !== d && 1 & d[1]) return a;
				switch (c) {
					case 1:
						return function(c) {
							return a.call(b, c)
						};
					case 2:
						return function(c, d) {
							return a.call(b, c, d)
						};
					case 3:
						return function(c, d, e) {
							return a.call(b, c, d, e)
						};
					case 4:
						return function(c, d, e, f) {
							return a.call(b, c, d, e, f)
						}
				}
				return Sa(a, b)
			}

			function ca(a) {
				function b() {
					var a = i ? g : this;
					if (e) {
						var o = m(e);
						sb.apply(o, arguments)
					}
					return (f || k) && (o || (o = m(arguments)), f && sb.apply(o, f), k && o.length < h) ? (d |= 16, ca([c, l ? d : -4 & d, o, null, g, h])) : (o || (o = arguments), j && (c = a[n]), this instanceof b ? (a = aa(c.prototype), o = c.apply(a, o), va(o) ? o : a) : c.apply(a, o))
				}
				var c = a[0],
					d = a[1],
					e = a[2],
					f = a[3],
					g = a[4],
					h = a[5],
					i = 1 & d,
					j = 2 & d,
					k = 4 & d,
					l = 8 & d,
					n = c;
				return Ib(b, a), b
			}

			function da(c, d) {
				var e = -1,
					f = ma(),
					h = c ? c.length : 0,
					i = h >= t && f === a,
					j = [];
				if (i) {
					var k = g(d);
					k ? (f = b, d = k) : i = !1
				}
				for (; ++e < h;) k = c[e], 0 > f(d, k) && j.push(k);
				return i && l(d), j
			}

			function ea(a, b, c, d) {
				d = (d || 0) - 1;
				for (var e = a ? a.length : 0, f = []; ++d < e;) {
					var g = a[d];
					if (g && "object" == typeof g && "number" == typeof g.length && (Jb(g) || qa(g))) {
						b || (g = ea(g, b, c));
						var h = -1,
							i = g.length,
							j = f.length;
						for (f.length += i; ++h < i;) f[j++] = g[h]
					} else c || f.push(g)
				}
				return f
			}

			function fa(a, b, c, d, e, f) {
				if (c) {
					var g = c(a, b);
					if ("undefined" != typeof g) return !!g
				}
				if (a === b) return 0 !== a || 1 / a == 1 / b;
				if (a === a && !(a && U[typeof a] || b && U[typeof b])) return !1;
				if (null == a || null == b) return a === b;
				var h = kb.call(a),
					j = kb.call(b);
				if (h == I && (h = O), j == I && (j = O), h != j) return !1;
				switch (h) {
					case K:
					case L:
						return +a == +b;
					case N:
						return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
					case P:
					case Q:
						return a == fb(b)
				}
				if (j = h == J, !j) {
					var l = rb.call(a, "__wrapped__"),
						m = rb.call(b, "__wrapped__");
					if (l || m) return fa(l ? a.__wrapped__ : a, m ? b.__wrapped__ : b, c, d, e, f);
					if (h != O) return !1;
					if (h = a.constructor, l = b.constructor, h != l && !(ua(h) && h instanceof h && ua(l) && l instanceof l) && "constructor" in a && "constructor" in b) return !1
				}
				for (h = !e, e || (e = i()), f || (f = i()), l = e.length; l--;)
					if (e[l] == a) return f[l] == b;
				var n = 0,
					g = !0;
				if (e.push(a), f.push(b), j) {
					if (l = a.length, n = b.length, (g = n == l) || d)
						for (; n--;)
							if (j = l, m = b[n], d)
								for (; j-- && !(g = fa(a[j], m, c, d, e, f)););
							else
					if (!(g = fa(a[n], m, c, d, e, f))) break
				} else p(b, function(b, h, i) {
					return rb.call(i, h) ? (n++, g = rb.call(a, h) && fa(a[h], b, c, d, e, f)) : void 0
				}), g && !d && p(a, function(a, b, c) {
					return rb.call(c, b) ? g = -1 < --n : void 0
				});
				return e.pop(), f.pop(), h && (k(e), k(f)), g
			}

			function ga(a, b, c, e, f) {
				(Jb(b) ? Da : d)(b, function(b, d) {
					var g, h, i = b,
						j = a[d];
					if (b && ((h = Jb(b)) || Pb(b))) {
						for (i = e.length; i--;)
							if (g = e[i] == b) {
								j = f[i];
								break
							}
						if (!g) {
							var k;
							c && (i = c(j, b), k = "undefined" != typeof i) && (j = i), k || (j = h ? Jb(j) ? j : [] : Pb(j) ? j : {}), e.push(b), f.push(j), k || ga(j, b, c, e, f)
						}
					} else c && (i = c(j, b), "undefined" == typeof i && (i = b)), "undefined" != typeof i && (j = i);
					a[d] = j
				})
			}

			function ha(a, b) {
				return a + ob(Fb() * (b - a + 1))
			}

			function ia(c, d, e) {
				var f = -1,
					h = ma(),
					j = c ? c.length : 0,
					m = [],
					n = !d && j >= t && h === a,
					o = e || n ? i() : m;
				for (n && (o = g(o), h = b); ++f < j;) {
					var p = c[f],
						q = e ? e(p, f, c) : p;
					(d ? !f || o[o.length - 1] !== q : 0 > h(o, q)) && ((e || n) && o.push(q), m.push(p))
				}
				return n ? (k(o.k), l(o)) : e && k(o), m
			}

			function ja(a) {
				return function(b, c, e) {
					var f = {};
					c = X.createCallback(c, e, 3), e = -1;
					var g = b ? b.length : 0;
					if ("number" == typeof g)
						for (; ++e < g;) {
							var h = b[e];
							a(f, h, c(h, e, b), b)
						} else d(b, function(b, d, e) {
							a(f, b, c(b, d, e), e)
						});
					return f
				}
			}

			function ka(a, b, c, d, e, f) {
				var g = 1 & b,
					h = 4 & b,
					i = 16 & b,
					j = 32 & b;
				if (!(2 & b || ua(a))) throw new gb;
				i && !c.length && (b &= -17, i = c = !1), j && !d.length && (b &= -33, j = d = !1);
				var k = a && a.__bindData__;
				return k && !0 !== k ? (k = m(k), k[2] && (k[2] = m(k[2])), k[3] && (k[3] = m(k[3])), !g || 1 & k[1] || (k[4] = e), !g && 1 & k[1] && (b |= 8), !h || 4 & k[1] || (k[5] = f), i && sb.apply(k[2] || (k[2] = []), c), j && vb.apply(k[3] || (k[3] = []), d), k[1] |= b, ka.apply(null, k)) : (1 == b || 17 === b ? Z : ca)([a, b, c, d, e, f])
			}

			function la(a) {
				return Lb[a]
			}

			function ma() {
				var b = (b = X.indexOf) === Ma ? a : b;
				return b
			}

			function na(a) {
				return "function" == typeof a && lb.test(a)
			}

			function oa(a) {
				var b, c;
				return a && kb.call(a) == O && (b = a.constructor, !ua(b) || b instanceof b) ? (p(a, function(a, b) {
					c = b
				}), "undefined" == typeof c || rb.call(a, c)) : !1
			}

			function pa(a) {
				return Mb[a]
			}

			function qa(a) {
				return a && "object" == typeof a && "number" == typeof a.length && kb.call(a) == I || !1
			}

			function ra(a, b, c) {
				var d = Kb(a),
					e = d.length;
				for (b = ba(b, c, 3); e-- && (c = d[e], !1 !== b(a[c], c, a)););
				return a
			}

			function sa(a) {
				var b = [];
				return p(a, function(a, c) {
					ua(a) && b.push(c)
				}), b.sort()
			}

			function ta(a) {
				for (var b = -1, c = Kb(a), d = c.length, e = {}; ++b < d;) {
					var f = c[b];
					e[a[f]] = f
				}
				return e
			}

			function ua(a) {
				return "function" == typeof a
			}

			function va(a) {
				return !(!a || !U[typeof a])
			}

			function wa(a) {
				return "number" == typeof a || a && "object" == typeof a && kb.call(a) == N || !1
			}

			function xa(a) {
				return "string" == typeof a || a && "object" == typeof a && kb.call(a) == Q || !1
			}

			function ya(a) {
				for (var b = -1, c = Kb(a), d = c.length, e = Za(d); ++b < d;) e[b] = a[c[b]];
				return e
			}

			function za(a, b, c) {
				var e = -1,
					f = ma(),
					g = a ? a.length : 0,
					h = !1;
				return c = (0 > c ? Cb(0, g + c) : c) || 0, Jb(a) ? h = -1 < f(a, b, c) : "number" == typeof g ? h = -1 < (xa(a) ? a.indexOf(b, c) : f(a, b, c)) : d(a, function(a) {
					return ++e < c ? void 0 : !(h = a === b)
				}), h
			}

			function Aa(a, b, c) {
				var e = !0;
				b = X.createCallback(b, c, 3), c = -1;
				var f = a ? a.length : 0;
				if ("number" == typeof f)
					for (; ++c < f && (e = !! b(a[c], c, a)););
				else d(a, function(a, c, d) {
					return e = !! b(a, c, d)
				});
				return e
			}

			function Ba(a, b, c) {
				var e = [];
				b = X.createCallback(b, c, 3), c = -1;
				var f = a ? a.length : 0;
				if ("number" == typeof f)
					for (; ++c < f;) {
						var g = a[c];
						b(g, c, a) && e.push(g)
					} else d(a, function(a, c, d) {
						b(a, c, d) && e.push(a)
					});
				return e
			}

			function Ca(a, b, c) {
				b = X.createCallback(b, c, 3), c = -1;
				var e = a ? a.length : 0;
				if ("number" != typeof e) {
					var f;
					return d(a, function(a, c, d) {
						return b(a, c, d) ? (f = a, !1) : void 0
					}), f
				}
				for (; ++c < e;) {
					var g = a[c];
					if (b(g, c, a)) return g
				}
			}

			function Da(a, b, c) {
				var e = -1,
					f = a ? a.length : 0;
				if (b = b && "undefined" == typeof c ? b : ba(b, c, 3), "number" == typeof f)
					for (; ++e < f && !1 !== b(a[e], e, a););
				else d(a, b);
				return a
			}

			function Ea(a, b, c) {
				var e = a ? a.length : 0;
				if (b = b && "undefined" == typeof c ? b : ba(b, c, 3), "number" == typeof e)
					for (; e-- && !1 !== b(a[e], e, a););
				else {
					var f = Kb(a),
						e = f.length;
					d(a, function(a, c, d) {
						return c = f ? f[--e] : --e, b(d[c], c, d)
					})
				}
				return a
			}

			function Fa(a, b, c) {
				var e = -1,
					f = a ? a.length : 0;
				if (b = X.createCallback(b, c, 3), "number" == typeof f)
					for (var g = Za(f); ++e < f;) g[e] = b(a[e], e, a);
				else g = [], d(a, function(a, c, d) {
					g[++e] = b(a, c, d)
				});
				return g
			}

			function Ga(a, b, c) {
				var d = -1 / 0,
					f = d;
				if ("function" != typeof b && c && c[b] === a && (b = null), null == b && Jb(a)) {
					c = -1;
					for (var g = a.length; ++c < g;) {
						var h = a[c];
						h > f && (f = h)
					}
				} else b = null == b && xa(a) ? e : X.createCallback(b, c, 3), Da(a, function(a, c, e) {
					c = b(a, c, e), c > d && (d = c, f = a)
				});
				return f
			}

			function Ha(a, b, c, e) {
				if (!a) return c;
				var f = 3 > arguments.length;
				b = X.createCallback(b, e, 4);
				var g = -1,
					h = a.length;
				if ("number" == typeof h)
					for (f && (c = a[++g]); ++g < h;) c = b(c, a[g], g, a);
				else d(a, function(a, d, e) {
					c = f ? (f = !1, a) : b(c, a, d, e)
				});
				return c
			}

			function Ia(a, b, c, d) {
				var e = 3 > arguments.length;
				return b = X.createCallback(b, d, 4), Ea(a, function(a, d, f) {
					c = e ? (e = !1, a) : b(c, a, d, f)
				}), c
			}

			function Ja(a) {
				var b = -1,
					c = a ? a.length : 0,
					d = Za("number" == typeof c ? c : 0);
				return Da(a, function(a) {
					var c = ha(0, ++b);
					d[b] = d[c], d[c] = a
				}), d
			}

			function Ka(a, b, c) {
				var e;
				b = X.createCallback(b, c, 3), c = -1;
				var f = a ? a.length : 0;
				if ("number" == typeof f)
					for (; ++c < f && !(e = b(a[c], c, a)););
				else d(a, function(a, c, d) {
					return !(e = b(a, c, d))
				});
				return !!e
			}

			function La(a, b, c) {
				var d = 0,
					e = a ? a.length : 0;
				if ("number" != typeof b && null != b) {
					var f = -1;
					for (b = X.createCallback(b, c, 3); ++f < e && b(a[f], f, a);) d++
				} else if (d = b, null == d || c) return a ? a[0] : o;
				return m(a, 0, Db(Cb(0, d), e))
			}

			function Ma(b, c, d) {
				if ("number" == typeof d) {
					var e = b ? b.length : 0;
					d = 0 > d ? Cb(0, e + d) : d || 0
				} else if (d) return d = Oa(b, c), b[d] === c ? d : -1;
				return a(b, c, d)
			}

			function Na(a, b, c) {
				if ("number" != typeof b && null != b) {
					var d = 0,
						e = -1,
						f = a ? a.length : 0;
					for (b = X.createCallback(b, c, 3); ++e < f && b(a[e], e, a);) d++
				} else d = null == b || c ? 1 : Cb(0, b);
				return m(a, d)
			}

			function Oa(a, b, c, d) {
				var e = 0,
					f = a ? a.length : e;
				for (c = c ? X.createCallback(c, d, 1) : Ua, b = c(b); f > e;) d = e + f >>> 1, c(a[d]) < b ? e = d + 1 : f = d;
				return e
			}

			function Pa(a, b, c, d) {
				return "boolean" != typeof b && null != b && (d = c, c = "function" != typeof b && d && d[b] === a ? null : b, b = !1), null != c && (c = X.createCallback(c, d, 3)), ia(a, b, c)
			}

			function Qa() {
				for (var a = 1 < arguments.length ? arguments : arguments[0], b = -1, c = a ? Ga(Tb(a, "length")) : 0, d = Za(0 > c ? 0 : c); ++b < c;) d[b] = Tb(a, b);
				return d
			}

			function Ra(a, b) {
				var c = -1,
					d = a ? a.length : 0,
					e = {};
				for (b || !d || Jb(a[0]) || (b = []); ++c < d;) {
					var f = a[c];
					b ? e[f] = b[c] : f && (e[f[0]] = f[1])
				}
				return e
			}

			function Sa(a, b) {
				return 2 < arguments.length ? ka(a, 17, m(arguments, 2), null, b) : ka(a, 1, null, null, b)
			}

			function Ta(a, b, c) {
				function d() {
					k && nb(k), g = k = l = o, (p || n !== b) && (m = Ub(), h = a.apply(j, f), k || g || (f = j = null))
				}

				function e() {
					var c = b - (Ub() - i);
					c > 0 ? k = tb(e, c) : (g && nb(g), c = l, g = k = l = o, c && (m = Ub(), h = a.apply(j, f), k || g || (f = j = null)))
				}
				var f, g, h, i, j, k, l, m = 0,
					n = !1,
					p = !0;
				if (!ua(a)) throw new gb;
				if (b = Cb(0, b) || 0, !0 === c) var q = !0,
				p = !1;
				else va(c) && (q = c.leading, n = "maxWait" in c && (Cb(b, c.maxWait) || 0), p = "trailing" in c ? c.trailing : p);
				return function() {
					if (f = arguments, i = Ub(), j = this, l = p && (k || !q), !1 === n) var c = q && !k;
					else {
						g || q || (m = i);
						var o = n - (i - m),
							r = 0 >= o;
						r ? (g && (g = nb(g)), m = i, h = a.apply(j, f)) : g || (g = tb(d, o))
					}
					return r && k ? k = nb(k) : k || b === n || (k = tb(e, b)), c && (r = !0, h = a.apply(j, f)), !r || k || g || (f = j = null), h
				}
			}

			function Ua(a) {
				return a
			}

			function Va(a, b, c) {
				var d = !0,
					e = b && sa(b);
				b && (c || e.length) || (null == c && (c = b), f = Y, b = a, a = X, e = sa(b)), !1 === c ? d = !1 : va(c) && "chain" in c && (d = c.chain);
				var f = a,
					g = ua(f);
				Da(e, function(c) {
					var e = a[c] = b[c];
					g && (f.prototype[c] = function() {
						var b = this.__chain__,
							c = this.__wrapped__,
							g = [c];
						if (sb.apply(g, arguments), g = e.apply(a, g), d || b) {
							if (c === g && va(g)) return this;
							g = new f(g), g.__chain__ = b
						}
						return g
					})
				})
			}

			function Wa() {}

			function Xa(a) {
				return function(b) {
					return b[a]
				}
			}

			function Ya() {
				return this.__wrapped__
			}
			c = c ? _.defaults(W.Object(), c, _.pick(W, H)) : W;
			var Za = c.Array,
				$a = c.Boolean,
				_a = c.Date,
				ab = c.Function,
				bb = c.Math,
				cb = c.Number,
				db = c.Object,
				eb = c.RegExp,
				fb = c.String,
				gb = c.TypeError,
				hb = [],
				ib = db.prototype,
				jb = c._,
				kb = ib.toString,
				lb = eb("^" + fb(kb).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
				mb = bb.ceil,
				nb = c.clearTimeout,
				ob = bb.floor,
				pb = ab.prototype.toString,
				qb = na(qb = db.getPrototypeOf) && qb,
				rb = ib.hasOwnProperty,
				sb = hb.push,
				tb = c.setTimeout,
				ub = hb.splice,
				vb = hb.unshift,
				wb = function() {
					try {
						var a = {}, b = na(b = db.defineProperty) && b,
							c = b(a, a, a) && b
					} catch (d) {}
					return c
				}(),
				xb = na(xb = db.create) && xb,
				yb = na(yb = Za.isArray) && yb,
				zb = c.isFinite,
				Ab = c.isNaN,
				Bb = na(Bb = db.keys) && Bb,
				Cb = bb.max,
				Db = bb.min,
				Eb = c.parseInt,
				Fb = bb.random,
				Gb = {};
			Gb[J] = Za, Gb[K] = $a, Gb[L] = _a, Gb[M] = ab, Gb[O] = db, Gb[N] = cb, Gb[P] = eb, Gb[Q] = fb, Y.prototype = X.prototype;
			var Hb = X.support = {};
			Hb.funcDecomp = !na(c.a) && F.test(n), Hb.funcNames = "string" == typeof ab.name, X.templateSettings = {
				escape: /<%-([\s\S]+?)%>/g,
				evaluate: /<%([\s\S]+?)%>/g,
				interpolate: C,
				variable: "",
				imports: {
					_: X
				}
			}, xb || (aa = function() {
				function a() {}
				return function(b) {
					if (va(b)) {
						a.prototype = b;
						var d = new a;
						a.prototype = null
					}
					return d || c.Object()
				}
			}());
			var Ib = wb ? function(a, b) {
					T.value = b, wb(a, "__bindData__", T)
				} : Wa,
				Jb = yb || function(a) {
					return a && "object" == typeof a && "number" == typeof a.length && kb.call(a) == J || !1
				}, Kb = Bb ? function(a) {
					return va(a) ? Bb(a) : []
				} : V,
				Lb = {
					"&": "&amp;",
					"<": "&lt;",
					">": "&gt;",
					'"': "&quot;",
					"'": "&#39;"
				}, Mb = ta(Lb),
				Nb = eb("(" + Kb(Mb).join("|") + ")", "g"),
				Ob = eb("[" + Kb(Lb).join("") + "]", "g"),
				Pb = qb ? function(a) {
					if (!a || kb.call(a) != O) return !1;
					var b = a.valueOf,
						c = na(b) && (c = qb(b)) && qb(c);
					return c ? a == c || qb(a) == c : oa(a)
				} : oa,
				Qb = ja(function(a, b, c) {
					rb.call(a, c) ? a[c]++ : a[c] = 1
				}),
				Rb = ja(function(a, b, c) {
					(rb.call(a, c) ? a[c] : a[c] = []).push(b)
				}),
				Sb = ja(function(a, b, c) {
					a[c] = b
				}),
				Tb = Fa,
				Ub = na(Ub = _a.now) && Ub || function() {
					return (new _a).getTime()
				}, Vb = 8 == Eb(v + "08") ? Eb : function(a, b) {
					return Eb(xa(a) ? a.replace(D, "") : a, b || 0)
				};
			return X.after = function(a, b) {
				if (!ua(b)) throw new gb;
				return function() {
					return 1 > --a ? b.apply(this, arguments) : void 0
				}
			}, X.assign = u, X.at = function(a) {
				for (var b = arguments, c = -1, d = ea(b, !0, !1, 1), b = b[2] && b[2][b[1]] === a ? 1 : d.length, e = Za(b); ++c < b;) e[c] = a[d[c]];
				return e
			}, X.bind = Sa, X.bindAll = function(a) {
				for (var b = 1 < arguments.length ? ea(arguments, !0, !1, 1) : sa(a), c = -1, d = b.length; ++c < d;) {
					var e = b[c];
					a[e] = ka(a[e], 1, null, null, a)
				}
				return a
			}, X.bindKey = function(a, b) {
				return 2 < arguments.length ? ka(b, 19, m(arguments, 2), null, a) : ka(b, 3, null, null, a)
			}, X.chain = function(a) {
				return a = new Y(a), a.__chain__ = !0, a
			}, X.compact = function(a) {
				for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
					var e = a[b];
					e && d.push(e)
				}
				return d
			}, X.compose = function() {
				for (var a = arguments, b = a.length; b--;)
					if (!ua(a[b])) throw new gb;
				return function() {
					for (var b = arguments, c = a.length; c--;) b = [a[c].apply(this, b)];
					return b[0]
				}
			}, X.constant = function(a) {
				return function() {
					return a
				}
			}, X.countBy = Qb, X.create = function(a, b) {
				var c = aa(a);
				return b ? u(c, b) : c
			}, X.createCallback = function(a, b, c) {
				var d = typeof a;
				if (null == a || "function" == d) return ba(a, b, c);
				if ("object" != d) return Xa(a);
				var e = Kb(a),
					f = e[0],
					g = a[f];
				return 1 != e.length || g !== g || va(g) ? function(b) {
					for (var c = e.length, d = !1; c-- && (d = fa(b[e[c]], a[e[c]], null, !0)););
					return d
				} : function(a) {
					return a = a[f], g === a && (0 !== g || 1 / g == 1 / a)
				}
			}, X.curry = function(a, b) {
				return b = "number" == typeof b ? b : +b || a.length, ka(a, 4, null, null, null, b)
			}, X.debounce = Ta, X.defaults = q, X.defer = function(a) {
				if (!ua(a)) throw new gb;
				var b = m(arguments, 1);
				return tb(function() {
					a.apply(o, b)
				}, 1)
			}, X.delay = function(a, b) {
				if (!ua(a)) throw new gb;
				var c = m(arguments, 2);
				return tb(function() {
					a.apply(o, c)
				}, b)
			}, X.difference = function(a) {
				return da(a, ea(arguments, !0, !0, 1))
			}, X.filter = Ba, X.flatten = function(a, b, c, d) {
				return "boolean" != typeof b && null != b && (d = c, c = "function" != typeof b && d && d[b] === a ? null : b, b = !1), null != c && (a = Fa(a, c, d)), ea(a, b)
			}, X.forEach = Da, X.forEachRight = Ea, X.forIn = p, X.forInRight = function(a, b, c) {
				var d = [];
				p(a, function(a, b) {
					d.push(b, a)
				});
				var e = d.length;
				for (b = ba(b, c, 3); e-- && !1 !== b(d[e--], d[e], a););
				return a
			}, X.forOwn = d, X.forOwnRight = ra, X.functions = sa, X.groupBy = Rb, X.indexBy = Sb, X.initial = function(a, b, c) {
				var d = 0,
					e = a ? a.length : 0;
				if ("number" != typeof b && null != b) {
					var f = e;
					for (b = X.createCallback(b, c, 3); f-- && b(a[f], f, a);) d++
				} else d = null == b || c ? 1 : b || d;
				return m(a, 0, Db(Cb(0, e - d), e))
			}, X.intersection = function() {
				for (var c = [], d = -1, e = arguments.length, f = i(), h = ma(), j = h === a, m = i(); ++d < e;) {
					var n = arguments[d];
					(Jb(n) || qa(n)) && (c.push(n), f.push(j && n.length >= t && g(d ? c[d] : m)))
				}
				var j = c[0],
					o = -1,
					p = j ? j.length : 0,
					q = [];
				a: for (; ++o < p;) {
					var r = f[0],
						n = j[o];
					if (0 > (r ? b(r, n) : h(m, n))) {
						for (d = e, (r || m).push(n); --d;)
							if (r = f[d], 0 > (r ? b(r, n) : h(c[d], n))) continue a;
						q.push(n)
					}
				}
				for (; e--;)(r = f[e]) && l(r);
				return k(f), k(m), q
			}, X.invert = ta, X.invoke = function(a, b) {
				var c = m(arguments, 2),
					d = -1,
					e = "function" == typeof b,
					f = a ? a.length : 0,
					g = Za("number" == typeof f ? f : 0);
				return Da(a, function(a) {
					g[++d] = (e ? b : a[b]).apply(a, c)
				}), g
			}, X.keys = Kb, X.map = Fa, X.mapValues = function(a, b, c) {
				var e = {};
				return b = X.createCallback(b, c, 3), d(a, function(a, c, d) {
					e[c] = b(a, c, d)
				}), e
			}, X.max = Ga, X.memoize = function(a, b) {
				function c() {
					var d = c.cache,
						e = b ? b.apply(this, arguments) : s + arguments[0];
					return rb.call(d, e) ? d[e] : d[e] = a.apply(this, arguments)
				}
				if (!ua(a)) throw new gb;
				return c.cache = {}, c
			}, X.merge = function(a) {
				var b = arguments,
					c = 2;
				if (!va(a)) return a;
				if ("number" != typeof b[2] && (c = b.length), c > 3 && "function" == typeof b[c - 2]) var d = ba(b[--c - 1], b[c--], 2);
				else c > 2 && "function" == typeof b[c - 1] && (d = b[--c]);
				for (var b = m(arguments, 1, c), e = -1, f = i(), g = i(); ++e < c;) ga(a, b[e], d, f, g);
				return k(f), k(g), a
			}, X.min = function(a, b, c) {
				var d = 1 / 0,
					f = d;
				if ("function" != typeof b && c && c[b] === a && (b = null), null == b && Jb(a)) {
					c = -1;
					for (var g = a.length; ++c < g;) {
						var h = a[c];
						f > h && (f = h)
					}
				} else b = null == b && xa(a) ? e : X.createCallback(b, c, 3), Da(a, function(a, c, e) {
					c = b(a, c, e), d > c && (d = c, f = a)
				});
				return f
			}, X.omit = function(a, b, c) {
				var d = {};
				if ("function" != typeof b) {
					var e = [];
					p(a, function(a, b) {
						e.push(b)
					});
					for (var e = da(e, ea(arguments, !0, !1, 1)), f = -1, g = e.length; ++f < g;) {
						var h = e[f];
						d[h] = a[h]
					}
				} else b = X.createCallback(b, c, 3), p(a, function(a, c, e) {
					b(a, c, e) || (d[c] = a)
				});
				return d
			}, X.once = function(a) {
				var b, c;
				if (!ua(a)) throw new gb;
				return function() {
					return b ? c : (b = !0, c = a.apply(this, arguments), a = null, c)
				}
			}, X.pairs = function(a) {
				for (var b = -1, c = Kb(a), d = c.length, e = Za(d); ++b < d;) {
					var f = c[b];
					e[b] = [f, a[f]]
				}
				return e
			}, X.partial = function(a) {
				return ka(a, 16, m(arguments, 1))
			}, X.partialRight = function(a) {
				return ka(a, 32, null, m(arguments, 1))
			}, X.pick = function(a, b, c) {
				var d = {};
				if ("function" != typeof b)
					for (var e = -1, f = ea(arguments, !0, !1, 1), g = va(a) ? f.length : 0; ++e < g;) {
						var h = f[e];
						h in a && (d[h] = a[h])
					} else b = X.createCallback(b, c, 3), p(a, function(a, c, e) {
						b(a, c, e) && (d[c] = a)
					});
				return d
			}, X.pluck = Tb, X.property = Xa, X.pull = function(a) {
				for (var b = arguments, c = 0, d = b.length, e = a ? a.length : 0; ++c < d;)
					for (var f = -1, g = b[c]; ++f < e;) a[f] === g && (ub.call(a, f--, 1), e--);
				return a
			}, X.range = function(a, b, c) {
				a = +a || 0, c = "number" == typeof c ? c : +c || 1, null == b && (b = a, a = 0);
				var d = -1;
				b = Cb(0, mb((b - a) / (c || 1)));
				for (var e = Za(b); ++d < b;) e[d] = a, a += c;
				return e
			}, X.reject = function(a, b, c) {
				return b = X.createCallback(b, c, 3), Ba(a, function(a, c, d) {
					return !b(a, c, d)
				})
			}, X.remove = function(a, b, c) {
				var d = -1,
					e = a ? a.length : 0,
					f = [];
				for (b = X.createCallback(b, c, 3); ++d < e;) c = a[d], b(c, d, a) && (f.push(c), ub.call(a, d--, 1), e--);
				return f
			}, X.rest = Na, X.shuffle = Ja, X.sortBy = function(a, b, c) {
				var d = -1,
					e = Jb(b),
					g = a ? a.length : 0,
					h = Za("number" == typeof g ? g : 0);
				for (e || (b = X.createCallback(b, c, 3)), Da(a, function(a, c, f) {
					var g = h[++d] = j();
					e ? g.m = Fa(b, function(b) {
						return a[b]
					}) : (g.m = i())[0] = b(a, c, f), g.n = d, g.o = a
				}), g = h.length, h.sort(f); g--;) a = h[g], h[g] = a.o, e || k(a.m), l(a);
				return h
			}, X.tap = function(a, b) {
				return b(a), a
			}, X.throttle = function(a, b, c) {
				var d = !0,
					e = !0;
				if (!ua(a)) throw new gb;
				return !1 === c ? d = !1 : va(c) && (d = "leading" in c ? c.leading : d, e = "trailing" in c ? c.trailing : e), S.leading = d, S.maxWait = b, S.trailing = e, Ta(a, b, S)
			}, X.times = function(a, b, c) {
				a = -1 < (a = +a) ? a : 0;
				var d = -1,
					e = Za(a);
				for (b = ba(b, c, 1); ++d < a;) e[d] = b(d);
				return e
			}, X.toArray = function(a) {
				return a && "number" == typeof a.length ? m(a) : ya(a)
			}, X.transform = function(a, b, c, e) {
				var f = Jb(a);
				if (null == c)
					if (f) c = [];
					else {
						var g = a && a.constructor;
						c = aa(g && g.prototype)
					}
				return b && (b = X.createCallback(b, e, 4), (f ? Da : d)(a, function(a, d, e) {
					return b(c, a, d, e)
				})), c
			}, X.union = function() {
				return ia(ea(arguments, !0, !0))
			}, X.uniq = Pa, X.values = ya, X.where = Ba, X.without = function(a) {
				return da(a, m(arguments, 1))
			}, X.wrap = function(a, b) {
				return ka(b, 16, [a])
			}, X.xor = function() {
				for (var a = -1, b = arguments.length; ++a < b;) {
					var c = arguments[a];
					if (Jb(c) || qa(c)) var d = d ? ia(da(d, c).concat(da(c, d))) : c
				}
				return d || []
			}, X.zip = Qa, X.zipObject = Ra, X.collect = Fa, X.drop = Na, X.each = Da, X.eachRight = Ea, X.extend = u, X.methods = sa, X.object = Ra, X.select = Ba, X.tail = Na, X.unique = Pa, X.unzip = Qa, Va(X), X.clone = function(a, b, c, d) {
				return "boolean" != typeof b && null != b && (d = c, c = b, b = !1), $(a, b, "function" == typeof c && ba(c, d, 1))
			}, X.cloneDeep = function(a, b, c) {
				return $(a, !0, "function" == typeof b && ba(b, c, 1))
			}, X.contains = za, X.escape = function(a) {
				return null == a ? "" : fb(a).replace(Ob, la)
			}, X.every = Aa, X.find = Ca, X.findIndex = function(a, b, c) {
				var d = -1,
					e = a ? a.length : 0;
				for (b = X.createCallback(b, c, 3); ++d < e;)
					if (b(a[d], d, a)) return d;
				return -1
			}, X.findKey = function(a, b, c) {
				var e;
				return b = X.createCallback(b, c, 3), d(a, function(a, c, d) {
					return b(a, c, d) ? (e = c, !1) : void 0
				}), e
			}, X.findLast = function(a, b, c) {
				var d;
				return b = X.createCallback(b, c, 3), Ea(a, function(a, c, e) {
					return b(a, c, e) ? (d = a, !1) : void 0
				}), d
			}, X.findLastIndex = function(a, b, c) {
				var d = a ? a.length : 0;
				for (b = X.createCallback(b, c, 3); d--;)
					if (b(a[d], d, a)) return d;
				return -1
			}, X.findLastKey = function(a, b, c) {
				var d;
				return b = X.createCallback(b, c, 3), ra(a, function(a, c, e) {
					return b(a, c, e) ? (d = c, !1) : void 0
				}), d
			}, X.has = function(a, b) {
				return a ? rb.call(a, b) : !1
			}, X.identity = Ua, X.indexOf = Ma, X.isArguments = qa, X.isArray = Jb, X.isBoolean = function(a) {
				return !0 === a || !1 === a || a && "object" == typeof a && kb.call(a) == K || !1
			}, X.isDate = function(a) {
				return a && "object" == typeof a && kb.call(a) == L || !1
			}, X.isElement = function(a) {
				return a && 1 === a.nodeType || !1
			}, X.isEmpty = function(a) {
				var b = !0;
				if (!a) return b;
				var c = kb.call(a),
					e = a.length;
				return c == J || c == Q || c == I || c == O && "number" == typeof e && ua(a.splice) ? !e : (d(a, function() {
					return b = !1
				}), b)
			}, X.isEqual = function(a, b, c, d) {
				return fa(a, b, "function" == typeof c && ba(c, d, 2))
			}, X.isFinite = function(a) {
				return zb(a) && !Ab(parseFloat(a))
			}, X.isFunction = ua, X.isNaN = function(a) {
				return wa(a) && a != +a
			}, X.isNull = function(a) {
				return null === a
			}, X.isNumber = wa, X.isObject = va, X.isPlainObject = Pb, X.isRegExp = function(a) {
				return a && "object" == typeof a && kb.call(a) == P || !1
			}, X.isString = xa, X.isUndefined = function(a) {
				return "undefined" == typeof a
			}, X.lastIndexOf = function(a, b, c) {
				var d = a ? a.length : 0;
				for ("number" == typeof c && (d = (0 > c ? Cb(0, d + c) : Db(c, d - 1)) + 1); d--;)
					if (a[d] === b) return d;
				return -1
			}, X.mixin = Va, X.noConflict = function() {
				return c._ = jb, this
			}, X.noop = Wa, X.now = Ub, X.parseInt = Vb, X.random = function(a, b, c) {
				var d = null == a,
					e = null == b;
				return null == c && ("boolean" == typeof a && e ? (c = a, a = 1) : e || "boolean" != typeof b || (c = b, e = !0)), d && e && (b = 1), a = +a || 0, e ? (b = a, a = 0) : b = +b || 0, c || a % 1 || b % 1 ? (c = Fb(), Db(a + c * (b - a + parseFloat("1e-" + ((c + "").length - 1))), b)) : ha(a, b)
			}, X.reduce = Ha, X.reduceRight = Ia, X.result = function(a, b) {
				if (a) {
					var c = a[b];
					return ua(c) ? a[b]() : c
				}
			}, X.runInContext = n, X.size = function(a) {
				var b = a ? a.length : 0;
				return "number" == typeof b ? b : Kb(a).length
			}, X.some = Ka, X.sortedIndex = Oa, X.template = function(a, b, c) {
				var d = X.templateSettings;
				a = fb(a || ""), c = q({}, c, d);
				var e, f = q({}, c.imports, d.imports),
					d = Kb(f),
					f = ya(f),
					g = 0,
					i = c.interpolate || E,
					j = "__p+='",
					i = eb((c.escape || E).source + "|" + i.source + "|" + (i === C ? z : E).source + "|" + (c.evaluate || E).source + "|$", "g");
				a.replace(i, function(b, c, d, f, i, k) {
					return d || (d = f), j += a.slice(g, k).replace(G, h), c && (j += "'+__e(" + c + ")+'"), i && (e = !0, j += "';" + i + ";\n__p+='"), d && (j += "'+((__t=(" + d + "))==null?'':__t)+'"), g = k + b.length, b
				}), j += "';", i = c = c.variable, i || (c = "obj", j = "with(" + c + "){" + j + "}"), j = (e ? j.replace(w, "") : j).replace(x, "$1").replace(y, "$1;"), j = "function(" + c + "){" + (i ? "" : c + "||(" + c + "={});") + "var __t,__p='',__e=_.escape" + (e ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + j + "return __p}";
				try {
					var k = ab(d, "return " + j).apply(o, f)
				} catch (l) {
					throw l.source = j, l
				}
				return b ? k(b) : (k.source = j, k)
			}, X.unescape = function(a) {
				return null == a ? "" : fb(a).replace(Nb, pa)
			}, X.uniqueId = function(a) {
				var b = ++r;
				return fb(null == a ? "" : a) + b
			}, X.all = Aa, X.any = Ka, X.detect = Ca, X.findWhere = Ca, X.foldl = Ha, X.foldr = Ia, X.include = za, X.inject = Ha, Va(function() {
				var a = {};
				return d(X, function(b, c) {
					X.prototype[c] || (a[c] = b)
				}), a
			}(), !1), X.first = La, X.last = function(a, b, c) {
				var d = 0,
					e = a ? a.length : 0;
				if ("number" != typeof b && null != b) {
					var f = e;
					for (b = X.createCallback(b, c, 3); f-- && b(a[f], f, a);) d++
				} else if (d = b, null == d || c) return a ? a[e - 1] : o;
				return m(a, Cb(0, e - d))
			}, X.sample = function(a, b, c) {
				return a && "number" != typeof a.length && (a = ya(a)), null == b || c ? a ? a[ha(0, a.length - 1)] : o : (a = Ja(a), a.length = Db(Cb(0, b), a.length), a)
			}, X.take = La, X.head = La, d(X, function(a, b) {
				var c = "sample" !== b;
				X.prototype[b] || (X.prototype[b] = function(b, d) {
					var e = this.__chain__,
						f = a(this.__wrapped__, b, d);
					return e || null != b && (!d || c && "function" == typeof b) ? new Y(f, e) : f
				})
			}), X.VERSION = "2.4.1", X.prototype.chain = function() {
				return this.__chain__ = !0, this
			}, X.prototype.toString = function() {
				return fb(this.__wrapped__)
			}, X.prototype.value = Ya, X.prototype.valueOf = Ya, Da(["join", "pop", "shift"], function(a) {
				var b = hb[a];
				X.prototype[a] = function() {
					var a = this.__chain__,
						c = b.apply(this.__wrapped__, arguments);
					return a ? new Y(c, a) : c
				}
			}), Da(["push", "reverse", "sort", "unshift"], function(a) {
				var b = hb[a];
				X.prototype[a] = function() {
					return b.apply(this.__wrapped__, arguments), this
				}
			}), Da(["concat", "slice", "splice"], function(a) {
				var b = hb[a];
				X.prototype[a] = function() {
					return new Y(b.apply(this.__wrapped__, arguments), this.__chain__)
				}
			}), X
		}
		var o, p = [],
			q = [],
			r = 0,
			s = +new Date + "",
			t = 75,
			u = 40,
			v = " 	\f \ufeff\n\r\u2028\u2029 ᠎             　",
			w = /\b__p\+='';/g,
			x = /\b(__p\+=)''\+/g,
			y = /(__e\(.*?\)|\b__t\))\+'';/g,
			z = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
			A = /\w*$/,
			B = /^\s*function[ \n\r\t]+\w/,
			C = /<%=([\s\S]+?)%>/g,
			D = RegExp("^[" + v + "]*0+(?=.$)"),
			E = /($^)/,
			F = /\bthis\b/,
			G = /['\n\r\t\u2028\u2029\\]/g,
			H = "Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),
			I = "[object Arguments]",
			J = "[object Array]",
			K = "[object Boolean]",
			L = "[object Date]",
			M = "[object Function]",
			N = "[object Number]",
			O = "[object Object]",
			P = "[object RegExp]",
			Q = "[object String]",
			R = {};
		R[M] = !1, R[I] = R[J] = R[K] = R[L] = R[N] = R[O] = R[P] = R[Q] = !0;
		var S = {
			leading: !1,
			maxWait: 0,
			trailing: !1
		}, T = {
				configurable: !1,
				enumerable: !1,
				value: null,
				writable: !1
			}, U = {
				"boolean": !1,
				"function": !0,
				object: !0,
				number: !1,
				string: !1,
				undefined: !1
			}, V = {
				"\\": "\\",
				"'": "'",
				"\n": "n",
				"\r": "r",
				"	": "t",
				"\u2028": "u2028",
				"\u2029": "u2029"
			}, W = U[typeof window] && window || this,
			X = U[typeof exports] && exports && !exports.nodeType && exports,
			Y = U[typeof module] && module && !module.nodeType && module,
			Z = Y && Y.exports === X && X,
			$ = U[typeof global] && global;
		!$ || $.global !== $ && $.window !== $ || (W = $);
		var _ = n();
		"function" == typeof d && "object" == typeof d.amd && d.amd ? (W._ = _, d("lodash", [], function() {
			return _
		})) : X && Y ? Z ? (Y.exports = _)._ = _ : X._ = _ : W._ = _
	}.call(this),
	function() {
		var a = angular.module("restangular", []);
		a.provider("Restangular", function() {
			var a = {};
			a.init = function(a, b) {
				function c(a, b, c, d) {
					var e = {};
					return _.each(_.keys(d), function(f) {
						var g = d[f];
						g.params = _.extend({}, g.params, a.defaultRequestParams[g.method.toLowerCase()]), _.isEmpty(g.params) && delete g.params, e[f] = a.isSafe(g.method) ? function() {
							return b(_.extend(g, {
								url: c
							}))
						} : function(a) {
							return b(_.extend(g, {
								url: c,
								data: a
							}))
						}
					}), e
				}
				a.configuration = b;
				var d = ["get", "head", "options", "trace", "getlist"];
				b.isSafe = function(a) {
					return _.contains(d, a.toLowerCase())
				};
				var e = /^https?:\/\//i;
				b.isAbsoluteUrl = function(a) {
					return _.isUndefined(b.absoluteUrl) || _.isNull(b.absoluteUrl) ? a && e.test(a) : b.absoluteUrl
				}, b.absoluteUrl = _.isUndefined(b.absoluteUrl) ? !0 : b.absoluteUrl, a.setSelfLinkAbsoluteUrl = function(a) {
					b.absoluteUrl = a
				}, b.baseUrl = _.isUndefined(b.baseUrl) ? "" : b.baseUrl, a.setBaseUrl = function(a) {
					return b.baseUrl = /\/$/.test(a) ? a.substring(0, a.length - 1) : a, this
				}, b.extraFields = b.extraFields || [], a.setExtraFields = function(a) {
					return b.extraFields = a, this
				}, b.defaultHttpFields = b.defaultHttpFields || {}, a.setDefaultHttpFields = function(a) {
					return b.defaultHttpFields = a, this
				}, b.withHttpValues = function(a, c) {
					return _.defaults(c, a, b.defaultHttpFields)
				}, b.encodeIds = _.isUndefined(b.encodeIds) ? !0 : b.encodeIds, a.setEncodeIds = function(a) {
					b.encodeIds = a
				}, b.defaultRequestParams = b.defaultRequestParams || {
					get: {},
					post: {},
					put: {},
					remove: {},
					common: {}
				}, a.setDefaultRequestParams = function(a, c) {
					var d = [],
						e = c || a;
					return _.isUndefined(c) ? d.push("common") : _.isArray(a) ? d = a : d.push(a), _.each(d, function(a) {
						b.defaultRequestParams[a] = e
					}), this
				}, a.requestParams = b.defaultRequestParams, b.defaultHeaders = b.defaultHeaders || {}, a.setDefaultHeaders = function(c) {
					return b.defaultHeaders = c, a.defaultHeaders = b.defaultHeaders, this
				}, a.defaultHeaders = b.defaultHeaders, b.methodOverriders = b.methodOverriders || [], a.setMethodOverriders = function(a) {
					var c = _.extend([], a);
					return b.isOverridenMethod("delete", c) && c.push("remove"), b.methodOverriders = c, this
				}, b.jsonp = _.isUndefined(b.jsonp) ? !1 : b.jsonp, a.setJsonp = function(a) {
					b.jsonp = a
				}, b.isOverridenMethod = function(a, c) {
					var d = c || b.methodOverriders;
					return !_.isUndefined(_.find(d, function(b) {
						return b.toLowerCase() === a.toLowerCase()
					}))
				}, b.urlCreator = b.urlCreator || "path", a.setUrlCreator = function(a) {
					if (!_.has(b.urlCreatorFactory, a)) throw new Error("URL Path selected isn't valid");
					return b.urlCreator = a, this
				}, b.restangularFields = b.restangularFields || {
					id: "id",
					route: "route",
					parentResource: "parentResource",
					restangularCollection: "restangularCollection",
					cannonicalId: "__cannonicalId",
					etag: "restangularEtag",
					selfLink: "href",
					get: "get",
					getList: "getList",
					put: "put",
					post: "post",
					remove: "remove",
					head: "head",
					trace: "trace",
					options: "options",
					patch: "patch",
					getRestangularUrl: "getRestangularUrl",
					getRequestedUrl: "getRequestedUrl",
					putElement: "putElement",
					addRestangularMethod: "addRestangularMethod",
					getParentList: "getParentList",
					clone: "clone",
					ids: "ids",
					httpConfig: "_$httpConfig",
					reqParams: "reqParams",
					one: "one",
					all: "all",
					several: "several",
					oneUrl: "oneUrl",
					allUrl: "allUrl",
					customPUT: "customPUT",
					customPOST: "customPOST",
					customDELETE: "customDELETE",
					customGET: "customGET",
					customGETLIST: "customGETLIST",
					customOperation: "customOperation",
					doPUT: "doPUT",
					doPOST: "doPOST",
					doDELETE: "doDELETE",
					doGET: "doGET",
					doGETLIST: "doGETLIST",
					fromServer: "fromServer",
					withConfig: "withConfig",
					withHttpConfig: "withHttpConfig",
					singleOne: "singleOne",
					plain: "plain",
					save: "save"
				}, a.setRestangularFields = function(a) {
					return b.restangularFields = _.extend(b.restangularFields, a), this
				}, b.isRestangularized = function(a) {
					return !!a[b.restangularFields.one] || !! a[b.restangularFields.all];

				}, b.setFieldToElem = function(a, b, c) {
					var d = a.split("."),
						e = b;
					return _.each(_.initial(d), function(a) {
						e[a] = {}, e = e[a]
					}), e[_.last(d)] = c, this
				}, b.getFieldFromElem = function(a, b) {
					var c = a.split("."),
						d = b;
					return _.each(c, function(a) {
						d && (d = d[a])
					}), angular.copy(d)
				}, b.setIdToElem = function(a, c) {
					return b.setFieldToElem(b.restangularFields.id, a, c), this
				}, b.getIdFromElem = function(a) {
					return b.getFieldFromElem(b.restangularFields.id, a)
				}, b.isValidId = function(a) {
					return "" !== a && !_.isUndefined(a) && !_.isNull(a)
				}, b.setUrlToElem = function(a, c) {
					return b.setFieldToElem(b.restangularFields.selfLink, a, c), this
				}, b.getUrlFromElem = function(a) {
					return b.getFieldFromElem(b.restangularFields.selfLink, a)
				}, b.useCannonicalId = _.isUndefined(b.useCannonicalId) ? !1 : b.useCannonicalId, a.setUseCannonicalId = function(a) {
					return b.useCannonicalId = a, this
				}, b.getCannonicalIdFromElem = function(a) {
					var c = a[b.restangularFields.cannonicalId],
						d = b.isValidId(c) ? c : b.getIdFromElem(a);
					return d
				}, b.responseInterceptors = b.responseInterceptors || [], b.defaultResponseInterceptor = function(a) {
					return a
				}, b.responseExtractor = function(a, c, d, e, f, g) {
					var h = angular.copy(b.responseInterceptors);
					h.push(b.defaultResponseInterceptor);
					var i = a;
					return _.each(h, function(a) {
						i = a(i, c, d, e, f, g)
					}), i
				}, a.addResponseInterceptor = function(a) {
					return b.responseInterceptors.push(a), this
				}, a.setResponseInterceptor = a.addResponseInterceptor, a.setResponseExtractor = a.addResponseInterceptor, b.requestInterceptors = b.requestInterceptors || [], b.defaultInterceptor = function(a, b, c, d, e, f, g) {
					return {
						element: a,
						headers: e,
						params: f,
						httpConfig: g
					}
				}, b.fullRequestInterceptor = function(a, c, d, e, f, g, h) {
					var i = angular.copy(b.requestInterceptors),
						j = b.defaultInterceptor(a, c, d, e, f, g, h);
					return _.reduce(i, function(a, b) {
						return _.extend(a, b(a.element, c, d, e, a.headers, a.params, a.httpConfig))
					}, j)
				}, a.addRequestInterceptor = function(a) {
					return b.requestInterceptors.push(function(b, c, d, e, f, g, h) {
						return {
							headers: f,
							params: g,
							element: a(b, c, d, e),
							httpConfig: h
						}
					}), this
				}, a.setRequestInterceptor = a.addRequestInterceptor, a.addFullRequestInterceptor = function(a) {
					return b.requestInterceptors.push(a), this
				}, a.setFullRequestInterceptor = a.addFullRequestInterceptor, b.errorInterceptor = b.errorInterceptor || function() {}, a.setErrorInterceptor = function(a) {
					return b.errorInterceptor = a, this
				}, b.onBeforeElemRestangularized = b.onBeforeElemRestangularized || function(a) {
					return a
				}, a.setOnBeforeElemRestangularized = function(a) {
					return b.onBeforeElemRestangularized = a, this
				}, b.onElemRestangularized = b.onElemRestangularized || function(a) {
					return a
				}, a.setOnElemRestangularized = function(a) {
					return b.onElemRestangularized = a, this
				}, b.shouldSaveParent = b.shouldSaveParent || function() {
					return !0
				}, a.setParentless = function(a) {
					return _.isArray(a) ? b.shouldSaveParent = function(b) {
						return !_.contains(a, b)
					} : _.isBoolean(a) && (b.shouldSaveParent = function() {
						return !a
					}), this
				}, b.suffix = _.isUndefined(b.suffix) ? null : b.suffix, a.setRequestSuffix = function(a) {
					return b.suffix = a, this
				}, b.transformers = b.transformers || {}, a.addElementTransformer = function(c, d, e) {
					var f = null,
						g = null;
					2 === arguments.length ? g = d : (g = e, f = d);
					var h = b.transformers[c];
					return h || (h = b.transformers[c] = []), h.push(function(a, b) {
						return _.isNull(f) || a == f ? g(b) : b
					}), a
				}, a.extendCollection = function(b, c) {
					return a.addElementTransformer(b, !0, c)
				}, a.extendModel = function(b, c) {
					return a.addElementTransformer(b, !1, c)
				}, b.transformElem = function(a, c, d, e, f) {
					if (!f && !b.transformLocalElements && !a[b.restangularFields.fromServer]) return a;
					var g = b.transformers[d],
						h = a;
					return g && _.each(g, function(a) {
						h = a(c, h)
					}), b.onElemRestangularized(h, c, d, e)
				}, b.transformLocalElements = _.isUndefined(b.transformLocalElements) ? !1 : b.transformLocalElements, a.setTransformOnlyServerElements = function(a) {
					b.transformLocalElements = !a
				}, b.fullResponse = _.isUndefined(b.fullResponse) ? !1 : b.fullResponse, a.setFullResponse = function(a) {
					return b.fullResponse = a, this
				}, b.urlCreatorFactory = {};
				var f = function() {};
				f.prototype.setConfig = function(a) {
					return this.config = a, this
				}, f.prototype.parentsArray = function(a) {
					for (var b = []; a;) b.push(a), a = a[this.config.restangularFields.parentResource];
					return b.reverse()
				}, f.prototype.resource = function(a, d, e, f, g, h, i, j) {
					var k = _.defaults(g || {}, this.config.defaultRequestParams.common),
						l = _.defaults(f || {}, this.config.defaultHeaders);
					i && (b.isSafe(j) ? l["If-None-Match"] = i : l["If-Match"] = i);
					var m = this.base(a);
					if (h) {
						var n = "";
						/\/$/.test(m) || (n += "/"), n += h, m += n
					}
					return this.config.suffix && -1 === m.indexOf(this.config.suffix, m.length - this.config.suffix.length) && !this.config.getUrlFromElem(a) && (m += this.config.suffix), a[this.config.restangularFields.httpConfig] = void 0, c(this.config, d, m, {
						getList: this.config.withHttpValues(e, {
							method: "GET",
							params: k,
							headers: l
						}),
						get: this.config.withHttpValues(e, {
							method: "GET",
							params: k,
							headers: l
						}),
						jsonp: this.config.withHttpValues(e, {
							method: "jsonp",
							params: k,
							headers: l
						}),
						put: this.config.withHttpValues(e, {
							method: "PUT",
							params: k,
							headers: l
						}),
						post: this.config.withHttpValues(e, {
							method: "POST",
							params: k,
							headers: l
						}),
						remove: this.config.withHttpValues(e, {
							method: "DELETE",
							params: k,
							headers: l
						}),
						head: this.config.withHttpValues(e, {
							method: "HEAD",
							params: k,
							headers: l
						}),
						trace: this.config.withHttpValues(e, {
							method: "TRACE",
							params: k,
							headers: l
						}),
						options: this.config.withHttpValues(e, {
							method: "OPTIONS",
							params: k,
							headers: l
						}),
						patch: this.config.withHttpValues(e, {
							method: "PATCH",
							params: k,
							headers: l
						})
					})
				};
				var g = function() {};
				g.prototype = new f, g.prototype.base = function(a) {
					var c = this;
					return _.reduce(this.parentsArray(a), function(a, d) {
						var e, f = c.config.getUrlFromElem(d);
						if (f) {
							if (c.config.isAbsoluteUrl(f)) return f;
							e = f
						} else if (e = d[c.config.restangularFields.route], d[c.config.restangularFields.restangularCollection]) {
							var g = d[c.config.restangularFields.ids];
							g && (e += "/" + g.join(","))
						} else {
							var h;
							h = c.config.useCannonicalId ? c.config.getCannonicalIdFromElem(d) : c.config.getIdFromElem(d), b.isValidId(h) && !d.singleOne && (e += "/" + (c.config.encodeIds ? encodeURIComponent(h) : h))
						}
						return a.replace(/\/$/, "") + "/" + e
					}, this.config.baseUrl)
				}, g.prototype.fetchUrl = function(a, b) {
					var c = this.base(a);
					return b && (c += "/" + b), c
				}, g.prototype.fetchRequestedUrl = function(a, c) {
					function d(a) {
						var b = [];
						for (var c in a) a.hasOwnProperty(c) && b.push(c);
						return b.sort()
					}

					function e(a, b, c) {
						for (var e = d(a), f = 0; f < e.length; f++) b.call(c, a[e[f]], e[f]);
						return e
					}

					function f(a, b) {
						return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20" : "+")
					}
					var g = this.fetchUrl(a, c),
						h = a[b.restangularFields.reqParams];
					if (!h) return g;
					var i = [];
					return e(h, function(a, b) {
						null != a && void 0 != a && (angular.isArray(a) || (a = [a]), angular.forEach(a, function(a) {
							angular.isObject(a) && (a = angular.toJson(a)), i.push(f(b) + "=" + f(a))
						}))
					}), g + (this.config.suffix || "") + (-1 === g.indexOf("?") ? "?" : "&") + i.join("&")
				}, b.urlCreatorFactory.path = g
			};
			var b = {};
			a.init(this, b), this.$get = ["$http", "$q",
				function(c, d) {
					function e(b) {
						function f(a, c, d, e, f) {
							if (c[b.restangularFields.route] = d, c[b.restangularFields.getRestangularUrl] = _.bind(P.fetchUrl, P, c), c[b.restangularFields.getRequestedUrl] = _.bind(P.fetchRequestedUrl, P, c), c[b.restangularFields.addRestangularMethod] = _.bind(L, c), c[b.restangularFields.clone] = _.bind(r, c, c), c[b.restangularFields.reqParams] = _.isEmpty(e) ? null : e, c[b.restangularFields.withHttpConfig] = _.bind(z, c), c[b.restangularFields.plain] = _.bind(p, c, c), c[b.restangularFields.one] = _.bind(g, c, c), c[b.restangularFields.all] = _.bind(h, c, c), c[b.restangularFields.several] = _.bind(i, c, c), c[b.restangularFields.oneUrl] = _.bind(j, c, c), c[b.restangularFields.allUrl] = _.bind(k, c, c), c[b.restangularFields.fromServer] = !! f, a && b.shouldSaveParent(d)) {
								var l = b.getIdFromElem(a),
									m = b.getUrlFromElem(a),
									n = _.union(_.values(_.pick(b.restangularFields, ["route", "singleOne", "parentResource"])), b.extraFields),
									o = _.pick(a, n);
								b.isValidId(l) && b.setIdToElem(o, l), b.isValidId(m) && b.setUrlToElem(o, m), c[b.restangularFields.parentResource] = o
							} else c[b.restangularFields.parentResource] = null;
							return c
						}

						function g(a, c, d, e) {
							if (_.isNumber(c) || _.isNumber(a)) {
								var f = "You're creating a Restangular entity with the number ";
								throw f += "instead of the route or the parent. You can't call .one(12)", new Error(f)
							}
							var g = {};
							return b.setIdToElem(g, d), b.setFieldToElem(b.restangularFields.singleOne, g, e), s(a, g, c, !1)
						}

						function h(a, b) {
							return t(a, [], b, !1)
						}

						function i(a, c) {
							var d = [];
							return d[b.restangularFields.ids] = Array.prototype.splice.call(arguments, 2), t(a, d, c, !1)
						}

						function j(a, c, d) {
							if (!c) throw new Error("Route is mandatory when creating new Restangular objects.");
							var e = {};
							return b.setUrlToElem(e, d, c), s(a, e, c, !1)
						}

						function k(a, c, d) {
							if (!c) throw new Error("Route is mandatory when creating new Restangular objects.");
							var e = {};
							return b.setUrlToElem(e, d, c), t(a, e, c, !1)
						}

						function l(a, c, d) {
							return a.call = _.bind(m, a), a.get = _.bind(n, a), a[b.restangularFields.restangularCollection] = c, c && (a.push = _.bind(m, a, "push")), a.$object = d, a
						}

						function m(a) {
							var c = d.defer(),
								e = arguments,
								f = {};
							return this.then(function(b) {
								var d = Array.prototype.slice.call(e, 1),
									g = b[a];
								g.apply(b, d), f = b, c.resolve(b)
							}), l(c.promise, this[b.restangularFields.restangularCollection], f)
						}

						function n(a) {
							var c = d.defer(),
								e = {};
							return this.then(function(b) {
								e = b[a], c.resolve(e)
							}), l(c.promise, this[b.restangularFields.restangularCollection], e)
						}

						function o(a, c, d, e) {
							return _.extend(e, d), b.fullResponse ? a.resolve(_.extend(c, {
								data: d
							})) : void a.resolve(d)
						}

						function p(a) {
							if (_.isArray(a)) {
								var c = [];
								return _.each(a, function(a) {
									c.push(p(a))
								}), c
							}
							return _.omit(a, _.values(_.omit(b.restangularFields, "id")))
						}

						function q(a) {
							a[b.restangularFields.customOperation] = _.bind(K, a), _.each(["put", "post", "get", "delete"], function(b) {
								_.each(["do", "custom"], function(c) {
									var d, e = "delete" === b ? "remove" : b,
										f = c + b.toUpperCase();
									d = "put" !== e && "post" !== e ? K : function(a, b, c, d, e) {
										return _.bind(K, this)(a, c, d, e, b)
									}, a[f] = _.bind(d, a, e)
								})
							}), a[b.restangularFields.customGETLIST] = _.bind(y, a), a[b.restangularFields.doGETLIST] = a[b.restangularFields.customGETLIST]
						}

						function r(a, c) {
							var d = angular.copy(a, c);
							return s(d[b.restangularFields.parentResource], d, d[b.restangularFields.route], !0)
						}

						function s(a, c, d, e, g, h) {
							var i = b.onBeforeElemRestangularized(c, !1, d),
								j = f(a, i, d, h, e);
							return b.useCannonicalId && (j[b.restangularFields.cannonicalId] = b.getIdFromElem(j)), g && (j[b.restangularFields.getParentList] = function() {
								return g
							}), j[b.restangularFields.restangularCollection] = !1, j[b.restangularFields.get] = _.bind(C, j), j[b.restangularFields.getList] = _.bind(y, j), j[b.restangularFields.put] = _.bind(E, j), j[b.restangularFields.post] = _.bind(F, j), j[b.restangularFields.remove] = _.bind(D, j), j[b.restangularFields.head] = _.bind(G, j), j[b.restangularFields.trace] = _.bind(H, j), j[b.restangularFields.options] = _.bind(I, j), j[b.restangularFields.patch] = _.bind(J, j), j[b.restangularFields.save] = _.bind(A, j), q(j), b.transformElem(j, !1, d, O, !0)
						}

						function t(a, c, d, e, g) {
							var h = b.onBeforeElemRestangularized(c, !0, d),
								i = f(a, h, d, g, e);
							return i[b.restangularFields.restangularCollection] = !0, i[b.restangularFields.post] = _.bind(F, i, null), i[b.restangularFields.remove] = _.bind(D, i), i[b.restangularFields.head] = _.bind(G, i), i[b.restangularFields.trace] = _.bind(H, i), i[b.restangularFields.putElement] = _.bind(w, i), i[b.restangularFields.options] = _.bind(I, i), i[b.restangularFields.patch] = _.bind(J, i), i[b.restangularFields.get] = _.bind(v, i), i[b.restangularFields.getList] = _.bind(y, i, null), q(i), b.transformElem(i, !0, d, O, !0)
						}

						function u(a, b, c) {
							var d = t(a, b, c, !1);
							return _.each(d, function(b) {
								s(a, b, c, !1)
							}), d
						}

						function v(a, b, c) {
							return this.customGET(a.toString(), b, c)
						}

						function w(a, c, e) {
							var f = this,
								g = this[a],
								h = d.defer(),
								i = [];
							return i = b.transformElem(i, !0, g[b.restangularFields.route], O), g.put(c, e).then(function(b) {
								var c = r(f);
								c[a] = b, i = c, h.resolve(c)
							}, function(a) {
								h.reject(a)
							}), l(h.promise, !0, i)
						}

						function x(a, c, d, e, f, g) {
							var h = b.responseExtractor(a, c, d, e, f, g),
								i = f.headers("ETag");
							return h && i && (h[b.restangularFields.etag] = i), h
						}

						function y(a, e, f) {
							var g = this,
								h = d.defer(),
								i = "getList",
								j = P.fetchUrl(this, a),
								k = a || g[b.restangularFields.route],
								m = b.fullRequestInterceptor(null, i, k, j, f || {}, e || {}, this[b.restangularFields.httpConfig] || {}),
								n = [];
							n = b.transformElem(n, !0, k, O);
							var p = "getList";
							return b.jsonp && (p = "jsonp"), P.resource(this, c, m.httpConfig, m.headers, m.params, a, this[b.restangularFields.etag], i)[p]().then(function(c) {
								var d = c.data,
									e = c.config.params,
									f = x(d, i, k, j, c, h);
								if ((_.isUndefined(f) || "" === f) && (f = []), !_.isArray(f)) throw new Error("Response for getList SHOULD be an array and not an object or something else");
								var l = _.map(f, function(c) {
									return g[b.restangularFields.restangularCollection] ? s(g[b.restangularFields.parentResource], c, g[b.restangularFields.route], !0, f) : s(g, c, a, !0, f)
								});
								l = _.extend(f, l), g[b.restangularFields.restangularCollection] ? o(h, c, t(g[b.restangularFields.parentResource], l, g[b.restangularFields.route], !0, e), n) : o(h, c, t(g, l, a, !0, e), n)
							}, function(a) {
								304 === a.status && g[b.restangularFields.restangularCollection] ? o(h, a, g, n) : b.errorInterceptor(a, h) !== !1 && h.reject(a)
							}), l(h.promise, !0, n)
						}

						function z(a) {
							return this[b.restangularFields.httpConfig] = a, this
						}

						function A(a, c) {
							return this[b.restangularFields.fromServer] ? this[b.restangularFields.put](a, c) : _.bind(B, this)("post", void 0, a, void 0, c)
						}

						function B(a, e, f, g, h) {
							var i = this,
								j = d.defer(),
								k = f || {}, m = e || this[b.restangularFields.route],
								n = P.fetchUrl(this, e),
								q = g || this,
								r = q[b.restangularFields.etag] || ("post" != a ? this[b.restangularFields.etag] : null);
							_.isObject(q) && b.isRestangularized(q) && (q = p(q));
							var t = b.fullRequestInterceptor(q, a, m, n, h || {}, k || {}, this[b.restangularFields.httpConfig] || {}),
								u = {};
							u = b.transformElem(u, !1, m, O);
							var v = function(c) {
								var d = c.data,
									f = c.config.params,
									g = x(d, a, m, n, c, j);
								g ? "post" !== a || i[b.restangularFields.restangularCollection] ? (data = s(i[b.restangularFields.parentResource], g, i[b.restangularFields.route], !0, null, f), data[b.restangularFields.singleOne] = i[b.restangularFields.singleOne], o(j, c, data, u)) : o(j, c, s(i, g, e, !0, null, f), u) : o(j, c, void 0, u)
							}, w = function(c) {
									304 === c.status && b.isSafe(a) ? o(j, c, i, u) : b.errorInterceptor(c, j) !== !1 && j.reject(c)
								}, y = a,
								z = _.extend({}, t.headers),
								A = b.isOverridenMethod(a);
							return A ? (y = "post", z = _.extend(z, {
								"X-HTTP-Method-Override": "remove" === a ? "DELETE" : a
							})) : b.jsonp && "get" === y && (y = "jsonp"), b.isSafe(a) ? A ? P.resource(this, c, t.httpConfig, z, t.params, e, r, y)[y]({}).then(v, w) : P.resource(this, c, t.httpConfig, z, t.params, e, r, y)[y]().then(v, w) : P.resource(this, c, t.httpConfig, z, t.params, e, r, y)[y](t.element).then(v, w), l(j.promise, !1, u)
						}

						function C(a, b) {
							return _.bind(B, this)("get", void 0, a, void 0, b)
						}

						function D(a, b) {
							return _.bind(B, this)("remove", void 0, a, void 0, b)
						}

						function E(a, b) {
							return _.bind(B, this)("put", void 0, a, void 0, b)
						}

						function F(a, b, c, d) {
							return _.bind(B, this)("post", a, c, b, d)
						}

						function G(a, b) {
							return _.bind(B, this)("head", void 0, a, void 0, b)
						}

						function H(a, b) {
							return _.bind(B, this)("trace", void 0, a, void 0, b)
						}

						function I(a, b) {
							return _.bind(B, this)("options", void 0, a, void 0, b)
						}

						function J(a, b, c) {
							return _.bind(B, this)("patch", void 0, b, a, c)
						}

						function K(a, b, c, d, e) {
							return _.bind(B, this)(a, b, c, e, d)
						}

						function L(a, c, d, e, f, g) {
							var h;
							h = "getList" === c ? _.bind(y, this, d) : _.bind(K, this, c, d);
							var i = function(a, b, c) {
								var d = _.defaults({
									params: a,
									headers: b,
									elem: c
								}, {
									params: e,
									headers: f,
									elem: g
								});
								return h(d.params, d.headers, d.elem)
							};
							this[a] = b.isSafe(c) ? i : function(a, b, c) {
								return i(b, c, a)
							}
						}

						function M(c) {
							var d = angular.copy(_.omit(b, "configuration"));
							return a.init(d, d), c(d), e(d)
						}

						function N(a, b) {
							var c = {}, d = (b || O).all(a);
							return c.one = _.bind(g, b || O, b, a), c.post = _.bind(d.post, d), c.getList = _.bind(d.getList, d), c
						}
						var O = {}, P = new b.urlCreatorFactory[b.urlCreator];
						return P.setConfig(b), a.init(O, b), O.copy = _.bind(r, O), O.service = _.bind(N, O), O.withConfig = _.bind(M, O), O.one = _.bind(g, O, null), O.all = _.bind(h, O, null), O.several = _.bind(i, O, null), O.oneUrl = _.bind(j, O, null), O.allUrl = _.bind(k, O, null), O.stripRestangular = _.bind(p, O), O.restangularizeElement = _.bind(s, O), O.restangularizeCollection = _.bind(u, O), O
					}
					return e(b)
				}
			]
		})
	}(), d("restangular", ["angular", "lodash"], function() {}), d("ng-admin/Main/component/controller/AppController", [], function() {
		var a = function(a, b, c) {
			var d = c();
			this.$scope = a, this.$location = b, this.menu = d.menu(), this.applicationName = d.title(), this.header = d.header(), a.$on("$destroy", this.destroy.bind(this))
		};
		return a.prototype.displayHome = function() {
			this.$location.path("dashboard")
		}, a.prototype.destroy = function() {
			this.$scope = void 0, this.$location = void 0
		}, a.$inject = ["$scope", "$location", "NgAdminConfiguration"], a
	}), d("ng-admin/Main/component/controller/DashboardController", ["require"], function() {
		function a(a, b, c) {
			this.$scope = a, this.$location = b, this.PanelBuilder = c, this.$scope.edit = this.edit.bind(this), this.retrievePanels(), a.$on("$destroy", this.destroy.bind(this))
		}
		return a.prototype.retrievePanels = function() {
			var a = this;
			this.panels = [], this.PanelBuilder.getPanelsData().then(function(b) {
				a.panels = b
			})
		}, a.prototype.edit = function(a) {
			this.$location.path(a.entityName + "/edit/" + a.identifierValue)
		}, a.prototype.destroy = function() {
			this.$scope = void 0, this.$location = void 0, this.PanelBuilder = void 0
		}, a.$inject = ["$scope", "$location", "PanelBuilder"], a
	}), d("ng-admin/Main/component/service/PanelBuilder", [], function() {
		function a(a, b, c, d, e) {
			this.$q = a, this.$filter = b, this.$location = c, this.RetrieveQueries = d, this.Configuration = e()
		}
		return a.prototype.getPanelsData = function() {
			var a, b, c = this.Configuration.getViewsOfType("DashboardView"),
				d = this.$location.search(),
				e = d.sortField,
				f = d.sortDir,
				g = [],
				h = this;
			c = this.$filter("enabled")(c), c = this.$filter("orderElement")(c);
			for (b in c) a = c[b], g.push(h.RetrieveQueries.getAll(a, 1, !0, null, e, f));
			return this.$q.all(g).then(function(a) {
				var b, d, e, f = [];
				for (b in a) d = a[b], e = c[b], f.push({
					label: e.title() || e.getEntity().label(),
					viewName: e.name(),
					fields: e.fields(),
					entity: e.getEntity(),
					perPage: e.perPage(),
					entries: d.entries
				});
				return f
			})
		}, a.$inject = ["$q", "$filter", "$location", "RetrieveQueries", "NgAdminConfiguration"], a
	}), d("ng-admin/Main/component/service/Validator", [], function() {
		function a() {}
		return a.prototype.validate = function(a, b) {
			a.getFields().forEach(function(a) {
				var c = a.validation();
				"function" == typeof c.validator && c.validator(b.values[a.name()])
			})
		}, a.$inject = [], a
	}), d("ng-admin/Main/component/provider/NgAdminConfiguration", [], function() {
		function a() {
			this.config = null, this.adminDescription = null
		}
		return a.prototype.setAdminDescription = function(a) {
			this.adminDescription = a
		}, a.prototype.configure = function(a) {
			this.config = a
		}, a.prototype.$get = function() {
			var a = this.config;
			return function() {
				return a
			}
		}, a.prototype.application = function(a) {
			return this.adminDescription.application(a)
		}, a.prototype.entity = function(a) {
			return this.adminDescription.entity(a)
		}, a.prototype.field = function(a, b) {
			return this.adminDescription.field(a, b)
		}, a.prototype.registerFieldType = function(a, b) {
			return this.adminDescription.registerFieldType(a, b)
		}, a.prototype.menu = function(a) {
			return this.adminDescription.menu(a)
		}, a.$inject = [], a
	}), d("ng-admin/Main/component/filter/Enabled", [], function() {
		function a() {
			return function(a) {
				var b, c = [];
				for (b in a) a[b].isEnabled() && c.push(a[b]);
				return c
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Main/component/filter/OrderElement", [], function() {
		function a() {
			return function(a) {
				var b, c = [];
				for (b in a) c.push(a[b]);
				return c.sort(function(a, b) {
					return a.order() - b.order()
				}), c
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Main/component/filter/StripTags", [], function() {
		function a() {
			return function(a) {
				return a.replace(/(<([^>]+)>)/gi, "")
			}
		}
		return a.$inject = [], a
	}), d("text", ["module"], function(a) {
		var b, d, e, f, g, h = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
			i = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
			j = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
			k = "undefined" != typeof location && location.href,
			l = k && location.protocol && location.protocol.replace(/\:/, ""),
			m = k && location.hostname,
			n = k && (location.port || void 0),
			o = {}, p = a.config && a.config() || {};
		return b = {
			version: "2.0.12",
			strip: function(a) {
				if (a) {
					a = a.replace(i, "");
					var b = a.match(j);
					b && (a = b[1])
				} else a = "";
				return a
			},
			jsEscape: function(a) {
				return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
			},
			createXhr: p.createXhr || function() {
				var a, b, c;
				if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
				if ("undefined" != typeof ActiveXObject)
					for (b = 0; 3 > b; b += 1) {
						c = h[b];
						try {
							a = new ActiveXObject(c)
						} catch (d) {}
						if (a) {
							h = [c];
							break
						}
					}
				return a
			},
			parseName: function(a) {
				var b, c, d, e = !1,
					f = a.indexOf("."),
					g = 0 === a.indexOf("./") || 0 === a.indexOf("../");
				return -1 !== f && (!g || f > 1) ? (b = a.substring(0, f), c = a.substring(f + 1, a.length)) : b = a, d = c || b, f = d.indexOf("!"), -1 !== f && (e = "strip" === d.substring(f + 1), d = d.substring(0, f), c ? c = d : b = d), {
					moduleName: b,
					ext: c,
					strip: e
				}
			},
			xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
			useXhr: function(a, c, d, e) {
				var f, g, h, i = b.xdRegExp.exec(a);
				return i ? (f = i[2], g = i[3], g = g.split(":"), h = g[1], g = g[0], !(f && f !== c || g && g.toLowerCase() !== d.toLowerCase() || (h || g) && h !== e)) : !0
			},
			finishLoad: function(a, c, d, e) {
				d = c ? b.strip(d) : d, p.isBuild && (o[a] = d), e(d)
			},
			load: function(a, c, d, e) {
				if (e && e.isBuild && !e.inlineText) return void d();
				p.isBuild = e && e.isBuild;
				var f = b.parseName(a),
					g = f.moduleName + (f.ext ? "." + f.ext : ""),
					h = c.toUrl(g),
					i = p.useXhr || b.useXhr;
				return 0 === h.indexOf("empty:") ? void d() : void(!k || i(h, l, m, n) ? b.get(h, function(c) {
					b.finishLoad(a, f.strip, c, d)
				}, function(a) {
					d.error && d.error(a)
				}) : c([g], function(a) {
					b.finishLoad(f.moduleName + "." + f.ext, f.strip, a, d)
				}))
			},
			write: function(a, c, d) {
				if (o.hasOwnProperty(c)) {
					var e = b.jsEscape(o[c]);
					d.asModule(a + "!" + c, "define(function () { return '" + e + "';});\n")
				}
			},
			writeFile: function(a, c, d, e, f) {
				var g = b.parseName(c),
					h = g.ext ? "." + g.ext : "",
					i = g.moduleName + h,
					j = d.toUrl(g.moduleName + h) + ".js";
				b.load(i, d, function() {
					var c = function(a) {
						return e(j, a)
					};
					c.asModule = function(a, b) {
						return e.asModule(a, j, b)
					}, b.write(a, i, c, f)
				}, f)
			}
		}, "node" === p.env || !p.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] ? (d = c.nodeRequire("fs"), b.get = function(a, b, c) {
			try {
				var e = d.readFileSync(a, "utf8");
				0 === e.indexOf("\ufeff") && (e = e.substring(1)), b(e)
			} catch (f) {
				c && c(f)
			}
		}) : "xhr" === p.env || !p.env && b.createXhr() ? b.get = function(a, c, d, e) {
			var f, g = b.createXhr();
			if (g.open("GET", a, !0), e)
				for (f in e) e.hasOwnProperty(f) && g.setRequestHeader(f.toLowerCase(), e[f]);
			p.onXhr && p.onXhr(g, a), g.onreadystatechange = function() {
				var b, e;
				4 === g.readyState && (b = g.status || 0, b > 399 && 600 > b ? (e = new Error(a + " HTTP status: " + b), e.xhr = g, d && d(e)) : c(g.responseText), p.onXhrComplete && p.onXhrComplete(g, a))
			}, g.send(null)
		} : "rhino" === p.env || !p.env && "undefined" != typeof Packages && "undefined" != typeof java ? b.get = function(a, b) {
			var c, d, e = "utf-8",
				f = new java.io.File(a),
				g = java.lang.System.getProperty("line.separator"),
				h = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f), e)),
				i = "";
			try {
				for (c = new java.lang.StringBuffer, d = h.readLine(), d && d.length() && 65279 === d.charAt(0) && (d = d.substring(1)), null !== d && c.append(d); null !== (d = h.readLine());) c.append(g), c.append(d);
				i = String(c.toString())
			} finally {
				h.close()
			}
			b(i)
		} : ("xpconnect" === p.env || !p.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (e = Components.classes, f = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), g = "@mozilla.org/windows-registry-key;1" in e, b.get = function(a, b) {
			var c, d, h, i = {};
			g && (a = a.replace(/\//g, "\\")), h = new FileUtils.File(a);
			try {
				c = e["@mozilla.org/network/file-input-stream;1"].createInstance(f.nsIFileInputStream), c.init(h, 1, 0, !1), d = e["@mozilla.org/intl/converter-input-stream;1"].createInstance(f.nsIConverterInputStream), d.init(c, "utf-8", c.available(), f.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), d.readString(c.available(), i), d.close(), c.close(), b(i.value)
			} catch (j) {
				throw new Error((h && h.path || "") + ": " + j)
			}
		}), b
	}), d("text!ng-admin/Main/view/dashboard-panel.html", [], function() {
		return '<div class="panel-heading">\n    <a ng-click="gotoList()">{{ label }}</a>\n</div>\n\n<ma-datagrid name="{{ viewName }}"\n    entries="entries"\n    fields="fields() | orderElement"\n    entity="entity()"\n    list-actions="false">\n</ma-datagrid>\n'
	}), d("ng-admin/Main/component/directive/maDashboardPanel", ["require", "text!../../view/dashboard-panel.html"], function(a) {
		function b(a) {
			return {
				restrict: "E",
				scope: {
					label: "@",
					viewName: "@",
					entries: "=",
					fields: "&",
					entity: "&",
					perPage: "="
				},
				link: function(b) {
					b.gotoList = function() {
						a.path(b.entity().name() + "/list/")
					}
				},
				template: c
			}
		}
		var c = a("text!../../view/dashboard-panel.html");
		return b.$inject = ["$location"], b
	}), d("text!ng-admin/Main/view/menuBar.html", [], function() {
		return '<div class="navbar-default sidebar" role="navigation">\n    <div class="sidebar-nav navbar-collapse">\n        <ul class="nav" id="side-menu">\n            <li class="entities-repeat" ng-repeat="(key, menu) in ::menu.children()" data-menu-id="{{ ::menu.uuid }}" compile="menu.template()">\n                <a ng-click="gotoLink(menu)" ng-class="::{\'active\': menu.isActive(path)}">\n                    <span compile="::menu.icon()"><span class="glyphicon glyphicon-list"></span></span>\n                    {{ menu.title() }}\n                    <span ng-if="::menu.hasChild()" class="glyphicon arrow" ng-class="::{\'glyphicon-menu-down\': isOpen(menu), \'glyphicon-menu-right\': !isOpen(menu) }"></span>\n                </a>\n                <ul ng-if="::menu.hasChild()" class="nav nav-second-level collapsible" ng-class="::{\'collapsed\': !isOpen(menu) }">\n                    <li ng-repeat="menu in ::menu.children()" data-menu-id="{{ ::menu.uuid }}" compile="menu.template()">\n                        <a ng-click="gotoLink(menu)" ng-class="::{\'active\': menu.isActive(path)}">\n                            <span compile="::menu.icon()"><span class="glyphicon glyphicon-list"></span></span>\n                            {{ menu.title() }}\n                        </a>\n                    </li>\n                </ul>\n            </li>\n        </ul>\n    </div>\n</div>\n'
	}), d("ng-admin/Main/component/directive/maMenuBar", ["require", "text!../../view/menuBar.html", "angular"], function(a) {
		function b(a, b, e) {
			return {
				restrict: "E",
				scope: {
					menu: "&"
				},
				link: function(f, g) {
					function h() {
						g.html(c), e(g.contents())(f)
					}
					f.menu = f.menu(), f.path = a.path();
					var i = [],
						j = b.$on("$locationChangeSuccess", function() {
							f.path = a.path(), h()
						});
					b.$on("$destroy", j), f.gotoLink = function(b) {
						if (b.hasChild()) {
							var c;
							d.forEach(g.find("li"), function(a) {
								var e = d.element(a);
								e.attr("data-menu-id") == b.uuid && (c = e)
							});
							var e = d.element(c.find("a")[0].getElementsByClassName("arrow")[0]),
								h = c.find("ul").eq(0);
							if (-1 !== i.indexOf(b)) {
								if (b.isChildActive(f.path)) return;
								i.splice(i.indexOf(b), 1), h.addClass("collapsed"), e.removeClass("glyphicon-menu-down"), e.addClass("glyphicon-menu-right")
							} else i.push(b), h.removeClass("collapsed"), e.removeClass("glyphicon-menu-right"), e.addClass("glyphicon-menu-down")
						} else b.link() && (a.search({}), a.path(b.link()))
					}, f.isOpen = function(a) {
						return a.isChildActive(f.path) || -1 !== i.indexOf(a)
					}, h()
				}
			}
		}
		var c = a("text!../../view/menuBar.html"),
			d = a("angular");
		return b.$inject = ["$location", "$rootScope", "$compile", "$timeout"], b
	}), d("ng-admin/Main/config/http", [], function() {
		function a(a) {
			a.useApplyAsync(!0)
		}
		return a.$inject = ["$httpProvider"], a
	}), d("text!ng-admin/Main/view/layout.html", [], function() {
		return '<div id="wrapper">\n    <nav id="header-nav" class="navbar navbar-default navbar-static-top" role="navigation">\n        <span compile="::appController.header">\n        <div class="navbar-header">\n            <a href="#" ng-click="appController.displayHome()" class="navbar-brand">{{ ::appController.applicationName }}</a>\n        </div>\n        </span>\n\n        <ma-menu-bar menu="::appController.menu"></ma-menu-bar>\n    </nav>\n\n    <div id="page-wrapper">\n        <div ui-view></div>\n    </div>\n    <div id="loader"></div>\n</div>\n'
	}), d("text!ng-admin/Main/view/dashboard.html", [], function() {
		return '<div class="row">\n    <div class="col-lg-12">\n        <div class="page-header">\n            <h1>Dashboard</h1>\n        </div>\n    </div>\n</div>\n\n<div class="row dashboard-content">\n    <div class="col-lg-6">\n        <div class="panel panel-default" ng-repeat="panel in dashboardController.panels" ng-if="$even">\n            <ma-dashboard-panel label="{{ panel.label }}"\n                             view-name="{{ panel.viewName }}"\n                             fields="panel.fields"\n                             entries="panel.entries"\n                             entity="panel.entity"\n                             per-page="panel.perPage">\n            </ma-dashboard-panel>\n        </div>\n    </div>\n    <div class="col-lg-6">\n        <div class="panel panel-default" ng-repeat="panel in dashboardController.panels" ng-if="$odd">\n            <ma-dashboard-panel label="{{ panel.label }}"\n                             view-name="{{ panel.viewName }}"\n                             fields="panel.fields"\n                             entries="panel.entries"\n                             entity="panel.entity"\n                             per-page="panel.perPage">\n            </ma-dashboard-panel>\n        </div>\n    </div>\n</div>\n'
	}), d("text!ng-admin/Main/view/404.html", [], function() {
		return '<div class="row">\n    <div class="col-lg-12">\n        <div class="page-header">\n            <h1>Not Found</h1>\n        </div>\n    </div>\n</div>\n\n<div class="row dashboard-content">\n    <div class="col-lg-12">\n        The page you are looking for cannot be found. Take a break before trying again.\n        <br/>\n        <br/>\n        <br/>\n        <br/>\n    </div>\n\n    <pre class="ascii col-lg-offset-4 col-lg-4 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-cs-offset-1 col-xs-10">\n\n       |\\      _,,,---,,_\n       /,`.-\'`\'    -.  ;-;;,_\n      |,4-  ) )-,_..;\\ (  `\'-\'\n     \'---\'\'(_/--\'  `-\'\\_)\n\n    </pre>\n</div>\n'
	}), d("ng-admin/Main/config/routing", ["require", "text!../view/layout.html", "text!../view/dashboard.html", "text!../view/404.html"], function(a) {
		function b(a, b) {
			a.state("main", {
				"abstract": !0,
				controller: "AppController",
				controllerAs: "appController",
				templateProvider: ["NgAdminConfiguration",
					function(a) {
						return a().layout() || c
					}
				]
			}), a.state("dashboard", {
				parent: "main",
				url: "/dashboard?sortField&sortDir",
				params: {
					sortField: null,
					sortDir: null
				},
				controller: "DashboardController",
				controllerAs: "dashboardController",
				template: d
			}), a.state("ma-404", {
				parent: "main",
				template: e
			}), b.when("", "/dashboard"), b.otherwise(function(a, b) {
				var c = a.get("$state");
				return c.go("ma-404"), b.path()
			})
		}
		var c = a("text!../view/layout.html"),
			d = a("text!../view/dashboard.html"),
			e = a("text!../view/404.html");
		return b.$inject = ["$stateProvider", "$urlRouterProvider"], b
	}), d("ng-admin/Main/run/ErrorHandler", [], function() {
		function a(a, b, c) {
			a.$on("$stateChangeError", function(a, d, e, f, g, h) {
				if (404 != h.status) throw c.log("State change error: " + h.message, {
					addnCls: "humane-flatty-error"
				}), h;
				b.go("ma-404"), a.preventDefault()
			})
		}
		return a.$inject = ["$rootScope", "$state", "notification"], a
	}), d("ng-admin/Main/run/Loader", [], function() {
		function a(a, b, c) {
			a.$on("$stateChangeStart", function() {
				c.start()
			}), a.$on("$stateChangeSuccess", function() {
				c.done(), b.scrollTo(0, 0)
			}), a.$on("$stateChangeError", function() {
				c.done()
			})
		}
		return a.$inject = ["$rootScope", "$window", "progression"], a
	}), d("MainModule", ["require", "angular", "angular-ui-router", "restangular", "ng-admin/Main/component/controller/AppController", "ng-admin/Main/component/controller/DashboardController", "ng-admin/Main/component/service/PanelBuilder", "ng-admin/Main/component/service/Validator", "ng-admin/Main/component/provider/NgAdminConfiguration", "ng-admin/Main/component/filter/Enabled", "ng-admin/Main/component/filter/OrderElement", "ng-admin/Main/component/filter/StripTags", "ng-admin/Main/component/directive/maDashboardPanel", "ng-admin/Main/component/directive/maMenuBar", "ng-admin/Main/config/http", "ng-admin/Main/config/routing", "ng-admin/Main/run/ErrorHandler", "ng-admin/Main/run/Loader"], function(a) {
		var b = a("angular");
		a("angular-ui-router"), a("restangular");
		var c = b.module("main", ["ui.router", "restangular"]);
		return c.controller("AppController", a("ng-admin/Main/component/controller/AppController")), c.controller("DashboardController", a("ng-admin/Main/component/controller/DashboardController")), c.service("PanelBuilder", a("ng-admin/Main/component/service/PanelBuilder")), c.service("Validator", a("ng-admin/Main/component/service/Validator")), c.provider("NgAdminConfiguration", a("ng-admin/Main/component/provider/NgAdminConfiguration")),
		c.filter("enabled", a("ng-admin/Main/component/filter/Enabled")), c.filter("orderElement", a("ng-admin/Main/component/filter/OrderElement")), c.filter("stripTags", a("ng-admin/Main/component/filter/StripTags")), c.directive("maDashboardPanel", a("ng-admin/Main/component/directive/maDashboardPanel")), c.directive("maMenuBar", a("ng-admin/Main/component/directive/maMenuBar")), c.config(a("ng-admin/Main/config/http")), c.config(a("ng-admin/Main/config/routing")), c.run(a("ng-admin/Main/run/ErrorHandler")), c.run(a("ng-admin/Main/run/Loader")), c
	}),
	function(a, b) {
		"function" == typeof d && d.amd ? d("inflection", [], b) : "object" == typeof exports ? module.exports = b() : a.inflection = b()
	}(this, function() {
		var a = ["equipment", "information", "rice", "money", "species", "series", "fish", "sheep", "moose", "deer", "news"],
			b = [
				[new RegExp("(m)en$", "gi")],
				[new RegExp("(pe)ople$", "gi")],
				[new RegExp("(child)ren$", "gi")],
				[new RegExp("([ti])a$", "gi")],
				[new RegExp("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$", "gi")],
				[new RegExp("(hive)s$", "gi")],
				[new RegExp("(tive)s$", "gi")],
				[new RegExp("(curve)s$", "gi")],
				[new RegExp("([lr])ves$", "gi")],
				[new RegExp("([^fo])ves$", "gi")],
				[new RegExp("([^aeiouy]|qu)ies$", "gi")],
				[new RegExp("(s)eries$", "gi")],
				[new RegExp("(m)ovies$", "gi")],
				[new RegExp("(x|ch|ss|sh)es$", "gi")],
				[new RegExp("([m|l])ice$", "gi")],
				[new RegExp("(bus)es$", "gi")],
				[new RegExp("(o)es$", "gi")],
				[new RegExp("(shoe)s$", "gi")],
				[new RegExp("(cris|ax|test)es$", "gi")],
				[new RegExp("(octop|vir)i$", "gi")],
				[new RegExp("(alias|status)es$", "gi")],
				[new RegExp("^(ox)en", "gi")],
				[new RegExp("(vert|ind)ices$", "gi")],
				[new RegExp("(matr)ices$", "gi")],
				[new RegExp("^feet$", "gi")],
				[new RegExp("^teeth$", "gi")],
				[new RegExp("^geese$", "gi")],
				[new RegExp("(quiz)zes$", "gi")],
				[new RegExp("(m)an$", "gi"), "$1en"],
				[new RegExp("(pe)rson$", "gi"), "$1ople"],
				[new RegExp("(child)$", "gi"), "$1ren"],
				[new RegExp("^(ox)$", "gi"), "$1en"],
				[new RegExp("(ax|test)is$", "gi"), "$1es"],
				[new RegExp("(octop|vir)us$", "gi"), "$1i"],
				[new RegExp("(alias|status)$", "gi"), "$1es"],
				[new RegExp("(bu)s$", "gi"), "$1ses"],
				[new RegExp("(buffal|tomat|potat)o$", "gi"), "$1oes"],
				[new RegExp("([ti])um$", "gi"), "$1a"],
				[new RegExp("sis$", "gi"), "ses"],
				[new RegExp("(?:([^f])fe|([lr])f)$", "gi"), "$1$2ves"],
				[new RegExp("(hive)$", "gi"), "$1s"],
				[new RegExp("([^aeiouy]|qu)y$", "gi"), "$1ies"],
				[new RegExp("(x|ch|ss|sh)$", "gi"), "$1es"],
				[new RegExp("(matr|vert|ind)ix|ex$", "gi"), "$1ices"],
				[new RegExp("([m|l])ouse$", "gi"), "$1ice"],
				[new RegExp("^foot$", "gi"), "feet"],
				[new RegExp("^tooth$", "gi"), "teeth"],
				[new RegExp("^goose$", "gi"), "geese"],
				[new RegExp("(quiz)$", "gi"), "$1zes"],
				[new RegExp("s$", "gi"), "s"],
				[new RegExp("$", "gi"), "s"]
			],
			c = [
				[new RegExp("(m)an$", "gi")],
				[new RegExp("(pe)rson$", "gi")],
				[new RegExp("(child)$", "gi")],
				[new RegExp("^(ox)$", "gi")],
				[new RegExp("(ax|test)is$", "gi")],
				[new RegExp("(octop|vir)us$", "gi")],
				[new RegExp("(alias|status)$", "gi")],
				[new RegExp("(bu)s$", "gi")],
				[new RegExp("(buffal|tomat|potat)o$", "gi")],
				[new RegExp("([ti])um$", "gi")],
				[new RegExp("sis$", "gi")],
				[new RegExp("(?:([^f])fe|([lr])f)$", "gi")],
				[new RegExp("(hive)$", "gi")],
				[new RegExp("([^aeiouy]|qu)y$", "gi")],
				[new RegExp("(x|ch|ss|sh)$", "gi")],
				[new RegExp("(matr|vert|ind)ix|ex$", "gi")],
				[new RegExp("([m|l])ouse$", "gi")],
				[new RegExp("^foot$", "gi")],
				[new RegExp("^tooth$", "gi")],
				[new RegExp("^goose$", "gi")],
				[new RegExp("(quiz)$", "gi")],
				[new RegExp("(m)en$", "gi"), "$1an"],
				[new RegExp("(pe)ople$", "gi"), "$1rson"],
				[new RegExp("(child)ren$", "gi"), "$1"],
				[new RegExp("([ti])a$", "gi"), "$1um"],
				[new RegExp("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$", "gi"), "$1$2sis"],
				[new RegExp("(hive)s$", "gi"), "$1"],
				[new RegExp("(tive)s$", "gi"), "$1"],
				[new RegExp("(curve)s$", "gi"), "$1"],
				[new RegExp("([lr])ves$", "gi"), "$1f"],
				[new RegExp("([^fo])ves$", "gi"), "$1fe"],
				[new RegExp("(m)ovies$", "gi"), "$1ovie"],
				[new RegExp("([^aeiouy]|qu)ies$", "gi"), "$1y"],
				[new RegExp("(s)eries$", "gi"), "$1eries"],
				[new RegExp("(x|ch|ss|sh)es$", "gi"), "$1"],
				[new RegExp("([m|l])ice$", "gi"), "$1ouse"],
				[new RegExp("(bus)es$", "gi"), "$1"],
				[new RegExp("(o)es$", "gi"), "$1"],
				[new RegExp("(shoe)s$", "gi"), "$1"],
				[new RegExp("(cris|ax|test)es$", "gi"), "$1is"],
				[new RegExp("(octop|vir)i$", "gi"), "$1us"],
				[new RegExp("(alias|status)es$", "gi"), "$1"],
				[new RegExp("^(ox)en", "gi"), "$1"],
				[new RegExp("(vert|ind)ices$", "gi"), "$1ex"],
				[new RegExp("(matr)ices$", "gi"), "$1ix"],
				[new RegExp("^feet$", "gi"), "foot"],
				[new RegExp("^teeth$", "gi"), "tooth"],
				[new RegExp("^geese$", "gi"), "goose"],
				[new RegExp("(quiz)zes$", "gi"), "$1"],
				[new RegExp("ss$", "gi"), "ss"],
				[new RegExp("s$", "gi"), ""]
			],
			d = ["and", "or", "nor", "a", "an", "the", "so", "but", "to", "of", "at", "by", "from", "into", "on", "onto", "off", "out", "in", "over", "with", "for"],
			e = new RegExp("(_ids|_id)$", "g"),
			f = new RegExp("_", "g"),
			g = new RegExp("[ _]", "g"),
			h = new RegExp("([A-Z])", "g"),
			i = new RegExp("^_"),
			j = {
				_apply_rules: function(a, b, c, d) {
					if (d) a = d;
					else {
						var e = j.indexOf(c, a.toLowerCase()) > -1;
						if (!e)
							for (var f = 0, g = b.length; g > f; f++)
								if (a.match(b[f][0])) {
									void 0 !== b[f][1] && (a = a.replace(b[f][0], b[f][1]));
									break
								}
					}
					return a
				},
				indexOf: function(a, b, c, d) {
					c || (c = -1);
					for (var e = -1, f = c, g = a.length; g > f; f++)
						if (a[f] === b || d && d(a[f], b)) {
							e = f;
							break
						}
					return e
				},
				pluralize: function(c, d) {
					return j._apply_rules(c, b, a, d)
				},
				singularize: function(b, d) {
					return j._apply_rules(b, c, a, d)
				},
				inflect: function(d, e, f, g) {
					return e = parseInt(e, 10), isNaN(e) ? d : 0 === e || e > 1 ? j._apply_rules(d, b, a, g) : j._apply_rules(d, c, a, f)
				},
				camelize: function(a, b) {
					for (var c, d, e, f, g = a.split("/"), h = 0, i = g.length; i > h; h++) {
						for (c = g[h].split("_"), d = 0, e = c.length; e > d; d++) 0 !== d && (c[d] = c[d].toLowerCase()), f = c[d].charAt(0), f = b && 0 === h && 0 === d ? f.toLowerCase() : f.toUpperCase(), c[d] = f + c[d].substring(1);
						g[h] = c.join("")
					}
					return g.join("::")
				},
				underscore: function(a, b) {
					if (b && a === a.toUpperCase()) return a;
					for (var c = a.split("::"), d = 0, e = c.length; e > d; d++) c[d] = c[d].replace(h, "_$1"), c[d] = c[d].replace(i, "");
					return c.join("/").toLowerCase()
				},
				humanize: function(a, b) {
					return a = a.toLowerCase(), a = a.replace(e, ""), a = a.replace(f, " "), b || (a = j.capitalize(a)), a
				},
				capitalize: function(a) {
					return a = a.toLowerCase(), a.substring(0, 1).toUpperCase() + a.substring(1)
				},
				dasherize: function(a) {
					return a.replace(g, "-")
				},
				titleize: function(a) {
					a = a.toLowerCase().replace(f, " ");
					for (var b, c, e, g = a.split(" "), h = 0, i = g.length; i > h; h++) {
						for (b = g[h].split("-"), c = 0, e = b.length; e > c; c++) j.indexOf(d, b[c].toLowerCase()) < 0 && (b[c] = j.capitalize(b[c]));
						g[h] = b.join("-")
					}
					return a = g.join(" "), a = a.substring(0, 1).toUpperCase() + a.substring(1)
				},
				demodulize: function(a) {
					var b = a.split("::");
					return b[b.length - 1]
				},
				tableize: function(a) {
					return a = j.underscore(a), a = j.pluralize(a)
				},
				classify: function(a) {
					return a = j.camelize(a), a = j.singularize(a)
				},
				foreign_key: function(a, b) {
					return a = j.demodulize(a), a = j.underscore(a) + (b ? "" : "_") + "id"
				},
				ordinalize: function(a) {
					for (var b = a.split(" "), c = 0, d = b.length; d > c; c++) {
						var e = parseInt(b[c], 10);
						if (!isNaN(e)) {
							var f = b[c].substring(b[c].length - 2),
								g = b[c].substring(b[c].length - 1),
								h = "th";
							"11" != f && "12" != f && "13" != f && ("1" === g ? h = "st" : "2" === g ? h = "nd" : "3" === g && (h = "rd")), b[c] += h
						}
					}
					return b.join(" ")
				},
				transform: function(a, b) {
					for (var c = 0, d = b.length; d > c; c++) {
						var e = b[c];
						this.hasOwnProperty(e) && (a = this[e](a))
					}
					return a
				}
			};
		return j.version = "1.4.2", j
	}),
	function() {
		function a(a) {
			this._value = a
		}

		function b(a, b, c, d) {
			var e, f, g = Math.pow(10, b);
			return f = (c(a * g) / g).toFixed(b), d && (e = new RegExp("0{1," + d + "}$"), f = f.replace(e, "")), f
		}

		function c(a, b, c) {
			var d;
			return d = b.indexOf("$") > -1 ? f(a, b, c) : b.indexOf("%") > -1 ? g(a, b, c) : b.indexOf(":") > -1 ? h(a, b) : j(a._value, b, c)
		}

		function e(a, b) {
			var c, d, e, f, g, h = b,
				j = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
				k = !1;
			if (b.indexOf(":") > -1) a._value = i(b);
			else if (b === r) a._value = 0;
			else {
				for ("." !== p[q].delimiters.decimal && (b = b.replace(/\./g, "").replace(p[q].delimiters.decimal, ".")), c = new RegExp("[^a-zA-Z]" + p[q].abbreviations.thousand + "(?:\\)|(\\" + p[q].currency.symbol + ")?(?:\\))?)?$"), d = new RegExp("[^a-zA-Z]" + p[q].abbreviations.million + "(?:\\)|(\\" + p[q].currency.symbol + ")?(?:\\))?)?$"), e = new RegExp("[^a-zA-Z]" + p[q].abbreviations.billion + "(?:\\)|(\\" + p[q].currency.symbol + ")?(?:\\))?)?$"), f = new RegExp("[^a-zA-Z]" + p[q].abbreviations.trillion + "(?:\\)|(\\" + p[q].currency.symbol + ")?(?:\\))?)?$"), g = 0; g <= j.length && !(k = b.indexOf(j[g]) > -1 ? Math.pow(1024, g + 1) : !1); g++);
				a._value = (k ? k : 1) * (h.match(c) ? Math.pow(10, 3) : 1) * (h.match(d) ? Math.pow(10, 6) : 1) * (h.match(e) ? Math.pow(10, 9) : 1) * (h.match(f) ? Math.pow(10, 12) : 1) * (b.indexOf("%") > -1 ? .01 : 1) * ((b.split("-").length + Math.min(b.split("(").length - 1, b.split(")").length - 1)) % 2 ? 1 : -1) * Number(b.replace(/[^0-9\.]+/g, "")), a._value = k ? Math.ceil(a._value) : a._value
			}
			return a._value
		}

		function f(a, b, c) {
			var d, e, f = b.indexOf("$"),
				g = b.indexOf("("),
				h = b.indexOf("-"),
				i = "";
			return b.indexOf(" $") > -1 ? (i = " ", b = b.replace(" $", "")) : b.indexOf("$ ") > -1 ? (i = " ", b = b.replace("$ ", "")) : b = b.replace("$", ""), e = j(a._value, b, c), 1 >= f ? e.indexOf("(") > -1 || e.indexOf("-") > -1 ? (e = e.split(""), d = 1, (g > f || h > f) && (d = 0), e.splice(d, 0, p[q].currency.symbol + i), e = e.join("")) : e = p[q].currency.symbol + i + e : e.indexOf(")") > -1 ? (e = e.split(""), e.splice(-1, 0, i + p[q].currency.symbol), e = e.join("")) : e = e + i + p[q].currency.symbol, e
		}

		function g(a, b, c) {
			var d, e = "",
				f = 100 * a._value;
			return b.indexOf(" %") > -1 ? (e = " ", b = b.replace(" %", "")) : b = b.replace("%", ""), d = j(f, b, c), d.indexOf(")") > -1 ? (d = d.split(""), d.splice(-1, 0, e + "%"), d = d.join("")) : d = d + e + "%", d
		}

		function h(a) {
			var b = Math.floor(a._value / 60 / 60),
				c = Math.floor((a._value - 60 * b * 60) / 60),
				d = Math.round(a._value - 60 * b * 60 - 60 * c);
			return b + ":" + (10 > c ? "0" + c : c) + ":" + (10 > d ? "0" + d : d)
		}

		function i(a) {
			var b = a.split(":"),
				c = 0;
			return 3 === b.length ? (c += 60 * Number(b[0]) * 60, c += 60 * Number(b[1]), c += Number(b[2])) : 2 === b.length && (c += 60 * Number(b[0]), c += Number(b[1])), Number(c)
		}

		function j(a, c, d) {
			var e, f, g, h, i, j, k = !1,
				l = !1,
				m = !1,
				n = "",
				o = !1,
				s = !1,
				t = !1,
				u = !1,
				v = !1,
				w = "",
				x = "",
				y = Math.abs(a),
				z = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
				A = "",
				B = !1;
			if (0 === a && null !== r) return r;
			if (c.indexOf("(") > -1 ? (k = !0, c = c.slice(1, -1)) : c.indexOf("+") > -1 && (l = !0, c = c.replace(/\+/g, "")), c.indexOf("a") > -1 && (o = c.indexOf("aK") >= 0, s = c.indexOf("aM") >= 0, t = c.indexOf("aB") >= 0, u = c.indexOf("aT") >= 0, v = o || s || t || u, c.indexOf(" a") > -1 ? (n = " ", c = c.replace(" a", "")) : c = c.replace("a", ""), y >= Math.pow(10, 12) && !v || u ? (n += p[q].abbreviations.trillion, a /= Math.pow(10, 12)) : y < Math.pow(10, 12) && y >= Math.pow(10, 9) && !v || t ? (n += p[q].abbreviations.billion, a /= Math.pow(10, 9)) : y < Math.pow(10, 9) && y >= Math.pow(10, 6) && !v || s ? (n += p[q].abbreviations.million, a /= Math.pow(10, 6)) : (y < Math.pow(10, 6) && y >= Math.pow(10, 3) && !v || o) && (n += p[q].abbreviations.thousand, a /= Math.pow(10, 3))), c.indexOf("b") > -1)
				for (c.indexOf(" b") > -1 ? (w = " ", c = c.replace(" b", "")) : c = c.replace("b", ""), g = 0; g <= z.length; g++)
					if (e = Math.pow(1024, g), f = Math.pow(1024, g + 1), a >= e && f > a) {
						w += z[g], e > 0 && (a /= e);
						break
					}
			return c.indexOf("o") > -1 && (c.indexOf(" o") > -1 ? (x = " ", c = c.replace(" o", "")) : c = c.replace("o", ""), x += p[q].ordinal(a)), c.indexOf("[.]") > -1 && (m = !0, c = c.replace("[.]", ".")), h = a.toString().split(".")[0], i = c.split(".")[1], j = c.indexOf(","), i ? (i.indexOf("[") > -1 ? (i = i.replace("]", ""), i = i.split("["), A = b(a, i[0].length + i[1].length, d, i[1].length)) : A = b(a, i.length, d), h = A.split(".")[0], A = A.split(".")[1].length ? p[q].delimiters.decimal + A.split(".")[1] : "", m && 0 === Number(A.slice(1)) && (A = "")) : h = b(a, null, d), h.indexOf("-") > -1 && (h = h.slice(1), B = !0), j > -1 && (h = h.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + p[q].delimiters.thousands)), 0 === c.indexOf(".") && (h = ""), (k && B ? "(" : "") + (!k && B ? "-" : "") + (!B && l ? "+" : "") + h + A + (x ? x : "") + (n ? n : "") + (w ? w : "") + (k && B ? ")" : "")
		}

		function k(a, b) {
			p[a] = b
		}

		function l(a) {
			var b = a.toString().split(".");
			return b.length < 2 ? 1 : Math.pow(10, b[1].length)
		}

		function m() {
			var a = Array.prototype.slice.call(arguments);
			return a.reduce(function(a, b) {
				var c = l(a),
					d = l(b);
				return c > d ? c : d
			}, -(1 / 0))
		}
		var n, o = "1.5.3",
			p = {}, q = "en",
			r = null,
			s = "0,0",
			t = "undefined" != typeof module && module.exports;
		n = function(b) {
			return n.isNumeral(b) ? b = b.value() : 0 === b || "undefined" == typeof b ? b = 0 : Number(b) || (b = n.fn.unformat(b)), new a(Number(b))
		}, n.version = o, n.isNumeral = function(b) {
			return b instanceof a
		}, n.language = function(a, b) {
			if (!a) return q;
			if (a && !b) {
				if (!p[a]) throw new Error("Unknown language : " + a);
				q = a
			}
			return (b || !p[a]) && k(a, b), n
		}, n.languageData = function(a) {
			if (!a) return p[q];
			if (!p[a]) throw new Error("Unknown language : " + a);
			return p[a]
		}, n.language("en", {
			delimiters: {
				thousands: ",",
				decimal: "."
			},
			abbreviations: {
				thousand: "k",
				million: "m",
				billion: "b",
				trillion: "t"
			},
			ordinal: function(a) {
				var b = a % 10;
				return 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th"
			},
			currency: {
				symbol: "$"
			}
		}), n.zeroFormat = function(a) {
			r = "string" == typeof a ? a : null
		}, n.defaultFormat = function(a) {
			s = "string" == typeof a ? a : "0.0"
		}, "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function(a, b) {
			if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
			if ("function" != typeof a) throw new TypeError(a + " is not a function");
			var c, d, e = this.length >>> 0,
				f = !1;
			for (1 < arguments.length && (d = b, f = !0), c = 0; e > c; ++c) this.hasOwnProperty(c) && (f ? d = a(d, this[c], c, this) : (d = this[c], f = !0));
			if (!f) throw new TypeError("Reduce of empty array with no initial value");
			return d
		}), n.fn = a.prototype = {
			clone: function() {
				return n(this)
			},
			format: function(a, b) {
				return c(this, a ? a : s, void 0 !== b ? b : Math.round)
			},
			unformat: function(a) {
				return "[object Number]" === Object.prototype.toString.call(a) ? a : e(this, a ? a : s)
			},
			value: function() {
				return this._value
			},
			valueOf: function() {
				return this._value
			},
			set: function(a) {
				return this._value = Number(a), this
			},
			add: function(a) {
				function b(a, b) {
					return a + c * b
				}
				var c = m.call(null, this._value, a);
				return this._value = [this._value, a].reduce(b, 0) / c, this
			},
			subtract: function(a) {
				function b(a, b) {
					return a - c * b
				}
				var c = m.call(null, this._value, a);
				return this._value = [a].reduce(b, this._value * c) / c, this
			},
			multiply: function(a) {
				function b(a, b) {
					var c = m(a, b);
					return a * c * b * c / (c * c)
				}
				return this._value = [this._value, a].reduce(b, 1), this
			},
			divide: function(a) {
				function b(a, b) {
					var c = m(a, b);
					return a * c / (b * c)
				}
				return this._value = [this._value, a].reduce(b), this
			},
			difference: function(a) {
				return Math.abs(n(this._value).subtract(a).value())
			}
		}, t && (module.exports = n), "undefined" == typeof ender && (this.numeral = n), "function" == typeof d && d.amd && d("numeral", [], function() {
			return n
		})
	}.call(this),
	function(a, b) {
		function c() {
			this.$get = ["$$sanitizeUri",
				function(a) {
					return function(b) {
						var c = [];
						return f(b, i(c, function(b, c) {
							return !/^unsafe/.test(a(b, c))
						})), c.join("")
					}
				}
			]
		}

		function d(a) {
			var c = [],
				d = i(c, b.noop);
			return d.chars(a), c.join("")
		}

		function e(a) {
			var b, c = {}, d = a.split(",");
			for (b = 0; b < d.length; b++) c[d[b]] = !0;
			return c
		}

		function f(a, c) {
			function d(a, d, f, h) {
				if (d = b.lowercase(d), y[d])
					for (; t.last() && z[t.last()];) e("", t.last());
				x[d] && t.last() == d && e("", d), h = u[d] || !! h, h || t.push(d);
				var i = {};
				f.replace(m, function(a, b, c, d, e) {
					var f = c || d || e || "";
					i[b] = g(f)
				}), c.start && c.start(d, i, h)
			}

			function e(a, d) {
				var e, f = 0;
				if (d = b.lowercase(d))
					for (f = t.length - 1; f >= 0 && t[f] != d; f--);
				if (f >= 0) {
					for (e = t.length - 1; e >= f; e--) c.end && c.end(t[e]);
					t.length = f
				}
			}
			"string" != typeof a && (a = null === a || "undefined" == typeof a ? "" : "" + a);
			var f, h, i, s, t = [],
				v = a;
			for (t.last = function() {
				return t[t.length - 1]
			}; a;) {
				if (s = "", h = !0, t.last() && B[t.last()] ? (a = a.replace(new RegExp("(.*)<\\s*\\/\\s*" + t.last() + "[^>]*>", "i"), function(a, b) {
					return b = b.replace(p, "$1").replace(r, "$1"), c.chars && c.chars(g(b)), ""
				}), e("", t.last())) : (0 === a.indexOf("<!--") ? (f = a.indexOf("--", 4), f >= 0 && a.lastIndexOf("-->", f) === f && (c.comment && c.comment(a.substring(4, f)), a = a.substring(f + 3), h = !1)) : q.test(a) ? (i = a.match(q), i && (a = a.replace(i[0], ""), h = !1)) : o.test(a) ? (i = a.match(l), i && (a = a.substring(i[0].length), i[0].replace(l, e), h = !1)) : n.test(a) && (i = a.match(k), i ? (i[4] && (a = a.substring(i[0].length), i[0].replace(k, d)), h = !1) : (s += "<", a = a.substring(1))), h && (f = a.indexOf("<"), s += 0 > f ? a : a.substring(0, f), a = 0 > f ? "" : a.substring(f), c.chars && c.chars(g(s)))), a == v) throw j("badparse", "The sanitizer was unable to parse the following block of html: {0}", a);
				v = a
			}
			e()
		}

		function g(a) {
			if (!a) return "";
			var b = I.exec(a),
				c = b[1],
				d = b[3],
				e = b[2];
			return e && (H.innerHTML = e.replace(/</g, "&lt;"), e = "textContent" in H ? H.textContent : H.innerText), c + e + d
		}

		function h(a) {
			return a.replace(/&/g, "&amp;").replace(s, function(a) {
				var b = a.charCodeAt(0),
					c = a.charCodeAt(1);
				return "&#" + (1024 * (b - 55296) + (c - 56320) + 65536) + ";"
			}).replace(t, function(a) {
				return "&#" + a.charCodeAt(0) + ";"
			}).replace(/</g, "&lt;").replace(/>/g, "&gt;")
		}

		function i(a, c) {
			var d = !1,
				e = b.bind(a, a.push);
			return {
				start: function(a, f, g) {
					a = b.lowercase(a), !d && B[a] && (d = a), d || C[a] !== !0 || (e("<"), e(a), b.forEach(f, function(d, f) {
						var g = b.lowercase(f),
							i = "img" === a && "src" === g || "background" === g;
						G[g] !== !0 || D[g] === !0 && !c(d, i) || (e(" "), e(f), e('="'), e(h(d)), e('"'))
					}), e(g ? "/>" : ">"))
				},
				end: function(a) {
					a = b.lowercase(a), d || C[a] !== !0 || (e("</"), e(a), e(">")), a == d && (d = !1)
				},
				chars: function(a) {
					d || e(h(a))
				}
			}
		}
		var j = b.$$minErr("$sanitize"),
			k = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
			l = /^<\/\s*([\w:-]+)[^>]*>/,
			m = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
			n = /^</,
			o = /^<\//,
			p = /<!--(.*?)-->/g,
			q = /<!DOCTYPE([^>]*?)>/i,
			r = /<!\[CDATA\[(.*?)]]>/g,
			s = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
			t = /([^\#-~| |!])/g,
			u = e("area,br,col,hr,img,wbr"),
			v = e("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
			w = e("rp,rt"),
			x = b.extend({}, w, v),
			y = b.extend({}, v, e("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
			z = b.extend({}, w, e("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
			A = e("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use"),
			B = e("script,style"),
			C = b.extend({}, u, y, z, x, A),
			D = e("background,cite,href,longdesc,src,usemap,xlink:href"),
			E = e("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width"),
			F = e("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan"),
			G = b.extend({}, D, F, E),
			H = document.createElement("pre"),
			I = /^(\s*)([\s\S]*?)(\s*)$/;
		b.module("ngSanitize", []).provider("$sanitize", c), b.module("ngSanitize").filter("linky", ["$sanitize",
			function(a) {
				var c = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/,
					e = /^mailto:/;
				return function(f, g) {
					function h(a) {
						a && n.push(d(a))
					}

					function i(a, c) {
						n.push("<a "), b.isDefined(g) && (n.push('target="'), n.push(g), n.push('" ')), n.push('href="'), n.push(a), n.push('">'), h(c), n.push("</a>")
					}
					if (!f) return f;
					for (var j, k, l, m = f, n = []; j = m.match(c);) k = j[0], j[2] == j[3] && (k = "mailto:" + k), l = j.index, h(m.substr(0, l)), i(k, j[0].replace(e, "")), m = m.substring(l + j[0].length);
					return h(m), a(n.join(""))
				}
			}
		])
	}(window, window.angular), d("angular-sanitize", function() {}), angular.module("ui.bootstrap", ["ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope",
		function(a, b, c) {
			function d(a) {
				for (var b in a)
					if (void 0 !== f.style[b]) return a[b]
			}
			var e = function(d, f, g) {
				g = g || {};
				var h = a.defer(),
					i = e[g.animation ? "animationEndEventName" : "transitionEndEventName"],
					j = function() {
						c.$apply(function() {
							d.unbind(i, j), h.resolve(d)
						})
					};
				return i && d.bind(i, j), b(function() {
					angular.isString(f) ? d.addClass(f) : angular.isFunction(f) ? f(d) : angular.isObject(f) && d.css(f), i || h.resolve(d)
				}), h.promise.cancel = function() {
					i && d.unbind(i, j), h.reject("Transition cancelled")
				}, h.promise
			}, f = document.createElement("trans"),
				g = {
					WebkitTransition: "webkitTransitionEnd",
					MozTransition: "transitionend",
					OTransition: "oTransitionEnd",
					transition: "transitionend"
				}, h = {
					WebkitTransition: "webkitAnimationEnd",
					MozTransition: "animationend",
					OTransition: "oAnimationEnd",
					transition: "animationend"
				};
			return e.transitionEndEventName = d(g), e.animationEndEventName = d(h), e
		}
	]), angular.module("ui.bootstrap.collapse", ["ui.bootstrap.transition"]).directive("collapse", ["$transition",
		function(a) {
			return {
				link: function(b, c, d) {
					function e(b) {
						function d() {
							j === e && (j = void 0)
						}
						var e = a(c, b);
						return j && j.cancel(), j = e, e.then(d, d), e
					}

					function f() {
						k ? (k = !1, g()) : (c.removeClass("collapse").addClass("collapsing"), e({
							height: c[0].scrollHeight + "px"
						}).then(g))
					}

					function g() {
						c.removeClass("collapsing"), c.addClass("collapse in"), c.css({
							height: "auto"
						})
					}

					function h() {
						k ? (k = !1, i(), c.css({
							height: 0
						})) : (c.css({
							height: c[0].scrollHeight + "px"
						}), c[0].offsetWidth, c.removeClass("collapse in").addClass("collapsing"), e({
							height: 0
						}).then(i))
					}

					function i() {
						c.removeClass("collapsing"), c.addClass("collapse")
					}
					var j, k = !0;
					b.$watch(d.collapse, function(a) {
						a ? h() : f()
					})
				}
			}
		}
	]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", {
		closeOthers: !0
	}).controller("AccordionController", ["$scope", "$attrs", "accordionConfig",
		function(a, b, c) {
			this.groups = [], this.closeOthers = function(d) {
				var e = angular.isDefined(b.closeOthers) ? a.$eval(b.closeOthers) : c.closeOthers;
				e && angular.forEach(this.groups, function(a) {
					a !== d && (a.isOpen = !1)
				})
			}, this.addGroup = function(a) {
				var b = this;
				this.groups.push(a), a.$on("$destroy", function() {
					b.removeGroup(a)
				})
			}, this.removeGroup = function(a) {
				var b = this.groups.indexOf(a); - 1 !== b && this.groups.splice(b, 1)
			}
		}
	]).directive("accordion", function() {
		return {
			restrict: "EA",
			controller: "AccordionController",
			transclude: !0,
			replace: !1,
			templateUrl: "template/accordion/accordion.html"
		}
	}).directive("accordionGroup", function() {
		return {
			require: "^accordion",
			restrict: "EA",
			transclude: !0,
			replace: !0,
			templateUrl: "template/accordion/accordion-group.html",
			scope: {
				heading: "@",
				isOpen: "=?",
				isDisabled: "=?"
			},
			controller: function() {
				this.setHeading = function(a) {
					this.heading = a
				}
			},
			link: function(a, b, c, d) {
				d.addGroup(a), a.$watch("isOpen", function(b) {
					b && d.closeOthers(a)
				}), a.toggleOpen = function() {
					a.isDisabled || (a.isOpen = !a.isOpen)
				}
			}
		}
	}).directive("accordionHeading", function() {
		return {
			restrict: "EA",
			transclude: !0,
			template: "",
			replace: !0,
			require: "^accordionGroup",
			link: function(a, b, c, d, e) {
				d.setHeading(e(a, function() {}))
			}
		}
	}).directive("accordionTransclude", function() {
		return {
			require: "^accordionGroup",
			link: function(a, b, c, d) {
				a.$watch(function() {
					return d[c.accordionTransclude]
				}, function(a) {
					a && (b.html(""), b.append(a))
				})
			}
		}
	}), angular.module("ui.bootstrap.alert", []).controller("AlertController", ["$scope", "$attrs",
		function(a, b) {
			a.closeable = "close" in b, this.close = a.close
		}
	]).directive("alert", function() {
		return {
			restrict: "EA",
			controller: "AlertController",
			templateUrl: "template/alert/alert.html",
			transclude: !0,
			replace: !0,
			scope: {
				type: "@",
				close: "&"
			}
		}
	}).directive("dismissOnTimeout", ["$timeout",
		function(a) {
			return {
				require: "alert",
				link: function(b, c, d, e) {
					a(function() {
						e.close()
					}, parseInt(d.dismissOnTimeout, 10))
				}
			}
		}
	]), angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function() {
		return function(a, b, c) {
			b.addClass("ng-binding").data("$binding", c.bindHtmlUnsafe), a.$watch(c.bindHtmlUnsafe, function(a) {
				b.html(a || "")
			})
		}
	}), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
		activeClass: "active",
		toggleEvent: "click"
	}).controller("ButtonsController", ["buttonConfig",
		function(a) {
			this.activeClass = a.activeClass || "active", this.toggleEvent = a.toggleEvent || "click"
		}
	]).directive("btnRadio", function() {
		return {
			require: ["btnRadio", "ngModel"],
			controller: "ButtonsController",
			link: function(a, b, c, d) {
				var e = d[0],
					f = d[1];
				f.$render = function() {
					b.toggleClass(e.activeClass, angular.equals(f.$modelValue, a.$eval(c.btnRadio)))
				}, b.bind(e.toggleEvent, function() {
					var d = b.hasClass(e.activeClass);
					(!d || angular.isDefined(c.uncheckable)) && a.$apply(function() {
						f.$setViewValue(d ? null : a.$eval(c.btnRadio)), f.$render()
					})
				})
			}
		}
	}).directive("btnCheckbox", function() {
		return {
			require: ["btnCheckbox", "ngModel"],
			controller: "ButtonsController",
			link: function(a, b, c, d) {
				function e() {
					return g(c.btnCheckboxTrue, !0)
				}

				function f() {
					return g(c.btnCheckboxFalse, !1)
				}

				function g(b, c) {
					var d = a.$eval(b);
					return angular.isDefined(d) ? d : c
				}
				var h = d[0],
					i = d[1];
				i.$render = function() {
					b.toggleClass(h.activeClass, angular.equals(i.$modelValue, e()))
				}, b.bind(h.toggleEvent, function() {
					a.$apply(function() {
						i.$setViewValue(b.hasClass(h.activeClass) ? f() : e()), i.$render()
					})
				})
			}
		}
	}), angular.module("ui.bootstrap.carousel", ["ui.bootstrap.transition"]).controller("CarouselController", ["$scope", "$timeout", "$interval", "$transition",
		function(a, b, c, d) {
			function e() {
				f();
				var b = +a.interval;
				!isNaN(b) && b > 0 && (h = c(g, b))
			}

			function f() {
				h && (c.cancel(h), h = null)
			}

			function g() {
				var b = +a.interval;
				i && !isNaN(b) && b > 0 ? a.next() : a.pause()
			}
			var h, i, j = this,
				k = j.slides = a.slides = [],
				l = -1;
			j.currentSlide = null;
			var m = !1;
			j.select = a.select = function(c, f) {
				function g() {
					m || (j.currentSlide && angular.isString(f) && !a.noTransition && c.$element ? (c.$element.addClass(f), c.$element[0].offsetWidth, angular.forEach(k, function(a) {
						angular.extend(a, {
							direction: "",
							entering: !1,
							leaving: !1,
							active: !1
						})
					}), angular.extend(c, {
						direction: f,
						active: !0,
						entering: !0
					}), angular.extend(j.currentSlide || {}, {
						direction: f,
						leaving: !0
					}), a.$currentTransition = d(c.$element, {}), function(b, c) {
						a.$currentTransition.then(function() {
							h(b, c)
						}, function() {
							h(b, c)
						})
					}(c, j.currentSlide)) : h(c, j.currentSlide), j.currentSlide = c, l = i, e())
				}

				function h(b, c) {
					angular.extend(b, {
						direction: "",
						active: !0,
						leaving: !1,
						entering: !1
					}), angular.extend(c || {}, {
						direction: "",
						active: !1,
						leaving: !1,
						entering: !1
					}), a.$currentTransition = null
				}
				var i = k.indexOf(c);
				void 0 === f && (f = i > l ? "next" : "prev"), c && c !== j.currentSlide && (a.$currentTransition ? (a.$currentTransition.cancel(), b(g)) : g())
			}, a.$on("$destroy", function() {
				m = !0
			}), j.indexOfSlide = function(a) {
				return k.indexOf(a)
			}, a.next = function() {
				var b = (l + 1) % k.length;
				return a.$currentTransition ? void 0 : j.select(k[b], "next")
			}, a.prev = function() {
				var b = 0 > l - 1 ? k.length - 1 : l - 1;
				return a.$currentTransition ? void 0 : j.select(k[b], "prev")
			}, a.isActive = function(a) {
				return j.currentSlide === a
			}, a.$watch("interval", e), a.$on("$destroy", f), a.play = function() {
				i || (i = !0, e())
			}, a.pause = function() {
				a.noPause || (i = !1, f())
			}, j.addSlide = function(b, c) {
				b.$element = c, k.push(b), 1 === k.length || b.active ? (j.select(k[k.length - 1]), 1 == k.length && a.play()) : b.active = !1
			}, j.removeSlide = function(a) {
				var b = k.indexOf(a);
				k.splice(b, 1), k.length > 0 && a.active ? j.select(b >= k.length ? k[b - 1] : k[b]) : l > b && l--
			}
		}
	]).directive("carousel", [
		function() {
			return {
				restrict: "EA",
				transclude: !0,
				replace: !0,
				controller: "CarouselController",
				require: "carousel",
				templateUrl: "template/carousel/carousel.html",
				scope: {
					interval: "=",
					noTransition: "=",
					noPause: "="
				}
			}
		}
	]).directive("slide", function() {
		return {
			require: "^carousel",
			restrict: "EA",
			transclude: !0,
			replace: !0,
			templateUrl: "template/carousel/slide.html",
			scope: {
				active: "=?"
			},
			link: function(a, b, c, d) {
				d.addSlide(a, b), a.$on("$destroy", function() {
					d.removeSlide(a)
				}), a.$watch("active", function(b) {
					b && d.select(a)
				})
			}
		}
	}), angular.module("ui.bootstrap.dateparser", []).service("dateParser", ["$locale", "orderByFilter",
		function(a, b) {
			function c(a) {
				var c = [],
					d = a.split("");
				return angular.forEach(e, function(b, e) {
					var f = a.indexOf(e);
					if (f > -1) {
						a = a.split(""), d[f] = "(" + b.regex + ")", a[f] = "$";
						for (var g = f + 1, h = f + e.length; h > g; g++) d[g] = "", a[g] = "$";
						a = a.join(""), c.push({
							index: f,
							apply: b.apply
						})
					}
				}), {
					regex: new RegExp("^" + d.join("") + "$"),
					map: b(c, "index")
				}
			}

			function d(a, b, c) {
				return 1 === b && c > 28 ? 29 === c && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0) : 3 === b || 5 === b || 8 === b || 10 === b ? 31 > c : !0
			}
			this.parsers = {};
			var e = {
				yyyy: {
					regex: "\\d{4}",
					apply: function(a) {
						this.year = +a
					}
				},
				yy: {
					regex: "\\d{2}",
					apply: function(a) {
						this.year = +a + 2e3
					}
				},
				y: {
					regex: "\\d{1,4}",
					apply: function(a) {
						this.year = +a
					}
				},
				MMMM: {
					regex: a.DATETIME_FORMATS.MONTH.join("|"),
					apply: function(b) {
						this.month = a.DATETIME_FORMATS.MONTH.indexOf(b)
					}
				},
				MMM: {
					regex: a.DATETIME_FORMATS.SHORTMONTH.join("|"),
					apply: function(b) {
						this.month = a.DATETIME_FORMATS.SHORTMONTH.indexOf(b)
					}
				},
				MM: {
					regex: "0[1-9]|1[0-2]",
					apply: function(a) {
						this.month = a - 1
					}
				},
				M: {
					regex: "[1-9]|1[0-2]",
					apply: function(a) {
						this.month = a - 1
					}
				},
				dd: {
					regex: "[0-2][0-9]{1}|3[0-1]{1}",
					apply: function(a) {
						this.date = +a
					}
				},
				d: {
					regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
					apply: function(a) {
						this.date = +a
					}
				},
				EEEE: {
					regex: a.DATETIME_FORMATS.DAY.join("|")
				},
				EEE: {
					regex: a.DATETIME_FORMATS.SHORTDAY.join("|")
				}
			};
			this.parse = function(b, e) {
				if (!angular.isString(b) || !e) return b;
				e = a.DATETIME_FORMATS[e] || e, this.parsers[e] || (this.parsers[e] = c(e));
				var f = this.parsers[e],
					g = f.regex,
					h = f.map,
					i = b.match(g);
				if (i && i.length) {
					for (var j, k = {
							year: 1900,
							month: 0,
							date: 1,
							hours: 0
						}, l = 1, m = i.length; m > l; l++) {
						var n = h[l - 1];
						n.apply && n.apply.call(k, i[l])
					}
					return d(k.year, k.month, k.date) && (j = new Date(k.year, k.month, k.date, k.hours)), j
				}
			}
		}
	]), angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window",
		function(a, b) {
			function c(a, c) {
				return a.currentStyle ? a.currentStyle[c] : b.getComputedStyle ? b.getComputedStyle(a)[c] : a.style[c]
			}

			function d(a) {
				return "static" === (c(a, "position") || "static")
			}
			var e = function(b) {
				for (var c = a[0], e = b.offsetParent || c; e && e !== c && d(e);) e = e.offsetParent;
				return e || c
			};
			return {
				position: function(b) {
					var c = this.offset(b),
						d = {
							top: 0,
							left: 0
						}, f = e(b[0]);
					f != a[0] && (d = this.offset(angular.element(f)), d.top += f.clientTop - f.scrollTop, d.left += f.clientLeft - f.scrollLeft);
					var g = b[0].getBoundingClientRect();
					return {
						width: g.width || b.prop("offsetWidth"),
						height: g.height || b.prop("offsetHeight"),
						top: c.top - d.top,
						left: c.left - d.left
					}
				},
				offset: function(c) {
					var d = c[0].getBoundingClientRect();
					return {
						width: d.width || c.prop("offsetWidth"),
						height: d.height || c.prop("offsetHeight"),
						top: d.top + (b.pageYOffset || a[0].documentElement.scrollTop),
						left: d.left + (b.pageXOffset || a[0].documentElement.scrollLeft)
					}
				},
				positionElements: function(a, b, c, d) {
					var e, f, g, h, i = c.split("-"),
						j = i[0],
						k = i[1] || "center";
					e = d ? this.offset(a) : this.position(a), f = b.prop("offsetWidth"), g = b.prop("offsetHeight");
					var l = {
						center: function() {
							return e.left + e.width / 2 - f / 2
						},
						left: function() {
							return e.left
						},
						right: function() {
							return e.left + e.width
						}
					}, m = {
							center: function() {
								return e.top + e.height / 2 - g / 2
							},
							top: function() {
								return e.top
							},
							bottom: function() {
								return e.top + e.height
							}
						};
					switch (j) {
						case "right":
							h = {
								top: m[k](),
								left: l[j]()
							};
							break;
						case "left":
							h = {
								top: m[k](),
								left: e.left - f
							};
							break;
						case "bottom":
							h = {
								top: m[j](),
								left: l[k]()
							};
							break;
						default:
							h = {
								top: e.top - g,
								left: l[k]()
							}
					}
					return h
				}
			}
		}
	]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.dateparser", "ui.bootstrap.position"]).constant("datepickerConfig", {
		formatDay: "dd",
		formatMonth: "MMMM",
		formatYear: "yyyy",
		formatDayHeader: "EEE",
		formatDayTitle: "MMMM yyyy",
		formatMonthTitle: "yyyy",
		datepickerMode: "day",
		minMode: "day",
		maxMode: "year",
		showWeeks: !0,
		startingDay: 0,
		yearRange: 20,
		minDate: null,
		maxDate: null
	}).controller("DatepickerController", ["$scope", "$attrs", "$parse", "$interpolate", "$timeout", "$log", "dateFilter", "datepickerConfig",
		function(a, b, c, d, e, f, g, h) {
			var i = this,
				j = {
					$setViewValue: angular.noop
				};
			this.modes = ["day", "month", "year"], angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "minMode", "maxMode", "showWeeks", "startingDay", "yearRange"], function(c, e) {
				i[c] = angular.isDefined(b[c]) ? 8 > e ? d(b[c])(a.$parent) : a.$parent.$eval(b[c]) : h[c]
			}), angular.forEach(["minDate", "maxDate"], function(d) {
				b[d] ? a.$parent.$watch(c(b[d]), function(a) {
					i[d] = a ? new Date(a) : null, i.refreshView()
				}) : i[d] = h[d] ? new Date(h[d]) : null
			}), a.datepickerMode = a.datepickerMode || h.datepickerMode, a.uniqueId = "datepicker-" + a.$id + "-" + Math.floor(1e4 * Math.random()), this.activeDate = angular.isDefined(b.initDate) ? a.$parent.$eval(b.initDate) : new Date, a.isActive = function(b) {
				return 0 === i.compare(b.date, i.activeDate) ? (a.activeDateId = b.uid, !0) : !1
			}, this.init = function(a) {
				j = a, j.$render = function() {
					i.render()
				}
			}, this.render = function() {
				if (j.$modelValue) {
					var a = new Date(j.$modelValue),
						b = !isNaN(a);
					b ? this.activeDate = a : f.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'), j.$setValidity("date", b)
				}
				this.refreshView()
			}, this.refreshView = function() {
				if (this.element) {
					this._refreshView();
					var a = j.$modelValue ? new Date(j.$modelValue) : null;
					j.$setValidity("date-disabled", !a || this.element && !this.isDisabled(a))
				}
			}, this.createDateObject = function(a, b) {
				var c = j.$modelValue ? new Date(j.$modelValue) : null;
				return {
					date: a,
					label: g(a, b),
					selected: c && 0 === this.compare(a, c),
					disabled: this.isDisabled(a),
					current: 0 === this.compare(a, new Date)
				}
			}, this.isDisabled = function(c) {
				return this.minDate && this.compare(c, this.minDate) < 0 || this.maxDate && this.compare(c, this.maxDate) > 0 || b.dateDisabled && a.dateDisabled({
					date: c,
					mode: a.datepickerMode
				})
			}, this.split = function(a, b) {
				for (var c = []; a.length > 0;) c.push(a.splice(0, b));
				return c
			}, a.select = function(b) {
				if (a.datepickerMode === i.minMode) {
					var c = j.$modelValue ? new Date(j.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
					c.setFullYear(b.getFullYear(), b.getMonth(), b.getDate()), j.$setViewValue(c), j.$render()
				} else i.activeDate = b, a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) - 1]
			}, a.move = function(a) {
				var b = i.activeDate.getFullYear() + a * (i.step.years || 0),
					c = i.activeDate.getMonth() + a * (i.step.months || 0);
				i.activeDate.setFullYear(b, c, 1), i.refreshView()
			}, a.toggleMode = function(b) {
				b = b || 1, a.datepickerMode === i.maxMode && 1 === b || a.datepickerMode === i.minMode && -1 === b || (a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) + b])
			}, a.keys = {
				13: "enter",
				32: "space",
				33: "pageup",
				34: "pagedown",
				35: "end",
				36: "home",
				37: "left",
				38: "up",
				39: "right",
				40: "down"
			};
			var k = function() {
				e(function() {
					i.element[0].focus()
				}, 0, !1)
			};
			a.$on("datepicker.focus", k), a.keydown = function(b) {
				var c = a.keys[b.which];
				if (c && !b.shiftKey && !b.altKey)
					if (b.preventDefault(), b.stopPropagation(), "enter" === c || "space" === c) {
						if (i.isDisabled(i.activeDate)) return;
						a.select(i.activeDate), k()
					} else !b.ctrlKey || "up" !== c && "down" !== c ? (i.handleKeyDown(c, b), i.refreshView()) : (a.toggleMode("up" === c ? 1 : -1), k())
			}
		}
	]).directive("datepicker", function() {
		return {
			restrict: "EA",
			replace: !0,
			templateUrl: "template/datepicker/datepicker.html",
			scope: {
				datepickerMode: "=?",
				dateDisabled: "&"
			},
			require: ["datepicker", "?^ngModel"],
			controller: "DatepickerController",
			link: function(a, b, c, d) {
				var e = d[0],
					f = d[1];
				f && e.init(f)
			}
		}
	}).directive("daypicker", ["dateFilter",
		function(a) {
			return {
				restrict: "EA",
				replace: !0,
				templateUrl: "template/datepicker/day.html",
				require: "^datepicker",
				link: function(b, c, d, e) {
					function f(a, b) {
						return 1 !== b || a % 4 !== 0 || a % 100 === 0 && a % 400 !== 0 ? i[b] : 29
					}

					function g(a, b) {
						var c = new Array(b),
							d = new Date(a),
							e = 0;
						for (d.setHours(12); b > e;) c[e++] = new Date(d), d.setDate(d.getDate() + 1);
						return c
					}

					function h(a) {
						var b = new Date(a);
						b.setDate(b.getDate() + 4 - (b.getDay() || 7));
						var c = b.getTime();
						return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1
					}
					b.showWeeks = e.showWeeks, e.step = {
						months: 1
					}, e.element = c;
					var i = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
					e._refreshView = function() {
						var c = e.activeDate.getFullYear(),
							d = e.activeDate.getMonth(),
							f = new Date(c, d, 1),
							i = e.startingDay - f.getDay(),
							j = i > 0 ? 7 - i : -i,
							k = new Date(f);
						j > 0 && k.setDate(-j + 1);
						for (var l = g(k, 42), m = 0; 42 > m; m++) l[m] = angular.extend(e.createDateObject(l[m], e.formatDay), {
							secondary: l[m].getMonth() !== d,
							uid: b.uniqueId + "-" + m
						});
						b.labels = new Array(7);
						for (var n = 0; 7 > n; n++) b.labels[n] = {
							abbr: a(l[n].date, e.formatDayHeader),
							full: a(l[n].date, "EEEE")
						};
						if (b.title = a(e.activeDate, e.formatDayTitle), b.rows = e.split(l, 7), b.showWeeks) {
							b.weekNumbers = [];
							for (var o = h(b.rows[0][0].date), p = b.rows.length; b.weekNumbers.push(o++) < p;);
						}
					}, e.compare = function(a, b) {
						return new Date(a.getFullYear(), a.getMonth(), a.getDate()) - new Date(b.getFullYear(), b.getMonth(), b.getDate())
					}, e.handleKeyDown = function(a) {
						var b = e.activeDate.getDate();
						if ("left" === a) b -= 1;
						else if ("up" === a) b -= 7;
						else if ("right" === a) b += 1;
						else if ("down" === a) b += 7;
						else if ("pageup" === a || "pagedown" === a) {
							var c = e.activeDate.getMonth() + ("pageup" === a ? -1 : 1);
							e.activeDate.setMonth(c, 1), b = Math.min(f(e.activeDate.getFullYear(), e.activeDate.getMonth()), b)
						} else "home" === a ? b = 1 : "end" === a && (b = f(e.activeDate.getFullYear(), e.activeDate.getMonth()));
						e.activeDate.setDate(b)
					}, e.refreshView()
				}
			}
		}
	]).directive("monthpicker", ["dateFilter",
		function(a) {
			return {
				restrict: "EA",
				replace: !0,
				templateUrl: "template/datepicker/month.html",
				require: "^datepicker",
				link: function(b, c, d, e) {
					e.step = {
						years: 1
					}, e.element = c, e._refreshView = function() {
						for (var c = new Array(12), d = e.activeDate.getFullYear(), f = 0; 12 > f; f++) c[f] = angular.extend(e.createDateObject(new Date(d, f, 1), e.formatMonth), {
							uid: b.uniqueId + "-" + f
						});
						b.title = a(e.activeDate, e.formatMonthTitle), b.rows = e.split(c, 3)
					}, e.compare = function(a, b) {
						return new Date(a.getFullYear(), a.getMonth()) - new Date(b.getFullYear(), b.getMonth())
					}, e.handleKeyDown = function(a) {
						var b = e.activeDate.getMonth();
						if ("left" === a) b -= 1;
						else if ("up" === a) b -= 3;
						else if ("right" === a) b += 1;
						else if ("down" === a) b += 3;
						else if ("pageup" === a || "pagedown" === a) {
							var c = e.activeDate.getFullYear() + ("pageup" === a ? -1 : 1);
							e.activeDate.setFullYear(c)
						} else "home" === a ? b = 0 : "end" === a && (b = 11);
						e.activeDate.setMonth(b)
					}, e.refreshView()
				}
			}
		}
	]).directive("yearpicker", ["dateFilter",
		function() {
			return {
				restrict: "EA",
				replace: !0,
				templateUrl: "template/datepicker/year.html",
				require: "^datepicker",
				link: function(a, b, c, d) {
					function e(a) {
						return parseInt((a - 1) / f, 10) * f + 1
					}
					var f = d.yearRange;
					d.step = {
						years: f
					}, d.element = b, d._refreshView = function() {
						for (var b = new Array(f), c = 0, g = e(d.activeDate.getFullYear()); f > c; c++) b[c] = angular.extend(d.createDateObject(new Date(g + c, 0, 1), d.formatYear), {
							uid: a.uniqueId + "-" + c
						});
						a.title = [b[0].label, b[f - 1].label].join(" - "), a.rows = d.split(b, 5)
					}, d.compare = function(a, b) {
						return a.getFullYear() - b.getFullYear()
					}, d.handleKeyDown = function(a) {
						var b = d.activeDate.getFullYear();
						"left" === a ? b -= 1 : "up" === a ? b -= 5 : "right" === a ? b += 1 : "down" === a ? b += 5 : "pageup" === a || "pagedown" === a ? b += ("pageup" === a ? -1 : 1) * d.step.years : "home" === a ? b = e(d.activeDate.getFullYear()) : "end" === a && (b = e(d.activeDate.getFullYear()) + f - 1), d.activeDate.setFullYear(b)
					}, d.refreshView()
				}
			}
		}
	]).constant("datepickerPopupConfig", {
		datepickerPopup: "yyyy-MM-dd",
		currentText: "Today",
		clearText: "Clear",
		closeText: "Done",
		closeOnDateSelection: !0,
		appendToBody: !1,
		showButtonBar: !0
	}).directive("datepickerPopup", ["$compile", "$parse", "$document", "$position", "dateFilter", "dateParser", "datepickerPopupConfig",
		function(a, b, c, d, e, f, g) {
			return {
				restrict: "EA",
				require: "ngModel",
				scope: {
					isOpen: "=?",
					currentText: "@",
					clearText: "@",
					closeText: "@",
					dateDisabled: "&"
				},
				link: function(h, i, j, k) {
					function l(a) {
						return a.replace(/([A-Z])/g, function(a) {
							return "-" + a.toLowerCase()
						})
					}

					function m(a) {
						if (a) {
							if (angular.isDate(a) && !isNaN(a)) return k.$setValidity("date", !0), a;
							if (angular.isString(a)) {
								var b = f.parse(a, n) || new Date(a);
								return isNaN(b) ? void k.$setValidity("date", !1) : (k.$setValidity("date", !0), b)
							}
							return void k.$setValidity("date", !1)
						}
						return k.$setValidity("date", !0), null
					}
					var n, o = angular.isDefined(j.closeOnDateSelection) ? h.$parent.$eval(j.closeOnDateSelection) : g.closeOnDateSelection,
						p = angular.isDefined(j.datepickerAppendToBody) ? h.$parent.$eval(j.datepickerAppendToBody) : g.appendToBody;
					h.showButtonBar = angular.isDefined(j.showButtonBar) ? h.$parent.$eval(j.showButtonBar) : g.showButtonBar, h.getText = function(a) {
						return h[a + "Text"] || g[a + "Text"]
					}, j.$observe("datepickerPopup", function(a) {
						n = a || g.datepickerPopup, k.$render()
					});
					var q = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
					q.attr({
						"ng-model": "date",
						"ng-change": "dateSelection()"
					});
					var r = angular.element(q.children()[0]);
					j.datepickerOptions && angular.forEach(h.$parent.$eval(j.datepickerOptions), function(a, b) {
						r.attr(l(b), a)
					}), h.watchData = {}, angular.forEach(["minDate", "maxDate", "datepickerMode"], function(a) {
						if (j[a]) {
							var c = b(j[a]);
							if (h.$parent.$watch(c, function(b) {
								h.watchData[a] = b
							}), r.attr(l(a), "watchData." + a), "datepickerMode" === a) {
								var d = c.assign;
								h.$watch("watchData." + a, function(a, b) {
									a !== b && d(h.$parent, a)
								})
							}
						}
					}), j.dateDisabled && r.attr("date-disabled", "dateDisabled({ date: date, mode: mode })"), k.$parsers.unshift(m), h.dateSelection = function(a) {
						angular.isDefined(a) && (h.date = a), k.$setViewValue(h.date), k.$render(), o && (h.isOpen = !1, i[0].focus())
					}, i.bind("input change keyup", function() {
						h.$apply(function() {
							h.date = k.$modelValue
						})
					}), k.$render = function() {
						var a = k.$viewValue ? e(k.$viewValue, n) : "";
						i.val(a), h.date = m(k.$modelValue)
					};
					var s = function(a) {
						h.isOpen && a.target !== i[0] && h.$apply(function() {
							h.isOpen = !1
						})
					}, t = function(a) {
							h.keydown(a)
						};
					i.bind("keydown", t), h.keydown = function(a) {
						27 === a.which ? (a.preventDefault(), a.stopPropagation(), h.close()) : 40 !== a.which || h.isOpen || (h.isOpen = !0)
					}, h.$watch("isOpen", function(a) {
						a ? (h.$broadcast("datepicker.focus"), h.position = p ? d.offset(i) : d.position(i), h.position.top = h.position.top + i.prop("offsetHeight"), c.bind("click", s)) : c.unbind("click", s)
					}), h.select = function(a) {
						if ("today" === a) {
							var b = new Date;
							angular.isDate(k.$modelValue) ? (a = new Date(k.$modelValue), a.setFullYear(b.getFullYear(), b.getMonth(), b.getDate())) : a = new Date(b.setHours(0, 0, 0, 0))
						}
						h.dateSelection(a)
					}, h.close = function() {
						h.isOpen = !1, i[0].focus()
					};
					var u = a(q)(h);
					q.remove(), p ? c.find("body").append(u) : i.after(u), h.$on("$destroy", function() {
						u.remove(), i.unbind("keydown", t), c.unbind("click", s)
					})
				}
			}
		}
	]).directive("datepickerPopupWrap", function() {
		return {
			restrict: "EA",
			replace: !0,
			transclude: !0,
			templateUrl: "template/datepicker/popup.html",
			link: function(a, b) {
				b.bind("click", function(a) {
					a.preventDefault(), a.stopPropagation()
				})
			}
		}
	}), angular.module("ui.bootstrap.dropdown", []).constant("dropdownConfig", {
		openClass: "open"
	}).service("dropdownService", ["$document",
		function(a) {
			var b = null;
			this.open = function(e) {
				b || (a.bind("click", c), a.bind("keydown", d)), b && b !== e && (b.isOpen = !1), b = e
			}, this.close = function(e) {
				b === e && (b = null, a.unbind("click", c), a.unbind("keydown", d))
			};
			var c = function(a) {
				if (b) {
					var c = b.getToggleElement();
					a && c && c[0].contains(a.target) || b.$apply(function() {
						b.isOpen = !1
					})
				}
			}, d = function(a) {
					27 === a.which && (b.focusToggleElement(), c())
				}
		}
	]).controller("DropdownController", ["$scope", "$attrs", "$parse", "dropdownConfig", "dropdownService", "$animate",
		function(a, b, c, d, e, f) {
			var g, h = this,
				i = a.$new(),
				j = d.openClass,
				k = angular.noop,
				l = b.onToggle ? c(b.onToggle) : angular.noop;
			this.init = function(d) {
				h.$element = d, b.isOpen && (g = c(b.isOpen), k = g.assign, a.$watch(g, function(a) {
					i.isOpen = !! a
				}))
			}, this.toggle = function(a) {
				return i.isOpen = arguments.length ? !! a : !i.isOpen
			}, this.isOpen = function() {
				return i.isOpen
			}, i.getToggleElement = function() {
				return h.toggleElement
			}, i.focusToggleElement = function() {
				h.toggleElement && h.toggleElement[0].focus()
			}, i.$watch("isOpen", function(b, c) {
				f[b ? "addClass" : "removeClass"](h.$element, j), b ? (i.focusToggleElement(), e.open(i)) : e.close(i), k(a, b), angular.isDefined(b) && b !== c && l(a, {
					open: !! b
				})
			}), a.$on("$locationChangeSuccess", function() {
				i.isOpen = !1
			}), a.$on("$destroy", function() {
				i.$destroy()
			})
		}
	]).directive("dropdown", function() {
		return {
			controller: "DropdownController",
			link: function(a, b, c, d) {
				d.init(b)
			}
		}
	}).directive("dropdownToggle", function() {
		return {
			require: "?^dropdown",
			link: function(a, b, c, d) {
				if (d) {
					d.toggleElement = b;
					var e = function(e) {
						e.preventDefault(), b.hasClass("disabled") || c.disabled || a.$apply(function() {
							d.toggle()
						})
					};
					b.bind("click", e), b.attr({
						"aria-haspopup": !0,
						"aria-expanded": !1
					}), a.$watch(d.isOpen, function(a) {
						b.attr("aria-expanded", !! a)
					}), a.$on("$destroy", function() {
						b.unbind("click", e)
					})
				}
			}
		}
	}), angular.module("ui.bootstrap.modal", ["ui.bootstrap.transition"]).factory("$$stackedMap", function() {
		return {
			createNew: function() {
				var a = [];
				return {
					add: function(b, c) {
						a.push({
							key: b,
							value: c
						})
					},
					get: function(b) {
						for (var c = 0; c < a.length; c++)
							if (b == a[c].key) return a[c]
					},
					keys: function() {
						for (var b = [], c = 0; c < a.length; c++) b.push(a[c].key);
						return b
					},
					top: function() {
						return a[a.length - 1]
					},
					remove: function(b) {
						for (var c = -1, d = 0; d < a.length; d++)
							if (b == a[d].key) {
								c = d;
								break
							}
						return a.splice(c, 1)[0]
					},
					removeTop: function() {
						return a.splice(a.length - 1, 1)[0]
					},
					length: function() {
						return a.length
					}
				}
			}
		}
	}).directive("modalBackdrop", ["$timeout",
		function(a) {
			return {
				restrict: "EA",
				replace: !0,
				templateUrl: "template/modal/backdrop.html",
				link: function(b, c, d) {
					b.backdropClass = d.backdropClass || "", b.animate = !1, a(function() {
						b.animate = !0
					})
				}
			}
		}
	]).directive("modalWindow", ["$modalStack", "$timeout",
		function(a, b) {
			return {
				restrict: "EA",
				scope: {
					index: "@",
					animate: "="
				},
				replace: !0,
				transclude: !0,
				templateUrl: function(a, b) {
					return b.templateUrl || "template/modal/window.html"
				},
				link: function(c, d, e) {
					d.addClass(e.windowClass || ""), c.size = e.size, b(function() {
						c.animate = !0, d[0].querySelectorAll("[autofocus]").length || d[0].focus()
					}), c.close = function(b) {
						var c = a.getTop();
						c && c.value.backdrop && "static" != c.value.backdrop && b.target === b.currentTarget && (b.preventDefault(), b.stopPropagation(), a.dismiss(c.key, "backdrop click"))
					}
				}
			}
		}
	]).directive("modalTransclude", function() {
		return {
			link: function(a, b, c, d, e) {
				e(a.$parent, function(a) {
					b.empty(), b.append(a)
				})
			}
		}
	}).factory("$modalStack", ["$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap",
		function(a, b, c, d, e, f) {
			function g() {
				for (var a = -1, b = n.keys(), c = 0; c < b.length; c++) n.get(b[c]).value.backdrop && (a = c);
				return a
			}

			function h(a) {
				var b = c.find("body").eq(0),
					d = n.get(a).value;
				n.remove(a), j(d.modalDomEl, d.modalScope, 300, function() {
					d.modalScope.$destroy(), b.toggleClass(m, n.length() > 0), i()
				})
			}

			function i() {
				if (k && -1 == g()) {
					var a = l;
					j(k, l, 150, function() {
						a.$destroy(), a = null
					}), k = void 0, l = void 0
				}
			}

			function j(c, d, e, f) {
				function g() {
					g.done || (g.done = !0, c.remove(), f && f())
				}
				d.animate = !1;
				var h = a.transitionEndEventName;
				if (h) {
					var i = b(g, e);
					c.bind(h, function() {
						b.cancel(i), g(), d.$apply()
					})
				} else b(g)
			}
			var k, l, m = "modal-open",
				n = f.createNew(),
				o = {};
			return e.$watch(g, function(a) {
				l && (l.index = a)
			}), c.bind("keydown", function(a) {
				var b;
				27 === a.which && (b = n.top(), b && b.value.keyboard && (a.preventDefault(), e.$apply(function() {
					o.dismiss(b.key, "escape key press")
				})))
			}), o.open = function(a, b) {
				n.add(a, {
					deferred: b.deferred,
					modalScope: b.scope,
					backdrop: b.backdrop,
					keyboard: b.keyboard
				});
				var f = c.find("body").eq(0),
					h = g();
				if (h >= 0 && !k) {
					l = e.$new(!0), l.index = h;
					var i = angular.element("<div modal-backdrop></div>");
					i.attr("backdrop-class", b.backdropClass), k = d(i)(l), f.append(k)
				}
				var j = angular.element("<div modal-window></div>");
				j.attr({
					"template-url": b.windowTemplateUrl,
					"window-class": b.windowClass,
					size: b.size,
					index: n.length() - 1,
					animate: "animate"
				}).html(b.content);
				var o = d(j)(b.scope);
				n.top().value.modalDomEl = o, f.append(o), f.addClass(m)
			}, o.close = function(a, b) {
				var c = n.get(a);
				c && (c.value.deferred.resolve(b), h(a))
			}, o.dismiss = function(a, b) {
				var c = n.get(a);
				c && (c.value.deferred.reject(b), h(a))
			}, o.dismissAll = function(a) {
				for (var b = this.getTop(); b;) this.dismiss(b.key, a), b = this.getTop()
			}, o.getTop = function() {
				return n.top()
			}, o
		}
	]).provider("$modal", function() {
		var a = {
			options: {
				backdrop: !0,
				keyboard: !0
			},
			$get: ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack",
				function(b, c, d, e, f, g, h) {
					function i(a) {
						return a.template ? d.when(a.template) : e.get(angular.isFunction(a.templateUrl) ? a.templateUrl() : a.templateUrl, {
							cache: f
						}).then(function(a) {
							return a.data
						})
					}

					function j(a) {
						var c = [];
						return angular.forEach(a, function(a) {
							(angular.isFunction(a) || angular.isArray(a)) && c.push(d.when(b.invoke(a)))
						}), c
					}
					var k = {};
					return k.open = function(b) {
						var e = d.defer(),
							f = d.defer(),
							k = {
								result: e.promise,
								opened: f.promise,
								close: function(a) {
									h.close(k, a)
								},
								dismiss: function(a) {
									h.dismiss(k, a)
								}
							};
						if (b = angular.extend({}, a.options, b), b.resolve = b.resolve || {}, !b.template && !b.templateUrl) throw new Error("One of template or templateUrl options is required.");
						var l = d.all([i(b)].concat(j(b.resolve)));
						return l.then(function(a) {
							var d = (b.scope || c).$new();
							d.$close = k.close, d.$dismiss = k.dismiss;
							var f, i = {}, j = 1;
							b.controller && (i.$scope = d, i.$modalInstance = k, angular.forEach(b.resolve, function(b, c) {
								i[c] = a[j++]
							}), f = g(b.controller, i), b.controllerAs && (d[b.controllerAs] = f)), h.open(k, {
								scope: d,
								deferred: e,
								content: a[0],
								backdrop: b.backdrop,
								keyboard: b.keyboard,
								backdropClass: b.backdropClass,
								windowClass: b.windowClass,
								windowTemplateUrl: b.windowTemplateUrl,
								size: b.size
							})
						}, function(a) {
							e.reject(a)
						}), l.then(function() {
							f.resolve(!0)
						}, function() {
							f.reject(!1)
						}), k
					}, k
				}
			]
		};
		return a
	}), angular.module("ui.bootstrap.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse",
		function(a, b, c) {
			var d = this,
				e = {
					$setViewValue: angular.noop
				}, f = b.numPages ? c(b.numPages).assign : angular.noop;
			this.init = function(f, g) {
				e = f, this.config = g, e.$render = function() {
					d.render()
				}, b.itemsPerPage ? a.$parent.$watch(c(b.itemsPerPage), function(b) {
					d.itemsPerPage = parseInt(b, 10), a.totalPages = d.calculateTotalPages()
				}) : this.itemsPerPage = g.itemsPerPage
			}, this.calculateTotalPages = function() {
				var b = this.itemsPerPage < 1 ? 1 : Math.ceil(a.totalItems / this.itemsPerPage);
				return Math.max(b || 0, 1)
			}, this.render = function() {
				a.page = parseInt(e.$viewValue, 10) || 1
			}, a.selectPage = function(b) {
				a.page !== b && b > 0 && b <= a.totalPages && (e.$setViewValue(b), e.$render())
			}, a.getText = function(b) {
				return a[b + "Text"] || d.config[b + "Text"]
			}, a.noPrevious = function() {
				return 1 === a.page
			}, a.noNext = function() {
				return a.page === a.totalPages
			}, a.$watch("totalItems", function() {
				a.totalPages = d.calculateTotalPages()
			}), a.$watch("totalPages", function(b) {
				f(a.$parent, b), a.page > b ? a.selectPage(b) : e.$render()
			})
		}
	]).constant("paginationConfig", {
		itemsPerPage: 10,
		boundaryLinks: !1,
		directionLinks: !0,
		firstText: "First",
		previousText: "Previous",
		nextText: "Next",
		lastText: "Last",
		rotate: !0
	}).directive("pagination", ["$parse", "paginationConfig",
		function(a, b) {
			return {
				restrict: "EA",
				scope: {
					totalItems: "=",
					firstText: "@",
					previousText: "@",
					nextText: "@",
					lastText: "@"
				},
				require: ["pagination", "?ngModel"],
				controller: "PaginationController",
				templateUrl: "template/pagination/pagination.html",
				replace: !0,
				link: function(c, d, e, f) {
					function g(a, b, c) {
						return {
							number: a,
							text: b,
							active: c
						}
					}

					function h(a, b) {
						var c = [],
							d = 1,
							e = b,
							f = angular.isDefined(k) && b > k;
						f && (l ? (d = Math.max(a - Math.floor(k / 2), 1), e = d + k - 1, e > b && (e = b, d = e - k + 1)) : (d = (Math.ceil(a / k) - 1) * k + 1, e = Math.min(d + k - 1, b)));
						for (var h = d; e >= h; h++) {
							var i = g(h, h, h === a);
							c.push(i)
						}
						if (f && !l) {
							if (d > 1) {
								var j = g(d - 1, "...", !1);
								c.unshift(j)
							}
							if (b > e) {
								var m = g(e + 1, "...", !1);
								c.push(m)
							}
						}
						return c
					}
					var i = f[0],
						j = f[1];
					if (j) {
						var k = angular.isDefined(e.maxSize) ? c.$parent.$eval(e.maxSize) : b.maxSize,
							l = angular.isDefined(e.rotate) ? c.$parent.$eval(e.rotate) : b.rotate;
						c.boundaryLinks = angular.isDefined(e.boundaryLinks) ? c.$parent.$eval(e.boundaryLinks) : b.boundaryLinks, c.directionLinks = angular.isDefined(e.directionLinks) ? c.$parent.$eval(e.directionLinks) : b.directionLinks, i.init(j, b), e.maxSize && c.$parent.$watch(a(e.maxSize), function(a) {
							k = parseInt(a, 10), i.render()
						});
						var m = i.render;
						i.render = function() {
							m(), c.page > 0 && c.page <= c.totalPages && (c.pages = h(c.page, c.totalPages))
						}
					}
				}
			}
		}
	]).constant("pagerConfig", {
		itemsPerPage: 10,
		previousText: "« Previous",
		nextText: "Next »",
		align: !0
	}).directive("pager", ["pagerConfig",
		function(a) {
			return {
				restrict: "EA",
				scope: {
					totalItems: "=",
					previousText: "@",
					nextText: "@"
				},
				require: ["pager", "?ngModel"],
				controller: "PaginationController",
				templateUrl: "template/pagination/pager.html",
				replace: !0,
				link: function(b, c, d, e) {
					var f = e[0],
						g = e[1];
					g && (b.align = angular.isDefined(d.align) ? b.$parent.$eval(d.align) : a.align, f.init(g, a))
				}
			}
		}
	]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).provider("$tooltip", function() {
		function a(a) {
			var b = /[A-Z]/g,
				c = "-";
			return a.replace(b, function(a, b) {
				return (b ? c : "") + a.toLowerCase()
			})
		}
		var b = {
			placement: "top",
			animation: !0,
			popupDelay: 0
		}, c = {
				mouseenter: "mouseleave",
				click: "click",
				focus: "blur"
			}, d = {};
		this.options = function(a) {
			angular.extend(d, a)
		}, this.setTriggers = function(a) {
			angular.extend(c, a)
		}, this.$get = ["$window", "$compile", "$timeout", "$document", "$position", "$interpolate",
			function(e, f, g, h, i, j) {
				return function(e, k, l) {
					function m(a) {
						var b = a || n.trigger || l,
							d = c[b] || b;
						return {
							show: b,
							hide: d
						}
					}
					var n = angular.extend({}, b, d),
						o = a(e),
						p = j.startSymbol(),
						q = j.endSymbol(),
						r = "<div " + o + '-popup title="' + p + "title" + q + '" content="' + p + "content" + q + '" placement="' + p + "placement" + q + '" animation="animation" is-open="isOpen"></div>';
					return {
						restrict: "EA",
						compile: function() {
							var a = f(r);
							return function(b, c, d) {
								function f() {
									D.isOpen ? l() : j()
								}

								function j() {
									(!C || b.$eval(d[k + "Enable"])) && (s(), D.popupDelay ? z || (z = g(o, D.popupDelay, !1), z.then(function(a) {
										a()
									})) : o()())
								}

								function l() {
									b.$apply(function() {
										p()
									})
								}

								function o() {
									return z = null, y && (g.cancel(y), y = null), D.content ? (q(), w.css({
										top: 0,
										left: 0,
										display: "block"
									}), A ? h.find("body").append(w) : c.after(w), E(), D.isOpen = !0, D.$digest(), E) : angular.noop
								}

								function p() {
									D.isOpen = !1, g.cancel(z), z = null, D.animation ? y || (y = g(r, 500)) : r()
								}

								function q() {
									w && r(), x = D.$new(), w = a(x, angular.noop)
								}

								function r() {
									y = null, w && (w.remove(), w = null), x && (x.$destroy(), x = null)
								}

								function s() {
									t(), u()
								}

								function t() {
									var a = d[k + "Placement"];
									D.placement = angular.isDefined(a) ? a : n.placement
								}

								function u() {
									var a = d[k + "PopupDelay"],
										b = parseInt(a, 10);
									D.popupDelay = isNaN(b) ? n.popupDelay : b
								}

								function v() {
									var a = d[k + "Trigger"];
									F(), B = m(a), B.show === B.hide ? c.bind(B.show, f) : (c.bind(B.show, j), c.bind(B.hide, l))
								}
								var w, x, y, z, A = angular.isDefined(n.appendToBody) ? n.appendToBody : !1,
									B = m(void 0),
									C = angular.isDefined(d[k + "Enable"]),
									D = b.$new(!0),
									E = function() {
										var a = i.positionElements(c, w, D.placement, A);
										a.top += "px", a.left += "px", w.css(a)
									};
								D.isOpen = !1, d.$observe(e, function(a) {
									D.content = a, !a && D.isOpen && p()
								}), d.$observe(k + "Title", function(a) {
									D.title = a
								});
								var F = function() {
									c.unbind(B.show, j), c.unbind(B.hide, l)
								};
								v();
								var G = b.$eval(d[k + "Animation"]);
								D.animation = angular.isDefined(G) ? !! G : n.animation;
								var H = b.$eval(d[k + "AppendToBody"]);
								A = angular.isDefined(H) ? H : A, A && b.$on("$locationChangeSuccess", function() {
									D.isOpen && p()
								}), b.$on("$destroy", function() {
									g.cancel(y), g.cancel(z), F(), r(), D = null
								})
							}
						}
					}
				}
			}
		]
	}).directive("tooltipPopup", function() {
		return {
			restrict: "EA",
			replace: !0,
			scope: {
				content: "@",
				placement: "@",
				animation: "&",
				isOpen: "&"
			},
			templateUrl: "template/tooltip/tooltip-popup.html"
		}
	}).directive("tooltip", ["$tooltip",
		function(a) {
			return a("tooltip", "tooltip", "mouseenter")
		}
	]).directive("tooltipHtmlUnsafePopup", function() {
		return {
			restrict: "EA",
			replace: !0,
			scope: {
				content: "@",
				placement: "@",
				animation: "&",
				isOpen: "&"
			},
			templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
		}
	}).directive("tooltipHtmlUnsafe", ["$tooltip",
		function(a) {
			return a("tooltipHtmlUnsafe", "tooltip", "mouseenter")
		}
	]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverPopup", function() {
		return {
			restrict: "EA",
			replace: !0,
			scope: {
				title: "@",
				content: "@",
				placement: "@",
				animation: "&",
				isOpen: "&"
			},
			templateUrl: "template/popover/popover.html"
		}
	}).directive("popover", ["$tooltip",
		function(a) {
			return a("popover", "popover", "click")
		}
	]), angular.module("ui.bootstrap.progressbar", []).constant("progressConfig", {
		animate: !0,
		max: 100
	}).controller("ProgressController", ["$scope", "$attrs", "progressConfig",
		function(a, b, c) {
			var d = this,
				e = angular.isDefined(b.animate) ? a.$parent.$eval(b.animate) : c.animate;
			this.bars = [], a.max = angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max, this.addBar = function(b, c) {
				e || c.css({
					transition: "none"
				}), this.bars.push(b), b.$watch("value", function(c) {
					b.percent = +(100 * c / a.max).toFixed(2)
				}), b.$on("$destroy", function() {
					c = null, d.removeBar(b)
				})
			}, this.removeBar = function(a) {
				this.bars.splice(this.bars.indexOf(a), 1)
			}
		}
	]).directive("progress", function() {
		return {
			restrict: "EA",
			replace: !0,
			transclude: !0,
			controller: "ProgressController",
			require: "progress",
			scope: {},
			templateUrl: "template/progressbar/progress.html"
		}
	}).directive("bar", function() {
		return {
			restrict: "EA",
			replace: !0,
			transclude: !0,
			require: "^progress",
			scope: {
				value: "=",
				type: "@"
			},
			templateUrl: "template/progressbar/bar.html",
			link: function(a, b, c, d) {
				d.addBar(a, b)
			}
		}
	}).directive("progressbar", function() {
		return {
			restrict: "EA",
			replace: !0,
			transclude: !0,
			controller: "ProgressController",
			scope: {
				value: "=",
				type: "@"
			},
			templateUrl: "template/progressbar/progressbar.html",
			link: function(a, b, c, d) {
				d.addBar(a, angular.element(b.children()[0]))
			}
		}
	}), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
		max: 5,
		stateOn: null,
		stateOff: null
	}).controller("RatingController", ["$scope", "$attrs", "ratingConfig",
		function(a, b, c) {
			var d = {
				$setViewValue: angular.noop
			};
			this.init = function(e) {
				d = e, d.$render = this.render, this.stateOn = angular.isDefined(b.stateOn) ? a.$parent.$eval(b.stateOn) : c.stateOn, this.stateOff = angular.isDefined(b.stateOff) ? a.$parent.$eval(b.stateOff) : c.stateOff;
				var f = angular.isDefined(b.ratingStates) ? a.$parent.$eval(b.ratingStates) : new Array(angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max);
				a.range = this.buildTemplateObjects(f)
			}, this.buildTemplateObjects = function(a) {
				for (var b = 0, c = a.length; c > b; b++) a[b] = angular.extend({
					index: b
				}, {
					stateOn: this.stateOn,
					stateOff: this.stateOff
				}, a[b]);
				return a
			}, a.rate = function(b) {
				!a.readonly && b >= 0 && b <= a.range.length && (d.$setViewValue(b), d.$render())
			}, a.enter = function(b) {
				a.readonly || (a.value = b), a.onHover({
					value: b
				})
			}, a.reset = function() {
				a.value = d.$viewValue, a.onLeave()
			}, a.onKeydown = function(b) {
				/(37|38|39|40)/.test(b.which) && (b.preventDefault(), b.stopPropagation(), a.rate(a.value + (38 === b.which || 39 === b.which ? 1 : -1)))
			}, this.render = function() {
				a.value = d.$viewValue
			}
		}
	]).directive("rating", function() {
		return {
			restrict: "EA",
			require: ["rating", "ngModel"],
			scope: {
				readonly: "=?",
				onHover: "&",
				onLeave: "&"
			},
			controller: "RatingController",
			templateUrl: "template/rating/rating.html",
			replace: !0,
			link: function(a, b, c, d) {
				var e = d[0],
					f = d[1];
				f && e.init(f)
			}
		}
	}), angular.module("ui.bootstrap.tabs", []).controller("TabsetController", ["$scope",
		function(a) {
			var b = this,
				c = b.tabs = a.tabs = [];
			b.select = function(a) {
				angular.forEach(c, function(b) {
					b.active && b !== a && (b.active = !1, b.onDeselect())
				}), a.active = !0, a.onSelect()
			}, b.addTab = function(a) {
				c.push(a), 1 === c.length ? a.active = !0 : a.active && b.select(a)
			}, b.removeTab = function(a) {
				var e = c.indexOf(a);
				if (a.active && c.length > 1 && !d) {
					var f = e == c.length - 1 ? e - 1 : e + 1;
					b.select(c[f])
				}
				c.splice(e, 1)
			};
			var d;
			a.$on("$destroy", function() {
				d = !0
			})
		}
	]).directive("tabset", function() {
		return {
			restrict: "EA",
			transclude: !0,
			replace: !0,
			scope: {
				type: "@"
			},
			controller: "TabsetController",
			templateUrl: "template/tabs/tabset.html",
			link: function(a, b, c) {
				a.vertical = angular.isDefined(c.vertical) ? a.$parent.$eval(c.vertical) : !1, a.justified = angular.isDefined(c.justified) ? a.$parent.$eval(c.justified) : !1
			}
		}
	}).directive("tab", ["$parse",
		function(a) {
			return {
				require: "^tabset",
				restrict: "EA",
				replace: !0,
				templateUrl: "template/tabs/tab.html",
				transclude: !0,
				scope: {
					active: "=?",
					heading: "@",
					onSelect: "&select",
					onDeselect: "&deselect"
				},
				controller: function() {},
				compile: function(b, c, d) {
					return function(b, c, e, f) {
						b.$watch("active", function(a) {
							a && f.select(b)
						}), b.disabled = !1, e.disabled && b.$parent.$watch(a(e.disabled), function(a) {
							b.disabled = !! a
						}), b.select = function() {
							b.disabled || (b.active = !0)
						}, f.addTab(b), b.$on("$destroy", function() {
							f.removeTab(b)
						}), b.$transcludeFn = d
					}
				}
			}
		}
	]).directive("tabHeadingTransclude", [
		function() {
			return {
				restrict: "A",
				require: "^tab",
				link: function(a, b) {
					a.$watch("headingElement", function(a) {
						a && (b.html(""), b.append(a))
					})
				}
			}
		}
	]).directive("tabContentTransclude", function() {
		function a(a) {
			return a.tagName && (a.hasAttribute("tab-heading") || a.hasAttribute("data-tab-heading") || "tab-heading" === a.tagName.toLowerCase() || "data-tab-heading" === a.tagName.toLowerCase())
		}
		return {
			restrict: "A",
			require: "^tabset",
			link: function(b, c, d) {
				var e = b.$eval(d.tabContentTransclude);
				e.$transcludeFn(e.$parent, function(b) {
					angular.forEach(b, function(b) {
						a(b) ? e.headingElement = b : c.append(b)
					})
				})
			}
		}
	}), angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
		hourStep: 1,
		minuteStep: 1,
		showMeridian: !0,
		meridians: null,
		readonlyInput: !1,
		mousewheel: !0
	}).controller("TimepickerController", ["$scope", "$attrs", "$parse", "$log", "$locale", "timepickerConfig",
		function(a, b, c, d, e, f) {
			function g() {
				var b = parseInt(a.hours, 10),
					c = a.showMeridian ? b > 0 && 13 > b : b >= 0 && 24 > b;
				return c ? (a.showMeridian && (12 === b && (b = 0), a.meridian === p[1] && (b += 12)), b) : void 0
			}

			function h() {
				var b = parseInt(a.minutes, 10);
				return b >= 0 && 60 > b ? b : void 0
			}

			function i(a) {
				return angular.isDefined(a) && a.toString().length < 2 ? "0" + a : a
			}

			function j(a) {
				k(), o.$setViewValue(new Date(n)), l(a)
			}

			function k() {
				o.$setValidity("time", !0), a.invalidHours = !1, a.invalidMinutes = !1
			}

			function l(b) {
				var c = n.getHours(),
					d = n.getMinutes();
				a.showMeridian && (c = 0 === c || 12 === c ? 12 : c % 12), a.hours = "h" === b ? c : i(c), a.minutes = "m" === b ? d : i(d), a.meridian = n.getHours() < 12 ? p[0] : p[1]
			}

			function m(a) {
				var b = new Date(n.getTime() + 6e4 * a);
				n.setHours(b.getHours(), b.getMinutes()), j()
			}
			var n = new Date,
				o = {
					$setViewValue: angular.noop
				}, p = angular.isDefined(b.meridians) ? a.$parent.$eval(b.meridians) : f.meridians || e.DATETIME_FORMATS.AMPMS;
			this.init = function(c, d) {
				o = c, o.$render = this.render;
				var e = d.eq(0),
					g = d.eq(1),
					h = angular.isDefined(b.mousewheel) ? a.$parent.$eval(b.mousewheel) : f.mousewheel;
				h && this.setupMousewheelEvents(e, g), a.readonlyInput = angular.isDefined(b.readonlyInput) ? a.$parent.$eval(b.readonlyInput) : f.readonlyInput, this.setupInputEvents(e, g)
			};
			var q = f.hourStep;
			b.hourStep && a.$parent.$watch(c(b.hourStep), function(a) {
				q = parseInt(a, 10)
			});
			var r = f.minuteStep;
			b.minuteStep && a.$parent.$watch(c(b.minuteStep), function(a) {
				r = parseInt(a, 10)
			}), a.showMeridian = f.showMeridian, b.showMeridian && a.$parent.$watch(c(b.showMeridian), function(b) {
				if (a.showMeridian = !! b, o.$error.time) {
					var c = g(),
						d = h();
					angular.isDefined(c) && angular.isDefined(d) && (n.setHours(c), j())
				} else l()
			}), this.setupMousewheelEvents = function(b, c) {
				var d = function(a) {
					a.originalEvent && (a = a.originalEvent);
					var b = a.wheelDelta ? a.wheelDelta : -a.deltaY;
					return a.detail || b > 0
				};
				b.bind("mousewheel wheel", function(b) {
					a.$apply(d(b) ? a.incrementHours() : a.decrementHours()), b.preventDefault()
				}), c.bind("mousewheel wheel", function(b) {
					a.$apply(d(b) ? a.incrementMinutes() : a.decrementMinutes()), b.preventDefault()
				})
			}, this.setupInputEvents = function(b, c) {
				if (a.readonlyInput) return a.updateHours = angular.noop, void(a.updateMinutes = angular.noop);
				var d = function(b, c) {
					o.$setViewValue(null), o.$setValidity("time", !1), angular.isDefined(b) && (a.invalidHours = b), angular.isDefined(c) && (a.invalidMinutes = c)
				};
				a.updateHours = function() {
					var a = g();
					angular.isDefined(a) ? (n.setHours(a), j("h")) : d(!0)
				}, b.bind("blur", function() {
					!a.invalidHours && a.hours < 10 && a.$apply(function() {
						a.hours = i(a.hours)
					})
				}), a.updateMinutes = function() {
					var a = h();
					angular.isDefined(a) ? (n.setMinutes(a), j("m")) : d(void 0, !0)
				}, c.bind("blur", function() {
					!a.invalidMinutes && a.minutes < 10 && a.$apply(function() {
						a.minutes = i(a.minutes)
					})
				})
			}, this.render = function() {
				var a = o.$modelValue ? new Date(o.$modelValue) : null;
				isNaN(a) ? (o.$setValidity("time", !1), d.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (a && (n = a), k(), l())
			}, a.incrementHours = function() {
				m(60 * q)
			}, a.decrementHours = function() {
				m(60 * -q)
			}, a.incrementMinutes = function() {
				m(r)
			}, a.decrementMinutes = function() {
				m(-r)
			}, a.toggleMeridian = function() {
				m(720 * (n.getHours() < 12 ? 1 : -1))
			}
		}
	]).directive("timepicker", function() {
		return {
			restrict: "EA",
			require: ["timepicker", "?^ngModel"],
			controller: "TimepickerController",
			replace: !0,
			scope: {},
			templateUrl: "template/timepicker/timepicker.html",
			link: function(a, b, c, d) {
				var e = d[0],
					f = d[1];
				f && e.init(f, b.find("input"))
			}
		}
	}), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).factory("typeaheadParser", ["$parse",
		function(a) {
			var b = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
			return {
				parse: function(c) {
					var d = c.match(b);
					if (!d) throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + c + '".');
					return {
						itemName: d[3],
						source: a(d[4]),
						viewMapper: a(d[2] || d[1]),
						modelMapper: a(d[1])
					}
				}
			}
		}
	]).directive("typeahead", ["$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser",
		function(a, b, c, d, e, f, g) {
			var h = [9, 13, 27, 38, 40];
			return {
				require: "ngModel",
				link: function(i, j, k, l) {
					var m, n = i.$eval(k.typeaheadMinLength) || 1,
						o = i.$eval(k.typeaheadWaitMs) || 0,
						p = i.$eval(k.typeaheadEditable) !== !1,
						q = b(k.typeaheadLoading).assign || angular.noop,
						r = b(k.typeaheadOnSelect),
						s = k.typeaheadInputFormatter ? b(k.typeaheadInputFormatter) : void 0,
						t = k.typeaheadAppendToBody ? i.$eval(k.typeaheadAppendToBody) : !1,
						u = i.$eval(k.typeaheadFocusFirst) !== !1,
						v = b(k.ngModel).assign,
						w = g.parse(k.typeahead),
						x = i.$new();
					i.$on("$destroy", function() {
						x.$destroy()
					});
					var y = "typeahead-" + x.$id + "-" + Math.floor(1e4 * Math.random());
					j.attr({
						"aria-autocomplete": "list",
						"aria-expanded": !1,
						"aria-owns": y
					});
					var z = angular.element("<div typeahead-popup></div>");
					z.attr({
						id: y,
						matches: "matches",
						active: "activeIdx",
						select: "select(activeIdx)",
						query: "query",
						position: "position"
					}), angular.isDefined(k.typeaheadTemplateUrl) && z.attr("template-url", k.typeaheadTemplateUrl);
					var A = function() {
						x.matches = [], x.activeIdx = -1, j.attr("aria-expanded", !1)
					}, B = function(a) {
							return y + "-option-" + a
						};
					x.$watch("activeIdx", function(a) {
						0 > a ? j.removeAttr("aria-activedescendant") : j.attr("aria-activedescendant", B(a))
					});
					var C = function(a) {
						var b = {
							$viewValue: a
						};
						q(i, !0), c.when(w.source(i, b)).then(function(c) {
							var d = a === l.$viewValue;
							if (d && m)
								if (c.length > 0) {
									x.activeIdx = u ? 0 : -1, x.matches.length = 0;
									for (var e = 0; e < c.length; e++) b[w.itemName] = c[e], x.matches.push({
										id: B(e),
										label: w.viewMapper(x, b),
										model: c[e]
									});
									x.query = a, x.position = t ? f.offset(j) : f.position(j), x.position.top = x.position.top + j.prop("offsetHeight"), j.attr("aria-expanded", !0)
								} else A();
							d && q(i, !1)
						}, function() {
							A(), q(i, !1)
						})
					};
					A(), x.query = void 0;
					var D, E = function(a) {
							D = d(function() {
								C(a)
							}, o)
						}, F = function() {
							D && d.cancel(D)
						};
					l.$parsers.unshift(function(a) {
						return m = !0, a && a.length >= n ? o > 0 ? (F(), E(a)) : C(a) : (q(i, !1), F(), A()), p ? a : a ? void l.$setValidity("editable", !1) : (l.$setValidity("editable", !0), a)
					}), l.$formatters.push(function(a) {
						var b, c, d = {};
						return s ? (d.$model = a, s(i, d)) : (d[w.itemName] = a, b = w.viewMapper(i, d), d[w.itemName] = void 0, c = w.viewMapper(i, d), b !== c ? b : a)
					}), x.select = function(a) {
						var b, c, e = {};
						e[w.itemName] = c = x.matches[a].model, b = w.modelMapper(i, e), v(i, b), l.$setValidity("editable", !0), r(i, {
							$item: c,
							$model: b,
							$label: w.viewMapper(i, e)
						}), A(), d(function() {
							j[0].focus()
						}, 0, !1)
					}, j.bind("keydown", function(a) {
						0 !== x.matches.length && -1 !== h.indexOf(a.which) && (-1 != x.activeIdx || 13 !== a.which && 9 !== a.which) && (a.preventDefault(), 40 === a.which ? (x.activeIdx = (x.activeIdx + 1) % x.matches.length, x.$digest()) : 38 === a.which ? (x.activeIdx = (x.activeIdx > 0 ? x.activeIdx : x.matches.length) - 1, x.$digest()) : 13 === a.which || 9 === a.which ? x.$apply(function() {
							x.select(x.activeIdx)
						}) : 27 === a.which && (a.stopPropagation(), A(), x.$digest()))
					}), j.bind("blur", function() {
						m = !1
					});
					var G = function(a) {
						j[0] !== a.target && (A(), x.$digest())
					};
					e.bind("click", G), i.$on("$destroy", function() {
						e.unbind("click", G), t && H.remove()
					});
					var H = a(z)(x);
					t ? e.find("body").append(H) : j.after(H)
				}
			}
		}
	]).directive("typeaheadPopup", function() {
		return {
			restrict: "EA",
			scope: {
				matches: "=",
				query: "=",
				active: "=",
				position: "=",
				select: "&"
			},
			replace: !0,
			templateUrl: "template/typeahead/typeahead-popup.html",
			link: function(a, b, c) {
				a.templateUrl = c.templateUrl, a.isOpen = function() {
					return a.matches.length > 0
				}, a.isActive = function(b) {
					return a.active == b
				}, a.selectActive = function(b) {
					a.active = b
				}, a.selectMatch = function(b) {
					a.select({
						activeIdx: b
					})
				}
			}
		}
	}).directive("typeaheadMatch", ["$http", "$templateCache", "$compile", "$parse",
		function(a, b, c, d) {
			return {
				restrict: "EA",
				scope: {
					index: "=",
					match: "=",
					query: "="
				},
				link: function(e, f, g) {
					var h = d(g.templateUrl)(e.$parent) || "template/typeahead/typeahead-match.html";
					a.get(h, {
						cache: b
					}).success(function(a) {
						f.replaceWith(c(a.trim())(e))
					})
				}
			}
		}
	]).filter("typeaheadHighlight", function() {
		function a(a) {
			return a.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
		}
		return function(b, c) {
			return c ? ("" + b).replace(new RegExp(a(c), "gi"), "<strong>$&</strong>") : b
		}
	}), d("angular-bootstrap", ["angular"], function() {}), angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/day.html", "template/datepicker/month.html", "template/datepicker/popup.html", "template/datepicker/year.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"]), angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope",
		function(a, b, c) {
			function d(a) {
				for (var b in a)
					if (void 0 !== f.style[b]) return a[b]
			}
			var e = function(d, f, g) {
				g = g || {};
				var h = a.defer(),
					i = e[g.animation ? "animationEndEventName" : "transitionEndEventName"],
					j = function() {
						c.$apply(function() {
							d.unbind(i, j), h.resolve(d)
						})
					};
				return i && d.bind(i, j), b(function() {
					angular.isString(f) ? d.addClass(f) : angular.isFunction(f) ? f(d) : angular.isObject(f) && d.css(f), i || h.resolve(d)
				}), h.promise.cancel = function() {
					i && d.unbind(i, j), h.reject("Transition cancelled")
				}, h.promise
			}, f = document.createElement("trans"),
				g = {
					WebkitTransition: "webkitTransitionEnd",
					MozTransition: "transitionend",
					OTransition: "oTransitionEnd",
					transition: "transitionend"
				}, h = {
					WebkitTransition: "webkitAnimationEnd",
					MozTransition: "animationend",
					OTransition: "oAnimationEnd",
					transition: "animationend"
				};
			return e.transitionEndEventName = d(g), e.animationEndEventName = d(h), e
		}
	]), angular.module("ui.bootstrap.collapse", ["ui.bootstrap.transition"]).directive("collapse", ["$transition",
		function(a) {
			return {
				link: function(b, c, d) {
					function e(b) {
						function d() {
							j === e && (j = void 0)
						}
						var e = a(c, b);
						return j && j.cancel(), j = e, e.then(d, d), e
					}

					function f() {
						k ? (k = !1, g()) : (c.removeClass("collapse").addClass("collapsing"), e({
							height: c[0].scrollHeight + "px"
						}).then(g))
					}

					function g() {
						c.removeClass("collapsing"), c.addClass("collapse in"), c.css({
							height: "auto"
						})
					}

					function h() {
						k ? (k = !1, i(), c.css({
							height: 0
						})) : (c.css({
							height: c[0].scrollHeight + "px"
						}), c[0].offsetWidth, c.removeClass("collapse in").addClass("collapsing"), e({
							height: 0
						}).then(i))
					}

					function i() {
						c.removeClass("collapsing"), c.addClass("collapse")
					}
					var j, k = !0;
					b.$watch(d.collapse, function(a) {
						a ? h() : f()
					})
				}
			}
		}
	]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", {
		closeOthers: !0
	}).controller("AccordionController", ["$scope", "$attrs", "accordionConfig",
		function(a, b, c) {
			this.groups = [], this.closeOthers = function(d) {
				var e = angular.isDefined(b.closeOthers) ? a.$eval(b.closeOthers) : c.closeOthers;
				e && angular.forEach(this.groups, function(a) {
					a !== d && (a.isOpen = !1)
				})
			}, this.addGroup = function(a) {
				var b = this;
				this.groups.push(a), a.$on("$destroy", function() {
					b.removeGroup(a)
				})
			}, this.removeGroup = function(a) {
				var b = this.groups.indexOf(a); - 1 !== b && this.groups.splice(b, 1)
			}
		}
	]).directive("accordion", function() {
		return {
			restrict: "EA",
			controller: "AccordionController",
			transclude: !0,
			replace: !1,
			templateUrl: "template/accordion/accordion.html"
		}
	}).directive("accordionGroup", function() {
		return {
			require: "^accordion",
			restrict: "EA",
			transclude: !0,
			replace: !0,
			templateUrl: "template/accordion/accordion-group.html",
			scope: {
				heading: "@",
				isOpen: "=?",
				isDisabled: "=?"
			},
			controller: function() {
				this.setHeading = function(a) {
					this.heading = a
				}
			},
			link: function(a, b, c, d) {
				d.addGroup(a), a.$watch("isOpen", function(b) {
					b && d.closeOthers(a)
				}), a.toggleOpen = function() {
					a.isDisabled || (a.isOpen = !a.isOpen)
				}
			}
		}
	}).directive("accordionHeading", function() {
		return {
			restrict: "EA",
			transclude: !0,
			template: "",
			replace: !0,
			require: "^accordionGroup",
			link: function(a, b, c, d, e) {
				d.setHeading(e(a, function() {}))
			}
		}
	}).directive("accordionTransclude", function() {
		return {
			require: "^accordionGroup",
			link: function(a, b, c, d) {
				a.$watch(function() {
					return d[c.accordionTransclude]
				}, function(a) {
					a && (b.html(""), b.append(a))
				})
			}
		}
	}), angular.module("ui.bootstrap.alert", []).controller("AlertController", ["$scope", "$attrs",
		function(a, b) {
			a.closeable = "close" in b, this.close = a.close
		}
	]).directive("alert", function() {
		return {
			restrict: "EA",
			controller: "AlertController",
			templateUrl: "template/alert/alert.html",
			transclude: !0,
			replace: !0,
			scope: {
				type: "@",
				close: "&"
			}
		}
	}).directive("dismissOnTimeout", ["$timeout",
		function(a) {
			return {
				require: "alert",
				link: function(b, c, d, e) {
					a(function() {
						e.close()
					}, parseInt(d.dismissOnTimeout, 10))
				}
			}
		}
	]), angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function() {
		return function(a, b, c) {
			b.addClass("ng-binding").data("$binding", c.bindHtmlUnsafe), a.$watch(c.bindHtmlUnsafe, function(a) {
				b.html(a || "")
			})
		}
	}), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
		activeClass: "active",
		toggleEvent: "click"
	}).controller("ButtonsController", ["buttonConfig",
		function(a) {
			this.activeClass = a.activeClass || "active", this.toggleEvent = a.toggleEvent || "click"
		}
	]).directive("btnRadio", function() {
		return {
			require: ["btnRadio", "ngModel"],
			controller: "ButtonsController",
			link: function(a, b, c, d) {
				var e = d[0],
					f = d[1];
				f.$render = function() {
					b.toggleClass(e.activeClass, angular.equals(f.$modelValue, a.$eval(c.btnRadio)))
				}, b.bind(e.toggleEvent, function() {
					var d = b.hasClass(e.activeClass);
					(!d || angular.isDefined(c.uncheckable)) && a.$apply(function() {
						f.$setViewValue(d ? null : a.$eval(c.btnRadio)), f.$render()
					})
				})
			}
		}
	}).directive("btnCheckbox", function() {
		return {
			require: ["btnCheckbox", "ngModel"],
			controller: "ButtonsController",
			link: function(a, b, c, d) {
				function e() {
					return g(c.btnCheckboxTrue, !0)
				}

				function f() {
					return g(c.btnCheckboxFalse, !1)
				}

				function g(b, c) {
					var d = a.$eval(b);
					return angular.isDefined(d) ? d : c
				}
				var h = d[0],
					i = d[1];
				i.$render = function() {
					b.toggleClass(h.activeClass, angular.equals(i.$modelValue, e()))
				}, b.bind(h.toggleEvent, function() {
					a.$apply(function() {
						i.$setViewValue(b.hasClass(h.activeClass) ? f() : e()), i.$render()
					})
				})
			}
		}
	}), angular.module("ui.bootstrap.carousel", ["ui.bootstrap.transition"]).controller("CarouselController", ["$scope", "$timeout", "$interval", "$transition",
		function(a, b, c, d) {
			function e() {
				f();
				var b = +a.interval;
				!isNaN(b) && b > 0 && (h = c(g, b))
			}

			function f() {
				h && (c.cancel(h), h = null)
			}

			function g() {
				var b = +a.interval;
				i && !isNaN(b) && b > 0 ? a.next() : a.pause()
			}
			var h, i, j = this,
				k = j.slides = a.slides = [],
				l = -1;
			j.currentSlide = null;
			var m = !1;
			j.select = a.select = function(c, f) {
				function g() {
					m || (j.currentSlide && angular.isString(f) && !a.noTransition && c.$element ? (c.$element.addClass(f), c.$element[0].offsetWidth, angular.forEach(k, function(a) {
						angular.extend(a, {
							direction: "",
							entering: !1,
							leaving: !1,
							active: !1
						})
					}), angular.extend(c, {
						direction: f,
						active: !0,
						entering: !0
					}), angular.extend(j.currentSlide || {}, {
						direction: f,
						leaving: !0
					}), a.$currentTransition = d(c.$element, {}), function(b, c) {
						a.$currentTransition.then(function() {
							h(b, c)
						}, function() {
							h(b, c)
						})
					}(c, j.currentSlide)) : h(c, j.currentSlide), j.currentSlide = c, l = i, e())
				}

				function h(b, c) {
					angular.extend(b, {
						direction: "",
						active: !0,
						leaving: !1,
						entering: !1
					}), angular.extend(c || {}, {
						direction: "",
						active: !1,
						leaving: !1,
						entering: !1
					}), a.$currentTransition = null
				}
				var i = k.indexOf(c);
				void 0 === f && (f = i > l ? "next" : "prev"), c && c !== j.currentSlide && (a.$currentTransition ? (a.$currentTransition.cancel(), b(g)) : g())
			}, a.$on("$destroy", function() {
				m = !0
			}), j.indexOfSlide = function(a) {
				return k.indexOf(a)
			}, a.next = function() {
				var b = (l + 1) % k.length;
				return a.$currentTransition ? void 0 : j.select(k[b], "next")
			}, a.prev = function() {
				var b = 0 > l - 1 ? k.length - 1 : l - 1;
				return a.$currentTransition ? void 0 : j.select(k[b], "prev")
			}, a.isActive = function(a) {
				return j.currentSlide === a
			}, a.$watch("interval", e), a.$on("$destroy", f), a.play = function() {
				i || (i = !0, e())
			}, a.pause = function() {
				a.noPause || (i = !1, f())
			}, j.addSlide = function(b, c) {
				b.$element = c, k.push(b), 1 === k.length || b.active ? (j.select(k[k.length - 1]), 1 == k.length && a.play()) : b.active = !1
			}, j.removeSlide = function(a) {
				var b = k.indexOf(a);
				k.splice(b, 1), k.length > 0 && a.active ? j.select(b >= k.length ? k[b - 1] : k[b]) : l > b && l--
			}
		}
	]).directive("carousel", [
		function() {
			return {
				restrict: "EA",
				transclude: !0,
				replace: !0,
				controller: "CarouselController",
				require: "carousel",
				templateUrl: "template/carousel/carousel.html",
				scope: {
					interval: "=",
					noTransition: "=",
					noPause: "="
				}
			}
		}
	]).directive("slide", function() {
		return {
			require: "^carousel",
			restrict: "EA",
			transclude: !0,
			replace: !0,
			templateUrl: "template/carousel/slide.html",
			scope: {
				active: "=?"
			},
			link: function(a, b, c, d) {
				d.addSlide(a, b), a.$on("$destroy", function() {
					d.removeSlide(a)
				}), a.$watch("active", function(b) {
					b && d.select(a)
				})
			}
		}
	}), angular.module("ui.bootstrap.dateparser", []).service("dateParser", ["$locale", "orderByFilter",
		function(a, b) {
			function c(a) {
				var c = [],
					d = a.split("");
				return angular.forEach(e, function(b, e) {
					var f = a.indexOf(e);
					if (f > -1) {
						a = a.split(""), d[f] = "(" + b.regex + ")", a[f] = "$";
						for (var g = f + 1, h = f + e.length; h > g; g++) d[g] = "", a[g] = "$";
						a = a.join(""), c.push({
							index: f,
							apply: b.apply
						})
					}
				}), {
					regex: new RegExp("^" + d.join("") + "$"),
					map: b(c, "index")
				}
			}

			function d(a, b, c) {
				return 1 === b && c > 28 ? 29 === c && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0) : 3 === b || 5 === b || 8 === b || 10 === b ? 31 > c : !0
			}
			this.parsers = {};
			var e = {
				yyyy: {
					regex: "\\d{4}",
					apply: function(a) {
						this.year = +a
					}
				},
				yy: {
					regex: "\\d{2}",
					apply: function(a) {
						this.year = +a + 2e3
					}
				},
				y: {
					regex: "\\d{1,4}",
					apply: function(a) {
						this.year = +a
					}
				},
				MMMM: {
					regex: a.DATETIME_FORMATS.MONTH.join("|"),
					apply: function(b) {
						this.month = a.DATETIME_FORMATS.MONTH.indexOf(b)
					}
				},
				MMM: {
					regex: a.DATETIME_FORMATS.SHORTMONTH.join("|"),
					apply: function(b) {
						this.month = a.DATETIME_FORMATS.SHORTMONTH.indexOf(b)
					}
				},
				MM: {
					regex: "0[1-9]|1[0-2]",
					apply: function(a) {
						this.month = a - 1
					}
				},
				M: {
					regex: "[1-9]|1[0-2]",
					apply: function(a) {
						this.month = a - 1
					}
				},
				dd: {
					regex: "[0-2][0-9]{1}|3[0-1]{1}",
					apply: function(a) {
						this.date = +a
					}
				},
				d: {
					regex: "[1-2]?[0-9]{1}|3[0-1]{1}",
					apply: function(a) {
						this.date = +a
					}
				},
				EEEE: {
					regex: a.DATETIME_FORMATS.DAY.join("|")
				},
				EEE: {
					regex: a.DATETIME_FORMATS.SHORTDAY.join("|")
				}
			};
			this.parse = function(b, e) {
				if (!angular.isString(b) || !e) return b;
				e = a.DATETIME_FORMATS[e] || e, this.parsers[e] || (this.parsers[e] = c(e));
				var f = this.parsers[e],
					g = f.regex,
					h = f.map,
					i = b.match(g);
				if (i && i.length) {
					for (var j, k = {
							year: 1900,
							month: 0,
							date: 1,
							hours: 0
						}, l = 1, m = i.length; m > l; l++) {
						var n = h[l - 1];
						n.apply && n.apply.call(k, i[l])
					}
					return d(k.year, k.month, k.date) && (j = new Date(k.year, k.month, k.date, k.hours)), j
				}
			}
		}
	]), angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window",
		function(a, b) {
			function c(a, c) {
				return a.currentStyle ? a.currentStyle[c] : b.getComputedStyle ? b.getComputedStyle(a)[c] : a.style[c]
			}

			function d(a) {
				return "static" === (c(a, "position") || "static")
			}
			var e = function(b) {
				for (var c = a[0], e = b.offsetParent || c; e && e !== c && d(e);) e = e.offsetParent;
				return e || c
			};
			return {
				position: function(b) {
					var c = this.offset(b),
						d = {
							top: 0,
							left: 0
						}, f = e(b[0]);
					f != a[0] && (d = this.offset(angular.element(f)), d.top += f.clientTop - f.scrollTop, d.left += f.clientLeft - f.scrollLeft);
					var g = b[0].getBoundingClientRect();
					return {
						width: g.width || b.prop("offsetWidth"),
						height: g.height || b.prop("offsetHeight"),
						top: c.top - d.top,
						left: c.left - d.left
					}
				},
				offset: function(c) {
					var d = c[0].getBoundingClientRect();
					return {
						width: d.width || c.prop("offsetWidth"),
						height: d.height || c.prop("offsetHeight"),
						top: d.top + (b.pageYOffset || a[0].documentElement.scrollTop),
						left: d.left + (b.pageXOffset || a[0].documentElement.scrollLeft)
					}
				},
				positionElements: function(a, b, c, d) {
					var e, f, g, h, i = c.split("-"),
						j = i[0],
						k = i[1] || "center";
					e = d ? this.offset(a) : this.position(a), f = b.prop("offsetWidth"), g = b.prop("offsetHeight");
					var l = {
						center: function() {
							return e.left + e.width / 2 - f / 2
						},
						left: function() {
							return e.left
						},
						right: function() {
							return e.left + e.width
						}
					}, m = {
							center: function() {
								return e.top + e.height / 2 - g / 2
							},
							top: function() {
								return e.top
							},
							bottom: function() {
								return e.top + e.height
							}
						};
					switch (j) {
						case "right":
							h = {
								top: m[k](),
								left: l[j]()
							};
							break;
						case "left":
							h = {
								top: m[k](),
								left: e.left - f
							};
							break;
						case "bottom":
							h = {
								top: m[j](),
								left: l[k]()
							};
							break;
						default:
							h = {
								top: e.top - g,
								left: l[k]()
							}
					}
					return h
				}
			}
		}
	]), angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.dateparser", "ui.bootstrap.position"]).constant("datepickerConfig", {
		formatDay: "dd",
		formatMonth: "MMMM",
		formatYear: "yyyy",
		formatDayHeader: "EEE",
		formatDayTitle: "MMMM yyyy",
		formatMonthTitle: "yyyy",
		datepickerMode: "day",
		minMode: "day",
		maxMode: "year",
		showWeeks: !0,
		startingDay: 0,
		yearRange: 20,
		minDate: null,
		maxDate: null
	}).controller("DatepickerController", ["$scope", "$attrs", "$parse", "$interpolate", "$timeout", "$log", "dateFilter", "datepickerConfig",
		function(a, b, c, d, e, f, g, h) {
			var i = this,
				j = {
					$setViewValue: angular.noop
				};
			this.modes = ["day", "month", "year"], angular.forEach(["formatDay", "formatMonth", "formatYear", "formatDayHeader", "formatDayTitle", "formatMonthTitle", "minMode", "maxMode", "showWeeks", "startingDay", "yearRange"], function(c, e) {
				i[c] = angular.isDefined(b[c]) ? 8 > e ? d(b[c])(a.$parent) : a.$parent.$eval(b[c]) : h[c]
			}), angular.forEach(["minDate", "maxDate"], function(d) {
				b[d] ? a.$parent.$watch(c(b[d]), function(a) {
					i[d] = a ? new Date(a) : null, i.refreshView()
				}) : i[d] = h[d] ? new Date(h[d]) : null
			}), a.datepickerMode = a.datepickerMode || h.datepickerMode, a.uniqueId = "datepicker-" + a.$id + "-" + Math.floor(1e4 * Math.random()), this.activeDate = angular.isDefined(b.initDate) ? a.$parent.$eval(b.initDate) : new Date, a.isActive = function(b) {
				return 0 === i.compare(b.date, i.activeDate) ? (a.activeDateId = b.uid, !0) : !1
			}, this.init = function(a) {
				j = a, j.$render = function() {
					i.render()
				}
			}, this.render = function() {
				if (j.$modelValue) {
					var a = new Date(j.$modelValue),
						b = !isNaN(a);
					b ? this.activeDate = a : f.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'), j.$setValidity("date", b)
				}
				this.refreshView()
			}, this.refreshView = function() {
				if (this.element) {
					this._refreshView();
					var a = j.$modelValue ? new Date(j.$modelValue) : null;
					j.$setValidity("date-disabled", !a || this.element && !this.isDisabled(a))
				}
			}, this.createDateObject = function(a, b) {
				var c = j.$modelValue ? new Date(j.$modelValue) : null;
				return {
					date: a,
					label: g(a, b),
					selected: c && 0 === this.compare(a, c),
					disabled: this.isDisabled(a),
					current: 0 === this.compare(a, new Date)
				}
			}, this.isDisabled = function(c) {
				return this.minDate && this.compare(c, this.minDate) < 0 || this.maxDate && this.compare(c, this.maxDate) > 0 || b.dateDisabled && a.dateDisabled({
					date: c,
					mode: a.datepickerMode
				})
			}, this.split = function(a, b) {
				for (var c = []; a.length > 0;) c.push(a.splice(0, b));
				return c
			}, a.select = function(b) {
				if (a.datepickerMode === i.minMode) {
					var c = j.$modelValue ? new Date(j.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
					c.setFullYear(b.getFullYear(), b.getMonth(), b.getDate()), j.$setViewValue(c), j.$render()
				} else i.activeDate = b, a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) - 1]
			}, a.move = function(a) {
				var b = i.activeDate.getFullYear() + a * (i.step.years || 0),
					c = i.activeDate.getMonth() + a * (i.step.months || 0);
				i.activeDate.setFullYear(b, c, 1), i.refreshView()
			}, a.toggleMode = function(b) {
				b = b || 1, a.datepickerMode === i.maxMode && 1 === b || a.datepickerMode === i.minMode && -1 === b || (a.datepickerMode = i.modes[i.modes.indexOf(a.datepickerMode) + b])
			}, a.keys = {
				13: "enter",
				32: "space",
				33: "pageup",
				34: "pagedown",
				35: "end",
				36: "home",
				37: "left",
				38: "up",
				39: "right",
				40: "down"
			};
			var k = function() {
				e(function() {
					i.element[0].focus()
				}, 0, !1)
			};
			a.$on("datepicker.focus", k), a.keydown = function(b) {
				var c = a.keys[b.which];
				if (c && !b.shiftKey && !b.altKey)
					if (b.preventDefault(), b.stopPropagation(), "enter" === c || "space" === c) {
						if (i.isDisabled(i.activeDate)) return;
						a.select(i.activeDate), k()
					} else !b.ctrlKey || "up" !== c && "down" !== c ? (i.handleKeyDown(c, b), i.refreshView()) : (a.toggleMode("up" === c ? 1 : -1), k())
			}
		}
	]).directive("datepicker", function() {
		return {
			restrict: "EA",
			replace: !0,
			templateUrl: "template/datepicker/datepicker.html",
			scope: {
				datepickerMode: "=?",
				dateDisabled: "&"
			},
			require: ["datepicker", "?^ngModel"],
			controller: "DatepickerController",
			link: function(a, b, c, d) {
				var e = d[0],
					f = d[1];
				f && e.init(f)
			}
		}
	}).directive("daypicker", ["dateFilter",
		function(a) {
			return {
				restrict: "EA",
				replace: !0,
				templateUrl: "template/datepicker/day.html",
				require: "^datepicker",
				link: function(b, c, d, e) {
					function f(a, b) {
						return 1 !== b || a % 4 !== 0 || a % 100 === 0 && a % 400 !== 0 ? i[b] : 29
					}

					function g(a, b) {
						var c = new Array(b),
							d = new Date(a),
							e = 0;
						for (d.setHours(12); b > e;) c[e++] = new Date(d), d.setDate(d.getDate() + 1);
						return c
					}

					function h(a) {
						var b = new Date(a);
						b.setDate(b.getDate() + 4 - (b.getDay() || 7));
						var c = b.getTime();
						return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1
					}
					b.showWeeks = e.showWeeks, e.step = {
						months: 1
					}, e.element = c;
					var i = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
					e._refreshView = function() {
						var c = e.activeDate.getFullYear(),
							d = e.activeDate.getMonth(),
							f = new Date(c, d, 1),
							i = e.startingDay - f.getDay(),
							j = i > 0 ? 7 - i : -i,
							k = new Date(f);
						j > 0 && k.setDate(-j + 1);
						for (var l = g(k, 42), m = 0; 42 > m; m++) l[m] = angular.extend(e.createDateObject(l[m], e.formatDay), {
							secondary: l[m].getMonth() !== d,
							uid: b.uniqueId + "-" + m
						});
						b.labels = new Array(7);
						for (var n = 0; 7 > n; n++) b.labels[n] = {
							abbr: a(l[n].date, e.formatDayHeader),
							full: a(l[n].date, "EEEE")
						};
						if (b.title = a(e.activeDate, e.formatDayTitle), b.rows = e.split(l, 7), b.showWeeks) {
							b.weekNumbers = [];
							for (var o = h(b.rows[0][0].date), p = b.rows.length; b.weekNumbers.push(o++) < p;);
						}
					}, e.compare = function(a, b) {
						return new Date(a.getFullYear(), a.getMonth(), a.getDate()) - new Date(b.getFullYear(), b.getMonth(), b.getDate())
					}, e.handleKeyDown = function(a) {
						var b = e.activeDate.getDate();
						if ("left" === a) b -= 1;
						else if ("up" === a) b -= 7;
						else if ("right" === a) b += 1;
						else if ("down" === a) b += 7;
						else if ("pageup" === a || "pagedown" === a) {
							var c = e.activeDate.getMonth() + ("pageup" === a ? -1 : 1);
							e.activeDate.setMonth(c, 1), b = Math.min(f(e.activeDate.getFullYear(), e.activeDate.getMonth()), b)
						} else "home" === a ? b = 1 : "end" === a && (b = f(e.activeDate.getFullYear(), e.activeDate.getMonth()));
						e.activeDate.setDate(b)
					}, e.refreshView()
				}
			}
		}
	]).directive("monthpicker", ["dateFilter",
		function(a) {
			return {
				restrict: "EA",
				replace: !0,
				templateUrl: "template/datepicker/month.html",
				require: "^datepicker",
				link: function(b, c, d, e) {
					e.step = {
						years: 1
					}, e.element = c, e._refreshView = function() {
						for (var c = new Array(12), d = e.activeDate.getFullYear(), f = 0; 12 > f; f++) c[f] = angular.extend(e.createDateObject(new Date(d, f, 1), e.formatMonth), {
							uid: b.uniqueId + "-" + f
						});
						b.title = a(e.activeDate, e.formatMonthTitle), b.rows = e.split(c, 3)
					}, e.compare = function(a, b) {
						return new Date(a.getFullYear(), a.getMonth()) - new Date(b.getFullYear(), b.getMonth())
					}, e.handleKeyDown = function(a) {
						var b = e.activeDate.getMonth();
						if ("left" === a) b -= 1;
						else if ("up" === a) b -= 3;
						else if ("right" === a) b += 1;
						else if ("down" === a) b += 3;
						else if ("pageup" === a || "pagedown" === a) {
							var c = e.activeDate.getFullYear() + ("pageup" === a ? -1 : 1);
							e.activeDate.setFullYear(c)
						} else "home" === a ? b = 0 : "end" === a && (b = 11);
						e.activeDate.setMonth(b)
					}, e.refreshView()
				}
			}
		}
	]).directive("yearpicker", ["dateFilter",
		function() {
			return {
				restrict: "EA",
				replace: !0,
				templateUrl: "template/datepicker/year.html",
				require: "^datepicker",
				link: function(a, b, c, d) {
					function e(a) {
						return parseInt((a - 1) / f, 10) * f + 1
					}
					var f = d.yearRange;
					d.step = {
						years: f
					}, d.element = b, d._refreshView = function() {
						for (var b = new Array(f), c = 0, g = e(d.activeDate.getFullYear()); f > c; c++) b[c] = angular.extend(d.createDateObject(new Date(g + c, 0, 1), d.formatYear), {
							uid: a.uniqueId + "-" + c
						});
						a.title = [b[0].label, b[f - 1].label].join(" - "), a.rows = d.split(b, 5)
					}, d.compare = function(a, b) {
						return a.getFullYear() - b.getFullYear()
					}, d.handleKeyDown = function(a) {
						var b = d.activeDate.getFullYear();
						"left" === a ? b -= 1 : "up" === a ? b -= 5 : "right" === a ? b += 1 : "down" === a ? b += 5 : "pageup" === a || "pagedown" === a ? b += ("pageup" === a ? -1 : 1) * d.step.years : "home" === a ? b = e(d.activeDate.getFullYear()) : "end" === a && (b = e(d.activeDate.getFullYear()) + f - 1), d.activeDate.setFullYear(b)
					}, d.refreshView()
				}
			}
		}
	]).constant("datepickerPopupConfig", {
		datepickerPopup: "yyyy-MM-dd",
		currentText: "Today",
		clearText: "Clear",
		closeText: "Done",
		closeOnDateSelection: !0,
		appendToBody: !1,
		showButtonBar: !0
	}).directive("datepickerPopup", ["$compile", "$parse", "$document", "$position", "dateFilter", "dateParser", "datepickerPopupConfig",
		function(a, b, c, d, e, f, g) {
			return {
				restrict: "EA",
				require: "ngModel",
				scope: {
					isOpen: "=?",
					currentText: "@",
					clearText: "@",
					closeText: "@",
					dateDisabled: "&"
				},
				link: function(h, i, j, k) {
					function l(a) {
						return a.replace(/([A-Z])/g, function(a) {
							return "-" + a.toLowerCase()
						})
					}

					function m(a) {
						if (a) {
							if (angular.isDate(a) && !isNaN(a)) return k.$setValidity("date", !0), a;
							if (angular.isString(a)) {
								var b = f.parse(a, n) || new Date(a);
								return isNaN(b) ? void k.$setValidity("date", !1) : (k.$setValidity("date", !0), b)
							}
							return void k.$setValidity("date", !1)
						}
						return k.$setValidity("date", !0), null
					}
					var n, o = angular.isDefined(j.closeOnDateSelection) ? h.$parent.$eval(j.closeOnDateSelection) : g.closeOnDateSelection,
						p = angular.isDefined(j.datepickerAppendToBody) ? h.$parent.$eval(j.datepickerAppendToBody) : g.appendToBody;
					h.showButtonBar = angular.isDefined(j.showButtonBar) ? h.$parent.$eval(j.showButtonBar) : g.showButtonBar, h.getText = function(a) {
						return h[a + "Text"] || g[a + "Text"]
					}, j.$observe("datepickerPopup", function(a) {
						n = a || g.datepickerPopup, k.$render()
					});
					var q = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
					q.attr({
						"ng-model": "date",
						"ng-change": "dateSelection()"
					});
					var r = angular.element(q.children()[0]);
					j.datepickerOptions && angular.forEach(h.$parent.$eval(j.datepickerOptions), function(a, b) {
						r.attr(l(b), a)
					}), h.watchData = {}, angular.forEach(["minDate", "maxDate", "datepickerMode"], function(a) {
						if (j[a]) {
							var c = b(j[a]);
							if (h.$parent.$watch(c, function(b) {
								h.watchData[a] = b
							}), r.attr(l(a), "watchData." + a), "datepickerMode" === a) {
								var d = c.assign;
								h.$watch("watchData." + a, function(a, b) {
									a !== b && d(h.$parent, a)
								})
							}
						}
					}), j.dateDisabled && r.attr("date-disabled", "dateDisabled({ date: date, mode: mode })"), k.$parsers.unshift(m), h.dateSelection = function(a) {
						angular.isDefined(a) && (h.date = a), k.$setViewValue(h.date), k.$render(), o && (h.isOpen = !1, i[0].focus())
					}, i.bind("input change keyup", function() {
						h.$apply(function() {
							h.date = k.$modelValue
						})
					}), k.$render = function() {
						var a = k.$viewValue ? e(k.$viewValue, n) : "";
						i.val(a), h.date = m(k.$modelValue)
					};
					var s = function(a) {
						h.isOpen && a.target !== i[0] && h.$apply(function() {
							h.isOpen = !1
						})
					}, t = function(a) {
							h.keydown(a)
						};
					i.bind("keydown", t), h.keydown = function(a) {
						27 === a.which ? (a.preventDefault(), a.stopPropagation(), h.close()) : 40 !== a.which || h.isOpen || (h.isOpen = !0)
					}, h.$watch("isOpen", function(a) {
						a ? (h.$broadcast("datepicker.focus"), h.position = p ? d.offset(i) : d.position(i), h.position.top = h.position.top + i.prop("offsetHeight"), c.bind("click", s)) : c.unbind("click", s)
					}), h.select = function(a) {
						if ("today" === a) {
							var b = new Date;
							angular.isDate(k.$modelValue) ? (a = new Date(k.$modelValue), a.setFullYear(b.getFullYear(), b.getMonth(), b.getDate())) : a = new Date(b.setHours(0, 0, 0, 0))
						}
						h.dateSelection(a)
					}, h.close = function() {
						h.isOpen = !1, i[0].focus()
					};
					var u = a(q)(h);
					q.remove(), p ? c.find("body").append(u) : i.after(u), h.$on("$destroy", function() {
						u.remove(), i.unbind("keydown", t), c.unbind("click", s)
					})
				}
			}
		}
	]).directive("datepickerPopupWrap", function() {
		return {
			restrict: "EA",
			replace: !0,
			transclude: !0,
			templateUrl: "template/datepicker/popup.html",
			link: function(a, b) {
				b.bind("click", function(a) {
					a.preventDefault(), a.stopPropagation()
				})
			}
		}
	}), angular.module("ui.bootstrap.dropdown", []).constant("dropdownConfig", {
		openClass: "open"
	}).service("dropdownService", ["$document",
		function(a) {
			var b = null;
			this.open = function(e) {
				b || (a.bind("click", c), a.bind("keydown", d)), b && b !== e && (b.isOpen = !1), b = e
			}, this.close = function(e) {
				b === e && (b = null, a.unbind("click", c), a.unbind("keydown", d))
			};
			var c = function(a) {
				if (b) {
					var c = b.getToggleElement();
					a && c && c[0].contains(a.target) || b.$apply(function() {
						b.isOpen = !1
					})
				}
			}, d = function(a) {
					27 === a.which && (b.focusToggleElement(), c())
				}
		}
	]).controller("DropdownController", ["$scope", "$attrs", "$parse", "dropdownConfig", "dropdownService", "$animate",
		function(a, b, c, d, e, f) {
			var g, h = this,
				i = a.$new(),
				j = d.openClass,
				k = angular.noop,
				l = b.onToggle ? c(b.onToggle) : angular.noop;
			this.init = function(d) {
				h.$element = d, b.isOpen && (g = c(b.isOpen), k = g.assign, a.$watch(g, function(a) {
					i.isOpen = !! a
				}))
			}, this.toggle = function(a) {
				return i.isOpen = arguments.length ? !! a : !i.isOpen
			}, this.isOpen = function() {
				return i.isOpen
			}, i.getToggleElement = function() {
				return h.toggleElement
			}, i.focusToggleElement = function() {
				h.toggleElement && h.toggleElement[0].focus()
			}, i.$watch("isOpen", function(b, c) {
				f[b ? "addClass" : "removeClass"](h.$element, j), b ? (i.focusToggleElement(), e.open(i)) : e.close(i), k(a, b), angular.isDefined(b) && b !== c && l(a, {
					open: !! b
				})
			}), a.$on("$locationChangeSuccess", function() {
				i.isOpen = !1
			}), a.$on("$destroy", function() {
				i.$destroy()
			})
		}
	]).directive("dropdown", function() {
		return {
			controller: "DropdownController",
			link: function(a, b, c, d) {
				d.init(b)
			}
		}
	}).directive("dropdownToggle", function() {
		return {
			require: "?^dropdown",
			link: function(a, b, c, d) {
				if (d) {
					d.toggleElement = b;
					var e = function(e) {
						e.preventDefault(), b.hasClass("disabled") || c.disabled || a.$apply(function() {
							d.toggle()
						})
					};
					b.bind("click", e), b.attr({
						"aria-haspopup": !0,
						"aria-expanded": !1
					}), a.$watch(d.isOpen, function(a) {
						b.attr("aria-expanded", !! a)
					}), a.$on("$destroy", function() {
						b.unbind("click", e)
					})
				}
			}
		}
	}), angular.module("ui.bootstrap.modal", ["ui.bootstrap.transition"]).factory("$$stackedMap", function() {
		return {
			createNew: function() {
				var a = [];
				return {
					add: function(b, c) {
						a.push({
							key: b,
							value: c
						})
					},
					get: function(b) {
						for (var c = 0; c < a.length; c++)
							if (b == a[c].key) return a[c]
					},
					keys: function() {
						for (var b = [], c = 0; c < a.length; c++) b.push(a[c].key);
						return b
					},
					top: function() {
						return a[a.length - 1]
					},
					remove: function(b) {
						for (var c = -1, d = 0; d < a.length; d++)
							if (b == a[d].key) {
								c = d;
								break
							}
						return a.splice(c, 1)[0]
					},
					removeTop: function() {
						return a.splice(a.length - 1, 1)[0]
					},
					length: function() {
						return a.length
					}
				}
			}
		}
	}).directive("modalBackdrop", ["$timeout",
		function(a) {
			return {
				restrict: "EA",
				replace: !0,
				templateUrl: "template/modal/backdrop.html",
				link: function(b, c, d) {
					b.backdropClass = d.backdropClass || "", b.animate = !1, a(function() {
						b.animate = !0
					})
				}
			}
		}
	]).directive("modalWindow", ["$modalStack", "$timeout",
		function(a, b) {
			return {
				restrict: "EA",
				scope: {
					index: "@",
					animate: "="
				},
				replace: !0,
				transclude: !0,
				templateUrl: function(a, b) {
					return b.templateUrl || "template/modal/window.html"
				},
				link: function(c, d, e) {
					d.addClass(e.windowClass || ""), c.size = e.size, b(function() {
						c.animate = !0, d[0].querySelectorAll("[autofocus]").length || d[0].focus()
					}), c.close = function(b) {
						var c = a.getTop();
						c && c.value.backdrop && "static" != c.value.backdrop && b.target === b.currentTarget && (b.preventDefault(), b.stopPropagation(), a.dismiss(c.key, "backdrop click"))
					}
				}
			}
		}
	]).directive("modalTransclude", function() {
		return {
			link: function(a, b, c, d, e) {
				e(a.$parent, function(a) {
					b.empty(), b.append(a)
				})
			}
		}
	}).factory("$modalStack", ["$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap",
		function(a, b, c, d, e, f) {
			function g() {
				for (var a = -1, b = n.keys(), c = 0; c < b.length; c++) n.get(b[c]).value.backdrop && (a = c);
				return a
			}

			function h(a) {
				var b = c.find("body").eq(0),
					d = n.get(a).value;
				n.remove(a), j(d.modalDomEl, d.modalScope, 300, function() {
					d.modalScope.$destroy(), b.toggleClass(m, n.length() > 0), i()
				})
			}

			function i() {
				if (k && -1 == g()) {
					var a = l;
					j(k, l, 150, function() {
						a.$destroy(), a = null
					}), k = void 0, l = void 0
				}
			}

			function j(c, d, e, f) {
				function g() {
					g.done || (g.done = !0, c.remove(), f && f())
				}
				d.animate = !1;
				var h = a.transitionEndEventName;
				if (h) {
					var i = b(g, e);
					c.bind(h, function() {
						b.cancel(i), g(), d.$apply()
					})
				} else b(g)
			}
			var k, l, m = "modal-open",
				n = f.createNew(),
				o = {};
			return e.$watch(g, function(a) {
				l && (l.index = a)
			}), c.bind("keydown", function(a) {
				var b;
				27 === a.which && (b = n.top(), b && b.value.keyboard && (a.preventDefault(), e.$apply(function() {
					o.dismiss(b.key, "escape key press")
				})))
			}), o.open = function(a, b) {
				n.add(a, {
					deferred: b.deferred,
					modalScope: b.scope,
					backdrop: b.backdrop,
					keyboard: b.keyboard
				});
				var f = c.find("body").eq(0),
					h = g();
				if (h >= 0 && !k) {
					l = e.$new(!0), l.index = h;
					var i = angular.element("<div modal-backdrop></div>");
					i.attr("backdrop-class", b.backdropClass), k = d(i)(l), f.append(k)
				}
				var j = angular.element("<div modal-window></div>");
				j.attr({
					"template-url": b.windowTemplateUrl,
					"window-class": b.windowClass,
					size: b.size,
					index: n.length() - 1,
					animate: "animate"
				}).html(b.content);
				var o = d(j)(b.scope);
				n.top().value.modalDomEl = o, f.append(o), f.addClass(m)
			}, o.close = function(a, b) {
				var c = n.get(a);
				c && (c.value.deferred.resolve(b), h(a))
			}, o.dismiss = function(a, b) {
				var c = n.get(a);
				c && (c.value.deferred.reject(b), h(a))
			}, o.dismissAll = function(a) {
				for (var b = this.getTop(); b;) this.dismiss(b.key, a), b = this.getTop()
			}, o.getTop = function() {
				return n.top()
			}, o
		}
	]).provider("$modal", function() {
		var a = {
			options: {
				backdrop: !0,
				keyboard: !0
			},
			$get: ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack",
				function(b, c, d, e, f, g, h) {
					function i(a) {
						return a.template ? d.when(a.template) : e.get(angular.isFunction(a.templateUrl) ? a.templateUrl() : a.templateUrl, {
							cache: f
						}).then(function(a) {
							return a.data
						})
					}

					function j(a) {
						var c = [];
						return angular.forEach(a, function(a) {
							(angular.isFunction(a) || angular.isArray(a)) && c.push(d.when(b.invoke(a)))
						}), c
					}
					var k = {};
					return k.open = function(b) {
						var e = d.defer(),
							f = d.defer(),
							k = {
								result: e.promise,
								opened: f.promise,
								close: function(a) {
									h.close(k, a)
								},
								dismiss: function(a) {
									h.dismiss(k, a)
								}
							};
						if (b = angular.extend({}, a.options, b), b.resolve = b.resolve || {}, !b.template && !b.templateUrl) throw new Error("One of template or templateUrl options is required.");
						var l = d.all([i(b)].concat(j(b.resolve)));
						return l.then(function(a) {
							var d = (b.scope || c).$new();
							d.$close = k.close, d.$dismiss = k.dismiss;
							var f, i = {}, j = 1;
							b.controller && (i.$scope = d, i.$modalInstance = k, angular.forEach(b.resolve, function(b, c) {
								i[c] = a[j++]
							}), f = g(b.controller, i), b.controllerAs && (d[b.controllerAs] = f)), h.open(k, {
								scope: d,
								deferred: e,
								content: a[0],
								backdrop: b.backdrop,
								keyboard: b.keyboard,
								backdropClass: b.backdropClass,
								windowClass: b.windowClass,
								windowTemplateUrl: b.windowTemplateUrl,
								size: b.size
							})
						}, function(a) {
							e.reject(a)
						}), l.then(function() {
							f.resolve(!0)
						}, function() {
							f.reject(!1)
						}), k
					}, k
				}
			]
		};
		return a
	}), angular.module("ui.bootstrap.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse",
		function(a, b, c) {
			var d = this,
				e = {
					$setViewValue: angular.noop
				}, f = b.numPages ? c(b.numPages).assign : angular.noop;
			this.init = function(f, g) {
				e = f, this.config = g, e.$render = function() {
					d.render()
				}, b.itemsPerPage ? a.$parent.$watch(c(b.itemsPerPage), function(b) {
					d.itemsPerPage = parseInt(b, 10), a.totalPages = d.calculateTotalPages()
				}) : this.itemsPerPage = g.itemsPerPage
			}, this.calculateTotalPages = function() {
				var b = this.itemsPerPage < 1 ? 1 : Math.ceil(a.totalItems / this.itemsPerPage);
				return Math.max(b || 0, 1)
			}, this.render = function() {
				a.page = parseInt(e.$viewValue, 10) || 1
			}, a.selectPage = function(b) {
				a.page !== b && b > 0 && b <= a.totalPages && (e.$setViewValue(b), e.$render())
			}, a.getText = function(b) {
				return a[b + "Text"] || d.config[b + "Text"]
			}, a.noPrevious = function() {
				return 1 === a.page
			}, a.noNext = function() {
				return a.page === a.totalPages
			}, a.$watch("totalItems", function() {
				a.totalPages = d.calculateTotalPages()
			}), a.$watch("totalPages", function(b) {
				f(a.$parent, b), a.page > b ? a.selectPage(b) : e.$render()
			})
		}
	]).constant("paginationConfig", {
		itemsPerPage: 10,
		boundaryLinks: !1,
		directionLinks: !0,
		firstText: "First",
		previousText: "Previous",
		nextText: "Next",
		lastText: "Last",
		rotate: !0
	}).directive("pagination", ["$parse", "paginationConfig",
		function(a, b) {
			return {
				restrict: "EA",
				scope: {
					totalItems: "=",
					firstText: "@",
					previousText: "@",
					nextText: "@",
					lastText: "@"
				},
				require: ["pagination", "?ngModel"],
				controller: "PaginationController",
				templateUrl: "template/pagination/pagination.html",
				replace: !0,
				link: function(c, d, e, f) {
					function g(a, b, c) {
						return {
							number: a,
							text: b,
							active: c
						}
					}

					function h(a, b) {
						var c = [],
							d = 1,
							e = b,
							f = angular.isDefined(k) && b > k;
						f && (l ? (d = Math.max(a - Math.floor(k / 2), 1), e = d + k - 1, e > b && (e = b, d = e - k + 1)) : (d = (Math.ceil(a / k) - 1) * k + 1, e = Math.min(d + k - 1, b)));
						for (var h = d; e >= h; h++) {
							var i = g(h, h, h === a);
							c.push(i)
						}
						if (f && !l) {
							if (d > 1) {
								var j = g(d - 1, "...", !1);
								c.unshift(j)
							}
							if (b > e) {
								var m = g(e + 1, "...", !1);
								c.push(m)
							}
						}
						return c
					}
					var i = f[0],
						j = f[1];
					if (j) {
						var k = angular.isDefined(e.maxSize) ? c.$parent.$eval(e.maxSize) : b.maxSize,
							l = angular.isDefined(e.rotate) ? c.$parent.$eval(e.rotate) : b.rotate;
						c.boundaryLinks = angular.isDefined(e.boundaryLinks) ? c.$parent.$eval(e.boundaryLinks) : b.boundaryLinks, c.directionLinks = angular.isDefined(e.directionLinks) ? c.$parent.$eval(e.directionLinks) : b.directionLinks, i.init(j, b), e.maxSize && c.$parent.$watch(a(e.maxSize), function(a) {
							k = parseInt(a, 10), i.render()
						});
						var m = i.render;
						i.render = function() {
							m(), c.page > 0 && c.page <= c.totalPages && (c.pages = h(c.page, c.totalPages))
						}
					}
				}
			}
		}
	]).constant("pagerConfig", {
		itemsPerPage: 10,
		previousText: "« Previous",
		nextText: "Next »",
		align: !0
	}).directive("pager", ["pagerConfig",
		function(a) {
			return {
				restrict: "EA",
				scope: {
					totalItems: "=",
					previousText: "@",
					nextText: "@"
				},
				require: ["pager", "?ngModel"],
				controller: "PaginationController",
				templateUrl: "template/pagination/pager.html",
				replace: !0,
				link: function(b, c, d, e) {
					var f = e[0],
						g = e[1];
					g && (b.align = angular.isDefined(d.align) ? b.$parent.$eval(d.align) : a.align, f.init(g, a))
				}
			}
		}
	]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).provider("$tooltip", function() {
		function a(a) {
			var b = /[A-Z]/g,
				c = "-";
			return a.replace(b, function(a, b) {
				return (b ? c : "") + a.toLowerCase()
			})
		}
		var b = {
			placement: "top",
			animation: !0,
			popupDelay: 0
		}, c = {
				mouseenter: "mouseleave",
				click: "click",
				focus: "blur"
			}, d = {};
		this.options = function(a) {
			angular.extend(d, a)
		}, this.setTriggers = function(a) {
			angular.extend(c, a)
		}, this.$get = ["$window", "$compile", "$timeout", "$document", "$position", "$interpolate",
			function(e, f, g, h, i, j) {
				return function(e, k, l) {
					function m(a) {
						var b = a || n.trigger || l,
							d = c[b] || b;
						return {
							show: b,
							hide: d
						}
					}
					var n = angular.extend({}, b, d),
						o = a(e),
						p = j.startSymbol(),
						q = j.endSymbol(),
						r = "<div " + o + '-popup title="' + p + "title" + q + '" content="' + p + "content" + q + '" placement="' + p + "placement" + q + '" animation="animation" is-open="isOpen"></div>';
					return {
						restrict: "EA",
						compile: function() {
							var a = f(r);
							return function(b, c, d) {
								function f() {
									D.isOpen ? l() : j()
								}

								function j() {
									(!C || b.$eval(d[k + "Enable"])) && (s(), D.popupDelay ? z || (z = g(o, D.popupDelay, !1), z.then(function(a) {
										a()
									})) : o()())
								}

								function l() {
									b.$apply(function() {
										p()
									})
								}

								function o() {
									return z = null, y && (g.cancel(y), y = null), D.content ? (q(), w.css({
										top: 0,
										left: 0,
										display: "block"
									}), A ? h.find("body").append(w) : c.after(w), E(), D.isOpen = !0, D.$digest(), E) : angular.noop
								}

								function p() {
									D.isOpen = !1, g.cancel(z), z = null, D.animation ? y || (y = g(r, 500)) : r()
								}

								function q() {
									w && r(), x = D.$new(), w = a(x, angular.noop)
								}

								function r() {
									y = null, w && (w.remove(), w = null), x && (x.$destroy(), x = null)
								}

								function s() {
									t(), u()
								}

								function t() {
									var a = d[k + "Placement"];
									D.placement = angular.isDefined(a) ? a : n.placement
								}

								function u() {
									var a = d[k + "PopupDelay"],
										b = parseInt(a, 10);
									D.popupDelay = isNaN(b) ? n.popupDelay : b
								}

								function v() {
									var a = d[k + "Trigger"];
									F(), B = m(a), B.show === B.hide ? c.bind(B.show, f) : (c.bind(B.show, j), c.bind(B.hide, l))
								}
								var w, x, y, z, A = angular.isDefined(n.appendToBody) ? n.appendToBody : !1,
									B = m(void 0),
									C = angular.isDefined(d[k + "Enable"]),
									D = b.$new(!0),
									E = function() {
										var a = i.positionElements(c, w, D.placement, A);
										a.top += "px", a.left += "px", w.css(a)
									};
								D.isOpen = !1, d.$observe(e, function(a) {
									D.content = a, !a && D.isOpen && p()
								}), d.$observe(k + "Title", function(a) {
									D.title = a
								});
								var F = function() {
									c.unbind(B.show, j), c.unbind(B.hide, l)
								};
								v();
								var G = b.$eval(d[k + "Animation"]);
								D.animation = angular.isDefined(G) ? !! G : n.animation;
								var H = b.$eval(d[k + "AppendToBody"]);
								A = angular.isDefined(H) ? H : A, A && b.$on("$locationChangeSuccess", function() {
									D.isOpen && p()
								}), b.$on("$destroy", function() {
									g.cancel(y), g.cancel(z), F(), r(), D = null
								})
							}
						}
					}
				}
			}
		]
	}).directive("tooltipPopup", function() {
		return {
			restrict: "EA",
			replace: !0,
			scope: {
				content: "@",
				placement: "@",
				animation: "&",
				isOpen: "&"
			},
			templateUrl: "template/tooltip/tooltip-popup.html"
		}
	}).directive("tooltip", ["$tooltip",
		function(a) {
			return a("tooltip", "tooltip", "mouseenter")
		}
	]).directive("tooltipHtmlUnsafePopup", function() {
		return {
			restrict: "EA",
			replace: !0,
			scope: {
				content: "@",
				placement: "@",
				animation: "&",
				isOpen: "&"
			},
			templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
		}
	}).directive("tooltipHtmlUnsafe", ["$tooltip",
		function(a) {
			return a("tooltipHtmlUnsafe", "tooltip", "mouseenter")
		}
	]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverPopup", function() {
		return {
			restrict: "EA",
			replace: !0,
			scope: {
				title: "@",
				content: "@",
				placement: "@",
				animation: "&",
				isOpen: "&"
			},
			templateUrl: "template/popover/popover.html"
		}
	}).directive("popover", ["$tooltip",
		function(a) {
			return a("popover", "popover", "click")
		}
	]), angular.module("ui.bootstrap.progressbar", []).constant("progressConfig", {
		animate: !0,
		max: 100
	}).controller("ProgressController", ["$scope", "$attrs", "progressConfig",
		function(a, b, c) {
			var d = this,
				e = angular.isDefined(b.animate) ? a.$parent.$eval(b.animate) : c.animate;
			this.bars = [], a.max = angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max, this.addBar = function(b, c) {
				e || c.css({
					transition: "none"
				}), this.bars.push(b), b.$watch("value", function(c) {
					b.percent = +(100 * c / a.max).toFixed(2)
				}), b.$on("$destroy", function() {
					c = null, d.removeBar(b)
				})
			}, this.removeBar = function(a) {
				this.bars.splice(this.bars.indexOf(a), 1)
			}
		}
	]).directive("progress", function() {
		return {
			restrict: "EA",
			replace: !0,
			transclude: !0,
			controller: "ProgressController",
			require: "progress",
			scope: {},
			templateUrl: "template/progressbar/progress.html"
		}
	}).directive("bar", function() {
		return {
			restrict: "EA",
			replace: !0,
			transclude: !0,
			require: "^progress",
			scope: {
				value: "=",
				type: "@"
			},
			templateUrl: "template/progressbar/bar.html",
			link: function(a, b, c, d) {
				d.addBar(a, b)
			}
		}
	}).directive("progressbar", function() {
		return {
			restrict: "EA",
			replace: !0,
			transclude: !0,
			controller: "ProgressController",
			scope: {
				value: "=",
				type: "@"
			},
			templateUrl: "template/progressbar/progressbar.html",
			link: function(a, b, c, d) {
				d.addBar(a, angular.element(b.children()[0]))
			}
		}
	}), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
		max: 5,
		stateOn: null,
		stateOff: null
	}).controller("RatingController", ["$scope", "$attrs", "ratingConfig",
		function(a, b, c) {
			var d = {
				$setViewValue: angular.noop
			};
			this.init = function(e) {
				d = e, d.$render = this.render, this.stateOn = angular.isDefined(b.stateOn) ? a.$parent.$eval(b.stateOn) : c.stateOn, this.stateOff = angular.isDefined(b.stateOff) ? a.$parent.$eval(b.stateOff) : c.stateOff;
				var f = angular.isDefined(b.ratingStates) ? a.$parent.$eval(b.ratingStates) : new Array(angular.isDefined(b.max) ? a.$parent.$eval(b.max) : c.max);
				a.range = this.buildTemplateObjects(f)
			}, this.buildTemplateObjects = function(a) {
				for (var b = 0, c = a.length; c > b; b++) a[b] = angular.extend({
					index: b
				}, {
					stateOn: this.stateOn,
					stateOff: this.stateOff
				}, a[b]);
				return a
			}, a.rate = function(b) {
				!a.readonly && b >= 0 && b <= a.range.length && (d.$setViewValue(b), d.$render())
			}, a.enter = function(b) {
				a.readonly || (a.value = b), a.onHover({
					value: b
				})
			}, a.reset = function() {
				a.value = d.$viewValue, a.onLeave()
			}, a.onKeydown = function(b) {
				/(37|38|39|40)/.test(b.which) && (b.preventDefault(), b.stopPropagation(), a.rate(a.value + (38 === b.which || 39 === b.which ? 1 : -1)))
			}, this.render = function() {
				a.value = d.$viewValue
			}
		}
	]).directive("rating", function() {
		return {
			restrict: "EA",
			require: ["rating", "ngModel"],
			scope: {
				readonly: "=?",
				onHover: "&",
				onLeave: "&"
			},
			controller: "RatingController",
			templateUrl: "template/rating/rating.html",
			replace: !0,
			link: function(a, b, c, d) {
				var e = d[0],
					f = d[1];
				f && e.init(f)
			}
		}
	}), angular.module("ui.bootstrap.tabs", []).controller("TabsetController", ["$scope",
		function(a) {
			var b = this,
				c = b.tabs = a.tabs = [];
			b.select = function(a) {
				angular.forEach(c, function(b) {
					b.active && b !== a && (b.active = !1, b.onDeselect())
				}), a.active = !0, a.onSelect()
			}, b.addTab = function(a) {
				c.push(a), 1 === c.length ? a.active = !0 : a.active && b.select(a)
			}, b.removeTab = function(a) {
				var e = c.indexOf(a);
				if (a.active && c.length > 1 && !d) {
					var f = e == c.length - 1 ? e - 1 : e + 1;
					b.select(c[f])
				}
				c.splice(e, 1)
			};
			var d;
			a.$on("$destroy", function() {
				d = !0
			})
		}
	]).directive("tabset", function() {
		return {
			restrict: "EA",
			transclude: !0,
			replace: !0,
			scope: {
				type: "@"
			},
			controller: "TabsetController",
			templateUrl: "template/tabs/tabset.html",
			link: function(a, b, c) {
				a.vertical = angular.isDefined(c.vertical) ? a.$parent.$eval(c.vertical) : !1, a.justified = angular.isDefined(c.justified) ? a.$parent.$eval(c.justified) : !1
			}
		}
	}).directive("tab", ["$parse",
		function(a) {
			return {
				require: "^tabset",
				restrict: "EA",
				replace: !0,
				templateUrl: "template/tabs/tab.html",
				transclude: !0,
				scope: {
					active: "=?",
					heading: "@",
					onSelect: "&select",
					onDeselect: "&deselect"
				},
				controller: function() {},
				compile: function(b, c, d) {
					return function(b, c, e, f) {
						b.$watch("active", function(a) {
							a && f.select(b)
						}), b.disabled = !1, e.disabled && b.$parent.$watch(a(e.disabled), function(a) {
							b.disabled = !! a
						}), b.select = function() {
							b.disabled || (b.active = !0)
						}, f.addTab(b), b.$on("$destroy", function() {
							f.removeTab(b)
						}), b.$transcludeFn = d
					}
				}
			}
		}
	]).directive("tabHeadingTransclude", [
		function() {
			return {
				restrict: "A",
				require: "^tab",
				link: function(a, b) {
					a.$watch("headingElement", function(a) {
						a && (b.html(""), b.append(a))
					})
				}
			}
		}
	]).directive("tabContentTransclude", function() {
		function a(a) {
			return a.tagName && (a.hasAttribute("tab-heading") || a.hasAttribute("data-tab-heading") || "tab-heading" === a.tagName.toLowerCase() || "data-tab-heading" === a.tagName.toLowerCase())
		}
		return {
			restrict: "A",
			require: "^tabset",
			link: function(b, c, d) {
				var e = b.$eval(d.tabContentTransclude);
				e.$transcludeFn(e.$parent, function(b) {
					angular.forEach(b, function(b) {
						a(b) ? e.headingElement = b : c.append(b)
					})
				})
			}
		}
	}), angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
		hourStep: 1,
		minuteStep: 1,
		showMeridian: !0,
		meridians: null,
		readonlyInput: !1,
		mousewheel: !0
	}).controller("TimepickerController", ["$scope", "$attrs", "$parse", "$log", "$locale", "timepickerConfig",
		function(a, b, c, d, e, f) {
			function g() {
				var b = parseInt(a.hours, 10),
					c = a.showMeridian ? b > 0 && 13 > b : b >= 0 && 24 > b;
				return c ? (a.showMeridian && (12 === b && (b = 0), a.meridian === p[1] && (b += 12)), b) : void 0
			}

			function h() {
				var b = parseInt(a.minutes, 10);
				return b >= 0 && 60 > b ? b : void 0
			}

			function i(a) {
				return angular.isDefined(a) && a.toString().length < 2 ? "0" + a : a
			}

			function j(a) {
				k(), o.$setViewValue(new Date(n)), l(a)
			}

			function k() {
				o.$setValidity("time", !0), a.invalidHours = !1, a.invalidMinutes = !1
			}

			function l(b) {
				var c = n.getHours(),
					d = n.getMinutes();
				a.showMeridian && (c = 0 === c || 12 === c ? 12 : c % 12), a.hours = "h" === b ? c : i(c), a.minutes = "m" === b ? d : i(d), a.meridian = n.getHours() < 12 ? p[0] : p[1]
			}

			function m(a) {
				var b = new Date(n.getTime() + 6e4 * a);
				n.setHours(b.getHours(), b.getMinutes()), j()
			}
			var n = new Date,
				o = {
					$setViewValue: angular.noop
				}, p = angular.isDefined(b.meridians) ? a.$parent.$eval(b.meridians) : f.meridians || e.DATETIME_FORMATS.AMPMS;
			this.init = function(c, d) {
				o = c, o.$render = this.render;
				var e = d.eq(0),
					g = d.eq(1),
					h = angular.isDefined(b.mousewheel) ? a.$parent.$eval(b.mousewheel) : f.mousewheel;
				h && this.setupMousewheelEvents(e, g), a.readonlyInput = angular.isDefined(b.readonlyInput) ? a.$parent.$eval(b.readonlyInput) : f.readonlyInput, this.setupInputEvents(e, g)
			};
			var q = f.hourStep;
			b.hourStep && a.$parent.$watch(c(b.hourStep), function(a) {
				q = parseInt(a, 10)
			});
			var r = f.minuteStep;
			b.minuteStep && a.$parent.$watch(c(b.minuteStep), function(a) {
				r = parseInt(a, 10)
			}), a.showMeridian = f.showMeridian, b.showMeridian && a.$parent.$watch(c(b.showMeridian), function(b) {
				if (a.showMeridian = !! b, o.$error.time) {
					var c = g(),
						d = h();
					angular.isDefined(c) && angular.isDefined(d) && (n.setHours(c), j())
				} else l()
			}), this.setupMousewheelEvents = function(b, c) {
				var d = function(a) {
					a.originalEvent && (a = a.originalEvent);
					var b = a.wheelDelta ? a.wheelDelta : -a.deltaY;
					return a.detail || b > 0
				};
				b.bind("mousewheel wheel", function(b) {
					a.$apply(d(b) ? a.incrementHours() : a.decrementHours()), b.preventDefault()
				}), c.bind("mousewheel wheel", function(b) {
					a.$apply(d(b) ? a.incrementMinutes() : a.decrementMinutes()), b.preventDefault()
				})
			}, this.setupInputEvents = function(b, c) {
				if (a.readonlyInput) return a.updateHours = angular.noop, void(a.updateMinutes = angular.noop);
				var d = function(b, c) {
					o.$setViewValue(null), o.$setValidity("time", !1), angular.isDefined(b) && (a.invalidHours = b), angular.isDefined(c) && (a.invalidMinutes = c)
				};
				a.updateHours = function() {
					var a = g();
					angular.isDefined(a) ? (n.setHours(a), j("h")) : d(!0)
				}, b.bind("blur", function() {
					!a.invalidHours && a.hours < 10 && a.$apply(function() {
						a.hours = i(a.hours)
					})
				}), a.updateMinutes = function() {
					var a = h();
					angular.isDefined(a) ? (n.setMinutes(a), j("m")) : d(void 0, !0)
				}, c.bind("blur", function() {
					!a.invalidMinutes && a.minutes < 10 && a.$apply(function() {
						a.minutes = i(a.minutes)
					})
				})
			}, this.render = function() {
				var a = o.$modelValue ? new Date(o.$modelValue) : null;
				isNaN(a) ? (o.$setValidity("time", !1), d.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (a && (n = a), k(), l())
			}, a.incrementHours = function() {
				m(60 * q)
			}, a.decrementHours = function() {
				m(60 * -q)
			}, a.incrementMinutes = function() {
				m(r)
			}, a.decrementMinutes = function() {
				m(-r)
			}, a.toggleMeridian = function() {
				m(720 * (n.getHours() < 12 ? 1 : -1))
			}
		}
	]).directive("timepicker", function() {
		return {
			restrict: "EA",
			require: ["timepicker", "?^ngModel"],
			controller: "TimepickerController",
			replace: !0,
			scope: {},
			templateUrl: "template/timepicker/timepicker.html",
			link: function(a, b, c, d) {
				var e = d[0],
					f = d[1];
				f && e.init(f, b.find("input"))
			}
		}
	}), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).factory("typeaheadParser", ["$parse",
		function(a) {
			var b = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
			return {
				parse: function(c) {
					var d = c.match(b);
					if (!d) throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + c + '".');
					return {
						itemName: d[3],
						source: a(d[4]),
						viewMapper: a(d[2] || d[1]),
						modelMapper: a(d[1])
					}
				}
			}
		}
	]).directive("typeahead", ["$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser",
		function(a, b, c, d, e, f, g) {
			var h = [9, 13, 27, 38, 40];
			return {
				require: "ngModel",
				link: function(i, j, k, l) {
					var m, n = i.$eval(k.typeaheadMinLength) || 1,
						o = i.$eval(k.typeaheadWaitMs) || 0,
						p = i.$eval(k.typeaheadEditable) !== !1,
						q = b(k.typeaheadLoading).assign || angular.noop,
						r = b(k.typeaheadOnSelect),
						s = k.typeaheadInputFormatter ? b(k.typeaheadInputFormatter) : void 0,
						t = k.typeaheadAppendToBody ? i.$eval(k.typeaheadAppendToBody) : !1,
						u = i.$eval(k.typeaheadFocusFirst) !== !1,
						v = b(k.ngModel).assign,
						w = g.parse(k.typeahead),
						x = i.$new();
					i.$on("$destroy", function() {
						x.$destroy()
					});
					var y = "typeahead-" + x.$id + "-" + Math.floor(1e4 * Math.random());
					j.attr({
						"aria-autocomplete": "list",
						"aria-expanded": !1,
						"aria-owns": y
					});
					var z = angular.element("<div typeahead-popup></div>");
					z.attr({
						id: y,
						matches: "matches",
						active: "activeIdx",
						select: "select(activeIdx)",
						query: "query",
						position: "position"
					}), angular.isDefined(k.typeaheadTemplateUrl) && z.attr("template-url", k.typeaheadTemplateUrl);
					var A = function() {
						x.matches = [], x.activeIdx = -1, j.attr("aria-expanded", !1)
					}, B = function(a) {
							return y + "-option-" + a
						};
					x.$watch("activeIdx", function(a) {
						0 > a ? j.removeAttr("aria-activedescendant") : j.attr("aria-activedescendant", B(a))
					});
					var C = function(a) {
						var b = {
							$viewValue: a
						};
						q(i, !0), c.when(w.source(i, b)).then(function(c) {
							var d = a === l.$viewValue;
							if (d && m)
								if (c.length > 0) {
									x.activeIdx = u ? 0 : -1, x.matches.length = 0;
									for (var e = 0; e < c.length; e++) b[w.itemName] = c[e], x.matches.push({
										id: B(e),
										label: w.viewMapper(x, b),
										model: c[e]
									});
									x.query = a, x.position = t ? f.offset(j) : f.position(j), x.position.top = x.position.top + j.prop("offsetHeight"), j.attr("aria-expanded", !0)
								} else A();
							d && q(i, !1)
						}, function() {
							A(), q(i, !1)
						})
					};
					A(), x.query = void 0;
					var D, E = function(a) {
							D = d(function() {
								C(a)
							}, o)
						}, F = function() {
							D && d.cancel(D)
						};
					l.$parsers.unshift(function(a) {
						return m = !0, a && a.length >= n ? o > 0 ? (F(), E(a)) : C(a) : (q(i, !1), F(), A()), p ? a : a ? void l.$setValidity("editable", !1) : (l.$setValidity("editable", !0), a)
					}), l.$formatters.push(function(a) {
						var b, c, d = {};
						return s ? (d.$model = a, s(i, d)) : (d[w.itemName] = a, b = w.viewMapper(i, d), d[w.itemName] = void 0, c = w.viewMapper(i, d), b !== c ? b : a)
					}), x.select = function(a) {
						var b, c, e = {};
						e[w.itemName] = c = x.matches[a].model, b = w.modelMapper(i, e), v(i, b), l.$setValidity("editable", !0), r(i, {
							$item: c,
							$model: b,
							$label: w.viewMapper(i, e)
						}), A(), d(function() {
							j[0].focus()
						}, 0, !1)
					}, j.bind("keydown", function(a) {
						0 !== x.matches.length && -1 !== h.indexOf(a.which) && (-1 != x.activeIdx || 13 !== a.which && 9 !== a.which) && (a.preventDefault(), 40 === a.which ? (x.activeIdx = (x.activeIdx + 1) % x.matches.length, x.$digest()) : 38 === a.which ? (x.activeIdx = (x.activeIdx > 0 ? x.activeIdx : x.matches.length) - 1, x.$digest()) : 13 === a.which || 9 === a.which ? x.$apply(function() {
							x.select(x.activeIdx)
						}) : 27 === a.which && (a.stopPropagation(), A(), x.$digest()))
					}), j.bind("blur", function() {
						m = !1
					});
					var G = function(a) {
						j[0] !== a.target && (A(), x.$digest())
					};
					e.bind("click", G), i.$on("$destroy", function() {
						e.unbind("click", G), t && H.remove()
					});
					var H = a(z)(x);
					t ? e.find("body").append(H) : j.after(H)
				}
			}
		}
	]).directive("typeaheadPopup", function() {
		return {
			restrict: "EA",
			scope: {
				matches: "=",
				query: "=",
				active: "=",
				position: "=",
				select: "&"
			},
			replace: !0,
			templateUrl: "template/typeahead/typeahead-popup.html",
			link: function(a, b, c) {
				a.templateUrl = c.templateUrl, a.isOpen = function() {
					return a.matches.length > 0
				}, a.isActive = function(b) {
					return a.active == b
				}, a.selectActive = function(b) {
					a.active = b
				}, a.selectMatch = function(b) {
					a.select({
						activeIdx: b
					})
				}
			}
		}
	}).directive("typeaheadMatch", ["$http", "$templateCache", "$compile", "$parse",
		function(a, b, c, d) {
			return {
				restrict: "EA",
				scope: {
					index: "=",
					match: "=",
					query: "="
				},
				link: function(e, f, g) {
					var h = d(g.templateUrl)(e.$parent) || "template/typeahead/typeahead-match.html";
					a.get(h, {
						cache: b
					}).success(function(a) {
						f.replaceWith(c(a.trim())(e))
					})
				}
			}
		}
	]).filter("typeaheadHighlight", function() {
		function a(a) {
			return a.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
		}
		return function(b, c) {
			return c ? ("" + b).replace(new RegExp(a(c), "gi"), "<strong>$&</strong>") : b
		}
	}), angular.module("template/accordion/accordion-group.html", []).run(["$templateCache",
		function(a) {
			a.put("template/accordion/accordion-group.html", '<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a href class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>\n')
		}
	]), angular.module("template/accordion/accordion.html", []).run(["$templateCache",
		function(a) {
			a.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>')
		}
	]), angular.module("template/alert/alert.html", []).run(["$templateCache",
		function(a) {
			a.put("template/alert/alert.html", '<div class="alert" ng-class="[\'alert-\' + (type || \'warning\'), closeable ? \'alert-dismissable\' : null]" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')
		}
	]), angular.module("template/carousel/carousel.html", []).run(["$templateCache",
		function(a) {
			a.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n')
		}
	]), angular.module("template/carousel/slide.html", []).run(["$templateCache",
		function(a) {
			a.put("template/carousel/slide.html", "<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n")
		}
	]), angular.module("template/datepicker/datepicker.html", []).run(["$templateCache",
		function(a) {
			a.put("template/datepicker/datepicker.html", '<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>')
		}
	]), angular.module("template/datepicker/day.html", []).run(["$templateCache",
		function(a) {
			a.put("template/datepicker/day.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-show="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
		}
	]), angular.module("template/datepicker/month.html", []).run(["$templateCache",
		function(a) {
			a.put("template/datepicker/month.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
		}
	]), angular.module("template/datepicker/popup.html", []).run(["$templateCache",
		function(a) {
			a.put("template/datepicker/popup.html", '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)">\n	<li ng-transclude></li>\n	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group pull-left">\n			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n	</li>\n</ul>\n')
		}
	]), angular.module("template/datepicker/year.html", []).run(["$templateCache",
		function(a) {
			a.put("template/datepicker/year.html", '<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')
		}
	]), angular.module("template/modal/backdrop.html", []).run(["$templateCache",
		function(a) {
			a.put("template/modal/backdrop.html", '<div class="modal-backdrop fade {{ backdropClass }}"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')
		}
	]), angular.module("template/modal/window.html", []).run(["$templateCache",
		function(a) {
			a.put("template/modal/window.html", '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" modal-transclude></div></div>\n</div>')
		}
	]), angular.module("template/pagination/pager.html", []).run(["$templateCache",
		function(a) {
			a.put("template/pagination/pager.html", '<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>')
		}
	]), angular.module("template/pagination/pagination.html", []).run(["$templateCache",
		function(a) {
			a.put("template/pagination/pagination.html", '<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>')
		}
	]), angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache",
		function(a) {
			a.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')
		}
	]), angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache",
		function(a) {
			a.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')
		}
	]), angular.module("template/popover/popover.html", []).run(["$templateCache",
		function(a) {
			a.put("template/popover/popover.html", '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n');

		}
	]), angular.module("template/progressbar/bar.html", []).run(["$templateCache",
		function(a) {
			a.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>')
		}
	]), angular.module("template/progressbar/progress.html", []).run(["$templateCache",
		function(a) {
			a.put("template/progressbar/progress.html", '<div class="progress" ng-transclude></div>')
		}
	]), angular.module("template/progressbar/progressbar.html", []).run(["$templateCache",
		function(a) {
			a.put("template/progressbar/progressbar.html", '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n</div>')
		}
	]), angular.module("template/rating/rating.html", []).run(["$templateCache",
		function(a) {
			a.put("template/rating/rating.html", '<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n        <span class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    </i>\n</span>')
		}
	]), angular.module("template/tabs/tab.html", []).run(["$templateCache",
		function(a) {
			a.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')
		}
	]), angular.module("template/tabs/tabset.html", []).run(["$templateCache",
		function(a) {
			a.put("template/tabs/tabset.html", '<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')
		}
	]), angular.module("template/timepicker/timepicker.html", []).run(["$templateCache",
		function(a) {
			a.put("template/timepicker/timepicker.html", '<table>\n	<tbody>\n		<tr class="text-center">\n			<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n		<tr>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n				<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td>:</td>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n				<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n		</tr>\n		<tr class="text-center">\n			<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n	</tbody>\n</table>\n')
		}
	]), angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache",
		function(a) {
			a.put("template/typeahead/typeahead-match.html", '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')
		}
	]), angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache",
		function(a) {
			a.put("template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')
		}
	]), d("angular-bootstrap-tpls", ["angular", "angular-bootstrap"], function() {}),
	function() {
		function a(a, b) {
			window.XMLHttpRequest.prototype[a] = b(window.XMLHttpRequest.prototype[a])
		}

		function b(a, b, c, d, e, f, g) {
			function h(a, b, c, d, g) {
				for (var h = [], i = 0; i < a.length; i++) h.push(a.item(i));
				c && f(function() {
					d[b.ngModel] ? d[b.ngModel].value = h : d[b.ngModel] = h, c && c.$setViewValue(null != h && 0 == h.length ? "" : h)
				}), b.ngFileChange && "" != b.ngFileChange && f(function() {
					e(b.ngFileChange)(d, {
						$files: h,
						$event: g
					})
				})
			}
			c.ngMultiple && e(c.ngMultiple)(a) && (b.attr("multiple", "true"), c.multiple = "true");
			var i = c.ngAccept && e(c.ngAccept)(a);
			i && (b.attr("accept", i), c.accept = i);
			var j = c.ngCapture && e(c.ngCapture)(a);
			if (j && (b.attr("capture", j), c.capture = j), "input" !== b[0].tagName.toLowerCase() || "file" !== (b.attr("type") && b.attr("type").toLowerCase())) {
				var k = "--ng-file-upload-" + Math.random(),
					l = angular.element('<input type="file" id="' + k + '">');
				c.multiple && l.attr("multiple", c.multiple), c.accept && l.attr("accept", c.accept), c.capture && l.attr("capture", c.capture);
				for (var m in c)
					if (0 == m.indexOf("inputFile")) {
						var n = m.substring("inputFile".length);
						n = n[0].toLowerCase() + n.substring(1), l.attr(n, c[m])
					}
				l.css("width", "0px").css("height", "0px").css("position", "absolute").css("padding", 0).css("margin", 0).css("overflow", "hidden").attr("tabindex", "-1").css("opacity", 0).attr("ng-file-generated-elem--", !0), b.parent()[0].insertBefore(l[0], b[0]), b.attr("onclick", 'document.getElementById("' + k + '").click()'), b.css("overflow", "hidden"), b.attr("id", "e" + k);
				b = l
			}
			if ("" != c.ngFileSelect && (c.ngFileChange = c.ngFileSelect), 0 != e(c.resetOnClick)(a))
				if (-1 !== navigator.appVersion.indexOf("MSIE 10")) {
					var o = function(c) {
						var d = b.clone();
						d.val(""), b.replaceWith(d), g(d)(a), l = d, b = d, b.bind("change", p), b.unbind("click"), b[0].click(), b.bind("click", o), c.preventDefault(), c.stopPropagation()
					};
					b.bind("click", o)
				} else b.bind("click", function() {
					b[0].value = null
				});
			var p = function(b) {
				var e;
				e = b.__files_ || b.target.files, h(e, c, d, a, b)
			};
			b.bind("change", p)
		}

		function c(a, b, c, g, h, i, j) {
			function k(a, b, c) {
				var d = !0;
				if (s) {
					var e = c.dataTransfer.items;
					if (null != e)
						for (var f = 0; f < e.length && d; f++) d = d && ("file" == e[f].kind || "" == e[f].kind) && (null != e[f].type.match(s) || null != e[f].name && null != e[f].name.match(s))
				}
				var g = h(b.dragOverClass)(a, {
					$event: c
				});
				return g && (g.delay && (q = g.delay), g.accept && (g = d ? g.accept : g.reject)), g || b.dragOverClass || "dragover"
			}

			function l(a, b, c, d) {
				function f(a) {
					!s || a.type.match(s) || null != a.name && a.name.match(s) ? h.push(a) : k.push(a)
				}

				function g(a, b, c) {
					if (null != b)
						if (b.isDirectory) {
							var d = (c || "") + b.name;
							f({
								name: b.name,
								type: "directory",
								path: d
							});
							var e = b.createReader(),
								h = [];
							m++;
							var i = function() {
								e.readEntries(function(d) {
									try {
										if (d.length) h = h.concat(Array.prototype.slice.call(d || [], 0)), i();
										else {
											for (var e = 0; e < h.length; e++) g(a, h[e], (c ? c : "") + b.name + "/");
											m--
										}
									} catch (f) {
										m--, console.error(f)
									}
								}, function() {
									m--
								})
							};
							i()
						} else m++, b.file(function(a) {
							try {
								m--, a.path = (c ? c : "") + a.name, f(a)
							} catch (b) {
								m--, console.error(b)
							}
						}, function() {
							m--
						})
				}
				var h = [],
					k = [],
					l = a.dataTransfer.items,
					m = 0;
				if (l && l.length > 0 && "file" != j.protocol())
					for (var n = 0; n < l.length; n++) {
						if (l[n].webkitGetAsEntry && l[n].webkitGetAsEntry() && l[n].webkitGetAsEntry().isDirectory) {
							var o = l[n].webkitGetAsEntry();
							if (o.isDirectory && !c) continue;
							null != o && (e(o.name) ? g(h, o) : l[n].webkitGetAsEntry().isDirectory || f(l[n].getAsFile()))
						} else {
							var p = l[n].getAsFile();
							null != p && f(p)
						} if (!d && h.length > 0) break
					} else {
						var q = a.dataTransfer.files;
						if (null != q)
							for (var n = 0; n < q.length && (f(q.item(n)), d || !(h.length > 0)); n++);
					}
				var r = 0;
				! function t(a) {
					i(function() {
						if (m) 10 * r++ < 2e4 && t(10);
						else {
							if (!d && h.length > 1) {
								for (var a = 0;
									"directory" == h[a].type;) a++;
								h = [h[a]]
							}
							b(h, k)
						}
					}, a || 0)
				}()
			}
			var m = d();
			if (c.dropAvailable && i(function() {
				a.dropAvailable ? a.dropAvailable.value = m : a.dropAvailable = m
			}), !m) return void(0 != h(c.hideOnDropNotAvailable)(a) && b.css("display", "none"));
			var n, o = null,
				p = h(c.stopPropagation)(a),
				q = 1,
				r = h(c.ngAccept)(a) || c.accept,
				s = r ? new RegExp(f(r)) : null;
			b[0].addEventListener("dragover", function(d) {
				d.preventDefault(), p && d.stopPropagation(), i.cancel(o), a.actualDragOverClass || (n = k(a, c, d)), b.addClass(n)
			}, !1), b[0].addEventListener("dragenter", function(a) {
				a.preventDefault(), p && a.stopPropagation()
			}, !1), b[0].addEventListener("dragleave", function() {
				o = i(function() {
					b.removeClass(n), n = null
				}, q || 1)
			}, !1), "" != c.ngFileDrop && (c.ngFileChange = a.ngFileDrop), b[0].addEventListener("drop", function(d) {
				d.preventDefault(), p && d.stopPropagation(), b.removeClass(n), n = null, l(d, function(b, e) {
					g && (a[c.ngModel] ? a[c.ngModel].value = b : a[c.ngModel] = b, g && g.$setViewValue(null != b && 0 == b.length ? "" : b)), c.ngFileRejectedModel && (a[c.ngFileRejectedModel] ? a[c.ngFileRejectedModel].value = e : a[c.ngFileRejectedModel] = e), i(function() {
						h(c.ngFileChange)(a, {
							$files: b,
							$rejectedFiles: e,
							$event: d
						})
					})
				}, 0 != h(c.allowDir)(a), c.multiple || h(c.ngMultiple)(a))
			}, !1)
		}

		function d() {
			var a = document.createElement("div");
			return "draggable" in a && "ondrop" in a
		}

		function e(a) {
			return /^[\000-\177]*$/.test(a)
		}

		function f(a) {
			if (a.length > 2 && "/" === a[0] && "/" === a[a.length - 1]) return a.substring(1, a.length - 1);
			var b = a.split(","),
				c = "";
			if (b.length > 1)
				for (var d = 0; d < b.length; d++) c += "(" + f(b[d]) + ")", d < b.length - 1 && (c += "|");
			else c = "^" + a.replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]", "g"), "\\$&") + "$", c = c.replace(/\\\*/g, ".*").replace(/\\\?/g, ".");
			return c
		}
		window.XMLHttpRequest && !window.XMLHttpRequest.__isFileAPIShim && a("setRequestHeader", function(a) {
			return function(b, c) {
				if ("__setXHR_" === b) {
					var d = c(this);
					d instanceof Function && d(this)
				} else a.apply(this, arguments)
			}
		});
		var g = angular.module("angularFileUpload", []);
		g.version = "2.2.2", g.service("$upload", ["$http", "$q", "$timeout",
			function(a, b, c) {
				function d(d) {
					d.method = d.method || "POST", d.headers = d.headers || {}, d.transformRequest = d.transformRequest || function(b, c) {
						return window.ArrayBuffer && b instanceof window.ArrayBuffer ? b : a.defaults.transformRequest[0](b, c)
					};
					var e = b.defer(),
						f = e.promise;
					return d.headers.__setXHR_ = function() {
						return function(a) {
							a && (d.__XHR = a, d.xhrFn && d.xhrFn(a), a.upload.addEventListener("progress", function(a) {
								a.config = d, e.notify ? e.notify(a) : f.progress_fn && c(function() {
									f.progress_fn(a)
								})
							}, !1), a.upload.addEventListener("load", function(a) {
								a.lengthComputable && (a.config = d, e.notify ? e.notify(a) : f.progress_fn && c(function() {
									f.progress_fn(a)
								}))
							}, !1))
						}
					}, a(d).then(function(a) {
						e.resolve(a)
					}, function(a) {
						e.reject(a)
					}, function(a) {
						e.notify(a)
					}), f.success = function(a) {
						return f.then(function(b) {
							a(b.data, b.status, b.headers, d)
						}), f
					}, f.error = function(a) {
						return f.then(null, function(b) {
							a(b.data, b.status, b.headers, d)
						}), f
					}, f.progress = function(a) {
						return f.progress_fn = a, f.then(null, null, function(b) {
							a(b)
						}), f
					}, f.abort = function() {
						return d.__XHR && c(function() {
							d.__XHR.abort()
						}), f
					}, f.xhr = function(a) {
						return d.xhrFn = function(b) {
							return function() {
								b && b.apply(f, arguments), a.apply(f, arguments)
							}
						}(d.xhrFn), f
					}, f
				}
				this.upload = function(b) {
					b.headers = b.headers || {}, b.headers["Content-Type"] = void 0, b.transformRequest = b.transformRequest || a.defaults.transformRequest;
					var c = new FormData,
						e = b.transformRequest,
						f = b.data;
					return b.transformRequest = function(a, c) {
						function d(a) {
							if ("function" == typeof e) a = e(a, c);
							else
								for (var b = 0; b < e.length; b++) "function" == typeof e[b] && (a = e[b](a, c));
							return a
						}
						if (f)
							if (b.formDataAppender)
								for (var g in f) {
									var h = f[g];
									b.formDataAppender(a, g, h)
								} else if (b.sendDataAsJson) f = d(f), a.append("data", new Blob([f], {
									type: "application/json"
								}));
								else
									for (var g in f) {
										var h = d(f[g]);
										void 0 !== h && (b.sendObjectAsJson && "object" == typeof h && "[object String]" !== Object.prototype.toString.call(i) ? a.append(g, new Blob(h), {
											type: "application/json"
										}) : a.append(g, h))
									}
								if (null != b.file) {
									var i = b.fileFormDataName || "file";
									if ("[object Array]" === Object.prototype.toString.call(b.file))
										for (var j = "[object String]" === Object.prototype.toString.call(i), k = 0; k < b.file.length; k++) a.append(j ? i : i[k], b.file[k], b.fileName && b.fileName[k] || b.file[k].name);
									else a.append(i, b.file, b.fileName || b.file.name)
								}
						return a
					}, b.data = c, d(b)
				}, this.http = function(a) {
					return d(a)
				}
			}
		]), g.directive("ngFileSelect", ["$parse", "$timeout", "$compile",
			function(a, c, d) {
				return {
					restrict: "AEC",
					require: "?ngModel",
					link: function(e, f, g, h) {
						b(e, f, g, h, a, c, d)
					}
				}
			}
		]), g.directive("ngFileDrop", ["$parse", "$timeout", "$location",
			function(a, b, d) {
				return {
					restrict: "AEC",
					require: "?ngModel",
					link: function(e, f, g, h) {
						c(e, f, g, h, a, b, d)
					}
				}
			}
		]), g.directive("ngNoFileDrop", function() {
			return function(a, b) {
				d() && b.css("display", "none")
			}
		}), g.directive("ngFileDropAvailable", ["$parse", "$timeout",
			function(a, b) {
				return function(c, e, f) {
					if (d()) {
						var g = a(f.ngFileDropAvailable);
						b(function() {
							g(c)
						})
					}
				}
			}
		])
	}(), d("ng-file-upload", function() {}), ! function(a, b) {
		b["true"] = a, angular.module("textAngularSetup", []).value("taOptions", {
			toolbar: [
				["h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "quote"],
				["bold", "italics", "underline", "ul", "ol", "redo", "undo", "clear"],
				["justifyLeft", "justifyCenter", "justifyRight", "indent", "outdent"],
				["html", "insertImage", "insertLink", "insertVideo"]
			],
			classes: {
				focussed: "focussed",
				toolbar: "btn-toolbar",
				toolbarGroup: "btn-group",
				toolbarButton: "btn btn-default",
				toolbarButtonActive: "active",
				disabled: "disabled",
				textEditor: "form-control",
				htmlEditor: "form-control"
			},
			setup: {
				textEditorSetup: function() {},
				htmlEditorSetup: function() {}
			},
			defaultFileDropHandler: function(a, b) {
				var c = new FileReader;
				return "image" === a.type.substring(0, 5) ? (c.onload = function() {
					"" !== c.result && b("insertImage", c.result, !0)
				}, c.readAsDataURL(a), !0) : !1
			}
		}).value("taSelectableElements", ["a", "img"]).value("taCustomRenderers", [{
			selector: "img",
			customAttribute: "ta-insert-video",
			renderLogic: function(a) {
				var b = angular.element("<iframe></iframe>"),
					c = a.prop("attributes");
				angular.forEach(c, function(a) {
					b.attr(a.name, a.value)
				}), b.attr("src", b.attr("ta-insert-video")), a.replaceWith(b)
			}
		}]).constant("taTranslations", {
			html: {
				buttontext: "Toggle HTML",
				tooltip: "Toggle html / Rich Text"
			},
			heading: {
				tooltip: "Heading "
			},
			p: {
				tooltip: "Paragraph"
			},
			pre: {
				tooltip: "Preformatted text"
			},
			ul: {
				tooltip: "Unordered List"
			},
			ol: {
				tooltip: "Ordered List"
			},
			quote: {
				tooltip: "Quote/unqoute selection or paragraph"
			},
			undo: {
				tooltip: "Undo"
			},
			redo: {
				tooltip: "Redo"
			},
			bold: {
				tooltip: "Bold"
			},
			italic: {
				tooltip: "Italic"
			},
			underline: {
				tooltip: "Underline"
			},
			justifyLeft: {
				tooltip: "Align text left"
			},
			justifyRight: {
				tooltip: "Align text right"
			},
			justifyCenter: {
				tooltip: "Center"
			},
			indent: {
				tooltip: "Increase indent"
			},
			outdent: {
				tooltip: "Decrease indent"
			},
			clear: {
				tooltip: "Clear formatting"
			},
			insertImage: {
				dialogPrompt: "Please enter an image URL to insert",
				tooltip: "Insert image",
				hotkey: "the - possibly language dependent hotkey ... for some future implementation"
			},
			insertVideo: {
				tooltip: "Insert video",
				dialogPrompt: "Please enter a youtube URL to embed"
			},
			insertLink: {
				tooltip: "Insert / edit link",
				dialogPrompt: "Please enter a URL to insert"
			}
		}).run(["taRegisterTool", "$window", "taTranslations", "taSelection",
			function(a, b, c, d) {
				a("html", {
					buttontext: c.html.buttontext,
					tooltiptext: c.html.tooltip,
					action: function() {
						this.$editor().switchView()
					},
					activeState: function() {
						return this.$editor().showHtml
					}
				});
				var e = function(a) {
					return function() {
						return this.$editor().queryFormatBlockState(a)
					}
				}, f = function() {
						return this.$editor().wrapSelection("formatBlock", "<" + this.name.toUpperCase() + ">")
					};
				angular.forEach(["h1", "h2", "h3", "h4", "h5", "h6"], function(b) {
					a(b.toLowerCase(), {
						buttontext: b.toUpperCase(),
						tooltiptext: c.heading.tooltip + b.charAt(1),
						action: f,
						activeState: e(b.toLowerCase())
					})
				}), a("p", {
					buttontext: "P",
					tooltiptext: c.p.tooltip,
					action: function() {
						return this.$editor().wrapSelection("formatBlock", "<P>")
					},
					activeState: function() {
						return this.$editor().queryFormatBlockState("p")
					}
				}), a("pre", {
					buttontext: "pre",
					tooltiptext: c.pre.tooltip,
					action: function() {
						return this.$editor().wrapSelection("formatBlock", "<PRE>")
					},
					activeState: function() {
						return this.$editor().queryFormatBlockState("pre")
					}
				}), a("ul", {
					iconclass: "fa fa-list-ul",
					tooltiptext: c.ul.tooltip,
					action: function() {
						return this.$editor().wrapSelection("insertUnorderedList", null)
					},
					activeState: function() {
						return this.$editor().queryCommandState("insertUnorderedList")
					}
				}), a("ol", {
					iconclass: "fa fa-list-ol",
					tooltiptext: c.ol.tooltip,
					action: function() {
						return this.$editor().wrapSelection("insertOrderedList", null)
					},
					activeState: function() {
						return this.$editor().queryCommandState("insertOrderedList")
					}
				}), a("quote", {
					iconclass: "fa fa-quote-right",
					tooltiptext: c.quote.tooltip,
					action: function() {
						return this.$editor().wrapSelection("formatBlock", "<BLOCKQUOTE>")
					},
					activeState: function() {
						return this.$editor().queryFormatBlockState("blockquote")
					}
				}), a("undo", {
					iconclass: "fa fa-undo",
					tooltiptext: c.undo.tooltip,
					action: function() {
						return this.$editor().wrapSelection("undo", null)
					}
				}), a("redo", {
					iconclass: "fa fa-repeat",
					tooltiptext: c.redo.tooltip,
					action: function() {
						return this.$editor().wrapSelection("redo", null)
					}
				}), a("bold", {
					iconclass: "fa fa-bold",
					tooltiptext: c.bold.tooltip,
					action: function() {
						return this.$editor().wrapSelection("bold", null)
					},
					activeState: function() {
						return this.$editor().queryCommandState("bold")
					},
					commandKeyCode: 98
				}), a("justifyLeft", {
					iconclass: "fa fa-align-left",
					tooltiptext: c.justifyLeft.tooltip,
					action: function() {
						return this.$editor().wrapSelection("justifyLeft", null)
					},
					activeState: function(a) {
						var b = !1;
						return a && (b = "left" === a.css("text-align") || "left" === a.attr("align") || "right" !== a.css("text-align") && "center" !== a.css("text-align") && !this.$editor().queryCommandState("justifyRight") && !this.$editor().queryCommandState("justifyCenter")), b = b || this.$editor().queryCommandState("justifyLeft")
					}
				}), a("justifyRight", {
					iconclass: "fa fa-align-right",
					tooltiptext: c.justifyRight.tooltip,
					action: function() {
						return this.$editor().wrapSelection("justifyRight", null)
					},
					activeState: function(a) {
						var b = !1;
						return a && (b = "right" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyRight")
					}
				}), a("justifyCenter", {
					iconclass: "fa fa-align-center",
					tooltiptext: c.justifyCenter.tooltip,
					action: function() {
						return this.$editor().wrapSelection("justifyCenter", null)
					},
					activeState: function(a) {
						var b = !1;
						return a && (b = "center" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyCenter")
					}
				}), a("indent", {
					iconclass: "fa fa-indent",
					tooltiptext: c.indent.tooltip,
					action: function() {
						return this.$editor().wrapSelection("indent", null)
					},
					activeState: function() {
						return this.$editor().queryFormatBlockState("blockquote")
					}
				}), a("outdent", {
					iconclass: "fa fa-outdent",
					tooltiptext: c.outdent.tooltip,
					action: function() {
						return this.$editor().wrapSelection("outdent", null)
					},
					activeState: function() {
						return !1
					}
				}), a("italics", {
					iconclass: "fa fa-italic",
					tooltiptext: c.italic.tooltip,
					action: function() {
						return this.$editor().wrapSelection("italic", null)
					},
					activeState: function() {
						return this.$editor().queryCommandState("italic")
					},
					commandKeyCode: 105
				}), a("underline", {
					iconclass: "fa fa-underline",
					tooltiptext: c.underline.tooltip,
					action: function() {
						return this.$editor().wrapSelection("underline", null)
					},
					activeState: function() {
						return this.$editor().queryCommandState("underline")
					},
					commandKeyCode: 117
				}), a("clear", {
					iconclass: "fa fa-ban",
					tooltiptext: c.clear.tooltip,
					action: function(a, b) {
						this.$editor().wrapSelection("removeFormat", null);
						var c = angular.element(d.getSelectionElement()),
							e = function(a) {
								a = angular.element(a);
								var b = a;
								angular.forEach(a.children(), function(a) {
									var c = angular.element("<p></p>");
									c.html(angular.element(a).html()), b.after(c), b = c
								}), a.remove()
							};
						angular.forEach(c.find("ul"), e), angular.forEach(c.find("ol"), e);
						var f = this.$editor(),
							g = function(a) {
								a = angular.element(a), a[0] !== f.displayElements.text[0] && a.removeAttr("class"), angular.forEach(a.children(), g)
							};
						angular.forEach(c, g), "li" !== c[0].tagName.toLowerCase() && "ol" !== c[0].tagName.toLowerCase() && "ul" !== c[0].tagName.toLowerCase() && this.$editor().wrapSelection("formatBlock", "<p>"), b()
					}
				});
				var g = function(a, b, c) {
					var d = function() {
						c.updateTaBindtaTextElement(), c.hidePopover()
					};
					a.preventDefault(), c.displayElements.popover.css("width", "375px");
					var e = c.displayElements.popoverContainer;
					e.empty();
					var f = angular.element('<div class="btn-group" style="padding-right: 6px;">'),
						g = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');
					g.on("click", function(a) {
						a.preventDefault(), b.css({
							width: "100%",
							height: ""
						}), d()
					});
					var h = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');
					h.on("click", function(a) {
						a.preventDefault(), b.css({
							width: "50%",
							height: ""
						}), d()
					});
					var i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');
					i.on("click", function(a) {
						a.preventDefault(), b.css({
							width: "25%",
							height: ""
						}), d()
					});
					var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');
					j.on("click", function(a) {
						a.preventDefault(), b.css({
							width: "",
							height: ""
						}), d()
					}), f.append(g), f.append(h), f.append(i), f.append(j), e.append(f), f = angular.element('<div class="btn-group" style="padding-right: 6px;">');
					var k = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');
					k.on("click", function(a) {
						a.preventDefault(), b.css("float", "left"), d()
					});
					var l = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');
					l.on("click", function(a) {
						a.preventDefault(), b.css("float", "right"), d()
					});
					var m = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');
					m.on("click", function(a) {
						a.preventDefault(), b.css("float", ""), d()
					}), f.append(k), f.append(m), f.append(l), e.append(f), f = angular.element('<div class="btn-group">');
					var n = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');
					n.on("click", function(a) {
						a.preventDefault(), b.remove(), d()
					}), f.append(n), e.append(f), c.showPopover(b), c.showResizeOverlay(b)
				};
				a("insertImage", {
					iconclass: "fa fa-picture-o",
					tooltiptext: c.insertImage.tooltip,
					action: function() {
						var a;
						return a = b.prompt(c.insertImage.dialogPrompt, "http://"), a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("insertImage", a, !0) : void 0
					},
					onElementSelect: {
						element: "img",
						action: g
					}
				}), a("insertVideo", {
					iconclass: "fa fa-youtube-play",
					tooltiptext: c.insertVideo.tooltip,
					action: function() {
						var a;
						if (a = b.prompt(c.insertVideo.dialogPrompt, "http://"), a && "" !== a && "http://" !== a) {
							var d = a.match(/(\?|&)v=[^&]*/);
							if (d.length > 0) {
								var e = "http://www.youtube.com/embed/" + d[0].substring(3),
									f = '<img class="ta-insert-video" ta-insert-video="' + e + '" contenteditable="false" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/>';
								return this.$editor().wrapSelection("insertHTML", f, !0)
							}
						}
					},
					onElementSelect: {
						element: "img",
						onlyWithAttrs: ["ta-insert-video"],
						action: g
					}
				}), a("insertLink", {
					tooltiptext: c.insertLink.tooltip,
					iconclass: "fa fa-link",
					action: function() {
						var a;
						return a = b.prompt(c.insertLink.dialogPrompt, "http://"), a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("createLink", a, !0) : void 0
					},
					activeState: function(a) {
						return a ? "A" === a[0].tagName : !1
					},
					onElementSelect: {
						element: "a",
						action: function(a, d, e) {
							a.preventDefault(), e.displayElements.popover.css("width", "435px");
							var f = e.displayElements.popoverContainer;
							f.empty(), f.css("line-height", "28px");
							var g = angular.element('<a href="' + d.attr("href") + '" target="_blank">' + d.attr("href") + "</a>");
							g.css({
								display: "inline-block",
								"max-width": "200px",
								overflow: "hidden",
								"text-overflow": "ellipsis",
								"white-space": "nowrap",
								"vertical-align": "middle"
							}), f.append(g);
							var h = angular.element('<div class="btn-group pull-right">'),
								i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-edit icon-edit"></i></button>');
							i.on("click", function(a) {
								a.preventDefault();
								var f = b.prompt(c.insertLink.dialogPrompt, d.attr("href"));
								f && "" !== f && "http://" !== f && (d.attr("href", f), e.updateTaBindtaTextElement()), e.hidePopover()
							}), h.append(i);
							var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-unlink icon-unlink"></i></button>');
							j.on("click", function(a) {
								a.preventDefault(), d.replaceWith(d.contents()), e.updateTaBindtaTextElement(), e.hidePopover()
							}), h.append(j);
							var k = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">Open in New Window</button>');
							"_blank" === d.attr("target") && k.addClass("active"), k.on("click", function(a) {
								a.preventDefault(), d.attr("target", "_blank" === d.attr("target") ? "" : "_blank"), k.toggleClass("active"), e.updateTaBindtaTextElement()
							}), h.append(k), f.append(h), e.showPopover(d)
						}
					}
				})
			}
		]),
		function() {
			"Use Strict";

			function a(a) {
				try {
					return 0 !== angular.element(a).length
				} catch (b) {
					return !1
				}
			}

			function b(a, c) {
				var d = [],
					e = a.children();
				return e.length && angular.forEach(e, function(a) {
					d = d.concat(b(angular.element(a), c))
				}), void 0 !== a.attr(c) && d.push(a), d
			}

			function c(b, c) {
				if (!b || "" === b || n.hasOwnProperty(b)) throw "textAngular Error: A unique name is required for a Tool Definition";
				if (c.display && ("" === c.display || !a(c.display)) || !c.display && !c.buttontext && !c.iconclass) throw 'textAngular Error: Tool Definition for "' + b + '" does not have a valid display/iconclass/buttontext value';
				n[b] = c
			}
			var d = !1;
			/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && (document.addEventListener("click", function() {
				var a = window.event.target;
				if (d && null !== a) {
					for (var b = !1, c = a; null !== c && "html" !== c.tagName.toLowerCase() && !b;) b = "true" === c.contentEditable, c = c.parentNode;
					b || (document.getElementById("textAngular-editableFix-010203040506070809").setSelectionRange(0, 0), a.focus())
				}
				d = !1
			}, !1), angular.element(document).ready(function() {
				angular.element(document.body).append(angular.element('<input id="textAngular-editableFix-010203040506070809" style="width:1px;height:1px;border:none;margin:0;padding:0;position:absolute; top: -10000; left: -10000;" unselectable="on" tabIndex="-1">'))
			}));
			var e = function() {
				var a, b = -1,
					c = window.navigator.userAgent,
					d = c.indexOf("MSIE "),
					e = c.indexOf("Trident/");
				if (d > 0) b = parseInt(c.substring(d + 5, c.indexOf(".", d)), 10);
				else if (e > 0) {
					var f = c.indexOf("rv:");
					b = parseInt(c.substring(f + 3, c.indexOf(".", f)), 10)
				}
				return b > -1 ? b : a
			}();
			"function" != typeof String.prototype.trim && (String.prototype.trim = function() {
				return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
			});
			var f, g, h, i, j;
			if (e > 8 || void 0 === e) {
				var k = function() {
					var a = document.createElement("style");
					return /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && a.appendChild(document.createTextNode("")), document.head.insertBefore(a, document.head.firstChild), a.sheet
				}();
				f = function() {
					var a = document.createElement("style");
					return /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && a.appendChild(document.createTextNode("")), document.head.appendChild(a), a.sheet
				}(), g = function(a, b) {
					i(f, a, b)
				}, i = function(a, b, c) {
					var d;
					return a.rules ? d = Math.max(a.rules.length - 1, 0) : a.cssRules && (d = Math.max(a.cssRules.length - 1, 0)), a.insertRule ? a.insertRule(b + "{" + c + "}", d) : a.addRule(b, c, d), d
				}, h = function(a) {
					j(f, a)
				}, j = function(a, b) {
					a.removeRule ? a.removeRule(b) : a.deleteRule(b)
				}, i(k, ".ta-scroll-window.form-control", "height: auto; min-height: 300px; overflow: auto; font-family: inherit; font-size: 100%; position: relative; padding: 0;"), i(k, ".ta-root.focussed .ta-scroll-window.form-control", "border-color: #66afe9; outline: 0; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);"), i(k, ".ta-editor.ta-html", "min-height: 300px; height: auto; overflow: auto; font-family: inherit; font-size: 100%;"), i(k, ".ta-scroll-window > .ta-bind", "height: auto; min-height: 300px; padding: 6px 12px;"), i(k, ".ta-root .ta-resizer-handle-overlay", "z-index: 100; position: absolute; display: none;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-info", "position: absolute; bottom: 16px; right: 16px; border: 1px solid black; background-color: #FFF; padding: 0 4px; opacity: 0.7;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-background", "position: absolute; bottom: 5px; right: 5px; left: 5px; top: 5px; border: 1px solid black; background-color: rgba(0, 0, 0, 0.2);"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner", "width: 10px; height: 10px; position: absolute;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tl", "top: 0; left: 0; border-left: 1px solid black; border-top: 1px solid black;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tr", "top: 0; right: 0; border-right: 1px solid black; border-top: 1px solid black;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-bl", "bottom: 0; left: 0; border-left: 1px solid black; border-bottom: 1px solid black;"), i(k, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-br", "bottom: 0; right: 0; border: 1px solid black; cursor: se-resize; background-color: white;")
			}
			var l = !1,
				m = angular.module("textAngular", ["ngSanitize", "textAngularSetup"]),
				n = {};
			m.constant("taRegisterTool", c), m.value("taTools", n), m.config([
				function() {
					angular.forEach(n, function(a, b) {
						delete n[b]
					})
				}
			]), m.directive("textAngular", ["$compile", "$timeout", "taOptions", "taSelection", "taExecCommand", "textAngularManager", "$window", "$document", "$animate", "$log",
				function(a, b, c, d, e, f, g, h, i, j) {
					return {
						require: "?ngModel",
						scope: {},
						restrict: "EA",
						link: function(k, l, m, n) {
							var o, p, q, r, s, t, u, v, w, x = m.serial ? m.serial : Math.floor(1e16 * Math.random()),
								y = m.name ? m.name : "textAngularEditor" + x,
								z = function(a, c, d) {
									b(function() {
										var b = function() {
											a.off(c, b), d()
										};
										a.on(c, b)
									}, 100)
								};
							w = e(m.taDefaultWrap), angular.extend(k, angular.copy(c), {
								wrapSelection: function(a, b, c) {
									w(a, !1, b), c && k["reApplyOnSelectorHandlerstaTextElement" + x](), k.displayElements.text[0].focus()
								},
								showHtml: !1
							}), m.taFocussedClass && (k.classes.focussed = m.taFocussedClass), m.taTextEditorClass && (k.classes.textEditor = m.taTextEditorClass), m.taHtmlEditorClass && (k.classes.htmlEditor = m.taHtmlEditorClass), m.taTextEditorSetup && (k.setup.textEditorSetup = k.$parent.$eval(m.taTextEditorSetup)), m.taHtmlEditorSetup && (k.setup.htmlEditorSetup = k.$parent.$eval(m.taHtmlEditorSetup)), k.fileDropHandler = m.taFileDrop ? k.$parent.$eval(m.taFileDrop) : k.defaultFileDropHandler, u = l[0].innerHTML, l[0].innerHTML = "", k.displayElements = {
								forminput: angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),
								html: angular.element("<textarea></textarea>"),
								text: angular.element("<div></div>"),
								scrollWindow: angular.element("<div class='ta-scroll-window'></div>"),
								popover: angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'),
								popoverArrow: angular.element('<div class="arrow"></div>'),
								popoverContainer: angular.element('<div class="popover-content"></div>'),
								resize: {
									overlay: angular.element('<div class="ta-resizer-handle-overlay"></div>'),
									background: angular.element('<div class="ta-resizer-handle-background"></div>'),
									anchors: [angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')],
									info: angular.element('<div class="ta-resizer-handle-info"></div>')
								}
							}, k.displayElements.popover.append(k.displayElements.popoverArrow), k.displayElements.popover.append(k.displayElements.popoverContainer),
							k.displayElements.scrollWindow.append(k.displayElements.popover), k.displayElements.popover.on("mousedown", function(a, b) {
								return b && angular.extend(a, b), a.preventDefault(), !1
							}), k.showPopover = function(a) {
								k.displayElements.popover.css("display", "block"), k.reflowPopover(a), i.addClass(k.displayElements.popover, "in"), z(l, "click keyup", function() {
									k.hidePopover()
								})
							}, k.reflowPopover = function(a) {
								k.displayElements.text[0].offsetHeight - 51 > a[0].offsetTop ? (k.displayElements.popover.css("top", a[0].offsetTop + a[0].offsetHeight + "px"), k.displayElements.popover.removeClass("top").addClass("bottom")) : (k.displayElements.popover.css("top", a[0].offsetTop - 54 + "px"), k.displayElements.popover.removeClass("bottom").addClass("top"));
								var b = k.displayElements.text[0].offsetWidth - k.displayElements.popover[0].offsetWidth,
									c = a[0].offsetLeft + a[0].offsetWidth / 2 - k.displayElements.popover[0].offsetWidth / 2;
								k.displayElements.popover.css("left", Math.max(0, Math.min(b, c)) + "px"), k.displayElements.popoverArrow.css("margin-left", Math.min(c, Math.max(0, c - b)) - 11 + "px")
							}, k.hidePopover = function() {
								i.removeClass(k.displayElements.popover, "in", function() {
									k.displayElements.popover.css("display", ""), k.displayElements.popoverContainer.attr("style", ""), k.displayElements.popoverContainer.attr("class", "popover-content")
								})
							}, k.displayElements.resize.overlay.append(k.displayElements.resize.background), angular.forEach(k.displayElements.resize.anchors, function(a) {
								k.displayElements.resize.overlay.append(a)
							}), k.displayElements.resize.overlay.append(k.displayElements.resize.info), k.displayElements.scrollWindow.append(k.displayElements.resize.overlay), k.reflowResizeOverlay = function(a) {
								a = angular.element(a)[0], k.displayElements.resize.overlay.css({
									display: "block",
									left: a.offsetLeft - 5 + "px",
									top: a.offsetTop - 5 + "px",
									width: a.offsetWidth + 10 + "px",
									height: a.offsetHeight + 10 + "px"
								}), k.displayElements.resize.info.text(a.offsetWidth + " x " + a.offsetHeight)
							}, k.showResizeOverlay = function(a) {
								var b = function(b) {
									var c = {
										width: parseInt(a.attr("width")),
										height: parseInt(a.attr("height")),
										x: b.clientX,
										y: b.clientY
									};
									void 0 === c.width && (c.width = a[0].offsetWidth), void 0 === c.height && (c.height = a[0].offsetHeight), k.hidePopover();
									var d = c.height / c.width,
										e = function(b) {
											var e = {
												x: Math.max(0, c.width + (b.clientX - c.x)),
												y: Math.max(0, c.height + (b.clientY - c.y))
											}, f = function(a, b) {
													a = angular.element(a), "img" === a[0].tagName.toLowerCase() && (b.height && (a.attr("height", b.height), delete b.height), b.width && (a.attr("width", b.width), delete b.width)), a.css(b)
												};
											if (b.shiftKey) {
												var g = e.y / e.x;
												f(a, {
													width: d > g ? e.x : e.y / d,
													height: d > g ? e.x * d : e.y
												})
											} else f(a, {
												width: e.x,
												height: e.y
											});
											k.reflowResizeOverlay(a)
										};
									h.find("body").on("mousemove", e), z(k.displayElements.resize.overlay, "mouseup", function() {
										h.find("body").off("mousemove", e), k.showPopover(a)
									}), b.stopPropagation(), b.preventDefault()
								};
								k.displayElements.resize.anchors[3].on("mousedown", b), k.reflowResizeOverlay(a), z(l, "click", function() {
									k.hideResizeOverlay()
								})
							}, k.hideResizeOverlay = function() {
								k.displayElements.resize.overlay.css("display", "")
							}, k.setup.htmlEditorSetup(k.displayElements.html), k.setup.textEditorSetup(k.displayElements.text), k.displayElements.html.attr({
								id: "taHtmlElement" + x,
								"ng-show": "showHtml",
								"ta-bind": "ta-bind",
								"ng-model": "html"
							}), k.displayElements.text.attr({
								id: "taTextElement" + x,
								contentEditable: "true",
								"ta-bind": "ta-bind",
								"ng-model": "html"
							}), k.displayElements.scrollWindow.attr({
								"ng-hide": "showHtml"
							}), m.taDefaultWrap && k.displayElements.text.attr("ta-default-wrap", m.taDefaultWrap), m.taUnsafeSanitizer && (k.displayElements.text.attr("ta-unsafe-sanitizer", m.taUnsafeSanitizer), k.displayElements.html.attr("ta-unsafe-sanitizer", m.taUnsafeSanitizer)), k.displayElements.scrollWindow.append(k.displayElements.text), l.append(k.displayElements.scrollWindow), l.append(k.displayElements.html), k.displayElements.forminput.attr("name", y), l.append(k.displayElements.forminput), m.tabindex && (l.removeAttr("tabindex"), k.displayElements.text.attr("tabindex", m.tabindex), k.displayElements.html.attr("tabindex", m.tabindex)), m.placeholder && (k.displayElements.text.attr("placeholder", m.placeholder), k.displayElements.html.attr("placeholder", m.placeholder)), m.taDisabled && (k.displayElements.text.attr("ta-readonly", "disabled"), k.displayElements.html.attr("ta-readonly", "disabled"), k.disabled = k.$parent.$eval(m.taDisabled), k.$parent.$watch(m.taDisabled, function(a) {
								k.disabled = a, k.disabled ? l.addClass(k.classes.disabled) : l.removeClass(k.classes.disabled)
							})), a(k.displayElements.scrollWindow)(k), a(k.displayElements.html)(k), k.updateTaBindtaTextElement = k["updateTaBindtaTextElement" + x], k.updateTaBindtaHtmlElement = k["updateTaBindtaHtmlElement" + x], l.addClass("ta-root"), k.displayElements.scrollWindow.addClass("ta-text ta-editor " + k.classes.textEditor), k.displayElements.html.addClass("ta-html ta-editor " + k.classes.htmlEditor), k._actionRunning = !1;
							var A = !1;
							if (k.startAction = function() {
								return k._actionRunning = !0, g.rangy && g.rangy.saveSelection ? (A = g.rangy.saveSelection(), function() {
									A && g.rangy.restoreSelection(A)
								}) : void 0
							}, k.endAction = function() {
								k._actionRunning = !1, A && g.rangy.removeMarkers(A), A = !1, k.updateSelectedStyles(), k.showHtml || k["updateTaBindtaTextElement" + x]()
							}, s = function() {
								l.addClass(k.classes.focussed), v.focus()
							}, k.displayElements.html.on("focus", s), k.displayElements.text.on("focus", s), t = function(a) {
								return k._actionRunning || h[0].activeElement === k.displayElements.html[0] || h[0].activeElement === k.displayElements.text[0] || (l.removeClass(k.classes.focussed), v.unfocus(), b(function() {
									l.triggerHandler("blur")
								}, 0)), a.preventDefault(), !1
							}, k.displayElements.html.on("blur", t), k.displayElements.text.on("blur", t), k.queryFormatBlockState = function(a) {
								return !k.showHtml && a.toLowerCase() === h[0].queryCommandValue("formatBlock").toLowerCase()
							}, k.queryCommandState = function(a) {
								return k.showHtml ? "" : h[0].queryCommandState(a)
							}, k.switchView = function() {
								k.showHtml = !k.showHtml, k.showHtml ? b(function() {
									return k.displayElements.html[0].focus()
								}, 100) : b(function() {
									return k.displayElements.text[0].focus()
								}, 100)
							}, m.ngModel) {
								var B = !0;
								n.$render = function() {
									if (B) {
										B = !1;
										var a = k.$parent.$eval(m.ngModel);
										void 0 !== a && null !== a || !u || "" === u || n.$setViewValue(u)
									}
									k.displayElements.forminput.val(n.$viewValue), k._elementSelectTriggered || h[0].activeElement === k.displayElements.html[0] || h[0].activeElement === k.displayElements.text[0] || (k.html = n.$viewValue || "")
								};
								var C = function(a) {
									return m.required && n.$setValidity("required", !(!a || "" === a.trim())), a
								};
								n.$parsers.push(C), n.$formatters.push(C)
							} else k.displayElements.forminput.val(u), k.html = u; if (k.$watch("html", function(a, b) {
								a !== b && (m.ngModel && n.$viewValue !== a && n.$setViewValue(a), k.displayElements.forminput.val(a))
							}), m.taTargetToolbars) v = f.registerEditor(y, k, m.taTargetToolbars.split(","));
							else {
								var D = angular.element('<div text-angular-toolbar name="textAngularToolbar' + x + '">');
								m.taToolbar && D.attr("ta-toolbar", m.taToolbar), m.taToolbarClass && D.attr("ta-toolbar-class", m.taToolbarClass), m.taToolbarGroupClass && D.attr("ta-toolbar-group-class", m.taToolbarGroupClass), m.taToolbarButtonClass && D.attr("ta-toolbar-button-class", m.taToolbarButtonClass), m.taToolbarActiveButtonClass && D.attr("ta-toolbar-active-button-class", m.taToolbarActiveButtonClass), m.taFocussedClass && D.attr("ta-focussed-class", m.taFocussedClass), l.prepend(D), a(D)(k.$parent), v = f.registerEditor(y, k, ["textAngularToolbar" + x])
							}
							k.$on("$destroy", function() {
								f.unregisterEditor(y)
							}), k.$on("ta-element-select", function(a, b) {
								v.triggerElementSelect(a, b)
							}), k.$on("ta-drop-event", function(a, b, c, d) {
								k.displayElements.text[0].focus(), d && d.files && d.files.length > 0 && (angular.forEach(d.files, function(a) {
									try {
										return k.fileDropHandler(a, k.wrapSelection) || k.fileDropHandler !== k.defaultFileDropHandler && k.defaultFileDropHandler(a, k.wrapSelection)
									} catch (b) {
										j.error(b)
									}
								}), c.preventDefault(), c.stopPropagation())
							}), k._bUpdateSelectedStyles = !1, k.updateSelectedStyles = function() {
								var a;
								void 0 !== (a = d.getSelectionElement()) && a.parentNode !== k.displayElements.text[0] ? v.updateSelectedStyles(angular.element(a)) : v.updateSelectedStyles(), k._bUpdateSelectedStyles && b(k.updateSelectedStyles, 200)
							}, o = function() {
								k._bUpdateSelectedStyles || (k._bUpdateSelectedStyles = !0, k.$apply(function() {
									k.updateSelectedStyles()
								}))
							}, k.displayElements.html.on("keydown", o), k.displayElements.text.on("keydown", o), p = function() {
								k._bUpdateSelectedStyles = !1
							}, k.displayElements.html.on("keyup", p), k.displayElements.text.on("keyup", p), q = function(a, b) {
								b && angular.extend(a, b), k.$apply(function() {
									return v.sendKeyCommand(a) ? (k._bUpdateSelectedStyles || k.updateSelectedStyles(), a.preventDefault(), !1) : void 0
								})
							}, k.displayElements.html.on("keypress", q), k.displayElements.text.on("keypress", q), r = function() {
								k._bUpdateSelectedStyles = !1, k.$apply(function() {
									k.updateSelectedStyles()
								})
							}, k.displayElements.html.on("mouseup", r), k.displayElements.text.on("mouseup", r)
						}
					}
				}
			]).factory("taBrowserTag", [
				function() {
					return function(a) {
						return a ? "" === a ? void 0 === e ? "div" : 8 >= e ? "P" : "p" : 8 >= e ? a.toUpperCase() : a : 8 >= e ? "P" : "p"
					}
				}
			]).factory("taExecCommand", ["taSelection", "taBrowserTag", "$document",
				function(a, b, c) {
					var d = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/gi,
						e = /^(ul|li|ol)$/gi,
						f = function(b, c) {
							var d, e, f = b.find("li");
							for (e = f.length - 1; e >= 0; e--) d = angular.element("<" + c + ">" + f[e].innerHTML + "</" + c + ">"), b.after(d);
							b.remove(), a.setSelectionToElementEnd(d[0])
						}, g = function(b, c) {
							var d = angular.element("<" + c + ">" + b[0].innerHTML + "</" + c + ">");
							b.after(d), b.remove(), a.setSelectionToElementEnd(d.find("li")[0])
						}, h = function(c, d, e) {
							for (var f = "", g = 0; g < c.length; g++) f += "<" + b("li") + ">" + c[g].innerHTML + "</" + b("li") + ">";
							var h = angular.element("<" + e + ">" + f + "</" + e + ">");
							d.after(h), d.remove(), a.setSelectionToElementEnd(h.find("li")[0])
						};
					return function(i) {
						return i = b(i),
						function(j, k, l) {
							var m, n, o, p, q, r = angular.element("<" + i + ">"),
								s = a.getSelectionElement(),
								t = angular.element(s);
							if (void 0 !== s) {
								var u = s.tagName.toLowerCase();
								if ("insertorderedlist" === j.toLowerCase() || "insertunorderedlist" === j.toLowerCase()) {
									var v = b("insertorderedlist" === j.toLowerCase() ? "ol" : "ul");
									if (u === v) return f(t, i);
									if ("li" === u && t.parent()[0].tagName.toLowerCase() === v && 1 === t.parent().children().length) return f(t.parent(), i);
									if ("li" === u && t.parent()[0].tagName.toLowerCase() !== v && 1 === t.parent().children().length) return g(t.parent(), v);
									if (u.match(d) && !t.hasClass("ta-bind")) {
										if ("ol" === u || "ul" === u) return g(t, v);
										var w = !1;
										return angular.forEach(t.children(), function(a) {
											a.tagName.match(d) && (w = !0)
										}), w ? h(t.children(), t, v) : h([angular.element("<div>" + s.innerHTML + "</div>")[0]], t, v)
									}
									if (u.match(d)) {
										if (p = a.getOnlySelectedElements(), 1 === p.length && ("ol" === p[0].tagName.toLowerCase() || "ul" === p[0].tagName.toLowerCase())) return p[0].tagName.toLowerCase() === v ? f(angular.element(p[0]), i) : g(angular.element(p[0]), v);
										o = "";
										var x = [];
										for (m = 0; m < p.length; m++)
											if (3 !== p[m].nodeType) {
												var y = angular.element(p[m]);
												o += "<" + b("li") + ">" + y[0].innerHTML + "</" + b("li") + ">", x.unshift(y)
											}
										return n = angular.element("<" + v + ">" + o + "</" + v + ">"), x.pop().replaceWith(n), angular.forEach(x, function(a) {
											a.remove()
										}), void a.setSelectionToElementEnd(n[0])
									}
								} else if ("formatblock" === j.toLowerCase()) {
									var z = l.toLowerCase().replace(/[<>]/gi, "");
									for (n = "li" === u ? t.parent() : t; !n[0].tagName.match(d);) n = n.parent(), u = n[0].tagName.toLowerCase();
									if (u === z) {
										p = n.children();
										var A = !1;
										for (m = 0; m < p.length; m++) A = A || p[m].tagName.match(d);
										A ? (n.after(p), q = n.next(), n.remove(), n = q) : (r.append(n[0].childNodes), n.after(r), n.remove(), n = r)
									} else if (n.parent()[0].tagName.toLowerCase() !== z || n.parent().hasClass("ta-bind"))
										if (u.match(e)) n.wrap(l);
										else {
											p = a.getOnlySelectedElements(), 0 === p.length && (p = [n[0]]);
											var B = !1;
											if (angular.forEach(p, function(a) {
												3 !== a.nodeType && a.tagName.match(d) || (B = !0)
											}), B)
												for (; 3 === p[0].nodeType || !p[0].tagName.match(d);) p = [p[0].parentNode];
											if (angular.element(p[0]).hasClass("ta-bind")) n = angular.element(l), n[0].innerHTML = p[0].innerHTML, p[0].innerHTML = n[0].outerHTML;
											else if ("blockquote" === z) {
												for (o = "", m = 0; m < p.length; m++) o += p[m].outerHTML;
												n = angular.element(l), n[0].innerHTML = o, p[0].parentNode.insertBefore(n[0], p[0]), angular.forEach(p, function(a) {
													a.parentNode.removeChild(a)
												})
											} else
												for (m = 0; m < p.length; m++) n = angular.element(l), n[0].innerHTML = p[m].innerHTML, p[m].parentNode.insertBefore(n[0], p[m]), p[m].parentNode.removeChild(p[m])
										} else {
											var C = n.parent(),
												D = C.contents();
											for (m = 0; m < D.length; m++) C.parent().hasClass("ta-bind") && 3 === D[m].nodeType && (r = angular.element("<" + i + ">"), r[0].innerHTML = D[m].outerHTML, D[m] = r[0]), C.parent()[0].insertBefore(D[m], C[0]);
											C.remove()
										}
									return void a.setSelectionToElementEnd(n[0])
								}
							}
							try {
								c[0].execCommand(j, k, l)
							} catch (E) {}
						}
					}
				}
			]).directive("taBind", ["taSanitize", "$timeout", "$window", "$document", "taFixChrome", "taBrowserTag", "taSelection", "taSelectableElements", "taApplyCustomRenderers", "taOptions",
				function(a, b, c, f, i, j, k, m, n, o) {
					return {
						require: "ngModel",
						scope: {},
						link: function(j, p, q, r) {
							var s, t, u = void 0 !== p.attr("contenteditable") && p.attr("contenteditable"),
								v = u || "textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase(),
								w = !1,
								x = !1,
								y = q.taUnsafeSanitizer || o.disableSanitizer;
							void 0 === q.taDefaultWrap && (q.taDefaultWrap = "p"), "" === q.taDefaultWrap ? (s = "", t = void 0 === e ? "<div><br></div>" : e >= 11 ? "<p><br></p>" : 8 >= e ? "<P>&nbsp;</P>" : "<p>&nbsp;</p>") : (s = void 0 === e || e >= 11 ? "<" + q.taDefaultWrap + "><br></" + q.taDefaultWrap + ">" : 8 >= e ? "<" + q.taDefaultWrap.toUpperCase() + "></" + q.taDefaultWrap.toUpperCase() + ">" : "<" + q.taDefaultWrap + "></" + q.taDefaultWrap + ">", t = void 0 === e || e >= 11 ? "<" + q.taDefaultWrap + "><br></" + q.taDefaultWrap + ">" : 8 >= e ? "<" + q.taDefaultWrap.toUpperCase() + ">&nbsp;</" + q.taDefaultWrap.toUpperCase() + ">" : "<" + q.taDefaultWrap + ">&nbsp;</" + q.taDefaultWrap + ">"), p.addClass("ta-bind");
							var z = function() {
								if (u) return p[0].innerHTML;
								if (v) return p.val();
								throw "textAngular Error: attempting to update non-editable taBind"
							}, A = function(a) {
									a || (a = z()), a === t ? "" !== r.$viewValue && r.$setViewValue("") : r.$viewValue !== a && r.$setViewValue(a)
								};
							if (j.$parent["updateTaBind" + (q.id || "")] = function() {
								w || A()
							}, v)
								if (u) {
									if (p.on("cut", function(a) {
										w ? a.preventDefault() : b(function() {
											A()
										}, 0)
									}), p.on("paste", function(a, b) {
										b && angular.extend(a, b);
										var d;
										if (a.clipboardData || a.originalEvent && a.originalEvent.clipboardData ? d = (a.originalEvent || a).clipboardData.getData("text/plain") : c.clipboardData && (d = c.clipboardData.getData("Text")), !d && !w) return !0;
										if (a.preventDefault(), !w) {
											var e = angular.element("<div></div>");
											if (e[0].innerHTML = d, d = e.text(), f[0].selection) {
												var g = f[0].selection.createRange();
												g.pasteHTML(d)
											} else f[0].execCommand("insertText", !1, d);
											A()
										}
									}), p.on("keyup", function(a, b) {
										if (b && angular.extend(a, b), !w) {
											if ("" !== s && 13 === a.keyCode && !a.shiftKey) {
												var c = k.getSelectionElement();
												if (c.tagName.toLowerCase() !== q.taDefaultWrap && "li" !== c.tagName.toLowerCase() && ("" === c.innerHTML.trim() || "<br>" === c.innerHTML.trim())) {
													var d = angular.element(s);
													angular.element(c).replaceWith(d), k.setSelectionToElementStart(d[0])
												}
											}
											var e = z();
											"" !== s && "" === e.trim() && (p[0].innerHTML = s, k.setSelectionToElementStart(p.children()[0])), A(e)
										}
									}), p.on("blur", function() {
										x = !1, w || A(), r.$render()
									}), q.placeholder && (e > 8 || void 0 === e)) {
										var B;
										if (!q.id) throw "textAngular Error: An unique ID is required for placeholders to work";
										B = g("#" + q.id + ".placeholder-text:before", 'content: "' + q.placeholder + '"'), j.$on("$destroy", function() {
											h(B)
										})
									}
									p.on("focus", function() {
										x = !0, r.$render()
									}), p.on("mousedown", function(a, b) {
										b && angular.extend(a, b), a.stopPropagation()
									})
								} else p.on("paste cut", function() {
									w || b(function() {
										r.$setViewValue(z())
									}, 0)
								}), p.on("change blur", function() {
									w || r.$setViewValue(z())
								});
							var C = function(b) {
								return r.$oldViewValue = a(i(b), r.$oldViewValue, y)
							}, D = function(a) {
									return q.required && r.$setValidity("required", !(!a || a.trim() === t || "" === a.trim())), a
								};
							r.$parsers.push(C), r.$parsers.push(D), r.$formatters.push(C), r.$formatters.push(D);
							var E = function(a) {
								return j.$emit("ta-element-select", this), a.preventDefault(), !1
							}, F = function(a, c) {
									if (c && angular.extend(a, c), !l && !w) {
										l = !0;
										var d;
										d = a.originalEvent ? a.originalEvent.dataTransfer : a.dataTransfer, j.$emit("ta-drop-event", this, a, d), b(function() {
											l = !1
										}, 100)
									}
								};
							j.$parent["reApplyOnSelectorHandlers" + (q.id || "")] = function() {
								w || angular.forEach(m, function(a) {
									p.find(a).off("click", E).on("click", E)
								})
							};
							var G = function(a) {
								p[0].innerHTML = a
							};
							r.$render = function() {
								var a = r.$viewValue || "";
								f[0].activeElement !== p[0] ? u ? (q.placeholder ? "" === a ? (x ? p.removeClass("placeholder-text") : p.addClass("placeholder-text"), G(s)) : (p.removeClass("placeholder-text"), G(a)) : G("" === a ? s : a), w ? p.off("drop", F) : (angular.forEach(m, function(a) {
									p.find(a).on("click", E)
								}), p.on("drop", F))) : "textarea" !== p[0].tagName.toLowerCase() && "input" !== p[0].tagName.toLowerCase() ? G(n(a)) : p.val(a) : u && p.removeClass("placeholder-text")
							}, q.taReadonly && (w = j.$parent.$eval(q.taReadonly), w ? (p.addClass("ta-readonly"), ("textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase()) && p.attr("disabled", "disabled"), void 0 !== p.attr("contenteditable") && p.attr("contenteditable") && p.removeAttr("contenteditable")) : (p.removeClass("ta-readonly"), "textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase() ? p.removeAttr("disabled") : u && p.attr("contenteditable", "true")), j.$parent.$watch(q.taReadonly, function(a, b) {
								b !== a && (a ? (p.addClass("ta-readonly"), ("textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase()) && p.attr("disabled", "disabled"), void 0 !== p.attr("contenteditable") && p.attr("contenteditable") && p.removeAttr("contenteditable"), angular.forEach(m, function(a) {
									p.find(a).on("click", E)
								}), p.off("drop", F)) : (p.removeClass("ta-readonly"), "textarea" === p[0].tagName.toLowerCase() || "input" === p[0].tagName.toLowerCase() ? p.removeAttr("disabled") : u && p.attr("contenteditable", "true"), angular.forEach(m, function(a) {
									p.find(a).off("click", E)
								}), p.on("drop", F)), w = a)
							})), u && !w && (angular.forEach(m, function(a) {
								p.find(a).on("click", E)
							}), p.on("drop", F), p.on("blur", function() {
								/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && (d = !0)
							}))
						}
					}
				}
			]).factory("taApplyCustomRenderers", ["taCustomRenderers",
				function(a) {
					return function(c) {
						var d = angular.element("<div></div>");
						return d[0].innerHTML = c, angular.forEach(a, function(a) {
							var c = [];
							a.selector && "" !== a.selector ? c = d.find(a.selector) : a.customAttribute && "" !== a.customAttribute && (c = b(d, a.customAttribute)), angular.forEach(c, function(b) {
								b = angular.element(b), a.selector && "" !== a.selector && a.customAttribute && "" !== a.customAttribute ? void 0 !== b.attr(a.customAttribute) && a.renderLogic(b) : a.renderLogic(b)
							})
						}), d[0].innerHTML
					}
				}
			]).directive("taMaxText", function() {
				return {
					restrict: "A",
					require: "ngModel",
					link: function(a, b, c, d) {
						function e(a) {
							var b = angular.element("<div/>");
							b.html(a);
							var c = b.text().length;
							return f >= c ? (d.$setValidity("taMaxText", !0), a) : void d.$setValidity("taMaxText", !1)
						}
						var f = parseInt(a.$eval(c.taMaxText));
						if (isNaN(f)) throw "Max text must be an integer";
						c.$observe("taMaxText", function(a) {
							if (f = parseInt(a), isNaN(f)) throw "Max text must be an integer";
							d.$dirty && d.$setViewValue(d.$viewValue)
						}), d.$parsers.unshift(e)
					}
				}
			}).directive("taMinText", function() {
				return {
					restrict: "A",
					require: "ngModel",
					link: function(a, b, c, d) {
						function e(a) {
							var b = angular.element("<div/>");
							b.html(a);
							var c = b.text().length;
							return !c || c >= f ? (d.$setValidity("taMinText", !0), a) : void d.$setValidity("taMinText", !1)
						}
						var f = parseInt(a.$eval(c.taMinText));
						if (isNaN(f)) throw "Min text must be an integer";
						c.$observe("taMinText", function(a) {
							if (f = parseInt(a), isNaN(f)) throw "Min text must be an integer";
							d.$dirty && d.$setViewValue(d.$viewValue)
						}), d.$parsers.unshift(e)
					}
				}
			}).factory("taFixChrome", function() {
				var a = function(a) {
					for (var b = angular.element("<div>" + a + "</div>"), c = angular.element(b).find("span"), d = 0; d < c.length; d++) {
						var e = angular.element(c[d]);
						e.attr("style") && e.attr("style").match(/line-height: 1.428571429;|color: inherit; line-height: 1.1;/i) && (e.attr("style", e.attr("style").replace(/( |)font-family: inherit;|( |)line-height: 1.428571429;|( |)line-height:1.1;|( |)color: inherit;/gi, "")), e.attr("style") && "" !== e.attr("style") || (e.next().length > 0 && "BR" === e.next()[0].tagName && e.next().remove(), e.replaceWith(e[0].innerHTML)))
					}
					var f = b[0].innerHTML.replace(/style="[^"]*?(line-height: 1.428571429;|color: inherit; line-height: 1.1;)[^"]*"/gi, "");
					return f !== b[0].innerHTML && (b[0].innerHTML = f), b[0].innerHTML
				};
				return a
			}).factory("taSanitize", ["$sanitize",
				function(a) {
					return function(c, d, e) {
						var f = angular.element("<div>" + c + "</div>");
						angular.forEach(b(f, "align"), function(a) {
							a.css("text-align", a.attr("align")), a.removeAttr("align")
						});
						var g;
						c = f[0].innerHTML;
						try {
							g = a(c), e && (g = c)
						} catch (h) {
							g = d || ""
						}
						return g
					}
				}
			]).directive("textAngularToolbar", ["$compile", "textAngularManager", "taOptions", "taTools", "taToolExecuteAction", "$window",
				function(a, b, c, d, e, f) {
					return {
						scope: {
							name: "@"
						},
						restrict: "EA",
						link: function(g, h, i) {
							if (!g.name || "" === g.name) throw "textAngular Error: A toolbar requires a name";
							angular.extend(g, angular.copy(c)), i.taToolbar && (g.toolbar = g.$parent.$eval(i.taToolbar)), i.taToolbarClass && (g.classes.toolbar = i.taToolbarClass), i.taToolbarGroupClass && (g.classes.toolbarGroup = i.taToolbarGroupClass), i.taToolbarButtonClass && (g.classes.toolbarButton = i.taToolbarButtonClass), i.taToolbarActiveButtonClass && (g.classes.toolbarButtonActive = i.taToolbarActiveButtonClass), i.taFocussedClass && (g.classes.focussed = i.taFocussedClass), g.disabled = !0, g.focussed = !1, g._$element = h, h[0].innerHTML = "", h.addClass("ta-toolbar " + g.classes.toolbar), g.$watch("focussed", function() {
								g.focussed ? h.addClass(g.classes.focussed) : h.removeClass(g.classes.focussed)
							});
							var j = function(b, c) {
								var d;
								if (d = angular.element(b && b.display ? b.display : "<button type='button'>"), d.addClass(g.classes.toolbarButton), d.attr("name", c.name), d.attr("unselectable", "on"), d.attr("ng-disabled", "isDisabled()"), d.attr("tabindex", "-1"), d.attr("ng-click", "executeAction()"), d.attr("ng-class", "displayActiveToolClass(active)"), b && b.tooltiptext && d.attr("title", b.tooltiptext), d.on("mousedown", function(a, b) {
									return b && angular.extend(a, b), a.preventDefault(), !1
								}), b && !b.display && !c._display && (d[0].innerHTML = "", b.buttontext && (d[0].innerHTML = b.buttontext), b.iconclass)) {
									var e = angular.element("<i>"),
										f = d[0].innerHTML;
									e.addClass(b.iconclass), d[0].innerHTML = "", d.append(e), f && "" !== f && d.append("&nbsp;" + f)
								}
								return c._lastToolDefinition = angular.copy(b), a(d)(c)
							};
							g.tools = {}, g._parent = {
								disabled: !0,
								showHtml: !1,
								queryFormatBlockState: function() {
									return !1
								},
								queryCommandState: function() {
									return !1
								}
							};
							var k = {
								$window: f,
								$editor: function() {
									return g._parent
								},
								isDisabled: function() {
									return this.$eval("disabled") || this.$eval("disabled()") || "html" !== this.name && this.$editor().showHtml || this.$parent.disabled || this.$editor().disabled
								},
								displayActiveToolClass: function(a) {
									return a ? g.classes.toolbarButtonActive : ""
								},
								executeAction: e
							};
							angular.forEach(g.toolbar, function(a) {
								var b = angular.element("<div>");
								b.addClass(g.classes.toolbarGroup), angular.forEach(a, function(a) {
									g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
										name: a
									}), g.tools[a].$element = j(d[a], g.tools[a]), b.append(g.tools[a].$element)
								}), h.append(b)
							}), g.updateToolDisplay = function(a, b, c) {
								var d = g.tools[a];
								if (d) {
									if (d._lastToolDefinition && !c && (b = angular.extend({}, d._lastToolDefinition, b)), null === b.buttontext && null === b.iconclass && null === b.display) throw 'textAngular Error: Tool Definition for updating "' + a + '" does not have a valid display/iconclass/buttontext value';
									null === b.buttontext && delete b.buttontext, null === b.iconclass && delete b.iconclass, null === b.display && delete b.display;
									var e = j(b, d);
									d.$element.replaceWith(e), d.$element = e
								}
							}, g.addTool = function(a, b, c, e) {
								g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
									name: a
								}), g.tools[a].$element = j(d[a], g.tools[a]);
								var f;
								void 0 === c && (c = g.toolbar.length - 1), f = angular.element(h.children()[c]), void 0 === e ? (f.append(g.tools[a].$element), g.toolbar[c][g.toolbar[c].length - 1] = a) : (f.children().eq(e).after(g.tools[a].$element), g.toolbar[c][e] = a)
							}, b.registerToolbar(g), g.$on("$destroy", function() {
								b.unregisterToolbar(g.name)
							})
						}
					}
				}
			]).service("taToolExecuteAction", ["$q",
				function(a) {
					return function(b) {
						void 0 !== b && (this.$editor = function() {
							return b
						});
						var c = a.defer(),
							d = c.promise,
							e = this.$editor();
						d["finally"](function() {
							e.endAction.call(e)
						});
						var f;
						try {
							f = this.action(c, e.startAction())
						} catch (g) {}(f || void 0 === f) && c.resolve()
					}
				}
			]).service("textAngularManager", ["taToolExecuteAction", "taTools", "taRegisterTool",
				function(a, b, c) {
					var d = {}, e = {};
					return {
						registerEditor: function(c, f, g) {
							if (!c || "" === c) throw "textAngular Error: An editor requires a name";
							if (!f) throw "textAngular Error: An editor requires a scope";
							if (e[c]) throw 'textAngular Error: An Editor with name "' + c + '" already exists';
							var h = [];
							return angular.forEach(g, function(a) {
								d[a] && h.push(d[a])
							}), e[c] = {
								scope: f,
								toolbars: g,
								_registerToolbar: function(a) {
									this.toolbars.indexOf(a.name) >= 0 && h.push(a)
								},
								editorFunctions: {
									disable: function() {
										angular.forEach(h, function(a) {
											a.disabled = !0
										})
									},
									enable: function() {
										angular.forEach(h, function(a) {
											a.disabled = !1
										})
									},
									focus: function() {
										angular.forEach(h, function(a) {
											a._parent = f, a.disabled = !1, a.focussed = !0
										})
									},
									unfocus: function() {
										angular.forEach(h, function(a) {
											a.disabled = !0, a.focussed = !1
										})
									},
									updateSelectedStyles: function(a) {
										angular.forEach(h, function(b) {
											angular.forEach(b.tools, function(b) {
												b.activeState && (b.active = b.activeState(a))
											})
										})
									},
									sendKeyCommand: function(c) {
										var d = !1;
										return (c.ctrlKey || c.metaKey) && angular.forEach(b, function(b, e) {
											if (b.commandKeyCode && b.commandKeyCode === c.which)
												for (var g = 0; g < h.length; g++)
													if (void 0 !== h[g].tools[e]) {
														a.call(h[g].tools[e], f), d = !0;
														break
													}
										}), d
									},
									triggerElementSelect: function(a, c) {
										var d = function(a, b) {
											for (var c = !0, d = 0; d < b.length; d++) c = c && a.attr(b[d]);
											return c
										}, e = [],
											g = {}, i = !1;
										c = angular.element(c);
										var j = !1;
										if (angular.forEach(b, function(a, b) {
											a.onElementSelect && a.onElementSelect.element && a.onElementSelect.element.toLowerCase() === c[0].tagName.toLowerCase() && (!a.onElementSelect.filter || a.onElementSelect.filter(c)) && (j = j || angular.isArray(a.onElementSelect.onlyWithAttrs) && d(c, a.onElementSelect.onlyWithAttrs), (!a.onElementSelect.onlyWithAttrs || d(c, a.onElementSelect.onlyWithAttrs)) && (g[b] = a))
										}), j ? (angular.forEach(g, function(a, b) {
											a.onElementSelect.onlyWithAttrs && d(c, a.onElementSelect.onlyWithAttrs) && e.push({
												name: b,
												tool: a
											})
										}), e.sort(function(a, b) {
											return b.tool.onElementSelect.onlyWithAttrs.length - a.tool.onElementSelect.onlyWithAttrs.length
										})) : angular.forEach(g, function(a, b) {
											e.push({
												name: b,
												tool: a
											})
										}), e.length > 0)
											for (var k = 0; k < e.length; k++) {
												for (var l = e[k].tool, m = e[k].name, n = 0; n < h.length; n++)
													if (void 0 !== h[n].tools[m]) {
														l.onElementSelect.action.call(h[n].tools[m], a, c, f), i = !0;
														break
													}
												if (i) break
											}
										return i
									}
								}
							}, e[c].editorFunctions
						},
						retrieveEditor: function(a) {
							return e[a]
						},
						unregisterEditor: function(a) {
							delete e[a]
						},
						registerToolbar: function(a) {
							if (!a) throw "textAngular Error: A toolbar requires a scope";
							if (!a.name || "" === a.name) throw "textAngular Error: A toolbar requires a name";
							if (d[a.name]) throw 'textAngular Error: A toolbar with name "' + a.name + '" already exists';
							d[a.name] = a, angular.forEach(e, function(b) {
								b._registerToolbar(a)
							})
						},
						retrieveToolbar: function(a) {
							return d[a]
						},
						retrieveToolbarsViaEditor: function(a) {
							var b = [],
								c = this;
							return angular.forEach(this.retrieveEditor(a).toolbars, function(a) {
								b.push(c.retrieveToolbar(a))
							}), b
						},
						unregisterToolbar: function(a) {
							delete d[a]
						},
						updateToolsDisplay: function(a) {
							var b = this;
							angular.forEach(a, function(a, c) {
								b.updateToolDisplay(c, a)
							})
						},
						resetToolsDisplay: function() {
							var a = this;
							angular.forEach(b, function(b, c) {
								a.resetToolDisplay(c)
							})
						},
						updateToolDisplay: function(a, b) {
							var c = this;
							angular.forEach(d, function(d, e) {
								c.updateToolbarToolDisplay(e, a, b)
							})
						},
						resetToolDisplay: function(a) {
							var b = this;
							angular.forEach(d, function(c, d) {
								b.resetToolbarToolDisplay(d, a)
							})
						},
						updateToolbarToolDisplay: function(a, b, c) {
							if (!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
							d[a].updateToolDisplay(b, c)
						},
						resetToolbarToolDisplay: function(a, c) {
							if (!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
							d[a].updateToolDisplay(c, b[c], !0)
						},
						removeTool: function(a) {
							delete b[a], angular.forEach(d, function(b) {
								delete b.tools[a];
								for (var c = 0; c < b.toolbar.length; c++) {
									for (var d, e = 0; e < b.toolbar[c].length; e++) {
										if (b.toolbar[c][e] === a) {
											d = {
												group: c,
												index: e
											};
											break
										}
										if (void 0 !== d) break
									}
									void 0 !== d && (b.toolbar[d.group].slice(d.index, 1), b._$element.children().eq(d.group).children().eq(d.index).remove())
								}
							})
						},
						addTool: function(a, b, e, f) {
							c(a, b), angular.forEach(d, function(c) {
								c.addTool(a, b, e, f)
							})
						},
						addToolToToolbar: function(a, b, e, f, g) {
							c(a, b), d[e].addTool(a, b, f, g)
						},
						refreshEditor: function(a) {
							if (!e[a]) throw 'textAngular Error: No Editor with name "' + a + '" exists';
							e[a].scope.updateTaBindtaTextElement(), e[a].scope.$$phase || e[a].scope.$digest()
						}
					}
				}
			]).service("taSelection", ["$window", "$document",
				function(a, b) {
					var c = b[0],
						d = function(a) {
							if (a.hasChildNodes()) return a.firstChild;
							for (; a && !a.nextSibling;) a = a.parentNode;
							return a ? a.nextSibling : null
						}, e = function(a) {
							var b = a.startContainer,
								c = a.endContainer;
							if (b === c) return [b];
							for (var e = []; b && b !== c;) b = d(b), b.parentNode === a.commonAncestorContainer && e.push(b);
							for (b = a.startContainer; b && b !== a.commonAncestorContainer;) b.parentNode === a.commonAncestorContainer && e.unshift(b), b = b.parentNode;
							return e
						};
					return {
						getOnlySelectedElements: function() {
							if (window.getSelection) {
								var b = a.getSelection();
								if (!b.isCollapsed) return e(b.getRangeAt(0))
							}
							return []
						},
						getSelectionElement: function() {
							var b, d, e;
							return c.selection && c.selection.createRange ? (b = c.selection.createRange(), b.parentElement()) : a.getSelection && (d = a.getSelection(), d.getRangeAt ? d.rangeCount > 0 && (b = d.getRangeAt(0)) : (b = c.createRange(), b.setStart(d.anchorNode, d.anchorOffset), b.setEnd(d.focusNode, d.focusOffset), b.collapsed !== d.isCollapsed && (b.setStart(d.focusNode, d.focusOffset), b.setEnd(d.anchorNode, d.anchorOffset))), b) ? (e = b.commonAncestorContainer, 3 === e.nodeType ? e.parentNode : e) : void 0
						},
						setSelectionToElementStart: function(b) {
							if (c.createRange && a.getSelection) {
								var d = c.createRange();
								d.selectNodeContents(b), d.setStart(b, 0), d.setEnd(b, 0);
								var e = a.getSelection();
								e.removeAllRanges(), e.addRange(d)
							} else if (c.selection && c.body.createTextRange) {
								var f = c.body.createTextRange();
								f.moveToElementText(b), f.collapse(!0), f.moveEnd("character", 0), f.moveStart("character", 0), f.select()
							}
						},
						setSelectionToElementEnd: function(b) {
							if (c.createRange && a.getSelection) {
								var d = c.createRange();
								d.selectNodeContents(b), d.collapse(!1);
								var e = a.getSelection();
								e.removeAllRanges(), e.addRange(d)
							} else if (c.selection && c.body.createTextRange) {
								var f = c.body.createTextRange();
								f.moveToElementText(b), f.collapse(!1), f.select()
							}
						}
					}
				}
			])
		}()
	}({}, function() {
		return this
	}()), d("textangular", function() {}), angular.module("ngInflection", []).filter("indexOf", function() {
		return function(a) {
			return a ? f.indexOf.apply(this, arguments) : void 0
		}
	}).filter("pluralize", function() {
		return function(a) {
			return a ? f.pluralize.apply(this, arguments) : void 0
		}
	}).filter("singularize", function() {
		return function(a) {
			return a ? f.singularize.apply(this, arguments) : void 0
		}
	}).filter("inflect", function() {
		return function(a) {
			return a ? f.inflect.apply(this, arguments) : void 0
		}
	}).filter("camelize", function() {
		return function(a) {
			return a ? f.camelize.apply(this, arguments) : void 0
		}
	}).filter("underscore", function() {
		return function(a) {
			return a ? f.underscore.apply(this, arguments) : void 0
		}
	}).filter("humanize", function() {
		return function(a) {
			return a ? f.humanize.apply(this, arguments) : void 0
		}
	}).filter("capitalize", function() {
		return function(a) {
			return a ? f.camelize.apply(this, arguments) : void 0
		}
	}).filter("dasherize", function() {
		return function(a) {
			return a ? f.dasherize.apply(this, arguments) : void 0
		}
	}).filter("titleize", function() {
		return function(a) {
			return a ? f.titleize.apply(this, arguments) : void 0
		}
	}).filter("demodulize", function() {
		return function(a) {
			return a ? f.demodulize.apply(this, arguments) : void 0
		}
	}).filter("tableize", function() {
		return function(a) {
			return a ? f.tableize.apply(this, arguments) : void 0
		}
	}).filter("classify", function() {
		return function(a) {
			return a ? f.classify.apply(this, arguments) : void 0
		}
	}).filter("foreign_key", function() {
		return function(a) {
			return a ? f.foreign_key.apply(this, arguments) : void 0
		}
	}).filter("ordinalize", function() {
		return function(a) {
			return a ? f.ordinalize.apply(this, arguments) : void 0
		}
	}).filter("transform", function() {
		return function(a, b) {
			return a && b ? f.transform.apply(this, arguments) : void 0
		}
	}), d("ngInflection", function() {}), a.$inject = ["a", "b"], angular.module("ui.codemirror", []).constant("uiCodemirrorConfig", {}).directive("uiCodemirror", a), a.$inject = ["$timeout", "uiCodemirrorConfig"],
	d("angular-ui-codemirror", function() {}), angular.module("ngNumeraljs", []).provider("$numeraljsConfig", function() {
		var a = {};
		this.setFormat = function(b, c) {
			a[b] = c
		}, this.setDefaultFormat = function(a) {
			numeral.defaultFormat(a)
		}, this.setLanguage = function(a, b) {
			numeral.language(a, b)
		}, this.setCurrentLanguage = function(a) {
			numeral.language(a)
		}, this.$get = function() {
			return {
				customFormat: function(b) {
					return a[b] || b
				}
			}
		}
	}).filter("numeraljs", ["$numeraljsConfig",
		function(a) {
			return function(b, c) {
				return null == b ? b : (c = a.customFormat(c), numeral(b).format(c))
			}
		}
	]), d("angular-numeraljs", function() {}), d("ng-admin/Crud/list/ListController", [], function() {
		var a = function(a, b, c, d, e, f, g, h, i) {
			this.$scope = a, this.$stateParams = b, this.$filter = c, this.$location = d, this.$anchorScroll = e, this.RetrieveQueries = f, this.progression = g, this.view = h, this.entity = h.getEntity(), this.title = h.title(), this.description = h.description(), this.actions = h.actions(), this.batchActions = h.batchActions(), this.loadingPage = !1, this.filters = this.$filter("orderElement")(h.filters()), this.hasFilters = Object.keys(this.filters).length > 0, this.entries = i.entries, this.fields = h.fields(), this.listActions = h.listActions(), this.totalItems = i.totalItems, this.page = b.page || 1, this.infinitePagination = this.view.infinitePagination(), this.nextPageCallback = this.nextPage.bind(this), this.setPageCallback = this.setPage.bind(this), this.selection = this.batchActions.length ? [] : null, a.$on("$destroy", this.destroy.bind(this))
		};
		return a.prototype.nextPage = function(a) {
			if (!this.loadingPage) {
				var b = this.progression,
					c = this,
					d = this.$stateParams.search,
					e = this.$stateParams.sortField,
					f = this.$stateParams.sortDir;
				b.start(), this.RetrieveQueries.getAll(this.view, a, !0, d, e, f).then(function(a) {
					b.done(), c.entries = c.entries.concat(a.entries), c.loadingPage = !1
				})
			}
		}, a.prototype.setPage = function(a) {
			this.$location.search("page", a), this.$anchorScroll(0)
		}, a.prototype.destroy = function() {
			this.$scope = void 0, this.$stateParams = void 0, this.$filter = void 0, this.$location = void 0, this.$anchorScroll = void 0
		}, a.$inject = ["$scope", "$stateParams", "$filter", "$location", "$anchorScroll", "RetrieveQueries", "progression", "view", "data"], a
	}), d("ng-admin/Crud/show/ShowController", [], function() {
		var a = function(a, b, c, d) {
			this.$scope = a, this.$location = b, this.title = c.title(), this.description = c.description(), this.actions = c.actions(), this.fields = c.fields(), this.$scope.entry = d, this.$scope.view = c, this.view = c, this.entity = this.view.getEntity(), a.$on("$destroy", this.destroy.bind(this))
		};
		return a.prototype.destroy = function() {
			this.$scope = void 0, this.$location = void 0, this.view = void 0, this.entity = void 0
		}, a.$inject = ["$scope", "$location", "view", "entry"], a
	}), d("ng-admin/Crud/form/FormController", [], function() {
		var a = function(a, b, c, d, e, f, g, h, i, j) {
			this.$scope = a, this.$state = b, this.CreateQueries = c, this.UpdateQueries = d, this.Validator = e, this.progression = g, this.notification = h, this.title = i.title(), this.description = i.description(), this.actions = i.actions(), this.fields = i.fields(), this.config = f(), this.view = i, this.entity = this.view.getEntity(), this.$scope.entry = j, this.$scope.view = i, this.$scope.entity = this.entity, this.originEntityId = j.values[this.entity.identifier().name()], a.$on("$destroy", this.destroy.bind(this))
		};
		return a.prototype.validateEntry = function() {
			var a, b, c, d, e = this.form,
				f = this.$scope.entry,
				g = this.view.getFields(),
				h = this.entity.identifier(),
				i = {};
			if (!e.$valid) return this.notification.log("invalid form", {
				addnCls: "humane-flatty-error"
			}), !1;
			i[h.name()] = f.identifierValue;
			for (d in g) c = g[d], a = f.values[c.name()], i[c.name()] = a;
			b = this.view.mapEntry(i);
			try {
				this.Validator.validate(this.view, b)
			} catch (j) {
				return this.notification.log(j, {
					addnCls: "humane-flatty-error"
				}), !1
			}
			return i
		}, a.prototype.submitCreation = function(a) {
			a.preventDefault();
			var b = this.validateEntry(),
				c = this.$scope.entity,
				d = c.editionView().enabled ? "edit" : "show";
			if (b) {
				var e = this.progression,
					f = this.notification,
					c = this.entity,
					g = this.$state;
				e.start(), this.CreateQueries.createOne(this.view, b).then(function(a) {
					e.done(), f.log("Element successfully created.", {
						addnCls: "humane-flatty-success"
					}), g.go(g.get(d), {
						entity: c.name(),
						id: a.identifierValue
					})
				}, this.handleError.bind(this))
			}
		}, a.prototype.submitEdition = function(a) {
			a.preventDefault();
			var b = this.validateEntry();
			if (b) {
				var c = this.progression,
					d = this.notification;
				c.start(), this.UpdateQueries.updateOne(this.view, b, this.originEntityId).then(function() {
					c.done(), d.log("Changes successfully saved.", {
						addnCls: "humane-flatty-success"
					})
				}, this.handleError.bind(this))
			}
		}, a.prototype.handleError = function(a) {
			var b = this.config.getErrorMessageFor(this.view, a);
			this.progression.done(), this.notification.log(b, {
				addnCls: "humane-flatty-error"
			})
		}, a.prototype.destroy = function() {
			this.$scope = void 0, this.$state = void 0, this.CreateQueries = void 0, this.UpdateQueries = void 0, this.view = void 0, this.entity = void 0
		}, a.$inject = ["$scope", "$state", "CreateQueries", "UpdateQueries", "Validator", "NgAdminConfiguration", "progression", "notification", "view", "entry"], a
	}), d("ng-admin/Crud/delete/DeleteController", [], function() {
		var a = function(a, b, c, d, e, f, g) {
			this.$scope = a, this.$location = b, this.DeleteQueries = c, this.entityLabel = e.entity, this.entityId = e.id, this.view = f, this.title = f.title(), this.description = f.description(), this.actions = f.actions(), this.entity = f.getEntity(), this.notification = d, this.$scope.entry = g, this.$scope.view = f, a.$on("$destroy", this.destroy.bind(this))
		};
		return a.prototype.deleteOne = function() {
			var a = this.notification,
				b = this.$location,
				c = this.entityLabel;
			this.DeleteQueries.deleteOne(this.view, this.entityId).then(function() {
				b.path(c + "/list"), a.log("Element successfully deleted.", {
					addnCls: "humane-flatty-success"
				})
			}, function(b) {
				var c = b.data;
				"object" == typeof c && (c = JSON.stringify(c)), a.log("Oops, an error occured : (code: " + b.status + ") " + c, {
					addnCls: "humane-flatty-error"
				})
			})
		}, a.prototype.back = function() {
			this.$location.path(this.entityLabel + "/edit/" + this.entityId)
		}, a.prototype.destroy = function() {
			this.$scope = void 0, this.$location = void 0, this.DeleteQueries = void 0, this.view = void 0
		}, a.$inject = ["$scope", "$location", "DeleteQueries", "notification", "params", "view", "entry"], a
	}), d("ng-admin/Crud/delete/BatchDeleteController", [], function() {
		var a = function(a, b, c, d, e, f, g, h) {
			this.$scope = a, this.$state = b, this.$stateParams = c, this.$location = d, this.$window = e, this.DeleteQueries = f, this.notification = g, this.view = h, this.entity = h.getEntity(), this.entityIds = c.ids, this.selection = [], this.title = h.title(), this.description = h.description(), this.actions = h.actions(), this.loadingPage = !1, this.fields = h.fields(), a.$on("$destroy", this.destroy.bind(this))
		};
		return a.prototype.batchDelete = function() {
			var a = this.notification,
				b = this.$state,
				c = this.entity.name();
			this.DeleteQueries.batchDelete(this.view, this.entityIds).then(function() {
				b.go(b.get("list"), {
					entity: c
				}), a.log("Elements successfully deleted.", {
					addnCls: "humane-flatty-success"
				})
			}, function(b) {
				var c = b.data;
				"object" == typeof c && (c = JSON.stringify(c)), a.log("Oops, an error occured : (code: " + b.status + ") " + c, {
					addnCls: "humane-flatty-error"
				})
			})
		}, a.prototype.back = function() {
			this.$window.history.back()
		}, a.prototype.destroy = function() {
			this.$scope = void 0, this.$state = void 0, this.$stateParams = void 0, this.$location = void 0, this.$window = void 0, this.DeleteQueries = void 0
		}, a.$inject = ["$scope", "$state", "$stateParams", "$location", "$window", "DeleteQueries", "notification", "view"], a
	}), d("ng-admin/Crud/misc/EntryFormatter", [], function() {
		function a(a) {
			this.formatDate = function(b) {
				return function(c) {
					return a("date")(c, b)
				}
			}
		}
		return a.prototype.formatField = function(a) {
			var b = a.label() || a.name();
			switch (a.type()) {
				case "boolean":
				case "choice":
				case "choices":
				case "number":
				case "string":
				case "text":
				case "wysiwyg":
				case "email":
				case "json":
				case "file":
				case "template":
					return function(c) {
						return {
							name: b,
							value: c.values[a.name()]
						}
					};
				case "date":
					var c = this.formatDate(a.format());
					return function(d) {
						return {
							name: b,
							value: c(d.values[a.name()])
						}
					};
				case "reference":
					return function(c) {
						return {
							name: b,
							value: c.listValues[a.name()]
						}
					};
				case "referenced_list":
					return
			}
		}, a.prototype.getFormatter = function(a) {
			var b = a.map(this.formatField.bind(this));
			return function(a) {
				var c = {};
				return b.map(function(b) {
					return b ? b(a) : void 0
				}).forEach(function(a) {
					a && (c[a.name] = a.value)
				}), c
			}
		}, a.$inject = ["$filter"], a
	}), d("ng-admin/Crud/misc/PromisesResolver", [], function() {
		function a(a) {
			function b(b) {
				if (!Array.isArray(b)) throw "allEvenFailed can only handle an array of promises";
				var c = a.defer();
				if (0 === b.length) return c.resolve([]), c.promise;
				var d = [],
					e = [];
				return b.forEach(function(a, b) {
					d[b] = !1
				}), b.forEach(function(b, f) {
					function g(a) {
						d[f] = !0, e[f] = a;
						for (var b in d)
							if (!d[b]) return;
						c.resolve(e)
					}

					function h(a) {
						return g({
							status: "success",
							result: a
						})
					}

					function i(a) {
						return g({
							status: "error",
							error: a
						})
					}
					a.when(b).then(h, i)
				}), c.promise
			}
			return {
				allEvenFailed: b
			}
		}
		return a.$inject = ["$q"], a
	}), d("ng-admin/lib/utils", [], function() {
		function a(a, b) {
			var c = new Function;
			c.prototype = b.prototype, a.prototype = new c, a.prototype.constructor = a
		}

		function b(a) {
			var b = a.charAt(0).toUpperCase();
			return a = b + a.substr(1), a.replace(/[-_](.)/g, function(a, b) {
				return " " + b.toUpperCase()
			})
		}
		return {
			inherits: a,
			camelCase: b
		}
	}), d("ng-admin/Crud/repository/Queries", [], function() {
		function a(a, b, c, d) {
			this.$q = a, this.Restangular = b, this.config = c(), this.PromisesResolver = d, this.Restangular.setFullResponse(!0)
		}
		return a.$inject = ["$q", "Restangular", "NgAdminConfiguration", "PromisesResolver"], a
	}), d("ng-admin/Crud/repository/RetrieveQueries", ["require", "ng-admin/lib/utils", "angular", "ng-admin/Crud/repository/Queries"], function(a) {
		function b() {
			e.apply(this, arguments)
		}
		var c = a("ng-admin/lib/utils"),
			d = a("angular"),
			e = a("ng-admin/Crud/repository/Queries");
		return c.inherits(b, e), b.prototype.getOne = function(a, b) {
			return this.Restangular.oneUrl(a.entity.name(), this.config.getRouteFor(a, b)).get().then(function(b) {
				return a.mapEntry(b.data)
			})
		}, b.prototype.getAll = function(a, b, c, d, e, f) {
			var g, h, i, j = this;
			return b = b || 1, c = "undefined" == typeof c ? !0 : c, this.getRawValues(a, b, d, e, f).then(function(b) {
				return g = b, j.getReferencedValues(a.getReferences(), g.data)
			}).then(function(d) {
				return i = d, h = a.mapEntries(g.data), h = j.fillReferencesValuesFromCollection(h, i, c), {
					entries: h,
					currentPage: b,
					perPage: a.perPage(),
					totalItems: g.totalCount || g.headers("X-Total-Count") || g.data.length
				}
			})
		}, b.prototype.getRawValues = function(a, b, c, e, f) {
			var g = {};
			if (-1 !== b && (g._page = "undefined" == typeof b ? 1 : parseInt(b, 10), g._perPage = a.perPage()), e && e.split(".")[0] === a.name() ? (g._sortField = e.split(".")[1], g._sortDir = f) : a.sortField() && (g._sortField = a.sortField(), g._sortDir = a.sortDir()), c && 0 !== Object.keys(c).length) {
				var h, i = a.filters();
				g._filters = {};
				for (h in c) i.hasOwnProperty(h) && i[h].hasMaps() ? d.extend(g._filters, i[h].getMappedValue(c[h])) : g._filters[h] = c[h]
			}
			return this.Restangular.allUrl(a.entity.name(), this.config.getRouteFor(a)).getList(g)
		}, b.prototype.getReferencedValues = function(a, b) {
			var c, d, e, f, g, h, i, j, k = this,
				l = {}, m = [];
			a.forEach(function(a) {
				l[a.name()] = a
			});
			for (h in l)
				if (e = l[h], f = e.getReferencedView(), b)
					if (d = e.getIdentifierValues(b), e.hasSingleApiCall()) c = e.getSingleApiCall(d), m.push(k.getRawValues(f, 1, c, e.sortField(), e.sortDir()));
					else
						for (j in d) m.push(k.getOne(f, d[j]));
					else m.push(k.getRawValues(f, 1, e.filters(), e.sortField(), e.sortDir()));
			return this.PromisesResolver.allEvenFailed(m).then(function(a) {
				if (0 === a.length) return l;
				h = 0;
				var f;
				for (i in l)
					if (e = l[i], c = e.getSingleApiCall(d), c || !b) {
						if (f = a[h++], "error" == f.status) continue;
						l[i].entries = e.getReferencedView().mapEntries(f.result.data)
					} else {
						g = [], d = e.getIdentifierValues(b);
						for (j in d) f = a[h++], "error" != f.status && g.push(f.result);
						l[i].entries = g
					}
				return l
			})
		}, b.prototype.getReferencedListValues = function(a, b, c, d) {
			var e, f, g, h, i, j = this,
				k = a.getReferencedLists(),
				l = [];
			for (h in k) e = k[h], g = {}, g[e.targetReferenceField()] = d, f = e.getReferencedView(), l.push(j.getRawValues(f, 1, g, b || f.name() + "." + e.sortField(), c || e.sortDir()));
			return this.$q.all(l).then(function(a) {
				i = 0;
				for (h in k) e = k[h], e.entries = e.getReferencedView().mapEntries(a[i++].data);
				return k
			})
		}, b.prototype.fillReferencesValuesFromCollection = function(a, b, c) {
			c = "undefined" == typeof c ? !1 : c;
			var d, e;
			for (d = 0, e = a.length; e > d; d++) a[d] = this.fillReferencesValuesFromEntry(a[d], b, c);
			return a
		}, b.prototype.fillReferencesValuesFromEntry = function(a, b, c) {
			var d, e, f, g, h, i, j;
			for (e in b)
				if (d = b[e], f = d.getChoicesById(), g = [], h = d.getMappedValue(a.values[e], a.values), "reference_many" === d.type()) {
					for (j in h) i = h[j], g.push(f[i]);
					a.listValues[e] = g
				} else c && h && h in f && (a.listValues[e] = d.getMappedValue(f[h], a.values));
			return a
		}, b.$inject = ["$q", "Restangular", "NgAdminConfiguration", "PromisesResolver"], b
	}), d("ng-admin/Crud/repository/CreateQueries", ["require", "ng-admin/lib/utils", "ng-admin/Crud/repository/Queries"], function(a) {
		function b() {
			d.apply(this, arguments)
		}
		var c = a("ng-admin/lib/utils"),
			d = a("ng-admin/Crud/repository/Queries");
		return c.inherits(b, d), b.prototype.createOne = function(a, b) {
			return this.Restangular.oneUrl(a.entity.name(), this.config.getRouteFor(a)).customPOST(b).then(function(b) {
				return a.mapEntry(b.data)
			})
		}, b.$inject = ["$q", "Restangular", "NgAdminConfiguration", "PromisesResolver"], b
	}), d("ng-admin/Crud/repository/UpdateQueries", ["require", "ng-admin/lib/utils", "ng-admin/Crud/repository/Queries"], function(a) {
		function b() {
			d.apply(this, arguments)
		}
		var c = a("ng-admin/lib/utils"),
			d = a("ng-admin/Crud/repository/Queries");
		return c.inherits(b, d), b.prototype.updateOne = function(a, b, c) {
			var d = c || b[a.getEntity().identifier().name()];
			return this.Restangular.oneUrl(a.entity.name(), this.config.getRouteFor(a, d)).customPUT(b).then(function(b) {
				return a.mapEntry(b.data)
			})
		}, b.$inject = ["$q", "Restangular", "NgAdminConfiguration", "PromisesResolver"], b
	}), d("ng-admin/Crud/repository/DeleteQueries", ["require", "ng-admin/lib/utils", "ng-admin/Crud/repository/Queries"], function(a) {
		function b() {
			d.apply(this, arguments)
		}
		var c = a("ng-admin/lib/utils"),
			d = a("ng-admin/Crud/repository/Queries");
		return c.inherits(b, d), b.prototype.deleteOne = function(a, b) {
			return this.Restangular.oneUrl(a.entity.name(), this.config.getRouteFor(a, b)).customDELETE()
		}, b.prototype.batchDelete = function(a, b) {
			var c = this,
				d = b.map(function(b) {
					return c.deleteOne(a, b)
				});
			return this.$q.all(d)
		}, b.$inject = ["$q", "Restangular", "NgAdminConfiguration", "PromisesResolver"], b
	}), d("ng-admin/Crud/validator/maJsonValidator", ["require"], function() {
		function a() {
			return {
				require: "ngModel",
				link: function(a, b, c, d) {
					d.$validators.json = function(a) {
						if (d.$isEmpty(a)) return !0;
						try {
							return angular.fromJson(a), !0
						} catch (b) {
							return !1
						}
					}
				}
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/field/maField", ["require", "lodash"], function(a) {
		function b(a) {
			var b = c(a).map(function(a, b) {
				return '<span ng-switch-when="' + b + '">' + a.getWriteWidget() + "</span>"
			}).join(""),
				d = '<div id="row-{{ field.name() }}" class="has-feedback" ng-class="getFieldValidationClass(field)"><label for="{{ field.name() }}" class="col-sm-2 control-label">{{ field.label() }}<span ng-if="field.validation().required">&nbsp;*</span>&nbsp;</label><div ng-if="field.editable()" ng-class="getClassesForField(field, entry)" ng-switch="field.type()">' + b + '<span ng-show="fieldHasValidation(field)" class="glyphicon form-control-feedback" ng-class="fieldIsValid(field) ? \'glyphicon-ok\' : \'glyphicon-remove\'"></span></div><div ng-if="!field.editable()" ng-class="field.getCssClasses(entry)||\'col-sm-10\'"><p class="form-control-static"><ma-column field="::field" entry="::entry" entity="::entity"></ma-column></p></div></div>';
			return {
				restrict: "E",
				scope: {
					field: "&",
					entry: "=",
					entity: "&",
					form: "&"
				},
				link: function(a) {
					a.field = a.field(), a.type = a.field.type(), a.entity = a.entity(), a.form = a.form(), a.getClassesForField = function(a, b) {
						return "ng-admin-field-" + a.name() + " " + (a.getCssClasses(b) || "col-sm-10 col-md-8 col-lg-7")
					}, a.getInputForField = function(b) {
						return a.form[b.name()]
					}, a.fieldHasValidation = function(a) {
						var b = this.getInputForField(a);
						return b && b.$dirty
					}, a.fieldIsValid = function(a) {
						var b = this.getInputForField(a);
						return b && b.$valid
					}, a.getFieldValidationClass = function(a) {
						return this.fieldHasValidation(a) ? this.fieldIsValid(a) ? "has-success" : "has-error" : void 0
					}
				},
				template: d
			}
		}
		var c = a("lodash");
		return b.$inject = ["FieldViewConfiguration"], b
	}), d("ng-admin/Crud/field/maButtonField", [], function() {
		function a() {
			return {
				scope: {
					field: "&",
					value: "="
				},
				restrict: "E",
				link: function(a, b) {
					var c = a.field();
					a.name = c.name(), a.label = c.label(), a.value = !! a.value;
					var d = b.children()[0],
						e = c.attributes();
					for (var f in e) d[f] = e[f];
					a.toggle = function() {
						this.value = !this.value
					}, a.isActive = function() {
						return !!this.value
					}
				},
				template: '<a class="btn btn-default" ng-click="toggle()" id="{{ name }}" ng-class="{active: isActive()}" >{{ label }}</a>'
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/field/maChoiceField", ["require"], function() {
		function a() {
			return {
				scope: {
					field: "&",
					value: "=",
					entry: "=?"
				},
				restrict: "E",
				link: function(a, b) {
					var c = a.field();
					a.name = c.name(), a.v = c.validation();
					var d = c.choices();
					a.getChoices = "function" == typeof d ? d : function() {
						return d
					};
					var e = b.children()[0],
						f = c.attributes();
					for (var g in f) e[g] = f[g]
				},
				template: '<select ng-model="value" ng-required="v.required" id="{{ name }}" name="{{ name }}" class="form-control"><option ng-if="!v.required" value="" ng-selected="!value">-- select a value --</option><option ng-repeat="choice in getChoices(entry)" value="{{ choice.value }}" ng-selected="value == choice.value">{{ choice.label }}</option></select>'
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/field/maChoicesField", ["require"], function() {
		function a() {
			return {
				scope: {
					field: "&",
					value: "=",
					entry: "=?"
				},
				restrict: "E",
				link: function(a, c) {
					var d = a.field();
					a.name = d.name(), a.v = d.validation();
					var e = d.choices();
					a.getChoices = "function" == typeof e ? e : function() {
						return e
					};
					var f = c.children()[0],
						g = d.attributes();
					for (var h in g) f[h] = g[h];
					a.contains = b
				},
				template: '<select multiple ng-model="value" id="{{ name }}" name="{{ name }}" class="form-control" ng-required="v.required"><option ng-repeat="choice in getChoices(entry)" value="{{ choice.value }}" ng-selected="contains(value, choice.value)">{{ choice.label }}</option></select>'
			}
		}

		function b(a, b) {
			if (!a) return !1;
			for (var c = 0, d = a.length; d > c; c++)
				if (a[c] == b) return !0;
			return !1
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/field/maDateField", ["require"], function() {
		function a() {
			return {
				scope: {
					field: "&",
					value: "="
				},
				restrict: "E",
				link: function(a, b) {
					var c = a.field();
					a.name = c.name(), a.rawValue = a.value, a.$watch("rawValue", function(b) {
						a.value = c.parse()(b)
					}), a.format = c.format(), a.v = c.validation(), a.isOpen = !1;
					var d = b.find("input").eq(0),
						e = c.attributes();
					for (var f in e) d.attr(f, e[f]);
					a.toggleDatePicker = function(b) {
						b.preventDefault(), b.stopPropagation(), a.isOpen = !a.isOpen
					}
				},
				template: '<div class="input-group datepicker"><input type="text" ng-model="rawValue" id="{{ name }}" name="{{ name }}" class="form-control" datepicker-popup="{{ format }}" is-open="isOpen" close-text="Close" ng-required="v.required" /><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="toggleDatePicker($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></div>'
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/field/maInputField", ["require"], function() {
		function a() {
			return {
				scope: {
					type: "@",
					field: "&",
					value: "="
				},
				restrict: "E",
				link: function(a, b) {
					var c = a.field();
					a.name = c.name(), a.v = c.validation();
					var d = b.children()[0],
						e = c.attributes();
					for (var f in e) d[f] = e[f]
				},
				template: '<input type="{{ type || text }}" ng-model="value" id="{{ name }}" name="{{ name }}" class="form-control"ng-required="v.required" ng-minlength="v.minlength" ng-maxlength="v.maxlength" />'
			}
		}
		return a.$inject = [], a
	}),
	function(a) {
		if ("object" == typeof exports && "object" == typeof module) module.exports = a();
		else {
			if ("function" == typeof d && d.amd) return d("bower_components/codemirror/lib/codemirror", [], a);
			this.CodeMirror = a()
		}
	}(function() {
		function a(c, d) {
			if (!(this instanceof a)) return new a(c, d);
			this.options = d = d ? qe(d) : {}, qe(Gf, d, !1), n(d);
			var e = d.value;
			"string" == typeof e && (e = new cg(e, d.mode)), this.doc = e;
			var f = this.display = new b(c, e);
			f.wrapper.CodeMirror = this, j(this), h(this), d.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), d.autofocus && !jf && yb(this), this.state = {
				keyMaps: [],
				overlays: [],
				modeGen: 0,
				overwrite: !1,
				focused: !1,
				suppressEdits: !1,
				pasteIncoming: !1,
				cutIncoming: !1,
				draggingText: !1,
				highlight: new je,
				keySeq: null
			}, Ze && 11 > $e && setTimeout(re(xb, this, !0), 20), Bb(this), De(), $a(this), this.curOp.forceUpdate = !0, Ed(this, e), d.autofocus && !jf || ze() == f.input ? setTimeout(re(Zb, this), 20) : $b(this);
			for (var g in Hf) Hf.hasOwnProperty(g) && Hf[g](this, d[g], If);
			t(this);
			for (var i = 0; i < Mf.length; ++i) Mf[i](this);
			ab(this)
		}

		function b(a, b) {
			var c = this,
				d = c.input = ve("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
			_e ? d.style.width = "1000px" : d.setAttribute("wrap", "off"), hf && (d.style.border = "1px solid black"), d.setAttribute("autocorrect", "off"), d.setAttribute("autocapitalize", "off"), d.setAttribute("spellcheck", "false"), c.inputDiv = ve("div", [d], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), c.scrollbarH = ve("div", [ve("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar"), c.scrollbarV = ve("div", [ve("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), c.scrollbarFiller = ve("div", null, "CodeMirror-scrollbar-filler"), c.gutterFiller = ve("div", null, "CodeMirror-gutter-filler"), c.lineDiv = ve("div", null, "CodeMirror-code"), c.selectionDiv = ve("div", null, null, "position: relative; z-index: 1"), c.cursorDiv = ve("div", null, "CodeMirror-cursors"), c.measure = ve("div", null, "CodeMirror-measure"), c.lineMeasure = ve("div", null, "CodeMirror-measure"), c.lineSpace = ve("div", [c.measure, c.lineMeasure, c.selectionDiv, c.cursorDiv, c.lineDiv], null, "position: relative; outline: none"), c.mover = ve("div", [ve("div", [c.lineSpace], "CodeMirror-lines")], null, "position: relative"), c.sizer = ve("div", [c.mover], "CodeMirror-sizer"), c.heightForcer = ve("div", null, null, "position: absolute; height: " + mg + "px; width: 1px;"), c.gutters = ve("div", null, "CodeMirror-gutters"), c.lineGutter = null, c.scroller = ve("div", [c.sizer, c.heightForcer, c.gutters], "CodeMirror-scroll"), c.scroller.setAttribute("tabIndex", "-1"), c.wrapper = ve("div", [c.inputDiv, c.scrollbarH, c.scrollbarV, c.scrollbarFiller, c.gutterFiller, c.scroller], "CodeMirror"), Ze && 8 > $e && (c.gutters.style.zIndex = -1, c.scroller.style.paddingRight = 0), hf && (d.style.width = "0px"), _e || (c.scroller.draggable = !0), ef && (c.inputDiv.style.height = "1px", c.inputDiv.style.position = "absolute"), Ze && 8 > $e && (c.scrollbarH.style.minHeight = c.scrollbarV.style.minWidth = "18px"), a && (a.appendChild ? a.appendChild(c.wrapper) : a(c.wrapper)), c.viewFrom = c.viewTo = b.first, c.view = [], c.externalMeasured = null, c.viewOffset = 0, c.lastWrapHeight = c.lastWrapWidth = 0, c.updateLineNumbers = null, c.lineNumWidth = c.lineNumInnerWidth = c.lineNumChars = null, c.prevInput = "", c.alignWidgets = !1, c.pollingFast = !1, c.poll = new je, c.cachedCharWidth = c.cachedTextHeight = c.cachedPaddingH = null, c.inaccurateSelection = !1, c.maxLine = null, c.maxLineLength = 0, c.maxLineChanged = !1, c.wheelDX = c.wheelDY = c.wheelStartX = c.wheelStartY = null, c.shift = !1, c.selForContextMenu = null
		}

		function c(b) {
			b.doc.mode = a.getMode(b.options, b.doc.modeOption), d(b)
		}

		function d(a) {
			a.doc.iter(function(a) {
				a.stateAfter && (a.stateAfter = null), a.styles && (a.styles = null)
			}), a.doc.frontier = a.doc.first, va(a, 100), a.state.modeGen++, a.curOp && nb(a)
		}

		function e(a) {
			a.options.lineWrapping ? (Cg(a.display.wrapper, "CodeMirror-wrap"), a.display.sizer.style.minWidth = "") : (Bg(a.display.wrapper, "CodeMirror-wrap"), m(a)), g(a), nb(a), Na(a), setTimeout(function() {
				q(a)
			}, 100)
		}

		function f(a) {
			var b = Ya(a.display),
				c = a.options.lineWrapping,
				d = c && Math.max(5, a.display.scroller.clientWidth / Za(a.display) - 3);
			return function(e) {
				if (cd(a.doc, e)) return 0;
				var f = 0;
				if (e.widgets)
					for (var g = 0; g < e.widgets.length; g++) e.widgets[g].height && (f += e.widgets[g].height);
				return c ? f + (Math.ceil(e.text.length / d) || 1) * b : f + b
			}
		}

		function g(a) {
			var b = a.doc,
				c = f(a);
			b.iter(function(a) {
				var b = c(a);
				b != a.height && Id(a, b)
			})
		}

		function h(a) {
			a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + a.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), Na(a)
		}

		function i(a) {
			j(a), nb(a), setTimeout(function() {
				s(a)
			}, 20)
		}

		function j(a) {
			var b = a.display.gutters,
				c = a.options.gutters;
			we(b);
			for (var d = 0; d < c.length; ++d) {
				var e = c[d],
					f = b.appendChild(ve("div", null, "CodeMirror-gutter " + e));
				"CodeMirror-linenumbers" == e && (a.display.lineGutter = f, f.style.width = (a.display.lineNumWidth || 1) + "px")
			}
			b.style.display = d ? "" : "none", k(a)
		}

		function k(a) {
			var b = a.display.gutters.offsetWidth;
			a.display.sizer.style.marginLeft = b + "px", a.display.scrollbarH.style.left = a.options.fixedGutter ? b + "px" : 0
		}

		function l(a) {
			if (0 == a.height) return 0;
			for (var b, c = a.text.length, d = a; b = Xc(d);) {
				var e = b.find(0, !0);
				d = e.from.line, c += e.from.ch - e.to.ch
			}
			for (d = a; b = Yc(d);) {
				var e = b.find(0, !0);
				c -= d.text.length - e.from.ch, d = e.to.line, c += d.text.length - e.to.ch
			}
			return c
		}

		function m(a) {
			var b = a.display,
				c = a.doc;
			b.maxLine = Fd(c, c.first), b.maxLineLength = l(b.maxLine), b.maxLineChanged = !0, c.iter(function(a) {
				var c = l(a);
				c > b.maxLineLength && (b.maxLineLength = c, b.maxLine = a)
			})
		}

		function n(a) {
			var b = ne(a.gutters, "CodeMirror-linenumbers"); - 1 == b && a.lineNumbers ? a.gutters = a.gutters.concat(["CodeMirror-linenumbers"]) : b > -1 && !a.lineNumbers && (a.gutters = a.gutters.slice(0), a.gutters.splice(b, 1))
		}

		function o(a) {
			return a.display.scroller.clientHeight - a.display.wrapper.clientHeight < mg - 3
		}

		function p(a) {
			var b = a.display.scroller;
			return {
				clientHeight: b.clientHeight,
				barHeight: a.display.scrollbarV.clientHeight,
				scrollWidth: b.scrollWidth,
				clientWidth: b.clientWidth,
				hScrollbarTakesSpace: o(a),
				barWidth: a.display.scrollbarH.clientWidth,
				docHeight: Math.round(a.doc.height + Aa(a.display))
			}
		}

		function q(a, b) {
			b || (b = p(a));
			var c = a.display,
				d = Fe(c.measure),
				e = b.docHeight + mg,
				f = b.scrollWidth > b.clientWidth;
			f && b.scrollWidth <= b.clientWidth + 1 && d > 0 && !b.hScrollbarTakesSpace && (f = !1);
			var g = e > b.clientHeight;
			if (g ? (c.scrollbarV.style.display = "block", c.scrollbarV.style.bottom = f ? d + "px" : "0", c.scrollbarV.firstChild.style.height = Math.max(0, e - b.clientHeight + (b.barHeight || c.scrollbarV.clientHeight)) + "px") : (c.scrollbarV.style.display = "", c.scrollbarV.firstChild.style.height = "0"), f ? (c.scrollbarH.style.display = "block", c.scrollbarH.style.right = g ? d + "px" : "0", c.scrollbarH.firstChild.style.width = b.scrollWidth - b.clientWidth + (b.barWidth || c.scrollbarH.clientWidth) + "px") : (c.scrollbarH.style.display = "", c.scrollbarH.firstChild.style.width = "0"), f && g ? (c.scrollbarFiller.style.display = "block", c.scrollbarFiller.style.height = c.scrollbarFiller.style.width = d + "px") : c.scrollbarFiller.style.display = "", f && a.options.coverGutterNextToScrollbar && a.options.fixedGutter ? (c.gutterFiller.style.display = "block", c.gutterFiller.style.height = d + "px", c.gutterFiller.style.width = c.gutters.offsetWidth + "px") : c.gutterFiller.style.display = "", !a.state.checkedOverlayScrollbar && b.clientHeight > 0) {
				if (0 === d) {
					var h = kf && !ff ? "12px" : "18px";
					c.scrollbarV.style.minWidth = c.scrollbarH.style.minHeight = h;
					var i = function(b) {
						be(b) != c.scrollbarV && be(b) != c.scrollbarH && ib(a, Fb)(b)
					};
					ig(c.scrollbarV, "mousedown", i), ig(c.scrollbarH, "mousedown", i)
				}
				a.state.checkedOverlayScrollbar = !0
			}
		}

		function r(a, b, c) {
			var d = c && null != c.top ? Math.max(0, c.top) : a.scroller.scrollTop;
			d = Math.floor(d - za(a));
			var e = c && null != c.bottom ? c.bottom : d + a.wrapper.clientHeight,
				f = Kd(b, d),
				g = Kd(b, e);
			if (c && c.ensure) {
				var h = c.ensure.from.line,
					i = c.ensure.to.line;
				if (f > h) return {
					from: h,
					to: Kd(b, Ld(Fd(b, h)) + a.wrapper.clientHeight)
				};
				if (Math.min(i, b.lastLine()) >= g) return {
					from: Kd(b, Ld(Fd(b, i)) - a.wrapper.clientHeight),
					to: i
				}
			}
			return {
				from: f,
				to: Math.max(g, f + 1)
			}
		}

		function s(a) {
			var b = a.display,
				c = b.view;
			if (b.alignWidgets || b.gutters.firstChild && a.options.fixedGutter) {
				for (var d = v(b) - b.scroller.scrollLeft + a.doc.scrollLeft, e = b.gutters.offsetWidth, f = d + "px", g = 0; g < c.length; g++)
					if (!c[g].hidden) {
						a.options.fixedGutter && c[g].gutter && (c[g].gutter.style.left = f);
						var h = c[g].alignable;
						if (h)
							for (var i = 0; i < h.length; i++) h[i].style.left = f
					}
				a.options.fixedGutter && (b.gutters.style.left = d + e + "px")
			}
		}

		function t(a) {
			if (!a.options.lineNumbers) return !1;
			var b = a.doc,
				c = u(a.options, b.first + b.size - 1),
				d = a.display;
			if (c.length != d.lineNumChars) {
				var e = d.measure.appendChild(ve("div", [ve("div", c)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
					f = e.firstChild.offsetWidth,
					g = e.offsetWidth - f;
				return d.lineGutter.style.width = "", d.lineNumInnerWidth = Math.max(f, d.lineGutter.offsetWidth - g), d.lineNumWidth = d.lineNumInnerWidth + g, d.lineNumChars = d.lineNumInnerWidth ? c.length : -1, d.lineGutter.style.width = d.lineNumWidth + "px", k(a), !0
			}
			return !1
		}

		function u(a, b) {
			return String(a.lineNumberFormatter(b + a.firstLineNumber))
		}

		function v(a) {
			return a.scroller.getBoundingClientRect().left - a.sizer.getBoundingClientRect().left
		}

		function w(a, b, c) {
			var d = a.display;
			this.viewport = b, this.visible = r(d, a.doc, b), this.editorIsHidden = !d.wrapper.offsetWidth, this.wrapperHeight = d.wrapper.clientHeight, this.wrapperWidth = d.wrapper.clientWidth, this.oldViewFrom = d.viewFrom, this.oldViewTo = d.viewTo, this.oldScrollerWidth = d.scroller.clientWidth, this.force = c, this.dims = E(a)
		}

		function x(a, b) {
			var c = a.display,
				d = a.doc;
			if (b.editorIsHidden) return pb(a), !1;
			if (!b.force && b.visible.from >= c.viewFrom && b.visible.to <= c.viewTo && (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo) && 0 == tb(a)) return !1;
			t(a) && (pb(a), b.dims = E(a));
			var e = d.first + d.size,
				f = Math.max(b.visible.from - a.options.viewportMargin, d.first),
				g = Math.min(e, b.visible.to + a.options.viewportMargin);
			c.viewFrom < f && f - c.viewFrom < 20 && (f = Math.max(d.first, c.viewFrom)), c.viewTo > g && c.viewTo - g < 20 && (g = Math.min(e, c.viewTo)), qf && (f = ad(a.doc, f), g = bd(a.doc, g));
			var h = f != c.viewFrom || g != c.viewTo || c.lastWrapHeight != b.wrapperHeight || c.lastWrapWidth != b.wrapperWidth;
			sb(a, f, g), c.viewOffset = Ld(Fd(a.doc, c.viewFrom)), a.display.mover.style.top = c.viewOffset + "px";
			var i = tb(a);
			if (!h && 0 == i && !b.force && (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo)) return !1;
			var j = ze();
			return i > 4 && (c.lineDiv.style.display = "none"), F(a, c.updateLineNumbers, b.dims), i > 4 && (c.lineDiv.style.display = ""), j && ze() != j && j.offsetHeight && j.focus(), we(c.cursorDiv), we(c.selectionDiv), h && (c.lastWrapHeight = b.wrapperHeight, c.lastWrapWidth = b.wrapperWidth, va(a, 400)), c.updateLineNumbers = null, !0
		}

		function y(a, b) {
			for (var c = b.force, d = b.viewport, e = !0;; e = !1) {
				if (e && a.options.lineWrapping && b.oldScrollerWidth != a.display.scroller.clientWidth) c = !0;
				else if (c = !1, d && null != d.top && (d = {
					top: Math.min(a.doc.height + Aa(a.display) - mg - a.display.scroller.clientHeight, d.top)
				}), b.visible = r(a.display, a.doc, d), b.visible.from >= a.display.viewFrom && b.visible.to <= a.display.viewTo) break;
				if (!x(a, b)) break;
				C(a);
				var f = p(a);
				ra(a), A(a, f), q(a, f)
			}
			de(a, "update", a), (a.display.viewFrom != b.oldViewFrom || a.display.viewTo != b.oldViewTo) && de(a, "viewportChange", a, a.display.viewFrom, a.display.viewTo)
		}

		function z(a, b) {
			var c = new w(a, b);
			if (x(a, c)) {
				C(a), y(a, c);
				var d = p(a);
				ra(a), A(a, d), q(a, d)
			}
		}

		function A(a, b) {
			a.display.sizer.style.minHeight = a.display.heightForcer.style.top = b.docHeight + "px", a.display.gutters.style.height = Math.max(b.docHeight, b.clientHeight - mg) + "px"
		}

		function B(a, b) {
			a.display.sizer.offsetWidth + a.display.gutters.offsetWidth < a.display.scroller.clientWidth - 1 && (a.display.sizer.style.minHeight = a.display.heightForcer.style.top = "0px", a.display.gutters.style.height = b.docHeight + "px")
		}

		function C(a) {
			for (var b = a.display, c = b.lineDiv.offsetTop, d = 0; d < b.view.length; d++) {
				var e, f = b.view[d];
				if (!f.hidden) {
					if (Ze && 8 > $e) {
						var g = f.node.offsetTop + f.node.offsetHeight;
						e = g - c, c = g
					} else {
						var h = f.node.getBoundingClientRect();
						e = h.bottom - h.top
					}
					var i = f.line.height - e;
					if (2 > e && (e = Ya(b)), (i > .001 || -.001 > i) && (Id(f.line, e), D(f.line), f.rest))
						for (var j = 0; j < f.rest.length; j++) D(f.rest[j])
				}
			}
		}

		function D(a) {
			if (a.widgets)
				for (var b = 0; b < a.widgets.length; ++b) a.widgets[b].height = a.widgets[b].node.offsetHeight
		}

		function E(a) {
			for (var b = a.display, c = {}, d = {}, e = b.gutters.clientLeft, f = b.gutters.firstChild, g = 0; f; f = f.nextSibling, ++g) c[a.options.gutters[g]] = f.offsetLeft + f.clientLeft + e, d[a.options.gutters[g]] = f.clientWidth;
			return {
				fixedPos: v(b),
				gutterTotalWidth: b.gutters.offsetWidth,
				gutterLeft: c,
				gutterWidth: d,
				wrapperWidth: b.wrapper.clientWidth
			}
		}

		function F(a, b, c) {
			function d(b) {
				var c = b.nextSibling;
				return _e && kf && a.display.currentWheelTarget == b ? b.style.display = "none" : b.parentNode.removeChild(b), c
			}
			for (var e = a.display, f = a.options.lineNumbers, g = e.lineDiv, h = g.firstChild, i = e.view, j = e.viewFrom, k = 0; k < i.length; k++) {
				var l = i[k];
				if (l.hidden);
				else if (l.node) {
					for (; h != l.node;) h = d(h);
					var m = f && null != b && j >= b && l.lineNumber;
					l.changes && (ne(l.changes, "gutter") > -1 && (m = !1), G(a, l, j, c)), m && (we(l.lineNumber), l.lineNumber.appendChild(document.createTextNode(u(a.options, j)))),
					h = l.node.nextSibling
				} else {
					var n = O(a, l, j, c);
					g.insertBefore(n, h)
				}
				j += l.size
			}
			for (; h;) h = d(h)
		}

		function G(a, b, c, d) {
			for (var e = 0; e < b.changes.length; e++) {
				var f = b.changes[e];
				"text" == f ? K(a, b) : "gutter" == f ? M(a, b, c, d) : "class" == f ? L(b) : "widget" == f && N(b, d)
			}
			b.changes = null
		}

		function H(a) {
			return a.node == a.text && (a.node = ve("div", null, null, "position: relative"), a.text.parentNode && a.text.parentNode.replaceChild(a.node, a.text), a.node.appendChild(a.text), Ze && 8 > $e && (a.node.style.zIndex = 2)), a.node
		}

		function I(a) {
			var b = a.bgClass ? a.bgClass + " " + (a.line.bgClass || "") : a.line.bgClass;
			if (b && (b += " CodeMirror-linebackground"), a.background) b ? a.background.className = b : (a.background.parentNode.removeChild(a.background), a.background = null);
			else if (b) {
				var c = H(a);
				a.background = c.insertBefore(ve("div", null, b), c.firstChild)
			}
		}

		function J(a, b) {
			var c = a.display.externalMeasured;
			return c && c.line == b.line ? (a.display.externalMeasured = null, b.measure = c.measure, c.built) : sd(a, b)
		}

		function K(a, b) {
			var c = b.text.className,
				d = J(a, b);
			b.text == b.node && (b.node = d.pre), b.text.parentNode.replaceChild(d.pre, b.text), b.text = d.pre, d.bgClass != b.bgClass || d.textClass != b.textClass ? (b.bgClass = d.bgClass, b.textClass = d.textClass, L(b)) : c && (b.text.className = c)
		}

		function L(a) {
			I(a), a.line.wrapClass ? H(a).className = a.line.wrapClass : a.node != a.text && (a.node.className = "");
			var b = a.textClass ? a.textClass + " " + (a.line.textClass || "") : a.line.textClass;
			a.text.className = b || ""
		}

		function M(a, b, c, d) {
			b.gutter && (b.node.removeChild(b.gutter), b.gutter = null);
			var e = b.line.gutterMarkers;
			if (a.options.lineNumbers || e) {
				var f = H(b),
					g = b.gutter = f.insertBefore(ve("div", null, "CodeMirror-gutter-wrapper", "left: " + (a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth) + "px; width: " + d.gutterTotalWidth + "px"), b.text);
				if (b.line.gutterClass && (g.className += " " + b.line.gutterClass), !a.options.lineNumbers || e && e["CodeMirror-linenumbers"] || (b.lineNumber = g.appendChild(ve("div", u(a.options, c), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + d.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + a.display.lineNumInnerWidth + "px"))), e)
					for (var h = 0; h < a.options.gutters.length; ++h) {
						var i = a.options.gutters[h],
							j = e.hasOwnProperty(i) && e[i];
						j && g.appendChild(ve("div", [j], "CodeMirror-gutter-elt", "left: " + d.gutterLeft[i] + "px; width: " + d.gutterWidth[i] + "px"))
					}
			}
		}

		function N(a, b) {
			a.alignable && (a.alignable = null);
			for (var c, d = a.node.firstChild; d; d = c) {
				var c = d.nextSibling;
				"CodeMirror-linewidget" == d.className && a.node.removeChild(d)
			}
			P(a, b)
		}

		function O(a, b, c, d) {
			var e = J(a, b);
			return b.text = b.node = e.pre, e.bgClass && (b.bgClass = e.bgClass), e.textClass && (b.textClass = e.textClass), L(b), M(a, b, c, d), P(b, d), b.node
		}

		function P(a, b) {
			if (Q(a.line, a, b, !0), a.rest)
				for (var c = 0; c < a.rest.length; c++) Q(a.rest[c], a, b, !1)
		}

		function Q(a, b, c, d) {
			if (a.widgets)
				for (var e = H(b), f = 0, g = a.widgets; f < g.length; ++f) {
					var h = g[f],
						i = ve("div", [h.node], "CodeMirror-linewidget");
					h.handleMouseEvents || (i.ignoreEvents = !0), R(h, i, b, c), d && h.above ? e.insertBefore(i, b.gutter || b.text) : e.appendChild(i), de(h, "redraw")
				}
		}

		function R(a, b, c, d) {
			if (a.noHScroll) {
				(c.alignable || (c.alignable = [])).push(b);
				var e = d.wrapperWidth;
				b.style.left = d.fixedPos + "px", a.coverGutter || (e -= d.gutterTotalWidth, b.style.paddingLeft = d.gutterTotalWidth + "px"), b.style.width = e + "px"
			}
			a.coverGutter && (b.style.zIndex = 5, b.style.position = "relative", a.noHScroll || (b.style.marginLeft = -d.gutterTotalWidth + "px"))
		}

		function S(a) {
			return rf(a.line, a.ch)
		}

		function T(a, b) {
			return sf(a, b) < 0 ? b : a
		}

		function U(a, b) {
			return sf(a, b) < 0 ? a : b
		}

		function V(a, b) {
			this.ranges = a, this.primIndex = b
		}

		function W(a, b) {
			this.anchor = a, this.head = b
		}

		function X(a, b) {
			var c = a[b];
			a.sort(function(a, b) {
				return sf(a.from(), b.from())
			}), b = ne(a, c);
			for (var d = 1; d < a.length; d++) {
				var e = a[d],
					f = a[d - 1];
				if (sf(f.to(), e.from()) >= 0) {
					var g = U(f.from(), e.from()),
						h = T(f.to(), e.to()),
						i = f.empty() ? e.from() == e.head : f.from() == f.head;
					b >= d && --b, a.splice(--d, 2, new W(i ? h : g, i ? g : h))
				}
			}
			return new V(a, b)
		}

		function Y(a, b) {
			return new V([new W(a, b || a)], 0)
		}

		function Z(a, b) {
			return Math.max(a.first, Math.min(b, a.first + a.size - 1))
		}

		function $(a, b) {
			if (b.line < a.first) return rf(a.first, 0);
			var c = a.first + a.size - 1;
			return b.line > c ? rf(c, Fd(a, c).text.length) : _(b, Fd(a, b.line).text.length)
		}

		function _(a, b) {
			var c = a.ch;
			return null == c || c > b ? rf(a.line, b) : 0 > c ? rf(a.line, 0) : a
		}

		function aa(a, b) {
			return b >= a.first && b < a.first + a.size
		}

		function ba(a, b) {
			for (var c = [], d = 0; d < b.length; d++) c[d] = $(a, b[d]);
			return c
		}

		function ca(a, b, c, d) {
			if (a.cm && a.cm.display.shift || a.extend) {
				var e = b.anchor;
				if (d) {
					var f = sf(c, e) < 0;
					f != sf(d, e) < 0 ? (e = c, c = d) : f != sf(c, d) < 0 && (c = d)
				}
				return new W(e, c)
			}
			return new W(d || c, c)
		}

		function da(a, b, c, d) {
			ja(a, new V([ca(a, a.sel.primary(), b, c)], 0), d)
		}

		function ea(a, b, c) {
			for (var d = [], e = 0; e < a.sel.ranges.length; e++) d[e] = ca(a, a.sel.ranges[e], b[e], null);
			var f = X(d, a.sel.primIndex);
			ja(a, f, c)
		}

		function fa(a, b, c, d) {
			var e = a.sel.ranges.slice(0);
			e[b] = c, ja(a, X(e, a.sel.primIndex), d)
		}

		function ga(a, b, c, d) {
			ja(a, Y(b, c), d)
		}

		function ha(a, b) {
			var c = {
				ranges: b.ranges,
				update: function(b) {
					this.ranges = [];
					for (var c = 0; c < b.length; c++) this.ranges[c] = new W($(a, b[c].anchor), $(a, b[c].head))
				}
			};
			return kg(a, "beforeSelectionChange", a, c), a.cm && kg(a.cm, "beforeSelectionChange", a.cm, c), c.ranges != b.ranges ? X(c.ranges, c.ranges.length - 1) : b
		}

		function ia(a, b, c) {
			var d = a.history.done,
				e = me(d);
			e && e.ranges ? (d[d.length - 1] = b, ka(a, b, c)) : ja(a, b, c)
		}

		function ja(a, b, c) {
			ka(a, b, c), Td(a, a.sel, a.cm ? a.cm.curOp.id : 0 / 0, c)
		}

		function ka(a, b, c) {
			(he(a, "beforeSelectionChange") || a.cm && he(a.cm, "beforeSelectionChange")) && (b = ha(a, b));
			var d = c && c.bias || (sf(b.primary().head, a.sel.primary().head) < 0 ? -1 : 1);
			la(a, na(a, b, d, !0)), c && c.scroll === !1 || !a.cm || sc(a.cm)
		}

		function la(a, b) {
			b.equals(a.sel) || (a.sel = b, a.cm && (a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = !0, ge(a.cm)), de(a, "cursorActivity", a))
		}

		function ma(a) {
			la(a, na(a, a.sel, null, !1), og)
		}

		function na(a, b, c, d) {
			for (var e, f = 0; f < b.ranges.length; f++) {
				var g = b.ranges[f],
					h = oa(a, g.anchor, c, d),
					i = oa(a, g.head, c, d);
				(e || h != g.anchor || i != g.head) && (e || (e = b.ranges.slice(0, f)), e[f] = new W(h, i))
			}
			return e ? X(e, b.primIndex) : b
		}

		function oa(a, b, c, d) {
			var e = !1,
				f = b,
				g = c || 1;
			a.cantEdit = !1;
			a: for (;;) {
				var h = Fd(a, f.line);
				if (h.markedSpans)
					for (var i = 0; i < h.markedSpans.length; ++i) {
						var j = h.markedSpans[i],
							k = j.marker;
						if ((null == j.from || (k.inclusiveLeft ? j.from <= f.ch : j.from < f.ch)) && (null == j.to || (k.inclusiveRight ? j.to >= f.ch : j.to > f.ch))) {
							if (d && (kg(k, "beforeCursorEnter"), k.explicitlyCleared)) {
								if (h.markedSpans) {
									--i;
									continue
								}
								break
							}
							if (!k.atomic) continue;
							var l = k.find(0 > g ? -1 : 1);
							if (0 == sf(l, f) && (l.ch += g, l.ch < 0 ? l = l.line > a.first ? $(a, rf(l.line - 1)) : null : l.ch > h.text.length && (l = l.line < a.first + a.size - 1 ? rf(l.line + 1, 0) : null), !l)) {
								if (e) return d ? (a.cantEdit = !0, rf(a.first, 0)) : oa(a, b, c, !0);
								e = !0, l = b, g = -g
							}
							f = l;
							continue a
						}
					}
				return f
			}
		}

		function pa(a) {
			for (var b = a.display, c = a.doc, d = {}, e = d.cursors = document.createDocumentFragment(), f = d.selection = document.createDocumentFragment(), g = 0; g < c.sel.ranges.length; g++) {
				var h = c.sel.ranges[g],
					i = h.empty();
				(i || a.options.showCursorWhenSelecting) && sa(a, h, e), i || ta(a, h, f)
			}
			if (a.options.moveInputWithCursor) {
				var j = Ta(a, c.sel.primary().head, "div"),
					k = b.wrapper.getBoundingClientRect(),
					l = b.lineDiv.getBoundingClientRect();
				d.teTop = Math.max(0, Math.min(b.wrapper.clientHeight - 10, j.top + l.top - k.top)), d.teLeft = Math.max(0, Math.min(b.wrapper.clientWidth - 10, j.left + l.left - k.left))
			}
			return d
		}

		function qa(a, b) {
			xe(a.display.cursorDiv, b.cursors), xe(a.display.selectionDiv, b.selection), null != b.teTop && (a.display.inputDiv.style.top = b.teTop + "px", a.display.inputDiv.style.left = b.teLeft + "px")
		}

		function ra(a) {
			qa(a, pa(a))
		}

		function sa(a, b, c) {
			var d = Ta(a, b.head, "div", null, null, !a.options.singleCursorHeightPerLine),
				e = c.appendChild(ve("div", " ", "CodeMirror-cursor"));
			if (e.style.left = d.left + "px", e.style.top = d.top + "px", e.style.height = Math.max(0, d.bottom - d.top) * a.options.cursorHeight + "px", d.other) {
				var f = c.appendChild(ve("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
				f.style.display = "", f.style.left = d.other.left + "px", f.style.top = d.other.top + "px", f.style.height = .85 * (d.other.bottom - d.other.top) + "px"
			}
		}

		function ta(a, b, c) {
			function d(a, b, c, d) {
				0 > b && (b = 0), b = Math.round(b), d = Math.round(d), h.appendChild(ve("div", null, "CodeMirror-selected", "position: absolute; left: " + a + "px; top: " + b + "px; width: " + (null == c ? k - a : c) + "px; height: " + (d - b) + "px"))
			}

			function e(b, c, e) {
				function f(c, d) {
					return Sa(a, rf(b, c), "div", l, d)
				}
				var h, i, l = Fd(g, b),
					m = l.text.length;
				return Je(Md(l), c || 0, null == e ? m : e, function(a, b, g) {
					var l, n, o, p = f(a, "left");
					if (a == b) l = p, n = o = p.left;
					else {
						if (l = f(b - 1, "right"), "rtl" == g) {
							var q = p;
							p = l, l = q
						}
						n = p.left, o = l.right
					}
					null == c && 0 == a && (n = j), l.top - p.top > 3 && (d(n, p.top, null, p.bottom), n = j, p.bottom < l.top && d(n, p.bottom, null, l.top)), null == e && b == m && (o = k), (!h || p.top < h.top || p.top == h.top && p.left < h.left) && (h = p), (!i || l.bottom > i.bottom || l.bottom == i.bottom && l.right > i.right) && (i = l), j + 1 > n && (n = j), d(n, l.top, o - n, l.bottom)
				}), {
					start: h,
					end: i
				}
			}
			var f = a.display,
				g = a.doc,
				h = document.createDocumentFragment(),
				i = Ba(a.display),
				j = i.left,
				k = f.lineSpace.offsetWidth - i.right,
				l = b.from(),
				m = b.to();
			if (l.line == m.line) e(l.line, l.ch, m.ch);
			else {
				var n = Fd(g, l.line),
					o = Fd(g, m.line),
					p = $c(n) == $c(o),
					q = e(l.line, l.ch, p ? n.text.length + 1 : null).end,
					r = e(m.line, p ? 0 : null, m.ch).start;
				p && (q.top < r.top - 2 ? (d(q.right, q.top, null, q.bottom), d(j, r.top, r.left, r.bottom)) : d(q.right, q.top, r.left - q.right, q.bottom)), q.bottom < r.top && d(j, q.bottom, null, r.top)
			}
			c.appendChild(h)
		}

		function ua(a) {
			if (a.state.focused) {
				var b = a.display;
				clearInterval(b.blinker);
				var c = !0;
				b.cursorDiv.style.visibility = "", a.options.cursorBlinkRate > 0 ? b.blinker = setInterval(function() {
					b.cursorDiv.style.visibility = (c = !c) ? "" : "hidden"
				}, a.options.cursorBlinkRate) : a.options.cursorBlinkRate < 0 && (b.cursorDiv.style.visibility = "hidden")
			}
		}

		function va(a, b) {
			a.doc.mode.startState && a.doc.frontier < a.display.viewTo && a.state.highlight.set(b, re(wa, a))
		}

		function wa(a) {
			var b = a.doc;
			if (b.frontier < b.first && (b.frontier = b.first), !(b.frontier >= a.display.viewTo)) {
				var c = +new Date + a.options.workTime,
					d = Of(b.mode, ya(a, b.frontier)),
					e = [];
				b.iter(b.frontier, Math.min(b.first + b.size, a.display.viewTo + 500), function(f) {
					if (b.frontier >= a.display.viewFrom) {
						var g = f.styles,
							h = od(a, f, d, !0);
						f.styles = h.styles;
						var i = f.styleClasses,
							j = h.classes;
						j ? f.styleClasses = j : i && (f.styleClasses = null);
						for (var k = !g || g.length != f.styles.length || i != j && (!i || !j || i.bgClass != j.bgClass || i.textClass != j.textClass), l = 0; !k && l < g.length; ++l) k = g[l] != f.styles[l];
						k && e.push(b.frontier), f.stateAfter = Of(b.mode, d)
					} else qd(a, f.text, d), f.stateAfter = b.frontier % 5 == 0 ? Of(b.mode, d) : null;
					return ++b.frontier, +new Date > c ? (va(a, a.options.workDelay), !0) : void 0
				}), e.length && hb(a, function() {
					for (var b = 0; b < e.length; b++) ob(a, e[b], "text")
				})
			}
		}

		function xa(a, b, c) {
			for (var d, e, f = a.doc, g = c ? -1 : b - (a.doc.mode.innerMode ? 1e3 : 100), h = b; h > g; --h) {
				if (h <= f.first) return f.first;
				var i = Fd(f, h - 1);
				if (i.stateAfter && (!c || h <= f.frontier)) return h;
				var j = rg(i.text, null, a.options.tabSize);
				(null == e || d > j) && (e = h - 1, d = j)
			}
			return e
		}

		function ya(a, b, c) {
			var d = a.doc,
				e = a.display;
			if (!d.mode.startState) return !0;
			var f = xa(a, b, c),
				g = f > d.first && Fd(d, f - 1).stateAfter;
			return g = g ? Of(d.mode, g) : Pf(d.mode), d.iter(f, b, function(c) {
				qd(a, c.text, g);
				var h = f == b - 1 || f % 5 == 0 || f >= e.viewFrom && f < e.viewTo;
				c.stateAfter = h ? Of(d.mode, g) : null, ++f
			}), c && (d.frontier = f), g
		}

		function za(a) {
			return a.lineSpace.offsetTop
		}

		function Aa(a) {
			return a.mover.offsetHeight - a.lineSpace.offsetHeight
		}

		function Ba(a) {
			if (a.cachedPaddingH) return a.cachedPaddingH;
			var b = xe(a.measure, ve("pre", "x")),
				c = window.getComputedStyle ? window.getComputedStyle(b) : b.currentStyle,
				d = {
					left: parseInt(c.paddingLeft),
					right: parseInt(c.paddingRight)
				};
			return isNaN(d.left) || isNaN(d.right) || (a.cachedPaddingH = d), d
		}

		function Ca(a, b, c) {
			var d = a.options.lineWrapping,
				e = d && a.display.scroller.clientWidth;
			if (!b.measure.heights || d && b.measure.width != e) {
				var f = b.measure.heights = [];
				if (d) {
					b.measure.width = e;
					for (var g = b.text.firstChild.getClientRects(), h = 0; h < g.length - 1; h++) {
						var i = g[h],
							j = g[h + 1];
						Math.abs(i.bottom - j.bottom) > 2 && f.push((i.bottom + j.top) / 2 - c.top)
					}
				}
				f.push(c.bottom - c.top)
			}
		}

		function Da(a, b, c) {
			if (a.line == b) return {
				map: a.measure.map,
				cache: a.measure.cache
			};
			for (var d = 0; d < a.rest.length; d++)
				if (a.rest[d] == b) return {
					map: a.measure.maps[d],
					cache: a.measure.caches[d]
				};
			for (var d = 0; d < a.rest.length; d++)
				if (Jd(a.rest[d]) > c) return {
					map: a.measure.maps[d],
					cache: a.measure.caches[d],
					before: !0
				}
		}

		function Ea(a, b) {
			b = $c(b);
			var c = Jd(b),
				d = a.display.externalMeasured = new lb(a.doc, b, c);
			d.lineN = c;
			var e = d.built = sd(a, d);
			return d.text = e.pre, xe(a.display.lineMeasure, e.pre), d
		}

		function Fa(a, b, c, d) {
			return Ia(a, Ha(a, b), c, d)
		}

		function Ga(a, b) {
			if (b >= a.display.viewFrom && b < a.display.viewTo) return a.display.view[qb(a, b)];
			var c = a.display.externalMeasured;
			return c && b >= c.lineN && b < c.lineN + c.size ? c : void 0
		}

		function Ha(a, b) {
			var c = Jd(b),
				d = Ga(a, c);
			d && !d.text ? d = null : d && d.changes && G(a, d, c, E(a)), d || (d = Ea(a, b));
			var e = Da(d, b, c);
			return {
				line: b,
				view: d,
				rect: null,
				map: e.map,
				cache: e.cache,
				before: e.before,
				hasHeights: !1
			}
		}

		function Ia(a, b, c, d, e) {
			b.before && (c = -1);
			var f, g = c + (d || "");
			return b.cache.hasOwnProperty(g) ? f = b.cache[g] : (b.rect || (b.rect = b.view.text.getBoundingClientRect()), b.hasHeights || (Ca(a, b.view, b.rect), b.hasHeights = !0), f = Ja(a, b, c, d), f.bogus || (b.cache[g] = f)), {
				left: f.left,
				right: f.right,
				top: e ? f.rtop : f.top,
				bottom: e ? f.rbottom : f.bottom
			}
		}

		function Ja(a, b, c, d) {
			for (var e, f, g, h, i = b.map, j = 0; j < i.length; j += 3) {
				var k = i[j],
					l = i[j + 1];
				if (k > c ? (f = 0, g = 1, h = "left") : l > c ? (f = c - k, g = f + 1) : (j == i.length - 3 || c == l && i[j + 3] > c) && (g = l - k, f = g - 1, c >= l && (h = "right")), null != f) {
					if (e = i[j + 2], k == l && d == (e.insertLeft ? "left" : "right") && (h = d), "left" == d && 0 == f)
						for (; j && i[j - 2] == i[j - 3] && i[j - 1].insertLeft;) e = i[(j -= 3) + 2], h = "left";
					if ("right" == d && f == l - k)
						for (; j < i.length - 3 && i[j + 3] == i[j + 4] && !i[j + 5].insertLeft;) e = i[(j += 3) + 2], h = "right";
					break
				}
			}
			var m;
			if (3 == e.nodeType) {
				for (var j = 0; 4 > j; j++) {
					for (; f && ue(b.line.text.charAt(k + f));)--f;
					for (; l > k + g && ue(b.line.text.charAt(k + g));)++g;
					if (Ze && 9 > $e && 0 == f && g == l - k) m = e.parentNode.getBoundingClientRect();
					else if (Ze && a.options.lineWrapping) {
						var n = ug(e, f, g).getClientRects();
						m = n.length ? n["right" == d ? n.length - 1 : 0] : wf
					} else m = ug(e, f, g).getBoundingClientRect() || wf; if (m.left || m.right || 0 == f) break;
					g = f, f -= 1, h = "right"
				}
				Ze && 11 > $e && (m = Ka(a.display.measure, m))
			} else {
				f > 0 && (h = d = "right");
				var n;
				m = a.options.lineWrapping && (n = e.getClientRects()).length > 1 ? n["right" == d ? n.length - 1 : 0] : e.getBoundingClientRect()
			} if (Ze && 9 > $e && !f && (!m || !m.left && !m.right)) {
				var o = e.parentNode.getClientRects()[0];
				m = o ? {
					left: o.left,
					right: o.left + Za(a.display),
					top: o.top,
					bottom: o.bottom
				} : wf
			}
			for (var p = m.top - b.rect.top, q = m.bottom - b.rect.top, r = (p + q) / 2, s = b.view.measure.heights, j = 0; j < s.length - 1 && !(r < s[j]); j++);
			var t = j ? s[j - 1] : 0,
				u = s[j],
				v = {
					left: ("right" == h ? m.right : m.left) - b.rect.left,
					right: ("left" == h ? m.left : m.right) - b.rect.left,
					top: t,
					bottom: u
				};
			return m.left || m.right || (v.bogus = !0), a.options.singleCursorHeightPerLine || (v.rtop = p, v.rbottom = q), v
		}

		function Ka(a, b) {
			if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Ie(a)) return b;
			var c = screen.logicalXDPI / screen.deviceXDPI,
				d = screen.logicalYDPI / screen.deviceYDPI;
			return {
				left: b.left * c,
				right: b.right * c,
				top: b.top * d,
				bottom: b.bottom * d
			}
		}

		function La(a) {
			if (a.measure && (a.measure.cache = {}, a.measure.heights = null, a.rest))
				for (var b = 0; b < a.rest.length; b++) a.measure.caches[b] = {}
		}

		function Ma(a) {
			a.display.externalMeasure = null, we(a.display.lineMeasure);
			for (var b = 0; b < a.display.view.length; b++) La(a.display.view[b])
		}

		function Na(a) {
			Ma(a), a.display.cachedCharWidth = a.display.cachedTextHeight = a.display.cachedPaddingH = null, a.options.lineWrapping || (a.display.maxLineChanged = !0), a.display.lineNumChars = null
		}

		function Oa() {
			return window.pageXOffset || (document.documentElement || document.body).scrollLeft
		}

		function Pa() {
			return window.pageYOffset || (document.documentElement || document.body).scrollTop
		}

		function Qa(a, b, c, d) {
			if (b.widgets)
				for (var e = 0; e < b.widgets.length; ++e)
					if (b.widgets[e].above) {
						var f = fd(b.widgets[e]);
						c.top += f, c.bottom += f
					}
			if ("line" == d) return c;
			d || (d = "local");
			var g = Ld(b);
			if ("local" == d ? g += za(a.display) : g -= a.display.viewOffset, "page" == d || "window" == d) {
				var h = a.display.lineSpace.getBoundingClientRect();
				g += h.top + ("window" == d ? 0 : Pa());
				var i = h.left + ("window" == d ? 0 : Oa());
				c.left += i, c.right += i
			}
			return c.top += g, c.bottom += g, c
		}

		function Ra(a, b, c) {
			if ("div" == c) return b;
			var d = b.left,
				e = b.top;
			if ("page" == c) d -= Oa(), e -= Pa();
			else if ("local" == c || !c) {
				var f = a.display.sizer.getBoundingClientRect();
				d += f.left, e += f.top
			}
			var g = a.display.lineSpace.getBoundingClientRect();
			return {
				left: d - g.left,
				top: e - g.top
			}
		}

		function Sa(a, b, c, d, e) {
			return d || (d = Fd(a.doc, b.line)), Qa(a, d, Fa(a, d, b.ch, e), c)
		}

		function Ta(a, b, c, d, e, f) {
			function g(b, g) {
				var h = Ia(a, e, b, g ? "right" : "left", f);
				return g ? h.left = h.right : h.right = h.left, Qa(a, d, h, c)
			}

			function h(a, b) {
				var c = i[b],
					d = c.level % 2;
				return a == Ke(c) && b && c.level < i[b - 1].level ? (c = i[--b], a = Le(c) - (c.level % 2 ? 0 : 1), d = !0) : a == Le(c) && b < i.length - 1 && c.level < i[b + 1].level && (c = i[++b], a = Ke(c) - c.level % 2, d = !1), d && a == c.to && a > c.from ? g(a - 1) : g(a, d)
			}
			d = d || Fd(a.doc, b.line), e || (e = Ha(a, d));
			var i = Md(d),
				j = b.ch;
			if (!i) return g(j);
			var k = Se(i, j),
				l = h(j, k);
			return null != Kg && (l.other = h(j, Kg)), l
		}

		function Ua(a, b) {
			var c = 0,
				b = $(a.doc, b);
			a.options.lineWrapping || (c = Za(a.display) * b.ch);
			var d = Fd(a.doc, b.line),
				e = Ld(d) + za(a.display);
			return {
				left: c,
				right: c,
				top: e,
				bottom: e + d.height
			}
		}

		function Va(a, b, c, d) {
			var e = rf(a, b);
			return e.xRel = d, c && (e.outside = !0), e
		}

		function Wa(a, b, c) {
			var d = a.doc;
			if (c += a.display.viewOffset, 0 > c) return Va(d.first, 0, !0, -1);
			var e = Kd(d, c),
				f = d.first + d.size - 1;
			if (e > f) return Va(d.first + d.size - 1, Fd(d, f).text.length, !0, 1);
			0 > b && (b = 0);
			for (var g = Fd(d, e);;) {
				var h = Xa(a, g, e, b, c),
					i = Yc(g),
					j = i && i.find(0, !0);
				if (!i || !(h.ch > j.from.ch || h.ch == j.from.ch && h.xRel > 0)) return h;
				e = Jd(g = j.to.line)
			}
		}

		function Xa(a, b, c, d, e) {
			function f(d) {
				var e = Ta(a, rf(c, d), "line", b, j);
				return h = !0, g > e.bottom ? e.left - i : g < e.top ? e.left + i : (h = !1, e.left)
			}
			var g = e - Ld(b),
				h = !1,
				i = 2 * a.display.wrapper.clientWidth,
				j = Ha(a, b),
				k = Md(b),
				l = b.text.length,
				m = Me(b),
				n = Ne(b),
				o = f(m),
				p = h,
				q = f(n),
				r = h;
			if (d > q) return Va(c, n, r, 1);
			for (;;) {
				if (k ? n == m || n == Ue(b, m, 1) : 1 >= n - m) {
					for (var s = o > d || q - d >= d - o ? m : n, t = d - (s == m ? o : q); ue(b.text.charAt(s));)++s;
					var u = Va(c, s, s == m ? p : r, -1 > t ? -1 : t > 1 ? 1 : 0);
					return u
				}
				var v = Math.ceil(l / 2),
					w = m + v;
				if (k) {
					w = m;
					for (var x = 0; v > x; ++x) w = Ue(b, w, 1)
				}
				var y = f(w);
				y > d ? (n = w, q = y, (r = h) && (q += 1e3), l = v) : (m = w, o = y, p = h, l -= v)
			}
		}

		function Ya(a) {
			if (null != a.cachedTextHeight) return a.cachedTextHeight;
			if (null == tf) {
				tf = ve("pre");
				for (var b = 0; 49 > b; ++b) tf.appendChild(document.createTextNode("x")), tf.appendChild(ve("br"));
				tf.appendChild(document.createTextNode("x"))
			}
			xe(a.measure, tf);
			var c = tf.offsetHeight / 50;
			return c > 3 && (a.cachedTextHeight = c), we(a.measure), c || 1
		}

		function Za(a) {
			if (null != a.cachedCharWidth) return a.cachedCharWidth;
			var b = ve("span", "xxxxxxxxxx"),
				c = ve("pre", [b]);
			xe(a.measure, c);
			var d = b.getBoundingClientRect(),
				e = (d.right - d.left) / 10;
			return e > 2 && (a.cachedCharWidth = e), e || 10
		}

		function $a(a) {
			a.curOp = {
				cm: a,
				viewChanged: !1,
				startHeight: a.doc.height,
				forceUpdate: !1,
				updateInput: null,
				typing: !1,
				changeObjs: null,
				cursorActivityHandlers: null,
				cursorActivityCalled: 0,
				selectionChanged: !1,
				updateMaxLine: !1,
				scrollLeft: null,
				scrollTop: null,
				scrollToPos: null,
				id: ++yf
			}, xf ? xf.ops.push(a.curOp) : a.curOp.ownsGroup = xf = {
				ops: [a.curOp],
				delayedCallbacks: []
			}
		}

		function _a(a) {
			var b = a.delayedCallbacks,
				c = 0;
			do {
				for (; c < b.length; c++) b[c]();
				for (var d = 0; d < a.ops.length; d++) {
					var e = a.ops[d];
					if (e.cursorActivityHandlers)
						for (; e.cursorActivityCalled < e.cursorActivityHandlers.length;) e.cursorActivityHandlers[e.cursorActivityCalled++](e.cm)
				}
			} while (c < b.length)
		}

		function ab(a) {
			var b = a.curOp,
				c = b.ownsGroup;
			if (c) try {
				_a(c)
			} finally {
				xf = null;
				for (var d = 0; d < c.ops.length; d++) c.ops[d].cm.curOp = null;
				bb(c)
			}
		}

		function bb(a) {
			for (var b = a.ops, c = 0; c < b.length; c++) cb(b[c]);
			for (var c = 0; c < b.length; c++) db(b[c]);
			for (var c = 0; c < b.length; c++) eb(b[c]);
			for (var c = 0; c < b.length; c++) fb(b[c]);
			for (var c = 0; c < b.length; c++) gb(b[c])
		}

		function cb(a) {
			var b = a.cm,
				c = b.display;
			a.updateMaxLine && m(b), a.mustUpdate = a.viewChanged || a.forceUpdate || null != a.scrollTop || a.scrollToPos && (a.scrollToPos.from.line < c.viewFrom || a.scrollToPos.to.line >= c.viewTo) || c.maxLineChanged && b.options.lineWrapping, a.update = a.mustUpdate && new w(b, a.mustUpdate && {
				top: a.scrollTop,
				ensure: a.scrollToPos
			}, a.forceUpdate)
		}

		function db(a) {
			a.updatedDisplay = a.mustUpdate && x(a.cm, a.update)
		}

		function eb(a) {
			var b = a.cm,
				c = b.display;
			a.updatedDisplay && C(b), a.barMeasure = p(b), c.maxLineChanged && !b.options.lineWrapping && (a.adjustWidthTo = Fa(b, c.maxLine, c.maxLine.text.length).left + 3, a.maxScrollLeft = Math.max(0, c.sizer.offsetLeft + a.adjustWidthTo + mg - c.scroller.clientWidth)), (a.updatedDisplay || a.selectionChanged) && (a.newSelectionNodes = pa(b))
		}

		function fb(a) {
			var b = a.cm;
			null != a.adjustWidthTo && (b.display.sizer.style.minWidth = a.adjustWidthTo + "px", a.maxScrollLeft < b.doc.scrollLeft && Ob(b, Math.min(b.display.scroller.scrollLeft, a.maxScrollLeft), !0), b.display.maxLineChanged = !1), a.newSelectionNodes && qa(b, a.newSelectionNodes), a.updatedDisplay && A(b, a.barMeasure), (a.updatedDisplay || a.startHeight != b.doc.height) && q(b, a.barMeasure), a.selectionChanged && ua(b), b.state.focused && a.updateInput && xb(b, a.typing)
		}

		function gb(a) {
			var b = a.cm,
				c = b.display,
				d = b.doc;
			if (null != a.adjustWidthTo && Math.abs(a.barMeasure.scrollWidth - b.display.scroller.scrollWidth) > 1 && q(b), a.updatedDisplay && y(b, a.update), null == c.wheelStartX || null == a.scrollTop && null == a.scrollLeft && !a.scrollToPos || (c.wheelStartX = c.wheelStartY = null), null != a.scrollTop && (c.scroller.scrollTop != a.scrollTop || a.forceScroll)) {
				var e = Math.max(0, Math.min(c.scroller.scrollHeight - c.scroller.clientHeight, a.scrollTop));
				c.scroller.scrollTop = c.scrollbarV.scrollTop = d.scrollTop = e
			}
			if (null != a.scrollLeft && (c.scroller.scrollLeft != a.scrollLeft || a.forceScroll)) {
				var f = Math.max(0, Math.min(c.scroller.scrollWidth - c.scroller.clientWidth, a.scrollLeft));
				c.scroller.scrollLeft = c.scrollbarH.scrollLeft = d.scrollLeft = f, s(b)
			}
			if (a.scrollToPos) {
				var g = oc(b, $(d, a.scrollToPos.from), $(d, a.scrollToPos.to), a.scrollToPos.margin);
				a.scrollToPos.isCursor && b.state.focused && nc(b, g)
			}
			var h = a.maybeHiddenMarkers,
				i = a.maybeUnhiddenMarkers;
			if (h)
				for (var j = 0; j < h.length; ++j) h[j].lines.length || kg(h[j], "hide");
			if (i)
				for (var j = 0; j < i.length; ++j) i[j].lines.length && kg(i[j], "unhide");
			c.wrapper.offsetHeight && (d.scrollTop = b.display.scroller.scrollTop), a.updatedDisplay && _e && (b.options.lineWrapping && B(b, a.barMeasure), a.barMeasure.scrollWidth > a.barMeasure.clientWidth && a.barMeasure.scrollWidth < a.barMeasure.clientWidth + 1 && !o(b) && q(b)), a.changeObjs && kg(b, "changes", b, a.changeObjs)
		}

		function hb(a, b) {
			if (a.curOp) return b();
			$a(a);
			try {
				return b()
			} finally {
				ab(a)
			}
		}

		function ib(a, b) {
			return function() {
				if (a.curOp) return b.apply(a, arguments);
				$a(a);
				try {
					return b.apply(a, arguments)
				} finally {
					ab(a)
				}
			}
		}

		function jb(a) {
			return function() {
				if (this.curOp) return a.apply(this, arguments);
				$a(this);
				try {
					return a.apply(this, arguments)
				} finally {
					ab(this)
				}
			}
		}

		function kb(a) {
			return function() {
				var b = this.cm;
				if (!b || b.curOp) return a.apply(this, arguments);
				$a(b);
				try {
					return a.apply(this, arguments)
				} finally {
					ab(b)
				}
			}
		}

		function lb(a, b, c) {
			this.line = b, this.rest = _c(b), this.size = this.rest ? Jd(me(this.rest)) - c + 1 : 1, this.node = this.text = null, this.hidden = cd(a, b)
		}

		function mb(a, b, c) {
			for (var d, e = [], f = b; c > f; f = d) {
				var g = new lb(a.doc, Fd(a.doc, f), f);
				d = f + g.size, e.push(g)
			}
			return e
		}

		function nb(a, b, c, d) {
			null == b && (b = a.doc.first), null == c && (c = a.doc.first + a.doc.size), d || (d = 0);
			var e = a.display;
			if (d && c < e.viewTo && (null == e.updateLineNumbers || e.updateLineNumbers > b) && (e.updateLineNumbers = b), a.curOp.viewChanged = !0, b >= e.viewTo) qf && ad(a.doc, b) < e.viewTo && pb(a);
			else if (c <= e.viewFrom) qf && bd(a.doc, c + d) > e.viewFrom ? pb(a) : (e.viewFrom += d, e.viewTo += d);
			else if (b <= e.viewFrom && c >= e.viewTo) pb(a);
			else if (b <= e.viewFrom) {
				var f = rb(a, c, c + d, 1);
				f ? (e.view = e.view.slice(f.index), e.viewFrom = f.lineN, e.viewTo += d) : pb(a)
			} else if (c >= e.viewTo) {
				var f = rb(a, b, b, -1);
				f ? (e.view = e.view.slice(0, f.index), e.viewTo = f.lineN) : pb(a)
			} else {
				var g = rb(a, b, b, -1),
					h = rb(a, c, c + d, 1);
				g && h ? (e.view = e.view.slice(0, g.index).concat(mb(a, g.lineN, h.lineN)).concat(e.view.slice(h.index)), e.viewTo += d) : pb(a)
			}
			var i = e.externalMeasured;
			i && (c < i.lineN ? i.lineN += d : b < i.lineN + i.size && (e.externalMeasured = null))
		}

		function ob(a, b, c) {
			a.curOp.viewChanged = !0;
			var d = a.display,
				e = a.display.externalMeasured;
			if (e && b >= e.lineN && b < e.lineN + e.size && (d.externalMeasured = null), !(b < d.viewFrom || b >= d.viewTo)) {
				var f = d.view[qb(a, b)];
				if (null != f.node) {
					var g = f.changes || (f.changes = []); - 1 == ne(g, c) && g.push(c)
				}
			}
		}

		function pb(a) {
			a.display.viewFrom = a.display.viewTo = a.doc.first, a.display.view = [], a.display.viewOffset = 0
		}

		function qb(a, b) {
			if (b >= a.display.viewTo) return null;
			if (b -= a.display.viewFrom, 0 > b) return null;
			for (var c = a.display.view, d = 0; d < c.length; d++)
				if (b -= c[d].size, 0 > b) return d
		}

		function rb(a, b, c, d) {
			var e, f = qb(a, b),
				g = a.display.view;
			if (!qf || c == a.doc.first + a.doc.size) return {
				index: f,
				lineN: c
			};
			for (var h = 0, i = a.display.viewFrom; f > h; h++) i += g[h].size;
			if (i != b) {
				if (d > 0) {
					if (f == g.length - 1) return null;
					e = i + g[f].size - b, f++
				} else e = i - b;
				b += e, c += e
			}
			for (; ad(a.doc, c) != c;) {
				if (f == (0 > d ? 0 : g.length - 1)) return null;
				c += d * g[f - (0 > d ? 1 : 0)].size, f += d
			}
			return {
				index: f,
				lineN: c
			}
		}

		function sb(a, b, c) {
			var d = a.display,
				e = d.view;
			0 == e.length || b >= d.viewTo || c <= d.viewFrom ? (d.view = mb(a, b, c), d.viewFrom = b) : (d.viewFrom > b ? d.view = mb(a, b, d.viewFrom).concat(d.view) : d.viewFrom < b && (d.view = d.view.slice(qb(a, b))), d.viewFrom = b, d.viewTo < c ? d.view = d.view.concat(mb(a, d.viewTo, c)) : d.viewTo > c && (d.view = d.view.slice(0, qb(a, c)))), d.viewTo = c
		}

		function tb(a) {
			for (var b = a.display.view, c = 0, d = 0; d < b.length; d++) {
				var e = b[d];
				e.hidden || e.node && !e.changes || ++c
			}
			return c
		}

		function ub(a) {
			a.display.pollingFast || a.display.poll.set(a.options.pollInterval, function() {
				wb(a), a.state.focused && ub(a)
			})
		}

		function vb(a) {
			function b() {
				var d = wb(a);
				d || c ? (a.display.pollingFast = !1, ub(a)) : (c = !0, a.display.poll.set(60, b))
			}
			var c = !1;
			a.display.pollingFast = !0, a.display.poll.set(20, b)
		}

		function wb(a) {
			var b = a.display.input,
				c = a.display.prevInput,
				d = a.doc;
			if (!a.state.focused || Gg(b) && !c || Ab(a) || a.options.disableInput || a.state.keySeq) return !1;
			a.state.pasteIncoming && a.state.fakedLastChar && (b.value = b.value.substring(0, b.value.length - 1), a.state.fakedLastChar = !1);
			var e = b.value;
			if (e == c && !a.somethingSelected()) return !1;
			if (Ze && $e >= 9 && a.display.inputHasSelection === e || kf && /[\uf700-\uf7ff]/.test(e)) return xb(a), !1;
			var f = !a.curOp;
			f && $a(a), a.display.shift = !1, 8203 != e.charCodeAt(0) || d.sel != a.display.selForContextMenu || c || (c = "​");
			for (var g = 0, h = Math.min(c.length, e.length); h > g && c.charCodeAt(g) == e.charCodeAt(g);)++g;
			var i = e.slice(g),
				j = Fg(i),
				k = null;
			a.state.pasteIncoming && d.sel.ranges.length > 1 && (zf && zf.join("\n") == i ? k = d.sel.ranges.length % zf.length == 0 && oe(zf, Fg) : j.length == d.sel.ranges.length && (k = oe(j, function(a) {
				return [a]
			})));
			for (var l = d.sel.ranges.length - 1; l >= 0; l--) {
				var m = d.sel.ranges[l],
					n = m.from(),
					o = m.to();
				g < c.length ? n = rf(n.line, n.ch - (c.length - g)) : a.state.overwrite && m.empty() && !a.state.pasteIncoming && (o = rf(o.line, Math.min(Fd(d, o.line).text.length, o.ch + me(j).length)));
				var p = a.curOp.updateInput,
					q = {
						from: n,
						to: o,
						text: k ? k[l % k.length] : j,
						origin: a.state.pasteIncoming ? "paste" : a.state.cutIncoming ? "cut" : "+input"
					};
				if (gc(a.doc, q), de(a, "inputRead", a, q), i && !a.state.pasteIncoming && a.options.electricChars && a.options.smartIndent && m.head.ch < 100 && (!l || d.sel.ranges[l - 1].head.line != m.head.line)) {
					var r = a.getModeAt(m.head),
						s = Ff(q);
					if (r.electricChars) {
						for (var t = 0; t < r.electricChars.length; t++)
							if (i.indexOf(r.electricChars.charAt(t)) > -1) {
								uc(a, s.line, "smart");
								break
							}
					} else r.electricInput && r.electricInput.test(Fd(d, s.line).text.slice(0, s.ch)) && uc(a, s.line, "smart")
				}
			}
			return sc(a), a.curOp.updateInput = p, a.curOp.typing = !0, e.length > 1e3 || e.indexOf("\n") > -1 ? b.value = a.display.prevInput = "" : a.display.prevInput = e, f && ab(a), a.state.pasteIncoming = a.state.cutIncoming = !1, !0
		}

		function xb(a, b) {
			var c, d, e = a.doc;
			if (a.somethingSelected()) {
				a.display.prevInput = "";
				var f = e.sel.primary();
				c = Hg && (f.to().line - f.from().line > 100 || (d = a.getSelection()).length > 1e3);
				var g = c ? "-" : d || a.getSelection();
				a.display.input.value = g, a.state.focused && tg(a.display.input), Ze && $e >= 9 && (a.display.inputHasSelection = g)
			} else b || (a.display.prevInput = a.display.input.value = "", Ze && $e >= 9 && (a.display.inputHasSelection = null));
			a.display.inaccurateSelection = c
		}

		function yb(a) {
			"nocursor" == a.options.readOnly || jf && ze() == a.display.input || a.display.input.focus()
		}

		function zb(a) {
			a.state.focused || (yb(a), Zb(a))
		}

		function Ab(a) {
			return a.options.readOnly || a.doc.cantEdit
		}

		function Bb(a) {
			function b() {
				a.state.focused && setTimeout(re(yb, a), 0)
			}

			function c(b) {
				fe(a, b) || hg(b)
			}

			function d(b) {
				if (a.somethingSelected()) zf = a.getSelections(), e.inaccurateSelection && (e.prevInput = "", e.inaccurateSelection = !1, e.input.value = zf.join("\n"), tg(e.input));
				else {
					for (var c = [], d = [], f = 0; f < a.doc.sel.ranges.length; f++) {
						var g = a.doc.sel.ranges[f].head.line,
							h = {
								anchor: rf(g, 0),
								head: rf(g + 1, 0)
							};
						d.push(h), c.push(a.getRange(h.anchor, h.head))
					}
					"cut" == b.type ? a.setSelections(d, null, og) : (e.prevInput = "", e.input.value = c.join("\n"), tg(e.input)), zf = c
				}
				"cut" == b.type && (a.state.cutIncoming = !0)
			}
			var e = a.display;
			ig(e.scroller, "mousedown", ib(a, Fb)), Ze && 11 > $e ? ig(e.scroller, "dblclick", ib(a, function(b) {
				if (!fe(a, b)) {
					var c = Eb(a, b);
					if (c && !Kb(a, b) && !Db(a.display, b)) {
						fg(b);
						var d = a.findWordAt(c);
						da(a.doc, d.anchor, d.head)
					}
				}
			})) : ig(e.scroller, "dblclick", function(b) {
				fe(a, b) || fg(b)
			}), ig(e.lineSpace, "selectstart", function(a) {
				Db(e, a) || fg(a)
			}), of || ig(e.scroller, "contextmenu", function(b) {
				_b(a, b)
			}), ig(e.scroller, "scroll", function() {
				e.scroller.clientHeight && (Nb(a, e.scroller.scrollTop), Ob(a, e.scroller.scrollLeft, !0), kg(a, "scroll", a))
			}), ig(e.scrollbarV, "scroll", function() {
				e.scroller.clientHeight && Nb(a, e.scrollbarV.scrollTop)
			}), ig(e.scrollbarH, "scroll", function() {
				e.scroller.clientHeight && Ob(a, e.scrollbarH.scrollLeft)
			}), ig(e.scroller, "mousewheel", function(b) {
				Pb(a, b)
			}), ig(e.scroller, "DOMMouseScroll", function(b) {
				Pb(a, b)
			}), ig(e.scrollbarH, "mousedown", b), ig(e.scrollbarV, "mousedown", b), ig(e.wrapper, "scroll", function() {
				e.wrapper.scrollTop = e.wrapper.scrollLeft = 0
			}), ig(e.input, "keyup", function(b) {
				Xb.call(a, b)
			}), ig(e.input, "input", function() {
				Ze && $e >= 9 && a.display.inputHasSelection && (a.display.inputHasSelection = null), vb(a)
			}), ig(e.input, "keydown", ib(a, Vb)), ig(e.input, "keypress", ib(a, Yb)), ig(e.input, "focus", re(Zb, a)), ig(e.input, "blur", re($b, a)), a.options.dragDrop && (ig(e.scroller, "dragstart", function(b) {
				Mb(a, b)
			}), ig(e.scroller, "dragenter", c), ig(e.scroller, "dragover", c), ig(e.scroller, "drop", ib(a, Lb))), ig(e.scroller, "paste", function(b) {
				Db(e, b) || (a.state.pasteIncoming = !0, yb(a), vb(a))
			}), ig(e.input, "paste", function() {
				if (_e && !a.state.fakedLastChar && !(new Date - a.state.lastMiddleDown < 200)) {
					var b = e.input.selectionStart,
						c = e.input.selectionEnd;
					e.input.value += "$", e.input.selectionEnd = c, e.input.selectionStart = b, a.state.fakedLastChar = !0
				}
				a.state.pasteIncoming = !0, vb(a)
			}), ig(e.input, "cut", d), ig(e.input, "copy", d), ef && ig(e.sizer, "mouseup", function() {
				ze() == e.input && e.input.blur(), yb(a)
			})
		}

		function Cb(a) {
			var b = a.display;
			(b.lastWrapHeight != b.wrapper.clientHeight || b.lastWrapWidth != b.wrapper.clientWidth) && (b.cachedCharWidth = b.cachedTextHeight = b.cachedPaddingH = null, a.setSize())
		}

		function Db(a, b) {
			for (var c = be(b); c != a.wrapper; c = c.parentNode)
				if (!c || c.ignoreEvents || c.parentNode == a.sizer && c != a.mover) return !0
		}

		function Eb(a, b, c, d) {
			var e = a.display;
			if (!c) {
				var f = be(b);
				if (f == e.scrollbarH || f == e.scrollbarV || f == e.scrollbarFiller || f == e.gutterFiller) return null
			}
			var g, h, i = e.lineSpace.getBoundingClientRect();
			try {
				g = b.clientX - i.left, h = b.clientY - i.top
			} catch (b) {
				return null
			}
			var j, k = Wa(a, g, h);
			if (d && 1 == k.xRel && (j = Fd(a.doc, k.line).text).length == k.ch) {
				var l = rg(j, j.length, a.options.tabSize) - j.length;
				k = rf(k.line, Math.max(0, Math.round((g - Ba(a.display).left) / Za(a.display)) - l))
			}
			return k
		}

		function Fb(a) {
			if (!fe(this, a)) {
				var b = this,
					c = b.display;
				if (c.shift = a.shiftKey, Db(c, a)) return void(_e || (c.scroller.draggable = !1, setTimeout(function() {
					c.scroller.draggable = !0
				}, 100)));
				if (!Kb(b, a)) {
					var d = Eb(b, a);
					switch (window.focus(), ce(a)) {
						case 1:
							d ? Gb(b, a, d) : be(a) == c.scroller && fg(a);
							break;
						case 2:
							_e && (b.state.lastMiddleDown = +new Date), d && da(b.doc, d), setTimeout(re(yb, b), 20), fg(a);
							break;
						case 3:
							of && _b(b, a)
					}
				}
			}
		}

		function Gb(a, b, c) {
			setTimeout(re(zb, a), 0);
			var d, e = +new Date;
			vf && vf.time > e - 400 && 0 == sf(vf.pos, c) ? d = "triple" : uf && uf.time > e - 400 && 0 == sf(uf.pos, c) ? (d = "double", vf = {
				time: e,
				pos: c
			}) : (d = "single", uf = {
				time: e,
				pos: c
			});
			var f = a.doc.sel,
				g = kf ? b.metaKey : b.ctrlKey;
			a.options.dragDrop && Eg && !Ab(a) && "single" == d && f.contains(c) > -1 && f.somethingSelected() ? Hb(a, b, c, g) : Ib(a, b, c, d, g)
		}

		function Hb(a, b, c, d) {
			var e = a.display,
				f = ib(a, function(g) {
					_e && (e.scroller.draggable = !1), a.state.draggingText = !1, jg(document, "mouseup", f), jg(e.scroller, "drop", f), Math.abs(b.clientX - g.clientX) + Math.abs(b.clientY - g.clientY) < 10 && (fg(g), d || da(a.doc, c), yb(a), Ze && 9 == $e && setTimeout(function() {
						document.body.focus(), yb(a)
					}, 20))
				});
			_e && (e.scroller.draggable = !0), a.state.draggingText = f, e.scroller.dragDrop && e.scroller.dragDrop(),
			ig(document, "mouseup", f), ig(e.scroller, "drop", f)
		}

		function Ib(a, b, c, d, e) {
			function f(b) {
				if (0 != sf(p, b))
					if (p = b, "rect" == d) {
						for (var e = [], f = a.options.tabSize, g = rg(Fd(j, c.line).text, c.ch, f), h = rg(Fd(j, b.line).text, b.ch, f), i = Math.min(g, h), n = Math.max(g, h), o = Math.min(c.line, b.line), q = Math.min(a.lastLine(), Math.max(c.line, b.line)); q >= o; o++) {
							var r = Fd(j, o).text,
								s = ke(r, i, f);
							i == n ? e.push(new W(rf(o, s), rf(o, s))) : r.length > s && e.push(new W(rf(o, s), rf(o, ke(r, n, f))))
						}
						e.length || e.push(new W(c, c)), ja(j, X(m.ranges.slice(0, l).concat(e), l), {
							origin: "*mouse",
							scroll: !1
						}), a.scrollIntoView(b)
					} else {
						var t = k,
							u = t.anchor,
							v = b;
						if ("single" != d) {
							if ("double" == d) var w = a.findWordAt(b);
							else var w = new W(rf(b.line, 0), $(j, rf(b.line + 1, 0)));
							sf(w.anchor, u) > 0 ? (v = w.head, u = U(t.from(), w.anchor)) : (v = w.anchor, u = T(t.to(), w.head))
						}
						var e = m.ranges.slice(0);
						e[l] = new W($(j, u), v), ja(j, X(e, l), pg)
					}
			}

			function g(b) {
				var c = ++s,
					e = Eb(a, b, !0, "rect" == d);
				if (e)
					if (0 != sf(e, p)) {
						zb(a), f(e);
						var h = r(i, j);
						(e.line >= h.to || e.line < h.from) && setTimeout(ib(a, function() {
							s == c && g(b)
						}), 150)
					} else {
						var k = b.clientY < q.top ? -20 : b.clientY > q.bottom ? 20 : 0;
						k && setTimeout(ib(a, function() {
							s == c && (i.scroller.scrollTop += k, g(b))
						}), 50)
					}
			}

			function h(b) {
				s = 1 / 0, fg(b), yb(a), jg(document, "mousemove", t), jg(document, "mouseup", u), j.history.lastSelOrigin = null
			}
			var i = a.display,
				j = a.doc;
			fg(b);
			var k, l, m = j.sel;
			if (e && !b.shiftKey ? (l = j.sel.contains(c), k = l > -1 ? j.sel.ranges[l] : new W(c, c)) : k = j.sel.primary(), b.altKey) d = "rect", e || (k = new W(c, c)), c = Eb(a, b, !0, !0), l = -1;
			else if ("double" == d) {
				var n = a.findWordAt(c);
				k = a.display.shift || j.extend ? ca(j, k, n.anchor, n.head) : n
			} else if ("triple" == d) {
				var o = new W(rf(c.line, 0), $(j, rf(c.line + 1, 0)));
				k = a.display.shift || j.extend ? ca(j, k, o.anchor, o.head) : o
			} else k = ca(j, k, c);
			e ? l > -1 ? fa(j, l, k, pg) : (l = j.sel.ranges.length, ja(j, X(j.sel.ranges.concat([k]), l), {
				scroll: !1,
				origin: "*mouse"
			})) : (l = 0, ja(j, new V([k], 0), pg), m = j.sel);
			var p = c,
				q = i.wrapper.getBoundingClientRect(),
				s = 0,
				t = ib(a, function(a) {
					ce(a) ? g(a) : h(a)
				}),
				u = ib(a, h);
			ig(document, "mousemove", t), ig(document, "mouseup", u)
		}

		function Jb(a, b, c, d, e) {
			try {
				var f = b.clientX,
					g = b.clientY
			} catch (b) {
				return !1
			}
			if (f >= Math.floor(a.display.gutters.getBoundingClientRect().right)) return !1;
			d && fg(b);
			var h = a.display,
				i = h.lineDiv.getBoundingClientRect();
			if (g > i.bottom || !he(a, c)) return ae(b);
			g -= i.top - h.viewOffset;
			for (var j = 0; j < a.options.gutters.length; ++j) {
				var k = h.gutters.childNodes[j];
				if (k && k.getBoundingClientRect().right >= f) {
					var l = Kd(a.doc, g),
						m = a.options.gutters[j];
					return e(a, c, a, l, m, b), ae(b)
				}
			}
		}

		function Kb(a, b) {
			return Jb(a, b, "gutterClick", !0, de)
		}

		function Lb(a) {
			var b = this;
			if (!fe(b, a) && !Db(b.display, a)) {
				fg(a), Ze && (Af = +new Date);
				var c = Eb(b, a, !0),
					d = a.dataTransfer.files;
				if (c && !Ab(b))
					if (d && d.length && window.FileReader && window.File)
						for (var e = d.length, f = Array(e), g = 0, h = function(a, d) {
								var h = new FileReader;
								h.onload = ib(b, function() {
									if (f[d] = h.result, ++g == e) {
										c = $(b.doc, c);
										var a = {
											from: c,
											to: c,
											text: Fg(f.join("\n")),
											origin: "paste"
										};
										gc(b.doc, a), ia(b.doc, Y(c, Ff(a)))
									}
								}), h.readAsText(a)
							}, i = 0; e > i; ++i) h(d[i], i);
					else {
						if (b.state.draggingText && b.doc.sel.contains(c) > -1) return b.state.draggingText(a), void setTimeout(re(yb, b), 20);
						try {
							var f = a.dataTransfer.getData("Text");
							if (f) {
								if (b.state.draggingText && !(kf ? a.metaKey : a.ctrlKey)) var j = b.listSelections();
								if (ka(b.doc, Y(c, c)), j)
									for (var i = 0; i < j.length; ++i) mc(b.doc, "", j[i].anchor, j[i].head, "drag");
								b.replaceSelection(f, "around", "paste"), yb(b)
							}
						} catch (a) {}
					}
			}
		}

		function Mb(a, b) {
			if (Ze && (!a.state.draggingText || +new Date - Af < 100)) return void hg(b);
			if (!fe(a, b) && !Db(a.display, b) && (b.dataTransfer.setData("Text", a.getSelection()), b.dataTransfer.setDragImage && !df)) {
				var c = ve("img", null, null, "position: fixed; left: 0; top: 0;");
				c.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", cf && (c.width = c.height = 1, a.display.wrapper.appendChild(c), c._top = c.offsetTop), b.dataTransfer.setDragImage(c, 0, 0), cf && c.parentNode.removeChild(c)
			}
		}

		function Nb(a, b) {
			Math.abs(a.doc.scrollTop - b) < 2 || (a.doc.scrollTop = b, We || z(a, {
				top: b
			}), a.display.scroller.scrollTop != b && (a.display.scroller.scrollTop = b), a.display.scrollbarV.scrollTop != b && (a.display.scrollbarV.scrollTop = b), We && z(a), va(a, 100))
		}

		function Ob(a, b, c) {
			(c ? b == a.doc.scrollLeft : Math.abs(a.doc.scrollLeft - b) < 2) || (b = Math.min(b, a.display.scroller.scrollWidth - a.display.scroller.clientWidth), a.doc.scrollLeft = b, s(a), a.display.scroller.scrollLeft != b && (a.display.scroller.scrollLeft = b), a.display.scrollbarH.scrollLeft != b && (a.display.scrollbarH.scrollLeft = b))
		}

		function Pb(a, b) {
			var c = b.wheelDeltaX,
				d = b.wheelDeltaY;
			null == c && b.detail && b.axis == b.HORIZONTAL_AXIS && (c = b.detail), null == d && b.detail && b.axis == b.VERTICAL_AXIS ? d = b.detail : null == d && (d = b.wheelDelta);
			var e = a.display,
				f = e.scroller;
			if (c && f.scrollWidth > f.clientWidth || d && f.scrollHeight > f.clientHeight) {
				if (d && kf && _e) a: for (var g = b.target, h = e.view; g != f; g = g.parentNode)
					for (var i = 0; i < h.length; i++)
						if (h[i].node == g) {
							a.display.currentWheelTarget = g;
							break a
						}
				if (c && !We && !cf && null != Cf) return d && Nb(a, Math.max(0, Math.min(f.scrollTop + d * Cf, f.scrollHeight - f.clientHeight))), Ob(a, Math.max(0, Math.min(f.scrollLeft + c * Cf, f.scrollWidth - f.clientWidth))), fg(b), void(e.wheelStartX = null);
				if (d && null != Cf) {
					var j = d * Cf,
						k = a.doc.scrollTop,
						l = k + e.wrapper.clientHeight;
					0 > j ? k = Math.max(0, k + j - 50) : l = Math.min(a.doc.height, l + j + 50), z(a, {
						top: k,
						bottom: l
					})
				}
				20 > Bf && (null == e.wheelStartX ? (e.wheelStartX = f.scrollLeft, e.wheelStartY = f.scrollTop, e.wheelDX = c, e.wheelDY = d, setTimeout(function() {
					if (null != e.wheelStartX) {
						var a = f.scrollLeft - e.wheelStartX,
							b = f.scrollTop - e.wheelStartY,
							c = b && e.wheelDY && b / e.wheelDY || a && e.wheelDX && a / e.wheelDX;
						e.wheelStartX = e.wheelStartY = null, c && (Cf = (Cf * Bf + c) / (Bf + 1), ++Bf)
					}
				}, 200)) : (e.wheelDX += c, e.wheelDY += d))
			}
		}

		function Qb(a, b, c) {
			if ("string" == typeof b && (b = Qf[b], !b)) return !1;
			a.display.pollingFast && wb(a) && (a.display.pollingFast = !1);
			var d = a.display.shift,
				e = !1;
			try {
				Ab(a) && (a.state.suppressEdits = !0), c && (a.display.shift = !1), e = b(a) != ng
			} finally {
				a.display.shift = d, a.state.suppressEdits = !1
			}
			return e
		}

		function Rb(a, b, c) {
			for (var d = 0; d < a.state.keyMaps.length; d++) {
				var e = Sf(b, a.state.keyMaps[d], c);
				if (e) return e
			}
			return a.options.extraKeys && Sf(b, a.options.extraKeys, c) || Sf(b, a.options.keyMap, c)
		}

		function Sb(a, b, c, d) {
			var e = a.state.keySeq;
			if (e) {
				if (Tf(b)) return "handled";
				Df.set(50, function() {
					a.state.keySeq == e && (a.state.keySeq = null, xb(a))
				}), b = e + " " + b
			}
			var f = Rb(a, b, d);
			return "multi" == f && (a.state.keySeq = b), "handled" == f && de(a, "keyHandled", a, b, c), ("handled" == f || "multi" == f) && (fg(c), ua(a)), e && !f && /\'$/.test(b) ? (fg(c), !0) : !! f
		}

		function Tb(a, b) {
			var c = Uf(b, !0);
			return c ? b.shiftKey && !a.state.keySeq ? Sb(a, "Shift-" + c, b, function(b) {
				return Qb(a, b, !0)
			}) || Sb(a, c, b, function(b) {
				return ("string" == typeof b ? /^go[A-Z]/.test(b) : b.motion) ? Qb(a, b) : void 0
			}) : Sb(a, c, b, function(b) {
				return Qb(a, b)
			}) : !1
		}

		function Ub(a, b, c) {
			return Sb(a, "'" + c + "'", b, function(b) {
				return Qb(a, b, !0)
			})
		}

		function Vb(a) {
			var b = this;
			if (zb(b), !fe(b, a)) {
				Ze && 11 > $e && 27 == a.keyCode && (a.returnValue = !1);
				var c = a.keyCode;
				b.display.shift = 16 == c || a.shiftKey;
				var d = Tb(b, a);
				cf && (Ef = d ? c : null, !d && 88 == c && !Hg && (kf ? a.metaKey : a.ctrlKey) && b.replaceSelection("", null, "cut")), 18 != c || /\bCodeMirror-crosshair\b/.test(b.display.lineDiv.className) || Wb(b)
			}
		}

		function Wb(a) {
			function b(a) {
				18 != a.keyCode && a.altKey || (Bg(c, "CodeMirror-crosshair"), jg(document, "keyup", b), jg(document, "mouseover", b))
			}
			var c = a.display.lineDiv;
			Cg(c, "CodeMirror-crosshair"), ig(document, "keyup", b), ig(document, "mouseover", b)
		}

		function Xb(a) {
			16 == a.keyCode && (this.doc.sel.shift = !1), fe(this, a)
		}

		function Yb(a) {
			var b = this;
			if (!(fe(b, a) || a.ctrlKey && !a.altKey || kf && a.metaKey)) {
				var c = a.keyCode,
					d = a.charCode;
				if (cf && c == Ef) return Ef = null, void fg(a);
				if (!(cf && (!a.which || a.which < 10) || ef) || !Tb(b, a)) {
					var e = String.fromCharCode(null == d ? c : d);
					Ub(b, a, e) || (Ze && $e >= 9 && (b.display.inputHasSelection = null), vb(b))
				}
			}
		}

		function Zb(a) {
			"nocursor" != a.options.readOnly && (a.state.focused || (kg(a, "focus", a), a.state.focused = !0, Cg(a.display.wrapper, "CodeMirror-focused"), a.curOp || a.display.selForContextMenu == a.doc.sel || (xb(a), _e && setTimeout(re(xb, a, !0), 0))), ub(a), ua(a))
		}

		function $b(a) {
			a.state.focused && (kg(a, "blur", a), a.state.focused = !1, Bg(a.display.wrapper, "CodeMirror-focused")), clearInterval(a.display.blinker), setTimeout(function() {
				a.state.focused || (a.display.shift = !1)
			}, 150)
		}

		function _b(a, b) {
			function c() {
				if (null != e.input.selectionStart) {
					var b = a.somethingSelected(),
						c = e.input.value = "​" + (b ? e.input.value : "");
					e.prevInput = b ? "" : "​", e.input.selectionStart = 1, e.input.selectionEnd = c.length, e.selForContextMenu = a.doc.sel
				}
			}

			function d() {
				if (e.inputDiv.style.position = "relative", e.input.style.cssText = i, Ze && 9 > $e && (e.scrollbarV.scrollTop = e.scroller.scrollTop = g), ub(a), null != e.input.selectionStart) {
					(!Ze || Ze && 9 > $e) && c();
					var b = 0,
						d = function() {
							e.selForContextMenu == a.doc.sel && 0 == e.input.selectionStart ? ib(a, Qf.selectAll)(a) : b++ < 10 ? e.detectingSelectAll = setTimeout(d, 500) : xb(a)
						};
					e.detectingSelectAll = setTimeout(d, 200)
				}
			}
			if (!fe(a, b, "contextmenu")) {
				var e = a.display;
				if (!Db(e, b) && !ac(a, b)) {
					var f = Eb(a, b),
						g = e.scroller.scrollTop;
					if (f && !cf) {
						var h = a.options.resetSelectionOnContextMenu;
						h && -1 == a.doc.sel.contains(f) && ib(a, ja)(a.doc, Y(f), og);
						var i = e.input.style.cssText;
						if (e.inputDiv.style.position = "absolute", e.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (b.clientY - 5) + "px; left: " + (b.clientX - 5) + "px; z-index: 1000; background: " + (Ze ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", _e) var j = window.scrollY;
						if (yb(a), _e && window.scrollTo(null, j), xb(a), a.somethingSelected() || (e.input.value = e.prevInput = " "), e.selForContextMenu = a.doc.sel, clearTimeout(e.detectingSelectAll), Ze && $e >= 9 && c(), of) {
							hg(b);
							var k = function() {
								jg(window, "mouseup", k), setTimeout(d, 20)
							};
							ig(window, "mouseup", k)
						} else setTimeout(d, 50)
					}
				}
			}
		}

		function ac(a, b) {
			return he(a, "gutterContextMenu") ? Jb(a, b, "gutterContextMenu", !1, kg) : !1
		}

		function bc(a, b) {
			if (sf(a, b.from) < 0) return a;
			if (sf(a, b.to) <= 0) return Ff(b);
			var c = a.line + b.text.length - (b.to.line - b.from.line) - 1,
				d = a.ch;
			return a.line == b.to.line && (d += Ff(b).ch - b.to.ch), rf(c, d)
		}

		function cc(a, b) {
			for (var c = [], d = 0; d < a.sel.ranges.length; d++) {
				var e = a.sel.ranges[d];
				c.push(new W(bc(e.anchor, b), bc(e.head, b)))
			}
			return X(c, a.sel.primIndex)
		}

		function dc(a, b, c) {
			return a.line == b.line ? rf(c.line, a.ch - b.ch + c.ch) : rf(c.line + (a.line - b.line), a.ch)
		}

		function ec(a, b, c) {
			for (var d = [], e = rf(a.first, 0), f = e, g = 0; g < b.length; g++) {
				var h = b[g],
					i = dc(h.from, e, f),
					j = dc(Ff(h), e, f);
				if (e = h.to, f = j, "around" == c) {
					var k = a.sel.ranges[g],
						l = sf(k.head, k.anchor) < 0;
					d[g] = new W(l ? j : i, l ? i : j)
				} else d[g] = new W(i, i)
			}
			return new V(d, a.sel.primIndex)
		}

		function fc(a, b, c) {
			var d = {
				canceled: !1,
				from: b.from,
				to: b.to,
				text: b.text,
				origin: b.origin,
				cancel: function() {
					this.canceled = !0
				}
			};
			return c && (d.update = function(b, c, d, e) {
				b && (this.from = $(a, b)), c && (this.to = $(a, c)), d && (this.text = d), void 0 !== e && (this.origin = e)
			}), kg(a, "beforeChange", a, d), a.cm && kg(a.cm, "beforeChange", a.cm, d), d.canceled ? null : {
				from: d.from,
				to: d.to,
				text: d.text,
				origin: d.origin
			}
		}

		function gc(a, b, c) {
			if (a.cm) {
				if (!a.cm.curOp) return ib(a.cm, gc)(a, b, c);
				if (a.cm.state.suppressEdits) return
			}
			if (!(he(a, "beforeChange") || a.cm && he(a.cm, "beforeChange")) || (b = fc(a, b, !0))) {
				var d = pf && !c && Qc(a, b.from, b.to);
				if (d)
					for (var e = d.length - 1; e >= 0; --e) hc(a, {
						from: d[e].from,
						to: d[e].to,
						text: e ? [""] : b.text
					});
				else hc(a, b)
			}
		}

		function hc(a, b) {
			if (1 != b.text.length || "" != b.text[0] || 0 != sf(b.from, b.to)) {
				var c = cc(a, b);
				Rd(a, b, c, a.cm ? a.cm.curOp.id : 0 / 0), kc(a, b, c, Nc(a, b));
				var d = [];
				Dd(a, function(a, c) {
					c || -1 != ne(d, a.history) || (_d(a.history, b), d.push(a.history)), kc(a, b, null, Nc(a, b))
				})
			}
		}

		function ic(a, b, c) {
			if (!a.cm || !a.cm.state.suppressEdits) {
				for (var d, e = a.history, f = a.sel, g = "undo" == b ? e.done : e.undone, h = "undo" == b ? e.undone : e.done, i = 0; i < g.length && (d = g[i], c ? !d.ranges || d.equals(a.sel) : d.ranges); i++);
				if (i != g.length) {
					for (e.lastOrigin = e.lastSelOrigin = null; d = g.pop(), d.ranges;) {
						if (Ud(d, h), c && !d.equals(a.sel)) return void ja(a, d, {
							clearRedo: !1
						});
						f = d
					}
					var j = [];
					Ud(f, h), h.push({
						changes: j,
						generation: e.generation
					}), e.generation = d.generation || ++e.maxGeneration;
					for (var k = he(a, "beforeChange") || a.cm && he(a.cm, "beforeChange"), i = d.changes.length - 1; i >= 0; --i) {
						var l = d.changes[i];
						if (l.origin = b, k && !fc(a, l, !1)) return void(g.length = 0);
						j.push(Od(a, l));
						var m = i ? cc(a, l) : me(g);
						kc(a, l, m, Pc(a, l)), !i && a.cm && a.cm.scrollIntoView({
							from: l.from,
							to: Ff(l)
						});
						var n = [];
						Dd(a, function(a, b) {
							b || -1 != ne(n, a.history) || (_d(a.history, l), n.push(a.history)), kc(a, l, null, Pc(a, l))
						})
					}
				}
			}
		}

		function jc(a, b) {
			if (0 != b && (a.first += b, a.sel = new V(oe(a.sel.ranges, function(a) {
				return new W(rf(a.anchor.line + b, a.anchor.ch), rf(a.head.line + b, a.head.ch))
			}), a.sel.primIndex), a.cm)) {
				nb(a.cm, a.first, a.first - b, b);
				for (var c = a.cm.display, d = c.viewFrom; d < c.viewTo; d++) ob(a.cm, d, "gutter")
			}
		}

		function kc(a, b, c, d) {
			if (a.cm && !a.cm.curOp) return ib(a.cm, kc)(a, b, c, d);
			if (b.to.line < a.first) return void jc(a, b.text.length - 1 - (b.to.line - b.from.line));
			if (!(b.from.line > a.lastLine())) {
				if (b.from.line < a.first) {
					var e = b.text.length - 1 - (a.first - b.from.line);
					jc(a, e), b = {
						from: rf(a.first, 0),
						to: rf(b.to.line + e, b.to.ch),
						text: [me(b.text)],
						origin: b.origin
					}
				}
				var f = a.lastLine();
				b.to.line > f && (b = {
					from: b.from,
					to: rf(f, Fd(a, f).text.length),
					text: [b.text[0]],
					origin: b.origin
				}), b.removed = Gd(a, b.from, b.to), c || (c = cc(a, b)), a.cm ? lc(a.cm, b, d) : Ad(a, b, d), ka(a, c, og)
			}
		}

		function lc(a, b, c) {
			var d = a.doc,
				e = a.display,
				g = b.from,
				h = b.to,
				i = !1,
				j = g.line;
			a.options.lineWrapping || (j = Jd($c(Fd(d, g.line))), d.iter(j, h.line + 1, function(a) {
				return a == e.maxLine ? (i = !0, !0) : void 0
			})), d.sel.contains(b.from, b.to) > -1 && ge(a), Ad(d, b, c, f(a)), a.options.lineWrapping || (d.iter(j, g.line + b.text.length, function(a) {
				var b = l(a);
				b > e.maxLineLength && (e.maxLine = a, e.maxLineLength = b, e.maxLineChanged = !0, i = !1)
			}), i && (a.curOp.updateMaxLine = !0)), d.frontier = Math.min(d.frontier, g.line), va(a, 400);
			var k = b.text.length - (h.line - g.line) - 1;
			g.line != h.line || 1 != b.text.length || zd(a.doc, b) ? nb(a, g.line, h.line + 1, k) : ob(a, g.line, "text");
			var m = he(a, "changes"),
				n = he(a, "change");
			if (n || m) {
				var o = {
					from: g,
					to: h,
					text: b.text,
					removed: b.removed,
					origin: b.origin
				};
				n && de(a, "change", a, o), m && (a.curOp.changeObjs || (a.curOp.changeObjs = [])).push(o)
			}
			a.display.selForContextMenu = null
		}

		function mc(a, b, c, d, e) {
			if (d || (d = c), sf(d, c) < 0) {
				var f = d;
				d = c, c = f
			}
			"string" == typeof b && (b = Fg(b)), gc(a, {
				from: c,
				to: d,
				text: b,
				origin: e
			})
		}

		function nc(a, b) {
			if (!fe(a, "scrollCursorIntoView")) {
				var c = a.display,
					d = c.sizer.getBoundingClientRect(),
					e = null;
				if (b.top + d.top < 0 ? e = !0 : b.bottom + d.top > (window.innerHeight || document.documentElement.clientHeight) && (e = !1), null != e && !gf) {
					var f = ve("div", "​", null, "position: absolute; top: " + (b.top - c.viewOffset - za(a.display)) + "px; height: " + (b.bottom - b.top + mg) + "px; left: " + b.left + "px; width: 2px;");
					a.display.lineSpace.appendChild(f), f.scrollIntoView(e), a.display.lineSpace.removeChild(f)
				}
			}
		}

		function oc(a, b, c, d) {
			null == d && (d = 0);
			for (var e = 0; 5 > e; e++) {
				var f = !1,
					g = Ta(a, b),
					h = c && c != b ? Ta(a, c) : g,
					i = qc(a, Math.min(g.left, h.left), Math.min(g.top, h.top) - d, Math.max(g.left, h.left), Math.max(g.bottom, h.bottom) + d),
					j = a.doc.scrollTop,
					k = a.doc.scrollLeft;
				if (null != i.scrollTop && (Nb(a, i.scrollTop), Math.abs(a.doc.scrollTop - j) > 1 && (f = !0)), null != i.scrollLeft && (Ob(a, i.scrollLeft), Math.abs(a.doc.scrollLeft - k) > 1 && (f = !0)), !f) return g
			}
		}

		function pc(a, b, c, d, e) {
			var f = qc(a, b, c, d, e);
			null != f.scrollTop && Nb(a, f.scrollTop), null != f.scrollLeft && Ob(a, f.scrollLeft)
		}

		function qc(a, b, c, d, e) {
			var f = a.display,
				g = Ya(a.display);
			0 > c && (c = 0);
			var h = a.curOp && null != a.curOp.scrollTop ? a.curOp.scrollTop : f.scroller.scrollTop,
				i = f.scroller.clientHeight - mg,
				j = {};
			e - c > i && (e = c + i);
			var k = a.doc.height + Aa(f),
				l = g > c,
				m = e > k - g;
			if (h > c) j.scrollTop = l ? 0 : c;
			else if (e > h + i) {
				var n = Math.min(c, (m ? k : e) - i);
				n != h && (j.scrollTop = n)
			}
			var o = a.curOp && null != a.curOp.scrollLeft ? a.curOp.scrollLeft : f.scroller.scrollLeft,
				p = f.scroller.clientWidth - mg - f.gutters.offsetWidth,
				q = d - b > p;
			return q && (d = b + p), 10 > b ? j.scrollLeft = 0 : o > b ? j.scrollLeft = Math.max(0, b - (q ? 0 : 10)) : d > p + o - 3 && (j.scrollLeft = d + (q ? 0 : 10) - p), j
		}

		function rc(a, b, c) {
			(null != b || null != c) && tc(a), null != b && (a.curOp.scrollLeft = (null == a.curOp.scrollLeft ? a.doc.scrollLeft : a.curOp.scrollLeft) + b), null != c && (a.curOp.scrollTop = (null == a.curOp.scrollTop ? a.doc.scrollTop : a.curOp.scrollTop) + c)
		}

		function sc(a) {
			tc(a);
			var b = a.getCursor(),
				c = b,
				d = b;
			a.options.lineWrapping || (c = b.ch ? rf(b.line, b.ch - 1) : b, d = rf(b.line, b.ch + 1)), a.curOp.scrollToPos = {
				from: c,
				to: d,
				margin: a.options.cursorScrollMargin,
				isCursor: !0
			}
		}

		function tc(a) {
			var b = a.curOp.scrollToPos;
			if (b) {
				a.curOp.scrollToPos = null;
				var c = Ua(a, b.from),
					d = Ua(a, b.to),
					e = qc(a, Math.min(c.left, d.left), Math.min(c.top, d.top) - b.margin, Math.max(c.right, d.right), Math.max(c.bottom, d.bottom) + b.margin);
				a.scrollTo(e.scrollLeft, e.scrollTop)
			}
		}

		function uc(a, b, c, d) {
			var e, f = a.doc;
			null == c && (c = "add"), "smart" == c && (f.mode.indent ? e = ya(a, b) : c = "prev");
			var g = a.options.tabSize,
				h = Fd(f, b),
				i = rg(h.text, null, g);
			h.stateAfter && (h.stateAfter = null);
			var j, k = h.text.match(/^\s*/)[0];
			if (d || /\S/.test(h.text)) {
				if ("smart" == c && (j = f.mode.indent(e, h.text.slice(k.length), h.text), j == ng || j > 150)) {
					if (!d) return;
					c = "prev"
				}
			} else j = 0, c = "not";
			"prev" == c ? j = b > f.first ? rg(Fd(f, b - 1).text, null, g) : 0 : "add" == c ? j = i + a.options.indentUnit : "subtract" == c ? j = i - a.options.indentUnit : "number" == typeof c && (j = i + c), j = Math.max(0, j);
			var l = "",
				m = 0;
			if (a.options.indentWithTabs)
				for (var n = Math.floor(j / g); n; --n) m += g, l += "	";
			if (j > m && (l += le(j - m)), l != k) mc(f, l, rf(b, 0), rf(b, k.length), "+input");
			else
				for (var n = 0; n < f.sel.ranges.length; n++) {
					var o = f.sel.ranges[n];
					if (o.head.line == b && o.head.ch < k.length) {
						var m = rf(b, k.length);
						fa(f, n, new W(m, m));
						break
					}
				}
			h.stateAfter = null
		}

		function vc(a, b, c, d) {
			var e = b,
				f = b;
			return "number" == typeof b ? f = Fd(a, Z(a, b)) : e = Jd(b), null == e ? null : (d(f, e) && a.cm && ob(a.cm, e, c), f)
		}

		function wc(a, b) {
			for (var c = a.doc.sel.ranges, d = [], e = 0; e < c.length; e++) {
				for (var f = b(c[e]); d.length && sf(f.from, me(d).to) <= 0;) {
					var g = d.pop();
					if (sf(g.from, f.from) < 0) {
						f.from = g.from;
						break
					}
				}
				d.push(f)
			}
			hb(a, function() {
				for (var b = d.length - 1; b >= 0; b--) mc(a.doc, "", d[b].from, d[b].to, "+delete");
				sc(a)
			})
		}

		function xc(a, b, c, d, e) {
			function f() {
				var b = h + c;
				return b < a.first || b >= a.first + a.size ? l = !1 : (h = b, k = Fd(a, b))
			}

			function g(a) {
				var b = (e ? Ue : Ve)(k, i, c, !0);
				if (null == b) {
					if (a || !f()) return l = !1;
					i = e ? (0 > c ? Ne : Me)(k) : 0 > c ? k.text.length : 0
				} else i = b;
				return !0
			}
			var h = b.line,
				i = b.ch,
				j = c,
				k = Fd(a, h),
				l = !0;
			if ("char" == d) g();
			else if ("column" == d) g(!0);
			else if ("word" == d || "group" == d)
				for (var m = null, n = "group" == d, o = a.cm && a.cm.getHelper(b, "wordChars"), p = !0; !(0 > c) || g(!p); p = !1) {
					var q = k.text.charAt(i) || "\n",
						r = se(q, o) ? "w" : n && "\n" == q ? "n" : !n || /\s/.test(q) ? null : "p";
					if (!n || p || r || (r = "s"), m && m != r) {
						0 > c && (c = 1, g());
						break
					}
					if (r && (m = r), c > 0 && !g(!p)) break
				}
			var s = oa(a, rf(h, i), j, !0);
			return l || (s.hitSide = !0), s
		}

		function yc(a, b, c, d) {
			var e, f = a.doc,
				g = b.left;
			if ("page" == d) {
				var h = Math.min(a.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
				e = b.top + c * (h - (0 > c ? 1.5 : .5) * Ya(a.display))
			} else "line" == d && (e = c > 0 ? b.bottom + 3 : b.top - 3);
			for (;;) {
				var i = Wa(a, g, e);
				if (!i.outside) break;
				if (0 > c ? 0 >= e : e >= f.height) {
					i.hitSide = !0;
					break
				}
				e += 5 * c
			}
			return i
		}

		function zc(b, c, d, e) {
			a.defaults[b] = c, d && (Hf[b] = e ? function(a, b, c) {
				c != If && d(a, b, c)
			} : d)
		}

		function Ac(a) {
			for (var b, c, d, e, f = a.split(/-(?!$)/), a = f[f.length - 1], g = 0; g < f.length - 1; g++) {
				var h = f[g];
				if (/^(cmd|meta|m)$/i.test(h)) e = !0;
				else if (/^a(lt)?$/i.test(h)) b = !0;
				else if (/^(c|ctrl|control)$/i.test(h)) c = !0;
				else {
					if (!/^s(hift)$/i.test(h)) throw new Error("Unrecognized modifier name: " + h);
					d = !0
				}
			}
			return b && (a = "Alt-" + a), c && (a = "Ctrl-" + a), e && (a = "Cmd-" + a), d && (a = "Shift-" + a), a
		}

		function Bc(a) {
			return "string" == typeof a ? Rf[a] : a
		}

		function Cc(a, b, c, d, e) {
			if (d && d.shared) return Dc(a, b, c, d, e);
			if (a.cm && !a.cm.curOp) return ib(a.cm, Cc)(a, b, c, d, e);
			var f = new Wf(a, e),
				g = sf(b, c);
			if (d && qe(d, f, !1), g > 0 || 0 == g && f.clearWhenEmpty !== !1) return f;
			if (f.replacedWith && (f.collapsed = !0, f.widgetNode = ve("span", [f.replacedWith], "CodeMirror-widget"), d.handleMouseEvents || (f.widgetNode.ignoreEvents = !0), d.insertLeft && (f.widgetNode.insertLeft = !0)), f.collapsed) {
				if (Zc(a, b.line, b, c, f) || b.line != c.line && Zc(a, c.line, b, c, f)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
				qf = !0
			}
			f.addToHistory && Rd(a, {
				from: b,
				to: c,
				origin: "markText"
			}, a.sel, 0 / 0);
			var h, i = b.line,
				j = a.cm;
			if (a.iter(i, c.line + 1, function(a) {
				j && f.collapsed && !j.options.lineWrapping && $c(a) == j.display.maxLine && (h = !0), f.collapsed && i != b.line && Id(a, 0), Kc(a, new Hc(f, i == b.line ? b.ch : null, i == c.line ? c.ch : null)), ++i
			}), f.collapsed && a.iter(b.line, c.line + 1, function(b) {
				cd(a, b) && Id(b, 0)
			}), f.clearOnEnter && ig(f, "beforeCursorEnter", function() {
				f.clear()
			}), f.readOnly && (pf = !0, (a.history.done.length || a.history.undone.length) && a.clearHistory()), f.collapsed && (f.id = ++Xf, f.atomic = !0), j) {
				if (h && (j.curOp.updateMaxLine = !0), f.collapsed) nb(j, b.line, c.line + 1);
				else if (f.className || f.title || f.startStyle || f.endStyle)
					for (var k = b.line; k <= c.line; k++) ob(j, k, "text");
				f.atomic && ma(j.doc), de(j, "markerAdded", j, f)
			}
			return f
		}

		function Dc(a, b, c, d, e) {
			d = qe(d), d.shared = !1;
			var f = [Cc(a, b, c, d, e)],
				g = f[0],
				h = d.widgetNode;
			return Dd(a, function(a) {
				h && (d.widgetNode = h.cloneNode(!0)), f.push(Cc(a, $(a, b), $(a, c), d, e));
				for (var i = 0; i < a.linked.length; ++i)
					if (a.linked[i].isParent) return;
				g = me(f)
			}), new Yf(f, g)
		}

		function Ec(a) {
			return a.findMarks(rf(a.first, 0), a.clipPos(rf(a.lastLine())), function(a) {
				return a.parent
			})
		}

		function Fc(a, b) {
			for (var c = 0; c < b.length; c++) {
				var d = b[c],
					e = d.find(),
					f = a.clipPos(e.from),
					g = a.clipPos(e.to);
				if (sf(f, g)) {
					var h = Cc(a, f, g, d.primary, d.primary.type);
					d.markers.push(h), h.parent = d
				}
			}
		}

		function Gc(a) {
			for (var b = 0; b < a.length; b++) {
				var c = a[b],
					d = [c.primary.doc];
				Dd(c.primary.doc, function(a) {
					d.push(a)
				});
				for (var e = 0; e < c.markers.length; e++) {
					var f = c.markers[e]; - 1 == ne(d, f.doc) && (f.parent = null, c.markers.splice(e--, 1))
				}
			}
		}

		function Hc(a, b, c) {
			this.marker = a, this.from = b, this.to = c
		}

		function Ic(a, b) {
			if (a)
				for (var c = 0; c < a.length; ++c) {
					var d = a[c];
					if (d.marker == b) return d
				}
		}

		function Jc(a, b) {
			for (var c, d = 0; d < a.length; ++d) a[d] != b && (c || (c = [])).push(a[d]);
			return c
		}

		function Kc(a, b) {
			a.markedSpans = a.markedSpans ? a.markedSpans.concat([b]) : [b], b.marker.attachLine(a)
		}

		function Lc(a, b, c) {
			if (a)
				for (var d, e = 0; e < a.length; ++e) {
					var f = a[e],
						g = f.marker,
						h = null == f.from || (g.inclusiveLeft ? f.from <= b : f.from < b);
					if (h || f.from == b && "bookmark" == g.type && (!c || !f.marker.insertLeft)) {
						var i = null == f.to || (g.inclusiveRight ? f.to >= b : f.to > b);
						(d || (d = [])).push(new Hc(g, f.from, i ? null : f.to))
					}
				}
			return d
		}

		function Mc(a, b, c) {
			if (a)
				for (var d, e = 0; e < a.length; ++e) {
					var f = a[e],
						g = f.marker,
						h = null == f.to || (g.inclusiveRight ? f.to >= b : f.to > b);
					if (h || f.from == b && "bookmark" == g.type && (!c || f.marker.insertLeft)) {
						var i = null == f.from || (g.inclusiveLeft ? f.from <= b : f.from < b);
						(d || (d = [])).push(new Hc(g, i ? null : f.from - b, null == f.to ? null : f.to - b))
					}
				}
			return d
		}

		function Nc(a, b) {
			var c = aa(a, b.from.line) && Fd(a, b.from.line).markedSpans,
				d = aa(a, b.to.line) && Fd(a, b.to.line).markedSpans;
			if (!c && !d) return null;
			var e = b.from.ch,
				f = b.to.ch,
				g = 0 == sf(b.from, b.to),
				h = Lc(c, e, g),
				i = Mc(d, f, g),
				j = 1 == b.text.length,
				k = me(b.text).length + (j ? e : 0);
			if (h)
				for (var l = 0; l < h.length; ++l) {
					var m = h[l];
					if (null == m.to) {
						var n = Ic(i, m.marker);
						n ? j && (m.to = null == n.to ? null : n.to + k) : m.to = e
					}
				}
			if (i)
				for (var l = 0; l < i.length; ++l) {
					var m = i[l];
					if (null != m.to && (m.to += k), null == m.from) {
						var n = Ic(h, m.marker);
						n || (m.from = k, j && (h || (h = [])).push(m))
					} else m.from += k, j && (h || (h = [])).push(m)
				}
			h && (h = Oc(h)), i && i != h && (i = Oc(i));
			var o = [h];
			if (!j) {
				var p, q = b.text.length - 2;
				if (q > 0 && h)
					for (var l = 0; l < h.length; ++l) null == h[l].to && (p || (p = [])).push(new Hc(h[l].marker, null, null));
				for (var l = 0; q > l; ++l) o.push(p);
				o.push(i)
			}
			return o
		}

		function Oc(a) {
			for (var b = 0; b < a.length; ++b) {
				var c = a[b];
				null != c.from && c.from == c.to && c.marker.clearWhenEmpty !== !1 && a.splice(b--, 1)
			}
			return a.length ? a : null
		}

		function Pc(a, b) {
			var c = Xd(a, b),
				d = Nc(a, b);
			if (!c) return d;
			if (!d) return c;
			for (var e = 0; e < c.length; ++e) {
				var f = c[e],
					g = d[e];
				if (f && g) a: for (var h = 0; h < g.length; ++h) {
					for (var i = g[h], j = 0; j < f.length; ++j)
						if (f[j].marker == i.marker) continue a;
					f.push(i)
				} else g && (c[e] = g)
			}
			return c
		}

		function Qc(a, b, c) {
			var d = null;
			if (a.iter(b.line, c.line + 1, function(a) {
				if (a.markedSpans)
					for (var b = 0; b < a.markedSpans.length; ++b) {
						var c = a.markedSpans[b].marker;
						!c.readOnly || d && -1 != ne(d, c) || (d || (d = [])).push(c)
					}
			}), !d) return null;
			for (var e = [{
				from: b,
				to: c
			}], f = 0; f < d.length; ++f)
				for (var g = d[f], h = g.find(0), i = 0; i < e.length; ++i) {
					var j = e[i];
					if (!(sf(j.to, h.from) < 0 || sf(j.from, h.to) > 0)) {
						var k = [i, 1],
							l = sf(j.from, h.from),
							m = sf(j.to, h.to);
						(0 > l || !g.inclusiveLeft && !l) && k.push({
								from: j.from,
								to: h.from
							}), (m > 0 || !g.inclusiveRight && !m) && k.push({
								from: h.to,
								to: j.to
							}), e.splice.apply(e, k), i += k.length - 1
					}
				}
			return e
		}

		function Rc(a) {
			var b = a.markedSpans;
			if (b) {
				for (var c = 0; c < b.length; ++c) b[c].marker.detachLine(a);
				a.markedSpans = null
			}
		}

		function Sc(a, b) {
			if (b) {
				for (var c = 0; c < b.length; ++c) b[c].marker.attachLine(a);
				a.markedSpans = b
			}
		}

		function Tc(a) {
			return a.inclusiveLeft ? -1 : 0
		}

		function Uc(a) {
			return a.inclusiveRight ? 1 : 0
		}

		function Vc(a, b) {
			var c = a.lines.length - b.lines.length;
			if (0 != c) return c;
			var d = a.find(),
				e = b.find(),
				f = sf(d.from, e.from) || Tc(a) - Tc(b);
			if (f) return -f;
			var g = sf(d.to, e.to) || Uc(a) - Uc(b);
			return g ? g : b.id - a.id
		}

		function Wc(a, b) {
			var c, d = qf && a.markedSpans;
			if (d)
				for (var e, f = 0; f < d.length; ++f) e = d[f], e.marker.collapsed && null == (b ? e.from : e.to) && (!c || Vc(c, e.marker) < 0) && (c = e.marker);
			return c
		}

		function Xc(a) {
			return Wc(a, !0)
		}

		function Yc(a) {
			return Wc(a, !1)
		}

		function Zc(a, b, c, d, e) {
			var f = Fd(a, b),
				g = qf && f.markedSpans;
			if (g)
				for (var h = 0; h < g.length; ++h) {
					var i = g[h];
					if (i.marker.collapsed) {
						var j = i.marker.find(0),
							k = sf(j.from, c) || Tc(i.marker) - Tc(e),
							l = sf(j.to, d) || Uc(i.marker) - Uc(e);
						if (!(k >= 0 && 0 >= l || 0 >= k && l >= 0) && (0 >= k && (sf(j.to, c) > 0 || i.marker.inclusiveRight && e.inclusiveLeft) || k >= 0 && (sf(j.from, d) < 0 || i.marker.inclusiveLeft && e.inclusiveRight))) return !0
					}
				}
		}

		function $c(a) {
			for (var b; b = Xc(a);) a = b.find(-1, !0).line;
			return a
		}

		function _c(a) {
			for (var b, c; b = Yc(a);) a = b.find(1, !0).line, (c || (c = [])).push(a);
			return c
		}

		function ad(a, b) {
			var c = Fd(a, b),
				d = $c(c);
			return c == d ? b : Jd(d)
		}

		function bd(a, b) {
			if (b > a.lastLine()) return b;
			var c, d = Fd(a, b);
			if (!cd(a, d)) return b;
			for (; c = Yc(d);) d = c.find(1, !0).line;
			return Jd(d) + 1
		}

		function cd(a, b) {
			var c = qf && b.markedSpans;
			if (c)
				for (var d, e = 0; e < c.length; ++e)
					if (d = c[e], d.marker.collapsed) {
						if (null == d.from) return !0;
						if (!d.marker.widgetNode && 0 == d.from && d.marker.inclusiveLeft && dd(a, b, d)) return !0
					}
		}

		function dd(a, b, c) {
			if (null == c.to) {
				var d = c.marker.find(1, !0);
				return dd(a, d.line, Ic(d.line.markedSpans, c.marker))
			}
			if (c.marker.inclusiveRight && c.to == b.text.length) return !0;
			for (var e, f = 0; f < b.markedSpans.length; ++f)
				if (e = b.markedSpans[f], e.marker.collapsed && !e.marker.widgetNode && e.from == c.to && (null == e.to || e.to != c.from) && (e.marker.inclusiveLeft || c.marker.inclusiveRight) && dd(a, b, e)) return !0
		}

		function ed(a, b, c) {
			Ld(b) < (a.curOp && a.curOp.scrollTop || a.doc.scrollTop) && rc(a, null, c)
		}

		function fd(a) {
			if (null != a.height) return a.height;
			if (!ye(document.body, a.node)) {
				var b = "position: relative;";
				a.coverGutter && (b += "margin-left: -" + a.cm.getGutterElement().offsetWidth + "px;"), xe(a.cm.display.measure, ve("div", [a.node], null, b))
			}
			return a.height = a.node.offsetHeight
		}

		function gd(a, b, c, d) {
			var e = new Zf(a, c, d);
			return e.noHScroll && (a.display.alignWidgets = !0), vc(a.doc, b, "widget", function(b) {
				var c = b.widgets || (b.widgets = []);
				if (null == e.insertAt ? c.push(e) : c.splice(Math.min(c.length - 1, Math.max(0, e.insertAt)), 0, e), e.line = b, !cd(a.doc, b)) {
					var d = Ld(b) < a.doc.scrollTop;
					Id(b, b.height + fd(e)), d && rc(a, null, e.height), a.curOp.forceUpdate = !0
				}
				return !0
			}), e
		}

		function hd(a, b, c, d) {
			a.text = b, a.stateAfter && (a.stateAfter = null), a.styles && (a.styles = null), null != a.order && (a.order = null), Rc(a), Sc(a, c);
			var e = d ? d(a) : 1;
			e != a.height && Id(a, e)
		}

		function id(a) {
			a.parent = null, Rc(a)
		}

		function jd(a, b) {
			if (a)
				for (;;) {
					var c = a.match(/(?:^|\s+)line-(background-)?(\S+)/);
					if (!c) break;
					a = a.slice(0, c.index) + a.slice(c.index + c[0].length);
					var d = c[1] ? "bgClass" : "textClass";
					null == b[d] ? b[d] = c[2] : new RegExp("(?:^|s)" + c[2] + "(?:$|s)").test(b[d]) || (b[d] += " " + c[2])
				}
			return a
		}

		function kd(b, c) {
			if (b.blankLine) return b.blankLine(c);
			if (b.innerMode) {
				var d = a.innerMode(b, c);
				return d.mode.blankLine ? d.mode.blankLine(d.state) : void 0
			}
		}

		function ld(b, c, d, e) {
			for (var f = 0; 10 > f; f++) {
				e && (e[0] = a.innerMode(b, d).mode);
				var g = b.token(c, d);
				if (c.pos > c.start) return g
			}
			throw new Error("Mode " + b.name + " failed to advance stream.")
		}

		function md(a, b, c, d) {
			function e(a) {
				return {
					start: l.start,
					end: l.pos,
					string: l.current(),
					type: f || null,
					state: a ? Of(g.mode, k) : k
				}
			}
			var f, g = a.doc,
				h = g.mode;
			b = $(g, b);
			var i, j = Fd(g, b.line),
				k = ya(a, b.line, c),
				l = new Vf(j.text, a.options.tabSize);
			for (d && (i = []);
				(d || l.pos < b.ch) && !l.eol();) l.start = l.pos, f = ld(h, l, k), d && i.push(e(!0));
			return d ? i : e()
		}

		function nd(a, b, c, d, e, f, g) {
			var h = c.flattenSpans;
			null == h && (h = a.options.flattenSpans);
			var i, j = 0,
				k = null,
				l = new Vf(b, a.options.tabSize),
				m = a.options.addModeClass && [null];
			for ("" == b && jd(kd(c, d), f); !l.eol();) {
				if (l.pos > a.options.maxHighlightLength ? (h = !1, g && qd(a, b, d, l.pos), l.pos = b.length, i = null) : i = jd(ld(c, l, d, m), f), m) {
					var n = m[0].name;
					n && (i = "m-" + (i ? n + " " + i : n))
				}
				h && k == i || (j < l.start && e(l.start, k), j = l.start, k = i), l.start = l.pos
			}
			for (; j < l.pos;) {
				var o = Math.min(l.pos, j + 5e4);
				e(o, k), j = o
			}
		}

		function od(a, b, c, d) {
			var e = [a.state.modeGen],
				f = {};
			nd(a, b.text, a.doc.mode, c, function(a, b) {
				e.push(a, b)
			}, f, d);
			for (var g = 0; g < a.state.overlays.length; ++g) {
				var h = a.state.overlays[g],
					i = 1,
					j = 0;
				nd(a, b.text, h.mode, !0, function(a, b) {
					for (var c = i; a > j;) {
						var d = e[i];
						d > a && e.splice(i, 1, a, e[i + 1], d), i += 2, j = Math.min(a, d)
					}
					if (b)
						if (h.opaque) e.splice(c, i - c, a, "cm-overlay " + b), i = c + 2;
						else
							for (; i > c; c += 2) {
								var f = e[c + 1];
								e[c + 1] = (f ? f + " " : "") + "cm-overlay " + b
							}
				}, f)
			}
			return {
				styles: e,
				classes: f.bgClass || f.textClass ? f : null
			}
		}

		function pd(a, b, c) {
			if (!b.styles || b.styles[0] != a.state.modeGen) {
				var d = od(a, b, b.stateAfter = ya(a, Jd(b)));
				b.styles = d.styles, d.classes ? b.styleClasses = d.classes : b.styleClasses && (b.styleClasses = null), c === a.doc.frontier && a.doc.frontier++
			}
			return b.styles
		}

		function qd(a, b, c, d) {
			var e = a.doc.mode,
				f = new Vf(b, a.options.tabSize);
			for (f.start = f.pos = d || 0, "" == b && kd(e, c); !f.eol() && f.pos <= a.options.maxHighlightLength;) ld(e, f, c), f.start = f.pos
		}

		function rd(a, b) {
			if (!a || /^\s*$/.test(a)) return null;
			var c = b.addModeClass ? ag : _f;
			return c[a] || (c[a] = a.replace(/\S+/g, "cm-$&"))
		}

		function sd(a, b) {
			var c = ve("span", null, null, _e ? "padding-right: .1px" : null),
				d = {
					pre: ve("pre", [c]),
					content: c,
					col: 0,
					pos: 0,
					cm: a
				};
			b.measure = {};
			for (var e = 0; e <= (b.rest ? b.rest.length : 0); e++) {
				var f, g = e ? b.rest[e - 1] : b.line;
				d.pos = 0, d.addToken = ud, (Ze || _e) && a.getOption("lineWrapping") && (d.addToken = vd(d.addToken)), He(a.display.measure) && (f = Md(g)) && (d.addToken = wd(d.addToken, f)), d.map = [];
				var h = b != a.display.externalMeasured && Jd(g);
				yd(g, d, pd(a, g, h)), g.styleClasses && (g.styleClasses.bgClass && (d.bgClass = Be(g.styleClasses.bgClass, d.bgClass || "")), g.styleClasses.textClass && (d.textClass = Be(g.styleClasses.textClass, d.textClass || ""))), 0 == d.map.length && d.map.push(0, 0, d.content.appendChild(Ge(a.display.measure))), 0 == e ? (b.measure.map = d.map, b.measure.cache = {}) : ((b.measure.maps || (b.measure.maps = [])).push(d.map), (b.measure.caches || (b.measure.caches = [])).push({}))
			}
			return _e && /\bcm-tab\b/.test(d.content.lastChild.className) && (d.content.className = "cm-tab-wrap-hack"), kg(a, "renderLine", a, b.line, d.pre), d.pre.className && (d.textClass = Be(d.pre.className, d.textClass || "")), d
		}

		function td(a) {
			var b = ve("span", "•", "cm-invalidchar");
			return b.title = "\\u" + a.charCodeAt(0).toString(16), b
		}

		function ud(a, b, c, d, e, f) {
			if (b) {
				var g = a.cm.options.specialChars,
					h = !1;
				if (g.test(b))
					for (var i = document.createDocumentFragment(), j = 0;;) {
						g.lastIndex = j;
						var k = g.exec(b),
							l = k ? k.index - j : b.length - j;
						if (l) {
							var m = document.createTextNode(b.slice(j, j + l));
							i.appendChild(Ze && 9 > $e ? ve("span", [m]) : m), a.map.push(a.pos, a.pos + l, m), a.col += l, a.pos += l
						}
						if (!k) break;
						if (j += l + 1, "	" == k[0]) {
							var n = a.cm.options.tabSize,
								o = n - a.col % n,
								m = i.appendChild(ve("span", le(o), "cm-tab"));
							a.col += o
						} else {
							var m = a.cm.options.specialCharPlaceholder(k[0]);
							i.appendChild(Ze && 9 > $e ? ve("span", [m]) : m), a.col += 1
						}
						a.map.push(a.pos, a.pos + 1, m), a.pos++
					} else {
						a.col += b.length;
						var i = document.createTextNode(b);
						a.map.push(a.pos, a.pos + b.length, i), Ze && 9 > $e && (h = !0), a.pos += b.length
					} if (c || d || e || h) {
						var p = c || "";
						d && (p += d), e && (p += e);
						var q = ve("span", [i], p);
						return f && (q.title = f), a.content.appendChild(q)
					}
				a.content.appendChild(i)
			}
		}

		function vd(a) {
			function b(a) {
				for (var b = " ", c = 0; c < a.length - 2; ++c) b += c % 2 ? " " : " ";
				return b += " "
			}
			return function(c, d, e, f, g, h) {
				a(c, d.replace(/ {3,}/g, b), e, f, g, h)
			}
		}

		function wd(a, b) {
			return function(c, d, e, f, g, h) {
				e = e ? e + " cm-force-border" : "cm-force-border";
				for (var i = c.pos, j = i + d.length;;) {
					for (var k = 0; k < b.length; k++) {
						var l = b[k];
						if (l.to > i && l.from <= i) break
					}
					if (l.to >= j) return a(c, d, e, f, g, h);
					a(c, d.slice(0, l.to - i), e, f, null, h), f = null, d = d.slice(l.to - i), i = l.to
				}
			}
		}

		function xd(a, b, c, d) {
			var e = !d && c.widgetNode;
			e && (a.map.push(a.pos, a.pos + b, e), a.content.appendChild(e)), a.pos += b
		}

		function yd(a, b, c) {
			var d = a.markedSpans,
				e = a.text,
				f = 0;
			if (d)
				for (var g, h, i, j, k, l, m = e.length, n = 0, o = 1, p = "", q = 0;;) {
					if (q == n) {
						h = i = j = k = "", l = null, q = 1 / 0;
						for (var r = [], s = 0; s < d.length; ++s) {
							var t = d[s],
								u = t.marker;
							t.from <= n && (null == t.to || t.to > n) ? (null != t.to && q > t.to && (q = t.to,
								i = ""), u.className && (h += " " + u.className), u.startStyle && t.from == n && (j += " " + u.startStyle), u.endStyle && t.to == q && (i += " " + u.endStyle), u.title && !k && (k = u.title), u.collapsed && (!l || Vc(l.marker, u) < 0) && (l = t)) : t.from > n && q > t.from && (q = t.from), "bookmark" == u.type && t.from == n && u.widgetNode && r.push(u)
						}
						if (l && (l.from || 0) == n && (xd(b, (null == l.to ? m + 1 : l.to) - n, l.marker, null == l.from), null == l.to)) return;
						if (!l && r.length)
							for (var s = 0; s < r.length; ++s) xd(b, 0, r[s])
					}
					if (n >= m) break;
					for (var v = Math.min(m, q);;) {
						if (p) {
							var w = n + p.length;
							if (!l) {
								var x = w > v ? p.slice(0, v - n) : p;
								b.addToken(b, x, g ? g + h : h, j, n + x.length == q ? i : "", k)
							}
							if (w >= v) {
								p = p.slice(v - n), n = v;
								break
							}
							n = w, j = ""
						}
						p = e.slice(f, f = c[o++]), g = rd(c[o++], b.cm.options)
					}
				} else
					for (var o = 1; o < c.length; o += 2) b.addToken(b, e.slice(f, f = c[o]), rd(c[o + 1], b.cm.options))
		}

		function zd(a, b) {
			return 0 == b.from.ch && 0 == b.to.ch && "" == me(b.text) && (!a.cm || a.cm.options.wholeLineUpdateBefore)
		}

		function Ad(a, b, c, d) {
			function e(a) {
				return c ? c[a] : null
			}

			function f(a, c, e) {
				hd(a, c, e, d), de(a, "change", a, b)
			}
			var g = b.from,
				h = b.to,
				i = b.text,
				j = Fd(a, g.line),
				k = Fd(a, h.line),
				l = me(i),
				m = e(i.length - 1),
				n = h.line - g.line;
			if (zd(a, b)) {
				for (var o = 0, p = []; o < i.length - 1; ++o) p.push(new $f(i[o], e(o), d));
				f(k, k.text, m), n && a.remove(g.line, n), p.length && a.insert(g.line, p)
			} else if (j == k)
				if (1 == i.length) f(j, j.text.slice(0, g.ch) + l + j.text.slice(h.ch), m);
				else {
					for (var p = [], o = 1; o < i.length - 1; ++o) p.push(new $f(i[o], e(o), d));
					p.push(new $f(l + j.text.slice(h.ch), m, d)), f(j, j.text.slice(0, g.ch) + i[0], e(0)), a.insert(g.line + 1, p)
				} else
			if (1 == i.length) f(j, j.text.slice(0, g.ch) + i[0] + k.text.slice(h.ch), e(0)), a.remove(g.line + 1, n);
			else {
				f(j, j.text.slice(0, g.ch) + i[0], e(0)), f(k, l + k.text.slice(h.ch), m);
				for (var o = 1, p = []; o < i.length - 1; ++o) p.push(new $f(i[o], e(o), d));
				n > 1 && a.remove(g.line + 1, n - 1), a.insert(g.line + 1, p)
			}
			de(a, "change", a, b)
		}

		function Bd(a) {
			this.lines = a, this.parent = null;
			for (var b = 0, c = 0; b < a.length; ++b) a[b].parent = this, c += a[b].height;
			this.height = c
		}

		function Cd(a) {
			this.children = a;
			for (var b = 0, c = 0, d = 0; d < a.length; ++d) {
				var e = a[d];
				b += e.chunkSize(), c += e.height, e.parent = this
			}
			this.size = b, this.height = c, this.parent = null
		}

		function Dd(a, b, c) {
			function d(a, e, f) {
				if (a.linked)
					for (var g = 0; g < a.linked.length; ++g) {
						var h = a.linked[g];
						if (h.doc != e) {
							var i = f && h.sharedHist;
							(!c || i) && (b(h.doc, i), d(h.doc, a, i))
						}
					}
			}
			d(a, null, !0)
		}

		function Ed(a, b) {
			if (b.cm) throw new Error("This document is already in use.");
			a.doc = b, b.cm = a, g(a), c(a), a.options.lineWrapping || m(a), a.options.mode = b.modeOption, nb(a)
		}

		function Fd(a, b) {
			if (b -= a.first, 0 > b || b >= a.size) throw new Error("There is no line " + (b + a.first) + " in the document.");
			for (var c = a; !c.lines;)
				for (var d = 0;; ++d) {
					var e = c.children[d],
						f = e.chunkSize();
					if (f > b) {
						c = e;
						break
					}
					b -= f
				}
			return c.lines[b]
		}

		function Gd(a, b, c) {
			var d = [],
				e = b.line;
			return a.iter(b.line, c.line + 1, function(a) {
				var f = a.text;
				e == c.line && (f = f.slice(0, c.ch)), e == b.line && (f = f.slice(b.ch)), d.push(f), ++e
			}), d
		}

		function Hd(a, b, c) {
			var d = [];
			return a.iter(b, c, function(a) {
				d.push(a.text)
			}), d
		}

		function Id(a, b) {
			var c = b - a.height;
			if (c)
				for (var d = a; d; d = d.parent) d.height += c
		}

		function Jd(a) {
			if (null == a.parent) return null;
			for (var b = a.parent, c = ne(b.lines, a), d = b.parent; d; b = d, d = d.parent)
				for (var e = 0; d.children[e] != b; ++e) c += d.children[e].chunkSize();
			return c + b.first
		}

		function Kd(a, b) {
			var c = a.first;
			a: do {
				for (var d = 0; d < a.children.length; ++d) {
					var e = a.children[d],
						f = e.height;
					if (f > b) {
						a = e;
						continue a
					}
					b -= f, c += e.chunkSize()
				}
				return c
			} while (!a.lines);
			for (var d = 0; d < a.lines.length; ++d) {
				var g = a.lines[d],
					h = g.height;
				if (h > b) break;
				b -= h
			}
			return c + d
		}

		function Ld(a) {
			a = $c(a);
			for (var b = 0, c = a.parent, d = 0; d < c.lines.length; ++d) {
				var e = c.lines[d];
				if (e == a) break;
				b += e.height
			}
			for (var f = c.parent; f; c = f, f = c.parent)
				for (var d = 0; d < f.children.length; ++d) {
					var g = f.children[d];
					if (g == c) break;
					b += g.height
				}
			return b
		}

		function Md(a) {
			var b = a.order;
			return null == b && (b = a.order = Lg(a.text)), b
		}

		function Nd(a) {
			this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = a || 1
		}

		function Od(a, b) {
			var c = {
				from: S(b.from),
				to: Ff(b),
				text: Gd(a, b.from, b.to)
			};
			return Vd(a, c, b.from.line, b.to.line + 1), Dd(a, function(a) {
				Vd(a, c, b.from.line, b.to.line + 1)
			}, !0), c
		}

		function Pd(a) {
			for (; a.length;) {
				var b = me(a);
				if (!b.ranges) break;
				a.pop()
			}
		}

		function Qd(a, b) {
			return b ? (Pd(a.done), me(a.done)) : a.done.length && !me(a.done).ranges ? me(a.done) : a.done.length > 1 && !a.done[a.done.length - 2].ranges ? (a.done.pop(), me(a.done)) : void 0
		}

		function Rd(a, b, c, d) {
			var e = a.history;
			e.undone.length = 0;
			var f, g = +new Date;
			if ((e.lastOp == d || e.lastOrigin == b.origin && b.origin && ("+" == b.origin.charAt(0) && a.cm && e.lastModTime > g - a.cm.options.historyEventDelay || "*" == b.origin.charAt(0))) && (f = Qd(e, e.lastOp == d))) {
				var h = me(f.changes);
				0 == sf(b.from, b.to) && 0 == sf(b.from, h.to) ? h.to = Ff(b) : f.changes.push(Od(a, b))
			} else {
				var i = me(e.done);
				for (i && i.ranges || Ud(a.sel, e.done), f = {
					changes: [Od(a, b)],
					generation: e.generation
				}, e.done.push(f); e.done.length > e.undoDepth;) e.done.shift(), e.done[0].ranges || e.done.shift()
			}
			e.done.push(c), e.generation = ++e.maxGeneration, e.lastModTime = e.lastSelTime = g, e.lastOp = e.lastSelOp = d, e.lastOrigin = e.lastSelOrigin = b.origin, h || kg(a, "historyAdded")
		}

		function Sd(a, b, c, d) {
			var e = b.charAt(0);
			return "*" == e || "+" == e && c.ranges.length == d.ranges.length && c.somethingSelected() == d.somethingSelected() && new Date - a.history.lastSelTime <= (a.cm ? a.cm.options.historyEventDelay : 500)
		}

		function Td(a, b, c, d) {
			var e = a.history,
				f = d && d.origin;
			c == e.lastSelOp || f && e.lastSelOrigin == f && (e.lastModTime == e.lastSelTime && e.lastOrigin == f || Sd(a, f, me(e.done), b)) ? e.done[e.done.length - 1] = b : Ud(b, e.done), e.lastSelTime = +new Date, e.lastSelOrigin = f, e.lastSelOp = c, d && d.clearRedo !== !1 && Pd(e.undone)
		}

		function Ud(a, b) {
			var c = me(b);
			c && c.ranges && c.equals(a) || b.push(a)
		}

		function Vd(a, b, c, d) {
			var e = b["spans_" + a.id],
				f = 0;
			a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function(c) {
				c.markedSpans && ((e || (e = b["spans_" + a.id] = {}))[f] = c.markedSpans), ++f
			})
		}

		function Wd(a) {
			if (!a) return null;
			for (var b, c = 0; c < a.length; ++c) a[c].marker.explicitlyCleared ? b || (b = a.slice(0, c)) : b && b.push(a[c]);
			return b ? b.length ? b : null : a
		}

		function Xd(a, b) {
			var c = b["spans_" + a.id];
			if (!c) return null;
			for (var d = 0, e = []; d < b.text.length; ++d) e.push(Wd(c[d]));
			return e
		}

		function Yd(a, b, c) {
			for (var d = 0, e = []; d < a.length; ++d) {
				var f = a[d];
				if (f.ranges) e.push(c ? V.prototype.deepCopy.call(f) : f);
				else {
					var g = f.changes,
						h = [];
					e.push({
						changes: h
					});
					for (var i = 0; i < g.length; ++i) {
						var j, k = g[i];
						if (h.push({
							from: k.from,
							to: k.to,
							text: k.text
						}), b)
							for (var l in k)(j = l.match(/^spans_(\d+)$/)) && ne(b, Number(j[1])) > -1 && (me(h)[l] = k[l], delete k[l])
					}
				}
			}
			return e
		}

		function Zd(a, b, c, d) {
			c < a.line ? a.line += d : b < a.line && (a.line = b, a.ch = 0)
		}

		function $d(a, b, c, d) {
			for (var e = 0; e < a.length; ++e) {
				var f = a[e],
					g = !0;
				if (f.ranges) {
					f.copied || (f = a[e] = f.deepCopy(), f.copied = !0);
					for (var h = 0; h < f.ranges.length; h++) Zd(f.ranges[h].anchor, b, c, d), Zd(f.ranges[h].head, b, c, d)
				} else {
					for (var h = 0; h < f.changes.length; ++h) {
						var i = f.changes[h];
						if (c < i.from.line) i.from = rf(i.from.line + d, i.from.ch), i.to = rf(i.to.line + d, i.to.ch);
						else if (b <= i.to.line) {
							g = !1;
							break
						}
					}
					g || (a.splice(0, e + 1), e = 0)
				}
			}
		}

		function _d(a, b) {
			var c = b.from.line,
				d = b.to.line,
				e = b.text.length - (d - c) - 1;
			$d(a.done, c, d, e), $d(a.undone, c, d, e)
		}

		function ae(a) {
			return null != a.defaultPrevented ? a.defaultPrevented : 0 == a.returnValue
		}

		function be(a) {
			return a.target || a.srcElement
		}

		function ce(a) {
			var b = a.which;
			return null == b && (1 & a.button ? b = 1 : 2 & a.button ? b = 3 : 4 & a.button && (b = 2)), kf && a.ctrlKey && 1 == b && (b = 3), b
		}

		function de(a, b) {
			function c(a) {
				return function() {
					a.apply(null, f)
				}
			}
			var d = a._handlers && a._handlers[b];
			if (d) {
				var e, f = Array.prototype.slice.call(arguments, 2);
				xf ? e = xf.delayedCallbacks : lg ? e = lg : (e = lg = [], setTimeout(ee, 0));
				for (var g = 0; g < d.length; ++g) e.push(c(d[g]))
			}
		}

		function ee() {
			var a = lg;
			lg = null;
			for (var b = 0; b < a.length; ++b) a[b]()
		}

		function fe(a, b, c) {
			return "string" == typeof b && (b = {
				type: b,
				preventDefault: function() {
					this.defaultPrevented = !0
				}
			}), kg(a, c || b.type, a, b), ae(b) || b.codemirrorIgnore
		}

		function ge(a) {
			var b = a._handlers && a._handlers.cursorActivity;
			if (b)
				for (var c = a.curOp.cursorActivityHandlers || (a.curOp.cursorActivityHandlers = []), d = 0; d < b.length; ++d) - 1 == ne(c, b[d]) && c.push(b[d])
		}

		function he(a, b) {
			var c = a._handlers && a._handlers[b];
			return c && c.length > 0
		}

		function ie(a) {
			a.prototype.on = function(a, b) {
				ig(this, a, b)
			}, a.prototype.off = function(a, b) {
				jg(this, a, b)
			}
		}

		function je() {
			this.id = null
		}

		function ke(a, b, c) {
			for (var d = 0, e = 0;;) {
				var f = a.indexOf("	", d); - 1 == f && (f = a.length);
				var g = f - d;
				if (f == a.length || e + g >= b) return d + Math.min(g, b - e);
				if (e += f - d, e += c - e % c, d = f + 1, e >= b) return d
			}
		}

		function le(a) {
			for (; sg.length <= a;) sg.push(me(sg) + " ");
			return sg[a]
		}

		function me(a) {
			return a[a.length - 1]
		}

		function ne(a, b) {
			for (var c = 0; c < a.length; ++c)
				if (a[c] == b) return c;
			return -1
		}

		function oe(a, b) {
			for (var c = [], d = 0; d < a.length; d++) c[d] = b(a[d], d);
			return c
		}

		function pe(a, b) {
			var c;
			if (Object.create) c = Object.create(a);
			else {
				var d = function() {};
				d.prototype = a, c = new d
			}
			return b && qe(b, c), c
		}

		function qe(a, b, c) {
			b || (b = {});
			for (var d in a)!a.hasOwnProperty(d) || c === !1 && b.hasOwnProperty(d) || (b[d] = a[d]);
			return b
		}

		function re(a) {
			var b = Array.prototype.slice.call(arguments, 1);
			return function() {
				return a.apply(null, b)
			}
		}

		function se(a, b) {
			return b ? b.source.indexOf("\\w") > -1 && wg(a) ? !0 : b.test(a) : wg(a)
		}

		function te(a) {
			for (var b in a)
				if (a.hasOwnProperty(b) && a[b]) return !1;
			return !0
		}

		function ue(a) {
			return a.charCodeAt(0) >= 768 && xg.test(a)
		}

		function ve(a, b, c, d) {
			var e = document.createElement(a);
			if (c && (e.className = c), d && (e.style.cssText = d), "string" == typeof b) e.appendChild(document.createTextNode(b));
			else if (b)
				for (var f = 0; f < b.length; ++f) e.appendChild(b[f]);
			return e
		}

		function we(a) {
			for (var b = a.childNodes.length; b > 0; --b) a.removeChild(a.firstChild);
			return a
		}

		function xe(a, b) {
			return we(a).appendChild(b)
		}

		function ye(a, b) {
			if (a.contains) return a.contains(b);
			for (; b = b.parentNode;)
				if (b == a) return !0
		}

		function ze() {
			return document.activeElement
		}

		function Ae(a) {
			return new RegExp("(^|\\s)" + a + "(?:$|\\s)\\s*")
		}

		function Be(a, b) {
			for (var c = a.split(" "), d = 0; d < c.length; d++) c[d] && !Ae(c[d]).test(b) && (b += " " + c[d]);
			return b
		}

		function Ce(a) {
			if (document.body.getElementsByClassName)
				for (var b = document.body.getElementsByClassName("CodeMirror"), c = 0; c < b.length; c++) {
					var d = b[c].CodeMirror;
					d && a(d)
				}
		}

		function De() {
			Dg || (Ee(), Dg = !0)
		}

		function Ee() {
			var a;
			ig(window, "resize", function() {
				null == a && (a = setTimeout(function() {
					a = null, yg = null, Ce(Cb)
				}, 100))
			}), ig(window, "blur", function() {
				Ce($b)
			})
		}

		function Fe(a) {
			if (null != yg) return yg;
			var b = ve("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
			return xe(a, b), b.offsetWidth && (yg = b.offsetHeight - b.clientHeight), yg || 0
		}

		function Ge(a) {
			if (null == zg) {
				var b = ve("span", "​");
				xe(a, ve("span", [b, document.createTextNode("x")])), 0 != a.firstChild.offsetHeight && (zg = b.offsetWidth <= 1 && b.offsetHeight > 2 && !(Ze && 8 > $e))
			}
			return zg ? ve("span", "​") : ve("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px")
		}

		function He(a) {
			if (null != Ag) return Ag;
			var b = xe(a, document.createTextNode("AخA")),
				c = ug(b, 0, 1).getBoundingClientRect();
			if (!c || c.left == c.right) return !1;
			var d = ug(b, 1, 2).getBoundingClientRect();
			return Ag = d.right - c.right < 3
		}

		function Ie(a) {
			if (null != Ig) return Ig;
			var b = xe(a, ve("span", "x")),
				c = b.getBoundingClientRect(),
				d = ug(b, 0, 1).getBoundingClientRect();
			return Ig = Math.abs(c.left - d.left) > 1
		}

		function Je(a, b, c, d) {
			if (!a) return d(b, c, "ltr");
			for (var e = !1, f = 0; f < a.length; ++f) {
				var g = a[f];
				(g.from < c && g.to > b || b == c && g.to == b) && (d(Math.max(g.from, b), Math.min(g.to, c), 1 == g.level ? "rtl" : "ltr"), e = !0)
			}
			e || d(b, c, "ltr")
		}

		function Ke(a) {
			return a.level % 2 ? a.to : a.from
		}

		function Le(a) {
			return a.level % 2 ? a.from : a.to
		}

		function Me(a) {
			var b = Md(a);
			return b ? Ke(b[0]) : 0
		}

		function Ne(a) {
			var b = Md(a);
			return b ? Le(me(b)) : a.text.length
		}

		function Oe(a, b) {
			var c = Fd(a.doc, b),
				d = $c(c);
			d != c && (b = Jd(d));
			var e = Md(d),
				f = e ? e[0].level % 2 ? Ne(d) : Me(d) : 0;
			return rf(b, f)
		}

		function Pe(a, b) {
			for (var c, d = Fd(a.doc, b); c = Yc(d);) d = c.find(1, !0).line, b = null;
			var e = Md(d),
				f = e ? e[0].level % 2 ? Me(d) : Ne(d) : d.text.length;
			return rf(null == b ? Jd(d) : b, f)
		}

		function Qe(a, b) {
			var c = Oe(a, b.line),
				d = Fd(a.doc, c.line),
				e = Md(d);
			if (!e || 0 == e[0].level) {
				var f = Math.max(0, d.text.search(/\S/)),
					g = b.line == c.line && b.ch <= f && b.ch;
				return rf(c.line, g ? 0 : f)
			}
			return c
		}

		function Re(a, b, c) {
			var d = a[0].level;
			return b == d ? !0 : c == d ? !1 : c > b
		}

		function Se(a, b) {
			Kg = null;
			for (var c, d = 0; d < a.length; ++d) {
				var e = a[d];
				if (e.from < b && e.to > b) return d;
				if (e.from == b || e.to == b) {
					if (null != c) return Re(a, e.level, a[c].level) ? (e.from != e.to && (Kg = c), d) : (e.from != e.to && (Kg = d), c);
					c = d
				}
			}
			return c
		}

		function Te(a, b, c, d) {
			if (!d) return b + c;
			do b += c; while (b > 0 && ue(a.text.charAt(b)));
			return b
		}

		function Ue(a, b, c, d) {
			var e = Md(a);
			if (!e) return Ve(a, b, c, d);
			for (var f = Se(e, b), g = e[f], h = Te(a, b, g.level % 2 ? -c : c, d);;) {
				if (h > g.from && h < g.to) return h;
				if (h == g.from || h == g.to) return Se(e, h) == f ? h : (g = e[f += c], c > 0 == g.level % 2 ? g.to : g.from);
				if (g = e[f += c], !g) return null;
				h = c > 0 == g.level % 2 ? Te(a, g.to, -1, d) : Te(a, g.from, 1, d)
			}
		}

		function Ve(a, b, c, d) {
			var e = b + c;
			if (d)
				for (; e > 0 && ue(a.text.charAt(e));) e += c;
			return 0 > e || e > a.text.length ? null : e
		}
		var We = /gecko\/\d/i.test(navigator.userAgent),
			Xe = /MSIE \d/.test(navigator.userAgent),
			Ye = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),
			Ze = Xe || Ye,
			$e = Ze && (Xe ? document.documentMode || 6 : Ye[1]),
			_e = /WebKit\//.test(navigator.userAgent),
			af = _e && /Qt\/\d+\.\d+/.test(navigator.userAgent),
			bf = /Chrome\//.test(navigator.userAgent),
			cf = /Opera\//.test(navigator.userAgent),
			df = /Apple Computer/.test(navigator.vendor),
			ef = /KHTML\//.test(navigator.userAgent),
			ff = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
			gf = /PhantomJS/.test(navigator.userAgent),
			hf = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
			jf = hf || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),
			kf = hf || /Mac/.test(navigator.platform),
			lf = /win/i.test(navigator.platform),
			mf = cf && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
		mf && (mf = Number(mf[1])), mf && mf >= 15 && (cf = !1, _e = !0);
		var nf = kf && (af || cf && (null == mf || 12.11 > mf)),
			of = We || Ze && $e >= 9,
			pf = !1,
			qf = !1,
			rf = a.Pos = function(a, b) {
				return this instanceof rf ? (this.line = a, void(this.ch = b)) : new rf(a, b)
			}, sf = a.cmpPos = function(a, b) {
				return a.line - b.line || a.ch - b.ch
			};
		V.prototype = {
			primary: function() {
				return this.ranges[this.primIndex]
			},
			equals: function(a) {
				if (a == this) return !0;
				if (a.primIndex != this.primIndex || a.ranges.length != this.ranges.length) return !1;
				for (var b = 0; b < this.ranges.length; b++) {
					var c = this.ranges[b],
						d = a.ranges[b];
					if (0 != sf(c.anchor, d.anchor) || 0 != sf(c.head, d.head)) return !1
				}
				return !0
			},
			deepCopy: function() {
				for (var a = [], b = 0; b < this.ranges.length; b++) a[b] = new W(S(this.ranges[b].anchor), S(this.ranges[b].head));
				return new V(a, this.primIndex)
			},
			somethingSelected: function() {
				for (var a = 0; a < this.ranges.length; a++)
					if (!this.ranges[a].empty()) return !0;
				return !1
			},
			contains: function(a, b) {
				b || (b = a);
				for (var c = 0; c < this.ranges.length; c++) {
					var d = this.ranges[c];
					if (sf(b, d.from()) >= 0 && sf(a, d.to()) <= 0) return c
				}
				return -1
			}
		}, W.prototype = {
			from: function() {
				return U(this.anchor, this.head)
			},
			to: function() {
				return T(this.anchor, this.head)
			},
			empty: function() {
				return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
			}
		};
		var tf, uf, vf, wf = {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}, xf = null,
			yf = 0,
			zf = null,
			Af = 0,
			Bf = 0,
			Cf = null;
		Ze ? Cf = -.53 : We ? Cf = 15 : bf ? Cf = -.7 : df && (Cf = -1 / 3);
		var Df = new je,
			Ef = null,
			Ff = a.changeEnd = function(a) {
				return a.text ? rf(a.from.line + a.text.length - 1, me(a.text).length + (1 == a.text.length ? a.from.ch : 0)) : a.to
			};
		a.prototype = {
			constructor: a,
			focus: function() {
				window.focus(), yb(this), vb(this)
			},
			setOption: function(a, b) {
				var c = this.options,
					d = c[a];
				(c[a] != b || "mode" == a) && (c[a] = b, Hf.hasOwnProperty(a) && ib(this, Hf[a])(this, b, d))
			},
			getOption: function(a) {
				return this.options[a]
			},
			getDoc: function() {
				return this.doc
			},
			addKeyMap: function(a, b) {
				this.state.keyMaps[b ? "push" : "unshift"](Bc(a))
			},
			removeKeyMap: function(a) {
				for (var b = this.state.keyMaps, c = 0; c < b.length; ++c)
					if (b[c] == a || b[c].name == a) return b.splice(c, 1), !0
			},
			addOverlay: jb(function(b, c) {
				var d = b.token ? b : a.getMode(this.options, b);
				if (d.startState) throw new Error("Overlays may not be stateful.");
				this.state.overlays.push({
					mode: d,
					modeSpec: b,
					opaque: c && c.opaque
				}), this.state.modeGen++, nb(this)
			}),
			removeOverlay: jb(function(a) {
				for (var b = this.state.overlays, c = 0; c < b.length; ++c) {
					var d = b[c].modeSpec;
					if (d == a || "string" == typeof a && d.name == a) return b.splice(c, 1), this.state.modeGen++, void nb(this)
				}
			}),
			indentLine: jb(function(a, b, c) {
				"string" != typeof b && "number" != typeof b && (b = null == b ? this.options.smartIndent ? "smart" : "prev" : b ? "add" : "subtract"), aa(this.doc, a) && uc(this, a, b, c)
			}),
			indentSelection: jb(function(a) {
				for (var b = this.doc.sel.ranges, c = -1, d = 0; d < b.length; d++) {
					var e = b[d];
					if (e.empty()) e.head.line > c && (uc(this, e.head.line, a, !0), c = e.head.line, d == this.doc.sel.primIndex && sc(this));
					else {
						var f = e.from(),
							g = e.to(),
							h = Math.max(c, f.line);
						c = Math.min(this.lastLine(), g.line - (g.ch ? 0 : 1)) + 1;
						for (var i = h; c > i; ++i) uc(this, i, a);
						var j = this.doc.sel.ranges;
						0 == f.ch && b.length == j.length && j[d].from().ch > 0 && fa(this.doc, d, new W(f, j[d].to()), og)
					}
				}
			}),
			getTokenAt: function(a, b) {
				return md(this, a, b)
			},
			getLineTokens: function(a, b) {
				return md(this, rf(a), b, !0)
			},
			getTokenTypeAt: function(a) {
				a = $(this.doc, a);
				var b, c = pd(this, Fd(this.doc, a.line)),
					d = 0,
					e = (c.length - 1) / 2,
					f = a.ch;
				if (0 == f) b = c[2];
				else
					for (;;) {
						var g = d + e >> 1;
						if ((g ? c[2 * g - 1] : 0) >= f) e = g;
						else {
							if (!(c[2 * g + 1] < f)) {
								b = c[2 * g + 2];
								break
							}
							d = g + 1
						}
					}
				var h = b ? b.indexOf("cm-overlay ") : -1;
				return 0 > h ? b : 0 == h ? null : b.slice(0, h - 1)
			},
			getModeAt: function(b) {
				var c = this.doc.mode;
				return c.innerMode ? a.innerMode(c, this.getTokenAt(b).state).mode : c
			},
			getHelper: function(a, b) {
				return this.getHelpers(a, b)[0]
			},
			getHelpers: function(a, b) {
				var c = [];
				if (!Nf.hasOwnProperty(b)) return Nf;
				var d = Nf[b],
					e = this.getModeAt(a);
				if ("string" == typeof e[b]) d[e[b]] && c.push(d[e[b]]);
				else if (e[b])
					for (var f = 0; f < e[b].length; f++) {
						var g = d[e[b][f]];
						g && c.push(g)
					} else e.helperType && d[e.helperType] ? c.push(d[e.helperType]) : d[e.name] && c.push(d[e.name]);
				for (var f = 0; f < d._global.length; f++) {
					var h = d._global[f];
					h.pred(e, this) && -1 == ne(c, h.val) && c.push(h.val)
				}
				return c
			},
			getStateAfter: function(a, b) {
				var c = this.doc;
				return a = Z(c, null == a ? c.first + c.size - 1 : a), ya(this, a + 1, b)
			},
			cursorCoords: function(a, b) {
				var c, d = this.doc.sel.primary();
				return c = null == a ? d.head : "object" == typeof a ? $(this.doc, a) : a ? d.from() : d.to(), Ta(this, c, b || "page")
			},
			charCoords: function(a, b) {
				return Sa(this, $(this.doc, a), b || "page")
			},
			coordsChar: function(a, b) {
				return a = Ra(this, a, b || "page"), Wa(this, a.left, a.top)
			},
			lineAtHeight: function(a, b) {
				return a = Ra(this, {
					top: a,
					left: 0
				}, b || "page").top, Kd(this.doc, a + this.display.viewOffset)
			},
			heightAtLine: function(a, b) {
				var c = !1,
					d = this.doc.first + this.doc.size - 1;
				a < this.doc.first ? a = this.doc.first : a > d && (a = d, c = !0);
				var e = Fd(this.doc, a);
				return Qa(this, e, {
					top: 0,
					left: 0
				}, b || "page").top + (c ? this.doc.height - Ld(e) : 0)
			},
			defaultTextHeight: function() {
				return Ya(this.display)
			},
			defaultCharWidth: function() {
				return Za(this.display)
			},
			setGutterMarker: jb(function(a, b, c) {
				return vc(this.doc, a, "gutter", function(a) {
					var d = a.gutterMarkers || (a.gutterMarkers = {});
					return d[b] = c, !c && te(d) && (a.gutterMarkers = null), !0
				})
			}),
			clearGutter: jb(function(a) {
				var b = this,
					c = b.doc,
					d = c.first;
				c.iter(function(c) {
					c.gutterMarkers && c.gutterMarkers[a] && (c.gutterMarkers[a] = null, ob(b, d, "gutter"), te(c.gutterMarkers) && (c.gutterMarkers = null)), ++d
				})
			}),
			addLineWidget: jb(function(a, b, c) {
				return gd(this, a, b, c)
			}),
			removeLineWidget: function(a) {
				a.clear()
			},
			lineInfo: function(a) {
				if ("number" == typeof a) {
					if (!aa(this.doc, a)) return null;
					var b = a;
					if (a = Fd(this.doc, a), !a) return null
				} else {
					var b = Jd(a);
					if (null == b) return null
				}
				return {
					line: b,
					handle: a,
					text: a.text,
					gutterMarkers: a.gutterMarkers,
					textClass: a.textClass,
					bgClass: a.bgClass,
					wrapClass: a.wrapClass,
					widgets: a.widgets
				}
			},
			getViewport: function() {
				return {
					from: this.display.viewFrom,
					to: this.display.viewTo
				}
			},
			addWidget: function(a, b, c, d, e) {
				var f = this.display;
				a = Ta(this, $(this.doc, a));
				var g = a.bottom,
					h = a.left;
				if (b.style.position = "absolute", f.sizer.appendChild(b), "over" == d) g = a.top;
				else if ("above" == d || "near" == d) {
					var i = Math.max(f.wrapper.clientHeight, this.doc.height),
						j = Math.max(f.sizer.clientWidth, f.lineSpace.clientWidth);
					("above" == d || a.bottom + b.offsetHeight > i) && a.top > b.offsetHeight ? g = a.top - b.offsetHeight : a.bottom + b.offsetHeight <= i && (g = a.bottom), h + b.offsetWidth > j && (h = j - b.offsetWidth)
				}
				b.style.top = g + "px", b.style.left = b.style.right = "", "right" == e ? (h = f.sizer.clientWidth - b.offsetWidth, b.style.right = "0px") : ("left" == e ? h = 0 : "middle" == e && (h = (f.sizer.clientWidth - b.offsetWidth) / 2), b.style.left = h + "px"), c && pc(this, h, g, h + b.offsetWidth, g + b.offsetHeight)
			},
			triggerOnKeyDown: jb(Vb),
			triggerOnKeyPress: jb(Yb),
			triggerOnKeyUp: Xb,
			execCommand: function(a) {
				return Qf.hasOwnProperty(a) ? Qf[a](this) : void 0
			},
			findPosH: function(a, b, c, d) {
				var e = 1;
				0 > b && (e = -1, b = -b);
				for (var f = 0, g = $(this.doc, a); b > f && (g = xc(this.doc, g, e, c, d), !g.hitSide); ++f);
				return g
			},
			moveH: jb(function(a, b) {
				var c = this;
				c.extendSelectionsBy(function(d) {
					return c.display.shift || c.doc.extend || d.empty() ? xc(c.doc, d.head, a, b, c.options.rtlMoveVisually) : 0 > a ? d.from() : d.to()
				}, qg)
			}),
			deleteH: jb(function(a, b) {
				var c = this.doc.sel,
					d = this.doc;
				c.somethingSelected() ? d.replaceSelection("", null, "+delete") : wc(this, function(c) {
					var e = xc(d, c.head, a, b, !1);
					return 0 > a ? {
						from: e,
						to: c.head
					} : {
						from: c.head,
						to: e
					}
				})
			}),
			findPosV: function(a, b, c, d) {
				var e = 1,
					f = d;
				0 > b && (e = -1, b = -b);
				for (var g = 0, h = $(this.doc, a); b > g; ++g) {
					var i = Ta(this, h, "div");
					if (null == f ? f = i.left : i.left = f, h = yc(this, i, e, c), h.hitSide) break
				}
				return h
			},
			moveV: jb(function(a, b) {
				var c = this,
					d = this.doc,
					e = [],
					f = !c.display.shift && !d.extend && d.sel.somethingSelected();
				if (d.extendSelectionsBy(function(g) {
					if (f) return 0 > a ? g.from() : g.to();
					var h = Ta(c, g.head, "div");
					null != g.goalColumn && (h.left = g.goalColumn), e.push(h.left);
					var i = yc(c, h, a, b);
					return "page" == b && g == d.sel.primary() && rc(c, null, Sa(c, i, "div").top - h.top), i
				}, qg), e.length)
					for (var g = 0; g < d.sel.ranges.length; g++) d.sel.ranges[g].goalColumn = e[g]
			}),
			findWordAt: function(a) {
				var b = this.doc,
					c = Fd(b, a.line).text,
					d = a.ch,
					e = a.ch;
				if (c) {
					var f = this.getHelper(a, "wordChars");
					(a.xRel < 0 || e == c.length) && d ? --d : ++e;
					for (var g = c.charAt(d), h = se(g, f) ? function(a) {
							return se(a, f)
						} : /\s/.test(g) ? function(a) {
							return /\s/.test(a)
						} : function(a) {
							return !/\s/.test(a) && !se(a)
						}; d > 0 && h(c.charAt(d - 1));)--d;
					for (; e < c.length && h(c.charAt(e));)++e
				}
				return new W(rf(a.line, d), rf(a.line, e))
			},
			toggleOverwrite: function(a) {
				(null == a || a != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? Cg(this.display.cursorDiv, "CodeMirror-overwrite") : Bg(this.display.cursorDiv, "CodeMirror-overwrite"), kg(this, "overwriteToggle", this, this.state.overwrite))
			},
			hasFocus: function() {
				return ze() == this.display.input
			},
			scrollTo: jb(function(a, b) {
				(null != a || null != b) && tc(this), null != a && (this.curOp.scrollLeft = a), null != b && (this.curOp.scrollTop = b)
			}),
			getScrollInfo: function() {
				var a = this.display.scroller,
					b = mg;
				return {
					left: a.scrollLeft,
					top: a.scrollTop,
					height: a.scrollHeight - b,
					width: a.scrollWidth - b,
					clientHeight: a.clientHeight - b,
					clientWidth: a.clientWidth - b
				}
			},
			scrollIntoView: jb(function(a, b) {
				if (null == a ? (a = {
					from: this.doc.sel.primary().head,
					to: null
				}, null == b && (b = this.options.cursorScrollMargin)) : "number" == typeof a ? a = {
					from: rf(a, 0),
					to: null
				} : null == a.from && (a = {
					from: a,
					to: null
				}), a.to || (a.to = a.from), a.margin = b || 0, null != a.from.line) tc(this), this.curOp.scrollToPos = a;
				else {
					var c = qc(this, Math.min(a.from.left, a.to.left), Math.min(a.from.top, a.to.top) - a.margin, Math.max(a.from.right, a.to.right), Math.max(a.from.bottom, a.to.bottom) + a.margin);
					this.scrollTo(c.scrollLeft, c.scrollTop)
				}
			}),
			setSize: jb(function(a, b) {
				function c(a) {
					return "number" == typeof a || /^\d+$/.test(String(a)) ? a + "px" : a
				}
				var d = this;
				null != a && (d.display.wrapper.style.width = c(a)), null != b && (d.display.wrapper.style.height = c(b)), d.options.lineWrapping && Ma(this);
				var e = d.display.viewFrom;
				d.doc.iter(e, d.display.viewTo, function(a) {
					if (a.widgets)
						for (var b = 0; b < a.widgets.length; b++)
							if (a.widgets[b].noHScroll) {
								ob(d, e, "widget");
								break
							}++e
				}), d.curOp.forceUpdate = !0, kg(d, "refresh", this)
			}),
			operation: function(a) {
				return hb(this, a)
			},
			refresh: jb(function() {
				var a = this.display.cachedTextHeight;
				nb(this), this.curOp.forceUpdate = !0, Na(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), k(this), (null == a || Math.abs(a - Ya(this.display)) > .5) && g(this), kg(this, "refresh", this)
			}),
			swapDoc: jb(function(a) {
				var b = this.doc;
				return b.cm = null, Ed(this, a), Na(this), xb(this), this.scrollTo(a.scrollLeft, a.scrollTop), this.curOp.forceScroll = !0, de(this, "swapDoc", this, b), b
			}),
			getInputField: function() {
				return this.display.input
			},
			getWrapperElement: function() {
				return this.display.wrapper
			},
			getScrollerElement: function() {
				return this.display.scroller
			},
			getGutterElement: function() {
				return this.display.gutters
			}
		}, ie(a);
		var Gf = a.defaults = {}, Hf = a.optionHandlers = {}, If = a.Init = {
				toString: function() {
					return "CodeMirror.Init"
				}
			};
		zc("value", "", function(a, b) {
			a.setValue(b)
		}, !0), zc("mode", null, function(a, b) {
			a.doc.modeOption = b, c(a)
		}, !0), zc("indentUnit", 2, c, !0), zc("indentWithTabs", !1), zc("smartIndent", !0), zc("tabSize", 4, function(a) {
			d(a), Na(a), nb(a)
		}, !0), zc("specialChars", /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function(a, b) {
			a.options.specialChars = new RegExp(b.source + (b.test("	") ? "" : "|	"), "g"), a.refresh()
		}, !0), zc("specialCharPlaceholder", td, function(a) {
			a.refresh()
		}, !0), zc("electricChars", !0), zc("rtlMoveVisually", !lf), zc("wholeLineUpdateBefore", !0), zc("theme", "default", function(a) {
			h(a), i(a)
		}, !0), zc("keyMap", "default", function(b, c, d) {
			var e = Bc(c),
				f = d != a.Init && Bc(d);
			f && f.detach && f.detach(b, e), e.attach && e.attach(b, f || null)
		}), zc("extraKeys", null), zc("lineWrapping", !1, e, !0), zc("gutters", [], function(a) {
			n(a.options), i(a)
		}, !0), zc("fixedGutter", !0, function(a, b) {
			a.display.gutters.style.left = b ? v(a.display) + "px" : "0", a.refresh()
		}, !0), zc("coverGutterNextToScrollbar", !1, q, !0), zc("lineNumbers", !1, function(a) {
			n(a.options), i(a)
		}, !0), zc("firstLineNumber", 1, i, !0), zc("lineNumberFormatter", function(a) {
			return a
		}, i, !0), zc("showCursorWhenSelecting", !1, ra, !0), zc("resetSelectionOnContextMenu", !0), zc("readOnly", !1, function(a, b) {
			"nocursor" == b ? ($b(a), a.display.input.blur(), a.display.disabled = !0) : (a.display.disabled = !1, b || xb(a))
		}), zc("disableInput", !1, function(a, b) {
			b || xb(a)
		}, !0), zc("dragDrop", !0), zc("cursorBlinkRate", 530), zc("cursorScrollMargin", 0), zc("cursorHeight", 1, ra, !0), zc("singleCursorHeightPerLine", !0, ra, !0), zc("workTime", 100), zc("workDelay", 100), zc("flattenSpans", !0, d, !0), zc("addModeClass", !1, d, !0), zc("pollInterval", 100), zc("undoDepth", 200, function(a, b) {
			a.doc.history.undoDepth = b
		}), zc("historyEventDelay", 1250), zc("viewportMargin", 10, function(a) {
			a.refresh()
		}, !0), zc("maxHighlightLength", 1e4, d, !0), zc("moveInputWithCursor", !0, function(a, b) {
			b || (a.display.inputDiv.style.top = a.display.inputDiv.style.left = 0)
		}), zc("tabindex", null, function(a, b) {
			a.display.input.tabIndex = b || ""
		}), zc("autofocus", null);
		var Jf = a.modes = {}, Kf = a.mimeModes = {};
		a.defineMode = function(b, c) {
			a.defaults.mode || "null" == b || (a.defaults.mode = b), arguments.length > 2 && (c.dependencies = Array.prototype.slice.call(arguments, 2)), Jf[b] = c
		}, a.defineMIME = function(a, b) {
			Kf[a] = b
		}, a.resolveMode = function(b) {
			if ("string" == typeof b && Kf.hasOwnProperty(b)) b = Kf[b];
			else if (b && "string" == typeof b.name && Kf.hasOwnProperty(b.name)) {
				var c = Kf[b.name];
				"string" == typeof c && (c = {
					name: c
				}), b = pe(c, b), b.name = c.name
			} else if ("string" == typeof b && /^[\w\-]+\/[\w\-]+\+xml$/.test(b)) return a.resolveMode("application/xml");
			return "string" == typeof b ? {
				name: b
			} : b || {
				name: "null"
			}
		}, a.getMode = function(b, c) {
			var c = a.resolveMode(c),
				d = Jf[c.name];
			if (!d) return a.getMode(b, "text/plain");
			var e = d(b, c);
			if (Lf.hasOwnProperty(c.name)) {
				var f = Lf[c.name];
				for (var g in f) f.hasOwnProperty(g) && (e.hasOwnProperty(g) && (e["_" + g] = e[g]), e[g] = f[g])
			}
			if (e.name = c.name, c.helperType && (e.helperType = c.helperType), c.modeProps)
				for (var g in c.modeProps) e[g] = c.modeProps[g];
			return e
		}, a.defineMode("null", function() {
			return {
				token: function(a) {
					a.skipToEnd()
				}
			}
		}), a.defineMIME("text/plain", "null");
		var Lf = a.modeExtensions = {};
		a.extendMode = function(a, b) {
			var c = Lf.hasOwnProperty(a) ? Lf[a] : Lf[a] = {};
			qe(b, c)
		}, a.defineExtension = function(b, c) {
			a.prototype[b] = c
		}, a.defineDocExtension = function(a, b) {
			cg.prototype[a] = b
		}, a.defineOption = zc;
		var Mf = [];
		a.defineInitHook = function(a) {
			Mf.push(a)
		};
		var Nf = a.helpers = {};
		a.registerHelper = function(b, c, d) {
			Nf.hasOwnProperty(b) || (Nf[b] = a[b] = {
				_global: []
			}), Nf[b][c] = d
		}, a.registerGlobalHelper = function(b, c, d, e) {
			a.registerHelper(b, c, e), Nf[b]._global.push({
				pred: d,
				val: e
			})
		};
		var Of = a.copyState = function(a, b) {
			if (b === !0) return b;
			if (a.copyState) return a.copyState(b);
			var c = {};
			for (var d in b) {
				var e = b[d];
				e instanceof Array && (e = e.concat([])), c[d] = e
			}
			return c
		}, Pf = a.startState = function(a, b, c) {
				return a.startState ? a.startState(b, c) : !0
			};
		a.innerMode = function(a, b) {
			for (; a.innerMode;) {
				var c = a.innerMode(b);
				if (!c || c.mode == a) break;
				b = c.state, a = c.mode
			}
			return c || {
				mode: a,
				state: b
			}
		};
		var Qf = a.commands = {
			selectAll: function(a) {
				a.setSelection(rf(a.firstLine(), 0), rf(a.lastLine()), og)
			},
			singleSelection: function(a) {
				a.setSelection(a.getCursor("anchor"), a.getCursor("head"), og)
			},
			killLine: function(a) {
				wc(a, function(b) {
					if (b.empty()) {
						var c = Fd(a.doc, b.head.line).text.length;
						return b.head.ch == c && b.head.line < a.lastLine() ? {
							from: b.head,
							to: rf(b.head.line + 1, 0)
						} : {
							from: b.head,
							to: rf(b.head.line, c)
						}
					}
					return {
						from: b.from(),
						to: b.to()
					}
				})
			},
			deleteLine: function(a) {
				wc(a, function(b) {
					return {
						from: rf(b.from().line, 0),
						to: $(a.doc, rf(b.to().line + 1, 0))
					}
				})
			},
			delLineLeft: function(a) {
				wc(a, function(a) {
					return {
						from: rf(a.from().line, 0),
						to: a.from()
					}
				})
			},
			delWrappedLineLeft: function(a) {
				wc(a, function(b) {
					var c = a.charCoords(b.head, "div").top + 5,
						d = a.coordsChar({
							left: 0,
							top: c
						}, "div");
					return {
						from: d,
						to: b.from()
					}
				})
			},
			delWrappedLineRight: function(a) {
				wc(a, function(b) {
					var c = a.charCoords(b.head, "div").top + 5,
						d = a.coordsChar({
							left: a.display.lineDiv.offsetWidth + 100,
							top: c
						}, "div");
					return {
						from: b.from(),
						to: d
					}
				})
			},
			undo: function(a) {
				a.undo()
			},
			redo: function(a) {
				a.redo()
			},
			undoSelection: function(a) {
				a.undoSelection()
			},
			redoSelection: function(a) {
				a.redoSelection()
			},
			goDocStart: function(a) {
				a.extendSelection(rf(a.firstLine(), 0))
			},
			goDocEnd: function(a) {
				a.extendSelection(rf(a.lastLine()))
			},
			goLineStart: function(a) {
				a.extendSelectionsBy(function(b) {
					return Oe(a, b.head.line)
				}, {
					origin: "+move",
					bias: 1
				})
			},
			goLineStartSmart: function(a) {
				a.extendSelectionsBy(function(b) {
					return Qe(a, b.head)
				}, {
					origin: "+move",
					bias: 1
				})
			},
			goLineEnd: function(a) {
				a.extendSelectionsBy(function(b) {
					return Pe(a, b.head.line)
				}, {
					origin: "+move",
					bias: -1
				})
			},
			goLineRight: function(a) {
				a.extendSelectionsBy(function(b) {
					var c = a.charCoords(b.head, "div").top + 5;
					return a.coordsChar({
						left: a.display.lineDiv.offsetWidth + 100,
						top: c
					}, "div")
				}, qg)
			},
			goLineLeft: function(a) {
				a.extendSelectionsBy(function(b) {
					var c = a.charCoords(b.head, "div").top + 5;
					return a.coordsChar({
						left: 0,
						top: c
					}, "div")
				}, qg)
			},
			goLineLeftSmart: function(a) {
				a.extendSelectionsBy(function(b) {
					var c = a.charCoords(b.head, "div").top + 5,
						d = a.coordsChar({
							left: 0,
							top: c
						}, "div");
					return d.ch < a.getLine(d.line).search(/\S/) ? Qe(a, b.head) : d
				}, qg)
			},
			goLineUp: function(a) {
				a.moveV(-1, "line")
			},
			goLineDown: function(a) {
				a.moveV(1, "line")
			},
			goPageUp: function(a) {
				a.moveV(-1, "page")
			},
			goPageDown: function(a) {
				a.moveV(1, "page")
			},
			goCharLeft: function(a) {
				a.moveH(-1, "char")
			},
			goCharRight: function(a) {
				a.moveH(1, "char")
			},
			goColumnLeft: function(a) {
				a.moveH(-1, "column")
			},
			goColumnRight: function(a) {
				a.moveH(1, "column")
			},
			goWordLeft: function(a) {
				a.moveH(-1, "word")
			},
			goGroupRight: function(a) {
				a.moveH(1, "group")
			},
			goGroupLeft: function(a) {
				a.moveH(-1, "group")
			},
			goWordRight: function(a) {
				a.moveH(1, "word")
			},
			delCharBefore: function(a) {
				a.deleteH(-1, "char")
			},
			delCharAfter: function(a) {
				a.deleteH(1, "char")
			},
			delWordBefore: function(a) {
				a.deleteH(-1, "word")
			},
			delWordAfter: function(a) {
				a.deleteH(1, "word")
			},
			delGroupBefore: function(a) {
				a.deleteH(-1, "group")
			},
			delGroupAfter: function(a) {
				a.deleteH(1, "group")
			},
			indentAuto: function(a) {
				a.indentSelection("smart")
			},
			indentMore: function(a) {
				a.indentSelection("add")
			},
			indentLess: function(a) {
				a.indentSelection("subtract")
			},
			insertTab: function(a) {
				a.replaceSelection("	")
			},
			insertSoftTab: function(a) {
				for (var b = [], c = a.listSelections(), d = a.options.tabSize, e = 0; e < c.length; e++) {
					var f = c[e].from(),
						g = rg(a.getLine(f.line), f.ch, d);
					b.push(new Array(d - g % d + 1).join(" "))
				}
				a.replaceSelections(b)
			},
			defaultTab: function(a) {
				a.somethingSelected() ? a.indentSelection("add") : a.execCommand("insertTab")
			},
			transposeChars: function(a) {
				hb(a, function() {
					for (var b = a.listSelections(), c = [], d = 0; d < b.length; d++) {
						var e = b[d].head,
							f = Fd(a.doc, e.line).text;
						if (f)
							if (e.ch == f.length && (e = new rf(e.line, e.ch - 1)), e.ch > 0) e = new rf(e.line, e.ch + 1), a.replaceRange(f.charAt(e.ch - 1) + f.charAt(e.ch - 2), rf(e.line, e.ch - 2), e, "+transpose");
							else
						if (e.line > a.doc.first) {
							var g = Fd(a.doc, e.line - 1).text;
							g && a.replaceRange(f.charAt(0) + "\n" + g.charAt(g.length - 1), rf(e.line - 1, g.length - 1), rf(e.line, 1), "+transpose")
						}
						c.push(new W(e, e))
					}
					a.setSelections(c)
				})
			},
			newlineAndIndent: function(a) {
				hb(a, function() {
					for (var b = a.listSelections().length, c = 0; b > c; c++) {
						var d = a.listSelections()[c];

						a.replaceRange("\n", d.anchor, d.head, "+input"), a.indentLine(d.from().line + 1, null, !0), sc(a)
					}
				})
			},
			toggleOverwrite: function(a) {
				a.toggleOverwrite()
			}
		}, Rf = a.keyMap = {};
		Rf.basic = {
			Left: "goCharLeft",
			Right: "goCharRight",
			Up: "goLineUp",
			Down: "goLineDown",
			End: "goLineEnd",
			Home: "goLineStartSmart",
			PageUp: "goPageUp",
			PageDown: "goPageDown",
			Delete: "delCharAfter",
			Backspace: "delCharBefore",
			"Shift-Backspace": "delCharBefore",
			Tab: "defaultTab",
			"Shift-Tab": "indentAuto",
			Enter: "newlineAndIndent",
			Insert: "toggleOverwrite",
			Esc: "singleSelection"
		}, Rf.pcDefault = {
			"Ctrl-A": "selectAll",
			"Ctrl-D": "deleteLine",
			"Ctrl-Z": "undo",
			"Shift-Ctrl-Z": "redo",
			"Ctrl-Y": "redo",
			"Ctrl-Home": "goDocStart",
			"Ctrl-End": "goDocEnd",
			"Ctrl-Up": "goLineUp",
			"Ctrl-Down": "goLineDown",
			"Ctrl-Left": "goGroupLeft",
			"Ctrl-Right": "goGroupRight",
			"Alt-Left": "goLineStart",
			"Alt-Right": "goLineEnd",
			"Ctrl-Backspace": "delGroupBefore",
			"Ctrl-Delete": "delGroupAfter",
			"Ctrl-S": "save",
			"Ctrl-F": "find",
			"Ctrl-G": "findNext",
			"Shift-Ctrl-G": "findPrev",
			"Shift-Ctrl-F": "replace",
			"Shift-Ctrl-R": "replaceAll",
			"Ctrl-[": "indentLess",
			"Ctrl-]": "indentMore",
			"Ctrl-U": "undoSelection",
			"Shift-Ctrl-U": "redoSelection",
			"Alt-U": "redoSelection",
			fallthrough: "basic"
		}, Rf.emacsy = {
			"Ctrl-F": "goCharRight",
			"Ctrl-B": "goCharLeft",
			"Ctrl-P": "goLineUp",
			"Ctrl-N": "goLineDown",
			"Alt-F": "goWordRight",
			"Alt-B": "goWordLeft",
			"Ctrl-A": "goLineStart",
			"Ctrl-E": "goLineEnd",
			"Ctrl-V": "goPageDown",
			"Shift-Ctrl-V": "goPageUp",
			"Ctrl-D": "delCharAfter",
			"Ctrl-H": "delCharBefore",
			"Alt-D": "delWordAfter",
			"Alt-Backspace": "delWordBefore",
			"Ctrl-K": "killLine",
			"Ctrl-T": "transposeChars"
		}, Rf.macDefault = {
			"Cmd-A": "selectAll",
			"Cmd-D": "deleteLine",
			"Cmd-Z": "undo",
			"Shift-Cmd-Z": "redo",
			"Cmd-Y": "redo",
			"Cmd-Home": "goDocStart",
			"Cmd-Up": "goDocStart",
			"Cmd-End": "goDocEnd",
			"Cmd-Down": "goDocEnd",
			"Alt-Left": "goGroupLeft",
			"Alt-Right": "goGroupRight",
			"Cmd-Left": "goLineLeft",
			"Cmd-Right": "goLineRight",
			"Alt-Backspace": "delGroupBefore",
			"Ctrl-Alt-Backspace": "delGroupAfter",
			"Alt-Delete": "delGroupAfter",
			"Cmd-S": "save",
			"Cmd-F": "find",
			"Cmd-G": "findNext",
			"Shift-Cmd-G": "findPrev",
			"Cmd-Alt-F": "replace",
			"Shift-Cmd-Alt-F": "replaceAll",
			"Cmd-[": "indentLess",
			"Cmd-]": "indentMore",
			"Cmd-Backspace": "delWrappedLineLeft",
			"Cmd-Delete": "delWrappedLineRight",
			"Cmd-U": "undoSelection",
			"Shift-Cmd-U": "redoSelection",
			"Ctrl-Up": "goDocStart",
			"Ctrl-Down": "goDocEnd",
			fallthrough: ["basic", "emacsy"]
		}, Rf["default"] = kf ? Rf.macDefault : Rf.pcDefault, a.normalizeKeyMap = function(a) {
			var b = {};
			for (var c in a)
				if (a.hasOwnProperty(c)) {
					var d = a[c];
					if (/^(name|fallthrough|(de|at)tach)$/.test(c)) continue;
					if ("..." == d) {
						delete a[c];
						continue
					}
					for (var e = oe(c.split(" "), Ac), f = 0; f < e.length; f++) {
						var g, h;
						f == e.length - 1 ? (h = c, g = d) : (h = e.slice(0, f + 1).join(" "), g = "...");
						var i = b[h];
						if (i) {
							if (i != g) throw new Error("Inconsistent bindings for " + h)
						} else b[h] = g
					}
					delete a[c]
				}
			for (var j in b) a[j] = b[j];
			return a
		};
		var Sf = a.lookupKey = function(a, b, c) {
			b = Bc(b);
			var d = b.call ? b.call(a) : b[a];
			if (d === !1) return "nothing";
			if ("..." === d) return "multi";
			if (null != d && c(d)) return "handled";
			if (b.fallthrough) {
				if ("[object Array]" != Object.prototype.toString.call(b.fallthrough)) return Sf(a, b.fallthrough, c);
				for (var e = 0; e < b.fallthrough.length; e++) {
					var f = Sf(a, b.fallthrough[e], c);
					if (f) return f
				}
			}
		}, Tf = a.isModifierKey = function(a) {
				var b = "string" == typeof a ? a : Jg[a.keyCode];
				return "Ctrl" == b || "Alt" == b || "Shift" == b || "Mod" == b
			}, Uf = a.keyName = function(a, b) {
				if (cf && 34 == a.keyCode && a["char"]) return !1;
				var c = Jg[a.keyCode],
					d = c;
				return null == d || a.altGraphKey ? !1 : (a.altKey && "Alt" != c && (d = "Alt-" + d), (nf ? a.metaKey : a.ctrlKey) && "Ctrl" != c && (d = "Ctrl-" + d), (nf ? a.ctrlKey : a.metaKey) && "Cmd" != c && (d = "Cmd-" + d), !b && a.shiftKey && "Shift" != c && (d = "Shift-" + d), d)
			};
		a.fromTextArea = function(b, c) {
			function d() {
				b.value = j.getValue()
			}
			if (c || (c = {}), c.value = b.value, !c.tabindex && b.tabindex && (c.tabindex = b.tabindex), !c.placeholder && b.placeholder && (c.placeholder = b.placeholder), null == c.autofocus) {
				var e = ze();
				c.autofocus = e == b || null != b.getAttribute("autofocus") && e == document.body
			}
			if (b.form && (ig(b.form, "submit", d), !c.leaveSubmitMethodAlone)) {
				var f = b.form,
					g = f.submit;
				try {
					var h = f.submit = function() {
						d(), f.submit = g, f.submit(), f.submit = h
					}
				} catch (i) {}
			}
			b.style.display = "none";
			var j = a(function(a) {
				b.parentNode.insertBefore(a, b.nextSibling)
			}, c);
			return j.save = d, j.getTextArea = function() {
				return b
			}, j.toTextArea = function() {
				j.toTextArea = isNaN, d(), b.parentNode.removeChild(j.getWrapperElement()), b.style.display = "", b.form && (jg(b.form, "submit", d), "function" == typeof b.form.submit && (b.form.submit = g))
			}, j
		};
		var Vf = a.StringStream = function(a, b) {
			this.pos = this.start = 0, this.string = a, this.tabSize = b || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0
		};
		Vf.prototype = {
			eol: function() {
				return this.pos >= this.string.length
			},
			sol: function() {
				return this.pos == this.lineStart
			},
			peek: function() {
				return this.string.charAt(this.pos) || void 0
			},
			next: function() {
				return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0
			},
			eat: function(a) {
				var b = this.string.charAt(this.pos);
				if ("string" == typeof a) var c = b == a;
				else var c = b && (a.test ? a.test(b) : a(b));
				return c ? (++this.pos, b) : void 0
			},
			eatWhile: function(a) {
				for (var b = this.pos; this.eat(a););
				return this.pos > b
			},
			eatSpace: function() {
				for (var a = this.pos;
					/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;
				return this.pos > a
			},
			skipToEnd: function() {
				this.pos = this.string.length
			},
			skipTo: function(a) {
				var b = this.string.indexOf(a, this.pos);
				return b > -1 ? (this.pos = b, !0) : void 0
			},
			backUp: function(a) {
				this.pos -= a
			},
			column: function() {
				return this.lastColumnPos < this.start && (this.lastColumnValue = rg(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? rg(this.string, this.lineStart, this.tabSize) : 0)
			},
			indentation: function() {
				return rg(this.string, null, this.tabSize) - (this.lineStart ? rg(this.string, this.lineStart, this.tabSize) : 0)
			},
			match: function(a, b, c) {
				if ("string" != typeof a) {
					var d = this.string.slice(this.pos).match(a);
					return d && d.index > 0 ? null : (d && b !== !1 && (this.pos += d[0].length), d)
				}
				var e = function(a) {
					return c ? a.toLowerCase() : a
				}, f = this.string.substr(this.pos, a.length);
				return e(f) == e(a) ? (b !== !1 && (this.pos += a.length), !0) : void 0
			},
			current: function() {
				return this.string.slice(this.start, this.pos)
			},
			hideFirstChars: function(a, b) {
				this.lineStart += a;
				try {
					return b()
				} finally {
					this.lineStart -= a
				}
			}
		};
		var Wf = a.TextMarker = function(a, b) {
			this.lines = [], this.type = b, this.doc = a
		};
		ie(Wf), Wf.prototype.clear = function() {
			if (!this.explicitlyCleared) {
				var a = this.doc.cm,
					b = a && !a.curOp;
				if (b && $a(a), he(this, "clear")) {
					var c = this.find();
					c && de(this, "clear", c.from, c.to)
				}
				for (var d = null, e = null, f = 0; f < this.lines.length; ++f) {
					var g = this.lines[f],
						h = Ic(g.markedSpans, this);
					a && !this.collapsed ? ob(a, Jd(g), "text") : a && (null != h.to && (e = Jd(g)), null != h.from && (d = Jd(g))), g.markedSpans = Jc(g.markedSpans, h), null == h.from && this.collapsed && !cd(this.doc, g) && a && Id(g, Ya(a.display))
				}
				if (a && this.collapsed && !a.options.lineWrapping)
					for (var f = 0; f < this.lines.length; ++f) {
						var i = $c(this.lines[f]),
							j = l(i);
						j > a.display.maxLineLength && (a.display.maxLine = i, a.display.maxLineLength = j, a.display.maxLineChanged = !0)
					}
				null != d && a && this.collapsed && nb(a, d, e + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, a && ma(a.doc)), a && de(a, "markerCleared", a, this), b && ab(a), this.parent && this.parent.clear()
			}
		}, Wf.prototype.find = function(a, b) {
			null == a && "bookmark" == this.type && (a = 1);
			for (var c, d, e = 0; e < this.lines.length; ++e) {
				var f = this.lines[e],
					g = Ic(f.markedSpans, this);
				if (null != g.from && (c = rf(b ? f : Jd(f), g.from), -1 == a)) return c;
				if (null != g.to && (d = rf(b ? f : Jd(f), g.to), 1 == a)) return d
			}
			return c && {
				from: c,
				to: d
			}
		}, Wf.prototype.changed = function() {
			var a = this.find(-1, !0),
				b = this,
				c = this.doc.cm;
			a && c && hb(c, function() {
				var d = a.line,
					e = Jd(a.line),
					f = Ga(c, e);
				if (f && (La(f), c.curOp.selectionChanged = c.curOp.forceUpdate = !0), c.curOp.updateMaxLine = !0, !cd(b.doc, d) && null != b.height) {
					var g = b.height;
					b.height = null;
					var h = fd(b) - g;
					h && Id(d, d.height + h)
				}
			})
		}, Wf.prototype.attachLine = function(a) {
			if (!this.lines.length && this.doc.cm) {
				var b = this.doc.cm.curOp;
				b.maybeHiddenMarkers && -1 != ne(b.maybeHiddenMarkers, this) || (b.maybeUnhiddenMarkers || (b.maybeUnhiddenMarkers = [])).push(this)
			}
			this.lines.push(a)
		}, Wf.prototype.detachLine = function(a) {
			if (this.lines.splice(ne(this.lines, a), 1), !this.lines.length && this.doc.cm) {
				var b = this.doc.cm.curOp;
				(b.maybeHiddenMarkers || (b.maybeHiddenMarkers = [])).push(this)
			}
		};
		var Xf = 0,
			Yf = a.SharedTextMarker = function(a, b) {
				this.markers = a, this.primary = b;
				for (var c = 0; c < a.length; ++c) a[c].parent = this
			};
		ie(Yf), Yf.prototype.clear = function() {
			if (!this.explicitlyCleared) {
				this.explicitlyCleared = !0;
				for (var a = 0; a < this.markers.length; ++a) this.markers[a].clear();
				de(this, "clear")
			}
		}, Yf.prototype.find = function(a, b) {
			return this.primary.find(a, b)
		};
		var Zf = a.LineWidget = function(a, b, c) {
			if (c)
				for (var d in c) c.hasOwnProperty(d) && (this[d] = c[d]);
			this.cm = a, this.node = b
		};
		ie(Zf), Zf.prototype.clear = function() {
			var a = this.cm,
				b = this.line.widgets,
				c = this.line,
				d = Jd(c);
			if (null != d && b) {
				for (var e = 0; e < b.length; ++e) b[e] == this && b.splice(e--, 1);
				b.length || (c.widgets = null);
				var f = fd(this);
				hb(a, function() {
					ed(a, c, -f), ob(a, d, "widget"), Id(c, Math.max(0, c.height - f))
				})
			}
		}, Zf.prototype.changed = function() {
			var a = this.height,
				b = this.cm,
				c = this.line;
			this.height = null;
			var d = fd(this) - a;
			d && hb(b, function() {
				b.curOp.forceUpdate = !0, ed(b, c, d), Id(c, c.height + d)
			})
		};
		var $f = a.Line = function(a, b, c) {
			this.text = a, Sc(this, b), this.height = c ? c(this) : 1
		};
		ie($f), $f.prototype.lineNo = function() {
			return Jd(this)
		};
		var _f = {}, ag = {};
		Bd.prototype = {
			chunkSize: function() {
				return this.lines.length
			},
			removeInner: function(a, b) {
				for (var c = a, d = a + b; d > c; ++c) {
					var e = this.lines[c];
					this.height -= e.height, id(e), de(e, "delete")
				}
				this.lines.splice(a, b)
			},
			collapse: function(a) {
				a.push.apply(a, this.lines)
			},
			insertInner: function(a, b, c) {
				this.height += c, this.lines = this.lines.slice(0, a).concat(b).concat(this.lines.slice(a));
				for (var d = 0; d < b.length; ++d) b[d].parent = this
			},
			iterN: function(a, b, c) {
				for (var d = a + b; d > a; ++a)
					if (c(this.lines[a])) return !0
			}
		}, Cd.prototype = {
			chunkSize: function() {
				return this.size
			},
			removeInner: function(a, b) {
				this.size -= b;
				for (var c = 0; c < this.children.length; ++c) {
					var d = this.children[c],
						e = d.chunkSize();
					if (e > a) {
						var f = Math.min(b, e - a),
							g = d.height;
						if (d.removeInner(a, f), this.height -= g - d.height, e == f && (this.children.splice(c--, 1), d.parent = null), 0 == (b -= f)) break;
						a = 0
					} else a -= e
				}
				if (this.size - b < 25 && (this.children.length > 1 || !(this.children[0] instanceof Bd))) {
					var h = [];
					this.collapse(h), this.children = [new Bd(h)], this.children[0].parent = this
				}
			},
			collapse: function(a) {
				for (var b = 0; b < this.children.length; ++b) this.children[b].collapse(a)
			},
			insertInner: function(a, b, c) {
				this.size += b.length, this.height += c;
				for (var d = 0; d < this.children.length; ++d) {
					var e = this.children[d],
						f = e.chunkSize();
					if (f >= a) {
						if (e.insertInner(a, b, c), e.lines && e.lines.length > 50) {
							for (; e.lines.length > 50;) {
								var g = e.lines.splice(e.lines.length - 25, 25),
									h = new Bd(g);
								e.height -= h.height, this.children.splice(d + 1, 0, h), h.parent = this
							}
							this.maybeSpill()
						}
						break
					}
					a -= f
				}
			},
			maybeSpill: function() {
				if (!(this.children.length <= 10)) {
					var a = this;
					do {
						var b = a.children.splice(a.children.length - 5, 5),
							c = new Cd(b);
						if (a.parent) {
							a.size -= c.size, a.height -= c.height;
							var d = ne(a.parent.children, a);
							a.parent.children.splice(d + 1, 0, c)
						} else {
							var e = new Cd(a.children);
							e.parent = a, a.children = [e, c], a = e
						}
						c.parent = a.parent
					} while (a.children.length > 10);
					a.parent.maybeSpill()
				}
			},
			iterN: function(a, b, c) {
				for (var d = 0; d < this.children.length; ++d) {
					var e = this.children[d],
						f = e.chunkSize();
					if (f > a) {
						var g = Math.min(b, f - a);
						if (e.iterN(a, g, c)) return !0;
						if (0 == (b -= g)) break;
						a = 0
					} else a -= f
				}
			}
		};
		var bg = 0,
			cg = a.Doc = function(a, b, c) {
				if (!(this instanceof cg)) return new cg(a, b, c);
				null == c && (c = 0), Cd.call(this, [new Bd([new $f("", null)])]), this.first = c, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.frontier = c;
				var d = rf(c, 0);
				this.sel = Y(d), this.history = new Nd(null), this.id = ++bg, this.modeOption = b, "string" == typeof a && (a = Fg(a)), Ad(this, {
					from: d,
					to: d,
					text: a
				}), ja(this, Y(d), og)
			};
		cg.prototype = pe(Cd.prototype, {
			constructor: cg,
			iter: function(a, b, c) {
				c ? this.iterN(a - this.first, b - a, c) : this.iterN(this.first, this.first + this.size, a)
			},
			insert: function(a, b) {
				for (var c = 0, d = 0; d < b.length; ++d) c += b[d].height;
				this.insertInner(a - this.first, b, c)
			},
			remove: function(a, b) {
				this.removeInner(a - this.first, b)
			},
			getValue: function(a) {
				var b = Hd(this, this.first, this.first + this.size);
				return a === !1 ? b : b.join(a || "\n")
			},
			setValue: kb(function(a) {
				var b = rf(this.first, 0),
					c = this.first + this.size - 1;
				gc(this, {
					from: b,
					to: rf(c, Fd(this, c).text.length),
					text: Fg(a),
					origin: "setValue"
				}, !0), ja(this, Y(b))
			}),
			replaceRange: function(a, b, c, d) {
				b = $(this, b), c = c ? $(this, c) : b, mc(this, a, b, c, d)
			},
			getRange: function(a, b, c) {
				var d = Gd(this, $(this, a), $(this, b));
				return c === !1 ? d : d.join(c || "\n")
			},
			getLine: function(a) {
				var b = this.getLineHandle(a);
				return b && b.text
			},
			getLineHandle: function(a) {
				return aa(this, a) ? Fd(this, a) : void 0
			},
			getLineNumber: function(a) {
				return Jd(a)
			},
			getLineHandleVisualStart: function(a) {
				return "number" == typeof a && (a = Fd(this, a)), $c(a)
			},
			lineCount: function() {
				return this.size
			},
			firstLine: function() {
				return this.first
			},
			lastLine: function() {
				return this.first + this.size - 1
			},
			clipPos: function(a) {
				return $(this, a)
			},
			getCursor: function(a) {
				var b, c = this.sel.primary();
				return b = null == a || "head" == a ? c.head : "anchor" == a ? c.anchor : "end" == a || "to" == a || a === !1 ? c.to() : c.from()
			},
			listSelections: function() {
				return this.sel.ranges
			},
			somethingSelected: function() {
				return this.sel.somethingSelected()
			},
			setCursor: kb(function(a, b, c) {
				ga(this, $(this, "number" == typeof a ? rf(a, b || 0) : a), null, c)
			}),
			setSelection: kb(function(a, b, c) {
				ga(this, $(this, a), $(this, b || a), c)
			}),
			extendSelection: kb(function(a, b, c) {
				da(this, $(this, a), b && $(this, b), c)
			}),
			extendSelections: kb(function(a, b) {
				ea(this, ba(this, a, b))
			}),
			extendSelectionsBy: kb(function(a, b) {
				ea(this, oe(this.sel.ranges, a), b)
			}),
			setSelections: kb(function(a, b, c) {
				if (a.length) {
					for (var d = 0, e = []; d < a.length; d++) e[d] = new W($(this, a[d].anchor), $(this, a[d].head));
					null == b && (b = Math.min(a.length - 1, this.sel.primIndex)), ja(this, X(e, b), c)
				}
			}),
			addSelection: kb(function(a, b, c) {
				var d = this.sel.ranges.slice(0);
				d.push(new W($(this, a), $(this, b || a))), ja(this, X(d, d.length - 1), c)
			}),
			getSelection: function(a) {
				for (var b, c = this.sel.ranges, d = 0; d < c.length; d++) {
					var e = Gd(this, c[d].from(), c[d].to());
					b = b ? b.concat(e) : e
				}
				return a === !1 ? b : b.join(a || "\n")
			},
			getSelections: function(a) {
				for (var b = [], c = this.sel.ranges, d = 0; d < c.length; d++) {
					var e = Gd(this, c[d].from(), c[d].to());
					a !== !1 && (e = e.join(a || "\n")), b[d] = e
				}
				return b
			},
			replaceSelection: function(a, b, c) {
				for (var d = [], e = 0; e < this.sel.ranges.length; e++) d[e] = a;
				this.replaceSelections(d, b, c || "+input")
			},
			replaceSelections: kb(function(a, b, c) {
				for (var d = [], e = this.sel, f = 0; f < e.ranges.length; f++) {
					var g = e.ranges[f];
					d[f] = {
						from: g.from(),
						to: g.to(),
						text: Fg(a[f]),
						origin: c
					}
				}
				for (var h = b && "end" != b && ec(this, d, b), f = d.length - 1; f >= 0; f--) gc(this, d[f]);
				h ? ia(this, h) : this.cm && sc(this.cm)
			}),
			undo: kb(function() {
				ic(this, "undo")
			}),
			redo: kb(function() {
				ic(this, "redo")
			}),
			undoSelection: kb(function() {
				ic(this, "undo", !0)
			}),
			redoSelection: kb(function() {
				ic(this, "redo", !0)
			}),
			setExtending: function(a) {
				this.extend = a
			},
			getExtending: function() {
				return this.extend
			},
			historySize: function() {
				for (var a = this.history, b = 0, c = 0, d = 0; d < a.done.length; d++) a.done[d].ranges || ++b;
				for (var d = 0; d < a.undone.length; d++) a.undone[d].ranges || ++c;
				return {
					undo: b,
					redo: c
				}
			},
			clearHistory: function() {
				this.history = new Nd(this.history.maxGeneration)
			},
			markClean: function() {
				this.cleanGeneration = this.changeGeneration(!0)
			},
			changeGeneration: function(a) {
				return a && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
			},
			isClean: function(a) {
				return this.history.generation == (a || this.cleanGeneration)
			},
			getHistory: function() {
				return {
					done: Yd(this.history.done),
					undone: Yd(this.history.undone)
				}
			},
			setHistory: function(a) {
				var b = this.history = new Nd(this.history.maxGeneration);
				b.done = Yd(a.done.slice(0), null, !0), b.undone = Yd(a.undone.slice(0), null, !0)
			},
			addLineClass: kb(function(a, b, c) {
				return vc(this, a, "gutter" == b ? "gutter" : "class", function(a) {
					var d = "text" == b ? "textClass" : "background" == b ? "bgClass" : "gutter" == b ? "gutterClass" : "wrapClass";
					if (a[d]) {
						if (Ae(c).test(a[d])) return !1;
						a[d] += " " + c
					} else a[d] = c;
					return !0
				})
			}),
			removeLineClass: kb(function(a, b, c) {
				return vc(this, a, "class", function(a) {
					var d = "text" == b ? "textClass" : "background" == b ? "bgClass" : "gutter" == b ? "gutterClass" : "wrapClass",
						e = a[d];
					if (!e) return !1;
					if (null == c) a[d] = null;
					else {
						var f = e.match(Ae(c));
						if (!f) return !1;
						var g = f.index + f[0].length;
						a[d] = e.slice(0, f.index) + (f.index && g != e.length ? " " : "") + e.slice(g) || null
					}
					return !0
				})
			}),
			markText: function(a, b, c) {
				return Cc(this, $(this, a), $(this, b), c, "range")
			},
			setBookmark: function(a, b) {
				var c = {
					replacedWith: b && (null == b.nodeType ? b.widget : b),
					insertLeft: b && b.insertLeft,
					clearWhenEmpty: !1,
					shared: b && b.shared
				};
				return a = $(this, a), Cc(this, a, a, c, "bookmark")
			},
			findMarksAt: function(a) {
				a = $(this, a);
				var b = [],
					c = Fd(this, a.line).markedSpans;
				if (c)
					for (var d = 0; d < c.length; ++d) {
						var e = c[d];
						(null == e.from || e.from <= a.ch) && (null == e.to || e.to >= a.ch) && b.push(e.marker.parent || e.marker)
					}
				return b
			},
			findMarks: function(a, b, c) {
				a = $(this, a), b = $(this, b);
				var d = [],
					e = a.line;
				return this.iter(a.line, b.line + 1, function(f) {
					var g = f.markedSpans;
					if (g)
						for (var h = 0; h < g.length; h++) {
							var i = g[h];
							e == a.line && a.ch > i.to || null == i.from && e != a.line || e == b.line && i.from > b.ch || c && !c(i.marker) || d.push(i.marker.parent || i.marker)
						}++e
				}), d
			},
			getAllMarks: function() {
				var a = [];
				return this.iter(function(b) {
					var c = b.markedSpans;
					if (c)
						for (var d = 0; d < c.length; ++d) null != c[d].from && a.push(c[d].marker)
				}), a
			},
			posFromIndex: function(a) {
				var b, c = this.first;
				return this.iter(function(d) {
					var e = d.text.length + 1;
					return e > a ? (b = a, !0) : (a -= e, void++c)
				}), $(this, rf(c, b))
			},
			indexFromPos: function(a) {
				a = $(this, a);
				var b = a.ch;
				return a.line < this.first || a.ch < 0 ? 0 : (this.iter(this.first, a.line, function(a) {
					b += a.text.length + 1
				}), b)
			},
			copy: function(a) {
				var b = new cg(Hd(this, this.first, this.first + this.size), this.modeOption, this.first);
				return b.scrollTop = this.scrollTop, b.scrollLeft = this.scrollLeft, b.sel = this.sel, b.extend = !1, a && (b.history.undoDepth = this.history.undoDepth, b.setHistory(this.getHistory())), b
			},
			linkedDoc: function(a) {
				a || (a = {});
				var b = this.first,
					c = this.first + this.size;
				null != a.from && a.from > b && (b = a.from), null != a.to && a.to < c && (c = a.to);
				var d = new cg(Hd(this, b, c), a.mode || this.modeOption, b);
				return a.sharedHist && (d.history = this.history), (this.linked || (this.linked = [])).push({
					doc: d,
					sharedHist: a.sharedHist
				}), d.linked = [{
					doc: this,
					isParent: !0,
					sharedHist: a.sharedHist
				}], Fc(d, Ec(this)), d
			},
			unlinkDoc: function(b) {
				if (b instanceof a && (b = b.doc), this.linked)
					for (var c = 0; c < this.linked.length; ++c) {
						var d = this.linked[c];
						if (d.doc == b) {
							this.linked.splice(c, 1), b.unlinkDoc(this), Gc(Ec(this));
							break
						}
					}
				if (b.history == this.history) {
					var e = [b.id];
					Dd(b, function(a) {
						e.push(a.id)
					}, !0), b.history = new Nd(null), b.history.done = Yd(this.history.done, e), b.history.undone = Yd(this.history.undone, e)
				}
			},
			iterLinkedDocs: function(a) {
				Dd(this, a)
			},
			getMode: function() {
				return this.mode
			},
			getEditor: function() {
				return this.cm
			}
		}), cg.prototype.eachLine = cg.prototype.iter;
		var dg = "iter insert remove copy getEditor".split(" ");
		for (var eg in cg.prototype) cg.prototype.hasOwnProperty(eg) && ne(dg, eg) < 0 && (a.prototype[eg] = function(a) {
			return function() {
				return a.apply(this.doc, arguments)
			}
		}(cg.prototype[eg]));
		ie(cg);
		var fg = a.e_preventDefault = function(a) {
			a.preventDefault ? a.preventDefault() : a.returnValue = !1
		}, gg = a.e_stopPropagation = function(a) {
				a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
			}, hg = a.e_stop = function(a) {
				fg(a), gg(a)
			}, ig = a.on = function(a, b, c) {
				if (a.addEventListener) a.addEventListener(b, c, !1);
				else if (a.attachEvent) a.attachEvent("on" + b, c);
				else {
					var d = a._handlers || (a._handlers = {}),
						e = d[b] || (d[b] = []);
					e.push(c)
				}
			}, jg = a.off = function(a, b, c) {
				if (a.removeEventListener) a.removeEventListener(b, c, !1);
				else if (a.detachEvent) a.detachEvent("on" + b, c);
				else {
					var d = a._handlers && a._handlers[b];
					if (!d) return;
					for (var e = 0; e < d.length; ++e)
						if (d[e] == c) {
							d.splice(e, 1);
							break
						}
				}
			}, kg = a.signal = function(a, b) {
				var c = a._handlers && a._handlers[b];
				if (c)
					for (var d = Array.prototype.slice.call(arguments, 2), e = 0; e < c.length; ++e) c[e].apply(null, d)
			}, lg = null,
			mg = 30,
			ng = a.Pass = {
				toString: function() {
					return "CodeMirror.Pass"
				}
			}, og = {
				scroll: !1
			}, pg = {
				origin: "*mouse"
			}, qg = {
				origin: "+move"
			};
		je.prototype.set = function(a, b) {
			clearTimeout(this.id), this.id = setTimeout(b, a)
		};
		var rg = a.countColumn = function(a, b, c, d, e) {
			null == b && (b = a.search(/[^\s\u00a0]/), -1 == b && (b = a.length));
			for (var f = d || 0, g = e || 0;;) {
				var h = a.indexOf("	", f);
				if (0 > h || h >= b) return g + (b - f);
				g += h - f, g += c - g % c, f = h + 1
			}
		}, sg = [""],
			tg = function(a) {
				a.select()
			};
		hf ? tg = function(a) {
			a.selectionStart = 0, a.selectionEnd = a.value.length
		} : Ze && (tg = function(a) {
			try {
				a.select()
			} catch (b) {}
		}), [].indexOf && (ne = function(a, b) {
			return a.indexOf(b)
		}), [].map && (oe = function(a, b) {
			return a.map(b)
		});
		var ug, vg = /[\u00df\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
			wg = a.isWordChar = function(a) {
				return /\w/.test(a) || a > "" && (a.toUpperCase() != a.toLowerCase() || vg.test(a))
			}, xg = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
		ug = document.createRange ? function(a, b, c) {
			var d = document.createRange();
			return d.setEnd(a, c), d.setStart(a, b), d
		} : function(a, b, c) {
			var d = document.body.createTextRange();
			try {
				d.moveToElementText(a.parentNode)
			} catch (e) {
				return d
			}
			return d.collapse(!0), d.moveEnd("character", c), d.moveStart("character", b), d
		}, Ze && 11 > $e && (ze = function() {
			try {
				return document.activeElement
			} catch (a) {
				return document.body
			}
		});
		var yg, zg, Ag, Bg = a.rmClass = function(a, b) {
				var c = a.className,
					d = Ae(b).exec(c);
				if (d) {
					var e = c.slice(d.index + d[0].length);
					a.className = c.slice(0, d.index) + (e ? d[1] + e : "")
				}
			}, Cg = a.addClass = function(a, b) {
				var c = a.className;
				Ae(b).test(c) || (a.className += (c ? " " : "") + b)
			}, Dg = !1,
			Eg = function() {
				if (Ze && 9 > $e) return !1;
				var a = ve("div");
				return "draggable" in a || "dragDrop" in a
			}(),
			Fg = a.splitLines = 3 != "\n\nb".split(/\n/).length ? function(a) {
				for (var b = 0, c = [], d = a.length; d >= b;) {
					var e = a.indexOf("\n", b); - 1 == e && (e = a.length);
					var f = a.slice(b, "\r" == a.charAt(e - 1) ? e - 1 : e),
						g = f.indexOf("\r"); - 1 != g ? (c.push(f.slice(0, g)), b += g + 1) : (c.push(f), b = e + 1)
				}
				return c
			} : function(a) {
				return a.split(/\r\n?|\n/)
			}, Gg = window.getSelection ? function(a) {
				try {
					return a.selectionStart != a.selectionEnd
				} catch (b) {
					return !1
				}
			} : function(a) {
				try {
					var b = a.ownerDocument.selection.createRange()
				} catch (c) {}
				return b && b.parentElement() == a ? 0 != b.compareEndPoints("StartToEnd", b) : !1
			}, Hg = function() {
				var a = ve("div");
				return "oncopy" in a ? !0 : (a.setAttribute("oncopy", "return;"), "function" == typeof a.oncopy)
			}(),
			Ig = null,
			Jg = {
				3: "Enter",
				8: "Backspace",
				9: "Tab",
				13: "Enter",
				16: "Shift",
				17: "Ctrl",
				18: "Alt",
				19: "Pause",
				20: "CapsLock",
				27: "Esc",
				32: "Space",
				33: "PageUp",
				34: "PageDown",
				35: "End",
				36: "Home",
				37: "Left",
				38: "Up",
				39: "Right",
				40: "Down",
				44: "PrintScrn",
				45: "Insert",
				46: "Delete",
				59: ";",
				61: "=",
				91: "Mod",
				92: "Mod",
				93: "Mod",
				107: "=",
				109: "-",
				127: "Delete",
				173: "-",
				186: ";",
				187: "=",
				188: ",",
				189: "-",
				190: ".",
				191: "/",
				192: "`",
				219: "[",
				220: "\\",
				221: "]",
				222: "'",
				63232: "Up",
				63233: "Down",
				63234: "Left",
				63235: "Right",
				63272: "Delete",
				63273: "Home",
				63275: "End",
				63276: "PageUp",
				63277: "PageDown",
				63302: "Insert"
			};
		a.keyNames = Jg,
		function() {
			for (var a = 0; 10 > a; a++) Jg[a + 48] = Jg[a + 96] = String(a);
			for (var a = 65; 90 >= a; a++) Jg[a] = String.fromCharCode(a);
			for (var a = 1; 12 >= a; a++) Jg[a + 111] = Jg[a + 63235] = "F" + a
		}();
		var Kg, Lg = function() {
				function a(a) {
					return 247 >= a ? c.charAt(a) : a >= 1424 && 1524 >= a ? "R" : a >= 1536 && 1773 >= a ? d.charAt(a - 1536) : a >= 1774 && 2220 >= a ? "r" : a >= 8192 && 8203 >= a ? "w" : 8204 == a ? "b" : "L"
				}

				function b(a, b, c) {
					this.level = a, this.from = b, this.to = c
				}
				var c = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
					d = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",
					e = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
					f = /[stwN]/,
					g = /[LRr]/,
					h = /[Lb1n]/,
					i = /[1n]/,
					j = "L";
				return function(c) {
					if (!e.test(c)) return !1;
					for (var d, k = c.length, l = [], m = 0; k > m; ++m) l.push(d = a(c.charCodeAt(m)));
					for (var m = 0, n = j; k > m; ++m) {
						var d = l[m];
						"m" == d ? l[m] = n : n = d
					}
					for (var m = 0, o = j; k > m; ++m) {
						var d = l[m];
						"1" == d && "r" == o ? l[m] = "n" : g.test(d) && (o = d, "r" == d && (l[m] = "R"))
					}
					for (var m = 1, n = l[0]; k - 1 > m; ++m) {
						var d = l[m];
						"+" == d && "1" == n && "1" == l[m + 1] ? l[m] = "1" : "," != d || n != l[m + 1] || "1" != n && "n" != n || (l[m] = n), n = d
					}
					for (var m = 0; k > m; ++m) {
						var d = l[m];
						if ("," == d) l[m] = "N";
						else if ("%" == d) {
							for (var p = m + 1; k > p && "%" == l[p]; ++p);
							for (var q = m && "!" == l[m - 1] || k > p && "1" == l[p] ? "1" : "N", r = m; p > r; ++r) l[r] = q;
							m = p - 1
						}
					}
					for (var m = 0, o = j; k > m; ++m) {
						var d = l[m];
						"L" == o && "1" == d ? l[m] = "L" : g.test(d) && (o = d)
					}
					for (var m = 0; k > m; ++m)
						if (f.test(l[m])) {
							for (var p = m + 1; k > p && f.test(l[p]); ++p);
							for (var s = "L" == (m ? l[m - 1] : j), t = "L" == (k > p ? l[p] : j), q = s || t ? "L" : "R", r = m; p > r; ++r) l[r] = q;
							m = p - 1
						}
					for (var u, v = [], m = 0; k > m;)
						if (h.test(l[m])) {
							var w = m;
							for (++m; k > m && h.test(l[m]); ++m);
							v.push(new b(0, w, m))
						} else {
							var x = m,
								y = v.length;
							for (++m; k > m && "L" != l[m]; ++m);
							for (var r = x; m > r;)
								if (i.test(l[r])) {
									r > x && v.splice(y, 0, new b(1, x, r));
									var z = r;
									for (++r; m > r && i.test(l[r]); ++r);
									v.splice(y, 0, new b(2, z, r)), x = r
								} else ++r;
							m > x && v.splice(y, 0, new b(1, x, m))
						}
					return 1 == v[0].level && (u = c.match(/^\s+/)) && (v[0].from = u[0].length, v.unshift(new b(0, 0, u[0].length))), 1 == me(v).level && (u = c.match(/\s+$/)) && (me(v).to -= u[0].length, v.push(new b(0, k - u[0].length, k))), v[0].level != me(v).level && v.push(new b(v[0].level, k, k)), v
				}
			}();
		return a.version = "4.8.0", a
	}),
	function(a) {
		"object" == typeof exports && "object" == typeof module ? a(c("../../lib/codemirror")) : "function" == typeof d && d.amd ? d("bower_components/codemirror/addon/edit/closebrackets", ["../../lib/codemirror"], a) : a(CodeMirror)
	}(function(a) {
		function b(a, b) {
			var c = a.getRange(i(b.line, b.ch - 1), i(b.line, b.ch + 1));
			return 2 == c.length ? c : null
		}

		function c(b, c, d) {
			var e = b.getLine(c.line),
				f = b.getTokenAt(c);
			if (/\bstring2?\b/.test(f.type)) return !1;
			var g = new a.StringStream(e.slice(0, c.ch) + d + e.slice(c.ch), 4);
			for (g.pos = g.start = f.start;;) {
				var h = b.getMode().token(g, f.state);
				if (g.pos >= c.ch + 1) return /\bstring2?\b/.test(h);
				g.start = g.pos
			}
		}

		function d(d) {
			for (var e = {
				name: "autoCloseBrackets",
				Backspace: function(c) {
					if (c.getOption("disableInput")) return a.Pass;
					for (var e = c.listSelections(), f = 0; f < e.length; f++) {
						if (!e[f].empty()) return a.Pass;
						var g = b(c, e[f].head);
						if (!g || d.indexOf(g) % 2 != 0) return a.Pass
					}
					for (var f = e.length - 1; f >= 0; f--) {
						var h = e[f].head;
						c.replaceRange("", i(h.line, h.ch - 1), i(h.line, h.ch + 1))
					}
				}
			}, f = "", g = 0; g < d.length; g += 2)(function(b, d) {
				f += d, e["'" + b + "'"] = function(e) {
					if (e.getOption("disableInput")) return a.Pass;
					for (var g, j, k = e.listSelections(), l = 0; l < k.length; l++) {
						var m, n = k[l],
							o = n.head,
							j = e.getRange(o, i(o.line, o.ch + 1));
						if (n.empty())
							if (b == d && j == d) m = e.getRange(o, i(o.line, o.ch + 3)) == b + b + b ? "skipThree" : "skip";
							else
						if (b == d && o.ch > 1 && e.getRange(i(o.line, o.ch - 2), o) == b + b && (o.ch <= 2 || e.getRange(i(o.line, o.ch - 3), i(o.line, o.ch - 2)) != b)) m = "addFour";
						else if ('"' == b || "'" == b) {
							if (a.isWordChar(j) || !c(e, o, b)) return a.Pass;
							m = "both"
						} else {
							if (!(e.getLine(o.line).length == o.ch || f.indexOf(j) >= 0 || h.test(j))) return a.Pass;
							m = "both"
						} else m = "surround"; if (g) {
							if (g != m) return a.Pass
						} else g = m
					}
					e.operation(function() {
						if ("skip" == g) e.execCommand("goCharRight");
						else if ("skipThree" == g)
							for (var a = 0; 3 > a; a++) e.execCommand("goCharRight");
						else if ("surround" == g) {
							for (var c = e.getSelections(), a = 0; a < c.length; a++) c[a] = b + c[a] + d;
							e.replaceSelections(c, "around")
						} else "both" == g ? (e.replaceSelection(b + d, null), e.execCommand("goCharLeft")) : "addFour" == g && (e.replaceSelection(b + b + b + b, "before"), e.execCommand("goCharRight"))
					})
				}, b != d && (e["'" + d + "'"] = function(b) {
					for (var c = b.listSelections(), e = 0; e < c.length; e++) {
						var f = c[e];
						if (!f.empty() || b.getRange(f.head, i(f.head.line, f.head.ch + 1)) != d) return a.Pass
					}
					b.execCommand("goCharRight")
				})
			})(d.charAt(g), d.charAt(g + 1));
			return e
		}

		function e(c) {
			return function(d) {
				if (d.getOption("disableInput")) return a.Pass;
				for (var e = d.listSelections(), f = 0; f < e.length; f++) {
					if (!e[f].empty()) return a.Pass;
					var g = b(d, e[f].head);
					if (!g || c.indexOf(g) % 2 != 0) return a.Pass
				}
				d.operation(function() {
					d.replaceSelection("\n\n", null), d.execCommand("goCharLeft"), e = d.listSelections();
					for (var a = 0; a < e.length; a++) {
						var b = e[a].head.line;
						d.indentLine(b, null, !0), d.indentLine(b + 1, null, !0)
					}
				})
			}
		}
		var f = "()[]{}''\"\"",
			g = "[]{}",
			h = /\s/,
			i = a.Pos;
		a.defineOption("autoCloseBrackets", !1, function(b, c, h) {
			if (h != a.Init && h && b.removeKeyMap("autoCloseBrackets"), c) {
				var i = f,
					j = g;
				"string" == typeof c ? i = c : "object" == typeof c && (null != c.pairs && (i = c.pairs), null != c.explode && (j = c.explode));
				var k = d(i);
				j && (k.Enter = e(j)), b.addKeyMap(k)
			}
		})
	}),
	function(a) {
		"object" == typeof exports && "object" == typeof module ? a(c("../../lib/codemirror")) : "function" == typeof d && d.amd ? d("bower_components/codemirror/addon/edit/matchbrackets", ["../../lib/codemirror"], a) : a(CodeMirror)
	}(function(a) {
		function b(a, b, d, e) {
			var f = a.getLineHandle(b.line),
				i = b.ch - 1,
				j = i >= 0 && h[f.text.charAt(i)] || h[f.text.charAt(++i)];
			if (!j) return null;
			var k = ">" == j.charAt(1) ? 1 : -1;
			if (d && k > 0 != (i == b.ch)) return null;
			var l = a.getTokenTypeAt(g(b.line, i + 1)),
				m = c(a, g(b.line, i + (k > 0 ? 1 : 0)), k, l || null, e);
			return null == m ? null : {
				from: g(b.line, i),
				to: m && m.pos,
				match: m && m.ch == j.charAt(0),
				forward: k > 0
			}
		}

		function c(a, b, c, d, e) {
			for (var f = e && e.maxScanLineLength || 1e4, i = e && e.maxScanLines || 1e3, j = [], k = e && e.bracketRegex ? e.bracketRegex : /[(){}[\]]/, l = c > 0 ? Math.min(b.line + i, a.lastLine() + 1) : Math.max(a.firstLine() - 1, b.line - i), m = b.line; m != l; m += c) {
				var n = a.getLine(m);
				if (n) {
					var o = c > 0 ? 0 : n.length - 1,
						p = c > 0 ? n.length : -1;
					if (!(n.length > f))
						for (m == b.line && (o = b.ch - (0 > c ? 1 : 0)); o != p; o += c) {
							var q = n.charAt(o);
							if (k.test(q) && (void 0 === d || a.getTokenTypeAt(g(m, o + 1)) == d)) {
								var r = h[q];
								if (">" == r.charAt(1) == c > 0) j.push(q);
								else {
									if (!j.length) return {
										pos: g(m, o),
										ch: q
									};
									j.pop()
								}
							}
						}
				}
			}
			return m - c == (c > 0 ? a.lastLine() : a.firstLine()) ? !1 : null
		}

		function d(a, c, d) {
			for (var e = a.state.matchBrackets.maxHighlightLineLength || 1e3, h = [], i = a.listSelections(), j = 0; j < i.length; j++) {
				var k = i[j].empty() && b(a, i[j].head, !1, d);
				if (k && a.getLine(k.from.line).length <= e) {
					var l = k.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
					h.push(a.markText(k.from, g(k.from.line, k.from.ch + 1), {
						className: l
					})), k.to && a.getLine(k.to.line).length <= e && h.push(a.markText(k.to, g(k.to.line, k.to.ch + 1), {
						className: l
					}))
				}
			}
			if (h.length) {
				f && a.state.focused && a.display.input.focus();
				var m = function() {
					a.operation(function() {
						for (var a = 0; a < h.length; a++) h[a].clear()
					})
				};
				if (!c) return m;
				setTimeout(m, 800)
			}
		}

		function e(a) {
			a.operation(function() {
				i && (i(), i = null), i = d(a, !1, a.state.matchBrackets)
			})
		}
		var f = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 8),
			g = a.Pos,
			h = {
				"(": ")>",
				")": "(<",
				"[": "]>",
				"]": "[<",
				"{": "}>",
				"}": "{<"
			}, i = null;
		a.defineOption("matchBrackets", !1, function(b, c, d) {
			d && d != a.Init && b.off("cursorActivity", e),
			c && (b.state.matchBrackets = "object" == typeof c ? c : {}, b.on("cursorActivity", e))
		}), a.defineExtension("matchBrackets", function() {
			d(this, !0)
		}), a.defineExtension("findMatchingBracket", function(a, c, d) {
			return b(this, a, c, d)
		}), a.defineExtension("scanForBracket", function(a, b, d, e) {
			return c(this, a, b, d, e)
		})
	}),
	function(a) {
		"object" == typeof exports && "object" == typeof module ? a(c("../../lib/codemirror")) : "function" == typeof d && d.amd ? d("bower_components/codemirror/addon/lint/lint", ["../../lib/codemirror"], a) : a(CodeMirror)
	}(function(a) {
		function b(b, c) {
			function d(b) {
				return e.parentNode ? (e.style.top = Math.max(0, b.clientY - e.offsetHeight - 5) + "px", void(e.style.left = b.clientX + 5 + "px")) : a.off(document, "mousemove", d)
			}
			var e = document.createElement("div");
			return e.className = "CodeMirror-lint-tooltip", e.appendChild(c.cloneNode(!0)), document.body.appendChild(e), a.on(document, "mousemove", d), d(b), null != e.style.opacity && (e.style.opacity = 1), e
		}

		function c(a) {
			a.parentNode && a.parentNode.removeChild(a)
		}

		function d(a) {
			a.parentNode && (null == a.style.opacity && c(a), a.style.opacity = 0, setTimeout(function() {
				c(a)
			}, 600))
		}

		function e(c, e, f) {
			function g() {
				a.off(f, "mouseout", g), h && (d(h), h = null)
			}
			var h = b(c, e),
				i = setInterval(function() {
					if (h)
						for (var a = f;; a = a.parentNode) {
							if (a == document.body) return;
							if (!a) {
								g();
								break
							}
						}
					return h ? void 0 : clearInterval(i)
				}, 400);
			a.on(f, "mouseout", g)
		}

		function f(a, b, c) {
			this.marked = [], this.options = b, this.timeout = null, this.hasGutter = c, this.onMouseOver = function(b) {
				q(a, b)
			}
		}

		function g(b, c) {
			if (c instanceof Function) return {
				getAnnotations: c
			};
			if (c && c !== !0 || (c = {}), c.getAnnotations || (c.getAnnotations = b.getHelper(a.Pos(0, 0), "lint")), !c.getAnnotations) throw new Error("Required option 'getAnnotations' missing (lint addon)");
			return c
		}

		function h(a) {
			var b = a.state.lint;
			b.hasGutter && a.clearGutter(r);
			for (var c = 0; c < b.marked.length; ++c) b.marked[c].clear();
			b.marked.length = 0
		}

		function i(b, c, d, f) {
			var g = document.createElement("div"),
				h = g;
			return g.className = "CodeMirror-lint-marker-" + c, d && (h = g.appendChild(document.createElement("div")), h.className = "CodeMirror-lint-marker-multiple"), 0 != f && a.on(h, "mouseover", function(a) {
				e(a, b, h)
			}), g
		}

		function j(a, b) {
			return "error" == a ? a : b
		}

		function k(a) {
			for (var b = [], c = 0; c < a.length; ++c) {
				var d = a[c],
					e = d.from.line;
				(b[e] || (b[e] = [])).push(d)
			}
			return b
		}

		function l(a) {
			var b = a.severity;
			b || (b = "error");
			var c = document.createElement("div");
			return c.className = "CodeMirror-lint-message-" + b, c.appendChild(document.createTextNode(a.message)), c
		}

		function m(a) {
			var b = a.state.lint,
				c = b.options,
				d = c.options || c;
			c.async ? c.getAnnotations(a.getValue(), n, d, a) : n(a, c.getAnnotations(a.getValue(), d, a))
		}

		function n(a, b) {
			h(a);
			for (var c = a.state.lint, d = c.options, e = k(b), f = 0; f < e.length; ++f) {
				var g = e[f];
				if (g) {
					for (var m = null, n = c.hasGutter && document.createDocumentFragment(), o = 0; o < g.length; ++o) {
						var p = g[o],
							q = p.severity;
						q || (q = "error"), m = j(m, q), d.formatAnnotation && (p = d.formatAnnotation(p)), c.hasGutter && n.appendChild(l(p)), p.to && c.marked.push(a.markText(p.from, p.to, {
							className: "CodeMirror-lint-mark-" + q,
							__annotation: p
						}))
					}
					c.hasGutter && a.setGutterMarker(f, r, i(n, m, g.length > 1, c.options.tooltips))
				}
			}
			d.onUpdateLinting && d.onUpdateLinting(b, e, a)
		}

		function o(a) {
			var b = a.state.lint;
			clearTimeout(b.timeout), b.timeout = setTimeout(function() {
				m(a)
			}, b.options.delay || 500)
		}

		function p(a, b) {
			var c = b.target || b.srcElement;
			e(b, l(a), c)
		}

		function q(a, b) {
			var c = b.target || b.srcElement;
			if (/\bCodeMirror-lint-mark-/.test(c.className))
				for (var d = c.getBoundingClientRect(), e = (d.left + d.right) / 2, f = (d.top + d.bottom) / 2, g = a.findMarksAt(a.coordsChar({
						left: e,
						top: f
					}, "client")), h = 0; h < g.length; ++h) {
					var i = g[h].__annotation;
					if (i) return p(i, b)
				}
		}
		var r = "CodeMirror-lint-markers";
		a.defineOption("lint", !1, function(b, c, d) {
			if (d && d != a.Init && (h(b), b.off("change", o), a.off(b.getWrapperElement(), "mouseover", b.state.lint.onMouseOver), delete b.state.lint), c) {
				for (var e = b.getOption("gutters"), i = !1, j = 0; j < e.length; ++j) e[j] == r && (i = !0);
				var k = b.state.lint = new f(b, g(b, c), i);
				b.on("change", o), 0 != k.options.tooltips && a.on(b.getWrapperElement(), "mouseover", k.onMouseOver), m(b)
			}
		})
	});
	var e = function() {
		var a = {
			trace: function() {},
			yy: {},
			symbols_: {
				error: 2,
				JSONString: 3,
				STRING: 4,
				JSONNumber: 5,
				NUMBER: 6,
				JSONNullLiteral: 7,
				NULL: 8,
				JSONBooleanLiteral: 9,
				TRUE: 10,
				FALSE: 11,
				JSONText: 12,
				JSONValue: 13,
				EOF: 14,
				JSONObject: 15,
				JSONArray: 16,
				"{": 17,
				"}": 18,
				JSONMemberList: 19,
				JSONMember: 20,
				":": 21,
				",": 22,
				"[": 23,
				"]": 24,
				JSONElementList: 25,
				$accept: 0,
				$end: 1
			},
			terminals_: {
				2: "error",
				4: "STRING",
				6: "NUMBER",
				8: "NULL",
				10: "TRUE",
				11: "FALSE",
				14: "EOF",
				17: "{",
				18: "}",
				21: ":",
				22: ",",
				23: "[",
				24: "]"
			},
			productions_: [0, [3, 1],
				[5, 1],
				[7, 1],
				[9, 1],
				[9, 1],
				[12, 2],
				[13, 1],
				[13, 1],
				[13, 1],
				[13, 1],
				[13, 1],
				[13, 1],
				[15, 2],
				[15, 3],
				[20, 3],
				[19, 1],
				[19, 3],
				[16, 2],
				[16, 3],
				[25, 1],
				[25, 3]
			],
			performAction: function(a, b, c, d, e, f) {
				var g = f.length - 1;
				switch (e) {
					case 1:
						this.$ = a.replace(/\\(\\|")/g, "$1").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "	").replace(/\\v/g, "").replace(/\\f/g, "\f").replace(/\\b/g, "\b");
						break;
					case 2:
						this.$ = Number(a);
						break;
					case 3:
						this.$ = null;
						break;
					case 4:
						this.$ = !0;
						break;
					case 5:
						this.$ = !1;
						break;
					case 6:
						return this.$ = f[g - 1];
					case 13:
						this.$ = {};
						break;
					case 14:
						this.$ = f[g - 1];
						break;
					case 15:
						this.$ = [f[g - 2], f[g]];
						break;
					case 16:
						this.$ = {}, this.$[f[g][0]] = f[g][1];
						break;
					case 17:
						this.$ = f[g - 2], f[g - 2][f[g][0]] = f[g][1];
						break;
					case 18:
						this.$ = [];
						break;
					case 19:
						this.$ = f[g - 1];
						break;
					case 20:
						this.$ = [f[g]];
						break;
					case 21:
						this.$ = f[g - 2], f[g - 2].push(f[g])
				}
			},
			table: [{
				3: 5,
				4: [1, 12],
				5: 6,
				6: [1, 13],
				7: 3,
				8: [1, 9],
				9: 4,
				10: [1, 10],
				11: [1, 11],
				12: 1,
				13: 2,
				15: 7,
				16: 8,
				17: [1, 14],
				23: [1, 15]
			}, {
				1: [3]
			}, {
				14: [1, 16]
			}, {
				14: [2, 7],
				18: [2, 7],
				22: [2, 7],
				24: [2, 7]
			}, {
				14: [2, 8],
				18: [2, 8],
				22: [2, 8],
				24: [2, 8]
			}, {
				14: [2, 9],
				18: [2, 9],
				22: [2, 9],
				24: [2, 9]
			}, {
				14: [2, 10],
				18: [2, 10],
				22: [2, 10],
				24: [2, 10]
			}, {
				14: [2, 11],
				18: [2, 11],
				22: [2, 11],
				24: [2, 11]
			}, {
				14: [2, 12],
				18: [2, 12],
				22: [2, 12],
				24: [2, 12]
			}, {
				14: [2, 3],
				18: [2, 3],
				22: [2, 3],
				24: [2, 3]
			}, {
				14: [2, 4],
				18: [2, 4],
				22: [2, 4],
				24: [2, 4]
			}, {
				14: [2, 5],
				18: [2, 5],
				22: [2, 5],
				24: [2, 5]
			}, {
				14: [2, 1],
				18: [2, 1],
				21: [2, 1],
				22: [2, 1],
				24: [2, 1]
			}, {
				14: [2, 2],
				18: [2, 2],
				22: [2, 2],
				24: [2, 2]
			}, {
				3: 20,
				4: [1, 12],
				18: [1, 17],
				19: 18,
				20: 19
			}, {
				3: 5,
				4: [1, 12],
				5: 6,
				6: [1, 13],
				7: 3,
				8: [1, 9],
				9: 4,
				10: [1, 10],
				11: [1, 11],
				13: 23,
				15: 7,
				16: 8,
				17: [1, 14],
				23: [1, 15],
				24: [1, 21],
				25: 22
			}, {
				1: [2, 6]
			}, {
				14: [2, 13],
				18: [2, 13],
				22: [2, 13],
				24: [2, 13]
			}, {
				18: [1, 24],
				22: [1, 25]
			}, {
				18: [2, 16],
				22: [2, 16]
			}, {
				21: [1, 26]
			}, {
				14: [2, 18],
				18: [2, 18],
				22: [2, 18],
				24: [2, 18]
			}, {
				22: [1, 28],
				24: [1, 27]
			}, {
				22: [2, 20],
				24: [2, 20]
			}, {
				14: [2, 14],
				18: [2, 14],
				22: [2, 14],
				24: [2, 14]
			}, {
				3: 20,
				4: [1, 12],
				20: 29
			}, {
				3: 5,
				4: [1, 12],
				5: 6,
				6: [1, 13],
				7: 3,
				8: [1, 9],
				9: 4,
				10: [1, 10],
				11: [1, 11],
				13: 30,
				15: 7,
				16: 8,
				17: [1, 14],
				23: [1, 15]
			}, {
				14: [2, 19],
				18: [2, 19],
				22: [2, 19],
				24: [2, 19]
			}, {
				3: 5,
				4: [1, 12],
				5: 6,
				6: [1, 13],
				7: 3,
				8: [1, 9],
				9: 4,
				10: [1, 10],
				11: [1, 11],
				13: 31,
				15: 7,
				16: 8,
				17: [1, 14],
				23: [1, 15]
			}, {
				18: [2, 17],
				22: [2, 17]
			}, {
				18: [2, 15],
				22: [2, 15]
			}, {
				22: [2, 21],
				24: [2, 21]
			}],
			defaultActions: {
				16: [2, 6]
			},
			parseError: function(a) {
				throw new Error(a)
			},
			parse: function(a) {
				function b(a) {
					e.length = e.length - 2 * a, f.length = f.length - a, g.length = g.length - a
				}

				function c() {
					var a;
					return a = d.lexer.lex() || 1, "number" != typeof a && (a = d.symbols_[a] || a), a
				}
				var d = this,
					e = [0],
					f = [null],
					g = [],
					h = this.table,
					i = "",
					j = 0,
					k = 0,
					l = 0,
					m = 2,
					n = 1;
				this.lexer.setInput(a), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
				var o = this.lexer.yylloc;
				g.push(o), "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
				for (var p, q, r, s, t, u, v, w, x, y = {};;) {
					if (r = e[e.length - 1], this.defaultActions[r] ? s = this.defaultActions[r] : (null == p && (p = c()), s = h[r] && h[r][p]), "undefined" == typeof s || !s.length || !s[0]) {
						if (!l) {
							x = [];
							for (u in h[r]) this.terminals_[u] && u > 2 && x.push("'" + this.terminals_[u] + "'");
							var z = "";
							z = this.lexer.showPosition ? "Parse error on line " + (j + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + x.join(", ") + ", got '" + this.terminals_[p] + "'" : "Parse error on line " + (j + 1) + ": Unexpected " + (1 == p ? "end of input" : "'" + (this.terminals_[p] || p) + "'"), this.parseError(z, {
								text: this.lexer.match,
								token: this.terminals_[p] || p,
								line: this.lexer.yylineno,
								loc: o,
								expected: x
							})
						}
						if (3 == l) {
							if (p == n) throw new Error(z || "Parsing halted.");
							k = this.lexer.yyleng, i = this.lexer.yytext, j = this.lexer.yylineno, o = this.lexer.yylloc, p = c()
						}
						for (;;) {
							if (m.toString() in h[r]) break;
							if (0 == r) throw new Error(z || "Parsing halted.");
							b(1), r = e[e.length - 1]
						}
						q = p, p = m, r = e[e.length - 1], s = h[r] && h[r][m], l = 3
					}
					if (s[0] instanceof Array && s.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + r + ", token: " + p);
					switch (s[0]) {
						case 1:
							e.push(p), f.push(this.lexer.yytext), g.push(this.lexer.yylloc), e.push(s[1]), p = null, q ? (p = q, q = null) : (k = this.lexer.yyleng, i = this.lexer.yytext, j = this.lexer.yylineno, o = this.lexer.yylloc, l > 0 && l--);
							break;
						case 2:
							if (v = this.productions_[s[1]][1], y.$ = f[f.length - v], y._$ = {
								first_line: g[g.length - (v || 1)].first_line,
								last_line: g[g.length - 1].last_line,
								first_column: g[g.length - (v || 1)].first_column,
								last_column: g[g.length - 1].last_column
							}, t = this.performAction.call(y, i, k, j, this.yy, s[1], f, g), "undefined" != typeof t) return t;
							v && (e = e.slice(0, -1 * v * 2), f = f.slice(0, -1 * v), g = g.slice(0, -1 * v)), e.push(this.productions_[s[1]][0]), f.push(y.$), g.push(y._$), w = h[e[e.length - 2]][e[e.length - 1]], e.push(w);
							break;
						case 3:
							return !0
					}
				}
				return !0
			}
		}, b = function() {
				var a = {
					EOF: 1,
					parseError: function(a, b) {
						if (!this.yy.parseError) throw new Error(a);
						this.yy.parseError(a, b)
					},
					setInput: function(a) {
						return this._input = a, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
							first_line: 1,
							first_column: 0,
							last_line: 1,
							last_column: 0
						}, this
					},
					input: function() {
						var a = this._input[0];
						this.yytext += a, this.yyleng++, this.match += a, this.matched += a;
						var b = a.match(/\n/);
						return b && this.yylineno++, this._input = this._input.slice(1), a
					},
					unput: function(a) {
						return this._input = a + this._input, this
					},
					more: function() {
						return this._more = !0, this
					},
					less: function(a) {
						this._input = this.match.slice(a) + this._input
					},
					pastInput: function() {
						var a = this.matched.substr(0, this.matched.length - this.match.length);
						return (a.length > 20 ? "..." : "") + a.substr(-20).replace(/\n/g, "")
					},
					upcomingInput: function() {
						var a = this.match;
						return a.length < 20 && (a += this._input.substr(0, 20 - a.length)), (a.substr(0, 20) + (a.length > 20 ? "..." : "")).replace(/\n/g, "")
					},
					showPosition: function() {
						var a = this.pastInput(),
							b = new Array(a.length + 1).join("-");
						return a + this.upcomingInput() + "\n" + b + "^"
					},
					next: function() {
						if (this.done) return this.EOF;
						this._input || (this.done = !0);
						var a, b, c, d, e;
						this._more || (this.yytext = "", this.match = "");
						for (var f = this._currentRules(), g = 0; g < f.length && (c = this._input.match(this.rules[f[g]]), !c || b && !(c[0].length > b[0].length) || (b = c, d = g, this.options.flex)); g++);
						return b ? (e = b[0].match(/\n.*/g), e && (this.yylineno += e.length), this.yylloc = {
							first_line: this.yylloc.last_line,
							last_line: this.yylineno + 1,
							first_column: this.yylloc.last_column,
							last_column: e ? e[e.length - 1].length - 1 : this.yylloc.last_column + b[0].length
						}, this.yytext += b[0], this.match += b[0], this.yyleng = this.yytext.length, this._more = !1, this._input = this._input.slice(b[0].length), this.matched += b[0], a = this.performAction.call(this, this.yy, this, f[d], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), a ? a : void 0) : "" === this._input ? this.EOF : void this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
							text: "",
							token: null,
							line: this.yylineno
						})
					},
					lex: function() {
						var a = this.next();
						return "undefined" != typeof a ? a : this.lex()
					},
					begin: function(a) {
						this.conditionStack.push(a)
					},
					popState: function() {
						return this.conditionStack.pop()
					},
					_currentRules: function() {
						return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
					},
					topState: function() {
						return this.conditionStack[this.conditionStack.length - 2]
					},
					pushState: function(a) {
						this.begin(a)
					}
				};
				return a.options = {}, a.performAction = function(a, b, c, d) {
					switch (c) {
						case 0:
							break;
						case 1:
							return 6;
						case 2:
							return b.yytext = b.yytext.substr(1, b.yyleng - 2), 4;
						case 3:
							return 17;
						case 4:
							return 18;
						case 5:
							return 23;
						case 6:
							return 24;
						case 7:
							return 22;
						case 8:
							return 21;
						case 9:
							return 10;
						case 10:
							return 11;
						case 11:
							return 8;
						case 12:
							return 14;
						case 13:
							return "INVALID"
					}
				}, a.rules = [/^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/], a.conditions = {
					INITIAL: {
						rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
						inclusive: !0
					}
				}, a
			}();
		return a.lexer = b, a
	}();
	"undefined" != typeof c && "undefined" != typeof exports && (exports.parser = e, exports.parse = function() {
		return e.parse.apply(e, arguments)
	}, exports.main = function(a) {
		if (!a[1]) throw new Error("Usage: " + a[0] + " FILE");
		if ("undefined" != typeof process) var b = c("fs").readFileSync(c("path").join(process.cwd(), a[1]), "utf8");
		else var d = c("file").path(c("file").cwd()),
		b = d.join(a[1]).read({
			charset: "utf-8"
		});
		return exports.parser.parse(b)
	}, "undefined" != typeof module && c.main === module && exports.main("undefined" != typeof process ? process.argv.slice(1) : c("system").args)), d("bower_components/jsonlint/lib/jsonlint", function() {}),
	function(a) {
		"object" == typeof exports && "object" == typeof module ? a(c("../../lib/codemirror")) : "function" == typeof d && d.amd ? d("bower_components/codemirror/addon/lint/json-lint", ["../../lib/codemirror"], a) : a(CodeMirror)
	}(function(a) {
		a.registerHelper("lint", "json", function(b) {
			var c = [];
			e.parseError = function(b, d) {
				var e = d.loc;
				c.push({
					from: a.Pos(e.first_line - 1, e.first_column),
					to: a.Pos(e.last_line - 1, e.last_column),
					message: b
				})
			};
			try {
				e.parse(b)
			} catch (d) {}
			return c
		})
	}),
	function(a) {
		"object" == typeof exports && "object" == typeof module ? a(c("../../lib/codemirror")) : "function" == typeof d && d.amd ? d("bower_components/codemirror/addon/selection/active-line", ["../../lib/codemirror"], a) : a(CodeMirror)
	}(function(a) {
		function b(a) {
			for (var b = 0; b < a.state.activeLines.length; b++) a.removeLineClass(a.state.activeLines[b], "wrap", f), a.removeLineClass(a.state.activeLines[b], "background", g)
		}

		function c(a, b) {
			if (a.length != b.length) return !1;
			for (var c = 0; c < a.length; c++)
				if (a[c] != b[c]) return !1;
			return !0
		}

		function d(a, d) {
			for (var e = [], h = 0; h < d.length; h++) {
				var i = d[h];
				if (i.empty()) {
					var j = a.getLineHandleVisualStart(i.head.line);
					e[e.length - 1] != j && e.push(j)
				}
			}
			c(a.state.activeLines, e) || a.operation(function() {
				b(a);
				for (var c = 0; c < e.length; c++) a.addLineClass(e[c], "wrap", f), a.addLineClass(e[c], "background", g);
				a.state.activeLines = e
			})
		}

		function e(a, b) {
			d(a, b.ranges)
		}
		var f = "CodeMirror-activeline",
			g = "CodeMirror-activeline-background";
		a.defineOption("styleActiveLine", !1, function(c, f, g) {
			var h = g && g != a.Init;
			f && !h ? (c.state.activeLines = [], d(c, c.listSelections()), c.on("beforeSelectionChange", e)) : !f && h && (c.off("beforeSelectionChange", e), b(c), delete c.state.activeLines)
		})
	}),
	function(a) {
		"object" == typeof exports && "object" == typeof module ? a(c("../../lib/codemirror")) : "function" == typeof d && d.amd ? d("bower_components/codemirror/mode/javascript/javascript", ["../../lib/codemirror"], a) : a(CodeMirror)
	}(function(a) {
		a.defineMode("javascript", function(b, c) {
			function d(a) {
				for (var b, c = !1, d = !1; null != (b = a.next());) {
					if (!c) {
						if ("/" == b && !d) return;
						"[" == b ? d = !0 : d && "]" == b && (d = !1)
					}
					c = !c && "\\" == b
				}
			}

			function e(a, b, c) {
				return oa = a, pa = c, b
			}

			function f(a, b) {
				var c = a.next();
				if ('"' == c || "'" == c) return b.tokenize = g(c), b.tokenize(a, b);
				if ("." == c && a.match(/^\d+(?:[eE][+\-]?\d+)?/)) return e("number", "number");
				if ("." == c && a.match("..")) return e("spread", "meta");
				if (/[\[\]{}\(\),;\:\.]/.test(c)) return e(c);
				if ("=" == c && a.eat(">")) return e("=>", "operator");
				if ("0" == c && a.eat(/x/i)) return a.eatWhile(/[\da-f]/i), e("number", "number");
				if (/\d/.test(c)) return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), e("number", "number");
				if ("/" == c) return a.eat("*") ? (b.tokenize = h, h(a, b)) : a.eat("/") ? (a.skipToEnd(), e("comment", "comment")) : "operator" == b.lastType || "keyword c" == b.lastType || "sof" == b.lastType || /^[\[{}\(,;:]$/.test(b.lastType) ? (d(a), a.eatWhile(/[gimy]/), e("regexp", "string-2")) : (a.eatWhile(xa), e("operator", "operator", a.current()));
				if ("`" == c) return b.tokenize = i, i(a, b);
				if ("#" == c) return a.skipToEnd(), e("error", "error");
				if (xa.test(c)) return a.eatWhile(xa), e("operator", "operator", a.current());
				if (va.test(c)) {
					a.eatWhile(va);
					var f = a.current(),
						j = wa.propertyIsEnumerable(f) && wa[f];
					return j && "." != b.lastType ? e(j.type, j.style, f) : e("variable", "variable", f)
				}
			}

			function g(a) {
				return function(b, c) {
					var d, g = !1;
					if (sa && "@" == b.peek() && b.match(ya)) return c.tokenize = f, e("jsonld-keyword", "meta");
					for (; null != (d = b.next()) && (d != a || g);) g = !g && "\\" == d;
					return g || (c.tokenize = f), e("string", "string")
				}
			}

			function h(a, b) {
				for (var c, d = !1; c = a.next();) {
					if ("/" == c && d) {
						b.tokenize = f;
						break
					}
					d = "*" == c
				}
				return e("comment", "comment")
			}

			function i(a, b) {
				for (var c, d = !1; null != (c = a.next());) {
					if (!d && ("`" == c || "$" == c && a.eat("{"))) {
						b.tokenize = f;
						break
					}
					d = !d && "\\" == c
				}
				return e("quasi", "string-2", a.current())
			}

			function j(a, b) {
				b.fatArrowAt && (b.fatArrowAt = null);
				var c = a.string.indexOf("=>", a.start);
				if (!(0 > c)) {
					for (var d = 0, e = !1, f = c - 1; f >= 0; --f) {
						var g = a.string.charAt(f),
							h = za.indexOf(g);
						if (h >= 0 && 3 > h) {
							if (!d) {
								++f;
								break
							}
							if (0 == --d) break
						} else if (h >= 3 && 6 > h)++d;
						else if (va.test(g)) e = !0;
						else if (e && !d) {
							++f;
							break
						}
					}
					e && !d && (b.fatArrowAt = f)
				}
			}

			function k(a, b, c, d, e, f) {
				this.indented = a, this.column = b, this.type = c, this.prev = e, this.info = f, null != d && (this.align = d)
			}

			function l(a, b) {
				for (var c = a.localVars; c; c = c.next)
					if (c.name == b) return !0;
				for (var d = a.context; d; d = d.prev)
					for (var c = d.vars; c; c = c.next)
						if (c.name == b) return !0
			}

			function m(a, b, c, d, e) {
				var f = a.cc;
				for (Ba.state = a, Ba.stream = e, Ba.marked = null, Ba.cc = f, Ba.style = b, a.lexical.hasOwnProperty("align") || (a.lexical.align = !0);;) {
					var g = f.length ? f.pop() : ta ? w : v;
					if (g(c, d)) {
						for (; f.length && f[f.length - 1].lex;) f.pop()();
						return Ba.marked ? Ba.marked : "variable" == c && l(a, d) ? "variable-2" : b
					}
				}
			}

			function n() {
				for (var a = arguments.length - 1; a >= 0; a--) Ba.cc.push(arguments[a])
			}

			function o() {
				return n.apply(null, arguments), !0
			}

			function p(a) {
				function b(b) {
					for (var c = b; c; c = c.next)
						if (c.name == a) return !0;
					return !1
				}
				var d = Ba.state;
				if (d.context) {
					if (Ba.marked = "def", b(d.localVars)) return;
					d.localVars = {
						name: a,
						next: d.localVars
					}
				} else {
					if (b(d.globalVars)) return;
					c.globalVars && (d.globalVars = {
						name: a,
						next: d.globalVars
					})
				}
			}

			function q() {
				Ba.state.context = {
					prev: Ba.state.context,
					vars: Ba.state.localVars
				}, Ba.state.localVars = Ca
			}

			function r() {
				Ba.state.localVars = Ba.state.context.vars, Ba.state.context = Ba.state.context.prev
			}

			function s(a, b) {
				var c = function() {
					var c = Ba.state,
						d = c.indented;
					if ("stat" == c.lexical.type) d = c.lexical.indented;
					else
						for (var e = c.lexical; e && ")" == e.type && e.align; e = e.prev) d = e.indented;
					c.lexical = new k(d, Ba.stream.column(), a, null, c.lexical, b)
				};
				return c.lex = !0, c
			}

			function t() {
				var a = Ba.state;
				a.lexical.prev && (")" == a.lexical.type && (a.indented = a.lexical.indented), a.lexical = a.lexical.prev)
			}

			function u(a) {
				function b(c) {
					return c == a ? o() : ";" == a ? n() : o(b)
				}
				return b
			}

			function v(a, b) {
				return "var" == a ? o(s("vardef", b.length), R, u(";"), t) : "keyword a" == a ? o(s("form"), w, v, t) : "keyword b" == a ? o(s("form"), v, t) : "{" == a ? o(s("}"), O, t) : ";" == a ? o() : "if" == a ? ("else" == Ba.state.lexical.info && Ba.state.cc[Ba.state.cc.length - 1] == t && Ba.state.cc.pop()(), o(s("form"), w, v, t, W)) : "function" == a ? o(aa) : "for" == a ? o(s("form"), X, v, t) : "variable" == a ? o(s("stat"), H) : "switch" == a ? o(s("form"), w, s("}", "switch"), u("{"), O, t, t) : "case" == a ? o(w, u(":")) : "default" == a ? o(u(":")) : "catch" == a ? o(s("form"), q, u("("), ba, u(")"), v, t, r) : "module" == a ? o(s("form"), q, ga, r, t) : "class" == a ? o(s("form"), ca, t) : "export" == a ? o(s("form"), ha, t) : "import" == a ? o(s("form"), ia, t) : n(s("stat"), w, u(";"), t)
			}

			function w(a) {
				return y(a, !1)
			}

			function x(a) {
				return y(a, !0)
			}

			function y(a, b) {
				if (Ba.state.fatArrowAt == Ba.stream.start) {
					var c = b ? G : F;
					if ("(" == a) return o(q, s(")"), M(S, ")"), t, u("=>"), c, r);
					if ("variable" == a) return n(q, S, u("=>"), c, r)
				}
				var d = b ? C : B;
				return Aa.hasOwnProperty(a) ? o(d) : "function" == a ? o(aa, d) : "keyword c" == a ? o(b ? A : z) : "(" == a ? o(s(")"), z, na, u(")"), t, d) : "operator" == a || "spread" == a ? o(b ? x : w) : "[" == a ? o(s("]"), la, t, d) : "{" == a ? N(J, "}", null, d) : "quasi" == a ? n(D, d) : o()
			}

			function z(a) {
				return a.match(/[;\}\)\],]/) ? n() : n(w)
			}

			function A(a) {
				return a.match(/[;\}\)\],]/) ? n() : n(x)
			}

			function B(a, b) {
				return "," == a ? o(w) : C(a, b, !1)
			}

			function C(a, b, c) {
				var d = 0 == c ? B : C,
					e = 0 == c ? w : x;
				return "=>" == a ? o(q, c ? G : F, r) : "operator" == a ? /\+\+|--/.test(b) ? o(d) : "?" == b ? o(w, u(":"), e) : o(e) : "quasi" == a ? n(D, d) : ";" != a ? "(" == a ? N(x, ")", "call", d) : "." == a ? o(I, d) : "[" == a ? o(s("]"), z, u("]"), t, d) : void 0 : void 0
			}

			function D(a, b) {
				return "quasi" != a ? n() : "${" != b.slice(b.length - 2) ? o(D) : o(w, E)
			}

			function E(a) {
				return "}" == a ? (Ba.marked = "string-2", Ba.state.tokenize = i, o(D)) : void 0
			}

			function F(a) {
				return j(Ba.stream, Ba.state), n("{" == a ? v : w)
			}

			function G(a) {
				return j(Ba.stream, Ba.state), n("{" == a ? v : x)
			}

			function H(a) {
				return ":" == a ? o(t, v) : n(B, u(";"), t)
			}

			function I(a) {
				return "variable" == a ? (Ba.marked = "property", o()) : void 0
			}

			function J(a, b) {
				return "variable" == a || "keyword" == Ba.style ? (Ba.marked = "property", o("get" == b || "set" == b ? K : L)) : "number" == a || "string" == a ? (Ba.marked = sa ? "property" : Ba.style + " property", o(L)) : "jsonld-keyword" == a ? o(L) : "[" == a ? o(w, u("]"), L) : void 0
			}

			function K(a) {
				return "variable" != a ? n(L) : (Ba.marked = "property", o(aa))
			}

			function L(a) {
				return ":" == a ? o(x) : "(" == a ? n(aa) : void 0
			}

			function M(a, b) {
				function c(d) {
					if ("," == d) {
						var e = Ba.state.lexical;
						return "call" == e.info && (e.pos = (e.pos || 0) + 1), o(a, c)
					}
					return d == b ? o() : o(u(b))
				}
				return function(d) {
					return d == b ? o() : n(a, c)
				}
			}

			function N(a, b, c) {
				for (var d = 3; d < arguments.length; d++) Ba.cc.push(arguments[d]);
				return o(s(b, c), M(a, b), t)
			}

			function O(a) {
				return "}" == a ? o() : n(v, O)
			}

			function P(a) {
				return ua && ":" == a ? o(Q) : void 0
			}

			function Q(a) {
				return "variable" == a ? (Ba.marked = "variable-3", o()) : void 0
			}

			function R() {
				return n(S, P, U, V)
			}

			function S(a, b) {
				return "variable" == a ? (p(b), o()) : "[" == a ? N(S, "]") : "{" == a ? N(T, "}") : void 0
			}

			function T(a, b) {
				return "variable" != a || Ba.stream.match(/^\s*:/, !1) ? ("variable" == a && (Ba.marked = "property"), o(u(":"), S, U)) : (p(b), o(U))
			}

			function U(a, b) {
				return "=" == b ? o(x) : void 0
			}

			function V(a) {
				return "," == a ? o(R) : void 0
			}

			function W(a, b) {
				return "keyword b" == a && "else" == b ? o(s("form", "else"), v, t) : void 0
			}

			function X(a) {
				return "(" == a ? o(s(")"), Y, u(")"), t) : void 0
			}

			function Y(a) {
				return "var" == a ? o(R, u(";"), $) : ";" == a ? o($) : "variable" == a ? o(Z) : n(w, u(";"), $)
			}

			function Z(a, b) {
				return "in" == b || "of" == b ? (Ba.marked = "keyword", o(w)) : o(B, $)
			}

			function $(a, b) {
				return ";" == a ? o(_) : "in" == b || "of" == b ? (Ba.marked = "keyword", o(w)) : n(w, u(";"), _)
			}

			function _(a) {
				")" != a && o(w)
			}

			function aa(a, b) {
				return "*" == b ? (Ba.marked = "keyword", o(aa)) : "variable" == a ? (p(b), o(aa)) : "(" == a ? o(q, s(")"), M(ba, ")"), t, v, r) : void 0
			}

			function ba(a) {
				return "spread" == a ? o(ba) : n(S, P)
			}

			function ca(a, b) {
				return "variable" == a ? (p(b), o(da)) : void 0
			}

			function da(a, b) {
				return "extends" == b ? o(w, da) : "{" == a ? o(s("}"), ea, t) : void 0
			}

			function ea(a, b) {
				return "variable" == a || "keyword" == Ba.style ? (Ba.marked = "property", "get" == b || "set" == b ? o(fa, aa, ea) : o(aa, ea)) : "*" == b ? (Ba.marked = "keyword", o(ea)) : ";" == a ? o(ea) : "}" == a ? o() : void 0
			}

			function fa(a) {
				return "variable" != a ? n() : (Ba.marked = "property", o())
			}

			function ga(a, b) {
				return "string" == a ? o(v) : "variable" == a ? (p(b), o(ka)) : void 0
			}

			function ha(a, b) {
				return "*" == b ? (Ba.marked = "keyword", o(ka, u(";"))) : "default" == b ? (Ba.marked = "keyword", o(w, u(";"))) : n(v)
			}

			function ia(a) {
				return "string" == a ? o() : n(ja, ka)
			}

			function ja(a, b) {
				return "{" == a ? N(ja, "}") : ("variable" == a && p(b), o())
			}

			function ka(a, b) {
				return "from" == b ? (Ba.marked = "keyword", o(w)) : void 0
			}

			function la(a) {
				return "]" == a ? o() : n(x, ma)
			}

			function ma(a) {
				return "for" == a ? n(na, u("]")) : "," == a ? o(M(A, "]")) : n(M(x, "]"))
			}

			function na(a) {
				return "for" == a ? o(X, na) : "if" == a ? o(w, na) : void 0
			}
			var oa, pa, qa = b.indentUnit,
				ra = c.statementIndent,
				sa = c.jsonld,
				ta = c.json || sa,
				ua = c.typescript,
				va = c.wordCharacters || /[\w$\xa1-\uffff]/,
				wa = function() {
					function a(a) {
						return {
							type: a,
							style: "keyword"
						}
					}
					var b = a("keyword a"),
						c = a("keyword b"),
						d = a("keyword c"),
						e = a("operator"),
						f = {
							type: "atom",
							style: "atom"
						}, g = {
							"if": a("if"),
							"while": b,
							"with": b,
							"else": c,
							"do": c,
							"try": c,
							"finally": c,
							"return": d,
							"break": d,
							"continue": d,
							"new": d,
							"delete": d,
							"throw": d,
							"debugger": d,
							"var": a("var"),
							"const": a("var"),
							let: a("var"),
							"function": a("function"),
							"catch": a("catch"),
							"for": a("for"),
							"switch": a("switch"),
							"case": a("case"),
							"default": a("default"),
							"in": e,
							"typeof": e,
							"instanceof": e,
							"true": f,
							"false": f,
							"null": f,
							undefined: f,
							NaN: f,
							Infinity: f,
							"this": a("this"),
							module: a("module"),
							"class": a("class"),
							"super": a("atom"),
							"yield": d,
							"export": a("export"),
							"import": a("import"),
							"extends": d
						};
					if (ua) {
						var h = {
							type: "variable",
							style: "variable-3"
						}, i = {
								"interface": a("interface"),
								"extends": a("extends"),
								constructor: a("constructor"),
								"public": a("public"),
								"private": a("private"),
								"protected": a("protected"),
								"static": a("static"),
								string: h,
								number: h,
								bool: h,
								any: h
							};
						for (var j in i) g[j] = i[j]
					}
					return g
				}(),
				xa = /[+\-*&%=<>!?|~^]/,
				ya = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,
				za = "([{}])",
				Aa = {
					atom: !0,
					number: !0,
					variable: !0,
					string: !0,
					regexp: !0,
					"this": !0,
					"jsonld-keyword": !0
				}, Ba = {
					state: null,
					column: null,
					marked: null,
					cc: null
				}, Ca = {
					name: "this",
					next: {
						name: "arguments"
					}
				};
			return t.lex = !0, {
				startState: function(a) {
					var b = {
						tokenize: f,
						lastType: "sof",
						cc: [],
						lexical: new k((a || 0) - qa, 0, "block", !1),
						localVars: c.localVars,
						context: c.localVars && {
							vars: c.localVars
						},
						indented: 0
					};
					return c.globalVars && "object" == typeof c.globalVars && (b.globalVars = c.globalVars), b
				},
				token: function(a, b) {
					if (a.sol() && (b.lexical.hasOwnProperty("align") || (b.lexical.align = !1), b.indented = a.indentation(), j(a, b)), b.tokenize != h && a.eatSpace()) return null;
					var c = b.tokenize(a, b);
					return "comment" == oa ? c : (b.lastType = "operator" != oa || "++" != pa && "--" != pa ? oa : "incdec", m(b, c, oa, pa, a))
				},
				indent: function(b, d) {
					if (b.tokenize == h) return a.Pass;
					if (b.tokenize != f) return 0;
					var e = d && d.charAt(0),
						g = b.lexical;
					if (!/^\s*else\b/.test(d))
						for (var i = b.cc.length - 1; i >= 0; --i) {
							var j = b.cc[i];
							if (j == t) g = g.prev;
							else if (j != W) break
						}
					"stat" == g.type && "}" == e && (g = g.prev), ra && ")" == g.type && "stat" == g.prev.type && (g = g.prev);
					var k = g.type,
						l = e == k;
					return "vardef" == k ? g.indented + ("operator" == b.lastType || "," == b.lastType ? g.info + 1 : 0) : "form" == k && "{" == e ? g.indented : "form" == k ? g.indented + qa : "stat" == k ? g.indented + ("operator" == b.lastType || "," == b.lastType ? ra || qa : 0) : "switch" != g.info || l || 0 == c.doubleIndentSwitch ? g.align ? g.column + (l ? 0 : 1) : g.indented + (l ? 0 : qa) : g.indented + (/^(?:case|default)\b/.test(d) ? qa : 2 * qa)
				},
				electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
				blockCommentStart: ta ? null : "/*",
				blockCommentEnd: ta ? null : "*/",
				lineComment: ta ? null : "//",
				fold: "brace",
				helperType: ta ? "json" : "javascript",
				jsonldMode: sa,
				jsonMode: ta
			}
		}), a.registerHelper("wordChars", "javascript", /[\w$]/), a.defineMIME("text/javascript", "javascript"), a.defineMIME("text/ecmascript", "javascript"), a.defineMIME("application/javascript", "javascript"), a.defineMIME("application/x-javascript", "javascript"), a.defineMIME("application/ecmascript", "javascript"), a.defineMIME("application/json", {
			name: "javascript",
			json: !0
		}), a.defineMIME("application/x-json", {
			name: "javascript",
			json: !0
		}), a.defineMIME("application/ld+json", {
			name: "javascript",
			jsonld: !0
		}), a.defineMIME("text/typescript", {
			name: "javascript",
			typescript: !0
		}), a.defineMIME("application/typescript", {
			name: "javascript",
			typescript: !0
		})
	}), d("ng-admin/Crud/field/maJsonField", ["require"], function(a) {
		function b() {
			return {
				scope: {
					field: "&",
					value: "="
				},
				restrict: "E",
				link: function(a, b) {
					var c = a.field();
					a.name = c.name(), a.v = c.validation(), a.jsonValue = null === a.value ? "" : angular.toJson(a.value, !0);
					var d = b.children()[0],
						e = c.attributes();
					for (var f in e) d[f] = e[f];
					a.$watch("jsonValue", function(b) {
						if ("" == b || "undefined" == typeof b) return void(a.value = null);
						try {
							var c = angular.fromJson(b);
							a.value = c
						} catch (d) {}
					})
				},
				template: '<textarea ui-codemirror ng-model="jsonValue" id="{{ name }}" name="{{ name }}" ng-required="v.required" ma-json-validator></textarea>'
			}
		}
		return a(["bower_components/codemirror/lib/codemirror", "bower_components/codemirror/addon/edit/closebrackets", "bower_components/codemirror/addon/edit/matchbrackets", "bower_components/codemirror/addon/lint/lint", "bower_components/jsonlint/lib/jsonlint", "bower_components/codemirror/addon/lint/json-lint", "bower_components/codemirror/addon/selection/active-line", "bower_components/codemirror/mode/javascript/javascript"], function(a) {
			a.defineOption("matchBrackets", !0), a.defineOption("autoCloseBrackets", !0), a.defineOption("lineWrapping", !0), a.defineOption("tabSize", 2), a.defineOption("mode", "application/json"), a.defineOption("gutters", ["CodeMirror-lint-markers"]), a.defineOption("lint", !0), a.defineOption("styleActiveLine", !0), window.CodeMirror = a
		}), b.$inject = [], b
	}), d("ng-admin/Crud/field/maFileField", ["require"], function() {
		function a(a, b) {
			return {
				scope: {
					field: "&",
					value: "="
				},
				restrict: "E",
				link: {
					pre: function(a) {
						var b = a.field().uploadInformation();
						if (!b.hasOwnProperty("url")) throw new Error("You must provide a URL property to allow the upload of files.");
						a.multiple = b.hasOwnProperty("multiple") ? b.multiple : !1, a.accept = b.hasOwnProperty("accept") ? b.accept : "*", a.apifilename = b.hasOwnProperty("apifilename") ? b.apifilename : !1;
						var c = a.value ? a.value.split(",") : [];
						a.files = {};
						for (var d in c) a.files[c[d]] = {
							name: c[d],
							progress: 0
						}
					},
					post: function(c, d) {
						var e = c.field();
						c.name = e.name(), c.v = e.validation(), c.value && (c.v.required = !1);
						var f = d.find("input")[0],
							g = e.attributes();
						for (var h in g) f[h] = g[h];
						c.fileSelected = function(b) {
							if (b) {
								var d;
								c.files = {};
								for (var e in b) d = angular.copy(c.field().uploadInformation()), d.file = b[e], a.upload(d).progress(function(a) {
									c.files[a.config.file.name] = {
										name: a.config.file.name,
										progress: Math.min(100, parseInt(100 * a.loaded / a.total))
									}
								}).success(function(a, b, d, e) {
									if (c.files[e.file.name] = {
										name: c.apifilename ? a[c.apifilename] : e.file.name,
										progress: 0
									}, c.apifilename) {
										var f = Object.keys(c.files).map(function(a) {
											return c.files[a].name
										});
										c.value = f.join(",")
									} else c.value = Object.keys(c.files).join(",")
								}).error(function(a, b, d, e) {
									delete c.files[e.file.name], c.value = Object.keys(c.files).join(",")
								})
							}
						}, c.selectFile = function() {
							b(function() {
								f.click()
							}, 0)
						}
					}
				},
				template: '<div class="row"><div class="col-md-2"><a class="btn btn-default" ng-click="selectFile()"><span>Browse</span></a></div><div class="col-md-10"><div class="row" ng-repeat="file in files track by $index"><div class="col-md-3" style="padding-top: 6px;"><div class="progress" style="margin-bottom: 0;" ng-if="file.progress"><div class="progress-bar" role="progressbar" aria-valuenow="{{ file.progress }}" aria-valuemin="0" aria-valuemax="100" style="width: {{ file.progress }}%;"><span class="sr-only">{{ file.progress }}% Complete</span></div></div></div><div class="col-md-9" style="padding-top: 6px;"><small><em>{{ file.name }}<em><small></div></div></div></div><input type="file" ng-multiple="multiple" accept="{{ accept }}" ng-file-select ng-model="selectedFiles" ng-file-change="fileSelected($files)"id="{{ name }}" name="{{ name }}" ng-required="v.required" style="display:none" />'
			}
		}
		return a.$inject = ["$upload", "$timeout"], a
	}), d("ng-admin/Crud/field/maCheckboxField", ["require"], function() {
		function a() {
			return {
				scope: {
					field: "&",
					value: "="
				},
				restrict: "E",
				link: function(a, b) {
					var c = a.field();
					a.name = c.name(), a.v = c.validation(), a.value = !! a.value;
					var d = b.children()[0],
						e = c.attributes();
					for (var f in e) d[f] = e[f]
				},
				template: '<input type="checkbox" ng-model="value" id="{{ name }}" name="{{ name }}" class="form-control" />'
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/field/maTextField", ["require"], function() {
		function a() {
			return {
				scope: {
					field: "&",
					value: "="
				},
				restrict: "E",
				link: function(a, b) {
					var c = a.field();
					a.name = c.name(), a.v = c.validation();
					var d = b.children()[0],
						e = c.attributes();
					for (var f in e) d[f] = e[f]
				},
				template: '<textarea ng-model="value" id="{{ name }}" name="{{ name }}" class="form-control"ng-required="v.required" ng-minlength="v.minlength" ng-maxlength="v.maxlength"></textarea>'
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/field/maWysiwygField", ["require"], function() {
		function a() {
			return {
				scope: {
					field: "&",
					value: "="
				},
				restrict: "E",
				link: function(a) {
					var b = a.field();
					a.name = b.name()
				},
				template: '<div text-angular ta-unsafe-sanitizer="{{ !field.sanitize() }}" ng-model="value" id="{{ name }}" name="{{ name }}" ta-text-editor-class="border-around" ta-html-editor-class="border-around"></div>'
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/field/maTemplateField", ["require"], function() {
		function a() {
			return {
				restrict: "E",
				scope: {
					field: "&",
					entry: "&",
					entity: "&"
				},
				link: function(a) {
					a.field = a.field(), a.entry = a.entry(), a.entity = a.entity()
				},
				template: '<span compile="field.getTemplateValue(entry)"></span>'
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/fieldView/FieldViewConfiguration", [], function() {
		function a() {
			this.fieldViews = {}
		}
		return a.prototype.registerFieldView = function(a, b) {
			this.fieldViews[a] = b
		}, a.prototype.$get = function() {
			return this.fieldViews
		}, a.$inject = [], a
	}), d("text!ng-admin/Crud/list/ListActions.html", [], function() {
		return '<span compile="customTemplate">\n    <span ng-repeat="button in ::buttons" ng-switch="button">\n        <ma-show-button ng-switch-when="show" entry="::entry" entity="::entity" size="xs"></ma-show-button>\n        <ma-edit-button ng-switch-when="edit" ng-if="::entity.editionView().enabled" entry="::entry" entity="::entity" size="xs"></ma-edit-button>\n        <ma-delete-button ng-switch-when="delete" ng-if="::entity.deletionView().enabled" entry="::entry" entity="::entity" size="xs"></ma-delete-button>\n        <span ng-switch-default><span compile="button"></span></span>\n    </span>\n</span>\n';

	}), d("ng-admin/Crud/list/ListActions", ["require", "text!./ListActions.html"], function(a) {
		function b() {
			return {
				restrict: "E",
				transclude: !0,
				scope: {
					buttons: "&",
					entry: "&",
					entity: "&"
				},
				template: c,
				link: function(a) {
					a.buttons = a.buttons(), a.entry = a.entry(), a.entity = a.entity(), a.customTemplate = !1, "string" == typeof a.buttons && (a.customTemplate = a.buttons, a.buttons = null)
				}
			}
		}
		var c = a("text!./ListActions.html");
		return b
	}), d("text!ng-admin/Crud/list/Datagrid.html", [], function() {
		return '<table class="grid table table-condensed table-hover table-striped">\n    <thead>\n        <tr>\n            <th ng-if="selection">\n                <ma-datagrid-multi-selector toggle-select-all="toggleSelectAll()" selection="selection" entries="entries"/>\n            </th>\n            <th ng-repeat="field in fields() track by $index" ng-class="\'ng-admin-column-\' + field.name()">\n                <a ng-click="datagrid.sort(field)">\n                    <span class="glyphicon {{ datagrid.sortDir === \'DESC\' ? \'glyphicon-chevron-down\': \'glyphicon-chevron-up\' }}" ng-if="datagrid.isSorting(field)"></span>\n\n                    {{ field.label() }}\n                </a>\n            </th>\n            <th ng-if="listActions()" class="ng-admin-column-actions">\n                Actions\n            </th>\n        </tr>\n    </thead>\n\n    <tbody>\n        <tr ng-repeat="entry in entries track by entry.identifierValue">\n            <td ng-if="selection">\n                <ma-datagrid-item-selector toggle-select="toggleSelect(entry)" selection="selection" entry="entry"/>\n            </td>\n            <td ng-repeat="field in fields() track by $index" ng-class="field.getCssClasses(entry)">\n                <ma-column field="::field" entry="::entry" entity="::entity"></ma-column>\n            </td>\n            <td ng-if="listActions()" class="ng-admin-column-actions">\n                <list-actions entry="::entry" entity="::entity" buttons="listActions()"></list-actions>\n            </td>\n        </tr>\n    </tbody>\n</table>\n'
	}), d("ng-admin/Crud/list/DatagridController", [], function() {
		function a(a, b, c) {
			a.entity = a.entity(), this.$scope = a, this.$location = b, this.$anchorScroll = c, this.filters = {}, a.toggleSelect = this.toggleSelect.bind(this), a.toggleSelectAll = this.toggleSelectAll.bind(this), this.$scope.gotoDetail = this.gotoDetail.bind(this);
			var d = this.$location.search(),
				e = a.entity.listView();
			this.sortField = "sortField" in d ? d.sortField : e.sortField(), this.sortDir = "sortDir" in d ? d.sortDir : e.sortDir()
		}
		return a.prototype.gotoDetail = function(a) {
			this.clearRouteParams();
			var b = this.$scope.entity,
				c = b.editionView().enabled ? "edit" : "show";
			this.$location.path("/" + a.entityName + "/" + c + "/" + a.identifierValue), this.$anchorScroll(0)
		}, a.prototype.clearRouteParams = function() {
			this.$location.search("q", null), this.$location.search("page", null), this.$location.search("sortField", null), this.$location.search("sortDir", null)
		}, a.prototype.isSorting = function(a) {
			return this.sortField === this.getSortName(a)
		}, a.prototype.itemClass = function(a) {
			return a % 2 === 0 ? "even" : "odd"
		}, a.prototype.sort = function(a) {
			var b = "ASC",
				c = this.getSortName(a);
			this.sortField === c && (b = "ASC" === this.sortDir ? "DESC" : "ASC"), this.$location.search("sortField", c), this.$location.search("sortDir", b)
		}, a.prototype.getSortName = function(a) {
			return this.$scope.name + "." + a.name()
		}, a.prototype.toggleSelect = function(a) {
			var b = this.$scope.selection.slice(),
				c = b.indexOf(a);
			return -1 === c ? void(this.$scope.selection = b.concat(a)) : (b.splice(c, 1), void(this.$scope.selection = b))
		}, a.prototype.toggleSelectAll = function() {
			return this.$scope.selection.length < this.$scope.entries.length ? void(this.$scope.selection = this.$scope.entries) : void(this.$scope.selection = [])
		}, a.$inject = ["$scope", "$location", "$anchorScroll"], a
	}), d("ng-admin/Crud/list/maDatagrid", ["require", "text!./Datagrid.html", "./DatagridController"], function(a) {
		function b() {
			return {
				restrict: "E",
				template: c,
				scope: {
					name: "@",
					entries: "=",
					selection: "=",
					fields: "&",
					listActions: "&",
					entity: "&"
				},
				controllerAs: "datagrid",
				controller: d
			}
		}
		var c = a("text!./Datagrid.html"),
			d = a("./DatagridController");
		return b.$inject = [], b
	}), d("text!ng-admin/Crud/list/maDatagridPagination.html", [], function() {
		return '<nav class="pagination-bar">\n\n    <div class="total" ng-if="paginationCtrl.totalItems > 0">\n        <strong>{{ paginationCtrl.offsetBegin }}</strong> - <strong>{{ paginationCtrl.offsetEnd }}</strong> on <strong>{{ paginationCtrl.totalItems }}</strong>\n    </div>\n\n    <div class="total no-record" ng-if="paginationCtrl.totalItems == 0">\n        <strong>No record found.</strong>\n    </div>\n\n    <ul class="pagination pagination-sm pull-right" role="group" aria-label="pagination" ng-if="paginationCtrl.displayPagination">\n        <li><a href ng-if="paginationCtrl.page != 1" ng-click="paginationCtrl.setPage(paginationCtrl.page - 1)">« Prev</a></li>\n        <li ng-repeat="n in paginationCtrl.range(paginationCtrl.page) track by $index" ng-class="{\'active\': n == paginationCtrl.page}">\n            <a href ng-if="n != \'.\'" ng-click="paginationCtrl.setPage(n)">{{ n }}</a>\n            <span ng-if="n == \'.\'">&hellip;</span>\n        </li>\n        <li><a href ng-if="paginationCtrl.page != paginationCtrl.nbPages" ng-click="paginationCtrl.setPage(paginationCtrl.page + 1)">Next »</a></li>\n    </ul>\n</nav>\n'
	}), d("ng-admin/Crud/list/maDatagridPaginationController", ["require", "angular"], function(a) {
		function b(a) {
			this.$scope = a;
			var b = parseInt(this.$scope.perPage, 10) || 1,
				c = parseInt(this.$scope.totalItems, 10),
				d = Math.max(parseInt(this.$scope.page, 10), 1);
			this.nbPages = Math.ceil(c / b) || 1, this.page = Math.min(this.nbPages, d), this.offsetEnd = Math.min(this.page * b, c), this.offsetBegin = Math.min((this.page - 1) * b + 1, this.offsetEnd), this.totalItems = c, this.displayPagination = c > b
		}
		a("angular");
		return b.prototype.range = function(a) {
			var b = [],
				c = this.nbPages;
			return a > 2 && b.push("1"), 4 == a && b.push("2"), a > 4 && b.push("."), a > 1 && b.push(a - 1), b.push(a), c > a && b.push(a + 1), a == c - 3 && b.push(c - 1), c - 3 > a && b.push("."), c - 1 > a && b.push(c), b
		}, b.prototype.setPage = function(a) {
			0 >= a || a > this.nbPages || this.$scope.setPage()(a)
		}, b.prototype.destroy = function() {
			this.$scope = void 0
		}, b.$inject = ["$scope"], b
	}), d("ng-admin/Crud/list/maDatagridPagination", ["require", "text!./maDatagridPagination.html", "./maDatagridPaginationController"], function(a) {
		function b() {
			return {
				restrict: "E",
				scope: {
					page: "@",
					perPage: "@",
					totalItems: "@",
					setPage: "&"
				},
				template: c,
				controllerAs: "paginationCtrl",
				controller: d
			}
		}
		var c = a("text!./maDatagridPagination.html"),
			d = a("./maDatagridPaginationController");
		return b.$inject = [], b
	}), d("ng-admin/Crud/list/maDatagridInfinitePagination", ["require", "angular"], function(a) {
		function b(a, b) {
			var d = c.element(a),
				e = 100,
				f = b[0].body;
			return {
				restrict: "E",
				scope: {
					perPage: "@",
					totalItems: "@",
					nextPage: "&"
				},
				link: function(b) {
					function c() {
						if (f.offsetHeight - a.innerHeight - a.scrollY < e) {
							if (j >= i) return;
							j++, b.nextPage()(j)
						}
					}
					var g = parseInt(b.perPage, 10) || 1,
						h = parseInt(b.totalItems, 10),
						i = Math.ceil(h / g) || 1,
						j = 1;
					d.bind("scroll", c), b.$on("$destroy", function() {
						d.unbind("scroll", c)
					})
				}
			}
		}
		var c = a("angular");
		return b.$inject = ["$window", "$document"], b
	}), d("ng-admin/Crud/list/maDatagridItemSelector", [], function() {
		function a() {
			return {
				restrict: "E",
				scope: {
					entry: "=",
					selection: "=",
					toggleSelect: "&"
				},
				template: '<input type="checkbox" ng-click="toggle(entry)" ng-checked="selection.indexOf(entry) !== -1"/>',
				link: function(a) {
					a.toggle = function(b) {
						a.toggleSelect({
							entry: b
						})
					}
				}
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/list/maDatagridMultiSelector", [], function() {
		function a() {
			return {
				restrict: "E",
				scope: {
					entries: "=",
					selection: "=",
					toggleSelectAll: "&"
				},
				template: '<input type="checkbox" ng-click="toggleSelectAll()" ng-checked="selection.length == entries.length" />',
				link: function(a, b) {
					a.$watch("selection", function(c) {
						b.children()[0].indeterminate = c.length > 0 && c.length != a.entries.length
					}), a.$watch("entries", function(c) {
						b.children()[0].indeterminate = a.selection.length > 0 && a.selection.length != c.length
					})
				}
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/filter/maFilterController", [], function() {
		function a(a, c, d) {
			this.$scope = a, this.$state = c, this.$stateParams = d, this.$scope.values = this.$stateParams.search || {}, this.$scope.filters = this.$scope.filters(), this.isFilterEmpty = b(this.$scope.values)
		}

		function b(a) {
			for (var b in a)
				if ("" != a[b]) return !1;
			return !0
		}
		return a.prototype.filter = function() {
			var a, b, c, d = {}, e = this.$scope.filters;
			for (c in e) b = e[c], a = b.name(), this.$scope.values[a] && (d[a] = this.$scope.values[a]);
			this.$stateParams.search = d, this.$stateParams.page = 1, this.$state.go(this.$state.current, this.$stateParams, {
				reload: !0,
				inherit: !1,
				notify: !0
			})
		}, a.prototype.shouldFilter = function() {
			return Object.keys(this.$scope.filters).length
		}, a.prototype.clearFilters = function() {
			var a;
			for (a in this.$scope.values) this.$scope.values[a] = null;
			this.filter()
		}, a.$inject = ["$scope", "$state", "$stateParams"], a
	}), d("ng-admin/Crud/filter/maFilter", ["require", "./maFilterController", "lodash"], function(a) {
		function b(a) {
			var b = d(a).map(function(a, b) {
				return '<span ng-switch-when="' + b + '">' + a.getFilterWidget() + "</span>"
			}).join(""),
				e = '<form class="filters navbar-form well well-sm" ng-if="filterCtrl.shouldFilter()" ng-submit="filterCtrl.filter()"><div class="filter form-group" ng-repeat="field in filters track by $index" ng-class="{\'input-group\':field.label()}"><label for="{{ field.name() }}" ng-if="field.label() && field.type() != \'boolean\'" class="input-group-addon">{{ field.label() }}<span ng-if="field.validation().required">&nbsp;*</span>&nbsp;</label><div ng-switch="field.type()" ng-class="field.getCssClasses(entry)">' + b + '</div></div><button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span> Filter</button> <button ng-if="!filterCtrl.isFilterEmpty" class="btn btn-default" type="button" ng-click="filterCtrl.clearFilters()"><span class="glyphicon glyphicon-remove"></span> Clear</button></form>';
			return {
				restrict: "E",
				template: e,
				scope: {
					filters: "&"
				},
				controllerAs: "filterCtrl",
				controller: c
			}
		}
		var c = a("./maFilterController"),
			d = a("lodash");
		return b.$inject = ["FieldViewConfiguration"], b
	}), d("ng-admin/Crud/column/maColumn", ["require"], function() {
		function a(a, b, c, d, e) {
			function f(a) {
				if (a.isDetailLink() === !1) return !1;
				if ("reference" != a.type() && "reference_many" != a.type()) return !0;
				var b = a.targetEntity().name(),
					c = d().getEntity(b);
				return c ? c.isReadOnly ? c.showView().isEnabled() : c.editionView().isEnabled() : !1
			}
			return {
				restrict: "E",
				scope: {
					field: "&",
					entry: "&",
					entity: "&"
				},
				link: function(g, h) {
					g.field = g.field(), g.entry = g.entry();
					var i = g.field.type();
					h.append(f(g.field) ? e[i].getLinkWidget() : e[i].getReadWidget()), c(h.contents())(g), g.gotoDetail = function() {
						this.clearRouteParams();
						var c = g.field.detailLinkRoute();
						"edit" != c || g.entity().editionView().enabled || (c = "show"), a.path("/" + g.entry.entityName + "/" + c + "/" + g.entry.identifierValue), b(0)
					}, g.gotoReference = function() {
						this.clearRouteParams();
						var b = g.field.targetEntity().name(),
							c = d().getEntity(b),
							e = g.entry.values[g.field.name()],
							f = c.isReadOnly ? "show" : g.field.detailLinkRoute();
						a.path("/" + b + "/" + f + "/" + e)
					}, g.clearRouteParams = function() {
						a.search("q", null), a.search("page", null), a.search("sortField", null), a.search("sortDir", null)
					}
				}
			}
		}
		return a.$inject = ["$location", "$anchorScroll", "$compile", "NgAdminConfiguration", "FieldViewConfiguration"], a
	}), d("ng-admin/Crud/column/maBooleanColumn", ["require"], function() {
		function a() {
			return {
				restrict: "E",
				scope: {
					value: "&"
				},
				link: function(a) {
					a.isOk = !! a.value()
				},
				template: "<span class=\"glyphicon\" ng-class=\"{'glyphicon-ok': isOk, 'glyphicon-remove': !isOk}\"></span>"
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/column/maChoicesColumn", ["require"], function() {
		function a() {
			return {
				restrict: "E",
				scope: {
					values: "&"
				},
				template: '<span ng-repeat="ref in values() track by $index" class="label label-default">{{ ref }}</span>'
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/column/maDateColumn", ["require"], function() {
		function a() {
			return {
				restrict: "E",
				scope: {
					value: "&",
					field: "&"
				},
				template: "<span>{{ value() | date:field().format() }}</span>"
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/column/maJsonColumn", ["require"], function() {
		function a(a) {
			return {
				restrict: "E",
				scope: {
					value: "&"
				},
				link: function(b, c) {
					b.guessType = function(a) {
						var b = Object.prototype.toString.call(a);
						return "[object Object]" === b ? "Object" : "[object Array]" === b ? "Array" : "Literal"
					};
					var d = '<span ng-switch="guessType(value())"><table class="table table-condensed" ng-switch-when="Array"><tbody><tr ng-repeat="val in value() track by $index"><td ng-switch="guessType(val)"><ma-json-column ng-switch-when="Object" value="::val"></ma-json-column><ma-json-column ng-switch-when="Array" value="::val"></ma-json-column><span ng-switch-when="Literal">{{ val }}</span></td></tr></tbody></table><table class="table table-condensed table-bordered" ng-switch-when="Object"><tbody><tr ng-repeat="(key, val) in value() track by key"><th class="active">{{ key }}</th><td ng-switch="guessType(val)"><ma-json-column ng-switch-when="Object" value="::val"></ma-json-column><ma-json-column ng-switch-when="Array" value="::val"></ma-json-column><span ng-switch-when="Literal">{{ val }}</span></td></tr></tbody></table></span>',
						e = angular.element(d);
					a(e)(b), c.replaceWith(e)
				}
			}
		}
		return a.$inject = ["$compile"], a
	}), d("ng-admin/Crud/column/maNumberColumn", ["require"], function() {
		function a() {
			return {
				restrict: "E",
				scope: {
					value: "&",
					field: "&"
				},
				template: "<span>{{ value() | numeraljs:field().format() }}</span>"
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/column/maReferenceManyColumn", ["require"], function() {
		function a() {
			return {
				restrict: "E",
				scope: {
					values: "&"
				},
				template: '<span ng-repeat="ref in values() track by $index"><span class="label label-default">{{ ref }}</span></span>'
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/column/maReferenceManyLinkColumn", ["require"], function() {
		function a(a, b) {
			return {
				restrict: "E",
				scope: {
					field: "&",
					values: "&",
					ids: "&"
				},
				link: function(c) {
					c.field = c.field(), c.values = c.values(), c.ids = c.ids();
					var d = c.field.targetEntity().name(),
						e = b().getEntity(d);
					c.gotoReference = function(b) {
						var c = e.isReadOnly ? "show" : "edit";
						a.path("/" + d + "/" + c + "/" + b)
					}
				},
				template: '<a ng-repeat="ref in values track by $index" ng-click="gotoReference(ids[$index])" class="multiple"><span class="label label-default">{{ ref }}</span></a>'
			}
		}
		return a.$inject = ["$location", "NgAdminConfiguration"], a
	}), d("ng-admin/Crud/column/maStringColumn", ["require"], function() {
		function a() {
			return {
				restrict: "E",
				scope: {
					value: "&"
				},
				template: "<span>{{ value() }}</span>"
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/column/maTemplateColumn", ["require"], function() {
		function a() {
			return {
				restrict: "E",
				scope: {
					field: "&",
					entry: "&",
					entity: "&"
				},
				link: function(a) {
					a.field = a.field(), a.entry = a.entry(), a.entity = a.entity()
				},
				template: '<span compile="field.getTemplateValue(entry)"></span>'
			}
		}
		return a.$inject = [], a
	}), d("ng-admin/Crud/column/maWysiwygColumn", ["require"], function() {
		function a(a) {
			return {
				restrict: "E",
				scope: {
					value: "&",
					field: "&"
				},
				link: function(b) {
					var c = b.value();
					b.field().stripTags() && (c = a("stripTags")(c)), b.htmlValue = c
				},
				template: '<span ng-bind-html="htmlValue"></span>'
			}
		}
		return a.$inject = ["$filter"], a
	}), d("ng-admin/Crud/button/maBackButton", [], function() {
		function a(a) {
			return {
				restrict: "E",
				scope: {
					size: "@",
					label: "@"
				},
				link: function(b) {
					b.label = b.label || "Back", b.back = function() {
						a.history.back()
					}
				},
				template: '<a class="btn btn-default" ng-class="size ? \'btn-\' + size : \'\'" ng-click="back()"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>&nbsp;{{ ::label }}</a>'
			}
		}
		return a.$inject = ["$window"], a
	}), d("ng-admin/Crud/button/maCreateButton", [], function() {
		function a(a) {
			return {
				restrict: "E",
				scope: {
					entity: "&",
					size: "@",
					label: "@"
				},
				link: function(b) {
					b.label = b.label || "Create", b.gotoCreate = function() {
						a.go(a.get("create"), {
							entity: b.entity().name()
						})
					}
				},
				template: '<a class="btn btn-default" ng-class="size ? \'btn-\' + size : \'\'" ng-click="gotoCreate()"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;{{ ::label }}</a>'
			}
		}
		return a.$inject = ["$state"], a
	}), d("ng-admin/Crud/button/maEditButton", [], function() {
		function a(a) {
			return {
				restrict: "E",
				scope: {
					entity: "&",
					entry: "&",
					size: "@",
					label: "@"
				},
				link: function(b) {
					b.label = b.label || "Edit", b.gotoEdit = function() {
						a.go(a.get("edit"), {
							entity: b.entity().name(),
							id: b.entry().identifierValue
						})
					}
				},
				template: '<a class="btn btn-default" ng-class="size ? \'btn-\' + size : \'\'" ng-click="gotoEdit()"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>&nbsp;{{ ::label }}</a>'
			}
		}
		return a.$inject = ["$state"], a
	}), d("ng-admin/Crud/button/maFilteredListButton", [], function() {
		function a(a) {
			return {
				restrict: "E",
				scope: {
					entityName: "@",
					filter: "&",
					label: "@",
					size: "@"
				},
				link: function(b) {
					b.label = b.label || "See all related " + b.entityName, b.gotoList = function() {
						a.go(a.get("list"), {
							entity: b.entityName,
							search: b.filter()
						})
					}
				},
				template: '<a class="btn btn-default" ng-class="size ? \'btn-\' + size : \'\'" ng-click="gotoList()"><span class="glyphicon glyphicon-list" aria-hidden="true"></span>&nbsp;{{ ::label }}</a>'
			}
		}
		return a.$inject = ["$state"], a
	}), d("ng-admin/Crud/button/maShowButton", [], function() {
		function a(a) {
			return {
				restrict: "E",
				scope: {
					entity: "&",
					entry: "&",
					size: "@",
					label: "@"
				},
				link: function(b) {
					b.label = b.label || "Show", b.gotoShow = function() {
						a.go(a.get("show"), {
							entity: b.entity().name(),
							id: b.entry().identifierValue
						})
					}
				},
				template: '<a class="btn btn-default" ng-class="size ? \'btn-\' + size : \'\'" ng-click="gotoShow()"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>&nbsp;{{ ::label }}</a>'
			}
		}
		return a.$inject = ["$state"], a
	}), d("ng-admin/Crud/button/maListButton", [], function() {
		function a(a) {
			return {
				restrict: "E",
				scope: {
					entity: "&",
					size: "@",
					label: "@"
				},
				link: function(b) {
					b.label = b.label || "List", b.gotoList = function() {
						a.go(a.get("list"), {
							entity: b.entity().name()
						})
					}
				},
				template: '<a class="btn btn-default" ng-class="size ? \'btn-\' + size : \'\'" ng-click="gotoList()"><span class="glyphicon glyphicon-list" aria-hidden="true"></span>&nbsp;{{ ::label }}</a>'
			}
		}
		return a.$inject = ["$state"], a
	}), d("ng-admin/Crud/button/maDeleteButton", [], function() {
		function a(a) {
			return {
				restrict: "E",
				scope: {
					entity: "&",
					entry: "&",
					size: "@",
					label: "@"
				},
				link: function(b) {
					b.label = b.label || "Delete", b.gotoDelete = function() {
						a.go(a.get("delete"), {
							entity: b.entity().name(),
							id: b.entry().identifierValue
						})
					}
				},
				template: '<a class="btn btn-default" ng-class="size ? \'btn-\' + size : \'\'" ng-click="gotoDelete()"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span>&nbsp;{{ ::label }}</a>'
			}
		}
		return a.$inject = ["$state"], a
	}), d("ng-admin/Crud/button/maBatchDeleteButton", [], function() {
		function a(a) {
			return {
				restrict: "E",
				scope: {
					entity: "&",
					selection: "&",
					label: "@"
				},
				link: function(b) {
					b.label = b.label || "Delete", b.gotoBatchDelete = function() {
						var c = b.entity(),
							d = b.selection().map(function(a) {
								return a.identifierValue
							});
						a.go("batchDelete", {
							ids: d,
							entity: c.name()
						})
					}
				},
				template: '<span ng-click="gotoBatchDelete()"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span>&nbsp;{{ ::label }}</span>'
			}
		}
		return a.$inject = ["$state"], a
	}), d("ng-admin/Crud/button/maExportToCsvButton", [], function() {
		function a(a, b, c, d, e) {
			return {
				restrict: "E",
				scope: {
					entity: "&",
					label: "@"
				},
				template: '<button ng-if="has_export" class="btn btn-default" ng-click="exportToCsv()"><span class="glyphicon glyphicon-download" aria-hidden="true"></span>&nbsp;{{ ::label }}</button>',
				link: function(f) {
					f.label = f.label || "Export", f.entity = f.entity();
					var g = f.entity.exportView(),
						h = f.entity.listView();
					if (0 === g.fields().length) {
						var i = h.exportFields();
						null === i && (i = h.fields()), g.fields(i)
					}
					f.has_export = g.fields().length > 0;
					var j = d.getFormatter(g.fields());
					f.exportToCsv = function() {
						e.getAll(g, -1, !0, a.search, a.sortField, a.sortDir).then(function(a) {
							for (var c = [], d = a.entries, e = d.length - 1; e >= 0; e--) c[e] = j(d[e]);
							var g = b.unparse(c),
								h = document.createElement("a");
							h.setAttribute("href", "data:application/octet-stream;charset=utf-8," + encodeURIComponent(g)), h.setAttribute("download", f.entity.name() + ".csv"), h.click()
						}, function(a) {
							c.log(a.message, {
								addnCls: "humane-flatty-error"
							})
						})
					}
				}
			}
		}
		return a.$inject = ["$stateParams", "Papa", "notification", "EntryFormatter", "RetrieveQueries"], a
	}), d("text!ng-admin/Crud/misc/view-actions.html", [], function() {
		return '<span ng-repeat="button in buttons" ng-switch="button" class="view_actions">\n    <ma-view-batch-actions ng-switch-when="batch" buttons="batchButtons()" selection="selection" entity="entity"></ma-view-batch-actions>\n    <ma-back-button ng-switch-when="back"></ma-back-button>\n    <ma-list-button ng-switch-when="list" entity="entity"></ma-list-button>\n    <ma-create-button ng-switch-when="create" entity="entity"></ma-create-button>\n    <ma-show-button ng-switch-when="show" entry="entry" entity="entity"></ma-show-button>\n    <ma-edit-button ng-switch-when="edit" entry="entry" entity="entity"></ma-edit-button>\n    <ma-delete-button ng-switch-when="delete" entry="entry" entity="entity"></ma-delete-button>\n    <ma-export-to-csv-button ng-switch-when="export" entry="entry" entity="entity"></ma-export-to-csv-button>\n    <span ng-switch-default><span compile="button"></span></span>\n</span>\n'
	}), d("ng-admin/Crud/misc/ViewActions", ["require", "text!./view-actions.html"], function(a) {
		function b(a) {
			var b = a.get("$compile");
			return {
				restrict: "E",
				transclude: !0,
				scope: {
					override: "&",
					entry: "=",
					entity: "=",
					selection: "=",
					batchButtons: "&"
				},
				template: c,
				link: function(a, c, d, e, f) {
					var g = a.override();
					return g ? "string" == typeof g ? (c.html(g), void b(c.contents())(a)) : void(a.buttons = g) : void f(a, function(a) {
						c.append(a)
					})
				}
			}
		}
		var c = a("text!./view-actions.html");
		return b.$inject = ["$injector"], b
	}), d("text!ng-admin/Crud/misc/view-batch-actions.html", [], function() {
		return '<span ng-if="selection" class="btn-group" dropdown is-open="isopen">\n    <button type="button" ng-if="selection.length" class="btn btn-default dropdown-toggle" dropdown-toggle >\n        {{ selection.length }} Selected <span class="caret"></span>\n    </button>\n    <ul class="dropdown-menu" role="menu">\n        <li ng-repeat="button in buttons" ng-switch="button">\n            <a ng-switch-when="delete">\n                <ma-batch-delete-button selection="selection" entity="entity"/>\n            </a>\n            <a ng-switch-default>\n                <span compile="button"></span>\n            </a>\n        </li>\n    </ul>\n</span>\n'
	}), d("ng-admin/Crud/misc/ViewBatchActions", ["require", "text!./view-batch-actions.html"], function(a) {
		function b(a) {
			a.get("$compile");
			return {
				restrict: "E",
				scope: {
					entity: "=",
					selection: "=",
					buttons: "&"
				},
				template: c,
				link: function(a) {
					a.isopen = !1, a.toggleDropdown = function(b) {
						b.preventDefault(), b.stopPropagation(), a.isopen = !a.isopen
					}, a.buttons = a.buttons(), "string" == typeof a.buttons && (a.customTemplate = a.buttons, a.buttons = null)
				}
			}
		}
		var c = a("text!./view-batch-actions.html");
		return b.$inject = ["$injector"], b
	}), d("ng-admin/Crud/misc/Compile", [], function() {
		function a(a) {
			var b = a.get("$compile");
			return {
				transclude: !0,
				link: function(a, c, d, e, f) {
					var g = a.$watch(function(a) {
						return a.$eval(d.compile)
					}, function(e) {
						return !1 === e ? void f(a, function(a) {
							c.append(a)
						}) : (c.html(e), b(c.contents())(a), void("true" == d.compileOnce && g()))
					})
				}
			}
		}
		return a.$inject = ["$injector"], a
	}), d("text!ng-admin/Crud/list/list.html", [], function() {
		return '<div class="row list-header">\n    <div class="col-lg-12">\n        <ma-view-actions override="::listController.actions" selection="listController.selection" batch-buttons="::listController.batchActions" entity="::listController.entity">\n            <ma-view-batch-actions buttons="::batchButtons()" selection="selection" entity="::entity"></ma-view-batch-actions>\n            <ma-create-button ng-if="::entity.creationView().enabled" entity="::entity"></ma-create-button>\n            <ma-export-to-csv-button entity="::entity"></ma-export-to-csv-button>\n        </ma-view-actions>\n\n        <div class="page-header">\n            <h1 compile="::listController.title">\n                {{ ::listController.view.entity.name() | humanize | pluralize }} list\n            </h1>\n            <p class="lead" ng-if="::listController.description" compile="::listController.description">{{ ::listController.description }}</p>\n        </div>\n\n        <ma-filter ng-if="listController.hasFilters" filters="::listController.filters"></ma-filter>\n    </div>\n</div>\n\n<div class="row list-view" ng-class="::\'ng-admin-entity-\' + listController.entity.name()">\n    <div class="col-lg-12">\n        <ma-datagrid name="{{ ::listController.view.name() }}"\n                  entries="listController.entries"\n                  selection="listController.selection"\n                  fields="::listController.fields"\n                  list-actions="::listController.listActions"\n                  entity="::listController.entity">\n        </ma-datagrid>\n    </div>\n</div>\n\n<div class="row" ng-if="::!listController.infinitePagination">\n    <div class="col-lg-12">\n        <ma-datagrid-pagination\n            page="{{ listController.page }}"\n            per-page="{{ ::listController.view.perPage() }}"\n            total-items="{{ listController.totalItems }}"\n            set-page="::listController.setPageCallback">\n        </ma-datagrid-pagination>\n    </div>\n</div>\n\n<ma-datagrid-infinite-pagination ng-if="::listController.infinitePagination"\n            per-page="{{ ::listController.view.perPage() }}"\n            total-items="{{ ::listController.totalItems }}"\n            next-page="::listController.nextPageCallback">\n</ma-datagrid-infinite-pagination>\n'
	}), d("text!ng-admin/Crud/show/show.html", [], function() {
		return '<div class="row">\n    <div class="col-lg-12">\n        <ma-view-actions override="::showController.actions" entry="entry" entity="::showController.entity">\n            <ma-list-button entity="::entity"></ma-list-button>\n            <ma-edit-button ng-if="::entity.editionView().enabled" entry="entry" entity="::entity"></ma-edit-button>\n            <ma-delete-button ng-if="::entity.deletionView().enabled" entry="entry" entity="::entity"></ma-delete-button>\n        </ma-view-actions>\n\n        <div class="page-header">\n            <h1 compile="::showController.title">\n                {{ ::showController.view.entity.name() | humanize:true | singularize }}  #{{ ::entry.identifierValue }} Detail\n            </h1>\n            <p class="lead" ng-if="::showController.description" compile="::showController.description">{{ ::showController.description }}</p>\n        </div>\n    </div>\n</div>\n\n\n<div class="row form-horizontal" id="show-view">\n\n    <div class="col-lg-12 form-group" ng-repeat="field in ::showController.fields track by $index">\n\n        <label class="col-sm-2 control-label">{{ field.label() }}</label>\n\n        <div class="show-value" ng-class="::\'ng-admin-field-\' + field.name() + \' \' + (field.getCssClasses(entry) || \'col-sm-10 col-md-8 col-lg-7\')">\n\n            <ma-column field="::field" entry="::entry" entity="::entity"></ma-column>\n\n        </div>\n    </div>\n\n</div>\n'
	}), d("text!ng-admin/Crud/form/create.html", [], function() {
		return '<div class="row">\n    <div class="col-lg-12">\n        <ma-view-actions override="::formController.actions" entry="entry" entity="::formController.entity">\n            <ma-list-button entity="::entity"></ma-list-button>\n        </ma-view-actions>\n\n        <div class="page-header">\n            <h1 compile="::formController.title">\n                Create new {{ ::formController.view.entity.name() | humanize:true | singularize }}\n            </h1>\n            <p class="lead" ng-if="::formController.description" compile="::formController.description">{{ ::formController.description }}</p>\n        </div>\n    </div>\n</div>\n\n<div class="row" id="create-view" ng-class="::\'ng-admin-entity-\' + formController.entity.name()">\n    <form class="col-lg-12 form-horizontal" name="formController.form" ng-submit="formController.submitCreation($event)">\n        <div class="form-field form-group" ng-repeat="field in ::formController.fields track by $index">\n            <ma-field field="::field" entry="entry" entity="::entity" form="formController.form"></ma-field>\n        </div>\n\n        <div class="form-group">\n            <div class="col-sm-offset-2 col-sm-10">\n                <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Submit</button>\n            </div>\n        </div>\n    </form>\n</div>\n'
	}), d("text!ng-admin/Crud/form/edit.html", [], function() {
		return '<div class="row">\n    <div class="col-lg-12">\n        <ma-view-actions override="::formController.actions" entry="entry" entity="::formController.entity">\n            <ma-list-button entity="::entity"></ma-list-button>\n            <ma-delete-button ng-if="::entity.deletionView().enabled" entry="entry" entity="::entity"></ma-delete-button>\n        </ma-view-actions>\n\n        <div class="page-header">\n            <h1 compile="::formController.title">\n                Edit {{ ::formController.entity.name() | humanize:true | singularize }}  #{{ ::entry.identifierValue }}\n            </h1>\n            <p class="lead" ng-if="::formController.description" compile="::formController.description">{{ ::formController.description }}</p>\n        </div>\n    </div>\n</div>\n\n<div class="row" id="edit-view" ng-class="::\'ng-admin-entity-\' + formController.entity.name()">\n    <form class="col-lg-12 form-horizontal" name="formController.form" ng-submit="formController.submitEdition($event)">\n        <div class="form-field form-group" ng-repeat="field in ::formController.fields track by $index">\n            <ma-field field="::field" entry="entry" entity="::entity" form="formController.form"></ma-field>\n        </div>\n\n        <div class="form-group">\n            <div class="col-sm-offset-2 col-sm-10">\n                <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Save Changes</button>\n            </div>\n        </div>\n    </form>\n</div>\n'
	}), d("text!ng-admin/Crud/delete/delete.html", [], function() {
		return '<div class="row">\n    <div class="col-lg-12">\n        <ma-view-actions override="::deleteController.actions" entry="::entry" entity="::deleteController.entity">\n            <ma-list-button entity="::entity"></ma-list-button>\n        </ma-view-actions>\n\n        <div class="page-header">\n            <h1 compile="::deleteController.title">\n                Delete {{ ::deleteController.view.entity.name() | humanize:true | singularize }}  #{{ ::entry.identifierValue }}\n            </h1>\n            <p class="lead" ng-if="::deleteController.description" compile="::deleteController.description">{{ ::deleteController.description }}</p>\n        </div>\n    </div>\n</div>\n\n<div class="row" id="delete-view">\n    <div class="col-lg-12">\n        <p>Are you sure ?</p>\n        <button class="btn btn-danger" ng-click="deleteController.deleteOne()">Yes</button>\n        <button class="btn btn-default" ng-click="deleteController.back()">No</button>\n    </div>\n</div>\n'
	}), d("text!ng-admin/Crud/delete/batchDelete.html", [], function() {
		return '<div class="row list-header">\n    <div class="col-lg-12">\n        <ma-view-actions override="::batchDeleteController.actions" selection="batchDeleteController.selection" entity="::batchDeleteController.entity">\n            <ma-list-button entity="::entity"></ma-list-button>\n        </ma-view-actions>\n\n        <div class="page-header">\n            <h1 compile="::batchDeleteController.title">\n                Delete {{ ::batchDeleteController.entityIds.length }} {{ ::batchDeleteController.view.entity.name() | humanize | pluralize }}\n            </h1>\n        </div>\n    </div>\n</div>\n\n<div class="row">\n    <div class="col-lg-12">\n        <p>Are you sure ?</p>\n        <button class="btn btn-danger" ng-click="batchDeleteController.batchDelete()">Yes</button>\n        <button class="btn btn-default" ng-click="batchDeleteController.back()">No</button>\n    </div>\n</div>\n\n<div ng-if="selection" class="row list-view" ng-class="::\'ng-admin-entity-\' + batchDeleteController.entity.name()">\n    <div class="col-lg-12">\n        <ma-datagrid name="{{ ::batchDeleteController.view.name() }}"\n                  entries="batchDeleteController.selection"\n                  fields="::batchDeleteController.fields"\n                  entity="::batchDeleteController.entity">\n        </ma-datagrid>\n    </div>\n</div>\n';

	}), d("ng-admin/Crud/routing", ["require", "text!./list/list.html", "text!./show/show.html", "text!./form/create.html", "text!./form/edit.html", "text!./delete/delete.html", "text!./delete/batchDelete.html"], function(a) {
		function b(a, b) {
			return ["$stateParams", "NgAdminConfiguration", function(c, d) {
				var e, f = d().getViewByEntityAndType(c.entity, a);
				return (e = f.template()) ? e : (e = d().customTemplate()(a), e ? e : b)
			}]
		}

		function c(a) {
			return ["$stateParams", "NgAdminConfiguration", function(b, c) {
				try {
					var d = c().getViewByEntityAndType(b.entity, a)
				} catch (e) {
					var f = new Error("Unknown view or entity name");
					throw f.status = 404, f
				}
				if (!d.isEnabled()) throw new Error("The " + a + " is disabled for this entity");
				return d
			}]
		}

		function d(a) {
			a.state("list", {
				parent: "main",
				url: "/:entity/list?{search:json}&page&sortField&sortDir",
				params: {
					entity: null,
					page: null,
					search: null,
					sortField: null,
					sortDir: null
				},
				controller: "ListController",
				controllerAs: "listController",
				templateProvider: b("ListView", e),
				resolve: {
					view: c("ListView"),
					data: ["$stateParams", "RetrieveQueries", "view",
						function(a, b, c) {
							var d = a.page,
								e = a.search,
								f = a.sortField,
								g = a.sortDir;
							return b.getAll(c, d, !0, e, f, g)
						}
					],
					referencedValues: ["$stateParams", "RetrieveQueries", "view",
						function(a, b, c) {
							return b.getReferencedValues(c.getFilterReferences())
						}
					]
				}
			}), a.state("show", {
				parent: "main",
				url: "/:entity/show/:id?sortField&sortDir",
				controller: "ShowController",
				controllerAs: "showController",
				templateProvider: b("ShowView", f),
				params: {
					entity: {},
					id: null,
					sortField: null,
					sortDir: null
				},
				resolve: {
					view: c("ShowView"),
					rawEntry: ["$stateParams", "RetrieveQueries", "view",
						function(a, b, c) {
							return b.getOne(c, a.id)
						}
					],
					referencedValues: ["RetrieveQueries", "view", "rawEntry",
						function(a, b, c) {
							return a.getReferencedValues(b.getReferences(), [c.values])
						}
					],
					referencedListValues: ["$stateParams", "RetrieveQueries", "view", "rawEntry",
						function(a, b, c, d) {
							var e = a.sortField,
								f = a.sortDir;
							return b.getReferencedListValues(c, e, f, d.identifierValue)
						}
					],
					entry: ["RetrieveQueries", "rawEntry", "referencedValues",
						function(a, b, c) {
							return a.fillReferencesValuesFromEntry(b, c, !0)
						}
					]
				}
			}), a.state("create", {
				parent: "main",
				url: "/:entity/create",
				controller: "FormController",
				controllerAs: "formController",
				templateProvider: b("CreateView", g),
				resolve: {
					view: c("CreateView"),
					entry: ["view",
						function(a) {
							var b = a.mapEntry({});
							return a.processFieldsDefaultValue(b), b
						}
					],
					referencedValues: ["RetrieveQueries", "view",
						function(a, b) {
							return a.getReferencedValues(b.getReferences())
						}
					]
				}
			}), a.state("edit", {
				parent: "main",
				url: "/:entity/edit/:id?sortField&sortDir",
				controller: "FormController",
				controllerAs: "formController",
				templateProvider: b("EditView", h),
				params: {
					entity: {},
					id: null,
					sortField: null,
					sortDir: null
				},
				resolve: {
					view: c("EditView"),
					rawEntry: ["$stateParams", "RetrieveQueries", "view",
						function(a, b, c) {
							return b.getOne(c, a.id)
						}
					],
					referencedValues: ["RetrieveQueries", "view", "rawEntry",
						function(a, b) {
							return a.getReferencedValues(b.getReferences(), null)
						}
					],
					referencedListValues: ["$stateParams", "RetrieveQueries", "view", "rawEntry",
						function(a, b, c, d) {
							var e = a.sortField,
								f = a.sortDir;
							return b.getReferencedListValues(c, e, f, d.identifierValue)
						}
					],
					entry: ["RetrieveQueries", "rawEntry", "referencedValues",
						function(a, b, c) {
							return a.fillReferencesValuesFromEntry(b, c, !0)
						}
					]
				}
			}), a.state("delete", {
				parent: "main",
				url: "/:entity/delete/:id",
				controller: "DeleteController",
				controllerAs: "deleteController",
				templateProvider: b("DeleteView", i),
				resolve: {
					view: c("DeleteView"),
					params: ["$stateParams",
						function(a) {
							return a
						}
					],
					entry: ["$stateParams", "RetrieveQueries", "view",
						function(a, b, c) {
							return b.getOne(c, a.id)
						}
					]
				}
			}), a.state("batchDelete", {
				parent: "main",
				url: "/:entity/batch-delete/{ids:json}",
				controller: "BatchDeleteController",
				controllerAs: "batchDeleteController",
				templateProvider: b("BatchDeleteView", j),
				params: {
					entity: {},
					ids: []
				},
				resolve: {
					view: c("BatchDeleteView"),
					params: ["$stateParams",
						function(a) {
							return a
						}
					]
				}
			})
		}
		var e = a("text!./list/list.html"),
			f = a("text!./show/show.html"),
			g = a("text!./form/create.html"),
			h = a("text!./form/edit.html"),
			i = a("text!./delete/delete.html"),
			j = a("text!./delete/batchDelete.html");
		return d.$inject = ["$stateProvider"], d
	}), d("ng-admin/Crud/fieldView/BooleanFieldView", ["require"], function() {
		function a() {
			return '<ma-boolean-column value="::entry.values[field.name()]"></ma-boolean-column>'
		}

		function b() {
			return '<a ng-click="gotoDetail()">' + a() + "</a>"
		}

		function c() {
			return '<ma-button-field field="::field" value="values[field.name()]"></ma-button-field>'
		}

		function d() {
			return '<ma-checkbox-field field="::field" value="entry.values[field.name()]"></ma-checkbox-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/ChoiceFieldView", ["require"], function() {
		function a() {
			return '<ma-string-column value="::field.getLabelForChoice(entry.values[field.name()], entry)"></ma-string-column>'
		}

		function b() {
			return '<a ng-click="gotoDetail()">' + a() + "</a>"
		}

		function c() {
			return '<ma-choice-field field="::field" value="values[field.name()]"></ma-choice-field>'
		}

		function d() {
			return '<ma-choice-field field="::field" entry="entry" value="entry.values[field.name()]"></ma-choice-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/ChoicesFieldView", ["require"], function() {
		function a() {
			return '<ma-choices-column values="::entry.values[field.name()]"></ma-choices-column>'
		}

		function b() {
			return '<a ng-click="gotoDetail()">' + a() + "</a>"
		}

		function c() {
			return '<ma-choices-field field="::field" value="values[field.name()]"></ma-choices-field>'
		}

		function d() {
			return '<ma-choices-field field="::field" entry="::entry" value="entry.values[field.name()]"></ma-choices-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/DateFieldView", ["require"], function() {
		function a() {
			return '<ma-date-column field="::field" value="::entry.values[field.name()]"></ma-date-column>'
		}

		function b() {
			return '<a ng-click="gotoDetail()">' + a() + "</a>"
		}

		function c() {
			return '<ma-date-field field="::field" value="values[field.name()]"></ma-date-field>'
		}

		function d() {
			return '<div class="row"><ma-date-field field="::field" value="entry.values[field.name()]" class="col-sm-4"></ma-date-field></div>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/EmailFieldView", ["require"], function() {
		function a() {
			return '<ma-string-column value="::entry.values[field.name()]"></ma-string-column>'
		}

		function b() {
			return '<a ng-click="gotoDetail()">' + a() + "</a>"
		}

		function c() {
			return '<ma-input-field field="::field" value="values[field.name()]"></ma-input-field>'
		}

		function d() {
			return '<ma-input-field type="email" field="::field" value="entry.values[field.name()]"></ma-input-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/FileFieldView", ["require"], function() {
		function a() {
			return "error: cannot display file field as readable"
		}

		function b() {
			return "error: cannot display file field as linkable"
		}

		function c() {
			return "error: cannot display file field as filter"
		}

		function d() {
			return '<ma-file-field field="::field" value="entry.values[field.name()]"></ma-file-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/JsonFieldView", ["require"], function() {
		function a() {
			return '<ma-json-column value="::entry.values[field.name()]"></ma-json-column>'
		}

		function b() {
			return "error: cannot display a json field as linkable"
		}

		function c() {
			return '<ma-input-field field="::field" value="values[field.name()]"></ma-input-field>'
		}

		function d() {
			return '<ma-json-field field="::field" value="entry.values[field.name()]"></ma-json-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/NumberFieldView", ["require"], function() {
		function a() {
			return '<ma-number-column field="::field" value="::entry.values[field.name()]"></ma-number-column>'
		}

		function b() {
			return '<a ng-click="gotoDetail()">' + a() + "</a>"
		}

		function c() {
			return '<ma-input-field type="number" field="::field" value="values[field.name()]"></ma-input-field>'
		}

		function d() {
			return '<ma-input-field type="number" field="::field" value="entry.values[field.name()]"></ma-input-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/PasswordFieldView", ["require"], function() {
		function a() {
			return "error: cannot display password field as readable"
		}

		function b() {
			return "error: cannot display password field as linkable"
		}

		function c() {
			return "error: cannot display password field as filter"
		}

		function d() {
			return '<ma-input-field type="password" field="::field" value="entry.values[field.name()]"></ma-input-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/ReferencedListFieldView", ["require"], function() {
		function a() {
			return '<ma-datagrid name="{{ field.getReferencedView().name() }}" entries="field.entries" fields="::field.getReferencedView().fields()" list-actions="::field.listActions()" entity="::field.getReferencedView().entity"></ma-datagrid>'
		}

		function b() {
			return "error: cannot display referenced_list field as linkable"
		}

		function c() {
			return "error: cannot display referenced_list field as filter"
		}

		function d() {
			return '<ma-datagrid name="{{ field.getReferencedView().name() }}"entries="field.entries" fields="::field.getReferencedView().fields()" list-actions="::field.listActions()" entity="::field.getReferencedView().entity"></ma-datagrid>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/ReferenceFieldView", ["require"], function() {
		function a() {
			return '<ma-string-column value="::entry.listValues[field.name()]"></ma-string-column>'
		}

		function b() {
			return '<a ng-click="gotoReference()">' + a() + "</a>"
		}

		function c() {
			return '<ma-choice-field field="::field" value="values[field.name()]"></ma-choice-field>'
		}

		function d() {
			return '<ma-choice-field field="::field" value="entry.values[field.name()]"></ma-choice-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/ReferenceManyFieldView", ["require"], function() {
		function a() {
			return '<ma-choices-column values="::entry.listValues[field.name()]"></ma-choices-column>'
		}

		function b() {
			return '<ma-reference-many-link-column ids="::entry.values[field.name()]" values="::entry.listValues[field.name()]" field="::field"></ma-reference-many-link-column>'
		}

		function c() {
			return '<ma-choices-field field="::field" value="values[field.name()]"></ma-choices-field>'
		}

		function d() {
			return '<ma-choices-field field="::field" value="entry.values[field.name()]"></ma-choices-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/StringFieldView", ["require"], function() {
		function a() {
			return '<ma-string-column value="::entry.values[field.name()]"></ma-string-column>'
		}

		function b() {
			return '<a ng-click="gotoDetail()">' + a() + "</a>"
		}

		function c() {
			return '<ma-input-field field="::field" value="values[field.name()]"></ma-input-field>'
		}

		function d() {
			return '<ma-input-field field="::field" value="entry.values[field.name()]"></ma-input-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/TemplateFieldView", ["require"], function() {
		function a() {
			return '<ma-template-column entry="::entry" field="::field" entity="::entity"></ma-template-column>'
		}

		function b() {
			return '<a ng-click="gotoDetail()">' + a() + "</a>"
		}

		function c() {
			return '<ma-template-field field="::field" value="values[field.name()]" values="values" filters="filters"></ma-template-field>'
		}

		function d() {
			return '<ma-template-field entry="entry" field="::field" entity="::entity"></ma-template-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/TextFieldView", ["require"], function() {
		function a() {
			return '<ma-string-column value="::entry.values[field.name()]"></ma-string-column>'
		}

		function b() {
			return '<a ng-click="gotoDetail()">' + a() + "</a>"
		}

		function c() {
			return '<ma-input-field field="::field" value="values[field.name()]"></ma-input-field>'
		}

		function d() {
			return '<ma-text-field field="::field" value="entry.values[field.name()]"></ma-text-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/fieldView/WysiwygFieldView", ["require"], function() {
		function a() {
			return '<ma-wysiwyg-column field="::field" value="::entry.values[field.name()]"></ma-wysiwyg-column>'
		}

		function b() {
			return "error: cannot display wysiwyg field as linkable"
		}

		function c() {
			return '<ma-input-field field="::field" value="values[field.name()]"></ma-input-field>'
		}

		function d() {
			return '<ma-wysiwyg-field field="::field" value="entry.values[field.name()]"></ma-wysiwyg-field>'
		}
		return {
			getReadWidget: a,
			getLinkWidget: b,
			getFilterWidget: c,
			getWriteWidget: d
		}
	}), d("ng-admin/Crud/config/factories", ["require", "ng-admin/Crud/fieldView/BooleanFieldView", "ng-admin/Crud/fieldView/ChoiceFieldView", "ng-admin/Crud/fieldView/ChoicesFieldView", "ng-admin/Crud/fieldView/DateFieldView", "ng-admin/Crud/fieldView/DateFieldView", "ng-admin/Crud/fieldView/EmailFieldView", "ng-admin/Crud/fieldView/FileFieldView", "ng-admin/Crud/fieldView/JsonFieldView", "ng-admin/Crud/fieldView/NumberFieldView", "ng-admin/Crud/fieldView/PasswordFieldView", "ng-admin/Crud/fieldView/ReferencedListFieldView", "ng-admin/Crud/fieldView/ReferenceFieldView", "ng-admin/Crud/fieldView/ReferenceManyFieldView", "ng-admin/Crud/fieldView/StringFieldView", "ng-admin/Crud/fieldView/TemplateFieldView", "ng-admin/Crud/fieldView/TextFieldView", "ng-admin/Crud/fieldView/WysiwygFieldView"], function(a) {
		function b(b) {
			b.registerFieldView("boolean", a("ng-admin/Crud/fieldView/BooleanFieldView")), b.registerFieldView("choice", a("ng-admin/Crud/fieldView/ChoiceFieldView")), b.registerFieldView("choices", a("ng-admin/Crud/fieldView/ChoicesFieldView")), b.registerFieldView("date", a("ng-admin/Crud/fieldView/DateFieldView")), b.registerFieldView("datetime", a("ng-admin/Crud/fieldView/DateFieldView")), b.registerFieldView("email", a("ng-admin/Crud/fieldView/EmailFieldView")), b.registerFieldView("file", a("ng-admin/Crud/fieldView/FileFieldView")), b.registerFieldView("json", a("ng-admin/Crud/fieldView/JsonFieldView")), b.registerFieldView("number", a("ng-admin/Crud/fieldView/NumberFieldView")), b.registerFieldView("password", a("ng-admin/Crud/fieldView/PasswordFieldView")), b.registerFieldView("referenced_list", a("ng-admin/Crud/fieldView/ReferencedListFieldView")), b.registerFieldView("reference", a("ng-admin/Crud/fieldView/ReferenceFieldView")), b.registerFieldView("reference_many", a("ng-admin/Crud/fieldView/ReferenceManyFieldView")), b.registerFieldView("string", a("ng-admin/Crud/fieldView/StringFieldView")), b.registerFieldView("template", a("ng-admin/Crud/fieldView/TemplateFieldView")), b.registerFieldView("text", a("ng-admin/Crud/fieldView/TextFieldView")), b.registerFieldView("wysiwyg", a("ng-admin/Crud/fieldView/WysiwygFieldView"))
		}
		return b.$inject = ["FieldViewConfigurationProvider"], b
	}), d("ng-admin/Crud/config/datePicker", [], function() {
		function a(a) {
			a.decorator("dateParser", ["$delegate",
				function(a) {
					var b = a.parse;
					return a.parse = function(a, c) {
						return angular.isString(a) && c ? b.apply(this, arguments) : a
					}, a
				}
			])
		}
		return a.$inject = ["$provide"], a
	}), ! function(a) {
		function b(b, c) {
			if (c = c || {}, c.worker && Papa.WORKERS_SUPPORTED) {
				var d = k();
				return d.userStep = c.step, d.userChunk = c.chunk, d.userComplete = c.complete, d.userError = c.error, c.step = r(c.step), c.chunk = r(c.chunk), c.complete = r(c.complete), c.error = r(c.error), delete c.worker, void d.postMessage({
					input: b,
					config: c,
					workerId: d.id
				})
			}
			var h = null;
			return "string" == typeof b ? h = c.download ? new e(c) : new g(c) : (a.File && b instanceof File || b instanceof Object) && (h = new f(c)), h.stream(b)
		}

		function c(b, c) {
			function d() {
				"object" == typeof c && ("string" == typeof c.delimiter && 1 == c.delimiter.length && -1 == a.Papa.BAD_DELIMITERS.indexOf(c.delimiter) && (j = c.delimiter), ("boolean" == typeof c.quotes || c.quotes instanceof Array) && (i = c.quotes), "string" == typeof c.newline && (k = c.newline))
			}

			function e(a) {
				if ("object" != typeof a) return [];
				var b = [];
				for (var c in a) b.push(c);
				return b
			}

			function f(a, b) {
				var c = "";
				"string" == typeof a && (a = JSON.parse(a)), "string" == typeof b && (b = JSON.parse(b));
				var d = a instanceof Array && a.length > 0,
					e = !(b[0] instanceof Array);
				if (d) {
					for (var f = 0; f < a.length; f++) f > 0 && (c += j), c += g(a[f], f);
					b.length > 0 && (c += k)
				}
				for (var h = 0; h < b.length; h++) {
					for (var i = d ? a.length : b[h].length, l = 0; i > l; l++) {
						l > 0 && (c += j);
						var m = d && e ? a[l] : l;
						c += g(b[h][m], l)
					}
					h < b.length - 1 && (c += k)
				}
				return c
			}

			function g(b, c) {
				if ("undefined" == typeof b || null === b) return "";
				b = b.toString().replace(/"/g, '""');
				var d = "boolean" == typeof i && i || i instanceof Array && i[c] || h(b, a.Papa.BAD_DELIMITERS) || b.indexOf(j) > -1 || " " == b.charAt(0) || " " == b.charAt(b.length - 1);
				return d ? '"' + b + '"' : b
			}

			function h(a, b) {
				for (var c = 0; c < b.length; c++)
					if (a.indexOf(b[c]) > -1) return !0;
				return !1
			}
			var i = !1,
				j = ",",
				k = "\r\n";
			if (d(), "string" == typeof b && (b = JSON.parse(b)), b instanceof Array) {
				if (!b.length || b[0] instanceof Array) return f(null, b);
				if ("object" == typeof b[0]) return f(e(b[0]), b)
			} else if ("object" == typeof b) return "string" == typeof b.data && (b.data = JSON.parse(b.data)), b.data instanceof Array && (b.fields || (b.fields = b.data[0] instanceof Array ? b.fields : e(b.data[0])), b.data[0] instanceof Array || "object" == typeof b.data[0] || (b.data = [b.data])), f(b.fields || [], b.data || []);
			throw "exception: Unable to serialize unrecognized input"
		}

		function d(b) {
			function c(a) {
				var b = p(a);
				b.chunkSize = parseInt(b.chunkSize), this._handle = new h(b), this._handle.streamer = this, this._config = b
			}
			this._handle = null, this._paused = !1, this._finished = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, c.call(this, b), this.parseChunk = function(b) {
				var c = this._partialLine + b;
				this._partialLine = "";
				var d = this._handle.parse(c, this._baseIndex, !this._finished);
				if (!this._handle.paused()) {
					var e = d.meta.cursor;
					this._finished || (this._partialLine = c.substring(e - this._baseIndex), this._baseIndex = e), d && d.data && (this._rowCount += d.data.length);
					var f = this._finished || this._config.preview && this._rowCount >= this._config.preview;
					if (t) a.postMessage({
						results: d,
						workerId: Papa.WORKER_ID,
						finished: f
					});
					else if (r(this._config.chunk)) {
						if (this._config.chunk(d, this._handle), this._paused) return;
						d = void 0
					}
					return !f || !r(this._config.complete) || d && d.meta.aborted || this._config.complete(d), f || d && d.meta.paused || this._nextChunk(), d
				}
			}, this._sendError = function(b) {
				r(this._config.error) ? this._config.error(b) : t && this._config.error && a.postMessage({
					workerId: Papa.WORKER_ID,
					error: b,
					finished: !1
				})
			}
		}

		function e(a) {
			function b(a) {
				var b = a.getResponseHeader("Content-Range");
				return parseInt(b.substr(b.lastIndexOf("/") + 1))
			}
			a = a || {}, a.chunkSize || (a.chunkSize = Papa.RemoteChunkSize), d.call(this, a);
			var c;
			this._nextChunk = t ? function() {
				this._readChunk(), this._chunkLoaded()
			} : function() {
				this._readChunk()
			}, this.stream = function(a) {
				this._input = a, this._nextChunk()
			}, this._readChunk = function() {
				if (this._finished) return void this._chunkLoaded();
				if (c = new XMLHttpRequest, t || (c.onload = q(this._chunkLoaded, this), c.onerror = q(this._chunkError, this)), c.open("GET", this._input, !t), this._config.step || this._config.chunk) {
					var a = this._start + this._config.chunkSize - 1;
					c.setRequestHeader("Range", "bytes=" + this._start + "-" + a), c.setRequestHeader("If-None-Match", "webkit-no-cache")
				}
				try {
					c.send()
				} catch (b) {
					this._chunkError(b.message)
				}
				t && 0 == c.status ? this._chunkError() : this._start += this._config.chunkSize
			}, this._chunkLoaded = function() {
				if (4 == c.readyState) {
					if (c.status < 200 || c.status >= 400) return void this._chunkError();
					this._finished = !this._config.step && !this._config.chunk || this._start > b(c), this.parseChunk(c.responseText)
				}
			}, this._chunkError = function(a) {
				var b = c.statusText || a;
				this._sendError(b)
			}
		}

		function f(a) {
			a = a || {}, a.chunkSize || (a.chunkSize = Papa.LocalChunkSize), d.call(this, a);
			var b, c, e = "undefined" != typeof FileReader;
			this.stream = function(a) {
				this._input = a, c = a.slice || a.webkitSlice || a.mozSlice, e ? (b = new FileReader, b.onload = q(this._chunkLoaded, this), b.onerror = q(this._chunkError, this)) : b = new FileReaderSync, this._nextChunk()
			}, this._nextChunk = function() {
				this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk()
			}, this._readChunk = function() {
				var a = Math.min(this._start + this._config.chunkSize, this._input.size),
					d = b.readAsText(c.call(this._input, this._start, a), this._config.encoding);
				e || this._chunkLoaded({
					target: {
						result: d
					}
				})
			}, this._chunkLoaded = function(a) {
				this._start += this._config.chunkSize, this._finished = this._start >= this._input.size, this.parseChunk(a.target.result)
			}, this._chunkError = function() {
				this._sendError(b.error)
			}
		}

		function g(a) {
			a = a || {}, d.call(this, a);
			var b, c;
			this.stream = function(a) {
				return b = a, c = a, this._nextChunk()
			}, this._nextChunk = function() {
				if (!this._finished) {
					var a = this._config.chunkSize,
						b = a ? c.substr(0, a) : c;
					return c = a ? c.substr(a) : "", this._finished = !c, this.parseChunk(b)
				}
			}
		}

		function h(a) {
			function b() {
				if (u && m && (j("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + Papa.DefaultDelimiter + "'"), m = !1), a.skipEmptyLines)
					for (var b = 0; b < u.data.length; b++) 1 == u.data[b].length && "" == u.data[b][0] && u.data.splice(b--, 1);
				return c() && d(), e()
			}

			function c() {
				return a.header && 0 == t.length
			}

			function d() {
				if (u) {
					for (var a = 0; c() && a < u.data.length; a++)
						for (var b = 0; b < u.data[a].length; b++) t.push(u.data[a][b]);
					u.data.splice(0, 1)
				}
			}

			function e() {
				if (!u || !a.header && !a.dynamicTyping) return u;
				for (var b = 0; b < u.data.length; b++) {
					for (var c = {}, d = 0; d < u.data[b].length; d++) {
						if (a.dynamicTyping) {
							var e = u.data[b][d];
							u.data[b][d] = "true" == e ? !0 : "false" == e ? !1 : h(e)
						}
						a.header && (d >= t.length ? (c.__parsed_extra || (c.__parsed_extra = []), c.__parsed_extra.push(u.data[b][d])) : c[t[d]] = u.data[b][d])
					}
					a.header && (u.data[b] = c, d > t.length ? j("FieldMismatch", "TooManyFields", "Too many fields: expected " + t.length + " fields but parsed " + d, b) : d < t.length && j("FieldMismatch", "TooFewFields", "Too few fields: expected " + t.length + " fields but parsed " + d, b))
				}
				return a.header && u.meta && (u.meta.fields = t), u
			}

			function f(b) {
				for (var c, d, e, f = [",", "	", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP], g = 0; g < f.length; g++) {
					var h = f[g],
						j = 0,
						k = 0;
					e = void 0;
					for (var l = new i({
						delimiter: h,
						preview: 10
					}).parse(b), m = 0; m < l.data.length; m++) {
						var n = l.data[m].length;
						k += n, "undefined" != typeof e ? n > 1 && (j += Math.abs(n - e), e = n) : e = n
					}
					k /= l.data.length, ("undefined" == typeof d || d > j) && k > 1.99 && (d = j, c = h)
				}
				return a.delimiter = c, {
					successful: !! c,
					bestDelimiter: c
				}
			}

			function g(a) {
				a = a.substr(0, 1048576);
				var b = a.split("\r");
				if (1 == b.length) return "\n";
				for (var c = 0, d = 0; d < b.length; d++) "\n" == b[d][0] && c++;
				return c >= b.length / 2 ? "\r\n" : "\r"
			}

			function h(a) {
				var b = n.test(a);
				return b ? parseFloat(a) : a
			}

			function j(a, b, c, d) {
				u.errors.push({
					type: a,
					code: b,
					message: c,
					row: d
				})
			}
			var k, l, m, n = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,
				o = this,
				q = 0,
				s = !1,
				t = [],
				u = {
					data: [],
					errors: [],
					meta: {}
				};
			if (r(a.step)) {
				var v = a.step;
				a.step = function(d) {
					if (u = d, c()) b();
					else {
						if (b(), 0 == u.data.length) return;
						q += d.data.length, a.preview && q > a.preview ? l.abort() : v(u, o)
					}
				}
			}
			this.parse = function(c, d, e) {
				if (a.newline || (a.newline = g(c)), m = !1, !a.delimiter) {
					var h = f(c);
					h.successful ? a.delimiter = h.bestDelimiter : (m = !0, a.delimiter = Papa.DefaultDelimiter), u.meta.delimiter = a.delimiter
				}
				var j = p(a);
				return a.preview && a.header && j.preview++, k = c, l = new i(j), u = l.parse(k, d, e), b(), s ? {
					meta: {
						paused: !0
					}
				} : u || {
					meta: {
						paused: !1
					}
				}
			}, this.paused = function() {
				return s
			}, this.pause = function() {
				s = !0, l.abort(), k = k.substr(l.getCharIndex())
			}, this.resume = function() {
				s = !1, o.streamer.parseChunk(k)
			}, this.abort = function() {
				l.abort(), r(a.complete) && a.complete(u), k = ""
			}
		}

		function i(a) {
			a = a || {};
			var b = a.delimiter,
				c = a.newline,
				d = a.comments,
				e = a.step,
				f = a.preview,
				g = a.fastMode;
			if (("string" != typeof b || 1 != b.length || Papa.BAD_DELIMITERS.indexOf(b) > -1) && (b = ","), d === b) throw "Comment character same as delimiter";
			d === !0 ? d = "#" : ("string" != typeof d || Papa.BAD_DELIMITERS.indexOf(d) > -1) && (d = !1), "\n" != c && "\r" != c && "\r\n" != c && (c = "\n");
			var h = 0,
				i = !1;
			this.parse = function(a, j, k) {
				function l(a) {
					v.push(a), y = h
				}

				function m(b) {
					return k ? o() : (b || (b = a.substr(h)), x.push(b), h = q, l(x), u && p(), o())
				}

				function n(b) {
					h = b, l(x), x = [], C = a.indexOf(c, h)
				}

				function o(a) {
					return {
						data: v,
						errors: w,
						meta: {
							delimiter: b,
							linebreak: c,
							aborted: i,
							truncated: !! a,
							cursor: y + (j || 0)
						}
					}
				}

				function p() {
					e(o()), v = [], w = []
				}
				if ("string" != typeof a) throw "Input must be a string";
				var q = a.length,
					r = b.length,
					s = c.length,
					t = d.length,
					u = "function" == typeof e;
				h = 0;
				var v = [],
					w = [],
					x = [],
					y = 0;
				if (!a) return o();
				if (g || g !== !1 && -1 === a.indexOf('"')) {
					for (var z = a.split(c), A = 0; A < z.length; A++) {
						var x = z[A];
						if (h += x.length, A !== z.length - 1) h += c.length;
						else if (k) return o();
						if (!d || x.substr(0, t) != d) {
							if (u) {
								if (v = [], l(x.split(b)), p(), i) return o()
							} else l(x.split(b)); if (f && A >= f) return v = v.slice(0, f), o(!0)
						}
					}
					return o()
				}
				for (var B = a.indexOf(b, h), C = a.indexOf(c, h);;)
					if ('"' != a[h])
						if (d && 0 === x.length && a.substr(h, t) === d) {
							if (-1 == C) return o();
							h = C + s, C = a.indexOf(c, h), B = a.indexOf(b, h)
						} else
				if (-1 !== B && (C > B || -1 === C)) x.push(a.substring(h, B)), h = B + r, B = a.indexOf(b, h);
				else {
					if (-1 === C) break;
					if (x.push(a.substring(h, C)), n(C + s), u && (p(), i)) return o();
					if (f && v.length >= f) return o(!0)
				} else {
					var D = h;
					for (h++;;) {
						var D = a.indexOf('"', D + 1);
						if (-1 === D) return k || w.push({
							type: "Quotes",
							code: "MissingQuotes",
							message: "Quoted field unterminated",
							row: v.length,
							index: h
						}), m();
						if (D === q - 1) {
							var E = a.substring(h, D).replace(/""/g, '"');
							return m(E)
						}
						if ('"' != a[D + 1]) {
							if (a[D + 1] == b) {
								x.push(a.substring(h, D).replace(/""/g, '"')), h = D + 1 + r, B = a.indexOf(b, h), C = a.indexOf(c, h);
								break
							}
							if (a.substr(D + 1, s) === c) {
								if (x.push(a.substring(h, D).replace(/""/g, '"')), n(D + 1 + s), B = a.indexOf(b, h), u && (p(), i)) return o();
								if (f && v.length >= f) return o(!0);
								break
							}
						} else D++
					}
				}
				return m()
			}, this.abort = function() {
				i = !0
			}, this.getCharIndex = function() {
				return h
			}
		}

		function j() {
			var a = document.getElementsByTagName("script");
			return a.length ? a[a.length - 1].src : ""
		}

		function k() {
			if (!Papa.WORKERS_SUPPORTED) return !1;
			if (!u && null === Papa.SCRIPT_PATH) throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");
			var b = new a.Worker(Papa.SCRIPT_PATH || s);
			return b.onmessage = l, b.id = w++, v[b.id] = b, b
		}

		function l(a) {
			var b = a.data,
				c = v[b.workerId],
				d = !1;
			if (b.error) c.userError(b.error, b.file);
			else if (b.results && b.results.data) {
				var e = function() {
					d = !0, m(b.workerId, {
						data: [],
						errors: [],
						meta: {
							aborted: !0
						}
					})
				}, f = {
						abort: e,
						pause: n,
						resume: n
					};
				if (r(c.userStep)) {
					for (var g = 0; g < b.results.data.length && (c.userStep({
						data: [b.results.data[g]],
						errors: b.results.errors,
						meta: b.results.meta
					}, f), !d); g++);
					delete b.results
				} else r(c.userChunk) && (c.userChunk(b.results, f, b.file), delete b.results)
			}
			b.finished && !d && m(b.workerId, b.results)
		}

		function m(a, b) {
			var c = v[a];
			r(c.userComplete) && c.userComplete(b), c.terminate(), delete v[a]
		}

		function n() {
			throw "Not implemented."
		}

		function o(b) {
			var c = b.data;
			if ("undefined" == typeof Papa.WORKER_ID && c && (Papa.WORKER_ID = c.workerId), "string" == typeof c.input) a.postMessage({
				workerId: Papa.WORKER_ID,
				results: Papa.parse(c.input, c.config),
				finished: !0
			});
			else if (a.File && c.input instanceof File || c.input instanceof Object) {
				var d = Papa.parse(c.input, c.config);
				d && a.postMessage({
					workerId: Papa.WORKER_ID,
					results: d,
					finished: !0
				})
			}
		}

		function p(a) {
			if ("object" != typeof a) return a;
			var b = a instanceof Array ? [] : {};
			for (var c in a) b[c] = p(a[c]);
			return b
		}

		function q(a, b) {
			return function() {
				a.apply(b, arguments)
			}
		}

		function r(a) {
			return "function" == typeof a
		}
		var s, t = !a.document,
			u = !1,
			v = {}, w = 0;
		if (a.Papa = {}, a.Papa.parse = b, a.Papa.unparse = c, a.Papa.RECORD_SEP = String.fromCharCode(30), a.Papa.UNIT_SEP = String.fromCharCode(31), a.Papa.BYTE_ORDER_MARK = "", a.Papa.BAD_DELIMITERS = ["\r", "\n", '"', a.Papa.BYTE_ORDER_MARK], a.Papa.WORKERS_SUPPORTED = !! a.Worker, a.Papa.SCRIPT_PATH = null, a.Papa.LocalChunkSize = 10485760, a.Papa.RemoteChunkSize = 5242880, a.Papa.DefaultDelimiter = ",", a.Papa.Parser = i, a.Papa.ParserHandle = h, a.Papa.NetworkStreamer = e, a.Papa.FileStreamer = f, a.Papa.StringStreamer = g, a.jQuery) {
			var x = a.jQuery;
			x.fn.parse = function(b) {
				function c() {
					if (0 == g.length) return void(r(b.complete) && b.complete());
					var a = g[0];
					if (r(b.before)) {
						var c = b.before(a.file, a.inputElem);
						if ("object" == typeof c) {
							if ("abort" == c.action) return void d("AbortError", a.file, a.inputElem, c.reason);
							if ("skip" == c.action) return void e();
							"object" == typeof c.config && (a.instanceConfig = x.extend(a.instanceConfig, c.config))
						} else if ("skip" == c) return void e()
					}
					var f = a.instanceConfig.complete;
					a.instanceConfig.complete = function(b) {
						r(f) && f(b, a.file, a.inputElem), e()
					}, Papa.parse(a.file, a.instanceConfig)
				}

				function d(a, c, d, e) {
					r(b.error) && b.error({
						name: a
					}, c, d, e)
				}

				function e() {
					g.splice(0, 1), c()
				}
				var f = b.config || {}, g = [];
				return this.each(function() {
					var b = "INPUT" == x(this).prop("tagName").toUpperCase() && "file" == x(this).attr("type").toLowerCase() && a.FileReader;
					if (!b || !this.files || 0 == this.files.length) return !0;
					for (var c = 0; c < this.files.length; c++) g.push({
						file: this.files[c],
						inputElem: this,
						instanceConfig: x.extend({}, f)
					})
				}), c(), this
			}
		}
		t ? a.onmessage = o : Papa.WORKERS_SUPPORTED && (s = j(), document.body ? document.addEventListener("DOMContentLoaded", function() {
			u = !0
		}, !0) : u = !0), e.prototype = Object.create(d.prototype), e.prototype.constructor = e, f.prototype = Object.create(d.prototype), f.prototype.constructor = f, g.prototype = Object.create(g.prototype), g.prototype.constructor = g
	}(this), d("papaparse", function(a) {
		return function() {
			var b;
			return b || a.Papa
		}
	}(this)), ! function(a, b, c) {
		"undefined" != typeof module ? module.exports = c(a, b) : "function" == typeof d && "object" == typeof d.amd ? d("humane", c) : b[a] = c(a, b)
	}("humane", this, function() {
		var a = window,
			b = document,
			c = {
				on: function(b, c, d) {
					"addEventListener" in a ? b.addEventListener(c, d, !1) : b.attachEvent("on" + c, d)
				},
				off: function(b, c, d) {
					"removeEventListener" in a ? b.removeEventListener(c, d, !1) : b.detachEvent("on" + c, d)
				},
				bind: function(a, b) {
					return function() {
						a.apply(b, arguments)
					}
				},
				isArray: Array.isArray || function(a) {
					return "[object Array]" === Object.prototype.toString.call(a)
				},
				config: function(a, b) {
					return null != a ? a : b
				},
				transSupport: !1,
				useFilter: /msie [678]/i.test(navigator.userAgent),
				_checkTransition: function() {
					var a = b.createElement("div"),
						c = {
							webkit: "webkit",
							Moz: "",
							O: "o",
							ms: "MS"
						};
					for (var d in c) d + "Transition" in a.style && (this.vendorPrefix = c[d], this.transSupport = !0)
				}
			};
		c._checkTransition();
		var d = function(b) {
			b || (b = {}), this.queue = [], this.baseCls = b.baseCls || "humane", this.addnCls = b.addnCls || "", this.timeout = "timeout" in b ? b.timeout : 2500, this.waitForMove = b.waitForMove || !1, this.clickToClose = b.clickToClose || !1, this.timeoutAfterMove = b.timeoutAfterMove || !1, this.container = b.container;
			try {
				this._setupEl()
			} catch (d) {
				c.on(a, "load", c.bind(this._setupEl, this))
			}
		};
		return d.prototype = {
			constructor: d,
			_setupEl: function() {
				var a = b.createElement("div");
				if (a.style.display = "none", !this.container) {
					if (!b.body) throw "document.body is null";
					this.container = b.body
				}
				this.container.appendChild(a), this.el = a, this.removeEvent = c.bind(function() {
					this.timeoutAfterMove ? setTimeout(c.bind(this.remove, this), this.timeout) : this.remove()
				}, this), this.transEvent = c.bind(this._afterAnimation, this), this._run()
			},
			_afterTimeout: function() {
				c.config(this.currentMsg.waitForMove, this.waitForMove) ? this.removeEventsSet || (c.on(b.body, "mousemove", this.removeEvent), c.on(b.body, "click", this.removeEvent), c.on(b.body, "keypress", this.removeEvent), c.on(b.body, "touchstart", this.removeEvent), this.removeEventsSet = !0) : this.remove()
			},
			_run: function() {
				if (!this._animating && this.queue.length && this.el) {
					this._animating = !0, this.currentTimer && (clearTimeout(this.currentTimer), this.currentTimer = null);
					var a = this.queue.shift(),
						b = c.config(a.clickToClose, this.clickToClose);
					b && (c.on(this.el, "click", this.removeEvent), c.on(this.el, "touchstart", this.removeEvent));
					var d = c.config(a.timeout, this.timeout);
					d > 0 && (this.currentTimer = setTimeout(c.bind(this._afterTimeout, this), d)), c.isArray(a.html) && (a.html = "<ul><li>" + a.html.join("<li>") + "</ul>"), this.el.innerHTML = a.html, this.currentMsg = a, this.el.className = this.baseCls, c.transSupport ? (this.el.style.display = "block", setTimeout(c.bind(this._showMsg, this), 50)) : this._showMsg()
				}
			},
			_setOpacity: function(a) {
				if (c.useFilter) try {
					this.el.filters.item("DXImageTransform.Microsoft.Alpha").Opacity = 100 * a
				} catch (b) {} else this.el.style.opacity = String(a)
			},
			_showMsg: function() {
				var a = c.config(this.currentMsg.addnCls, this.addnCls);
				if (c.transSupport) this.el.className = this.baseCls + " " + a + " " + this.baseCls + "-animate";
				else {
					var b = 0;
					this.el.className = this.baseCls + " " + a + " " + this.baseCls + "-js-animate", this._setOpacity(0), this.el.style.display = "block";
					var d = this,
						e = setInterval(function() {
							1 > b ? (b += .1, b > 1 && (b = 1), d._setOpacity(b)) : clearInterval(e)
						}, 30)
				}
			},
			_hideMsg: function() {
				var a = c.config(this.currentMsg.addnCls, this.addnCls);
				if (c.transSupport) this.el.className = this.baseCls + " " + a, c.on(this.el, c.vendorPrefix ? c.vendorPrefix + "TransitionEnd" : "transitionend", this.transEvent);
				else var b = 1,
				d = this, e = setInterval(function() {
					b > 0 ? (b -= .1, 0 > b && (b = 0), d._setOpacity(b)) : (d.el.className = d.baseCls + " " + a, clearInterval(e), d._afterAnimation())
				}, 30)
			},
			_afterAnimation: function() {
				c.transSupport && c.off(this.el, c.vendorPrefix ? c.vendorPrefix + "TransitionEnd" : "transitionend", this.transEvent), this.currentMsg.cb && this.currentMsg.cb(), this.el.style.display = "none", this._animating = !1, this._run()
			},
			remove: function(a) {
				var d = "function" == typeof a ? a : null;
				c.off(b.body, "mousemove", this.removeEvent), c.off(b.body, "click", this.removeEvent), c.off(b.body, "keypress", this.removeEvent), c.off(b.body, "touchstart", this.removeEvent), c.off(this.el, "click", this.removeEvent), c.off(this.el, "touchstart", this.removeEvent), this.removeEventsSet = !1, d && this.currentMsg && (this.currentMsg.cb = d), this._animating ? this._hideMsg() : d && d()
			},
			log: function(a, b, c, d) {
				var e = {};
				if (d)
					for (var f in d) e[f] = d[f];
				if ("function" == typeof b) c = b;
				else if (b)
					for (var f in b) e[f] = b[f];
				return e.html = a, c && (e.cb = c), this.queue.push(e), this._run(), this
			},
			spawn: function(a) {
				var b = this;
				return function(c, d, e) {
					return b.log.call(b, c, d, e, a), b
				}
			},
			create: function(a) {
				return new d(a)
			}
		}, new d
	}),
	function(a, b) {
		"function" == typeof d && d.amd ? d("nprogress", b) : "object" == typeof exports ? module.exports = b() : a.NProgress = b()
	}(this, function() {
		function a(a, b, c) {
			return b > a ? b : a > c ? c : a
		}

		function b(a) {
			return 100 * (-1 + a)
		}

		function c(a, c, d) {
			var e;
			return e = "translate3d" === j.positionUsing ? {
				transform: "translate3d(" + b(a) + "%,0,0)"
			} : "translate" === j.positionUsing ? {
				transform: "translate(" + b(a) + "%,0)"
			} : {
				"margin-left": b(a) + "%"
			}, e.transition = "all " + c + "ms " + d, e
		}

		function d(a, b) {
			var c = "string" == typeof a ? a : g(a);
			return c.indexOf(" " + b + " ") >= 0
		}

		function e(a, b) {
			var c = g(a),
				e = c + b;
			d(c, b) || (a.className = e.substring(1))
		}

		function f(a, b) {
			var c, e = g(a);
			d(a, b) && (c = e.replace(" " + b + " ", " "), a.className = c.substring(1, c.length - 1))
		}

		function g(a) {
			return (" " + (a.className || "") + " ").replace(/\s+/gi, " ")
		}

		function h(a) {
			a && a.parentNode && a.parentNode.removeChild(a)
		}
		var i = {};
		i.version = "0.1.6";
		var j = i.settings = {
			minimum: .08,
			easing: "ease",
			positionUsing: "",
			speed: 200,
			trickle: !0,
			trickleRate: .02,
			trickleSpeed: 800,
			showSpinner: !0,
			barSelector: '[role="bar"]',
			spinnerSelector: '[role="spinner"]',
			parent: "body",
			template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
		};
		i.configure = function(a) {
			var b, c;
			for (b in a) c = a[b], void 0 !== c && a.hasOwnProperty(b) && (j[b] = c);
			return this
		}, i.status = null, i.set = function(b) {
			var d = i.isStarted();
			b = a(b, j.minimum, 1), i.status = 1 === b ? null : b;
			var e = i.render(!d),
				f = e.querySelector(j.barSelector),
				g = j.speed,
				h = j.easing;
			return e.offsetWidth, k(function(a) {
				"" === j.positionUsing && (j.positionUsing = i.getPositioningCSS()), l(f, c(b, g, h)), 1 === b ? (l(e, {
					transition: "none",
					opacity: 1
				}), e.offsetWidth, setTimeout(function() {
					l(e, {
						transition: "all " + g + "ms linear",
						opacity: 0
					}), setTimeout(function() {
						i.remove(), a()
					}, g)
				}, g)) : setTimeout(a, g)
			}), this
		}, i.isStarted = function() {
			return "number" == typeof i.status
		}, i.start = function() {
			i.status || i.set(0);
			var a = function() {
				setTimeout(function() {
					i.status && (i.trickle(), a())
				}, j.trickleSpeed)
			};
			return j.trickle && a(), this
		}, i.done = function(a) {
			return a || i.status ? i.inc(.3 + .5 * Math.random()).set(1) : this
		}, i.inc = function(b) {
			var c = i.status;
			return c ? ("number" != typeof b && (b = (1 - c) * a(Math.random() * c, .1, .95)), c = a(c + b, 0, .994), i.set(c)) : i.start()
		}, i.trickle = function() {
			return i.inc(Math.random() * j.trickleRate)
		},
		function() {
			var a = 0,
				b = 0;
			i.promise = function(c) {
				return c && "resolved" != c.state() ? (0 == b && i.start(), a++, b++, c.always(function() {
					b--, 0 == b ? (a = 0, i.done()) : i.set((a - b) / a)
				}), this) : this
			}
		}(), i.render = function(a) {
			if (i.isRendered()) return document.getElementById("nprogress");
			e(document.documentElement, "nprogress-busy");
			var c = document.createElement("div");
			c.id = "nprogress", c.innerHTML = j.template;
			var d, f = c.querySelector(j.barSelector),
				g = a ? "-100" : b(i.status || 0),
				k = document.querySelector(j.parent);
			return l(f, {
				transition: "all 0 linear",
				transform: "translate3d(" + g + "%,0,0)"
			}), j.showSpinner || (d = c.querySelector(j.spinnerSelector), d && h(d)), k != document.body && e(k, "nprogress-custom-parent"), k.appendChild(c), c
		}, i.remove = function() {
			f(document.documentElement, "nprogress-busy"), f(document.querySelector(j.parent), "nprogress-custom-parent");
			var a = document.getElementById("nprogress");
			a && h(a)
		}, i.isRendered = function() {
			return !!document.getElementById("nprogress")
		}, i.getPositioningCSS = function() {
			var a = document.body.style,
				b = "WebkitTransform" in a ? "Webkit" : "MozTransform" in a ? "Moz" : "msTransform" in a ? "ms" : "OTransform" in a ? "O" : "";
			return b + "Perspective" in a ? "translate3d" : b + "Transform" in a ? "translate" : "margin"
		};
		var k = function() {
			function a() {
				var c = b.shift();
				c && c(a)
			}
			var b = [];
			return function(c) {
				b.push(c), 1 == b.length && a()
			}
		}(),
			l = function() {
				function a(a) {
					return a.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(a, b) {
						return b.toUpperCase()
					})
				}

				function b(a) {
					var b = document.body.style;
					if (a in b) return a;
					for (var c, d = e.length, f = a.charAt(0).toUpperCase() + a.slice(1); d--;)
						if (c = e[d] + f, c in b) return c;
					return a
				}

				function c(c) {
					return c = a(c), f[c] || (f[c] = b(c))
				}

				function d(a, b, d) {
					b = c(b), a.style[b] = d
				}
				var e = ["Webkit", "O", "Moz", "ms"],
					f = {};
				return function(a, b) {
					var c, e, f = arguments;
					if (2 == f.length)
						for (c in b) e = b[c], void 0 !== e && b.hasOwnProperty(c) && d(a, c, e);
					else d(a, f[1], f[2])
				}
			}();
		return i
	});
	var f;
	return d("CrudModule", ["require", "angular", "inflection", "numeral", "angular-ui-router", "angular-sanitize", "angular-bootstrap-tpls", "ng-file-upload", "textangular", "ngInflection", "angular-ui-codemirror", "angular-numeraljs", "ng-admin/Crud/list/ListController", "ng-admin/Crud/show/ShowController", "ng-admin/Crud/form/FormController", "ng-admin/Crud/delete/DeleteController", "ng-admin/Crud/delete/BatchDeleteController", "ng-admin/Crud/misc/EntryFormatter", "ng-admin/Crud/misc/PromisesResolver", "ng-admin/Crud/repository/RetrieveQueries", "ng-admin/Crud/repository/CreateQueries", "ng-admin/Crud/repository/UpdateQueries", "ng-admin/Crud/repository/DeleteQueries", "ng-admin/Crud/validator/maJsonValidator", "ng-admin/Crud/field/maField", "ng-admin/Crud/field/maButtonField", "ng-admin/Crud/field/maChoiceField", "ng-admin/Crud/field/maChoicesField", "ng-admin/Crud/field/maDateField", "ng-admin/Crud/field/maInputField", "ng-admin/Crud/field/maJsonField", "ng-admin/Crud/field/maFileField", "ng-admin/Crud/field/maCheckboxField", "ng-admin/Crud/field/maTextField", "ng-admin/Crud/field/maWysiwygField", "ng-admin/Crud/field/maTemplateField", "ng-admin/Crud/fieldView/FieldViewConfiguration", "ng-admin/Crud/list/ListActions", "ng-admin/Crud/list/maDatagrid", "ng-admin/Crud/list/maDatagridPagination", "ng-admin/Crud/list/maDatagridInfinitePagination", "ng-admin/Crud/list/maDatagridItemSelector", "ng-admin/Crud/list/maDatagridMultiSelector", "ng-admin/Crud/filter/maFilter", "ng-admin/Crud/column/maColumn", "ng-admin/Crud/column/maBooleanColumn", "ng-admin/Crud/column/maChoicesColumn", "ng-admin/Crud/column/maDateColumn", "ng-admin/Crud/column/maJsonColumn", "ng-admin/Crud/column/maNumberColumn", "ng-admin/Crud/column/maReferenceManyColumn", "ng-admin/Crud/column/maReferenceManyLinkColumn", "ng-admin/Crud/column/maStringColumn", "ng-admin/Crud/column/maTemplateColumn", "ng-admin/Crud/column/maWysiwygColumn", "ng-admin/Crud/button/maBackButton", "ng-admin/Crud/button/maCreateButton", "ng-admin/Crud/button/maEditButton", "ng-admin/Crud/button/maFilteredListButton", "ng-admin/Crud/button/maShowButton", "ng-admin/Crud/button/maListButton", "ng-admin/Crud/button/maDeleteButton", "ng-admin/Crud/button/maBatchDeleteButton", "ng-admin/Crud/button/maExportToCsvButton", "ng-admin/Crud/misc/ViewActions", "ng-admin/Crud/misc/ViewBatchActions", "ng-admin/Crud/misc/Compile", "ng-admin/Crud/routing", "ng-admin/Crud/config/factories", "ng-admin/Crud/config/datePicker", "papaparse", "humane", "nprogress"], function(a) {
		var b = a("angular");
		f = a("inflection");
		a("numeral");
		a("angular-ui-router"), a("angular-sanitize"), a("angular-bootstrap-tpls"), a("ng-file-upload"), a("textangular"), a("ngInflection"), a("angular-ui-codemirror"), a("angular-numeraljs");
		var c = b.module("crud", ["ui.router", "ui.bootstrap", "ngSanitize", "textAngular", "ngInflection", "ui.codemirror", "angularFileUpload", "ngNumeraljs"]);
		return c.controller("ListController", a("ng-admin/Crud/list/ListController")), c.controller("ShowController", a("ng-admin/Crud/show/ShowController")), c.controller("FormController", a("ng-admin/Crud/form/FormController")), c.controller("DeleteController", a("ng-admin/Crud/delete/DeleteController")), c.controller("BatchDeleteController", a("ng-admin/Crud/delete/BatchDeleteController")), c.service("EntryFormatter", a("ng-admin/Crud/misc/EntryFormatter")), c.service("PromisesResolver", a("ng-admin/Crud/misc/PromisesResolver")), c.service("RetrieveQueries", a("ng-admin/Crud/repository/RetrieveQueries")), c.service("CreateQueries", a("ng-admin/Crud/repository/CreateQueries")), c.service("UpdateQueries", a("ng-admin/Crud/repository/UpdateQueries")), c.service("DeleteQueries", a("ng-admin/Crud/repository/DeleteQueries")), c.directive("maJsonValidator", a("ng-admin/Crud/validator/maJsonValidator")), c.directive("maField", a("ng-admin/Crud/field/maField")), c.directive("maButtonField", a("ng-admin/Crud/field/maButtonField")), c.directive("maChoiceField", a("ng-admin/Crud/field/maChoiceField")), c.directive("maChoicesField", a("ng-admin/Crud/field/maChoicesField")), c.directive("maDateField", a("ng-admin/Crud/field/maDateField")), c.directive("maInputField", a("ng-admin/Crud/field/maInputField")), c.directive("maJsonField", a("ng-admin/Crud/field/maJsonField")), c.directive("maFileField", a("ng-admin/Crud/field/maFileField")), c.directive("maCheckboxField", a("ng-admin/Crud/field/maCheckboxField")), c.directive("maTextField", a("ng-admin/Crud/field/maTextField")), c.directive("maWysiwygField", a("ng-admin/Crud/field/maWysiwygField")), c.directive("maTemplateField", a("ng-admin/Crud/field/maTemplateField")), c.provider("FieldViewConfiguration", a("ng-admin/Crud/fieldView/FieldViewConfiguration")), c.directive("listActions", a("ng-admin/Crud/list/ListActions")), c.directive("maDatagrid", a("ng-admin/Crud/list/maDatagrid")), c.directive("maDatagridPagination", a("ng-admin/Crud/list/maDatagridPagination")), c.directive("maDatagridInfinitePagination", a("ng-admin/Crud/list/maDatagridInfinitePagination")), c.directive("maDatagridItemSelector", a("ng-admin/Crud/list/maDatagridItemSelector")), c.directive("maDatagridMultiSelector", a("ng-admin/Crud/list/maDatagridMultiSelector")), c.directive("maFilter", a("ng-admin/Crud/filter/maFilter")), c.directive("maColumn", a("ng-admin/Crud/column/maColumn")), c.directive("maBooleanColumn", a("ng-admin/Crud/column/maBooleanColumn")), c.directive("maChoicesColumn", a("ng-admin/Crud/column/maChoicesColumn")), c.directive("maDateColumn", a("ng-admin/Crud/column/maDateColumn")), c.directive("maJsonColumn", a("ng-admin/Crud/column/maJsonColumn")), c.directive("maNumberColumn", a("ng-admin/Crud/column/maNumberColumn")), c.directive("maReferenceManyColumn", a("ng-admin/Crud/column/maReferenceManyColumn")), c.directive("maReferenceManyLinkColumn", a("ng-admin/Crud/column/maReferenceManyLinkColumn")), c.directive("maStringColumn", a("ng-admin/Crud/column/maStringColumn")), c.directive("maTemplateColumn", a("ng-admin/Crud/column/maTemplateColumn")), c.directive("maWysiwygColumn", a("ng-admin/Crud/column/maWysiwygColumn")), c.directive("maBackButton", a("ng-admin/Crud/button/maBackButton")), c.directive("maCreateButton", a("ng-admin/Crud/button/maCreateButton")), c.directive("maEditButton", a("ng-admin/Crud/button/maEditButton")), c.directive("maFilteredListButton", a("ng-admin/Crud/button/maFilteredListButton")), c.directive("maShowButton", a("ng-admin/Crud/button/maShowButton")), c.directive("maListButton", a("ng-admin/Crud/button/maListButton")), c.directive("maDeleteButton", a("ng-admin/Crud/button/maDeleteButton")), c.directive("maBatchDeleteButton", a("ng-admin/Crud/button/maBatchDeleteButton")), c.directive("maExportToCsvButton", a("ng-admin/Crud/button/maExportToCsvButton")), c.directive("maViewActions", a("ng-admin/Crud/misc/ViewActions")), c.directive("maViewBatchActions", a("ng-admin/Crud/misc/ViewBatchActions")), c.directive("compile", a("ng-admin/Crud/misc/Compile")), c.config(a("ng-admin/Crud/routing")), c.config(a("ng-admin/Crud/config/factories")), c.config(a("ng-admin/Crud/config/datePicker")), c.factory("Papa", function() {
			return a("papaparse")
		}), c.factory("notification", function() {
			var b = a("humane");
			return b.timeout = 5e3, b.clickToClose = !0, b
		}), c.factory("progression", function() {
			return a("nprogress")
		}), c
	}),
	function(a, b) {
		"function" == typeof d && d.amd ? d("AdminDescription", b) : "object" == typeof exports ? module.exports = b() : a.ngaConfigurationFactory = b()
	}(this, function() {
		var a, b, c;
		return function(d) {
			function e(a, b) {
				return u.call(a, b)
			}

			function f(a, b) {
				var c, d, e, f, g, h, i, j, k, l, m, n = b && b.split("/"),
					o = s.map,
					p = o && o["*"] || {};
				if (a && "." === a.charAt(0))
					if (b) {
						for (n = n.slice(0, n.length - 1), a = a.split("/"), g = a.length - 1, s.nodeIdCompat && w.test(a[g]) && (a[g] = a[g].replace(w, "")), a = n.concat(a), k = 0; k < a.length; k += 1)
							if (m = a[k], "." === m) a.splice(k, 1), k -= 1;
							else
						if (".." === m) {
							if (1 === k && (".." === a[2] || ".." === a[0])) break;
							k > 0 && (a.splice(k - 1, 2), k -= 2)
						}
						a = a.join("/")
					} else 0 === a.indexOf("./") && (a = a.substring(2));
				if ((n || p) && o) {
					for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
						if (d = c.slice(0, k).join("/"), n)
							for (l = n.length; l > 0; l -= 1)
								if (e = o[n.slice(0, l).join("/")], e && (e = e[d])) {
									f = e, h = k;
									break
								}
						if (f) break;
						!i && p && p[d] && (i = p[d], j = k)
					}!f && i && (f = i, h = j), f && (c.splice(0, h, f), a = c.join("/"))
				}
				return a
			}

			function g(a, b) {
				return function() {
					var c = v.call(arguments, 0);
					return "string" != typeof c[0] && 1 === c.length && c.push(null), n.apply(d, c.concat([a, b]))
				}
			}

			function h(a) {
				return function(b) {
					return f(b, a)
				}
			}

			function i(a) {
				return function(b) {
					q[a] = b
				}
			}

			function j(a) {
				if (e(r, a)) {
					var b = r[a];
					delete r[a], t[a] = !0, m.apply(d, b)
				}
				if (!e(q, a) && !e(t, a)) throw new Error("No " + a);
				return q[a]
			}

			function k(a) {
				var b, c = a ? a.indexOf("!") : -1;
				return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a]
			}

			function l(a) {
				return function() {
					return s && s.config && s.config[a] || {}
				}
			}
			var m, n, o, p, q = {}, r = {}, s = {}, t = {}, u = Object.prototype.hasOwnProperty,
				v = [].slice,
				w = /\.js$/;
			o = function(a, b) {
				var c, d = k(a),
					e = d[0];
				return a = d[1], e && (e = f(e, b), c = j(e)), e ? a = c && c.normalize ? c.normalize(a, h(b)) : f(a, b) : (a = f(a, b), d = k(a), e = d[0], a = d[1], e && (c = j(e))), {
					f: e ? e + "!" + a : a,
					n: a,
					pr: e,
					p: c
				}
			}, p = {
				require: function(a) {
					return g(a)
				},
				exports: function(a) {
					var b = q[a];
					return "undefined" != typeof b ? b : q[a] = {}
				},
				module: function(a) {
					return {
						id: a,
						uri: "",
						exports: q[a],
						config: l(a)
					}
				}
			}, m = function(a, b, c, f) {
				var h, k, l, m, n, s, u = [],
					v = typeof c;
				if (f = f || a, "undefined" === v || "function" === v) {
					for (b = !b.length && c.length ? ["require", "exports", "module"] : b, n = 0; n < b.length; n += 1)
						if (m = o(b[n], f), k = m.f, "require" === k) u[n] = p.require(a);
						else
					if ("exports" === k) u[n] = p.exports(a), s = !0;
					else if ("module" === k) h = u[n] = p.module(a);
					else if (e(q, k) || e(r, k) || e(t, k)) u[n] = j(k);
					else {
						if (!m.p) throw new Error(a + " missing " + k);
						m.p.load(m.n, g(f, !0), i(k), {}), u[n] = q[k]
					}
					l = c ? c.apply(q[a], u) : void 0, a && (h && h.exports !== d && h.exports !== q[a] ? q[a] = h.exports : l === d && s || (q[a] = l))
				} else a && (q[a] = c)
			}, a = b = n = function(a, b, c, e, f) {
				if ("string" == typeof a) return p[a] ? p[a](b) : j(o(a, b).f);
				if (!a.splice) {
					if (s = a, s.deps && n(s.deps, s.callback), !b) return;
					b.splice ? (a = b, b = c, c = null) : a = d
				}
				return b = b || function() {}, "function" == typeof c && (c = e, e = f), e ? m(d, a, b, c) : setTimeout(function() {
					m(d, a, b, c)
				}, 4), n
			}, n.config = function(a) {
				return n(a)
			}, a._defined = q, c = function(a, b, c) {
				b.splice || (c = b, b = []), e(q, a) || e(r, a) || (r[a] = [a, b, c])
			}, c.amd = {
				jQuery: !0
			}
		}(), c("../../src/javascripts/bower_components/almond/almond", function() {}), c("Utils/stringUtils", ["exports", "module"], function(a, b) {
			b.exports = {
				camelCase: function(a) {
					if (!a) return a;
					var b = a.charAt(0).toUpperCase();
					return a = b + a.substr(1), a.replace(/[-_](.)/g, function(a, b) {
						return " " + b.toUpperCase()
					})
				}
			}
		}), c("Field/Field", ["exports", "module", "../Utils/stringUtils"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				f = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, g = d(c),
				h = function() {
					function a(b) {
						f(this, a), this._name = b || Math.random().toString(36).substring(7), this._detailLink = "id" === b, this._type = "string", this._order = null, this._label = null, this._maps = [], this._attributes = {}, this._cssClasses = null, this._identifier = !1, this._validation = {
							required: !1,
							minlength: 0,
							maxlength: 99999
						}, this._defaultValue = null, this._editable = !0, this._detailLinkRoute = "edit", this.dashboard = !0, this.list = !0
					}
					return e(a, {
						label: {
							value: function() {
								return arguments.length ? (this._label = arguments[0], this) : null === this._label ? g.camelCase(this._name) : this._label
							}
						},
						type: {
							value: function() {
								return this._type
							}
						},
						name: {
							value: function() {
								return arguments.length ? (this._name = arguments[0], this) : this._name
							}
						},
						order: {
							value: function() {
								return arguments.length ? (arguments[1] !== !0 && console.warn("Setting order with Field.order is deprecated, order directly in fields array"), this._order = arguments[0], this) : this._order
							}
						},
						isDetailLink: {
							value: function() {
								return arguments.length ? (this._detailLink = arguments[0], this) : null === this._detailLink ? "id" === this._name : this._detailLink
							}
						},
						detailLink: {
							set: function(a) {
								return this._detailLink = a
							}
						},
						map: {
							value: function(a) {
								if (!a) return this._maps;
								if ("function" != typeof a) {
									var b = typeof a;
									throw new Error("Map argument should be a function, " + b + " given.")
								}
								return this._maps.push(a), this
							}
						},
						hasMaps: {
							value: function() {
								return !!this._maps.length
							}
						},
						attributes: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._attributes = a, this) : this._attributes
							})
						},
						cssClasses: {
							value: function(a) {
								return arguments.length ? (this._cssClasses = a, this) : this._cssClasses
							}
						},
						getCssClasses: {
							value: function(a) {
								return this._cssClasses ? this._cssClasses.constructor === Array ? this._cssClasses.join(" ") : "function" == typeof this._cssClasses ? this._cssClasses(a) : this._cssClasses : ""
							}
						},
						identifier: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._identifier = a, this) : this._identifier
							})
						},
						getMappedValue: {
							value: function(a, b) {
								for (var c in this._maps) a = this._maps[c](a, b);
								return a
							}
						},
						validation: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								if (!arguments.length) return this._validation;
								for (var b in a) a.hasOwnProperty(b) && (null === a[b] ? delete this._validation[b] : this._validation[b] = a[b]);
								return this
							})
						},
						defaultValue: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._defaultValue = a, this) : this._defaultValue
							})
						},
						editable: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._editable = a, this) : this._editable
							})
						},
						detailLinkRoute: {
							value: function(a) {
								return arguments.length ? (this._detailLinkRoute = a, this) : this._detailLinkRoute
							}
						}
					}), a
				}();
			b.exports = h
		}), c("Entry", ["exports", "module"], function(a, b) {
			var c = function() {
				function a(a, b) {
					for (var c in b) {
						var d = b[c];
						d.configurable = !0, d.value && (d.writable = !0)
					}
					Object.defineProperties(a, b)
				}
				return function(b, c, d) {
					return c && a(b.prototype, c), d && a(b, d), b
				}
			}(),
				d = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, e = function() {
					function a(b, c, e) {
						d(this, a), this._entityName = b, this.values = c || {}, this._identifierValue = e, this.listValues = {}
					}
					return c(a, {
						entityName: {
							get: function() {
								return this._entityName
							}
						},
						identifierValue: {
							get: function() {
								return this._identifierValue
							}
						}
					}, {
						mapFromRest: {
							value: function(b, c) {
								if (!c) return new a(b.entity.name());
								var d = b.identifier(),
									e = null;
								return b.fields().forEach(function(a) {
									var b = a.name();
									b in c && (c[b] = a.getMappedValue(c[b], c))
								}), d && (e = c[d.name()]), new a(b.entity.name(), c, e)
							}
						}
					}), a
				}();
			b.exports = e
		}), c("View/View", ["exports", "module", "../Entry"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				f = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, g = d(c),
				h = function() {
					function a(b) {
						f(this, a), this.entity = null, this._actions = null, this._title = !1, this._description = "", this._template = null, this._enabled = !0, this._fields = [], this._type = null, this._name = b, this._order = 0, this._errorMessage = null, this._url = null
					}
					return e(a, {
						enabled: {
							get: function() {
								return this._enabled
							}
						},
						title: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._title = a, this) : this._title
							})
						},
						description: {
							value: function() {
								return arguments.length ? (this._description = arguments[0], this) : this._description
							}
						},
						name: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._name = a, this) : this._name || this.entity.name() + "_" + this._type
							})
						},
						disable: {
							value: function() {
								this._enabled = !1
							}
						},
						enable: {
							value: function() {
								this._enabled = !0
							}
						},
						isEnabled: {
							value: function() {
								return this._enabled
							}
						},
						getEntity: {
							value: function() {
								return this.entity
							}
						},
						setEntity: {
							value: function(a) {
								return this.entity = a, this._name || (this._name = a.name() + "_" + this._type), this
							}
						},
						fields: {
							value: function() {
								return arguments.length ? ([].slice.call(arguments).map(function(b) {
									var c = this;
									a.flatten(b).map(function(a) {
										return c.addField(a)
									})
								}, this), this) : this._fields
							}
						},
						type: {
							get: function() {
								return this._type
							}
						},
						order: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._order = a, this) : this._order
							})
						},
						getReferences: {
							value: function() {
								return this._fields.filter(function(a) {
									return "reference" === a.type() || "reference_many" === a.type()
								})
							}
						},
						getReferencedLists: {
							value: function() {
								for (var a = {}, b = this._fields.filter(function(a) {
										return "referenced_list" === a.type()
									}), c = 0, d = b.length; d > c; c++) {
									var e = b[c];
									a[e.name()] = e
								}
								return a
							}
						},
						mapEntry: {
							value: function(a) {
								return new g.mapFromRest(this, a)
							}
						},
						mapEntries: {
							value: function(a) {
								var b = this;
								return a.map(function(a) {
									return b.mapEntry(a)
								})
							}
						},
						template: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._template = a, this) : this._template
							})
						},
						identifier: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function() {
								var a, b = this._fields;
								for (var c in b)
									if (b[c].identifier()) {
										a = b[c];
										break
									}
								return a || (a = this.entity.identifier()), arguments.length ? this : a
							})
						},
						actions: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._actions = a, this) : this._actions
							})
						},
						processFieldsDefaultValue: {
							value: function(a) {
								return this._fields.forEach(function(b) {
									a.values[b.name()] = b.defaultValue()
								}), a
							}
						},
						removeFields: {
							value: function() {
								return this._fields = [], this
							}
						},
						getFields: {
							value: function() {
								return this._fields
							}
						},
						getField: {
							value: function(a) {
								return this._fields.filter(function(b) {
									return b.name() === a
								})[0]
							}
						},
						getFieldsOfType: {
							value: function(a) {
								return this._fields.filter(function(b) {
									return b.type() === a
								})
							}
						},
						addField: {
							value: function(a) {
								return null === a.order() && a.order(this._fields.length, !0), this._fields.push(a), this._fields = this._fields.sort(function(a, b) {
									return a.order() - b.order()
								}), this
							}
						},
						getErrorMessage: {
							value: function(a) {
								return "function" == typeof this._errorMessage ? this._errorMessage(a) : this._errorMessage
							}
						},
						errorMessage: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._errorMessage = a, this) : this._errorMessage
							})
						},
						url: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._url = a, this) : this._url
							})
						},
						getUrl: {
							value: function(a) {
								return "function" == typeof this._url ? this._url(a) : this._url
							}
						}
					}, {
						flatten: {
							value: function(b) {
								if ("Object" === b.constructor.name) {
									console.warn("Passing literal of Field to fields method is deprecated use array instead");
									var c = [];
									for (var d in b) c = c.concat(a.flatten(b[d]));
									return c
								}
								return Array.isArray(b) ? b.reduce(function(b, c) {
									return b.concat(a.flatten(c))
								}, []) : [b]
							}
						}
					}), a
				}();
			b.exports = h
		}), c("View/ListView", ["exports", "module", "./View"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				f = function k(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : k(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, g = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, h = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, i = d(c),
				j = function(a) {
					function b(a) {
						h(this, b), f(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "ListView", this._perPage = 30, this._infinitePagination = !1, this._listActions = [], this._batchActions = ["delete"], this._filters = [], this._exportFields = null, this._sortField = "id", this._sortDir = "DESC"
					}
					return g(b, a), e(b, {
						perPage: {
							value: function() {
								return arguments.length ? (this._perPage = arguments[0], this) : this._perPage
							}
						},
						limit: {
							value: function() {
								return arguments.length ? this.perPage(arguments[0]) : this.perPage()
							}
						},
						sortField: {
							value: function() {
								return arguments.length ? (this._sortField = arguments[0], this) : this._sortField
							}
						},
						sortDir: {
							value: function() {
								return arguments.length ? (this._sortDir = arguments[0], this) : this._sortDir
							}
						},
						infinitePagination: {
							value: function() {
								return arguments.length ? (this._infinitePagination = arguments[0], this) : this._infinitePagination
							}
						},
						actions: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._actions = a, this) : this._actions
							})
						},
						exportFields: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._exportFields = a, this) : this._exportFields
							})
						},
						batchActions: {
							value: function(a) {
								return arguments.length ? (this._batchActions = a, this) : this._batchActions
							}
						},
						filters: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._filters = a, this) : this._filters
							})
						},
						getFilterReferences: {
							value: function() {
								return this._filters.filter(function(a) {
									return "reference" === a.type()
								})
							}
						},
						listActions: {
							value: function(a) {
								return arguments.length ? (this._listActions = a, this) : this._listActions
							}
						}
					}), b
				}(i);
			b.exports = j
		}), c("View/DashboardView", ["exports", "module", "./ListView"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "DashboardView"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("View/MenuView", ["exports", "module", "./View"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				f = function k(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : k(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, g = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, h = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, i = d(c),
				j = function(a) {
					function b(a) {
						h(this, b), f(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "MenuView", this._icon = null
					}
					return g(b, a), e(b, {
						icon: {
							value: function() {
								return arguments.length ? (console.warn("entity.menuView() is deprecated. Please use the Menu class instead"), this._icon = arguments[0], this) : null === this._icon ? '<span class="glyphicon glyphicon-list"></span>' : this._icon
							}
						}
					}), b
				}(i);
			b.exports = j
		}), c("View/CreateView", ["exports", "module", "./View"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "CreateView"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("View/EditView", ["exports", "module", "./View"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "EditView"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("View/DeleteView", ["exports", "module", "./View"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);

					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "DeleteView"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("View/ShowView", ["exports", "module", "./View"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "ShowView"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("View/BatchDeleteView", ["exports", "module", "./View"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "BatchDeleteView"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("View/ExportView", ["exports", "module", "./ListView"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._fields = [], this._type = "ExportView"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("Entity/Entity", ["exports", "module", "../Utils/stringUtils", "../Field/Field", "../View/DashboardView", "../View/MenuView", "../View/ListView", "../View/CreateView", "../View/EditView", "../View/DeleteView", "../View/ShowView", "../View/BatchDeleteView", "../View/ExportView"], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
			var n = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, o = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				p = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, q = n(c),
				r = n(d),
				s = n(e),
				t = n(f),
				u = n(g),
				v = n(h),
				w = n(i),
				x = n(j),
				y = n(k),
				z = n(l),
				A = n(m),
				B = function() {
					function a(b) {
						p(this, a), this._name = b, this._baseApiUrl = null, this._label = null, this._identifierField = new r("id"), this._isReadOnly = !1, this._errorMessage = null, this._order = 0, this._url = null, this._initViews()
					}
					return o(a, {
						views: {
							get: function() {
								return this._views
							}
						},
						label: {
							value: function() {
								return arguments.length ? (this._label = arguments[0], this) : null === this._label ? q.camelCase(this._name) : this._label
							}
						},
						name: {
							value: function() {
								return arguments.length ? (this._name = arguments[0], this) : this._name
							}
						},
						menuView: {
							value: function() {
								return this._views.MenuView
							}
						},
						dashboardView: {
							value: function() {
								return this._views.DashboardView
							}
						},
						listView: {
							value: function() {
								return this._views.ListView
							}
						},
						creationView: {
							value: function() {
								return this._views.CreateView
							}
						},
						editionView: {
							value: function() {
								return this._views.EditView
							}
						},
						deletionView: {
							value: function() {
								return this._views.DeleteView
							}
						},
						batchDeleteView: {
							value: function() {
								return this._views.BatchDeleteView
							}
						},
						exportView: {
							value: function() {
								return this._views.ExportView
							}
						},
						showView: {
							value: function() {
								return this._views.ShowView
							}
						},
						baseApiUrl: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._baseApiUrl = a, this) : this._baseApiUrl
							})
						},
						_initViews: {
							value: function() {
								this._views = {
									DashboardView: (new s).setEntity(this),
									MenuView: (new t).setEntity(this),
									ListView: (new u).setEntity(this),
									CreateView: (new v).setEntity(this),
									EditView: (new w).setEntity(this),
									DeleteView: (new x).setEntity(this),
									BatchDeleteView: (new z).setEntity(this),
									ExportView: (new A).setEntity(this),
									ShowView: (new y).setEntity(this)
								}
							}
						},
						identifier: {
							value: function(a) {
								return arguments.length ? (this._identifierField = a, this) : this._identifierField
							}
						},
						readOnly: {
							value: function() {
								return this._isReadOnly = !0, this._views.CreateView.disable(), this._views.EditView.disable(), this._views.DeleteView.disable(), this._views.BatchDeleteView.disable(), this
							}
						},
						isReadOnly: {
							get: function() {
								return this._isReadOnly
							}
						},
						getErrorMessage: {
							value: function(a) {
								return "function" == typeof this._errorMessage ? this._errorMessage(a) : this._errorMessage
							}
						},
						errorMessage: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._errorMessage = a, this) : this._errorMessage
							})
						},
						order: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._order = a, this) : this._order
							})
						},
						url: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._url = a, this) : this._url
							})
						},
						getUrl: {
							value: function(a, b) {
								return "function" == typeof this._url ? this._url(a, b) : this._url
							}
						}
					}), a
				}();
			b.exports = B
		}), c("Menu/Menu", ["exports", "module", "../Entity/Entity"], function(a, b, c) {
			function d() {
				return !1
			}
			var e = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, f = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = e(c),
				i = 0,
				j = function() {
					function a() {
						g(this, a), this._link = null, this._activeFunc = d, this._title = null, this._icon = !1, this._children = [], this._template = !1, this.uuid = i++
					}
					return f(a, {
						title: {
							value: function() {
								return arguments.length ? (this._title = arguments[0], this) : this._title
							}
						},
						isLink: {
							value: function() {
								return !!this._link
							}
						},
						link: {
							value: function() {
								var a = this;
								return arguments.length ? (this._link = arguments[0], this._activeFunc == d && (this._activeFunc = function(b) {
									return 0 === b.indexOf(a._link)
								}), this) : this._link
							}
						},
						active: {
							value: function() {
								return arguments.length ? (this._activeFunc = arguments[0], this) : this._activeFunc
							}
						},
						isActive: {
							value: function(a) {
								return this._activeFunc(a)
							}
						},
						isChildActive: {
							value: function(a) {
								return this.isActive(a) || this.children().filter(function(b) {
									return b.isChildActive(a)
								}).length > 0
							}
						},
						addChild: {
							value: function(b) {
								if (!(b instanceof a)) throw new Error("Only Menu instances are accepted as children of a Menu");
								return this._children.push(b), this
							}
						},
						hasChild: {
							value: function() {
								return this._children.length > 0
							}
						},
						getChildByTitle: {
							value: function(a) {
								return this.children().filter(function(b) {
									return b.title() == a
								}).pop()
							}
						},
						children: {
							value: function() {
								return arguments.length ? (this._children = arguments[0], this) : this._children
							}
						},
						icon: {
							value: function() {
								return arguments.length ? (this._icon = arguments[0], this) : this._icon
							}
						},
						template: {
							value: function() {
								return arguments.length ? (this._template = arguments[0], this) : this._template
							}
						},
						populateFromEntity: {
							value: function(a) {
								if (!(a instanceof h)) throw new Error("populateFromEntity() only accepts an Entity parameter");
								return this.title(a.label()), this.active(function(b) {
									return 0 === b.indexOf("/" + a.name() + "/")
								}), this.link("/" + a.name() + "/list"), this.icon(a.menuView().icon()), this
							}
						}
					}), a
				}();
			b.exports = j
		}), c("Application", ["exports", "module", "./Menu/Menu"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				f = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, g = d(c),
				h = function() {
					function a() {
						var b = void 0 === arguments[0] ? "ng-admin" : arguments[0];
						f(this, a), this._baseApiUrl = "", this._customTemplate = function() {}, this._title = b, this._menu = null, this._layout = !1, this._header = !1, this._entities = [], this._errorMessage = this.defaultErrorMessage
					}
					return e(a, {
						defaultErrorMessage: {
							value: function(a) {
								var b = a.data;
								return "object" == typeof b && (b = JSON.stringify(b)), "Oops, an error occured : (code: " + a.status + ") " + b
							}
						},
						entities: {
							get: function() {
								return this._entities
							}
						},
						getViewsOfType: {
							value: function(a) {
								return this._entities.map(function(b) {
									return b.views[a]
								})
							}
						},
						getRouteFor: {
							value: function(a, b) {
								var c = a.getEntity(),
									d = c.baseApiUrl() || this.baseApiUrl(),
									e = a.getUrl(b) || c.getUrl(a, b);
								return e ? /^(?:[a-z]+:)?\/\//.test(e) || (e = d + e) : (e = d + c.name(), b && (e += "/" + b)), e
							}
						},
						layout: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._layout = a, this) : this._layout
							})
						},
						header: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._header = a, this) : this._header
							})
						},
						title: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._title = a, this) : this._title
							})
						},
						menu: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._menu = a, this) : (this._menu || (this._menu = this.buildMenuFromEntities()), this._menu)
							})
						},
						buildMenuFromEntities: {
							value: function() {
								return (new g).children(this.entities.filter(function(a) {
									return a.menuView().enabled
								}).sort(function(a, b) {
									return a.menuView().order() - b.menuView().order()
								}).map(function(a) {
									return (new g).populateFromEntity(a)
								}))
							}
						},
						customTemplate: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._customTemplate = a, this) : this._customTemplate
							})
						},
						baseApiUrl: {
							value: function(a) {
								return arguments.length ? (this._baseApiUrl = a, this) : this._baseApiUrl
							}
						},
						addEntity: {
							value: function(a) {
								if (!a) throw new Error("No entity given");
								return this._entities.push(a), this
							}
						},
						getEntity: {
							value: function(a) {
								var b = this._entities.filter(function(b) {
									return b.name() === a
								})[0];
								if (!b) throw new Error('Unable to find entity "' + a + '"');
								return b
							}
						},
						hasEntity: {
							value: function(a) {
								return !!this._entities.filter(function(b) {
									return b.name() === a
								}).length
							}
						},
						getViewByEntityAndType: {
							value: function(a, b) {
								return this._entities.filter(function(b) {
									return b.name() === a
								})[0].views[b]
							}
						},
						getErrorMessage: {
							value: function(a) {
								return "function" == typeof this._errorMessage ? this._errorMessage(a) : this._errorMessage
							}
						},
						errorMessage: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._errorMessage = a, this) : this._errorMessage
							})
						},
						getErrorMessageFor: {
							value: function(a, b) {
								return a.getErrorMessage(b) || a.getEntity().getErrorMessage(b) || this.getErrorMessage(b)
							}
						},
						getEntityNames: {
							value: function() {
								return this.entities.map(function(a) {
									return a.name()
								})
							}
						}
					}), a
				}();
			b.exports = h
		}), c("Field/BooleanField", ["exports", "module", "./Field"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "boolean"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("Field/ChoiceField", ["exports", "module", "./Field"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				f = function k(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : k(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, g = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, h = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, i = d(c),
				j = function(a) {
					function b(a) {
						h(this, b), f(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "choice", this._choices = []
					}
					return g(b, a), e(b, {
						choices: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._choices = a, this) : this._choices
							})
						},
						getLabelForChoice: {
							value: function(a, b) {
								var c = "function" == typeof this._choices ? this._choices(b) : this._choices,
									d = c.filter(function(b) {
										return b.value == a
									}).pop();
								return d ? d.label : null
							}
						}
					}), b
				}(i);
			b.exports = j
		}), c("Field/ChoicesField", ["exports", "module", "./ChoiceField"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "choices"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("Field/DateField", ["exports", "module", "./Field"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				f = function k(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : k(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, g = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, h = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, i = d(c),
				j = function(a) {
					function b(a) {
						h(this, b), f(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._format = "yyyy-MM-dd", this._parse = function(a) {
							if (a instanceof Date) {
								a.setMinutes(a.getMinutes() - a.getTimezoneOffset());
								var b = a.toJSON();
								return b ? b.substr(0, 10) : null
							}
						}, this._type = "date"
					}
					return g(b, a), e(b, {
						format: {
							value: function(a) {
								return arguments.length ? (this._format = a, this) : this._format
							}
						},
						parse: {
							value: function(a) {
								return arguments.length ? (this._parse = a, this) : this._parse
							}
						}
					}), b
				}(i);
			b.exports = j
		}), c("Field/DateTimeField", ["exports", "module", "./DateField"], function(a, b, c) {
			{
				var d = function(a) {
					return a && a.__esModule ? a["default"] : a
				}, e = function i(a, b, c) {
						var d = Object.getOwnPropertyDescriptor(a, b);
						if (void 0 === d) {
							var e = Object.getPrototypeOf(a);
							return null === e ? void 0 : i(e, b, c)
						}
						if ("value" in d && d.writable) return d.value;
						var f = d.get;
						return void 0 === f ? void 0 : f.call(c)
					}, f = function(a, b) {
						if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
						a.prototype = Object.create(b && b.prototype, {
							constructor: {
								value: a,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}), b && (a.__proto__ = b)
					}, g = function(a, b) {
						if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
					}, h = d(c);
				! function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._format = "yyyy-MM-dd HH:mm:ss", this._parse = function(a) {
							return a
						}
					}
					return f(b, a), b
				}(h)
			}
			b.exports = h
		}), c("Field/EmailField", ["exports", "module", "./Field"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "email"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("Field/FileField", ["exports", "module", "./Field"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				f = function k(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : k(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, g = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, h = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, i = d(c),
				j = function(a) {
					function b(a) {
						h(this, b), f(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "file", this._uploadInformation = {
							url: "/upload",
							accept: "*"
						}
					}
					return g(b, a), e(b, {
						uploadInformation: {
							value: function(a) {
								return arguments.length ? (this._uploadInformation = a, this) : this._uploadInformation
							}
						}
					}), b
				}(i);
			b.exports = j
		}), c("Field/JsonField", ["exports", "module", "./Field"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "json"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("Field/NumberField", ["exports", "module", "./Field"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				f = function k(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : k(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, g = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, h = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, i = d(c),
				j = function(a) {
					function b(a) {
						h(this, b), f(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "number", this._format = void 0
					}
					return g(b, a), e(b, {
						format: {
							value: function(a) {
								return arguments.length ? (this._format = a, this) : this._format
							}
						},
						fractionSize: {
							value: function(a) {
								return console.warn("NumberField.fractionSize() is deprecated, use NumberField.format() instead"), this.format("0." + "0".repeat(a)), this
							}
						}
					}), b
				}(i);
			b.exports = j
		}), c("Field/PasswordField", ["exports", "module", "./Field"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "password"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("Field/ReferenceField", ["exports", "module", "./ChoiceField", "../View/ListView"], function(a, b, c, d) {
			var e = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, f = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				g = function m(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : m(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, h = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, i = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, j = e(c),
				k = e(d),
				l = function(a) {
					function b(a) {
						i(this, b), g(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this.entries = [], this._type = "reference", this._targetEntity = null, this._targetField = null, this._referencedView = null, this._perPage = 30, this._filters = null, this._sortField = null, this._sortDir = null, this._singleApiCall = !1, this._detailLink = !0
					}
					return h(b, a), f(b, {
						perPage: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._perPage = a, this) : this._perPage
							})
						},
						targetEntity: {
							value: function(a) {
								return arguments.length ? (this._targetEntity = a, this._referencedView = (new k).setEntity(a), this._targetField && this._referencedView.addField(this._targetField), this) : this._targetEntity
							}
						},
						targetField: {
							value: function(a) {
								return arguments.length ? (this._targetField = a, this._referencedView || (this._referencedView = new k), this._referencedView.removeFields().addField(a), this) : this._targetField
							}
						},
						getReferencedView: {
							value: function() {
								return this._referencedView.perPage(this._perPage)
							}
						},
						filters: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._filters = a, this) : this._filters
							})
						},
						sortField: {
							value: function() {
								return arguments.length ? (this._sortField = arguments[0], this) : this._sortField
							}
						},
						sortDir: {
							value: function() {
								return arguments.length ? (this._sortDir = arguments[0], this) : this._sortDir
							}
						},
						singleApiCall: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._singleApiCall = a, this) : this._singleApiCall
							})
						},
						hasSingleApiCall: {
							value: function() {
								return "function" == typeof this._singleApiCall
							}
						},
						getSingleApiCall: {
							value: function(a) {
								return this.hasSingleApiCall() ? this._singleApiCall(a) : this._singleApiCall
							}
						},
						getIdentifierValues: {
							value: function(a) {
								for (var b = {}, c = this._name, d = 0, e = a.length; e > d; d++) {
									var f = a[d][c];
									if (f)
										if (f instanceof Array)
											for (var g in f) b[f[g]] = !0;
										else b[f] = !0
								}
								return Object.keys(b)
							}
						},
						getChoicesById: {
							value: function() {
								for (var a = {}, b = this._targetEntity, c = this._targetField.name(), d = b.identifier().name(), e = 0, f = this.entries.length; f > e; e++) {
									var g = this.entries[e];
									a[g.values[d]] = g.values[c]
								}
								return a
							}
						},
						choices: {
							value: function() {
								return this.entries.map(function(a) {
									return {
										value: a.values[this._targetEntity.identifier().name()],
										label: a.values[this._targetField.name()]
									}
								}, this)
							}
						},
						getSortFieldName: {
							value: function() {
								return this._referencedView.name() + "." + this._targetField.name()
							}
						}
					}), b
				}(j);
			b.exports = l
		}), c("Field/ReferencedListField", ["exports", "module", "../View/ListView", "./ReferenceField"], function(a, b, c, d) {
			var e = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, f = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				g = function m(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : m(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, h = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, i = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, j = e(c),
				k = e(d),
				l = function(a) {
					function b(a) {
						i(this, b), g(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "referenced_list", this._targetReferenceField = null, this._targetFields = [], this._detailLink = !1
					}
					return h(b, a), f(b, {
						targetReferenceField: {
							value: function(a) {
								return arguments.length ? (this._targetReferenceField = a, this) : this._targetReferenceField
							}
						},
						targetFields: {
							value: function(a) {
								return arguments.length ? (this._referencedView || (this._referencedView = new j), this._referencedView.fields(a), this._targetFields = a, this) : this._targetFields
							}
						},
						getGridColumns: {
							value: function() {
								for (var a = [], b = 0, c = this._targetFields.length; c > b; b++) {
									var d = this._targetFields[b];
									a.push({
										field: d,
										label: d.label()
									})
								}
								return a
							}
						}
					}), b
				}(k);
			b.exports = l
		}), c("Field/ReferenceManyField", ["exports", "module", "./ReferenceField"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "reference_many"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("Field/TemplateField", ["exports", "module", "./Field"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				f = function k(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : k(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, g = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, h = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, i = d(c),
				j = function(a) {
					function b(a) {
						h(this, b), f(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._template = function() {
							return ""
						}, this._type = "template"
					}
					return g(b, a), e(b, {
						getTemplateValue: {
							value: function(a) {
								return "function" == typeof this._template ? this._template(a) : this._template
							}
						},
						template: {
							value: function(a) {
								var b = function() {
									return a.apply(this, arguments)
								};
								return b.toString = function() {
									return a.toString()
								}, b
							}(function(a) {
								return arguments.length ? (this._template = a, this) : this._template
							})
						}
					}), b
				}(i);
			b.exports = j
		}), c("Field/TextField", ["exports", "module", "./Field"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function j(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : j(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, f = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, g = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, h = d(c),
				i = function(a) {
					function b(a) {
						g(this, b), e(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "text"
					}
					return f(b, a), b
				}(h);
			b.exports = i
		}), c("Field/WysiwygField", ["exports", "module", "./Field"], function(a, b, c) {
			var d = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, e = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				f = function k(a, b, c) {
					var d = Object.getOwnPropertyDescriptor(a, b);
					if (void 0 === d) {
						var e = Object.getPrototypeOf(a);
						return null === e ? void 0 : k(e, b, c)
					}
					if ("value" in d && d.writable) return d.value;
					var f = d.get;
					return void 0 === f ? void 0 : f.call(c)
				}, g = function(a, b) {
					if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
					a.prototype = Object.create(b && b.prototype, {
						constructor: {
							value: a,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), b && (a.__proto__ = b)
				}, h = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, i = d(c),
				j = function(a) {
					function b(a) {
						h(this, b), f(Object.getPrototypeOf(b.prototype), "constructor", this).call(this, a), this._type = "wysiwyg", this._stripTags = !1, this._sanitize = !0
					}
					return g(b, a), e(b, {
						stripTags: {
							value: function(a) {
								return arguments.length ? (this._stripTags = a, this) : this._stripTags
							}
						},
						sanitize: {
							value: function(a) {
								return arguments.length ? (this._sanitize = a, this) : this._sanitize
							}
						}
					}), b
				}(i);
			b.exports = j
		}), c("Factory.js", ["exports", "module", "./Application", "./Entity/Entity", "./Field/Field", "./Field/BooleanField", "./Field/ChoiceField", "./Field/ChoicesField", "./Field/DateField", "./Field/DateTimeField", "./Field/EmailField", "./Field/FileField", "./Field/JsonField", "./Field/NumberField", "./Field/PasswordField", "./Field/ReferenceField", "./Field/ReferencedListField", "./Field/ReferenceManyField", "./Field/TemplateField", "./Field/TextField", "./Field/WysiwygField", "./Menu/Menu"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
			var w = function(a) {
				return a && a.__esModule ? a["default"] : a
			}, x = function() {
					function a(a, b) {
						for (var c in b) {
							var d = b[c];
							d.configurable = !0, d.value && (d.writable = !0)
						}
						Object.defineProperties(a, b)
					}
					return function(b, c, d) {
						return c && a(b.prototype, c), d && a(b, d), b
					}
				}(),
				y = function(a, b) {
					if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
				}, z = w(c),
				A = w(d),
				B = w(e),
				C = w(f),
				D = w(g),
				E = w(h),
				F = w(i),
				G = w(j),
				H = w(k),
				I = w(l),
				J = w(m),
				K = w(n),
				L = w(o),
				M = w(p),
				N = w(q),
				O = w(r),
				P = w(s),
				Q = w(t),
				R = w(u),
				S = w(v),
				T = function() {
					function a() {
						y(this, a), this._fieldTypes = [], this._init()
					}
					return x(a, {
						application: {
							value: function(a, b) {
								return new z(a, b)
							}
						},
						entity: {
							value: function(a) {
								return new A(a)
							}
						},
						field: {
							value: function(a, b) {
								var b = b || "string";
								if (!(b in this._fieldTypes)) throw new Error('Unknown field type "' + b + '".');
								return new this._fieldTypes[b](a)
							}
						},
						registerFieldType: {
							value: function(a, b) {
								this._fieldTypes[a] = b
							}
						},
						getFieldConstructor: {
							value: function(a) {
								return this._fieldTypes[a]
							}
						},
						menu: {
							value: function b(a) {
								var b = new S;
								return a && b.populateFromEntity(a), b
							}
						},
						_init: {
							value: function() {
								this.registerFieldType("boolean", C), this.registerFieldType("choice", D), this.registerFieldType("choices", E), this.registerFieldType("date", F), this.registerFieldType("datetime", G), this.registerFieldType("email", H), this.registerFieldType("string", B), this.registerFieldType("file", I), this.registerFieldType("json", J), this.registerFieldType("number", K), this.registerFieldType("password", L), this.registerFieldType("reference", M), this.registerFieldType("reference_many", O), this.registerFieldType("referenced_list", N), this.registerFieldType("template", P), this.registerFieldType("text", Q), this.registerFieldType("wysiwyg", R)
							}
						}
					}), a
				}();
			b.exports = T
		}), b("Factory.js")
	}), d("angular", [], function() {
		return angular
	}), c.config({
		paths: {
			"angular-bootstrap": "bower_components/angular-bootstrap/ui-bootstrap.min",
			"angular-bootstrap-tpls": "bower_components/angular-bootstrap/ui-bootstrap-tpls.min",
			"angular-numeraljs": "bower_components/angular-numeraljs/dist/angular-numeraljs",
			"angular-resource": "bower_components/angular-resource/angular-resource",
			"angular-sanitize": "bower_components/angular-sanitize/angular-sanitize",
			"angular-ui-codemirror": "bower_components/angular-ui-codemirror/ui-codemirror.min",
			"angular-ui-router": "bower_components/angular-ui-router/release/angular-ui-router",
			humane: "bower_components/humane/humane",
			inflection: "bower_components/inflection/inflection.min",
			lodash: "bower_components/lodash/dist/lodash.min",
			"ng-file-upload": "bower_components/ng-file-upload/angular-file-upload",
			ngInflection: "bower_components/ngInflection/ngInflection",
			nprogress: "bower_components/nprogress/nprogress",
			numeral: "bower_components/numeral/numeral",
			restangular: "bower_components/restangular/dist/restangular",
			text: "bower_components/requirejs-text/text",
			textangular: "bower_components/textAngular/dist/textAngular.min",
			CrudModule: "ng-admin/Crud/CrudModule",
			papaparse: "bower_components/papaparse/papaparse.min",
			MainModule: "ng-admin/Main/MainModule",
			AdminDescription: "../../build/ng-admin-configuration"
		},
		shim: {
			papaparse: {
				exports: "Papa"
			},
			restangular: {
				deps: ["angular", "lodash"]
			},
			"angular-ui-router": {
				deps: ["angular"]
			},
			"angular-bootstrap": {
				deps: ["angular"]
			},
			"angular-bootstrap-tpls": {
				deps: ["angular", "angular-bootstrap"]
			}
		}
	}), d("ng-admin", ["require", "angular", "MainModule", "CrudModule", "AdminDescription"], function(a) {
		var b = a("angular");
		a("MainModule"), a("CrudModule");
		var c = a("AdminDescription"),
			d = b.module("AdminDescriptionModule", []);
		d.constant("AdminDescription", new c);
		var e = b.module("ng-admin", ["main", "crud", "AdminDescriptionModule"]);
		e.config(["NgAdminConfigurationProvider", "AdminDescription",
			function(a, b) {
				a.setAdminDescription(b)
			}
		])
	}), c("ng-admin")
});
//# sourceMappingURL=ng-admin.min.map