import { loadJson } from './data.js';

export async function initGuestbook() {
    const list = document.getElementById('guestbook-list');
    if (!list) {
        throw new Error('Guestbook list container is missing');
    }

    const entries = await loadJson('data/guestbook.json');
    list.replaceChildren();

    if (!Array.isArray(entries)) {
        throw new Error('Guestbook data must be a JSON array');
    }

    if (entries.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'text-center py-8';
        const message = document.createElement('p');
        message.className = 'text-gray-500 italic';
        message.textContent = 'Belum ada ucapan. Jadilah yang pertama memberikan doa restu!';
        emptyState.append(message);
        list.append(emptyState);
        return;
    }

    const relativeTime = new Intl.RelativeTimeFormat('id', { numeric: 'auto' });
    for (const entry of entries) {
        const item = document.createElement('article');
        item.className = 'border-b border-gray-200 pb-4';

        const header = document.createElement('div');
        header.className = 'flex items-center space-x-2 mb-1';
        const name = document.createElement('h4');
        name.className = 'font-bold text-gray-800 text-lg';
        name.textContent = entry.nama;

        const status = document.createElement('span');
        const isAttending = entry.kehadiran === 'hadir';
        status.className = `text-xs px-2 py-1 rounded-full font-medium ${isAttending ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`;
        status.textContent = isAttending ? 'Hadir' : 'Tidak hadir';
        header.append(name, status);

        const message = document.createElement('p');
        message.className = 'text-gray-700 leading-relaxed';
        message.textContent = entry.ucapan;
        item.append(header, message);

        if (entry.created_at) {
            const timestamp = new Date(entry.created_at);
            const time = document.createElement('time');
            time.className = 'text-xs text-gray-400 mt-2 block';
            time.dateTime = entry.created_at;
            time.textContent = Number.isNaN(timestamp.getTime())
                ? entry.created_at
                : relativeTime.format(-Math.floor((Date.now() - timestamp.getTime()) / 60_000), 'minute');
            item.append(time);
        }

        list.append(item);
    }
}
