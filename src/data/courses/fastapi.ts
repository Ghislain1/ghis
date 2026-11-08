import type { LessonFrame, LessonMeta } from '../../types'
import { c, q } from '../frames'

export const meta: LessonMeta = {
  course: 'FastAPI — Modern Python APIs',
  chapter: '4 chapters · 20 questions',
  lesson: 'Build typed, async APIs with FastAPI',
  estimatedMinutes: 75,
}

export const frames: LessonFrame[] = [
  c(
    'fastapi-c1',
    'FASTAPI · CHAPTER 1',
    'Routes, parameters, and the dev server.',
    [
      'FastAPI is a modern Python web framework built on Starlette for the web layer and Pydantic for data validation. Declare a route with a decorator such as @app.get, write a Python function, and FastAPI generates the OpenAPI schema and interactive docs for you.',
      'Path parameters are declared in the route string and matched by function arguments. Query parameters are function arguments that are not part of the path. Uvicorn runs the app in development with reload enabled.',
    ],
    'Run the dev server with uvicorn main:app --reload, then open /docs.',
    'This chapter introduces routing, parameters, and running a FastAPI application.',
  ),
  c(
    'fastapi-c2',
    'FASTAPI · CHAPTER 2',
    'Pydantic models and validation.',
    [
      'Pydantic models describe the shape and types of request and response data. Declare a class based on BaseModel and use it as a parameter to receive a validated JSON body. Invalid input is rejected automatically with a 422 response.',
      'Field adds constraints such as minimum length or numeric ranges, and response_model validates and filters what the API returns. Nested models compose cleanly for larger payloads.',
    ],
    'Validation happens before your handler runs, so the handler receives clean, typed data.',
    'This chapter covers Pydantic models, constraints, response models, and validation errors.',
  ),
  q('fastapi-q1', 'CHECK · FASTAPI', 'Which two libraries does FastAPI build on?', [
    ['Starlette and Pydantic', true],
    ['Flask and SQLAlchemy', false],
    ['Django and DRF', false],
    ['Tornado and Marshmallow', false],
  ], 'Starlette provides the ASGI web layer and Pydantic provides data validation and serialization.'),
  q('fastapi-q2', 'CHECK · FASTAPI', 'Which decorators define routes in FastAPI?', [
    ['@app.get', true],
    ['@app.post', true],
    ['@app.put', true],
    ['@app.fetch', false],
  ], 'FastAPI exposes HTTP verb decorators such as get, post, put, patch, and delete. fetch is a JavaScript API, not a FastAPI decorator.', true),
  q('fastapi-q3', 'CHECK · FASTAPI', 'How is a path parameter declared?', [
    ['In the route string, with a matching function argument', true],
    ['Only in the request body', false],
    ['Only in a query string', false],
    ['In a separate YAML file', false],
  ], 'A route like /items/{item_id} declares item_id in the path; the function receives it as an argument.'),
  q('fastapi-q4', 'CHECK · FASTAPI', 'Which command runs a FastAPI app in development with auto-reload?', [
    ['uvicorn main:app --reload', true],
    ['fastapi run --watch', false],
    ['python -m fastapi serve', false],
    ['gunicorn main:app --reload', false],
  ], 'Uvicorn is the common ASGI server. main:app means the app object in main.py, and --reload watches for changes.'),
  q('fastapi-q5', 'CHECK · FASTAPI', 'When is a function argument treated as a query parameter?', [
    ['When it is not part of the path and has a simple type', true],
    ['When it is wrapped in BaseModel', false],
    ['When it is named request', false],
    ['When it starts with an underscore', false],
  ], 'FastAPI treats simple arguments that are not path parameters as query parameters. Pydantic models are read from the body.'),
  q('fastapi-q6', 'CHECK · FASTAPI', 'What is a Pydantic BaseModel used for in FastAPI?', [
    ['Validating and parsing request data', true],
    ['Running SQL migrations', false],
    ['Starting the ASGI server', false],
    ['Defining HTML templates', false],
  ], 'A BaseModel class describes the expected fields and types. FastAPI validates the body and passes a model instance to the handler.'),
  q('fastapi-q7', 'CHECK · FASTAPI', 'Which are Pydantic features?', [
    ['Type validation', true],
    ['Serialization to JSON-compatible data', true],
    ['Nested models', true],
    ['Executing raw SQL', false],
  ], 'Pydantic validates types, serializes models, and supports nested models and constraints. It does not execute SQL.', true),
  q('fastapi-q8', 'CHECK · FASTAPI', 'What does response_model do?', [
    ['Validates and filters the response payload', true],
    ['Selects the database table', false],
    ['Sets the HTTP server port', false],
    ['Disables validation for that route', false],
  ], 'response_model documents and enforces the response shape, removing fields that are not declared in the model.'),
  q('fastapi-q9', 'CHECK · FASTAPI', 'How do you add a minimum length constraint to a string field?', [
    ['Field(min_length=3)', true],
    ['Field(gt=3)', false, 'gt applies to numeric comparisons, not string length.'],
    ['String(min=3)', false],
    ['Column(length=3)', false],
  ], 'In Pydantic v2, Field(min_length=3) enforces a minimum string length. Numeric constraints use gt, ge, lt, and le.'),
  q('fastapi-q10', 'CHECK · FASTAPI', 'Which status code does FastAPI return by default for request validation errors?', [
    ['422 Unprocessable Entity', true],
    ['400 Bad Request', false],
    ['401 Unauthorized', false],
    ['500 Internal Server Error', false],
  ], 'FastAPI returns 422 with details about the invalid fields when Pydantic validation fails.'),
  c(
    'fastapi-c3',
    'FASTAPI · CHAPTER 3',
    'Async, dependencies, and errors.',
    [
      'Use async def for handlers that await I/O. FastAPI runs synchronous handlers in a thread pool, so blocking code does not freeze the event loop. Dependencies declared with Depends centralise shared logic such as database sessions and authentication.',
      'Raise HTTPException to return a controlled error status and message. BackgroundTasks schedules work after the response is sent, and security helpers such as OAuth2PasswordBearer implement token-based authentication.',
    ],
    'Never call blocking libraries inside async handlers without offloading them.',
    'This chapter covers async handlers, dependency injection, authentication, and error handling.',
  ),
  c(
    'fastapi-c4',
    'FASTAPI · CHAPTER 4',
    'Docs, tests, and deployment.',
    [
      'FastAPI generates an OpenAPI schema automatically. Swagger UI is served at /docs and ReDoc at /redoc, which makes the API explorable without extra work.',
      'Test routes with pytest and fastapi.testclient.TestClient. In production, run Uvicorn or Gunicorn with Uvicorn workers behind a reverse proxy, configure CORS deliberately, and terminate HTTPS at the proxy.',
    ],
    'Keep the generated OpenAPI schema in your contract tests.',
    'This chapter covers interactive docs, testing, and production deployment concerns.',
  ),
  q('fastapi-q11', 'CHECK · FASTAPI', 'When should a FastAPI handler be declared async def?', [
    ['When it performs awaitable I/O', true],
    ['For every handler, even CPU-bound work', false],
    ['Only for database migrations', false],
    ['Never; FastAPI requires def', false],
  ], 'async def is for awaitable I/O. Sync def handlers are executed in a thread pool by FastAPI.'),
  q('fastapi-q12', 'CHECK · FASTAPI', 'Which tasks are good uses of Depends?', [
    ['Shared database sessions', true],
    ['Authentication checks', true],
    ['Reusable pagination logic', true],
    ['Rendering HTML templates only', false],
  ], 'Depends injects shared logic and resources. Template rendering is a separate concern, not a reason to use Depends by itself.', true),
  q('fastapi-q13', 'CHECK · FASTAPI', 'Which helper implements OAuth2 password bearer token authentication?', [
    ['OAuth2PasswordBearer', true],
    ['HTTPBasicBearer', false],
    ['TokenDepends', false],
    ['PasswordMiddleware', false],
  ], 'OAuth2PasswordBearer extracts the bearer token from the Authorization header. It is commonly combined with a token verification dependency.'),
  q('fastapi-q14', 'CHECK · FASTAPI', 'What are BackgroundTasks used for?', [
    ['Running work after the response is sent', true],
    ['Starting the ASGI server', false],
    ['Validating request bodies', false],
    ['Serving static files', false],
  ], 'BackgroundTasks schedule short follow-up work, such as sending an email, without delaying the response.'),
  q('fastapi-q15', 'CHECK · FASTAPI', 'How do you return a 404 error from a handler?', [
    ['raise HTTPException(status_code=404, detail="Not found")', true],
    ['return 404', false],
    ['raise NotFoundException()', false],
    ['return {"status": 404}', false],
  ], 'HTTPException returns a controlled error response with a status code and detail message.'),
  q('fastapi-q16', 'CHECK · FASTAPI', 'Where are the interactive API docs served by default?', [
    ['/docs and /redoc', true],
    ['/swagger and /openapi', false],
    ['/api/docs only', false],
    ['/schema and /ui', false],
  ], 'Swagger UI is at /docs and ReDoc at /redoc. Both are generated from the OpenAPI schema.'),
  q('fastapi-q17', 'CHECK · FASTAPI', 'Which tools are commonly used to test FastAPI apps?', [
    ['TestClient', true],
    ['pytest', true],
    ['httpx', true],
    ['Selenium', false],
  ], 'TestClient, pytest, and httpx cover functional and integration testing. Selenium drives browsers and is not the usual choice for API tests.', true),
  q('fastapi-q18', 'CHECK · FASTAPI', 'How do you send a GET request with TestClient?', [
    ['TestClient(app).get("/")', true],
    ['TestClient(app).request("GET /")', false],
    ['app.test("/")', false],
    ['pytest.get(app, "/")', false],
  ], 'TestClient exposes the HTTP verb methods. Calling .get returns a response object with status_code and json().'),
  q('fastapi-q19', 'CHECK · FASTAPI', 'What does FastAPI generate from your route and model definitions?', [
    ['An OpenAPI schema', true],
    ['A database migration', false],
    ['A Dockerfile', false],
    ['A Python virtual environment', false],
  ], 'FastAPI builds an OpenAPI schema from types and routes, then uses it to render the docs and client tooling.'),
  q('fastapi-q20', 'CHECK · FASTAPI', 'Which are sound production concerns for a FastAPI service?', [
    ['Run multiple server workers behind a reverse proxy', true],
    ['Configure CORS deliberately', true],
    ['Terminate HTTPS at the proxy', true],
    ['Disable HTTPS to reduce overhead', false],
  ], 'Scale with workers behind a proxy, restrict CORS, and terminate HTTPS securely. Disabling HTTPS exposes credentials and data.', true),
]
