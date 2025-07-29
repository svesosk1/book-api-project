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
        'goog:chromeOptions': {
            args: [
                `--user-data-dir=/tmp/chrome-user-data-dir-${Math.floor(Math.random() * 1e9)}`,
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--headless=new'
            ]
        }
    }],
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
