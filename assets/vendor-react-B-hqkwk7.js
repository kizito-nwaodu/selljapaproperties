import { p0 } from "./vr_parts/p0.js";
import { p1 } from "./vr_parts/p1.js";
import { p2 } from "./vr_parts/p2.js";
import { p3 } from "./vr_parts/p3.js";
import { p4 } from "./vr_parts/p4.js";
import { p5 } from "./vr_parts/p5.js";
import { p6 } from "./vr_parts/p6.js";
import { p7 } from "./vr_parts/p7.js";
import { p8 } from "./vr_parts/p8.js";
import { p9 } from "./vr_parts/p9.js";

const fullCode = p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
const blob = new Blob([fullCode], { type: "application/javascript" });
const url = URL.createObjectURL(blob);
const mod = await import(url);
URL.revokeObjectURL(url);

export const {
  $, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z,
  _, _t, a, at, b, c, ct, d, dt, et, f, ft, g, gt, h, ht, i, it, j, k, l, lt, m, mt,
  n, nt, o, ot, p, pt, q, r, rt, s, st, t, tt, u, ut, v, w, x, y, z
} = mod;
