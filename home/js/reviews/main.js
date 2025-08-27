const ytApiReady = new Promise((resolve) => {
    if (window.YT && YT.Player) { resolve(); return; }
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
    window.onYouTubeIframeAPIReady = () => resolve();
});

const registry = new Map();
let currentlyOpenId = null;

function getState(modal) {
    const id = modal.id || modal.getAttribute('data-modal');
    if (!registry.has(id)) {
        registry.set(id, {
            id,
            modal,
            mount: modal.querySelector('[data-yt-mount]'),
            player: null,
            isReady: false,
            currentVideoId: null,
            lastFocused: null,
            isOpen: false,
        });
    }
    return registry.get(id);
}

async function openModal(modalIdOrEl, videoId) {
    const modal = typeof modalIdOrEl === 'string'
        ? document.querySelector(modalIdOrEl)
        : modalIdOrEl;

    if (!modal) return;

    const state = getState(modal);

    if (currentlyOpenId && currentlyOpenId !== state.id) {
        const opened = [...registry.values()].find(s => s.isOpen);
        if (opened) closeModal(opened.modal);
    }

    state.lastFocused = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    state.isOpen = true;
    currentlyOpenId = state.id;

    await ytApiReady;

    if (!state.player) {
        if (!state.mount) {
            return;
        }
        const mountId = `ytPlayer_${state.id}`;
        state.mount.innerHTML = `<div id="${mountId}"></div>`;

        state.player = new YT.Player(mountId, {
            videoId,
            playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
            events: {
                onReady: () => {
                    state.isReady = true;
                    state.currentVideoId = videoId;
                    try { state.player.unMute(); state.player.playVideo(); } catch (_) {}
                }
            }
        });
        return;
    }

    if (state.isReady) {
        if (state.currentVideoId !== videoId) {
            state.player.loadVideoById(videoId);
            state.currentVideoId = videoId;
        } else {
            try { state.player.playVideo(); } catch (_) {}
        }
        try { state.player.unMute(); } catch (_) {}
    }

    document.body.style.overflow = 'hidden';
}

function closeModal(modalIdOrEl) {
    const modal = typeof modalIdOrEl === 'string'
        ? document.querySelector(modalIdOrEl)
        : modalIdOrEl;

    if (!modal) return;
    const state = getState(modal);

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    state.isOpen = false;

    if (state.player && state.isReady) {
        try { state.player.pauseVideo(); } catch (_) {}
    }

    if (state.lastFocused) {
        try { state.lastFocused.focus(); } catch (_) {}
    }

    if (currentlyOpenId === state.id) currentlyOpenId = null;

    document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-modal-open]');
    if (opener) {
        const targetSel = opener.getAttribute('data-modal-target');
        const videoId = opener.getAttribute('data-yt') || opener.dataset.yt;
        if (!targetSel) {
            return;
        }
        if (!videoId) {
            return;
        }
        e.preventDefault();
        openModal(targetSel, videoId);
        return;
    }

    if (e.target.closest('[data-close]')) {
        e.preventDefault();
        const modal = e.target.closest('[id][aria-hidden]');
        if (modal) closeModal(modal);
        return;
    }

    const overlay = e.target.closest('[id][aria-hidden].open');
    if (overlay && e.target === overlay) {
        closeModal(overlay);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const opened = [...registry.values()].find(s => s.isOpen);
        if (opened) closeModal(opened.modal);
    }
});
