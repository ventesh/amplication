// import { AMPLICATION_LOGGER_PROVIDER } from "@amplication/nest-logger-module";
import {
  Commit,
  EnumGitProvider,
  EnumPullRequestMode,
  GetBranchArgs,
  GetRepositoryArgs,
  RemoteGitRepository,
} from "../../src/types";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { ModuleMocker, MockFunctionMetadata } from "jest-mock";
import { GitClientService } from "../../src/git/git.service";
import { GithubService } from "../../src/git/github.service";
import { Logger } from "@amplication/util/logging";

const moduleMocker = new ModuleMocker(global);

xdescribe("Git service tests", () => {
  const githubAppAppId = "12345678";
  const githubAppPrivateKey = "privateKey";
  const githubAppInstallationId = "123";

  const installationId = "123";

  const owner = "owner1";
  const repositoryName = "repository1";
  const branchName = "branch1";
  const commitMessage = "commit message";
  const pullRequestTitle = "pull request title";
  const pullRequestBody = "pull request body";
  const gitResourceMeta = {
    serverPath: "serverPath",
    adminUIPath: "adminUIPath",
  };

  const branchArgs: GetBranchArgs = {
    owner,
    repositoryName,
    branchName,
  };

  const repositoryArgs: GetRepositoryArgs = {
    owner,
    repositoryName,
  };

  const commits: Commit[] = [
    {
      sha: "sha1",
    },
    {
      sha: "sha2",
    },
    {
      sha: "sha3",
    },
  ];

  const githubRepository: RemoteGitRepository = {
    name: "repository1",
    url: `https://github.com/${owner}/${repositoryName}.git`,
    private: true,
    fullName: `${owner}/${repositoryName}`,
    admin: true,
    defaultBranch: "master",
  };

  const githubBranch = {
    name: branchName,
    sha: "sha1",
  };

  let gitClientService: GitClientService;

  const logger = new Logger({
    serviceName: "GitService",
    isProduction: false,
  });

  beforeEach(async () => {
    //Define env variables that required for Github client
    process.env.GITHUB_APP_APP_ID = githubAppAppId;
    process.env.GITHUB_APP_PRIVATE_KEY = githubAppPrivateKey;
    process.env.GITHUB_APP_INSTALLATION_URL = githubAppInstallationId;

    // Mocking get last commit function, it's private so it can't be mocked
    // jest
    //   .spyOn(GithubService.prototype, "getInstallationAuthToken")
    //   .mockImplementation(async () => "authToken1");

    jest
      .spyOn(GithubService.prototype, "getCurrentUserCommitList")
      .mockImplementation(async () => commits);
    // Mocking get last commit function, it's private so it can't be mocked
    // jest.spyOn(GithubService.prototype, 'getLastCommit').mockImplementation(async () => commits[0]);

    jest
      .spyOn(GithubService.prototype, "getBranch")
      .mockImplementation(async () => githubBranch);

    jest
      .spyOn(GithubService.prototype, "getRepository")
      .mockImplementation(async () => githubRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(gitClientService).toBeDefined();
  });

  it("should create a provider", async () => {
    const service = await gitClientService.create(
      {
        provider: EnumGitProvider.Github,
        installationId: installationId,
      },
      logger
    );
    expect(service).toBeDefined();

    const provider = gitClientService["provider"];
    expect(provider).toBeDefined();
  });

  it("should call createPullRequestFromFiles in Basic mode", async () => {
    await gitClientService.create(
      {
        provider: EnumGitProvider.Github,
        installationId: installationId,
      },
      logger
    );
    const provider = gitClientService["provider"];
    const basePR = jest.spyOn(provider, "createPullRequestFromFiles");

    await gitClientService.createPullRequest({
      owner: owner,
      pullRequestMode: EnumPullRequestMode.Basic,
      repositoryName: repositoryName,
      branchName: branchName,
      commitMessage: commitMessage,
      pullRequestTitle: pullRequestTitle,
      pullRequestBody: pullRequestBody,
      gitResourceMeta: gitResourceMeta,
      files: [],
    });

    expect(basePR).toHaveBeenCalled();
  });

  xit("should call restoreAmplicationBranchIfNotExists in Basic mode", async () => {
    await gitClientService.create(
      {
        provider: EnumGitProvider.Github,
        installationId: installationId,
      },
      logger
    );
    const provider = gitClientService["provider"];
    const basePR = jest.spyOn(provider, "restoreAmplicationBranchIfNotExists");

    await gitClientService.createPullRequest({
      owner: owner,
      pullRequestMode: EnumPullRequestMode.Accumulative,
      repositoryName: repositoryName,
      branchName: branchName,
      commitMessage: commitMessage,
      pullRequestTitle: pullRequestTitle,
      pullRequestBody: pullRequestBody,
      gitResourceMeta: gitResourceMeta,
      files: [],
    });

    expect(basePR).toHaveBeenCalled();
  });

  // it("should create a pull request", async () => {});
});
