# Guía de Instalación - QuizMaster

## Requisitos del Sistema

- Node.js 18.17.0 o superior
- npm 9.0.0 o superior (o yarn/pnpm)
- Git
- Un navegador moderno

## Instalación Rápida (5 minutos)

### 1. Clonar o Descargar

```bash
# Clonar desde GitHub
git clone https://github.com/tu-usuario/quiz-master.git
cd quiz-master

# O descargar ZIP y extraer
unzip quiz-master.zip
cd quiz-master
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar Variables de Entorno

Copiar `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Editar `.env.local` y agregar tus credenciales:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
ANTHROPIC_API_KEY=tu_api_key_anthropic
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Ejecutar el Servidor de Desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre tu navegador en: **http://localhost:3000**

## Setup Detallado

### Configurar Supabase

**Paso 1: Crear Proyecto en Supabase**

1. Ve a https://app.supabase.com
2. Click en "New Project"
3. Completa los detalles:
   - Nombre: `quiz-master`
   - Database password: (guarda en lugar seguro)
   - Region: Elige la más cercana a ti
4. Click "Create new project" y espera ~2 minutos

**Paso 2: Obtener Credenciales**

1. En el dashboard de Supabase, ve a Settings → API
2. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** (bajo Key) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** (bajo Key) → `SUPABASE_SERVICE_ROLE_KEY`
3. Pega en tu `.env.local`

**Paso 3: Ejecutar Migraciones**

```bash
# Instalar Supabase CLI si no lo tienes
npm install -g supabase

# Login con tu cuenta Supabase
supabase login

# Obtener tu project ID de https://app.supabase.com/
# Luego linkear:
supabase link --project-ref YOUR_PROJECT_ID

# Aplicar migraciones
supabase db push
```

✅ **Nota:** Si ves confirmaciones de migraciones, todo está correcto.

### Configurar Claude API

**Paso 1: Obtener API Key**

1. Ve a https://console.anthropic.com
2. Click en "Create Key" (o "API Keys" si ya tienes)
3. Copia la key
4. Pega en `ANTHROPIC_API_KEY` en `.env.local`

⚠️ **Importante:** Nunca hagas commit de tu API key

### Verificar Setup

Ejecutar verificación:

```bash
npm run type-check
```

Debería mostrar:
- ✅ No errors
- Sin problemas de tipos TypeScript

## Estructura de Carpetas

```
quiz-master/
├── src/
│   ├── app/              # Páginas Next.js
│   ├── components/       # Componentes React
│   ├── lib/              # Utilities (Supabase, Claude, etc)
│   ├── types/            # TypeScript types
│   └── styles/           # CSS global
├── public/               # Assets estáticos
├── supabase/
│   └── migrations/       # SQL migrations
└── package.json          # Dependencias
```

## Desarrollo

### Acceder a la Aplicación

1. Landing: http://localhost:3000
2. Dashboard: http://localhost:3000/dashboard (después de login)
3. Estudiantes: http://localhost:3000/students
4. Asistente IA: http://localhost:3000/ai-assistant
5. Premios: http://localhost:3000/rewards

### Notas de Desarrollo

- **Hot Reload**: Los cambios en archivos se reflejan automáticamente
- **Errores en Consola**: Abre DevTools (F12) para ver logs
- **Modo Oscuro**: Toggle en la navbar (solo en dashboard)
- **Responsive**: Prueba en móvil con DevTools (F12 → Toggle device toolbar)

### Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Start servidor en producción
npm start

# Verificar tipos
npm run type-check

# Lint de código
npm run lint
```

## Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "NEXT_PUBLIC_SUPABASE_URL is missing"

- ✅ Verifica que `.env.local` existe
- ✅ Verifica que tienes las variables
- ✅ Reinicia el servidor: Ctrl+C y `npm run dev` nuevamente

### Error: "Supabase: Database error"

- ✅ Verifica que migraciones se aplicaron: `supabase db push`
- ✅ Verifica conexión a internet
- ✅ Chequea que URL y keys son correctas

### Error: "Claude API error"

- ✅ Verifica que API key es correcto
- ✅ Chequea rate limits en https://console.anthropic.com
- ✅ Verifica que tienes créditos disponibles

### La landing page se ve rara

- ✅ Limpia cache: Ctrl+Shift+Delete (o Cmd+Shift+Delete en Mac)
- ✅ Fuerza reload: Ctrl+F5 (o Cmd+Shift+R en Mac)
- ✅ Abre en modo incógnito para descartar extensiones

## Pasos Siguientes

1. ✅ Crea tu primera cuenta (signup)
2. ✅ Accede al dashboard
3. ✅ Agrega algunos estudiantes
4. ✅ Prueba el asistente IA
5. ✅ Explora todas las páginas
6. ✅ Cuando todo funcione, sigue DEPLOY.md

## Documentación

- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [Claude API](https://docs.anthropic.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Soporte

Si encuentras problemas:

1. 🔍 Revisa los logs en la consola del navegador (F12)
2. 🔍 Revisa los logs del servidor (terminal donde corre `npm run dev`)
3. 📖 Consulta CONTRIBUTING.md para guía de desarrollo
4. 💬 Abre un issue en GitHub

## ¡Listo!

Felicidades! Ya tienes QuizMaster ejecutándose localmente. 🎉

Próximo paso: Revisa el dashboard y familiarízate con la interfaz antes de hacer deploy.
