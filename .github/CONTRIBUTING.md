# Contributing

Thanks for helping improve AristoBadges.

## Quick Start

```bash
yarn install
yarn dev
```

Open:

```
http://localhost:3000/en-gb
```

## Pull Requests

- Keep changes focused and small.
- Add or update translations if you introduce UI copy.
- Ensure new API changes keep cache headers intact.
- Prefer explicit error handling for external API calls.

## Commit Style

Clear and descriptive commit messages are preferred.

## Code Style

- Use SCSS BEM for component styles.
- Use `useConfig` and `useTranslation` for all UI strings and URLs.
- Avoid default exports inside `components/`.

## Reporting Issues

Please include:

- Steps to reproduce
- Expected vs. actual behavior
- Screenshots or logs if relevant
