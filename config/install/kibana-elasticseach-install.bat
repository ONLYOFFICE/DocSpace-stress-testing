cd "../.."
go install go.k6.io/xk6/cmd/xk6@latest
xk6 build --with github.com/elastic/xk6-output-elasticsearch
cd "config/docker/kibana-elasticsearch"
docker-compose up -d
pause