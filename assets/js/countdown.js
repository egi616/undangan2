export function renderCountdown(targetValue) {
    const output = document.getElementById('event-countdown');
    if (!output) {
        return;
    }

    const target = new Date(targetValue);
    if (Number.isNaN(target.getTime())) {
        throw new Error(`Invalid countdown target: ${targetValue}`);
    }

    const update = () => {
        const remaining = target.getTime() - Date.now();
        if (remaining <= 0) {
            output.textContent = 'Acara telah berlangsung';
            return false;
        }

        const days = Math.floor(remaining / 86_400_000);
        const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
        const minutes = Math.floor((remaining % 3_600_000) / 60_000);
        const seconds = Math.floor((remaining % 60_000) / 1_000);
        output.textContent = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
        return true;
    };

    if (update()) {
        const timer = window.setInterval(() => {
            if (!update()) {
                window.clearInterval(timer);
            }
        }, 1_000);
    }
}
