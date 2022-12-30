import { Injectable } from "@nestjs/common";
import { GithubService } from "./github.service";
import { INVALID_SOURCE_CONTROL_ERROR_MESSAGE } from "./git.constants";
import { EnumGitProvider } from "@amplication/code-gen-types/models";
import { BitbucketService } from "./bitbucket.service";
import { GitClient } from "./git.types";

@Injectable()
export class GitServiceFactory {
  constructor(
    protected githubService: GithubService,
    protected bitbucketService: BitbucketService
  ) {}
  getService(gitProvider: EnumGitProvider): GitClient {
    switch (gitProvider) {
      case EnumGitProvider.Github:
        return this.githubService;
      // case EnumGitProvider.BitBucket:
      //   return this.bitbucketService;
      default:
        throw new Error(INVALID_SOURCE_CONTROL_ERROR_MESSAGE);
    }
  }
}
