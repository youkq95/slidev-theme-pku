---
theme: ./
title: From Questions to Evidence
subtitle: A practical guide to reproducible research
date: September 2026
presenter: Alex Morgan
supervisor: Research Methods Group
unit: Example Institute
discipline: Data and Society
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
themeConfig:
  schoolName: Example Institute
  schoolNameEn: EXAMPLE INSTITUTE
---

# From Questions to Evidence

<!-- The cover reads its title and optional metadata from frontmatter. -->

---
layout: toc
hideInToc: true
tocTitle: Contents
tocEn: SECTIONS
---

<!-- The table of contents is collected from the titles on the following slides. -->

---
layout: section
title: Frame the question
hideInToc: true
---

<!-- Section numbers are calculated automatically. -->

---
title: Start with a question you can test
footnote: Illustrative guidance; replace this note with your own citation.
---

A useful research question connects a real observation to an outcome that can be measured.

- Define the population, setting, or system you want to understand.
- Name the change or comparison that would count as evidence.
- State what would make the result uncertain or inconclusive.

The clearer the question, the easier it is to choose an appropriate method.

---
layout: two-cols
title: A transparent workflow
leftWidth: 44
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

---
title: Make uncertainty visible
footnote: Illustrative values for documentation purposes.
---

| Measure | Baseline | Pilot | Change |
| --- | ---: | ---: | ---: |
| Response rate | 62% | 71% | +9 pp |
| Median time | 18 min | 14 min | −4 min |
| Missing values | 11% | 6% | −5 pp |

Report the estimate and the context around it. A single number is not the whole result.

---
layout: section
title: From results to decisions
hideInToc: true
---

---
title: Turn evidence into a decision
---

1. Lead with the finding that changes what someone should do.
2. Show the smallest amount of supporting evidence needed to trust it.
3. Make the next experiment or review point explicit.

> A conclusion is useful when another person can check it, challenge it, and build on it.

---
title: Keep the next step small
---

```ts
const nextStep = {
  question: 'What should we learn next?',
  owner: 'The project team',
  deadline: 'Next review',
}
```

Small, named actions turn a presentation into a shared plan.

---
layout: thanks
hideInToc: true
title: Thank you
---

<!-- Replace the closing message, image, and institution name in frontmatter as needed. -->
