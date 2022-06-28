import {
  CodeBuildClient,
  StartBuildCommand,
  StartBuildCommandInput,
} from '@aws-sdk/client-codebuild';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CODE_BUILD_CG_BASE_LOCATION,
  CODE_BUILD_INPUT_BASE_LOCATION,
  CODE_BUILD_PROJECT_NAME,
} from 'src/constants';

@Injectable()
export class CodeBuildService {
  private readonly codeBuildClient: CodeBuildClient;

  constructor(private readonly configService: ConfigService) {
    this.codeBuildClient = new CodeBuildClient({});
  }

  async runBuild(codeGeneratorVersion: string, codeGenerationId: string) {
    const sourceBaseLocation = this.configService.get<string>(CODE_BUILD_CG_BASE_LOCATION);
    const inputBaseLocation = this.configService.get<string>(CODE_BUILD_INPUT_BASE_LOCATION);
    const sbci: StartBuildCommandInput = {
      projectName: this.configService.get<string>(CODE_BUILD_PROJECT_NAME),
      sourceLocationOverride: `${sourceBaseLocation}/amplication-${codeGeneratorVersion}.zip`,
      secondarySourcesOverride: [
        {
          sourceIdentifier: 'INPUT_DATA',
          type: 'S3',
          location: `${inputBaseLocation}/${codeGenerationId}.zip`,
        },
      ],
    };

    const sbc = new StartBuildCommand(sbci);

    try {
      await this.codeBuildClient.send(sbc);
    } catch (err) {
      console.log(err);
    }
  }
}
