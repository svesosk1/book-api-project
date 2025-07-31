import { join } from 'path';

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: [
        './test/**/*.ts'
    ],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': Object.assign(
            process.env.IN_DOCKER ? { binary: '/usr/bin/chromium' } : {},
            {
                args: [
                    '--headless=new',
                    '--disable-gpu',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-dev-shm',
                    '--no-first-run'
                ]
            }
        )
    }],
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        ['chromedriver', {
            chromedriverCustomPath: process.env.IN_DOCKER ? '/usr/bin/chromedriver' : undefined,
            logFileName: 'wdio-chromedriver.log',
            outputDir: 'logs',
            args: ['--silent']
        }]
    ],
    logLevel: 'info',
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
        // No require: rely on autoCompileOpts for ts-node/TypeScript support
    },
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: join(process.cwd(), './tsconfig.json'),
        },
    },
};
