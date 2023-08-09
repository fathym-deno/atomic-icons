import { MiddlewareHandlerContext } from "../../src.deps.ts";

export function spriteMapMiddleware() {
  return async (_req: Request, ctx: MiddlewareHandlerContext) => {
    {
      // if (ctx.destination != "route") {
      //   return await ctx.next();
      // }
      // if (!Context.instance()) {
      //   await Context.init(path);
      // }
      // ctx.state.context = Context.instance();
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

      console.log(JSON.stringify(ctx));
      return await ctx.next();
    }
  };
}
