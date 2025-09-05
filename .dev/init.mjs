import { writeFile } from "fs/promises";
import { map, range } from "es-toolkit/compat";
import { fakerRU } from "@faker-js/faker";

const data = {
  items: map(range(10), (id) => ({
    id,
    name: fakerRU.commerce.productName(),
    description: fakerRU.commerce.productDescription(),
  })),
};

await writeFile(".dev/db.json", JSON.stringify(data, null, 2));
