# Books API Test Project

![CI](https://github.com/svesosk1/book-api-project/actions/workflows/ci.yml/badge.svg)

This project contains automated API tests for the Books API (https://fakerestapi.azurewebsites.net). It's built using WebdriverIO, TypeScript, and includes Docker support for consistent test execution across different environments.

## Features
- **TypeScript** for type safety and better developer experience
- **WebdriverIO** (v8) for test execution and reporting
- **Mocha** as the test framework
- **axios** for HTTP requests
- **Docker** support for consistent test environment
- **GitHub Actions** for CI/CD

## Running Tests

### Option 1: Local Setup

#### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

#### Steps
1. Install dependencies:
```sh
npm ci
```

2. Run tests:
```sh
npm test
# or
npm run book-store-test
```

3. Generate test report (optional):
```sh
npm run allure:report
```

### Option 2: Using Docker (Recommended)

#### Prerequisites
- Docker installed on your machine

#### Steps
1. Build the Docker image:
```sh
docker build -t book-api-tests .
```

2. Run tests in container:
```sh
docker run -e IN_DOCKER=true book-api-tests
```

## Project Structure
```
book-api-project/
├── helpers/             # Helper functions
│   └── apiHelpers.ts    # Book API helper methods
├── test/               # Test specifications
│   └── books.api.spec.ts # Books API test cases
├── types/              # TypeScript type definitions
│   ├── Book.interface.ts # Book interface definitions
│   └── Book.enum.ts    # Book-related enums
├── utils/              # Utility functions
│   └── apiClient.ts    # API client configuration
├── Dockerfile         # Docker configuration
├── wdio.conf.ts      # WebdriverIO configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Project dependencies and scripts
```

## Test Cases
The test suite includes both happy path and edge cases for:
- Getting all books
- Getting a specific book
- Adding a new book
- Updating an existing book
- Deleting a book

Test reports are generated using Allure, providing:
- Detailed test execution results
- Request and response details for API calls
- Test execution timeline
- Test categorization and filtering options

## Configuration
- The base URL is set to `https://fakerestapi.azurewebsites.net` and can be modified in the Dockerfile or through environment variables
- WebdriverIO configuration is in `wdio.conf.ts`
- TypeScript configuration is in `tsconfig.json`

## Development
To add new tests:
1. Create new test files in the `test/` directory
2. Use the `BookApiHelper` class from `helpers/apiHelpers.ts` for making API requests
3. Follow the existing test structure for consistency
4. Add new types or enums in the `types/` directory as needed

Key improvements in the codebase:
- Centralized API helper methods in `BookApiHelper` class
- Type-safe book operations using TypeScript interfaces
- Separated concerns with dedicated type definitions
- Improved maintainability with enum-based field references

## Continuous Integration
The project uses GitHub Actions for CI/CD:
- Tests are automatically run on every push and pull request
- Docker environment ensures consistent test execution
- Test results are available in the GitHub Actions workflow

## Troubleshooting
If you encounter any issues:
1. Ensure all prerequisites are installed
2. Try running tests in Docker to rule out environment issues
3. Check the API endpoint status at https://fakerestapi.azurewebsites.net
4. Clear node_modules and run `npm ci` again

---
Created by Svetozar Soskic

