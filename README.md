# lowyap™

**Private dictation for your desktop. Press a shortcut, speak, and your words appear in any app. Speech recognition runs on your computer.**

lowyap is a free, open-source (MIT) speech-to-text app. It is in **beta**: Windows x64 is the first supported platform.

> lowyap is an independent project based on [Handy](https://github.com/cjpais/Handy) by CJ Pais (MIT). Not affiliated with or endorsed by Handy, Microsoft or Apple.

## How it works

1. **Press** your shortcut (hold to talk, or tap to start and stop).
2. **Speak.**
3. **Release.** A local model turns your speech into text and lowyap pastes it where your cursor is.

- Audio is processed on your device. No lowyap account, no telemetry.
- Choose from several local speech models (Parakeet, Whisper and others), downloaded once.
- Optional per-app tone and AI clean-up are off by default. They use a local LLM server or your own API key; with an API key, transcript text is sent to your chosen provider.

Read the [privacy note](PRIVACY.md) and [terms](TERMS.md).

## Install (Windows x64, beta)

1. Download `lowyap_<version>_x64-setup.exe` and `SHA256SUMS` from the [latest release](https://github.com/mohdashraf010897/lowyap/releases/latest).
2. Check the download (PowerShell):
   ```powershell
   (Get-FileHash .\lowyap_*_x64-setup.exe -Algorithm SHA256).Hash.ToLower()
   ```
   The result must match the line for that file in `SHA256SUMS`.
3. Run the installer. **lowyap for Windows is not code-signed yet**, so Windows SmartScreen may say _"Windows protected your PC."_ That warning means the publisher is unverified, not that a virus was found. If the checksum matched, click **More info → Run anyway**.
4. Open lowyap, download a speech model, pick a shortcut and start dictating.

> **Smart App Control:** if Smart App Control is on in Windows 11, Windows will block lowyap until our signed build is ready. Watch this repository to be notified.

Only download lowyap from [this repository's releases](https://github.com/mohdashraf010897/lowyap/releases). Updates are signed with lowyap's own update key and delivered through GitHub Releases. lowyap is provided "as is", without warranty (see [LICENSE](LICENSE)).

**macOS:** not distributed yet. Developers can build from source (see below). An unsigned build is blocked on first launch; open it once from **System Settings → Privacy & Security → Open Anyway**. Never disable Gatekeeper globally.

### What works offline and what needs an AI provider

| Feature                                           | Offline                                            | Needs                                                                                                                         |
| ------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Dictation (speech to text)                        | Yes                                                | A downloaded speech model                                                                                                     |
| Per-app tone and AI clean-up on Windows and Linux | Only with a local LLM server                       | A local LLM server such as [Ollama](https://ollama.com), or your own API key (OpenAI, Anthropic, Groq, OpenRouter and others) |
| Per-app tone and AI clean-up on Mac               | Yes, on Apple Silicon Macs with Apple Intelligence | Apple Intelligence turned on, or one of the options above                                                                     |

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
