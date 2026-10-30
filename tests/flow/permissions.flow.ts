// Run with: bunx playwright test -c playwright.flow.config.ts permissions
// SV-12: the Permissions screen must see an Accessibility grant made in System
// Settings, while lowyap is unfocused or hidden, within 2 s. Time is Playwright's
// fake clock, so "within 2 s" is exact and a hidden window's suspended timers
// can be modelled by not advancing it.
import { expect, test, type Page } from "@playwright/test";
import type { PermissionsHarness } from "./permissions";

const ACCESSIBILITY_REQUEST =
  "plugin:macos-permissions|request_accessibility_permission";

const harness = (page: Page) =>
  page.evaluate(
    () => structuredClone(window.__permissionsHarness) as PermissionsHarness,
  );
const grantAccessibility = (page: Page) =>
  page.evaluate(() => {
    window.__permissionsHarness.accessibility = true;
  });
const setFocused = (page: Page, focused: boolean) =>
  page.evaluate((f) => window.__setFocused(f), focused);
const setVisible = (page: Page, visible: boolean) =>
  page.evaluate((v) => window.__setVisible(v), visible);

const START = new Date("2026-01-01T00:00:00Z").getTime();

const open = async (page: Page, query = "") => {
  await page.clock.install({ time: START });
  await page.goto(`/permissions.html${query}`);
  await expect(
    page.getByRole("heading", { name: "Two permissions, then you're set" }),
  ).toBeVisible();
  // From here on, time only moves when a test advances it.
  await page.clock.pauseAt(START + 60_000);
};

const allowed = (page: Page) => page.getByText("Allowed", { exact: true });
const continueButton = (page: Page) =>
  page.getByRole("button", { name: "Continue" });

test.afterEach(async ({ page }) => {
  expect((await harness(page)).unhandled).toEqual([]);
});

test("denied, denied, then granted while unfocused: advances within 2 s", async ({
  page,
}) => {
  await open(page);
  await expect(continueButton(page)).toBeDisabled();

  // Microphone first: the prompt is answered with Allow.
  await page.getByRole("button", { name: "Allow" }).first().click();
  await page.clock.runFor(1000);
  await expect(allowed(page)).toHaveCount(1);

  // Accessibility: the person leaves for System Settings.
  await page.getByRole("button", { name: "Allow" }).click();
  await setFocused(page, false);
  await page.clock.runFor(1000);
  await page.clock.runFor(1000);
  await expect(page.getByText("Waiting", { exact: true })).toBeVisible();
  await expect(allowed(page)).toHaveCount(1);

  await grantAccessibility(page);
  await page.clock.runFor(2000);

  await expect(allowed(page)).toHaveCount(2);
  await expect(continueButton(page)).toBeEnabled();
  // Polling only checks: macOS is asked (and may prompt) once.
  expect((await harness(page)).calls[ACCESSIBILITY_REQUEST]).toBe(1);
  await continueButton(page).click();
  expect((await harness(page)).continued).toBe(true);
});

test("a grant made in System Settings without pressing Allow is seen", async ({
  page,
}) => {
  // lowyap already listed (an earlier install): turned on there directly.
  await open(page, "?mic=granted");
  await expect(continueButton(page)).toBeDisabled();
  await setFocused(page, false);
  await page.clock.runFor(1000);

  await grantAccessibility(page);
  await page.clock.runFor(2000);

  await expect(allowed(page)).toHaveCount(2);
  await expect(continueButton(page)).toBeEnabled();
  expect((await harness(page)).calls[ACCESSIBILITY_REQUEST]).toBeUndefined();
});

test("a grant made while the window was hidden shows as soon as it is visible", async ({
  page,
}) => {
  await open(page, "?mic=granted");
  await page.getByRole("button", { name: "Allow" }).click();
  await expect(page.getByText("Waiting", { exact: true })).toBeVisible();
  await page.clock.runFor(1000);

  // System Settings covers lowyap: WebKit suspends its timers, so the fake
  // clock stands still from here on.
  await setFocused(page, false);
  await setVisible(page, false);
  await grantAccessibility(page);
  await setVisible(page, true);

  await expect(allowed(page)).toHaveCount(2);
  await expect(continueButton(page)).toBeEnabled();
});
