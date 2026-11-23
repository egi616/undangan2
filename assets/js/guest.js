export function initGuest() {
    const greeting = document.getElementById('guest-greeting');
    const guestName = document.getElementById('guest-name');
    if (!greeting || !guestName) {
        return;
    }

    const name = new URLSearchParams(window.location.search).get('to')?.trim();
    if (!name) {
        greeting.hidden = true;
        return;
    }

    guestName.textContent = name;
}
