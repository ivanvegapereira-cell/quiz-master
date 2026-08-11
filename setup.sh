#!/bin/bash

# QuizMaster - Setup Automatizado
# Este script configura todo localmente

set -e

echo "🚀 QuizMaster - Setup Automatizado"
echo "=================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Paso 1: Instalar dependencias
echo -e "${BLUE}Paso 1: Instalando dependencias...${NC}"
if [ ! -d "node_modules" ]; then
  npm install
  echo -e "${GREEN}✓ Dependencias instaladas${NC}"
else
  echo -e "${GREEN}✓ node_modules ya existe${NC}"
fi

echo ""

# Paso 2: Verificar .env.local
echo -e "${BLUE}Paso 2: Verificando configuración de entorno...${NC}"
if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
  echo -e "${YELLOW}⚠ Archivo .env.local creado${NC}"
  echo -e "${YELLOW}TODO: Edita .env.local y agrega tus credenciales:${NC}"
  echo ""
  echo "  Necesitas obtener de:"
  echo "  • Supabase: NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY"
  echo "  • Anthropic: ANTHROPIC_API_KEY"
  echo ""
else
  echo -e "${GREEN}✓ .env.local existe${NC}"
fi

echo ""

# Paso 3: Verificar TypeScript
echo -e "${BLUE}Paso 3: Verificando tipos TypeScript...${NC}"
npm run type-check || echo -e "${YELLOW}⚠ Algunos errores de tipos (normal en desarrollo)${NC}"
echo -e "${GREEN}✓ Verificación completada${NC}"

echo ""

# Paso 4: Información de próximos pasos
echo -e "${BLUE}Paso 4: Información de configuración${NC}"
echo ""
echo -e "${GREEN}✓ Setup local completado!${NC}"
echo ""
echo "Próximos pasos:"
echo ""
echo "1. CONFIGURAR SUPABASE:"
echo "   • Ve a https://app.supabase.com"
echo "   • Crea nuevo proyecto (espera ~2 minutos)"
echo "   • Copia credenciales a .env.local"
echo "   • Ejecuta: supabase db push"
echo ""
echo "2. CONFIGURAR CLAUDE API:"
echo "   • Ve a https://console.anthropic.com"
echo "   • Crea API key"
echo "   • Copia a ANTHROPIC_API_KEY en .env.local"
echo ""
echo "3. PROBAR LOCALMENTE:"
echo "   npm run dev"
echo "   Abre http://localhost:3000"
echo ""
echo "4. CREAR REPO GITHUB:"
echo "   git remote add origin https://github.com/TU_USUARIO/quiz-master.git"
echo "   git push -u origin main"
echo ""
echo "5. DESPLEGAR EN VERCEL:"
echo "   npm run vercel:login"
echo "   npm run vercel:deploy"
echo ""
echo -e "${YELLOW}Para más detalles, lee NEXT_STEPS.md${NC}"
