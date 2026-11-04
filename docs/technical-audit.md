# Technical audit — rjbassig.dev

Audit date: 2026-11-04

## Executive summary

The repository is a small static-oriented Next.js portfolio with no API routes, authentication, forms, database access, or server-side user input processing. The audit found no committed credentials or confirmed client-side injection, redirect, or API vulnerabilities. Targeted hardening, dependency remediation, a mobile-only Saturn framing adjustment, and a persistent accessible navigation indicator were implemented locally.

## Security findings

| Status | Severity | Finding | Evidence and resolution |
| --- | --- | --- | --- |
| Fixed | High / Moderate dependency chain | `npm audit` initially reported 10 findings through PostCSS, `source-map-js`, and `postcss-selector-parser`. | Updated direct PostCSS to 8.5.32 and added lockfile overrides for `source-map-js` 1.2.2 and `postcss-selector-parser` 6.1.5. A follow-up `npm audit` returned 0 vulnerabilities. |
| Fixed | Defense in depth | No explicit application response security headers existed in `next.config.ts`. | Added CSP, HSTS, nosniff, strict referrer policy, permissions policy, CSP frame ancestors, and `X-Frame-Options`. |
| Confirmed | Low | The application has an inline theme bootstrap script and framework inline scripts. | CSP retains `'unsafe-inline'` for scripts/styles to preserve static rendering, the theme bootstrapping script, and Next functionality. A nonce-based CSP would require request-time rendering/middleware and changes caching behavior, so it was not introduced. |
| Not applicable | — | API abuse, open redirects, server-side request forgery, and form validation. | No API routes, server actions, forms, user-controlled fetches, or redirect destinations were found. Dynamic route parameters are matched only against local project/article data and call `notFound()` otherwise. |
| Confirmed | Informational | External social links open in a new tab. | Existing links already use `rel="noreferrer"`, preventing reverse tabnabbing and suppressing referrer disclosure. The new referrer policy provides an application-wide fallback. |
| Confirmed | Informational | No committed secrets found. | Repository scan found no API keys, private keys, tokens, passwords, or `.env` files. `.gitignore` excludes `.env*` while permitting only `.env.example`. Rotate any value immediately if secrets are added later or found in Git history. |

## Production configuration

- Production browser source maps are disabled explicitly.
- The canonical and Open Graph URL are `https://rjbassig.dev`; the title, sharing description, and favicon configuration are preserved.
- The application is statically renderable where route data permits. There are no API endpoints or deployment credentials in this repository.
- Vercel HTTPS/DNS settings cannot be verified from the local checkout and were not changed.
- No `sitemap.ts` or `robots.ts` was present. This is an SEO recommendation, not a confirmed runtime defect.

## Performance findings

- No Lighthouse score is reported: no reliable Lighthouse runner was available in this audit environment.
- Saturn already avoids React state updates in its animation loop; it mutates Three.js groups with `useFrame`.
- The mobile interactive Saturn camera is now farther away (`z: 8` versus desktop `z: 5.9`) and its DPR cap is 1.25. This reduces apparent narrow-screen size by about 26% while retaining the same geometry, materials, lighting, controls, and desktop configuration.
- The experimental Ultra Saturn remains opt-in through the existing comparison flag. It is not selected by a normal production build.

## Accessibility findings

| Status | Finding | Resolution |
| --- | --- | --- |
| Fixed | Sidebar navigation had no semantic active-page state. | Added `aria-current="page"` to the active route and a single decorative indicator. |
| Fixed | The navigation marker was static. | A persistent route-aware marker now moves on route changes and immediately settles under reduced motion. |
| Confirmed | Saturn has descriptive accessible text. | The interactive canvas container retains its descriptive `aria-label`; the cinematic instance is hidden from assistive technology. |
| Confirmed | Focus-visible styles and reduced-motion CSS exist. | Preserved and extended these behaviors; keyboard navigation remains native links. |

## Responsive findings

- Desktop Saturn camera and renderer settings are unchanged.
- The narrow-screen Saturn is smaller through camera framing only; it remains inside its existing container and preserves interaction and ring orientation.
- The navigation indicator switches to the horizontal mobile navigation layout and is not animated offscreen.
- Browser-device screenshots at 320px, 375px, 390px, 430px, and 768px were not available in this environment. This is a remaining manual QA step.

## Implemented changes

| File | Change |
| --- | --- |
| `next.config.ts` | Added security headers and disabled production browser source maps. |
| `package.json` / `package-lock.json` | Applied safe PostCSS-chain security updates and transitive overrides. |
| `components/header.tsx` | Added a persistent, route-aware, reduced-motion-safe navigation indicator and `aria-current`. |
| `app/globals.css` | Added the restrained indicator transition and mobile placement. |
| `components/saturn.tsx` | Added mobile-only camera/DPR configuration; desktop and cinematic settings are unchanged. |
| `docs/technical-audit.md` | Added this audit report. |

## Remaining risks and recommendations

1. Validate Vercel’s deployed response headers and HTTPS redirect behavior after deployment; local builds cannot verify edge configuration.
2. Consider a nonce-based CSP only if moving the theme bootstrap and any required inline framework behavior to a nonce-compatible request path is acceptable; doing so would affect static caching.
3. Add a sitemap and robots directive if search indexing is a priority.
4. Perform a real-device mobile and Lighthouse pass before a performance claim is made.
5. Browser QA observed the upstream warning `THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.` from the installed Three.js/React Three Fiber bundle. It is not an application error; upgrade the rendering dependency only after compatibility testing.

## Validation

- `npm audit --json`: **0 vulnerabilities** after remediation.
- `npx tsc --noEmit`: **passed**.
- `NEXT_DIST_DIR=.next-audit npm run build -- --webpack`: **passed**.
- Response-header check on the local production preview: **200** with CSP, HSTS, nosniff, referrer policy, permissions policy, and frame protection present.
- Navigation browser test: `/work` reported `aria-current="page"` for **01 work** and the persistent indicator had a transformed position.
- Responsive browser test: at 320, 375, 390, 430, and 768px, the Saturn container stayed within the viewport and `documentElement.scrollWidth` equaled the viewport width.
- Browser console: **no errors**; the Three.js deprecation warning is recorded above.
- No dedicated test suite is configured.
- `npm run lint -- --webpack`: **passed**. The script is configured as `next build`, not a standalone linter, so it validates compilation and TypeScript rather than providing separate ESLint coverage.
