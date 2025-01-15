#/bin/sh

cd service-binance
npm run clean
npm run build
cd ../ 

cd service-kraken
npm run clean
npm run build
cd ../

cd service-api
npm run clean
npm run build
cd ../

docker compose build && docker compose up