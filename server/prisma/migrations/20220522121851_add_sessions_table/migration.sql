-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Armors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ammos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "passive" TEXT NOT NULL,

    CONSTRAINT "Ammos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ashes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "affinity" TEXT NOT NULL,
    "skill" TEXT NOT NULL,

    CONSTRAINT "Ashes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "effect" TEXT NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shields" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Shields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talismans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "effects" TEXT NOT NULL,

    CONSTRAINT "Talismans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "Armors_name_key" ON "Armors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Armors_image_key" ON "Armors"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Ammos_name_key" ON "Ammos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ammos_image_key" ON "Ammos"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Ashes_name_key" ON "Ashes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ashes_image_key" ON "Ashes"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Items_name_key" ON "Items"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Items_image_key" ON "Items"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Shields_name_key" ON "Shields"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Shields_image_key" ON "Shields"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Talismans_name_key" ON "Talismans"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Talismans_image_key" ON "Talismans"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Weapons_name_key" ON "Weapons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Weapons_image_key" ON "Weapons"("image");
