# SwipePay Design System

## Mission
Create implementation-ready, token-driven UI guidance for SwipePay — a Solana-based peer-to-peer payment and bill-splitting mobile app — optimized for consistency, accessibility, and fast delivery across the React Native (Expo) mobile surface.

## Brand
- Product/brand: SwipePay
- URL: https://swipepay.app/
- Audience: authenticated wallet users sending SOL and splitting bills on-chain
- Product surface: mobile app (Expo / React Native / NativeWind)
- Tagline: wallet-native payments — no password, no email, just your wallet

## Context and goals
SwipePay is a wallet-native mobile app. Users authenticate by signing a nonce with their Solana wallet (Phantom), then send SOL payments and split bills on-chain via an Anchor smart contract. The UI must feel fast, trustworthy, and crypto-native while remaining approachable for non-technical users. The design is dark-first, content-first, and tokenized so every screen ships from the same foundations.

## Design tokens and foundations

### Style foundations
- Visual style: structured, tokenized, content-first, dark-native
- Main font style: `font.family.primary=Inter`, `font.family.mono=Inter`, `font.family.stack=Inter, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=10px`, `font.size.sm=13px`, `font.size.md=14px`, `font.size.lg=16px`, `font.size.xl=18px`, `font.size.2xl=20px`, `font.size.3xl=22px`, `font.size.4xl=24px`, `font.size.5xl=30px`, `font.size.6xl=36px`
- Font weights: `font.weight.regular=400`, `font.weight.medium=500`, `font.weight.semibold=600`, `font.weight.bold=700`, `font.weight.black=900`

### Color palette (dark theme)
- `color.surface.base=#0B0E14` — app background, dark navy
- `color.surface.raised=#141824` — cards, inputs, raised surfaces
- `color.surface.muted=#1A1F2E` — subtle raised, list rows
- `color.surface.strong=#7C5CFC` — primary brand fill
- `color.surface.overlay=#0B0E14CC` — modal scrim (80% base)
- `color.text.primary=#F5F3FF` — primary text, off-white
- `color.text.secondary=#8B8FA3` — secondary/muted text
- `color.text.tertiary=#5A5F73` — tertiary/dim text
- `color.text.inverse=#0B0E14` — text on light/brand fills
- `color.border.subtle=#2A2F3E` — default borders
- `color.border.strong=#3A3F52` — emphasized borders
- `color.brand.primary=#7C5CFC` — purple, primary actions
- `color.brand.primaryHover=#8B6DFF` — hover/active lift
- `color.brand.primaryPressed=#6A4DED` — pressed
- `color.brand.success=#3DDC97` — connected, confirmed, positive
- `color.brand.danger=#FF5C5C` — errors, destructive
- `color.brand.warning=#FFB547` — pending, caution
- `color.brand.info=#4DA8FF` — informational accent

### Spacing scale
- `space.1=4px`, `space.2=5px`, `space.3=8px`, `space.4=10px`, `space.5=12px`, `space.6=16px`, `space.7=18px`, `space.8=20px`, `space.9=24px`, `space.10=32px`, `space.11=40px`, `space.12=48px`

### Radius tokens
- `radius.xs=4px`, `radius.sm=8px`, `radius.md=14px`, `radius.lg=16px`, `radius.xl=20px`, `radius.2xl=24px`, `radius.full=9999px`

### Shadow / glow tokens (dark theme uses glows, not drop shadows)
- `shadow.1=rgba(0,0,0,0.4) 0px 1px 2px 0px` — subtle elevation
- `shadow.2=rgba(0,0,0,0.5) 0px 2px 6px 0px` — card elevation
- `glow.primary=rgba(124,92,252,0.25) 0px 0px 24px 0px` — brand glow on primary CTAs
- `glow.success=rgba(61,220,151,0.25) 0px 0px 24px 0px` — success glow

### Motion tokens
- `motion.duration.instant=150ms`, `motion.duration.fast=200ms`, `motion.duration.normal=350ms`, `motion.duration.slow=500ms`
- `motion.easing.standard=cubic-bezier(0.4, 0, 0.2, 1)`, `motion.easing.entrance=cubic-bezier(0, 0, 0.2, 1)`, `motion.easing.exit=cubic-bezier(0.4, 0, 1, 1)`

## Accessibility
- Target: WCAG 2.2 AA
- Touch-first interactions required (min 44x44pt hit targets).
- Focus-visible rules required — on mobile, focus rings use `color.brand.primary` at 2px with 4px offset.
- Contrast constraints required — `color.text.primary` on `color.surface.base` passes AA; `color.text.secondary` is reserved for non-essential copy and must not be used for actionable text below 14px.
- All interactive elements must have an accessible label (`accessibilityLabel` on RN).

## Writing tone
Concise, confident, implementation-focused. Crypto-literate but not jargon-heavy. Dollar amounts and SOL amounts shown together where relevant (`$12.50 · 0.08 SOL`).

## Component-level rules

### Button
- Anatomy: label (required), optional leading/trailing icon, optional loading spinner.
- Variants: `primary` (`color.brand.primary` fill, `color.text.primary` label), `secondary` (`color.surface.raised` fill, `color.text.primary` label, `color.border.subtle` border), `ghost` (transparent fill, `color.text.primary` label), `danger` (`color.brand.danger` fill), `success` (`color.brand.success` fill).
- Sizes: `md` (h=44px, padding-x=`space.6`, font=`font.size.md`), `lg` (h=52px, padding-x=`space.8`, font=`font.size.lg`).
- States — every button must define: default, hover (N/A on touch; use pressed), focus-visible (`color.brand.primary` ring), active/pressed (darken fill by 10%), disabled (`opacity:0.4`, non-interactive), loading (spinner replaces label, button non-interactive), error (border `color.brand.danger`).
- Typography: `font.weight.semibold`, `font.size.md` for md, `font.size.lg` for lg.
- Spacing: icon-to-label gap = `space.3`.
- Keyboard/pointer/touch: pressable with `hitSlop={8}`; haptic feedback via `expo-haptics` (light impact) on press for primary actions.
- Long content: label truncates with ellipsis at 2 lines; if label exceeds container, reduce to icon + truncated label.
- Empty/loading: loading state must disable press and show spinner; must not hide the button bounds (avoid layout shift).

### Input
- Anatomy: label (optional), field, helper text (optional), error text (optional).
- Variants: `default` (`color.surface.raised` fill, `color.border.subtle` border), `error` (`color.brand.danger` border), `disabled` (opacity 0.5), `focused` (`color.brand.primary` border, 2px).
- States: default, focus-visible, filled, error, disabled.
- Typography: label `font.size.sm` `font.weight.medium` `color.text.secondary`; field `font.size.md` `color.text.primary`; helper `font.size.xs` `color.text.tertiary`.
- Spacing: field height 48px, padding-x `space.6`, label-to-field gap `space.3`, field-to-helper gap `space.2`.
- Keyboard/pointer/touch: autofocused fields must show keyboard; return key submits or moves focus per form; numeric keypad for amounts.
- Long content: single-line inputs truncate; multiline inputs expand to max 5 lines then scroll.
- Amount inputs: show currency symbol trailing, right-aligned numerics, decimal separator per locale.

### Card
- Anatomy: container, optional header, body, optional footer.
- Variants: `default` (`color.surface.raised` fill, `radius.lg`, `shadow.2`), `interactive` (adds pressed state + `color.border.strong` on press), `muted` (`color.surface.muted` fill).
- States: default, pressed (interactive only), focus-visible (interactive only), loading (skeleton overlay).
- Typography: title `font.size.lg` `font.weight.semibold` `color.text.primary`; body `font.size.md` `color.text.secondary`.
- Spacing: padding `space.6`; header-to-body gap `space.5`.
- Long content: body scrolls within fixed-height cards; never break card radius.
- Empty state: show centered icon + helper text + optional CTA.

### List
- Anatomy: rows with optional leading avatar/icon, title, subtitle, trailing meta/action.
- Variants: `default` (transparent rows, `color.border.subtle` dividers), `selectable` (pressed state), `grouped` (rows within a card).
- States: default, pressed, focus-visible (selectable), loading (skeleton rows), empty.
- Typography: title `font.size.md` `font.weight.medium` `color.text.primary`; subtitle `font.size.sm` `color.text.secondary`; meta `font.size.xs` `font.family.mono` `color.text.tertiary`.
- Spacing: row height min 56px; padding-y `space.5`; leading-to-content gap `space.5`.
- Long content: titles truncate at 1 line; subtitles truncate at 1 line; meta right-aligned, never wraps.
- Empty state: `color.text.tertiary` helper text centered with icon.

### Navigation (bottom tabs)
- Anatomy: tab bar with 2-4 tabs, each tab has icon + label.
- Variants: `default` (`color.surface.raised` fill, top border `color.border.subtle`).
- States: default (inactive `color.text.tertiary`), active (`color.text.primary` + icon tint `color.brand.primary`), pressed (scale 0.95).
- Typography: label `font.size.xs` `font.weight.medium`.
- Spacing: tab height 56px + safe-area inset; icon-to-label gap `space.1`.
- Touch: min 44x44pt per tab; haptic light impact on switch.
- Overflow: if >4 tabs, the 4th becomes a "More" sheet; never exceed 4 visible.

### Wallet connect
- Anatomy: brand mark, animated connect ring, status label, wallet address (mono), CTA button, network label.
- States: `idle` (ring static, "Connect your wallet"), `connecting` (pulsing ring, "Waiting for signature…"), `connected` (green ring, truncated address, "Continue"), `error` (red ring, "Connection rejected", retry CTA).
- Typography: brand `font.size.3xl` `font.weight.black`; status `font.size.lg` `font.weight.semibold`; address `font.size.sm` `font.family.mono` `color.text.secondary`; network `font.size.xs` `font.family.mono`.
- Motion: ring pulse uses `motion.duration.normal` loop; success transition uses `motion.duration.fast`.
- Accessibility: status text must announce via `accessibilityLiveRegion="polite"`; CTA must be disabled during connecting.

### Payment / send screen
- Anatomy: amount input (large, centered), recipient field (address or QR scan), currency toggle (SOL/USD), send button, balance display.
- States: default, validating (recipient check), insufficient-balance (danger helper), confirming (button loading), confirmed (success sheet), failed (error sheet with retry).
- Typography: amount `font.size.6xl` `font.weight.black` `color.text.primary`; balance `font.size.sm` `color.text.secondary` `font.family.mono`.
- Keyboard: numeric keypad auto-open; decimal precision 9 for SOL.
- Edge cases: amount > balance must disable send and show danger helper; invalid address must disable send.

### Split bill screen
- Anatomy: title input, total amount, participant list (add/remove), per-person breakdown, settle button.
- States: default, adding-participant, editing-amounts, settling (loading), settled (success).
- Typography: total `font.size.4xl` `font.weight.bold`; per-person `font.size.lg` `font.weight.semibold` `color.brand.primary`.
- Edge cases: 0 participants disables settle; custom splits must sum to total or show warning; unpaid participants flagged with `color.brand.warning`.

## Accessibility requirements and testable acceptance criteria
- Every interactive element must have a hit target >= 44x44pt. Pass: measure with accessibility inspector; fail if any target is smaller.
- Focus indicators must be visible on every focusable element. Pass: tab/arrow through every screen and confirm a 2px `color.brand.primary` ring; fail if any focusable element shows no ring.
- Status changes (connecting, confirming, error) must announce via `accessibilityLiveRegion`. Pass: screen reader announces state transitions; fail if silent.
- Text contrast must meet 4.5:1 for body and 3:1 for large text. Pass: audit with contrast checker; fail if any primary text on its background is below threshold.
- Action labels must be descriptive. Pass: every button has a non-generic `accessibilityLabel`; fail if any label is "Button" or empty.

## Content and tone standards
- Amounts: show fiat and crypto together — `$12.50 · 0.08 SOL`.
- Addresses: always truncated with ellipsis — `7xKX...PUKW`; full address available on long-press with copy.
- Status: present tense, confident — "Wallet connected", "Payment sent", "Waiting for signature…".
- Errors: state the problem + next action — "Insufficient balance. Add SOL or lower the amount."
- CTAs: verb-first — "Connect Wallet", "Send SOL", "Split Bill", "Settle Up".
- Empty states: helpful, not apologetic — "No splits yet. Start one to share a bill."

## Anti-patterns and prohibited implementations
- Do not use raw hex values in component code — use semantic tokens via the theme config.
- Do not use `color.text.secondary` for actionable text below 14px.
- Do not use drop shadows designed for light themes — dark surfaces use `shadow.*` (black) and `glow.*` (brand) tokens only.
- Do not introduce one-off spacing or typography values outside the token scales.
- Do not use ambiguous labels like "OK", "Submit", "Click here" — use verb-first descriptive labels.
- Do not ship interactive components without disabled/loading/error states.
- Do not block the UI on a network call without a loading state.
- Do not show raw untruncated wallet addresses in list rows.

## QA checklist
- [ ] All colors reference semantic tokens, not raw hex.
- [ ] Every button defines default, pressed, focus-visible, disabled, loading, error states.
- [ ] Every input defines default, focus, filled, error, disabled states.
- [ ] Hit targets >= 44x44pt on all interactive elements.
- [ ] Focus-visible rings present and visible.
- [ ] Status changes announce via `accessibilityLiveRegion`.
- [ ] Wallet addresses truncated with copy-on-long-press.
- [ ] Amounts show fiat + crypto where relevant.
- [ ] Empty states defined for every list/screen.
- [ ] Haptic feedback on primary actions.
- [ ] No layout shift during loading states.
- [ ] Contrast passes WCAG 2.2 AA.

## Page component density (SwipePay mobile)
- buttons (per screen, max): 3
- cards (per screen, max): 6
- inputs (per screen, max): 4
- list rows (per screen, max): 10
- bottom tabs: 3 (Pay, Splits, Activity)
- top headers: 1 per screen
