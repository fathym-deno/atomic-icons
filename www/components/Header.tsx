import {
  Action,
  classSet,
  factory,
  Header,
  HeaderLogo,
  HeaderProps,
  ResponsiveSet,
} from "@fathym/atomic";
import { getSessionId } from "@kv_oauth";
import InteractiveResponsiveSet from "../islands/molecules/InteractiveResponsiveSet.tsx";
import ProfileMenu from "../islands/ProfileMenu.tsx";

export default async function WWWHeader(req: Request, props: HeaderProps) {
  const sessionId = await getSessionId(req);

  const isSignedIn = sessionId !== undefined;

  const logo = {
    LogoAlt: "Fathym Icon Sets",
    LogoUrl: "/logo.svg",
    LogoHref: "/",
  };

  return (
    <Header
      class={classSet(undefined, "bg-blue-500")}
      logo={logo}
      nav={
        <InteractiveResponsiveSet toggleChildren="☰">
          <Action href="/" class="text-xl mx-1">
            Home
          </Action>

          <Action href="/docs" class="text-xl mx-1">
            Docs
          </Action>

          <Action href="/pricing" class="text-xl mx-1">
            Pricing
          </Action>

          {isSignedIn
            ? (
              <Action
                id="sign-in-button"
                href="/oauth/signout"
                class="text-xl mx-1"
              >
                Sign Out
              </Action>
            )
            : (
              <Action
                id="sign-in-button"
                href="/oauth/signin/github"
                class="text-xl mx-1"
              >
                Sign In
              </Action>
            )}
          {/* <ProfileMenu /> */}
        </InteractiveResponsiveSet>
      }
      {...props}
    />
  );
}
