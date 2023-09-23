import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { CheckCircleIcon } from "$fathym/atomic-icons";
import { JSX } from "preact";

interface CounterProps {
  count: Signal<number>;

  minusIcon: JSX.Element;
}

export default function Counter(props: CounterProps) {
  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => props.count.value -= 1}>
        {props.minusIcon}
      </Button>
      <p class="text-3xl">{props.count}</p>
      <Button onClick={() => props.count.value += 1}>
        <CheckCircleIcon />
      </Button>
    </div>
  );
}
