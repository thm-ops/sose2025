import { Color, Size } from './../src/app/generated/prisma/index.d';
import { rubberDuckData } from "./../src/app/data/data";

// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const brands = [...new Set(rubberDuckData.map((d) => d.brand))];
  const origins = [...new Set(rubberDuckData.map((d) => d.origin))];
  const producers = [...new Set(rubberDuckData.map((d) => d.producer))];

  const brandRecords = await Promise.all(
    brands.map((name) =>
      prisma.brand.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  const originRecords = await Promise.all(
    origins.map((name) =>
      prisma.origin.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  const producerRecords = await Promise.all(
    producers.map((name) =>
      prisma.producer.upsert({
        where: { name },
        update: {},
        create: {
          name,
          email: `${name.toLowerCase().replace(/\s/g, "_")}@example.com`,
        },
      })
    )
  );

  const brandMap = Object.fromEntries(brandRecords.map((b) => [b.name, b.id]));
  const originMap = Object.fromEntries(originRecords.map((o) => [o.name, o.id]));
  const producerMap = Object.fromEntries(producerRecords.map((p) => [p.name, p.id]));

  for (const duck of rubberDuckData) {
    await prisma.duck.upsert({
      where: { name: duck.name },
      update: {},
      create: {
        name: duck.name,
        price: duck.price,
        color: duck.color as Color,
        material: duck.material,
        size: duck.size as Size,
        weight: duck.weight,
        description: duck.description,
        brandId: brandMap[duck.brand],
        originId: originMap[duck.origin],
        producerId: producerMap[duck.producer],
      },
    });
  }
}

main()
