// import { AMPLICATION_LOGGER_PROVIDER } from "@amplication/nest-logger-module";
import {
  Commit,
  CreatePullRequestArgs,
  EnumGitProvider,
  EnumPullRequestMode,
  GetBranchArgs,
  GetRepositoryArgs,
  RemoteGitRepository,
} from "../../src/types";
import { GitClientService } from "../../src/git/git.service";
import { GitFactory } from "./git-factory";
import { GitProvider } from "../git-provider.interface.ts";
import { Logger } from "@amplication/util/logging";

const providerGetInstallationMock = jest.fn();
const createPullRequestFromFilesMock = jest.fn();
const createBranchMock = jest.fn();
const getCloneUrlMock = jest.fn();

const GitProviderMock: GitProvider = {
  name: "github",
  getGitInstallationUrl: providerGetInstallationMock,
  createPullRequestFromFiles: createPullRequestFromFilesMock,
  createBranch: createBranchMock,
  getCloneUrl: getCloneUrlMock,
} as unknown as GitProvider;

const spyOnGitFactoryGetProvider = jest
  .spyOn(GitFactory, "getProvider")
  .mockResolvedValue(GitProviderMock);

describe("Git service tests", () => {
  const githubAppAppId = "12345678";
  const githubAppPrivateKey = "privateKey";
  const githubAppInstallationId = "123";

  const clonesFolder = ".amplication/clones";

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

  const files = [
    {
      path: "file1",
      content: "content1",
    },
    {
      path: "file2",
      content: "content2",
    },
  ];

  const workspaceId = "workspaceId";

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

  const createPullRequestArgsWithBasicType: CreatePullRequestArgs = {
    owner,
    repositoryName,
    branchName,
    commitMessage,
    pullRequestTitle,
    pullRequestBody,
    files,
    pullRequestMode: EnumPullRequestMode.Basic,
    gitResourceMeta,
  };

  const createPullRequestArgsWithAccumulativeType: CreatePullRequestArgs = {
    owner,
    repositoryName,
    branchName,
    commitMessage,
    pullRequestTitle,
    pullRequestBody,
    files,
    pullRequestMode: EnumPullRequestMode.Accumulative,
    gitResourceMeta,
  };

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
    gitClientService = new GitClientService();

    //Define env variables that required for Github client
    process.env.GITHUB_APP_APP_ID = githubAppAppId;
    process.env.GITHUB_APP_PRIVATE_KEY = githubAppPrivateKey;
    process.env.GITHUB_APP_INSTALLATION_URL = githubAppInstallationId;
    process.env.CLONES_FOLDER = clonesFolder;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(gitClientService).toBeDefined();
  });

  it("when getGitInstallationUrl it should use the provider getGitInstallationUrl", async () => {
    const service = await gitClientService.create(
      {
        provider: EnumGitProvider.Github,
        installationId: installationId,
      },
      logger
    );

    expect(service).toBeDefined();

    await service.getGitInstallationUrl(workspaceId);
    expect(GitProviderMock.getGitInstallationUrl).toBeCalledWith(workspaceId);
  });

  it("when createPullRequest is called with Basic type, then createPullRequestFromFiles should be used", async () => {
    const service = await gitClientService.create(
      {
        provider: EnumGitProvider.Github,
        installationId: installationId,
      },
      logger
    );

    await service.createPullRequest(createPullRequestArgsWithBasicType);
    expect(GitProviderMock.createPullRequestFromFiles).toBeCalled();
  });

  it("when createPullRequest is called with Accumulative type, then create branch should be used", async () => {
    const service = await gitClientService.create(
      {
        provider: EnumGitProvider.Github,
        installationId: installationId,
      },
      logger
    );

    await service.createPullRequest(createPullRequestArgsWithAccumulativeType);
    expect(GitProviderMock.createBranch).toBeCalled();
    expect(GitProviderMock.getCloneUrl).toBeCalled();
  });
});
