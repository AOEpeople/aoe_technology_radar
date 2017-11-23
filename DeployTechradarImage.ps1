# deploy the docker image to the rmote host on Azure and starts it
Set-PSDebug -Trace 1

# set docker env to remote host
& "docker-machine" env haufe-techradar-vm | Invoke-Expression
# stop existing container
docker stop $(docker ps -q --filter ancestor=haufetechradar )
# build 
docker build --no-cache -t haufetechradar .
# run
docker run -e SERVER_NAMES=haufe-techradar.westeurope.cloudapp.azure.com -p "80:80" haufetechradar
# attach to the docker container 
# docker ps # to get the container id
# docker exec -i -t 02f067fc0b36 bash
# to delete the image
# docker rmi haufetechradar
# to stop the running container
# docker container stop <containerid>
# docker stop $(docker ps -q --filter ancestor=haufetechradar )

# run the tech radar in browser
# http://haufe-techradar.westeurope.cloudapp.azure.com/techradar


