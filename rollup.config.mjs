import merge from "deepmerge";
import { createSpaConfig } from "@open-wc/building-rollup";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

const baseConfig = createSpaConfig({});

export default merge(baseConfig, {
  input: "./index.html",
  plugins: [
    typescript(),
    copy({
      targets: [{ src: "assets", dest: "dist" }],
    }),
  ],
});
