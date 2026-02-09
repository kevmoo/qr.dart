## Code Quality

Before submitting a pull request, please ensure your code meets the following standards:

- **Formatting**: Format your code using `dart format .`
- **Tests**: Ensure all tests pass by running `dart test`
- **Analysis**: Verify the analyzer is happy by running `dart analyze`

> **Note**: Feel free to use the Dart MCP server to help you with any of the above tasks.

## Optional: Running Skipped Tests

If you have [`zbar`](https://zbar.sourceforge.net/) installed, you can run the skipped tests (which use `zbar` for validation) using the following command:

```bash
dart test --run-skipped
```

## Validating the Example

To validate that the example works as expected:

1. Run the build runner to serve the example:
   ```bash
   dart run build_runner serve example
   ```
2. Open [http://localhost:8080/](http://localhost:8080/) in your browser.
