const upstream = 'bm-formd.spotted-ide.ts.net';

export default {
    async fetch(request) {
        const url = new URL(request.url);
        url.protocol = 'https:';
        url.hostname = upstream;
        url.port = '';
        const forwarded = new Request(url, request);
        forwarded.headers.set('Host', upstream);
        forwarded.headers.delete('Cookie');
        forwarded.headers.delete('Authorization');
        try {
            return await fetch(forwarded);
        } catch {
            return new Response('Radio is offline.', {
                status: 503,
                headers: { 'Cache-Control': 'no-store' },
            });
        }
    },
};
