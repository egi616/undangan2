export async function loadJson(path) {
    const url = new URL(path, document.baseURI);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to load ${url.pathname}: HTTP ${response.status}`);
    }

    return response.json();
}

export function showSectionError(sectionId, error) {
    console.error(error);

    const section = document.getElementById(sectionId);
    if (!section) {
        return;
    }

    const message = document.createElement('p');
    message.className = 'mx-auto my-4 max-w-xl rounded-lg bg-red-50 p-3 text-center text-sm text-red-700';
    message.setAttribute('role', 'alert');
    message.textContent = 'Sebagian data undangan gagal dimuat. Silakan coba muat ulang halaman.';
    section.prepend(message);
}
