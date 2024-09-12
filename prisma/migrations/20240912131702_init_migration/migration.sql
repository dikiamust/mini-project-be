-- CreateTable
CREATE TABLE "pokemons" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "nickname" VARCHAR(100) NOT NULL,
    "types" TEXT[],
    "moves" TEXT[],
    "image" VARCHAR(255) NOT NULL,
    "rename_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);
