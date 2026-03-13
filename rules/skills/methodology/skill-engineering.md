---
name: SkillEngineering
description: Use when creating new AI skills or updating existing ones. Follows the RED-GREEN-REFACTOR cycle for process documentation.
---

# Skill Engineering & Development

A TDD-based approach to creating high-performance, trigger-reliable AI skills.

## 🛠️ The Skill Creation Cycle (TDD)

1. **RED (Baseline)**: Watch an agent fail or perform sub-optimally without the skill.
2. **GREEN (Implementation)**: Write the minimal `SKILL.md` that solves the detected failure.
3. **REFACTOR (Loopholes)**: Close edge cases, optimize for token efficiency, and add "pushy" descriptions.

## 📋 SKILL.md Anatomy

- **Name**: URL-safe, hyphens only.
- **Description**: Third-person. Start with "Use when...". Focus on **triggering conditions** (symptoms/contexts), NOT what the skill does.
- **Body**:
  - **Overview**: Core principle in 1-2 sentences.
  - **Core Pattern**: Clear before/after examples.
  - **Common Mistakes**: "Anti-patterns" and their fixes.

## 🚀 Optimization (CSO)

- **Pushy Triggering**: Claude tends to "undertrigger". Explicitly tell Claude to use the skill even if the user doesn't ask for it by name.
- **Token Efficiency**: Keep `SKILL.md` under 500 lines. Use nested references for heavy documentation.
- **No Narratives**: Skills are for reusable patterns, not stories about how a problem was solved once.
