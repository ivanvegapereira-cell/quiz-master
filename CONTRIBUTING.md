# Guía de Desarrollo - QuizMaster

## Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de Supabase
- Cuenta de Anthropic (Claude API)
- Git

## Setup Inicial

### 1. Clonar y Instalar

```bash
git clone <repo-url>
cd quiz-master
npm install
```

### 2. Variables de Entorno

Crear archivo `.env.local` con:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
ANTHROPIC_API_KEY=your_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Inicializar Supabase

```bash
# Instalar CLI de Supabase
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your_project_id

# Run migrations
supabase db push
```

### 4. Ejecutar Desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
src/
  ├── app/              # Next.js pages y layouts
  ├── components/       # React components
  ├── lib/              # Utilities y clients
  ├── types/            # TypeScript types
  ├── hooks/            # Custom React hooks
  └── utils/            # Helper functions
```

## Convenciones de Código

- **Naming**: camelCase para funciones/variables, PascalCase para componentes
- **Components**: Usar hooks, preferir functional components
- **Styling**: Tailwind CSS con clase utilities
- **Types**: TypeScript strict mode siempre
- **Error handling**: Try/catch con logging apropiado

## Git Workflow

1. Crear rama: `git checkout -b feature/nombre-feature`
2. Hacer cambios y commits
3. Push a rama: `git push origin feature/nombre-feature`
4. Crear Pull Request en GitHub

### Commit Message Format

```
[TIPO] Descripción corta

Descripción más detallada si es necesario.

- Cambio 1
- Cambio 2
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Testing

```bash
# Run tests
npm test

# Run type check
npm run type-check

# Lint
npm run lint
```

## Deployment

```bash
# Build
npm run build

# Start
npm start
```

## Database

### Migrations

Los archivos SQL en `supabase/migrations/` se ejecutan automáticamente.

Crear nueva migración:

```bash
supabase migration new nombre_migracion
```

### Row Level Security (RLS)

Todas las tablas tienen RLS habilitado. Las políticas están en `002_rls_policies.sql`.

## API Routes

Las rutas API están en `src/app/api/`. Usar Next.js API routes con middleware de autenticación.

### Ejemplo:

```typescript
// src/app/api/quiz/route.ts
export async function GET(req: Request) {
  // TODO: Implement
}
```

## Troubleshooting

### Error de CORS

- Verificar `NEXT_PUBLIC_SUPABASE_URL` en env
- Configurar CORS en Supabase dashboard

### Error de autenticación

- Verificar que `SUPABASE_ANON_KEY` es correcto
- Revisar RLS policies

### Error de Claude API

- Verificar `ANTHROPIC_API_KEY`
- Revisar rate limits

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Claude API Docs](https://docs.anthropic.com)
- [Tailwind Docs](https://tailwindcss.com/docs)

## Contacto

Para preguntas o problemas, contactar al equipo de desarrollo.
