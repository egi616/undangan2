export function initRsvp() {
    const modal = document.getElementById('rsvpModal');
    if (!modal) {
        throw new Error('RSVP modal is missing');
    }

    const toggleModal = (isOpen) => {
        modal.classList.toggle('hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    document.querySelectorAll('[data-rsvp-open]').forEach((button) => {
        button.addEventListener('click', () => toggleModal(true));
    });
    document.querySelectorAll('[data-rsvp-close]').forEach((button) => {
        button.addEventListener('click', () => toggleModal(false));
    });
    document.getElementById('rsvpFormLink')?.addEventListener('click', (event) => {
        if (event.currentTarget.getAttribute('aria-disabled') === 'true') {
            event.preventDefault();
        }
    });
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            toggleModal(false);
        }
    });
}
