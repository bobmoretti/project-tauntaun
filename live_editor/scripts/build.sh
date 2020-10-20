#!/bin/bash

if [ $(basename "$PWD") != "project-tauntaun" ]
then
  echo "Must be run from project_tauntaun directory!"
  exit
fi

live_editor/scripts/setup_env.sh
live_editor/scripts/gen_static.sh

source env/bin/activate
pushd live_editor/frontend && yarn build && popd

cp -r live_editor/frontend/build live_editor/backend/tauntaun_live_editor/data/client