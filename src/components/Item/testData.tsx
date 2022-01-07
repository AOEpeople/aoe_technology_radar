import { FlagType, Item } from "../../model";

export const item: Item = {
  flag: FlagType.default,
  featured: false,
  revisions: [
    {
      name: "yarn",
      release: "2018-03-01",
      title: "Yarn",
      ring: "trial",
      quadrant: "tools",
      fileName: "C:\\projects\\techradar\\radar\\2018-03-01\\yarn.md",
      body: "<p>Yarn is a dependency management tool for frontend (node) projects similar to npm. It also uses the npm registry and \ninfrastructure. According to Yarn, the benefits are that Yarn is much faster, automatically writes a .lock file and \nbuilds up a local cache to be even faster when installing packages again.</p>\n<p>At AOE, we started using Yarn in different projects to evaluate if we can switch to Yarn for all projects.</p>\n",
    },
  ],
  name: "yarn",
  title: "Yarn",
  ring: "trial",
  quadrant: "tools",
  body: "<p>Yarn is a dependency management tool for frontend (node) projects similar to npm. It also uses the npm registry and \ninfrastructure. According to Yarn, the benefits are that Yarn is much faster, automatically writes a .lock file and \nbuilds up a local cache to be even faster when installing packages again.</p>\n<p>At AOE, we started using Yarn in different projects to evaluate if we can switch to Yarn for all projects.</p>\n",
  info: "",
};
