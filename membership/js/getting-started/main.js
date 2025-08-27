document.addEventListener('DOMContentLoaded', function () {

    //Modals
    const S = {
        modal: '[data-modal]',
        open:  '[data-modal-open]',
        close: '[data-modal-close]',
    };

    let active = null;

    const getModal = (id) =>
        document.querySelector(`${S.modal}[data-modal="${CSS.escape(id)}"]`);

    function openModal(modal) {
        if (!modal || active === modal) return;
        active = modal;
        modal.classList.add('is-open');
        modal.removeAttribute('aria-hidden');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        if (!active) return;
        active.classList.remove('is-open');
        active.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        active = null;
    }

    document.addEventListener('click', (e) => {
        const opener = e.target.closest(S.open);
        if (opener) {
            e.preventDefault();
            openModal(getModal(opener.getAttribute('data-modal-open')));
            return;
        }

        if (!active) return;

        if (e.target.closest(S.close)) {
            e.preventDefault();
            closeModal();
            return;
        }

        if (e.target === active) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && active) closeModal();
    });

    window.Modals = {
        open: (id) => openModal(getModal(id)),
        close: closeModal
    };


    //Active class switcher
    const mql = window.matchMedia('(min-width: 1280px)');

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-toggle-item]');
        if (!btn) return;

        if (!mql.matches) return;

        const group = btn.closest('[data-toggle-group]');
        if (!group) return;

        const activeClass = group.dataset.activeClass || 'active';

        group.querySelectorAll('[data-toggle-item]').forEach(el => el.classList.remove(activeClass));
        btn.classList.add(activeClass);
    });
});