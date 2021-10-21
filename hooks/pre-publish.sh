#!/bin/sh
branch=$(git rev-parse --symbolic --abbrev-ref HEAD)
if [ "main" != "$branch" ]; then
  echo ".git/hooks: Must publish package from branch: main"
  exit 1
fi
