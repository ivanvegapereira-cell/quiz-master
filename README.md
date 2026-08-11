# 🚀 QuizMaster - Plataforma Educativa Gamificada

Una aplicación moderna tipo **Kahoot** para educadores. Crea actividades competitivas en tiempo real, gestiona estudiantes, proporciona retroalimentación personalizada con IA, y canjea puntos por premios.

**Estado:** ✅ Listo para configuración y deploy  
**Última actualización:** 2024  
**Versión:** 0.1.0

---

## ⚡ 5 Minutos a Vercel

1. **Clonar** → `git clone <tu-repo>`
2. **Instalar** → `npm install`
3. **Configurar** → Agregar credenciales en `.env.local`
4. **Deployar** → `npm run vercel:deploy`

👉 **[Ver QUICK_START.md para instrucciones paso a paso](./QUICK_START.md)**

---

## 🎯 Características

| Característica | Status | Descripción |
|---|---|---|
| 🎮 Sesiones en Vivo | ✅ Base lista | Competencias en tiempo real |
| 👥 Gestión de Estudiantes | ✅ API lista | CRUD con Supabase |
| 🤖 Asistente IA | ✅ API lista | Genera preguntas con Claude |
| 🏆 Sistema de Premios | ✅ Diseñado | Puntos canjeables |
| 📊 Reportes | ⏳ Próximo | Estadísticas y exportación |
| 🌙 Dark Mode | ✅ Completo | Tema claro/oscuro |
| 📱 Responsive | ✅ Completo | Desktop y móvil |
| 🔐 Autenticación | ✅ Supabase | Email/password seguro |

---

## 🛠️ Tech Stack

```
Frontend    Next.js 14 + React + TypeScript + Tailwind CSS
Backend     Next.js API Routes + Supabase PostgreSQL
Auth        Supabase Auth con JWT
Real-time   Supabase RealtimeDB (WebSockets)
IA          Claude 3.5 Sonnet (Anthropic)
Database    PostgreSQL 15 (Supabase)
Deploy      Vercel (auto-deploy en cada push)
CI/CD       GitHub Actions
```

---

## 📖 Documentación

| Documento | Propósito | Tiempo |
|---|---|---|
| [QUICK_START.md](./QUICK_START.md) | Ir a vivo en 5 min | ⚡ |
| [INSTALLATION.md](./INSTALLATION.md) | Setup detallado | 📋 |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Cómo funciona | 🏗️ |
| [NEXT_STEPS.md](./NEXT_STEPS.md) | Próximas fases | 📅 |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Cómo desarrollar | 👨‍💻 |
| [DEPLOY.md](./DEPLOY.md) | Deployment completo | 🚀 |

---

## 🚀 Primeros Pasos

### Requisitos
- Node.js 18+
- npm/yarn/pnpm
- Cuenta Supabase (gratis)
- Cuenta Anthropic (Claude API)
- Cuenta Vercel (gratis)

### Setup Local

```bash
# 1. Clonar
git clone <url> quiz-master
cd quiz-master

# 2. Instalar dependencias
npm install

# 3. Crear .env.local (copiar de .env.example)
cp .env.example .env.local

# 4. Agregar credenciales (ver pasos abajo)
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=
# ANTHROPIC_API_KEY=

# 5. Ejecutar migraciones Supabase
supabase db push

# 6. Iniciar desarrollo
npm run dev

# 7. Abrir http://localhost:3000
```

---

## 🔑 Obtener Credenciales

### 1️⃣ Supabase (2 min)
```
1. https://app.supabase.com → "New Project"
2. Settings → API
3. Copiar:
   - Project URL → NEXT_PUBLIC_SUPABASE_URL
   - Anon key → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - Service role key → SUPABASE_SERVICE_ROLE_KEY
```

### 2️⃣ Claude API (1 min)
```
1. https://console.anthropic.com
2. Create API key
3. Copiar → ANTHROPIC_API_KEY
```

### 3️⃣ Supabase Migrations (2 min)
```bash
npm install -g supabase
supabase login
supabase link --project-ref PROJECT_ID
supabase db push
```

---

## 🌐 Desplegar en Vercel

### Opción A: GitHub + Vercel (Recomendado)

```bash
# 1. Push a GitHub
git remote add origin <tu-repo>
git push -u origin main

# 2. En https://vercel.com/new
# Importar repo de GitHub
# Agregar env vars (ver .env.example)
# Click Deploy
```

### Opción B: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📊 Estructura

```
quiz-master/
├── src/
│   ├── app/               # Páginas Next.js
│   ├── components/        # Componentes React
│   ├── lib/               # Utilidades
│   ├── hooks/             # Custom hooks
│   └── types/             # TypeScript types
├── supabase/
│   └── migrations/        # SQL migrations
├── .github/
│   └── workflows/         # CI/CD
├── QUICK_START.md         # ⭐ Comienza aquí
├── INSTALLATION.md
├── ARCHITECTURE.md
└── NEXT_STEPS.md
```

---

## 🧪 Testing

```bash
npm run type-check
npm run build
npm run start
```

---

## 🤝 Contribuir

Ver [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📝 Licencia

Propiedad educativa - Salesiano Concepción 2024

---

## 🎯 Roadmap

### ✅ v0.1 - Base (Actual)
- Autenticación Supabase
- CRUD de estudiantes
- Generación IA de preguntas
- Dashboard básico

### 📅 v0.2 - Sesiones
- Sesiones en vivo
- Real-time leaderboard
- Puntuación automática

### 📅 v0.3 - Premios
- Sistema de premios
- Canjes
- Reportes

### 📅 v0.4 - Polish
- Offline mode
- Mobile app

---

**👉 [Comienza con QUICK_START.md →](./QUICK_START.md)**
