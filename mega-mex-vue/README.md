# 🛒 Mega-Mex

Abarrotes en línea — Proyecto full-stack con autenticación tradicional y OAuth (Google y Facebook).

---

## ✨ Funcionalidades

- ✅ Login tradicional (correo + contraseña con bcrypt)
- ✅ Login con Google (OAuth 2.0)
- ✅ Login con Facebook (OAuth 2.0)
- ✅ Cookies httpOnly con JWT
- ✅ Roles: `admin` y `cliente`
- ✅ Redirección según rol
- ✅ HTTPS local en desarrollo
- ✅ Túnel público con ngrok

---

## 🛠️ Stack Tecnológico

### Frontend
- Vue 3
- Vite
- Vue Router
- @vitejs/plugin-basic-ssl (HTTPS local)

### Backend
- Node.js
- Express
- PostgreSQL (driver `pg`)
- JWT (jsonwebtoken)
- bcrypt
- Helmet
- CORS con lista blanca
- express-rate-limit
- cookie-parser

### Base de datos
- PostgreSQL (base: `mega_mex`)

---

## 📁 Estructura del proyecto