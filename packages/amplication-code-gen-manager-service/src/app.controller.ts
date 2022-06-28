import { Controller, Get, Inject, Post } from '@nestjs/common';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  CodeBuildClient,
  CreateProjectCommand,
  CreateProjectCommandInput,
  StartBuildCommand,
  StartBuildCommandInput,
} from '@aws-sdk/client-codebuild';
import * as uuid from 'uuid';
import { CodeBuildService } from './codeBuild/codeBuild.service';

@Controller()
export class AppController {
  private readonly codeBuildClient: CodeBuildClient;

  constructor(
    private readonly appService: AppService,
    private readonly codeBuildService: CodeBuildService,
    @Inject('MAIN_KAFKA') private readonly client: ClientKafka,
  ) {
    this.codeBuildClient = new CodeBuildClient({});
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('code.gen.request')
  async receiveCodeGenRequest(@Payload() message: any) {
    const mv = message.value;

    await this.codeBuildService.runBuild(
      mv.codeGeneratorVersion,
      mv.codeGenerationId,
    );
  }

  @MessagePattern('generation-request')
  async receiveGenerationRequest(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const originalMessage = context.getMessage();
    const response =
      `Receiving a new message from topic: generation-request: ` +
      JSON.stringify(originalMessage.value);

    const id = uuid.v4();
    const bucketName = 'amplication-dsg-dev';

    const cpci: CreateProjectCommandInput = {
      name: `dsg-${id}`,
      source: {
        type: 'S3',
        location: `amplication-dsg-dev/dsg-source/amplication-${id}.zip`,
        buildspec: `arn:aws:s3:::${bucketName}/config/buildspec.yaml`,
      },
      artifacts: {
        type: 'S3',
        location: bucketName,
        path: 'dsg-output',
        namespaceType: 'BUILD_ID',
        name: `amplication-${id}`,
        packaging: 'ZIP',
      },
      environment: {
        type: 'LINUX_CONTAINER',
        image: 'aws/codebuild/standard:5.0',
        computeType: 'BUILD_GENERAL1_SMALL',
        environmentVariables: [],
        privilegedMode: false,
        imagePullCredentialsType: 'CODEBUILD',
      },
      serviceRole:
        'arn:aws:iam::407256539111:role/service-role/dsg-builder-service-role',
      timeoutInMinutes: 60,
      queuedTimeoutInMinutes: 480,
      encryptionKey: 'arn:aws:kms:us-east-1:407256539111:alias/aws/s3',
    };

    const cpc = new CreateProjectCommand(cpci);
    const client = new CodeBuildClient({});
    try {
      await client.send(cpc);
    } catch (err) {
      console.log(err);
    }

    console.log(response);
    return response;
  }

  @Post('/generate')
  generate() {
    return this.client.emit('generation-request', { appName: 'example-app' });
  }
}
