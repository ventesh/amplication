import { Module } from '@amplication/data-service-generator';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import assert from 'assert';
import { outputFile, remove } from 'fs-extra';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { join, normalize } from 'path';
import { BASE_BUILDS_FOLDER } from 'src/constants';
import { AmplicationError } from 'src/errors/AmplicationError';
import { Logger } from 'winston';
import JSZip from 'jszip';
import { CodeGenStorageService } from 'src/core/codeGenStorage/codeGenStorage.service';


@Injectable()
export class BuildFilesSaver {
  private baseBuildsPath: string;
  constructor(
    configService: ConfigService,
    private readonly codeGenStorageService: CodeGenStorageService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {
    const envFilePath = configService.get<string>(BASE_BUILDS_FOLDER);
    assert(envFilePath);
    this.baseBuildsPath = normalize(envFilePath);
    logger.info(`The BASE_BUILDS_FOLDER value is ${envFilePath}`);
  }
  async saveFiles(relativePath: string, modules: Module[]): Promise<void> {
    this.logger.info(
      `Got a request for saving ${modules.length} files in ${relativePath} path`,
      { modules }
    );
    try {
      const filesPromises = modules.map(async (module, i) => {
        const filePath = join(this.baseBuildsPath, relativePath, module.path);
        return outputFile(filePath, module.code);
      });
      await Promise.all(filesPromises);
    } catch (error) {
      await remove(join(this.baseBuildsPath, relativePath));
      throw new AmplicationError(
        'There was a error in saving the generated files to the amplication file system'
      );
    }
  }

  async unzip(source: string, target: string): Promise<void> {
    const data = await this.codeGenStorageService.getCodeGenOutput(source);

    const zipper = new JSZip();
    try {
      const archive = await zipper.loadAsync(data);

      const filePromises: Promise<void>[] = Object.entries(archive.files).map(async arr => {
        const [ relativePath, file ] = arr;

        const fileText = await file.async('string');
        const filePath = join(this.baseBuildsPath, target, relativePath);
        return outputFile(filePath, fileText);
      });

      await Promise.all(filePromises);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
