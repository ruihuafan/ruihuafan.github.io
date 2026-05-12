# Local Development

This site is a Jekyll site. Run commands from this directory:

```bash
cd /Users/ruihuafan/Documents/Webpage/ruihuafan.github.io
```

Install dependencies:

```bash
bundle install
```

Build once:

```bash
bundle exec jekyll build --trace
```

Preview locally:

```bash
bin/serve
```

Then open:

```text
http://127.0.0.1:4000/
```

If you want live reload and the live reload port is free:

```bash
bin/serve --livereload
```

The main editable files are:

- `index.md` for the homepage
- `notes.md` for the notes index
- `misc.md` for the misc page
- `_mknotes/*.md` for rendered note pages
- `_layouts/default.html` and `_layouts/mknote.html` for layout and CSS
