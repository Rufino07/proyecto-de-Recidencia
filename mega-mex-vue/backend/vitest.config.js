// vitest.config.js
// Configuración de Vitest para el backend de Mega-Mex
// Ejecutar con: npm test

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Solo archivos .test.js dentro de la carpeta tests/
    include: ['tests/**/*.test.js'],

    // Entorno Node (no navegador, porque es backend)
    environment: 'node',

    // Reporter detallado en consola
    reporter: 'verbose',

    // Limpia mocks automáticamente entre cada test
    clearMocks: true,

    // Cobertura de código
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // Solo medimos cobertura del código fuente real
      include: ['src/**/*.js'],
      // Excluimos lo que no tiene sentido probar
      exclude: [
        'src/server.js',
        'src/app.js',
        'node_modules/**',
        'tests/**'
      ]
    }
  }
})