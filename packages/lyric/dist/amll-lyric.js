var ft = Object.defineProperty;
var ut = (n, t, e) => t in n ? ft(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var E = (n, t, e) => (ut(n, typeof t != "symbol" ? t + "" : t, e), e);
import { deflate as dt, inflate as mt } from "pako";
import { parseTTML as Tt, exportTTML as ht } from "@applemusic-like-lyrics/ttml";
const $ = (n) => ({
  words: [],
  translatedLyric: "",
  romanLyric: "",
  isBG: !1,
  isDuet: !1,
  startTime: 0,
  endTime: 0,
  ...n
}), x = (n) => ({
  startTime: 0,
  endTime: 0,
  word: "",
  ...n
}), pt = (n) => Math.round(
  n.split(":").map(Number).reverse().reduce((t, e, s) => t + e * 60 ** s, 0) * 1e3
), et = (n, t, e = "") => parseInt(n, 10) * 6e4 + parseInt(t, 10) * 1e3 + parseInt(`${e}000`.slice(0, 3), 10), rt = (n) => {
  const t = Math.floor(n / 6e4).toString().padStart(2, "0"), e = Math.floor(n % 6e4 / 1e3).toString().padStart(2, "0"), s = Math.floor(n % 1e3).toString().padStart(3, "0");
  return `${t}:${e}.${s}`;
}, h = (n) => !Number.isFinite(n) || n < 0 ? 0 : n, D = (n) => !Number.isFinite(n) || n < 0 ? 0 : n, it = et(
  "999",
  "59",
  "999"
), gt = (n) => Math.min(it, h(n));
function F(n) {
  const t = h(n), e = Math.round(t) % 1e3, s = Math.floor(Math.round(t) / 1e3), r = s % 60, i = Math.floor(s / 60);
  return `${Math.floor(i / 60)}:${String(i % 60).padStart(2, "0")}:${String(r).padStart(2, "0")}.${String(Math.floor(e / 10)).padStart(2, "0")}`;
}
function yt(n) {
  let t = n.isDuet ? "v2" : "v1";
  return n.isBG && (t += "-bg"), t;
}
function O(n, t, e, s, r) {
  n.push(
    `Dialogue: 0,${F(t)}, ${F(e)}, Default, ${s},0,0,0,,${r}`
  );
}
function pn(n) {
  const t = [
    "[Script Info]",
    "[Events]",
    "Formats: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"
  ];
  for (const e of n) {
    const s = e.words.map((a) => ({
      ...a,
      startTime: h(a.startTime),
      endTime: h(a.endTime)
    })).filter((a) => a.endTime > a.startTime), r = Math.min(...s.map((a) => a.startTime)), i = Math.max(...s.map((a) => a.endTime));
    if (!Number.isFinite(r) || !Number.isFinite(i))
      continue;
    let o = "", c = r;
    for (const a of e.words) {
      const f = h(a.startTime), l = h(a.endTime);
      if (f >= l) {
        o += a.word;
        continue;
      }
      if (f > c) {
        const m = Math.floor(
          (f - c + 5) / 10
        );
        m > 0 && (o += `{\\k${m}}`);
      }
      const d = Math.floor((l - f + 5) / 10);
      d > 0 && (o += `{\\k${d}}`), o += a.word, c = l;
    }
    const u = yt(e);
    O(t, r, i, u, o), e.translatedLyric && O(
      t,
      r,
      i,
      `${u}-trans`,
      e.translatedLyric
    ), e.romanLyric && O(
      t,
      r,
      i,
      `${u}-roman`,
      e.romanLyric
    );
  }
  return `${t.join(`
`)}
`;
}
const U = new TextEncoder().encode("!@#)(*$%"), q = new TextEncoder().encode("123ZXC!@"), H = new TextEncoder().encode("!@#)(NHL"), xt = [
  14,
  4,
  13,
  1,
  2,
  15,
  11,
  8,
  3,
  10,
  6,
  12,
  5,
  9,
  0,
  7,
  0,
  15,
  7,
  4,
  14,
  2,
  13,
  1,
  10,
  6,
  12,
  11,
  9,
  5,
  3,
  8,
  4,
  1,
  14,
  8,
  13,
  6,
  2,
  11,
  15,
  12,
  9,
  7,
  3,
  10,
  5,
  0,
  15,
  12,
  8,
  2,
  4,
  9,
  1,
  7,
  5,
  11,
  3,
  14,
  10,
  0,
  6,
  13
], wt = [
  15,
  1,
  8,
  14,
  6,
  11,
  3,
  4,
  9,
  7,
  2,
  13,
  12,
  0,
  5,
  10,
  3,
  13,
  4,
  7,
  15,
  2,
  8,
  15,
  12,
  0,
  1,
  10,
  6,
  9,
  11,
  5,
  0,
  14,
  7,
  11,
  10,
  4,
  13,
  1,
  5,
  8,
  12,
  6,
  9,
  3,
  2,
  15,
  13,
  8,
  10,
  1,
  3,
  15,
  4,
  2,
  11,
  6,
  7,
  12,
  0,
  5,
  14,
  9
], Lt = [
  10,
  0,
  9,
  14,
  6,
  3,
  15,
  5,
  1,
  13,
  12,
  7,
  11,
  4,
  2,
  8,
  13,
  7,
  0,
  9,
  3,
  4,
  6,
  10,
  2,
  8,
  5,
  14,
  12,
  11,
  15,
  1,
  13,
  6,
  4,
  9,
  8,
  15,
  3,
  0,
  11,
  1,
  2,
  12,
  5,
  10,
  14,
  7,
  1,
  10,
  13,
  0,
  6,
  9,
  8,
  7,
  4,
  15,
  14,
  3,
  11,
  5,
  2,
  12
], Bt = [
  7,
  13,
  14,
  3,
  0,
  6,
  9,
  10,
  1,
  2,
  8,
  5,
  11,
  12,
  4,
  15,
  13,
  8,
  11,
  5,
  6,
  15,
  0,
  3,
  4,
  7,
  2,
  12,
  1,
  10,
  14,
  9,
  10,
  6,
  9,
  0,
  12,
  11,
  7,
  13,
  15,
  1,
  3,
  14,
  5,
  2,
  8,
  4,
  3,
  15,
  0,
  6,
  10,
  10,
  13,
  8,
  9,
  4,
  5,
  11,
  12,
  7,
  2,
  14
], St = [
  2,
  12,
  4,
  1,
  7,
  10,
  11,
  6,
  8,
  5,
  3,
  15,
  13,
  0,
  14,
  9,
  14,
  11,
  2,
  12,
  4,
  7,
  13,
  1,
  5,
  0,
  15,
  10,
  3,
  9,
  8,
  6,
  4,
  2,
  1,
  11,
  10,
  13,
  7,
  8,
  15,
  9,
  12,
  5,
  6,
  3,
  0,
  14,
  11,
  8,
  12,
  7,
  1,
  14,
  2,
  13,
  6,
  15,
  0,
  9,
  10,
  4,
  5,
  3
], bt = [
  12,
  1,
  10,
  15,
  9,
  2,
  6,
  8,
  0,
  13,
  3,
  4,
  14,
  7,
  5,
  11,
  10,
  15,
  4,
  2,
  7,
  12,
  9,
  5,
  6,
  1,
  13,
  14,
  0,
  11,
  3,
  8,
  9,
  14,
  15,
  5,
  2,
  8,
  12,
  3,
  7,
  0,
  4,
  10,
  1,
  13,
  11,
  6,
  4,
  3,
  2,
  12,
  9,
  5,
  15,
  10,
  11,
  14,
  1,
  7,
  6,
  0,
  8,
  13
], Et = [
  4,
  11,
  2,
  14,
  15,
  0,
  8,
  13,
  3,
  12,
  9,
  7,
  5,
  10,
  6,
  1,
  13,
  0,
  11,
  7,
  4,
  9,
  1,
  10,
  14,
  3,
  5,
  12,
  2,
  15,
  8,
  6,
  1,
  4,
  11,
  13,
  12,
  3,
  7,
  14,
  10,
  15,
  6,
  8,
  0,
  5,
  9,
  2,
  6,
  11,
  13,
  8,
  1,
  4,
  10,
  7,
  9,
  5,
  0,
  15,
  14,
  2,
  3,
  12
], It = [
  13,
  2,
  8,
  4,
  6,
  15,
  11,
  1,
  10,
  9,
  3,
  14,
  5,
  0,
  12,
  7,
  1,
  15,
  13,
  8,
  10,
  3,
  7,
  4,
  12,
  5,
  6,
  11,
  0,
  14,
  9,
  2,
  7,
  11,
  4,
  1,
  9,
  12,
  14,
  2,
  0,
  6,
  10,
  13,
  15,
  3,
  5,
  8,
  2,
  1,
  14,
  7,
  4,
  10,
  8,
  13,
  15,
  12,
  9,
  0,
  3,
  5,
  6,
  11
], $t = [
  xt,
  wt,
  Lt,
  Bt,
  St,
  bt,
  Et,
  It
], At = [
  16,
  7,
  20,
  21,
  29,
  12,
  28,
  17,
  1,
  15,
  23,
  26,
  5,
  18,
  31,
  10,
  2,
  8,
  24,
  14,
  32,
  27,
  3,
  9,
  19,
  13,
  30,
  6,
  22,
  11,
  4,
  25
], K = [
  32,
  1,
  2,
  3,
  4,
  5,
  4,
  5,
  6,
  7,
  8,
  9,
  8,
  9,
  10,
  11,
  12,
  13,
  12,
  13,
  14,
  15,
  16,
  17,
  16,
  17,
  18,
  19,
  20,
  21,
  20,
  21,
  22,
  23,
  24,
  25,
  24,
  25,
  26,
  27,
  28,
  29,
  28,
  29,
  30,
  31,
  32,
  1
], Mt = [
  1,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  1
], kt = [
  56,
  48,
  40,
  32,
  24,
  16,
  8,
  0,
  57,
  49,
  41,
  33,
  25,
  17,
  9,
  1,
  58,
  50,
  42,
  34,
  26,
  18,
  10,
  2,
  59,
  51,
  43,
  35
], _t = [
  62,
  54,
  46,
  38,
  30,
  22,
  14,
  6,
  61,
  53,
  45,
  37,
  29,
  21,
  13,
  5,
  60,
  52,
  44,
  36,
  28,
  20,
  12,
  4,
  27,
  19,
  11,
  3
], Y = [
  13,
  16,
  10,
  23,
  0,
  4,
  2,
  27,
  14,
  5,
  20,
  9,
  22,
  18,
  11,
  3,
  25,
  7,
  15,
  6,
  26,
  19,
  12,
  1,
  40,
  51,
  30,
  36,
  46,
  54,
  29,
  39,
  50,
  44,
  32,
  47,
  43,
  48,
  38,
  55,
  33,
  52,
  45,
  41,
  49,
  35,
  28,
  31
];
var I = /* @__PURE__ */ ((n) => (n[n.Encrypt = 0] = "Encrypt", n[n.Decrypt = 1] = "Decrypt", n))(I || {});
function Q(n, t) {
  let e = 0n, s = 1n << BigInt(t.length - 1);
  for (let r = 0; r < t.length; r++) {
    const i = t[r], o = i >> 5, c = i & 31, u = c >> 3, a = c & 7, f = o * 4 + 3 - u;
    n[f] >> 7 - a & 1 && (e |= s), s >>= 1n;
  }
  return e;
}
function Z(n, t) {
  const e = 0xfffffff0n, s = n & e;
  return (s << BigInt(t) | s >> BigInt(28 - t)) & e;
}
function A(n, t) {
  const e = new Int32Array(32), s = Q(n, kt), r = Q(n, _t);
  let i = s << 4n, o = r << 4n;
  for (let c = 0; c < 16; c++) {
    const u = Mt[c];
    i = Z(i, u), o = Z(o, u);
    const a = t === 1 ? 15 - c : c;
    let f = 0n;
    for (let y = 0; y < Y.length; y++) {
      const b = Y[y];
      (b < 28 ? i >> BigInt(31 - b) & 1n : o >> BigInt(31 - (b - 27)) & 1n) === 1n && (f |= 1n << BigInt(47 - y));
    }
    const l = Number(f >> 40n & 0xffn), d = Number(f >> 32n & 0xffn), m = Number(f >> 24n & 0xffn), T = l << 16 | d << 8 | m, p = Number(f >> 16n & 0xffn), g = Number(f >> 8n & 0xffn), w = Number(f & 0xffn), L = p << 16 | g << 8 | w;
    e[a * 2] = T, e[a * 2 + 1] = L;
  }
  return e;
}
const vt = [
  34,
  42,
  50,
  58,
  2,
  10,
  18,
  26,
  36,
  44,
  52,
  60,
  4,
  12,
  20,
  28,
  38,
  46,
  54,
  62,
  6,
  14,
  22,
  30,
  40,
  48,
  56,
  64,
  8,
  16,
  24,
  32,
  33,
  41,
  49,
  57,
  1,
  9,
  17,
  25,
  35,
  43,
  51,
  59,
  3,
  11,
  19,
  27,
  37,
  45,
  53,
  61,
  5,
  13,
  21,
  29,
  39,
  47,
  55,
  63,
  7,
  15,
  23,
  31
], Nt = [
  37,
  5,
  45,
  13,
  53,
  21,
  61,
  29,
  38,
  6,
  46,
  14,
  54,
  22,
  62,
  30,
  39,
  7,
  47,
  15,
  55,
  23,
  63,
  31,
  40,
  8,
  48,
  16,
  56,
  24,
  64,
  32,
  33,
  1,
  41,
  9,
  49,
  17,
  57,
  25,
  34,
  2,
  42,
  10,
  50,
  18,
  58,
  26,
  35,
  3,
  43,
  11,
  51,
  19,
  59,
  27,
  36,
  4,
  44,
  12,
  52,
  20,
  60,
  28
], st = new Int32Array(2048), ot = new Int32Array(2048), z = new Int32Array(2048), j = new Int32Array(2048);
function Dt() {
  const n = (t, e) => {
    let s = 0n;
    for (let r = 0; r < 64; r++) {
      const i = e[r];
      t >> BigInt(64 - i) & 1n && (s |= 1n << BigInt(63 - r));
    }
    return s;
  };
  for (let t = 0; t < 8; t++)
    for (let e = 0; e < 256; e++) {
      const s = BigInt(e) << BigInt(56 - t * 8), r = n(s, vt), i = t << 8 | e;
      st[i] = Number(r >> 32n & 0xffffffffn), ot[i] = Number(r & 0xffffffffn);
    }
  for (let t = 0; t < 8; t++)
    for (let e = 0; e < 256; e++) {
      const s = BigInt(e) << BigInt(56 - t * 8), r = n(s, Nt), i = t << 8 | e;
      z[i] = Number(r >> 32n & 0xffffffffn), j[i] = Number(r & 0xffffffffn);
    }
}
Dt();
function Gt(n) {
  return n & 32 | (n & 31) >> 1 | (n & 1) << 4;
}
function Pt(n) {
  let t = 0;
  for (let e = 0; e < 32; e++) {
    const s = At[e], r = 1 << 31 - e, i = 1 << 32 - s;
    n & i && (t |= r);
  }
  return t;
}
const B = new Int32Array(512);
function Rt() {
  for (let n = 0; n < 8; n++)
    for (let t = 0; t < 64; t++) {
      const e = Gt(t), r = $t[n][e] << 28 - n * 4;
      B[n << 6 | t] = Pt(r);
    }
}
Rt();
const _ = new Int32Array(1024), v = new Int32Array(1024);
function Wt() {
  for (let n = 0; n < 4; n++) {
    const t = (3 - n) * 8;
    for (let e = 0; e < 256; e++) {
      let s = 0, r = 0;
      const i = e << t;
      for (let c = 0; c < 24; c++) {
        const u = K[c];
        i >>> 32 - u & 1 && (s |= 1 << 23 - c);
      }
      for (let c = 24; c < 48; c++) {
        const u = K[c];
        i >>> 32 - u & 1 && (r |= 1 << 47 - c);
      }
      const o = n << 8 | e;
      _[o] = s, v[o] = r;
    }
  }
}
Wt();
function J(n, t, e) {
  const s = n >>> 24 & 255, r = n >>> 16 & 255, i = n >>> 8 & 255, o = n & 255, c = _[s] | _[256 | r] | _[512 | i] | _[768 | o], u = v[s] | v[256 | r] | v[512 | i] | v[768 | o], a = c ^ t, f = u ^ e;
  return B[a >>> 18 & 63] | B[64 | a >>> 12 & 63] | B[128 | a >>> 6 & 63] | B[192 | a & 63] | B[256 | f >>> 18 & 63] | B[320 | f >>> 12 & 63] | B[384 | f >>> 6 & 63] | B[448 | f & 63];
}
function M(n, t, e) {
  let s = 0, r = 0;
  for (let c = 0; c < 8; c++) {
    const u = c << 8 | n[c];
    s |= st[u], r |= ot[u];
  }
  for (let c = 0; c < 15; c++) {
    const u = r;
    r = (s ^ J(r, e[c * 2], e[c * 2 + 1])) >>> 0, s = u;
  }
  s = (s ^ J(r, e[30], e[31])) >>> 0;
  let i = 0, o = 0;
  for (let c = 0; c < 4; c++) {
    const u = c << 8 | s >>> 24 - c * 8 & 255;
    i |= z[u], o |= j[u];
    const a = c + 4 << 8 | r >>> 24 - c * 8 & 255;
    i |= z[a], o |= j[a];
  }
  t[0] = i >>> 24 & 255, t[1] = i >>> 16 & 255, t[2] = i >>> 8 & 255, t[3] = i & 255, t[4] = o >>> 24 & 255, t[5] = o >>> 16 & 255, t[6] = o >>> 8 & 255, t[7] = o & 255;
}
function Ot(n) {
  if (typeof Buffer < "u")
    return Buffer.from(n, "hex");
  if (n.length % 2 !== 0)
    throw new Error("无效的十六进制字符串: 长度必须是偶数");
  const t = new Uint8Array(n.length / 2);
  for (let e = 0; e < n.length; e += 2)
    t[e / 2] = parseInt(n.substring(e, e + 2), 16);
  return t;
}
function Ct(n) {
  return typeof Buffer < "u" ? Buffer.from(n).toString("hex") : Array.from(n).map((t) => t.toString(16).padStart(2, "0")).join("");
}
const S = 8;
class zt {
  constructor() {
    E(this, "encryptSchedule");
    E(this, "decryptSchedule");
    this.decryptSchedule = [
      A(H, I.Decrypt),
      A(q, I.Encrypt),
      A(U, I.Decrypt)
    ], this.encryptSchedule = [
      A(U, I.Encrypt),
      A(q, I.Decrypt),
      A(H, I.Encrypt)
    ];
  }
  /**
   * 解密一个8字节的数据块。
   */
  decryptBlock(t, e) {
    const s = new Uint8Array(8), r = new Uint8Array(8);
    M(t, s, this.decryptSchedule[0]), M(s, r, this.decryptSchedule[1]), M(r, e, this.decryptSchedule[2]);
  }
  /**
   * 加密一个8字节的数据块。
   */
  encryptBlock(t, e) {
    const s = new Uint8Array(8), r = new Uint8Array(8);
    M(t, s, this.encryptSchedule[0]), M(s, r, this.encryptSchedule[1]), M(r, e, this.encryptSchedule[2]);
  }
}
const ct = new zt();
function jt(n, t) {
  const e = (t - n.length % t) % t;
  if (e === 0)
    return n;
  const s = new Uint8Array(n.length + e);
  return s.set(n, 0), s;
}
function Vt(n) {
  const t = mt(n);
  return t.length >= 3 && t[0] === 239 && t[1] === 187 && t[2] === 191 ? t.slice(3) : t;
}
function gn(n) {
  const t = Ot(n);
  if (t.length % S !== 0)
    throw new Error(`加密数据长度不是${S}的倍数`);
  const e = new Uint8Array(t.length);
  for (let r = 0; r < t.length; r += S) {
    const i = t.subarray(r, r + S), o = e.subarray(r, r + S);
    ct.decryptBlock(i, o);
  }
  const s = Vt(e);
  return new TextDecoder("utf-8").decode(s);
}
function yn(n) {
  const t = new TextEncoder().encode(n), e = dt(t), s = jt(e, S), r = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i += S) {
    const o = s.subarray(i, i + S), c = r.subarray(i, i + S);
    ct.encryptBlock(o, c);
  }
  return Ct(r);
}
function Xt(n) {
  return (n < 0 || n > 8) && (n = 0), {
    isDuet: n % 3 === 0 ? void 0 : n % 3 === 2,
    isBG: n <= 2 ? void 0 : n >= 6
  };
}
function Ft(n) {
  var i, o;
  const t = n.split(/\r?\n/).map((c) => c.trim()).filter((c) => c.length > 0), e = [], s = /^\[(\d+)\]/, r = /(.*?)\((\d+)\s*,\s*(\d+)\)/g;
  for (const c of t) {
    const u = c.match(s);
    if (!u)
      continue;
    const [, a] = u, f = c.slice(u[0].length), l = [], d = Xt(Number(a));
    for (const p of f.matchAll(r)) {
      const [, g, w, L] = p, y = Number(w), b = Number(L), k = y + b, W = g;
      l.push(x({ word: W, startTime: y, endTime: k }));
    }
    const m = ((i = l[0]) == null ? void 0 : i.startTime) ?? 0, T = ((o = l[l.length - 1]) == null ? void 0 : o.endTime) ?? 0;
    l.length && (d.isBG === void 0 && (d.isBG = l.length > 0 && /^[(（]/.test(l[0].word) && /[）)]$/.test(l[l.length - 1].word)), d.isBG && l.length && (l[0].word = l[0].word.replace(/^[(（]/, ""), l[l.length - 1].word = l[l.length - 1].word.replace(
      /[）)]$/,
      ""
    )), e.push(
      $({
        startTime: m,
        endTime: T,
        isDuet: !!d.isDuet,
        isBG: d.isBG,
        words: l
      })
    ));
  }
  return e;
}
function Ut(n) {
  let t = 0;
  return t += n.isDuet ? 2 : 1, t += n.isBG ? 6 : 3, t;
}
function qt(n) {
  return n.map((t) => {
    const e = Ut(t), s = [];
    t.words.forEach((i) => {
      i.word.trim() || !s.length ? s.push({
        word: i.word,
        startTime: h(i.startTime),
        duration: D(
          h(i.endTime) - h(i.startTime)
        )
      }) : s[s.length - 1].word += i.word;
    });
    const r = s.map((i) => `${i.word}(${i.startTime},${i.duration})`).join("");
    return `[${e}]${r}`;
  }).join(`
`);
}
function tt(n, t, e, s) {
  var u;
  const r = t.findIndex((a) => n === "translatedLyric" ? a.type === "translation" : a.type === "romanization");
  if (r === -1)
    return;
  const i = /^\[((?:\d+:)*\d+(?:\.\d+)?)\](.*)$/, o = e.slice(
    t[r].index + 1,
    t[r + 1].index
  ).map((a) => a.trim()).filter((a) => a.length > 0).map((a) => {
    const f = a.match(i);
    if (!f)
      return null;
    const [, l, d] = f, m = pt(l);
    return Number.isNaN(m) ? null : { time: m, text: d };
  }).filter((a) => a !== null);
  let c = 0;
  for (const a of s)
    ((u = o[c]) == null ? void 0 : u.time) === a.startTime && (a[n] = o[c].text, c++);
}
function xn(n) {
  const t = n.split(/\r?\n/).map((c) => c.trim()).filter((c) => c.length > 0), e = /^\[([a-zA-Z]+):.+\]$/, s = [];
  t.forEach((c, u) => {
    const a = c.match(e);
    if (!a)
      return;
    const [, f] = a;
    f === "lyrics" ? s.push({ index: u, type: "lyric" }) : f === "translation" ? s.push({ index: u, type: "translation" }) : f === "pronunciation" ? s.push({ index: u, type: "romanization" }) : s.push({ index: u, type: "unknown" });
  }), s.push({ index: t.length, type: "unknown" });
  const r = s.findIndex(
    (c) => c.type === "lyric"
  );
  if (r === -1)
    return [];
  const i = t.slice(
    s[r].index + 1,
    s[r + 1].index
  ), o = Ft(i.join(`
`));
  return tt("translatedLyric", s, t, o), tt("romanLyric", s, t, o), o;
}
function nt(n, t) {
  const e = t === "translatedLyric" ? "[translation: format@LRC]" : "[pronunciation: format@LRC, language@romaji]", s = n.map((r) => {
    const i = r[t];
    return i ? `[${rt(r.startTime)}]${i}` : null;
  }).filter((r) => r !== null);
  return s.length === 0 ? null : [e, ...s].join(`
`);
}
function wn(n) {
  const t = `[Lyricify Quick Export]
[version:1.0]`, e = `[lyrics: format@Lyricify Syllable]
${qt(n)}`, s = nt(n, "translatedLyric"), r = nt(n, "romanLyric"), i = [e, s, r].filter((o) => o !== null).join(`


`);
  return [t, i].join(`

`);
}
function Ht(n) {
  return {
    ...n,
    startTime: h(n.startTime),
    endTime: h(n.endTime),
    words: n.words.map((t) => ({
      ...t,
      startTime: h(t.startTime),
      endTime: h(t.endTime)
    }))
  };
}
function N(n) {
  return n.map((t) => t.word).join("");
}
function Kt(n) {
  return N(n.words).trim() !== "";
}
function V(n, t) {
  return n.length === 0 ? !1 : n.length > 1 ? !0 : n[0].startTime !== t;
}
const Yt = /^[(（]/, Qt = /[）)]$/;
function Zt(n) {
  return n.length > 2 && Yt.test(n) && Qt.test(n);
}
function Jt(n) {
  if (n.length === 0)
    return;
  n[0].word = n[0].word.slice(1);
  const t = n[n.length - 1];
  t.word = t.word.slice(0, -1);
}
const tn = /^\[\s*(?<key>[a-zA-Z]+)\s*:\s*(?<value>.*?)\s*\]$/;
function nn(n) {
  const t = n.match(tn);
  if (!(t != null && t.groups))
    return null;
  const e = t.groups.key.toLowerCase(), s = t.groups.value.trim();
  return s ? [[e, [s]]] : null;
}
function en(n, t) {
  for (const [e, s] of t) {
    const r = n.find(([i]) => i === e);
    if (!r) {
      n.push([e, [...s]]);
      continue;
    }
    for (const i of s)
      r[1].includes(i) || r[1].push(i);
  }
}
function rn(n) {
  const t = [];
  for (const [e, s] of n) {
    const r = s.filter((i) => i.trim() !== "");
    !e.trim() || r.length === 0 || t.push(`[${e}:${r.join("/")}]`);
  }
  return t;
}
const at = {
  plain: { wordLevel: !1, inlineAuxiliary: !0 },
  enhanced: { wordLevel: !0, inlineAuxiliary: !1 },
  spl: { wordLevel: !0, inlineAuxiliary: !1 }
};
function C(n) {
  return {
    enabled: (n == null ? void 0 : n.enabled) ?? !0,
    inline: (n == null ? void 0 : n.inline) ?? !1
  };
}
class sn {
  constructor(t) {
    E(this, "options");
    E(this, "features");
    var e, s, r, i, o, c;
    this.options = {
      mode: (t == null ? void 0 : t.mode) ?? "plain",
      inlineBracket: (t == null ? void 0 : t.inlineBracket) ?? "angle",
      auxiliaryLines: {
        order: ((e = t == null ? void 0 : t.auxiliaryLines) == null ? void 0 : e.order) ?? "translation-first",
        translation: C(
          (s = t == null ? void 0 : t.auxiliaryLines) == null ? void 0 : s.translation
        ),
        romanization: C(
          (r = t == null ? void 0 : t.auxiliaryLines) == null ? void 0 : r.romanization
        ),
        backgroundVocal: C(
          (i = t == null ? void 0 : t.auxiliaryLines) == null ? void 0 : i.backgroundVocal
        )
      },
      endTimestamp: {
        mode: ((o = t == null ? void 0 : t.endTimestamp) == null ? void 0 : o.mode) ?? "none",
        intervalGap: ((c = t == null ? void 0 : t.endTimestamp) == null ? void 0 : c.intervalGap) ?? 5e3
      }
    }, this.features = at[this.options.mode];
  }
  /**
   * 行首时间戳是否改用首个音节的开始时间
   *
   * 生成方括号时间戳时，按常见实现省略行首时间戳，只在行首写入首个音节的开始时间，
   * 生成尖括号时则写入行时间戳
   */
  get usesFirstWordStartTime() {
    return this.options.inlineBracket === "square";
  }
  /**
   * 生成 LRC 家族歌词
   * @param input 歌词行，或带元数据的解析结果
   * @returns 歌词文本
   */
  generate(t) {
    const e = Array.isArray(t) ? [] : t.metadata, s = Array.isArray(t) ? t : t.lines, r = [], i = rn(e);
    i.length > 0 && r.push(...i);
    const o = s.map(Ht).filter(Kt), c = /* @__PURE__ */ new Set();
    for (const [u, a] of o.entries()) {
      if (a.isBG)
        continue;
      const f = o[u + 1], l = f != null && f.isBG ? f : void 0;
      l && c.add(l);
    }
    for (const [u, a] of o.entries()) {
      if (c.has(a))
        continue;
      const f = o[u + 1], l = !a.isBG && (f != null && f.isBG) ? f : void 0;
      let d;
      for (let m = u + 1; m < o.length; m++)
        if (!o[m].isBG) {
          d = o[m];
          break;
        }
      this.processSingleLine(a, l, d, r);
    }
    return r.join(`
`);
  }
  processSingleLine(t, e, s, r) {
    const { auxiliaryLines: i } = this.options, { inlineAuxiliary: o } = this.features, c = o && i.translation.inline, u = o && !c && i.romanization.inline, a = o && !c && !u && i.backgroundVocal.inline, f = this.formatTimeTag(t.startTime, "square");
    let l = i.translation.enabled ? t.translatedLyric : "", d = i.romanization.enabled ? t.romanLyric : "", m = i.backgroundVocal.enabled ? e : void 0, T = N(t.words);
    if (o) {
      const g = (w) => {
        T += `${T ? " " : ""}(${w})`;
      };
      c && l ? (g(l), l = "") : u && d ? (g(d), d = "") : a && m && (T += `${T ? " " : ""}(${N(m.words)})`, i.translation.enabled && m.translatedLyric && (l = l ? `${l} (${m.translatedLyric})` : `(${m.translatedLyric})`), i.romanization.enabled && m.romanLyric && (d = d ? `${d} (${m.romanLyric})` : `(${m.romanLyric})`), m = void 0);
    }
    r.push(this.renderBaseItem(t, T, t.isBG)), m && r.push(
      this.renderBaseItem(m, N(m.words), !0)
    );
    const p = i.order === "translation-first" ? [l, d] : [d, l];
    for (const g of p)
      g && r.push(`${f}${g}`);
    this.processEndTimestamp(t, s, r);
  }
  /**
   * 渲染一行歌词，`lineText` 是已经处理过内联的整行文本
   */
  renderBaseItem(t, e, s) {
    const { inlineBracket: r } = this.options, { wordLevel: i } = this.features;
    if (i && V(t.words, t.startTime)) {
      const a = t.words, f = this.usesFirstWordStartTime ? a[0].startTime : t.startTime;
      let l = this.formatTimeTag(f, "square");
      for (let d = 0; d < a.length; d++) {
        const m = a[d];
        (d > 0 || !this.usesFirstWordStartTime) && (l += this.formatTimeTag(m.startTime, r));
        let T = m.word;
        s && (d === 0 && (T = `(${T}`), d === a.length - 1 && (T = `${T})`)), l += T, d === a.length - 1 && (l += this.formatTimeTag(m.endTime, r));
      }
      return l;
    }
    const o = this.formatTimeTag(t.startTime, "square"), c = s ? `(${e})` : e;
    let u = `${o}${c}`;
    return i && (u += this.formatTimeTag(t.endTime, "square")), u;
  }
  processEndTimestamp(t, e, s) {
    const { mode: r, intervalGap: i } = this.options.endTimestamp;
    if (this.features.wordLevel || r === "none")
      return;
    const o = e ? e.startTime - t.endTime : 1 / 0;
    (r === "always" || r === "interval" && o >= i) && s.push(this.formatTimeTag(t.endTime, "square"));
  }
  /**
   * 将毫秒渲染为时间戳
   *
   * 传入的时间都已由 {@link normalizeLine} 归一化过，这里再钳制到时间戳可表示的最大值，
   * 保证写出来的时间戳都能被解析回来
   */
  formatTimeTag(t, e = "square") {
    const s = rt(gt(t));
    return e === "angle" ? `<${s}>` : `[${s}]`;
  }
}
const on = ["#", "//"], G = class G {
  constructor(t) {
    E(this, "mode");
    this.mode = (t == null ? void 0 : t.mode) ?? "spl";
  }
  /**
   * 解析 LRC 家族歌词
   * @param text 歌词文本
   * @returns 解析结果
   */
  parse(t) {
    const e = [], s = [], r = {
      lastMainLines: [],
      mainLinesByStartTime: /* @__PURE__ */ new Map(),
      translations: /* @__PURE__ */ new Map()
    };
    for (const i of t.split(/\r?\n/)) {
      const o = i.trim();
      if (!o || on.some((l) => o.startsWith(l)))
        continue;
      const c = nn(o);
      if (c) {
        en(e, c);
        continue;
      }
      const u = this.tokenizeLine(o);
      if (u.every((l) => l.type === "text")) {
        this.appendTranslation(o, [], r);
        continue;
      }
      const a = this.getLineFeatures(u);
      if (a.text.trim() === "") {
        this.appendExplicitEndTime(u, r.lastMainLines);
        continue;
      }
      const f = a.isWordSync ? this.parseWordSyncLine(u, a, r) : this.parsePlainLines(u, a, r);
      if (f.length > 0) {
        this.applyBackgroundVocal(f, a.isBG), s.push(...f), r.lastMainLines = f;
        for (const l of f)
          r.mainLinesByStartTime.has(l.startTime) || r.mainLinesByStartTime.set(l.startTime, l);
      }
    }
    return {
      metadata: e,
      lines: this.expandTranslations(
        this.finalizeLyricLines(s),
        r.translations
      )
    };
  }
  /**
   * 语法分析器
   */
  tokenizeLine(t) {
    const e = [];
    let s = 0;
    for (const i of t.matchAll(G.WORD_TIMESTAMP_REGEX)) {
      if (!i.groups)
        continue;
      const o = i.index ?? 0, c = t.substring(s, o);
      c && e.push({ type: "text", val: c });
      const u = et(
        i.groups.min,
        i.groups.sec,
        i.groups.ms
      );
      e.push({ type: "time", val: u }), s = o + i[0].length;
    }
    const r = t.substring(s);
    return r && e.push({ type: "text", val: r }), e;
  }
  getLineFeatures(t) {
    const e = t.findIndex((i) => i.type === "text");
    let s = !1;
    if (e > 0) {
      for (let i = e + 1; i < t.length; i++)
        if (t[i].type === "time") {
          s = !0;
          break;
        }
    }
    const r = t.filter((i) => i.type === "text").map((i) => i.val).join("");
    return {
      firstTextIndex: e,
      isWordSync: s,
      isBG: Zt(r),
      text: r
    };
  }
  /**
   * 把整行被圆括号包裹的歌词行标记为背景人声，并去掉最外层的括号
   *
   * 与 YRC、QRC 的做法一致，只按整行是否被括号包裹判断。
   * 多个背景人声行各自独立处理，不做归并或配对
   * @param lines 已解析出来的歌词行
   * @param isBG 该行是否为背景人声行
   */
  applyBackgroundVocal(t, e) {
    if (e)
      for (const s of t)
        s.isBG = !0, Jt(s.words);
  }
  /**
   * 尝试将一段文本记录为已出现过的某（组）歌词行的翻译
   *
   * 时间信息必须一致才会认为是翻译，否则视为独立的歌词行
   * @returns 是否成功记录为翻译
   */
  appendTranslation(t, e, s) {
    if (t.trim() === "")
      return !1;
    const r = e.length === 0 ? s.lastMainLines : this.matchLinesByTime(e, s.mainLinesByStartTime);
    if (!r || r.length === 0)
      return !1;
    for (const i of r) {
      const o = s.translations.get(i);
      o ? o.push(t) : s.translations.set(i, [t]);
    }
    return !0;
  }
  /**
   * 按时间戳找出与之对应的歌词行
   *
   * 翻译行可以不紧挨着主歌词行，所以在全部已出现的主歌词行里按开始时间查找。
   * 重复行写法的翻译需要每个时间戳都能找到宿主，只要有一个落空就不算翻译
   * @returns 对应的歌词行，时间信息不一致时为 `null`
   */
  matchLinesByTime(t, e) {
    const s = [];
    for (const r of t) {
      const i = e.get(r);
      if (!i)
        return null;
      s.push(i);
    }
    return s;
  }
  /**
   * 将一行只有时间戳的歌词行作为上一（组）歌词行的显式结束时间
   *
   * 与行内写法 `文本[结束时间]` 一致，取该行最后一个时间戳作为结束时间。
   * 上一（组）歌词行不存在、已经有结束时间，或该时间戳不晚于其开始时间时，整行被忽略
   *
   * 重复行写法（`[t1][t2]文本`）会产生多条内容相同的歌词行，
   * 此时这个结束时间应该归属哪一条存在语义模糊：
   * 给最早的一条会让组内各行的结束时间不一致，给所有行又会造成时间区间相互重叠，
   * 格式本身没有说明哪种解读正确。这里选择只标记最后一条（即时间上最近一次出现）的行，
   * 组内其余行仍交给后续的推导逻辑决定结束时间
   */
  appendExplicitEndTime(t, e) {
    let s;
    for (let o = t.length - 1; o >= 0; o--) {
      const c = t[o];
      if (c.type === "time") {
        s = c;
        break;
      }
    }
    const r = e[e.length - 1];
    if (!s || !r)
      return;
    const i = s.val;
    r.endTime !== -1 || i <= r.startTime || (r.endTime = i);
  }
  parsePlainLines(t, e, s) {
    const r = [], i = e.firstTextIndex !== -1 ? e.firstTextIndex : t.length;
    for (let o = 0; o < i; o++) {
      const c = t[o];
      c.type === "time" && !r.includes(c.val) && r.push(c.val);
    }
    return !e.isBG && this.appendTranslation(e.text, r, s) ? [] : r.map(
      (o) => $({
        startTime: o,
        endTime: -1,
        words: [
          x({ word: e.text, startTime: o, endTime: -1 })
        ]
      })
    );
  }
  parseWordSyncLine(t, e, s) {
    const r = t[0], i = t[e.firstTextIndex - 1];
    if ((r == null ? void 0 : r.type) !== "time" || (i == null ? void 0 : i.type) !== "time")
      return [];
    const o = r.val;
    if (!e.isBG && this.appendTranslation(e.text, [o], s))
      return [];
    const c = i.val;
    let u;
    const a = [];
    let f = "", l = c;
    const d = (m, T, p) => {
      a.push(
        x({ word: m, startTime: T, endTime: p })
      );
    };
    for (let m = e.firstTextIndex; m < t.length; m++) {
      const T = t[m];
      if (T.type === "text")
        f += T.val;
      else if (T.type === "time") {
        const p = T.val;
        f !== "" && (d(f, l, p), f = ""), l = p, m === t.length - 1 && (u = p);
      }
    }
    return f !== "" && d(
      f,
      l,
      -1
      // 下面处理隐式时间戳的时候处理
    ), [
      $({
        startTime: o,
        endTime: u ?? -1,
        words: V(a, o) ? a : [
          x({
            word: e.text,
            startTime: o,
            endTime: -1
          })
        ]
      })
    ];
  }
  finalizeLyricLines(t) {
    return t.sort((e, s) => e.startTime - s.startTime), this.resolveEndTimes(t), at[this.mode].wordLevel || this.stripWordTimings(t), t;
  }
  /**
   * 决定所有尚未推导的时间，逐行歌词取下一行的开始时间，逐字歌词还会收尾最后一个音节
   */
  resolveEndTimes(t) {
    for (let e = 0; e < t.length; e++) {
      const s = t[e], r = e === t.length - 1;
      s.endTime === -1 && (r && !V(s.words, s.startTime) ? s.endTime = it : r || (s.endTime = t[e + 1].startTime));
      const i = s.words;
      if (i.length > 0)
        for (let o = 0; o < i.length; o++) {
          const c = i[o];
          c.endTime === -1 && (o + 1 < i.length ? c.endTime = i[o + 1].startTime : r && s.endTime === -1 ? (c.endTime = c.startTime + 1e3, s.endTime = c.endTime) : c.endTime = s.endTime);
        }
    }
  }
  /**
   * 普通 LRC 模式丢弃逐字时间戳，只留下覆盖整行的单个音节
   */
  stripWordTimings(t) {
    for (const e of t)
      e.words.length <= 1 || (e.words = [
        x({
          word: N(e.words),
          startTime: e.startTime,
          endTime: e.endTime
        })
      ]);
  }
  /**
   * 将翻译展开成与主歌词行同时开始、同时结束的独立歌词行
   */
  expandTranslations(t, e) {
    if (e.size === 0)
      return t;
    const s = [];
    for (const r of t) {
      s.push(r);
      for (const i of e.get(r) ?? [])
        s.push(
          $({
            startTime: r.startTime,
            endTime: r.endTime,
            words: [
              x({
                word: i,
                startTime: r.startTime,
                endTime: r.endTime
              })
            ]
          })
        );
    }
    return s;
  }
};
/**
 * 匹配行内所有的逐字时间戳
 *
 * 例如 `<05:21.22>` 或 `[05:23.22]`，`[00:13]` 这样省略毫秒段的写法同样算数，省略时视作 `0`。
 * 秒与毫秒之间本应使用半角句号，这里也接受半角冒号，以兼容不规范的既有歌词文件
 */
E(G, "WORD_TIMESTAMP_REGEX", /(?:\[|<)(?<min>\d{1,3}):(?<sec>\d{1,2})(?:[:.](?<ms>\d{1,6}))?(?:\]|>)/g);
let X = G;
function P(n, t) {
  return new X(t).parse(n);
}
function R(n, t) {
  return new sn(t).generate(n);
}
function Ln(n) {
  return P(n).lines;
}
function Bn(n) {
  return P(n).lines;
}
function Sn(n) {
  return P(n).lines;
}
function bn(n) {
  return P(n).lines;
}
function En(n) {
  return R(n, { mode: "plain" });
}
function In(n) {
  return R(n, { mode: "spl", inlineBracket: "square" });
}
function cn(n) {
  return R(n, { mode: "spl", inlineBracket: "angle" });
}
function $n(n) {
  return R(n, { mode: "spl", inlineBracket: "angle" });
}
function An(n) {
  const t = n.split(/\r?\n/).map((i) => i.trim()).filter((i) => i.length > 0), e = [], s = /^\[(\d+),(\d+)\](.*)$/, r = /^[(（](.+)[)）]$/;
  for (const i of t) {
    if (i === "[type:LyricifyLines]")
      continue;
    const o = i.match(s);
    if (!o)
      continue;
    const [, c, u, a] = o, f = Number(c), l = Number(u), d = a.match(r), m = !!d, T = (d ? d[1] : a).trim();
    T && e.push(
      $({
        startTime: f,
        endTime: l,
        isBG: m,
        words: [x({ word: T, startTime: f, endTime: l })]
      })
    );
  }
  return e;
}
function Mn(n) {
  const t = "[type:LyricifyLines]", e = n.map((s) => {
    const r = s.words.map((o) => o.word).join(""), i = s.isBG ? `(${r})` : r;
    return `[${h(s.startTime)},${h(s.endTime)}]${i}`;
  });
  return [t, ...e].join(`
`);
}
function kn(n) {
  const t = /(.*?)\((\d+)\s*,\s*(\d+)\)/g, e = /^\[(\d+)\s*,\s*(\d+)\]/;
  return n.split(/\r?\n/).map((r) => r.trim()).filter((r) => r.length > 0).map((r) => {
    const i = r.match(e);
    if (!i)
      return null;
    const [o, c, u] = i, a = Number(c), f = Number(u), l = [], d = r.slice(o.length).trim();
    if (!d)
      return null;
    for (const T of d.matchAll(t)) {
      const [, p, g, w] = T, L = Number(g), y = Number(w);
      l.push(
        x({
          word: p,
          startTime: L,
          endTime: L + y
        })
      );
    }
    const m = l.length > 0 && /^[(（]/.test(l[0].word) && /[）)]$/.test(l[l.length - 1].word);
    return m && (l[0].word = l[0].word.replace(/^[(（]/, ""), l[l.length - 1].word = l[l.length - 1].word.replace(
      /[）)]$/,
      ""
    )), $({
      startTime: a,
      endTime: a + f,
      words: l,
      isBG: m
    });
  }).filter((r) => r !== null);
}
function _n(n) {
  return n.map((t) => {
    const e = h(t.startTime), s = h(t.endTime), r = D(s - e), i = [];
    for (const [
      o,
      { word: c, startTime: u, endTime: a }
    ] of t.words.entries()) {
      if (!c.trim() && i.length) {
        i[i.length - 1] += c;
        continue;
      }
      let f = c;
      t.isBG && (o === 0 && (f = `（${f}`), o === t.words.length - 1 && (f += "）"));
      const l = h(u), d = h(a), m = D(
        d - l
      );
      i.push(
        `${f}(${l},${m})`
      );
    }
    return `[${e},${r}]${i.join("")}`;
  }).join(`
`);
}
function vn(n) {
  return Tt(n);
}
function Nn(n) {
  return ht(n);
}
const an = /^[（(]/, ln = /[）)]$/;
function fn(n) {
  return n.length > 0 && an.test(n[0].word) && ln.test(n[n.length - 1].word);
}
function un(n) {
  n[0].word = n[0].word.slice(1), n[n.length - 1].word = n[n.length - 1].word.slice(0, -1);
}
function Dn(n) {
  const t = /^(.*?)\((\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+))?\)/, e = /^\[(\d+)\s*,\s*(\d+)\]/;
  return n.split(/\r?\n/).map((r) => r.trim()).filter((r) => r.length > 0).map((r) => {
    const i = r.match(e);
    if (!i)
      return null;
    const [o, c, u] = i, a = Number(c), f = Number(u), l = [];
    let d = r.slice(o.length).trim();
    if (!d)
      return null;
    let m = -1, T = -1;
    for (; ; ) {
      const g = d.match(t);
      if (!g)
        break;
      const [w, L, y, b] = g;
      L && l.push(
        x({
          word: L,
          startTime: m !== -1 ? m : a,
          endTime: T !== -1 ? T : Number(y)
        })
      );
      const k = Number(y), W = Number(b), lt = k + W;
      [m, T] = [k, lt], d = d.slice(w.length);
    }
    m !== -1 && d && l.push(
      x({
        word: d,
        startTime: m,
        endTime: T
      })
    ), l.length === 0 && d && l.push(
      x({
        word: d,
        startTime: a,
        endTime: a + f
      })
    );
    const p = fn(l);
    return p && un(l), $({
      startTime: a,
      endTime: a + f,
      words: l,
      isBG: p
    });
  }).filter((r) => r !== null);
}
function dn(n) {
  return n.replace(/\(/g, "（").replace(/\)/g, "）");
}
function Gn(n) {
  return n.map((t) => {
    const e = h(t.startTime), s = h(t.endTime), r = D(s - e), i = [];
    for (const [
      o,
      { word: c, startTime: u, endTime: a }
    ] of t.words.entries()) {
      if (!c.trim() && i.length) {
        i[i.length - 1] += c;
        continue;
      }
      let f = dn(c);
      t.isBG && (o === 0 && (f = `（${f}`), o === t.words.length - 1 && (f += "）"));
      const l = h(u), d = h(a), m = D(
        d - l
      );
      i.push(
        `(${l},${m},0)${f}`
      );
    }
    return `[${e},${r}]${i.join("")}`;
  }).join(`
`);
}
function Pn(...n) {
  return cn(...n);
}
export {
  gn as decryptQrcHex,
  yn as encryptQrcHex,
  Bn as parseEslrc,
  xn as parseLqe,
  Ln as parseLrc,
  Sn as parseLrcA2,
  P as parseLrcLike,
  An as parseLyl,
  Ft as parseLys,
  kn as parseQrc,
  bn as parseSPL,
  vn as parseTTML,
  Dn as parseYrc,
  pn as stringifyAss,
  In as stringifyEslrc,
  wn as stringifyLqe,
  En as stringifyLrc,
  cn as stringifyLrcA2,
  R as stringifyLrcLike,
  Mn as stringifyLyl,
  qt as stringifyLys,
  _n as stringifyQrc,
  $n as stringifySPL,
  Nn as stringifyTTML,
  Gn as stringifyYrc,
  Pn as stringifylrcA2
};
