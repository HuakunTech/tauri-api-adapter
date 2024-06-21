import { readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import typescript from "@rollup/plugin-typescript";

const pkg = JSON.parse(readFileSync(join(cwd(), "package.json"), "utf8"));

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.exports["."].import,
      format: "esm",
    },
    {
      file: pkg.exports["."].require,
      format: "cjs",
    },
  ],
  treeshake: true,
  plugins: [typescript()],
};

export default config;
