#!/bin/bash
set -e
cd /home/user/app

if [ ! -f "node_modules/express/package.json" ]; then
  echo "Installing dependencies..."
  rm -rf node_modules
  npm install --prefer-offline --no-audit
fi

if [ ! -d "dist" ] && [ -d "static_build" ]; then
  echo "Restoring dist..."
  cp -r static_build dist
fi

echo "Starting DrRehabAtHome server on port 3000..."
exec node server.js
