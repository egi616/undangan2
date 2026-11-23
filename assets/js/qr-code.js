import QRCode from 'qrcode';

const canvas = document.getElementById('invitation-qr');
if (canvas) {
    QRCode.toCanvas(canvas, window.location.href, { width: 180, margin: 1 }, (error) => {
        if (error) {
            console.error('Unable to generate invitation QR code:', error);
            const message = document.createElement('p');
            message.className = 'mt-2 text-sm text-red-700';
            message.setAttribute('role', 'alert');
            message.textContent = 'QR code tidak dapat dibuat saat ini.';
            canvas.insertAdjacentElement('afterend', message);
        }
    });
}
