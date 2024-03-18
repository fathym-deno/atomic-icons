import { assertEquals, describe, render } from "../tests.deps.ts";
import { Icon } from "../../src/atoms/Icon.tsx";

describe("Icon Tests", () => {
  describe("Sprite Test", () => {
    const html = render(<Icon src="./sprite.svg" icon="deno" />);

    assertEquals(
      html,
      `<svg><use href="./sprite.svg#deno" data-eac-bypass-base="true"></use></svg>`,
    );
  });

  describe("Source Test", () => {
    const html = render(<Icon src="./logo.svg" />);

    assertEquals(
      html,
      `<svg><use href="./logo.svg" data-eac-bypass-base="true"></use></svg>`,
    );
  });

  describe("Children Test", () => {
    const html = render(
      <Icon>
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill="red"
        />
      </Icon>,
    );

    assertEquals(
      html,
      `<svg><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"></circle></svg>`,
    );
  });
});
