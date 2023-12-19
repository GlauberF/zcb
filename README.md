Node v16.20.2
NPM 8.19.4


## Estrutura
- clientes // Microservico
- formas_pagamento // Microservico
- produtos // Microservico
- vendas // Microservico
- docker // Arquivo docker para subir os servicos necessários
- front // Frontend da aplicacao

## Passos para rodar aplicacoes
- Criar arquivo .env dentro de "clientes", "formas_pagamento", "produtos", e "vendas".
<br><br>Clientes
<pre>
DATABASE_URL="postgresql://glauber:S3cret@localhost:5432/ms_clientes?schema=public"
</pre>
<br>Formas de Pagamento
<pre>
DATABASE_URL="postgresql://glauber:S3cret@localhost:5432/ms_formas_pagamento?schema=public"
</pre>
<br>Produtos
<pre>
DATABASE_URL="postgresql://glauber:S3cret@localhost:5432/ms_produtos?schema=public"
</pre>
<br>Vendas
<pre>
DATABASE_URL="postgresql://glauber:S3cret@localhost:5432/ms_vendas?schema=public"
</pre>

### Rodar migrate
Entra nas pastas dos microservicos e rode o comando ```npx prisma migrate dev --name create-{nome que desejar q represente a migrate}```
<br> Para verificar no browser a tabela, basta rodar ```npx prisma studio```
<br> ```npx prisma migrate reset```



