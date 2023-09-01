import { test, expect } from '@playwright/test';
import { signInFromHome } from '../helpers';
import { testCases } from "../testCases.json"
import { username, password } from '../config';


testCases.forEach(testCase => {
    test(testCase.name, async ({ page }) => {

        await test.step('Log In', async () => {
            await page.goto('https://app.asana.com/-/login');
            await signInFromHome(page, username, password);
        }); 

        await test.step('Navigate to board', async () => {
            var leftNavOption = page.getByLabel(testCase.leftNav);
            await expect(leftNavOption, "Left nav bar didn't appear to load properly.").toBeVisible();
            await leftNavOption.click();
        });

        await test.step('Collect and evaluate board information', async () => {
            var column = page
                .locator("div.BoardColumn")
                // this will cause issues if a card on a different column has the same name as the original column name
                // so it could be better, but it feels like they're asking for problems if they start doing that anyway. 
                .filter( {has: page.getByText(testCase.column)});
        
            var boardCard = column
                .locator('div.BoardCard-draggableCard')
                .filter({has: page.getByText(testCase.cardTitle)});

            //this portion of the site is way too slow for a 5 second timeout. Upped it to 30. 
            await expect (boardCard, "Unable to find card with title " + testCase.cardTitle + " within 30 seconds.").toBeVisible( {timeout: 30000});
            const expected_tags = testCase.tags;
            var tags = await boardCard.locator("div.Pill").allTextContents();
        
            //I did have a for loop doing the below line, but I found this method and since it accomplished the same thing
            expect (expected_tags, "Incorrect Tags. Found " + tags + " but expected " + expected_tags).toEqual(expect.arrayContaining(tags));
        });
    })
});