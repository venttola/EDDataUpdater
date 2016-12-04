#!/bin/bash

cd client
npm run tsc:w &
cd ..
gulp start