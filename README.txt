AI Native CEO — Deploy Package
================================

Содержимое этой папки — готовый сайт + PWA, который можно
загрузить на Vercel за 2 минуты.

Структура:
  index.html              — основной файл курса (100 уроков, 17 модулей)
  manifest.webmanifest    — PWA-манифест (имя, иконки, цвет)
  sw.js                   — Service Worker (офлайн-кэш + auto-update)
  vercel.json             — конфигурация хостинга (заголовки, кэш)
  icons/                  — иконки приложения (Android, iOS, favicon)
  README.txt              — этот файл

Как задеплоить:
  Открой DEPLOY-GUIDE.docx в родительской папке. Там пошагово.

Коротко:
  1. Зарегистрируйся на vercel.com (бесплатно)
  2. New Project → Import → перетащи эту папку deploy/
  3. Жми Deploy
  4. Через ~30 секунд получишь URL вида ai-native-ceo.vercel.app

Для своего домена:
  Project Settings → Domains → Add → впиши ai-native-ceo.com
  (Vercel покажет, какие DNS-записи добавить у регистратора.)

Для PWA (мобильное приложение):
  iOS:     открой сайт в Safari → Поделиться → На экран Домой
  Android: открой сайт в Chrome → меню (три точки) → Установить приложение
  Иконка появится на главном экране телефона как обычное приложение.

Для реальной оплаты (Kaspi / PayBox):
  Открой index.html, найди блок PAYMENT (~строка 1313)
  Замени mode:'demo' на mode:'kaspi' и подставь свой payUrl.
  Подробности — в DEPLOY-GUIDE.docx, раздел «Подключение оплаты».
