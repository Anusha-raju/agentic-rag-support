# MFA Issues (Push / SMS / Authenticator)

## Symptoms
- No push notification
- “Invalid code”
- New phone / lost phone
- MFA loop

## Resolution Steps
1. Confirm phone has network access/time sync enabled.
2. Verify correct MFA method (push vs TOTP).
3. Re-register MFA device in SSO portal.
4. For lost phone: temporarily disable MFA and force re-enrollment.
5. If SMS delayed: switch to authenticator app.

## Escalation
- Escalate if user cannot regain access after device reset.
- Security review if suspicious MFA prompts reported.
