# LeedFinTech reference-inspired redesign

This update reworks the homepage and shared visual system toward the supplied eezyinn.de reference: editorial typography, warm off-white surfaces, thin grid/rule details, lime accents, a sculptural interactive hero visual, compact floating navigation, capability cards, a process narrative, and a strong closing CTA.

## Main files changed
- `app/page.tsx` — uses the new complete homepage.
- `app/components/ReferenceStyleHome.tsx` — homepage sections, interactive business/learner selector, and pointer-responsive orb visual.
- `app/components/Navbar.tsx` — redesigned responsive navigation and desktop capability dropdown.
- `app/reference-theme.css` — new shared theme for the homepage, navigation, footer, and existing inner pages.
- `app/layout.tsx` — imports the shared theme and updates the brand wordmark.

## Run locally
1. Back up the current project.
2. Extract the ZIP into a new folder.
3. From that folder run `npm ci` (requires internet access for package installation), then `npm run dev`.
4. Open the URL printed in the terminal. If port 3000 is busy and Next.js selects another port, use that port instead.

The source syntax and stylesheet were checked, but a complete Next.js production build could not be run in this environment because dependency installation did not complete. Test desktop/mobile pages and navigation locally before deploying.
