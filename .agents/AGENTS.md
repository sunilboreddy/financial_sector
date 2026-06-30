# Custom Agent Rules for Financial Sector Workspace

These rules govern all coding, branching, and documentation processes in this repository.

## Git Branching Rules
* **No Direct Commits to Main:** Never commit or push code changes directly to the `main` branch.
* **Feature Branches:** Always create and work on a feature branch (e.g., `feature/...` or `fix/...`) for any new features, bug fixes, or enhancements.

## Development & Documentation Process
* **Follow CLAUDE.md Guidelines:** Always consult and adhere to [CLAUDE.md](file:///home/work/Documents/financial_sector/CLAUDE.md) before implementing any code modifications.
* **Three-Phase Documentation Chain:**
  For every change, ensure the following documentation chain exists under the `docs/` folder:
  1. **Requirements** (`docs/requirements/`): Define what we are building or fixing and why (never how) before starting implementation.
  2. **Design** (`docs/design/`): Define how we will build it, referencing the requirements document.
  3. **Build** (`docs/build/`): Provide implementation logs and manual verification details as we code, referencing the design document.
* **Do not write code before the requirements and design documentation exist for that change.**
