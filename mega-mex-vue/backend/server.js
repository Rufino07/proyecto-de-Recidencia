// ============================================
// PUNTO DE ENTRADA DEL SERVIDOR
// ============================================

import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'

// Cargar backend/.env antes de inicializar la aplicación.
// En Railway se usarán las variables del servicio.
dotenv.config({
  path: fileURLToPath(new URL('./.env', import.meta.url))
})

// Importar la aplicación después de cargar las variables.
const { default: app } = await import('./src/app.js')

const PORT = Number(process.env.PORT || 3000)
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log('')
  console.log('════════════════════════════════════════')
  console.log('🚀  BACKEND MEGA-MEX')
  console.log('════════════════════════════════════════')
  console.log(`   Puerto:  ${PORT}`)
  console.log(`   Entorno: ${process.env.NODE_ENV || 'development'}`)
  console.log(`   Host:    ${HOST}`)
  console.log(`   Health:  /api/health`)
  console.log('════════════════════════════════════════')
  console.log('')
})