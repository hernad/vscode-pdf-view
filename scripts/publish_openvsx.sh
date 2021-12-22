#!/bin/bash

echo PREREQ: "yarn install"

if  [[ ! -f out/extension.js ]]
then
   echo "gdje je extension.js?"
   exit 100
fi


echo publish to openvsx ...
OPENVSX_TOKEN=`cat $HOME/.openvsx_token`
echo "OPENVSX_TOKEN=$OPENVSX_TOKEN"
npx ovsx publish -p $OPENVSX_TOKEN
