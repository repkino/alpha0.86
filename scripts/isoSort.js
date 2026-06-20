// isoSort.js — Z-сортировка изометрии
// Интеграция: через event sheet → Browser → Execute JavaScript
const IsoSort = {
    _lastY: {},
    _sortedUids: [],
    tick() {
        // Обходим типы объектов в семье zSort
        const families = runtime.families;
        const fam = families.find(f => f.name === 'zSort');
        if (!fam) return;
        const dyn = [];
        for (const ot of fam.members) {
            const instances = runtime.objects[ot.name].instances();
            for (const o of instances) {
                if (!o.instVars.enable) continue;
                if (!o.instVars.dinamic) continue;
                dyn.push(o);
            }
        }
        if (dyn.length < 2) return;
        // Проверка: изменился ли Y
        let changed = false;
        for (const o of dyn) {
            const prev = this._lastY[o.uid];
            if (prev === undefined || Math.abs(o.y - prev) > 0.5) {
                this._lastY[o.uid] = o.y;
                changed = true;
            }
        }
        if (!changed) return;
        dyn.sort((a, b) => a.y - b.y);
        for (const o of dyn) {
            o.moveToTop();
        }
        this._sortedUids = dyn.map(o => o.uid);
    },
    refresh() {
        const families = runtime.families;
        const fam = families.find(f => f.name === 'zSort');
        if (!fam) return;
        const all = [];
        for (const ot of fam.members) {
            const instances = runtime.objects[ot.name].instances();
            for (const o of instances) {
                if (!o.instVars.enable) continue;
                all.push(o);
            }
        }
        if (all.length < 2) return;
        all.sort((a, b) => a.y - b.y);
        for (const o of all) {
            o.moveToTop();
        }
        this._lastY = {};
        for (const o of all) {
            this._lastY[o.uid] = o.y;
        }
        this._sortedUids = all.map(o => o.uid);
    },
};