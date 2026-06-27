// Public re-export surface for the docs data model.
//
// All package content lives under `src/content/packages/`. To add a package,
// drop a folder with `_package.md`. To add a page, drop a `<order>-<slug>.md`
// inside the package folder. No TS edits required.

export type { DocPackage, DocPage, GuideStep, PublishStatus } from "./docs-types";
export { PACKAGES, getPackage, getPackagePage } from "./content";
