# EthioLife_Enterprise_Oct_20_2025

A clean repository scaffold with code-quality tooling and CI. Add your application source code and tests, and extend the tooling as needed for your stack.

### What’s included
- **Pre-commit**: `black`, `isort`, `ruff`, and standard hygiene hooks
- **CI**: GitHub Actions running pre-commit on push and PR
- **Dependabot**: Weekly updates for GitHub Actions
- **EditorConfig**: Consistent line endings/indentation across editors
- **Git attributes**: Normalize line endings and mark common lockfiles
- **Git ignore**: Sensible defaults for popular languages and tools

### Getting started
- **Prereqs**: Python 3.x and `pip` available for pre-commit hooks.
- **Install hooks**:
  ```bash
  pip install --upgrade pre-commit
  pre-commit install
  pre-commit run --all-files
  ```
- **Local workflow**:
  - Create a feature branch, commit frequently; hooks will run automatically.
  - Keep commits focused; prefer small, self-contained changes.

### Continuous Integration
- Workflow file: `.github/workflows/ci.yml`
- Runs on: push to `main` and all pull requests
- Steps: checkout, set up Python, cache, install `pre-commit`, run hooks on all files

### Project structure (initial)
```text
/ (repo root)
├── .editorconfig
├── .gitattributes
├── .github/
│   ├── dependabot.yml
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── .pre-commit-config.yaml
├── LICENSE
└── README.md
```

### Recommendations / next steps
- **Source layout**: Create `src/` (or language-appropriate layout) and `tests/`.
- **Language-specific tooling**: If using Python, keep `black`, `isort`, `ruff`. For JS/TS, add `eslint`, `prettier` hooks; for Go/Rust/etc., add corresponding linters/formatters.
- **Templates**: Add PR/Issue templates and, if needed, `CODEOWNERS`.
- **Security/Docs**: Consider `SECURITY.md` and `CONTRIBUTING.md` once the project scope is defined.
- **Release process**: Add versioning and release automation when ready.

### License
Apache License 2.0. See `LICENSE` for details.
