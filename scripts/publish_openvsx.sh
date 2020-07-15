#!/bin/bash

echo PREREQ: "yarn install"

echo publish to openvsx ...
OPENVSX_TOKEN=`cat $HOME/.openvsx_token`
echo "OPENVSX_TOKEN=$OPENVSX_TOKEN"
npx ovsx publish -p $OPENVSX_TOKEN
