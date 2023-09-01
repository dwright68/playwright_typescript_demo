# playwright_typescript_demo

## Goals
Our main goal was to write one parametrized test that could perform nearly the same steps, with the only difference being the data provided. For example, one test validates that certain tags are present on the Work Requests board, while the other checks for different tags on the Project Plan board. 

The main way I set about doing this was by first writing a test with one set of data hard-coded. Once I was able to confirm that the test was consistently working on all browsers, I started work on parametrizing the test. This part wasn't bad. I had the test pull in a JSON object with all the test parameters from a file at the root of the directory, then changed the hard-coded values to the parameters in question. At that point, I used a forEach loop to iterate on the JSON object and generate the tests from there.

## Challenges
My initial implementation of this did have a for loop that iterated on each tag and checked if it was a required tag. I realized this was an issue because the test would fail if an incorrect tag was present, but it didn't validate that all the required tags were present. The solution I found for this removed the need for looping on the tags entirely. Using the arrayContaining method, I am able to compare the array of tags supplied in the testCases object against the array of tags pulled in using the allTextContents methods.

## Results and Further Test Suggestions
There is an HTML report in this repo that can be viewed to see all the test results. I also have a results file uploaded where I forced failures just to show how the report appears when there are failures. 

In the limited scope of testing the cards and how their tags appear on the board, I can't think of many other suggestions or changes. If different accounts get different permission levels, it may be worth parametrizing user accounts and validating visibility there. 

## Bonus: Reporting
This may be a little out of the spirit of things, but I found that Playwright's built in HTML reporter was more than enough for the scope of this testing, provided tests are named well and assertions are clear.  This also means folks won't have to do any more legwork once they have Playwright installed. See screenshots below for examples of failure reporting.
![failures](https://github.com/dwright68/playwright_typescript_demo/assets/88564212/e15442d3-3ef6-4a5f-a826-7a61c2898aeb)

![failure_detail](https://github.com/dwright68/playwright_typescript_demo/assets/88564212/2b09af1e-851d-4496-8c03-f1b46fcc1426)
