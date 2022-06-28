import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput
} from '@aws-sdk/client-s3';
import { CodeGenInput } from 'src/models/CodeGenInput';
import JSZip from 'jszip';

@Injectable()
export class CodeGenStorageService {
  private readonly client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new S3Client({
      credentials: {
        accessKeyId: configService.get('AWS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_KET')
      }
    });
  }

  public async saveCodeGenInput(codeGenInput: CodeGenInput): Promise<PutObjectCommandOutput> {
    const zipper = new JSZip();
    zipper.file('input-data.json', JSON.stringify(codeGenInput));
    const archive = await zipper.generateAsync({ type: 'uint8array' });
    const uploadParams: PutObjectCommandInput = {
      Bucket: this.configService.get('AWS_S3_CODE_GEN_INPUT_BUCKET'),
      Key: `code-gen-input/${codeGenInput.appInfo.version}.zip`,
      Body: archive
    };

    return this.client.send(new PutObjectCommand(uploadParams));
  }
}
