import { createGitHubOAuth2Client } from "@kv_oauth";
import { KVOauthPluginOptions } from "@fresh_kv_oauth";

export const gitHubOauth2Client = createGitHubOAuth2Client();

export const kvAuthOptions: KVOauthPluginOptions = {
  Clients: [
    {
      OAuth2Client: gitHubOauth2Client,
      SignInPath: "/oauth/signin/github",
      SignInCallbackPath: "/oauth/callback/github",
    },
  ],
  SignOutPath: "/oauth/signout",
};
