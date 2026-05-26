# Mortéa Pages Fix

Problem:
- The new homepage design replaced the global style.css.
- Other pages use the same style.css, so they looked corrupted.

Fix:
- Restored the original global CSS.
- Added the new homepage design as homepage-only CSS.
- Added `class="home-page"` to index.html.
- Other pages should now keep their previous styling.
