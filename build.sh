docker run --rm \
  -v $(pwd):/app \
  -w /app \
  aoepeople/fe-build-env:1.2.0 \
  sh -c "yarn && yarn run build"
