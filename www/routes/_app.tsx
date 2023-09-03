import { AppProps } from "$fresh/server.ts";
import { getSessionId } from "@kv_oauth";

export default async function App(req: Request, { Component }: AppProps) {
  const sessionId = await getSessionId(req);

  const isSignedIn = sessionId !== undefined;

  return (
    <>
      {isSignedIn
        ? (
          <a
            id="sign-in-button"
            href="/oauth/signout"
            class="text-xl mx-1"
          >
            Sign Out
          </a>
        )
        : (
          <a
            id="sign-in-button"
            href="/oauth/signin/github"
            class="text-xl mx-1"
          >
            Sign In
          </a>
        )}
      <Component />
    </>
  );
}
