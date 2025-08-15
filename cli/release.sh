#!/bin/bash
current=$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' "./../package.json")
next=$(echo "${current}" | awk -F. -v OFS=. '{$NF += 1 ; print}')

git -c credential.helper= -c core.quotepath=false -c log.showSignature=false flow release start "${next}"

sed -i.bak 's/"version": "[^"]*"/"version": "'"${next}"'"/' './../package.json' && rm './../package.json.bak';
npm i

git add "./../*"
git commit -m "[release] version update: ${current//v/} to ${next//v/} change"

GIT_MERGE_AUTOEDIT=no git -c credential.helper= -c core.quotepath=false -c log.showSignature=false flow release finish -m "Tagging version ${next}"