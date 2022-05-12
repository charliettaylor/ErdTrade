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

-- CreateIndex
CREATE UNIQUE INDEX "Armors_name_key" ON "Armors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Armors_image_key" ON "Armors"("image");
