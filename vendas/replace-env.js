const fs = require('fs');

// Leitura do arquivo original
let envContent = fs.readFileSync('.env', 'utf8');
let envContentOriginal = fs.readFileSync('.env', 'utf8');

// Substituição da variável de ambiente
envContent = envContent.replace(/DATABASE_URL="postgresql:\/\/glauber:S3cret@localhost:5432\/ms_vendas\?schema=public"/g, 'DATABASE_URL="postgresql://glauber:S3cret@postgres:5432/ms_vendas?schema=public"');

// Escrita do novo arquivo com as alterações
fs.writeFileSync('.env', envContent, 'utf8');
fs.writeFileSync('.env-dev', envContentOriginal, 'utf8');
