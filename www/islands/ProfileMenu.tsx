import { ComponentChildren } from "preact";
import {
  Action,
  ActionStyleTypes,
  MenuButton,
  MenuButtonProps,
  MenuButtonStyleTypes,
} from "@fathym/atomic";
import { ChevronDownIcon, UserIcon } from "$fathym/atomic-icons";

export type ProfileMenuProps = Omit<MenuButtonProps, "toggleChildren"> & {
  toggleChildren?: ComponentChildren | undefined;
};

export default function ProfileMenu(props: ProfileMenuProps) {
  return (
    <MenuButton
      menuStyle={MenuButtonStyleTypes.Responsive}
      toggleChildren={
        <>
          <UserIcon class="w-[24px] h-[24px]" />

          <ChevronDownIcon class="w-[24px] h-[24px]" />
        </>
      }
    >
      <>
        <Action
          id="sign-in-button"
          href="/oauth/signout"
          class="w-full text-xl mx-1"
        >
          Sign Out
        </Action>
      </>
    </MenuButton>
  );
}
