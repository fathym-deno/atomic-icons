export * from "../deps.ts";
export {
  assert,
  assertEquals,
} from "https://deno.land/std@0.197.0/testing/asserts.ts";
export {
  afterEach,
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.197.0/testing/bdd.ts";
export { render } from "https://esm.sh/preact-render-to-string@6.2.0";
export { freshPuppetTestWrapper } from "https://deno.land/x/fresh_marionette@v2.0.1/mod.js";

export const BASE_URL = Deno.env.get("BASE_URL") || "http://localhost:8000";
export const DENO_ENV = Deno.env.get("DENO_ENV") || "development";

export const puppet_config = DENO_ENV === "development"
  ? { headless: false, defaultViewport: null }
  : { headless: true };
