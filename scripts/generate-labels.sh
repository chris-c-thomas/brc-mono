#!/bin/bash

# Define labels with proper quoting to handle spaces and colons
LABELS=(
  "type: feature|0E8A16"
  "type: bug|D93F0B"
  "type: fix|B60205"
  "type: chore|FBCA04"
  "type: docs|006B75"
  "type: refactor|1D76DB"
  "type: tests|5319E7"
  "type: performance|C2E0C6"
  "type: dependencies|7057FF"
  "type: security|D73A4A"
  "priority: critical|B60205"
  "priority: high|D93F0B"
  "priority: medium|FBCA04"
  "priority: low|0E8A16"
  "status: awaiting review|FBCA04"
  "status: in progress|1D76DB"
  "status: blocked|D93F0B"
  "status: needs changes|B60205"
  "status: on hold|E99695"
  "status: stale|EEEEEE"
  "difficulty: beginner-friendly|0E8A16"
  "difficulty: intermediate|FBCA04"
  "difficulty: advanced|D93F0B"
  "tooling: ci/cd|1D76DB"
  "tooling: linting|C2E0C6"
  "tooling: build|7057FF"
  "tooling: automation|006B75"
  "tooling: release|E99695"
  "release: major|B60205"
  "release: minor|1D76DB"
  "release: patch|0E8A16"
  "skip-changelog|EEEEEE"
  "good first issue|0E8A16"
  "help wanted|006B75"
  "discussion|FBCA04"
  "duplicate|EEEEEE"
  "wontfix|E99695"
  "invalid|EEEEEE"
)

# Loop through labels and create each one using GitHub CLI
for LABEL in "${LABELS[@]}"; do
  NAME="${LABEL%|*}"
  COLOR="${LABEL#*|}"
  echo "Creating label: \"$NAME\" with color #$COLOR"
  gh label create "$NAME" --color "$COLOR" --force
done