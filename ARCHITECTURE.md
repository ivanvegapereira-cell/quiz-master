# Arquitectura de QuizMaster

## Visión General

QuizMaster es una plataforma educativa full-stack que permite a los docentes crear actividades gamificadas, gestionar estudiantes, y proporcionar retroalimentación personalizada usando IA.

```
┌─────────────────────────────────────────────────────────────┐
│                     Cliente Navegador                        │
│  (Landing, Auth, Dashboard, Quiz, Live Session, Reportes)   │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTP / WebSocket
                         │
┌────────────────────────┴────────────────────────────────────┐
│              Next.js Server (Vercel)                         │
│                                                               │
│  ├─ Pages (src/app)     - Server & Client Components         │
│  ├─ API Routes (src/app/api) - Backend Logic                │
│  └─ Lib (src/lib)       - Utilities & Integrations          │
└────────────────────────┬────────────────────────────────────┘
                         │
      ┌──────────────────┼──────────────────┐
      │                  │                  │
      ▼                  ▼                  ▼
  ┌─────────┐      ┌──────────┐      ┌──────────┐
  │ Supabase│      │ Anthropic│      │ Supabase │
  │(PostgreSQL)   │(Claude)   │      │(Real-time)
  │  RLS + Auth   │  API      │      │ Broadcast│
  └─────────┘      └──────────┘      └──────────┘
```

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + Componentes custom
- **Estado**: Zustand (si es necesario)
- **Iconos**: Lucide React
- **Tema**: next-themes (claro/oscuro)

### Backend
- **Runtime**: Node.js (Vercel Edge/Serverless)
- **API**: Next.js API Routes
- **Base de Datos**: Supabase PostgreSQL
- **Auth**: Supabase Auth
- **Real-time**: Supabase RealtimeDB
- **ORM**: Direct SQL + Supabase JS Client

### IA/ML
- **Modelo**: Claude 3.5 Sonnet (Anthropic)
- **Funciones**:
  - Generación de preguntas
  - Retroalimentación personalizada
  - Análisis de respuestas

### Infraestructura
- **Hosting**: Vercel
- **DB Hosting**: Supabase Cloud
- **CI/CD**: GitHub Actions
- **Monitoreo**: Vercel Analytics + Supabase Logs

## Componentes Principales

### 1. Sistema de Autenticación

```typescript
// Flujo
Usuario → signup/login → Supabase Auth 
       → JWT Token → Auth State (cookies/localStorage)
       → Acceso protegido a Dashboard
```

**Tabla Clave**: `public.users`

### 2. Gestión de Quiz

```typescript
// Jerarquía
Teacher (User)
  ├─ Quiz (multiple)
  │   ├─ Questions (multiple)
  │   │   └─ Options (multiple)
  │   └─ Live Sessions (multiple)
```

**Tablas Clave**: 
- `quizzes`
- `questions` 
- `question_options`

### 3. Sistema de Estudiantes

```typescript
// Estructura
Teacher (User)
  ├─ Students (individual/grupo)
  │   ├─ Student Answers (durante sesión)
  │   └─ Reward Transactions (canjes)
  └─ Student Groups (organización)
```

**Tablas Clave**:
- `students`
- `student_groups`
- `student_answers`
- `reward_transactions`

### 4. Sesión en Vivo

```typescript
// Flujo
1. Docente inicia sesión → LiveSession (status: 'waiting')
2. Estudiantes unen con código → Real-time sync
3. Docente abre pregunta → Todos ven pregunta
4. Estudiantes responden → Instant scoring + leaderboard
5. Docente termina → Analytics y feedback IA
```

**Tablas Clave**:
- `live_sessions`
- `student_answers`
- `leaderboards`
- `student_feedback_guides`

### 5. Integración con IA

```typescript
// Generación de Preguntas
Docente → Selecciona parámetros 
       → API Call → Claude API
       → Retorna preguntas JSON
       → Docente revisa/edita
       → Agrega al quiz

// Retroalimentación
Sesión termina → Analizamos respuestas de estudiante
             → Generamos guía remedial con Claude
             → Guardamos en BD
             → Estudiante ve su guía personalizada
```

**Endpoints**:
- `POST /api/ai/generate-questions`
- `POST /api/ai/generate-feedback`

## Flujos de Datos

### Flujo de Autenticación
```
Client (signup) → Supabase Auth API
                → JWT Token
                → Set Cookie/LocalStorage
                → Protected Routes Middleware
                → Access Dashboard
```

### Flujo de Quiz
```
Docente crea → API POST /api/quiz
            → Validación
            → Guardar en Supabase
            → Retornar ID
            → Redirect a editor

Editor de preguntas → API POST /api/questions
                   → Validación
                   → Guardar en Supabase
                   → Update UI en tiempo real
```

### Flujo de Sesión en Vivo
```
1. Iniciar sesión
   Docente → POST /api/sessions
          → Crear live_session
          → Generar código único
          → Retornar código

2. Estudiante se une
   Estudiante (código) → POST /api/sessions/join
                      → Validar código
                      → Subscribe a WebSocket
                      → Sincronizar estado

3. Responder pregunta
   Estudiante (opción) → POST /api/answers
                      → Validar respuesta
                      → Calcular puntos
                      → Update leaderboard en tiempo real

4. Terminar sesión
   Docente → POST /api/sessions/:id/end
          → Generar estadísticas
          → Llamar Claude para feedback
          → Guardar guías remediales
          → Retornar analytics
```

## Seguridad

### Row Level Security (RLS)

```sql
-- Docentes ven solo sus datos
SELECT * FROM quizzes WHERE teacher_id = auth.uid()

-- Estudiantes ven solo datos de sus sesiones
SELECT * FROM student_answers WHERE student_id = auth.uid()
```

### Validación

- ✅ Email verification en signup
- ✅ Request validation en API routes
- ✅ Rate limiting (TODO)
- ✅ CORS configurado

### Datos Sensibles

- ✅ API Keys en variables de entorno
- ✅ JWT tokens en httpOnly cookies
- ✅ Service role key solo en servidor
- ✅ .env nunca en git

## Performance

### Optimizaciones

1. **Frontend**:
   - Next.js Server Components (SSR)
   - Image optimization
   - Code splitting automático
   - Lazy loading de componentes

2. **Backend**:
   - Índices en FK y búsquedas frecuentes
   - Prepared statements (previene SQL injection)
   - Caching en cliente con SWR

3. **Base de Datos**:
   - Indexes en columnas frecuentes
   - Connection pooling (Supabase)
   - Vacuum automático

### Limites

- máx 20 preguntas por generación IA
- máx 1000 estudiantes por docente (escalable)
- máx 5 sesiones concurrentes por docente

## Escalabilidad

### Horizontal
- Vercel auto-scala servidores
- Supabase auto-scala DB
- CDN global de assets

### Vertical
- Upgrade plan Supabase si es necesario
- Aumentar rate limits en Claude API
- Caché con Redis (TODO)

## Roadmap Técnico

### v1.0 (Actual)
- ✅ CRUD Quiz
- ✅ Gestión Estudiantes
- ✅ Sesiones en vivo basic
- ✅ Generación IA de preguntas
- ✅ Retroalimentación IA

### v1.1
- ⏳ Soporte offline
- ⏳ Exportar reportes (Excel/PDF)
- ⏳ Integración Google Classroom
- ⏳ Mobile app (React Native)

### v2.0
- ⏳ Más tipos de preguntas (drag-drop, etc)
- ⏳ Gamificación avanzada (insignias, niveles)
- ⏳ API pública para integraciones
- ⏳ LMS integrations (Canvas, Moodle)

## Monitoreo

### Logs
- **Vercel**: Console logs automático
- **Supabase**: Query logs en dashboard
- **Cliente**: Browser console + Sentry (TODO)

### Métricas
- Response times
- Error rates
- User analytics
- Database performance

## Testing

### Actual
- Manual testing en desarrollo

### Planeado
- Unit tests (Jest)
- Integration tests (Cypress/Playwright)
- E2E tests (Vercel Preview)
- Load testing (k6)

## Deployment

Ver DEPLOY.md para instrucciones de deploy en Vercel y setup de Supabase.

## Contribución

Ver CONTRIBUTING.md para guía de desarrollo y standards de código.
