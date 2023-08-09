import { MiddlewareHandlerContext } from "../../src.deps.ts";

export function spriteMapMiddleware() {
  return async (_req: Request, ctx: MiddlewareHandlerContext) => {
    {
      if (ctx.destination == "route") {
        console.log(JSON.stringify(ctx));
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      }
      // if (!Context.instance()) {
      //   await Context.init(path);
      // }
      // ctx.state.context = Context.instance();

      return await ctx.next();
    }
  };
}
