import { loadJson } from './data.js';
import { renderCountdown } from './countdown.js';

export async function initEvent() {
    const data = await loadJson('data/event.json');
    const coverDate = document.getElementById('cover-date');
    if (coverDate) {
        coverDate.textContent = data.coverDateText;
    }

    const cards = document.querySelectorAll('#event .grid.grid-cols-1 > div');
    data.events.forEach((event, index) => {
        const card = cards[index];
        if (!card) {
            throw new Error(`Missing event card at position ${index}`);
        }

        const image = card.querySelector('img');
        const title = card.querySelector('h3');
        const venue = card.querySelector('.font-semibold');
        const address = card.querySelector('.leading-relaxed.mb-6');
        const dateTimeGrid = card.querySelector('.grid-cols-2');
        const mapLink = card.querySelector('a[href*="maps.app.goo.gl"]');
        const dateTimeCells = dateTimeGrid?.querySelectorAll(':scope > div');
        const dateValues = dateTimeCells?.[0]?.querySelectorAll('span');
        const timeValues = dateTimeCells?.[1]?.querySelectorAll('span');

        if (!image || !title || !venue || !address || !mapLink || dateValues?.length < 2 || timeValues?.length < 2) {
            throw new Error(`Event card ${index + 1} does not match the expected template`);
        }

        image.src = event.image;
        image.alt = event.name;
        title.textContent = event.name;
        venue.textContent = event.venue;
        address.textContent = event.address;
        dateValues[0].textContent = event.dayText;
        dateValues[1].textContent = event.dateText;
        timeValues[1].textContent = event.timeText;
        mapLink.href = event.mapUrl;
        mapLink.rel = 'noopener noreferrer';
    });

    const formLink = document.getElementById('rsvpFormLink');
    const rsvpUrl = new URL(data.rsvpUrl);
    if (rsvpUrl.protocol !== 'https:' || rsvpUrl.hostname !== 'docs.google.com') {
        throw new Error('The RSVP destination must be an HTTPS Google Forms URL');
    }
    if (formLink) {
        formLink.href = rsvpUrl.href;
        formLink.removeAttribute('aria-disabled');
        formLink.removeAttribute('tabindex');
    }

    renderCountdown(data.countdownTarget);
}
