---
name: SubagentWorkflow
description: Use when managing complex tasks that require delegation to specialized subagents. Ensures spec compliance and code quality via a two-stage review process.
---

# Subagent-Driven Development (SDD)

Execute complex plans by dispatching specialized subagents with isolated context and strict review gates.

## 🛰️ Core Protocol

1. **Isolation**: Never inherit the main session's full history. Construct a precise, minimal context for the subagent.
2. **Specialization**: Define the subagent's role (e.g., [Visual Expert], [Connectivity Spec]) based on the task requirement.
3. **Two-Stage Review**:
   - **Gate 1 (Spec Review)**: Verify the implementation matches the technical requirement exactly.
   - **Gate 2 (Quality Review)**: Verify the code follows cleanliness, performance, and style rules.

## 🔄 The Process

- **Dispatch**: Use `run_command` or specific agent-spawning tools.
- **Consult**: Subagents must ask clarifying questions before implementation.
- **Correct**: If a review gate fails, the implementer subagent must fix the gaps until both gates are green.
- **Persist**: Ensure all subagent changes are committed and documented in the main project.

## ⚠️ Red Flags

- Subagent attempts to work without specific instructions.
- Subagent inherits too much irrelevant context (context pollution).
- Skipping the quality review gate for "simple" changes.
