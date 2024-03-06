
choco install k6
cd "../docker"
docker-compose up -d
docker exec -it influxdb influx
pause