import { loadJson } from './data.js';

export async function initGift() {
    const cards = document.querySelectorAll('#amplop .grid.grid-cols-1 > div');
    const gifts = await loadJson('data/gifts.json');

    if (cards.length !== gifts.length) {
        throw new Error(`Gift template has ${cards.length} cards but JSON has ${gifts.length}`);
    }

    cards.forEach((card, index) => {
        const gift = gifts[index];
        const logo = card.querySelector('img');
        const number = card.querySelector('.tracking-wider');
        const copyButton = card.querySelector('button[data-copy-number]');
        const textValues = card.querySelectorAll('.border-t .text-sm');
        if (!logo || !number || !copyButton || textValues.length < 2) {
            throw new Error(`Gift card ${index + 1} does not match the expected template`);
        }

        logo.src = gift.logo;
        logo.alt = gift.name;
        number.textContent = gift.displayNumber;
        copyButton.dataset.copyNumber = gift.copyNumber;
        textValues[0].textContent = gift.accountName;
        textValues[1].textContent = gift.weddingDate;

        const status = document.createElement('span');
        status.className = 'copy-status text-xs text-gray-500 mt-2 block';
        status.setAttribute('aria-live', 'polite');
        copyButton.insertAdjacentElement('afterend', status);
    });

    document.querySelectorAll('#amplop button[data-copy-number]').forEach((button) => {
        button.addEventListener('click', async () => {
            const status = button.nextElementSibling;
            try {
                if (!navigator.clipboard) {
                    throw new Error('Clipboard API is unavailable in this browser context');
                }
                await navigator.clipboard.writeText(button.dataset.copyNumber);
                status.textContent = 'Nomor rekening berhasil disalin.';
            } catch (error) {
                console.error('Unable to copy account number:', error);
                status.textContent = 'Penyalinan gagal. Silakan salin nomor rekening secara manual.';
            }
        });
    });
}
