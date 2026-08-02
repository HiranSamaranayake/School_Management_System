import { test, expect } from '@playwright/test';

test.describe('Student Attendance, Identity & Profile Photo Management', () => {

  test('student dashboard displays Hiran Samaranayake, allows profile photo upload, and attendance is read-only', async ({ page }) => {
    await page.goto('/login');

    // Click Student role preset button
    await page.getByRole('button', { name: 'Student' }).click();
    await page.getByRole('button', { name: /login/i }).click();

    // Verify redirected to student dashboard
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByText('Student Portal: Hiran Samaranayake')).toBeVisible();

    // Test profile photo upload option exists
    await expect(page.getByText(/upload profile photo|change profile photo/i)).toBeVisible();

    // Navigate to Attendance
    await page.goto('/attendance');
    await expect(page).toHaveURL(/attendance/);

    // Verify header and student name
    await expect(page.getByText('My Attendance Register')).toBeVisible();
    await expect(page.getByText('Hiran Samaranayake').first()).toBeVisible();

    // Verify Read-Only controls
    await expect(page.getByText('Read-Only Student Access')).toBeVisible();
    await expect(page.getByRole('button', { name: /submit attendance/i })).not.toBeVisible();
    await expect(page.getByRole('button', { name: /mark all present/i })).not.toBeVisible();
  });

  test('teacher can view full attendance register and submit batch attendance', async ({ page }) => {
    await page.goto('/login');

    // Click Teacher role preset button
    await page.getByRole('button', { name: 'Teacher' }).click();
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page).toHaveURL(/dashboard/);

    // Navigate to Attendance
    await page.goto('/attendance');

    // Verify teacher controls exist
    await expect(page.getByRole('button', { name: /submit attendance/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /mark all present/i })).toBeVisible();
  });

});
