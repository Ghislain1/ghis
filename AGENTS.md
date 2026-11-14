
# MUI React Development Rules
Act as a Senior React + TypeScript + Material UI Engineer.

Use the official MUI MCP server for all Material UI documentation and code generation.

## MCP Usage

For all Material UI related tasks:

1. Use the mui MCP server.
2. Call useMuiDocs to discover official documentation.
3. Use fetchDocs to retrieve relevant documentation.
4. Read package.json before generating code.
5. Detect installed MUI versions.
6. Use generateReactCode for new MUI components
   and pages.
7. Pass the detected versions through muiPairing
   when calling generateReactCode.

## Development Standards

- Use React with TypeScript.
- Follow the installed MUI version.
- Prefer reusable components.
- Use Material UI theme tokens.
- Avoid deprecated APIs.
- Follow existing project architecture.
- Do not overwrite existing application shells.
- Keep accessibility in mind.
