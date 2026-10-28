(() => {
    const radio = document.getElementById('radio');
    const origin = 'https://radio.bmisiak.com';
    let frame = document.getElementById('radio-player');
    if (!radio || !frame) return;
    let lastMessage = performance.now();

    function loadPlayer() {
        radio.hidden = true;
        const replacement = frame.cloneNode();
        replacement.src = origin + '/';
        frame.replaceWith(replacement);
        frame = replacement;
        lastMessage = performance.now();
    }

    window.addEventListener('message', event => {
        if (event.origin !== origin || event.source !== frame.contentWindow
            || event.data?.type !== 'livedj-status' || typeof event.data.live !== 'boolean') return;
        lastMessage = performance.now();
        radio.hidden = !event.data.live || !navigator.onLine;
    });

    window.addEventListener('offline', () => { radio.hidden = true; });
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            radio.hidden = true;
            lastMessage = performance.now();
        }
    });
    // Keep background audio intact. Retry a dead frame only while the page is visible.
    setInterval(() => {
        if (!document.hidden && navigator.onLine && performance.now() - lastMessage > 10000) loadPlayer();
    }, 5000);
    loadPlayer();
})();
