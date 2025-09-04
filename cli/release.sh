#!/bin/bash
set -Eeuo pipefail

current=$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' "./../package.json")
next=$(echo "${current}" | awk -F. -v OFS=. '{$NF += 1 ; print}')

#npm run test:ci  # упадёт с ненулевым кодом при ошибке

git -c credential.helper= -c core.quotepath=false -c log.showSignature=false flow release start "${next}"

# Обновляем версию в package.json
sed -i.bak 's/"version": "[^"]*"/"version": "'"${next}"'"/' './../package.json' && rm './../package.json.bak'

# Коммит изменений версии
git add "./../*"
git commit -m "[release] version update: ${current//v/} to ${next//v/} change"

# Завершаем релиз (merge+tag+back-merge)
GIT_MERGE_AUTOEDIT=no git -c credential.helper= -c core.quotepath=false -c log.showSignature=false flow release finish -m "Tagging version ${next}"
echo "✓ Релиз ${next} успешно завершён."