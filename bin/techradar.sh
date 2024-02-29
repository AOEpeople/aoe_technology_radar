#!/bin/bash

CWD=$(pwd)
BUILDER_DIR="$CWD/.techradar"
SOURCE_DIR="$CWD/node_modules/aoe_technology_radar"

PARAMETER=$1 # "build" or "serve"

function info {
  echo -e "\033[32m$1\033[0m"
}

function error {
  echo "Error: $1"
  exit 1
}

# create builder dir by copying source dir if it does not exist
if [ ! -d "$BUILDER_DIR" ]; then
  cp -R "$SOURCE_DIR" "$BUILDER_DIR" || error "Could not copy $SOURCE_DIR to $BUILDER_DIR"
  cd "$BUILDER_DIR" || error "Could not change to $BUILDER_DIR"
  info "Installing npm packages"
  npm install || error "Could not install npm packages"
fi

cp -R "$CWD/radar" "$BUILDER_DIR/data/radar" || error "Could not copy $CWD/radar to $BUILDER_DIR/data/radar"
cp -R $CWD/public/* "$BUILDER_DIR/public/" || error "Could not copy $CWD/public to $BUILDER_DIR/public"
cd "$BUILDER_DIR" || error "Could not change to $BUILDER_DIR"

info "Building data"
npm run build:data

if [ "$PARAMETER" == "serve" ]; then
  info "Starting techradar"
  npm run dev
fi

if [ "$PARAMETER" == "build" ]; then
  info "Building techradar"
  npm run build
  if [ -d "$CWD/build" ]; then
    rm -rf "$CWD/build"
  fi
  info "Copying techradar to $CWD/build"
  mv "$BUILDER_DIR/out" "$CWD/build"
fi
