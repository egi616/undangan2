import { loadJson } from './data.js';

export async function initCouple() {
    const data = await loadJson('data/couple.json');
    const displayNames = document.getElementById('couple-display-names');
    if (displayNames) {
        displayNames.textContent = data.displayNames;
    }

    const cards = document.querySelectorAll('#couple .grid.grid-cols-1 > div');
    const people = [data.groom, data.bride];

    people.forEach((person, index) => {
        const card = cards[index];
        if (!card || !person) {
            throw new Error(`Missing couple card or data at position ${index}`);
        }

        const image = card.querySelector('img');
        const name = card.querySelector('h3');
        const details = card.querySelectorAll('p');
        if (!image || !name || details.length < 2) {
            throw new Error(`Couple card ${index + 1} does not match the expected template`);
        }

        image.src = person.image;
        image.alt = person.name;
        name.textContent = person.name;
        details[0].textContent = person.order;
        details[1].textContent = person.parents;
    });
}
