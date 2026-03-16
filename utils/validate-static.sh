#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INDEX_FILE="${ROOT_DIR}/index.html"

if [[ ! -f "${INDEX_FILE}" ]]; then
    echo "index.html not found at ${INDEX_FILE}"
    exit 1
fi

echo "Checking local static references in index.html..."

missing=0
while IFS= read -r asset; do
    clean_asset="${asset#./}"
    if [[ ! -f "${ROOT_DIR}/${clean_asset}" ]]; then
        echo "Missing: ${asset}"
        missing=1
    fi
done < <(grep -oE '["'"'"']\./assets/[^"'"'"']+["'"'"']' "${INDEX_FILE}" | tr -d '"' | tr -d "'" | sort -u)

if grep -q 'images.unsplash.com' "${INDEX_FILE}"; then
    echo "Warning: external Unsplash image URLs still exist in index.html"
    missing=1
fi

if [[ "${missing}" -eq 0 ]]; then
    echo "All local static references look good."
else
    echo "Validation failed."
    exit 1
fi
