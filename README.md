# Academic Website Starter (GitHub Pages + Jekyll)

This is a minimal, production-ready personal website for researchers. It uses:

- **Jekyll** (static-site generator)
- **Minimal Mistakes** (theme via `remote_theme`)
- **jekyll-scholar** (render publications from a BibTeX file)
- **GitHub Actions** (so you can use custom plugins like `jekyll-scholar`)

## Quick start

1. Create a new repo on GitHub named **`<your-github-username>.github.io`**.
2. Download this repo as a ZIP (from ChatGPT) and **upload** its contents into your new GitHub repo.
3. Commit and push (or finish the web upload).
4. Go to **Settings → Pages** and set **Build and deployment** to **GitHub Actions** (if not already).
5. Your site will be available at **https://<your-github-username>.github.io** once the workflow finishes.

## Update your info

- `_config.yml`: set your name, description, scholar URL, and GitHub username.
- `index.md`: fill in your bio and research interests.
- `_bibliography/papers.bib`: export your publications as **BibTeX** and paste them here; the `Publications` page renders automatically.
- `assets/img/`: add a profile photo as `profile.jpg` if you like.
- `assets/cv.pdf`: replace with your CV (and update `cv.md` link if needed).

## Local preview (optional)

If you want to build locally:
```bash
gem install bundler
bundle install
bundle exec jekyll serve
# Open http://127.0.0.1:4000
```

This project uses a GitHub Actions workflow to build Jekyll with custom plugins.
