#/bin/sh

cd service-binance
npm run ci
npm run build
cd ../ 

cd service-kraken
npm run ci
npm run build
cd ../

cd service-api
npm run ci
npm run build
cd ../

docker compose build && docker compose up