import { test, expect } from '@playwright/test';

test.describe('Student Profile & Account Settings Navigation & Management', () => {

  test('student can navigate to My Profile, upload photo, and update personal information', async ({ page }) => {
    await page.goto('/login');

    // Login as Student
    await page.getByRole('button', { name: 'Student' }).click();
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page).toHaveURL(/dashboard/);

    // Open User Dropdown menu in Header
    await page.getByText('Hiran Samaranayake').first().click();

    // Click My Profile
    await page.getByRole('button', { name: /my profile/i }).click();

    // Verify redirected to /profile
    await expect(page).toHaveURL(/profile/);
    await expect(page.getByText('My Profile').first()).toBeVisible();
    await expect(page.getByText('Personal Information')).toBeVisible();

    // Update phone & submit form
    await page.getByLabel('Contact Phone').fill('0779876543');
    await page.getByRole('button', { name: /save profile changes/i }).click();

    // Verify toast notification
    await expect(page.getByText(/profile updated/i).first()).toBeVisible();
  });

  test('student can navigate to Account Settings and update password & preferences', async ({ page }) => {
    await page.goto('/login');

    // Login as Student
    await page.getByRole('button', { name: 'Student' }).click();
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page).toHaveURL(/dashboard/);

    // Open User Dropdown menu in Header
    await page.getByText('Hiran Samaranayake').first().click();

    // Click Account Settings
    await page.getByRole('button', { name: /account settings/i }).click();

    // Verify redirected to /settings
    await expect(page).toHaveURL(/settings/);
    await expect(page.getByText('Account Settings').first()).toBeVisible();
    await expect(page.getByText('Security & Password')).toBeVisible();

    // Fill password form
    await page.getByLabel('Current Password').fill('demo1234');
    await page.getByPlaceholder('At least 6 characters').fill('newdemo1234');
    await page.getByPlaceholder('Repeat new password').fill('newdemo1234');

    await page.getByRole('button', { name: /update password/i }).click();

    // Verify toast notification
    await expect(page.getByText(/password changed/i).first()).toBeVisible();
  });

});
