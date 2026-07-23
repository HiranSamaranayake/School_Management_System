import { test, expect } from '@playwright/test';

test.describe('Student Management', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('/login');

    await page.getByLabel('Email').fill('admin@example.com');

    await page.getByLabel('Password').fill('admin123');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/dashboard/);

  });


  test('admin can add student', async ({ page }) => {

    await page.goto('/students');

    await page.getByRole('button', {
      name: /add student/i
    }).first().click();

    await page.getByLabel('Student Name').fill('Test Student');

    await page.getByLabel('Email').fill(
      'teststudent@example.com'
    );

    await page.getByLabel('Phone').fill('0771234567');

    await page.getByRole('button', {
      name: /save student/i
    }).click();

    await expect(
      page.getByText('Test Student').first()
    ).toBeVisible();

  });

});