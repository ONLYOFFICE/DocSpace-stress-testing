choco install k6
cd "../docker/grafana-influxdb"
docker-compose up -d
docker exec -it influxdb influx
pause