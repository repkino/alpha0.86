// isoAng.js — финальная версия для Bioid (копируй целиком)

if (!globalThis.IsoCache) {
    // Создаём массив один раз за всю игру
    globalThis.IsoCache = new Float32Array(360);
    
    const f = 0.5;                    // твой коэффициент изометрии
    const toRad = Math.PI / 180;

    for (let a = 0; a < 360; a++) {
        const rad = a * toRad;
        // Math.hypot быстрее обычного sqrt
        const len = Math.hypot(f * Math.cos(rad), Math.sin(rad));
        globalThis.IsoCache[a] = len > 0 ? f / len : f;
    }
    
    console.log("[Bioid] IsoCache готов — 360 значений (0..359)");
}