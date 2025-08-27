document.addEventListener('DOMContentLoaded', function () {

    //Active class switcher
    const mql = window.matchMedia('(min-width: 768px)');

    document.querySelectorAll('[data-toggle-group]').forEach(group => {
        group.addEventListener('mouseenter', (e) => {
            if (!mql.matches) return;

            let t = e.target;
            if (t && t.nodeType === 3) t = t.parentElement;
            if (!(t instanceof Element)) return;

            const btn = t.closest('[data-toggle-item]');
            if (!btn || !group.contains(btn)) return;

            const activeClass = group.dataset.activeClass || 'active';
            if (!btn.classList.contains(activeClass)) {
                group.querySelectorAll('[data-toggle-item]').forEach(el => el.classList.remove(activeClass));
                btn.classList.add(activeClass);
            }
        }, true);
    });
});