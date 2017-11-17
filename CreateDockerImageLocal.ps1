# Creates the docker image and runs it locally
Write-Host "Run docker build"
docker build --no-cache -t haufetechradar .
Write-Host "Created docker image named haufetechradar"

Write-Host "Start image on localhost:80"
docker run -e SERVER_NAMES=localhost -p "8080:80" haufetechradar
