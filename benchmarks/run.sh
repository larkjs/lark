#!/usr/bin/env bash

echo
node --harmony $1 &
pid=$!

sleep 2

wrk 'http://localhost:'$2 \
  -d 3 \
  -c 50 \
  -t 8 \

kill $pid
