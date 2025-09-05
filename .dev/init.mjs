import { writeFile } from "fs/promises";

const data = {
  items: {
    1: {
      id: "1",
      name: "Sample item 1",
      description: "This is a sample item",
    },
    2: {
      id: "2",
      name: "Sample item 2",
      description: "This is a sample item",
    },
  },
};

await writeFile(".dev/db.json", JSON.stringify(data, null, 2));
