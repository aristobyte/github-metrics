#!/usr/bin/env bash
set -euo pipefail

scripts/check-lint.sh
scripts/check-stylelint.sh
scripts/check-typecheck.sh
scripts/check-tests-unit.sh
scripts/check-tests-server.sh
