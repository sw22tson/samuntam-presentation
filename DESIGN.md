---
name: Obsidian Editorial
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#90d6a4'
  on-secondary: '#00391c'
  secondary-container: '#04522c'
  on-secondary-container: '#7fc494'
  tertiary: '#ffffff'
  on-tertiary: '#3e2e00'
  tertiary-container: '#ffdf93'
  on-tertiary-container: '#7d6000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#acf3bf'
  secondary-fixed-dim: '#90d6a4'
  on-secondary-fixed: '#00210e'
  on-secondary-fixed-variant: '#04522c'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#f3c022'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-xl:
    fontFamily: Newsreader
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 24px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is anchored in the aesthetic of high-end investigative journalism and premium editorial platforms. It evokes a sense of intellectual depth, authority, and focused calm. By utilizing a "true black" foundation, the UI recedes to prioritize content, while the introduction of specialized accents provides a sophisticated hierarchy for complex information.

The style is a fusion of **Minimalism** and **High-Contrast Editorial**. It relies on masterful typography, generous negative space, and a restrained color application that feels intentional rather than decorative. The target audience includes professionals, researchers, and creators who value clarity, focus, and a "distraction-free" environment that still feels luxurious and bespoke.

## Colors
This design system operates on an absolute black (`#000000`) canvas to maximize the luminance of text and accents. 

- **Primary:** Pure White is used for core content and primary interactions to ensure maximum readability.
- **Secondary (Forest Green):** Reserved for growth, stability, and "Expert" tier information. It signifies organic development and environmental focus.
- **Tertiary (Golden Ochre):** A vibrant yellow-gold (`#fdc92d`) used for critical alerts, high-priority highlights, and active states that require immediate visual attention. It provides a warm, high-energy contrast to the cooler forest tones.
- **Neutrals:** A range of deep charcoals is used to define boundaries and surfaces without breaking the monochromatic depth.

## Typography
Typography is the cornerstone of this design system. We utilize **Newsreader** for headlines to provide a literary, authoritative voice with its distinct serif characteristics. For body text and functional UI, **Geist** provides a clinical, precise, and highly legible sans-serif counterpart.

Headlines should utilize wide margins and asymmetrical placement. For display text, "optical sizing" should be prioritized, ensuring that larger headers feel elegant and thin, while smaller sub-headers maintain structural integrity. Body text utilizes a slightly increased line-height to ensure comfort during long-form reading sessions.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain the "page-like" feel of a physical editorial. A 12-column grid is used with generous gutters to allow content to breathe. 

- **Desktop:** 12 columns, 1200px max-width, centered.
- **Tablet:** 8 columns, fluid with 40px side margins.
- **Mobile:** 4 columns, fluid with 24px side margins.

The spacing rhythm is strictly based on a 4px baseline, with most vertical stacks favoring larger increments (24px, 48px) to reinforce the minimalist aesthetic. Whitespace is treated as a functional element—use it to separate distinct conceptual blocks rather than relying on lines or borders.

## Elevation & Depth
In this design system, depth is conveyed through **Tonal Layers** rather than shadows. Because the background is true black, elevation is represented by subtly lighter charcoal surfaces.

- **Level 0 (Base):** `#000000` (The void)
- **Level 1 (Cards/Containers):** `#0A0A0A` (Subtle lift)
- **Level 2 (Modals/Overlays):** `#141414` (Distinct lift)

To maintain a sharp, editorial feel, use **Low-Contrast Outlines** (`#FFFFFF` at 10% opacity) instead of drop shadows. When a component requires extreme focus, a 1px border using the Forest Green accent can be applied to signify its importance.

## Shapes
The shape language is primarily **Soft** and architectural. We avoid aggressive rounding to maintain a professional and "serious" tone. 

- Standard components (buttons, inputs) use a `0.25rem` (4px) radius.
- Larger containers or feature cards use a `0.5rem` (8px) radius.
- Strictly avoid pill-shapes except for status indicators (chips) that need to be instantly distinguishable from buttons.

## Components
- **Buttons:** Primary buttons are solid White with Black text. Secondary buttons are outlined in Forest Green with Forest Green text. Tertiary actions are plain text with the Golden Ochre accent.
- **Chips:** Small, pill-shaped elements. Use the Golden Ochre background with Black text for urgent categorization and Forest Green for "Featured" or "Premium" status.
- **Inputs:** Minimalist bottom-border style or fully enclosed with a 1px `#1A1A1A` border. On focus, the border transitions to Forest Green.
- **Cards:** Use the Level 1 elevated surface (`#0A0A0A`) with a very thin border. Headlines within cards should always be serif.
- **Diagrams & Highlights:** Use Golden Ochre for alerts, warnings, or "breaking" data points. Use Forest Green for growth trends or "Expert" verification.
- **Text Highlighting:** For inline highlights, use a 20% opacity Forest Green background with a Forest Green bottom-border for maximum editorial impact.