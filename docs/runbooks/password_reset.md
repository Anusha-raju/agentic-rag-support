# Password Reset (SSO / Corporate Account)

## Symptoms
- “Password incorrect”
- “Account locked”
- “Too many attempts”
- MFA succeeds but login fails

## Preconditions
- Confirm user identity (employee ID + last login location)
- Confirm account system (Okta/Azure AD/Google Workspace)

## Resolution Steps
1. Check account status (locked/disabled/expired).
2. If locked: unlock account, then require password change.
3. Trigger password reset workflow (SSO portal).
4. Ask user to set a new password (min length, complexity).
5. Have user re-login and re-enroll MFA if prompted.

## Common Causes
- Cached credentials on device
- Password policy expiry
- Multiple failed attempts from a mobile device

## Escalation
- Escalate to Identity Team if account disabled or suspected compromise.
- Severity P1 if multiple users affected (possible outage).
