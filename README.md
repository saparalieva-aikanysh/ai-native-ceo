# AI Native CEO

Курс-приложение для руководителей без технического бэкграунда: 100 уроков, 17 модулей, прогресс, квизы, сертификат.

**Live:** появится здесь после деплоя на Vercel (`https://<your-project>.vercel.app`)

## Что внутри

| Файл | Назначение |
|------|------------|
| `index.html` | Сам курс — однофайловое SPA (HTML + CSS + JS) |
| `manifest.webmanifest` | PWA-манифест: имя, иконки, цвет |
| `sw.js` | Service Worker — офлайн-кэш и автообновление |
| `vercel.json` | Конфиг хостинга — заголовки, кэш, безопасность |
| `icons/` | Иконки приложения (Android, iOS, favicon, OG) |

## Деплой

1. Этот репозиторий импортируется в [Vercel](https://vercel.com) → проект разворачивается за ~30 секунд.
2. Каждое изменение в `main` автоматически передеплоивает сайт.
3. Свой домен подключается в Project Settings → Domains.

## PWA (мобильное приложение)

После деплоя сайт устанавливается как нативное приложение:

- **iOS:** Safari → Поделиться → На экран «Домой»
- **Android:** Chrome → меню (три точки) → Установить приложение
- **Desktop:** Chrome/Edge → иконка установки в адресной строке

## Подключение реальной оплаты

В `index.html` найди блок `PAYMENT` (≈строка 1313):

```js
const PAYMENT = {
  mode: 'demo',                 // 'demo' | 'kaspi' | 'paybox' | 'stripe'
  payUrl: '',                   // например 'https://pay.kaspi.kz/pay/XXXXXXXX'
  amount: PRICE,
  currency: 'USD',
  successReturn: '/?paid=1',
  cancelReturn: '/?cancel=1'
};
```

Поменяй `mode` на нужный провайдер и подставь свой `payUrl`.

## Стек

Чистый HTML/CSS/JS, без сборки и зависимостей. Любой статический хостинг подойдёт (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

---

Подробная инструкция по деплою и стратегии запуска — в файле `DEPLOY-GUIDE.docx` (в родительской папке проекта).
