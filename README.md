# slidev-theme-pku

An academic presentation theme for [Slidev](https://sli.dev) with a restrained red accent, structured title bars, and reusable layouts for research talks, seminars, and thesis defenses.

The theme keeps the original PKU-inspired vector seal and wordmark as its built-in artwork. You can replace the seal, logo, name, colors, and photography through frontmatter, so the layouts can also be used for another institution or an unbranded presentation.

## Features

- A cover layout with an image, title, date, and presenter information
- Reusable default and two-column content layouts with an optional footer
- An automatically generated, clickable table of contents
- Section divider slides with automatic part numbering
- A closing/thanks layout with optional photography
- Theme colors, typography, branding, and artwork controlled from frontmatter
- Vector assets that stay sharp in browser previews and exported PDFs

## Installation

Install the theme in a Slidev project:

```bash
npm install slidev-theme-pku
```

Then select it in the first slide's frontmatter:

```md
---
theme: pku
---
```

When developing this repository, use `theme: ./` instead. See the [Slidev theme guide](https://sli.dev/guide/theme-addon#use-theme) for the complete theme workflow.

## Quick start

The following is enough to create a branded cover. Every field except `title` is optional.

```md
---
theme: pku
layout: cover
title: From Questions to Evidence
subtitle: A practical guide to reproducible research
date: September 2026
presenter: Alex Morgan
supervisor: Research Methods Group
unit: Example Institute
discipline: Data and Society
themeConfig:
  schoolName: Example Institute
  schoolNameEn: EXAMPLE INSTITUTE
---
```

The repository's [example.md](./example.md) is a small, topic-neutral deck that demonstrates every layout without depending on a particular research project.

## Layouts

| Layout | Purpose |
| --- | --- |
| `cover` | Opening slide with an optional image and metadata |
| `default` | General content slide; used when no layout is specified |
| `two-cols` | Content slide split into adjustable left and right columns |
| `toc` | Clickable table of contents collected from slide titles |
| `section` | Part divider with an automatically numbered section label |
| `thanks` | Closing slide with a message and optional side strip |

### `cover`

The cover reads its title from `title` and can display these optional values:

```md
---
layout: cover
title: A Clear Research Question
subtitle: From observation to experiment
date: September 2, 2026
presenter: Alex Morgan
supervisor: Research Methods Group
unit: Example Institute
discipline: Data and Society
coverImage: /images/cover.jpg
---
```

Use `info` when you need complete control over the metadata rows. Labels before the first colon are rendered in bold and the rows are split into two columns:

```yaml
info:
  - Speaker: Alex Morgan
  - Contact: alex@example.org
  - Event: Annual Research Forum
```

Set `noImage: true` or `noInfo: true` to hide the corresponding area. A `coverImage` path beginning with `/` is resolved relative to the Slidev base URL; keep project images in `public/`.

### `default`

Use `default` for regular content. The title comes from frontmatter and is rendered in the title bar:

```md
---
layout: default
title: What makes a question useful?
footnote: Replace this note with a citation or data source.
---

- It names an observable outcome.
- It can be investigated with the available evidence.
- It makes the scope and uncertainty explicit.
```

If `title` is omitted, the first `#` heading in the slide is styled as the title instead. The optional footer flags are:

| Flag | Effect |
| --- | --- |
| `noLogo` | Hide the logo in the upper-right corner |
| `noFooter` | Hide the complete footer |
| `noPageNum` | Keep the footer line but hide the page number |
| `noLine` | Keep the footnote/page number but hide the line |

### `two-cols`

Use Slidev's named blocks to populate the columns. Unnamed content and `::left::` content are rendered in the left column; `::right::` content is rendered in the right column.

```md
---
layout: two-cols
title: A transparent workflow
leftWidth: 42
---

::left::

### Plan

1. Define the question.
2. Record the assumptions.
3. Choose a measurable outcome.

::right::

### Share

- Keep the raw inputs.
- Version the analysis.
- Publish the limitations with the result.
```

`leftWidth` is a percentage and defaults to `50`.

### `toc`

The table of contents collects `title` values from later slides. Slides marked with `hideInToc: true`, plus `cover`, `toc`, `section`, and `thanks` slides, are excluded automatically.

```md
---
layout: toc
hideInToc: true
tocTitle: Contents
tocEn: CONTENTS
---
```

`tocTitle` defaults to `Contents`; `tocEn` defaults to `CONTENTS`.

Use `noSeal: true` to hide the seal. The default list can be replaced with a slot; the slot receives the computed `items` array (`{ page, title, level }[]`). A slide can use `level: 2` for a smaller indented entry.

### `section`

Section slides display a red divider band, the institution mark, and a `PART n` label. The number is calculated from earlier section slides unless `part` is supplied explicitly:

```md
---
layout: section
title: From results to decisions
part: 2
hideInToc: true
---
```

Use `section` instead of `title` when you want to keep the slide title available for another purpose. `noLogo: true` hides the mark on this layout.

### `thanks`

The closing layout defaults to `Thank you` and includes a narrow side strip. Customize it as follows:

```md
---
layout: thanks
title: Questions and discussion
thanksImage: /images/closing.jpg
schoolNameEn: EXAMPLE INSTITUTE
---
```

Set `noStrip: true` for a text-only closing slide.

## Branding and theme configuration

Put global values in the first slide's `themeConfig`. Slidev exposes color keys as `--slidev-theme-<key>` CSS variables, while the layout and component code reads the branding keys directly.

```yaml
themeConfig:
  primary: '#9A0001'
  sealColor: '#7D0001'
  logoColor: '#9A0001'
  text: '#222A35'
  textSecondary: '#515862'
  line: '#A6A6A6'
  hairline: '#C6CAD1'
  bg: '#FFFFFF'
  schoolName: Example Institute
  schoolNameEn: EXAMPLE INSTITUTE
```

The built-in vector artwork is used when no custom asset is provided. Replace it for another institution:

```yaml
themeConfig:
  seal: /branding/seal.svg
  logo: /branding/logo.svg
  schoolName: Example Institute
  schoolNameEn: EXAMPLE INSTITUTE
```

`seal` replaces the circular mark. `logo` replaces the complete horizontal logo. If `logo` is omitted and `schoolName` is set, the theme combines the custom seal with text instead of using the built-in wordmark. Set `noLogo: true` on a slide when the mark is not appropriate. Paths beginning with `/` should point to files in your project's `public/` directory.

For one-off color changes, a project-level `styles.css` can override the variables directly:

```css
:root {
  --slidev-theme-primary: #1f5f8b;
  --slidev-theme-text: #1f2933;
}
```

### Fonts

Body text uses `Arial, Helvetica, Microsoft YaHei, PingFang SC, Noto Sans SC`. Browsers select the first font that contains each glyph, so Latin text uses Arial (or Helvetica) while Chinese text falls back to Microsoft YaHei. Override the stack in your project stylesheet when you need a different typeface:

```css
.slidev-layout {
  font-family: Arial, Helvetica, 'Microsoft YaHei', sans-serif;
}
```

## Components

The following components are available in any slide:

| Component | Props | Purpose |
| --- | --- | --- |
| `<PkuSeal />` | `size`, `seal` | Circular seal or custom image |
| `<PkuLogo />` | `size`, `logo`, `seal` | Horizontal logo/wordmark |
| `<PkuTitleBar />` | `title` | Title and accent rule |
| `<PkuFooter />` | `footnote`, `noPageNum`, `noLine` | Footnote, rule, and page number |
| `<PkuClouds />` | `width`, `opacity` | Decorative vector pattern |

Example:

```md
<PkuTitleBar title="A reusable title bar" />
<PkuSeal :size="96" />
<PkuClouds :width="320" :opacity="0.2" />
```

`PkuFooter` also exposes a `footnote` slot when the footnote needs richer markup.

## Development

```bash
npm install
npm run dev      # preview example.md
npm run build    # build a static site from example.md
npm run export   # export the example deck
```

The PDF exporter is powered by Playwright. If `npm run export` reports that Playwright is missing, install it once with `npm install -D playwright-chromium`.

The main project areas are:

```text
layouts/          Slidev layouts
components/       Reusable Vue components
styles/           Theme CSS and Slidev style entrypoint
assets/           Built-in images and vector artwork
example.md        Topic-neutral preview deck
layout-helper.ts  Shared frontmatter and asset helpers
```

When changing a layout, preview `example.md` in the browser and run `npm run build` before submitting a change.

## Publishing and Slidev gallery listing

The package is unscoped, so the first release can be published publicly with:

```bash
npm pack --dry-run
npm publish --access public
```

The npm account may require a one-time password or a granular access token with publish permission. A package name and version cannot be reused after a successful publication; bump `version` before each subsequent release.

Publishing to npm does not automatically add a theme to Slidev's gallery. After the package and repository are public, submit a pull request to [Slidev's theme registry](https://github.com/slidevjs/slidev/blob/main/docs/.vitepress/themes.ts) with a `ThemeInfo` entry containing the package id, description, repository, author, tags, and public preview image URLs. Keep preview images in this repository (or another stable public host) so the gallery can render them reliably.

## Design references

The layout organization and documentation style were informed by the [Slidev default theme](https://github.com/slidevjs/themes/tree/main/packages/theme-default), [slidev-theme-academic](https://github.com/alexanderdavide/slidev-theme-academic), [slidev-theme-hep](https://github.com/AvencastF/slidev-theme-hep), the [Slidev theme gallery](https://sli.dev/resources/theme-gallery), and Slidev's [theme registry](https://github.com/slidevjs/slidev/blob/main/docs/.vitepress/themes.ts).

## License

MIT. See [LICENSE](./LICENSE).
