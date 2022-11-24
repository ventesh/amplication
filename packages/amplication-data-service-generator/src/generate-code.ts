import { join, dirname } from "path";
import { mkdir, readFile, writeFile } from "fs/promises";

import { DSGResourceData, Module } from "@amplication/code-gen-types";
import { createDataServiceImpl } from "./create-data-service-impl";
import { defaultLogger } from "./server/logging";
import axios from "axios";

const INPUT_FILE_PATH = process.env.INPUT_FILE_PATH;
const OUTPUT_PATH = process.env.OUTPUT_PATH;

if (!INPUT_FILE_PATH) {
  throw new Error("INPUT_FILE_PATH is not defined");
}
if (!OUTPUT_PATH) {
  throw new Error("OUTPUT_PATH is not defined");
}

const isRemoteEnv = process.env.REMOTE_ENV === "true";

generateCode(INPUT_FILE_PATH, OUTPUT_PATH).catch((err) => {
  console.error(err);
  process.exit(1);
});

export default async function generateCode(
  inputFilePath: string,
  destinationPath: string
): Promise<void> {
  try {
    const file = await readFile(inputFilePath, "utf8");
    const resourceData: DSGResourceData = JSON.parse(file);
    const modules = await createDataServiceImpl(resourceData, defaultLogger);
    await writeModules(modules, destinationPath);
    console.log("Code generation completed successfully");
    if (isRemoteEnv) {
      await axios.post(
        new URL(
          "build-runner/code-generation-success",
          process.env.BUILD_MANAGER_URL
        ).href,
        {
          resourceId: process.env.RESOURCE_ID,
          buildId: process.env.BUILD_ID,
        }
      );
    }
  } catch (err) {
    console.error(err);
    if (isRemoteEnv) {
      await axios.post(
        new URL(
          "build-runner/code-generation-failure",
          process.env.BUILD_MANAGER_URL
        ).href,
        {
          resourceId: process.env.RESOURCE_ID,
          buildId: process.env.BUILD_ID,
        }
      );
    }
  }
}

async function writeModules(
  modules: Module[],
  destinationPath: string
): Promise<void> {
  console.log("Creating base directory");
  await mkdir(destinationPath, { recursive: true });
  console.info(`Writing modules to ${destinationPath} ...`);
  await Promise.all(
    modules.map(async (module) => {
      const filePath = join(destinationPath, module.path);
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, module.code);
    })
  );
  console.info(`Successfully wrote modules to ${destinationPath}`);
}
