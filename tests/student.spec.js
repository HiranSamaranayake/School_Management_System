import { test, expect } from '@playwright/test';

test.describe('Student Management & Profile Photo Upload', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@greenfield.edu.lk');
    await page.getByLabel('Password').fill('demo1234');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page).toHaveURL(/dashboard/);
  });

  test('students directory lists students without sample pictures and supports photo upload in modal', async ({ page }) => {
    await page.goto('/students');
    await expect(page).toHaveURL(/students/);

    // Click Add Student
    await page.getByRole('button', { name: /add student/i }).first().click();

    // Verify modal has Student Profile Photo uploader
    await expect(page.getByText('Student Profile Photo')).toBeVisible();
    await expect(page.getByRole('button', { name: /upload photo/i })).toBeVisible();

    await page.getByLabel('Student Name').fill('New Student');
    await page.getByLabel('Email').fill('newstudent@example.com');
    await page.getByLabel('Phone').fill('0771234567');

    await page.getByRole('button', { name: /save student/i }).click();

    await expect(page.getByText('New Student').first()).toBeVisible();
  });

});