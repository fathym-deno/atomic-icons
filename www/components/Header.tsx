import {
  Action,
  classSet,
  factory,
  Header,
  HeaderLogo,
  HeaderProps,
  ResponsiveSet,
} from "@fathym/atomic";
import InteractiveResponsiveSet from "../islands/molecules/InteractiveResponsiveSet.tsx";

export default function WWWHeader(props: HeaderProps) {
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

          {/* <ProfileMenu /> */}
        </InteractiveResponsiveSet>
      }
      {...props}
    />
  );
}
