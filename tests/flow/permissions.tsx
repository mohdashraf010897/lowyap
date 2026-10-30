// Mounts the returning-user Permissions screen (usePermissions + <Permissions/>)
// in a plain browser as macOS, with the permission plugin, window focus and
// page visibility mocked, so Playwright can drive a grant made in System
// Settings without the Tauri shell, a real TCC prompt or any focus change.
//
// Query params:
//   mic=granted   the microphone starts allowed (default: not yet)
import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { mockIPC, mockWindows } from "@tauri-apps/api/mocks";
import { emit } from "@tauri-apps/api/event";
import { ReturningPermissions } from "@/components/onboarding/StandaloneScreens";
import en from "@/i18n/locales/en/translation.json";
import "@/App.css";

export interface PermissionsHarness {
  /** What macOS answers right now (AXIsProcessTrusted, AVCaptureDevice). */
  accessibility: boolean;
  microphone: boolean;
  /** Invocations per command, e.g. how often Accessibility was requested. */
  calls: Record<string, number>;
  continued: boolean;
  unhandled: string[];
}

declare global {
  interface Window {
    __permissionsHarness: PermissionsHarness;
    /** Window focus, as the Tauri focus/blur events and document.hasFocus(). */
    __setFocused: (focused: boolean) => Promise<void>;
    /** Page visibility; WebKit suspends a hidden window's timers. */
    __setVisible: (visible: boolean) => void;
  }
}

const params = new URLSearchParams(window.location.search);

const harness: PermissionsHarness = {
  accessibility: false,
  microphone: params.get("mic") === "granted",
  calls: {},
  continued: false,
  unhandled: [],
};
window.__permissionsHarness = harness;

let focused = true;
let visible = true;
document.hasFocus = () => focused;
Object.defineProperty(document, "visibilityState", {
  get: () => (visible ? "visible" : "hidden"),
});
window.__setFocused = (next) => {
  focused = next;
  return emit(next ? "tauri://focus" : "tauri://blur");
};
window.__setVisible = (next) => {
  visible = next;
  document.dispatchEvent(new Event("visibilitychange"));
};

(
  window as unknown as { __TAURI_OS_PLUGIN_INTERNALS__: unknown }
).__TAURI_OS_PLUGIN_INTERNALS__ = { platform: "macos" };
mockWindows("main");
mockIPC(
  (cmd) => {
    harness.calls[cmd] = (harness.calls[cmd] ?? 0) + 1;
    switch (cmd) {
      case "plugin:macos-permissions|check_accessibility_permission":
        return harness.accessibility;
      case "plugin:macos-permissions|check_microphone_permission":
        return harness.microphone;
      case "plugin:macos-permissions|request_accessibility_permission":
        return null;
      case "plugin:macos-permissions|request_microphone_permission":
        // The person answers the prompt with Allow.
        harness.microphone = true;
        return null;
      case "initialize_enigo":
      case "initialize_shortcuts":
        return null;
      case "get_available_microphones":
      case "get_available_output_devices":
        return [];
      default:
        harness.unhandled.push(cmd);
        throw new Error(`Unmocked command: ${cmd}`);
    }
  },
  { shouldMockEvents: true },
);

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReturningPermissions
      onComplete={() => {
        harness.continued = true;
      }}
    />
  </React.StrictMode>,
);
