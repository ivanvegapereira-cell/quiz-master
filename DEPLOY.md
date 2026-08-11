# Guía de Deploy - QuizMaster

## Prerequisitos

- Cuenta en GitHub
- Cuenta en Vercel
- Cuenta en Supabase
- Cuenta en Anthropic (Claude API)

## Paso 1: Crear Repositorio en GitHub

### Opción A: Usar GitHub CLI (Recomendado)

```bash
# Instalar GitHub CLI desde https://cli.github.com

# Autenticarse
gh auth login

# Crear repositorio
gh repo create quiz-master --source=. --remote=origin --push
```

### Opción B: Crear Manualmente desde GitHub

1. Ve a https://github.com/new
2. Nombre: `quiz-master`
3. Descripción: "Plataforma educativa interactiva con gamificación"
4. Privado o Público (recomendado privado)
5. No inicialices con README
6. Click en "Create repository"

Luego en tu terminal:

```bash
cd quiz-master

git remote add origin https://github.com/TU_USERNAME/quiz-master.git
git branch -M main
git push -u origin main
```

## Paso 2: Configurar Supabase

1. Ve a https://app.supabase.com
2. Crea nuevo proyecto
3. Completa las credenciales:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Ejecutar Migraciones

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Link con tu proyecto
supabase link --project-ref PROJECT_ID

# Aplicar migraciones
supabase db push
```

## Paso 3: Obtener API Key de Claude

1. Ve a https://console.anthropic.com
2. Crea una nueva API key
3. Copia: `ANTHROPIC_API_KEY`

## Paso 4: Desplegar en Vercel

### Opción A: Desde Vercel UI

1. Ve a https://vercel.com/new
2. Click en "Import Git Repository"
3. Busca y selecciona `quiz-master`
4. Configura variables de entorno:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   ANTHROPIC_API_KEY
   NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
   ```
5. Click en "Deploy"

### Opción B: Usar Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Seguir instrucciones para configurar variables
```

## Paso 5: Conectar Dominio Personalizado (Opcional)

### En Vercel:

1. Ve al proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio personalizado
4. Sigue instrucciones para DNS

### En tu Registrador de Dominios:

Actualiza los registros DNS según las instrucciones de Vercel

## Paso 6: Variables de Entorno Finales

### En Vercel Dashboard:

Settings → Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_APP_URL=https://quiz-master.vercel.app
```

## Testing Post-Deploy

1. Accede a tu URL de Vercel
2. Verifica que la landing page se carga
3. Intenta crear una cuenta
4. Prueba funcionalidades básicas

## Troubleshooting

### Error: "Missing environment variables"
- Verifica que todas las variables están en Vercel
- Redeploy: `vercel --prod`

### Error: "Supabase connection failed"
- Verifica URLs y keys en `.env.local`
- Chequea que el proyecto Supabase está activo

### Error: "Claude API failed"
- Verifica que ANTHROPIC_API_KEY es correcto
- Revisa límites de rate en Anthropic dashboard

## Monitoreo

### Vercel Analytics
- Ve a Vercel Dashboard → Analytics
- Monitorea performance y errores

### Supabase Logs
- Ve a Supabase Dashboard → Database → Query Performance
- Chequea logs de errores

## Actualizaciones Futuras

```bash
# Hacer cambios locales
git add .
git commit -m "feat: descripción"

# Push a GitHub
git push origin main

# Vercel auto-deploya automáticamente
```

## Seguridad

- ✅ Nunca commits .env
- ✅ Usa variables de entorno para secrets
- ✅ RLS habilitado en Supabase
- ✅ CORS configurado
- ✅ Rate limiting en APIs

## Próximos Pasos

1. Customize dominio
2. Setup Analytics
3. Configure Backups automáticos en Supabase
4. Setup monitoring alertas
5. Plan de escalabilidad
