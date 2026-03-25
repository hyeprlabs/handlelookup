// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  blog: create.doc("blog", {"build-signup-username-checker.mdx": () => import("../content/blog/build-signup-username-checker.mdx?collection=blog"), "check-username-availability-api.mdx": () => import("../content/blog/check-username-availability-api.mdx?collection=blog"), "handle-lookup-v2-release.mdx": () => import("../content/blog/handle-lookup-v2-release.mdx?collection=blog"), "social-media-handle-strategy.mdx": () => import("../content/blog/social-media-handle-strategy.mdx?collection=blog"), "username-branding-across-platforms.mdx": () => import("../content/blog/username-branding-across-platforms.mdx?collection=blog"), }),
};
export default browserCollections;