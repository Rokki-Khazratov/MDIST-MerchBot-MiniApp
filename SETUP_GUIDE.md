# 🚀 Setup Guide - BioBoost Merch Shop

## Быстрый Старт (5 минут)

### Шаг 1: Установка Зависимостей
```bash
cd /Users/rokki/Desktop/mdist-merch/frontend-app
npm install
```

### Шаг 2: Исправление Tailwind

#### Вариант A: Без Tailwind (самый быстрый)
```bash
# Ничего не делать - использовать inline styles
# Все компоненты работают без Tailwind
```

#### Вариант B: С Tailwind
```bash
# 1. Установить правильные версии
npm install -D tailwindcss@3.3.3 postcss@8.4.31 autoprefixer@10.4.16

# 2. Инициализировать конфиг
npx tailwindcss init -p

# 3. Создать tailwind.config.js (см. ниже)
```

**tailwind.config.js:**
```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: { DEFAULT: '#0A0A0A', secondary: '#1A1A1A', tertiary: '#2A2A2A' },
        foreground: { DEFAULT: '#FFFFFF', secondary: '#A0A0A0', muted: '#666666' },
        border: { DEFAULT: '#2A2A2A' },
      },
    },
  },
  plugins: [],
}
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #0A0A0A;
  color: #FFFFFF;
}
```

### Шаг 3: Создать Недостающие Файлы

#### index.html
```html
<!DOCTYPE html>
<html lang="ru" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BioBoost - Merch Shop</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### tsconfig.node.json
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### Шаг 4: Запустить
```bash
npm run dev
```

Откроется: `http://localhost:5173`

## 📋 Checklist

- [ ] Установлены зависимости (`npm install`)
- [ ] Создан `index.html`
- [ ] Создан `tsconfig.json`
- [ ] Создан `vite.config.ts` (уже есть)
- [ ] Решена проблема с Tailwind
- [ ] Созданы все компоненты (см. FRONTEND_SPECIFICATION.md)
- [ ] Созданы stores
- [ ] Созданы pages
- [ ] Создан router
- [ ] Приложение запускается

## 🐛 Troubleshooting

### Ошибка: "Cannot find module"
```bash
npm install
```

### Ошибка: Tailwind PostCSS
```bash
# Удалить node_modules
rm -rf node_modules package-lock.json
npm install
```

### Ошибка: Port already in use
```bash
# Изменить порт в vite.config.ts:
server: { port: 5174 }
```

## 📞 Поддержка

См. полную спецификацию: `/Users/rokki/Desktop/mdist-merch/frontend/FRONTEND_SPECIFICATION.md`

