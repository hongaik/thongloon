# Thong Loon Tan â€” personal portfolio

A responsive, static portfolio for GitHub Pages. No framework, package install, build step, or backend required. Open `index.html` directly, or preview with `python -m http.server 8080` and visit http://localhost:8080.

## Publish to GitHub Pages

1. Push these website files to your GitHub repository, preserving the `assets/` directory.
2. In the repository's **Settings â†’ Pages**, select **Deploy from a branch**.
3. Choose your branch (usually `main`) and **/ (root)**, then save.

Relative asset links work for both `username.github.io` repositories and project pages under `username.github.io/repository/`. `.nojekyll` enables direct static serving. The source PDF and temporary files are ignored by Git and are not needed for deployment.

## Edit content

- `index.html`: biography, projects, career history, education and contact details.
- `styles.css`: colors, responsive layouts and reduced-motion support.
- `script.js`: the three interactive workspace panels, including keyboard navigation.
- `check.mjs`: dependency-free interaction and local-link check; run `node check.mjs`.

Career content is based on the supplied LinkedIn PDF. Recent CPF Board appointments take priority. The PDF does not describe projects or measured outcomes for those roles, so none are invented. The two detailed projects are explicitly dated historical examples. Routine certifications are omitted. Review the current-role dates when updating the page.

## Credits

Theme: Pokémon field guide with a Pokédex-inspired career explorer, Pokémon companions and career types. The initial reference was https://munderdiffl.in/; the theme was changed at the user’s request. No source code copied.

Pokémon artwork is downloaded from the PokeAPI sprites repository and served locally. Ownership and source attribution are recorded in `assets/ATTRIBUTION.md` and the page footer. This is an unofficial fan-themed portfolio. Google Fonts supplies DM Sans and Space Grotesk, with system sans-serif fallbacks if unavailable.
