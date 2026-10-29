# Contributing to lowyap

Thanks for helping. lowyap is a small beta project built on
[Handy](https://github.com/cjpais/Handy), so a few ground rules:

- **Bugs first.** Open an issue before large changes so we can agree on the approach.
- **One change per pull request**, with tests where practical.
- **Upstream when you can.** Fixes that are not lowyap-specific usually belong in
  [Handy](https://github.com/cjpais/Handy); we pull them in from there.
- **Privacy is a feature.** Do not add telemetry, analytics or new network calls
  without discussion, and update [PRIVACY.md](PRIVACY.md) if data handling changes.

## Setup

See [BUILD.md](BUILD.md) for platform requirements, then:

```bash
bun install
bun run tauri dev
```

## Checks before you open a pull request

```bash
bun run lint && bun run format:check && bun run check:translations
cd src-tauri && cargo fmt --check && cargo test --lib
```

New UI text goes in `src/i18n/locales/en/translation.json`; see
[CONTRIBUTING_TRANSLATIONS.md](CONTRIBUTING_TRANSLATIONS.md) for other languages.

By contributing you agree your work is licensed under the [MIT License](LICENSE).
