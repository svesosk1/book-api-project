# WDIO API Project

![CI](https://github.com/svesosk1/book-api-project/actions/workflows/ci.yml/badge.svg)

API automation tests for Books and Authors API using WebdriverIO, TypeScript, axios, and Allure.

## Features
- **TypeScript** for type safety and maintainability
- **WebdriverIO** (v8) for test running and reporting
- **Mocha** as the test framework
- **axios** for HTTP requests
- **Allure** for beautiful test reports
- **GitHub Actions** for CI/CD (runs tests and uploads Allure report on every push/PR)

## Getting Started

### Prerequisites
- Node.js v20+
- npm v9+

### Install dependencies
```sh
npm ci
```

### Run tests
```sh
npm run book-store-test
```

### Generate and open Allure report
```sh
npm run allure:report
```

## Project Structure
```
wdio-api-project/
├── test/                  # API test specs (TypeScript)
├── utils/                 # API client and helpers
├── wdio.conf.ts           # WebdriverIO config
├── tsconfig.json          # TypeScript config
├── package.json           # NPM scripts and dependencies
├── .github/workflows/     # GitHub Actions CI/CD
└── .gitignore
```

## CI/CD
- On every push or PR to `main`, GitHub Actions will:
  - Install dependencies
  - Run all tests
  - Generate and upload the Allure report as an artifact

## Customization
- Update the API base URL in `utils/apiClient.ts` if needed.
- Add more test specs in the `test/` folder.

## Badges
Add this badge to your README after pushing to GitHub (replace `YOUR_USER` and `YOUR_REPO`):

```
![CI](https://github.com/YOUR_USER/YOUR_REPO/actions/workflows/ci.yml/badge.svg)
```

---

**Author:** [Your Name]

---

*Happy testing!*

<!-- Trigger test for GitHub Actions workflow -->

