# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Food ordering web app for **De la Nana** — a pop-up pupusa kitchen. Django REST API backend + React/Vite frontend. The project is in early development: the backend has no Django apps yet (only the base project), and the frontend UI has a few landing-page components but no ordering flow.

## Repository Structure

```
django-react-food-ordering/
├── backend/foodordering/       # Django project root
│   ├── foodordering/           # Django settings package
│   │   ├── settings.py
│   │   └── urls.py
│   └── manage.py
├── frontend/                   # CRA-based React (legacy/unused)
├── frontend/frontend/          # Vite-based React (ACTIVE frontend)
│   └── src/
│       ├── App.jsx             # Root component
│       └── components/         # Navbar, Hero, Delivery, Healthy
├── env/                        # Python virtualenv
└── requirements.txt
```

**The active frontend is `frontend/frontend/`** (Vite + React). The outer `frontend/` directory is a Create React App scaffold that is not in use.

## Development Commands

### Backend
```bash
# Activate virtualenv first
source env/bin/activate

# Run dev server
cd backend/foodordering
python manage.py runserver

# Migrations
python manage.py makemigrations
python manage.py migrate

# Run tests
python manage.py test

# Run a single test
python manage.py test myapp.tests.TestClassName.test_method_name
```

### Frontend (Vite)
```bash
cd frontend/frontend
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build
npm run lint      # ESLint
```

## Workflow

- After making any changes, update `handoff.md` at the repo root to reflect what was added, changed, or completed. Do this before or as part of the same commit.
- `handoff.md` is gitignored — it lives locally only.

## Architecture

### Backend
- **Django 5.0.6** with SQLite in development, PostgreSQL planned for production
- `python-decouple` is available for environment-variable management (use `.env` for secrets)
- `rest_framework` is installed in the virtualenv but not yet wired into `INSTALLED_APPS` or `urls.py` — add it when building API endpoints
- CORS headers will be needed when the frontend calls the API (install `django-cors-headers`)
- Planned Django app structure (from notes): `myapp/` with models, serializers, views, and urls

### Frontend
- **Vite + React 18**, no router yet (single-page, anchor-based nav)
- **Bootstrap 5** + **bootstrap-icons** for styling; `react-slick` for carousels
- Component structure: `Navbar` → `Hero` → `Delivery` sections on the landing page
- No API integration yet — all data is static

### Planned features (from README)
- User authentication/authorization
- Menu browsing and order placement
- Email confirmation on order
- AWS deployment
