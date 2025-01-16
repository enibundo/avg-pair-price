#!/bin/sh

curl http://localhost:3000/getAveragePairPrice/$1 \
-H "Accept: application/json"