import { Module } from "@nestjs/common";
import { GitService } from "./git.service";
import { GitServiceFactory } from "./git-service-factory";
import { ConfigModule } from "@nestjs/config";
import { GithubService } from "./github.service";
import { BitbucketService } from "./bitbucket.service";

@Module({
  imports: [ConfigModule],
  providers: [GitService, GitServiceFactory, GithubService, BitbucketService],
  exports: [GitService, GitServiceFactory, GithubService, BitbucketService],
})
export class GitModule {}
