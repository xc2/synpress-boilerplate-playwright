import * as DotEnv from "dotenv";

const EnvPathList = [".env.local", ".env.ci", ".env"];

for (const path of EnvPathList) {
  DotEnv.config({ path });
}
