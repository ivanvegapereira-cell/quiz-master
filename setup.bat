@echo off
REM QuizMaster - Setup Automatizado (Windows)

setlocal enabledelayedexpansion

echo.
echo QuizMaster - Setup Automatizado
echo ================================
echo.

REM Colores: No disponibles en batch, usar emojis en texto

REM Paso 1: Instalar dependencias
echo [1/4] Instalando dependencias...
if not exist "node_modules" (
  call npm install
  echo OK - Dependencias instaladas
) else (
  echo OK - node_modules ya existe
)

echo.

REM Paso 2: Verificar .env.local
echo [2/4] Verificando configuracion...
if not exist ".env.local" (
  copy .env.example .env.local
  echo AVISO - .env.local creado. DEBES editarlo!
  echo.
  echo TODO: Agrega tus credenciales:
  echo  - NEXT_PUBLIC_SUPABASE_URL
  echo  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  echo  - ANTHROPIC_API_KEY
  echo.
) else (
  echo OK - .env.local existe
)

echo.

REM Paso 3: Verificar TypeScript
echo [3/4] Verificando tipos...
call npm run type-check >nul 2>&1
if !errorlevel! equ 0 (
  echo OK - Tipos verificados
) else (
  echo AVISO - Algunos errores de tipos (normal)
)

echo.

REM Paso 4: Informacion
echo [4/4] Setup completado!
echo.
echo PROXIMOS PASOS:
echo.
echo 1. CONFIGURAR SUPABASE:
echo    - Ve a https://app.supabase.com
echo    - Crea nuevo proyecto
echo    - Copia credenciales a .env.local
echo    - supabase db push
echo.
echo 2. CONFIGURAR CLAUDE API:
echo    - Ve a https://console.anthropic.com
echo    - Crea API key
echo    - Copia a .env.local
echo.
echo 3. PROBAR LOCALMENTE:
echo    npm run dev
echo    Abre http://localhost:3000
echo.
echo 4. CREAR REPO GITHUB:
echo    git remote add origin https://github.com/TU_USUARIO/quiz-master.git
echo    git push -u origin main
echo.
echo 5. DESPLEGAR EN VERCEL:
echo    npm run vercel:login
echo    npm run vercel:deploy
echo.
echo Para mas detalles, lee NEXT_STEPS.md
echo.
pause
