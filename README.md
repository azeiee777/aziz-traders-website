# Aziz Traders Website

Production-ready static website structure for Aziz Traders.

## Project Structure

```text
.
├── .htaccess
├── index.html
├── robots.txt
├── assets
│   ├── css
│   │   └── main.css
│   ├── images
│   │   ├── hero-wood.jpg
│   │   ├── product-doors.jpg
│   │   ├── product-hardware.jpg
│   │   ├── product-interior.jpg
│   │   ├── product-laminates.jpg
│   │   ├── product-paints-alt.jpg
│   │   ├── product-paints.jpg
│   │   └── product-plywood.jpg
│   └── js
│       ├── main.js
│       ├── tailwind-config.js
│       └── utils.js
└── utils
    └── validate-static.sh
```

## Quick Validation

Run before deployment:

```bash
./utils/validate-static.sh
```

It checks:
- local `./assets/...` references in `index.html`
- missing files
- accidental leftover external Unsplash image URLs

## Deployment Package

A ready upload archive is available at:

`release/aziz-traders-site.zip`
