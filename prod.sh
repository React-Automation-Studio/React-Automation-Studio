docker rm $(docker ps -a -q) -f
docker volume prune -f
docker-compose up --build