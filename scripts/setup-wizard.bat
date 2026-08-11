@echo off
REM Setup Wizard para QuizMaster - Windows

setlocal enabledelayedexpansion

cls
echo.
echo ========================================
echo   QuizMaster Setup Wizard
echo   Configuracion Interactiva
echo ========================================
echo.
echo Tiempo estimado: 2 minutos
echo.

set /p has_creds="¿Ya obtuviste tus 3 credenciales? (s/n): "

if /i not "%has_creds%"=="s" (
  echo.
  echo Abre QUICK_START.md para obtener credenciales:
  echo   1. Supabase: https://app.supabase.com
  echo   2. Claude API: https://console.anthropic.com
  echo.
  echo Luego ejecuta: npm run setup-wizard
  echo.
  pause
  exit /b 0
)

echo.
echo Perfecto! Ahora necesito que pegues tus 3 valores...
echo (Puedes copiar/pegar directamente)
echo.

REM Supabase URL
echo 1 - NEXT_PUBLIC_SUPABASE_URL
echo (De: Supabase Settings ^> API ^> Project URL)
echo.
set /p supabase_url="Pega tu URL: "

if not "!supabase_url!"=="" (
  echo OK - URL agregada
) else (
  echo ERROR - URL requerida
  pause
  exit /b 1
)

REM Supabase Anon Key
echo.
echo 2 - NEXT_PUBLIC_SUPABASE_ANON_KEY
echo (De: Supabase Settings ^> API ^> anon public)
echo.
set /p supabase_anon="Pega tu anon key: "

if not "!supabase_anon!"=="" (
  echo OK - Anon key agregada
) else (
  echo ERROR - Anon key requerida
  pause
  exit /b 1
)

REM Supabase Service Role Key
echo.
echo 3 - SUPABASE_SERVICE_ROLE_KEY
echo (De: Supabase Settings ^> API ^> service_role)
echo.
set /p supabase_service="Pega tu service role key: "

if not "!supabase_service!"=="" (
  echo OK - Service role key agregada
) else (
  echo ERROR - Service role key requerida
  pause
  exit /b 1
)

REM Anthropic Key
echo.
echo 4 - ANTHROPIC_API_KEY
echo (De: Anthropic Console ^> Create API Key)
echo.
set /p anthropic_key="Pega tu API key: "

if not "!anthropic_key!"=="" (
  echo OK - API key agregada
) else (
  echo ERROR - API key requerida
  pause
  exit /b 1
)

REM Mostrar resumen
echo.
echo Resumen de credenciales:
echo   - Supabase URL agregada
echo   - Anon Key agregada
echo   - Service Role Key agregada
echo   - Claude API agregada
echo.
set /p confirm="Es esto correcto? (s/n): "

if /i not "%confirm%"=="s" (
  echo Cancelado.
  pause
  exit /b 0
)

REM Crear .env.local
echo.
echo Creando .env.local...

(
  echo NEXT_PUBLIC_SUPABASE_URL=!supabase_url!
  echo NEXT_PUBLIC_SUPABASE_ANON_KEY=!supabase_anon!
  echo SUPABASE_SERVICE_ROLE_KEY=!supabase_service!
  echo ANTHROPIC_API_KEY=!anthropic_key!
  echo NEXT_PUBLIC_APP_URL=http://localhost:3000
) > .env.local

if exist ".env.local" (
  echo OK - .env.local creado exitosamente!
  echo.
  echo Proximos pasos:
  echo.
  echo 1 - Ejecutar migraciones Supabase:
  echo    npm install -g supabase
  echo    supabase login
  echo    supabase link --project-ref PROJECT_ID
  echo    supabase db push
  echo.
  echo 2 - Probar localmente:
  echo    npm run dev
  echo    Abre: http://localhost:3000
  echo.
  echo 3 - Cuando funcione, deployar:
  echo    git push -u origin main
  echo.
  echo ¡Listo! Tu app esta configurada!
) else (
  echo ERROR - No se pudo crear .env.local
)

echo.
pause
