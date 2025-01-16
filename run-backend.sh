#/bin/sh

# first we build worker services
cd service-binance
npm run clean 2>/dev/null 
npm install
npm run build
cd .. 

cd service-kraken
npm run clean 2>/dev/null
npm install
npm run build
cd ..

cd service-huobi
npm run clean 2>/dev/null
npm install
npm run build
cd ..

# and we build the api service
cd service-api
npm run clean 2>/dev/null
npm install
npm run build
cd ..

# we run everything
docker compose build && docker compose up