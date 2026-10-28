# Public radio relay

This Worker forwards the player, audio and requests to the existing Tailscale Funnel. A public hostname avoids Chromium blocking the iframe when MagicDNS resolves the Funnel hostname to a private Tailscale address.

Responses stream directly without buffering. Credentials and cookies are not forwarded. A failed upstream produces an error page that cannot send the player's readiness message, so the homepage keeps it hidden.

Deploy with `pnpm dlx wrangler deploy --config radio-proxy/wrangler.jsonc` from the repository root. No dependencies are bundled. Follow the machine's executable scanning instructions when provisioning tools.

The Free plan allows 100,000 requests/day; the player's status polling counts even before Play is pressed. No paid subscription was enabled for this deployment.
