### nhost and auth

- Only way to reliably gain isAuthenticated status is via `isAuthenticatedAsync` (other methods fail due to race/timing conditions)
- `isAuthenticatedAsync` clogs shit up for 15 seconds if nhost server is down, halting everything else in the process.
- App MUST go on with or without hasura, hasura is only enhancement, not a requirement.
- therefore use hacky onAuthStateChanged to get around this, along with svelte stores to fetch and update user data
- this means `invalidateAll` won't affect db state.
