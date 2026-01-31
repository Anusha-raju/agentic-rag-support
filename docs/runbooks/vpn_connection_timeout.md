# VPN Connection Timeout

## Symptoms
- “Connection timed out”
- Stuck on “Connecting…”
- Disconnects immediately

## Likely Causes
- Firewall blocking VPN ports
- Outdated VPN client
- DNS issues
- Captive portal Wi-Fi

## Resolution Steps
1. Check internet access (open a public site).
2. Switch networks (hotspot test) to rule out firewall.
3. Update VPN client to latest approved version.
4. Flush DNS (Windows: ipconfig /flushdns).
5. Disable conflicting security software temporarily (if allowed).
6. Reboot device and retry.

## Escalation
- Escalate to Network Team if multiple users report same issue.
- Provide logs from VPN client.
