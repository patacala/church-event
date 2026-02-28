#!/bin/bash
# Script para configurar variables de entorno en Vercel

echo "🚀 Configurando variables de entorno en Vercel..."

vercel env add PUBLIC_SUPABASE_URL production --force
vercel env add PUBLIC_SUPABASE_URL preview --force
vercel env add PUBLIC_SUPABASE_URL development --force

vercel env add PUBLIC_SUPABASE_ANON_KEY production --force
vercel env add PUBLIC_SUPABASE_ANON_KEY preview --force
vercel env add PUBLIC_SUPABASE_ANON_KEY development --force

echo "✅ Variables de entorno configuradas!"
echo "⚠️  Ahora ejecuta: vercel --prod"
echo "    para hacer un redeploy con las nuevas variables"
