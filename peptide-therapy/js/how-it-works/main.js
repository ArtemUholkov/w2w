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

    initAutoSwitcher('.how-it-works_text', 2000);


});