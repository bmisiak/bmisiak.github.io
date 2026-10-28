(() => {
    const radio = document.getElementById('radio');
    let timer;
    let request;

    async function refresh() {
        clearTimeout(timer);
        request?.abort();
        request = null;
        if (document.hidden || !navigator.onLine) {
            radio.hidden = true;
            return;
        }

        const check = new AbortController();
        request = check;
        const timeout = setTimeout(() => check.abort(), 4000);
        try {
            const response = await fetch('https://bm-formd.spotted-ide.ts.net/on-air', {
                cache: 'no-store',
                credentials: 'omit',
                signal: check.signal,
            });
            const live = response.ok && (await response.json()).live === true;
            if (request === check) radio.hidden = !live;
        } catch {
            if (request === check) radio.hidden = true;
        } finally {
            clearTimeout(timeout);
            if (request === check) {
                request = null;
                timer = setTimeout(refresh, 10000);
            }
        }
    }

    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('online', refresh);
    window.addEventListener('offline', refresh);
    window.addEventListener('pageshow', event => {
        if (event.persisted) refresh();
    });
    refresh();
})();
