[tailwindcss を導入する](https://tailwindcss.com/docs/guides/nextjs)

上記のページを参考に npx 系は npx のまま npm 系は yarn コマンドに変更する

> yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest

> npx tailwindcss init -p

```js
// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
