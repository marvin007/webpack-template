## Основное
+ getData - добавляет json данные в pug (src/data/*.json). Имя файла в качестве первичного ключа для данных JSON.
В pug можно обратиться как - .card__title!= getData('card').title
+ npm run make-components "имя-компонента" (-- --vue) - создание компонента,
+ npm run remove-components "имя-компонента" (-- --vue) - удаление компонента,

## Запуск в режиме development
+ npm start -- --arg1 --arg2

### Параматры для включения линтеров
+ lintPug - для pug
+ lintScss - для scss
+ lintJs - для js
+ lint - для всех

## Запуск production сборки
+ npm run build -- --arg1 --arg2

## Возможные проблемы и их решения
+ Возможные проблемы рендеринга clipping paths в svg
https://github.com/w0rm/gulp-svgstore#possible-rendering-issues-with-clipping-paths-in-svg
https://github.com/Hiswe/gulp-svg-symbols#user-content-other-stuff

## Советы по стилю кода
+ https://learn.javascript.ru/coding-style
