# OAuth2 Spring Boot Setup

This workspace now includes two separate Spring Boot applications:

- `auth-server` — Authorization Server using Spring Authorization Server
- `resource-server` — Resource Server exposing protected REST APIs

## auth-server

Runs on port `9000`.

Features:
- Authorization Server endpoints at `/oauth2/authorize`, `/oauth2/token`, `/oauth2/jwks`
- Public client `hospital-client` with PKCE enabled
- In-memory users:
  - `admin` / `admin123` with `ROLE_ADMIN`
  - `patient` / `patient123` with `ROLE_PATIENT`
- Access tokens include a `roles` claim

## resource-server

Runs on port `9001`.

Features:
- Open registration endpoint: `POST /api/patients/register`
- Protected admin endpoint: `GET /api/appointments`
- Protected patient/admin endpoint: `GET /api/appointments/patient/{patientId}`
- JWT validation against `http://localhost:9000/oauth2/jwks`

## Run

Use Gradle if installed:

```bash
cd auth-server
gradle bootRun
```

```bash
cd resource-server
gradle bootRun
```

If Gradle is not installed, install the Gradle wrapper or use your IDE.

## Integration notes

- The React app should request an OAuth2 access token from the auth server.
- Use the token in `Authorization: Bearer <token>` for resource server API calls.
- The resource server maps `roles` from the JWT to Spring authorities.
