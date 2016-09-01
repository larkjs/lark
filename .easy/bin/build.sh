#!/bin/bash

path=$(dirname $0)
path=${path/\./$(pwd)}

cd $path/..

echo 'Starting to build ... '
node_modules/.bin/easy release -v 4
