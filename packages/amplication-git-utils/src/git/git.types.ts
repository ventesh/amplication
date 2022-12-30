import { Branch } from "./dto/branch";
import { GithubFile } from "./dto/github-file.dto";
import { RemoteGitOrganization } from "./dto/remote-git-organization.dto";
import {
  RemoteGitRepos,
  RemoteGitRepository,
} from "./dto/remote-git-repository";

export type PrModule = {
  path: string;
  code: string | null;
};

export enum EnumGitOrganizationType {
  User = "User",
  Organization = "Organization",
}

export interface GitResourceMeta {
  serverPath: string;
  adminUIPath: string;
}

export interface GitClient {
  getRepository(
    installationId: string,
    owner: string,
    repo: string
  ): Promise<RemoteGitRepository>;

  createRepository(
    installationId: string,
    versionControlUserType: EnumGitOrganizationType,
    owner: string,
    name: string,
    isPublic: boolean
  ): Promise<RemoteGitRepository>;

  getGitRemoteOrganization(
    installationId: string
  ): Promise<RemoteGitOrganization>;

  getOrganizationRepos(
    installationId: string,
    limit: number,
    page: number
  ): Promise<RemoteGitRepos>;

  getGitInstallationUrl(workspaceId: string): Promise<string>;

  deleteGitOrganization(installationId: string): Promise<boolean>;

  createPullRequest(
    userName: string,
    repoName: string,
    modules: PrModule[],
    commitName: string,
    commitMessage: string,
    commitDescription: string,
    baseBranchName: string,
    installationId: string,
    meta: GitResourceMeta
  ): Promise<string>;

  getFile(
    userName: string,
    repoName: string,
    path: string,
    baseBranchName: string,
    installationId: string
  ): Promise<GithubFile>;

  createBranch(
    installationId: string,
    owner: string,
    repo: string,
    newBranchName: string,
    baseBranchName?: string
  ): Promise<void>;

  getBranch(
    installationId: string,
    owner: string,
    repo: string,
    branch: string
  ): Promise<Branch>;

  isBranchExist(
    installationId: string,
    owner: string,
    repo: string,
    branch: string
  ): Promise<boolean>;
}
