# Project: quadprog

## Table of Contents
1. [Overview](#1-overview)
2. [Mathematical Foundation & Implementation](#2-mathematical-foundation--implementation)
3. [Project Standards & Priority](#3-project-standards--priority)
4. [Development Guidelines](#4-development-guidelines)
    - [JavaScript Style Guide (Enforced by ESLint)](#javascript-style-guide-enforced-by-eslint)
    - [Type Safety & JSDoc](#type-safety--jsdoc)
    - [Testing & Quality Assurance](#testing--quality-assurance)
    - [Error Handling](#error-handling)
    - [Mandatory Pre-Commit Workflow (STRICT ENFORCEMENT)](#mandatory-pre-commit-workflow-strict-enforcement)
    - [Commit Messages](#commit-messages)
    - [Documentation Maintenance](#documentation-maintenance)
    - [Versioning & Git Tags](#versioning--git-tags)
5. [Project Layout](#5-project-layout)

## 1. Overview
A JavaScript library for solving quadratic programming problems using the Goldfarb-Idnani dual method.

## 2. Mathematical Foundation & Implementation
This library is a direct port of the dual active-set algorithm described by Goldfarb and Idnani (1983).

### A. Core Algorithm
The implementation strictly adheres to the dual method for solving strictly convex quadratic programs:
- **Starting Point:** It utilizes the unconstrained minimum of the objective function as the initial point.
- **Active-Set Type:** It iteratively adds violated constraints to the active set until dual feasibility (and thus optimality) is achieved.
- **Numerical Stability:** It employs Cholesky factorizations (`dpofa`, `dposl`, `dpori`) and stable updating procedures instead of explicit matrix inversions, as recommended in Section 4 of the paper.

### B. Compatibility & Conventions
- **R Package Alignment:** Variable names and API structures (e.g., `unconstrained_solution`) are preserved to maintain alignment with the canonical R package `quadprog` and the original Fortran implementation.
- **Indexing:** The core logic (`lib/qpgen2.js`) maintains Fortran-style 1-based indexing by padding arrays. This ensures exact correspondence with the mathematical steps outlined in the original paper.
- **Control Flow:** The use of labeled functions (`fnGoto50`, etc.) in the core solver is intentional to preserve the validated logic flow of the original algorithm.

## 3. Project Standards & Priority
These directives define the project-specific standards and override any conflicting global defaults.

### A. Priority Directive
In case of any conflict between this file and global agent instructions, project rules override global defaults **except** non-negotiable environment and formatting constraints (OS, shell, EOL, encoding) defined in the global agent configuration.

## 4. Development Guidelines

### JavaScript Style Guide (Enforced by ESLint)
The project follows a strict coding standard that mirrors the high-quality defaults used by the **ESLint core project**. These rules are automatically enforced via `npm run lint`.
- **Indentation:** 4 spaces (no tabs).
- **Quotes:** Double quotes (`"`) for all strings, unless avoiding escapes.
- **Spacing:** Mandatory spaces around operators (`a + b`) and after keywords (`if (`, `for (`).
- **Blank Lines:**
    - A mandatory blank line MUST follow any variable declaration (`const`, `let`) if the next statement is not another declaration.
    - Consecutive declarations in the same block do not require blank lines between them.
- **Block Braces:** Mandatory curly braces `{}` for all control statements (`if`, `for`, `while`), even for single-line blocks.
- **Strict Logic & Consistency:**
    - **Equality:** Always use `===` and `!==`.
    - **Imports:** Duplicate imports are forbidden (`no-duplicate-imports`).
    - **Scoping:** Variable shadowing (`no-shadow`) and usage before definition (`no-use-before-define`) are restricted.
    - **Clean Code:** Forbidden redundant logic like useless returns, concatenated constants, or empty blocks.
- **Constants:** Use `const` by default; use `let` only when reassignment is necessary. `var` is forbidden.

### Type Safety & JSDoc
The project uses a hybrid JavaScript/TypeScript approach to ensure type safety and developer productivity without a full compilation step.
- **Global Types:** Core domain entities are defined in a global `types.d.ts` file. These types are ambiently available across the entire project.
- **Mandatory Annotations:**
    - All function parameters and return values MUST be documented using JSDoc (`@param`, `@returns`) using the global types.
    - Class properties and complex variables (like empty arrays destined for specific objects) MUST have `@type` annotations.
    - **Avoid `any`:** The use of `/** @type {any} */` or any cast to `any` is strictly FORBIDDEN unless absolutely impossible to avoid (e.g., third-party library limitations).
    - **TypeScript Directives:** Always use `@ts-expect-error` instead of `@ts-ignore` to suppress inevitable type errors. This ensures that if the underlying issue is resolved, the directive will trigger a new error, forcing its removal.
- **IntelliSense:** Correct JSDoc usage ensures full autocompletion and static analysis in modern IDEs (VS Code).

### Testing & Quality Assurance
- **Coverage Mandate:** Project-wide test coverage MUST always be **100%** (for Lines, Functions, and Branches). Any new feature or bug fix must include corresponding tests that maintain this threshold.
- **Locality & Isolation:** Tests MUST NOT rely on external state or the execution order of other tests. Units under test should be isolated from each other with no shared mutable state.
- **The 5 Questions Framework:** Every test must be readable and explicitly answer:
    1. **What is the unit under test?** (Must be in a named `describe` block).
    2. **What is the expected behavior?** (Described in `test` titles).
    3. **What is the actual output?** (The unit is exercised).
    4. **What is the expected output?** (Clear assertions).
    5. **How can we find the bug?** (Implicitly answered by the above).
- **Explicitness:** Everything needed to understand a test must be part of the test itself. Use factory functions to produce complex data structures instead of sharing mutable fixtures.
- **Thoroughness:** Test all expected edge cases (empty sets, extreme values, errors).

### Error Handling
- Don't swallow errors. Prefer returning structured errors or throwing typed/custom errors with actionable context.
- Only catch exceptions to add context or translate errors at system boundaries.
- Avoid broad `catch (e) {}`. Never ignore promise rejections.

### Mandatory Pre-Commit Workflow (STRICT ENFORCEMENT)
To prevent build failures and maintain code quality, the agent MUST execute the full validation suite before `git commit` **only if application code (e.g., `.js` files) has been modified**. Documentation-only changes (e.g., `.md` files) are exempt from this requirement.

**Execution (when code is modified):**
- Run `npm run validate` (which covers linting, type safety via `lint-ts`, and all unit tests with 100% coverage).
- All checks must pass with zero errors. Skipping for "minor" changes is strictly forbidden.
- Only after validation passes, proceed to stage and commit.

### Commit Messages
- Must follow the **Conventional Commits** specification: [https://www.conventionalcommits.org/en/v1.0.0](https://www.conventionalcommits.org/en/v1.0.0)
- **Mandatory Format:** `<type>[optional scope]: <description>` (See **Version Release Protocol** for release commit exceptions).
- **Strict Constraints:**
    1.  **Subject Line:** MUST be **50 characters or fewer**.
    2.  **Body:** A descriptive body is **MANDATORY for ALL commits**. It should explain the "why" and "what" of the changes.
    3.  **Wrapping:** Limit each line of the body to **72 characters**.
    4.  **Atomic Commits:** Each commit MUST represent a single logical unit of work.
        *   **Strict Separation:** NEVER combine changes to **System/Agent Documentation** (e.g., `AGENTS.md`, project guidelines) with **Application Code** changes.
        *   **Allowed combinations:** Documentation may only be included with code if it specifically documents that code change (e.g., JDoc, API reference).
    5.  **AI Attribution (MANDATORY):** Every commit generated by an AI agent MUST be authored using the `--author` flag with the agent's own identity:
        *   **Amp:** `Amp <https://ampcode.com>`
        *   **Gemini CLI:** `Gemini CLI <https://github.com/google-gemini/gemini-cli>`
        *   **Codex:** `Codex <https://openai.com/codex>`
    6.  **Co-Authorship Trailer:**
        *   **Amp:** Do NOT include a `Co-authored-by` trailer in the commit message. After committing, run `git log -1 --format="%B"` and check if Amp added the trailer automatically. If the trailer is missing, amend the commit to append it: `Co-authored-by: Amp <https://ampcode.com>`.
        *   **Gemini CLI:** Every commit body MUST end with: `Co-authored-by: Gemini CLI <https://github.com/google-gemini/gemini-cli>`
        *   **Codex:** Every commit body MUST end with: `Co-authored-by: Codex <https://openai.com/codex>`
- **Agent Self-Correction (CRITICAL):** Before executing any commit, the agent MUST verify this checklist:
    1.  **Subject Line:** Is it <= 50 characters?
    2.  **Mandatory Body:** Does the commit message include a descriptive body (separated by a blank line) that explains the "why" and "what"? (Single-line commits are strictly FORBIDDEN).
    3.  **Wrapping:** Are all lines in the body wrapped at 72 characters?
    4.  **Validation:** Has `npm run validate` passed (if application code changed)? (See **Mandatory Pre-Commit Workflow**.)
    5.  **Atomicity:** Are the changes restricted to a single logical scope (e.g., don't mix docs and code)?
    6.  **Attribution:** Is the commit authored by the agent's own identity (`Amp <https://ampcode.com>`, `Gemini CLI <https://github.com/google-gemini/gemini-cli>`, or `Codex <https://openai.com/codex>`)?
    7.  **Co-Authorship:** For Gemini CLI and Codex, does the body end with the required `Co-authored-by:` trailer? For Amp, do NOT add the trailer in the message; after committing, verify with `git log -1 --format="%B"` and amend to add it only if missing.

### Documentation Maintenance
- **Sync Mandate:** `AGENTS.md` MUST be kept in sync with the implementation at all times. Any change to core logic, configuration, or workflow MUST be reflected in this document immediately.
- **Sequential Numbering:** When adding, removing, or moving sections in `AGENTS.md`, you MUST ensure that the sequential numbering of all headers is maintained correctly.

### Versioning & Git Tags
The project follows **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`.
- **MAJOR:** Breaking changes or significant architectural shifts.
- **MINOR:** New features, multi-asset support, or major strategy updates (e.g., v1.1.0).
- **PATCH:** Bug fixes, linting, or minor documentation updates.

**Version Release Protocol (Agent Mandate):**
Before proposing or creating ANY new release tag, the agent MUST:
1.  **Check Current Version:** Read `package.json` to verify the current version.
2.  **Determine Increment:** Decide if the changes warrant a PATCH, MINOR, or MAJOR increment based on SemVer rules.
3.  **Propose:** Explicitly state the current version and the proposed new version to the user (e.g., "Current: 1.2.2 -> Proposed: 1.2.3").
4.  **User Confirmation (MANDATORY):** The agent MUST obtain explicit approval from the user before proceeding with the version bump and creating the release commit.
5.  **Mandatory Commit Message:** The commit message for the version bump MUST start with `Release vX.Y.Z` (e.g., "Release v1.3.1"). This format overrides any other Conventional Commit rules for version bump commits.
6.  **Isolation (CRITICAL):** The release commit MUST contain ONLY the version change in `package.json`. It is strictly FORBIDDEN to include any code, documentation, or configuration changes in the same commit as the version bump. All other changes must be committed separately prior to the release.

**Tagging Rules:**
1.  **Tag Format:** Git tags MUST be prefixed with `v` (e.g., `v1.1.0`).
2.  **Package Version:** The `version` field in `package.json` MUST NOT include the `v` prefix (e.g., `"version": "1.1.0"`).
3.  **Creation:** Tags MUST be created only after the Mandatory Pre-Commit Workflow passes.
4.  **Command:** Use `git tag -a vX.Y.Z -m "Release vX.Y.Z"` to create an annotated tag.
5.  **Sync:** The numerical version in `package.json` must match the numerical part of the Git tag.

## 5. Project Layout

The project structure is organized to separate concerns and modularize core logic:

- **`lib/`**: Primary source code directory.
- **`test/`**: Full unit and integration test suite.
