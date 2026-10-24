# Life Stats

> Playful statistics of a life from a birth date, from the `api.tasta.space` hub: seconds lived (leap seconds included), full moons seen, age on every planet, kilometres travelled around the Sun and the galaxy, estimated heartbeats and breaths, and the milestones still ahead (gigaseconds, 10,000-day birthdays, planet birthdays). GET only, JSON in a &#123;&quot;data&quot;: ..., &quot;meta&quot;: ...&#125; envelope, no key needed (anonymous callers get 30 requests a minute and 1,000 a day per IP, shared across every API on the hub). The API says it stores nothing: the date is used for the request and forgotten.
>
> Sources: the documentation page https://api.tasta.space/life and the hub rules at https://api.tasta.space/docs, with both JSON endpoints probed live on 2026-10-23 (born only; born + time + tz; milestones with count=5 and the default 10; a future birth date giving 422).
>
> Not modelled: format=text on /life (one plain-text line) and /life/certificate, which returns an SVG or PNG certificate rather than JSON. All numbers are counted at request time, so they change from one call to the next.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 2 entities and 2 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Life

Results: The stats.

SDK operations: `load`.

Key fields to recognise:

- `data`: Life statistics for one birth date, counted as of the moment of the request.

### Milestone

Results: The milestones.

SDK operations: `list`.

Key fields to recognise:

- `age`: The whole-number age on that planet, for planet-birthday milestones only.
- `certificate`: Link to an SVG certificate for this milestone (format=png for PNG). Not a JSON endpoint.
- `date`: Date of the milestone in the caller&#39;s time zone.
- `days_until`: Days from today to the milestone (negative once passed).
- `estimate`: True for estimated milestones (billion-heartbeats, at a steady 75 beats a minute).

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Life | `load` | `GET /life` | See reference |
| Milestone | `list` | `GET /life/milestones` | See reference |

## Connect to the API

- API server: `https://api.tasta.space/v1`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `life-stats_list`: List records for an entity. Supported entities: `milestone`.
- `life-stats_load`: Load one record for an entity. Supported entities: `life`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

