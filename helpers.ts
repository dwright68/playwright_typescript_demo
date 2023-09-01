import { expect } from '@playwright/test';

export async function signInFromHome(page, username, password) {
    var emailInput = page.locator("input.LoginEmailForm-emailInput")
    expect(emailInput).toBeVisible();
    await emailInput.fill(username)
    // await page.keyboard.type(username)
    await page.locator("div.LoginEmailForm-continueButton").click()
    var passwordInput = page.locator("input.LoginPasswordForm-passwordInput")
    expect(passwordInput).toBeVisible()
    await passwordInput.fill(password)
    await page.locator("div.LoginPasswordForm-loginButton").click()
    await expect(page).toHaveURL("https://app.asana.com/0/home/1205366998147150")
}