# Customer Service Request Portal

A responsive Single Page Application (SPA) for managing customer service requests.

The application was developed as a technical challenge using React and TypeScript. It integrates with a REST API, implements authentication through OpenID Connect (OIDC), provides service request management workflows, handles API errors, and includes automated tests and continuous integration.

## Features

### Authentication

* OpenID Connect authentication using Keycloak
* Authorization Code Flow
* Protected application routes
* Automatic Bearer token attachment to API requests
* Sign-in and sign-out flows
* OIDC callback handling
* Authentication state synchronization

### Service Requests

Authenticated users can:

* View service requests
* Search by request title or requester
* Filter requests by status
* Filter requests by priority
* Sort requests by creation date
* Navigate through paginated results
* Change the number of requests displayed per page
* View complete request details
* Create new service requests
* Update request status according to the allowed workflow

Supported statuses:

* `OPEN`
* `IN_PROGRESS`
* `RESOLVED`
* `CLOSED`

Supported priorities:

* `LOW`
* `MEDIUM`
* `HIGH`
* `CRITICAL`

### Status Workflow

The application enforces the following status transitions:

```text
OPEN
 ├──> IN_PROGRESS
 └──> CLOSED

IN_PROGRESS
 ├──> RESOLVED
 └──> OPEN

RESOLVED
 ├──> CLOSED
 └──> IN_PROGRESS

CLOSED
 └──> No further transitions
```

Status updates include the last-read resource version to support optimistic concurrency control.

The application handles version conflicts returned by the API with HTTP `409 Conflict` and invalid status transitions with HTTP `422 Unprocessable Entity`.

## Technology Stack

### Core

* React
* TypeScript
* Vite
* React Router

### Data and API

* Axios
* TanStack React Query
* REST API based on the supplied OpenAPI specification

### Authentication

* OpenID Connect
* `oidc-client-ts`
* Keycloak for local OIDC development and testing

### Forms and Validation

* React Hook Form
* Zod
* `@hookform/resolvers`

### API Mocking

* Mock Service Worker (MSW)

### Testing

* Vitest
* React Testing Library
* `@testing-library/jest-dom`
* `@testing-library/user-event`
* jsdom

### Code Quality

* TypeScript
* Oxlint
* Prettier

### Continuous Integration

* GitHub Actions

## Technical Decisions

### React + TypeScript

React provides a component-based architecture suitable for a responsive SPA, while TypeScript provides static type checking for API models, component properties, forms, status transitions, and application state.

### TanStack React Query

TanStack React Query manages server state, including loading states, caching, invalidation, mutations, and refetching after service request changes.

This keeps API state separate from local UI state.

### Axios

Axios is used through a centralized API client.

The client automatically retrieves the current authenticated OIDC user and attaches the access token to API requests:

```text
Authorization: Bearer <access_token>
```

This keeps authentication logic out of individual API functions.

### React Hook Form + Zod

React Hook Form manages form state efficiently, while Zod provides declarative validation rules.

The combination keeps validation logic structured and provides clear validation feedback to users.

### Custom CSS

The application uses custom CSS rather than a UI or CSS framework.

This was a deliberate choice to:

* Keep the dependency footprint small
* Maintain direct control over responsive behavior
* Avoid introducing an additional framework for a relatively focused interface
* Implement accessible focus states and form controls directly
* Keep the visual system specific to the application

The interface includes responsive layouts, tables, forms, status and priority badges, navigation, cards, pagination, and mobile adaptations.

## Architecture

The application is organized by responsibility:

```text
src/
├── api/
│   ├── client.ts
│   └── requests.ts
│
├── auth/
│   ├── AuthProvider.tsx
│   ├── oidc.ts
│   └── ProtectedRoute.tsx
│
├── components/
│   ├── ApiErrorMessage.tsx
│   ├── Layout.tsx
│   ├── RequestTable.tsx
│   └── StatusUpdateForm.tsx
│
├── hooks/
│   ├── useCreateServiceRequest.ts
│   ├── useServiceRequest.ts
│   ├── useServiceRequests.ts
│   └── useUpdateRequestStatus.ts
│
├── mocks/
│   ├── browser.ts
│   ├── data.ts
│   └── handlers.ts
│
├── pages/
│   ├── AuthCallbackPage.tsx
│   ├── LoginPage.tsx
│   ├── NewRequestPage.tsx
│   ├── NotFoundPage.tsx
│   ├── RequestDetailsPage.tsx
│   └── RequestsPage.tsx
│
├── routes/
│   └── AppRoutes.tsx
│
├── schemas/
│   └── requestSchema.ts
│
├── test/
│   └── setup.ts
│
├── types/
│   └── request.ts
│
└── utils/
    ├── apiError.ts
    └── statusTransitions.ts
```

The separation keeps API communication, authentication, server-state management, reusable UI components, validation, routing, and domain rules independent from one another.

## Prerequisites

Before running the project locally, install:

* Node.js 22 or a compatible current Node.js version
* npm
* Docker Desktop, if using the local Keycloak configuration

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd customer-service-portal
```

Install dependencies:

```bash
npm install
```

Create the local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

Configure the required environment variables before starting the application.

## Environment Variables

The application uses Vite environment variables:

```env
VITE_API_BASE_URL=http://localhost:3000

VITE_OIDC_AUTHORITY=http://localhost:8080/realms/customer-service
VITE_OIDC_CLIENT_ID=customer-service-portal
VITE_OIDC_REDIRECT_URI=http://localhost:5173/callback
VITE_OIDC_POST_LOGOUT_REDIRECT_URI=http://localhost:5173/
```

### Variable Reference

| Variable                             | Description                              |
| ------------------------------------ | ---------------------------------------- |
| `VITE_API_BASE_URL`                  | Base URL of the service request REST API |
| `VITE_OIDC_AUTHORITY`                | OIDC issuer/authority URL                |
| `VITE_OIDC_CLIENT_ID`                | Public OIDC client identifier            |
| `VITE_OIDC_REDIRECT_URI`             | Redirect URI after authentication        |
| `VITE_OIDC_POST_LOGOUT_REDIRECT_URI` | Redirect URI after logout                |

The real `.env` file is intentionally excluded from version control.

Only `.env.example` should be committed.

## Local API Mocking

The project uses Mock Service Worker (MSW) during local development.

MSW intercepts API requests in the browser and provides mock implementations of the service request endpoints.

The mock API supports:

* Request listing
* Search
* Status filtering
* Priority filtering
* Creation-date sorting
* Pagination
* Request details
* Request creation
* Status updates
* Version conflict responses
* Invalid transition responses
* Not-found responses

This allows the frontend to be developed and evaluated without requiring a deployed backend.

The mock implementation follows the behavior defined by the supplied API contract.

## OIDC / Keycloak Setup

For local authentication testing, Keycloak can be started with Docker.

Example:

```bash
docker run -d \
  --name customer-service-keycloak \
  -p 127.0.0.1:8080:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.7.4 \
  start-dev
```

> The bootstrap credentials above are intended only for local development.

Open the Keycloak administration console and create a realm:

```text
customer-service
```

Create an OpenID Connect client:

```text
customer-service-portal
```

Recommended local client configuration:

```text
Client type:
OpenID Connect

Client authentication:
Off

Authorization:
Off

Standard flow:
On

Direct access grants:
Off

Implicit flow:
Off

Root URL:
http://localhost:5173

Home URL:
http://localhost:5173/

Valid redirect URIs:
http://localhost:5173/callback

Valid post logout redirect URIs:
http://localhost:5173/

Web origins:
http://localhost:5173
```

Create a local test user and assign a non-temporary password.

Do not commit user passwords, Keycloak administrator credentials intended for real environments, access tokens, or other secrets to the repository.

## Running the Application

Start the development server:

```bash
npm run dev
```

Vite will display the local development address in the terminal.

Sign in using the configured OIDC provider.

## Available Commands

### Development

```bash
npm run dev
```

### Automated Tests

```bash
npm test
```

### Test Watch Mode

```bash
npm run test:watch
```

### Lint

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Testing Strategy

The project includes automated tests focused on important application behavior rather than implementation details.

Current tests cover:

- Service request list rendering
- Search interaction and query propagation
- Allowed service request status transitions
- Terminal `CLOSED` status behavior
- Status update form behavior
- New service request form validation
- Valid service request submission
- API version conflict (`409`) handling
- API validation error (`422`) handling
- Field-level API validation messages
- Network/connection error handling
- Authentication loading state
- Redirect of unauthenticated users
- Preservation of the requested route during authentication redirect
- Rendering of protected content for authenticated users

The current automated test suite contains 16 tests across 6 test files.

The tests use:

* Vitest as the test runner
* React Testing Library for component testing
* `user-event` for user interaction
* jest-dom for DOM assertions
* jsdom as the browser-like test environment

Run the complete test suite with:

```bash
npm test
```

## Error Handling

API errors are normalized through a centralized error-handling utility.

The UI supports errors based on RFC 7807-style Problem Details responses, including:

* `400 Bad Request`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`
* `409 Conflict`
* `422 Unprocessable Entity`
* `500 Internal Server Error`

Validation errors can also be presented to the user when returned by the API.

Network errors are handled separately from structured API errors.

## Security Considerations

The application includes several security-related design decisions:

* Authentication is delegated to an external OpenID Connect identity provider.
* Protected routes require an authenticated OIDC session.
* Access tokens are attached centrally to API requests.
* Authentication uses the OIDC Authorization Code flow.
* Credentials and tokens are not hard-coded into the application source.
* `.env` is excluded from version control.
* `.env.example` documents configuration without storing credentials.
* API authorization remains the responsibility of the backend.
* The frontend does not treat UI restrictions as a replacement for server-side authorization.

In a production environment, the OIDC provider and API should be served over HTTPS.

## Accessibility

Accessibility considerations include:

* Semantic HTML elements
* Explicit form labels
* Accessible navigation
* Table column headers
* ARIA labels for search and filter controls
* Keyboard-accessible native controls
* Visible focus states
* Error messages using appropriate alert semantics
* Status feedback using status semantics
* Responsive layouts that remain usable on smaller screens

## Responsive Design

The portal is designed for both desktop and mobile use.

Responsive behavior includes:

* Flexible navigation
* Responsive request filters
* Horizontally scrollable data tables on narrow screens
* Adaptive detail layouts
* Responsive forms
* Mobile-friendly pagination
* Touch-friendly interactive controls

## Continuous Integration

GitHub Actions runs automated quality checks on pushes and pull requests targeting `master` or `main`.

The CI pipeline performs:

```text
Checkout
   ↓
Install dependencies
   ↓
Automated tests
   ↓
Lint
   ↓
Production build
```

The workflow is located at:

```text
.github/workflows/ci.yml
```

A failed test, lint error, TypeScript compilation failure, or production build failure causes the workflow to fail.

## API Integration

The frontend API layer exposes functions for:

```text
GET    /requests
GET    /requests/{requestId}
POST   /requests
PATCH  /requests/{requestId}/status
```

The request list supports query parameters for:

* Search
* Status
* Priority
* Sort order
* Page
* Page size

API communication is kept separate from UI components through the API and React Query hook layers.

## Known Limitations

* The included API implementation is mocked for local frontend development.
* Keycloak is configured locally and is not deployed with this repository.
* The application does not include end-to-end browser tests.
* The automated test suite focuses on critical behaviors rather than exhaustive coverage.
* Production deployment configuration depends on the target hosting environment.
* The current bundle may produce a Vite chunk-size warning; code splitting could be introduced as a future optimization.

## Future Improvements

Potential improvements include:

* End-to-end tests with Playwright or Cypress
* Route-level code splitting
* Expanded integration test coverage
* Production OIDC configuration
* Production API integration
* Additional accessibility auditing
* Observability and frontend error reporting

## CI Verification

Before submitting or merging changes, the project should pass:

```bash
npm test
npm run lint
npm run build
```

## License

This project was created as part of a technical assessment.
