document.addEventListener('DOMContentLoaded', () => {
    initLoadMoreResponsive({
        groupSelector: '.markers-section-list-group',
        listSelector:  '.markers-section-list',
        itemSelector:  '.markers-section-list-item',
        buttonSelector: '.load-more',
        defaultVisible: 2,
        stagger: 25,
        maxWidth: 1279
    });
});

function initLoadMoreResponsive(opts) {
    const mq = window.matchMedia(`(max-width: ${opts.maxWidth}px)`);
    const groups = Array.from(document.querySelectorAll(opts.groupSelector));
    const instances = new WeakMap();

    const mount = (group) => {
        if (instances.has(group)) return;
        const destroy = initLoadMoreGroup(group, opts);
        if (typeof destroy === 'function') instances.set(group, destroy);
    };

    const unmount = (group) => {
        const destroy = instances.get(group);
        if (destroy) {
            destroy();
            instances.delete(group);
        }
    };

    const apply = () => {
        if (mq.matches) groups.forEach(mount);
        else groups.forEach(unmount);
    };

    apply();
    if (mq.addEventListener) mq.addEventListener('change', apply);
    else mq.addListener(apply);
}

function initLoadMoreGroup(group, {
    listSelector, itemSelector, buttonSelector,
    defaultVisible = 2, stagger = 0
}) {
    const visible   = Number(group.dataset.visible) || defaultVisible;
    const list      = group.querySelector(listSelector);
    const items     = Array.from(group.querySelectorAll(itemSelector));
    const btn       = group.querySelector(buttonSelector);
    const moreText  = group.dataset.moreText || 'See more';
    const lessText  = group.dataset.lessText || 'See less';

    if (!list || !btn || items.length === 0) return;

    const rest = items.slice(visible);
    rest.forEach(item => {
        item.classList.add('is-hidden');
        item.setAttribute('aria-hidden', 'true');
        item.style.maxHeight = '0px';
    });

    btn.textContent = moreText;
    btn.setAttribute('aria-expanded', 'false');

    const onClick = () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';

        if (!expanded) {
            rest.forEach((item, i) => {
                setTimeout(() => {
                    item.style.maxHeight = item.scrollHeight + 'px';
                    item.classList.remove('is-hidden');
                    item.removeAttribute('aria-hidden');
                    item.addEventListener('transitionend', function onEnd(e) {
                        if (e.propertyName === 'max-height') {
                            item.style.maxHeight = '';
                            item.removeEventListener('transitionend', onEnd);
                        }
                    });
                }, i * stagger);
            });
            btn.setAttribute('aria-expanded', 'true');
            btn.textContent = lessText;
        } else {
            rest.slice().reverse().forEach((item, i) => {
                setTimeout(() => {
                    const h = item.scrollHeight;
                    item.style.maxHeight = h + 'px';
                    requestAnimationFrame(() => {
                        item.classList.add('is-hidden');
                        item.setAttribute('aria-hidden', 'true');
                        item.style.maxHeight = '0px';
                    });
                    item.addEventListener('transitionend', function onEnd(e) {
                        if (e.propertyName === 'max-height') {
                            item.style.maxHeight = '';
                            item.removeEventListener('transitionend', onEnd);
                        }
                    });
                }, i * stagger);
            });
            btn.setAttribute('aria-expanded', 'false');
            btn.textContent = moreText;
        }
    };

    btn.addEventListener('click', onClick);

    return function destroy() {
        btn.removeEventListener('click', onClick);
        items.forEach(item => {
            item.classList.remove('is-hidden');
            item.removeAttribute('aria-hidden');
            item.style.maxHeight = '';
        });
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = moreText;
    };
}