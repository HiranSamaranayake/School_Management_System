import { test, expect } from '@playwright/test';

test.describe('Login Functions', () => {

  test('user can login with correct credentials', async ({ page }) => {

    await page.goto('/login');

    await page.getByLabel('Email').fill('admin@greenfield.edu.lk');

    await page.getByLabel('Password').fill('demo1234');

    await page.getByRole('button', { name: /login/i }).click();

    await expect(page).toHaveURL(/dashboard/);

    await expect(
      page.getByRole('heading', { name: 'Executive Overview' }).or(page.getByText('Admin Dashboard')).first()
    ).toBeVisible();

  });


  test('wrong password should show error', async ({ page }) => {

    await page.goto('/login');

    await page.getByLabel('Email').fill('admin@greenfield.edu.lk');

    await page.getByLabel('Password').fill('wrongpassword');

    await page.getByRole('button', { name: /login/i }).click();

    await expect(
      page.getByText(/invalid|incorrect|wrong/i).first()
    ).toBeVisible();

  });

});