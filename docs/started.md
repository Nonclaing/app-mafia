# Как начать работу с boilerplate

## Клонируем репозиторий в новый каталог

```bash
#!/bin/bash
git clone -b master --depth 1 git@gitlab.intervolga.ru:proj/frontend/boilerplates/app.nuxt.skeleton.git app.nuxt
cd app.nuxt
rm -rf .git
git init 
git add . 
git commit -m "Initial commit from latest master"
echo "✅ app.nuxt создан из шаблона."
```