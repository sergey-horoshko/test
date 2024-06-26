!(function (t) {
  if ('object' == typeof exports && 'undefined' != typeof module) module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else {
    ('undefined' != typeof window
      ? window
      : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
          ? self
          : this
    ).WAValidator = t();
  }
})(function () {
  return (function () {
    return function t(e, r, n) {
      function i(a, s) {
        if (!r[a]) {
          if (!e[a]) {
            var u = 'function' == typeof require && require;
            if (!s && u) return u(a, !0);
            if (o) return o(a, !0);
            var f = new Error("Cannot find module '" + a + "'");
            throw ((f.code = 'MODULE_NOT_FOUND'), f);
          }
          var h = (r[a] = { exports: {} });
          e[a][0].call(
            h.exports,
            function (t) {
              return i(e[a][1][t] || t);
            },
            h,
            h.exports,
            t,
            e,
            r,
            n,
          );
        }
        return r[a].exports;
      }
      for (var o = 'function' == typeof require && require, a = 0; a < n.length; a++) i(n[a]);
      return i;
    };
  })()(
    {
      1: [
        function (t, e, r) {
          'use strict';
          var n = t('safe-buffer').Buffer;
          e.exports = function (t) {
            if (t.length >= 255) throw new TypeError('Alphabet too long');
            for (var e = new Uint8Array(256), r = 0; r < e.length; r++) e[r] = 255;
            for (var i = 0; i < t.length; i++) {
              var o = t.charAt(i),
                a = o.charCodeAt(0);
              if (255 !== e[a]) throw new TypeError(o + ' is ambiguous');
              e[a] = i;
            }
            var s = t.length,
              u = t.charAt(0),
              f = Math.log(s) / Math.log(256),
              h = Math.log(256) / Math.log(s);
            function c(t) {
              if ('string' != typeof t) throw new TypeError('Expected String');
              if (0 === t.length) return n.alloc(0);
              for (var r = 0, i = 0, o = 0; t[r] === u; ) i++, r++;
              for (var a = ((t.length - r) * f + 1) >>> 0, h = new Uint8Array(a); t[r]; ) {
                var c = e[t.charCodeAt(r)];
                if (255 === c) return;
                for (var l = 0, d = a - 1; (0 !== c || l < o) && -1 !== d; d--, l++)
                  (c += (s * h[d]) >>> 0), (h[d] = c % 256 >>> 0), (c = (c / 256) >>> 0);
                if (0 !== c) throw new Error('Non-zero carry');
                (o = l), r++;
              }
              for (var p = a - o; p !== a && 0 === h[p]; ) p++;
              var y = n.allocUnsafe(i + (a - p));
              y.fill(0, 0, i);
              for (var v = i; p !== a; ) y[v++] = h[p++];
              return y;
            }
            return {
              encode: function (e) {
                if (
                  ((Array.isArray(e) || e instanceof Uint8Array) && (e = n.from(e)), !n.isBuffer(e))
                )
                  throw new TypeError('Expected Buffer');
                if (0 === e.length) return '';
                for (var r = 0, i = 0, o = 0, a = e.length; o !== a && 0 === e[o]; ) o++, r++;
                for (var f = ((a - o) * h + 1) >>> 0, c = new Uint8Array(f); o !== a; ) {
                  for (var l = e[o], d = 0, p = f - 1; (0 !== l || d < i) && -1 !== p; p--, d++)
                    (l += (256 * c[p]) >>> 0), (c[p] = l % s >>> 0), (l = (l / s) >>> 0);
                  if (0 !== l) throw new Error('Non-zero carry');
                  (i = d), o++;
                }
                for (var y = f - i; y !== f && 0 === c[y]; ) y++;
                for (var v = u.repeat(r); y < f; ++y) v += t.charAt(c[y]);
                return v;
              },
              decodeUnsafe: c,
              decode: function (t) {
                var e = c(t);
                if (e) return e;
                throw new Error('Non-base' + s + ' character');
              },
            };
          };
        },
        { 'safe-buffer': 36 },
      ],
      2: [
        function (t, e, r) {
          'use strict';
          (r.byteLength = function (t) {
            var e = f(t),
              r = e[0],
              n = e[1];
            return (3 * (r + n)) / 4 - n;
          }),
            (r.toByteArray = function (t) {
              for (
                var e,
                  r = f(t),
                  n = r[0],
                  a = r[1],
                  s = new o(
                    (function (t, e, r) {
                      return (3 * (e + r)) / 4 - r;
                    })(0, n, a),
                  ),
                  u = 0,
                  h = a > 0 ? n - 4 : n,
                  c = 0;
                c < h;
                c += 4
              )
                (e =
                  (i[t.charCodeAt(c)] << 18) |
                  (i[t.charCodeAt(c + 1)] << 12) |
                  (i[t.charCodeAt(c + 2)] << 6) |
                  i[t.charCodeAt(c + 3)]),
                  (s[u++] = (e >> 16) & 255),
                  (s[u++] = (e >> 8) & 255),
                  (s[u++] = 255 & e);
              2 === a &&
                ((e = (i[t.charCodeAt(c)] << 2) | (i[t.charCodeAt(c + 1)] >> 4)),
                (s[u++] = 255 & e));
              1 === a &&
                ((e =
                  (i[t.charCodeAt(c)] << 10) |
                  (i[t.charCodeAt(c + 1)] << 4) |
                  (i[t.charCodeAt(c + 2)] >> 2)),
                (s[u++] = (e >> 8) & 255),
                (s[u++] = 255 & e));
              return s;
            }),
            (r.fromByteArray = function (t) {
              for (var e, r = t.length, i = r % 3, o = [], a = 0, s = r - i; a < s; a += 16383)
                o.push(h(t, a, a + 16383 > s ? s : a + 16383));
              1 === i
                ? ((e = t[r - 1]), o.push(n[e >> 2] + n[(e << 4) & 63] + '=='))
                : 2 === i &&
                  ((e = (t[r - 2] << 8) + t[r - 1]),
                  o.push(n[e >> 10] + n[(e >> 4) & 63] + n[(e << 2) & 63] + '='));
              return o.join('');
            });
          for (
            var n = [],
              i = [],
              o = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
              a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
              s = 0,
              u = a.length;
            s < u;
            ++s
          )
            (n[s] = a[s]), (i[a.charCodeAt(s)] = s);
          function f(t) {
            var e = t.length;
            if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
            var r = t.indexOf('=');
            return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)];
          }
          function h(t, e, r) {
            for (var i, o, a = [], s = e; s < r; s += 3)
              (i = ((t[s] << 16) & 16711680) + ((t[s + 1] << 8) & 65280) + (255 & t[s + 2])),
                a.push(n[((o = i) >> 18) & 63] + n[(o >> 12) & 63] + n[(o >> 6) & 63] + n[63 & o]);
            return a.join('');
          }
          (i['-'.charCodeAt(0)] = 62), (i['_'.charCodeAt(0)] = 63);
        },
        {},
      ],
      3: [
        function (t, e, r) {
          (function (t) {
            (function () {
              var r,
                n = 20,
                i = 4,
                o = -7,
                a = 21,
                s = -1e9,
                u = 1e9,
                f = !0,
                h = parseInt,
                c = g.prototype,
                l = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
                d = 0,
                p = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
                y =
                  String.prototype.trim ||
                  function () {
                    return this.replace(/^\s+|\s+$/g, '');
                  },
                v = g(1);
              function g(t, e) {
                var o,
                  a,
                  h,
                  c,
                  v,
                  m,
                  _ = this;
                if (!(_ instanceof g)) return new g(t, e);
                if (t instanceof g) {
                  if (((d = 0), e === o))
                    return (_.s = t.s), (_.e = t.e), void (_.c = (t = t.c) ? t.slice() : t);
                  t += '';
                }
                if (
                  ('string' != typeof t &&
                    (t =
                      (h =
                        'number' == typeof t ||
                        '[object Number]' == Object.prototype.toString.call(t)) &&
                      0 === t &&
                      1 / t < 0
                        ? '-0'
                        : t + ''),
                  (m = t),
                  e === o && p.test(t))
                )
                  _.s = '-' == t.charAt(0) ? ((t = t.slice(1)), -1) : 1;
                else {
                  if (10 == e) return x(t, n, i);
                  if (
                    ((t = y.call(t).replace(/^\+(?!-)/, '')),
                    (_.s = '-' == t.charAt(0) ? ((t = t.replace(/^-(?!-)/, '')), -1) : 1),
                    null != e
                      ? (e != (0 | e) && f) || (r = !(e >= 2 && e < 65))
                        ? (b(e, 2), (v = p.test(t)))
                        : ((c = '[' + l.slice(0, (e |= 0)) + ']+'),
                          (t = t.replace(/\.$/, '').replace(/^\./, '0.')),
                          (v = new RegExp('^' + c + '(?:\\.' + c + ')?$', e < 37 ? 'i' : '').test(
                            t,
                          ))
                            ? (h && (t.replace(/^0\.0*|\./, '').length > 15 && b(m, 0), (h = !h)),
                              (t = w(t, 10, e, _.s)))
                            : 'Infinity' != t && 'NaN' != t && (b(m, 1, e), (t = 'NaN')))
                      : (v = p.test(t)),
                    !v)
                  )
                    return (
                      (_.c = _.e = null),
                      'Infinity' != t && ('NaN' != t && b(m, 3), (_.s = null)),
                      void (d = 0)
                    );
                }
                for (
                  (o = t.indexOf('.')) > -1 && (t = t.replace('.', '')),
                    (a = t.search(/e/i)) > 0
                      ? (o < 0 && (o = a), (o += +t.slice(a + 1)), (t = t.substring(0, a)))
                      : o < 0 && (o = t.length),
                    a = 0;
                  '0' == t.charAt(a);
                  a++
                );
                if (
                  ((e = t.length),
                  h && e > 15 && t.slice(a).length > 15 && b(m, 0),
                  (d = 0),
                  (o -= a + 1) > u)
                )
                  _.c = _.e = null;
                else if (a == e || o < s) _.c = [(_.e = 0)];
                else {
                  for (; '0' == t.charAt(--e); );
                  for (_.e = o, _.c = [], o = 0; a <= e; _.c[o++] = +t.charAt(a++));
                }
              }
              function b(t, e, n, i, o, a) {
                if (f) {
                  var s,
                    u =
                      [
                        'new BigNumber',
                        'cmp',
                        'div',
                        'eq',
                        'gt',
                        'gte',
                        'lt',
                        'lte',
                        'minus',
                        'mod',
                        'plus',
                        'times',
                        'toFr',
                      ][d ? (d < 0 ? -d : d) : 1 / d < 0 ? 1 : 0] + '()',
                    h = r ? ' out of range' : ' not a' + (o ? ' non-zero' : 'n') + ' integer';
                  throw (
                    ((h =
                      ([
                        u + ' number type has more than 15 significant digits',
                        u + ' not a base ' + n + ' number',
                        u + ' base' + h,
                        u + ' not a number',
                      ][e] ||
                        n +
                          '() ' +
                          e +
                          (a
                            ? ' not a boolean or binary digit'
                            : h +
                              (i
                                ? ' or not [' +
                                  (r ? ' negative, positive' : ' integer, integer') +
                                  ' ]'
                                : ''))) +
                      ': ' +
                      t),
                    (r = d = 0),
                    ((s = new Error(h)).name = 'BigNumber Error'),
                    s)
                  );
                }
              }
              function w(t, e, r, n) {
                var i, o, a, s, u, f;
                function h(t, n) {
                  var i,
                    o,
                    a = 0,
                    s = t.length,
                    u = [0];
                  for (n = n || r; a < s; a++) {
                    for (o = u.length, i = 0; i < o; u[i] *= n, i++);
                    for (u[0] += l.indexOf(t.charAt(a)), i = 0; i < u.length; i++)
                      u[i] > e - 1 &&
                        (null == u[i + 1] && (u[i + 1] = 0),
                        (u[i + 1] += (u[i] / e) ^ 0),
                        (u[i] %= e));
                  }
                  return u.reverse();
                }
                function c(t) {
                  for (var e = 0, r = t.length, n = ''; e < r; n += l.charAt(t[e++]));
                  return n;
                }
                if ((r < 37 && (t = t.toLowerCase()), (i = t.indexOf('.')) > -1))
                  if (
                    ((i = t.length - i - 1),
                    (o = h(new g(r).pow(i).toF(), 10)),
                    (a = h((s = t.split('.'))[1])),
                    (s = h(s[0])),
                    (u = (f = m(a, o, a.length - o.length, n, e, 1 & s[s.length - 1])).c),
                    (i = f.e))
                  ) {
                    for (; ++i; u.unshift(0));
                    t = c(s) + '.' + c(u);
                  } else
                    u[0]
                      ? s[(i = s.length - 1)] < e - 1
                        ? (++s[i], (t = c(s)))
                        : (t = new g(c(s), e).plus(v).toS(e))
                      : (t = c(s));
                else t = c(h(t));
                return t;
              }
              function m(t, e, r, i, o, a) {
                var f,
                  h,
                  c,
                  l,
                  d,
                  p = e.slice(),
                  y = (f = e.length),
                  b = t.length,
                  w = t.slice(0, f),
                  m = w.length,
                  _ = new g(v),
                  x = (_.c = []),
                  E = 0,
                  k = n + (_.e = r) + 1;
                for (_.s = i, i = k < 0 ? 0 : k; m++ < f; w.push(0));
                p.unshift(0);
                do {
                  for (c = 0; c < o; c++) {
                    if (f != (m = w.length)) l = f > m ? 1 : -1;
                    else
                      for (d = -1, l = 0; ++d < f; )
                        if (e[d] != w[d]) {
                          l = e[d] > w[d] ? 1 : -1;
                          break;
                        }
                    if (!(l < 0)) break;
                    for (h = m == f ? e : p; m; ) {
                      if (w[--m] < h[m]) {
                        for (d = m; d && !w[--d]; w[d] = o - 1);
                        --w[d], (w[m] += o);
                      }
                      w[m] -= h[m];
                    }
                    for (; !w[0]; w.shift());
                  }
                  (x[E++] = l ? c : ++c), w[0] && l ? (w[m] = t[y] || 0) : (w = [t[y]]);
                } while ((y++ < b || null != w[0]) && i--);
                return (
                  x[0] || 1 == E || (--_.e, x.shift()),
                  E > k && A(_, n, o, a, null != w[0]),
                  _.e > u ? (_.c = _.e = null) : _.e < s && (_.c = [(_.e = 0)]),
                  _
                );
              }
              function _(t, e, r) {
                var n = e - (t = new g(t)).e,
                  i = t.c;
                if (!i) return t.toS();
                for (
                  i.length > ++e && A(t, n, 10), n = 0 == i[0] ? n + 1 : r ? e : t.e + n + 1;
                  i.length < n;
                  i.push(0)
                );
                return (
                  (n = t.e),
                  1 == r || (2 == r && (--e < n || n <= o))
                    ? (t.s < 0 && i[0] ? '-' : '') +
                      (i.length > 1 ? (i.splice(1, 0, '.'), i.join('')) : i[0]) +
                      (n < 0 ? 'e' : 'e+') +
                      n
                    : t.toS()
                );
              }
              function A(t, e, r, n, o) {
                var a = t.c,
                  s = t.s < 0,
                  u = r / 2,
                  f = t.e + e + 1,
                  h = a[f],
                  c = o || f < 0 || null != a[f + 1];
                if (
                  ((o =
                    i < 4
                      ? (null != h || c) && (0 == i || (2 == i && !s) || (3 == i && s))
                      : h > u ||
                        (h == u &&
                          (4 == i ||
                            c ||
                            (6 == i && (1 & a[f - 1] || (!e && n))) ||
                            (7 == i && !s) ||
                            (8 == i && s)))),
                  f < 1 || !a[0])
                )
                  return (a.length = 0), a.push(0), o ? ((a[0] = 1), (t.e = -e)) : (t.e = 0), t;
                if (((a.length = f--), o))
                  for (--r; ++a[f] > r; ) (a[f] = 0), f-- || (++t.e, a.unshift(1));
                for (f = a.length; !a[--f]; a.pop());
                return t;
              }
              function x(t, e, r) {
                var n = i;
                return (i = r), (t = new g(t)).c && A(t, e, 10), (i = n), t;
              }
              (g.ROUND_UP = 0),
                (g.ROUND_DOWN = 1),
                (g.ROUND_CEIL = 2),
                (g.ROUND_FLOOR = 3),
                (g.ROUND_HALF_UP = 4),
                (g.ROUND_HALF_DOWN = 5),
                (g.ROUND_HALF_EVEN = 6),
                (g.ROUND_HALF_CEIL = 7),
                (g.ROUND_HALF_FLOOR = 8),
                (g.fromBuffer = function (t, e) {
                  e || (e = {});
                  var r = { 1: 'big', '-1': 'little' }[e.endian] || e.endian || 'big',
                    n = 'auto' === e.size ? Math.ceil(t.length) : e.size || 1;
                  if (t.length % n != 0)
                    throw new RangeError(
                      'Buffer length (' + t.length + ') must be a multiple of size (' + n + ')',
                    );
                  for (var i = [], o = 0; o < t.length; o += n) {
                    for (var a = [], s = 0; s < n; s++)
                      a.push(t[o + ('big' === r ? s : n - s - 1)]);
                    i.push(
                      a
                        .map(function (t) {
                          return (t < 16 ? '0' : '') + t.toString(16);
                        })
                        .join(''),
                    );
                  }
                  return g(i.join(''), 16);
                }),
                (g.config = function () {
                  var t,
                    e,
                    c = 0,
                    l = {},
                    p = arguments,
                    y = p[0],
                    v = 'config',
                    g = function (t, e, n) {
                      return !((r = t < e || t > n) || (h(t) != t && 0 !== t));
                    },
                    w =
                      y && 'object' == typeof y
                        ? function () {
                            if (y.hasOwnProperty(e)) return null != (t = y[e]);
                          }
                        : function () {
                            if (p.length > c) return null != (t = p[c++]);
                          };
                  return (
                    w((e = 'DECIMAL_PLACES')) && (g(t, 0, 1e9) ? (n = 0 | t) : b(t, e, v)),
                    (l[e] = n),
                    w((e = 'ROUNDING_MODE')) && (g(t, 0, 8) ? (i = 0 | t) : b(t, e, v)),
                    (l[e] = i),
                    w((e = 'EXPONENTIAL_AT')) &&
                      (g(t, -1e9, 1e9)
                        ? (o = -(a = ~~(t < 0 ? -t : +t)))
                        : !r && t && g(t[0], -1e9, 0) && g(t[1], 0, 1e9)
                          ? ((o = ~~t[0]), (a = ~~t[1]))
                          : b(t, e, v, 1)),
                    (l[e] = [o, a]),
                    w((e = 'RANGE')) &&
                      (g(t, -1e9, 1e9) && ~~t
                        ? (s = -(u = ~~(t < 0 ? -t : +t)))
                        : !r && t && g(t[0], -1e9, -1) && g(t[1], 1, 1e9)
                          ? ((s = ~~t[0]), (u = ~~t[1]))
                          : b(t, e, v, 1, 1)),
                    (l[e] = [s, u]),
                    w((e = 'ERRORS')) &&
                      (t === !!t || 1 === t || 0 === t
                        ? ((r = d = 0), (h = (f = !!t) ? parseInt : parseFloat))
                        : b(t, e, v, 0, 0, 1)),
                    (l[e] = f),
                    l
                  );
                }),
                (c.abs = c.absoluteValue =
                  function () {
                    var t = new g(this);
                    return t.s < 0 && (t.s = 1), t;
                  }),
                (c.bitLength = function () {
                  return this.toString(2).length;
                }),
                (c.ceil = function () {
                  return x(this, 0, 2);
                }),
                (c.comparedTo = c.cmp =
                  function (t, e) {
                    var r,
                      n = this,
                      i = n.c,
                      o = ((d = -d), (t = new g(t, e))).c,
                      a = n.s,
                      s = t.s,
                      u = n.e,
                      f = t.e;
                    if (!a || !s) return null;
                    if (((r = i && !i[0]), (e = o && !o[0]), r || e)) return r ? (e ? 0 : -s) : a;
                    if (a != s) return a;
                    if (((r = a < 0), (e = u == f), !i || !o)) return e ? 0 : !i ^ r ? 1 : -1;
                    if (!e) return (u > f) ^ r ? 1 : -1;
                    for (a = -1, s = (u = i.length) < (f = o.length) ? u : f; ++a < s; )
                      if (i[a] != o[a]) return (i[a] > o[a]) ^ r ? 1 : -1;
                    return u == f ? 0 : (u > f) ^ r ? 1 : -1;
                  }),
                (c.dividedBy = c.div =
                  function (t, e) {
                    var r = this.c,
                      n = this.e,
                      i = this.s,
                      o = ((d = 2), (t = new g(t, e))).c,
                      a = t.e,
                      s = t.s,
                      u = i == s ? 1 : -1;
                    return (n || (r && r[0])) && (a || (o && o[0]))
                      ? m(r, o, n - a, u, 10)
                      : new g(
                          i && s && (r ? !o || r[0] != o[0] : o)
                            ? (r && 0 == r[0]) || !o
                              ? 0 * u
                              : u / 0
                            : NaN,
                        );
                  }),
                (c.equals = c.eq =
                  function (t, e) {
                    return (d = 3), 0 === this.cmp(t, e);
                  }),
                (c.floor = function () {
                  return x(this, 0, 3);
                }),
                (c.greaterThan = c.gt =
                  function (t, e) {
                    return (d = 4), this.cmp(t, e) > 0;
                  }),
                (c.greaterThanOrEqualTo =
                  c.gte =
                  c.gt =
                    function (t, e) {
                      return (d = 5), 1 == (e = this.cmp(t, e)) || 0 === e;
                    }),
                (c.isFinite = c.isF =
                  function () {
                    return !!this.c;
                  }),
                (c.isNaN = function () {
                  return !this.s;
                }),
                (c.isNegative = c.isNeg =
                  function () {
                    return this.s < 0;
                  }),
                (c.isZero = c.isZ =
                  function () {
                    return !!this.c && 0 == this.c[0];
                  }),
                (c.lessThan = c.lt =
                  function (t, e) {
                    return (d = 6), this.cmp(t, e) < 0;
                  }),
                (c.lessThanOrEqualTo =
                  c.lte =
                  c.le =
                    function (t, e) {
                      return (d = 7), -1 == (e = this.cmp(t, e)) || 0 === e;
                    }),
                (c.minus = c.sub =
                  function (t, e) {
                    var r,
                      n,
                      o,
                      a,
                      u = this,
                      f = u.s;
                    if (((e = ((d = 8), (t = new g(t, e))).s), !f || !e)) return new g(NaN);
                    if (f != e) return (t.s = -e), u.plus(t);
                    var h = u.c,
                      c = u.e,
                      l = t.c,
                      p = t.e;
                    if (!c || !p) {
                      if (!h || !l) return h ? ((t.s = -e), t) : new g(l ? u : NaN);
                      if (!h[0] || !l[0])
                        return l[0] ? ((t.s = -e), t) : new g(h[0] ? u : 3 == i ? -0 : 0);
                    }
                    if (((h = h.slice()), (f = c - p))) {
                      for (
                        (r = (a = f < 0) ? ((f = -f), h) : ((p = c), l)).reverse(), e = f;
                        e--;
                        r.push(0)
                      );
                      r.reverse();
                    } else
                      for (o = ((a = h.length < l.length) ? h : l).length, f = e = 0; e < o; e++)
                        if (h[e] != l[e]) {
                          a = h[e] < l[e];
                          break;
                        }
                    if (
                      (a && ((r = h), (h = l), (l = r), (t.s = -t.s)),
                      (e = -((o = h.length) - l.length)) > 0)
                    )
                      for (; e--; h[o++] = 0);
                    for (e = l.length; e > f; ) {
                      if (h[--e] < l[e]) {
                        for (n = e; n && !h[--n]; h[n] = 9);
                        --h[n], (h[e] += 10);
                      }
                      h[e] -= l[e];
                    }
                    for (; 0 == h[--o]; h.pop());
                    for (; 0 == h[0]; h.shift(), --p);
                    return (
                      (p < s || !h[0]) && (h[0] || (t.s = 3 == i ? -1 : 1), (h = [(p = 0)])),
                      (t.c = h),
                      (t.e = p),
                      t
                    );
                  }),
                (c.modulo = c.mod =
                  function (t, e) {
                    var r = this,
                      o = r.c,
                      a = ((d = 9), (t = new g(t, e))).c,
                      s = r.s,
                      u = t.s;
                    return (e = !s || !u || (a && !a[0])) || (o && !o[0])
                      ? new g(e ? NaN : r)
                      : ((r.s = t.s = 1),
                        (e = 1 == t.cmp(r)),
                        (r.s = s),
                        (t.s = u),
                        e
                          ? new g(r)
                          : ((s = n),
                            (u = i),
                            (n = 0),
                            (i = 1),
                            (r = r.div(t)),
                            (n = s),
                            (i = u),
                            this.minus(r.times(t))));
                  }),
                (c.negated = c.neg =
                  function () {
                    var t = new g(this);
                    return (t.s = -t.s || null), t;
                  }),
                (c.plus = c.add =
                  function (t, e) {
                    var r,
                      n = this,
                      i = n.s;
                    if (((e = ((d = 10), (t = new g(t, e))).s), !i || !e)) return new g(NaN);
                    if (i != e) return (t.s = -e), n.minus(t);
                    var o = n.e,
                      a = n.c,
                      s = t.e,
                      f = t.c;
                    if (!o || !s) {
                      if (!a || !f) return new g(i / 0);
                      if (!a[0] || !f[0]) return f[0] ? t : new g(a[0] ? n : 0 * i);
                    }
                    if (((a = a.slice()), (i = o - s))) {
                      for ((r = i > 0 ? ((s = o), f) : ((i = -i), a)).reverse(); i--; r.push(0));
                      r.reverse();
                    }
                    for (
                      a.length - f.length < 0 && ((r = f), (f = a), (a = r)), i = f.length, e = 0;
                      i;
                      e = ((a[--i] = a[i] + f[i] + e) / 10) ^ 0, a[i] %= 10
                    );
                    for (
                      e && (a.unshift(e), ++s > u && (a = s = null)), i = a.length;
                      0 == a[--i];
                      a.pop()
                    );
                    return (t.c = a), (t.e = s), t;
                  }),
                (c.toPower = c.pow =
                  function (t) {
                    var e = 0 * t == 0 ? 0 | t : t,
                      n = new g(this),
                      i = new g(v);
                    if (
                      ((((r = t < -1e6 || t > 1e6) && (e = (1 * t) / 0)) ||
                        (h(t) != t && 0 !== t && !(e = NaN))) &&
                        !b(t, 'exponent', 'pow')) ||
                      !e
                    )
                      return new g(Math.pow(n.toS(), e));
                    for (e = e < 0 ? -e : e; 1 & e && (i = i.times(n)), (e >>= 1); ) n = n.times(n);
                    return t < 0 ? v.div(i) : i;
                  }),
                (c.powm = function (t, e) {
                  return this.pow(t).mod(e);
                }),
                (c.round = function (t, e) {
                  return x(
                    this,
                    (t =
                      null == t ||
                      (((r = t < 0 || t > 1e9) || h(t) != t) && !b(t, 'decimal places', 'round'))
                        ? 0
                        : 0 | t),
                    (e =
                      null == e ||
                      (((r = e < 0 || e > 8) || (h(e) != e && 0 !== e)) && !b(e, 'mode', 'round'))
                        ? i
                        : 0 | e),
                  );
                }),
                (c.squareRoot = c.sqrt =
                  function () {
                    var t,
                      e,
                      r,
                      o,
                      a = this,
                      s = a.c,
                      u = a.s,
                      f = a.e,
                      h = n,
                      c = i,
                      l = new g('0.5');
                    if (1 !== u || !s || !s[0])
                      return new g(!u || (u < 0 && (!s || s[0])) ? NaN : s ? a : 1 / 0);
                    for (
                      u = Math.sqrt(a.toS()),
                        i = 1,
                        0 == u || u == 1 / 0
                          ? (((t = s.join('')).length + f) & 1 || (t += '0'),
                            (e = new g(Math.sqrt(t) + '')).c || (e.c = [1]),
                            (e.e = (((f + 1) / 2) | 0) - (f < 0 || 1 & f)))
                          : (e = new g((t = u.toString()))),
                        (u = (r = e.e) + (n += 4)) < 3 && (u = 0),
                        f = u;
                      ;

                    )
                      if (
                        ((o = e),
                        (e = l.times(o.plus(a.div(o)))),
                        o.c.slice(0, u).join('') === e.c.slice(0, u).join(''))
                      ) {
                        if (
                          9 != (s = e.c)[(u -= t && e.e < r)] ||
                          9 != s[u - 1] ||
                          9 != s[u - 2] ||
                          !(9 == s[u - 3] || (t && 4 == s[u - 3]))
                        ) {
                          if (
                            !(
                              s[f] ||
                              s[f - 1] ||
                              s[f - 2] ||
                              (s[f - 3] && 5 != s[f - 3]) ||
                              (s.length > f - 2 && (s.length = f - 2), e.times(e).eq(a))
                            )
                          ) {
                            for (; s.length < f - 3; ) s.push(0);
                            s[f - 3]++;
                          }
                          return (i = c), A(e, (n = h), 10), e;
                        }
                        if (t && 9 == s[u - 3] && (o = e.round(h, 0)).times(o).eq(a))
                          return (i = c), (n = h), o;
                        (n += 4), (u += 4), (t = '');
                      }
                  }),
                (c.times = c.mul =
                  function (t, e) {
                    var r,
                      n = this,
                      i = n.c,
                      o = ((d = 11), (t = new g(t, e))).c,
                      a = n.e,
                      f = t.e,
                      h = n.s;
                    if (
                      ((t.s = h == (e = t.s) ? 1 : -1), !((a || (i && i[0])) && (f || (o && o[0]))))
                    )
                      return new g(
                        !h || !e || (i && !i[0] && !o) || (o && !o[0] && !i)
                          ? NaN
                          : i && o
                            ? 0 * t.s
                            : t.s / 0,
                      );
                    for (
                      t.e = a + f,
                        (h = i.length) < (e = o.length) &&
                          ((r = i), (i = o), (o = r), (f = h), (h = e), (e = f)),
                        f = h + e,
                        r = [];
                      f--;
                      r.push(0)
                    );
                    for (a = e - 1; a > -1; a--) {
                      for (
                        e = 0, f = h + a;
                        f > a;
                        e = r[f] + o[a] * i[f - a - 1] + e, r[f--] = e % 10 | 0, e = (e / 10) | 0
                      );
                      e && (r[f] = (r[f] + e) % 10);
                    }
                    for (e && ++t.e, !r[0] && r.shift(), f = r.length; !r[--f]; r.pop());
                    return (t.c = t.e > u ? (t.e = null) : t.e < s ? [(t.e = 0)] : r), t;
                  }),
                (c.toBuffer = function (e) {
                  if ('string' == typeof e) {
                    if ('mpint' !== e) return 'Unsupported Buffer representation';
                    var r = this.abs(),
                      n =
                        1 === (h = r.toBuffer({ size: 1, endian: 'big' })).length && 0 === h[0]
                          ? 0
                          : h.length;
                    128 & h[0] && n++;
                    var i = new t(4 + n);
                    n > 0 && h.copy(i, 4 + (128 & h[0] ? 1 : 0)),
                      128 & h[0] && (i[4] = 0),
                      (i[0] = n & (255 << 24)),
                      (i[1] = n & (255 << 16)),
                      (i[2] = 65280 & n),
                      (i[3] = 255 & n);
                    var o = this.lt(0);
                    if (o) for (var a = 4; a < i.length; a++) i[a] = 255 - i[a];
                    return (i[4] = (127 & i[4]) | (o ? 128 : 0)), o && i[i.length - 1]++, i;
                  }
                  e || (e = {});
                  var s = { 1: 'big', '-1': 'little' }[e.endian] || e.endian || 'big',
                    u = this.toString(16);
                  if ('-' === u.charAt(0))
                    throw new Error('converting negative numbers to Buffers not supported yet');
                  for (
                    var f = 'auto' === e.size ? Math.ceil(u.length / 2) : e.size || 1,
                      h = ((n = Math.ceil(u.length / (2 * f)) * f), new t(n));
                    u.length < 2 * n;

                  )
                    u = '0' + u;
                  return (
                    u
                      .split(new RegExp('(.{' + 2 * f + '})'))
                      .filter(function (t) {
                        return t.length > 0;
                      })
                      .forEach(function (t, e) {
                        for (var r = 0; r < f; r++) {
                          h[e * f + ('big' === s ? r : f - r - 1)] = parseInt(
                            t.slice(2 * r, 2 * r + 2),
                            16,
                          );
                        }
                      }),
                    h
                  );
                }),
                (c.toExponential = c.toE =
                  function (t) {
                    return _(
                      this,
                      (null == t ||
                        (((r = t < 0 || t > 1e9) || (h(t) != t && 0 !== t)) &&
                          !b(t, 'decimal places', 'toE'))) &&
                        this.c
                        ? this.c.length - 1
                        : 0 | t,
                      1,
                    );
                  }),
                (c.toFixed = c.toF =
                  function (t) {
                    var e,
                      n,
                      i,
                      s = this;
                    return (
                      null == t ||
                        (((r = t < 0 || t > 1e9) || (h(t) != t && 0 !== t)) &&
                          !b(t, 'decimal places', 'toF')) ||
                        (i = s.e + (0 | t)),
                      (e = o),
                      (t = a),
                      (o = -(a = 1 / 0)),
                      i == n
                        ? (n = s.toS())
                        : ((n = _(s, i)),
                          s.s < 0 &&
                            s.c &&
                            (s.c[0]
                              ? n.indexOf('-') < 0 && (n = '-' + n)
                              : (n = n.replace(/^-/, '')))),
                      (o = e),
                      (a = t),
                      n
                    );
                  }),
                (c.toFraction = c.toFr =
                  function (t) {
                    var e,
                      o,
                      a,
                      s,
                      h,
                      c,
                      l,
                      p = (s = new g(v)),
                      y = (a = new g('0')),
                      w = this,
                      m = w.c,
                      _ = u,
                      A = n,
                      x = i,
                      E = new g(v);
                    if (!m) return w.toS();
                    for (
                      l = E.e = m.length - w.e - 1,
                        (null == t ||
                          ((!((d = 12), (c = new g(t))).s ||
                            (r = c.cmp(p) < 0 || !c.c) ||
                            (f && c.e < c.c.length - 1)) &&
                            !b(t, 'max denominator', 'toFr')) ||
                          (t = c).cmp(E) > 0) &&
                          (t = l > 0 ? E : p),
                        u = 1 / 0,
                        c = new g(m.join('')),
                        n = 0,
                        i = 1;
                      (e = c.div(E)), 1 != (h = s.plus(e.times(y))).cmp(t);

                    )
                      (s = y),
                        (y = h),
                        (p = a.plus(e.times((h = p)))),
                        (a = h),
                        (E = c.minus(e.times((h = E)))),
                        (c = h);
                    return (
                      (h = t.minus(s).div(y)),
                      (a = a.plus(h.times(p))),
                      (s = s.plus(h.times(y))),
                      (a.s = p.s = w.s),
                      (n = 2 * l),
                      (i = x),
                      (o =
                        p.div(y).minus(w).abs().cmp(a.div(s).minus(w).abs()) < 1
                          ? [p.toS(), y.toS()]
                          : [a.toS(), s.toS()]),
                      (u = _),
                      (n = A),
                      o
                    );
                  }),
                (c.toPrecision = c.toP =
                  function (t) {
                    return null == t ||
                      (((r = t < 1 || t > 1e9) || h(t) != t) && !b(t, 'precision', 'toP'))
                      ? this.toS()
                      : _(this, 0 | --t, 2);
                  }),
                (c.toString = c.toS =
                  function (t) {
                    var e,
                      n,
                      i,
                      s = this,
                      u = s.e;
                    if (null === u) n = s.s ? 'Infinity' : 'NaN';
                    else {
                      if (t === e && (u <= o || u >= a)) return _(s, s.c.length - 1, 1);
                      if (((n = s.c.join('')), u < 0)) {
                        for (; ++u; n = '0' + n);
                        n = '0.' + n;
                      } else if (((i = n.length), u > 0))
                        if (++u > i) for (u -= i; u--; n += '0');
                        else u < i && (n = n.slice(0, u) + '.' + n.slice(u));
                      else if (((e = n.charAt(0)), i > 1)) n = e + '.' + n.slice(1);
                      else if ('0' == e) return e;
                      if (null != t)
                        if ((r = !(t >= 2 && t < 65)) || (t != (0 | t) && f)) b(t, 'base', 'toS');
                        else if ('0' == (n = w(n, 0 | t, 10, s.s))) return n;
                    }
                    return s.s < 0 ? '-' + n : n;
                  }),
                (c.valueOf = function () {
                  return this.toS();
                }),
                (e.exports = g);
            }).call(this);
          }).call(this, t('buffer').Buffer);
        },
        { buffer: 4 },
      ],
      4: [
        function (t, e, r) {
          'use strict';
          var n = t('base64-js'),
            i = t('ieee754');
          (r.Buffer = s),
            (r.SlowBuffer = function (t) {
              +t != t && (t = 0);
              return s.alloc(+t);
            }),
            (r.INSPECT_MAX_BYTES = 50);
          var o = 2147483647;
          function a(t) {
            if (t > o) throw new RangeError('The value "' + t + '" is invalid for option "size"');
            var e = new Uint8Array(t);
            return (e.__proto__ = s.prototype), e;
          }
          function s(t, e, r) {
            if ('number' == typeof t) {
              if ('string' == typeof e)
                throw new TypeError(
                  'The "string" argument must be of type string. Received type number',
                );
              return h(t);
            }
            return u(t, e, r);
          }
          function u(t, e, r) {
            if ('string' == typeof t)
              return (function (t, e) {
                ('string' == typeof e && '' !== e) || (e = 'utf8');
                if (!s.isEncoding(e)) throw new TypeError('Unknown encoding: ' + e);
                var r = 0 | d(t, e),
                  n = a(r),
                  i = n.write(t, e);
                i !== r && (n = n.slice(0, i));
                return n;
              })(t, e);
            if (ArrayBuffer.isView(t)) return c(t);
            if (null == t)
              throw TypeError(
                'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
                  typeof t,
              );
            if (z(t, ArrayBuffer) || (t && z(t.buffer, ArrayBuffer)))
              return (function (t, e, r) {
                if (e < 0 || t.byteLength < e)
                  throw new RangeError('"offset" is outside of buffer bounds');
                if (t.byteLength < e + (r || 0))
                  throw new RangeError('"length" is outside of buffer bounds');
                var n;
                n =
                  void 0 === e && void 0 === r
                    ? new Uint8Array(t)
                    : void 0 === r
                      ? new Uint8Array(t, e)
                      : new Uint8Array(t, e, r);
                return (n.__proto__ = s.prototype), n;
              })(t, e, r);
            if ('number' == typeof t)
              throw new TypeError(
                'The "value" argument must not be of type number. Received type number',
              );
            var n = t.valueOf && t.valueOf();
            if (null != n && n !== t) return s.from(n, e, r);
            var i = (function (t) {
              if (s.isBuffer(t)) {
                var e = 0 | l(t.length),
                  r = a(e);
                return 0 === r.length ? r : (t.copy(r, 0, 0, e), r);
              }
              if (void 0 !== t.length)
                return 'number' != typeof t.length || P(t.length) ? a(0) : c(t);
              if ('Buffer' === t.type && Array.isArray(t.data)) return c(t.data);
            })(t);
            if (i) return i;
            if (
              'undefined' != typeof Symbol &&
              null != Symbol.toPrimitive &&
              'function' == typeof t[Symbol.toPrimitive]
            )
              return s.from(t[Symbol.toPrimitive]('string'), e, r);
            throw new TypeError(
              'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
                typeof t,
            );
          }
          function f(t) {
            if ('number' != typeof t) throw new TypeError('"size" argument must be of type number');
            if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"');
          }
          function h(t) {
            return f(t), a(t < 0 ? 0 : 0 | l(t));
          }
          function c(t) {
            for (var e = t.length < 0 ? 0 : 0 | l(t.length), r = a(e), n = 0; n < e; n += 1)
              r[n] = 255 & t[n];
            return r;
          }
          function l(t) {
            if (t >= o)
              throw new RangeError(
                'Attempt to allocate Buffer larger than maximum size: 0x' +
                  o.toString(16) +
                  ' bytes',
              );
            return 0 | t;
          }
          function d(t, e) {
            if (s.isBuffer(t)) return t.length;
            if (ArrayBuffer.isView(t) || z(t, ArrayBuffer)) return t.byteLength;
            if ('string' != typeof t)
              throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                  typeof t,
              );
            var r = t.length,
              n = arguments.length > 2 && !0 === arguments[2];
            if (!n && 0 === r) return 0;
            for (var i = !1; ; )
              switch (e) {
                case 'ascii':
                case 'latin1':
                case 'binary':
                  return r;
                case 'utf8':
                case 'utf-8':
                  return M(t).length;
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return 2 * r;
                case 'hex':
                  return r >>> 1;
                case 'base64':
                  return N(t).length;
                default:
                  if (i) return n ? -1 : M(t).length;
                  (e = ('' + e).toLowerCase()), (i = !0);
              }
          }
          function p(t, e, r) {
            var n = t[e];
            (t[e] = t[r]), (t[r] = n);
          }
          function y(t, e, r, n, i) {
            if (0 === t.length) return -1;
            if (
              ('string' == typeof r
                ? ((n = r), (r = 0))
                : r > 2147483647
                  ? (r = 2147483647)
                  : r < -2147483648 && (r = -2147483648),
              P((r = +r)) && (r = i ? 0 : t.length - 1),
              r < 0 && (r = t.length + r),
              r >= t.length)
            ) {
              if (i) return -1;
              r = t.length - 1;
            } else if (r < 0) {
              if (!i) return -1;
              r = 0;
            }
            if (('string' == typeof e && (e = s.from(e, n)), s.isBuffer(e)))
              return 0 === e.length ? -1 : v(t, e, r, n, i);
            if ('number' == typeof e)
              return (
                (e &= 255),
                'function' == typeof Uint8Array.prototype.indexOf
                  ? i
                    ? Uint8Array.prototype.indexOf.call(t, e, r)
                    : Uint8Array.prototype.lastIndexOf.call(t, e, r)
                  : v(t, [e], r, n, i)
              );
            throw new TypeError('val must be string, number or Buffer');
          }
          function v(t, e, r, n, i) {
            var o,
              a = 1,
              s = t.length,
              u = e.length;
            if (
              void 0 !== n &&
              ('ucs2' === (n = String(n).toLowerCase()) ||
                'ucs-2' === n ||
                'utf16le' === n ||
                'utf-16le' === n)
            ) {
              if (t.length < 2 || e.length < 2) return -1;
              (a = 2), (s /= 2), (u /= 2), (r /= 2);
            }
            function f(t, e) {
              return 1 === a ? t[e] : t.readUInt16BE(e * a);
            }
            if (i) {
              var h = -1;
              for (o = r; o < s; o++)
                if (f(t, o) === f(e, -1 === h ? 0 : o - h)) {
                  if ((-1 === h && (h = o), o - h + 1 === u)) return h * a;
                } else -1 !== h && (o -= o - h), (h = -1);
            } else
              for (r + u > s && (r = s - u), o = r; o >= 0; o--) {
                for (var c = !0, l = 0; l < u; l++)
                  if (f(t, o + l) !== f(e, l)) {
                    c = !1;
                    break;
                  }
                if (c) return o;
              }
            return -1;
          }
          function g(t, e, r, n) {
            r = Number(r) || 0;
            var i = t.length - r;
            n ? (n = Number(n)) > i && (n = i) : (n = i);
            var o = e.length;
            n > o / 2 && (n = o / 2);
            for (var a = 0; a < n; ++a) {
              var s = parseInt(e.substr(2 * a, 2), 16);
              if (P(s)) return a;
              t[r + a] = s;
            }
            return a;
          }
          function b(t, e, r, n) {
            return F(M(e, t.length - r), t, r, n);
          }
          function w(t, e, r, n) {
            return F(
              (function (t) {
                for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
                return e;
              })(e),
              t,
              r,
              n,
            );
          }
          function m(t, e, r, n) {
            return w(t, e, r, n);
          }
          function _(t, e, r, n) {
            return F(N(e), t, r, n);
          }
          function A(t, e, r, n) {
            return F(
              (function (t, e) {
                for (var r, n, i, o = [], a = 0; a < t.length && !((e -= 2) < 0); ++a)
                  (r = t.charCodeAt(a)), (n = r >> 8), (i = r % 256), o.push(i), o.push(n);
                return o;
              })(e, t.length - r),
              t,
              r,
              n,
            );
          }
          function x(t, e, r) {
            return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r));
          }
          function E(t, e, r) {
            r = Math.min(t.length, r);
            for (var n = [], i = e; i < r; ) {
              var o,
                a,
                s,
                u,
                f = t[i],
                h = null,
                c = f > 239 ? 4 : f > 223 ? 3 : f > 191 ? 2 : 1;
              if (i + c <= r)
                switch (c) {
                  case 1:
                    f < 128 && (h = f);
                    break;
                  case 2:
                    128 == (192 & (o = t[i + 1])) &&
                      (u = ((31 & f) << 6) | (63 & o)) > 127 &&
                      (h = u);
                    break;
                  case 3:
                    (o = t[i + 1]),
                      (a = t[i + 2]),
                      128 == (192 & o) &&
                        128 == (192 & a) &&
                        (u = ((15 & f) << 12) | ((63 & o) << 6) | (63 & a)) > 2047 &&
                        (u < 55296 || u > 57343) &&
                        (h = u);
                    break;
                  case 4:
                    (o = t[i + 1]),
                      (a = t[i + 2]),
                      (s = t[i + 3]),
                      128 == (192 & o) &&
                        128 == (192 & a) &&
                        128 == (192 & s) &&
                        (u = ((15 & f) << 18) | ((63 & o) << 12) | ((63 & a) << 6) | (63 & s)) >
                          65535 &&
                        u < 1114112 &&
                        (h = u);
                }
              null === h
                ? ((h = 65533), (c = 1))
                : h > 65535 &&
                  ((h -= 65536), n.push(((h >>> 10) & 1023) | 55296), (h = 56320 | (1023 & h))),
                n.push(h),
                (i += c);
            }
            return (function (t) {
              var e = t.length;
              if (e <= k) return String.fromCharCode.apply(String, t);
              var r = '',
                n = 0;
              for (; n < e; ) r += String.fromCharCode.apply(String, t.slice(n, (n += k)));
              return r;
            })(n);
          }
          (r.kMaxLength = o),
            (s.TYPED_ARRAY_SUPPORT = (function () {
              try {
                var t = new Uint8Array(1);
                return (
                  (t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function () {
                      return 42;
                    },
                  }),
                  42 === t.foo()
                );
              } catch (t) {
                return !1;
              }
            })()),
            s.TYPED_ARRAY_SUPPORT ||
              'undefined' == typeof console ||
              'function' != typeof console.error ||
              console.error(
                'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.',
              ),
            Object.defineProperty(s.prototype, 'parent', {
              enumerable: !0,
              get: function () {
                if (s.isBuffer(this)) return this.buffer;
              },
            }),
            Object.defineProperty(s.prototype, 'offset', {
              enumerable: !0,
              get: function () {
                if (s.isBuffer(this)) return this.byteOffset;
              },
            }),
            'undefined' != typeof Symbol &&
              null != Symbol.species &&
              s[Symbol.species] === s &&
              Object.defineProperty(s, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1,
              }),
            (s.poolSize = 8192),
            (s.from = function (t, e, r) {
              return u(t, e, r);
            }),
            (s.prototype.__proto__ = Uint8Array.prototype),
            (s.__proto__ = Uint8Array),
            (s.alloc = function (t, e, r) {
              return (function (t, e, r) {
                return (
                  f(t),
                  t <= 0
                    ? a(t)
                    : void 0 !== e
                      ? 'string' == typeof r
                        ? a(t).fill(e, r)
                        : a(t).fill(e)
                      : a(t)
                );
              })(t, e, r);
            }),
            (s.allocUnsafe = function (t) {
              return h(t);
            }),
            (s.allocUnsafeSlow = function (t) {
              return h(t);
            }),
            (s.isBuffer = function (t) {
              return null != t && !0 === t._isBuffer && t !== s.prototype;
            }),
            (s.compare = function (t, e) {
              if (
                (z(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)),
                z(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)),
                !s.isBuffer(t) || !s.isBuffer(e))
              )
                throw new TypeError(
                  'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
                );
              if (t === e) return 0;
              for (var r = t.length, n = e.length, i = 0, o = Math.min(r, n); i < o; ++i)
                if (t[i] !== e[i]) {
                  (r = t[i]), (n = e[i]);
                  break;
                }
              return r < n ? -1 : n < r ? 1 : 0;
            }),
            (s.isEncoding = function (t) {
              switch (String(t).toLowerCase()) {
                case 'hex':
                case 'utf8':
                case 'utf-8':
                case 'ascii':
                case 'latin1':
                case 'binary':
                case 'base64':
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return !0;
                default:
                  return !1;
              }
            }),
            (s.concat = function (t, e) {
              if (!Array.isArray(t))
                throw new TypeError('"list" argument must be an Array of Buffers');
              if (0 === t.length) return s.alloc(0);
              var r;
              if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
              var n = s.allocUnsafe(e),
                i = 0;
              for (r = 0; r < t.length; ++r) {
                var o = t[r];
                if ((z(o, Uint8Array) && (o = s.from(o)), !s.isBuffer(o)))
                  throw new TypeError('"list" argument must be an Array of Buffers');
                o.copy(n, i), (i += o.length);
              }
              return n;
            }),
            (s.byteLength = d),
            (s.prototype._isBuffer = !0),
            (s.prototype.swap16 = function () {
              var t = this.length;
              if (t % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
              for (var e = 0; e < t; e += 2) p(this, e, e + 1);
              return this;
            }),
            (s.prototype.swap32 = function () {
              var t = this.length;
              if (t % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
              for (var e = 0; e < t; e += 4) p(this, e, e + 3), p(this, e + 1, e + 2);
              return this;
            }),
            (s.prototype.swap64 = function () {
              var t = this.length;
              if (t % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
              for (var e = 0; e < t; e += 8)
                p(this, e, e + 7),
                  p(this, e + 1, e + 6),
                  p(this, e + 2, e + 5),
                  p(this, e + 3, e + 4);
              return this;
            }),
            (s.prototype.toString = function () {
              var t = this.length;
              return 0 === t
                ? ''
                : 0 === arguments.length
                  ? E(this, 0, t)
                  : function (t, e, r) {
                      var n = !1;
                      if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return '';
                      if (((void 0 === r || r > this.length) && (r = this.length), r <= 0))
                        return '';
                      if ((r >>>= 0) <= (e >>>= 0)) return '';
                      for (t || (t = 'utf8'); ; )
                        switch (t) {
                          case 'hex':
                            return C(this, e, r);
                          case 'utf8':
                          case 'utf-8':
                            return E(this, e, r);
                          case 'ascii':
                            return B(this, e, r);
                          case 'latin1':
                          case 'binary':
                            return S(this, e, r);
                          case 'base64':
                            return x(this, e, r);
                          case 'ucs2':
                          case 'ucs-2':
                          case 'utf16le':
                          case 'utf-16le':
                            return U(this, e, r);
                          default:
                            if (n) throw new TypeError('Unknown encoding: ' + t);
                            (t = (t + '').toLowerCase()), (n = !0);
                        }
                    }.apply(this, arguments);
            }),
            (s.prototype.toLocaleString = s.prototype.toString),
            (s.prototype.equals = function (t) {
              if (!s.isBuffer(t)) throw new TypeError('Argument must be a Buffer');
              return this === t || 0 === s.compare(this, t);
            }),
            (s.prototype.inspect = function () {
              var t = '',
                e = r.INSPECT_MAX_BYTES;
              return (
                (t = this.toString('hex', 0, e)
                  .replace(/(.{2})/g, '$1 ')
                  .trim()),
                this.length > e && (t += ' ... '),
                '<Buffer ' + t + '>'
              );
            }),
            (s.prototype.compare = function (t, e, r, n, i) {
              if ((z(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)), !s.isBuffer(t)))
                throw new TypeError(
                  'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                    typeof t,
                );
              if (
                (void 0 === e && (e = 0),
                void 0 === r && (r = t ? t.length : 0),
                void 0 === n && (n = 0),
                void 0 === i && (i = this.length),
                e < 0 || r > t.length || n < 0 || i > this.length)
              )
                throw new RangeError('out of range index');
              if (n >= i && e >= r) return 0;
              if (n >= i) return -1;
              if (e >= r) return 1;
              if (((e >>>= 0), (r >>>= 0), (n >>>= 0), (i >>>= 0), this === t)) return 0;
              for (
                var o = i - n,
                  a = r - e,
                  u = Math.min(o, a),
                  f = this.slice(n, i),
                  h = t.slice(e, r),
                  c = 0;
                c < u;
                ++c
              )
                if (f[c] !== h[c]) {
                  (o = f[c]), (a = h[c]);
                  break;
                }
              return o < a ? -1 : a < o ? 1 : 0;
            }),
            (s.prototype.includes = function (t, e, r) {
              return -1 !== this.indexOf(t, e, r);
            }),
            (s.prototype.indexOf = function (t, e, r) {
              return y(this, t, e, r, !0);
            }),
            (s.prototype.lastIndexOf = function (t, e, r) {
              return y(this, t, e, r, !1);
            }),
            (s.prototype.write = function (t, e, r, n) {
              if (void 0 === e) (n = 'utf8'), (r = this.length), (e = 0);
              else if (void 0 === r && 'string' == typeof e) (n = e), (r = this.length), (e = 0);
              else {
                if (!isFinite(e))
                  throw new Error(
                    'Buffer.write(string, encoding, offset[, length]) is no longer supported',
                  );
                (e >>>= 0),
                  isFinite(r)
                    ? ((r >>>= 0), void 0 === n && (n = 'utf8'))
                    : ((n = r), (r = void 0));
              }
              var i = this.length - e;
              if (
                ((void 0 === r || r > i) && (r = i),
                (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
              )
                throw new RangeError('Attempt to write outside buffer bounds');
              n || (n = 'utf8');
              for (var o = !1; ; )
                switch (n) {
                  case 'hex':
                    return g(this, t, e, r);
                  case 'utf8':
                  case 'utf-8':
                    return b(this, t, e, r);
                  case 'ascii':
                    return w(this, t, e, r);
                  case 'latin1':
                  case 'binary':
                    return m(this, t, e, r);
                  case 'base64':
                    return _(this, t, e, r);
                  case 'ucs2':
                  case 'ucs-2':
                  case 'utf16le':
                  case 'utf-16le':
                    return A(this, t, e, r);
                  default:
                    if (o) throw new TypeError('Unknown encoding: ' + n);
                    (n = ('' + n).toLowerCase()), (o = !0);
                }
            }),
            (s.prototype.toJSON = function () {
              return {
                type: 'Buffer',
                data: Array.prototype.slice.call(this._arr || this, 0),
              };
            });
          var k = 4096;
          function B(t, e, r) {
            var n = '';
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
            return n;
          }
          function S(t, e, r) {
            var n = '';
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);
            return n;
          }
          function C(t, e, r) {
            var n = t.length;
            (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
            for (var i = '', o = e; o < r; ++o) i += H(t[o]);
            return i;
          }
          function U(t, e, r) {
            for (var n = t.slice(e, r), i = '', o = 0; o < n.length; o += 2)
              i += String.fromCharCode(n[o] + 256 * n[o + 1]);
            return i;
          }
          function T(t, e, r) {
            if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint');
            if (t + e > r) throw new RangeError('Trying to access beyond buffer length');
          }
          function L(t, e, r, n, i, o) {
            if (!s.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
            if (r + n > t.length) throw new RangeError('Index out of range');
          }
          function O(t, e, r, n, i, o) {
            if (r + n > t.length) throw new RangeError('Index out of range');
            if (r < 0) throw new RangeError('Index out of range');
          }
          function I(t, e, r, n, o) {
            return (e = +e), (r >>>= 0), o || O(t, 0, r, 4), i.write(t, e, r, n, 23, 4), r + 4;
          }
          function R(t, e, r, n, o) {
            return (e = +e), (r >>>= 0), o || O(t, 0, r, 8), i.write(t, e, r, n, 52, 8), r + 8;
          }
          (s.prototype.slice = function (t, e) {
            var r = this.length;
            (t = ~~t),
              (e = void 0 === e ? r : ~~e),
              t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
              e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
              e < t && (e = t);
            var n = this.subarray(t, e);
            return (n.__proto__ = s.prototype), n;
          }),
            (s.prototype.readUIntLE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
              for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); ) n += this[t + o] * i;
              return n;
            }),
            (s.prototype.readUIntBE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
              for (var n = this[t + --e], i = 1; e > 0 && (i *= 256); ) n += this[t + --e] * i;
              return n;
            }),
            (s.prototype.readUInt8 = function (t, e) {
              return (t >>>= 0), e || T(t, 1, this.length), this[t];
            }),
            (s.prototype.readUInt16LE = function (t, e) {
              return (t >>>= 0), e || T(t, 2, this.length), this[t] | (this[t + 1] << 8);
            }),
            (s.prototype.readUInt16BE = function (t, e) {
              return (t >>>= 0), e || T(t, 2, this.length), (this[t] << 8) | this[t + 1];
            }),
            (s.prototype.readUInt32LE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
              );
            }),
            (s.prototype.readUInt32BE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
              );
            }),
            (s.prototype.readIntLE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
              for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); ) n += this[t + o] * i;
              return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n;
            }),
            (s.prototype.readIntBE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
              for (var n = e, i = 1, o = this[t + --n]; n > 0 && (i *= 256); )
                o += this[t + --n] * i;
              return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
            }),
            (s.prototype.readInt8 = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 1, this.length),
                128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
              );
            }),
            (s.prototype.readInt16LE = function (t, e) {
              (t >>>= 0), e || T(t, 2, this.length);
              var r = this[t] | (this[t + 1] << 8);
              return 32768 & r ? 4294901760 | r : r;
            }),
            (s.prototype.readInt16BE = function (t, e) {
              (t >>>= 0), e || T(t, 2, this.length);
              var r = this[t + 1] | (this[t] << 8);
              return 32768 & r ? 4294901760 | r : r;
            }),
            (s.prototype.readInt32LE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
              );
            }),
            (s.prototype.readInt32BE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
              );
            }),
            (s.prototype.readFloatLE = function (t, e) {
              return (t >>>= 0), e || T(t, 4, this.length), i.read(this, t, !0, 23, 4);
            }),
            (s.prototype.readFloatBE = function (t, e) {
              return (t >>>= 0), e || T(t, 4, this.length), i.read(this, t, !1, 23, 4);
            }),
            (s.prototype.readDoubleLE = function (t, e) {
              return (t >>>= 0), e || T(t, 8, this.length), i.read(this, t, !0, 52, 8);
            }),
            (s.prototype.readDoubleBE = function (t, e) {
              return (t >>>= 0), e || T(t, 8, this.length), i.read(this, t, !1, 52, 8);
            }),
            (s.prototype.writeUIntLE = function (t, e, r, n) {
              ((t = +t), (e >>>= 0), (r >>>= 0), n) || L(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
              var i = 1,
                o = 0;
              for (this[e] = 255 & t; ++o < r && (i *= 256); ) this[e + o] = (t / i) & 255;
              return e + r;
            }),
            (s.prototype.writeUIntBE = function (t, e, r, n) {
              ((t = +t), (e >>>= 0), (r >>>= 0), n) || L(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
              var i = r - 1,
                o = 1;
              for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); ) this[e + i] = (t / o) & 255;
              return e + r;
            }),
            (s.prototype.writeUInt8 = function (t, e, r) {
              return (
                (t = +t), (e >>>= 0), r || L(this, t, e, 1, 255, 0), (this[e] = 255 & t), e + 1
              );
            }),
            (s.prototype.writeUInt16LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || L(this, t, e, 2, 65535, 0),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
            (s.prototype.writeUInt16BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || L(this, t, e, 2, 65535, 0),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
            (s.prototype.writeUInt32LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || L(this, t, e, 4, 4294967295, 0),
                (this[e + 3] = t >>> 24),
                (this[e + 2] = t >>> 16),
                (this[e + 1] = t >>> 8),
                (this[e] = 255 & t),
                e + 4
              );
            }),
            (s.prototype.writeUInt32BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || L(this, t, e, 4, 4294967295, 0),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
            (s.prototype.writeIntLE = function (t, e, r, n) {
              if (((t = +t), (e >>>= 0), !n)) {
                var i = Math.pow(2, 8 * r - 1);
                L(this, t, e, r, i - 1, -i);
              }
              var o = 0,
                a = 1,
                s = 0;
              for (this[e] = 255 & t; ++o < r && (a *= 256); )
                t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1),
                  (this[e + o] = (((t / a) >> 0) - s) & 255);
              return e + r;
            }),
            (s.prototype.writeIntBE = function (t, e, r, n) {
              if (((t = +t), (e >>>= 0), !n)) {
                var i = Math.pow(2, 8 * r - 1);
                L(this, t, e, r, i - 1, -i);
              }
              var o = r - 1,
                a = 1,
                s = 0;
              for (this[e + o] = 255 & t; --o >= 0 && (a *= 256); )
                t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1),
                  (this[e + o] = (((t / a) >> 0) - s) & 255);
              return e + r;
            }),
            (s.prototype.writeInt8 = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || L(this, t, e, 1, 127, -128),
                t < 0 && (t = 255 + t + 1),
                (this[e] = 255 & t),
                e + 1
              );
            }),
            (s.prototype.writeInt16LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || L(this, t, e, 2, 32767, -32768),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
            (s.prototype.writeInt16BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || L(this, t, e, 2, 32767, -32768),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
            (s.prototype.writeInt32LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || L(this, t, e, 4, 2147483647, -2147483648),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                (this[e + 2] = t >>> 16),
                (this[e + 3] = t >>> 24),
                e + 4
              );
            }),
            (s.prototype.writeInt32BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || L(this, t, e, 4, 2147483647, -2147483648),
                t < 0 && (t = 4294967295 + t + 1),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
            (s.prototype.writeFloatLE = function (t, e, r) {
              return I(this, t, e, !0, r);
            }),
            (s.prototype.writeFloatBE = function (t, e, r) {
              return I(this, t, e, !1, r);
            }),
            (s.prototype.writeDoubleLE = function (t, e, r) {
              return R(this, t, e, !0, r);
            }),
            (s.prototype.writeDoubleBE = function (t, e, r) {
              return R(this, t, e, !1, r);
            }),
            (s.prototype.copy = function (t, e, r, n) {
              if (!s.isBuffer(t)) throw new TypeError('argument should be a Buffer');
              if (
                (r || (r = 0),
                n || 0 === n || (n = this.length),
                e >= t.length && (e = t.length),
                e || (e = 0),
                n > 0 && n < r && (n = r),
                n === r)
              )
                return 0;
              if (0 === t.length || 0 === this.length) return 0;
              if (e < 0) throw new RangeError('targetStart out of bounds');
              if (r < 0 || r >= this.length) throw new RangeError('Index out of range');
              if (n < 0) throw new RangeError('sourceEnd out of bounds');
              n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
              var i = n - r;
              if (this === t && 'function' == typeof Uint8Array.prototype.copyWithin)
                this.copyWithin(e, r, n);
              else if (this === t && r < e && e < n)
                for (var o = i - 1; o >= 0; --o) t[o + e] = this[o + r];
              else Uint8Array.prototype.set.call(t, this.subarray(r, n), e);
              return i;
            }),
            (s.prototype.fill = function (t, e, r, n) {
              if ('string' == typeof t) {
                if (
                  ('string' == typeof e
                    ? ((n = e), (e = 0), (r = this.length))
                    : 'string' == typeof r && ((n = r), (r = this.length)),
                  void 0 !== n && 'string' != typeof n)
                )
                  throw new TypeError('encoding must be a string');
                if ('string' == typeof n && !s.isEncoding(n))
                  throw new TypeError('Unknown encoding: ' + n);
                if (1 === t.length) {
                  var i = t.charCodeAt(0);
                  (('utf8' === n && i < 128) || 'latin1' === n) && (t = i);
                }
              } else 'number' == typeof t && (t &= 255);
              if (e < 0 || this.length < e || this.length < r)
                throw new RangeError('Out of range index');
              if (r <= e) return this;
              var o;
              if (
                ((e >>>= 0),
                (r = void 0 === r ? this.length : r >>> 0),
                t || (t = 0),
                'number' == typeof t)
              )
                for (o = e; o < r; ++o) this[o] = t;
              else {
                var a = s.isBuffer(t) ? t : s.from(t, n),
                  u = a.length;
                if (0 === u)
                  throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                for (o = 0; o < r - e; ++o) this[o + e] = a[o % u];
              }
              return this;
            });
          var j = /[^+/0-9A-Za-z-_]/g;
          function H(t) {
            return t < 16 ? '0' + t.toString(16) : t.toString(16);
          }
          function M(t, e) {
            var r;
            e = e || 1 / 0;
            for (var n = t.length, i = null, o = [], a = 0; a < n; ++a) {
              if ((r = t.charCodeAt(a)) > 55295 && r < 57344) {
                if (!i) {
                  if (r > 56319) {
                    (e -= 3) > -1 && o.push(239, 191, 189);
                    continue;
                  }
                  if (a + 1 === n) {
                    (e -= 3) > -1 && o.push(239, 191, 189);
                    continue;
                  }
                  i = r;
                  continue;
                }
                if (r < 56320) {
                  (e -= 3) > -1 && o.push(239, 191, 189), (i = r);
                  continue;
                }
                r = 65536 + (((i - 55296) << 10) | (r - 56320));
              } else i && (e -= 3) > -1 && o.push(239, 191, 189);
              if (((i = null), r < 128)) {
                if ((e -= 1) < 0) break;
                o.push(r);
              } else if (r < 2048) {
                if ((e -= 2) < 0) break;
                o.push((r >> 6) | 192, (63 & r) | 128);
              } else if (r < 65536) {
                if ((e -= 3) < 0) break;
                o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
              } else {
                if (!(r < 1114112)) throw new Error('Invalid code point');
                if ((e -= 4) < 0) break;
                o.push(
                  (r >> 18) | 240,
                  ((r >> 12) & 63) | 128,
                  ((r >> 6) & 63) | 128,
                  (63 & r) | 128,
                );
              }
            }
            return o;
          }
          function N(t) {
            return n.toByteArray(
              (function (t) {
                if ((t = (t = t.split('=')[0]).trim().replace(j, '')).length < 2) return '';
                for (; t.length % 4 != 0; ) t += '=';
                return t;
              })(t),
            );
          }
          function F(t, e, r, n) {
            for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i];
            return i;
          }
          function z(t, e) {
            return (
              t instanceof e ||
              (null != t &&
                null != t.constructor &&
                null != t.constructor.name &&
                t.constructor.name === e.name)
            );
          }
          function P(t) {
            return t != t;
          }
        },
        { 'base64-js': 2, ieee754: 31 },
      ],
      5: [
        function (t, e, r) {
          !(function (t, r) {
            'use strict';
            var n = Math.pow(2, -24),
              i = Math.pow(2, 32),
              o = Math.pow(2, 53);
            var a = {
              encode: function (t) {
                var e,
                  n = new ArrayBuffer(256),
                  a = new DataView(n),
                  s = 0;
                function u(t) {
                  for (var r = n.byteLength, i = s + t; r < i; ) r *= 2;
                  if (r !== n.byteLength) {
                    var o = a;
                    (n = new ArrayBuffer(r)), (a = new DataView(n));
                    for (var u = (s + 3) >> 2, f = 0; f < u; ++f)
                      a.setUint32(4 * f, o.getUint32(4 * f));
                  }
                  return (e = t), a;
                }
                function f() {
                  s += e;
                }
                function h(t) {
                  f(u(1).setUint8(s, t));
                }
                function c(t) {
                  for (var e = u(t.length), r = 0; r < t.length; ++r) e.setUint8(s + r, t[r]);
                  f();
                }
                function l(t, e) {
                  var r;
                  e < 24
                    ? h((t << 5) | e)
                    : e < 256
                      ? (h((t << 5) | 24), h(e))
                      : e < 65536
                        ? (h((t << 5) | 25), (r = e), f(u(2).setUint16(s, r)))
                        : e < 4294967296
                          ? (h((t << 5) | 26),
                            (function (t) {
                              f(u(4).setUint32(s, t));
                            })(e))
                          : (h((t << 5) | 27),
                            (function (t) {
                              var e = t % i,
                                r = (t - e) / i,
                                n = u(8);
                              n.setUint32(s, r), n.setUint32(s + 4, e), f();
                            })(e));
                }
                if (
                  ((function t(e) {
                    var n;
                    if (!1 === e) return h(244);
                    if (!0 === e) return h(245);
                    if (null === e) return h(246);
                    if (e === r) return h(247);
                    switch (typeof e) {
                      case 'number':
                        if (Math.floor(e) === e) {
                          if (0 <= e && e <= o) return l(0, e);
                          if (-o <= e && e < 0) return l(1, -(e + 1));
                        }
                        return (
                          h(251),
                          (function (t) {
                            f(u(8).setFloat64(s, t));
                          })(e)
                        );
                      case 'string':
                        var i = [];
                        for (n = 0; n < e.length; ++n) {
                          var a = e.charCodeAt(n);
                          a < 128
                            ? i.push(a)
                            : a < 2048
                              ? (i.push(192 | (a >> 6)), i.push(128 | (63 & a)))
                              : a < 55296
                                ? (i.push(224 | (a >> 12)),
                                  i.push(128 | ((a >> 6) & 63)),
                                  i.push(128 | (63 & a)))
                                : ((a = (1023 & a) << 10),
                                  (a |= 1023 & e.charCodeAt(++n)),
                                  (a += 65536),
                                  i.push(240 | (a >> 18)),
                                  i.push(128 | ((a >> 12) & 63)),
                                  i.push(128 | ((a >> 6) & 63)),
                                  i.push(128 | (63 & a)));
                        }
                        return l(3, i.length), c(i);
                      default:
                        var d;
                        if (Array.isArray(e)) for (l(4, (d = e.length)), n = 0; n < d; ++n) t(e[n]);
                        else if (e instanceof Uint8Array) l(2, e.length), c(e);
                        else {
                          var p = Object.keys(e);
                          for (l(5, (d = p.length)), n = 0; n < d; ++n) {
                            var y = p[n];
                            t(y), t(e[y]);
                          }
                        }
                    }
                  })(t),
                  'slice' in n)
                )
                  return n.slice(0, s);
                for (var d = new ArrayBuffer(s), p = new DataView(d), y = 0; y < s; ++y)
                  p.setUint8(y, a.getUint8(y));
                return d;
              },
              decode: function (t, e, o) {
                var a = new DataView(t),
                  s = 0;
                function u(t, e) {
                  return (s += e), t;
                }
                function f(e) {
                  return u(new Uint8Array(t, s, e), e);
                }
                function h() {
                  return u(a.getUint8(s), 1);
                }
                function c() {
                  return u(a.getUint16(s), 2);
                }
                function l() {
                  return u(a.getUint32(s), 4);
                }
                function d() {
                  return 255 === a.getUint8(s) && ((s += 1), !0);
                }
                function p(t) {
                  if (t < 24) return t;
                  if (24 === t) return h();
                  if (25 === t) return c();
                  if (26 === t) return l();
                  if (27 === t) return l() * i + l();
                  if (31 === t) return -1;
                  throw 'Invalid length encoding';
                }
                function y(t) {
                  var e = h();
                  if (255 === e) return -1;
                  var r = p(31 & e);
                  if (r < 0 || e >> 5 !== t) throw 'Invalid indefinite length element';
                  return r;
                }
                function v(t, e) {
                  for (var r = 0; r < e; ++r) {
                    var n = h();
                    128 & n &&
                      (n < 224
                        ? ((n = ((31 & n) << 6) | (63 & h())), (e -= 1))
                        : n < 240
                          ? ((n = ((15 & n) << 12) | ((63 & h()) << 6) | (63 & h())), (e -= 2))
                          : ((n =
                              ((15 & n) << 18) |
                              ((63 & h()) << 12) |
                              ((63 & h()) << 6) |
                              (63 & h())),
                            (e -= 3))),
                      n < 65536
                        ? t.push(n)
                        : ((n -= 65536), t.push(55296 | (n >> 10)), t.push(56320 | (1023 & n)));
                  }
                }
                'function' != typeof e &&
                  (e = function (t) {
                    return t;
                  }),
                  'function' != typeof o &&
                    (o = function () {
                      return r;
                    });
                var g = (function t() {
                  var i,
                    l,
                    g = h(),
                    b = g >> 5,
                    w = 31 & g;
                  if (7 === b)
                    switch (w) {
                      case 25:
                        return (function () {
                          var t = new ArrayBuffer(4),
                            e = new DataView(t),
                            r = c(),
                            i = 32768 & r,
                            o = 31744 & r,
                            a = 1023 & r;
                          if (31744 === o) o = 261120;
                          else if (0 !== o) o += 114688;
                          else if (0 !== a) return a * n;
                          return e.setUint32(0, (i << 16) | (o << 13) | (a << 13)), e.getFloat32(0);
                        })();
                      case 26:
                        return u(a.getFloat32(s), 4);
                      case 27:
                        return u(a.getFloat64(s), 8);
                    }
                  if ((l = p(w)) < 0 && (b < 2 || 6 < b)) throw 'Invalid length';
                  switch (b) {
                    case 0:
                      return l;
                    case 1:
                      return -1 - l;
                    case 2:
                      if (l < 0) {
                        for (var m = [], _ = 0; (l = y(b)) >= 0; ) (_ += l), m.push(f(l));
                        var A = new Uint8Array(_),
                          x = 0;
                        for (i = 0; i < m.length; ++i) A.set(m[i], x), (x += m[i].length);
                        return A;
                      }
                      return f(l);
                    case 3:
                      var E = [];
                      if (l < 0) for (; (l = y(b)) >= 0; ) v(E, l);
                      else v(E, l);
                      return String.fromCharCode.apply(null, E);
                    case 4:
                      var k;
                      if (l < 0) for (k = []; !d(); ) k.push(t());
                      else for (k = new Array(l), i = 0; i < l; ++i) k[i] = t();
                      return k;
                    case 5:
                      var B = {};
                      for (i = 0; i < l || (l < 0 && !d()); ++i) B[t()] = t();
                      return B;
                    case 6:
                      return e(t(), l);
                    case 7:
                      switch (l) {
                        case 20:
                          return !1;
                        case 21:
                          return !0;
                        case 22:
                          return null;
                        case 23:
                          return r;
                        default:
                          return o(l);
                      }
                  }
                })();
                if (s !== t.byteLength) throw 'Remaining bytes';
                return g;
              },
            };
            void 0 !== e && e.exports ? (e.exports = a) : t.CBOR || (t.CBOR = a);
          })(this);
        },
        {},
      ],
      6: [
        function (t, e, r) {
          'use strict';
          e.exports = t('./es6/crc1').default;
        },
        { './es6/crc1': 17 },
      ],
      7: [
        function (t, e, r) {
          'use strict';
          e.exports = t('./es6/crc16').default;
        },
        { './es6/crc16': 18 },
      ],
      8: [
        function (t, e, r) {
          'use strict';
          e.exports = t('./es6/crc16ccitt').default;
        },
        { './es6/crc16ccitt': 19 },
      ],
      9: [
        function (t, e, r) {
          'use strict';
          e.exports = t('./es6/crc16kermit').default;
        },
        { './es6/crc16kermit': 20 },
      ],
      10: [
        function (t, e, r) {
          'use strict';
          e.exports = t('./es6/crc16modbus').default;
        },
        { './es6/crc16modbus': 21 },
      ],
      11: [
        function (t, e, r) {
          'use strict';
          e.exports = t('./es6/crc16xmodem').default;
        },
        { './es6/crc16xmodem': 22 },
      ],
      12: [
        function (t, e, r) {
          'use strict';
          e.exports = t('./es6/crc24').default;
        },
        { './es6/crc24': 23 },
      ],
      13: [
        function (t, e, r) {
          'use strict';
          e.exports = t('./es6/crc32').default;
        },
        { './es6/crc32': 24 },
      ],
      14: [
        function (t, e, r) {
          'use strict';
          e.exports = t('./es6/crc8').default;
        },
        { './es6/crc8': 25 },
      ],
      15: [
        function (t, e, r) {
          'use strict';
          e.exports = t('./es6/crc81wire').default;
        },
        { './es6/crc81wire': 26 },
      ],
      16: [
        function (t, e, r) {
          'use strict';
          e.exports = t('./es6/crcjam').default;
        },
        { './es6/crcjam': 27 },
      ],
      17: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i = o(t('./create_buffer'));
          function o(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var a = (0, o(t('./define_crc')).default)('crc1', function (t, e) {
            n.Buffer.isBuffer(t) || (t = (0, i.default)(t));
            for (var r = ~~e, o = 0, a = 0; a < t.length; a++) {
              o += t[a];
            }
            return (r += o % 256) % 256;
          });
          r.default = a;
        },
        { './create_buffer': 28, './define_crc': 29, buffer: 4 },
      ],
      18: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i = a(t('./create_buffer')),
            o = a(t('./define_crc'));
          function a(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var s = [
            0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625,
            50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648, 2560, 51905, 52097,
            2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720,
            7680, 57025, 57217, 8e3, 56577, 7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041,
            6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480,
            12672, 61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760,
            13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3, 65089, 64001, 15040,
            15232, 64321, 14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200,
            10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600,
            58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409,
            40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881, 26432,
            42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609,
            43521, 27328, 27520, 43841, 26880, 43457, 43137, 26688, 30720, 47297, 47489, 31040,
            47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32e3, 48577, 48257, 31808,
            46081, 29888, 30080, 46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504,
            45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441,
            38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257,
            24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977,
            34817, 18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288,
            36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369,
            33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448,
          ];
          'undefined' != typeof Int32Array && (s = new Int32Array(s));
          var u = (0, o.default)('crc-16', function (t, e) {
            n.Buffer.isBuffer(t) || (t = (0, i.default)(t));
            for (var r = ~~e, o = 0; o < t.length; o++) {
              var a = t[o];
              r = 65535 & (s[255 & (r ^ a)] ^ (r >> 8));
            }
            return r;
          });
          r.default = u;
        },
        { './create_buffer': 28, './define_crc': 29, buffer: 4 },
      ],
      19: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i = a(t('./create_buffer')),
            o = a(t('./define_crc'));
          function a(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var s = [
            0, 4129, 8258, 12387, 16516, 20645, 24774, 28903, 33032, 37161, 41290, 45419, 49548,
            53677, 57806, 61935, 4657, 528, 12915, 8786, 21173, 17044, 29431, 25302, 37689, 33560,
            45947, 41818, 54205, 50076, 62463, 58334, 9314, 13379, 1056, 5121, 25830, 29895, 17572,
            21637, 42346, 46411, 34088, 38153, 58862, 62927, 50604, 54669, 13907, 9842, 5649, 1584,
            30423, 26358, 22165, 18100, 46939, 42874, 38681, 34616, 63455, 59390, 55197, 51132,
            18628, 22757, 26758, 30887, 2112, 6241, 10242, 14371, 51660, 55789, 59790, 63919, 35144,
            39273, 43274, 47403, 23285, 19156, 31415, 27286, 6769, 2640, 14899, 10770, 56317, 52188,
            64447, 60318, 39801, 35672, 47931, 43802, 27814, 31879, 19684, 23749, 11298, 15363,
            3168, 7233, 60846, 64911, 52716, 56781, 44330, 48395, 36200, 40265, 32407, 28342, 24277,
            20212, 15891, 11826, 7761, 3696, 65439, 61374, 57309, 53244, 48923, 44858, 40793, 36728,
            37256, 33193, 45514, 41451, 53516, 49453, 61774, 57711, 4224, 161, 12482, 8419, 20484,
            16421, 28742, 24679, 33721, 37784, 41979, 46042, 49981, 54044, 58239, 62302, 689, 4752,
            8947, 13010, 16949, 21012, 25207, 29270, 46570, 42443, 38312, 34185, 62830, 58703,
            54572, 50445, 13538, 9411, 5280, 1153, 29798, 25671, 21540, 17413, 42971, 47098, 34713,
            38840, 59231, 63358, 50973, 55100, 9939, 14066, 1681, 5808, 26199, 30326, 17941, 22068,
            55628, 51565, 63758, 59695, 39368, 35305, 47498, 43435, 22596, 18533, 30726, 26663,
            6336, 2273, 14466, 10403, 52093, 56156, 60223, 64286, 35833, 39896, 43963, 48026, 19061,
            23124, 27191, 31254, 2801, 6864, 10931, 14994, 64814, 60687, 56684, 52557, 48554, 44427,
            40424, 36297, 31782, 27655, 23652, 19525, 15522, 11395, 7392, 3265, 61215, 65342, 53085,
            57212, 44955, 49082, 36825, 40952, 28183, 32310, 20053, 24180, 11923, 16050, 3793, 7920,
          ];
          'undefined' != typeof Int32Array && (s = new Int32Array(s));
          var u = (0, o.default)('ccitt', function (t, e) {
            n.Buffer.isBuffer(t) || (t = (0, i.default)(t));
            for (var r = void 0 !== e ? ~~e : 65535, o = 0; o < t.length; o++) {
              var a = t[o];
              r = 65535 & (s[255 & ((r >> 8) ^ a)] ^ (r << 8));
            }
            return r;
          });
          r.default = u;
        },
        { './create_buffer': 28, './define_crc': 29, buffer: 4 },
      ],
      20: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i = a(t('./create_buffer')),
            o = a(t('./define_crc'));
          function a(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var s = [
            0, 4489, 8978, 12955, 17956, 22445, 25910, 29887, 35912, 40385, 44890, 48851, 51820,
            56293, 59774, 63735, 4225, 264, 13203, 8730, 22181, 18220, 30135, 25662, 40137, 36160,
            49115, 44626, 56045, 52068, 63999, 59510, 8450, 12427, 528, 5017, 26406, 30383, 17460,
            21949, 44362, 48323, 36440, 40913, 60270, 64231, 51324, 55797, 12675, 8202, 4753, 792,
            30631, 26158, 21685, 17724, 48587, 44098, 40665, 36688, 64495, 60006, 55549, 51572,
            16900, 21389, 24854, 28831, 1056, 5545, 10034, 14011, 52812, 57285, 60766, 64727, 34920,
            39393, 43898, 47859, 21125, 17164, 29079, 24606, 5281, 1320, 14259, 9786, 57037, 53060,
            64991, 60502, 39145, 35168, 48123, 43634, 25350, 29327, 16404, 20893, 9506, 13483, 1584,
            6073, 61262, 65223, 52316, 56789, 43370, 47331, 35448, 39921, 29575, 25102, 20629,
            16668, 13731, 9258, 5809, 1848, 65487, 60998, 56541, 52564, 47595, 43106, 39673, 35696,
            33800, 38273, 42778, 46739, 49708, 54181, 57662, 61623, 2112, 6601, 11090, 15067, 20068,
            24557, 28022, 31999, 38025, 34048, 47003, 42514, 53933, 49956, 61887, 57398, 6337, 2376,
            15315, 10842, 24293, 20332, 32247, 27774, 42250, 46211, 34328, 38801, 58158, 62119,
            49212, 53685, 10562, 14539, 2640, 7129, 28518, 32495, 19572, 24061, 46475, 41986, 38553,
            34576, 62383, 57894, 53437, 49460, 14787, 10314, 6865, 2904, 32743, 28270, 23797, 19836,
            50700, 55173, 58654, 62615, 32808, 37281, 41786, 45747, 19012, 23501, 26966, 30943,
            3168, 7657, 12146, 16123, 54925, 50948, 62879, 58390, 37033, 33056, 46011, 41522, 23237,
            19276, 31191, 26718, 7393, 3432, 16371, 11898, 59150, 63111, 50204, 54677, 41258, 45219,
            33336, 37809, 27462, 31439, 18516, 23005, 11618, 15595, 3696, 8185, 63375, 58886, 54429,
            50452, 45483, 40994, 37561, 33584, 31687, 27214, 22741, 18780, 15843, 11370, 7921, 3960,
          ];
          'undefined' != typeof Int32Array && (s = new Int32Array(s));
          var u = (0, o.default)('kermit', function (t, e) {
            n.Buffer.isBuffer(t) || (t = (0, i.default)(t));
            for (var r = void 0 !== e ? ~~e : 0, o = 0; o < t.length; o++) {
              var a = t[o];
              r = 65535 & (s[255 & (r ^ a)] ^ (r >> 8));
            }
            return r;
          });
          r.default = u;
        },
        { './create_buffer': 28, './define_crc': 29, buffer: 4 },
      ],
      21: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i = a(t('./create_buffer')),
            o = a(t('./define_crc'));
          function a(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var s = [
            0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625,
            50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648, 2560, 51905, 52097,
            2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720,
            7680, 57025, 57217, 8e3, 56577, 7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041,
            6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480,
            12672, 61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760,
            13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3, 65089, 64001, 15040,
            15232, 64321, 14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200,
            10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600,
            58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409,
            40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881, 26432,
            42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609,
            43521, 27328, 27520, 43841, 26880, 43457, 43137, 26688, 30720, 47297, 47489, 31040,
            47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32e3, 48577, 48257, 31808,
            46081, 29888, 30080, 46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504,
            45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441,
            38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257,
            24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977,
            34817, 18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288,
            36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369,
            33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448,
          ];
          'undefined' != typeof Int32Array && (s = new Int32Array(s));
          var u = (0, o.default)('crc-16-modbus', function (t, e) {
            n.Buffer.isBuffer(t) || (t = (0, i.default)(t));
            for (var r = void 0 !== e ? ~~e : 65535, o = 0; o < t.length; o++) {
              var a = t[o];
              r = 65535 & (s[255 & (r ^ a)] ^ (r >> 8));
            }
            return r;
          });
          r.default = u;
        },
        { './create_buffer': 28, './define_crc': 29, buffer: 4 },
      ],
      22: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i = o(t('./create_buffer'));
          function o(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var a = (0, o(t('./define_crc')).default)('xmodem', function (t, e) {
            n.Buffer.isBuffer(t) || (t = (0, i.default)(t));
            for (var r = void 0 !== e ? ~~e : 0, o = 0; o < t.length; o++) {
              var a = (r >>> 8) & 255;
              (a ^= 255 & t[o]),
                (r = (r << 8) & 65535),
                (r ^= a ^= a >>> 4),
                (r ^= a = (a << 5) & 65535),
                (r ^= a = (a << 7) & 65535);
            }
            return r;
          });
          r.default = a;
        },
        { './create_buffer': 28, './define_crc': 29, buffer: 4 },
      ],
      23: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i = a(t('./create_buffer')),
            o = a(t('./define_crc'));
          function a(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var s = [
            0, 8801531, 9098509, 825846, 9692897, 1419802, 1651692, 10452759, 10584377, 2608578,
            2839604, 11344079, 3303384, 11807523, 12104405, 4128302, 12930697, 4391538, 5217156,
            13227903, 5679208, 13690003, 14450021, 5910942, 6606768, 14844747, 15604413, 6837830,
            16197969, 7431594, 8256604, 16494759, 840169, 9084178, 8783076, 18463, 10434312,
            1670131, 1434117, 9678590, 11358416, 2825259, 2590173, 10602790, 4109873, 12122826,
            11821884, 3289031, 13213536, 5231515, 4409965, 12912278, 5929345, 14431610, 13675660,
            5693559, 6823513, 15618722, 14863188, 6588335, 16513208, 8238147, 7417269, 16212302,
            1680338, 10481449, 9664223, 1391140, 9061683, 788936, 36926, 8838341, 12067563, 4091408,
            3340262, 11844381, 2868234, 11372785, 10555655, 2579964, 14478683, 5939616, 5650518,
            13661357, 5180346, 13190977, 12967607, 4428364, 8219746, 16457881, 16234863, 7468436,
            15633027, 6866552, 6578062, 14816117, 1405499, 9649856, 10463030, 1698765, 8819930,
            55329, 803287, 9047340, 11858690, 3325945, 4072975, 12086004, 2561507, 10574104,
            11387118, 2853909, 13647026, 5664841, 5958079, 14460228, 4446803, 12949160, 13176670,
            5194661, 7454091, 16249200, 16476294, 8201341, 14834538, 6559633, 6852199, 15647388,
            3360676, 11864927, 12161705, 4185682, 10527045, 2551230, 2782280, 11286707, 9619101,
            1346150, 1577872, 10379115, 73852, 8875143, 9172337, 899466, 16124205, 7357910, 8182816,
            16421083, 6680524, 14918455, 15678145, 6911546, 5736468, 13747439, 14507289, 5968354,
            12873461, 4334094, 5159928, 13170435, 4167245, 12180150, 11879232, 3346363, 11301036,
            2767959, 2532769, 10545498, 10360692, 1596303, 1360505, 9604738, 913813, 9157998,
            8856728, 92259, 16439492, 8164415, 7343561, 16138546, 6897189, 15692510, 14936872,
            6662099, 5986813, 14488838, 13733104, 5750795, 13156124, 5174247, 4352529, 12855018,
            2810998, 11315341, 10498427, 2522496, 12124823, 4148844, 3397530, 11901793, 9135439,
            862644, 110658, 8912057, 1606574, 10407765, 9590435, 1317464, 15706879, 6940164,
            6651890, 14889737, 8145950, 16384229, 16161043, 7394792, 5123014, 13133629, 12910283,
            4370992, 14535975, 5997020, 5707818, 13718737, 2504095, 10516836, 11329682, 2796649,
            11916158, 3383173, 4130419, 12143240, 8893606, 129117, 876971, 9121104, 1331783,
            9576124, 10389322, 1625009, 14908182, 6633453, 6925851, 15721184, 7380471, 16175372,
            16402682, 8127489, 4389423, 12891860, 13119266, 5137369, 13704398, 5722165, 6015427,
            14517560,
          ];
          'undefined' != typeof Int32Array && (s = new Int32Array(s));
          var u = (0, o.default)('crc-24', function (t, e) {
            n.Buffer.isBuffer(t) || (t = (0, i.default)(t));
            for (var r = void 0 !== e ? ~~e : 11994318, o = 0; o < t.length; o++) {
              var a = t[o];
              r = 16777215 & (s[255 & ((r >> 16) ^ a)] ^ (r << 8));
            }
            return r;
          });
          r.default = u;
        },
        { './create_buffer': 28, './define_crc': 29, buffer: 4 },
      ],
      24: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i = a(t('./create_buffer')),
            o = a(t('./define_crc'));
          function a(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var s = [
            0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035,
            249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047,
            2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603,
            4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487,
            1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242,
            1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
            2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546,
            3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974,
            1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565,
            1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253,
            3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813,
            2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
            453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532,
            1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092,
            3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996,
            2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948,
            654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015,
            1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
            3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111,
            81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755,
            2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814,
            4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626,
            1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558,
            953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
            2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161,
            3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233,
            1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625,
            752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225,
            3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112,
            2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
            534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368,
            1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896,
            3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035,
            2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863,
            817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203,
            1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
            3272380065, 1510334235, 755167117,
          ];
          'undefined' != typeof Int32Array && (s = new Int32Array(s));
          var u = (0, o.default)('crc-32', function (t, e) {
            n.Buffer.isBuffer(t) || (t = (0, i.default)(t));
            for (var r = 0 === e ? 0 : -1 ^ ~~e, o = 0; o < t.length; o++) {
              var a = t[o];
              r = s[255 & (r ^ a)] ^ (r >>> 8);
            }
            return -1 ^ r;
          });
          r.default = u;
        },
        { './create_buffer': 28, './define_crc': 29, buffer: 4 },
      ],
      25: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i = a(t('./create_buffer')),
            o = a(t('./define_crc'));
          function a(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var s = [
            0, 7, 14, 9, 28, 27, 18, 21, 56, 63, 54, 49, 36, 35, 42, 45, 112, 119, 126, 121, 108,
            107, 98, 101, 72, 79, 70, 65, 84, 83, 90, 93, 224, 231, 238, 233, 252, 251, 242, 245,
            216, 223, 214, 209, 196, 195, 202, 205, 144, 151, 158, 153, 140, 139, 130, 133, 168,
            175, 166, 161, 180, 179, 186, 189, 199, 192, 201, 206, 219, 220, 213, 210, 255, 248,
            241, 246, 227, 228, 237, 234, 183, 176, 185, 190, 171, 172, 165, 162, 143, 136, 129,
            134, 147, 148, 157, 154, 39, 32, 41, 46, 59, 60, 53, 50, 31, 24, 17, 22, 3, 4, 13, 10,
            87, 80, 89, 94, 75, 76, 69, 66, 111, 104, 97, 102, 115, 116, 125, 122, 137, 142, 135,
            128, 149, 146, 155, 156, 177, 182, 191, 184, 173, 170, 163, 164, 249, 254, 247, 240,
            229, 226, 235, 236, 193, 198, 207, 200, 221, 218, 211, 212, 105, 110, 103, 96, 117, 114,
            123, 124, 81, 86, 95, 88, 77, 74, 67, 68, 25, 30, 23, 16, 5, 2, 11, 12, 33, 38, 47, 40,
            61, 58, 51, 52, 78, 73, 64, 71, 82, 85, 92, 91, 118, 113, 120, 127, 106, 109, 100, 99,
            62, 57, 48, 55, 34, 37, 44, 43, 6, 1, 8, 15, 26, 29, 20, 19, 174, 169, 160, 167, 178,
            181, 188, 187, 150, 145, 152, 159, 138, 141, 132, 131, 222, 217, 208, 215, 194, 197,
            204, 203, 230, 225, 232, 239, 250, 253, 244, 243,
          ];
          'undefined' != typeof Int32Array && (s = new Int32Array(s));
          var u = (0, o.default)('crc-8', function (t, e) {
            n.Buffer.isBuffer(t) || (t = (0, i.default)(t));
            for (var r = ~~e, o = 0; o < t.length; o++) {
              var a = t[o];
              r = 255 & s[255 & (r ^ a)];
            }
            return r;
          });
          r.default = u;
        },
        { './create_buffer': 28, './define_crc': 29, buffer: 4 },
      ],
      26: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i = a(t('./create_buffer')),
            o = a(t('./define_crc'));
          function a(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var s = [
            0, 94, 188, 226, 97, 63, 221, 131, 194, 156, 126, 32, 163, 253, 31, 65, 157, 195, 33,
            127, 252, 162, 64, 30, 95, 1, 227, 189, 62, 96, 130, 220, 35, 125, 159, 193, 66, 28,
            254, 160, 225, 191, 93, 3, 128, 222, 60, 98, 190, 224, 2, 92, 223, 129, 99, 61, 124, 34,
            192, 158, 29, 67, 161, 255, 70, 24, 250, 164, 39, 121, 155, 197, 132, 218, 56, 102, 229,
            187, 89, 7, 219, 133, 103, 57, 186, 228, 6, 88, 25, 71, 165, 251, 120, 38, 196, 154,
            101, 59, 217, 135, 4, 90, 184, 230, 167, 249, 27, 69, 198, 152, 122, 36, 248, 166, 68,
            26, 153, 199, 37, 123, 58, 100, 134, 216, 91, 5, 231, 185, 140, 210, 48, 110, 237, 179,
            81, 15, 78, 16, 242, 172, 47, 113, 147, 205, 17, 79, 173, 243, 112, 46, 204, 146, 211,
            141, 111, 49, 178, 236, 14, 80, 175, 241, 19, 77, 206, 144, 114, 44, 109, 51, 209, 143,
            12, 82, 176, 238, 50, 108, 142, 208, 83, 13, 239, 177, 240, 174, 76, 18, 145, 207, 45,
            115, 202, 148, 118, 40, 171, 245, 23, 73, 8, 86, 180, 234, 105, 55, 213, 139, 87, 9,
            235, 181, 54, 104, 138, 212, 149, 203, 41, 119, 244, 170, 72, 22, 233, 183, 85, 11, 136,
            214, 52, 106, 43, 117, 151, 201, 74, 20, 246, 168, 116, 42, 200, 150, 21, 75, 169, 247,
            182, 232, 10, 84, 215, 137, 107, 53,
          ];
          'undefined' != typeof Int32Array && (s = new Int32Array(s));
          var u = (0, o.default)('dallas-1-wire', function (t, e) {
            n.Buffer.isBuffer(t) || (t = (0, i.default)(t));
            for (var r = ~~e, o = 0; o < t.length; o++) {
              var a = t[o];
              r = 255 & s[255 & (r ^ a)];
            }
            return r;
          });
          r.default = u;
        },
        { './create_buffer': 28, './define_crc': 29, buffer: 4 },
      ],
      27: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i = a(t('./create_buffer')),
            o = a(t('./define_crc'));
          function a(t) {
            return t && t.__esModule ? t : { default: t };
          }
          var s = [
            0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035,
            249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047,
            2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603,
            4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487,
            1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242,
            1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
            2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546,
            3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974,
            1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565,
            1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253,
            3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813,
            2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
            453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532,
            1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092,
            3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996,
            2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948,
            654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015,
            1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
            3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111,
            81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755,
            2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814,
            4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626,
            1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558,
            953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
            2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161,
            3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233,
            1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625,
            752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225,
            3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112,
            2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
            534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368,
            1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896,
            3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035,
            2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863,
            817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203,
            1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
            3272380065, 1510334235, 755167117,
          ];
          'undefined' != typeof Int32Array && (s = new Int32Array(s));
          var u = (0, o.default)('jam', function (t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
            n.Buffer.isBuffer(t) || (t = (0, i.default)(t));
            for (var r = 0 === e ? 0 : ~~e, o = 0; o < t.length; o++) {
              var a = t[o];
              r = s[255 & (r ^ a)] ^ (r >>> 8);
            }
            return r;
          });
          r.default = u;
        },
        { './create_buffer': 28, './define_crc': 29, buffer: 4 },
      ],
      28: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = t('buffer'),
            i =
              n.Buffer.from && n.Buffer.alloc && n.Buffer.allocUnsafe && n.Buffer.allocUnsafeSlow
                ? n.Buffer.from
                : function (t) {
                    return new n.Buffer(t);
                  };
          r.default = i;
        },
        { buffer: 4 },
      ],
      29: [
        function (t, e, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 }),
            (r.default = function (t, e) {
              var r = function (t, r) {
                return e(t, r) >>> 0;
              };
              return (r.signed = e), (r.unsigned = r), (r.model = t), r;
            });
        },
        {},
      ],
      30: [
        function (t, e, r) {
          'use strict';
          e.exports = {
            crc1: t('./crc1'),
            crc8: t('./crc8'),
            crc81wire: t('./crc8_1wire'),
            crc16: t('./crc16'),
            crc16ccitt: t('./crc16_ccitt'),
            crc16modbus: t('./crc16_modbus'),
            crc16xmodem: t('./crc16_xmodem'),
            crc16kermit: t('./crc16_kermit'),
            crc24: t('./crc24'),
            crc32: t('./crc32'),
            crcjam: t('./crcjam'),
          };
        },
        {
          './crc1': 6,
          './crc16': 7,
          './crc16_ccitt': 8,
          './crc16_kermit': 9,
          './crc16_modbus': 10,
          './crc16_xmodem': 11,
          './crc24': 12,
          './crc32': 13,
          './crc8': 14,
          './crc8_1wire': 15,
          './crcjam': 16,
        },
      ],
      31: [
        function (t, e, r) {
          (r.read = function (t, e, r, n, i) {
            var o,
              a,
              s = 8 * i - n - 1,
              u = (1 << s) - 1,
              f = u >> 1,
              h = -7,
              c = r ? i - 1 : 0,
              l = r ? -1 : 1,
              d = t[e + c];
            for (
              c += l, o = d & ((1 << -h) - 1), d >>= -h, h += s;
              h > 0;
              o = 256 * o + t[e + c], c += l, h -= 8
            );
            for (
              a = o & ((1 << -h) - 1), o >>= -h, h += n;
              h > 0;
              a = 256 * a + t[e + c], c += l, h -= 8
            );
            if (0 === o) o = 1 - f;
            else {
              if (o === u) return a ? NaN : (1 / 0) * (d ? -1 : 1);
              (a += Math.pow(2, n)), (o -= f);
            }
            return (d ? -1 : 1) * a * Math.pow(2, o - n);
          }),
            (r.write = function (t, e, r, n, i, o) {
              var a,
                s,
                u,
                f = 8 * o - i - 1,
                h = (1 << f) - 1,
                c = h >> 1,
                l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                d = n ? 0 : o - 1,
                p = n ? 1 : -1,
                y = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
              for (
                e = Math.abs(e),
                  isNaN(e) || e === 1 / 0
                    ? ((s = isNaN(e) ? 1 : 0), (a = h))
                    : ((a = Math.floor(Math.log(e) / Math.LN2)),
                      e * (u = Math.pow(2, -a)) < 1 && (a--, (u *= 2)),
                      (e += a + c >= 1 ? l / u : l * Math.pow(2, 1 - c)) * u >= 2 &&
                        (a++, (u /= 2)),
                      a + c >= h
                        ? ((s = 0), (a = h))
                        : a + c >= 1
                          ? ((s = (e * u - 1) * Math.pow(2, i)), (a += c))
                          : ((s = e * Math.pow(2, c - 1) * Math.pow(2, i)), (a = 0)));
                i >= 8;
                t[r + d] = 255 & s, d += p, s /= 256, i -= 8
              );
              for (a = (a << i) | s, f += i; f > 0; t[r + d] = 255 & a, d += p, a /= 256, f -= 8);
              t[r + d - p] |= 128 * y;
            });
        },
        {},
      ],
      32: [
        function (t, e, r) {
          (function (t, r) {
            (function () {
              !(function () {
                'use strict';
                var n = 'input is invalid type',
                  i = 'object' == typeof window,
                  o = i ? window : {};
                o.JS_SHA512_NO_WINDOW && (i = !1);
                var a = !i && 'object' == typeof self;
                !o.JS_SHA512_NO_NODE_JS && 'object' == typeof t && t.versions && t.versions.node
                  ? (o = r)
                  : a && (o = self);
                var s = !o.JS_SHA512_NO_COMMON_JS && 'object' == typeof e && e.exports,
                  u = !o.JS_SHA512_NO_ARRAY_BUFFER && 'undefined' != typeof ArrayBuffer,
                  f = '0123456789abcdef'.split(''),
                  h = [-2147483648, 8388608, 32768, 128],
                  c = [24, 16, 8, 0],
                  l = [
                    1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
                    3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
                    2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
                    310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
                    1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
                    3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
                    264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122,
                    1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882,
                    3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671,
                    3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993,
                    3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734,
                    1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390,
                    1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627,
                    2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657,
                    3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776,
                    4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616,
                    1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427,
                    1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899,
                    1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306,
                    2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249,
                    3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900,
                    3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992,
                    116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269,
                    320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
                    1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
                    1607167915, 987167468, 1816402316, 1246189591,
                  ],
                  d = ['hex', 'array', 'digest', 'arrayBuffer'],
                  p = [];
                (!o.JS_SHA512_NO_NODE_JS && Array.isArray) ||
                  (Array.isArray = function (t) {
                    return '[object Array]' === Object.prototype.toString.call(t);
                  }),
                  !u ||
                    (!o.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
                    (ArrayBuffer.isView = function (t) {
                      return (
                        'object' == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer
                      );
                    });
                var y = function (t, e) {
                    return function (r) {
                      return new w(e, !0).update(r)[t]();
                    };
                  },
                  v = function (t) {
                    var e = y('hex', t);
                    (e.create = function () {
                      return new w(t);
                    }),
                      (e.update = function (t) {
                        return e.create().update(t);
                      });
                    for (var r = 0; r < d.length; ++r) {
                      var n = d[r];
                      e[n] = y(n, t);
                    }
                    return e;
                  },
                  g = function (t, e) {
                    return function (r, n) {
                      return new m(r, e, !0).update(n)[t]();
                    };
                  },
                  b = function (t) {
                    var e = g('hex', t);
                    (e.create = function (e) {
                      return new m(e, t);
                    }),
                      (e.update = function (t, r) {
                        return e.create(t).update(r);
                      });
                    for (var r = 0; r < d.length; ++r) {
                      var n = d[r];
                      e[n] = g(n, t);
                    }
                    return e;
                  };
                function w(t, e) {
                  e
                    ? ((p[0] =
                        p[1] =
                        p[2] =
                        p[3] =
                        p[4] =
                        p[5] =
                        p[6] =
                        p[7] =
                        p[8] =
                        p[9] =
                        p[10] =
                        p[11] =
                        p[12] =
                        p[13] =
                        p[14] =
                        p[15] =
                        p[16] =
                        p[17] =
                        p[18] =
                        p[19] =
                        p[20] =
                        p[21] =
                        p[22] =
                        p[23] =
                        p[24] =
                        p[25] =
                        p[26] =
                        p[27] =
                        p[28] =
                        p[29] =
                        p[30] =
                        p[31] =
                        p[32] =
                          0),
                      (this.blocks = p))
                    : (this.blocks = [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0,
                      ]),
                    384 == t
                      ? ((this.h0h = 3418070365),
                        (this.h0l = 3238371032),
                        (this.h1h = 1654270250),
                        (this.h1l = 914150663),
                        (this.h2h = 2438529370),
                        (this.h2l = 812702999),
                        (this.h3h = 355462360),
                        (this.h3l = 4144912697),
                        (this.h4h = 1731405415),
                        (this.h4l = 4290775857),
                        (this.h5h = 2394180231),
                        (this.h5l = 1750603025),
                        (this.h6h = 3675008525),
                        (this.h6l = 1694076839),
                        (this.h7h = 1203062813),
                        (this.h7l = 3204075428))
                      : 256 == t
                        ? ((this.h0h = 573645204),
                          (this.h0l = 4230739756),
                          (this.h1h = 2673172387),
                          (this.h1l = 3360449730),
                          (this.h2h = 596883563),
                          (this.h2l = 1867755857),
                          (this.h3h = 2520282905),
                          (this.h3l = 1497426621),
                          (this.h4h = 2519219938),
                          (this.h4l = 2827943907),
                          (this.h5h = 3193839141),
                          (this.h5l = 1401305490),
                          (this.h6h = 721525244),
                          (this.h6l = 746961066),
                          (this.h7h = 246885852),
                          (this.h7l = 2177182882))
                        : 224 == t
                          ? ((this.h0h = 2352822216),
                            (this.h0l = 424955298),
                            (this.h1h = 1944164710),
                            (this.h1l = 2312950998),
                            (this.h2h = 502970286),
                            (this.h2l = 855612546),
                            (this.h3h = 1738396948),
                            (this.h3l = 1479516111),
                            (this.h4h = 258812777),
                            (this.h4l = 2077511080),
                            (this.h5h = 2011393907),
                            (this.h5l = 79989058),
                            (this.h6h = 1067287976),
                            (this.h6l = 1780299464),
                            (this.h7h = 286451373),
                            (this.h7l = 2446758561))
                          : ((this.h0h = 1779033703),
                            (this.h0l = 4089235720),
                            (this.h1h = 3144134277),
                            (this.h1l = 2227873595),
                            (this.h2h = 1013904242),
                            (this.h2l = 4271175723),
                            (this.h3h = 2773480762),
                            (this.h3l = 1595750129),
                            (this.h4h = 1359893119),
                            (this.h4l = 2917565137),
                            (this.h5h = 2600822924),
                            (this.h5l = 725511199),
                            (this.h6h = 528734635),
                            (this.h6l = 4215389547),
                            (this.h7h = 1541459225),
                            (this.h7l = 327033209)),
                    (this.bits = t),
                    (this.block = this.start = this.bytes = this.hBytes = 0),
                    (this.finalized = this.hashed = !1);
                }
                function m(t, e, r) {
                  var i,
                    o = typeof t;
                  if ('string' !== o) {
                    if ('object' !== o) throw new Error(n);
                    if (null === t) throw new Error(n);
                    if (u && t.constructor === ArrayBuffer) t = new Uint8Array(t);
                    else if (!(Array.isArray(t) || (u && ArrayBuffer.isView(t))))
                      throw new Error(n);
                    i = !0;
                  }
                  var a = t.length;
                  if (!i) {
                    for (var s, f = [], h = ((a = t.length), 0), c = 0; c < a; ++c)
                      (s = t.charCodeAt(c)) < 128
                        ? (f[h++] = s)
                        : s < 2048
                          ? ((f[h++] = 192 | (s >> 6)), (f[h++] = 128 | (63 & s)))
                          : s < 55296 || s >= 57344
                            ? ((f[h++] = 224 | (s >> 12)),
                              (f[h++] = 128 | ((s >> 6) & 63)),
                              (f[h++] = 128 | (63 & s)))
                            : ((s = 65536 + (((1023 & s) << 10) | (1023 & t.charCodeAt(++c)))),
                              (f[h++] = 240 | (s >> 18)),
                              (f[h++] = 128 | ((s >> 12) & 63)),
                              (f[h++] = 128 | ((s >> 6) & 63)),
                              (f[h++] = 128 | (63 & s)));
                    t = f;
                  }
                  t.length > 128 && (t = new w(e, !0).update(t).array());
                  var l = [],
                    d = [];
                  for (c = 0; c < 128; ++c) {
                    var p = t[c] || 0;
                    (l[c] = 92 ^ p), (d[c] = 54 ^ p);
                  }
                  w.call(this, e, r),
                    this.update(d),
                    (this.oKeyPad = l),
                    (this.inner = !0),
                    (this.sharedMemory = r);
                }
                (w.prototype.update = function (t) {
                  if (this.finalized) throw new Error('finalize already called');
                  var e,
                    r = typeof t;
                  if ('string' !== r) {
                    if ('object' !== r) throw new Error(n);
                    if (null === t) throw new Error(n);
                    if (u && t.constructor === ArrayBuffer) t = new Uint8Array(t);
                    else if (!(Array.isArray(t) || (u && ArrayBuffer.isView(t))))
                      throw new Error(n);
                    e = !0;
                  }
                  for (var i, o, a = 0, s = t.length, f = this.blocks; a < s; ) {
                    if (
                      (this.hashed &&
                        ((this.hashed = !1),
                        (f[0] = this.block),
                        (f[1] =
                          f[2] =
                          f[3] =
                          f[4] =
                          f[5] =
                          f[6] =
                          f[7] =
                          f[8] =
                          f[9] =
                          f[10] =
                          f[11] =
                          f[12] =
                          f[13] =
                          f[14] =
                          f[15] =
                          f[16] =
                          f[17] =
                          f[18] =
                          f[19] =
                          f[20] =
                          f[21] =
                          f[22] =
                          f[23] =
                          f[24] =
                          f[25] =
                          f[26] =
                          f[27] =
                          f[28] =
                          f[29] =
                          f[30] =
                          f[31] =
                          f[32] =
                            0)),
                      e)
                    )
                      for (o = this.start; a < s && o < 128; ++a) f[o >> 2] |= t[a] << c[3 & o++];
                    else
                      for (o = this.start; a < s && o < 128; ++a)
                        (i = t.charCodeAt(a)) < 128
                          ? (f[o >> 2] |= i << c[3 & o++])
                          : i < 2048
                            ? ((f[o >> 2] |= (192 | (i >> 6)) << c[3 & o++]),
                              (f[o >> 2] |= (128 | (63 & i)) << c[3 & o++]))
                            : i < 55296 || i >= 57344
                              ? ((f[o >> 2] |= (224 | (i >> 12)) << c[3 & o++]),
                                (f[o >> 2] |= (128 | ((i >> 6) & 63)) << c[3 & o++]),
                                (f[o >> 2] |= (128 | (63 & i)) << c[3 & o++]))
                              : ((i = 65536 + (((1023 & i) << 10) | (1023 & t.charCodeAt(++a)))),
                                (f[o >> 2] |= (240 | (i >> 18)) << c[3 & o++]),
                                (f[o >> 2] |= (128 | ((i >> 12) & 63)) << c[3 & o++]),
                                (f[o >> 2] |= (128 | ((i >> 6) & 63)) << c[3 & o++]),
                                (f[o >> 2] |= (128 | (63 & i)) << c[3 & o++]));
                    (this.lastByteIndex = o),
                      (this.bytes += o - this.start),
                      o >= 128
                        ? ((this.block = f[32]),
                          (this.start = o - 128),
                          this.hash(),
                          (this.hashed = !0))
                        : (this.start = o);
                  }
                  return (
                    this.bytes > 4294967295 &&
                      ((this.hBytes += (this.bytes / 4294967296) << 0),
                      (this.bytes = this.bytes % 4294967296)),
                    this
                  );
                }),
                  (w.prototype.finalize = function () {
                    if (!this.finalized) {
                      this.finalized = !0;
                      var t = this.blocks,
                        e = this.lastByteIndex;
                      (t[32] = this.block),
                        (t[e >> 2] |= h[3 & e]),
                        (this.block = t[32]),
                        e >= 112 &&
                          (this.hashed || this.hash(),
                          (t[0] = this.block),
                          (t[1] =
                            t[2] =
                            t[3] =
                            t[4] =
                            t[5] =
                            t[6] =
                            t[7] =
                            t[8] =
                            t[9] =
                            t[10] =
                            t[11] =
                            t[12] =
                            t[13] =
                            t[14] =
                            t[15] =
                            t[16] =
                            t[17] =
                            t[18] =
                            t[19] =
                            t[20] =
                            t[21] =
                            t[22] =
                            t[23] =
                            t[24] =
                            t[25] =
                            t[26] =
                            t[27] =
                            t[28] =
                            t[29] =
                            t[30] =
                            t[31] =
                            t[32] =
                              0)),
                        (t[30] = (this.hBytes << 3) | (this.bytes >>> 29)),
                        (t[31] = this.bytes << 3),
                        this.hash();
                    }
                  }),
                  (w.prototype.hash = function () {
                    var t,
                      e,
                      r,
                      n,
                      i,
                      o,
                      a,
                      s,
                      u,
                      f,
                      h,
                      c,
                      d,
                      p,
                      y,
                      v,
                      g,
                      b,
                      w,
                      m,
                      _,
                      A,
                      x,
                      E,
                      k,
                      B = this.h0h,
                      S = this.h0l,
                      C = this.h1h,
                      U = this.h1l,
                      T = this.h2h,
                      L = this.h2l,
                      O = this.h3h,
                      I = this.h3l,
                      R = this.h4h,
                      j = this.h4l,
                      H = this.h5h,
                      M = this.h5l,
                      N = this.h6h,
                      F = this.h6l,
                      z = this.h7h,
                      P = this.h7l,
                      V = this.blocks;
                    for (t = 32; t < 160; t += 2)
                      (e =
                        (((m = V[t - 30]) >>> 1) | ((_ = V[t - 29]) << 31)) ^
                        ((m >>> 8) | (_ << 24)) ^
                        (m >>> 7)),
                        (r =
                          ((_ >>> 1) | (m << 31)) ^
                          ((_ >>> 8) | (m << 24)) ^
                          ((_ >>> 7) | (m << 25))),
                        (n =
                          (((m = V[t - 4]) >>> 19) | ((_ = V[t - 3]) << 13)) ^
                          ((_ >>> 29) | (m << 3)) ^
                          (m >>> 6)),
                        (i =
                          ((_ >>> 19) | (m << 13)) ^
                          ((m >>> 29) | (_ << 3)) ^
                          ((_ >>> 6) | (m << 26))),
                        (m = V[t - 32]),
                        (_ = V[t - 31]),
                        (u =
                          ((A = V[t - 14]) >>> 16) +
                          (m >>> 16) +
                          (e >>> 16) +
                          (n >>> 16) +
                          ((s =
                            (65535 & A) +
                            (65535 & m) +
                            (65535 & e) +
                            (65535 & n) +
                            ((a =
                              ((x = V[t - 13]) >>> 16) +
                              (_ >>> 16) +
                              (r >>> 16) +
                              (i >>> 16) +
                              ((o = (65535 & x) + (65535 & _) + (65535 & r) + (65535 & i)) >>>
                                16)) >>>
                              16)) >>>
                            16)),
                        (V[t] = (u << 16) | (65535 & s)),
                        (V[t + 1] = (a << 16) | (65535 & o));
                    var D = B,
                      $ = S,
                      q = C,
                      Y = U,
                      X = T,
                      J = L,
                      W = O,
                      Z = I,
                      G = R,
                      K = j,
                      Q = H,
                      tt = M,
                      et = N,
                      rt = F,
                      nt = z,
                      it = P;
                    for (v = q & X, g = Y & J, t = 0; t < 160; t += 8)
                      (e =
                        ((D >>> 28) | ($ << 4)) ^
                        (($ >>> 2) | (D << 30)) ^
                        (($ >>> 7) | (D << 25))),
                        (r =
                          (($ >>> 28) | (D << 4)) ^
                          ((D >>> 2) | ($ << 30)) ^
                          ((D >>> 7) | ($ << 25))),
                        (n =
                          ((G >>> 14) | (K << 18)) ^
                          ((G >>> 18) | (K << 14)) ^
                          ((K >>> 9) | (G << 23))),
                        (i =
                          ((K >>> 14) | (G << 18)) ^
                          ((K >>> 18) | (G << 14)) ^
                          ((G >>> 9) | (K << 23))),
                        (b = (f = D & q) ^ (D & X) ^ v),
                        (w = (h = $ & Y) ^ ($ & J) ^ g),
                        (E = (G & Q) ^ (~G & et)),
                        (k = (K & tt) ^ (~K & rt)),
                        (m = V[t]),
                        (_ = V[t + 1]),
                        (m =
                          ((u =
                            ((A = l[t]) >>> 16) +
                            (m >>> 16) +
                            (E >>> 16) +
                            (n >>> 16) +
                            (nt >>> 16) +
                            ((s =
                              (65535 & A) +
                              (65535 & m) +
                              (65535 & E) +
                              (65535 & n) +
                              (65535 & nt) +
                              ((a =
                                ((x = l[t + 1]) >>> 16) +
                                (_ >>> 16) +
                                (k >>> 16) +
                                (i >>> 16) +
                                (it >>> 16) +
                                ((o =
                                  (65535 & x) +
                                  (65535 & _) +
                                  (65535 & k) +
                                  (65535 & i) +
                                  (65535 & it)) >>>
                                  16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (_ = (a << 16) | (65535 & o)),
                        (A =
                          ((u =
                            (b >>> 16) +
                            (e >>> 16) +
                            ((s =
                              (65535 & b) +
                              (65535 & e) +
                              ((a =
                                (w >>> 16) +
                                (r >>> 16) +
                                ((o = (65535 & w) + (65535 & r)) >>> 16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (x = (a << 16) | (65535 & o)),
                        (nt =
                          ((u =
                            (W >>> 16) +
                            (m >>> 16) +
                            ((s =
                              (65535 & W) +
                              (65535 & m) +
                              ((a =
                                (Z >>> 16) +
                                (_ >>> 16) +
                                ((o = (65535 & Z) + (65535 & _)) >>> 16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (it = (a << 16) | (65535 & o)),
                        (e =
                          (((W =
                            ((u =
                              (A >>> 16) +
                              (m >>> 16) +
                              ((s =
                                (65535 & A) +
                                (65535 & m) +
                                ((a =
                                  (x >>> 16) +
                                  (_ >>> 16) +
                                  ((o = (65535 & x) + (65535 & _)) >>> 16)) >>>
                                  16)) >>>
                                16)) <<
                              16) |
                            (65535 & s)) >>>
                            28) |
                            ((Z = (a << 16) | (65535 & o)) << 4)) ^
                          ((Z >>> 2) | (W << 30)) ^
                          ((Z >>> 7) | (W << 25))),
                        (r =
                          ((Z >>> 28) | (W << 4)) ^
                          ((W >>> 2) | (Z << 30)) ^
                          ((W >>> 7) | (Z << 25))),
                        (n =
                          ((nt >>> 14) | (it << 18)) ^
                          ((nt >>> 18) | (it << 14)) ^
                          ((it >>> 9) | (nt << 23))),
                        (i =
                          ((it >>> 14) | (nt << 18)) ^
                          ((it >>> 18) | (nt << 14)) ^
                          ((nt >>> 9) | (it << 23))),
                        (b = (c = W & D) ^ (W & q) ^ f),
                        (w = (d = Z & $) ^ (Z & Y) ^ h),
                        (E = (nt & G) ^ (~nt & Q)),
                        (k = (it & K) ^ (~it & tt)),
                        (m = V[t + 2]),
                        (_ = V[t + 3]),
                        (m =
                          ((u =
                            ((A = l[t + 2]) >>> 16) +
                            (m >>> 16) +
                            (E >>> 16) +
                            (n >>> 16) +
                            (et >>> 16) +
                            ((s =
                              (65535 & A) +
                              (65535 & m) +
                              (65535 & E) +
                              (65535 & n) +
                              (65535 & et) +
                              ((a =
                                ((x = l[t + 3]) >>> 16) +
                                (_ >>> 16) +
                                (k >>> 16) +
                                (i >>> 16) +
                                (rt >>> 16) +
                                ((o =
                                  (65535 & x) +
                                  (65535 & _) +
                                  (65535 & k) +
                                  (65535 & i) +
                                  (65535 & rt)) >>>
                                  16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (_ = (a << 16) | (65535 & o)),
                        (A =
                          ((u =
                            (b >>> 16) +
                            (e >>> 16) +
                            ((s =
                              (65535 & b) +
                              (65535 & e) +
                              ((a =
                                (w >>> 16) +
                                (r >>> 16) +
                                ((o = (65535 & w) + (65535 & r)) >>> 16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (x = (a << 16) | (65535 & o)),
                        (et =
                          ((u =
                            (X >>> 16) +
                            (m >>> 16) +
                            ((s =
                              (65535 & X) +
                              (65535 & m) +
                              ((a =
                                (J >>> 16) +
                                (_ >>> 16) +
                                ((o = (65535 & J) + (65535 & _)) >>> 16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (rt = (a << 16) | (65535 & o)),
                        (e =
                          (((X =
                            ((u =
                              (A >>> 16) +
                              (m >>> 16) +
                              ((s =
                                (65535 & A) +
                                (65535 & m) +
                                ((a =
                                  (x >>> 16) +
                                  (_ >>> 16) +
                                  ((o = (65535 & x) + (65535 & _)) >>> 16)) >>>
                                  16)) >>>
                                16)) <<
                              16) |
                            (65535 & s)) >>>
                            28) |
                            ((J = (a << 16) | (65535 & o)) << 4)) ^
                          ((J >>> 2) | (X << 30)) ^
                          ((J >>> 7) | (X << 25))),
                        (r =
                          ((J >>> 28) | (X << 4)) ^
                          ((X >>> 2) | (J << 30)) ^
                          ((X >>> 7) | (J << 25))),
                        (n =
                          ((et >>> 14) | (rt << 18)) ^
                          ((et >>> 18) | (rt << 14)) ^
                          ((rt >>> 9) | (et << 23))),
                        (i =
                          ((rt >>> 14) | (et << 18)) ^
                          ((rt >>> 18) | (et << 14)) ^
                          ((et >>> 9) | (rt << 23))),
                        (b = (p = X & W) ^ (X & D) ^ c),
                        (w = (y = J & Z) ^ (J & $) ^ d),
                        (E = (et & nt) ^ (~et & G)),
                        (k = (rt & it) ^ (~rt & K)),
                        (m = V[t + 4]),
                        (_ = V[t + 5]),
                        (m =
                          ((u =
                            ((A = l[t + 4]) >>> 16) +
                            (m >>> 16) +
                            (E >>> 16) +
                            (n >>> 16) +
                            (Q >>> 16) +
                            ((s =
                              (65535 & A) +
                              (65535 & m) +
                              (65535 & E) +
                              (65535 & n) +
                              (65535 & Q) +
                              ((a =
                                ((x = l[t + 5]) >>> 16) +
                                (_ >>> 16) +
                                (k >>> 16) +
                                (i >>> 16) +
                                (tt >>> 16) +
                                ((o =
                                  (65535 & x) +
                                  (65535 & _) +
                                  (65535 & k) +
                                  (65535 & i) +
                                  (65535 & tt)) >>>
                                  16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (_ = (a << 16) | (65535 & o)),
                        (A =
                          ((u =
                            (b >>> 16) +
                            (e >>> 16) +
                            ((s =
                              (65535 & b) +
                              (65535 & e) +
                              ((a =
                                (w >>> 16) +
                                (r >>> 16) +
                                ((o = (65535 & w) + (65535 & r)) >>> 16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (x = (a << 16) | (65535 & o)),
                        (Q =
                          ((u =
                            (q >>> 16) +
                            (m >>> 16) +
                            ((s =
                              (65535 & q) +
                              (65535 & m) +
                              ((a =
                                (Y >>> 16) +
                                (_ >>> 16) +
                                ((o = (65535 & Y) + (65535 & _)) >>> 16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (tt = (a << 16) | (65535 & o)),
                        (e =
                          (((q =
                            ((u =
                              (A >>> 16) +
                              (m >>> 16) +
                              ((s =
                                (65535 & A) +
                                (65535 & m) +
                                ((a =
                                  (x >>> 16) +
                                  (_ >>> 16) +
                                  ((o = (65535 & x) + (65535 & _)) >>> 16)) >>>
                                  16)) >>>
                                16)) <<
                              16) |
                            (65535 & s)) >>>
                            28) |
                            ((Y = (a << 16) | (65535 & o)) << 4)) ^
                          ((Y >>> 2) | (q << 30)) ^
                          ((Y >>> 7) | (q << 25))),
                        (r =
                          ((Y >>> 28) | (q << 4)) ^
                          ((q >>> 2) | (Y << 30)) ^
                          ((q >>> 7) | (Y << 25))),
                        (n =
                          ((Q >>> 14) | (tt << 18)) ^
                          ((Q >>> 18) | (tt << 14)) ^
                          ((tt >>> 9) | (Q << 23))),
                        (i =
                          ((tt >>> 14) | (Q << 18)) ^
                          ((tt >>> 18) | (Q << 14)) ^
                          ((Q >>> 9) | (tt << 23))),
                        (b = (v = q & X) ^ (q & W) ^ p),
                        (w = (g = Y & J) ^ (Y & Z) ^ y),
                        (E = (Q & et) ^ (~Q & nt)),
                        (k = (tt & rt) ^ (~tt & it)),
                        (m = V[t + 6]),
                        (_ = V[t + 7]),
                        (m =
                          ((u =
                            ((A = l[t + 6]) >>> 16) +
                            (m >>> 16) +
                            (E >>> 16) +
                            (n >>> 16) +
                            (G >>> 16) +
                            ((s =
                              (65535 & A) +
                              (65535 & m) +
                              (65535 & E) +
                              (65535 & n) +
                              (65535 & G) +
                              ((a =
                                ((x = l[t + 7]) >>> 16) +
                                (_ >>> 16) +
                                (k >>> 16) +
                                (i >>> 16) +
                                (K >>> 16) +
                                ((o =
                                  (65535 & x) +
                                  (65535 & _) +
                                  (65535 & k) +
                                  (65535 & i) +
                                  (65535 & K)) >>>
                                  16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (_ = (a << 16) | (65535 & o)),
                        (A =
                          ((u =
                            (b >>> 16) +
                            (e >>> 16) +
                            ((s =
                              (65535 & b) +
                              (65535 & e) +
                              ((a =
                                (w >>> 16) +
                                (r >>> 16) +
                                ((o = (65535 & w) + (65535 & r)) >>> 16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (x = (a << 16) | (65535 & o)),
                        (G =
                          ((u =
                            (D >>> 16) +
                            (m >>> 16) +
                            ((s =
                              (65535 & D) +
                              (65535 & m) +
                              ((a =
                                ($ >>> 16) +
                                (_ >>> 16) +
                                ((o = (65535 & $) + (65535 & _)) >>> 16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        (K = (a << 16) | (65535 & o)),
                        (D =
                          ((u =
                            (A >>> 16) +
                            (m >>> 16) +
                            ((s =
                              (65535 & A) +
                              (65535 & m) +
                              ((a =
                                (x >>> 16) +
                                (_ >>> 16) +
                                ((o = (65535 & x) + (65535 & _)) >>> 16)) >>>
                                16)) >>>
                              16)) <<
                            16) |
                          (65535 & s)),
                        ($ = (a << 16) | (65535 & o));
                    (u =
                      (B >>> 16) +
                      (D >>> 16) +
                      ((s =
                        (65535 & B) +
                        (65535 & D) +
                        ((a =
                          (S >>> 16) + ($ >>> 16) + ((o = (65535 & S) + (65535 & $)) >>> 16)) >>>
                          16)) >>>
                        16)),
                      (this.h0h = (u << 16) | (65535 & s)),
                      (this.h0l = (a << 16) | (65535 & o)),
                      (u =
                        (C >>> 16) +
                        (q >>> 16) +
                        ((s =
                          (65535 & C) +
                          (65535 & q) +
                          ((a =
                            (U >>> 16) + (Y >>> 16) + ((o = (65535 & U) + (65535 & Y)) >>> 16)) >>>
                            16)) >>>
                          16)),
                      (this.h1h = (u << 16) | (65535 & s)),
                      (this.h1l = (a << 16) | (65535 & o)),
                      (u =
                        (T >>> 16) +
                        (X >>> 16) +
                        ((s =
                          (65535 & T) +
                          (65535 & X) +
                          ((a =
                            (L >>> 16) + (J >>> 16) + ((o = (65535 & L) + (65535 & J)) >>> 16)) >>>
                            16)) >>>
                          16)),
                      (this.h2h = (u << 16) | (65535 & s)),
                      (this.h2l = (a << 16) | (65535 & o)),
                      (u =
                        (O >>> 16) +
                        (W >>> 16) +
                        ((s =
                          (65535 & O) +
                          (65535 & W) +
                          ((a =
                            (I >>> 16) + (Z >>> 16) + ((o = (65535 & I) + (65535 & Z)) >>> 16)) >>>
                            16)) >>>
                          16)),
                      (this.h3h = (u << 16) | (65535 & s)),
                      (this.h3l = (a << 16) | (65535 & o)),
                      (u =
                        (R >>> 16) +
                        (G >>> 16) +
                        ((s =
                          (65535 & R) +
                          (65535 & G) +
                          ((a =
                            (j >>> 16) + (K >>> 16) + ((o = (65535 & j) + (65535 & K)) >>> 16)) >>>
                            16)) >>>
                          16)),
                      (this.h4h = (u << 16) | (65535 & s)),
                      (this.h4l = (a << 16) | (65535 & o)),
                      (u =
                        (H >>> 16) +
                        (Q >>> 16) +
                        ((s =
                          (65535 & H) +
                          (65535 & Q) +
                          ((a =
                            (M >>> 16) +
                            (tt >>> 16) +
                            ((o = (65535 & M) + (65535 & tt)) >>> 16)) >>>
                            16)) >>>
                          16)),
                      (this.h5h = (u << 16) | (65535 & s)),
                      (this.h5l = (a << 16) | (65535 & o)),
                      (u =
                        (N >>> 16) +
                        (et >>> 16) +
                        ((s =
                          (65535 & N) +
                          (65535 & et) +
                          ((a =
                            (F >>> 16) +
                            (rt >>> 16) +
                            ((o = (65535 & F) + (65535 & rt)) >>> 16)) >>>
                            16)) >>>
                          16)),
                      (this.h6h = (u << 16) | (65535 & s)),
                      (this.h6l = (a << 16) | (65535 & o)),
                      (u =
                        (z >>> 16) +
                        (nt >>> 16) +
                        ((s =
                          (65535 & z) +
                          (65535 & nt) +
                          ((a =
                            (P >>> 16) +
                            (it >>> 16) +
                            ((o = (65535 & P) + (65535 & it)) >>> 16)) >>>
                            16)) >>>
                          16)),
                      (this.h7h = (u << 16) | (65535 & s)),
                      (this.h7l = (a << 16) | (65535 & o));
                  }),
                  (w.prototype.hex = function () {
                    this.finalize();
                    var t = this.h0h,
                      e = this.h0l,
                      r = this.h1h,
                      n = this.h1l,
                      i = this.h2h,
                      o = this.h2l,
                      a = this.h3h,
                      s = this.h3l,
                      u = this.h4h,
                      h = this.h4l,
                      c = this.h5h,
                      l = this.h5l,
                      d = this.h6h,
                      p = this.h6l,
                      y = this.h7h,
                      v = this.h7l,
                      g = this.bits,
                      b =
                        f[(t >> 28) & 15] +
                        f[(t >> 24) & 15] +
                        f[(t >> 20) & 15] +
                        f[(t >> 16) & 15] +
                        f[(t >> 12) & 15] +
                        f[(t >> 8) & 15] +
                        f[(t >> 4) & 15] +
                        f[15 & t] +
                        f[(e >> 28) & 15] +
                        f[(e >> 24) & 15] +
                        f[(e >> 20) & 15] +
                        f[(e >> 16) & 15] +
                        f[(e >> 12) & 15] +
                        f[(e >> 8) & 15] +
                        f[(e >> 4) & 15] +
                        f[15 & e] +
                        f[(r >> 28) & 15] +
                        f[(r >> 24) & 15] +
                        f[(r >> 20) & 15] +
                        f[(r >> 16) & 15] +
                        f[(r >> 12) & 15] +
                        f[(r >> 8) & 15] +
                        f[(r >> 4) & 15] +
                        f[15 & r] +
                        f[(n >> 28) & 15] +
                        f[(n >> 24) & 15] +
                        f[(n >> 20) & 15] +
                        f[(n >> 16) & 15] +
                        f[(n >> 12) & 15] +
                        f[(n >> 8) & 15] +
                        f[(n >> 4) & 15] +
                        f[15 & n] +
                        f[(i >> 28) & 15] +
                        f[(i >> 24) & 15] +
                        f[(i >> 20) & 15] +
                        f[(i >> 16) & 15] +
                        f[(i >> 12) & 15] +
                        f[(i >> 8) & 15] +
                        f[(i >> 4) & 15] +
                        f[15 & i] +
                        f[(o >> 28) & 15] +
                        f[(o >> 24) & 15] +
                        f[(o >> 20) & 15] +
                        f[(o >> 16) & 15] +
                        f[(o >> 12) & 15] +
                        f[(o >> 8) & 15] +
                        f[(o >> 4) & 15] +
                        f[15 & o] +
                        f[(a >> 28) & 15] +
                        f[(a >> 24) & 15] +
                        f[(a >> 20) & 15] +
                        f[(a >> 16) & 15] +
                        f[(a >> 12) & 15] +
                        f[(a >> 8) & 15] +
                        f[(a >> 4) & 15] +
                        f[15 & a];
                    return (
                      g >= 256 &&
                        (b +=
                          f[(s >> 28) & 15] +
                          f[(s >> 24) & 15] +
                          f[(s >> 20) & 15] +
                          f[(s >> 16) & 15] +
                          f[(s >> 12) & 15] +
                          f[(s >> 8) & 15] +
                          f[(s >> 4) & 15] +
                          f[15 & s]),
                      g >= 384 &&
                        (b +=
                          f[(u >> 28) & 15] +
                          f[(u >> 24) & 15] +
                          f[(u >> 20) & 15] +
                          f[(u >> 16) & 15] +
                          f[(u >> 12) & 15] +
                          f[(u >> 8) & 15] +
                          f[(u >> 4) & 15] +
                          f[15 & u] +
                          f[(h >> 28) & 15] +
                          f[(h >> 24) & 15] +
                          f[(h >> 20) & 15] +
                          f[(h >> 16) & 15] +
                          f[(h >> 12) & 15] +
                          f[(h >> 8) & 15] +
                          f[(h >> 4) & 15] +
                          f[15 & h] +
                          f[(c >> 28) & 15] +
                          f[(c >> 24) & 15] +
                          f[(c >> 20) & 15] +
                          f[(c >> 16) & 15] +
                          f[(c >> 12) & 15] +
                          f[(c >> 8) & 15] +
                          f[(c >> 4) & 15] +
                          f[15 & c] +
                          f[(l >> 28) & 15] +
                          f[(l >> 24) & 15] +
                          f[(l >> 20) & 15] +
                          f[(l >> 16) & 15] +
                          f[(l >> 12) & 15] +
                          f[(l >> 8) & 15] +
                          f[(l >> 4) & 15] +
                          f[15 & l]),
                      512 == g &&
                        (b +=
                          f[(d >> 28) & 15] +
                          f[(d >> 24) & 15] +
                          f[(d >> 20) & 15] +
                          f[(d >> 16) & 15] +
                          f[(d >> 12) & 15] +
                          f[(d >> 8) & 15] +
                          f[(d >> 4) & 15] +
                          f[15 & d] +
                          f[(p >> 28) & 15] +
                          f[(p >> 24) & 15] +
                          f[(p >> 20) & 15] +
                          f[(p >> 16) & 15] +
                          f[(p >> 12) & 15] +
                          f[(p >> 8) & 15] +
                          f[(p >> 4) & 15] +
                          f[15 & p] +
                          f[(y >> 28) & 15] +
                          f[(y >> 24) & 15] +
                          f[(y >> 20) & 15] +
                          f[(y >> 16) & 15] +
                          f[(y >> 12) & 15] +
                          f[(y >> 8) & 15] +
                          f[(y >> 4) & 15] +
                          f[15 & y] +
                          f[(v >> 28) & 15] +
                          f[(v >> 24) & 15] +
                          f[(v >> 20) & 15] +
                          f[(v >> 16) & 15] +
                          f[(v >> 12) & 15] +
                          f[(v >> 8) & 15] +
                          f[(v >> 4) & 15] +
                          f[15 & v]),
                      b
                    );
                  }),
                  (w.prototype.toString = w.prototype.hex),
                  (w.prototype.digest = function () {
                    this.finalize();
                    var t = this.h0h,
                      e = this.h0l,
                      r = this.h1h,
                      n = this.h1l,
                      i = this.h2h,
                      o = this.h2l,
                      a = this.h3h,
                      s = this.h3l,
                      u = this.h4h,
                      f = this.h4l,
                      h = this.h5h,
                      c = this.h5l,
                      l = this.h6h,
                      d = this.h6l,
                      p = this.h7h,
                      y = this.h7l,
                      v = this.bits,
                      g = [
                        (t >> 24) & 255,
                        (t >> 16) & 255,
                        (t >> 8) & 255,
                        255 & t,
                        (e >> 24) & 255,
                        (e >> 16) & 255,
                        (e >> 8) & 255,
                        255 & e,
                        (r >> 24) & 255,
                        (r >> 16) & 255,
                        (r >> 8) & 255,
                        255 & r,
                        (n >> 24) & 255,
                        (n >> 16) & 255,
                        (n >> 8) & 255,
                        255 & n,
                        (i >> 24) & 255,
                        (i >> 16) & 255,
                        (i >> 8) & 255,
                        255 & i,
                        (o >> 24) & 255,
                        (o >> 16) & 255,
                        (o >> 8) & 255,
                        255 & o,
                        (a >> 24) & 255,
                        (a >> 16) & 255,
                        (a >> 8) & 255,
                        255 & a,
                      ];
                    return (
                      v >= 256 && g.push((s >> 24) & 255, (s >> 16) & 255, (s >> 8) & 255, 255 & s),
                      v >= 384 &&
                        g.push(
                          (u >> 24) & 255,
                          (u >> 16) & 255,
                          (u >> 8) & 255,
                          255 & u,
                          (f >> 24) & 255,
                          (f >> 16) & 255,
                          (f >> 8) & 255,
                          255 & f,
                          (h >> 24) & 255,
                          (h >> 16) & 255,
                          (h >> 8) & 255,
                          255 & h,
                          (c >> 24) & 255,
                          (c >> 16) & 255,
                          (c >> 8) & 255,
                          255 & c,
                        ),
                      512 == v &&
                        g.push(
                          (l >> 24) & 255,
                          (l >> 16) & 255,
                          (l >> 8) & 255,
                          255 & l,
                          (d >> 24) & 255,
                          (d >> 16) & 255,
                          (d >> 8) & 255,
                          255 & d,
                          (p >> 24) & 255,
                          (p >> 16) & 255,
                          (p >> 8) & 255,
                          255 & p,
                          (y >> 24) & 255,
                          (y >> 16) & 255,
                          (y >> 8) & 255,
                          255 & y,
                        ),
                      g
                    );
                  }),
                  (w.prototype.array = w.prototype.digest),
                  (w.prototype.arrayBuffer = function () {
                    this.finalize();
                    var t = this.bits,
                      e = new ArrayBuffer(t / 8),
                      r = new DataView(e);
                    return (
                      r.setUint32(0, this.h0h),
                      r.setUint32(4, this.h0l),
                      r.setUint32(8, this.h1h),
                      r.setUint32(12, this.h1l),
                      r.setUint32(16, this.h2h),
                      r.setUint32(20, this.h2l),
                      r.setUint32(24, this.h3h),
                      t >= 256 && r.setUint32(28, this.h3l),
                      t >= 384 &&
                        (r.setUint32(32, this.h4h),
                        r.setUint32(36, this.h4l),
                        r.setUint32(40, this.h5h),
                        r.setUint32(44, this.h5l)),
                      512 == t &&
                        (r.setUint32(48, this.h6h),
                        r.setUint32(52, this.h6l),
                        r.setUint32(56, this.h7h),
                        r.setUint32(60, this.h7l)),
                      e
                    );
                  }),
                  (w.prototype.clone = function () {
                    var t = new w(this.bits, !1);
                    return this.copyTo(t), t;
                  }),
                  (w.prototype.copyTo = function (t) {
                    var e = 0,
                      r = [
                        'h0h',
                        'h0l',
                        'h1h',
                        'h1l',
                        'h2h',
                        'h2l',
                        'h3h',
                        'h3l',
                        'h4h',
                        'h4l',
                        'h5h',
                        'h5l',
                        'h6h',
                        'h6l',
                        'h7h',
                        'h7l',
                        'start',
                        'bytes',
                        'hBytes',
                        'finalized',
                        'hashed',
                        'lastByteIndex',
                      ];
                    for (e = 0; e < r.length; ++e) t[r[e]] = this[r[e]];
                    for (e = 0; e < this.blocks.length; ++e) t.blocks[e] = this.blocks[e];
                  }),
                  (m.prototype = new w()),
                  (m.prototype.finalize = function () {
                    if ((w.prototype.finalize.call(this), this.inner)) {
                      this.inner = !1;
                      var t = this.array();
                      w.call(this, this.bits, this.sharedMemory),
                        this.update(this.oKeyPad),
                        this.update(t),
                        w.prototype.finalize.call(this);
                    }
                  }),
                  (m.prototype.clone = function () {
                    var t = new m([], this.bits, !1);
                    this.copyTo(t), (t.inner = this.inner);
                    for (var e = 0; e < this.oKeyPad.length; ++e) t.oKeyPad[e] = this.oKeyPad[e];
                    return t;
                  });
                var _ = v(512);
                (_.sha512 = _),
                  (_.sha384 = v(384)),
                  (_.sha512_256 = v(256)),
                  (_.sha512_224 = v(224)),
                  (_.sha512.hmac = b(512)),
                  (_.sha384.hmac = b(384)),
                  (_.sha512_256.hmac = b(256)),
                  (_.sha512_224.hmac = b(224)),
                  s
                    ? (e.exports = _)
                    : ((o.sha512 = _.sha512),
                      (o.sha384 = _.sha384),
                      (o.sha512_256 = _.sha512_256),
                      (o.sha512_224 = _.sha512_224));
              })();
            }).call(this);
          }).call(
            this,
            t('_process'),
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                  ? window
                  : {},
          );
        },
        { _process: 35 },
      ],
      33: [
        function (t, e, r) {
          'use strict';
          !(function (t) {
            function n(t, e, r) {
              var n,
                i,
                o,
                d,
                p,
                y,
                v,
                g,
                b,
                w = 0,
                m = [],
                _ = 0,
                A = !1,
                x = [],
                E = [],
                k = !1,
                B = !1,
                S = -1;
              if (
                ((n = (r = r || {}).encoding || 'UTF8'),
                (b = r.numRounds || 1) !== parseInt(b, 10) || 1 > b)
              )
                throw Error('numRounds must a integer >= 1');
              if ('SHA-1' === t)
                (p = 512),
                  (y = N),
                  (v = F),
                  (d = 160),
                  (g = function (t) {
                    return t.slice();
                  });
              else if (0 === t.lastIndexOf('SHA-', 0))
                if (
                  ((y = function (e, r) {
                    return z(e, r, t);
                  }),
                  (v = function (e, r, n, i) {
                    var o, a;
                    if ('SHA-224' === t || 'SHA-256' === t)
                      (o = 15 + (((r + 65) >>> 9) << 4)), (a = 16);
                    else {
                      if ('SHA-384' !== t && 'SHA-512' !== t)
                        throw Error('Unexpected error in SHA-2 implementation');
                      (o = 31 + (((r + 129) >>> 10) << 5)), (a = 32);
                    }
                    for (; e.length <= o; ) e.push(0);
                    for (
                      e[r >>> 5] |= 128 << (24 - (r % 32)),
                        r += n,
                        e[o] = 4294967295 & r,
                        e[o - 1] = (r / 4294967296) | 0,
                        n = e.length,
                        r = 0;
                      r < n;
                      r += a
                    )
                      i = z(e.slice(r, r + a), i, t);
                    if ('SHA-224' === t) e = [i[0], i[1], i[2], i[3], i[4], i[5], i[6]];
                    else if ('SHA-256' === t) e = i;
                    else if ('SHA-384' === t)
                      e = [
                        i[0].a,
                        i[0].b,
                        i[1].a,
                        i[1].b,
                        i[2].a,
                        i[2].b,
                        i[3].a,
                        i[3].b,
                        i[4].a,
                        i[4].b,
                        i[5].a,
                        i[5].b,
                      ];
                    else {
                      if ('SHA-512' !== t) throw Error('Unexpected error in SHA-2 implementation');
                      e = [
                        i[0].a,
                        i[0].b,
                        i[1].a,
                        i[1].b,
                        i[2].a,
                        i[2].b,
                        i[3].a,
                        i[3].b,
                        i[4].a,
                        i[4].b,
                        i[5].a,
                        i[5].b,
                        i[6].a,
                        i[6].b,
                        i[7].a,
                        i[7].b,
                      ];
                    }
                    return e;
                  }),
                  (g = function (t) {
                    return t.slice();
                  }),
                  'SHA-224' === t)
                )
                  (p = 512), (d = 224);
                else if ('SHA-256' === t) (p = 512), (d = 256);
                else if ('SHA-384' === t) (p = 1024), (d = 384);
                else {
                  if ('SHA-512' !== t) throw Error('Chosen SHA variant is not supported');
                  (p = 1024), (d = 512);
                }
              else {
                if (0 !== t.lastIndexOf('SHA3-', 0) && 0 !== t.lastIndexOf('SHAKE', 0))
                  throw Error('Chosen SHA variant is not supported');
                var C = 6;
                if (
                  ((y = P),
                  (g = function (t) {
                    var e,
                      r = [];
                    for (e = 0; 5 > e; e += 1) r[e] = t[e].slice();
                    return r;
                  }),
                  (S = 1),
                  'SHA3-224' === t)
                )
                  (p = 1152), (d = 224);
                else if ('SHA3-256' === t) (p = 1088), (d = 256);
                else if ('SHA3-384' === t) (p = 832), (d = 384);
                else if ('SHA3-512' === t) (p = 576), (d = 512);
                else if ('SHAKE128' === t) (p = 1344), (d = -1), (C = 31), (B = !0);
                else {
                  if ('SHAKE256' !== t) throw Error('Chosen SHA variant is not supported');
                  (p = 1088), (d = -1), (C = 31), (B = !0);
                }
                v = function (t, e, r, n, i) {
                  var o,
                    a = C,
                    s = [],
                    u = (r = p) >>> 5,
                    f = 0,
                    h = e >>> 5;
                  for (o = 0; o < h && e >= r; o += u) (n = P(t.slice(o, o + u), n)), (e -= r);
                  for (t = t.slice(o), e %= r; t.length < u; ) t.push(0);
                  for (
                    t[(o = e >>> 3) >> 2] ^= a << ((o % 4) * 8),
                      t[u - 1] ^= 2147483648,
                      n = P(t, n);
                    32 * s.length < i &&
                    ((t = n[f % 5][(f / 5) | 0]), s.push(t.b), !(32 * s.length >= i));

                  )
                    s.push(t.a), 0 == (64 * (f += 1)) % r && (P(null, n), (f = 0));
                  return s;
                };
              }
              (o = l(e, n, S)),
                (i = M(t)),
                (this.setHMACKey = function (e, r, o) {
                  var a;
                  if (!0 === A) throw Error('HMAC key already set');
                  if (!0 === k) throw Error('Cannot set HMAC key after calling update');
                  if (!0 === B) throw Error('SHAKE is not supported for HMAC');
                  for (
                    e = (r = l(r, (n = (o || {}).encoding || 'UTF8'), S)(e)).binLen,
                      r = r.value,
                      o = (a = p >>> 3) / 4 - 1,
                      a < e / 8 && (r = v(r, e, 0, M(t), d));
                    r.length <= o;

                  )
                    r.push(0);
                  for (e = 0; e <= o; e += 1) (x[e] = 909522486 ^ r[e]), (E[e] = 1549556828 ^ r[e]);
                  (i = y(x, i)), (w = p), (A = !0);
                }),
                (this.update = function (t) {
                  var e,
                    r,
                    n,
                    a = 0,
                    s = p >>> 5;
                  for (t = (e = o(t, m, _)).binLen, r = e.value, e = t >>> 5, n = 0; n < e; n += s)
                    a + p <= t && ((i = y(r.slice(n, n + s), i)), (a += p));
                  (w += a), (m = r.slice(a >>> 5)), (_ = t % p), (k = !0);
                }),
                (this.getHash = function (e, r) {
                  var n, o, l, p;
                  if (!0 === A) throw Error('Cannot call getHash after setting HMAC key');
                  if (((l = c(r)), !0 === B)) {
                    if (-1 === l.shakeLen) throw Error('shakeLen must be specified in options');
                    d = l.shakeLen;
                  }
                  switch (e) {
                    case 'HEX':
                      n = function (t) {
                        return a(t, d, S, l);
                      };
                      break;
                    case 'B64':
                      n = function (t) {
                        return s(t, d, S, l);
                      };
                      break;
                    case 'BYTES':
                      n = function (t) {
                        return u(t, d, S);
                      };
                      break;
                    case 'ARRAYBUFFER':
                      try {
                        o = new ArrayBuffer(0);
                      } catch (t) {
                        throw Error('ARRAYBUFFER not supported by this environment');
                      }
                      n = function (t) {
                        return f(t, d, S);
                      };
                      break;
                    case 'UINT8ARRAY':
                      try {
                        o = new Uint8Array(0);
                      } catch (t) {
                        throw Error('UINT8ARRAY not supported by this environment');
                      }
                      n = function (t) {
                        return h(t, d, S);
                      };
                      break;
                    default:
                      throw Error('format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY');
                  }
                  for (p = v(m.slice(), _, w, g(i), d), o = 1; o < b; o += 1)
                    !0 === B && 0 != d % 32 && (p[p.length - 1] &= 16777215 >>> (24 - (d % 32))),
                      (p = v(p, d, 0, M(t), d));
                  return n(p);
                }),
                (this.getHMAC = function (e, r) {
                  var n, o, l, b;
                  if (!1 === A) throw Error('Cannot call getHMAC without first setting HMAC key');
                  switch (((l = c(r)), e)) {
                    case 'HEX':
                      n = function (t) {
                        return a(t, d, S, l);
                      };
                      break;
                    case 'B64':
                      n = function (t) {
                        return s(t, d, S, l);
                      };
                      break;
                    case 'BYTES':
                      n = function (t) {
                        return u(t, d, S);
                      };
                      break;
                    case 'ARRAYBUFFER':
                      try {
                        n = new ArrayBuffer(0);
                      } catch (t) {
                        throw Error('ARRAYBUFFER not supported by this environment');
                      }
                      n = function (t) {
                        return f(t, d, S);
                      };
                      break;
                    case 'UINT8ARRAY':
                      try {
                        n = new Uint8Array(0);
                      } catch (t) {
                        throw Error('UINT8ARRAY not supported by this environment');
                      }
                      n = function (t) {
                        return h(t, d, S);
                      };
                      break;
                    default:
                      throw Error(
                        'outputFormat must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY',
                      );
                  }
                  return (
                    (o = v(m.slice(), _, w, g(i), d)), (b = y(E, M(t))), n((b = v(o, d, p, b, d)))
                  );
                });
            }
            function i(t, e) {
              (this.a = t), (this.b = e);
            }
            function o(t, e, r, n) {
              var i, o, a, s, u;
              for (
                e = e || [0], o = (r = r || 0) >>> 3, u = -1 === n ? 3 : 0, i = 0;
                i < t.length;
                i += 1
              )
                (a = (s = i + o) >>> 2),
                  e.length <= a && e.push(0),
                  (e[a] |= t[i] << (8 * (u + (s % 4) * n)));
              return { value: e, binLen: 8 * t.length + r };
            }
            function a(t, e, r, n) {
              var i,
                o,
                a,
                s = '';
              for (e /= 8, a = -1 === r ? 3 : 0, i = 0; i < e; i += 1)
                (o = t[i >>> 2] >>> (8 * (a + (i % 4) * r))),
                  (s +=
                    '0123456789abcdef'.charAt((o >>> 4) & 15) + '0123456789abcdef'.charAt(15 & o));
              return n.outputUpper ? s.toUpperCase() : s;
            }
            function s(t, e, r, n) {
              var i,
                o,
                a,
                s,
                u = '',
                f = e / 8;
              for (s = -1 === r ? 3 : 0, i = 0; i < f; i += 3)
                for (
                  o = i + 1 < f ? t[(i + 1) >>> 2] : 0,
                    a = i + 2 < f ? t[(i + 2) >>> 2] : 0,
                    a =
                      (((t[i >>> 2] >>> (8 * (s + (i % 4) * r))) & 255) << 16) |
                      (((o >>> (8 * (s + ((i + 1) % 4) * r))) & 255) << 8) |
                      ((a >>> (8 * (s + ((i + 2) % 4) * r))) & 255),
                    o = 0;
                  4 > o;
                  o += 1
                )
                  u +=
                    8 * i + 6 * o <= e
                      ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(
                          (a >>> (6 * (3 - o))) & 63,
                        )
                      : n.b64Pad;
              return u;
            }
            function u(t, e, r) {
              var n,
                i,
                o,
                a = '';
              for (e /= 8, o = -1 === r ? 3 : 0, n = 0; n < e; n += 1)
                (i = (t[n >>> 2] >>> (8 * (o + (n % 4) * r))) & 255), (a += String.fromCharCode(i));
              return a;
            }
            function f(t, e, r) {
              e /= 8;
              var n,
                i,
                o,
                a = new ArrayBuffer(e);
              for (o = new Uint8Array(a), i = -1 === r ? 3 : 0, n = 0; n < e; n += 1)
                o[n] = (t[n >>> 2] >>> (8 * (i + (n % 4) * r))) & 255;
              return a;
            }
            function h(t, e, r) {
              e /= 8;
              var n,
                i,
                o = new Uint8Array(e);
              for (i = -1 === r ? 3 : 0, n = 0; n < e; n += 1)
                o[n] = (t[n >>> 2] >>> (8 * (i + (n % 4) * r))) & 255;
              return o;
            }
            function c(t) {
              var e = { outputUpper: !1, b64Pad: '=', shakeLen: -1 };
              if (
                ((t = t || {}),
                (e.outputUpper = t.outputUpper || !1),
                !0 === t.hasOwnProperty('b64Pad') && (e.b64Pad = t.b64Pad),
                !0 === t.hasOwnProperty('shakeLen'))
              ) {
                if (0 != t.shakeLen % 8) throw Error('shakeLen must be a multiple of 8');
                e.shakeLen = t.shakeLen;
              }
              if ('boolean' != typeof e.outputUpper)
                throw Error('Invalid outputUpper formatting option');
              if ('string' != typeof e.b64Pad) throw Error('Invalid b64Pad formatting option');
              return e;
            }
            function l(t, e, r) {
              switch (e) {
                case 'UTF8':
                case 'UTF16BE':
                case 'UTF16LE':
                  break;
                default:
                  throw Error('encoding must be UTF8, UTF16BE, or UTF16LE');
              }
              switch (t) {
                case 'HEX':
                  t = function (t, e, n) {
                    var i,
                      o,
                      a,
                      s,
                      u,
                      f,
                      h = t.length;
                    if (0 != h % 2) throw Error('String of HEX type must be in byte increments');
                    for (
                      e = e || [0], u = (n = n || 0) >>> 3, f = -1 === r ? 3 : 0, i = 0;
                      i < h;
                      i += 2
                    ) {
                      if (((o = parseInt(t.substr(i, 2), 16)), isNaN(o)))
                        throw Error('String of HEX type contains invalid characters');
                      for (a = (s = (i >>> 1) + u) >>> 2; e.length <= a; ) e.push(0);
                      e[a] |= o << (8 * (f + (s % 4) * r));
                    }
                    return { value: e, binLen: 4 * h + n };
                  };
                  break;
                case 'TEXT':
                  t = function (t, n, i) {
                    var o,
                      a,
                      s,
                      u,
                      f,
                      h,
                      c,
                      l,
                      d = 0;
                    if (((n = n || [0]), (f = (i = i || 0) >>> 3), 'UTF8' === e))
                      for (l = -1 === r ? 3 : 0, s = 0; s < t.length; s += 1)
                        for (
                          a = [],
                            128 > (o = t.charCodeAt(s))
                              ? a.push(o)
                              : 2048 > o
                                ? (a.push(192 | (o >>> 6)), a.push(128 | (63 & o)))
                                : 55296 > o || 57344 <= o
                                  ? a.push(224 | (o >>> 12), 128 | ((o >>> 6) & 63), 128 | (63 & o))
                                  : ((s += 1),
                                    (o = 65536 + (((1023 & o) << 10) | (1023 & t.charCodeAt(s)))),
                                    a.push(
                                      240 | (o >>> 18),
                                      128 | ((o >>> 12) & 63),
                                      128 | ((o >>> 6) & 63),
                                      128 | (63 & o),
                                    )),
                            u = 0;
                          u < a.length;
                          u += 1
                        ) {
                          for (h = (c = d + f) >>> 2; n.length <= h; ) n.push(0);
                          (n[h] |= a[u] << (8 * (l + (c % 4) * r))), (d += 1);
                        }
                    else if ('UTF16BE' === e || 'UTF16LE' === e)
                      for (
                        l = -1 === r ? 2 : 0,
                          a = ('UTF16LE' === e && 1 !== r) || ('UTF16LE' !== e && 1 === r),
                          s = 0;
                        s < t.length;
                        s += 1
                      ) {
                        for (
                          o = t.charCodeAt(s),
                            !0 === a && (o = ((u = 255 & o) << 8) | (o >>> 8)),
                            h = (c = d + f) >>> 2;
                          n.length <= h;

                        )
                          n.push(0);
                        (n[h] |= o << (8 * (l + (c % 4) * r))), (d += 2);
                      }
                    return { value: n, binLen: 8 * d + i };
                  };
                  break;
                case 'B64':
                  t = function (t, e, n) {
                    var i,
                      o,
                      a,
                      s,
                      u,
                      f,
                      h,
                      c,
                      l = 0;
                    if (-1 === t.search(/^[a-zA-Z0-9=+\/]+$/))
                      throw Error('Invalid character in base-64 string');
                    if (
                      ((o = t.indexOf('=')), (t = t.replace(/\=/g, '')), -1 !== o && o < t.length)
                    )
                      throw Error("Invalid '=' found in base-64 string");
                    for (
                      e = e || [0], f = (n = n || 0) >>> 3, c = -1 === r ? 3 : 0, o = 0;
                      o < t.length;
                      o += 4
                    ) {
                      for (u = t.substr(o, 4), a = s = 0; a < u.length; a += 1)
                        s |=
                          (i =
                            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.indexOf(
                              u.charAt(a),
                            )) <<
                          (18 - 6 * a);
                      for (a = 0; a < u.length - 1; a += 1) {
                        for (i = (h = l + f) >>> 2; e.length <= i; ) e.push(0);
                        (e[i] |= ((s >>> (16 - 8 * a)) & 255) << (8 * (c + (h % 4) * r))), (l += 1);
                      }
                    }
                    return { value: e, binLen: 8 * l + n };
                  };
                  break;
                case 'BYTES':
                  t = function (t, e, n) {
                    var i, o, a, s, u, f;
                    for (
                      e = e || [0], a = (n = n || 0) >>> 3, f = -1 === r ? 3 : 0, o = 0;
                      o < t.length;
                      o += 1
                    )
                      (i = t.charCodeAt(o)),
                        (s = (u = o + a) >>> 2),
                        e.length <= s && e.push(0),
                        (e[s] |= i << (8 * (f + (u % 4) * r)));
                    return { value: e, binLen: 8 * t.length + n };
                  };
                  break;
                case 'ARRAYBUFFER':
                  try {
                    t = new ArrayBuffer(0);
                  } catch (t) {
                    throw Error('ARRAYBUFFER not supported by this environment');
                  }
                  t = function (t, e, n) {
                    return o(new Uint8Array(t), e, n, r);
                  };
                  break;
                case 'UINT8ARRAY':
                  try {
                    t = new Uint8Array(0);
                  } catch (t) {
                    throw Error('UINT8ARRAY not supported by this environment');
                  }
                  t = function (t, e, n) {
                    return o(t, e, n, r);
                  };
                  break;
                default:
                  throw Error('format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY');
              }
              return t;
            }
            function d(t, e) {
              return (t << e) | (t >>> (32 - e));
            }
            function p(t, e) {
              return 32 < e
                ? ((e -= 32),
                  new i((t.b << e) | (t.a >>> (32 - e)), (t.a << e) | (t.b >>> (32 - e))))
                : 0 !== e
                  ? new i((t.a << e) | (t.b >>> (32 - e)), (t.b << e) | (t.a >>> (32 - e)))
                  : t;
            }
            function y(t, e) {
              return (t >>> e) | (t << (32 - e));
            }
            function v(t, e) {
              var r = null;
              r = new i(t.a, t.b);
              return 32 >= e
                ? new i(
                    (r.a >>> e) | ((r.b << (32 - e)) & 4294967295),
                    (r.b >>> e) | ((r.a << (32 - e)) & 4294967295),
                  )
                : new i(
                    (r.b >>> (e - 32)) | ((r.a << (64 - e)) & 4294967295),
                    (r.a >>> (e - 32)) | ((r.b << (64 - e)) & 4294967295),
                  );
            }
            function g(t, e) {
              return 32 >= e
                ? new i(t.a >>> e, (t.b >>> e) | ((t.a << (32 - e)) & 4294967295))
                : new i(0, t.a >>> (e - 32));
            }
            function b(t, e, r) {
              return (t & e) ^ (~t & r);
            }
            function w(t, e, r) {
              return new i((t.a & e.a) ^ (~t.a & r.a), (t.b & e.b) ^ (~t.b & r.b));
            }
            function m(t, e, r) {
              return (t & e) ^ (t & r) ^ (e & r);
            }
            function _(t, e, r) {
              return new i(
                (t.a & e.a) ^ (t.a & r.a) ^ (e.a & r.a),
                (t.b & e.b) ^ (t.b & r.b) ^ (e.b & r.b),
              );
            }
            function A(t) {
              return y(t, 2) ^ y(t, 13) ^ y(t, 22);
            }
            function x(t) {
              var e = v(t, 28),
                r = v(t, 34);
              return (t = v(t, 39)), new i(e.a ^ r.a ^ t.a, e.b ^ r.b ^ t.b);
            }
            function E(t) {
              return y(t, 6) ^ y(t, 11) ^ y(t, 25);
            }
            function k(t) {
              var e = v(t, 14),
                r = v(t, 18);
              return (t = v(t, 41)), new i(e.a ^ r.a ^ t.a, e.b ^ r.b ^ t.b);
            }
            function B(t) {
              return y(t, 7) ^ y(t, 18) ^ (t >>> 3);
            }
            function S(t) {
              var e = v(t, 1),
                r = v(t, 8);
              return (t = g(t, 7)), new i(e.a ^ r.a ^ t.a, e.b ^ r.b ^ t.b);
            }
            function C(t) {
              return y(t, 17) ^ y(t, 19) ^ (t >>> 10);
            }
            function U(t) {
              var e = v(t, 19),
                r = v(t, 61);
              return (t = g(t, 6)), new i(e.a ^ r.a ^ t.a, e.b ^ r.b ^ t.b);
            }
            function T(t, e) {
              var r = (65535 & t) + (65535 & e);
              return ((((t >>> 16) + (e >>> 16) + (r >>> 16)) & 65535) << 16) | (65535 & r);
            }
            function L(t, e, r, n) {
              var i = (65535 & t) + (65535 & e) + (65535 & r) + (65535 & n);
              return (
                ((((t >>> 16) + (e >>> 16) + (r >>> 16) + (n >>> 16) + (i >>> 16)) & 65535) << 16) |
                (65535 & i)
              );
            }
            function O(t, e, r, n, i) {
              var o = (65535 & t) + (65535 & e) + (65535 & r) + (65535 & n) + (65535 & i);
              return (
                ((((t >>> 16) + (e >>> 16) + (r >>> 16) + (n >>> 16) + (i >>> 16) + (o >>> 16)) &
                  65535) <<
                  16) |
                (65535 & o)
              );
            }
            function I(t, e) {
              var r, n, o;
              return (
                (r = (65535 & t.b) + (65535 & e.b)),
                (o =
                  ((65535 & (n = (t.b >>> 16) + (e.b >>> 16) + (r >>> 16))) << 16) | (65535 & r)),
                (r = (65535 & t.a) + (65535 & e.a) + (n >>> 16)),
                new i(
                  ((65535 & (n = (t.a >>> 16) + (e.a >>> 16) + (r >>> 16))) << 16) | (65535 & r),
                  o,
                )
              );
            }
            function R(t, e, r, n) {
              var o, a, s;
              return (
                (o = (65535 & t.b) + (65535 & e.b) + (65535 & r.b) + (65535 & n.b)),
                (s =
                  ((65535 &
                    (a = (t.b >>> 16) + (e.b >>> 16) + (r.b >>> 16) + (n.b >>> 16) + (o >>> 16))) <<
                    16) |
                  (65535 & o)),
                (o = (65535 & t.a) + (65535 & e.a) + (65535 & r.a) + (65535 & n.a) + (a >>> 16)),
                new i(
                  ((65535 &
                    (a = (t.a >>> 16) + (e.a >>> 16) + (r.a >>> 16) + (n.a >>> 16) + (o >>> 16))) <<
                    16) |
                    (65535 & o),
                  s,
                )
              );
            }
            function j(t, e, r, n, o) {
              var a, s, u;
              return (
                (a = (65535 & t.b) + (65535 & e.b) + (65535 & r.b) + (65535 & n.b) + (65535 & o.b)),
                (u =
                  ((65535 &
                    (s =
                      (t.b >>> 16) +
                      (e.b >>> 16) +
                      (r.b >>> 16) +
                      (n.b >>> 16) +
                      (o.b >>> 16) +
                      (a >>> 16))) <<
                    16) |
                  (65535 & a)),
                (a =
                  (65535 & t.a) +
                  (65535 & e.a) +
                  (65535 & r.a) +
                  (65535 & n.a) +
                  (65535 & o.a) +
                  (s >>> 16)),
                new i(
                  ((65535 &
                    (s =
                      (t.a >>> 16) +
                      (e.a >>> 16) +
                      (r.a >>> 16) +
                      (n.a >>> 16) +
                      (o.a >>> 16) +
                      (a >>> 16))) <<
                    16) |
                    (65535 & a),
                  u,
                )
              );
            }
            function H(t, e) {
              return new i(t.a ^ e.a, t.b ^ e.b);
            }
            function M(t) {
              var e,
                r = [];
              if ('SHA-1' === t) r = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
              else if (0 === t.lastIndexOf('SHA-', 0))
                switch (
                  ((r = [
                    3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025,
                    1694076839, 3204075428,
                  ]),
                  (e = [
                    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
                    528734635, 1541459225,
                  ]),
                  t)
                ) {
                  case 'SHA-224':
                    break;
                  case 'SHA-256':
                    r = e;
                    break;
                  case 'SHA-384':
                    r = [
                      new i(3418070365, r[0]),
                      new i(1654270250, r[1]),
                      new i(2438529370, r[2]),
                      new i(355462360, r[3]),
                      new i(1731405415, r[4]),
                      new i(41048885895, r[5]),
                      new i(3675008525, r[6]),
                      new i(1203062813, r[7]),
                    ];
                    break;
                  case 'SHA-512':
                    r = [
                      new i(e[0], 4089235720),
                      new i(e[1], 2227873595),
                      new i(e[2], 4271175723),
                      new i(e[3], 1595750129),
                      new i(e[4], 2917565137),
                      new i(e[5], 725511199),
                      new i(e[6], 4215389547),
                      new i(e[7], 327033209),
                    ];
                    break;
                  default:
                    throw Error('Unknown SHA variant');
                }
              else {
                if (0 !== t.lastIndexOf('SHA3-', 0) && 0 !== t.lastIndexOf('SHAKE', 0))
                  throw Error('No SHA variants supported');
                for (t = 0; 5 > t; t += 1)
                  r[t] = [new i(0, 0), new i(0, 0), new i(0, 0), new i(0, 0), new i(0, 0)];
              }
              return r;
            }
            function N(t, e) {
              var r,
                n,
                i,
                o,
                a,
                s,
                u,
                f = [];
              for (r = e[0], n = e[1], i = e[2], o = e[3], a = e[4], u = 0; 80 > u; u += 1)
                (f[u] = 16 > u ? t[u] : d(f[u - 3] ^ f[u - 8] ^ f[u - 14] ^ f[u - 16], 1)),
                  (s =
                    20 > u
                      ? O(d(r, 5), (n & i) ^ (~n & o), a, 1518500249, f[u])
                      : 40 > u
                        ? O(d(r, 5), n ^ i ^ o, a, 1859775393, f[u])
                        : 60 > u
                          ? O(d(r, 5), m(n, i, o), a, 2400959708, f[u])
                          : O(d(r, 5), n ^ i ^ o, a, 3395469782, f[u])),
                  (a = o),
                  (o = i),
                  (i = d(n, 30)),
                  (n = r),
                  (r = s);
              return (
                (e[0] = T(r, e[0])),
                (e[1] = T(n, e[1])),
                (e[2] = T(i, e[2])),
                (e[3] = T(o, e[3])),
                (e[4] = T(a, e[4])),
                e
              );
            }
            function F(t, e, r, n) {
              var i;
              for (i = 15 + (((e + 65) >>> 9) << 4); t.length <= i; ) t.push(0);
              for (
                t[e >>> 5] |= 128 << (24 - (e % 32)),
                  e += r,
                  t[i] = 4294967295 & e,
                  t[i - 1] = (e / 4294967296) | 0,
                  e = t.length,
                  i = 0;
                i < e;
                i += 16
              )
                n = N(t.slice(i, i + 16), n);
              return n;
            }
            function z(t, e, r) {
              var n,
                o,
                a,
                s,
                u,
                f,
                h,
                c,
                l,
                d,
                p,
                y,
                v,
                g,
                H,
                M,
                N,
                F,
                z,
                P,
                $,
                q,
                Y,
                X = [];
              if ('SHA-224' === r || 'SHA-256' === r)
                (d = 64),
                  (y = 1),
                  (q = Number),
                  (v = T),
                  (g = L),
                  (H = O),
                  (M = B),
                  (N = C),
                  (F = A),
                  (z = E),
                  ($ = m),
                  (P = b),
                  (Y = V);
              else {
                if ('SHA-384' !== r && 'SHA-512' !== r)
                  throw Error('Unexpected error in SHA-2 implementation');
                (d = 80),
                  (y = 2),
                  (q = i),
                  (v = I),
                  (g = R),
                  (H = j),
                  (M = S),
                  (N = U),
                  (F = x),
                  (z = k),
                  ($ = _),
                  (P = w),
                  (Y = D);
              }
              for (
                r = e[0],
                  n = e[1],
                  o = e[2],
                  a = e[3],
                  s = e[4],
                  u = e[5],
                  f = e[6],
                  h = e[7],
                  p = 0;
                p < d;
                p += 1
              )
                16 > p
                  ? ((l = p * y),
                    (c = t.length <= l ? 0 : t[l]),
                    (l = t.length <= l + 1 ? 0 : t[l + 1]),
                    (X[p] = new q(c, l)))
                  : (X[p] = g(N(X[p - 2]), X[p - 7], M(X[p - 15]), X[p - 16])),
                  (c = H(h, z(s), P(s, u, f), Y[p], X[p])),
                  (l = v(F(r), $(r, n, o))),
                  (h = f),
                  (f = u),
                  (u = s),
                  (s = v(a, c)),
                  (a = o),
                  (o = n),
                  (n = r),
                  (r = v(c, l));
              return (
                (e[0] = v(r, e[0])),
                (e[1] = v(n, e[1])),
                (e[2] = v(o, e[2])),
                (e[3] = v(a, e[3])),
                (e[4] = v(s, e[4])),
                (e[5] = v(u, e[5])),
                (e[6] = v(f, e[6])),
                (e[7] = v(h, e[7])),
                e
              );
            }
            function P(t, e) {
              var r,
                n,
                o,
                a,
                s = [],
                u = [];
              if (null !== t)
                for (n = 0; n < t.length; n += 2)
                  e[(n >>> 1) % 5][((n >>> 1) / 5) | 0] = H(
                    e[(n >>> 1) % 5][((n >>> 1) / 5) | 0],
                    new i(t[n + 1], t[n]),
                  );
              for (r = 0; 24 > r; r += 1) {
                for (a = M('SHA3-'), n = 0; 5 > n; n += 1) {
                  o = e[n][0];
                  var f = e[n][1],
                    h = e[n][2],
                    c = e[n][3],
                    l = e[n][4];
                  s[n] = new i(o.a ^ f.a ^ h.a ^ c.a ^ l.a, o.b ^ f.b ^ h.b ^ c.b ^ l.b);
                }
                for (n = 0; 5 > n; n += 1) u[n] = H(s[(n + 4) % 5], p(s[(n + 1) % 5], 1));
                for (n = 0; 5 > n; n += 1) for (o = 0; 5 > o; o += 1) e[n][o] = H(e[n][o], u[n]);
                for (n = 0; 5 > n; n += 1)
                  for (o = 0; 5 > o; o += 1) a[o][(2 * n + 3 * o) % 5] = p(e[n][o], $[n][o]);
                for (n = 0; 5 > n; n += 1)
                  for (o = 0; 5 > o; o += 1)
                    e[n][o] = H(
                      a[n][o],
                      new i(
                        ~a[(n + 1) % 5][o].a & a[(n + 2) % 5][o].a,
                        ~a[(n + 1) % 5][o].b & a[(n + 2) % 5][o].b,
                      ),
                    );
                e[0][0] = H(e[0][0], q[r]);
              }
              return e;
            }
            var V, D, $, q;
            (D = [
              new i(
                (V = [
                  1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748,
                  2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206,
                  2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983,
                  1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808,
                  3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912,
                  1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
                  2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804,
                  4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571,
                  1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452,
                  2361852424, 2428436474, 2756734187, 3204031479, 3329325298,
                ])[0],
                3609767458,
              ),
              new i(V[1], 602891725),
              new i(V[2], 3964484399),
              new i(V[3], 2173295548),
              new i(V[4], 4081628472),
              new i(V[5], 3053834265),
              new i(V[6], 2937671579),
              new i(V[7], 3664609560),
              new i(V[8], 2734883394),
              new i(V[9], 1164996542),
              new i(V[10], 1323610764),
              new i(V[11], 3590304994),
              new i(V[12], 4068182383),
              new i(V[13], 991336113),
              new i(V[14], 633803317),
              new i(V[15], 3479774868),
              new i(V[16], 2666613458),
              new i(V[17], 944711139),
              new i(V[18], 2341262773),
              new i(V[19], 2007800933),
              new i(V[20], 1495990901),
              new i(V[21], 1856431235),
              new i(V[22], 3175218132),
              new i(V[23], 2198950837),
              new i(V[24], 3999719339),
              new i(V[25], 766784016),
              new i(V[26], 2566594879),
              new i(V[27], 3203337956),
              new i(V[28], 1034457026),
              new i(V[29], 2466948901),
              new i(V[30], 3758326383),
              new i(V[31], 168717936),
              new i(V[32], 1188179964),
              new i(V[33], 1546045734),
              new i(V[34], 1522805485),
              new i(V[35], 2643833823),
              new i(V[36], 2343527390),
              new i(V[37], 1014477480),
              new i(V[38], 1206759142),
              new i(V[39], 344077627),
              new i(V[40], 1290863460),
              new i(V[41], 3158454273),
              new i(V[42], 3505952657),
              new i(V[43], 106217008),
              new i(V[44], 3606008344),
              new i(V[45], 1432725776),
              new i(V[46], 1467031594),
              new i(V[47], 851169720),
              new i(V[48], 3100823752),
              new i(V[49], 1363258195),
              new i(V[50], 3750685593),
              new i(V[51], 3785050280),
              new i(V[52], 3318307427),
              new i(V[53], 3812723403),
              new i(V[54], 2003034995),
              new i(V[55], 3602036899),
              new i(V[56], 1575990012),
              new i(V[57], 1125592928),
              new i(V[58], 2716904306),
              new i(V[59], 442776044),
              new i(V[60], 593698344),
              new i(V[61], 3733110249),
              new i(V[62], 2999351573),
              new i(V[63], 3815920427),
              new i(3391569614, 3928383900),
              new i(3515267271, 566280711),
              new i(3940187606, 3454069534),
              new i(4118630271, 4000239992),
              new i(116418474, 1914138554),
              new i(174292421, 2731055270),
              new i(289380356, 3203993006),
              new i(460393269, 320620315),
              new i(685471733, 587496836),
              new i(852142971, 1086792851),
              new i(1017036298, 365543100),
              new i(1126000580, 2618297676),
              new i(1288033470, 3409855158),
              new i(1501505948, 4234509866),
              new i(1607167915, 987167468),
              new i(1816402316, 1246189591),
            ]),
              (q = [
                new i(0, 1),
                new i(0, 32898),
                new i(2147483648, 32906),
                new i(2147483648, 2147516416),
                new i(0, 32907),
                new i(0, 2147483649),
                new i(2147483648, 2147516545),
                new i(2147483648, 32777),
                new i(0, 138),
                new i(0, 136),
                new i(0, 2147516425),
                new i(0, 2147483658),
                new i(0, 2147516555),
                new i(2147483648, 139),
                new i(2147483648, 32905),
                new i(2147483648, 32771),
                new i(2147483648, 32770),
                new i(2147483648, 128),
                new i(0, 32778),
                new i(2147483648, 2147483658),
                new i(2147483648, 2147516545),
                new i(2147483648, 32896),
                new i(0, 2147483649),
                new i(2147483648, 2147516424),
              ]),
              ($ = [
                [0, 36, 3, 41, 18],
                [1, 44, 10, 45, 2],
                [62, 6, 43, 15, 61],
                [28, 55, 25, 21, 56],
                [27, 20, 39, 8, 14],
              ]),
              void 0 !== r
                ? (void 0 !== e && e.exports && (e.exports = n), (r = n))
                : (t.jsSHA = n);
          })(this);
        },
        {},
      ],
      34: [
        function (t, e, r) {
          (function (t) {
            (function () {
              var n = 200,
                i = '__lodash_hash_undefined__',
                o = 1,
                a = 2,
                s = 9007199254740991,
                u = '[object Arguments]',
                f = '[object Array]',
                h = '[object AsyncFunction]',
                c = '[object Boolean]',
                l = '[object Date]',
                d = '[object Error]',
                p = '[object Function]',
                y = '[object GeneratorFunction]',
                v = '[object Map]',
                g = '[object Number]',
                b = '[object Null]',
                w = '[object Object]',
                m = '[object Proxy]',
                _ = '[object RegExp]',
                A = '[object Set]',
                x = '[object String]',
                E = '[object Symbol]',
                k = '[object Undefined]',
                B = '[object ArrayBuffer]',
                S = '[object DataView]',
                C = /^\[object .+?Constructor\]$/,
                U = /^(?:0|[1-9]\d*)$/,
                T = {};
              (T['[object Float32Array]'] =
                T['[object Float64Array]'] =
                T['[object Int8Array]'] =
                T['[object Int16Array]'] =
                T['[object Int32Array]'] =
                T['[object Uint8Array]'] =
                T['[object Uint8ClampedArray]'] =
                T['[object Uint16Array]'] =
                T['[object Uint32Array]'] =
                  !0),
                (T[u] =
                  T[f] =
                  T[B] =
                  T[c] =
                  T[S] =
                  T[l] =
                  T[d] =
                  T[p] =
                  T[v] =
                  T[g] =
                  T[w] =
                  T[_] =
                  T[A] =
                  T[x] =
                  T['[object WeakMap]'] =
                    !1);
              var L = 'object' == typeof t && t && t.Object === Object && t,
                O = 'object' == typeof self && self && self.Object === Object && self,
                I = L || O || Function('return this')(),
                R = 'object' == typeof r && r && !r.nodeType && r,
                j = R && 'object' == typeof e && e && !e.nodeType && e,
                H = j && j.exports === R,
                M = H && L.process,
                N = (function () {
                  try {
                    return M && M.binding && M.binding('util');
                  } catch (t) {}
                })(),
                F = N && N.isTypedArray;
              function z(t, e) {
                for (var r = -1, n = null == t ? 0 : t.length; ++r < n; )
                  if (e(t[r], r, t)) return !0;
                return !1;
              }
              function P(t) {
                var e = -1,
                  r = Array(t.size);
                return (
                  t.forEach(function (t, n) {
                    r[++e] = [n, t];
                  }),
                  r
                );
              }
              function V(t) {
                var e = -1,
                  r = Array(t.size);
                return (
                  t.forEach(function (t) {
                    r[++e] = t;
                  }),
                  r
                );
              }
              var D,
                $,
                q,
                Y = Array.prototype,
                X = Function.prototype,
                J = Object.prototype,
                W = I['__core-js_shared__'],
                Z = X.toString,
                G = J.hasOwnProperty,
                K = (D = /[^.]+$/.exec((W && W.keys && W.keys.IE_PROTO) || ''))
                  ? 'Symbol(src)_1.' + D
                  : '',
                Q = J.toString,
                tt = RegExp(
                  '^' +
                    Z.call(G)
                      .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
                    '$',
                ),
                et = H ? I.Buffer : void 0,
                rt = I.Symbol,
                nt = I.Uint8Array,
                it = J.propertyIsEnumerable,
                ot = Y.splice,
                at = rt ? rt.toStringTag : void 0,
                st = Object.getOwnPropertySymbols,
                ut = et ? et.isBuffer : void 0,
                ft =
                  (($ = Object.keys),
                  (q = Object),
                  function (t) {
                    return $(q(t));
                  }),
                ht = Nt(I, 'DataView'),
                ct = Nt(I, 'Map'),
                lt = Nt(I, 'Promise'),
                dt = Nt(I, 'Set'),
                pt = Nt(I, 'WeakMap'),
                yt = Nt(Object, 'create'),
                vt = Vt(ht),
                gt = Vt(ct),
                bt = Vt(lt),
                wt = Vt(dt),
                mt = Vt(pt),
                _t = rt ? rt.prototype : void 0,
                At = _t ? _t.valueOf : void 0;
              function xt(t) {
                var e = -1,
                  r = null == t ? 0 : t.length;
                for (this.clear(); ++e < r; ) {
                  var n = t[e];
                  this.set(n[0], n[1]);
                }
              }
              function Et(t) {
                var e = -1,
                  r = null == t ? 0 : t.length;
                for (this.clear(); ++e < r; ) {
                  var n = t[e];
                  this.set(n[0], n[1]);
                }
              }
              function kt(t) {
                var e = -1,
                  r = null == t ? 0 : t.length;
                for (this.clear(); ++e < r; ) {
                  var n = t[e];
                  this.set(n[0], n[1]);
                }
              }
              function Bt(t) {
                var e = -1,
                  r = null == t ? 0 : t.length;
                for (this.__data__ = new kt(); ++e < r; ) this.add(t[e]);
              }
              function St(t) {
                var e = (this.__data__ = new Et(t));
                this.size = e.size;
              }
              function Ct(t, e) {
                var r = qt(t),
                  n = !r && $t(t),
                  i = !r && !n && Yt(t),
                  o = !r && !n && !i && Gt(t),
                  a = r || n || i || o,
                  s = a
                    ? (function (t, e) {
                        for (var r = -1, n = Array(t); ++r < t; ) n[r] = e(r);
                        return n;
                      })(t.length, String)
                    : [],
                  u = s.length;
                for (var f in t)
                  (!e && !G.call(t, f)) ||
                    (a &&
                      ('length' == f ||
                        (i && ('offset' == f || 'parent' == f)) ||
                        (o && ('buffer' == f || 'byteLength' == f || 'byteOffset' == f)) ||
                        Pt(f, u))) ||
                    s.push(f);
                return s;
              }
              function Ut(t, e) {
                for (var r = t.length; r--; ) if (Dt(t[r][0], e)) return r;
                return -1;
              }
              function Tt(t) {
                return null == t
                  ? void 0 === t
                    ? k
                    : b
                  : at && at in Object(t)
                    ? (function (t) {
                        var e = G.call(t, at),
                          r = t[at];
                        try {
                          t[at] = void 0;
                          var n = !0;
                        } catch (t) {}
                        var i = Q.call(t);
                        n && (e ? (t[at] = r) : delete t[at]);
                        return i;
                      })(t)
                    : (function (t) {
                        return Q.call(t);
                      })(t);
              }
              function Lt(t) {
                return Zt(t) && Tt(t) == u;
              }
              function Ot(t, e, r, n, i) {
                return (
                  t === e ||
                  (null == t || null == e || (!Zt(t) && !Zt(e))
                    ? t != t && e != e
                    : (function (t, e, r, n, i, s) {
                        var h = qt(t),
                          p = qt(e),
                          y = h ? f : zt(t),
                          b = p ? f : zt(e),
                          m = (y = y == u ? w : y) == w,
                          k = (b = b == u ? w : b) == w,
                          C = y == b;
                        if (C && Yt(t)) {
                          if (!Yt(e)) return !1;
                          (h = !0), (m = !1);
                        }
                        if (C && !m)
                          return (
                            s || (s = new St()),
                            h || Gt(t)
                              ? jt(t, e, r, n, i, s)
                              : (function (t, e, r, n, i, s, u) {
                                  switch (r) {
                                    case S:
                                      if (
                                        t.byteLength != e.byteLength ||
                                        t.byteOffset != e.byteOffset
                                      )
                                        return !1;
                                      (t = t.buffer), (e = e.buffer);
                                    case B:
                                      return !(
                                        t.byteLength != e.byteLength || !s(new nt(t), new nt(e))
                                      );
                                    case c:
                                    case l:
                                    case g:
                                      return Dt(+t, +e);
                                    case d:
                                      return t.name == e.name && t.message == e.message;
                                    case _:
                                    case x:
                                      return t == e + '';
                                    case v:
                                      var f = P;
                                    case A:
                                      var h = n & o;
                                      if ((f || (f = V), t.size != e.size && !h)) return !1;
                                      var p = u.get(t);
                                      if (p) return p == e;
                                      (n |= a), u.set(t, e);
                                      var y = jt(f(t), f(e), n, i, s, u);
                                      return u.delete(t), y;
                                    case E:
                                      if (At) return At.call(t) == At.call(e);
                                  }
                                  return !1;
                                })(t, e, y, r, n, i, s)
                          );
                        if (!(r & o)) {
                          var U = m && G.call(t, '__wrapped__'),
                            T = k && G.call(e, '__wrapped__');
                          if (U || T) {
                            var L = U ? t.value() : t,
                              O = T ? e.value() : e;
                            return s || (s = new St()), i(L, O, r, n, s);
                          }
                        }
                        if (!C) return !1;
                        return (
                          s || (s = new St()),
                          (function (t, e, r, n, i, a) {
                            var s = r & o,
                              u = Ht(t),
                              f = u.length,
                              h = Ht(e).length;
                            if (f != h && !s) return !1;
                            for (var c = f; c--; ) {
                              var l = u[c];
                              if (!(s ? l in e : G.call(e, l))) return !1;
                            }
                            var d = a.get(t);
                            if (d && a.get(e)) return d == e;
                            var p = !0;
                            a.set(t, e), a.set(e, t);
                            for (var y = s; ++c < f; ) {
                              l = u[c];
                              var v = t[l],
                                g = e[l];
                              if (n) var b = s ? n(g, v, l, e, t, a) : n(v, g, l, t, e, a);
                              if (!(void 0 === b ? v === g || i(v, g, r, n, a) : b)) {
                                p = !1;
                                break;
                              }
                              y || (y = 'constructor' == l);
                            }
                            if (p && !y) {
                              var w = t.constructor,
                                m = e.constructor;
                              w != m &&
                                'constructor' in t &&
                                'constructor' in e &&
                                !(
                                  'function' == typeof w &&
                                  w instanceof w &&
                                  'function' == typeof m &&
                                  m instanceof m
                                ) &&
                                (p = !1);
                            }
                            return a.delete(t), a.delete(e), p;
                          })(t, e, r, n, i, s)
                        );
                      })(t, e, r, n, Ot, i))
                );
              }
              function It(t) {
                return !(!Wt(t) || (K && K in t)) && (Xt(t) ? tt : C).test(Vt(t));
              }
              function Rt(t) {
                if (
                  ((r = (e = t) && e.constructor),
                  (n = ('function' == typeof r && r.prototype) || J),
                  e !== n)
                )
                  return ft(t);
                var e,
                  r,
                  n,
                  i = [];
                for (var o in Object(t)) G.call(t, o) && 'constructor' != o && i.push(o);
                return i;
              }
              function jt(t, e, r, n, i, s) {
                var u = r & o,
                  f = t.length,
                  h = e.length;
                if (f != h && !(u && h > f)) return !1;
                var c = s.get(t);
                if (c && s.get(e)) return c == e;
                var l = -1,
                  d = !0,
                  p = r & a ? new Bt() : void 0;
                for (s.set(t, e), s.set(e, t); ++l < f; ) {
                  var y = t[l],
                    v = e[l];
                  if (n) var g = u ? n(v, y, l, e, t, s) : n(y, v, l, t, e, s);
                  if (void 0 !== g) {
                    if (g) continue;
                    d = !1;
                    break;
                  }
                  if (p) {
                    if (
                      !z(e, function (t, e) {
                        if (((o = e), !p.has(o) && (y === t || i(y, t, r, n, s)))) return p.push(e);
                        var o;
                      })
                    ) {
                      d = !1;
                      break;
                    }
                  } else if (y !== v && !i(y, v, r, n, s)) {
                    d = !1;
                    break;
                  }
                }
                return s.delete(t), s.delete(e), d;
              }
              function Ht(t) {
                return (function (t, e, r) {
                  var n = e(t);
                  return qt(t)
                    ? n
                    : (function (t, e) {
                        for (var r = -1, n = e.length, i = t.length; ++r < n; ) t[i + r] = e[r];
                        return t;
                      })(n, r(t));
                })(t, Kt, Ft);
              }
              function Mt(t, e) {
                var r,
                  n,
                  i = t.__data__;
                return (
                  'string' == (n = typeof (r = e)) ||
                  'number' == n ||
                  'symbol' == n ||
                  'boolean' == n
                    ? '__proto__' !== r
                    : null === r
                )
                  ? i['string' == typeof e ? 'string' : 'hash']
                  : i.map;
              }
              function Nt(t, e) {
                var r = (function (t, e) {
                  return null == t ? void 0 : t[e];
                })(t, e);
                return It(r) ? r : void 0;
              }
              (xt.prototype.clear = function () {
                (this.__data__ = yt ? yt(null) : {}), (this.size = 0);
              }),
                (xt.prototype.delete = function (t) {
                  var e = this.has(t) && delete this.__data__[t];
                  return (this.size -= e ? 1 : 0), e;
                }),
                (xt.prototype.get = function (t) {
                  var e = this.__data__;
                  if (yt) {
                    var r = e[t];
                    return r === i ? void 0 : r;
                  }
                  return G.call(e, t) ? e[t] : void 0;
                }),
                (xt.prototype.has = function (t) {
                  var e = this.__data__;
                  return yt ? void 0 !== e[t] : G.call(e, t);
                }),
                (xt.prototype.set = function (t, e) {
                  var r = this.__data__;
                  return (
                    (this.size += this.has(t) ? 0 : 1), (r[t] = yt && void 0 === e ? i : e), this
                  );
                }),
                (Et.prototype.clear = function () {
                  (this.__data__ = []), (this.size = 0);
                }),
                (Et.prototype.delete = function (t) {
                  var e = this.__data__,
                    r = Ut(e, t);
                  return !(
                    r < 0 || (r == e.length - 1 ? e.pop() : ot.call(e, r, 1), --this.size, 0)
                  );
                }),
                (Et.prototype.get = function (t) {
                  var e = this.__data__,
                    r = Ut(e, t);
                  return r < 0 ? void 0 : e[r][1];
                }),
                (Et.prototype.has = function (t) {
                  return Ut(this.__data__, t) > -1;
                }),
                (Et.prototype.set = function (t, e) {
                  var r = this.__data__,
                    n = Ut(r, t);
                  return n < 0 ? (++this.size, r.push([t, e])) : (r[n][1] = e), this;
                }),
                (kt.prototype.clear = function () {
                  (this.size = 0),
                    (this.__data__ = {
                      hash: new xt(),
                      map: new (ct || Et)(),
                      string: new xt(),
                    });
                }),
                (kt.prototype.delete = function (t) {
                  var e = Mt(this, t).delete(t);
                  return (this.size -= e ? 1 : 0), e;
                }),
                (kt.prototype.get = function (t) {
                  return Mt(this, t).get(t);
                }),
                (kt.prototype.has = function (t) {
                  return Mt(this, t).has(t);
                }),
                (kt.prototype.set = function (t, e) {
                  var r = Mt(this, t),
                    n = r.size;
                  return r.set(t, e), (this.size += r.size == n ? 0 : 1), this;
                }),
                (Bt.prototype.add = Bt.prototype.push =
                  function (t) {
                    return this.__data__.set(t, i), this;
                  }),
                (Bt.prototype.has = function (t) {
                  return this.__data__.has(t);
                }),
                (St.prototype.clear = function () {
                  (this.__data__ = new Et()), (this.size = 0);
                }),
                (St.prototype.delete = function (t) {
                  var e = this.__data__,
                    r = e.delete(t);
                  return (this.size = e.size), r;
                }),
                (St.prototype.get = function (t) {
                  return this.__data__.get(t);
                }),
                (St.prototype.has = function (t) {
                  return this.__data__.has(t);
                }),
                (St.prototype.set = function (t, e) {
                  var r = this.__data__;
                  if (r instanceof Et) {
                    var i = r.__data__;
                    if (!ct || i.length < n - 1)
                      return i.push([t, e]), (this.size = ++r.size), this;
                    r = this.__data__ = new kt(i);
                  }
                  return r.set(t, e), (this.size = r.size), this;
                });
              var Ft = st
                  ? function (t) {
                      return null == t
                        ? []
                        : ((t = Object(t)),
                          (function (t, e) {
                            for (
                              var r = -1, n = null == t ? 0 : t.length, i = 0, o = [];
                              ++r < n;

                            ) {
                              var a = t[r];
                              e(a, r, t) && (o[i++] = a);
                            }
                            return o;
                          })(st(t), function (e) {
                            return it.call(t, e);
                          }));
                    }
                  : function () {
                      return [];
                    },
                zt = Tt;
              function Pt(t, e) {
                return (
                  !!(e = null == e ? s : e) &&
                  ('number' == typeof t || U.test(t)) &&
                  t > -1 &&
                  t % 1 == 0 &&
                  t < e
                );
              }
              function Vt(t) {
                if (null != t) {
                  try {
                    return Z.call(t);
                  } catch (t) {}
                  try {
                    return t + '';
                  } catch (t) {}
                }
                return '';
              }
              function Dt(t, e) {
                return t === e || (t != t && e != e);
              }
              ((ht && zt(new ht(new ArrayBuffer(1))) != S) ||
                (ct && zt(new ct()) != v) ||
                (lt && '[object Promise]' != zt(lt.resolve())) ||
                (dt && zt(new dt()) != A) ||
                (pt && '[object WeakMap]' != zt(new pt()))) &&
                (zt = function (t) {
                  var e = Tt(t),
                    r = e == w ? t.constructor : void 0,
                    n = r ? Vt(r) : '';
                  if (n)
                    switch (n) {
                      case vt:
                        return S;
                      case gt:
                        return v;
                      case bt:
                        return '[object Promise]';
                      case wt:
                        return A;
                      case mt:
                        return '[object WeakMap]';
                    }
                  return e;
                });
              var $t = Lt(
                  (function () {
                    return arguments;
                  })(),
                )
                  ? Lt
                  : function (t) {
                      return Zt(t) && G.call(t, 'callee') && !it.call(t, 'callee');
                    },
                qt = Array.isArray;
              var Yt =
                ut ||
                function () {
                  return !1;
                };
              function Xt(t) {
                if (!Wt(t)) return !1;
                var e = Tt(t);
                return e == p || e == y || e == h || e == m;
              }
              function Jt(t) {
                return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= s;
              }
              function Wt(t) {
                var e = typeof t;
                return null != t && ('object' == e || 'function' == e);
              }
              function Zt(t) {
                return null != t && 'object' == typeof t;
              }
              var Gt = F
                ? (function (t) {
                    return function (e) {
                      return t(e);
                    };
                  })(F)
                : function (t) {
                    return Zt(t) && Jt(t.length) && !!T[Tt(t)];
                  };
              function Kt(t) {
                return null != (e = t) && Jt(e.length) && !Xt(e) ? Ct(t) : Rt(t);
                var e;
              }
              e.exports = function (t, e) {
                return Ot(t, e);
              };
            }).call(this);
          }).call(
            this,
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                  ? window
                  : {},
          );
        },
        {},
      ],
      35: [
        function (t, e, r) {
          var n,
            i,
            o = (e.exports = {});
          function a() {
            throw new Error('setTimeout has not been defined');
          }
          function s() {
            throw new Error('clearTimeout has not been defined');
          }
          function u(t) {
            if (n === setTimeout) return setTimeout(t, 0);
            if ((n === a || !n) && setTimeout) return (n = setTimeout), setTimeout(t, 0);
            try {
              return n(t, 0);
            } catch (e) {
              try {
                return n.call(null, t, 0);
              } catch (e) {
                return n.call(this, t, 0);
              }
            }
          }
          !(function () {
            try {
              n = 'function' == typeof setTimeout ? setTimeout : a;
            } catch (t) {
              n = a;
            }
            try {
              i = 'function' == typeof clearTimeout ? clearTimeout : s;
            } catch (t) {
              i = s;
            }
          })();
          var f,
            h = [],
            c = !1,
            l = -1;
          function d() {
            c && f && ((c = !1), f.length ? (h = f.concat(h)) : (l = -1), h.length && p());
          }
          function p() {
            if (!c) {
              var t = u(d);
              c = !0;
              for (var e = h.length; e; ) {
                for (f = h, h = []; ++l < e; ) f && f[l].run();
                (l = -1), (e = h.length);
              }
              (f = null),
                (c = !1),
                (function (t) {
                  if (i === clearTimeout) return clearTimeout(t);
                  if ((i === s || !i) && clearTimeout) return (i = clearTimeout), clearTimeout(t);
                  try {
                    i(t);
                  } catch (e) {
                    try {
                      return i.call(null, t);
                    } catch (e) {
                      return i.call(this, t);
                    }
                  }
                })(t);
            }
          }
          function y(t, e) {
            (this.fun = t), (this.array = e);
          }
          function v() {}
          (o.nextTick = function (t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
              for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
            h.push(new y(t, e)), 1 !== h.length || c || u(p);
          }),
            (y.prototype.run = function () {
              this.fun.apply(null, this.array);
            }),
            (o.title = 'browser'),
            (o.browser = !0),
            (o.env = {}),
            (o.argv = []),
            (o.version = ''),
            (o.versions = {}),
            (o.on = v),
            (o.addListener = v),
            (o.once = v),
            (o.off = v),
            (o.removeListener = v),
            (o.removeAllListeners = v),
            (o.emit = v),
            (o.prependListener = v),
            (o.prependOnceListener = v),
            (o.listeners = function (t) {
              return [];
            }),
            (o.binding = function (t) {
              throw new Error('process.binding is not supported');
            }),
            (o.cwd = function () {
              return '/';
            }),
            (o.chdir = function (t) {
              throw new Error('process.chdir is not supported');
            }),
            (o.umask = function () {
              return 0;
            });
        },
        {},
      ],
      36: [
        function (t, e, r) {
          var n = t('buffer'),
            i = n.Buffer;
          function o(t, e) {
            for (var r in t) e[r] = t[r];
          }
          function a(t, e, r) {
            return i(t, e, r);
          }
          i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow
            ? (e.exports = n)
            : (o(n, r), (r.Buffer = a)),
            o(i, a),
            (a.from = function (t, e, r) {
              if ('number' == typeof t) throw new TypeError('Argument must not be a number');
              return i(t, e, r);
            }),
            (a.alloc = function (t, e, r) {
              if ('number' != typeof t) throw new TypeError('Argument must be a number');
              var n = i(t);
              return (
                void 0 !== e ? ('string' == typeof r ? n.fill(e, r) : n.fill(e)) : n.fill(0), n
              );
            }),
            (a.allocUnsafe = function (t) {
              if ('number' != typeof t) throw new TypeError('Argument must be a number');
              return i(t);
            }),
            (a.allocUnsafeSlow = function (t) {
              if ('number' != typeof t) throw new TypeError('Argument must be a number');
              return n.SlowBuffer(t);
            });
        },
        { buffer: 4 },
      ],
      37: [
        function (t, e, r) {
          var n = t('cbor-js'),
            i = t('crc'),
            o = t('./crypto/base58'),
            a = t('./bip173_validator');
          function s(t) {
            var e = (function (t) {
              try {
                var e = o.decode(t);
                return n.decode(new Uint8Array(e).buffer);
              } catch (t) {
                return null;
              }
            })(t);
            if (!e || (!Array.isArray(e) && 2 != e.length)) return !1;
            var r = e[0],
              a = e[1];
            return 'number' == typeof a && i.crc32(r) == a;
          }
          e.exports = {
            isValidAddress: function (t, e, r = {}) {
              return (
                s(t) ||
                (function (t, e, r) {
                  return a.isValidAddress(t, e, r);
                })(t, e, r)
              );
            },
          };
        },
        {
          './bip173_validator': 41,
          './crypto/base58': 44,
          'cbor-js': 5,
          crc: 30,
        },
      ],
      38: [
        function (t, e, r) {
          const n = t('./crypto/utils');
          e.exports = {
            isValidAddress: function (t, e, r = {}) {
              const { networkType: n = 'prod' } = r;
              return this.verifyChecksum(t);
            },
            verifyChecksum: function (t) {
              if (58 !== t.length) return !1;
              {
                const e = n.base32.b32decode(t),
                  r = e.slice(0, e.length - 4),
                  i = n.byteArray2hexStr(e.slice(-4)).toString('HEX');
                return n.sha512_256(n.byteArray2hexStr(r)).substr(-8) === i;
              }
            },
          };
        },
        { './crypto/utils': 52 },
      ],
      39: [
        function (t, e, r) {
          const n = t('./crypto/base58');
          e.exports = {
            isValidAddress: function (t, e, r = {}) {
              try {
                if (!t || 0 == t.length) return !1;
                if (e.minLength && t.length < e.minLength) return !1;
                if (e.maxLength && t.length > e.maxLength) return !1;
                try {
                  const e = n.decode(t);
                  if (!e || !e.length) return !1;
                } catch (t) {
                  return !1;
                }
                return !0;
              } catch (t) {
                return !1;
              }
            },
          };
        },
        { './crypto/base58': 44 },
      ],
      40: [
        function (t, e, r) {
          var n = t('./crypto/utils'),
            i = t('./crypto/bech32'),
            o = t('./bitcoin_validator');
          e.exports = {
            isValidAddress: function (t, e, r) {
              return (
                (function (t, e, r) {
                  var o,
                    a = r ? r.networkType : '',
                    s = 'bitcoincash',
                    u = new RegExp(e.regexp),
                    f = t.split(':');
                  if (1 === f.length) o = t;
                  else {
                    if ('bitcoincash' !== f[0]) return !1;
                    o = f[1];
                  }
                  if (!u.test(o)) return !1;
                  if (o.toLowerCase() != o && o.toUpperCase() != o) return !1;
                  var h = n.base32.b32decode(o);
                  'testnet' === a && (s = 'bchtest');
                  try {
                    if (i.verifyChecksum(s, h, i.encodings.BECH32)) return !1;
                  } catch (t) {
                    return !1;
                  }
                  return !0;
                })(t, e, r) || o.isValidAddress(t, e, r)
              );
            },
          };
        },
        {
          './bitcoin_validator': 42,
          './crypto/bech32': 45,
          './crypto/utils': 52,
        },
      ],
      41: [
        function (t, e, r) {
          var n = t('./crypto/bech32');
          e.exports = {
            isValidAddress: function (t, e, r = {}) {
              const { networkType: i = 'prod' } = r,
                o = n.decode(t, n.encodings.BECH32);
              if (!o) return !1;
              const a = o.hrp;
              let s;
              if ('prod' === i || 'testnet' === i) s = e.bech32Hrp[i];
              else {
                if (!e.bech32Hrp) return !1;
                s = e.bech32Hrp.prod.concat(e.bech32Hrp.testnet);
              }
              return -1 !== s.indexOf(a);
            },
          };
        },
        { './crypto/bech32': 45 },
      ],
      42: [
        function (t, e, r) {
          (function (r) {
            (function () {
              var n = t('./crypto/base58'),
                i = t('./crypto/segwit_addr'),
                o = t('./crypto/utils'),
                a = 'prod';
              function s(t, e) {
                var i = (e = e || {}).expectedLength || 25,
                  a = e.hashFunction || 'sha256',
                  s = (function (t) {
                    try {
                      return n.decode(t);
                    } catch (t) {
                      return null;
                    }
                  })(t);
                if (s) {
                  var u = s.length;
                  return u !== i
                    ? null
                    : !(e.regex && !e.regex.test(t)) &&
                        (o.toHex(s.slice(u - 4, u)) ===
                        (function (t, e) {
                          switch (t) {
                            case 'blake256keccak256':
                              var n = o.blake2b256(e);
                              return o.keccak256Checksum(r.from(n, 'hex'));
                            case 'blake256':
                              return o.blake256Checksum(e);
                            case 'keccak256':
                              return o.keccak256Checksum(e);
                            case 'sha256':
                            default:
                              return o.sha256Checksum(e);
                          }
                        })(a, o.toHex(s.slice(0, u - 4)))
                          ? o.toHex(s.slice(0, i - 24))
                          : null);
                }
                return null;
              }
              e.exports = {
                isValidAddress: function (t, e, r = {}) {
                  return (
                    (function (t, e, r) {
                      const { networkType: n = a } = r;
                      var i,
                        o = s(t, e);
                      if (o) {
                        if ('prod' === n || 'testnet' === n) i = e.addressTypes[n];
                        else {
                          if (!e.addressTypes) return !1;
                          i = e.addressTypes.prod.concat(e.addressTypes.testnet);
                        }
                        return i.indexOf(o) >= 0;
                      }
                      return !1;
                    })(t, e, r) || i.isValidAddress(t, e, r)
                  );
                },
              };
            }).call(this);
          }).call(this, t('buffer').Buffer);
        },
        {
          './crypto/base58': 44,
          './crypto/segwit_addr': 50,
          './crypto/utils': 52,
          buffer: 4,
        },
      ],
      43: [
        function (t, e, r) {
          var n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
          e.exports = {
            b32decode: function (t) {
              for (
                var e = new ArrayBuffer((5 * t.length) / 8), r = new Uint8Array(e), i = 0;
                i < t.length / 8;
                i++
              ) {
                for (var o = [0, 0, 0, 0, 0, 0, 0, 0], a = 0; a < 8; ++a)
                  o[a] = n.indexOf(t[8 * i + a]);
                (a = 0),
                  (r[5 * i + 0] = (o[a + 0] << 3) | (o[a + 1] >> 2)),
                  (r[5 * i + 1] = ((3 & o[a + 1]) << 6) | (o[a + 2] << 1) | (o[a + 3] >> 4)),
                  (r[5 * i + 2] = ((15 & o[a + 3]) << 4) | (o[a + 4] >> 1)),
                  (r[5 * i + 3] = ((1 & o[a + 4]) << 7) | (o[a + 5] << 2) | (o[a + 6] >> 3)),
                  (r[5 * i + 4] = ((7 & o[a + 6]) << 5) | o[a + 7]);
              }
              return r;
            },
            b32encode: function (t) {
              var e = [],
                r = Math.floor(t.length / 5),
                i = t.length % 5;
              if (0 != i) {
                for (var o = 0; o < 5 - i; o++) t += '\0';
                r += 1;
              }
              for (o = 0; o < r; o++)
                e.push(n.charAt(t.charCodeAt(5 * o) >> 3)),
                  e.push(
                    n.charAt(((7 & t.charCodeAt(5 * o)) << 2) | (t.charCodeAt(5 * o + 1) >> 6)),
                  ),
                  e.push(n.charAt((63 & t.charCodeAt(5 * o + 1)) >> 1)),
                  e.push(
                    n.charAt(((1 & t.charCodeAt(5 * o + 1)) << 4) | (t.charCodeAt(5 * o + 2) >> 4)),
                  ),
                  e.push(
                    n.charAt(
                      ((15 & t.charCodeAt(5 * o + 2)) << 1) | (t.charCodeAt(5 * o + 3) >> 7),
                    ),
                  ),
                  e.push(n.charAt((127 & t.charCodeAt(5 * o + 3)) >> 2)),
                  e.push(
                    n.charAt(((3 & t.charCodeAt(5 * o + 3)) << 3) | (t.charCodeAt(5 * o + 4) >> 5)),
                  ),
                  e.push(n.charAt(31 & t.charCodeAt(5 * o + 4)));
              var a = 0;
              1 == i ? (a = 6) : 2 == i ? (a = 4) : 3 == i ? (a = 3) : 4 == i && (a = 1);
              for (o = 0; o < a; o++) e.pop();
              for (o = 0; o < a; o++) e.push('=');
              return e.join('');
            },
          };
        },
        {},
      ],
      44: [
        function (t, e, r) {
          for (
            var n = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', i = {}, o = 0;
            o < n.length;
            ++o
          )
            i[n.charAt(o)] = o;
          var a = n.length;
          e.exports = {
            decode: function (t) {
              if (0 === t.length) return [];
              var e,
                r,
                n = [0];
              for (e = 0; e < t.length; ++e) {
                var o = t[e];
                if (!(o in i)) throw new Error('Non-base58 character');
                for (r = 0; r < n.length; ++r) n[r] *= a;
                n[0] += i[o];
                var s = 0;
                for (r = 0; r < n.length; ++r) (n[r] += s), (s = n[r] >> 8), (n[r] &= 255);
                for (; s; ) n.push(255 & s), (s >>= 8);
              }
              for (e = 0; '1' === t[e] && e < t.length - 1; ++e) n.push(0);
              return n.reverse();
            },
          };
        },
        {},
      ],
      45: [
        function (t, e, r) {
          var n = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l',
            i = [996825010, 642813549, 513874426, 1027748829, 705979059];
          const o = { BECH32: 'bech32', BECH32M: 'bech32m' };
          function a(t) {
            return t == o.BECH32 ? 1 : t == o.BECH32M ? 734539939 : null;
          }
          function s(t) {
            for (var e = 1, r = 0; r < t.length; ++r) {
              var n = e >> 25;
              e = ((33554431 & e) << 5) ^ t[r];
              for (var o = 0; o < 5; ++o) (n >> o) & 1 && (e ^= i[o]);
            }
            return e;
          }
          function u(t) {
            var e,
              r = [];
            for (e = 0; e < t.length; ++e) r.push(t.charCodeAt(e) >> 5);
            for (r.push(0), e = 0; e < t.length; ++e) r.push(31 & t.charCodeAt(e));
            return r;
          }
          function f(t, e, r) {
            return s(u(t).concat(e)) === a(r);
          }
          e.exports = {
            decode: function (t, e) {
              var r,
                i = !1,
                o = !1;
              for (r = 0; r < t.length; ++r) {
                if (t.charCodeAt(r) < 33 || t.charCodeAt(r) > 126) return null;
                t.charCodeAt(r) >= 97 && t.charCodeAt(r) <= 122 && (i = !0),
                  t.charCodeAt(r) >= 65 && t.charCodeAt(r) <= 90 && (o = !0);
              }
              if (i && o) return null;
              var a = (t = t.toLowerCase()).lastIndexOf('1');
              if (a < 1 || a + 7 > t.length || t.length > 110) return null;
              var s = t.substring(0, a),
                u = [];
              for (r = a + 1; r < t.length; ++r) {
                var h = n.indexOf(t.charAt(r));
                if (-1 === h) return null;
                u.push(h);
              }
              if (!f(s, u, e)) return null;
              return { hrp: s, data: u.slice(0, u.length - 6) };
            },
            encode: function (t, e, r) {
              for (
                var i = e.concat(
                    (function (t, e, r) {
                      for (
                        var n = s(u(t).concat(e).concat([0, 0, 0, 0, 0, 0])) ^ a(r), i = [], o = 0;
                        o < 6;
                        ++o
                      )
                        i.push((n >> (5 * (5 - o))) & 31);
                      return i;
                    })(t, e, r),
                  ),
                  o = t + '1',
                  f = 0;
                f < i.length;
                ++f
              )
                o += n.charAt(i[f]);
              return o;
            },
            encodings: o,
            verifyChecksum: f,
          };
        },
        {},
      ],
      46: [
        function (t, e, r) {
          !(function (t) {
            'use strict';
            var e = {};
            function r(t, n, o) {
              if (o !== e) return t instanceof r ? t : void 0 === t ? i : r.parse(t);
              for (t = t || []; t.length && !t[t.length - 1]; ) --t.length;
              (this._d = t), (this._s = t.length ? n || 1 : 0);
            }
            r._construct = function (t, n) {
              return new r(t, n, e);
            };
            var n = 1e7;
            (r.base = n), (r.base_log10 = 7);
            var i = new r([], 0, e);
            r.ZERO = i;
            var o = new r([1], 1, e);
            r.ONE = o;
            var a = new r(o._d, -1, e);
            (r.M_ONE = a),
              (r._0 = i),
              (r._1 = o),
              (r.small = [
                i,
                o,
                new r([2], 1, e),
                new r([3], 1, e),
                new r([4], 1, e),
                new r([5], 1, e),
                new r([6], 1, e),
                new r([7], 1, e),
                new r([8], 1, e),
                new r([9], 1, e),
                new r([10], 1, e),
                new r([11], 1, e),
                new r([12], 1, e),
                new r([13], 1, e),
                new r([14], 1, e),
                new r([15], 1, e),
                new r([16], 1, e),
                new r([17], 1, e),
                new r([18], 1, e),
                new r([19], 1, e),
                new r([20], 1, e),
                new r([21], 1, e),
                new r([22], 1, e),
                new r([23], 1, e),
                new r([24], 1, e),
                new r([25], 1, e),
                new r([26], 1, e),
                new r([27], 1, e),
                new r([28], 1, e),
                new r([29], 1, e),
                new r([30], 1, e),
                new r([31], 1, e),
                new r([32], 1, e),
                new r([33], 1, e),
                new r([34], 1, e),
                new r([35], 1, e),
                new r([36], 1, e),
              ]),
              (r.digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')),
              (r.prototype.toString = function (t) {
                if ((t = +t || 10) < 2 || t > 36) throw new Error('illegal radix ' + t + '.');
                if (0 === this._s) return '0';
                if (10 === t) {
                  var e = this._s < 0 ? '-' : '';
                  e += this._d[this._d.length - 1].toString();
                  for (var n = this._d.length - 2; n >= 0; n--) {
                    for (var i = this._d[n].toString(); i.length < 7; ) i = '0' + i;
                    e += i;
                  }
                  return e;
                }
                var o = r.digits;
                t = r.small[t];
                for (var a, s = this._s, u = this.abs(), f = []; 0 !== u._s; ) {
                  var h = u.divRem(t);
                  (u = h[0]), (a = h[1]), f.push(o[a.valueOf()]);
                }
                return (s < 0 ? '-' : '') + f.reverse().join('');
              }),
              (r.radixRegex = [
                /^$/,
                /^$/,
                /^[01]*$/,
                /^[012]*$/,
                /^[0-3]*$/,
                /^[0-4]*$/,
                /^[0-5]*$/,
                /^[0-6]*$/,
                /^[0-7]*$/,
                /^[0-8]*$/,
                /^[0-9]*$/,
                /^[0-9aA]*$/,
                /^[0-9abAB]*$/,
                /^[0-9abcABC]*$/,
                /^[0-9a-dA-D]*$/,
                /^[0-9a-eA-E]*$/,
                /^[0-9a-fA-F]*$/,
                /^[0-9a-gA-G]*$/,
                /^[0-9a-hA-H]*$/,
                /^[0-9a-iA-I]*$/,
                /^[0-9a-jA-J]*$/,
                /^[0-9a-kA-K]*$/,
                /^[0-9a-lA-L]*$/,
                /^[0-9a-mA-M]*$/,
                /^[0-9a-nA-N]*$/,
                /^[0-9a-oA-O]*$/,
                /^[0-9a-pA-P]*$/,
                /^[0-9a-qA-Q]*$/,
                /^[0-9a-rA-R]*$/,
                /^[0-9a-sA-S]*$/,
                /^[0-9a-tA-T]*$/,
                /^[0-9a-uA-U]*$/,
                /^[0-9a-vA-V]*$/,
                /^[0-9a-wA-W]*$/,
                /^[0-9a-xA-X]*$/,
                /^[0-9a-yA-Y]*$/,
                /^[0-9a-zA-Z]*$/,
              ]),
              (r.parse = function (t, n) {
                var o;
                (t = t.toString()),
                  (void 0 !== n && 10 != +n) ||
                    (t = t
                      .replace(/\s*[*xX]\s*10\s*(\^|\*\*)\s*/, 'e')
                      .replace(/^([+\-])?(\d+)\.?(\d*)[eE]([+\-]?\d+)$/, function (t, e, r, n, i) {
                        var o = (i = +i) < 0,
                          a = r.length + i;
                        (t = (o ? r : n).length), (i = (i = Math.abs(i)) >= t ? i - t + o : 0);
                        var s = new Array(i + 1).join('0'),
                          u = r + n;
                        return (
                          (e || '') +
                          (o ? (u = s + u) : (u += s)).substr(0, (a += o ? s.length : 0)) +
                          (a < u.length ? '.' + u.substr(a) : '')
                        );
                      })),
                  (o =
                    void 0 === n ? '0[xcb]' : 16 == n ? '0x' : 8 == n ? '0c' : 2 == n ? '0b' : '');
                var a = new RegExp('^([+\\-]?)(' + o + ')?([0-9a-z]*)(?:\\.\\d*)?$', 'i').exec(t);
                if (a) {
                  var s = a[1] || '+',
                    u = a[2] || '',
                    f = a[3] || '';
                  if (void 0 === n)
                    n =
                      '0x' === u || '0X' === u
                        ? 16
                        : '0c' === u || '0C' === u
                          ? 8
                          : '0b' === u || '0B' === u
                            ? 2
                            : 10;
                  else if (n < 2 || n > 36) throw new Error('Illegal radix ' + n + '.');
                  if (((n = +n), !r.radixRegex[n].test(f)))
                    throw new Error('Bad digit for radix ' + n);
                  if (0 === (f = f.replace(/^0+/, '').split('')).length) return i;
                  if (((s = '-' === s ? -1 : 1), 10 == n)) {
                    for (var h = []; f.length >= 7; )
                      h.push(
                        parseInt(f.splice(f.length - r.base_log10, r.base_log10).join(''), 10),
                      );
                    return h.push(parseInt(f.join(''), 10)), new r(h, s, e);
                  }
                  h = i;
                  n = r.small[n];
                  for (var c = r.small, l = 0; l < f.length; l++)
                    h = h.multiply(n).add(c[parseInt(f[l], 36)]);
                  return new r(h._d, s, e);
                }
                throw new Error('Invalid BigInteger format: ' + t);
              }),
              (r.prototype.add = function (t) {
                if (0 === this._s) return r(t);
                if (0 === (t = r(t))._s) return this;
                if (this._s !== t._s) return (t = t.negate()), this.subtract(t);
                for (
                  var i,
                    o = this._d,
                    a = t._d,
                    s = o.length,
                    u = a.length,
                    f = new Array(Math.max(s, u) + 1),
                    h = Math.min(s, u),
                    c = 0,
                    l = 0;
                  l < h;
                  l++
                )
                  (i = o[l] + a[l] + c), (f[l] = i % n), (c = (i / n) | 0);
                for (u > s && ((o = a), (s = u)), l = h; c && l < s; l++)
                  (i = o[l] + c), (f[l] = i % n), (c = (i / n) | 0);
                for (c && (f[l] = c); l < s; l++) f[l] = o[l];
                return new r(f, this._s, e);
              }),
              (r.prototype.negate = function () {
                return new r(this._d, 0 | -this._s, e);
              }),
              (r.prototype.abs = function () {
                return this._s < 0 ? this.negate() : this;
              }),
              (r.prototype.subtract = function (t) {
                if (0 === this._s) return r(t).negate();
                if (0 === (t = r(t))._s) return this;
                if (this._s !== t._s) return (t = t.negate()), this.add(t);
                var o = this;
                this._s < 0 && ((o = new r(t._d, 1, e)), (t = new r(this._d, 1, e)));
                var a = o.compareAbs(t);
                if (0 === a) return i;
                if (a < 0) {
                  var s = t;
                  (t = o), (o = s);
                }
                var u,
                  f,
                  h = o._d,
                  c = t._d,
                  l = h.length,
                  d = c.length,
                  p = new Array(l),
                  y = 0;
                for (u = 0; u < d; u++)
                  (f = h[u] - y - c[u]) < 0 ? ((f += n), (y = 1)) : (y = 0), (p[u] = f);
                for (u = d; u < l; u++) {
                  if (!((f = h[u] - y) < 0)) {
                    p[u++] = f;
                    break;
                  }
                  (f += n), (p[u] = f);
                }
                for (; u < l; u++) p[u] = h[u];
                return new r(p, a, e);
              }),
              (function () {
                function t(t, i) {
                  for (var o = t._d, a = o.slice(), s = 0; ; ) {
                    var u = (o[s] || 0) + 1;
                    if (((a[s] = u % n), u <= n - 1)) break;
                    ++s;
                  }
                  return new r(a, i, e);
                }
                function i(t, i) {
                  for (var o = t._d, a = o.slice(), s = 0; ; ) {
                    var u = (o[s] || 0) - 1;
                    if (!(u < 0)) {
                      a[s] = u;
                      break;
                    }
                    (a[s] = u + n), ++s;
                  }
                  return new r(a, i, e);
                }
                (r.prototype.next = function () {
                  switch (this._s) {
                    case 0:
                      return o;
                    case -1:
                      return i(this, -1);
                    default:
                      return t(this, 1);
                  }
                }),
                  (r.prototype.prev = function () {
                    switch (this._s) {
                      case 0:
                        return a;
                      case -1:
                        return t(this, -1);
                      default:
                        return i(this, 1);
                    }
                  });
              })(),
              (r.prototype.compareAbs = function (t) {
                if (this === t) return 0;
                if (!(t instanceof r)) {
                  if (!isFinite(t)) return isNaN(t) ? t : -1;
                  t = r(t);
                }
                if (0 === this._s) return 0 !== t._s ? -1 : 0;
                if (0 === t._s) return 1;
                var e = this._d.length,
                  n = t._d.length;
                if (e < n) return -1;
                if (e > n) return 1;
                for (var i = this._d, o = t._d, a = e - 1; a >= 0; a--)
                  if (i[a] !== o[a]) return i[a] < o[a] ? -1 : 1;
                return 0;
              }),
              (r.prototype.compare = function (t) {
                return this === t
                  ? 0
                  : ((t = r(t)),
                    0 === this._s
                      ? -t._s
                      : this._s === t._s
                        ? this.compareAbs(t) * this._s
                        : this._s);
              }),
              (r.prototype.isUnit = function () {
                return this === o || this === a || (1 === this._d.length && 1 === this._d[0]);
              }),
              (r.prototype.multiply = function (t) {
                if (0 === this._s) return i;
                if (0 === (t = r(t))._s) return i;
                if (this.isUnit()) return this._s < 0 ? t.negate() : t;
                if (t.isUnit()) return t._s < 0 ? this.negate() : this;
                if (this === t) return this.square();
                var o,
                  a = this._d.length >= t._d.length,
                  s = (a ? this : t)._d,
                  u = (a ? t : this)._d,
                  f = s.length,
                  h = u.length,
                  c = f + h,
                  l = new Array(c);
                for (o = 0; o < c; o++) l[o] = 0;
                for (o = 0; o < h; o++) {
                  for (var d, p = 0, y = u[o], v = f + o, g = o; g < v; g++)
                    (p = ((d = l[g] + y * s[g - o] + p) / n) | 0), (l[g] = d % n | 0);
                  p && ((p = ((d = l[g] + p) / n) | 0), (l[g] = d % n));
                }
                return new r(l, this._s * t._s, e);
              }),
              (r.prototype.multiplySingleDigit = function (t) {
                if (0 === t || 0 === this._s) return i;
                if (1 === t) return this;
                var o;
                if (1 === this._d.length)
                  return new r((o = this._d[0] * t) >= n ? [o % n | 0, (o / n) | 0] : [o], 1, e);
                if (2 === t) return this.add(this);
                if (this.isUnit()) return new r([t], 1, e);
                for (var a = this._d, s = a.length, u = s + 1, f = new Array(u), h = 0; h < u; h++)
                  f[h] = 0;
                for (var c = 0, l = 0; l < s; l++)
                  (c = ((o = t * a[l] + c) / n) | 0), (f[l] = o % n | 0);
                return c && (f[l] = c), new r(f, 1, e);
              }),
              (r.prototype.square = function () {
                if (0 === this._s) return i;
                if (this.isUnit()) return o;
                var t,
                  a,
                  s,
                  u,
                  f = this._d,
                  h = f.length,
                  c = new Array(h + h + 1);
                for (u = 0; u < h; u++)
                  (s = 2 * u), (a = ((t = f[u] * f[u]) / n) | 0), (c[s] = t % n), (c[s + 1] = a);
                for (u = 0; u < h; u++) {
                  (a = 0), (s = 2 * u + 1);
                  for (var l = u + 1; l < h; l++, s++)
                    (a = ((t = f[l] * f[u] * 2 + c[s] + a) / n) | 0), (c[s] = t % n);
                  var d = a + c[(s = h + u)];
                  (a = (d / n) | 0), (c[s] = d % n), (c[s + 1] += a);
                }
                return new r(c, 1, e);
              }),
              (r.prototype.quotient = function (t) {
                return this.divRem(t)[0];
              }),
              (r.prototype.divide = r.prototype.quotient),
              (r.prototype.remainder = function (t) {
                return this.divRem(t)[1];
              }),
              (r.prototype.divRem = function (t) {
                if (0 === (t = r(t))._s) throw new Error('Divide by zero');
                if (0 === this._s) return [i, i];
                if (1 === t._d.length) return this.divRemSmall(t._s * t._d[0]);
                switch (this.compareAbs(t)) {
                  case 0:
                    return [this._s === t._s ? o : a, i];
                  case -1:
                    return [i, this];
                }
                for (
                  var s,
                    u = this._s * t._s,
                    f = t.abs(),
                    h = this._d,
                    c = h.length,
                    l = (t._d.length, []),
                    d = new r([], 0, e);
                  c;

                )
                  if ((d._d.unshift(h[--c]), (d = new r(d._d, 1, e)).compareAbs(t) < 0)) l.push(0);
                  else {
                    if (0 === d._s) s = 0;
                    else {
                      var p = d._d.length,
                        y = f._d.length,
                        v = d._d[p - 1] * n + d._d[p - 2],
                        g = f._d[y - 1] * n + f._d[y - 2];
                      d._d.length > f._d.length && (v = (v + 1) * n), (s = Math.ceil(v / g));
                    }
                    do {
                      var b = f.multiplySingleDigit(s);
                      if (b.compareAbs(d) <= 0) break;
                      s--;
                    } while (s);
                    if ((l.push(s), s)) {
                      var w = d.subtract(b);
                      d._d = w._d.slice();
                    }
                  }
                return [new r(l.reverse(), u, e), new r(d._d, this._s, e)];
              }),
              (r.prototype.divRemSmall = function (t) {
                var o;
                if (0 === (t = +t)) throw new Error('Divide by zero');
                var a = t < 0 ? -1 : 1,
                  s = this._s * a;
                if ((t = Math.abs(t)) < 1 || t >= n) throw new Error('Argument out of range');
                if (0 === this._s) return [i, i];
                if (1 === t || -1 === t) return [1 === s ? this.abs() : new r(this._d, s, e), i];
                if (1 === this._d.length) {
                  var u = new r([(this._d[0] / t) | 0], 1, e);
                  return (
                    (o = new r([this._d[0] % t | 0], 1, e)),
                    s < 0 && (u = u.negate()),
                    this._s < 0 && (o = o.negate()),
                    [u, o]
                  );
                }
                for (
                  var f, h = this._d.slice(), c = new Array(h.length), l = 0, d = 0, p = 0;
                  h.length;

                ) {
                  if ((l = l * n + h[h.length - 1]) < t) (c[p++] = 0), h.pop(), (d = n * d + l);
                  else
                    (d = l - t * (f = 0 === l ? 0 : (l / t) | 0)),
                      (c[p++] = f),
                      f ? (h.pop(), (l = d)) : h.pop();
                }
                return (
                  (o = new r([d], 1, e)),
                  this._s < 0 && (o = o.negate()),
                  [new r(c.reverse(), s, e), o]
                );
              }),
              (r.prototype.isEven = function () {
                var t = this._d;
                return 0 === this._s || 0 === t.length || t[0] % 2 == 0;
              }),
              (r.prototype.isOdd = function () {
                return !this.isEven();
              }),
              (r.prototype.sign = function () {
                return this._s;
              }),
              (r.prototype.isPositive = function () {
                return this._s > 0;
              }),
              (r.prototype.isNegative = function () {
                return this._s < 0;
              }),
              (r.prototype.isZero = function () {
                return 0 === this._s;
              }),
              (r.prototype.exp10 = function (t) {
                if (0 === (t = +t)) return this;
                if (Math.abs(t) > Number(s))
                  throw new Error('exponent too large in BigInteger.exp10');
                if (0 === this._s) return i;
                if (t > 0) {
                  for (var n = new r(this._d.slice(), this._s, e); t >= 7; t -= 7) n._d.unshift(0);
                  return 0 == t
                    ? n
                    : ((n._s = 1),
                      (n = n.multiplySingleDigit(Math.pow(10, t))),
                      this._s < 0 ? n.negate() : n);
                }
                if (-t >= 7 * this._d.length) return i;
                n = new r(this._d.slice(), this._s, e);
                for (t = -t; t >= 7; t -= 7) n._d.shift();
                return 0 == t ? n : n.divRemSmall(Math.pow(10, t))[0];
              }),
              (r.prototype.pow = function (t) {
                if (this.isUnit()) return this._s > 0 ? this : r(t).isOdd() ? this : this.negate();
                if (0 === (t = r(t))._s) return o;
                if (t._s < 0) {
                  if (0 === this._s) throw new Error('Divide by zero');
                  return i;
                }
                if (0 === this._s) return i;
                if (t.isUnit()) return this;
                if (t.compareAbs(s) > 0) throw new Error('exponent too large in BigInteger.pow');
                for (var e = this, n = o, a = r.small[2]; t.isPositive(); ) {
                  if (t.isOdd() && ((n = n.multiply(e)), t.isUnit())) return n;
                  (e = e.square()), (t = t.quotient(a));
                }
                return n;
              }),
              (r.prototype.modPow = function (t, e) {
                for (var n = o, i = this; t.isPositive(); )
                  t.isOdd() && (n = n.multiply(i).remainder(e)),
                    (t = t.quotient(r.small[2])).isPositive() && (i = i.square().remainder(e));
                return n;
              }),
              (r.prototype.log = function () {
                switch (this._s) {
                  case 0:
                    return -1 / 0;
                  case -1:
                    return NaN;
                }
                var t = this._d.length;
                if (7 * t < 30) return Math.log(this.valueOf());
                var i = Math.ceil(30 / 7),
                  o = this._d.slice(t - i);
                return Math.log(new r(o, 1, e).valueOf()) + (t - i) * Math.log(n);
              }),
              (r.prototype.valueOf = function () {
                return parseInt(this.toString(), 10);
              }),
              (r.prototype.toJSValue = function () {
                return parseInt(this.toString(), 10);
              }),
              (r.prototype.lowVal = function () {
                return this._d[0] || 0;
              });
            var s = r(2147483647);
            (r.MAX_EXP = s),
              (function () {
                function t(t) {
                  return function (e) {
                    return t.call(r(e));
                  };
                }
                function e(t) {
                  return function (e, n) {
                    return t.call(r(e), r(n));
                  };
                }
                function n(t) {
                  return function (e, n, i) {
                    return t.call(r(e), r(n), r(i));
                  };
                }
                !(function () {
                  var i,
                    o,
                    a =
                      'toJSValue,isEven,isOdd,sign,isZero,isNegative,abs,isUnit,square,negate,isPositive,toString,next,prev,log'.split(
                        ',',
                      ),
                    s =
                      'compare,remainder,divRem,subtract,add,quotient,divide,multiply,pow,compareAbs'.split(
                        ',',
                      ),
                    u = ['modPow'];
                  for (i = 0; i < a.length; i++) r[(o = a[i])] = t(r.prototype[o]);
                  for (i = 0; i < s.length; i++) r[(o = s[i])] = e(r.prototype[o]);
                  for (i = 0; i < u.length; i++) r[(o = u[i])] = n(r.prototype[o]);
                  r.exp10 = function (t, e) {
                    return r(t).exp10(e);
                  };
                })();
              })(),
              (t.JSBigInt = r);
          })(void 0 !== r ? r : this);
        },
        {},
      ],
      47: [
        function (t, e, r) {
          (function (t) {
            (function () {
              'use strict';
              (a.sigma = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
                [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
                [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
                [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
                [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
                [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
                [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
                [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
                [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
                [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
                [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
                [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
                [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
              ]),
                (a.u256 = [
                  608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536,
                  3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581,
                  1065670069, 3041331479,
                ]),
                (a.padding = t.from([
                  128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ])),
                (a.prototype._length_carry = function (t) {
                  for (var e = 0; e < t.length && !(t[e] < 4294967296); ++e)
                    (t[e] -= 4294967296), (t[e + 1] += 1);
                }),
                (a.prototype.update = function (e, r) {
                  e = t.from(e, r);
                  for (var n = this._block, i = 0; this._blockOffset + e.length - i >= n.length; ) {
                    for (var o = this._blockOffset; o < n.length; ) n[o++] = e[i++];
                    (this._length[0] += 8 * n.length),
                      this._length_carry(this._length),
                      this._compress(),
                      (this._blockOffset = 0);
                  }
                  for (; i < e.length; ) n[this._blockOffset++] = e[i++];
                  return this;
                });
              var r = t.from([1]),
                n = t.from([129]);
              function i(t, e) {
                return ((t << (32 - e)) | (t >>> e)) >>> 0;
              }
              function o(t, e, r, n, o, s, u, f) {
                var h = a.sigma,
                  c = a.u256;
                (t[n] = (t[n] + ((e[h[r][f]] ^ c[h[r][f + 1]]) >>> 0) + t[o]) >>> 0),
                  (t[u] = i(t[u] ^ t[n], 16)),
                  (t[s] = (t[s] + t[u]) >>> 0),
                  (t[o] = i(t[o] ^ t[s], 12)),
                  (t[n] = (t[n] + ((e[h[r][f + 1]] ^ c[h[r][f]]) >>> 0) + t[o]) >>> 0),
                  (t[u] = i(t[u] ^ t[n], 8)),
                  (t[s] = (t[s] + t[u]) >>> 0),
                  (t[o] = i(t[o] ^ t[s], 7));
              }
              function a() {
                (this._h = [
                  1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635,
                  1541459225,
                ]),
                  (this._s = [0, 0, 0, 0]),
                  (this._block = t.allocUnsafe(64)),
                  (this._blockOffset = 0),
                  (this._length = [0, 0]),
                  (this._nullt = !1),
                  (this._zo = r),
                  (this._oo = n);
              }
              (a.prototype._compress = function () {
                var t,
                  e = a.u256,
                  r = new Array(16),
                  n = new Array(16);
                for (t = 0; t < 16; ++t) n[t] = this._block.readUInt32BE(4 * t);
                for (t = 0; t < 8; ++t) r[t] = this._h[t] >>> 0;
                for (t = 8; t < 12; ++t) r[t] = (this._s[t - 8] ^ e[t - 8]) >>> 0;
                for (t = 12; t < 16; ++t) r[t] = e[t - 8];
                for (
                  this._nullt ||
                    ((r[12] = (r[12] ^ this._length[0]) >>> 0),
                    (r[13] = (r[13] ^ this._length[0]) >>> 0),
                    (r[14] = (r[14] ^ this._length[1]) >>> 0),
                    (r[15] = (r[15] ^ this._length[1]) >>> 0)),
                    t = 0;
                  t < 14;
                  ++t
                )
                  o(r, n, t, 0, 4, 8, 12, 0),
                    o(r, n, t, 1, 5, 9, 13, 2),
                    o(r, n, t, 2, 6, 10, 14, 4),
                    o(r, n, t, 3, 7, 11, 15, 6),
                    o(r, n, t, 0, 5, 10, 15, 8),
                    o(r, n, t, 1, 6, 11, 12, 10),
                    o(r, n, t, 2, 7, 8, 13, 12),
                    o(r, n, t, 3, 4, 9, 14, 14);
                for (t = 0; t < 16; ++t) this._h[t % 8] = (this._h[t % 8] ^ r[t]) >>> 0;
                for (t = 0; t < 8; ++t) this._h[t] = (this._h[t] ^ this._s[t % 4]) >>> 0;
              }),
                (a.prototype._padding = function () {
                  var e = this._length[0] + 8 * this._blockOffset,
                    r = this._length[1];
                  e >= 4294967296 && ((e -= 4294967296), (r += 1));
                  var n = t.allocUnsafe(8);
                  n.writeUInt32BE(r, 0),
                    n.writeUInt32BE(e, 4),
                    55 === this._blockOffset
                      ? ((this._length[0] -= 8), this.update(this._oo))
                      : (this._blockOffset < 55
                          ? (0 === this._blockOffset && (this._nullt = !0),
                            (this._length[0] -= 8 * (55 - this._blockOffset)),
                            this.update(a.padding.slice(0, 55 - this._blockOffset)))
                          : ((this._length[0] -= 8 * (64 - this._blockOffset)),
                            this.update(a.padding.slice(0, 64 - this._blockOffset)),
                            (this._length[0] -= 440),
                            this.update(a.padding.slice(1, 56)),
                            (this._nullt = !0)),
                        this.update(this._zo),
                        (this._length[0] -= 8)),
                    (this._length[0] -= 64),
                    this.update(n);
                }),
                (a.prototype.digest = function (e) {
                  this._padding();
                  for (var r = t.allocUnsafe(32), n = 0; n < 8; ++n)
                    r.writeUInt32BE(this._h[n], 4 * n);
                  return r.toString(e);
                }),
                (e.exports = a);
            }).call(this);
          }).call(this, t('buffer').Buffer);
        },
        { buffer: 4 },
      ],
      48: [
        function (t, e, r) {
          'use strict';
          function n(t, e, r) {
            var n = t[e] + t[r],
              i = t[e + 1] + t[r + 1];
            n >= 4294967296 && i++, (t[e] = n), (t[e + 1] = i);
          }
          function i(t, e, r, n) {
            var i = t[e] + r;
            r < 0 && (i += 4294967296);
            var o = t[e + 1] + n;
            i >= 4294967296 && o++, (t[e] = i), (t[e + 1] = o);
          }
          function o(t, e) {
            return t[e] ^ (t[e + 1] << 8) ^ (t[e + 2] << 16) ^ (t[e + 3] << 24);
          }
          function a(t, e, r, o, a, s) {
            var u = h[a],
              c = h[a + 1],
              l = h[s],
              d = h[s + 1];
            n(f, t, e), i(f, t, u, c);
            var p = f[o] ^ f[t],
              y = f[o + 1] ^ f[t + 1];
            (f[o] = y),
              (f[o + 1] = p),
              n(f, r, o),
              (p = f[e] ^ f[r]),
              (y = f[e + 1] ^ f[r + 1]),
              (f[e] = (p >>> 24) ^ (y << 8)),
              (f[e + 1] = (y >>> 24) ^ (p << 8)),
              n(f, t, e),
              i(f, t, l, d),
              (p = f[o] ^ f[t]),
              (y = f[o + 1] ^ f[t + 1]),
              (f[o] = (p >>> 16) ^ (y << 16)),
              (f[o + 1] = (y >>> 16) ^ (p << 16)),
              n(f, r, o),
              (p = f[e] ^ f[r]),
              (y = f[e + 1] ^ f[r + 1]),
              (f[e] = (y >>> 31) ^ (p << 1)),
              (f[e + 1] = (p >>> 31) ^ (y << 1));
          }
          var s = new Uint32Array([
              4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129,
              2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635,
              327033209, 1541459225,
            ]),
            u = new Uint8Array(
              [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1,
                12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9,
                3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11,
                12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15,
                14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8,
                6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6,
                1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
              ].map(function (t) {
                return 2 * t;
              }),
            ),
            f = new Uint32Array(32),
            h = new Uint32Array(32);
          function c(t, e) {
            var r = 0;
            for (r = 0; r < 16; r++) (f[r] = t.h[r]), (f[r + 16] = s[r]);
            for (
              f[24] = f[24] ^ t.t,
                f[25] = f[25] ^ (t.t / 4294967296),
                e && ((f[28] = ~f[28]), (f[29] = ~f[29])),
                r = 0;
              r < 32;
              r++
            )
              h[r] = o(t.b, 4 * r);
            for (r = 0; r < 12; r++)
              a(0, 8, 16, 24, u[16 * r + 0], u[16 * r + 1]),
                a(2, 10, 18, 26, u[16 * r + 2], u[16 * r + 3]),
                a(4, 12, 20, 28, u[16 * r + 4], u[16 * r + 5]),
                a(6, 14, 22, 30, u[16 * r + 6], u[16 * r + 7]),
                a(0, 10, 20, 30, u[16 * r + 8], u[16 * r + 9]),
                a(2, 12, 22, 24, u[16 * r + 10], u[16 * r + 11]),
                a(4, 14, 16, 26, u[16 * r + 12], u[16 * r + 13]),
                a(6, 8, 18, 28, u[16 * r + 14], u[16 * r + 15]);
            for (r = 0; r < 16; r++) t.h[r] = t.h[r] ^ f[r] ^ f[r + 16];
          }
          var l = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
          ]);
          function d(t, e, r, n) {
            l.fill(0),
              (this.b = new Uint8Array(128)),
              (this.h = new Uint32Array(16)),
              (this.t = 0),
              (this.c = 0),
              (this.outlen = t),
              (l[0] = t),
              e && (l[1] = e.length),
              (l[2] = 1),
              (l[3] = 1),
              r && l.set(r, 32),
              n && l.set(n, 48);
            for (var i = 0; i < 16; i++) this.h[i] = s[i] ^ o(l, 4 * i);
            e && (p(this, e), (this.c = 128));
          }
          function p(t, e) {
            for (var r = 0; r < e.length; r++)
              128 === t.c && ((t.t += t.c), c(t, !1), (t.c = 0)), (t.b[t.c++] = e[r]);
          }
          function y(t) {
            return t < 16 ? '0' + t.toString(16) : t.toString(16);
          }
          (d.prototype.update = function (t) {
            return p(this, t), this;
          }),
            (d.prototype.digest = function (t) {
              var e = t && 'binary' !== t && 'hex' !== t ? t : new Uint8Array(this.outlen);
              return (
                (function (t, e) {
                  t.t += t.c;
                  for (; t.c < 128; ) t.b[t.c++] = 0;
                  c(t, !0);
                  for (var r = 0; r < t.outlen; r++) e[r] = t.h[r >> 2] >> (8 * (3 & r));
                })(this, e),
                'hex' === t
                  ? (function (t) {
                      for (var e = '', r = 0; r < t.length; r++) e += y(t[r]);
                      return e;
                    })(e)
                  : e
              );
            }),
            (d.prototype.final = d.prototype.digest),
            (e.exports = d);
        },
        {},
      ],
      49: [
        function (t, e, r) {
          var n = t('./biginteger').JSBigInt,
            i = (function () {
              for (
                var t = {},
                  e = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
                  r = [],
                  i = 0;
                i < e.length;
                i++
              )
                r.push(e.charCodeAt(i));
              var o = [0, 2, 3, 5, 6, 7, 9, 10, 11],
                a = r.length,
                s = new n(2).pow(64);
              return (
                (t.encode_block = function (t, e, i) {
                  if (t.length < 1 || t.length > 11) throw 'Invalid block length: ' + t.length;
                  for (
                    var s = (function (t) {
                        if (t.length < 1 || t.length > 8) throw 'Invalid input length';
                        var e = n.ZERO,
                          r = new n(2).pow(8),
                          i = 0;
                        switch (9 - t.length) {
                          case 1:
                            e = e.add(t[i++]);
                          case 2:
                            e = e.multiply(r).add(t[i++]);
                          case 3:
                            e = e.multiply(r).add(t[i++]);
                          case 4:
                            e = e.multiply(r).add(t[i++]);
                          case 5:
                            e = e.multiply(r).add(t[i++]);
                          case 6:
                            e = e.multiply(r).add(t[i++]);
                          case 7:
                            e = e.multiply(r).add(t[i++]);
                          case 8:
                            e = e.multiply(r).add(t[i++]);
                            break;
                          default:
                            throw 'Impossible condition';
                        }
                        return e;
                      })(t),
                      u = o[t.length] - 1;
                    1 === s.compare(0);

                  ) {
                    var f = s.divRem(a),
                      h = f[1];
                    (s = f[0]), (e[i + u] = r[h.toJSValue()]), u--;
                  }
                  return e;
                }),
                (t.encode = function (e) {
                  var n = (function (t) {
                    if (t.length % 2 != 0) throw 'Hex string has invalid length!';
                    for (var e = new Uint8Array(t.length / 2), r = 0; r < t.length / 2; ++r)
                      e[r] = parseInt(t.slice(2 * r, 2 * r + 2), 16);
                    return e;
                  })(e);
                  if (0 === n.length) return '';
                  var i,
                    a = Math.floor(n.length / 8),
                    s = n.length % 8,
                    u = 11 * a + o[s],
                    f = new Uint8Array(u);
                  for (i = 0; i < u; ++i) f[i] = r[0];
                  for (i = 0; i < a; i++)
                    f = t.encode_block(n.subarray(8 * i, 8 * i + 8), f, 11 * i);
                  return (
                    s > 0 && (f = t.encode_block(n.subarray(8 * a, 8 * a + s), f, 11 * a)),
                    (function (t) {
                      for (var e = [], r = 0; r < t.length; r++) e.push(String.fromCharCode(t[r]));
                      return e.join('');
                    })(f)
                  );
                }),
                (t.decode_block = function (t, e, i) {
                  if (t.length < 1 || t.length > 11) throw 'Invalid block length: ' + t.length;
                  var u = o.indexOf(t.length);
                  if (u <= 0) throw 'Invalid block size';
                  for (var f = new n(0), h = new n(1), c = t.length - 1; c >= 0; c--) {
                    var l = r.indexOf(t[c]);
                    if (l < 0) throw 'Invalid symbol';
                    var d = h.multiply(l).add(f);
                    if (1 === d.compare(s)) throw 'Overflow';
                    (f = d), (h = h.multiply(a));
                  }
                  if (u < 8 && new n(2).pow(8 * u).compare(f) <= 0) throw 'Overflow 2';
                  return (
                    e.set(
                      (function (t, e) {
                        var r = new Uint8Array(e);
                        if (e < 1 || e > 8) throw 'Invalid input length';
                        for (var i = new n(2).pow(8), o = e - 1; o >= 0; o--)
                          (r[o] = t.remainder(i).toJSValue()), (t = t.divide(i));
                        return r;
                      })(f, u),
                      i,
                    ),
                    e
                  );
                }),
                (t.decode = function (e) {
                  if (
                    0 ===
                    (e = (function (t) {
                      for (var e = new Uint8Array(t.length), r = 0; r < t.length; r++)
                        e[r] = t.charCodeAt(r);
                      return e;
                    })(e)).length
                  )
                    return '';
                  var r = Math.floor(e.length / 11),
                    n = e.length % 11,
                    i = o.indexOf(n);
                  if (i < 0) throw 'Invalid encoded length';
                  for (var a = new Uint8Array(8 * r + i), s = 0; s < r; s++)
                    a = t.decode_block(e.subarray(11 * s, 11 * s + 11), a, 8 * s);
                  return (
                    n > 0 && (a = t.decode_block(e.subarray(11 * r, 11 * r + n), a, 8 * r)),
                    (function (t) {
                      for (var e = [], r = 0; r < t.length; ++r)
                        e.push(('0' + t[r].toString(16)).slice(-2));
                      return e.join('');
                    })(a)
                  );
                }),
                t
              );
            })();
          e.exports = i;
        },
        { './biginteger': 46 },
      ],
      50: [
        function (t, e, r) {
          var n = t('./bech32');
          function i(t, e, r, n) {
            for (var i = 0, o = 0, a = [], s = (1 << r) - 1, u = 0; u < t.length; ++u) {
              var f = t[u];
              if (f < 0 || f >> e != 0) return null;
              for (i = (i << e) | f, o += e; o >= r; ) (o -= r), a.push((i >> o) & s);
            }
            if (n) o > 0 && a.push((i << (r - o)) & s);
            else if (o >= e || (i << (r - o)) & s) return null;
            return a;
          }
          function o(t, e) {
            var r = !1,
              o = n.decode(e, n.encodings.BECH32);
            if (
              (null === o && ((o = n.decode(e, n.encodings.BECH32M)), (r = !0)),
              null === o || o.hrp !== t || o.data.length < 1 || o.data[0] > 16)
            )
              return null;
            var a = i(o.data.slice(1), 5, 8, !1);
            return null === a || a.length < 2 || a.length > 40
              ? null
              : 0 === o.data[0] && 20 !== a.length && 32 !== a.length
                ? null
                : 0 === o.data[0] && r
                  ? null
                  : 0 === o.data[0] || r
                    ? { version: o.data[0], program: a }
                    : null;
          }
          function a(t, e, r) {
            var a = n.encodings.BECH32;
            e > 0 && (a = n.encodings.BECH32M);
            var s = n.encode(t, [e].concat(i(r, 8, 5, !0)), a);
            return null === o(t, s) ? null : s;
          }
          var s = 'prod';
          e.exports = {
            encode: a,
            decode: o,
            isValidAddress: function (t, e, r = {}) {
              if (!e.bech32Hrp || 0 === e.bech32Hrp.length) return !1;
              const { networkType: n = s } = r;
              var i;
              if ('prod' === n || 'testnet' === n) i = e.bech32Hrp[n];
              else {
                if (!e.bech32Hrp) return !1;
                i = e.bech32Hrp.prod.concat(e.bech32Hrp.testnet);
              }
              for (var u of i) {
                var f = o(u, t);
                if (f) return a(u, f.version, f.program) === t.toLowerCase();
              }
              return !1;
            },
          };
        },
        { './bech32': 45 },
      ],
      51: [
        function (t, e, r) {
          (function (t, r) {
            (function () {
              'use strict';
              var n = 'input is invalid type',
                i = 'object' == typeof window,
                o = i ? window : {};
              o.JS_SHA3_NO_WINDOW && (i = !1);
              var a = !i && 'object' == typeof self;
              !o.JS_SHA3_NO_NODE_JS && 'object' == typeof t && t.versions && t.versions.node
                ? (o = r)
                : a && (o = self);
              var s = !o.JS_SHA3_NO_ARRAY_BUFFER && 'undefined' != typeof ArrayBuffer,
                u = '0123456789abcdef'.split(''),
                f = [4, 1024, 262144, 67108864],
                h = [0, 8, 16, 24],
                c = [
                  1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
                  0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
                  2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
                  2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
                  2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648,
                ],
                l = [224, 256, 384, 512],
                d = [128, 256],
                p = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'],
                y = { 128: 168, 256: 136 };
              (!o.JS_SHA3_NO_NODE_JS && Array.isArray) ||
                (Array.isArray = function (t) {
                  return '[object Array]' === Object.prototype.toString.call(t);
                }),
                !s ||
                  (!o.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
                  (ArrayBuffer.isView = function (t) {
                    return 'object' == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer;
                  });
              for (
                var v = function (t, e, r) {
                    return function (n) {
                      return new L(t, e, t).update(n)[r]();
                    };
                  },
                  g = function (t, e, r) {
                    return function (n, i) {
                      return new L(t, e, i).update(n)[r]();
                    };
                  },
                  b = function (t, e, r) {
                    return function (e, n, i, o) {
                      return x['cshake' + t].update(e, n, i, o)[r]();
                    };
                  },
                  w = function (t, e, r) {
                    return function (e, n, i, o) {
                      return x['kmac' + t].update(e, n, i, o)[r]();
                    };
                  },
                  m = function (t, e, r, n) {
                    for (var i = 0; i < p.length; ++i) {
                      var o = p[i];
                      t[o] = e(r, n, o);
                    }
                    return t;
                  },
                  _ = function (t, e) {
                    var r = v(t, e, 'hex');
                    return (
                      (r.create = function () {
                        return new L(t, e, t);
                      }),
                      (r.update = function (t) {
                        return r.create().update(t);
                      }),
                      m(r, v, t, e)
                    );
                  },
                  A = [
                    {
                      name: 'keccak',
                      padding: [1, 256, 65536, 16777216],
                      bits: l,
                      createMethod: _,
                    },
                    {
                      name: 'sha3',
                      padding: [6, 1536, 393216, 100663296],
                      bits: l,
                      createMethod: _,
                    },
                    {
                      name: 'shake',
                      padding: [31, 7936, 2031616, 520093696],
                      bits: d,
                      createMethod: function (t, e) {
                        var r = g(t, e, 'hex');
                        return (
                          (r.create = function (r) {
                            return new L(t, e, r);
                          }),
                          (r.update = function (t, e) {
                            return r.create(e).update(t);
                          }),
                          m(r, g, t, e)
                        );
                      },
                    },
                    {
                      name: 'cshake',
                      padding: f,
                      bits: d,
                      createMethod: function (t, e) {
                        var r = y[t],
                          n = b(t, 0, 'hex');
                        return (
                          (n.create = function (n, i, o) {
                            return i || o
                              ? new L(t, e, n).bytepad([i, o], r)
                              : x['shake' + t].create(n);
                          }),
                          (n.update = function (t, e, r, i) {
                            return n.create(e, r, i).update(t);
                          }),
                          m(n, b, t, e)
                        );
                      },
                    },
                    {
                      name: 'kmac',
                      padding: f,
                      bits: d,
                      createMethod: function (t, e) {
                        var r = y[t],
                          n = w(t, 0, 'hex');
                        return (
                          (n.create = function (n, i, o) {
                            return new O(t, e, i).bytepad(['KMAC', o], r).bytepad([n], r);
                          }),
                          (n.update = function (t, e, r, i) {
                            return n.create(t, r, i).update(e);
                          }),
                          m(n, w, t, e)
                        );
                      },
                    },
                  ],
                  x = {},
                  E = [],
                  k = 0;
                k < A.length;
                ++k
              )
                for (var B = A[k], S = B.bits, C = 0; C < S.length; ++C) {
                  var U = B.name + '_' + S[C];
                  if ((E.push(U), (x[U] = B.createMethod(S[C], B.padding)), 'sha3' !== B.name)) {
                    var T = B.name + S[C];
                    E.push(T), (x[T] = x[U]);
                  }
                }
              function L(t, e, r) {
                (this.blocks = []),
                  (this.s = []),
                  (this.padding = e),
                  (this.outputBits = r),
                  (this.reset = !0),
                  (this.finalized = !1),
                  (this.block = 0),
                  (this.start = 0),
                  (this.blockCount = (1600 - (t << 1)) >> 5),
                  (this.byteCount = this.blockCount << 2),
                  (this.outputBlocks = r >> 5),
                  (this.extraBytes = (31 & r) >> 3);
                for (var n = 0; n < 50; ++n) this.s[n] = 0;
              }
              function O(t, e, r) {
                L.call(this, t, e, r);
              }
              (L.prototype.update = function (t) {
                if (!this.finalized) {
                  var e,
                    r = typeof t;
                  if ('string' !== r) {
                    if ('object' !== r) throw n;
                    if (null === t) throw n;
                    if (s && t.constructor === ArrayBuffer) t = new Uint8Array(t);
                    else if (!(Array.isArray(t) || (s && ArrayBuffer.isView(t)))) throw n;
                    e = !0;
                  }
                  for (
                    var i,
                      o,
                      a = this.blocks,
                      u = this.byteCount,
                      f = t.length,
                      c = this.blockCount,
                      l = 0,
                      d = this.s;
                    l < f;

                  ) {
                    if (this.reset)
                      for (this.reset = !1, a[0] = this.block, i = 1; i < c + 1; ++i) a[i] = 0;
                    if (e)
                      for (i = this.start; l < f && i < u; ++l) a[i >> 2] |= t[l] << h[3 & i++];
                    else
                      for (i = this.start; l < f && i < u; ++l)
                        (o = t.charCodeAt(l)) < 128
                          ? (a[i >> 2] |= o << h[3 & i++])
                          : o < 2048
                            ? ((a[i >> 2] |= (192 | (o >> 6)) << h[3 & i++]),
                              (a[i >> 2] |= (128 | (63 & o)) << h[3 & i++]))
                            : o < 55296 || o >= 57344
                              ? ((a[i >> 2] |= (224 | (o >> 12)) << h[3 & i++]),
                                (a[i >> 2] |= (128 | ((o >> 6) & 63)) << h[3 & i++]),
                                (a[i >> 2] |= (128 | (63 & o)) << h[3 & i++]))
                              : ((o = 65536 + (((1023 & o) << 10) | (1023 & t.charCodeAt(++l)))),
                                (a[i >> 2] |= (240 | (o >> 18)) << h[3 & i++]),
                                (a[i >> 2] |= (128 | ((o >> 12) & 63)) << h[3 & i++]),
                                (a[i >> 2] |= (128 | ((o >> 6) & 63)) << h[3 & i++]),
                                (a[i >> 2] |= (128 | (63 & o)) << h[3 & i++]));
                    if (((this.lastByteIndex = i), i >= u)) {
                      for (this.start = i - u, this.block = a[c], i = 0; i < c; ++i) d[i] ^= a[i];
                      I(d), (this.reset = !0);
                    } else this.start = i;
                  }
                  return this;
                }
              }),
                (L.prototype.encode = function (t, e) {
                  var r = 255 & t,
                    n = 1,
                    i = [r];
                  for (r = 255 & (t >>= 8); r > 0; ) i.unshift(r), (r = 255 & (t >>= 8)), ++n;
                  return e ? i.push(n) : i.unshift(n), this.update(i), i.length;
                }),
                (L.prototype.encodeString = function (t) {
                  var e,
                    r = typeof t;
                  if ('string' !== r) {
                    if ('object' !== r) throw n;
                    if (null === t) throw n;
                    if (s && t.constructor === ArrayBuffer) t = new Uint8Array(t);
                    else if (!(Array.isArray(t) || (s && ArrayBuffer.isView(t)))) throw n;
                    e = !0;
                  }
                  var i = 0,
                    o = t.length;
                  if (e) i = o;
                  else
                    for (var a = 0; a < t.length; ++a) {
                      var u = t.charCodeAt(a);
                      u < 128
                        ? (i += 1)
                        : u < 2048
                          ? (i += 2)
                          : u < 55296 || u >= 57344
                            ? (i += 3)
                            : ((u = 65536 + (((1023 & u) << 10) | (1023 & t.charCodeAt(++a)))),
                              (i += 4));
                    }
                  return (i += this.encode(8 * i)), this.update(t), i;
                }),
                (L.prototype.bytepad = function (t, e) {
                  for (var r = this.encode(e), n = 0; n < t.length; ++n)
                    r += this.encodeString(t[n]);
                  var i = e - (r % e),
                    o = [];
                  return (o.length = i), this.update(o), this;
                }),
                (L.prototype.finalize = function () {
                  if (!this.finalized) {
                    this.finalized = !0;
                    var t = this.blocks,
                      e = this.lastByteIndex,
                      r = this.blockCount,
                      n = this.s;
                    if (((t[e >> 2] |= this.padding[3 & e]), this.lastByteIndex === this.byteCount))
                      for (t[0] = t[r], e = 1; e < r + 1; ++e) t[e] = 0;
                    for (t[r - 1] |= 2147483648, e = 0; e < r; ++e) n[e] ^= t[e];
                    I(n);
                  }
                }),
                (L.prototype.toString = L.prototype.hex =
                  function () {
                    this.finalize();
                    for (
                      var t,
                        e = this.blockCount,
                        r = this.s,
                        n = this.outputBlocks,
                        i = this.extraBytes,
                        o = 0,
                        a = 0,
                        s = '';
                      a < n;

                    ) {
                      for (o = 0; o < e && a < n; ++o, ++a)
                        (t = r[o]),
                          (s +=
                            u[(t >> 4) & 15] +
                            u[15 & t] +
                            u[(t >> 12) & 15] +
                            u[(t >> 8) & 15] +
                            u[(t >> 20) & 15] +
                            u[(t >> 16) & 15] +
                            u[(t >> 28) & 15] +
                            u[(t >> 24) & 15]);
                      a % e == 0 && (I(r), (o = 0));
                    }
                    return (
                      i &&
                        ((t = r[o]),
                        (s += u[(t >> 4) & 15] + u[15 & t]),
                        i > 1 && (s += u[(t >> 12) & 15] + u[(t >> 8) & 15]),
                        i > 2 && (s += u[(t >> 20) & 15] + u[(t >> 16) & 15])),
                      s
                    );
                  }),
                (L.prototype.arrayBuffer = function () {
                  this.finalize();
                  var t,
                    e = this.blockCount,
                    r = this.s,
                    n = this.outputBlocks,
                    i = this.extraBytes,
                    o = 0,
                    a = 0,
                    s = this.outputBits >> 3;
                  t = i ? new ArrayBuffer((n + 1) << 2) : new ArrayBuffer(s);
                  for (var u = new Uint32Array(t); a < n; ) {
                    for (o = 0; o < e && a < n; ++o, ++a) u[a] = r[o];
                    a % e == 0 && I(r);
                  }
                  return i && ((u[o] = r[o]), (t = t.slice(0, s))), t;
                }),
                (L.prototype.buffer = L.prototype.arrayBuffer),
                (L.prototype.digest = L.prototype.array =
                  function () {
                    this.finalize();
                    for (
                      var t,
                        e,
                        r = this.blockCount,
                        n = this.s,
                        i = this.outputBlocks,
                        o = this.extraBytes,
                        a = 0,
                        s = 0,
                        u = [];
                      s < i;

                    ) {
                      for (a = 0; a < r && s < i; ++a, ++s)
                        (t = s << 2),
                          (e = n[a]),
                          (u[t] = 255 & e),
                          (u[t + 1] = (e >> 8) & 255),
                          (u[t + 2] = (e >> 16) & 255),
                          (u[t + 3] = (e >> 24) & 255);
                      s % r == 0 && I(n);
                    }
                    return (
                      o &&
                        ((t = s << 2),
                        (e = n[a]),
                        (u[t] = 255 & e),
                        o > 1 && (u[t + 1] = (e >> 8) & 255),
                        o > 2 && (u[t + 2] = (e >> 16) & 255)),
                      u
                    );
                  }),
                (O.prototype = new L()),
                (O.prototype.finalize = function () {
                  return this.encode(this.outputBits, !0), L.prototype.finalize.call(this);
                });
              var I = function (t) {
                var e,
                  r,
                  n,
                  i,
                  o,
                  a,
                  s,
                  u,
                  f,
                  h,
                  l,
                  d,
                  p,
                  y,
                  v,
                  g,
                  b,
                  w,
                  m,
                  _,
                  A,
                  x,
                  E,
                  k,
                  B,
                  S,
                  C,
                  U,
                  T,
                  L,
                  O,
                  I,
                  R,
                  j,
                  H,
                  M,
                  N,
                  F,
                  z,
                  P,
                  V,
                  D,
                  $,
                  q,
                  Y,
                  X,
                  J,
                  W,
                  Z,
                  G,
                  K,
                  Q,
                  tt,
                  et,
                  rt,
                  nt,
                  it,
                  ot,
                  at,
                  st,
                  ut,
                  ft,
                  ht;
                for (n = 0; n < 48; n += 2)
                  (i = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40]),
                    (o = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41]),
                    (a = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42]),
                    (s = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43]),
                    (u = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44]),
                    (f = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45]),
                    (h = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46]),
                    (l = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47]),
                    (e = (d = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]) ^ ((a << 1) | (s >>> 31))),
                    (r = (p = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]) ^ ((s << 1) | (a >>> 31))),
                    (t[0] ^= e),
                    (t[1] ^= r),
                    (t[10] ^= e),
                    (t[11] ^= r),
                    (t[20] ^= e),
                    (t[21] ^= r),
                    (t[30] ^= e),
                    (t[31] ^= r),
                    (t[40] ^= e),
                    (t[41] ^= r),
                    (e = i ^ ((u << 1) | (f >>> 31))),
                    (r = o ^ ((f << 1) | (u >>> 31))),
                    (t[2] ^= e),
                    (t[3] ^= r),
                    (t[12] ^= e),
                    (t[13] ^= r),
                    (t[22] ^= e),
                    (t[23] ^= r),
                    (t[32] ^= e),
                    (t[33] ^= r),
                    (t[42] ^= e),
                    (t[43] ^= r),
                    (e = a ^ ((h << 1) | (l >>> 31))),
                    (r = s ^ ((l << 1) | (h >>> 31))),
                    (t[4] ^= e),
                    (t[5] ^= r),
                    (t[14] ^= e),
                    (t[15] ^= r),
                    (t[24] ^= e),
                    (t[25] ^= r),
                    (t[34] ^= e),
                    (t[35] ^= r),
                    (t[44] ^= e),
                    (t[45] ^= r),
                    (e = u ^ ((d << 1) | (p >>> 31))),
                    (r = f ^ ((p << 1) | (d >>> 31))),
                    (t[6] ^= e),
                    (t[7] ^= r),
                    (t[16] ^= e),
                    (t[17] ^= r),
                    (t[26] ^= e),
                    (t[27] ^= r),
                    (t[36] ^= e),
                    (t[37] ^= r),
                    (t[46] ^= e),
                    (t[47] ^= r),
                    (e = h ^ ((i << 1) | (o >>> 31))),
                    (r = l ^ ((o << 1) | (i >>> 31))),
                    (t[8] ^= e),
                    (t[9] ^= r),
                    (t[18] ^= e),
                    (t[19] ^= r),
                    (t[28] ^= e),
                    (t[29] ^= r),
                    (t[38] ^= e),
                    (t[39] ^= r),
                    (t[48] ^= e),
                    (t[49] ^= r),
                    (y = t[0]),
                    (v = t[1]),
                    (X = (t[11] << 4) | (t[10] >>> 28)),
                    (J = (t[10] << 4) | (t[11] >>> 28)),
                    (U = (t[20] << 3) | (t[21] >>> 29)),
                    (T = (t[21] << 3) | (t[20] >>> 29)),
                    (st = (t[31] << 9) | (t[30] >>> 23)),
                    (ut = (t[30] << 9) | (t[31] >>> 23)),
                    (D = (t[40] << 18) | (t[41] >>> 14)),
                    ($ = (t[41] << 18) | (t[40] >>> 14)),
                    (j = (t[2] << 1) | (t[3] >>> 31)),
                    (H = (t[3] << 1) | (t[2] >>> 31)),
                    (g = (t[13] << 12) | (t[12] >>> 20)),
                    (b = (t[12] << 12) | (t[13] >>> 20)),
                    (W = (t[22] << 10) | (t[23] >>> 22)),
                    (Z = (t[23] << 10) | (t[22] >>> 22)),
                    (L = (t[33] << 13) | (t[32] >>> 19)),
                    (O = (t[32] << 13) | (t[33] >>> 19)),
                    (ft = (t[42] << 2) | (t[43] >>> 30)),
                    (ht = (t[43] << 2) | (t[42] >>> 30)),
                    (et = (t[5] << 30) | (t[4] >>> 2)),
                    (rt = (t[4] << 30) | (t[5] >>> 2)),
                    (M = (t[14] << 6) | (t[15] >>> 26)),
                    (N = (t[15] << 6) | (t[14] >>> 26)),
                    (w = (t[25] << 11) | (t[24] >>> 21)),
                    (m = (t[24] << 11) | (t[25] >>> 21)),
                    (G = (t[34] << 15) | (t[35] >>> 17)),
                    (K = (t[35] << 15) | (t[34] >>> 17)),
                    (I = (t[45] << 29) | (t[44] >>> 3)),
                    (R = (t[44] << 29) | (t[45] >>> 3)),
                    (k = (t[6] << 28) | (t[7] >>> 4)),
                    (B = (t[7] << 28) | (t[6] >>> 4)),
                    (nt = (t[17] << 23) | (t[16] >>> 9)),
                    (it = (t[16] << 23) | (t[17] >>> 9)),
                    (F = (t[26] << 25) | (t[27] >>> 7)),
                    (z = (t[27] << 25) | (t[26] >>> 7)),
                    (_ = (t[36] << 21) | (t[37] >>> 11)),
                    (A = (t[37] << 21) | (t[36] >>> 11)),
                    (Q = (t[47] << 24) | (t[46] >>> 8)),
                    (tt = (t[46] << 24) | (t[47] >>> 8)),
                    (q = (t[8] << 27) | (t[9] >>> 5)),
                    (Y = (t[9] << 27) | (t[8] >>> 5)),
                    (S = (t[18] << 20) | (t[19] >>> 12)),
                    (C = (t[19] << 20) | (t[18] >>> 12)),
                    (ot = (t[29] << 7) | (t[28] >>> 25)),
                    (at = (t[28] << 7) | (t[29] >>> 25)),
                    (P = (t[38] << 8) | (t[39] >>> 24)),
                    (V = (t[39] << 8) | (t[38] >>> 24)),
                    (x = (t[48] << 14) | (t[49] >>> 18)),
                    (E = (t[49] << 14) | (t[48] >>> 18)),
                    (t[0] = y ^ (~g & w)),
                    (t[1] = v ^ (~b & m)),
                    (t[10] = k ^ (~S & U)),
                    (t[11] = B ^ (~C & T)),
                    (t[20] = j ^ (~M & F)),
                    (t[21] = H ^ (~N & z)),
                    (t[30] = q ^ (~X & W)),
                    (t[31] = Y ^ (~J & Z)),
                    (t[40] = et ^ (~nt & ot)),
                    (t[41] = rt ^ (~it & at)),
                    (t[2] = g ^ (~w & _)),
                    (t[3] = b ^ (~m & A)),
                    (t[12] = S ^ (~U & L)),
                    (t[13] = C ^ (~T & O)),
                    (t[22] = M ^ (~F & P)),
                    (t[23] = N ^ (~z & V)),
                    (t[32] = X ^ (~W & G)),
                    (t[33] = J ^ (~Z & K)),
                    (t[42] = nt ^ (~ot & st)),
                    (t[43] = it ^ (~at & ut)),
                    (t[4] = w ^ (~_ & x)),
                    (t[5] = m ^ (~A & E)),
                    (t[14] = U ^ (~L & I)),
                    (t[15] = T ^ (~O & R)),
                    (t[24] = F ^ (~P & D)),
                    (t[25] = z ^ (~V & $)),
                    (t[34] = W ^ (~G & Q)),
                    (t[35] = Z ^ (~K & tt)),
                    (t[44] = ot ^ (~st & ft)),
                    (t[45] = at ^ (~ut & ht)),
                    (t[6] = _ ^ (~x & y)),
                    (t[7] = A ^ (~E & v)),
                    (t[16] = L ^ (~I & k)),
                    (t[17] = O ^ (~R & B)),
                    (t[26] = P ^ (~D & j)),
                    (t[27] = V ^ (~$ & H)),
                    (t[36] = G ^ (~Q & q)),
                    (t[37] = K ^ (~tt & Y)),
                    (t[46] = st ^ (~ft & et)),
                    (t[47] = ut ^ (~ht & rt)),
                    (t[8] = x ^ (~y & g)),
                    (t[9] = E ^ (~v & b)),
                    (t[18] = I ^ (~k & S)),
                    (t[19] = R ^ (~B & C)),
                    (t[28] = D ^ (~j & M)),
                    (t[29] = $ ^ (~H & N)),
                    (t[38] = Q ^ (~q & X)),
                    (t[39] = tt ^ (~Y & J)),
                    (t[48] = ft ^ (~et & nt)),
                    (t[49] = ht ^ (~rt & it)),
                    (t[0] ^= c[n]),
                    (t[1] ^= c[n + 1]);
              };
              e.exports = x;
            }).call(this);
          }).call(
            this,
            t('_process'),
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                  ? window
                  : {},
          );
        },
        { _process: 35 },
      ],
      52: [
        function (t, e, r) {
          (function (r) {
            (function () {
              var n = t('jssha'),
                i = t('js-sha512').sha512_256,
                o = t('./blake256'),
                a = t('./sha3').keccak256,
                s = t('./blake2b'),
                u = t('./base58'),
                f = t('./base32'),
                h = t('browserify-bignum');
              function c(t, e) {
                var r = t.toString(16);
                return r.length % 2 == 1 && (r = '0' + r), r.padStart(e, '0');
              }
              function l(t) {
                return (t >= 'A' && t <= 'F') || (t >= 'a' && t <= 'f') || (t >= '0' && t <= '9')
                  ? 1
                  : 0;
              }
              function d(t) {
                var e = 0;
                return (
                  t >= 'A' && t <= 'F'
                    ? (e = t.charCodeAt(0) - 'A'.charCodeAt(0) + 10)
                    : t >= 'a' && t <= 'f'
                      ? (e = t.charCodeAt(0) - 'a'.charCodeAt(0) + 10)
                      : t >= '0' && t <= '9' && (e = t.charCodeAt(0) - '0'.charCodeAt(0)),
                  e
                );
              }
              function p(t) {
                var e = '';
                return (
                  (e += '0123456789ABCDEF'.charAt(t >> 4)), (e += '0123456789ABCDEF'.charAt(15 & t))
                );
              }
              e.exports = {
                numberToHex: c,
                toHex: function (t) {
                  for (var e = '', r = 0; r < t.length; r++) e += c(t[r]);
                  return e;
                },
                sha256: function (t, e = 'HEX') {
                  var r = new n('SHA-256', e);
                  return r.update(t), r.getHash(e);
                },
                sha256x2: function (t, e = 'HEX') {
                  return this.sha256(this.sha256(t, e), e);
                },
                sha256Checksum: function (t) {
                  return this.sha256(this.sha256(t)).substr(0, 8);
                },
                sha512_256: function (t, e = 'HEX') {
                  const n = i.create();
                  return n.update(r.from(t, e)), n.hex().toUpperCase();
                },
                blake256: function (t) {
                  return new o().update(t, 'hex').digest('hex');
                },
                blake256Checksum: function (t) {
                  return this.blake256(this.blake256(t)).substr(0, 8);
                },
                blake2b: function (t, e) {
                  return new s(e).update(r.from(t, 'hex')).digest('hex');
                },
                keccak256: function (t) {
                  return a(t);
                },
                keccak256Checksum: function (t) {
                  return a(t).toString().substr(0, 8);
                },
                blake2b256: function (t) {
                  return new s(32).update(r.from(t, 'hex'), 32).digest('hex');
                },
                base58: u.decode,
                byteArray2hexStr: function (t) {
                  for (var e = '', r = 0; r < t.length - 1; r++) e += p(t[r]);
                  return (e += p(t[r]));
                },
                hexStr2byteArray: function (t) {
                  var e = Array(),
                    r = 0,
                    n = 0,
                    i = 0,
                    o = 0;
                  for (n = 0; n < t.length; n++) {
                    var a = t.charAt(n);
                    l(a) && ((r <<= 4), (r += d(a)), 0 == ++i % 2 && ((e[o++] = r), (r = 0)));
                  }
                  return e;
                },
                bigNumberToBuffer: function (t, e) {
                  return new h(t).toBuffer({ size: e, endian: 'big' });
                },
                base32: f,
              };
            }).call(this);
          }).call(this, t('buffer').Buffer);
        },
        {
          './base32': 43,
          './base58': 44,
          './blake256': 47,
          './blake2b': 48,
          './sha3': 51,
          'browserify-bignum': 3,
          buffer: 4,
          'js-sha512': 32,
          jssha: 33,
        },
      ],
      53: [
        function (t, e, r) {
          var n = t('./ripple_validator'),
            i = t('./ethereum_validator'),
            o = t('./bitcoin_validator'),
            a = t('./ada_validator'),
            s = t('./monero_validator'),
            u = t('./nano_validator'),
            f = t('./siacoin_validator'),
            h = t('./tron_validator'),
            c = t('./nem_validator'),
            l = t('./lisk_validator'),
            d = t('./bch_validator'),
            p = t('./stellar_validator'),
            y = t('./eos_validator'),
            v = t('./tezos_validator'),
            g = t('./usdt_validator'),
            b = t('./algo_validator'),
            w = t('./dot_validator'),
            m = [
              {
                name: 'Bitcoin',
                symbol: 'btc',
                addressTypes: {
                  prod: ['00', '05'],
                  testnet: ['6f', 'c4', '3c', '26'],
                },
                bech32Hrp: { prod: ['bc'], testnet: ['tb'] },
                validator: o,
              },
              {
                name: 'BitcoinCash',
                symbol: 'bch',
                regexp: '^[qQpP]{1}[0-9a-zA-Z]{41}$',
                addressTypes: { prod: ['00', '05'], testnet: ['6f', 'c4'] },
                validator: d,
              },
              {
                name: 'Bitcoin SV',
                symbol: 'bsv',
                regexp: '^[qQ]{1}[0-9a-zA-Z]{41}$',
                addressTypes: { prod: ['00', '05'], testnet: ['6f', 'c4'] },
                validator: d,
              },
              {
                name: 'LiteCoin',
                symbol: 'ltc',
                addressTypes: {
                  prod: ['30', '05', '32'],
                  testnet: ['6f', 'c4', '3a'],
                },
                bech32Hrp: { prod: ['ltc'], testnet: ['tltc'] },
                validator: o,
              },
              {
                name: 'PeerCoin',
                symbol: 'ppc',
                addressTypes: { prod: ['37', '75'], testnet: ['6f', 'c4'] },
                validator: o,
              },
              {
                name: 'DogeCoin',
                symbol: 'doge',
                addressTypes: { prod: ['1e', '16'], testnet: ['71', 'c4'] },
                validator: o,
              },
              {
                name: 'BeaverCoin',
                symbol: 'bvc',
                addressTypes: { prod: ['19', '05'], testnet: ['6f', 'c4'] },
                validator: o,
              },
              {
                name: 'FreiCoin',
                symbol: 'frc',
                addressTypes: { prod: ['00', '05'], testnet: ['6f', 'c4'] },
                validator: o,
              },
              {
                name: 'ProtoShares',
                symbol: 'pts',
                addressTypes: { prod: ['38', '05'], testnet: ['6f', 'c4'] },
                validator: o,
              },
              {
                name: 'MegaCoin',
                symbol: 'mec',
                addressTypes: { prod: ['32', '05'], testnet: ['6f', 'c4'] },
                validator: o,
              },
              {
                name: 'PrimeCoin',
                symbol: 'xpm',
                addressTypes: { prod: ['17', '53'], testnet: ['6f', 'c4'] },
                validator: o,
              },
              {
                name: 'AuroraCoin',
                symbol: 'aur',
                addressTypes: { prod: ['17', '05'], testnet: ['6f', 'c4'] },
                validator: o,
              },
              {
                name: 'NameCoin',
                symbol: 'nmc',
                addressTypes: { prod: ['34'], testnet: [] },
                validator: o,
              },
              {
                name: 'BioCoin',
                symbol: 'bio',
                addressTypes: { prod: ['19', '14'], testnet: ['6f', 'c4'] },
                validator: o,
              },
              {
                name: 'GarliCoin',
                symbol: 'grlc',
                addressTypes: { prod: ['26', '05'], testnet: ['6f', 'c4'] },
                validator: o,
              },
              {
                name: 'VertCoin',
                symbol: 'vtc',
                addressTypes: {
                  prod: ['0x', '47', '71', '05'],
                  testnet: ['6f', 'c4'],
                },
                bech32Hrp: { prod: ['vtc'], testnet: ['tvtc'] },
                validator: o,
              },
              {
                name: 'BitcoinGold',
                symbol: 'btg',
                addressTypes: { prod: ['26', '17'], testnet: ['6f', 'c4'] },
                validator: o,
              },
              {
                name: 'Komodo',
                symbol: 'kmd',
                addressTypes: { prod: ['3c', '55'], testnet: ['0', '5'] },
                validator: o,
              },
              {
                name: 'BitcoinZ',
                symbol: 'btcz',
                expectedLength: 26,
                addressTypes: {
                  prod: ['1cb8', '1cbd'],
                  testnet: ['1d25', '1cba'],
                },
                validator: o,
              },
              {
                name: 'BitcoinPrivate',
                symbol: 'btcp',
                expectedLength: 26,
                addressTypes: {
                  prod: ['1325', '13af'],
                  testnet: ['1957', '19e0'],
                },
                validator: o,
              },
              {
                name: 'Hush',
                symbol: 'hush',
                expectedLength: 26,
                addressTypes: {
                  prod: ['1cb8', '1cbd'],
                  testnet: ['1d25', '1cba'],
                },
                validator: o,
              },
              {
                name: 'SnowGem',
                symbol: 'sng',
                expectedLength: 26,
                addressTypes: {
                  prod: ['1c28', '1c2d'],
                  testnet: ['1d25', '1cba'],
                },
                validator: o,
              },
              {
                name: 'ZCash',
                symbol: 'zec',
                expectedLength: 26,
                addressTypes: {
                  prod: ['1cb8', '1cbd'],
                  testnet: ['1d25', '1cba'],
                },
                validator: o,
              },
              {
                name: 'ZClassic',
                symbol: 'zcl',
                expectedLength: 26,
                addressTypes: {
                  prod: ['1cb8', '1cbd'],
                  testnet: ['1d25', '1cba'],
                },
                validator: o,
              },
              {
                name: 'ZenCash',
                symbol: 'zen',
                expectedLength: 26,
                addressTypes: {
                  prod: ['2089', '2096'],
                  testnet: ['2092', '2098'],
                },
                validator: o,
              },
              {
                name: 'VoteCoin',
                symbol: 'vot',
                expectedLength: 26,
                addressTypes: {
                  prod: ['1cb8', '1cbd'],
                  testnet: ['1d25', '1cba'],
                },
                validator: o,
              },
              {
                name: 'Decred',
                symbol: 'dcr',
                addressTypes: {
                  prod: ['073f', '071a'],
                  testnet: ['0f21', '0efc'],
                },
                hashFunction: 'blake256',
                expectedLength: 26,
                validator: o,
              },
              {
                name: 'GameCredits',
                symbol: 'game',
                addressTypes: { prod: ['26', '05'], testnet: [] },
                validator: i,
              },
              {
                name: 'PIVX',
                symbol: 'pivx',
                addressTypes: { prod: ['1e', '0d'], testnet: [] },
                validator: o,
              },
              {
                name: 'SolarCoin',
                symbol: 'slr',
                addressTypes: { prod: ['12', '05'], testnet: [] },
                validator: o,
              },
              {
                name: 'MonaCoin',
                symbol: 'mona',
                addressTypes: { prod: ['32', '37'], testnet: [] },
                validator: o,
              },
              {
                name: 'DigiByte',
                symbol: 'dgb',
                addressTypes: { prod: ['1e', '3f'], testnet: [] },
                bech32Hrp: { prod: ['dgb', 'S'], testnet: [] },
                validator: o,
              },
              {
                name: 'Tether',
                symbol: 'usdt',
                addressTypes: { prod: ['00', '05'], testnet: ['6f', 'c4'] },
                validator: g,
              },
              { name: 'Ripple', symbol: 'xrp', validator: n },
              {
                name: 'Dash',
                symbol: 'dash',
                addressTypes: { prod: ['4c', '10'], testnet: ['8c', '13'] },
                validator: o,
              },
              {
                name: 'Neo',
                symbol: 'neo',
                addressTypes: { prod: ['17'], testnet: [] },
                validator: o,
              },
              {
                name: 'NeoGas',
                symbol: 'gas',
                addressTypes: { prod: ['17'], testnet: [] },
                validator: o,
              },
              {
                name: 'Qtum',
                symbol: 'qtum',
                addressTypes: { prod: ['3a', '32'], testnet: ['78', '6e'] },
                validator: o,
              },
              {
                name: 'Waves',
                symbol: 'waves',
                addressTypes: { prod: ['0157'], testnet: ['0154'] },
                expectedLength: 26,
                hashFunction: 'blake256keccak256',
                regex: /^[a-zA-Z0-9]{35}$/,
                validator: o,
              },
              { name: 'Ethereum', symbol: 'eth', validator: i },
              { name: 'EthereumPow', symbol: 'ethw', validator: i },
              { name: 'EtherZero', symbol: 'etz', validator: i },
              { name: 'EthereumClassic', symbol: 'etc', validator: i },
              { name: 'Callisto', symbol: 'clo', validator: i },
              { name: 'Bankex', symbol: 'bkx', validator: i },
              {
                name: 'Cardano',
                symbol: 'ada',
                bech32Hrp: { prod: ['addr'], testnet: ['addr'] },
                validator: a,
              },
              {
                name: 'Monero',
                symbol: 'xmr',
                addressTypes: {
                  prod: ['18', '42'],
                  testnet: ['53', '63'],
                  stagenet: ['24'],
                },
                iAddressTypes: {
                  prod: ['19'],
                  testnet: ['54'],
                  stagenet: ['25'],
                },
                validator: s,
              },
              { name: 'Aragon', symbol: 'ant', validator: i },
              { name: 'Basic Attention Token', symbol: 'bat', validator: i },
              { name: 'Bancor', symbol: 'bnt', validator: i },
              { name: 'Civic', symbol: 'cvc', validator: i },
              { name: 'District0x', symbol: 'dnt', validator: i },
              { name: 'Gnosis', symbol: 'gno', validator: i },
              { name: 'Golem (GNT)', symbol: 'gnt', validator: i },
              { name: 'Golem', symbol: 'glm', validator: i },
              { name: 'Matchpool', symbol: 'gup', validator: i },
              { name: 'Melon', symbol: 'mln', validator: i },
              { name: 'Numeraire', symbol: 'nmr', validator: i },
              { name: 'OmiseGO', symbol: 'omg', validator: i },
              { name: 'TenX', symbol: 'pay', validator: i },
              { name: 'Ripio Credit Network', symbol: 'rcn', validator: i },
              { name: 'Augur', symbol: 'rep', validator: i },
              { name: 'iExec RLC', symbol: 'rlc', validator: i },
              { name: 'Salt', symbol: 'salt', validator: i },
              { name: 'Status', symbol: 'snt', validator: i },
              { name: 'Storj', symbol: 'storj', validator: i },
              { name: 'Swarm City', symbol: 'swt', validator: i },
              { name: 'TrueUSD', symbol: 'tusd', validator: i },
              { name: 'Wings', symbol: 'wings', validator: i },
              { name: '0x', symbol: 'zrx', validator: i },
              { name: 'Expanse', symbol: 'exp', validator: i },
              { name: 'Viberate', symbol: 'vib', validator: i },
              { name: 'Odyssey', symbol: 'ocn', validator: i },
              { name: 'Polymath', symbol: 'poly', validator: i },
              { name: 'Storm', symbol: 'storm', validator: i },
              { name: 'Nano', symbol: 'nano', validator: u },
              { name: 'RaiBlocks', symbol: 'xrb', validator: u },
              { name: 'Siacoin', symbol: 'sc', validator: f },
              { name: 'HyperSpace', symbol: 'xsc', validator: f },
              {
                name: 'loki',
                symbol: 'loki',
                addressTypes: { prod: ['114', '115', '116'], testnet: [] },
                iAddressTypes: { prod: ['115'], testnet: [] },
                validator: s,
              },
              {
                name: 'LBRY Credits',
                symbol: 'lbc',
                addressTypes: { prod: ['55'], testnet: [] },
                validator: o,
              },
              {
                name: 'Tron',
                symbol: 'trx',
                addressTypes: { prod: [65], testnet: [160] },
                validator: h,
              },
              { name: 'Nem', symbol: 'xem', validator: c },
              { name: 'Lisk', symbol: 'lsk', validator: l },
              { name: 'Stellar', symbol: 'xlm', validator: p },
              { name: 'BTU Protocol', symbol: 'btu', validator: i },
              {
                name: 'Crypto.com Coin',
                symbol: 'cro',
                bech32Hrp: { prod: ['cro'], testnet: ['tcro'] },
                validator: t('./bip173_validator'),
              },
              { name: 'Multi-collateral DAI', symbol: 'dai', validator: i },
              { name: 'Enjin Coin', symbol: 'enj', validator: i },
              { name: 'HedgeTrade', symbol: 'hedg', validator: i },
              { name: 'Cred', symbol: 'lba', validator: i },
              { name: 'Chainlink', symbol: 'link', validator: i },
              { name: 'Loom Network', symbol: 'loom', validator: i },
              { name: 'Maker', symbol: 'mkr', validator: i },
              { name: 'Metal', symbol: 'mtl', validator: i },
              { name: 'Ocean Protocol', symbol: 'ocean', validator: i },
              { name: 'Quant', symbol: 'qnt', validator: i },
              { name: 'Synthetix Network', symbol: 'snx', validator: i },
              { name: 'SOLVE', symbol: 'solve', validator: i },
              { name: 'Spendcoin', symbol: 'spnd', validator: i },
              { name: 'TEMCO', symbol: 'temco', validator: i },
              { name: 'EOS', symbol: 'eos', validator: y },
              { name: 'Tezos', symbol: 'xtz', validator: v },
              { name: 'VeChain', symbol: 'vet', validator: i },
              { name: 'StormX', symbol: 'stmx', validator: i },
              { name: 'AugurV2', symbol: 'repv2', validator: i },
              { name: 'FirmaChain', symbol: 'fct', validator: i },
              { name: 'BlockTrade', symbol: 'btt', validator: i },
              { name: 'Quantum Resistant Ledger', symbol: 'qrl', validator: i },
              { name: 'Serve', symbol: 'serv', validator: i },
              { name: 'Tap', symbol: 'xtp', validator: i },
              { name: 'Compound', symbol: 'comp', validator: i },
              { name: 'Paxos', symbol: 'pax', validator: i },
              { name: 'USD Coin', symbol: 'usdc', validator: i },
              { name: 'CUSD', symbol: 'cusd', validator: i },
              { name: 'Algorand', symbol: 'algo', validator: b },
              { name: 'Polkadot', symbol: 'dot', validator: w },
              { name: 'Uniswap Coin', symbol: 'uni', validator: i },
              { name: 'Aave Coin', symbol: 'aave', validator: i },
              { name: 'Matic', symbol: 'matic', validator: i },
              { name: 'Decentraland', symbol: 'mana', validator: i },
              {
                name: 'Solana',
                symbol: 'sol',
                validator: t('./base58_validator'),
                maxLength: 44,
                minLength: 43,
              },
              { name: 'Binance', symbol: 'bnb', validator: i },
              { name: 'Avalanche', symbol: 'avax', validator: i },
              { name: 'Flare', symbol: 'flr', validator: i },
            ];
          e.exports = {
            getByNameOrSymbol: function (t) {
              var e = t.toLowerCase();
              return m.find(function (t) {
                return t.name.toLowerCase() === e || t.symbol.toLowerCase() === e;
              });
            },
            getAll: function () {
              return m;
            },
          };
        },
        {
          './ada_validator': 37,
          './algo_validator': 38,
          './base58_validator': 39,
          './bch_validator': 40,
          './bip173_validator': 41,
          './bitcoin_validator': 42,
          './dot_validator': 54,
          './eos_validator': 55,
          './ethereum_validator': 56,
          './lisk_validator': 57,
          './monero_validator': 58,
          './nano_validator': 59,
          './nem_validator': 60,
          './ripple_validator': 61,
          './siacoin_validator': 62,
          './stellar_validator': 63,
          './tezos_validator': 64,
          './tron_validator': 65,
          './usdt_validator': 66,
        },
      ],
      54: [
        function (t, e, r) {
          const n = t('./crypto/utils'),
            i = [
              { addressLength: 3, accountIndexLength: 1, checkSumLength: 1 },
              { addressLength: 4, accountIndexLength: 2, checkSumLength: 1 },
              { addressLength: 5, accountIndexLength: 2, checkSumLength: 2 },
              { addressLength: 6, accountIndexLength: 4, checkSumLength: 1 },
              { addressLength: 7, accountIndexLength: 4, checkSumLength: 2 },
              { addressLength: 8, accountIndexLength: 4, checkSumLength: 3 },
              { addressLength: 9, accountIndexLength: 4, checkSumLength: 4 },
              { addressLength: 10, accountIndexLength: 8, checkSumLength: 1 },
              { addressLength: 11, accountIndexLength: 8, checkSumLength: 2 },
              { addressLength: 12, accountIndexLength: 8, checkSumLength: 3 },
              { addressLength: 13, accountIndexLength: 8, checkSumLength: 4 },
              { addressLength: 14, accountIndexLength: 8, checkSumLength: 5 },
              { addressLength: 15, accountIndexLength: 8, checkSumLength: 6 },
              { addressLength: 16, accountIndexLength: 8, checkSumLength: 7 },
              { addressLength: 17, accountIndexLength: 8, checkSumLength: 8 },
              { addressLength: 34, accountIndexLength: 32, checkSumLength: 2 },
            ];
          e.exports = {
            isValidAddress: function (t, e, r = {}) {
              const { networkType: n = 'prod' } = r;
              return this.verifyChecksum(t);
            },
            verifyChecksum: function (t) {
              try {
                const e = '53533538505245',
                  r = n.base58(t),
                  o = n.byteArray2hexStr(r.slice(0, 1)),
                  a = r.slice(1),
                  s = i.find((t) => t.addressLength === a.length);
                if (!s) throw new Error('Invalid address length');
                const u = n.byteArray2hexStr(a.slice(0, s.accountIndexLength)),
                  f = n.byteArray2hexStr(a.slice(-s.checkSumLength));
                return (
                  n
                    .blake2b(e + o + u, 64)
                    .substr(0, 2 * s.checkSumLength)
                    .toUpperCase() == f
                );
              } catch (t) {
                return !1;
              }
            },
          };
        },
        { './crypto/utils': 52 },
      ],
      55: [
        function (t, e, r) {
          e.exports = {
            isValidAddress: function (t, e, r) {
              return (function (t, e, r) {
                return -1 !== t.search(/^[a-z0-9.]+$/g) && 12 === t.length;
              })(t);
            },
          };
        },
        {},
      ],
      56: [
        function (t, e, r) {
          var n = t('./crypto/utils');
          e.exports = {
            isValidAddress: function (t) {
              return (
                !!/^0x[0-9a-fA-F]{40}$/.test(t) &&
                (!(!/^0x[0-9a-f]{40}$/.test(t) && !/^0x?[0-9A-F]{40}$/.test(t)) ||
                  this.verifyChecksum(t))
              );
            },
            verifyChecksum: function (t) {
              t = t.replace('0x', '');
              for (var e = n.keccak256(t.toLowerCase()), r = 0; r < 40; r++)
                if (
                  (parseInt(e[r], 16) > 7 && t[r].toUpperCase() !== t[r]) ||
                  (parseInt(e[r], 16) <= 7 && t[r].toLowerCase() !== t[r])
                )
                  return !1;
              return !0;
            },
          };
        },
        { './crypto/utils': 52 },
      ],
      57: [
        function (t, e, r) {
          (function (r) {
            (function () {
              var n = t('./crypto/utils'),
                i = new RegExp('^[0-9]{1,20}L$');
              e.exports = {
                isValidAddress: function (t) {
                  return !!i.test(t) && this.verifyAddress(t);
                },
                verifyAddress: function (t) {
                  var e = t.substring(0, t.length - 1),
                    i = n.bigNumberToBuffer(e);
                  return r.from(i).slice(0, 8).equals(i);
                },
              };
            }).call(this);
          }).call(this, t('buffer').Buffer);
        },
        { './crypto/utils': 52, buffer: 4 },
      ],
      58: [
        function (t, e, r) {
          var n = t('./crypto/utils'),
            i = t('./crypto/cnBase58'),
            o = 'prod',
            a = new RegExp('^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{95}$'),
            s = new RegExp('^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{106}$');
          e.exports = {
            isValidAddress: function (t, e, r = {}) {
              const { networkType: u = o } = r;
              var f = 'standard';
              if (!a.test(t)) {
                if (!s.test(t)) return !1;
                f = 'integrated';
              }
              var h = i.decode(t);
              return (
                !!h &&
                !!(function (t, e, r, n) {
                  var i = e.addressTypes;
                  'integrated' == n && (i = e.iAddressTypes);
                  var o = parseInt(t.substr(0, 2), 16).toString();
                  switch (r) {
                    case 'prod':
                      return i.prod.indexOf(o) >= 0;
                    case 'testnet':
                      return i.testnet.indexOf(o) >= 0;
                    case 'stagenet':
                      return i.stagenet.indexOf(o) >= 0;
                    case 'both':
                      return (
                        i.prod.indexOf(o) >= 0 ||
                        i.testnet.indexOf(o) >= 0 ||
                        i.stagenet.indexOf(o) >= 0
                      );
                    default:
                      return !1;
                  }
                })(h, e, u, f) &&
                h.slice(-8) ===
                  n.keccak256Checksum(
                    (function (t) {
                      if (t.length % 2 != 0) return null;
                      for (var e = new Uint8Array(t.length / 2), r = 0; r < t.length / 2; ++r)
                        e[r] = parseInt(t.slice(2 * r, 2 * r + 2), 16);
                      return e;
                    })(h.slice(0, -8)),
                  )
              );
            },
          };
        },
        { './crypto/cnBase58': 49, './crypto/utils': 52 },
      ],
      59: [
        function (t, e, r) {
          var n = t('./crypto/utils'),
            i = t('base-x')('13456789abcdefghijkmnopqrstuwxyz'),
            o = new RegExp('^(xrb|nano)_([13456789abcdefghijkmnopqrstuwxyz]{60})$');
          e.exports = {
            isValidAddress: function (t) {
              return !!o.test(t) && this.verifyChecksum(t);
            },
            verifyChecksum: function (t) {
              var e = i.decode(o.exec(t)[2]).slice(-37);
              return n.blake2b(n.toHex(e.slice(0, -5)), 5) === n.toHex(e.slice(-5).reverse());
            },
          };
        },
        { './crypto/utils': 52, 'base-x': 1 },
      ],
      60: [
        function (t, e, r) {
          (function (r) {
            (function () {
              var n = t('./crypto/utils');
              e.exports = {
                isValidAddress: function (t) {
                  var e = t.toString().toUpperCase().replace(/-/g, '');
                  if (!e || 40 !== e.length) return !1;
                  var i = n.toHex(n.base32.b32decode(e));
                  return n.keccak256Checksum(r.from(i.slice(0, 42), 'hex')) === i.slice(42);
                },
              };
            }).call(this);
          }).call(this, t('buffer').Buffer);
        },
        { './crypto/utils': 52, buffer: 4 },
      ],
      61: [
        function (t, e, r) {
          var n = t('./crypto/utils'),
            i = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz',
            o = t('base-x')(i),
            a = new RegExp('^r[' + i + ']{27,35}$');
          e.exports = {
            isValidAddress: function (t) {
              return !!a.test(t) && this.verifyChecksum(t);
            },
            verifyChecksum: function (t) {
              var e = o.decode(t);
              return n.sha256Checksum(n.toHex(e.slice(0, -4))) === n.toHex(e.slice(-4));
            },
          };
        },
        { './crypto/utils': 52, 'base-x': 1 },
      ],
      62: [
        function (t, e, r) {
          var n = t('./crypto/utils'),
            i = t('lodash.isequal');
          e.exports = {
            isValidAddress: function (t) {
              return 76 === t.length && this.verifyChecksum(t);
            },
            verifyChecksum: function (t) {
              var e = t.slice(0, 64),
                r = t.slice(64, 76),
                o = n.blake2b(e, 32).slice(0, 12);
              return !!i(o, r);
            },
          };
        },
        { './crypto/utils': 52, 'lodash.isequal': 34 },
      ],
      63: [
        function (t, e, r) {
          var n = t('base-x'),
            i = t('crc'),
            o = t('./crypto/utils'),
            a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
            s = n(a),
            u = new RegExp('^[' + a + ']{56}$');
          e.exports = {
            isValidAddress: function (t) {
              return !!u.test(t) && this.verifyChecksum(t);
            },
            verifyChecksum: function (t) {
              var e,
                r = s.decode(t);
              return (
                48 === r[0] &&
                o.numberToHex(
                  ((255 & (e = i.crc16xmodem(r.slice(0, -2)))) << 8) | ((e >> 8) & 255),
                  4,
                ) === o.toHex(r.slice(-2))
              );
            },
          };
        },
        { './crypto/utils': 52, 'base-x': 1, crc: 30 },
      ],
      64: [
        function (t, e, r) {
          const n = t('./crypto/base58'),
            i = t('./crypto/utils'),
            o = new Uint8Array([6, 161, 159]);
          e.exports = {
            isValidAddress: function (t) {
              try {
                let e = (function (t) {
                  let e = t.slice(0, -4),
                    r = t.slice(-4),
                    n = i.hexStr2byteArray(i.sha256x2(i.byteArray2hexStr(e)));
                  if (!((r[0] ^ n[0]) | (r[1] ^ n[1]) | (r[2] ^ n[2]) | (r[3] ^ n[3]))) return e;
                })(n.decode(t));
                return !!e && (e.slice(o.length), !0);
              } catch (t) {
                return !1;
              }
            },
          };
        },
        { './crypto/base58': 44, './crypto/utils': 52 },
      ],
      65: [
        function (t, e, r) {
          var n = t('./crypto/utils');
          e.exports = {
            isValidAddress: function (t, e, r) {
              var i = r ? r.networkType : '',
                o = (function (t) {
                  if ('string' != typeof t) return !1;
                  if (t.length <= 4) return !1;
                  try {
                    var e = n.base58(t);
                  } catch (t) {
                    return !1;
                  }
                  var r = e.length - 4,
                    i = e.slice(r);
                  e = e.slice(0, r);
                  var o = n.sha256(n.byteArray2hexStr(e)),
                    a = n.hexStr2byteArray(n.sha256(o)).slice(0, 4);
                  return i[0] === a[0] && i[1] === a[1] && i[2] === a[2] && i[3] === a[3] && e;
                })(t);
              return (
                !!o &&
                21 === o.length &&
                (function (t, e) {
                  var r = e || 'prod';
                  return 'prod' !== r && 'testnet' !== r && (r = 'prod'), t.addressTypes[r][0];
                })(e, i) === o[0]
              );
            },
          };
        },
        { './crypto/utils': 52 },
      ],
      66: [
        function (t, e, r) {
          var n = t('./bitcoin_validator'),
            i = t('./ethereum_validator');
          e.exports = {
            isValidAddress: function (t, e, r) {
              if (r) {
                if ('erc20' === r.chainType) return i.isValidAddress(t, e, r.networkType);
                if ('omni' === r.chainType) return n.isValidAddress(t, e, r.networkType);
              }
              return (function (t, e, r) {
                var o = n.isValidAddress(t, e, r);
                return o || i.isValidAddress(t, e, r);
              })(t, e, r);
            },
          };
        },
        { './bitcoin_validator': 42, './ethereum_validator': 56 },
      ],
      67: [
        function (t, e, r) {
          var n = t('./currencies');
          e.exports = {
            validate: function (t, e, r) {
              var i = n.getByNameOrSymbol(e || 'bitcoin');
              if (i && i.validator)
                return r && 'string' == typeof r
                  ? i.validator.isValidAddress(t, i, { networkType: r })
                  : i.validator.isValidAddress(t, i, r);
              throw new Error('Missing validator for currency: ' + e);
            },
            getCurrencies: function () {
              return n.getAll();
            },
            findCurrency: function (t) {
              return n.getByNameOrSymbol(t) || null;
            },
          };
        },
        { './currencies': 53 },
      ],
    },
    {},
    [67],
  )(67);
});
