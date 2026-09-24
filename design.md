# Turing-Express design

Reference for the Turing-Express visual identity, as implemented by this site
(`style.css`, `index.html`, `script.js`). Use it when producing anything branded
Turing-Express: slides, documents, other sites.

## Principles

- Paper and ink. A white page, one dark green, one grey for secondary text and one pale green for panels. No other colours.
- One weight per typeface. Emphasis is expressed with colour, size or typeface, never with bold or italics. `font-synthesis: none` keeps browsers from faking bold or italic.
- Serif titles, grotesque body text. The typewriter-like Droulers face is used only for the bit ribbon.
- Narrow reading column, generous vertical rhythm, no decorative chrome (no shadows, no rounded corners, no gradients).

## Colour

| Token            | Value     | Use                                                      |
| ---------------- | --------- | -------------------------------------------------------- |
| `--paper`        | `#ffffff` | Background, text on accent                               |
| `--ink`          | `#263a2e` | Body text                                                |
| `--accent`       | `#263a2e` | Titles, links, `strong`, list markers, ribbon            |
| `--muted`        | `#565656` | Captions, footer, secondary text                         |
| `--accent-pale`  | `#eef2ef` | Panel backgrounds (contact block, code, quotes)          |

`--ink` and `--accent` currently share the same value. Keep them as separate
tokens: they have different roles, and the accent may diverge later.

Selection is inverted: `--accent` background, `--paper` text.
`theme-color` meta is `#263a2e`.

## Typography

| Role   | Family               | File                               | Fallback                                          |
| ------ | -------------------- | ---------------------------------- | ------------------------------------------------- |
| Titles | Droulers Clarendon   | `fonts/DroulersClarendon-Regular`  | Georgia, "Times New Roman", serif                 |
| Body   | Brut Grotesque Book  | `fonts/Brut_Grotesque-Book`        | system-ui, -apple-system, "Segoe UI", Roboto, sans-serif |
| Ribbon | Droulers             | `fonts/Droulers-Regular`           | monospace                                         |

All three are weight 400 only, shipped as `woff2` for the web (`otf` kept for
desktop use). They are commercial typefaces: check the licence before
redistributing the files (for instance in a public repository).

Titles are antialiased (`-webkit-font-smoothing: antialiased`).

### Scale (web, base 16px)

| Element        | Size    | Line height | Face      | Colour   | Spacing                  |
| -------------- | ------- | ----------- | --------- | -------- | ------------------------ |
| `h1`           | 2.3em   | 1.1         | Clarendon | accent   | 0.9em above              |
| `h2`           | 1.32em  | 1.2         | Clarendon | accent   | 2.85em above, 0.55em below |
| `h3`           | 1.08em  | 1.25        | Clarendon | ink      | 0.25em below             |
| `.lead`        | 1.35em  | 1.42        | Grotesque | ink      |                          |
| body           | 1em     | 1.3         | Grotesque | ink      | 1em between paragraphs   |
| footer         | 0.85em  | 1.55        | Grotesque | muted    |                          |
| `.loco-caption`| 0.9em   |             | Grotesque | muted    |                          |
| `.stack`       | 0.7em   |             | Grotesque | muted    | 4.85em above             |

Below 480px: `h1` 2em, `.lead` 1.22em.

### Inline styles

- `strong`: weight 400, colour accent. It is never bold.
- Links: accent colour, underlined, `text-underline-offset: 0.16em`.
- Ordered list markers: accent colour.

## Layout

- Reading column (`.prose`, footer): `max-width: 560px`, left-aligned, not centred.
- Page padding: `0 2em 0 1.5em` (`0 1em` on mobile).
- Vertical rhythm is built on 2.85em between major sections.
- Panel (`.contact`): `--accent-pale` background, padding `1.5em 1.6em 1.6em`, no border, no radius.

## The locomotive and its ribbon

The signature motif, placed directly under the `h1`: a row of bits trailing
behind a locomotive engraving (`loco.png`, 334×142, transparent background).

```
[0][1][1][0][0][1][0] … [0][1]🚂
```

- The row bleeds out of the text column to the left edge (negative margin equal to the page padding).
- Each bit is a 1.3em-wide cell in Droulers, skewed and flattened: `transform: skewX(-15deg) scaleY(0.7)`.
- `0`: accent background, paper text. `1`: paper background, accent text. Both have a 2px accent border.
- Consecutive identical bits share a border (`border-left: none` on the second one), so runs read as a single band.
- The locomotive is 2.5em high, nudged up by 0.1em, and sits right after the last bit.
- Animation: bits are appended one at a time every 16ms, each fading in over 0.2s. The locomotive is pushed right as the ribbon grows and stops about 100px from the viewport's right edge.
- On the site the bits are random. When the same render must be reproducible (slides shown in several windows, PDF exports), derive the bits from a text instead (for example the UTF-8 bits of the event name).

## Assets

| File               | Content                                     |
| ------------------ | ------------------------------------------- |
| `loco.png`         | Locomotive engraving used in the ribbon     |
| `logo.svg` / `logo.png` | Horizontal logo (1076×276)             |
| `logo_square.png`  | Square logo (480×468)                       |
| `TE_logo_fr.pdf` / `TE_logo_fr.png` | French logo lockup (2010×834) |
| `banner.png`       | Banner (1944×450)                           |
| `favicon.png`, `apple-touch-icon.png` | Greyscale icons (32px, 180px) |
| `oml_lot.png`      | Lot department mark used in the footer      |

## Voice

- French, first person singular, addressing the reader as *vous*.
- Plain and concrete. Each case study follows the pattern context → what was built → "Résultat : …".
- Technical detail (Elixir/BEAM, Phoenix, Nerves) is kept to the end, in small muted text, for readers who want it.

## Derived implementations

- Slidev theme: `code-beam-26-talk-source/theme` maps these tokens onto Slidev (`--te-*` variables). It adds a `Loco` component with deterministic bits, plus `cover` and `end` layouts that carry the ribbon.
