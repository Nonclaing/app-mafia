import { writeFile, mkdir } from "fs/promises";

const data = {
  items: [
    {
      "id": "1",
      "name": "Sample item 1",
      "description": "This is a sample item",
    },
    {
      "id": "2",
      "name": "Sample item 2",
      "description": "This is a sample item",
    },
  ],
};

const init = async () => {
  await mkdir(".dev", { recursive: true });
  await writeFile(".dev/db.json", JSON.stringify(data, null, 2));
};

init();