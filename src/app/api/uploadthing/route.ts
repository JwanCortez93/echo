import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
export const maxDuration = 30;
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
