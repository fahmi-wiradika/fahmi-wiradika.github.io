# Fahmi's Project Library 📚

A comprehensive online portfolio showcasing projects, certifications, and professional experience, built with MkDocs Material and deployed automatically via GitHub Actions.

## 🌟 Features

- **Modern Documentation Site**: Built with MkDocs Material theme for a professional, responsive design
- **Automatic Deployment**: CI/CD pipeline using GitHub Actions for seamless updates
- **Project Categorization**: Organized sections for Assignment Projects, Academic Research, and Work Samples
- **Interactive Elements**: Code highlighting, search functionality, and navigation features
- **Dark/Light Theme**: Toggle between themes with custom color schemes
- **Social Integration**: Links to GitHub, LinkedIn, Instagram, and Postman profiles

## 🛠️ Tech Stack

- **Documentation Generator**: [MkDocs](https://www.mkdocs.org/) with [Material Theme](https://squidfunk.github.io/mkdocs-material/)
- **Deployment**: GitHub Actions + GitHub Pages
- **Styling**: Custom CSS with Material Design principles
- **Markdown Extensions**: Enhanced with PyMdown Extensions for advanced formatting
- **Version Control**: Git with automated revision dates

## 🚀 Quick Start

### Prerequisites

- Python 3.x
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/fahmiwazu/docs-portfolio.git
   cd docs-portfolio
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start development server**
   ```bash
   mkdocs serve
   ```

4. **View locally**
   Open your browser to `http://127.0.0.1:8000`

### Making Changes

1. Edit markdown files in the `docs/` directory
2. Modify `mkdocs.yml` for configuration changes
3. Update styles in `docs/stylesheet/extra.css` if needed
4. Commit and push changes - GitHub Actions will handle deployment automatically

## 📁 Project Structure

```
├── .github/workflows/
│   └── ci.yml                 # GitHub Actions workflow
├── docs/
│   ├── index.md              # Homepage content
│   ├── introduction/         # About, experience, certifications
│   ├── projects/             # Project documentation
│   │   ├── assignment/       # freeCodeCamp projects
│   │   ├── academic/         # Research projects (coming soon)
│   │   └── workSample/       # Professional work samples
│   └── stylesheet/
│       └── extra.css         # Custom styling
├── mkdocs.yml                # MkDocs configuration
├── requirements.txt          # Python dependencies
└── README.md                 # This file
```

## 🔧 Configuration

### MkDocs Configuration (`mkdocs.yml`)

Key features configured:
- **Navigation**: Hierarchical menu structure
- **Theme**: Material theme with custom colors and icons
- **Extensions**: Code highlighting, tables, admonitions, diagrams
- **Plugins**: Search, auto-references, git revision dates, lightbox gallery

### Custom Styling

The `docs/stylesheet/extra.css` file contains:
- Custom color schemes for headers, links, and navigation
- Responsive table styling
- Admonition (callout) box formatting
- Image centering utilities

## 🚀 Deployment

### Automatic Deployment (CI/CD)

The repository uses GitHub Actions for automatic deployment:

- **Trigger**: Push to `main` or `master` branch
- **Process**: 
  1. Checkout code
  2. Setup Python environment
  3. Install dependencies
  4. Build and deploy to GitHub Pages
- **Caching**: Weekly cache refresh for faster builds

### Manual Deployment

If needed, you can deploy manually:

```bash
mkdocs gh-deploy --force
```

## 📖 Content Sections

### Introduction
- **About Fahmi**: Personal background and skills
- **Experience**: Professional career journey
- **Certification**: Technical certifications and achievements

### Projects
- **Assignment Projects**: freeCodeCamp certifications
  - Relational Database projects
  - Backend Development & APIs
  - Quality Assurance projects
  - Postman API Test Automation
- **Academic Research**: Bachelor's degree research work
- **Work Samples**: Professional automation tools and scripts

## 🎨 Customization

### Adding New Projects

1. Create a new markdown file in the appropriate `docs/projects/` subdirectory
2. Add the page to the navigation in `mkdocs.yml`
3. Follow the existing documentation structure and formatting

### Modifying Themes

- Update color schemes in `mkdocs.yml` under the `palette` section
- Modify custom CSS in `docs/stylesheet/extra.css`
- Add new icons using Material Design icons

### Extending Functionality

Add new MkDocs plugins in `requirements.txt` and configure them in `mkdocs.yml`

## 📝 Writing Documentation

This portfolio uses extended Markdown with additional features:

- **Code blocks** with syntax highlighting
- **Admonitions** for notes, warnings, and tips
- **Tables** with custom styling
- **Diagrams** using Mermaid
- **Tabbed content** for organized information
- **Footnotes** and cross-references

## 📄 License

This project is licensed under the MIT License. See the repository for full license details.

## 🔗 Links

- **Live Site**: [Fahmi's Project Library](https://fahmi-wiradika.github.io)
- **GitHub Repository**: [docs-portfolio](https://github.com/fahmi-wiradika/fahmi-wiradika.github.io)
- **LinkedIn**: [Fahmi Wahyu Wiradika](https://www.linkedin.com/in/fahmiwiradika96/)
- **Postman**: [API Collections](https://www.postman.com/fahmi-wiradika)

## 📧 Contact

For questions or collaboration opportunities, feel free to reach out through any of the social media links provided in the portfolio.

---

*Built with ❤️ using MkDocs Material and deployed with GitHub Actions*
