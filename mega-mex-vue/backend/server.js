// ============================================
// PUNTO DE ENTRADA DEL SERVIDOR
// ============================================

import app from './src/app.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('')
  console.log('════════════════════════════════════════')
  console.log('🚀  BACKEND MEGA-MEX')
  console.log('════════════════════════════════════════')
  console.log(`   Puerto:     ${PORT}`)
  console.log(`   Entorno:    ${process.env.NODE_ENV}`)
  console.log(`   URL:        http://localhost:${PORT}`)
  console.log(`   Health:     http://localhost:${PORT}/api/health`)
  console.log('════════════════════════════════════════')
  console.log('')
})