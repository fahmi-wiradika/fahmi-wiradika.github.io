# Fahmi's Project Library

Fahmi's Project Library is a personal technical portfolio built with MkDocs and the Material theme. It documents professional, academic, and hands-on assignment work, with project summaries linking to detailed write-ups, implementation notes, and supporting material.

The live site is [fahmi-wiradika.github.io](https://fahmi-wiradika.github.io/).

## Current Documentation

- **Home** introduces the portfolio, groups work by category, and highlights selected projects.
- **Introduction** contains background, professional experience, and certifications.
- **Assignment Projects** covers API development and testing, quality assurance, and relational database exercises.
- **Professional Projects** covers API and performance testing, CI/CD, documentation, mobile automation, web and API automation, and web applications.
- **Academic Projects** presents research on embedded systems, non-intrusive load monitoring, machine learning, and signal processing.

Each project category has an overview page with two-column project cards. Cards show a project category, linked title, short description, and technology tags. Individual project pages hold the fuller technical details.

## Site Features

- Responsive navigation, breadcrumbs, page search, and light/dark theme switching
- A custom homepage with featured project cards
- Project overview cards styled with category-specific badges and technology tags
- Code highlighting and copyable code blocks
- Admonitions and collapsible details for notes, warnings, and extra context
- Tables, tabbed content, footnotes, and cross-references
- Mermaid diagrams, mathematical notation, and image lightboxes
- Automatic publishing to GitHub Pages through GitHub Actions when changes are pushed to `main` or `master`

## Technology

- [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- Python and PyMdown Extensions
- Custom HTML templates and CSS
- GitHub Actions and GitHub Pages

## Repository Structure

```text
.
├── .github/workflows/
│   └── ci.yml                    # Builds and deploys the documentation site
├── docs/
│   ├── index.md                  # Homepage metadata and front matter
│   ├── overrides/
│   │   └── home.html             # Custom homepage layout
│   ├── stylesheets/
│   │   ├── home.css              # Homepage and project card styling
│   │   └── extra.css             # Site-wide styling
│   ├── javascripts/              # Optional site scripts
│   ├── introduction/             # About, experience, certifications, and media
│   └── projects/
│       ├── assignment/            # Assignment overview and detailed projects
│       ├── professional/          # Professional overview and detailed projects
│       └── academic/              # Academic overview and research projects
├── mkdocs.yml                    # Theme, navigation, extensions, and plugins
├── requirements.txt              # Python dependencies
└── README.md
```

The navigation menu is maintained in `mkdocs.yml`. A project page should be added there as well as in the appropriate `docs/projects/` folder. To feature or summarize it on a category overview, update that category's `index.md` too.

## Preview Locally

Requirements: Python 3 and Git.

```bash
git clone https://github.com/fahmi-wiradika/fahmi-wiradika.github.io.git
cd fahmi-wiradika.github.io
pip install -r requirements.txt
mkdocs serve
```

Open the local address printed by MkDocs, usually `http://127.0.0.1:8000/`. The development server reloads pages as documentation and styling files change.

## Publishing

The GitHub Actions workflow in `.github/workflows/ci.yml` runs on pushes to `main` and `master`. It installs the dependencies and publishes the built site to GitHub Pages using `mkdocs gh-deploy`.

## Links

- [Live portfolio](https://fahmi-wiradika.github.io/)
- [GitHub repository](https://github.com/fahmi-wiradika/fahmi-wiradika.github.io)
- [LinkedIn](https://www.linkedin.com/in/fahmi-wiradika/)
- [Postman profile](https://www.postman.com/fahmi-wiradika)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
