# lowyap privacy note

Effective 29 October 2026 · applies to lowyap 0.1.x (desktop app)

**Short version:** your voice never leaves your computer. lowyap has no
accounts, no telemetry, no analytics and no ads. It only goes online for the
things listed below.

## What stays on your device

| Data                                | Where                                                                                                                    | How long                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Microphone audio                    | Captured only while your shortcut is active, transcribed by a local model                                                | Recordings of your last 5 dictations are kept so you can replay them in History. Change this in Settings → History, or delete entries at any time |
| Transcripts                         | Local history database                                                                                                   | Same as above                                                                                                                                     |
| Settings, logs, downloaded models   | App data folder (`%APPDATA%\com.lowyap.desktop` on Windows, `~/Library/Application Support/com.lowyap.desktop` on macOS) | Until you delete them or uninstall                                                                                                                |
| Name of the app you are typing into | Read locally to choose a writing style (per-app tone)                                                                    | Never stored with your text, never sent anywhere                                                                                                  |

lowyap pastes text by briefly using your clipboard, then puts your previous
clipboard content back.

## When lowyap connects to the internet

| Connection                                                                                                                                    | When                                                              | What is sent                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Update check** to GitHub (`github.com/mohdashraf010897/lowyap`)                                                                             | At start-up, unless you turn off update checks in Settings        | A standard web request. GitHub sees your IP address ([GitHub privacy statement](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement)) |
| **Model download** from Hugging Face (`huggingface.co`) or, for two older Whisper models, `blob.handy.computer` (hosted by the Handy project) | Only when you choose to download a speech model                   | A standard file download. No audio or text                                                                                                                              |
| **Optional AI clean-up** with a provider you choose (for example OpenAI, Anthropic, Groq, OpenRouter, or a local server)                      | Off by default. Only after you enable it and add your own API key | The transcript text and your clean-up prompt go to that provider under **your** account and **their** privacy policy. Audio and the app name are never sent             |

Links you click (for example "Help" or the GitHub page) open in your browser.

## Your API keys

If you add an API key for AI clean-up, it is stored **unencrypted** in
`settings_store.json` in the app data folder. Anyone with access to your user
account can read it. Use a key with a spending limit and revoke it if your
computer is shared or lost. Moving keys to the operating system's credential
store is planned.

## Children

lowyap is intended for people aged 18 and over.

## Changes and contact

Changes to this note are listed in the release notes. Questions or concerns:
open an issue at <https://github.com/mohdashraf010897/lowyap/issues>, or
report privately through the repository's **Security → Report a
vulnerability** page.
