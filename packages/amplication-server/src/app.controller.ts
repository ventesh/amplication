import { Controller, Post, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { QueueService } from './core/queue/queue.service';
import { CodeBuildBuildPhaseChangeDetail, CodeBuildBuildStateChangeDetail, CodeGenNotification, CodeGenNotificationMessage, SubscriptionConfirmation } from './dto';
import { PlainBody } from './decorators/plainBody.decorator';
import { firstValueFrom } from 'rxjs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BuildFilesSaver } from './core/build/utils';

@Controller()
export class AppController {
  constructor(
    private readonly queueService: QueueService,
    private readonly httpService: HttpService, 
    private readonly buildFilesSaver: BuildFilesSaver
  ) {}

  @Post('/code-gen-notification')
  async generate(@Headers('x-amz-sns-message-type') messageType: string, @PlainBody() message: string): Promise<void> {
    switch (messageType) {
        case 'SubscriptionConfirmation':
            const sc: SubscriptionConfirmation = JSON.parse(message);
            await firstValueFrom(this.httpService.get(sc.SubscribeURL));
            break;
        case 'Notification':
            this.queueService.emitMessage('code.generation.result', message);
            break;
        default:
            throw new HttpException('Unknown message type', HttpStatus.BAD_REQUEST);
    }
  }

  @MessagePattern('code.generation.result')
  async receiveCodeGenNotificationMessage(@Payload() message: CodeGenNotification): Promise<void> {
    console.log(JSON.stringify(message));
    const m: CodeGenNotificationMessage = JSON.parse(message.value.Message);
    switch (m.detailType) {
      case 'CodeBuild Build State Change':
        const stateChange = m.detail as CodeBuildBuildStateChangeDetail;
        if (stateChange["build-status"] == 'SUCCEEDED') {
          const arn = stateChange["additional-information"].artifact.location;
          const arnParts = arn.split(":::");
          const locPartsWithBucket = arnParts[1].split("/");
          const location = locPartsWithBucket.slice(1).join("/");

          const buildId = stateChange["build-id"];
          const buildIdParts = buildId.split(":");
          const runId = buildIdParts[buildIdParts.length - 1]
          await this.buildFilesSaver.unzip(location, runId);
        }
        break;
      case 'CodeBuild Build Phase Change':
        const phaseChange = m.detail as CodeBuildBuildPhaseChangeDetail;
        console.log(JSON.stringify(phaseChange));
        break;
      default:
        break;
    }
  }
}
