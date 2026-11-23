import { loadJson } from './data.js';

export async function initGallery() {
    const images = document.querySelectorAll('#galery .grid img');
    const gallery = await loadJson('data/gallery.json');

    if (images.length !== gallery.length) {
        throw new Error(`Gallery template has ${images.length} images but JSON has ${gallery.length}`);
    }

    gallery.forEach((item, index) => {
        images[index].src = item.image;
        images[index].alt = item.alt;
    });
}
