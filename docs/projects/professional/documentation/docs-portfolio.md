# Fahmi's Project Library

Fahmi's Project Library is a documentation-led engineering portfolio. It brings personal background, career experience, certifications, and project write-ups into one browsable site. The portfolio is designed to serve two purposes: help visitors quickly understand the range of work, and provide technical records detailed enough to revisit an implementation or research project later.

The project covers both the published content and the documentation system behind it: page organization, custom templates and styling, Markdown authoring features, local development, and automated GitHub Pages deployment.

## Visitor Experience and Content Structure

The site guides visitors from a short introduction toward either a project category or a specific featured project. Navigation remains available across the site, while the overview pages provide a scan-friendly index and individual pages contain the deeper explanation.

| Section | Content and purpose |
|---|---|
| Home | Introduces Fahmi's focus areas, links to project categories, highlights selected work, and provides social/profile links. |
| Introduction | Presents background, work experience, and certifications. Experience and certification pages use supporting images alongside the written history. |
| Assignment Projects | Collects freeCodeCamp and independent exercises in backend APIs, Postman automation, quality assurance, and relational database design. |
| Professional Projects | Groups practical work in API and performance testing, CI/CD, documentation, mobile automation, web/API automation, and web applications. |
| Academic Projects | Documents bachelor research, NILM machine learning, and frequency-domain signal processing. |

This structure separates context from technical detail. A reader can scan the assignment, professional, or academic overview, then open a project page for its setup, design, workflow, results, diagrams, or screenshots. The same project can also be featured on the homepage when it is useful as an entry point to the portfolio.

## Homepage Implementation

The homepage is authored in `docs/overrides/home.html`, which extends Material's `main.html` template. `docs/index.md` supplies the homepage metadata and selects that template. This lets the homepage use a portfolio layout while the rest of the site continues to use Material's standard documentation page structure.

The custom homepage has four sections:

1. **Hero:** States the professional focus areas and summarizes the portfolio's scope. Its calls to action lead to projects and the About page. A canvas and inline script draw the decorative waveform in the background.
2. **Explore by Category:** Shows summary cards for professional work and academic research, with a short explanation and technology/topic tags on each card.
3. **Featured Projects:** Presents six selected projects as cards. Examples include the Playwright MCP framework, Robot Framework Appium, JMeter automation, the embedded NILM research, its PyTorch counterpart, and the full-stack application under test. Each card has a category badge, linked title, subtitle, description, and stack tags.
4. **Connect:** Provides profile links for GitHub, LinkedIn, Test Automation University, and Instagram.

The homepage markup and its styling are kept in separate files. `docs/overrides/home.html` controls the page structure and content; `docs/stylesheets/home.css` controls layout, type, card presentation, tags, hover/focus states, and responsive behavior.

## Project Overview Cards

The assignment, professional, and academic `index.md` files use a shared card pattern based on the homepage spotlight cards. A card contains a category badge, a title linked to the project page, a short context line, a differentiating description, and technology tags. This gives the overview pages a consistent visual language without forcing every project into the same technical narrative.

The project overview grid uses two columns on wider screens and a single column on narrow screens. Category badges have distinct colors, including dark-theme variants. Card styles provide a subtle accent edge, soft background, and hover treatment; descriptive copy remains left-aligned for easier reading. The layout and color behavior are defined in `docs/stylesheets/home.css`.

The card summaries are intentionally shorter than the project documentation. For example, the academic overview distinguishes the embedded STM32 research from the newer Python/PyTorch model, while the detailed pages explain the hardware pipeline and model approaches. The professional overview similarly separates mobile automation, browser/API frameworks, performance testing, CI/CD, and the app used as an automation target.

## Navigation and Source Organization

`mkdocs.yml` is the source of truth for the site's navigation. It maps the top-level sections and their nested categories to Markdown files under `docs/`. Professional pages are organized by subject area—for example, `mobile-automation/`, `web-api-automation/`, `api-testing/`, and `ci-cd/`—rather than collected in one flat directory. Academic and assignment projects follow the same principle, with subfolders for areas such as `research-project/`, `signal-processing/`, `relationalDatabase/`, and `quality-assurance/`.

The repository's main documentation files are:

```text
docs/
├── index.md                         # Homepage metadata and template selection
├── overrides/
│   └── home.html                    # Custom homepage sections and markup
├── stylesheets/
│   ├── home.css                     # Homepage and shared project-card styles
│   └── extra.css                    # General typography and content styling
├── introduction/                    # About, experience, certifications, and images
└── projects/
    ├── assignment/                  # Overview and assignment project pages
    ├── professional/                # Overview and professional project pages
    └── academic/                    # Overview and academic/research pages
```

Keeping navigation explicit makes the reading order predictable and supports Material's section navigation, breadcrumbs, and table of contents. The `autorefs` plugin also supports references between documentation pages.

## Markdown and Presentation Features

This is an MkDocs site rather than a static collection of Markdown files. The Material theme and configured extensions turn the source into a searchable, navigable documentation site:

- **Navigation and discovery:** Material tabs and sections, breadcrumbs/path tracking, page search suggestions, and highlighted search matches.
- **Code examples:** Syntax highlighting, inline code highlighting, line anchors, and copy buttons for code blocks.
- **Structured explanations:** Tables, footnotes, tabbed content, admonitions, and collapsible detail sections.
- **Technical media:** Mermaid diagrams, MathJax-rendered equations, and GLightbox image viewing.
- **Cross-page context:** Table-of-contents links and automatic references between pages.
- **Theme modes:** Material's light and dark schemes, with project badge colors adjusted to remain visible in dark mode.

The Markdown extensions and plugins are configured in `mkdocs.yml`. MathJax and Mermaid are loaded as extra JavaScript assets there; GLightbox, search, and automatic references are enabled as MkDocs plugins.

## Styling and Theme Configuration

`mkdocs.yml` selects Material for MkDocs, defines the light and dark palettes, fonts, navigation features, social links, and the custom template directory. It loads two stylesheets:

- `docs/stylesheets/home.css` contains the custom homepage and project card system.
- `docs/stylesheets/extra.css` adjusts general document presentation, including paragraph alignment and table-related styles.

The custom CSS is scoped with project-specific class names such as `hp-spotlight-card`, `hp-project-grid`, and `hp-badge--…`. Reusing these classes lets the homepage and overview indexes share card behavior, while page-specific selectors can tune the overview grid without changing unrelated Material components.

## Local Development and Publishing

The Python dependencies are listed in `requirements.txt`. To run the documentation locally:

```bash
pip install -r requirements.txt
mkdocs serve
```

MkDocs serves a local preview and rebuilds as source files change. The GitHub Actions workflow at `.github/workflows/ci.yml` runs on pushes to `main` and `master`. It checks out the repository, sets up Python, caches MkDocs assets, installs the requirements, and publishes the generated site using `mkdocs gh-deploy --force`.

## Adding or Updating a Project

1. Write the detailed project page in the relevant `docs/projects/` subfolder.
2. Add the page to the appropriate section of `nav` in `mkdocs.yml`.
3. Add a summary card to the category's `index.md`, using an existing card as the structural reference. Link the title to the detailed page and choose a category badge class defined in `home.css`.
4. Update the homepage spotlight cards in `docs/overrides/home.html` only when the project should be featured there as well.
5. Preview with `mkdocs serve` and check the page at desktop and narrow viewport widths, as well as in both theme modes.

This workflow keeps the overview, navigation, and detailed page connected, avoiding orphaned project documentation and stale card links.

## Technology

- [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- Python and [PyMdown Extensions](https://facelessuser.github.io/pymdown-extensions/)
- Custom HTML template, CSS, and JavaScript
- GitHub Actions and GitHub Pages

## Links

- [Live portfolio](https://fahmi-wiradika.github.io/)
- [Source repository](https://github.com/fahmi-wiradika/fahmi-wiradika.github.io)
- [LinkedIn](https://www.linkedin.com/in/fahmi-wiradika/)
- [Test Automation University](https://testautomationu.applitools.com/me.html#fahmi-wiradika)
