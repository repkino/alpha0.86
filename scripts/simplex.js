// Замена аддона Rex_Simplex
// Тикает каждый кадр и обновляет simValue у членов семьи "simplex",
// у которых включён флаг simplexRun.
//
// Параметры семьи:
//   increment  — частота (аналог SetIncreasement)
//   magnitude  — амплитуда (аналог SetMagnitude)
//   simValue   — результат шума, примерно [-magnitude, magnitude]
//   simplexRun — флаг включения для конкретного экземпляра

"use strict";

const P = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,
69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,
117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,
134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,
46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,
200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,
123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,
39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,
193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,
181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,
114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

const perm = new Uint8Array(256);
let seeded = false;

function initNoise(seed)
{
    let s = (seed === undefined || seed === null) ? 1 : seed;
    if (s > 0 && s < 1) s *= 65536;
    s = Math.floor(s);
    if (s < 256) s |= s << 8;
    for (let i = 0; i < 256; i++)
        perm[i] = (i & 1) ? (P[i] ^ (s & 255)) : (P[i] ^ ((s >> 8) & 255));
    seeded = true;
}

function noise1D(x)
{
    if (!seeded) initNoise(1);
    const i0 = Math.floor(x);
    const x0 = x - i0;
    const h = perm[i0 & 255];
    let g = 1 + (h & 7);
    if ((h & 8) !== 0) g = -g;
    const n0 = (function(t){ return t*t*t*t; })(1 - x0*x0) * (g * x0);
    const h1 = perm[(i0 + 1) & 255];
    let g1 = 1 + (h1 & 7);
    if ((h1 & 8) !== 0) g1 = -g1;
    const x1 = x0 - 1.0;
    const n1 = (function(t){ return t*t*t*t; })(1 - x1*x1) * (g1 * x1);
    return 0.395 * (n0 + n1);
}

function tickSimplex()
{
    try
    {
        const rt = globalThis.C3?.runtime;
        if (!rt) return;

        const fam = rt.objects.ByName("simplex");
        if (!fam) return;

        const t = rt.time;
        for (const inst of fam.instances())
        {
            const v = inst.instVars();
            if (!v.GetByName("simplexRun")) continue;
            const val = noise1D(t * v.GetByName("increment") + inst.uid) * v.GetByName("magnitude");
            v.SetByName("simValue", val);
        }
    }
    catch (e)
    {
        // молча глотаем, чтобы скрипт не «падал» из-за одной копии
    }
}

runOnStartup(async runtime =>
{
    console.log("[simplex] script loaded");
    runtime.addEventListener("tick", tickSimplex);
});
