# deploy the docker image to the rmote host on Azure and starts it

# set docker env to remote host
& "docker-machine" env haufe-techradar-vm | Invoke-Expression
# build 
docker build --no-cache -t haufetechradar .
# run
docker run -e SERVER_NAMES=haufe-techradar.westeurope.cloudapp.azure.com -p "80:80" haufetechradar
# attach to the docker container 
# docker ps # to get the container id
# docker exec -i -t d521dace9411 bash
# http://haufe-techradar.westeurope.cloudapp.azure.com/techradar


