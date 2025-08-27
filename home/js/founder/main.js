(() => {
    const videoRegistry = new Map();
    let videoCurrentlyOpenId = null;

    const qs = (sel, root = document) => root.querySelector(sel);
    const getId = (el) => el?.id || el?.getAttribute?.('data-modal') || null;

    function findModal(targetSel) {
        if (!targetSel) return null;
        if (targetSel.startsWith('#')) {
            const byId = document.querySelector(targetSel);
            if (byId) return byId;
            const id = targetSel.slice(1);
            return qs(`[data-modal="${CSS.escape(id)}"]`);
        }
        const byData = qs(`[data-modal="${CSS.escape(targetSel)}"]`);
        if (byData) return byData;
        return document.getElementById(targetSel);
    }

    function getState(modal) {
        const id = getId(modal);
        if (!id) return null;
        if (!videoRegistry.has(id)) {
            videoRegistry.set(id, {
                id,
                modal,
                video: modal.querySelector('video[data-modal-video]') || null,
                sourcesSignature: null,
                lastFocused: null,
                isOpen: false,
            });
        }
        const state = videoRegistry.get(id);
        if (!state.video) state.video = modal.querySelector('video[data-modal-video]') || null;
        return state;
    }

    function lockBody() { document.body.style.overflow = 'hidden'; }
    function unlockBody() { document.body.style.overflow = ''; }

    function showModal(state) {
        state.modal.classList.add('open');
        state.modal.setAttribute('aria-hidden', 'false');
        state.isOpen = true;
        videoCurrentlyOpenId = state.id;
        lockBody();
    }
    function hideModal(state) {
        state.modal.classList.remove('open');
        state.modal.setAttribute('aria-hidden', 'true');
        state.isOpen = false;
        if (videoCurrentlyOpenId === state.id) videoCurrentlyOpenId = null;
        unlockBody();
    }

    function normalizeSources(input) {
        if (!input) return null;
        if (Array.isArray(input)) {
            return input.filter(x => x && x.src).map(x => ({
                src: String(x.src),
                type: x.type ? String(x.type) : undefined
            }));
        }
        if (typeof input === 'string') {
            try {
                const arr = JSON.parse(input);
                if (Array.isArray(arr)) return normalizeSources(arr);
            } catch (_) {}
            return [{ src: input }];
        }
        const out = [];
        if (input.webm) out.push({ src: String(input.webm), type: 'video/webm' });
        if (input.mp4)  out.push({ src: String(input.mp4),  type: 'video/mp4' });
        if (input.ogg)  out.push({ src: String(input.ogg),  type: 'video/ogg' });
        return out.length ? out : null;
    }

    function getSourcesFromOpener(opener) {
        const json = opener.getAttribute('data-video-sources');
        if (json) return normalizeSources(json);
        const mp4  = opener.getAttribute('data-video-src-mp4');
        const webm = opener.getAttribute('data-video-src-webm');
        const ogg  = opener.getAttribute('data-video-src-ogg');
        const multi = normalizeSources({ mp4, webm, ogg });
        if (multi) return multi;
        const single = opener.getAttribute('data-video-src') || opener.dataset.videoSrc;
        if (single) return normalizeSources(single);
        return null;
    }

    function currentSignature(video) {
        const items = [...video.querySelectorAll('source')].map(s => ({
            src: s.getAttribute('src') || '',
            type: s.getAttribute('type') || undefined,
        }));
        if (!items.length && video.hasAttribute('src')) {
            items.push({ src: video.getAttribute('src') });
        }
        return JSON.stringify(items);
    }

    function setVideoSources(video, sourcesArr) {
        if (!video || !sourcesArr || !sourcesArr.length) return false;
        const targetSig = JSON.stringify(
            sourcesArr.map(s => ({ src: s.src, type: s.type || undefined }))
        );
        const curSig = currentSignature(video);
        if (curSig === targetSig) return false;

        video.removeAttribute('src');
        [...video.querySelectorAll('source')].forEach(n => n.remove());

        sourcesArr.forEach(({ src, type }) => {
            if (!src) return;
            const el = document.createElement('source');
            el.setAttribute('src', src);
            if (type) el.setAttribute('type', type);
            video.appendChild(el);
        });
        try { video.load(); } catch (_) {}
        return targetSig;
    }

    async function playWithSound(video) {
        if (!video) return;
        video.playsInline = true;
        video.muted = false;
        if (typeof video.volume === 'number') video.volume = Math.max(0, Math.min(1, video.volume || 1));
        try { await video.play(); } catch (_) {}
    }

    function pauseVideo(video, { resetTime = false } = {}) {
        if (!video) return;
        try { video.pause(); } catch (_) {}
        if (resetTime) { try { video.currentTime = 0; } catch (_) {} }
    }

    async function openVideoModal(targetSelOrEl, sources) {
        const modal = typeof targetSelOrEl === 'string' ? findModal(targetSelOrEl) : targetSelOrEl;
        if (!modal) return;
        const state = getState(modal);
        if (!state) return;

        if (videoCurrentlyOpenId && videoCurrentlyOpenId !== state.id) {
            const opened = [...videoRegistry.values()].find(s => s.isOpen);
            if (opened) closeVideoModal(opened.modal);
        }

        state.lastFocused = document.activeElement;
        showModal(state);

        if (state.video) {
            const normalized = normalizeSources(sources);
            if (normalized && normalized.length) {
                const newSig = setVideoSources(state.video, normalized);
                if (newSig) state.sourcesSignature = newSig;
            } else if (!state.sourcesSignature) {
                state.sourcesSignature = currentSignature(state.video);
            }
            await playWithSound(state.video);
        }
    }

    function closeVideoModal(targetSelOrEl) {
        const modal = typeof targetSelOrEl === 'string' ? findModal(targetSelOrEl) : targetSelOrEl;
        if (!modal) return;
        const state = getState(modal);
        if (!state) return;

        pauseVideo(state.video, { resetTime: false });
        hideModal(state);
        if (state.lastFocused) { try { state.lastFocused.focus(); } catch (_) {} }
    }

    document.addEventListener('click', (e) => {
        const opener = e.target.closest('[data-video-modal-open]');
        if (opener) {
            const targetSel = opener.getAttribute('data-modal-target');
            if (!targetSel) return;
            const sources = getSourcesFromOpener(opener);
            e.preventDefault();
            openVideoModal(targetSel, sources);
            return;
        }

        const closeBtn = e.target.closest('[data-close], [data-modal-close], [data-action="close-modal"]');
        if (closeBtn) {
            const modalRoot = closeBtn.closest('[id][aria-hidden], [data-modal]');
            if (modalRoot && modalRoot.querySelector('video[data-modal-video]')) {
                e.preventDefault();
                closeVideoModal(modalRoot);
                return;
            }
        }

        const overlayRoot = e.target.closest('.modal.open, [id][aria-hidden].open');
        if (overlayRoot &&
            overlayRoot.querySelector('video[data-modal-video]') &&
            e.target === overlayRoot) {
            closeVideoModal(overlayRoot);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const opened = [...videoRegistry.values()].find(s => s.isOpen);
            if (opened) closeVideoModal(opened.modal);
        }
    });

    window.videoModals = { open: openVideoModal, close: closeVideoModal };
})();
