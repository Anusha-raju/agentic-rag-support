# VPN Connected but No Internal Access

## Symptoms
- VPN shows “Connected”
- Intranet/tools unreachable
- Internal DNS fails

## Likely Causes
- Split tunneling policy mismatch
- DNS not pushed by VPN
- User not in correct access group
- Proxy interfering

## Resolution Steps
1. Confirm VPN profile (corp vs vendor vs dev).
2. Check internal DNS resolution (nslookup internal.domain).
3. Ensure “Use VPN DNS” enabled in client (if applicable).
4. Disconnect/reconnect; try “full tunnel” profile if available.
5. Verify user group membership / entitlements.

## Escalation
- Access issue → Identity/Access team
- DNS routing issue → Network team
