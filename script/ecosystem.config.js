const { join } = require("path");

const cwd = join(__dirname, "..");
module.exports = {
  apps: [
    {
      name: "server",
      script: "npx nx run amplication-server:serve ",
      cwd,
    },
    {
      name: "client",
      script: "npx nx run amplication-client:serve ",
      cwd,
    },
    {
      name: "build-manager",
      script: "npx nx run amplication-build-manager:serve",
      cwd,
    },
    {
      name: "pull request service",
      script: "npx nx run amplication-git-pull-request-service:serve",
      cwd,
    },
    {
      name: "local-dsg-runner",
      script: "npx nx run local-dsg-runner:serve",
      cwd,
    },
  ],
};
