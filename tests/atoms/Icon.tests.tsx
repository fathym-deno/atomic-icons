import { Icon } from "../../browser.ts";
import { assertEquals, preactRenderToString } from "../tests.deps.ts";

Deno.test("Icon Tests", async (t) => {
  await t.step("Sprite Test", () => {
    const html = preactRenderToString(<Icon src="./sprite.svg" icon="deno" />);

    assertEquals(
      html,
      `<svg><use href="./sprite.svg#deno" data-eac-bypass-base="true"></use></svg>`,
    );
  });

  await t.step("Source Test", () => {
    const html = preactRenderToString(<Icon src="./logo.svg" />);

    assertEquals(
      html,
      `<svg><use href="./logo.svg" data-eac-bypass-base="true"></use></svg>`,
    );
  });

  await t.step("Children Test", () => {
    const html = preactRenderToString(
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
