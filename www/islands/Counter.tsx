import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { CheckCircleIcon, XCircleIcon } from "$fathym/atomic-icons";
import { JSX } from "preact";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => props.count.value -= 1}>
        <XCircleIcon />
      </Button>
      <p class="text-3xl">{props.count}</p>
      <Button onClick={() => props.count.value += 1}>
        <CheckCircleIcon />
      </Button>
    </div>
  );
}
