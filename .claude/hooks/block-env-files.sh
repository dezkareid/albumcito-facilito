#!/bin/bash
input=$(cat)
tool=$(echo "$input" | jq -r '.tool_name // ""')

DENY='{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Blocked: .env files contain secrets and must not be exposed in chat history"}}'

if [ "$tool" = "Read" ]; then
  filepath=$(echo "$input" | jq -r '.tool_input.file_path // ""')
  filename=$(basename "$filepath")
  if echo "$filename" | grep -qE '^\.env(\.[^/]*)?$'; then
    echo "$DENY"
  fi
elif [ "$tool" = "Bash" ]; then
  cmd=$(echo "$input" | jq -r '.tool_input.command // ""')
  if echo "$cmd" | grep -qE '(^|[[:space:]])\.env(\.[a-zA-Z0-9_]+)?([[:space:]]|$|;|>|<|\|)'; then
    echo "$DENY"
  fi
fi

exit 0
