import { showSectionError } from './data.js';
import { initCouple } from './couple.js';
import { initEvent } from './event.js';
import { initGallery } from './gallery.js';
import { initGift } from './gift.js';
import { initGuestbook } from './guestbook.js';
import { initGuest } from './guest.js';
import { initRsvp } from './rsvp.js';

initGuest();
initRsvp();

const initializers = [
    ['couple', 'couple', initCouple],
    ['event', 'event', initEvent],
    ['galery', 'gallery', initGallery],
    ['amplop', 'gifts', initGift],
    ['ucapan', 'guestbook', initGuestbook],
];

await Promise.all(initializers.map(async ([sectionId, featureName, initialize]) => {
    try {
        await initialize();
    } catch (error) {
        showSectionError(sectionId, new Error(`Failed to initialize ${featureName}`, { cause: error }));
    }
}));
