-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "endereco" TEXT,
    "email" TEXT NOT NULL,
    "cep" TEXT,
    "data_exclusao" TIMESTAMP(3),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formas_pagamento" (
    "id" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "parcelas" TEXT NOT NULL,
    "data_exclusao" TIMESTAMP(3),

    CONSTRAINT "formas_pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "data_exclusao" TIMESTAMP(3),

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendas" (
    "id" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "formaPagamentoId" TEXT NOT NULL,
    "val_total" DOUBLE PRECISION NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendas_produtos" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "vendaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "val_unit" DOUBLE PRECISION NOT NULL,
    "val_tot" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "vendas_produtos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_formaPagamentoId_fkey" FOREIGN KEY ("formaPagamentoId") REFERENCES "formas_pagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas_produtos" ADD CONSTRAINT "vendas_produtos_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas_produtos" ADD CONSTRAINT "vendas_produtos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
