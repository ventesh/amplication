import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  GetObjectCommand
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

  public async getCodeGenOutput(location: string): Promise<Buffer> {
    const params = {
      Bucket: this.configService.get('AWS_S3_CODE_GEN_INPUT_BUCKET'),
      Key: location,
    };

    const goc = new GetObjectCommand(params);
    try {
      const data = await this.client.send(goc);
  
      const bodyContents = await this.streamToBuffer(data.Body);
      return bodyContents;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private streamToString(stream): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
  }

  private streamToBuffer(stream): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }

}
