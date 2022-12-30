import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
// import { RemoteGitRepos, RemoteGitRepository } from "./dto/remote-git-repository";

@Injectable()
export class BitbucketService {
  constructor(private readonly configService: ConfigService) {}

  // async getGitRemoteOrganization() {}
  // async getOrganizationRepos() {}
  // async createRepository() {}
  // async createPullRequest() {}
}
