document.addEventListener('DOMContentLoaded', function () {

    //Active class switcher
    const mql = window.matchMedia('(min-width: 1024px)');

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

    //Hero section scroll
    const section = document.querySelector('.hero-section');
    if (!section) return;

    const ACTIVE_CLASS = 'is-active';
    const mq = window.matchMedia('(min-width: 1024px)');

    const PAUSE_MS = 400;
    const RESET_THRESHOLD = 2;

    let enabled = false;
    let activated = false;
    let inView = false;
    let postActivateBlocking = false;
    let blockersOn = false;
    let pauseTimer = null;
    let lastScrollY = window.scrollY;
    let touchStartY = null;

    const isEditable = (el) => !!(el && (
        el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable || el.tagName === 'SELECT'
    ));
    const isWheelDown = (e) => (e?.deltaY ?? 0) > 0;
    const isTouchDown = (dy) => dy > 0;
    const isDownKey = (e) => {
        const k = e.code || e.key;
        if (k === 'Space' || k === ' ') return !e.shiftKey;
        return ['ArrowDown', 'PageDown', 'End'].includes(k);
    };
    const shouldBlock = () => enabled && inView && (!activated || postActivateBlocking);

    function setTouchBlock(block) {
        if (block) {
            section.style.touchAction = 'none';
            section.style.overscrollBehavior = 'contain';
        } else {
            section.style.touchAction = '';
            section.style.overscrollBehavior = '';
        }
    }

    function scheduleRelease() {
        clearTimeout(pauseTimer);
        pauseTimer = setTimeout(() => {
            postActivateBlocking = false;
            removeBlockers();
            setTouchBlock(false);
        }, PAUSE_MS);
    }

    function activate(e) {
        if (!enabled || activated || !inView) return;
        activated = true;
        section.classList.add(ACTIVE_CLASS);
        postActivateBlocking = true;
        if (e && e.cancelable) e.preventDefault();
        setTouchBlock(true);
        scheduleRelease();
    }

    function onWheel(e) {
        if (!enabled || !inView) return;
        if (!activated) {
            if (e.cancelable) e.preventDefault();
            if (isWheelDown(e)) activate(e);
            return;
        }
        if (postActivateBlocking) {
            if (e.cancelable) e.preventDefault();
            scheduleRelease();
        }
    }

    function onTouchStart(e) {
        if (!enabled || !inView) return;
        touchStartY = e.touches?.[0]?.clientY ?? null;
        if (shouldBlock() && e.cancelable) e.preventDefault();
    }

    function onTouchMove(e) {
        if (!enabled || !inView) return;
        if (touchStartY == null) return;
        const currentY = e.touches?.[0]?.clientY ?? touchStartY;
        const dy = touchStartY - currentY;
        if (!activated) {
            if (Math.abs(dy) > 6) {
                if (e.cancelable) e.preventDefault();
                if (isTouchDown(dy)) activate(e);
            }
            return;
        }
        if (postActivateBlocking && Math.abs(dy) > 2) {
            if (e.cancelable) e.preventDefault();
            scheduleRelease();
        }
    }

    function onTouchEnd() {
        touchStartY = null;
    }

    function onKeyDown(e) {
        if (!enabled || !inView) return;
        if (isEditable(e.target)) return;
        if (!activated) {
            const down = isDownKey(e);
            if (e.cancelable) e.preventDefault();
            if (down) activate(e);
            return;
        }
        if (activated && postActivateBlocking) {
            if (e.cancelable) e.preventDefault();
            if (isDownKey(e)) scheduleRelease();
        }
    }

    function addBlockers() {
        if (blockersOn) return;
        blockersOn = true;
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: false });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd, { passive: true });
        window.addEventListener('keydown', onKeyDown, { passive: false });
        setTouchBlock(true);
    }

    function removeBlockers() {
        if (!blockersOn) return;
        blockersOn = false;
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('keydown', onKeyDown);
        setTouchBlock(false);
    }

    function onScrollCheck() {
        const y = window.scrollY || document.documentElement.scrollTop;
        const dirUp = y < lastScrollY;
        lastScrollY = y;
        if (!enabled) return;
        const top = section.getBoundingClientRect().top;
        if (dirUp && top >= -RESET_THRESHOLD) {
            if (activated) {
                activated = false;
                section.classList.remove(ACTIVE_CLASS);
                postActivateBlocking = false;
                clearTimeout(pauseTimer);
                if (inView) addBlockers();
            }
        }
    }
    window.addEventListener('scroll', onScrollCheck, { passive: true });

    const io = new IntersectionObserver((entries) => {
        inView = !!entries[0]?.isIntersecting;
        if (!inView) {
            removeBlockers();
        } else if (shouldBlock()) {
            addBlockers();
        }
    }, { threshold: 0.001 });
    io.observe(section);

    function enable() {
        if (enabled) return;
        enabled = true;
        if (!activated || postActivateBlocking) addBlockers();
    }
    function disable() {
        enabled = false;
        removeBlockers();
        clearTimeout(pauseTimer);
    }
    function applyMQ(e) {
        if (e.matches) enable(); else disable();
    }
    mq.addEventListener('change', applyMQ);
    applyMQ(mq);

});