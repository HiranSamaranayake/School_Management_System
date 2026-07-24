const { test, expect } = require('@playwright/test');

test.describe('Examination Management', () => {
  test('user can create a new examination', async ({ page }) => {
    await page.goto('/login');

    // Login as Admin
    await page.getByLabel('Email').fill('admin@greenfield.edu.lk');
    await page.getByLabel('Password').fill('demo1234');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/dashboard/);

    // Navigate to Examinations page
    await page.goto('/examinations');

    // Click Create Examination button
    await page.getByRole('button', { name: /create examination/i }).first().click();

    // Verify modal is open
    await expect(page.getByText('Schedule / Create New Examination')).toBeVisible();

    // Fill form
    await page.getByLabel('Examination Title').fill('Annual Final Term 2026');

    // Click submit with exact match
    await page.getByRole('button', { name: 'Create Examination', exact: true }).click();

    // Verify new exam card is rendered
    await expect(page.getByText('Annual Final Term 2026').first()).toBeVisible();
  });
});
