#!/usr/bin/env node

import { createRadar } from "./radar";
import { save } from "./file";

export const radarJsonGenerator = async () => {
  try {
    const radar = await createRadar();

    await save(JSON.stringify(radar), "rd.json");
  } catch (e) {
    console.error("error:", e);
  }
};
