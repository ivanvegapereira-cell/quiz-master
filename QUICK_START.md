# Quick Start - 5 Minutos a Vercel

## Paso 1: Clonar y Setup Local (2 min)

```bash
cd quiz-master

# Instalar dependencias
npm install

# Crear .env.local (copiar de .env.example)
cp .env.example .env.local
```

## Paso 2: Configurar Servicios (10 min paralelo)

### Supabase (5 min)
1. https://app.supabase.com → New Project
2. Espera ~2 min
3. Settings → API
4. Copia 3 valores a `.env.local`:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

### Claude API (2 min)
1. https://console.anthropic.com
2. Create Key
3. Copia a `ANTHROPIC_API_KEY` en `.env.local`

### Ejecutar Migraciones Supabase
```bash
# Install CLI
npm install -g supabase

# Login
supabase login

# Link (necesitas PROJECT ID de app.supabase.com)
supabase link --project-ref PROJECT_ID

# Aplicar migraciones
supabase db push
```

## Paso 3: Probar Localmente (1 min)

```bash
npm run dev
# Abre http://localhost:3000
```

✅ Verifica:
- Landing page carga
- Dark mode funciona
- Links navegan bien

## Paso 4: Crear Repo GitHub (2 min)

### Opción A: GitHub CLI
```bash
gh repo create quiz-master --public --source=. --push
```

### Opción B: Manual
1. https://github.com/new
2. Nombre: `quiz-master`
3. Create
4. Luego en terminal:
```bash
git remote add origin https://github.com/TU_USUARIO/quiz-master.git
git branch -M main
git push -u origin main
```

## Paso 5: Deploy en Vercel (2 min)

### Opción A: Vercel UI (Recomendado)
1. https://vercel.com/new
2. "Import Git Repository"
3. Selecciona `quiz-master`
4. Agrega Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=xxx
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
   SUPABASE_SERVICE_ROLE_KEY=xxx
   ANTHROPIC_API_KEY=xxx
   NEXT_PUBLIC_APP_URL=https://quiz-master-TUUSERNAME.vercel.app
   ```
5. Deploy

### Opción B: CLI
```bash
npm install -g vercel
vercel login
vercel --prod
# Seguir prompts y agregar env vars
```

## ✅ Verificar Productivo

1. Abre tu URL de Vercel
2. Verifica que:
   - Landing page carga
   - Puedes crear cuenta
   - Dashboard aparece después del login
   - Generar preguntas con IA funciona

## 🎉 ¡Listo!

Tu app está en vivo. Ahora:
- Customiza colores y logo
- Agrega más funcionalidades
- Invita a usuarios

## Troubleshooting Rápido

**Error: "Missing env variables"**
→ Verifica en Vercel Dashboard → Settings → Environment Variables

**Error: "Supabase connection failed"**
→ Verifica que URL y keys son correctas en `.env.local`

**Error: "Claude API failed"**
→ Verifica que API key es válida en console.anthropic.com

## Documentación Completa

- **INSTALLATION.md** - Setup detallado
- **NEXT_STEPS.md** - Pasos siguientes
- **ARCHITECTURE.md** - Cómo funciona
- **DEPLOY.md** - Deployment completo

## Siguiente

Una vez en vivo:
1. Lee NEXT_STEPS.md
2. Continúa con Fase 2 (Autenticación completa)
3. Implementa Fase 3 (CRUD de estudiantes)

¡Éxito! 🚀
