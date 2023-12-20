-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);
