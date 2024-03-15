# Minimal Makefile for building the radar with Google App Engine deployment

# Source directory
SRC_DIR = .

# build directory
BUILD_DIR = out

# Google App Engine project ID
PROJECT_ID = biolizard-online-cloud-330511

# Google App Engine version
VERSION = v1

.PHONY: clean build deploy help

# Build 
build:
	@echo "Building radar..."
	@npm run build:data
	@npm run build:icons
	@npm run build

# Clean the generated files
clean:
	@echo "Cleaning generated files..."
	@rm -rf $(BUILD_DIR)

# Deploy the built documentation to Google App Engine
deploy:
	@echo "Deploying to Google App Engine..."
	@gcloud app deploy app.yaml --project $(PROJECT_ID) -q

# Help target to display available targets
help:
	@echo "Available targets:"
	@echo "  build    : Build radar"
	@echo "  clean    : Clean generated files"
	@echo "  deploy   : Deploy radar to Google App Engine"
	@echo "  help     : Display this help message"
