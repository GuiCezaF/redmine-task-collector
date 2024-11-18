import { AppDataSource } from "../database/data-source";

async function initializeApp() {
  try {
    await AppDataSource.initialize();
    console.log("DataSource has been initialized!");

  } catch (err) {
    console.error("Error during DataSource initialization:", err);
    process.exit(1);
  }
}

initializeApp();
