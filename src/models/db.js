import Dexie from "dexie";

const db = new Dexie("myDatabase");
db.version(1).stores({
  audios: "++id, name", // Primary key and indexed props
});

export default db;
