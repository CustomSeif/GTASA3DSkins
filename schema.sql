CREATE TABLE "skins" (
    "id" serial NOT NULL,
    "model" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "modelURL" TEXT NOT NULL,
    "lightingIntensity" INTEGER DEFAULT 2 NOT NULL,
    CONSTRAINT "skins_pk" PRIMARY KEY ("id")
);