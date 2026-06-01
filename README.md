# Mortéa — Global Luxury Beauty Discovery
## Final Version

### What was improved in this version

#### Design & CSS (`style.css`)
- Full CSS custom properties system with semantic tokens (`--line-hi`, `--glass-hi`, `--radius-*`, `--shadow`, `--transition`)
- Consistent hover transitions on all interactive elements (cards, buttons, nav links, results)
- Animated map dots with pulsing glow effect
- Floating pin animation on map boxes
- Page load fade-up animation on hero sections
- Luxury scrollbar styling
- Better mobile breakpoints (900px, 560px) with improved nav wrapping
- Button hover states with subtle lift + shadow
- Better focus states on inputs

#### Homepage (`index.html`)
- Smart search redirect — hero form pre-fills the discover page on submit
- Italic accent on hero headline using brand rose color
- Featured Professional plan highlighted in pricing grid
- Better pricing cards with CTA buttons
- Removed vague "future direction" notice wording, reframed positively

#### Discover Page (`discover.html`)
- Filter chips with active state toggle
- URL param pre-fill from homepage search
- Provider count display
- Enter key support on search inputs
- Empty state with link to professional onboarding

#### Professional Onboarding (`professional-onboarding.html`)
- Structured two-column form with field labels
- Full validation before submit (required fields)
- Better success/error messaging with styling
- Benefits section redesigned with icon rows
- All required fields captured including `owner_name`, `phone`, `province`

#### French Pages (`fr/`)
- `fr/discover.html` — fully translated (was mixed EN/FR)
- `fr/index.html` — improved heading typography
- `fr/professional-onboarding.html` — full Supabase-connected form in French
- `fr/login.html` — redesigned access portal page
- `fr/provider.html` — fixed mixed-language strings

#### JavaScript
- `script.js` — full form validation, better error handling, loading state on submit button
- `discover-dynamic.js` — toggle filter chips, Enter key support, cleaner card rendering with Instagram/TikTok link normalisation
- `map-foundation.js` — improved filter logic, Enter key, geolocation feedback

#### Map Page (`map.html`)
- Removed "Step 7" developer label
- Removed "mock provider data" wording

#### SEO
- Meta descriptions added to all core pages

---

### Core Pages
- `index.html` — EN homepage
- `discover.html` — provider search
- `map.html` — map discovery
- `professional-onboarding.html` — professional signup form
- `pricing.html` — membership plans
- `login.html` — access portal
- `provider.html` — individual provider profile
- `fr/` — French equivalents

### Supabase Config
Edit `supabase-config.js` to update your project URL and anon key.

### Next Steps
1. Connect real Google Maps API to `map.html`
2. Add Stripe checkout to `pricing.html`
3. Implement auth (Supabase Auth) on `login.html`
4. Add image upload for provider profiles
5. Build mobile app using same Supabase data structure
