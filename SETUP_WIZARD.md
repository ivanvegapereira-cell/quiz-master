# 🧙 Setup Wizard - Configuración Automática

El Setup Wizard automatiza TODO lo que necesitas hacer para preparar tu app.

---

## ⚡ Uso (2 Minutos)

### Opción 1: Windows
```bash
npm run setup-wizard
```

### Opción 2: Mac/Linux
```bash
npm run setup-wizard
```

Eso es todo. El wizard te guiará paso a paso.

---

## 🔑 Qué Necesitas Antes

Antes de ejecutar el wizard, **obtén estas 3 credenciales**:

### 1️⃣ Supabase URL
1. Ve a https://app.supabase.com
2. Settings → API
3. Copia el valor de "Project URL"
4. Ejemplo: `https://xxxxx.supabase.co`

### 2️⃣ Supabase Anon Key
1. Mismo lugar (Settings → API)
2. Bajo la sección "API keys"
3. Busca "anon public"
4. Copia el valor (comienza con "eyJ...")

### 3️⃣ Supabase Service Role Key
1. Mismo lugar (Settings → API)
2. Bajo la sección "API keys"
3. Busca "service_role" 
4. Copia el valor (comienza con "eyJ...")

### 4️⃣ Anthropic API Key
1. Ve a https://console.anthropic.com
2. Click "Create API Key" o "API Keys"
3. Copia la key
4. Ejemplo: `sk-ant-xxxxx`

---

## 🧙 Cómo Funciona

```
1. npm run setup-wizard
   ↓
2. ¿Ya tienes credenciales? → SÍ
   ↓
3. Pega URL Supabase
   ↓
4. Pega Anon Key
   ↓
5. Pega Service Role Key
   ↓
6. Pega Claude API Key
   ↓
7. Confirma que es correcto
   ↓
8. ✅ .env.local creado automáticamente
   ↓
9. Te muestra próximos pasos
```

---

## ✅ Qué Hace

- ✅ Valida cada credencial mientras la ingresas
- ✅ Crea `.env.local` automáticamente
- ✅ Protege tus credenciales (nunca las imprime)
- ✅ Te da próximos pasos

---

## 📋 Después del Wizard

El wizard te dirá exactamente qué hacer:

```bash
1. Instalar Supabase CLI:
   npm install -g supabase

2. Login:
   supabase login

3. Link tu proyecto (necesitas PROJECT_ID de Supabase):
   supabase link --project-ref PROJECT_ID

4. Ejecutar migraciones:
   supabase db push

5. Probar localmente:
   npm run dev
   Abre: http://localhost:3000

6. Cuando funcione, deployar:
   git push -u origin main
```

---

## 🚨 Si Algo Falla

### "Credential inválida"
- Verifica que copiaste el valor COMPLETO
- Sin espacios al inicio o final
- No debería terminar en ".co" (eso es parte de la URL)

### ".env.local no se creó"
- Asegúrate de tener permisos de escritura en la carpeta
- En Windows: corre PowerShell como administrador
- En Mac/Linux: corre con `sudo npm run setup-wizard`

### "Credenciales rechazadas"
- Abre nuevamente Supabase y verifica que copiaste bien
- No uses comillas
- No uses caracteres especiales adicionales

---

## 🔐 Seguridad

✅ El wizard NO:
- Nunca envía credenciales a internet
- Nunca las almacena en logs
- Nunca las imprime en la pantalla
- Solo escribe en `.env.local` en tu máquina

✅ El archivo `.env.local`:
- Está en `.gitignore` (nunca se commitea)
- Solo lo ves tú
- Es leído por Next.js localmente

---

## 💡 Tips

1. **Copia desde el navegador**: 
   - Haz click derecho en la URL/key
   - Selecciona "Copiar"
   - Pega en el terminal con Ctrl+V (o Cmd+V en Mac)

2. **No cierres la pestaña de Supabase**:
   - Mantén abierta app.supabase.com
   - Así puedes copiar fácilmente

3. **Haz esto en orden**:
   - Primero crea proyecto Supabase
   - Luego obtén las keys
   - Luego ejecuta el wizard

---

## ❓ FAQ

**P: ¿Qué es PROJECT_ID?**
A: En app.supabase.com, haz click en tu proyecto → Settings → General → Project ID (arriba)

**P: ¿Puedo copiar/pegar?**
A: SÍ! El wizard lo permite. Solo copia el valor completo.

**P: ¿Se guardará mi API key?**
A: SÍ, en `.env.local` (tu máquina). Nunca en GitHub (está en .gitignore).

**P: ¿Puedo cambiar las credenciales después?**
A: SÍ, solo edita `.env.local` en cualquier editor de texto.

**P: ¿Qué pasa si commito .env.local?**
A: Git lo ignorará automáticamente (está en .gitignore).

---

## 🎯 Resumen

```
Tiempo: 2-5 minutos
Pasos: Solo ejecuta: npm run setup-wizard
Complejidad: 0 - Solo copiar/pegar 4 valores
Resultado: App lista para npm run dev
```

---

**Próximo:** Después del wizard, sigue los pasos que te muestra. ¡Listooo! 🚀
