# Repository Rules for AI Agents

## Tech Stack
- **Language**: Dart
  - see pubspec.yaml for SDK constraints
- **Web**: `package:web` (do NOT use `dart:html`)
- **Testing**: `package:test`

## Code Style

Reference `analysis_options.yaml` for lint rules.

## Testing

Reference `CONTRIBUTING.md` for testing information.

## Web Development

Reference `CONTRIBUTING.md` for web development information.

## General
- Keep changes minimal and focused.
- Follow existing patterns in the codebase.
- Always check analyzer for lints and fix them.

### Troubleshooting
If `dart run build_runner serve` fails with "address in use", you can search for the process using the port (e.g. 8080) using `witr`.

```bash
witr -o 8080 --json
```

If the output indicates that `build_runner` is already serving the current directory, you can reuse that instance.
Otherwise, you should prompt the user to stop the conflicting process.
