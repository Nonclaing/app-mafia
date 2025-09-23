#!/bin/bash

# Check if API_URL environment variable is set
if [ -z "$API_URL" ]; then
    echo "Error: API_URL environment variable is not set"
    exit 1
fi

# Check if X_API_KEY environment variable is set
if [ -z "$X_API_KEY" ]; then
    echo "Error: X_API_KEY environment variable is not set"
    exit 1
fi

# Download OpenAPI specification
echo "Downloading OpenAPI specification..."
curl -fsSL -H "X-API-KEY: $X_API_KEY" "$API_URL/rest-doc" -o temp_openapi.yml

if [ $? -eq 0 ]; then
    # Replace existing file
    mv temp_openapi.yml "./../app/api/openapi.yml"
    echo "OpenAPI specification successfully updated"
else
    echo "Failed to download OpenAPI specification"
    rm -f temp_openapi.yml
    exit 1
fi