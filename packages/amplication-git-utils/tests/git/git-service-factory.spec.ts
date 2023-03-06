import { EnumGitProvider } from "../../src/types";
import { GithubService } from "../../src/git/github.service";
import { GitFactory } from "../../src/git/git-factory";
import { Logger } from "@amplication/util/logging";

describe("GitFactory", () => {
  describe("GitFactory.getProvider()", () => {
    const logger = new Logger({
      serviceName: "GitService",
      isProduction: false,
    });

    it("should support a github provider", async () => {
      process.env.GITHUB_APP_INSTALLATION_URL = "http://localhost:3000";
      process.env.GITHUB_APP_APP_ID = "12345678";
      process.env.GITHUB_APP_PRIVATE_KEY = "PRIVATE_KEY";

      const provider = await GitFactory.getProvider(
        {
          provider: EnumGitProvider.Github,
          installationId: "123",
        },
        logger
      );

      expect(provider).toBeInstanceOf(GithubService);
    });

    it("should throw error if source control doesn't exist", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      expect(() => gitServiceFactory.getService("GitNone")).toThrow(Error);
    });
  });
});
