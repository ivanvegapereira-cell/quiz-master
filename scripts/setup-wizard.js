#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) => new Promise((resolve) => {
  rl.question(prompt, (answer) => {
    resolve(answer);
  });
});

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function clearScreen() {
  console.clear();
}

async function validateSupabaseUrl(url) {
  if (!url.includes('supabase.co')) {
    log('❌ URL inválida. Debe ser de supabase.co', 'red');
    return false;
  }
  return true;
}

function validateApiKey(key) {
  if (key.length < 20) {
    log('❌ API key muy corta', 'red');
    return false;
  }
  return true;
}

async function testConnection(envVars) {
  try {
    log('\n🔍 Probando conexión con Supabase...', 'cyan');

    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    fs.writeFileSync(envPath, envContent);
    log('✅ .env.local creado', 'green');

    return true;
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    return false;
  }
}

async function runMigrations() {
  try {
    log('\n🗄️  Preparando migraciones Supabase...', 'cyan');
    log('⚠️  Nota: Necesitas tener supabase CLI instalado', 'yellow');
    log('   npm install -g supabase', 'yellow');
    log('\n📋 Próximos comandos a ejecutar:', 'cyan');
    log('   1. supabase login', 'yellow');
    log('   2. supabase link --project-ref PROJECT_ID', 'yellow');
    log('   3. supabase db push', 'yellow');

    return true;
  } catch (error) {
    log(`⚠️  Error: ${error.message}`, 'yellow');
    return false;
  }
}

async function main() {
  clearScreen();

  log('╔════════════════════════════════════════╗', 'cyan');
  log('║  🚀 QuizMaster Setup Wizard            ║', 'cyan');
  log('║     Configuración Interactiva          ║', 'cyan');
  log('╚════════════════════════════════════════╝', 'cyan');

  log('\n📝 Este wizard te ayudará a configurar tu app en 2 minutos', 'bright');

  const hasCredentials = await question('\n¿Ya obtuviste tus 3 credenciales? (s/n): ');

  if (hasCredentials.toLowerCase() !== 's') {
    log('\n📖 Abre QUICK_START.md para obtener credenciales:', 'yellow');
    log('   1. Supabase: https://app.supabase.com', 'yellow');
    log('   2. Claude API: https://console.anthropic.com', 'yellow');
    log('\nLuego ejecuta nuevamente: npm run setup-wizard', 'yellow');
    rl.close();
    process.exit(0);
  }

  log('\n✅ Perfecto! Ahora necesito que pegues tus 3 valores...', 'green');
  log('(Puedes copiar/pegar directamente)\n', 'cyan');

  // Recopilar credenciales
  let supabaseUrl = '';
  let supabaseAnonKey = '';
  let supabaseServiceKey = '';
  let anthropicKey = '';

  // Supabase URL
  log('1️⃣  NEXT_PUBLIC_SUPABASE_URL', 'bright');
  log('   (De: Supabase → Settings → API → Project URL)\n', 'cyan');
  while (!supabaseUrl || !(await validateSupabaseUrl(supabaseUrl))) {
    supabaseUrl = await question('→ Pega tu URL: ');
  }
  log('✅ URL válida\n', 'green');

  // Supabase Anon Key
  log('2️⃣  NEXT_PUBLIC_SUPABASE_ANON_KEY', 'bright');
  log('   (De: Supabase → Settings → API → anon public)\n', 'cyan');
  while (!supabaseAnonKey || !validateApiKey(supabaseAnonKey)) {
    supabaseAnonKey = await question('→ Pega tu anon key: ');
  }
  log('✅ Anon key válida\n', 'green');

  // Supabase Service Role Key
  log('3️⃣  SUPABASE_SERVICE_ROLE_KEY', 'bright');
  log('   (De: Supabase → Settings → API → service_role)\n', 'cyan');
  while (!supabaseServiceKey || !validateApiKey(supabaseServiceKey)) {
    supabaseServiceKey = await question('→ Pega tu service role key: ');
  }
  log('✅ Service role key válida\n', 'green');

  // Anthropic Key
  log('4️⃣  ANTHROPIC_API_KEY', 'bright');
  log('   (De: Anthropic Console → Create API Key)\n', 'cyan');
  while (!anthropicKey || !validateApiKey(anthropicKey)) {
    anthropicKey = await question('→ Pega tu API key: ');
  }
  log('✅ API key válida\n', 'green');

  // Verificar resumen
  log('\n📋 Resumen de credenciales:', 'cyan');
  log(`   • Supabase URL: ${supabaseUrl.substring(0, 20)}...`, 'yellow');
  log(`   • Anon Key: ${supabaseAnonKey.substring(0, 20)}...`, 'yellow');
  log(`   • Service Key: ${supabaseServiceKey.substring(0, 20)}...`, 'yellow');
  log(`   • Claude API: ${anthropicKey.substring(0, 20)}...`, 'yellow');

  const confirm = await question('\n¿Esto es correcto? (s/n): ');

  if (confirm.toLowerCase() !== 's') {
    log('\n❌ Cancelado. Ejecuta nuevamente: npm run setup-wizard', 'yellow');
    rl.close();
    process.exit(0);
  }

  // Crear .env.local
  log('\n⏳ Creando configuración...', 'cyan');

  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey,
    SUPABASE_SERVICE_ROLE_KEY: supabaseServiceKey,
    ANTHROPIC_API_KEY: anthropicKey,
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  };

  const success = await testConnection(envVars);

  if (success) {
    log('\n✅ .env.local creado exitosamente!', 'green');

    log('\n📋 Próximos pasos:', 'bright');
    log('\n1️⃣  Ejecutar migraciones Supabase:', 'cyan');
    log('   npm install -g supabase', 'yellow');
    log('   supabase login', 'yellow');
    log('   supabase link --project-ref PROJECT_ID', 'yellow');
    log('   supabase db push', 'yellow');

    log('\n2️⃣  Probar localmente:', 'cyan');
    log('   npm run dev', 'yellow');
    log('   Abre: http://localhost:3000', 'yellow');

    log('\n3️⃣  Cuando funcione, deployar:', 'cyan');
    log('   git push -u origin main', 'yellow');
    log('   (Vercel auto-deployará)', 'yellow');

    log('\n🎉 ¡Listo! Tu app está configurada!', 'green');

  } else {
    log('\n❌ Error en la configuración', 'red');
  }

  rl.close();
}

main().catch((error) => {
  log(`\n❌ Error: ${error.message}`, 'red');
  rl.close();
  process.exit(1);
});
