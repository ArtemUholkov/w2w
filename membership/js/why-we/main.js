document.addEventListener('DOMContentLoaded', () => {

    //    Active class switcher
    function initAutoSwitcher(selector, interval = 2000) {
        const container = document.querySelector(selector);
        if (!container) return;

        const items = container.querySelectorAll('.switch-item');
        if (items.length === 0) return;

        let currentIndex = 0;
        let intervalId = null;

        function toggleActive() {
            items.forEach(item => item.classList.remove('active'));
            items[currentIndex].classList.add('active');
            currentIndex = (currentIndex + 1) % items.length;
        }

        function startSwitcher() {
            toggleActive();
            intervalId = setInterval(toggleActive, interval);
        }

        startSwitcher();
    }

    initAutoSwitcher('.why-we-list', 2000);

    //Video modal
    const ytApiReady = new Promise((resolve) => {
        if (window.YT && YT.Player) { resolve(); return; }
        const s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(s);
        window.onYouTubeIframeAPIReady = () => resolve();
    });

    const modal = document.getElementById('videoModal');
    const mount = document.getElementById('ytPlayerMount');
    let player = null;
    let isReady = false;
    let currentVideoId = null;
    let lastFocused = null;
    let modalOpen = false;

    async function openModal(videoId) {
        lastFocused = document.activeElement;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        modalOpen = true;

        await ytApiReady;

        if (!player) {
            mount.innerHTML = '<div id="ytPlayer"></div>';
            player = new YT.Player('ytPlayer', {
                videoId: videoId,
                playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
                events: {
                    onReady: () => {
                        isReady = true;
                        currentVideoId = videoId;
                        if (modalOpen) {
                            try { player.unMute(); player.playVideo(); } catch(_) {}
                        }
                    }
                }
            });
            return;
        }

        if (isReady) {
            if (currentVideoId !== videoId) {
                player.loadVideoById(videoId);
                currentVideoId = videoId;
            } else {
                player.playVideo();
            }
            try { player.unMute(); } catch(_) {}
        }
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        modalOpen = false;

        if (player && isReady) {
            try { player.pauseVideo(); } catch(_) {}
        }
        if (lastFocused) lastFocused.focus();
    }

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.video-card[data-yt]');
        if (trigger) {
            openModal(trigger.dataset.yt);
            return;
        }

        if (e.target.closest('[data-close]')) {
            e.preventDefault();
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });


});