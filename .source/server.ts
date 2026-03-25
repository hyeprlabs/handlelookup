// @ts-nocheck
import * as __fd_glob_4 from "../content/blog/username-branding-across-platforms.mdx?collection=blog"
import * as __fd_glob_3 from "../content/blog/social-media-handle-strategy.mdx?collection=blog"
import * as __fd_glob_2 from "../content/blog/handle-lookup-v2-release.mdx?collection=blog"
import * as __fd_glob_1 from "../content/blog/check-username-availability-api.mdx?collection=blog"
import * as __fd_glob_0 from "../content/blog/build-signup-username-checker.mdx?collection=blog"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const blog = await create.doc("blog", "content/blog", {"build-signup-username-checker.mdx": __fd_glob_0, "check-username-availability-api.mdx": __fd_glob_1, "handle-lookup-v2-release.mdx": __fd_glob_2, "social-media-handle-strategy.mdx": __fd_glob_3, "username-branding-across-platforms.mdx": __fd_glob_4, });