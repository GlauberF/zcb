-- CreateTable
CREATE TABLE "formas_pagamento" (
    "id" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "parcelas" TEXT NOT NULL,

    CONSTRAINT "formas_pagamento_pkey" PRIMARY KEY ("id")
);
