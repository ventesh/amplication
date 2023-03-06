// import { AMPLICATION_LOGGER_PROVIDER } from "@amplication/util/logging";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { ModuleMocker, MockFunctionMetadata } from "jest-mock";
import { PullRequestService } from "../../src/pull-request/pull-request.service";
const moduleMocker = new ModuleMocker(global);

xdescribe("Pull Request service tests", () => {
  let pullRequestService: PullRequestService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AMPLICATION_LOGGER_PROVIDER,
          useClass: jest.fn(() => ({
            log: jest.fn(),
            error: jest.fn(),
          })),
        },
        {
          provide: ConfigService,
          useClass: jest.fn(() => ({
            get: (param) => {
              // if (param === Env.CLIENT_HOST) {
              //   return `https://server.${expectedDomain}`;
              // } else return "some-value";
            },
          })),
        },
      ],
    })
      .useMocker((token) => {
        const mockMetadata = moduleMocker.getMetadata(
          token
        ) as MockFunctionMetadata<any, any>;
        return moduleMocker.generateFromMetadata(mockMetadata);
      })
      .compile();

    pullRequestService = moduleRef.get<PullRequestService>(PullRequestService);
  });

  it("should be defined", () => {
    expect(pullRequestService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
