import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

export default defineConfig({
    // Look for test files in the "tests" directory, relative to this configuration file.
    testDir: 'tests',

    // Run all tests in parallel.
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,

    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,

    // Reporters to use
    reporter: [
        ['list'],
        ['html', {  open: 'always' }]
    ],

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: 'http://127.0.0.1:3000',

        // Collect trace, see with https://playwright.dev/docs/trace-viewer
        trace: 'on',

        // Collect video of tests being run https://playwright.dev/docs/videos
        video: 'on',

        // Custom data test id attribute for saucedemo.com
        testIdAttribute: 'data-test'
    },

    // Configure projects for major browsers.
    projects: [
        {
            name: 'backend',
            use: { ...devices['Desktop Chrome'], headless: true },
            testDir: 'tests/api'
        },
        {
            name: 'frontend',
            use: { ...devices['Desktop Chrome'], headless: process.env.RUN_WITH_UI != 'true'},
            testDir: 'tests/ui'
        },
    ],

    // Folder for test artifacts such as screenshots, videos, traces, etc.
    outputDir: 'test-results',

});