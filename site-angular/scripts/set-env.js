/**
 * Gera environment.prod.ts com API_URL vinda da variável de ambiente (Render, etc.).
 * Uso: API_URL=https://sua-api.onrender.com node scripts/set-env.js
 */
const fs = require('fs');
const path = require('path');

const apiUrl = (process.env.API_URL || '/api').replace(/\/$/, ''); // sem barra no final
const out = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');
const content = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
};
`;
fs.writeFileSync(out, content, 'utf8');
console.log('[set-env] environment.prod.ts gerado com apiUrl:', apiUrl);
