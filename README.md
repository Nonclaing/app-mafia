# Стартовый проект Nuxt.js

Ознакомьтесь с [документацией Nuxt](https://nuxt.com/docs/getting-started/introduction), чтобы узнать больше.

## Установка

Убедитесь, что установили зависимости:

```bash
# npm
npm install

# bun
bun install
```

## Сервер разработки

Запустите сервер разработки по адресу `http://localhost:3000`:

```bash
# npm
npm run dev

# bun
bun run dev
```

## Продакшн

Соберите приложение для продакшна:

```bash
# npm
npm run build

# bun
bun run build
```

Локально просмотрите продакшн-сборку:

```bash
# npm
npm run preview

# bun
bun run preview
```

Подробности смотрите в [документации по деплою](https://nuxt.com/docs/getting-started/deployment).

## Релиз
Используй [release.sh](cli/release.sh) для обновления ветки master

## CI/CD
### Для настройки CI
- С SSR перенесите файлы из каталога [ssr](.ci/templates/ssr) в корень проекта
- Без SSR перенесите файлы из [static](.ci/templates/static) в корень проекта

Подробности смотрите в [документации по CI](https://gitlab.intervolga.ru/proj/devops/pipelines/-/blob/master/readme.md?ref_type=heads)
