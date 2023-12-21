# Projeto Microservices em Node.js

## Contexto do Projeto

Este projeto é um exemplo de cenário de teste que envolve a implementação de diversos CRUDs. Cada CRUD é representado por um microserviço escrito em TypeScript com Node.js, sem a utilização de frameworks. O objetivo é demonstrar a arquitetura de microserviços e a comunicação entre eles por meio do Kafka (upstash).

Devido a restrições de tempo, a implementação não abrange toda a lógica planejada. A ideia principal é que cada operação CRUD em um serviço base (por exemplo, clientes) dispare uma fila para atualizar a tabela correspondente em outro microserviço (por exemplo, vendas). Além disso, ao excluir um registro no microserviço base, o registro relacionado no microserviço de vendas mantém apenas a data de exclusão para manter a consistência de dados em transações de venda.

As rotas estão configuradas com portas diferentes, mas, devido à falta de tempo, não consegui implementar a configuração no Kong, juntamente com o uso do Konga para unificar as portas sob caminhos distintos.

## Estrutura

- `clientes`: Microserviço base para clientes
- `formas_pagamento`: Microserviço base para formas de pagamento
- `produtos`: Microserviço base para produtos
- `vendas`: Microserviço para transações de venda
- `docker`: Arquivo Docker para configurar e executar os serviços localmente ou em produção
- `front`: Front-end (não finalizado)
- `postman`: Coleção com todas as rotas, portas mapeadas, dados de teste e retorno
- `images`: Algumas imagens do teste local do Kafka com Kafdrop (não finalizado)

## Tecnologias

- Node.js v16.20.2
- NPM 8.19.4
- Prisma
- PostgreSQL 14
- Docker

## Instruções para Execução

1. Execute as migrações manualmente ou utilize o comando:
   ```bash
   npx prisma migrate reset
2. Para visualizar as tabelas por microserviço, utilize o comando:
     ```bash
       npx prisma studio
3. Para rodar o ambiente de desenvolvimento, utilize o comando:
    ```bash
   docker-compose -f docker-compose-dev.yml up -d
4. Para ambiente de produção:
   ```bash
   docker-compose up -d

## Exemplos de Uso da API
1. Listar clientes ou qual quer outro listar com paginação e filtragem:
    - /clientes?limit=10&page=1
    - /clientes?nome=glauber