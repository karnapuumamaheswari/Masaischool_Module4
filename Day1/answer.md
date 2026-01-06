
# Web Application Concepts — Answers

## Q1. Role of Frontend (FE)

- **User interface:** The frontend is responsible for presenting information to users — layouts, visual components, colors, and responsive design so the app looks good on different screen sizes.
- **User interaction:** It handles user interactions (clicks, typing, gestures), input validation, client-side state, and UI feedback (loading states, animations, error messages) to make the experience smooth and usable.
- **Communication with backend:** The frontend sends requests to backend APIs (HTTP/HTTPS, WebSockets), consumes responses (JSON, HTML), and updates the UI. It also manages authentication tokens, caches results client-side, and applies optimistic updates when appropriate.

## Q2. Role of Backend (BE)

- **Server-side processing:** The backend executes application logic that should not run in the user’s browser — request routing, input validation, business rules, workflows, scheduled jobs, and aggregation of data from multiple sources.
- **Database handling:** It reads from and writes to databases, enforces data integrity, runs queries, handles transactions, and performs indexing/caching to ensure data is consistent and performant.
- **Security and authentication:** The backend enforces authentication and authorization, protects sensitive operations, validates and sanitizes inputs, rate-limits, logs actions, and applies encryption for sensitive data at rest and in transit.

## Q3. Business Logic

Business logic is the set of rules and processes that implement a domain's requirements — the decisions and calculations that determine how an application behaves to meet real-world business goals. It sits between user input and data storage and enforces constraints, workflows, and policies.

Real-world examples:
- **E-commerce checkout:** Calculating totals, applying discounts/promotions, computing taxes and shipping, validating inventory, and preventing double-charges. Business logic decides whether a discount applies and how stock is reserved.
- **Banking transactions:** Validating transfer limits, applying fees/interest, enforcing anti-fraud checks, and ensuring atomic debit/credit operations. Logic enforces rules like daily transfer caps and transaction reversal conditions.
- **Booking systems (hotels/flight):** Managing availability, holding inventory during payment, enforcing cancellation/refund policies, and conflict resolution when concurrent users try to book the same seat/room.

## Q4. Client–Server Model

- **Who is the client:** The client is the application that initiates requests — typically a web browser, mobile app, or other HTTP client used by an end user.
- **Who is the server:** The server is the remote application or service that listens for requests, processes them, and returns responses. It hosts APIs, performs business logic, and manages data storage.
- **How communication happens:** Communication usually happens over HTTP/HTTPS where the client sends requests (GET/POST/PUT/DELETE) and the server responds with status codes and payloads (JSON, HTML). For real-time needs, protocols like WebSockets or SSE enable bidirectional or server-push communication. Authentication (cookies, tokens) and secure transport (TLS) protect the exchange.

## Q5. Three-Tier Architecture

- **Presentation layer:** The UI — frontend code (web pages, mobile app UI) that interacts with users and displays data.
- **Application (Business) layer:** The backend services that implement business rules, workflows, orchestrations, and API endpoints. This layer transforms user requests into operations and enforces policies.
- **Data layer:** Databases, storage services, and data access logic that persist and retrieve structured or unstructured data.

Why it’s used:
- **Separation of concerns:** Each layer has a focused responsibility, making the system easier to understand and maintain.
- **Scalability:** Layers can scale independently (e.g., add more app servers without changing the database layer).
- **Reusability and flexibility:** Different presentation clients can reuse the same application layer; data stores can be swapped with minimal changes.
- **Security:** Data access can be isolated and protected behind the application layer.

## Q6. JavaScript as a Backend Language

- **Performance:** With Node.js and the V8 engine, JavaScript provides fast startup and very good I/O performance using an event-driven, non-blocking model — ideal for I/O-heavy workloads.
- **Ecosystem:** The npm ecosystem gives access to a huge collection of libraries and tools for databases, testing, deployment, and utilities, speeding development.
- **Single-language full-stack:** Using JavaScript on both frontend and backend reduces cognitive overhead, allows code sharing (models, validation), and simplifies hiring and tooling.
- **Popular backend frameworks:** Express, Fastify, Koa, and NestJS are widely used for building APIs and microservices. Serverless platforms (AWS Lambda, Azure Functions) also have excellent JavaScript support.

