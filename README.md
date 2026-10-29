# lowyap™

**Private dictation for your desktop. Press a shortcut, speak, and your words appear in any app. Speech recognition runs on your computer.**

lowyap is a free, open-source (MIT) speech-to-text app. It is in **beta**: Windows x64 is the first supported platform.

> lowyap is an independent project based on [Handy](https://github.com/cjpais/Handy) by CJ Pais (MIT). Not affiliated with or endorsed by Handy, Microsoft or Apple.

## How it works

1. **Press** your shortcut (hold to talk, or tap to start and stop).
2. **Speak.**
3. **Release.** A local model turns your speech into text and lowyap pastes it where your cursor is.

- Audio is processed on your device. No account, no telemetry.
- Choose from several local speech models (Parakeet, Whisper and others), downloaded once.
- Optional per-app tone and optional AI clean-up with your own API key (off by default).

Read the [privacy note](PRIVACY.md) and [terms](TERMS.md).

## Install (Windows x64, beta)

1. Download `lowyap_<version>_x64-setup.exe` and `SHA256SUMS` from the [latest release](https://github.com/mohdashraf010897/lowyap/releases/latest).
2. Check the download (PowerShell):
   ```powershell
   (Get-FileHash .\lowyap_*_x64-setup.exe -Algorithm SHA256).Hash.ToLower()
   ```
   The result must match the line for that file in `SHA256SUMS`.
3. Run the installer. The beta is **not code-signed yet**, so Windows SmartScreen may say "Windows protected your PC". Choose **More info → Run anyway** only if the checksum matched.
4. Open lowyap, download a speech model, pick a shortcut and start dictating.

Updates are signed with lowyap's own update key and delivered through GitHub Releases.

**macOS:** not distributed yet. Developers can build from source (see below); unsigned builds need manual approval in System Settings → Privacy & Security.

## Build from source

See [BUILD.md](BUILD.md). Quick version: install Rust, Bun and the [Tauri prerequisites](https://tauri.app/start/prerequisites/), then:

```bash
bun install
bun run tauri dev
```

## Troubleshooting

Most of Handy's [troubleshooting guide](https://github.com/cjpais/Handy#troubleshooting) applies. Where it mentions Handy's app data folder, use `com.lowyap.desktop` instead (for example `%APPDATA%\com.lowyap.desktop` on Windows). Logs are in `lowyap.log` in the app's log folder.

Found a bug? [Open an issue](https://github.com/mohdashraf010897/lowyap/issues).

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md). Changes that are not lowyap-specific are often better contributed upstream to [Handy](https://github.com/cjpais/Handy).

## License and credits

MIT. See [LICENSE](LICENSE) and [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

lowyap is built on Handy by CJ Pais. Handy's name, logo and brand assets are not part of this project. Thanks also to OpenAI Whisper, NVIDIA Parakeet, ggml, Silero VAD and Tauri.
