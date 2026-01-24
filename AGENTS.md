# Project: quadprog

## Table of Contents
1. [Overview](#1-overview)
2. [Core Environment & Workflow](#2-core-environment--workflow)
    - [A. Environment & Shell](#a-environment--shell)
    - [B. File Searching & Inspection](#b-file-searching--inspection)
    - [C. File Conventions](#c-file-conventions)
    - [D. Priority Directive](#d-priority-directive)
3. [Development Guidelines](#3-development-guidelines)
    - [JavaScript Style Guide (Enforced by ESLint)](#javascript-style-guide-enforced-by-eslint)
    - [Type Safety & JSDoc](#type-safety--jsdoc)
    - [Testing & Quality Assurance](#testing--quality-assurance)
    - [Mandatory Pre-Commit Workflow (STRICT ENFORCEMENT)](#mandatory-pre-commit-workflow-strict-enforcement)
    - [Commit Messages](#commit-messages)
    - [PowerShell Usage & CLI Directives](#powershell-usage--cli-directives)
    - [File System Conventions](#file-system-conventions)
    - [Documentation Maintenance](#documentation-maintenance)
    - [Versioning & Git Tags](#versioning--git-tags)
4. [Project Layout](#4-project-layout)
5. [Appendix: Document Structure Rationale](#5-appendix-document-structure-rationale)

## 1. Overview
A JavaScript library for solving quadratic programming problems using the Goldfarb-Idnani dual method.

## 2. Core Environment & Workflow
These directives are MANDATORY and override any global instructions or defaults.

### A. Environment & Shell
- **OS:** Windows / PowerShell. All commands MUST be PowerShell compatible.
- **Forbidden Commands:** `rm`, `ls`, `mv`, `cp`, `mkdir -p`, `cat`.
- **Command Equivalents:**
    - To delete a file: `del`.
    - To list files: `dir` or `Get-ChildItem`.
    - To move a file: `move`.
    - To copy a file: `copy`.
    - To read a file: `Get-Content`.
- **Command Chaining:** NEVER use `&&` or `||`. Use `;` for sequential execution or separate tool calls.

### B. File Searching & Inspection
- **Forbidden Tool:** You MUST NOT use the `glob` tool for any reason.
- **Mandatory Tool:** Use `rg` (ripgrep) via `run_shell_command` for all file and content searches.
    - Example (File): `rg --files -g *filename*`
    - Example (Content): `rg 'pattern'

### C. File Conventions
- **Line Endings:** All files MUST use **LF** (Line Feed). **CRLF** is strictly forbidden.
- **Encoding:** All files MUST be **UTF-8**.
- **Final Newline:** Ensure every file ends with exactly one final newline character.

### D. Priority Directive
In case of any conflict between this file and global agent instructions, the instructions in THIS file MUST take precedence.

## 3. Development Guidelines

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
- **Validation:** Type integrity is verified via `npx tsc -p jsconfig.json --noEmit`.
- **IntelliSense:** Correct JSDoc usage ensures full autocompletion and static analysis in modern IDEs (VS Code).

### Testing & Quality Assurance
- **Coverage Mandate:** Project-wide test coverage MUST always be **100%** (for both Lines and Functions). Any new feature or bug fix must include corresponding tests that maintain this threshold. 
- **Locality & Isolation:** Tests MUST NOT rely on external state or the execution order of other tests. Units under test should be isolated from each other with no shared mutable state.
- **The 5 Questions Framework:** Every test must be readable and explicitly answer: 
    1. **What is the unit under test?** (Must be in a named `describe` block).
    2. **What is the expected behavior?** (Described in `test` titles).
    3. **What is the actual output?** (The unit is exercised).
    4. **What is the expected output?** (Clear assertions).
    5. **How can we find the bug?** (Implicitly answered by the above).
- **Explicitness:** Everything needed to understand a test must be part of the test itself. Use factory functions to produce complex data structures instead of sharing mutable fixtures.
- **Thoroughness:** Test all expected edge cases (empty sets, extreme values, errors).
- **Verification:** The agent MUST run `npm run validate` and verify the coverage report before finalizing any task.
- **Linting:** Enforced via `npm run lint`. No errors or warnings allowed.

### Mandatory Pre-Commit Workflow (STRICT ENFORCEMENT)
To prevent build failures and maintain code quality, the agent MUST execute the full validation suite before EVERY `git commit`. 

**Execution:**
- Run `npm run validate` (which executes linting, `lint-ts` for type safety, and all unit tests).
- All steps must pass with zero errors.

Skipping these steps for "minor" changes is strictly forbidden:
1.  **Linting:** Run `npm run lint`. All errors must be fixed.
2.  **Type Safety:** Run `npm run lint-ts` (or `npx tsc -p jsconfig.json --noEmit`).
3.  **Unit Tests & Coverage:** Run `npm test`. All tests must pass (100% coverage for lines and functions).
4.  **Verification:** Only if all the above steps pass, proceed to stage and commit.

### Commit Messages
- Must follow the **Conventional Commits** specification: [https://www.conventionalcommits.org/en/v1.0.0](https://www.conventionalcommits.org/en/v1.0.0)
- **Mandatory Format:** `<type>[optional scope]: <description>` (See **Version Release Protocol** for release commit exceptions).
- **Strict Constraints:**
    1.  **Subject Line:** MUST be **50 characters or fewer**.
    2.  **Body:** A descriptive body is **MANDATORY for ALL commits**. It should explain the "why" and "what" of the changes.
    3.  **Wrapping:** Limit each line of the body to **72 characters**.
    4.  **LINTING IS MANDATORY (JS ONLY):** The agent MUST run `npm run lint` before a commit **only if one or more `.js` files have been modified**. Fix all errors before committing. Committing Javascript code with linting errors is strictly forbidden.
    5.  **Atomic Commits:** Each commit MUST represent a single logical unit of work.
        *   **Strict Separation:** NEVER combine changes to **System/Agent Documentation** (e.g., `AGENTS.md`, project guidelines) with **Application Code** changes.
        *   **Allowed combinations:** Documentation may only be included with code if it specifically documents that code change (e.g., JSDoc, API reference).
- **Agent Self-Correction (CRITICAL):** Before executing any commit, the agent MUST verify this checklist:
    1.  **Subject Line:** Is it <= 50 characters?
    2.  **Mandatory Body:** Does the commit message include a descriptive body (separated by a blank line) that explains the "why" and "what"? (Single-line commits are strictly FORBIDDEN).
    3.  **Wrapping:** Are all lines in the body wrapped at 72 characters?
    4.  **Linting:** Has `npm run lint` been executed and passed (if `.js` files were changed)?
    5.  **Type Safety:** Has `npx tsc -p jsconfig.json --noEmit` been executed and passed?
    6.  **Unit Tests:** Has `npm test` been executed and passed?
    7.  **Atomicity:** Are the changes restricted to a single logical scope (e.g., don't mix docs and code)?
    8.  **PowerShell Encoding:** Use `[System.IO.File]::WriteAllLines` to create the temporary commit message file to avoid NUL byte errors caused by standard `echo`.

### PowerShell Usage & CLI Directives
The project environment is Windows-based using PowerShell. To avoid syntax errors and CRITICAL file pollution:
- **STRICT PROHIBITION (CRLF POLLUTION):** NEVER use `Set-Content`, `Out-File`, or the redirection operator `>` to write or modify text files. These commands automatically introduce **CRLF** line endings, which are STRICTLY FORBIDDEN in this project.
- **MANDATORY FILE WRITING:** ALWAYS use `[System.IO.File]::WriteAllText((Resolve-Path path/to/file), $content)` or `[System.IO.File]::WriteAllLines` for file operations. This ensures that only **LF** characters are written.
- **Command Chaining:** NEVER use `&&` or `||`. Use `;` for sequential execution or separate the commands into multiple tool calls.
- **File Operations:** Use PowerShell-native or Windows-compatible commands:
    - Use `dir` or `Get-ChildItem` instead of `ls`.
    - Use `del` instead of `rm`.
    - Use `copy` and `move` instead of `cp` and `mv`.
- **Paths:** Always use backslashes `\` or ensure forward slashes `/` are handled correctly by the command.
- **Search:** Use `rg` (ripgrep) for searching file contents and names as it is highly optimized for this environment.

### File System Conventions
- **Line Endings (EOL):** All new files MUST use **LF (Line Feed)** as the end-of-line sequence. **CRLF** is strictly forbidden, even on Windows.
- **Encoding:** All text files should be UTF-8.

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
4.  **Mandatory Commit Message:** The commit message for the version bump MUST start with `Release vX.Y.Z` (e.g., "Release v1.3.1"). This format overrides any other Conventional Commit rules for version bump commits.

**Tagging Rules:**
1.  **Tag Format:** Git tags MUST be prefixed with `v` (e.g., `v1.1.0`).
2.  **Package Version:** The `version` field in `package.json` MUST NOT include the `v` prefix (e.g., `"version": "1.1.0"`).
3.  **Creation:** Tags MUST be created only after the Mandatory Pre-Commit Workflow passes.
4.  **Command:** Use `git tag -a vX.Y.Z -m "Release vX.Y.Z"` to create an annotated tag.
5.  **Sync:** The numerical version in `package.json` must match the numerical part of the Git tag.

- **Common Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

## 4. Project Layout

The project structure is organized to separate concerns and modularize core logic:

- **`lib/`**: Primary source code directory.
- **`test/`**: Full unit and integration test suite.

## 5. Appendix: Document Structure Rationale
This section describes the technical and logical reasons, based on how an AI Agent processes context, that determined the current organization of the document:

1. **Priority and Visibility (The most important reason):**
    * Operational mandates and environmental constraints (the "laws of physics" for the Agent) must be placed at the very beginning of the document. This ensures they are read and processed immediately, establishing the baseline for all subsequent actions.
    * Critical rules placed later in the document risk having less "weight" or attention compared to the initial context, potentially leading to errors in execution.

2. **Distinction of Purpose:**
    * **Runtime Constraints:** These define HOW the agent interacts with the operating system and filesystem. They are non-negotiable security and functional boundaries.
    * **Engineering Standards:** These define WHAT constitutes high-quality output and project alignment. They are standards for the final product and collaborative workflow.

3. **Logical Flow:**
    An effective documentation structure follows a predictable hierarchy:
    1. **Identity and Environment:** Establishes who the agent is and the physical/digital boundaries of the workspace.
    2. **Domain Knowledge:** Provides the specific context of the codebase, business logic, and architecture.
    3. **Contribution Workflow:** Outlines the standards and procedures for making changes to the project.
